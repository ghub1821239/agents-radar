export async function proxyRequest(request, env) {
  const { pathname } = new URL(request.url);
  const allowed =
    (pathname === "/feishu/events" && request.method === "POST") ||
    (pathname === "/health" && request.method === "GET");

  if (!allowed) {
    return new Response("Not Found", { status: 404 });
  }

  return env.AGENT.fetch(request);
}

export default {
  fetch: proxyRequest,
};
