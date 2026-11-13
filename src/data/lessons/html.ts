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
];
