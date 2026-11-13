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
];
