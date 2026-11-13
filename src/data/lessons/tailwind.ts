import type { Lesson } from "../types";

/** Tailwind CSS v4 sintaksisi ilə. */
export const tailwind: Lesson[] = [
  {
    slug: "giris",
    title: "Tailwind nədir? Utility-first fəlsəfəsi",
    intro: "Tailwind CSS — hazır kiçik class-lar (utility) toplusudur: p-4, text-lg, bg-sky-500. CSS faylı yazmaq əvəzinə, stili birbaşa HTML-də class-larla yığırsan.",
    sections: [
      {
        level: "baslangic",
        title: "Utility class-lar",
        blocks: [
          { t: "analogy", text: "Klassik CSS — hər paltarı dərziyə sifarişlə tikdirmək: «.kart» adlı xüsusi kostyum. Tailwind — hazır LEGO hissələri: «padding 4», «yuvarlaq künc», «kölgə» — onları birləşdirib istədiyin formanı dərhal yığırsan." },
          { t: "code", lang: "html", code: `<!-- Klassik CSS -->
<div class="kart">Salam</div>
<style>
  .kart { padding: 1rem; border-radius: 0.75rem; background: #0c111c; color: white; box-shadow: 0 4px 6px rgb(0 0 0 / 0.3); }
</style>

<!-- Tailwind -->
<div class="p-4 rounded-xl bg-slate-900 text-white shadow-md">Salam</div>` },
          { t: "terms", items: [
            ["utility class", "bir iş görən kiçik class: p-4 = padding: 1rem."],
            ["p-4", "padding; 4 × 0.25rem = 1rem."],
            ["rounded-xl", "border-radius."],
            ["bg-slate-900", "fon rəngi: slate palitrası, 900 tonu."],
            ["text-white", "mətn rəngi."],
            ["shadow-md", "orta kölgə."],
          ]},
          { t: "tip", text: "Bu saytın özü Tailwind 4 ilə yazılıb. Məşq səhifəsində Tailwind işə salınmır — kodunu AI müəllim yoxlayır; real layihədə nəticəni dərhal brauzerdə görəcəksən." },
        ],
      },
      {
        level: "orta",
        title: "Niyə Tailwind?",
        blocks: [
          { t: "list", items: [
            "Ad fikirləşmək yoxdur (.kart-wrapper-inner-2).",
            "CSS böyümür: eyni class-lar təkrar işlənir, yalnız istifadə olunanlar build-ə düşür.",
            "Dizayn sistemi daxildədir: boşluqlar, rənglər, ölçülər ardıcıl şkaladadır.",
            "Dəyişiklik lokaldır: class-ı silsən, başqa səhifə sınmır.",
            "Mənfi tərəf: HTML-də uzun class siyahıları — komponentlərlə (React) həll olunur.",
          ]},
          { t: "mistake", lang: "html", wrong: `<div style="padding: 16px; color: red">`, right: `<div class="p-4 text-red-500">`, why: "Inline style dizayn şkalasından kənardır, hover/responsive dəstəkləmir. Tailwind class-ları şkalaya bağlıdır və bütün halları (hover:, md:) dəstəkləyir." },
          { t: "mistake", lang: "html", wrong: `<div class="p-[13px] mt-[7px] text-[#3a3b3c]">`, right: `<div class="p-3 mt-2 text-slate-700">`, why: "Hər yerdə ixtiyari dəyər ([...]) dizayn sistemini dağıdır. Şkaladakı dəyəri seç; həqiqətən lazım olanda tema-ya əlavə et." },
        ],
      },
      {
        level: "senior",
        title: "Tailwind necə işləyir",
        blocks: [
          { t: "p", text: "Tailwind build zamanı fayllarını (HTML, JSX, TSX) tarayır, işlədilən class adlarını tapır və YALNIZ onlar üçün CSS yaradır. v4-də mühərrik Rust-la yazılıb (Oxide), konfiqurasiya CSS-in özündədir (@theme), bütün dəyərlər CSS dəyişənləri kimi açılır, cascade layers (@layer theme, base, components, utilities) ilə spesifiklik idarə olunur." },
          { t: "list", items: [
            "Class adları kodda TAM yazılmalıdır: \"bg-\" + reng kimi dinamik qurulan ad tapılmır.",
            "Utilities layer-i ən sonda gəlir — utility class-lar komponent stillərini etibarlı şəkildə üstələyir.",
            "Təhlükəsizlik: istifadəçinin class adı daxil etməsinə icazə vermə (profil «stili») — utility-lərlə səhifəni örtən saxta elementlər (fixed inset-0 z-50) qurmaq olar: clickjacking/phishing UI. Yalnız ağ siyahıdan variant seçdir.",
          ]},
          { t: "qa", items: [
            ["Tailwind build-i niyə kiçikdir?", "Yalnız kodda tapılan class-lar üçün CSS yaradılır."],
            ["Utility-first-in əsas üstünlüyü?", "Lokal, ardıcıl dizayn şkalası, ad fikirləşmədən sürətli inkişaf və böyüməyən CSS."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "p-4 nəyə bərabərdir?", options: ["4px", "1rem (16px)", "4rem"], answer: 1, why: "Şkala: 1 vahid = 0.25rem." },
        ],
      },
    ],
    exercise: {
      task: "Tailwind class-ları ilə kart yaz: tünd fon, ağ mətn, padding 6, yuvarlaq künc, kölgə, max-w-sm, başlıq (text-xl font-bold), paraqraf (text-slate-400), mavi düymə (px-4 py-2 rounded-lg).",
      starter: `<div class="">\n  <h2 class="">Kurs</h2>\n  <p class="">Tailwind öyrənirəm.</p>\n  <button class="">Başla</button>\n</div>\n`,
      expect: "bg-slate-900 (və ya oxşar), text-white, p-6, rounded-xl/2xl, shadow, max-w-sm; başlıq text-xl font-bold; p text-slate-400; düymə bg-sky-500 px-4 py-2 rounded-lg; inline style və ixtiyari [] dəyərlər yoxdur.",
    },
  },
  {
    slug: "qurulus",
    title: "Quraşdırma və konfiqurasiya",
    intro: "Tailwind 4 qurmaq çox sadədir: paket + bir CSS sətri. Konfiqurasiya JS faylında yox, CSS-in içində — @theme, @source, @plugin direktivləri ilə.",
    sections: [
      {
        level: "baslangic",
        title: "Vite / Next.js-də quraşdırma",
        blocks: [
          { t: "analogy", text: "Tailwind 3 — mebeli hissə-hissə yığmaq idi (config faylları, content yolları). Tailwind 4 — hazır mebel: qutunu aç, bir sətir yaz, işləyir." },
          { t: "code", lang: "bash", code: `# Next.js
npm install tailwindcss @tailwindcss/postcss

# Vite
npm install tailwindcss @tailwindcss/vite` },
          { t: "code", lang: "css", code: `/* app/globals.css */
@import "tailwindcss";` },
          { t: "terms", items: [
            ["@import \"tailwindcss\"", "Tailwind-in bütün qatlarını (theme, base, utilities) qoşur."],
            ["@tailwindcss/postcss", "PostCSS plagini (Next.js)."],
            ["@tailwindcss/vite", "Vite plagini (daha sürətli)."],
            ["Preflight", "Tailwind-in reset stilləri (base layer)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "CSS-də konfiqurasiya",
        blocks: [
          { t: "code", lang: "css", code: `@import "tailwindcss";

@source "../components";          /* əlavə taranacaq qovluq */
@plugin "@tailwindcss/typography"; /* plagin */

@theme {
  --color-brand: #38bdf8;          /* → bg-brand, text-brand */
  --font-display: "Inter", sans-serif;  /* → font-display */
}

@layer base {
  h1 { @apply text-3xl font-black; }
}` },
          { t: "list", items: [
            "Fayllar avtomatik tapılır (.gitignore-dakılar xaric); xüsusi yollar @source ilə.",
            "Tailwind 3-dən keçid: npx @tailwindcss/upgrade — konfiqurasiyanı CSS-ə köçürür.",
            "VS Code üçün «Tailwind CSS IntelliSense» — avtomatik tamamlama və rəng önizləmə.",
            "Class sırası üçün prettier-plugin-tailwindcss.",
          ]},
          { t: "mistake", lang: "css", wrong: `@tailwind base;\n@tailwind components;\n@tailwind utilities;`, right: `@import "tailwindcss";`, why: "@tailwind direktivləri v3 sintaksisidir; v4-də bir import kifayətdir." },
        ],
      },
      {
        level: "senior",
        title: "Build, monorepo, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Monorepoda paylaşılan UI paketini @source ilə qoş — yoxsa onun class-ları build-ə düşmür.",
            "Brauzer dəstəyi: v4 müasir xüsusiyyətlərə (@property, color-mix, cascade layers) əsaslanır — Safari 16.4+, Chrome 111+. Köhnə brauzerlər lazımdırsa v3.",
            "CDN skripti (@tailwindcss/browser) yalnız prototip üçün — prod-da build et (ölçü, performans).",
            "Təhlükəsizlik: CDN-dən Tailwind/plagin skripti qoşmaq — üçüncü tərəfin kodu sənin səhifəndə icra olunur; prod-da build et, CSP ilə xarici skriptləri məhdudlaşdır (bu saytın CSP-si xarici skriptlərə icazə vermir).",
            "Təhlükəsizlik: npm plaginləri build zamanı kod icra edir — yalnız etibarlı, populyar plaginlər; lock fayl.",
          ]},
          { t: "qa", items: [
            ["Tailwind 4-də konfiqurasiya harada?", "CSS faylında: @theme, @source, @plugin, @custom-variant, @utility."],
            ["Class tapılmırsa nə yoxlanır?", "Fayl @source əhatəsindədirmi, class adı kodda tam yazılıbmı, .gitignore-da deyil ki?"],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Tailwind 4-ü CSS-ə qoşmaq üçün:", options: ["@tailwind base;", "@import \"tailwindcss\";", "<script src=tailwind>"], answer: 1, why: "v4-də bir import sətri." },
        ],
      },
    ],
    exercise: {
      task: "globals.css yaz: Tailwind-i import et, @theme ilə --color-brand (#38bdf8) və --color-ink (#05070d) rəngləri, --font-mono şrifti əlavə et; @layer base-də body üçün bg-ink text-slate-200 tətbiq et. Sonra bu rəngləri işlədən HTML nümunəsi yaz.",
      starter: `/* globals.css */\n\n<!-- HTML -->\n`,
      expect: "@import \"tailwindcss\"; @theme { --color-brand: ...; --color-ink: ...; --font-mono: ... }; @layer base body @apply bg-ink ...; HTML-də bg-brand / text-brand / font-mono class-ları.",
    },
  },
  {
    slug: "spacing",
    title: "Spacing və ölçülər",
    intro: "padding, margin, gap, width, height — Tailwind-də hamısı bir şkala ilə: 1 vahid = 0.25rem (4px). Bu, bütün saytda ardıcıl ritm yaradır.",
    sections: [
      {
        level: "baslangic",
        title: "p, m, w, h",
        blocks: [
          { t: "analogy", text: "Spacing şkalası — musiqidəki notlardır: təsadüfi səslər (13px, 17px, 22px) küydür, şkaladakı notlar (4, 8, 12, 16) melodiya. Ardıcıl boşluqlar dizaynı «təmiz» göstərir." },
          { t: "code", lang: "html", code: `<div class="p-4">padding hər tərəf 1rem</div>
<div class="px-6 py-2">üfüqi 1.5rem, şaquli 0.5rem</div>
<div class="pt-8 mb-4">yuxarı padding, aşağı margin</div>
<div class="mx-auto w-full max-w-3xl">mərkəzdə, maks 48rem</div>
<div class="w-1/2 h-32">yarı en, hündürlük 8rem</div>
<div class="size-10">en və hündürlük 2.5rem</div>
<div class="min-h-dvh">ən azı ekran hündürlüyü</div>` },
          { t: "terms", items: [
            ["p / px / py / pt / pr / pb / pl", "padding: hamısı / üfüqi / şaquli / tək tərəf."],
            ["m / mx / my ...", "margin."],
            ["mx-auto", "üfüqi mərkəzləşdirmə."],
            ["w-1/2, w-full, w-screen", "en: faiz, 100%, 100vw."],
            ["max-w-3xl", "maksimum en (konteyner ölçüləri)."],
            ["size-10", "w-10 + h-10."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "gap, space, mənfi və ixtiyari dəyərlər",
        blocks: [
          { t: "code", lang: "html", code: `<div class="flex gap-4">…</div>             <!-- elementlər arası -->
<div class="grid grid-cols-3 gap-x-6 gap-y-2">…</div>
<div class="space-y-3">…</div>              <!-- uşaqlar arası şaquli boşluq -->
<div class="-mt-4">mənfi margin</div>
<div class="w-[37rem]">ixtiyari dəyər (nadir hallarda)</div>
<div class="p-(--bosluq)">CSS dəyişənindən (v4 sintaksisi)</div>` },
          { t: "list", items: [
            "Flex/grid-də boşluq üçün gap — margin hiylələrindən təmizdir.",
            "space-y-* uşaqlara margin verir; flex/grid-də gap daha etibarlıdır.",
            "Şkala dinamikdir (v4): p-13, w-29 də işləyir — amma ardıcıllıq üçün az sayda dəyərdən istifadə et.",
          ]},
          { t: "mistake", lang: "html", wrong: `<div class="w-[1200px]">`, right: `<div class="w-full max-w-6xl mx-auto px-4">`, why: "Sabit piksel en telefonda üfüqi scroll yaradır. Tam en + maksimum en + kənar boşluq." },
        ],
      },
      {
        level: "senior",
        title: "Məntiqi xassələr və ritm",
        blocks: [
          { t: "list", items: [
            "ps-*/pe-*, ms-*/me-* — padding/margin-inline-start/end: sağdan-sola (ərəb, fars) dillərdə avtomatik düzgün.",
            "Dizayn sistemində boşluqları məhdudlaşdır (məs. 1, 2, 3, 4, 6, 8, 12, 16) — komanda üçün qayda yaz.",
            "Konteyner üçün təkrar class qrupu (mx-auto max-w-7xl px-4) — komponentə çıxar.",
            "Layout shift (CLS) qarşısı: şəkil/embed konteynerlərinə aspect-video, aspect-square və ya sabit ölçü.",
            "Təhlükəsizlik/UX: kliklənən elementlər ən azı 44×44 px (min-h-11 min-w-11) — kiçik hədəflər səhv kliklərə səbəb olur, «Sil» ilə «Saxla»-nı yan-yana sıx qoyma.",
          ]},
          { t: "qa", items: [
            ["gap ilə space-y fərqi?", "gap flex/grid konteynerinin xassəsidir; space-y uşaqlara margin əlavə edir."],
            ["ps-4 ilə pl-4 fərqi?", "ps yazı istiqamətinə görə başlanğıc tərəfdir (RTL-də sağ), pl həmişə soldur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "px-6 nə edir?", options: ["6px padding", "Sağ-sol padding 1.5rem", "Yuxarı-aşağı padding"], answer: 1, why: "x — üfüqi; 6 × 0.25 = 1.5rem." },
        ],
      },
    ],
    exercise: {
      task: "Səhifə konteyneri (mərkəzdə, maks 4xl, kənar boşluq 4) içində 3 kartlıq flex sırası (gap-6), hər kart p-6; kartın içində başlıq və paraqraf arasında space-y-2. Bir kart w-1/2, digərləri flex-1.",
      starter: `<main class="">\n  <div class="">\n    <div class="">…</div>\n  </div>\n</main>\n`,
      expect: "mx-auto max-w-4xl px-4; flex gap-6; kartlarda p-6 və space-y-2; w-1/2 və flex-1; ixtiyari piksel dəyərləri yoxdur.",
    },
  },
  {
    slug: "renger",
    title: "Rənglər və tipografiya",
    intro: "Tailwind palitrası (slate, sky, rose... 50–950 tonları), şəffaflıq (/50), mətn ölçüləri, qalınlıq, sətir aralığı.",
    sections: [
      {
        level: "baslangic",
        title: "Rəng class-ları",
        blocks: [
          { t: "analogy", text: "Tailwind palitrası — boya kataloqudur: hər rəngin 11 tonu var, 50 (ən açıq) — 950 (ən tünd). «sky-500» — kataloqda göy rəngin orta tonu." },
          { t: "code", lang: "html", code: `<p class="text-sky-400">Mavi mətn</p>
<div class="bg-rose-500 text-white">Qırmızı fon</div>
<div class="border border-slate-700">Boz sərhəd</div>
<div class="bg-sky-500/20">20% şəffaf fon</div>
<div class="bg-linear-to-r from-sky-500 to-rose-500">Qradiyent</div>` },
          { t: "terms", items: [
            ["text-*", "mətn rəngi."],
            ["bg-*", "fon rəngi."],
            ["border-*", "sərhəd rəngi (border — qalınlıq)."],
            ["/20", "şəffaflıq (opacity modifier)."],
            ["bg-linear-to-r from-* to-*", "qradiyent (v4 adı; v3-də bg-gradient-to-r)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Tipografiya",
        blocks: [
          { t: "code", lang: "html", code: `<h1 class="text-4xl font-black tracking-tight md:text-6xl">Başlıq</h1>
<p class="text-base leading-relaxed text-slate-400 max-w-prose">
  Uzun mətn — rahat sətir aralığı və oxunaqlı en.
</p>
<span class="font-mono text-xs uppercase tracking-widest">ETİKET</span>
<p class="truncate">Çox uzun mətn kəsilir…</p>
<p class="line-clamp-3">3 sətirdən sonra kəsilir…</p>
<p class="text-sm/6">Ölçü və sətir hündürlüyü birlikdə</p>` },
          { t: "list", items: [
            "Ölçülər: text-xs, sm, base, lg, xl, 2xl … 9xl.",
            "Qalınlıq: font-light, normal, medium, semibold, bold, black.",
            "leading-* sətir hündürlüyü, tracking-* hərf aralığı.",
            "max-w-prose (~65ch) — oxunaqlı sətir uzunluğu.",
          ]},
          { t: "mistake", lang: "html", wrong: `<p class="text-slate-600 bg-slate-800">Oxunmur</p>`, right: `<p class="text-slate-300 bg-slate-800">Oxunur</p>`, why: "Kontrast çox aşağıdır (WCAG AA 4.5:1 tələb edir). Tünd fonda açıq tonlar (200–400) işlət." },
        ],
      },
      {
        level: "senior",
        title: "OKLCH palitrası və mənalı rənglər",
        blocks: [
          { t: "list", items: [
            "v4 palitrası OKLCH-dədir — geniş rəng gamutlu (P3) ekranlarda daha canlı, tonlar arası keçid qavrayışca bərabər.",
            "Komponentlərdə «xam» rəng (sky-500) əvəzinə mənalı tokenlər: bg-accent, text-danger — tema dəyişəndə bir yerdən dəyişir. Bu sayt text-accent işlədir və bölməyə görə rəng dəyişir.",
            "Rəng məlumatın yeganə daşıyıcısı olmasın: xəta üçün qırmızı + ikon + mətn.",
            "currentColor: border-current, fill-current — ikonlar mətn rəngini alır.",
            "Təhlükəsizlik/UX: təhlükəli əməliyyatlar (Sil, Ödə) vizual olaraq fərqlənsin (rose/red + təsdiq dialoqu) — oxşar rəngli düymələr səhv kliklərə və «dark pattern» şikayətlərinə səbəb olur.",
          ]},
          { t: "qa", items: [
            ["bg-sky-500/50 nə edir?", "sky-500 rəngini 50% şəffaflıqla fon kimi verir (color-mix ilə)."],
            ["Niyə semantik rəng tokenləri?", "Tema/brend dəyişikliyi bir yerdən; komponentlər məna ilə (danger, accent) danışır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Ən tünd ton hansıdır?", options: ["sky-50", "sky-500", "sky-950"], answer: 2, why: "Rəqəm böyüdükcə ton tündləşir." },
        ],
      },
    ],
    exercise: {
      task: "Qiymət kartı: tünd fon, yuxarıda kiçik mono uppercase etiket (tracking-widest, sky-400), böyük qiymət (text-5xl font-black), boz təsvir (leading-relaxed, max-w-prose), qradiyent düymə (sky → rose), sərhəd slate-800, «Populyar» nişanı sky-500/20 fonla.",
      starter: `<div class="">\n  <span class="">PRO</span>\n  <p class="">29 AZN</p>\n  <p class="">Bütün dərslər və AI müəllim.</p>\n  <button class="">Abunə ol</button>\n</div>\n`,
      expect: "font-mono text-xs uppercase tracking-widest text-sky-400; text-5xl font-black; leading-relaxed text-slate-400; bg-linear-to-r from-sky-500 to-rose-500; border border-slate-800; /20 şəffaflıq; kontrast yaxşı.",
    },
  },
  {
    slug: "flex-grid",
    title: "Flex və Grid ilə düzülüş",
    intro: "Tailwind-də flexbox və grid class-ları CSS-in özünə birə-bir uyğundur: flex, items-center, justify-between, grid-cols-3, col-span-2.",
    sections: [
      {
        level: "baslangic",
        title: "Flex class-ları",
        blocks: [
          { t: "analogy", text: "Flex və grid xassələrini CSS dərsindən bilirsən — Tailwind sadəcə onların qısa adlarıdır: «display: flex; align-items: center» → «flex items-center». Lüğəti öyrənmək kifayətdir." },
          { t: "code", lang: "html", code: `<nav class="flex items-center justify-between gap-4 px-4 h-14">
  <a class="font-bold">Logo</a>
  <div class="flex gap-6">
    <a>Dərslər</a><a>Məşq</a>
  </div>
  <button class="ml-auto">Giriş</button>
</nav>

<div class="flex flex-col gap-2 md:flex-row">…</div>
<div class="flex flex-wrap gap-4">
  <div class="flex-1 min-w-60">…</div>
</div>
<div class="grid place-items-center min-h-dvh">Mərkəz</div>` },
          { t: "terms", items: [
            ["flex / inline-flex", "display."],
            ["flex-row / flex-col", "istiqamət."],
            ["items-*", "align-items: start, center, end, stretch."],
            ["justify-*", "justify-content: start, center, between, around, evenly."],
            ["flex-1 / flex-none / shrink-0", "böyümə və kiçilmə."],
            ["flex-wrap", "sətrə keçid."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Grid class-ları",
        blocks: [
          { t: "code", lang: "html", code: `<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div class="sm:col-span-2">Geniş kart</div>
  <div>…</div>
</div>

<div class="grid grid-cols-[240px_1fr] min-h-dvh">
  <aside>Menyu</aside>
  <main class="min-w-0">Məzmun</main>
</div>

<div class="grid grid-cols-(--sutunlar)">CSS dəyişənindən</div>` },
          { t: "list", items: [
            "grid-cols-N — N bərabər sütun (repeat(N, minmax(0, 1fr))).",
            "col-span-N, row-span-N, col-start-N.",
            "İxtiyari şablon: grid-cols-[240px_1fr] (boşluq yerinə _).",
            "Bu saytın dil kartları: grid sm:grid-cols-2 lg:grid-cols-3.",
          ]},
          { t: "mistake", lang: "html", wrong: `<main class="flex-1">uzun kod bloku daşır</main>`, right: `<main class="flex-1 min-w-0">…</main>`, why: "Flex/grid elementinin default min-width: auto-su məzmundan kiçilməyə imkan vermir — uzun sətirlər layout-u partladır." },
        ],
      },
      {
        level: "senior",
        title: "Subgrid, container queries, sıra",
        blocks: [
          { t: "code", lang: "html", code: `<div class="@container">
  <div class="flex flex-col @md:flex-row">Konteynerə görə dəyişir</div>
</div>

<div class="grid grid-cols-3 gap-4">
  <article class="row-span-3 grid grid-rows-subgrid">
    <h3>…</h3><p>…</p><button>…</button>
  </article>
</div>` },
          { t: "list", items: [
            "@container + @md: — v4-də daxili container queries: komponent olduğu yerə uyğunlaşır.",
            "grid-rows-subgrid — kartların daxili sətirləri bir-biri ilə düzlənir.",
            "order-*, flex-row-reverse vizual sıranı dəyişir, amma klaviatura/ekran oxuyucu sırası DOM sırasıdır — məna sırasını HTML-də düzgün yaz.",
            "Təhlükəsizlik/UX: kritik düymələrin yerini responsive-də dəyişmək (mobil-də «Sil» «Saxla»nın yerinə keçir) səhv klik riskidir — təhlükəli əməliyyat həmişə təsdiq istəsin.",
          ]},
          { t: "qa", items: [
            ["grid-cols-3 nəyə çevrilir?", "grid-template-columns: repeat(3, minmax(0, 1fr))."],
            ["@container nə üçündür?", "Komponentin viewport-a yox, konteyner eninə görə dəyişməsi üçün."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Elementi tam mərkəzə qoymağın ən qısa yolu:", options: ["flex items-center", "grid place-items-center", "text-center"], answer: 1, why: "Hər iki oxda mərkəzləşdirir." },
        ],
      },
    ],
    exercise: {
      task: "Dashboard skeleti: grid ilə sol menyu (240px) + məzmun; məzmunun yuxarısında flex header (başlıq solda, düymə sağda); altında kartlar grid-i: mobil 1, sm 2, xl 4 sütun, gap-6; bir kart 2 sütun tutsun.",
      starter: `<div class="">\n  <aside class="">Menyu</aside>\n  <main class="">\n    <header class="">…</header>\n    <section class="">…</section>\n  </main>\n</div>\n`,
      expect: "grid grid-cols-[240px_1fr] və ya md:grid-cols-[...]; main min-w-0; header flex items-center justify-between; grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6; col-span-2.",
    },
  },
  {
    slug: "responsive",
    title: "Responsive prefikslər",
    intro: "Tailwind mobile-first-dir: prefikssiz class hər ekranda, sm: / md: / lg: / xl: / 2xl: — həmin endən BÖYÜK ekranlarda işləyir.",
    sections: [
      {
        level: "baslangic",
        title: "Breakpoint prefiksləri",
        blocks: [
          { t: "analogy", text: "Prefiks — «bu endən sonra» deməkdir: md:text-xl = «planşetdən böyük ekranlarda mətn böyük olsun». Telefon üçün heç nə yazmırsan — default telefondur." },
          { t: "code", lang: "html", code: `<h1 class="text-2xl md:text-4xl lg:text-6xl">Başlıq</h1>

<div class="flex flex-col md:flex-row gap-4">…</div>

<nav class="hidden md:flex">Kompüter menyusu</nav>
<button class="md:hidden">☰</button>` },
          { t: "terms", items: [
            ["sm:", "≥ 40rem (640px)."],
            ["md:", "≥ 48rem (768px)."],
            ["lg:", "≥ 64rem (1024px)."],
            ["xl: / 2xl:", "≥ 80rem / 96rem."],
            ["max-md:", "md-dən KİÇİK ekranlar."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Diapazonlar və xüsusi breakpoint-lər",
        blocks: [
          { t: "code", lang: "html", code: `<div class="md:max-lg:bg-sky-500/10">yalnız md–lg arası</div>
<div class="min-[900px]:grid-cols-3">ixtiyari breakpoint</div>` },
          { t: "code", lang: "css", code: `@theme {
  --breakpoint-3xl: 120rem;   /* → 3xl: prefiksi */
}` },
          { t: "mistake", lang: "html", wrong: `<div class="sm:text-sm text-lg">  <!-- telefonda kiçik istəyirdik -->`, right: `<div class="text-sm md:text-lg">`, why: "sm: «kiçik ekran» demək DEYİL — «640px-dən böyük» deməkdir. Mobil dəyəri prefikssiz yaz." },
          { t: "tip", text: "Hər səhifəni 360 px-də yoxla (bu saytın qaydası). Chrome DevTools → cihaz rejimi." },
        ],
      },
      {
        level: "senior",
        title: "Responsive strategiya",
        blocks: [
          { t: "list", items: [
            "Breakpoint-i cihaza yox, məzmuna görə seç: dizayn harada «sınır»?",
            "Container queries (@container, @md:) — komponent səviyyəsində responsive; sidebar-da və main-də eyni kart fərqli görünür.",
            "Fluid tipografiya: text-[clamp(2rem,5vw,4rem)] və ya @theme-də --text-hero: clamp(...).",
            "hidden md:block ilə gizlənən məzmun yenə yüklənir və DOM-dadır — ağır komponentləri JS ilə şərti render et.",
            "Təhlükəsizlik: mobil-də gizlədilmiş admin/debug elementləri HTML-dədir — CSS gizlətmə yetki deyil, server yoxlaması lazımdır.",
          ]},
          { t: "qa", items: [
            ["md:hidden nə edir?", "768px və daha geniş ekranlarda gizlədir; kiçik ekranlarda görünür."],
            ["Mobile-first Tailwind-də necə ifadə olunur?", "Prefikssiz class-lar mobil üçün, prefiksli class-lar böyük ekranlar üçün əlavələrdir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "lg:grid-cols-3 nə vaxt işləyir?", options: ["1024px-dən kiçik", "1024px və böyük", "Həmişə"], answer: 1, why: "Prefiks — həmin endən böyük." },
        ],
      },
    ],
    exercise: {
      task: "Hero bölməsi: telefonda şəkil mətnin altında (flex-col), md-dən yan-yana (flex-row); başlıq text-3xl → md:text-5xl → lg:text-7xl; mobil menyu düyməsi yalnız kiçik ekranda, tam menyu md-dən.",
      starter: `<header class="">\n  <nav class="">…</nav>\n  <button class="">☰</button>\n</header>\n<section class="">\n  <div>\n    <h1 class="">Kod öyrən</h1>\n  </div>\n  <img src="/hero.png" alt="Kod yazan tələbə" class="">\n</section>\n`,
      expect: "flex flex-col md:flex-row; text-3xl md:text-5xl lg:text-7xl; nav hidden md:flex; düymə md:hidden; img w-full md:w-1/2; mobil dəyərlər prefikssiz.",
    },
  },
  {
    slug: "veziyyetler",
    title: "Hover, focus və digər hallar",
    intro: "Variantlar — vəziyyətə görə stil: hover:, focus-visible:, active:, disabled:, group-hover:, peer-invalid:, first:, odd:. Hamısı birləşdirilə bilər.",
    sections: [
      {
        level: "baslangic",
        title: "hover, focus, active, disabled",
        blocks: [
          { t: "analogy", text: "Variant — «əgər» şərtidir: «əgər siçan üstündədirsə (hover:) fon tündləşsin», «əgər klaviatura ilə fokuslanıbsa (focus-visible:) halqa görünsün»." },
          { t: "code", lang: "html", code: `<button class="rounded-lg bg-sky-500 px-4 py-2 text-white
  hover:bg-sky-600 active:scale-95
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300
  disabled:opacity-50 disabled:cursor-not-allowed transition">
  Yadda saxla
</button>

<input class="border border-slate-700 focus:border-sky-500 invalid:border-rose-500 placeholder:text-slate-500">` },
          { t: "terms", items: [
            ["hover:", "siçan üstündə."],
            ["focus:", "fokusda (siçan klikində də)."],
            ["focus-visible:", "yalnız klaviatura fokusunda — fokus halqası üçün ideal."],
            ["active:", "basılı anda."],
            ["disabled:", "deaktiv element."],
            ["placeholder:", "placeholder mətni."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "group və peer",
        blocks: [
          { t: "code", lang: "html", code: `<a href="/kurs" class="group block rounded-xl border border-slate-800 p-4 hover:border-sky-500">
  <h3 class="group-hover:text-sky-400">React</h3>
  <span class="opacity-0 group-hover:opacity-100 transition">Bax →</span>
</a>

<label>
  <input type="email" class="peer border" required>
  <p class="hidden peer-invalid:block peer-placeholder-shown:hidden text-rose-400 text-sm">
    Email yanlışdır
  </p>
</label>

<ul>
  <li class="py-2 border-b last:border-0 odd:bg-slate-900">…</li>
</ul>` },
          { t: "list", items: [
            "group — valideyn vəziyyətinə görə uşağı stillə (group-hover:, group-focus:).",
            "peer — QARDAŞ elementin vəziyyətinə görə (peer-checked:, peer-invalid:); peer əvvəl gəlməlidir.",
            "first:, last:, odd:, even: — siyahı stilləri.",
            "Variantlar zəncirlənir: md:hover:bg-sky-600, dark:group-hover:text-white.",
          ]},
          { t: "mistake", lang: "html", wrong: `<button class="outline-none focus:outline-none">`, right: `<button class="focus-visible:outline-2 focus-visible:outline-sky-400">`, why: "Fokus göstəricisini silmək klaviatura istifadəçilərini «kor» edir (WCAG 2.4.7). Silirsənsə, focus-visible ilə əvəzini ver." },
        ],
      },
      {
        level: "senior",
        title: "ARIA/data variantları və təhlükəsiz UX",
        blocks: [
          { t: "code", lang: "html", code: `<button aria-expanded="true" class="aria-expanded:rotate-180">▾</button>
<div data-state="open" class="data-[state=open]:block hidden">Panel</div>
<div class="has-[input:checked]:ring-2 has-[input:checked]:ring-sky-500">…</div>
<button class="pointer-coarse:py-3">Toxunma ekranında böyük</button>` },
          { t: "list", items: [
            "aria-* və data-* variantları stili vəziyyətin MƏNBƏYİNƏ (a11y atributu) bağlayır — JS ilə ayrıca class idarəsi lazım olmur.",
            "has-* — :has() əsasında valideyn stili (seçilmiş radio olan kart).",
            "motion-reduce:, motion-safe: — animasiyaya həssas istifadəçilər.",
            "Təhlükəsizlik/UX: disabled: ilə düyməni «sönük» göstərmək kifayət deyil — həqiqətən disabled atributu qoy; serverdə də əməliyyatı yoxla. Yalnız opacity-0 ilə gizlənmiş düymə kliklənir və fokuslanır.",
          ]},
          { t: "qa", items: [
            ["group ilə peer fərqi?", "group valideyn vəziyyətini uşaqlara, peer qardaşın vəziyyətini sonrakı qardaşlara ötürür."],
            ["focus ilə focus-visible fərqi?", "focus hər fokusda, focus-visible yalnız brauzer göstərilməli saydıqda (klaviatura)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Kart hover olanda içindəki başlığın rəngini dəyişmək üçün:", options: ["peer-hover:", "group + group-hover:", "hover:"], answer: 1, why: "Valideynə group, uşağa group-hover:." },
        ],
      },
    ],
    exercise: {
      task: "Kurs kartı (link): hover-də sərhəd sky-500, içindəki başlıq rəngi dəyişsin (group), «Bax →» yazısı görünsün. Klaviatura fokusunda görünən halqa. Altında email input: yanlış olanda (peer-invalid) xəta mətni görünsün. Düymə disabled halında sönük və cursor-not-allowed.",
      starter: `<a href="#" class="">\n  <h3 class="">React</h3>\n  <span class="">Bax →</span>\n</a>\n\n<label>\n  <input type="email" required class="">\n  <p class="">Email yanlışdır</p>\n</label>\n<button disabled class="">Göndər</button>\n`,
      expect: "group / group-hover:; focus-visible:outline/ring; opacity-0 group-hover:opacity-100; peer + peer-invalid:block; disabled:opacity-50 disabled:cursor-not-allowed; outline-none əvəzsiz silinməyib.",
    },
  },
  {
    slug: "dark",
    title: "Dark mode",
    intro: "dark: variantı ilə tünd tema. Default olaraq sistemin ayarına (prefers-color-scheme) baxır; istifadəçi seçimi üçün class/data atributu ilə idarə etmək olar.",
    sections: [
      {
        level: "baslangic",
        title: "dark: variantı",
        blocks: [
          { t: "analogy", text: "Dark mode — otağın gecə işıqlandırmasıdır: eyni mebel, fərqli işıq. Hər elementə «gündüz belə, gecə belə» deyirsən: bg-white dark:bg-slate-900." },
          { t: "code", lang: "html", code: `<div class="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
  <h2 class="text-slate-950 dark:text-white">Başlıq</h2>
  <p class="text-slate-600 dark:text-slate-400">Mətn</p>
</div>` },
          { t: "terms", items: [
            ["dark:", "tünd temada tətbiq olunur."],
            ["prefers-color-scheme", "əməliyyat sisteminin tema ayarı (default mənbə)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Əl ilə dəyişdirmə",
        blocks: [
          { t: "code", lang: "css", code: `@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` },
          { t: "code", lang: "javascript", code: `// Səhifə render olmamış (head-də inline) — «ağ yanıb-sönmə» olmasın
const t = localStorage.getItem("tema")
  ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.dataset.theme = t;

function temaDeyis() {
  const yeni = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = yeni;
  localStorage.setItem("tema", yeni);
}` },
          { t: "mistake", lang: "html", wrong: `<!-- hər komponentdə 20 dark: class -->\n<div class="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 ...">`, right: `/* @theme-də semantik dəyişənlər, temaya görə dəyər dəyişir */\n<div class="bg-surface border-line">`, why: "Hər yerdə dark: təkrarlamaq səhvə açıqdır. Semantik CSS dəyişənləri (--color-surface) tema dəyişəndə özü dəyişir — bu saytın --accent yanaşması kimi." },
        ],
      },
      {
        level: "senior",
        title: "Tema arxitekturası",
        blocks: [
          { t: "code", lang: "css", code: `@theme {
  --color-surface: var(--surface);
  --color-line: var(--line);
}
:root { --surface: #ffffff; --line: #e2e8f0; color-scheme: light; }
[data-theme="dark"] { --surface: #0c111c; --line: #1c2536; color-scheme: dark; }` },
          { t: "list", items: [
            "color-scheme — scrollbar, form elementləri də temaya uyğun.",
            "FOUC/«flash»: tema skripti head-də, render-dən əvvəl; SSR-də cookie ilə serverdə düzgün atributu yaz.",
            "Tünd temada saf ağ mətn və saf qara fon gözü yorur — slate-100 / #05070d kimi yumşaq dəyərlər.",
            "Şəkillər və qrafiklər üçün tünd variant (dark:invert ehtiyatla, ya da ayrı şəkil).",
            "Təhlükəsizlik: head-dəki inline tema skripti CSP-də 'unsafe-inline' və ya nonce/hash tələb edir — skripti minimal saxla və localStorage dəyərini ağ siyahı ilə yoxla (\"dark\" | \"light\"), birbaşa className-ə və ya HTML-ə yazma.",
          ]},
          { t: "qa", items: [
            ["Dark mode-u əl ilə necə idarə edirsən (v4)?", "@custom-variant dark ilə class/data selektoruna bağlayıb, atributu JS ilə dəyişirəm və seçimi saxlayıram."],
            ["Tema «yanıb-sönməsinin» səbəbi?", "Tema JS hidratasiyadan sonra tətbiq olunur; həll — head-də bloklayan kiçik skript və ya server cookie."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Default olaraq dark: nəyə əsaslanır?", options: ["Saat vaxtına", "Sistem ayarına (prefers-color-scheme)", "Brauzer tarixçəsinə"], answer: 1, why: "Media query ilə OS temasına." },
        ],
      },
    ],
    exercise: {
      task: "Açıq/tünd tema dəstəkli profil kartı: fon, mətn, sərhəd, düymə dark: variantları ilə. Tema düyməsi data-theme atributunu dəyişsin və localStorage-də saxlasın (yalnız \"dark\"/\"light\" qəbul et). CSS-də @custom-variant yaz.",
      starter: `/* CSS */\n@import "tailwindcss";\n\n<!-- HTML -->\n<div class="">\n  <h2 class="">Aysel</h2>\n  <button id="tema" class="">Tema</button>\n</div>\n<script>\n  // bura\n</script>\n`,
      expect: "@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *)); dark: class-ları fon/mətn/sərhəd üçün; JS data-theme toggle + localStorage, dəyər ağ siyahı ilə yoxlanır; kontrast hər iki temada yaxşı.",
    },
  },
  {
    slug: "tema",
    title: "@theme ilə öz dizayn sistemin",
    intro: "@theme direktivi Tailwind-in dizayn tokenlərini (rəng, şrift, boşluq, breakpoint, kölgə) təyin edir. Hər token həm utility class, həm CSS dəyişəni olur.",
    sections: [
      {
        level: "baslangic",
        title: "Token əlavə etmək",
        blocks: [
          { t: "analogy", text: "@theme — brendin «stil kitabçası»dır: rənglərimiz bunlardır, şriftlərimiz bunlardır. Tailwind bu kitabçanı oxuyub hər qayda üçün hazır class-lar çap edir." },
          { t: "code", lang: "css", code: `@import "tailwindcss";

@theme {
  --color-ink: #05070d;
  --color-panel: #0c111c;
  --color-line: #1c2536;
  --color-blue-team: #38bdf8;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --radius-card: 1rem;
}` },
          { t: "code", lang: "html", code: `<div class="bg-panel border border-line rounded-card font-mono text-blue-team">…</div>` },
          { t: "terms", items: [
            ["--color-*", "bg-*, text-*, border-* ... class-ları yaradır."],
            ["--font-*", "font-* class-ı."],
            ["--radius-*", "rounded-* class-ı."],
            ["--breakpoint-*", "responsive prefiks."],
            ["--spacing", "bütün boşluq şkalasının bazası (default 0.25rem)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "inline, üzərinə yazmaq, sıfırlamaq",
        blocks: [
          { t: "code", lang: "css", code: `/* Runtime-da dəyişən rəng — bölməyə görə (bu saytın yanaşması) */
@theme inline {
  --color-accent: var(--accent);
}
:root { --accent: #38bdf8; }
[data-track="backend"] { --accent: #f43f5e; }

/* Default palitranı tamamilə əvəzləmək */
@theme {
  --color-*: initial;
  --color-brand: #38bdf8;
  --color-white: #fff;
}` },
          { t: "list", items: [
            "@theme inline — utility dəyişənin dəyərini yox, istinadını (var(--accent)) istifadə edir; runtime-da dəyişən tokenlər üçün mütləqdir.",
            "--color-*: initial — default rəngləri silir, yalnız brend palitrası qalır (komanda təsadüfən sky-500 işlətməsin).",
            "Tokenlər :root-da CSS dəyişəni kimi mövcuddur — adi CSS və JS-də də var(--color-ink).",
          ]},
          { t: "mistake", lang: "css", wrong: `@theme {\n  --color-accent: var(--accent);   /* inline yoxdur */\n}`, right: `@theme inline {\n  --color-accent: var(--accent);\n}`, why: "inline olmadan dəyişən :root-da həll olunur və [data-track] altında dəyişiklik utility-yə çatmaya bilər — bu saytda məhz bu bug olmuşdu: backend səhifələrində rəng mavi qalırdı." },
        ],
      },
      {
        level: "senior",
        title: "Dizayn sistemi kimi tokenlər",
        blocks: [
          { t: "list", items: [
            "Token qatları: primitiv (blue-500) → semantik (accent, danger, surface) → komponent (button-bg). Komponentlər yalnız semantik qatı işlətsin.",
            "Figma tokenləri → JSON → @theme generasiyası (Style Dictionary) — dizayn və kod sinxron.",
            "Paylaşılan tema faylı (theme.css) monorepoda bütün tətbiqlərə import olunur.",
            "Kontrast yoxlaması tokenlər səviyyəsində: hər fon/mətn cütü WCAG AA.",
            "Təhlükəsizlik: istifadəçi tərəfindən fərdiləşdirilən tema (white-label, profil rəngi) yalnız rəng formatını keçən dəyərləri qəbul etsin (/^#[0-9a-f]{6}$/i) — sərbəst CSS dəyəri url() ilə məlumat sızdıra və ya UI-ni dəyişdirə bilər (CSS injection).",
          ]},
          { t: "qa", items: [
            ["@theme ilə :root dəyişəni fərqi?", "@theme dəyişəni həm CSS dəyişəni, həm utility class yaradır; adi :root dəyişəni yalnız dəyişəndir."],
            ["@theme inline nə vaxt lazımdır?", "Token başqa dəyişənə istinad edir və o dəyişən kontekstə görə dəyişir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "--color-brand tokeni hansı class-ı yaradır?", options: ["color-brand", "bg-brand, text-brand…", "brand"], answer: 1, why: "Rəng tokeni bütün rəng utility-lərində işlənir." },
        ],
      },
    ],
    exercise: {
      task: "Kiçik dizayn sistemi: primitiv rənglər (--color-sky, --color-rose), semantik --color-accent (@theme inline ilə var(--accent)), :root və [data-theme=\"qirmizi\"] üçün --accent dəyərləri, --font-display, --radius-card, --breakpoint-3xl. Bunları işlədən iki kart (mavi və qırmızı bölmə) yaz.",
      starter: `/* theme.css */\n@import "tailwindcss";\n\n<!-- HTML -->\n`,
      expect: "@theme və @theme inline düzgün; --accent kontekstə görə dəyişir; HTML-də bg-accent/text-accent, rounded-card, font-display; data-theme ilə ikinci kart qırmızı.",
    },
  },
  {
    slug: "komponent",
    title: "Komponentləşdirmə və təkrarın qarşısı",
    intro: "Uzun class siyahıları təkrarlananda nə etməli? Əsas həll — framework komponenti (React). @apply, @utility və variant kitabxanaları (cva) — köməkçilər.",
    sections: [
      {
        level: "baslangic",
        title: "Komponent ən yaxşı abstraksiyadır",
        blocks: [
          { t: "analogy", text: "Eyni uzun ünvanı 50 məktuba əl ilə yazmaq əvəzinə möhür düzəldirsən. React komponenti — class-ların möhürüdür: bir yerdə dəyişirsən, hər yerdə dəyişir." },
          { t: "code", lang: "jsx", code: `function Duyme({ children, ...props }) {
  return (
    <button
      className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600 focus-visible:outline-2 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}

<Duyme onClick={saxla}>Yadda saxla</Duyme>` },
          { t: "list", items: [
            "Təkrar edən HTML blokları → komponent.",
            "Bir faylda təkrar (siyahı elementləri) → map dövrü — class bir dəfə yazılır.",
            "Redaktorda multi-cursor ilə toplu dəyişiklik də praktik həlldir.",
          ]},
        ],
      },
      {
        level: "orta",
        title: "Variantlar: cva / sadə xəritə",
        blocks: [
          { t: "code", lang: "tsx", code: `const VARIANT = {
  esas: "bg-sky-500 text-white hover:bg-sky-600",
  ikinci: "border border-slate-700 text-slate-200 hover:bg-white/5",
  tehlike: "bg-rose-500 text-white hover:bg-rose-600",
} as const;

const OLCU = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-6 py-3 text-lg" } as const;

type Props = React.ComponentProps<"button"> & {
  variant?: keyof typeof VARIANT;
  olcu?: keyof typeof OLCU;
};

export function Duyme({ variant = "esas", olcu = "md", className = "", ...p }: Props) {
  return <button className={"rounded-lg font-semibold transition " + VARIANT[variant] + " " + OLCU[olcu] + " " + className} {...p} />;
}` },
          { t: "list", items: [
            "class-variance-authority (cva) — eyni ideya, kombinasiya qaydaları ilə.",
            "tailwind-merge — ziddiyyətli class-ları birləşdirir (p-2 + p-4 → p-4) — className override üçün.",
          ]},
          { t: "mistake", lang: "css", wrong: `.btn { @apply rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600; }\n.kart { @apply ... }\n/* hər şey @apply ilə */`, right: `/* Komponent framework-də — React komponenti */\n/* @apply yalnız 3-cü tərəf HTML (markdown, CMS) stilləmək üçün */`, why: "Hər şeyi @apply ilə yazmaq köhnə CSS-ə qayıtmaqdır: yenə ad fikirləşmək, CSS böyüməsi, hover/responsive-i itirmək riski." },
        ],
      },
      {
        level: "senior",
        title: "@utility və təhlükəsiz dinamik class-lar",
        blocks: [
          { t: "code", lang: "css", code: `@utility scrollbar-none {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
/* → class="scrollbar-none", variantlarla da işləyir: md:scrollbar-none */` },
          { t: "code", lang: "tsx", code: `// ❌ Tailwind tapmır — build-ə düşmür
<div className={"bg-" + reng + "-500"} />

// ✅ Tam adlar xəritədə
const RENG = { mavi: "bg-sky-500", qirmizi: "bg-rose-500" } as const;
<div className={RENG[reng]} />` },
          { t: "list", items: [
            "Dinamik qurulan class adları build zamanı tapılmır — tam adları obyekt xəritəsində saxla.",
            "Təhlükəsizlik: className-i istifadəçi girişindən birbaşa qurma ({\"bg-\" + req.query.reng}) — həm işləmir, həm də istifadəçiyə UI-ni idarə etmək imkanı verir. Yalnız ağ siyahı xəritəsi (keyof typeof RENG ilə tipli).",
            "Dizayn sistemi kitabxanası: shadcn/ui yanaşması — komponent kodu layihəyə köçürülür, Tailwind + Radix (a11y).",
          ]},
          { t: "qa", items: [
            ["@apply nə vaxt məqsədəuyğundur?", "Class əlavə edə bilmədiyin HTML-i (markdown, CMS, üçüncü tərəf) stilləyəndə; adi komponentlər üçün yox."],
            ["Niyə dinamik class adları işləmir?", "Tailwind faylları statik tarayır; birləşdirilmiş string-in son formasını görmür."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Təkrarlanan Tailwind class-larının ən yaxşı həlli:", options: ["Hər yerdə @apply", "Komponent (React) yaratmaq", "Inline style"], answer: 1, why: "Komponent markup və stili birlikdə təkrar istifadə edir." },
        ],
      },
    ],
    exercise: {
      task: "Nisan (Badge) komponenti yaz: variant (\"info\" | \"ugur\" | \"xeta\") və olcu (\"sm\" | \"md\") props, class-lar obyekt xəritələrində (tam adlarla). className ilə əlavə class qəbul et. 3 variantı nümayiş et. Dinamik string birləşdirmə ilə class adı qurma.",
      starter: `const VARIANT = {\n  // bura\n};\n\nexport function Nisan(/* props */) {\n  // bura\n}\n\nexport default function Demo() {\n  // bura\n}\n`,
      expect: "VARIANT və OLCU xəritələri tam class adları ilə; default props; className birləşdirilir; \"bg-\" + reng kimi dinamik ad yoxdur; @apply işlədilməyib.",
    },
  },
  {
    slug: "animasiya",
    title: "Animasiyalar",
    intro: "transition, duration, ease, animate-spin/pulse/bounce, öz @keyframes-in və starting: variantı ilə giriş animasiyaları. Həmişə prefers-reduced-motion-a hörmət.",
    sections: [
      {
        level: "baslangic",
        title: "transition və hazır animasiyalar",
        blocks: [
          { t: "analogy", text: "Transition — qapının yumşaq bağlanan menteşəsidir: vəziyyət dəyişir (açıq → bağlı), amma birdən çırpılmır. Animation — saat kəfgiri kimi öz-özünə təkrarlanan hərəkət." },
          { t: "code", lang: "html", code: `<button class="transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg">
  Yumşaq qalxır
</button>

<svg class="size-5 animate-spin">…</svg>          <!-- yüklənmə -->
<div class="h-4 w-32 animate-pulse rounded bg-slate-800"></div>  <!-- skeleton -->
<span class="animate-bounce">↓</span>` },
          { t: "terms", items: [
            ["transition", "rəng, kölgə, transform və s. dəyişikliklərini yumşaldır."],
            ["duration-200", "200 ms."],
            ["ease-out / ease-in-out", "sürət əyrisi."],
            ["animate-*", "hazır keyframe animasiyaları."],
            ["translate / scale / rotate", "transform utility-ləri."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Öz animasiyan və giriş effekti",
        blocks: [
          { t: "code", lang: "css", code: `@theme {
  --animate-cixis: cixis 0.4s ease-out both;
  @keyframes cixis {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: none; }
  }
}` },
          { t: "code", lang: "html", code: `<div class="animate-cixis">Yumşaq görünür</div>

<!-- starting: — element ilk görünəndə başlanğıc vəziyyət (CSS @starting-style) -->
<div popover class="transition-discrete opacity-100 starting:opacity-0 duration-300">…</div>

<div class="motion-safe:animate-cixis">Yalnız hərəkət icazəsi olanda</div>` },
          { t: "mistake", lang: "html", wrong: `<div class="transition-all duration-1000 hover:w-96">`, right: `<div class="transition-transform duration-200 hover:scale-105">`, why: "width/height/top animasiyası hər kadrda layout hesablayır — titrəyir. transform və opacity GPU-da, layout-suz animasiya olunur. transition-all da lazımsız xassələri izləyir." },
        ],
      },
      {
        level: "senior",
        title: "Performans və əlçatanlıq",
        blocks: [
          { t: "list", items: [
            "Yalnız transform və opacity animasiya et (compositor-only) — 60 fps.",
            "will-change-transform — çox nadir, uzun animasiyalar üçün; həmişə qoymaq yaddaşı yeyir.",
            "Animasiya müddəti: mikro-qarşılıqlı təsir 150–250 ms, böyük keçidlər ≤ 500 ms (bu saytın qaydası: ≤ 1.2 s).",
            "motion-reduce:animate-none, motion-reduce:transition-none — vestibulyar problemi olan istifadəçilər üçün vacibdir (WCAG 2.3.3).",
            "Mürəkkəb animasiyalar (spring, layout, gesture) — motion kitabxanası (bu saytın giriş ekranı).",
            "Təhlükəsizlik/a11y: 1 saniyədə 3 dəfədən çox yanıb-sönən effekt epileptik tutmaya səbəb ola bilər (WCAG 2.3.1) — flash effektlərini məhdudlaşdır.",
          ]},
          { t: "qa", items: [
            ["Hansı xassələr animasiya üçün ən ucuzdur?", "transform və opacity — layout və paint tələb etmir."],
            ["prefers-reduced-motion necə nəzərə alınır?", "motion-safe:/motion-reduce: variantları və ya media query ilə animasiyaları söndürmək/azaltmaq."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Ən hamar animasiya üçün hansı xassə?", options: ["width", "transform", "margin"], answer: 1, why: "transform layout-u yenidən hesablatmır." },
        ],
      },
    ],
    exercise: {
      task: "1) Hover-də yumşaq qalxan və kölgəsi böyüyən kart (transform, 200 ms). 2) Yüklənmə skeleti (animate-pulse 3 sətir). 3) @theme-də öz --animate-girish (opacity + translateY) yarat və motion-safe: ilə tətbiq et. Hamısında motion-reduce nəzərə alınsın.",
      starter: `/* CSS */\n@import "tailwindcss";\n\n<!-- HTML -->\n`,
      expect: "transition duration-200 hover:-translate-y-1 hover:shadow-lg; animate-pulse skeleton; @theme --animate-girish + @keyframes; motion-safe:animate-girish və ya motion-reduce:*-none; width/height animasiyası yoxdur.",
    },
  },
  {
    slug: "senior",
    title: "Senior: böyük layihədə Tailwind",
    intro: "Komanda miqyasında Tailwind: dizayn sistemi, konvensiyalar, performans, a11y, miqrasiya və təhlükəsizlik.",
    sections: [
      {
        level: "baslangic",
        title: "Komanda qaydaları",
        blocks: [
          { t: "analogy", text: "Bir nəfərin mətbəxində hər şey əlinin altındadır. Restoran mətbəxində isə hər bıçağın yeri, hər sousun adı razılaşdırılıb — yoxsa xaos. Böyük layihədə Tailwind da qaydalar istəyir." },
          { t: "list", items: [
            "Class sırası avtomatik: prettier-plugin-tailwindcss.",
            "Yalnız tema tokenləri: ixtiyari [] dəyərlər üçün code review qaydası (və ya lint).",
            "Semantik tokenlər (accent, surface, danger) — xam palitra komponentlərdə yox.",
            "UI kitabxanası: Button, Input, Modal — bir dəfə, a11y ilə; səhifələr onları yığır.",
            "Sənədləşdirmə: Storybook və ya canlı «styleguide» səhifəsi.",
          ]},
        ],
      },
      {
        level: "orta",
        title: "Performans və miqrasiya",
        blocks: [
          { t: "list", items: [
            "Build CSS adətən 10–30 KB (gzip) — layihə böyüsə də az böyüyür, çünki utility-lər təkrar işlənir.",
            "v3 → v4: npx @tailwindcss/upgrade; adı dəyişənlər (bg-gradient-to → bg-linear-to, shadow-sm → shadow-xs, ring default 1px), konfiqurasiya CSS-ə.",
            "Legacy CSS ilə birgə yaşama: köhnə stilləri @layer components-ə qoy ki, utility-lər onları üstələsin.",
            "Kritik CSS: Next.js avtomatik inline edir; ayrıca narahat olmağa ehtiyac azdır.",
          ]},
          { t: "code", lang: "css", code: `@import "tailwindcss";

@layer components {
  /* köhnə layihədən qalan stillər — utility-lər bunları üstələyir */
  .legacy-card { padding: 20px; }
}` },
          { t: "mistake", lang: "html", wrong: `<div class="!p-4 !text-red-500">  <!-- hər yerdə important -->`, right: `<!-- Ziddiyyətin mənbəyini tap: legacy CSS layer-siz? tailwind-merge? -->`, why: "! (important) spesifiklik müharibəsinin simptomudur; kökü — layer-siz köhnə CSS və ya ziddiyyətli class-lardır." },
        ],
      },
      {
        level: "senior",
        title: "a11y və təhlükəsizlik yoxlama siyahısı",
        blocks: [
          { t: "list", items: [
            "a11y: hər interaktiv elementdə focus-visible stili; sr-only ilə ikon düymələrinə mətn; kontrast tokenlər səviyyəsində yoxlanılıb; motion-reduce; toxunma hədəfləri ≥ 44px.",
            "Təhlükəsizlik — class injection: className heç vaxt istifadəçi mətnindən qurulmasın; yalnız tipli ağ siyahı xəritələri.",
            "Təhlükəsizlik — clickjacking/overlay: fixed inset-0 z-50 kimi overlay-ləri yalnız öz komponentlərin yaratsın; istifadəçi məzmunu (markdown) render edəndə style/class atributlarını sanitizer ilə sil.",
            "Təhlükəsizlik — CSP: Tailwind build-i statik CSS faylıdır — style-src 'self' ilə işləyir; CDN runtime skriptindən prod-da qaç.",
            "Təhlükəsizlik — dark patterns: aldadıcı vizual iyerarxiya (ləğv düyməsini gizlətmək, boz «Rədd et») hüquqi risk və etimad itkisidir.",
          ]},
          { t: "qa", items: [
            ["Böyük komandada Tailwind ardıcıllığını necə saxlayırsan?", "Tema tokenləri, semantik rənglər, UI kitabxanası, prettier plagini, ixtiyari dəyərlərə review qaydası."],
            ["Tailwind ilə hansı təhlükəsizlik riski var?", "İstifadəçi girişindən class/style qurmaq (UI injection, overlay), CDN runtime skripti və sanitizer-siz istifadəçi HTML-i."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Class sırasını avtomatik düzən alət:", options: ["eslint", "prettier-plugin-tailwindcss", "postcss"], answer: 1, why: "Prettier plagini Tailwind-in tövsiyə etdiyi sıraya düzür." },
        ],
      },
    ],
    exercise: {
      task: "Kiçik UI kit planı yaz: 1) theme.css — semantik tokenlər (surface, line, accent, danger) və dark tema. 2) Input komponenti — label, xəta mesajı (aria-invalid, aria-describedby), focus-visible, disabled. 3) Şərhdə komandanın 5 Tailwind qaydasını sadala.",
      starter: `/* theme.css */\n\n// Input.tsx\n\n/* Qaydalar:\n1.\n*/\n`,
      expect: "semantik tokenlər @theme (inline) + dark; Input-da label htmlFor/id, aria-invalid, aria-describedby, focus-visible ring, disabled stili; qaydalarda tokenlər, ixtiyari dəyər məhdudiyyəti, prettier plagini, a11y, class injection qadağası.",
    },
  },
];
