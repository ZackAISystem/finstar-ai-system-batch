// scripts/force-sites-template.js
const fs = require("fs");
const path = require("path");

const SITES_DIR = path.join(process.cwd(), "data", "sites");

/**
 * ВАЖНО:
 * - Это НЕ JSON.stringify. Это строковый шаблон, чтобы совпало "до запятой" и по пустым строкам.
 * - Подставляем только slug + template (и domain_russia пустой).
 */
function renderExact({ slug, template }) {
  const t = (template && String(template).trim()) ? String(template).trim() : "";

  return `{
  "domain_russia": "",
  "slug": "${escapeJson(slug)}",
  "template": "${escapeJson(t)}",

  "header_logo_src_fixed": "",
  "header_logo_alt_fixed": "",

  "header_menu_item_1_fixed": "",
  "header_menu_item_2_fixed": "",
  "header_menu_item_3_fixed": "",
  "header_menu_item_4_fixed": "",

  "header_menu_href_1_fixed": "#why",
  "header_menu_href_2_fixed": "#advantages",
  "header_menu_href_3_fixed": "#investment",
  "header_menu_href_4_fixed": "#contact",

  "header_cta_button_fixed": "",
  "header_cta_href_fixed": "#contact",

  "hero_title_main_agent": "",
  "hero_title_accent_agent": "",
  "hero_subtitle_agent": "",
  "hero_description_agent": "",
  "hero_cta_button_fixed": "",
  "hero_fact_value_fixed": "Более 6 млрд ₽",
  "hero_fact_label_fixed": "Стоимость активов фонда",

  "hero_image_main_src_fixed": "",
  "hero_image_percent_src_fixed": "",

  "advantages_intro_text": "УК «Финстар Капитал» — профессиональное управление инвестициями под цели инвестора",

  "advantages_1_title_fixed": "Формирование фонда",
  "advantages_1_value_fixed": "от 25 млн руб.",
  "advantages_1_icon_src_fixed": "",

  "advantages_2_title_fixed": "Опыт и экспертиза",
  "advantages_2_value_fixed": "Finstar Group",
  "advantages_2_icon_src_fixed": "",

  "advantages_3_title_fixed": "Инфраструктура",
  "advantages_3_value_fixed": "группы Finstar",
  "advantages_3_icon_src_fixed": "",

  "whyus_title_fixed": "Инвестировать безопасно: преимущества ЗПИФ «Залоговые займы»",

  "whyus_1_title_fixed": "Низкие риски",
  "whyus_1_text_fixed": "Залог в 2 раза больше суммы займа\\nЛицензия ЦБ РФ № 21-000-1-01096 от 19.03.2024\\n75 % просрочек урегулируются досудебно",
  "whyus_1_cta_fixed": "",
  "whyus_1_icon_src_fixed": "",
  "whyus_1_image_src_fixed": "",

  "whyus_2_title_fixed": "Контроль и оценка",
  "whyus_2_text_fixed": "Проверка заёмщика через ФНС, ФССП и Росреестр\\nОценка залога независимыми экспертами\\nУтверждение на кредитном комитете",
  "whyus_2_cta_fixed": "",
  "whyus_2_icon_src_fixed": "",
  "whyus_2_image_src_fixed": "",

  "investment_title_fixed": "Варианты инвестировать в залоговые займы Финстар",

  "investment_1_title_fixed": "Покупка паев ЗПИФ «Залоговые займы»",
  "investment_1_min_label_fixed": "Минимальные вложения",
  "investment_1_min_value_fixed": "от 1 млн. руб.",
  "investment_1_profit_label_fixed": "Целевая доходность (% годовых)",
  "investment_1_profit_value_fixed": "30-40%",
  "investment_1_icon_src_fixed": "",

  "investment_2_title_fixed": "Договор займа с ЗПИФ «Залоговые займы»",
  "investment_2_min_label_fixed": "Минимальные вложения",
  "investment_2_min_value_fixed": "от 5 млн. руб.",
  "investment_2_profit_label_fixed": "Целевая доходность (% годовых)",
  "investment_2_profit_value_fixed": "Ставка ЦБ + 2-4%",
  "investment_2_icon_src_fixed": "",

  "investment_3_title_fixed": "Покупка паев с гарантией минимальной доходности",
  "investment_3_min_label_fixed": "Минимальные вложения",
  "investment_3_min_value_fixed": "от 20 млн. руб.",
  "investment_3_guarantee_label_fixed": "Минимальная гарантированная доходность (% годовых)",
  "investment_3_guarantee_value_fixed": "Ставка ЦБ + 2-4%",
  "investment_3_profit_label_fixed": "Целевая доходность (% годовых)",
  "investment_3_profit_value_fixed": "30-40%",
  "investment_3_icon_src_fixed": "",

  "investment_4_title_fixed": "Прямые инвестиции",
  "investment_4_min_label_fixed": "Минимальные вложения",
  "investment_4_min_value_fixed": "от 100 млн. руб.",
  "investment_4_profit_label_fixed": "Целевая доходность (% годовых)",
  "investment_4_profit_value_fixed": "30-40%",
  "investment_4_icon_src_fixed": "",

  "contact_form_title_agent": "",
  "contact_form_text_agent": "",
  "contact_form_button_text_fixed": "",
  "contact_form_image_src_fixed": "",
  "contact_form_success_message_fixed": "Спасибо! Мы свяжемся с вами.",

  "footer_logo_src_fixed": "",
  "footer_site_url_fixed": "https://finstar-capital.ru",
  "footer_address_fixed": "123112, г. Москва, Пресненская наб., д. 12, помещ. 6/52",
  "footer_phone_fixed": "+7 495 745-55-57",
  "footer_email_fixed": "info@finstar-capital.ru",
  "footer_slogan_fixed": "УПРАВЛЕНИЕ ИНВЕСТИЦИЯМИ ПАЕВЫЕ ИНВЕСТИЦИОННЫЕ ФОНДЫ ИНДИВИДУАЛЬНЫЕ СТРАТЕГИИ",

  "footer_license_fixed": "Общество с ограниченной ответственностью «Управляющая компания «Финстар Капитал» (ООО УК «Финстар Капитал») — лицензия на осуществление деятельности по управлению инвестиционными фондами, паевыми инвестиционными фондами и негосударственными пенсионными фондами № 21-000-1-01096 от 19 марта 2024 года выдана Банком России без ограничения срока действия. ООО УК «Финстар Капитал» не совмещает деятельность по доверительному управлению паевыми инвестиционными фондами с деятельностью по управлению ценными бумагами.",

  "footer_disclaimer_fixed": "Получить подробную информацию о деятельности управляющей компании, о паевых инвестиционных фондах, о работе пункта приема заявок на приобретение и погашение инвестиционных паев, ознакомиться с правилами доверительного управления паевыми инвестиционными фондами и иными документами можно в офисе ООО УК «Финстар Капитал» по адресу: 123112, г. Москва, вн. тер. г. муниципальный округ Пресненский, Пресненская наб., д. 12, помещ. 6/52, по телефону +7 495 745 55 57 и на сайте в сети интернет https://finstar-capital.ru. Стоимость инвестиционных паев может увеличиваться и уменьшаться, результаты инвестирования в прошлом не определяют доходы в будущем, государство не гарантирует доходность инвестиций в паевые инвестиционные фонды, прежде чем приобрести инвестиционный пай, следует внимательно ознакомиться с правилами доверительного управления. Риски, связанные с финансовыми инструментами, не подлежат страхованию в соответствии с Федеральным законом от 23 декабря 2003 года № 177-ФЗ «О страховании вкладов физических лиц в банках Российской Федерации». ООО УК «Финстар Капитал». Варианты урегулирования споров для физических лиц: досудебное урегулирование — направление претензии по адресу 123112, г. Москва, вн. тер. г. муниципальный округ Пресненский, наб. Пресненская, д. 12, помещ. 6/52, ООО УК «Финстар Капитал»; направление претензии в ЦБ/СРО НАУФОР. Судебное урегулирование — при невозможности решения спора в досудебном порядке, физическое лицо обращается в суд общей юрисдикции. Варианты урегулирования споров для юридических лиц: досудебное урегулирование — направление претензии по адресу 123112, г. Москва, вн. тер. г. муниципальный округ Пресненский, наб. Пресненская, д. 12, помещ. 6/52, ООО УК «Финстар Капитал»; направление претензии в ЦБ/СРО НАУФОР. Судебное урегулирование — при невозможности решения спора в досудебном порядке, юридическое лицо обращается в Арбитражный суд г. Москвы."
}
`;
}

function escapeJson(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
}

function main() {
  const files = fs.readdirSync(SITES_DIR).filter((f) => f.endsWith(".json"));
  let written = 0;

  for (const f of files) {
    const p = path.join(SITES_DIR, f);
    const cur = JSON.parse(fs.readFileSync(p, "utf8"));

    const slug = cur.slug || path.basename(f, ".json");
    const template = cur.template || "";

    const out = renderExact({ slug, template });
    fs.writeFileSync(p, out, "utf8");
    written++;
  }

  console.log(`Done. Rewritten: ${written}`);
}

main();