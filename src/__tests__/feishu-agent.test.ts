import { describe, expect, it, vi } from "vitest";
import {
  MAX_RECENT_TURNS,
  appendConversationTurn,
  handleRequest,
  parseIncomingMessage,
  selectReportTypes,
  type AgentEnv,
  type ConversationMemory,
  type ExecutionContextLike,
  type KvLike,
} from "../../feishu-agent/src/index.ts";

class MemoryKv implements KvLike {
  readonly values = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.values.get(key) ?? null;
  }

  async put(key: string, value: string): Promise<void> {
    this.values.set(key, value);
  }

  async claim(key: string, value: string): Promise<boolean> {
    if (this.values.has(key)) return false;
    this.values.set(key, value);
    return true;
  }

  async delete(key: string): Promise<void> {
    this.values.delete(key);
  }
}

function env(overrides: Partial<AgentEnv> = {}): AgentEnv {
  return {
    FEISHU_APP_ID: "cli_test",
    FEISHU_APP_SECRET: "secret",
    FEISHU_VERIFICATION_TOKEN: "verify-me",
    DASHSCOPE_API_KEY: "dashscope-secret",
    PAGES_URL: "https://example.test/agents-radar",
    ...overrides,
  };
}

function context(): ExecutionContextLike & { jobs: Promise<unknown>[] } {
  const jobs: Promise<unknown>[] = [];
  return {
    jobs,
    waitUntil(promise) {
      jobs.push(promise);
    },
  };
}

describe("Feishu AI agent", () => {
  it("answers a valid Feishu URL verification challenge", async () => {
    const request = new Request("https://agent.example.test/feishu/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "url_verification",
        token: "verify-me",
        challenge: "challenge-code",
      }),
    });

    const response = await handleRequest(request, env(), context(), vi.fn());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ challenge: "challenge-code" });
  });

  it("rejects a URL verification challenge with the wrong token", async () => {
    const request = new Request("https://agent.example.test/feishu/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "url_verification",
        token: "not-the-secret",
        challenge: "challenge-code",
      }),
    });

    const response = await handleRequest(request, env(), context(), vi.fn());

    expect(response.status).toBe(401);
  });

  it("keeps 20 complete rounds and rolls older dialogue into long-term memory", () => {
    let memory: ConversationMemory = { summary: "", turns: [] };

    for (let i = 1; i <= 21; i += 1) {
      memory = appendConversationTurn(memory, {
        user: `question ${i}`,
        assistant: `answer ${i}`,
        at: `2026-09-01T00:${String(i).padStart(2, "0")}:00.000Z`,
      });
    }

    expect(MAX_RECENT_TURNS).toBe(20);
    expect(memory.turns).toHaveLength(20);
    expect(memory.turns[0]?.user).toBe("question 2");
    expect(memory.turns.at(-1)?.assistant).toBe("answer 21");
    expect(memory.summary).toContain("question 1");
    expect(memory.summary).toContain("answer 1");
  });

  it("parses a user question and removes the bot mention placeholder", () => {
    const message = parseIncomingMessage({
      schema: "2.0",
      header: {
        event_id: "evt-1",
        event_type: "im.message.receive_v1",
        token: "verify-me",
      },
      event: {
        sender: { sender_type: "user", sender_id: { open_id: "ou_user" } },
        message: {
          message_id: "om_message",
          chat_id: "oc_chat",
          chat_type: "group",
          message_type: "text",
          content: JSON.stringify({ text: "@_user_1 今天有什么好玩的 Skill？" }),
          mentions: [{ key: "@_user_1", name: "AI Radar" }],
        },
      },
    });

    expect(message).toMatchObject({
      eventId: "evt-1",
      messageId: "om_message",
      chatId: "oc_chat",
      senderOpenId: "ou_user",
      text: "今天有什么好玩的 Skill？",
    });
  });

  it("ignores an unmentioned group message", () => {
    expect(
      parseIncomingMessage({
        schema: "2.0",
        header: {
          event_id: "evt-unmentioned",
          event_type: "im.message.receive_v1",
        },
        event: {
          sender: { sender_type: "user", sender_id: { open_id: "ou_user" } },
          message: {
            message_id: "om_unmentioned",
            chat_id: "oc_group",
            chat_type: "group",
            message_type: "text",
            content: JSON.stringify({ text: "大家今天学什么？" }),
          },
        },
      }),
    ).toBeNull();
  });

  it("routes a Skill or MCP question to personalized and CLI reports", () => {
    expect(selectReportTypes("今天有什么好玩的 Skill？")).toEqual(["ai-learning", "ai-cli", "ai-trending"]);
    expect(selectReportTypes("MCP 最近有什么变化？")).toEqual(["ai-learning", "ai-cli", "ai-trending"]);
  });

  it("retrieves radar context, asks Qwen, replies once, and remembers the round", async () => {
    const state = new MemoryKv();
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, init });
      if (url.endsWith("/manifest.json")) {
        return Response.json({
          dates: [
            {
              date: "2026-09-01",
              reports: ["ai-learning", "ai-cli", "ai-trending"],
            },
          ],
        });
      }
      if (url.includes("/digests/")) return new Response("# Radar source\nA useful Skill update.");
      if (url.includes("dashscope.aliyuncs.com")) {
        return Response.json({ choices: [{ message: { content: "今天建议你练习这个 Skill。" } }] });
      }
      if (url.endsWith("/auth/v3/tenant_access_token/internal")) {
        return Response.json({ code: 0, tenant_access_token: "tenant-token", expire: 7200 });
      }
      if (url.includes("/im/v1/messages/om_message/reply")) return Response.json({ code: 0 });
      return new Response("unexpected", { status: 500 });
    });
    const event = {
      schema: "2.0",
      header: {
        event_id: "evt-answer-1",
        event_type: "im.message.receive_v1",
        token: "verify-me",
      },
      event: {
        sender: { sender_type: "user", sender_id: { open_id: "ou_user" } },
        message: {
          message_id: "om_message",
          chat_id: "oc_chat",
          chat_type: "p2p",
          message_type: "text",
          content: JSON.stringify({ text: "今天有什么好玩的 Skill？" }),
        },
      },
    };
    const ctx = context();
    const request = new Request("https://agent.example.test/feishu/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(event),
    });

    const response = await handleRequest(request, env({ STATE: state }), ctx, fetchMock as typeof fetch);
    expect(response.status).toBe(200);
    expect(ctx.jobs).toHaveLength(1);

    const duplicateCtx = context();
    const duplicateRequest = new Request("https://agent.example.test/feishu/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(event),
    });
    await handleRequest(duplicateRequest, env({ STATE: state }), duplicateCtx, fetchMock as typeof fetch);
    await Promise.all([...ctx.jobs, ...duplicateCtx.jobs]);

    const reply = calls.find((call) => call.url.includes("/im/v1/messages/om_message/reply"));
    expect(reply).toBeDefined();
    expect(String(reply?.init?.body)).toContain("今天建议你练习这个 Skill");
    const saved = JSON.parse(state.values.get("conversation:oc_chat:ou_user") ?? "{}") as ConversationMemory;
    expect(saved.turns).toHaveLength(1);
    expect(saved.turns[0]?.user).toBe("今天有什么好玩的 Skill？");

    expect(calls.filter((call) => call.url.includes("dashscope.aliyuncs.com"))).toHaveLength(1);
    expect(calls.filter((call) => call.url.includes("/reply"))).toHaveLength(1);
  });

  it("clears the current conversation without calling the model", async () => {
    const state = new MemoryKv();
    state.values.set(
      "conversation:oc_chat:ou_user",
      JSON.stringify({
        summary: "older context",
        turns: [{ user: "old question", assistant: "old answer", at: "2026-08-31T00:00:00Z" }],
      }),
    );
    const calls: string[] = [];
    const fetchMock = vi.fn(async (input: string | URL | Request) => {
      const url = String(input);
      calls.push(url);
      if (url.endsWith("/auth/v3/tenant_access_token/internal")) {
        return Response.json({ code: 0, tenant_access_token: "tenant-token", expire: 7200 });
      }
      if (url.includes("/im/v1/messages/om_reset/reply")) return Response.json({ code: 0 });
      return new Response("unexpected", { status: 500 });
    });
    const ctx = context();
    const request = new Request("https://agent.example.test/feishu/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        schema: "2.0",
        header: {
          event_id: "evt-reset",
          event_type: "im.message.receive_v1",
          token: "verify-me",
        },
        event: {
          sender: { sender_type: "user", sender_id: { open_id: "ou_user" } },
          message: {
            message_id: "om_reset",
            chat_id: "oc_chat",
            chat_type: "p2p",
            message_type: "text",
            content: JSON.stringify({ text: "/reset" }),
          },
        },
      }),
    });

    await handleRequest(request, env({ STATE: state }), ctx, fetchMock as typeof fetch);
    await Promise.all(ctx.jobs);

    expect(state.values.has("conversation:oc_chat:ou_user")).toBe(false);
    expect(calls.some((url) => url.includes("dashscope.aliyuncs.com"))).toBe(false);
    expect(calls.some((url) => url.includes("/im/v1/messages/om_reset/reply"))).toBe(true);
  });
});
