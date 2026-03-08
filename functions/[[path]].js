export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  if (!host.endsWith(".ru")) {
    return new Response(`Unsupported host: ${host}`, { status: 404 });
  }

  const slug = host.replace(/\.ru$/, "");
  let pathname = url.pathname;

  // Нормализуем path
  if (!pathname || pathname === "") {
    pathname = "/";
  }

  // Если браузер уже попал на /slug или /slug/, убираем slug из path,
  // чтобы не получилось /slug/slug/
  if (pathname === `/${slug}` || pathname === `/${slug}/`) {
    pathname = "/";
  } else if (pathname.startsWith(`/${slug}/`)) {
    pathname = pathname.slice(slug.length + 1); // убираем "/slug"
    if (!pathname.startsWith("/")) {
      pathname = "/" + pathname;
    }
  }

  // Для главной страницы отдаём папку сайта, а не index.html,
  // чтобы не провоцировать редирект от ASSETS
  let assetPath;
  if (pathname === "/") {
    assetPath = `/${slug}/`;
  } else {
    assetPath = `/${slug}${pathname}`;
  }

  const rewritten = new URL(assetPath, url.origin);
  return context.env.ASSETS.fetch(new Request(rewritten.toString(), context.request));
}