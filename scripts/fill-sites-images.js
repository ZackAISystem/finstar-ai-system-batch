// scripts/fill-sites-images.js
const fs = require("fs");
const path = require("path");

const SITES_DIR = path.join(process.cwd(), "data", "sites");

// какие поля заполняем + их хвосты путей (относительно /img/<template>/...)
const IMAGE_MAP = {
  header_logo_src_fixed: "header/header-logo.png",
  hero_image_main_src_fixed: "hero/coin-graph.png",
  hero_image_percent_src_fixed: "hero/percent.png",

  advantages_1_icon_src_fixed: "advantages/icon-briefcase.png",
  advantages_2_icon_src_fixed: "advantages/icon-tools.png",
  advantages_3_icon_src_fixed: "advantages/icon-jar.png",

  whyus_1_icon_src_fixed: "whyus/icon-magnifier.png",
  whyus_1_image_src_fixed: "whyus/coin-ring.png",
  whyus_2_icon_src_fixed: "whyus/icon-star.png",
  whyus_2_image_src_fixed: "whyus/coin-side.png",

  investment_1_icon_src_fixed: "investment/icon-percent.png",
  investment_2_icon_src_fixed: "investment/icon-plane.png",
  investment_3_icon_src_fixed: "investment/icon-ruble.png",
  investment_4_icon_src_fixed: "investment/icon-cash.png",

  contact_form_image_src_fixed: "contact/cta-house.png",
  footer_logo_src_fixed: "footer/logo-finstar.png",
};

function main() {
  const files = fs.readdirSync(SITES_DIR).filter((f) => f.endsWith(".json"));

  let updated = 0;
  let skipped = 0;

  for (const f of files) {
    const p = path.join(SITES_DIR, f);
    const raw = fs.readFileSync(p, "utf8");

    let cur;
    try {
      cur = JSON.parse(raw);
    } catch (e) {
      console.error(`SKIP (bad json): ${f}`);
      skipped++;
      continue;
    }

    const template = (cur.template || "").trim();
    if (!/^template_\d+$/.test(template)) {
      // если template пустой/невалидный — не лезем
      skipped++;
      continue;
    }

    let out = raw;

    // Подставляем ТОЛЬКО если значение пустое ""
    for (const [key, tail] of Object.entries(IMAGE_MAP)) {
      const value = `/img/${template}/${tail}`;

      // заменяем: "key": ""  -> "key": "/img/template_X/...."
      // (оставляет все пробелы/переносы как есть)
      const re = new RegExp(`("${escapeRegExp(key)}"\\s*:\\s*)"\\s*"`, "g");
      out = out.replace(re, `$1"${value}"`);
    }

    if (out !== raw) {
      fs.writeFileSync(p, out, "utf8");
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`Done. Updated: ${updated}, Skipped: ${skipped}`);
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main();