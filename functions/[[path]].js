export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  if (!host.endsWith(".ru")) {
    return new Response(`Unsupported host: ${host}`, { status: 404 });
  }

  const slug = host.replace(/\.ru$/, "");

  let pathname = url.pathname;

  if (pathname === "/") {
    pathname = "/index.html";
  } else if (pathname.endsWith("/")) {
    pathname = pathname + "index.html";
  }

  const rewritten = new URL(`/${slug}${pathname}`, url.origin);
  return context.env.ASSETS.fetch(new Request(rewritten.toString(), context.request));
}
