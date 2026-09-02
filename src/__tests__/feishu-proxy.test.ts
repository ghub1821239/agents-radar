import { describe, expect, it, vi } from "vitest";
// @ts-expect-error Pages executes this JavaScript module directly.
import { proxyRequest } from "../../feishu-proxy/output/_worker.js";

describe("Feishu Pages proxy", () => {
  it("forwards the Feishu event request through the internal Worker binding", async () => {
    const upstream = vi.fn(async (_request: Request) => Response.json({ challenge: "ok" }));
    const request = new Request("https://proxy.pages.dev/feishu/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "url_verification" }),
    });

    const response = await proxyRequest(request, { AGENT: { fetch: upstream } });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ challenge: "ok" });
    expect(upstream).toHaveBeenCalledOnce();
    expect(upstream.mock.calls[0]?.[0]).toBe(request);
  });

  it("does not expose unrelated paths through the internal binding", async () => {
    const upstream = vi.fn();

    const response = await proxyRequest(new Request("https://proxy.pages.dev/private"), {
      AGENT: { fetch: upstream },
    });

    expect(response.status).toBe(404);
    expect(upstream).not.toHaveBeenCalled();
  });
});
