import type { Lesson } from "../types";

export const html: Lesson[] = [
  {
    slug: "giris",
    title: "HTML nədir? İlk səhifə",
    intro: "HTML (HyperText Markup Language) — veb səhifənin skeletidir. Brauzerə «bu başlıqdır, bu paraqrafdır, bu şəkildir» deyir.",
    sections: [
      {
        level: "baslangic",
        title: "İlk səhifəmiz",
        blocks: [
          { t: "analogy", text: "Ev tikirsən: HTML — divarlar, otaqlar, qapılar (struktur). CSS — boya və mebel (görünüş). JavaScript — elektrik və liftlər (hərəkət). Divarsız boya vurmaq olmaz — ona görə hər şey HTML-dən başlayır." },
          { t: "code", lang: "html", code: `<!DOCTYPE html>
<html lang="az">
  <head>
    <meta charset="UTF-8">
    <title>Mənim ilk səhifəm</title>
  </head>
  <body>
    <h1>Salam, dünya!</h1>
    <p>Bu mənim ilk veb səhifəmdir.</p>
  </body>
</html>` },
          { t: "terms", items: [
            ["HyperText", "Başqa səhifələrə link verə bilən mətn."],
            ["Markup", "«İşarələmə» — mətni teqlərlə işarələyirik."],
            ["<!DOCTYPE html>", "Brauzerə: «bu müasir HTML5 sənədidir»."],
            ["<html lang=\"az\">", "Bütün səhifənin kökü; lang dili göstərir (ekran oxuyucular və Google üçün)."],
            ["<head>", "Görünməyən məlumatlar: başlıq, kodlaşdırma, CSS linkləri."],
            ["<meta charset=\"UTF-8\">", "Ə, ş, ç, ğ kimi hərflərin düzgün görünməsi üçün."],
            ["<body>", "Ekranda görünən hər şey."],
            ["<h1>", "heading 1 — ən böyük başlıq."],
            ["<p>", "paragraph — paraqraf."],
          ]},
          { t: "p", text: "Teqlərin çoxu cüt olur: açılan <p> və bağlanan </p>. Aradakı məzmunla birlikdə buna element deyilir." },
        ],
      },
      {
        level: "orta",
        title: "Brauzer HTML-i necə oxuyur?",
        blocks: [
          { t: "p", text: "Brauzer HTML-i yuxarıdan aşağı oxuyur və teqlərdən ağac (DOM) qurur. Teqlər bir-birinin içində ola bilər — buna iç-içəlik (nesting) deyilir. Daxili teq həmişə xaricidən əvvəl bağlanmalıdır." },
          { t: "mistake", lang: "html", wrong: `<p>Bu <b>qalın</p></b>`, right: `<p>Bu <b>qalın</b></p>`, why: "Teqlər qutu içində qutu kimidir: əvvəl içdəki qutunu bağlayırsan, sonra xaricdəkini." },
          { t: "mistake", lang: "html", wrong: `<head>\n  <h1>Başlıq</h1>\n</head>`, right: `<body>\n  <h1>Başlıq</h1>\n</body>`, why: "Görünən məzmun yalnız body-də olmalıdır. Brauzer səhvi «düzəltməyə» çalışır, amma nəticə gözlənilməz olur." },
          { t: "tip", text: "VS Code-da boş .html faylında ! yazıb Tab bas — bütün skelet avtomatik yaranır (Emmet)." },
        ],
      },
      {
        level: "senior",
        title: "Parsing, rendering və keyfiyyət",
        blocks: [
          { t: "p", text: "Brauzer HTML-i bayt → simvol → token → node → DOM ardıcıllığı ilə emal edir. Paralel olaraq CSS-dən CSSOM qurulur; ikisi birləşib render ağacını yaradır, sonra layout və paint gəlir. <script> (defer/async olmadan) parser-i dayandırır — ona görə skriptlər defer ilə və ya body-nin sonunda qoşulur." },
          { t: "list", items: [
            "DOCTYPE-sız səhifə «quirks mode»-da açılır — köhnə, uyğunsuz qaydalarla render olunur.",
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> mobil üçün məcburidir.",
            "HTML parser səhvlərə dözümlüdür (error-tolerant) — bu, səhvlərin gizli qalması deməkdir. validator.w3.org ilə yoxla.",
            "Kritik resursları <link rel=\"preload\"> ilə əvvəlcədən yüklə.",
          ]},
          { t: "qa", items: [
            ["DOM nədir?", "Document Object Model — HTML-in brauzer yaddaşındakı ağac formalı obyekt modeli; JS onu dəyişə bilir."],
            ["async və defer fərqi?", "İkisi də parser-i bloklamır. async yüklənən kimi icra olunur (sıra qorunmur), defer parsing bitəndən sonra sıra ilə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Səhifədə görünən məzmun hansı teqin içində olmalıdır?", options: ["<head>", "<body>", "<title>"], answer: 1, why: "head görünməyən məlumatlar üçündür, body — ekranda görünənlər üçün." },
        ],
      },
    ],
    exercise: {
      task: "Özün haqqında səhifə yarat: h1-də adın, altında 2 paraqraf (kimsən və hobbilərin).",
      starter: `<!DOCTYPE html>\n<html lang="az">\n  <head>\n    <meta charset="UTF-8">\n    <title></title>\n  </head>\n  <body>\n\n  </body>\n</html>\n`,
      expect: "title doldurulub, body-də bir h1 və iki p var, teqlər düzgün bağlanıb.",
    },
  },
];
