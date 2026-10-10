const base = "http://127.0.0.1:3000";
const urls = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/robots.txt",
  "/sitemap.xml",
  "/about.html",
  "/services.html",
  "/projects.html",
  "/index.html",
  "/does-not-exist",
];

function pick(html, re) {
  return html.match(re)?.[1] || "";
}

for (const path of urls) {
  const res = await fetch(base + path, { redirect: "manual" });
  const loc = res.headers.get("location") || "";
  const body = await res.text();
  const title = pick(body, /<title>([^<]*)<\/title>/i);
  const h1s = [...body.matchAll(/<h1\b/gi)].length;
  const canon = pick(body, /rel="canonical"\s+href="([^"]+)"/i) || pick(body, /href="([^"]+)"\s+rel="canonical"/i);
  const jsonlds = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  let jsonOk = jsonlds.length ? "valid" : "none";
  for (const block of jsonlds) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      jsonOk = `INVALID: ${error.message}`;
      break;
    }
  }
  const selectors = {
    services: body.includes("data-services-grid") || body.includes("data-service-page-list"),
    projects: body.includes("data-projects") || body.includes("data-portfolio-grid"),
    clients: body.includes("data-clients"),
    stats: body.includes("data-stats") || body.includes("data-about-stat"),
    testimonials: body.includes("data-testimonial-stage"),
    whatsapp: body.includes("data-whatsapp-action"),
  };
  console.log(
    JSON.stringify({
      status: res.status,
      path,
      loc,
      title,
      h1s,
      canon,
      jsonOk,
      sitemapLooksHtml: path === "/sitemap.xml" && body.includes("<html"),
      robotsOk: path === "/robots.txt" && body.includes("Sitemap:"),
      selectors,
    }),
  );
}
