export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  if (!host.endsWith(".ru")) {
    return new Response(`Unsupported host: ${host}`, { status: 404 });
  }

  const slug = host.replace(/\.ru$/, "");
  let pathname = url.pathname || "/";

  let assetPath;

  // Главная домена
  if (pathname === "/") {
    assetPath = `/${slug}/index.html`;
  }
  // Если браузер уже попал на /slug или /slug/
  else if (pathname === `/${slug}` || pathname === `/${slug}/`) {
    assetPath = `/${slug}/index.html`;
  }
  // Если браузер уже на /slug/что-то
  else if (pathname.startsWith(`/${slug}/`)) {
    assetPath = pathname;
    if (assetPath.endsWith("/")) {
      assetPath += "index.html";
    }
  }
  // Любой другой путь внутри сайта
  else {
    assetPath = `/${slug}${pathname}`;
    if (assetPath.endsWith("/")) {
      assetPath += "index.html";
    }
  }

  let response = await context.env.ASSETS.fetch(
    new Request(new URL(assetPath, url.origin).toString(), context.request)
  );

  // Если ASSETS всё же вернул редирект — тихо догоняем его сами,
  // чтобы браузер не менял адрес на /slug/
  if ([301, 302, 307, 308].includes(response.status)) {
    const location = response.headers.get("Location");
    if (location) {
      const followUrl = new URL(location, url.origin);
      response = await context.env.ASSETS.fetch(
        new Request(followUrl.toString(), context.request)
      );
    }
  }

  return response;
}