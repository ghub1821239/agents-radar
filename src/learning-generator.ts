/** Generate only the personalized AI learning card, reusable from the daily job and manual workflow. */

import { pathToFileURL } from "node:url";
import { loadConfig } from "./config.ts";
import { toCstDateStr } from "./date.ts";
import { fetchSkillsData, type GitHubItem } from "./github.ts";
import {
  buildInterestProfile,
  buildLearningPlan,
  buildLearningSelectionPrompt,
  collectLearningCandidates,
  fetchCuratedSkills,
  fetchRecentSkillPullRequests,
  fetchStarredRepos,
  rankLearningCandidates,
  renderLearningReport,
  type LearningPlan,
  type LearningSelection,
} from "./learning.ts";
import { autoGenFooter, callLlm, parseLlmJson, saveFile } from "./report.ts";
import { fetchTrendingData, type TrendingData } from "./trending.ts";

export interface GenerateLearningOptions {
  now: Date;
  dateStr: string;
  profileUser: string;
  skillsRepo: string;
  skillsData?: { prs: GitHubItem[]; issues: GitHubItem[] };
  trendingData?: TrendingData;
}

export async function generatePersonalizedLearning(
  options: GenerateLearningOptions,
): Promise<LearningPlan | null> {
  const { now, dateStr, profileUser, skillsRepo } = options;
  const [skillsData, trendingData, starredRepos, curatedSkills, recentSkillPrs] = await Promise.all([
    options.skillsData ? Promise.resolve(options.skillsData) : fetchSkillsData(skillsRepo),
    options.trendingData ? Promise.resolve(options.trendingData) : fetchTrendingData(),
    profileUser
      ? fetchStarredRepos(profileUser).catch((err) => {
          console.error(`  [learning/stars] fetch failed: ${err}`);
          return [];
        })
      : Promise.resolve([]),
    fetchCuratedSkills().catch((err) => {
      console.error(`  [learning/curated] fetch failed: ${err}`);
      return [];
    }),
    fetchRecentSkillPullRequests(skillsRepo, new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)).catch(
      (err) => {
        console.error(`  [learning/recent-skills] fetch failed: ${err}`);
        return [];
      },
    ),
  ]);

  const profile = buildInterestProfile(starredRepos);
  const candidates = collectLearningCandidates(
    { prs: [...recentSkillPrs, ...skillsData.prs], issues: skillsData.issues },
    trendingData,
    curatedSkills,
  );
  const ranked = rankLearningCandidates(profile, candidates);
  console.log(
    `  [learning] profile @${profileUser || "unknown"}: ${starredRepos.length} stars, ` +
      `${recentSkillPrs.length} recent Skill PRs, ${candidates.length} candidates, ` +
      `topics: ${profile.topTopics.join(", ") || "none"}`,
  );

  if (!ranked.length) {
    console.warn("  [learning] No candidates available — skipping personalized learning card.");
    return null;
  }

  let selection: LearningSelection = {};
  const prompt = buildLearningSelectionPrompt(profile, ranked, profileUser || "anonymous", dateStr);
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      selection = parseLlmJson<LearningSelection>(await callLlm(prompt, 2048));
      break;
    } catch (err) {
      const action = attempt < 2 ? "retrying" : "using deterministic fallback";
      console.error(`  [learning] selection attempt ${attempt} failed (${action}): ${err}`);
    }
  }

  const plan = buildLearningPlan(selection, ranked, profile, profileUser || "anonymous", dateStr);
  const report = renderLearningReport(plan) + autoGenFooter("zh");
  console.log(`  Saved ${saveFile(report, dateStr, "ai-learning.md")}`);
  console.log(`  Saved ${saveFile(JSON.stringify(plan, null, 2), dateStr, "learning.json")}`);
  return plan;
}

async function main(): Promise<void> {
  if (!process.env["GITHUB_TOKEN"]) throw new Error("Missing required environment variable: GITHUB_TOKEN");
  const now = new Date();
  const dateStr = toCstDateStr(now);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const profileUser = process.env["PROFILE_GITHUB_USER"] || digestRepo.split("/")[0] || "";
  const { skillsRepo } = loadConfig();
  await generatePersonalizedLearning({
    now,
    dateStr,
    profileUser,
    skillsRepo,
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
}
