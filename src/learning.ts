/** Personalized, small-scope learning recommendations derived from GitHub stars. */

import type { GitHubItem } from "./github.ts";
import type { TrendingData } from "./trending.ts";

export interface StarredRepo {
  fullName: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  pushedAt: string;
}

export interface InterestProfile {
  starCount: number;
  starredNames: Set<string>;
  tokenWeights: Map<string, number>;
  topTopics: string[];
  topLanguages: string[];
}

export type LearningCandidateKind = "skill" | "project" | "technique";

export interface LearningCandidate {
  id: string;
  name: string;
  description: string;
  url: string;
  kind: LearningCandidateKind;
  source: string;
  language?: string | null;
  topics: string[];
  stars?: number;
  updatedAt?: string;
  installCommand?: string;
  status?: string;
}

export interface RankedLearningCandidate {
  candidate: LearningCandidate;
  score: number;
  reasons: string[];
}

export interface CuratedSkill {
  name: string;
  name_cn?: string;
  repo: string;
  description_cn: string;
  install_cmd?: string;
  category?: string;
  priority?: number;
  triggers?: string[];
  use_cases?: string[];
}

export interface LearningSelectionItem {
  id: string;
  whyForYou?: string;
  whyNow?: string;
  learn?: string[];
  exercise?: string[];
  duration?: string;
  difficulty?: string;
}

export interface LearningSelection {
  main?: LearningSelectionItem;
  alternatives?: LearningSelectionItem[];
}

export interface LearningPlanItem extends LearningSelectionItem {
  name: string;
  description: string;
  url: string;
  kind: LearningCandidateKind;
  source: string;
  installCommand?: string;
  status?: string;
}

export interface LearningPlan {
  date: string;
  profileUser: string;
  starCount: number;
  profileTopics: string[];
  profileLanguages: string[];
  main: LearningPlanItem;
  alternatives: LearningPlanItem[];
}

interface GitHubStarredApiRepo {
  full_name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at: string;
}

interface CuratedSkillsResponse {
  featured?: CuratedSkill[];
}

const CURATED_SKILLS_URL = "https://raw.githubusercontent.com/1-SKILL/ai-skill/main/recommendations.json";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
  "tool",
  "tools",
  "project",
  "github",
]);

const LEARNING_TERMS = new Set([
  "agent",
  "agents",
  "ai-agent",
  "skill",
  "skills",
  "mcp",
  "memory",
  "prompt",
  "tutorial",
  "example",
  "starter",
  "workflow",
  "codex",
  "claude",
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.-]+/g, " ")
    .split(/[\s/_.]+/)
    .map((token) => token.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}

function compactDescription(value: string | null | undefined, maxLength = 360): string {
  const compact = (value ?? "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^(summary|overview|changes|implementation details|why|validation)\s*$/gim, " ")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (compact.length <= maxLength) return compact;
  const slice = compact.slice(0, maxLength - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > maxLength * 0.7 ? lastSpace : undefined).trim()}…`;
}

function addWeight(weights: Map<string, number>, token: string, amount: number): void {
  weights.set(token, (weights.get(token) ?? 0) + amount);
}

export async function fetchStarredRepos(
  username: string,
  fetchImpl: typeof fetch = fetch,
): Promise<StarredRepo[]> {
  const result: StarredRepo[] = [];
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "agents-radar/1.0",
  };
  const token = process.env["GITHUB_TOKEN"];
  if (token) headers["Authorization"] = `Bearer ${token}`;

  for (let page = 1; page <= 10; page++) {
    const url =
      `https://api.github.com/users/${encodeURIComponent(username)}/starred` +
      `?sort=created&direction=desc&per_page=100&page=${page}`;
    const response = await fetchImpl(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub starred repositories API ${response.status}: ${await response.text()}`);
    }
    const repos = (await response.json()) as GitHubStarredApiRepo[];
    result.push(
      ...repos.map((repo) => ({
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        topics: repo.topics ?? [],
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
      })),
    );
    if (repos.length < 100) break;
  }

  return result;
}

export async function fetchRecentSkillPullRequests(
  repo: string,
  since: Date,
  fetchImpl: typeof fetch = fetch,
): Promise<GitHubItem[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "agents-radar/1.0",
  };
  const token = process.env["GITHUB_TOKEN"];
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const safeRepo = repo
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  const url =
    `https://api.github.com/repos/${safeRepo}/pulls` + "?state=all&sort=created&direction=desc&per_page=100";
  const response = await fetchImpl(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub recent Skill PR API ${response.status}: ${await response.text()}`);
  }
  const prs = (await response.json()) as GitHubItem[];
  return prs.filter((pr) => new Date(pr.created_at) >= since);
}

export async function fetchCuratedSkills(fetchImpl: typeof fetch = fetch): Promise<CuratedSkill[]> {
  const response = await fetchImpl(CURATED_SKILLS_URL, {
    headers: { "User-Agent": "agents-radar/1.0", Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Curated Skills feed ${response.status}: ${await response.text()}`);
  }
  const data = (await response.json()) as CuratedSkillsResponse;
  return data.featured ?? [];
}

export function collectLearningCandidates(
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] },
  trendingData: TrendingData,
  curatedSkills: CuratedSkill[] = [],
): LearningCandidate[] {
  const candidates: LearningCandidate[] = [];
  const seen = new Set<string>();

  const add = (candidate: LearningCandidate): void => {
    const key = candidate.url.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(candidate);
  };

  for (const pr of skillsData.prs.slice(0, 30)) {
    add({
      id: `anthropics/skills#${pr.number}`,
      name: pr.title,
      description: compactDescription(pr.body ?? "Official Skill proposal in anthropics/skills"),
      url: pr.html_url,
      kind: "skill",
      source: "anthropics/skills PR",
      topics: ["skill", "skills", "ai-agent", ...tokens(pr.title).slice(0, 8)],
      updatedAt: pr.updated_at,
      status: pr.state === "open" ? "开放 PR，仅建议阅读与实验" : pr.state,
    });
  }

  for (const skill of curatedSkills) {
    add({
      id: skill.repo,
      name: skill.name_cn ? `${skill.name_cn} (${skill.name})` : skill.name,
      description: compactDescription(skill.description_cn),
      url: `https://github.com/${skill.repo}`,
      kind: "skill",
      source: "ai-skill 精选库",
      topics: [skill.category ?? "skill", ...(skill.triggers ?? []), ...(skill.use_cases ?? [])],
      installCommand: skill.install_cmd,
      status: "精选库候选，安装前仍需检查 SKILL.md",
    });
  }

  for (const repo of trendingData.trendingRepos) {
    add({
      id: repo.fullName,
      name: repo.fullName,
      description: compactDescription(repo.description),
      url: repo.url,
      kind: "project",
      source: "GitHub Trending",
      language: repo.language,
      topics: tokens(`${repo.fullName} ${repo.description}`).slice(0, 12),
      stars: repo.totalStars,
    });
  }

  for (const repo of trendingData.searchRepos) {
    add({
      id: repo.fullName,
      name: repo.fullName,
      description: compactDescription(repo.description),
      url: repo.url,
      kind: "project",
      source: `GitHub Search: ${repo.searchQuery}`,
      language: repo.language,
      topics: [repo.searchQuery, ...tokens(`${repo.fullName} ${repo.description ?? ""}`).slice(0, 12)],
      stars: repo.stargazersCount,
      updatedAt: repo.pushedAt,
    });
  }

  return candidates;
}

function topKeys(weights: Map<string, number>, limit: number): string[] {
  return [...weights.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([key]) => key);
}

export function buildInterestProfile(stars: StarredRepo[]): InterestProfile {
  const tokenWeights = new Map<string, number>();
  const topicWeights = new Map<string, number>();
  const languageWeights = new Map<string, number>();

  for (const repo of stars) {
    for (const topic of repo.topics) {
      const normalized = topic.toLowerCase();
      addWeight(topicWeights, normalized, 1);
      addWeight(tokenWeights, normalized, 6);
    }
    if (repo.language) {
      const language = repo.language.toLowerCase();
      addWeight(languageWeights, language, 1);
      addWeight(tokenWeights, language, 2);
    }
    for (const token of tokens(`${repo.fullName} ${repo.description ?? ""}`)) {
      addWeight(tokenWeights, token, 1);
    }
  }

  return {
    starCount: stars.length,
    starredNames: new Set(stars.map((repo) => repo.fullName.toLowerCase())),
    tokenWeights,
    topTopics: topKeys(topicWeights, 8),
    topLanguages: topKeys(languageWeights, 5),
  };
}

function candidateTokens(candidate: LearningCandidate): Set<string> {
  return new Set([
    ...candidate.topics.map((topic) => topic.toLowerCase()),
    ...tokens(`${candidate.name} ${candidate.description} ${candidate.language ?? ""}`),
  ]);
}

function freshnessScore(updatedAt?: string): number {
  if (!updatedAt) return 0;
  const ageMs = Date.now() - new Date(updatedAt).getTime();
  if (!Number.isFinite(ageMs)) return 0;
  const ageDays = ageMs / (24 * 60 * 60 * 1000);
  if (ageDays <= 2) return 8;
  if (ageDays <= 7) return 5;
  if (ageDays <= 30) return 2;
  return 0;
}

export function rankLearningCandidates(
  profile: InterestProfile,
  candidates: LearningCandidate[],
): RankedLearningCandidate[] {
  return candidates
    .filter((candidate) => !profile.starredNames.has(candidate.id.toLowerCase()))
    .map((candidate) => {
      const cTokens = candidateTokens(candidate);
      const matched = [...cTokens]
        .filter((token) => profile.tokenWeights.has(token))
        .sort((a, b) => (profile.tokenWeights.get(b) ?? 0) - (profile.tokenWeights.get(a) ?? 0));
      const affinity = matched.reduce(
        (sum, token) => sum + Math.min(profile.tokenWeights.get(token) ?? 0, 10),
        0,
      );
      const learningFit =
        (candidate.kind === "skill" ? 12 : 0) +
        [...cTokens].filter((token) => LEARNING_TERMS.has(token)).length * 2;
      const popularity = candidate.stars ? Math.min(Math.log10(candidate.stars + 1) * 2, 10) : 0;
      const score = affinity + learningFit + popularity + freshnessScore(candidate.updatedAt);
      const reasons = matched.slice(0, 3).map((token) => `与你 Star 中的 ${token} 兴趣匹配`);
      if (candidate.kind === "skill") reasons.push("适合拆成一个可动手的小 Skill");

      return { candidate, score, reasons };
    })
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name));
}

export function buildLearningSelectionPrompt(
  profile: InterestProfile,
  ranked: RankedLearningCandidate[],
  profileUser: string,
  date: string,
): string {
  const candidates = ranked.slice(0, 14).map(({ candidate, score, reasons }) => ({
    id: candidate.id,
    name: candidate.name,
    description: candidate.description.slice(0, 900),
    kind: candidate.kind,
    source: candidate.source,
    status: candidate.status,
    topics: candidate.topics,
    language: candidate.language,
    stars: candidate.stars,
    personalizedScore: Number(score.toFixed(2)),
    matchingReasons: reasons,
  }));

  return `你是一位面向开发者的 AI 小技术学习策展人。请从给定候选中制定 ${date} 的学习卡。

用户：@${profileUser}
公开 GitHub Stars：${profile.starCount}
高频 Topic：${profile.topTopics.join(", ") || "暂无"}
常见语言：${profile.topLanguages.join(", ") || "暂无"}

候选（已按公开 Stars 兴趣匹配、可学习性、活跃度预排序）：
${JSON.stringify(candidates, null, 2)}

选择原则：
1. 选 1 个主学和 3 个不同的快速候选，只能使用上面存在的 id。
2. 主学必须优先选择 Skill 或可独立练习的小技术，能在 20–30 分钟内理解并动手；不要选宏观行业新闻或需要完整部署的大型框架。三个候选中至少两个应为 Skill/小技术。
3. 明确说明它与用户 Stars 的关系，但不能虚构用户兴趣或项目功能。
4. 动手任务必须真正应用主学技术，具体、低风险、可验证，共 2–4 步，每步写出动作与预期产物。禁止把“创建空文件”“只复制 frontmatter”或单独运行 git diff --check 当作核心练习。
5. 开放 PR 只建议阅读或在隔离环境实验，不描述为已正式发布。
6. 不自动安装第三方 Skill，不编造命令、URL、Star 数或发布状态。

只返回严格 JSON，不要 Markdown，不要额外文字：
{
  "main": {
    "id": "候选 id",
    "whyForYou": "为什么匹配用户的 Stars",
    "whyNow": "为什么今天值得学",
    "learn": ["今天掌握点 1", "今天掌握点 2"],
    "exercise": ["动手步骤 1", "动手步骤 2"],
    "duration": "20–30 分钟",
    "difficulty": "入门或进阶"
  },
  "alternatives": [
    {"id":"候选 id","whyForYou":"一句推荐原因"},
    {"id":"候选 id","whyForYou":"一句推荐原因"},
    {"id":"候选 id","whyForYou":"一句推荐原因"}
  ]
}`;
}

function materializePlanItem(
  candidate: LearningCandidate,
  ranked: RankedLearningCandidate | undefined,
  selection: LearningSelectionItem | undefined,
): LearningPlanItem {
  const matchedReasons = ranked?.reasons ?? [];
  const defaultReason = matchedReasons.length
    ? matchedReasons.join("；")
    : "这是今天候选中兼具学习价值与可操作性的项目。";
  const selectedLearn = Array.isArray(selection?.learn)
    ? selection.learn.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
  const selectedExercise = Array.isArray(selection?.exercise)
    ? selection.exercise.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
  const selectedText = (value: unknown): string | undefined =>
    typeof value === "string" && value.trim() ? value.trim() : undefined;
  return {
    id: candidate.id,
    name: candidate.name,
    description: candidate.description,
    url: candidate.url,
    kind: candidate.kind,
    source: candidate.source,
    installCommand: candidate.installCommand,
    status: candidate.status,
    whyForYou: selectedText(selection?.whyForYou) ?? defaultReason,
    whyNow:
      selectedText(selection?.whyNow) ?? `最近来自 ${candidate.source} 的活跃候选，适合做一次小范围实验。`,
    learn: selectedLearn.length
      ? selectedLearn
      : [`理解 ${candidate.name} 解决的问题`, "识别其中可以迁移到自己 Agent 工作流的实现模式"],
    exercise: selectedExercise.length
      ? selectedExercise
      : [
          "阅读 README 或 SKILL.md，把核心流程整理成一张不超过 8 项的检查清单",
          "找一个 20–50 行的真实小样例，按检查清单实际执行一次",
          "保存执行前后结果，并记录一个成功信号和一个局限",
        ],
    duration: selectedText(selection?.duration) ?? "20–30 分钟",
    difficulty: selectedText(selection?.difficulty) ?? "入门",
  };
}

export function buildLearningPlan(
  selection: LearningSelection,
  ranked: RankedLearningCandidate[],
  profile: InterestProfile,
  profileUser: string,
  date: string,
): LearningPlan {
  if (!ranked.length) throw new Error("No learning candidates available");

  const byId = new Map(ranked.map((item) => [item.candidate.id, item]));
  const validMain =
    selection.main && typeof selection.main === "object" && typeof selection.main.id === "string"
      ? selection.main
      : undefined;
  const selectedMain = validMain ? byId.get(validMain.id) : undefined;
  const mainRanked = selectedMain ?? ranked[0]!;
  const mainSelection = selectedMain ? validMain : undefined;
  const used = new Set([mainRanked.candidate.id]);

  const alternativeSelections = Array.isArray(selection.alternatives)
    ? selection.alternatives.filter(
        (item): item is LearningSelectionItem =>
          Boolean(item) && typeof item === "object" && typeof item.id === "string",
      )
    : [];
  const alternatives: LearningPlanItem[] = [];
  for (const selected of alternativeSelections) {
    const item = byId.get(selected.id);
    if (!item || used.has(item.candidate.id)) continue;
    alternatives.push(materializePlanItem(item.candidate, item, selected));
    used.add(item.candidate.id);
    if (alternatives.length === 3) break;
  }
  for (const item of ranked) {
    if (alternatives.length === 3) break;
    if (used.has(item.candidate.id)) continue;
    alternatives.push(materializePlanItem(item.candidate, item, undefined));
    used.add(item.candidate.id);
  }

  return {
    date,
    profileUser,
    starCount: profile.starCount,
    profileTopics: profile.topTopics,
    profileLanguages: profile.topLanguages,
    main: materializePlanItem(mainRanked.candidate, mainRanked, mainSelection),
    alternatives,
  };
}

function listItems(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

export function renderLearningReport(plan: LearningPlan): string {
  const topics = plan.profileTopics.length ? plan.profileTopics.join("、") : "AI 工具与 Agent 实践";
  const languages = plan.profileLanguages.length ? plan.profileLanguages.join("、") : "暂无明显语言偏好";
  const alternatives = plan.alternatives
    .map(
      (item, index) =>
        `### ${index + 1}. [${item.name}](${item.url})\n\n` +
        `${item.description}\n\n` +
        `- 推荐原因：${item.whyForYou}\n` +
        `- 来源：${item.source}${item.status ? `\n- 状态：${item.status}` : ""}`,
    )
    .join("\n\n");
  const install = plan.main.installCommand
    ? `\n### 安装命令\n\n\`\`\`bash\n${plan.main.installCommand}\n\`\`\`\n`
    : "";

  return `# 个性化 AI 小技术学习卡 ${plan.date}

> 基于 @${plan.profileUser} 的公开 GitHub Stars 生成：共 ${plan.starCount} 个 Star；主要兴趣为 ${topics}。

## 今日主学：${plan.main.name}

> 预计用时：${plan.main.duration} · 难度：${plan.main.difficulty}

${plan.main.description}

### 为什么适合你

${plan.main.whyForYou}

### 为什么现在学

${plan.main.whyNow}

### 今天掌握

${listItems(plan.main.learn ?? [])}

### 动手任务

${listItems(plan.main.exercise ?? [])}

### 原始资料

- [${plan.main.name}](${plan.main.url})
- 来源：${plan.main.source}${plan.main.status ? `\n- 状态：${plan.main.status}` : ""}
${install}
## 三个快速候选

${alternatives || "今天没有足够的高质量备选。"}

## 你的推荐画像

- 公开 Stars：${plan.starCount}
- 主要 Topic：${topics}
- 常见语言：${languages}

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。
`;
}
