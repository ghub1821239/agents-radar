import { describe, it, expect, afterEach } from "vitest";
import { buildFeishuLearningMessage, buildFeishuMessage } from "../feishu.ts";
import type { Highlights } from "../notify.ts";
import type { LearningPlan } from "../learning.ts";

const BASE_URL = "https://example.com/radar";

describe("buildFeishuMessage", () => {
  const origPagesUrl = process.env["PAGES_URL"];

  afterEach(() => {
    if (origPagesUrl !== undefined) {
      process.env["PAGES_URL"] = origPagesUrl;
    } else {
      delete process.env["PAGES_URL"];
    }
  });

  it("builds a daily message with zh + en reports", () => {
    const msg = buildFeishuMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"],
      BASE_URL,
    );
    expect(msg).toContain("agents-radar");
    expect(msg).toContain("2026-03-09");
    expect(msg).toContain("📡");
    expect(msg).toContain(`[AI CLI 工具](${BASE_URL}/#2026-03-09/ai-cli)`);
    expect(msg).toContain(`[AI CLI Tools](${BASE_URL}/#2026-03-09/ai-cli-en)`);
  });

  it("renders zh-only reports without en link", () => {
    const msg = buildFeishuMessage("2026-03-09", ["ai-hn"], BASE_URL);
    expect(msg).toContain("HN 社区动态");
    expect(msg).not.toContain("HN Community");
  });

  it("includes Web UI and RSS links", () => {
    const msg = buildFeishuMessage("2026-03-09", ["ai-cli"], BASE_URL);
    expect(msg).toContain("🌐 Web UI");
    expect(msg).toContain("RSS");
    expect(msg).toContain(`${BASE_URL}/feed.xml`);
  });

  it("uses markdown links instead of HTML", () => {
    const msg = buildFeishuMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL);
    expect(msg).not.toContain("<a href=");
    expect(msg).not.toContain("<b>");
    expect(msg).toContain("**agents-radar");
    expect(msg).toContain(`[AI CLI 工具](`);
  });

  it("includes highlights when provided", () => {
    const highlights: Highlights = {
      zh: {
        "ai-cli": ["Claude Code 发布 v1.2.0", "Gemini CLI 修复 streaming"],
        "ai-agents": ["OpenClaw 新增 MCP 支持"],
      },
      en: {
        "ai-cli": ["Claude Code releases v1.2.0"],
      },
    };
    const msg = buildFeishuMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"],
      BASE_URL,
      highlights,
    );
    expect(msg).toContain("◦ Claude Code 发布 v1.2.0");
    expect(msg).toContain("◦ Gemini CLI 修复 streaming");
    expect(msg).toContain("◦ OpenClaw 新增 MCP 支持");
  });

  it("works without highlights", () => {
    const msg = buildFeishuMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, null);
    expect(msg).toContain("AI CLI 工具");
    expect(msg).not.toContain("◦");
  });

  it("renders a focused learning card instead of the macro report list", () => {
    const plan: LearningPlan = {
      date: "2026-09-01",
      profileUser: "ghub1821239",
      starCount: 9,
      profileTopics: ["skills", "ai-agents", "mcp"],
      profileLanguages: ["typescript", "python"],
      main: {
        id: "audit",
        name: "self-audit skill",
        description: "Agent 交付前的两阶段检查门",
        url: "https://github.com/example/audit",
        kind: "skill",
        source: "anthropics/skills PR",
        whyForYou: "匹配你 Star 中的 Agent 与 Skills 兴趣",
        whyNow: "适合今天做一个小实验",
        learn: ["机械验证与语义审查分层"],
        exercise: ["为自己的 Agent 写三项交付检查", "故意漏一项要求并验证能否拦截"],
        duration: "25 分钟",
        difficulty: "入门",
      },
      alternatives: ["browser", "memory", "slides"].map((id) => ({
        id,
        name: `${id} skill`,
        description: `${id} description`,
        url: `https://github.com/example/${id}`,
        kind: "skill" as const,
        source: "test",
        whyForYou: `${id} 推荐原因`,
      })),
    };

    const msg = buildFeishuLearningMessage(plan, BASE_URL);

    expect(msg).toContain("今日主学");
    expect(msg).toContain("self-audit skill");
    expect(msg).toContain("25 分钟");
    expect(msg).toContain("为自己的 Agent 写三项交付检查");
    expect(msg).toContain("browser skill");
    expect(msg).toContain(`${BASE_URL}/#2026-09-01/ai-learning`);
    expect(msg).not.toContain("AI CLI 工具");
  });
});
