import { describe, expect, it } from "vitest";
import {
  buildInterestProfile,
  buildLearningPlan,
  collectLearningCandidates,
  fetchStarredRepos,
  fetchRecentSkillPullRequests,
  rankLearningCandidates,
  renderLearningReport,
  type LearningCandidate,
} from "../learning.ts";

describe("personalized learning recommendations", () => {
  it("ranks a candidate matching the user's starred topics above a more popular unrelated project", () => {
    const profile = buildInterestProfile([
      {
        fullName: "example/agent-memory",
        description: "Memory and MCP tools for AI agents",
        language: "TypeScript",
        topics: ["ai-agent", "mcp", "memory", "skills"],
        stars: 1200,
        pushedAt: "2026-08-31T00:00:00Z",
      },
    ]);

    const candidates: LearningCandidate[] = [
      {
        id: "skill-memory",
        name: "Agent memory skill",
        description: "A small MCP skill for persistent agent memory",
        url: "https://github.com/example/skill-memory",
        kind: "skill",
        source: "GitHub",
        language: "TypeScript",
        topics: ["ai-agent", "mcp", "memory", "skills"],
        stars: 150,
        updatedAt: "2026-08-31T00:00:00Z",
      },
      {
        id: "image-model",
        name: "Large image model",
        description: "A production image generation model",
        url: "https://github.com/example/image-model",
        kind: "project",
        source: "GitHub Trending",
        language: "Python",
        topics: ["image-generation"],
        stars: 100000,
        updatedAt: "2026-08-31T00:00:00Z",
      },
    ];

    const ranked = rankLearningCandidates(profile, candidates);

    expect(ranked.map((item) => item.candidate.id)).toEqual(["skill-memory", "image-model"]);
    expect(ranked[0]?.reasons.join(" ")).toContain("mcp");
  });

  it("builds the profile from a user's public GitHub stars without a personal token", async () => {
    const requests: string[] = [];
    const fakeFetch = async (input: string | URL | Request): Promise<Response> => {
      requests.push(String(input));
      return new Response(
        JSON.stringify([
          {
            full_name: "example/codex-skill",
            description: "A Codex skill",
            language: "TypeScript",
            topics: ["codex", "skills"],
            stargazers_count: 321,
            pushed_at: "2026-08-31T00:00:00Z",
          },
        ]),
        { status: 200 },
      );
    };

    const stars = await fetchStarredRepos("learner", fakeFetch);

    expect(requests).toHaveLength(1);
    expect(requests[0]).toContain("/users/learner/starred");
    expect(stars).toEqual([
      {
        fullName: "example/codex-skill",
        description: "A Codex skill",
        language: "TypeScript",
        topics: ["codex", "skills"],
        stars: 321,
        pushedAt: "2026-08-31T00:00:00Z",
      },
    ]);
  });

  it("keeps newly submitted Skill PRs even when they are not yet popular", async () => {
    const fakeFetch = async (): Promise<Response> =>
      new Response(
        JSON.stringify([
          {
            number: 7,
            title: "Add a tiny MCP debugging skill",
            state: "open",
            user: { login: "author" },
            labels: [],
            created_at: "2026-08-31T12:00:00Z",
            updated_at: "2026-08-31T12:00:00Z",
            comments: 0,
            body: "A small debugging workflow",
            html_url: "https://github.com/anthropics/skills/pull/7",
          },
          {
            number: 6,
            title: "Old skill",
            state: "closed",
            user: { login: "author" },
            labels: [],
            created_at: "2026-08-01T12:00:00Z",
            updated_at: "2026-08-01T12:00:00Z",
            comments: 50,
            body: "Old",
            html_url: "https://github.com/anthropics/skills/pull/6",
          },
        ]),
        { status: 200 },
      );

    const prs = await fetchRecentSkillPullRequests(
      "anthropics/skills",
      new Date("2026-08-29T00:00:00Z"),
      fakeFetch,
    );

    expect(prs.map((pr) => pr.number)).toEqual([7]);
  });

  it("combines official Skill activity, curated Skills, and trending projects into one candidate pool", () => {
    const candidates = collectLearningCandidates(
      {
        prs: [
          {
            number: 42,
            title: "Add self-audit skill",
            state: "open",
            user: { login: "author" },
            labels: [],
            created_at: "2026-08-30T00:00:00Z",
            updated_at: "2026-08-31T00:00:00Z",
            comments: 5,
            body: "Adds a two-stage quality gate before an agent delivers work.",
            html_url: "https://github.com/anthropics/skills/pull/42",
          },
        ],
        issues: [],
      },
      {
        trendingRepos: [],
        searchRepos: [
          {
            fullName: "example/mcp-lab",
            description: "Small MCP examples",
            language: "TypeScript",
            stargazersCount: 120,
            pushedAt: "2026-08-31T00:00:00Z",
            url: "https://github.com/example/mcp-lab",
            searchQuery: "ai-agent",
          },
        ],
        trendingFetchSuccess: true,
      },
      [
        {
          name: "agent-browser",
          name_cn: "Agent 浏览器",
          repo: "vercel-labs/agent-browser",
          description_cn: "让 Agent 操作网页",
          install_cmd: "npx skills add vercel-labs/agent-browser -g -y",
          category: "automation",
          priority: 90,
          triggers: ["浏览网页"],
        },
      ],
    );

    expect(candidates.map((candidate) => candidate.id)).toEqual([
      "anthropics/skills#42",
      "vercel-labs/agent-browser",
      "example/mcp-lab",
    ]);
    expect(candidates[1]?.installCommand).toContain("npx skills add");
  });

  it("renders one main lesson and three quick alternatives with a hands-on task", () => {
    const candidates: LearningCandidate[] = ["audit", "browser", "memory", "slides"].map((id) => ({
      id,
      name: `${id} skill`,
      description: `${id} description`,
      url: `https://github.com/example/${id}`,
      kind: "skill",
      source: "test source",
      topics: [id, "skills"],
    }));
    const ranked = candidates.map((candidate, index) => ({
      candidate,
      score: 100 - index,
      reasons: [`匹配 ${candidate.id}`],
    }));
    const profile = buildInterestProfile([]);
    const plan = buildLearningPlan(
      {
        main: {
          id: "audit",
          whyForYou: "你关注 Agent 质量控制",
          whyNow: "这是一个容易复用的小技术",
          learn: ["两阶段验证门"],
          exercise: ["给自己的 Agent 增加交付检查"],
          duration: "25 分钟",
          difficulty: "入门",
        },
        alternatives: [
          { id: "browser", whyForYou: "浏览器自动化" },
          { id: "memory", whyForYou: "Agent 记忆" },
          { id: "slides", whyForYou: "生成式演示文稿" },
        ],
      },
      ranked,
      profile,
      "ghub1821239",
      "2026-09-01",
    );

    const markdown = renderLearningReport(plan);

    expect(plan.alternatives).toHaveLength(3);
    expect(markdown).toContain("今日主学：audit skill");
    expect(markdown).toContain("25 分钟");
    expect(markdown).toContain("给自己的 Agent 增加交付检查");
    expect(markdown).toContain("browser skill");
    expect(markdown).toContain("基于 @ghub1821239 的公开 GitHub Stars");
  });

  it("falls back safely when the model returns malformed selection fields", () => {
    const candidate: LearningCandidate = {
      id: "safe",
      name: "safe skill",
      description: "safe description",
      url: "https://github.com/example/safe",
      kind: "skill",
      source: "test",
      topics: ["skills"],
    };
    const profile = buildInterestProfile([]);

    const plan = buildLearningPlan(
      {
        main: { id: "safe", learn: "not-an-array" as unknown as string[] },
        alternatives: { id: "broken" } as unknown as [],
      },
      [{ candidate, score: 1, reasons: [] }],
      profile,
      "learner",
      "2026-09-01",
    );

    expect(plan.main.learn).toEqual([
      "理解 safe skill 解决的问题",
      "识别其中可以迁移到自己 Agent 工作流的实现模式",
    ]);
    expect(plan.alternatives).toEqual([]);
  });
});
