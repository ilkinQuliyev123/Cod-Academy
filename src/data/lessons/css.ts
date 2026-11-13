import type { Lesson } from "../types";

export const css: Lesson[] = [
  {
    slug: "giris",
    title: "CSS nədir? Qoşulma yolları",
    intro: "CSS (Cascading Style Sheets) HTML-ə görünüş verir: rəng, ölçü, şrift, düzülüş, animasiya. HTML «nə», CSS «necə görünür» sualına cavab verir.",
    sections: [
      {
        level: "baslangic",
        title: "İlk qayda",
        blocks: [
          { t: "analogy", text: "HTML evin divarlarıdırsa, CSS dizaynerdir. Dizaynerə tapşırıq verirsən: «bütün qapıları (selektor) ağ rəngə (dəyər) boya (xassə)»." },
          { t: "code", lang: "css", code: `h1 {
  color: #38bdf8;
  font-size: 32px;
}

p {
  color: gray;
  line-height: 1.6;
}` },
          { t: "terms", items: [
            ["h1", "selektor (selector) — hansı elementlərə tətbiq olunacaq."],
            ["{ }", "bəyannamə bloku (declaration block)."],
            ["color", "xassə (property) — nəyi dəyişirik."],
            ["#38bdf8", "dəyər (value) — necə dəyişirik."],
            ["color: gray;", "bəyannamə (declaration). Sonda nöqtəli vergül MÜTLƏQDİR."],
            ["qayda (rule)", "selektor + blok birlikdə."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "CSS-i qoşmağın 3 yolu",
        blocks: [
          { t: "code", lang: "html", code: `<!-- 1. Xarici fayl (ƏN YAXŞISI) -->
<link rel="stylesheet" href="style.css">

<!-- 2. Daxili: head içində -->
<style>
  body { background: #05070d; }
</style>

<!-- 3. Inline: birbaşa elementə -->
<p style="color: red;">Qırmızı mətn</p>` },
          { t: "list", items: [
            "Xarici fayl — bir fayl bütün səhifələrə xidmət edir, brauzer onu keşləyir.",
            "Daxili <style> — tək səhifəlik kiçik stil və ya kritik CSS üçün.",
            "Inline — ən güclüdür, ən az idarə olunandır. Yalnız JS ilə dinamik dəyər verəndə.",
          ]},
          { t: "mistake", lang: "css", wrong: `p {\n  color: red\n  font-size: 18px;\n}`, right: `p {\n  color: red;\n  font-size: 18px;\n}`, why: "Nöqtəli vergül unudulanda brauzer iki sətri bir səhv bəyannamə sayır və HƏR İKİSİNİ atır. CSS səhv verməz — sadəcə susur." },
          { t: "mistake", lang: "html", wrong: `<p style="color:red">A</p>\n<p style="color:red">B</p>`, right: `<p class="xeta">A</p>\n<p class="xeta">B</p>\n<!-- .xeta { color: red; } -->`, why: "Eyni stili təkrar-təkrar inline yazmaq dəyişikliyi kabusa çevirir. Class bir yerdən idarə olunur." },
          { t: "tip", text: "DevTools (F12) → Elements → Styles: istənilən elementin hansı CSS-i aldığını görür və canlı dəyişə bilərsən. CSS öyrənməyin ən sürətli yolu." },
        ],
      },
      {
        level: "senior",
        title: "Brauzer CSS-i necə emal edir",
        blocks: [
          { t: "p", text: "Brauzer CSS-i parse edib CSSOM (CSS Object Model) qurur. DOM + CSSOM → render ağacı → layout (ölçü və mövqe) → paint (piksellər) → composite (qatların birləşməsi). CSS render-blocking-dir: CSSOM hazır olmadan ilk rəsm çəkilmir." },
          { t: "list", items: [
            "Parse səhvi olan bəyannamə atılır, qalan qayda işləyir — bu, gələcək xassələrin köhnə brauzerləri sındırmamasını təmin edir.",
            "@import zəncirvari yükləmə yaradır (fayl → fayl → fayl) — istehsalda (production) link və ya bundler işlət.",
            "Kritik CSS-i inline, qalanını asinxron yükləmək ilk ekranı sürətləndirir.",
            "Brauzerin öz default stilləri var (user agent stylesheet) — h1-in qalın olması oradan gəlir. Reset/normalize onları bərabərləşdirir.",
          ]},
          { t: "qa", items: [
            ["CSS niyə «cascading» adlanır?", "Bir elementə bir neçə qayda düşəndə hansının qalib gələcəyini pilləli (kaskad) alqoritm müəyyən edir."],
            ["@import niyə tövsiyə edilmir?", "Fayllar ardıcıl yüklənir, paralel yox — render gecikir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "color: blue; ifadəsində «color» nədir?", options: ["selektor", "xassə", "dəyər"], answer: 1, why: "Xassə nəyi dəyişdiyimizi deyir, dəyər — necə." },
          { t: "quiz", q: "Böyük saytda CSS-i harada saxlamaq ən yaxşısıdır?", options: ["inline style", "xarici .css faylı", "hər səhifədə <style>"], answer: 1, why: "Bir fayl, bir yer, keşlənir." },
        ],
      },
    ],
    exercise: {
      task: "Səhifənin fonunu tünd, h1-i mavi və 40px, p-ni boz və line-height 1.6 et. HTML-də bir h1 və bir p olsun.",
      starter: `<style>\n\n</style>\n<h1>Salam</h1>\n<p>CSS öyrənirəm.</p>\n`,
      expect: "body background tünd rəng; h1 color mavi və font-size 40px; p color boz, line-height 1.6; hər bəyannamə ; ilə bitir.",
    },
  },
  {
    slug: "selektorlar",
    title: "Selektorlar",
    intro: "Selektor CSS-in «ünvanıdır»: stilin hansı elementlərə düşəcəyini seçir. Düzgün selektor — təmiz və idarə olunan CSS.",
    sections: [
      {
        level: "baslangic",
        title: "Əsas selektorlar",
        blocks: [
          { t: "analogy", text: "Sinifdə müəllim deyir: «Hamı ayağa qalxsın» (teq selektoru), «Qızlar qalxsın» (class), «Aysel qalxsın» (id), «Birinci partadakılar qalxsın» (kombinator)." },
          { t: "code", lang: "css", code: `p        { }  /* bütün p-lər */
.kart    { }  /* class="kart" */
#menyu   { }  /* id="menyu" */
*        { }  /* hamısı */
h1, h2   { }  /* h1 VƏ h2 (qrup) */
a.aktiv  { }  /* həm a, həm .aktiv */` },
          { t: "terms", items: [
            ["teq selektoru", "teq adına görə: p, h1, button."],
            [".class", "nöqtə ilə — həmin class-ı olan bütün elementlər."],
            ["#id", "diyez ilə — tək element."],
            ["*", "universal selektor — hər element."],
            [",", "qruplaşdırma — eyni stil bir neçə selektora."],
          ]},
          { t: "tip", text: "Stil üçün demək olar həmişə class işlət. id-ni JS və anchor linklər üçün saxla." },
        ],
      },
      {
        level: "orta",
        title: "Kombinatorlar və atribut selektorları",
        blocks: [
          { t: "code", lang: "css", code: `nav a        { }  /* nav içindəki BÜTÜN a-lar (nəsil) */
ul > li      { }  /* yalnız birbaşa uşaq li-lər */
h2 + p       { }  /* h2-dən dərhal sonra gələn p */
h2 ~ p       { }  /* h2-dən sonra gələn bütün qardaş p-lər */

input[type="email"] { }  /* atribut dəyərinə görə */
a[href^="https"]    { }  /* https ilə BAŞLAYAN */
a[href$=".pdf"]     { }  /* .pdf ilə BİTƏN */
[data-aktiv]        { }  /* atributu olan */` },
          { t: "p", text: "Boşluq bir simvoldur, amma mənanı tamamilə dəyişir: a.aktiv — «aktiv class-lı a», a .aktiv — «a-nın içindəki .aktiv element»." },
          { t: "mistake", lang: "css", wrong: `.menyu .siyahi li a span { color: red; }`, right: `.menyu-link__ikon { color: red; }`, why: "Uzun zəncirli selektor HTML strukturuna bağlanır: bir div əlavə etsən, stil sınır. Həm də spesifiklik artır və üstündən yazmaq çətinləşir." },
          { t: "mistake", lang: "css", wrong: `.kart, { padding: 16px; }`, right: `.kart { padding: 16px; }`, why: "Qrupda səhv selektor (burada boş) olarsa, BÜTÜN qayda atılır." },
        ],
      },
      {
        level: "senior",
        title: "Brauzer selektorları sağdan sola oxuyur",
        blocks: [
          { t: "p", text: "Brauzer .menyu a selektorunu «hər a-nı götür, valideynlərində .menyu varmı yoxla» kimi sağdan sola yoxlayır. Ən sağdakı hissə (key selector) nə qədər dəqiq olsa, bir o qədər az element yoxlanır. Müasir mühərriklərdə bu fərq adətən kiçikdir, amma minlərlə qayda və node olanda hiss olunur." },
          { t: "code", lang: "css", code: `/* Müasir güclü selektorlar */
.kart:has(img)        { }  /* içində şəkil OLAN kart (valideyn selektoru) */
:is(h1, h2, h3) a     { }  /* qısa qruplaşdırma */
:where(.btn)          { }  /* spesifikliyi 0 olan qrup */
li:not(:last-child)   { }  /* sonuncudan başqa hamısı */` },
          { t: "list", items: [
            ":has() uzun illər «mümkün olmayan» valideyn selektoru idi — indi bütün müasir brauzerlərdə var.",
            ":where() spesifikliyi sıfırlayır — kitabxana/default stillər üçün ideal, istifadəçi asanlıqla üstündən yazır.",
            "Komponent əsaslı layihələrdə (React) düz class selektorları + BEM və ya CSS Modules/Tailwind — dərin zəncirlər yox.",
          ]},
          { t: "qa", items: [
            ["ul li ilə ul > li fərqi?", "Birincisi bütün nəsilləri (iç-içə siyahılar daxil), ikincisi yalnız birbaşa uşaqları seçir."],
            [":is() ilə :where() fərqi?", "Eyni seçir, amma :is() içindəki ən güclü selektorun spesifikliyini alır, :where() isə 0."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "class=\"btn\" olan elementi necə seçirik?", options: ["#btn", ".btn", "btn"], answer: 1, why: "Nöqtə — class, diyez — id." },
          { t: "quiz", q: "div > p nəyi seçir?", options: ["div içindəki bütün p-ləri", "div-in birbaşa uşağı olan p-ləri", "div-dən sonrakı p-ni"], answer: 1, why: "> yalnız birbaşa uşaq deməkdir." },
        ],
      },
    ],
    exercise: {
      task: "nav içindəki linkləri ağ, .aktiv class-lı linki mavi et; .pdf ilə bitən linklərə qırmızı rəng ver; siyahının sonuncudan başqa elementlərinə alt xətt (border-bottom) ver.",
      starter: `<style>\n\n</style>\n<nav>\n  <a href="/">Ana</a>\n  <a class="aktiv" href="/dersler">Dərslər</a>\n  <a href="plan.pdf">Plan</a>\n</nav>\n<ul><li>Bir</li><li>İki</li><li>Üç</li></ul>\n`,
      expect: "nav a ağ; nav a.aktiv (və ya .aktiv) mavi; a[href$=\".pdf\"] qırmızı; li:not(:last-child) border-bottom; id stil üçün işlədilməyib.",
    },
  },
  {
    slug: "kaskad",
    title: "Kaskad, irsiyyət və spesifiklik",
    intro: "Bir elementə bir neçə qayda düşəndə hansı qalib gəlir? «Niyə stilim işləmir?» sualının 90%-nin cavabı bu dərsdədir.",
    sections: [
      {
        level: "baslangic",
        title: "Üç qayda: sıra, güc, irsiyyət",
        blocks: [
          { t: "analogy", text: "Ailədə qərarlar: nənə deyir «saat 10-da yat», ana deyir «11-də», sonra ata gəlib deyir «11:30-da». Eyni səviyyədə olanlardan SONUNCU danışan qalib gəlir (sıra). Amma direktor (id) ailədən güclüdür (spesifiklik). Göz rəngi isə valideyndən keçir (irsiyyət)." },
          { t: "code", lang: "css", code: `p { color: red; }
p { color: blue; }      /* qalib: sonra gəlir */

.qeyd { color: green; }
p { color: orange; }    /* .qeyd olan p YAŞIL qalır — class teqdən güclüdür */

body { color: #ddd; font-family: Inter; }
/* body-nin içindəki bütün mətnlər bu rəngi və şrifti İRSƏN alır */` },
          { t: "terms", items: [
            ["kaskad (cascade)", "ziddiyyətli qaydalardan qalibi seçən alqoritm."],
            ["spesifiklik (specificity)", "selektorun «gücü»."],
            ["irsiyyət (inheritance)", "bəzi xassələrin valideyndən uşağa keçməsi."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Spesifikliyi hesablamaq",
        blocks: [
          { t: "p", text: "Spesifiklik üç rəqəmlə yazılır: (id, class, teq). Soldan sağa müqayisə olunur — bir id istənilən sayda class-dan güclüdür." },
          { t: "code", lang: "css", code: `p                    /* (0,0,1) */
.kart                /* (0,1,0) */
.kart p              /* (0,1,1) */
nav .menyu a:hover   /* (0,2,2)  — :hover psevdo-klass class sayılır */
#esas .kart          /* (1,1,0) */
style="..."          /* inline — hamısından güclü */
color: red !important; /* hər şeyi əzir — son çarə */` },
          { t: "list", items: [
            "İrsən keçənlər: color, font-*, line-height, text-align, visibility, cursor.",
            "Keçməyənlər: margin, padding, border, background, width, height, display.",
            "Məcburi irsiyyət: border: inherit. Sıfırlamaq: all: unset.",
          ]},
          { t: "mistake", lang: "css", wrong: `.btn { color: white !important; }`, right: `/* Kimin qalib gəldiyini DevTools-da tap,\n   lazım olsa selektoru düzəlt */\n.btn { color: white; }`, why: "!important «müharibə» başladır: sonra onu əzmək üçün yenə !important lazım olur. Səbəbi tap — adətən çox güclü bir selektordur." },
          { t: "mistake", lang: "css", wrong: `#header a { color: white; }\n.link-qirmizi { color: red; } /* işləmir! */`, right: `.header__link { color: white; }\n.link-qirmizi { color: red; }`, why: "id-li selektor (1,0,1) class-ı (0,1,0) həmişə üstələyir. Stillərdə id işlətməmək bu problemin kökünü kəsir." },
        ],
      },
      {
        level: "senior",
        title: "Kaskadın tam sırası və @layer",
        blocks: [
          { t: "p", text: "Kaskad spesifiklikdən əvvəl başqa pillələrə baxır: 1) mənşə və vaciblik (user-agent, istifadəçi, müəllif; !important bu sıranı TƏRSİNƏ çevirir), 2) kontekst (Shadow DOM), 3) element-ə bağlı (inline style), 4) kaskad qatları (@layer), 5) spesifiklik, 6) sıra." },
          { t: "code", lang: "css", code: `@layer reset, kitabxana, komponentler, utilities;

@layer kitabxana {
  #modal .button { padding: 20px; }  /* güclü selektor, amma aşağı qatda */
}
@layer komponentler {
  .button { padding: 12px; }          /* QALİB: qat sırası spesifiklikdən öndədir */
}` },
          { t: "list", items: [
            "@layer ilə xarici kitabxananın stillərini spesifiklik müharibəsi olmadan idarə edirsən. Tailwind 4 məhz layer-lərlə qurulub.",
            "Qatsız (unlayered) stillər bütün qatlardan güclüdür.",
            "Hesablanmış dəyər (computed value) irsən keçir: font-size: 2em uşağa «2em» kimi yox, piksel kimi keçir.",
            "Böyük layihədə spesifikliyi düz və aşağı saxla — hər şey (0,1,0) ətrafında olsun.",
          ]},
          { t: "qa", items: [
            ["(0,3,0) yoxsa (1,0,0) qalib gəlir?", "(1,0,0) — bir id istənilən sayda class-dan güclüdür."],
            ["!important-ı nə vaxt əsaslı işlətmək olar?", "Utility class-larda (.hidden) və üçüncü tərəf inline stilini əzmək lazım olanda."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı qalib gəlir: .kart .basliq və ya #ana h2?", options: [".kart .basliq", "#ana h2", "sonra yazılan"], answer: 1, why: "(1,0,1) > (0,2,0) — id class-lardan güclüdür." },
          { t: "quiz", q: "Hansı xassə irsən keçir?", options: ["padding", "color", "border"], answer: 1, why: "Mətnlə bağlı xassələr (color, font) irsən keçir." },
        ],
      },
    ],
    exercise: {
      task: "Aşağıdakı kodda .xeber-in qırmızı olmasını !important İŞLƏTMƏDƏN təmin et. Niyə işləmədiyini şərhdə (/* */) izah et.",
      starter: `<style>\n  #mesajlar p { color: gray; }\n  .xeber { color: red; }\n</style>\n<div id="mesajlar">\n  <p class="xeber">Vacib xəbər</p>\n</div>\n`,
      expect: "!important yoxdur; ya #mesajlar p id-siz class-a çevrilib, ya da .xeber selektoru kifayət qədər gücləndirilib (məs. #mesajlar .xeber); şərhdə spesifiklik (1,0,1) > (0,1,0) izah olunub.",
    },
  },
  {
    slug: "box-model",
    title: "Box model",
    intro: "CSS-də HƏR element düzbucaqlı qutudur. Qutunun 4 qatı var: məzmun, padding, border, margin. Layout-u başa düşmək bundan başlayır.",
    sections: [
      {
        level: "baslangic",
        title: "Qutunun 4 qatı",
        blocks: [
          { t: "analogy", text: "Hədiyyə qutusu: içindəki telefon — content. Telefonu qoruyan köpük — padding. Karton divar — border. Qutular arasında rəfdə qoyulan məsafə — margin." },
          { t: "code", lang: "css", code: `.kart {
  width: 300px;
  padding: 20px;          /* içəridən boşluq */
  border: 2px solid #1c2536;
  margin: 16px;           /* çöldən boşluq */
}` },
          { t: "terms", items: [
            ["content", "mətn, şəkil — width/height bunun ölçüsüdür (default)."],
            ["padding", "məzmunla border arasındakı boşluq; fon rəngi bura da yayılır."],
            ["border", "çərçivə: qalınlıq, üslub (solid, dashed), rəng."],
            ["margin", "elementlə qonşular arasındakı şəffaf boşluq."],
          ]},
          { t: "code", lang: "css", code: `/* Qısa yazılış: saat əqrəbi istiqamətində — yuxarı, sağ, aşağı, sol */
margin: 10px 20px 30px 40px;
margin: 10px 20px;   /* yuxarı-aşağı 10, sağ-sol 20 */
margin: 0 auto;      /* blok elementi üfüqi mərkəzləşdirir */` },
        ],
      },
      {
        level: "orta",
        title: "box-sizing — həyatı asanlaşdıran sətir",
        blocks: [
          { t: "p", text: "Default olaraq (content-box) width yalnız məzmuna aiddir. Yuxarıdakı .kart əslində 300 + 20·2 + 2·2 = 344px en tutur! border-box-da isə width padding və border-i də daxil edir — 300px yazırsan, 300px olur." },
          { t: "code", lang: "css", code: `*, *::before, *::after {
  box-sizing: border-box;
}` },
          { t: "tip", text: "Bu 3 sətri hər layihənin əvvəlinə yaz. Tailwind və demək olar bütün reset-lər bunu edir." },
          { t: "mistake", lang: "css", wrong: `.sutun { width: 50%; padding: 20px; }\n/* iki sütun yan-yana sığmır! */`, right: `.sutun { box-sizing: border-box; width: 50%; padding: 20px; }`, why: "content-box-da 50% + 40px padding = 50%-dən çox; iki sütun 100%-i keçir və alt sətrə düşür." },
          { t: "mistake", lang: "css", wrong: `span { margin-top: 20px; width: 100px; }`, right: `span { display: inline-block; margin-top: 20px; width: 100px; }`, why: "inline elementlərdə (span, a) width, height və şaquli margin işləmir. inline-block və ya block et." },
        ],
      },
      {
        level: "senior",
        title: "Margin collapse və müasir xassələr",
        blocks: [
          { t: "p", text: "Margin collapse: iki blok elementin üst-alt margin-ləri toplanmır, BÖYÜYÜ qalır. h2 { margin-bottom: 30px } və p { margin-top: 20px } arasında 50 yox, 30px olur. Valideynin padding/border-i yoxdursa, uşağın margin-top-u valideyndən «çölə sızır»." },
          { t: "list", items: [
            "Collapse flex və grid konteynerlərinin içində OLMUR — müasir layout-da problem azalır.",
            "Elementlər arası boşluğu margin yox, valideynin gap xassəsi ilə vermək daha proqnozlaşdırılandır.",
            "Məntiqi xassələr: margin-inline, padding-block — sağdan-sola dillərdə (ərəb) avtomatik düzgün işləyir.",
            "outline layout-a təsir etmir (yer tutmur) — fokus üçün ideal; outline: none yazıb əvəzini vermək a11y səhvidir.",
            "Padding və border ölçüsünün dəyişməsi layout (reflow) yaradır; vizual effekt üçün transform/box-shadow ucuzdur.",
          ]},
          { t: "qa", items: [
            ["Margin collapse nə vaxt baş verir?", "Normal axındakı blok elementlərin şaquli margin-ləri toxunanda; flex/grid, padding, border, BFC (overflow: hidden, display: flow-root) onu dayandırır."],
            ["border-box niyə default olmalıdır?", "Yazdığın width elementin həqiqi enidir — hesablama və responsive layout sadələşir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "content-box-da width: 200px, padding: 10px, border: 5px. Ümumi en?", options: ["200px", "230px", "215px"], answer: 1, why: "200 + 10·2 + 5·2 = 230px." },
          { t: "quiz", q: "Fon rəngi hansı qata yayılmır?", options: ["padding", "content", "margin"], answer: 2, why: "margin həmişə şəffafdır." },
        ],
      },
    ],
    exercise: {
      task: "Eni 320px olan .kart yarat: border-box, 24px padding, 1px boz border, 12px yuvarlaq künc (border-radius), səhifədə üfüqi mərkəzdə olsun.",
      starter: `<style>\n\n</style>\n<div class="kart">\n  <h2>Kart</h2>\n  <p>Box model məşqi.</p>\n</div>\n`,
      expect: "box-sizing: border-box; width: 320px; padding: 24px; border: 1px solid boz; border-radius: 12px; margin: 0 auto (və ya bərabər mərkəzləşdirmə).",
    },
  },
  {
    slug: "vahidler",
    title: "Ölçü vahidləri",
    intro: "px, %, em, rem, vw, vh, fr... Düzgün vahid seçmək saytın böyük ekranda da, telefonda da, böyük şrift sevən istifadəçidə də yaxşı görünməsi deməkdir.",
    sections: [
      {
        level: "baslangic",
        title: "Mütləq və nisbi vahidlər",
        blocks: [
          { t: "analogy", text: "px — xətkeşlə ölçmək: həmişə eyni. % — «otağın yarısı»: otaq böyüyəndə o da böyüyür. rem — «əsas addımın 2 qatı»: istifadəçi addımı böyütsə, hər şey mütənasib böyüyür." },
          { t: "code", lang: "css", code: `html { font-size: 100%; }   /* adətən 16px */

h1   { font-size: 2.5rem; }  /* 2.5 × 16 = 40px */
.box { width: 50%; }          /* valideynin yarısı */
.hero { min-height: 100vh; }  /* ekran hündürlüyü qədər */
.ikon { width: 24px; }        /* sabit ölçü */` },
          { t: "terms", items: [
            ["px", "piksel — sabit (əslində CSS pikseli, fiziki yox)."],
            ["%", "valideynin ölçüsünə nəzərən."],
            ["rem", "root em — html-in şrift ölçüsünə nəzərən."],
            ["em", "elementin ÖZ şrift ölçüsünə nəzərən (font-size-da — valideyninkinə)."],
            ["vw / vh", "viewport eninin / hündürlüyünün 1%-i."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Hansını nə vaxt?",
        blocks: [
          { t: "list", items: [
            "Şrift ölçüsü → rem. İstifadəçi brauzerdə şrifti böyüdəndə hörmət edilir.",
            "Komponent daxili boşluq (düymənin padding-i) → em: şrift böyüyəndə düymə də böyüyür.",
            "Layout enləri → %, fr (grid), max-width ilə.",
            "Border, kölgə, ikon → px.",
            "Tam ekran bölmə → 100dvh (mobil ünvan çubuğunu nəzərə alır).",
          ]},
          { t: "mistake", lang: "css", wrong: `.menyu { font-size: 1.2em; }\n.menyu .menyu { font-size: 1.2em; } /* 1.44em olur! */`, right: `.menyu { font-size: 1.2rem; }`, why: "em iç-içə elementlərdə vurulur (compounding): hər səviyyə böyüyür. rem həmişə köklə hesablanır." },
          { t: "mistake", lang: "css", wrong: `html { font-size: 10px; }`, right: `html { font-size: 100%; }`, why: "Kök ölçünü px ilə sabitləmək istifadəçinin brauzer şrift ayarını ləğv edir — zəif görən insanlar üçün a11y problemi." },
          { t: "mistake", lang: "css", wrong: `.hero { height: 100vh; }`, right: `.hero { min-height: 100dvh; }`, why: "Mobil brauzerlərdə 100vh ünvan çubuğunun altında qalır; height məzmun çox olanda kəsir. dvh və min-height daha etibarlıdır." },
        ],
      },
      {
        level: "senior",
        title: "Fluid ölçülər: clamp, min, max",
        blocks: [
          { t: "code", lang: "css", code: `h1 {
  /* min 2rem, ideal 5vw, maks 4rem */
  font-size: clamp(2rem, 1rem + 4vw, 4rem);
}
.konteyner {
  width: min(100% - 2rem, 72rem); /* kiçik ekranda kənarlarda boşluq, böyükdə maks 72rem */
  margin-inline: auto;
}
.kart { padding: max(1rem, 3%); }` },
          { t: "list", items: [
            "clamp() media query olmadan rəvan böyüyən tipografiya verir. Daxilində rem saxla ki, zoom işləsin (yalnız vw zoom-a reaksiya vermir — WCAG problemi).",
            "Container query vahidləri: cqi, cqw — viewport-a yox, konteynerin ölçüsünə nəzərən.",
            "ch — «0» simvolunun eni: max-width: 65ch oxunaqlı sətir uzunluğu verir.",
            "Brauzer ölçüləri subpikselə qədər hesablayır, sonra yuvarlaqlaşdırır — 33.333% sütunlarda 1px boşluq bundandır.",
            "1 CSS px ≠ 1 fiziki piksel: retina ekranda (DPR 2) 1px = 4 fiziki piksel.",
          ]},
          { t: "qa", items: [
            ["rem və em fərqi?", "rem kök (html) şriftinə, em elementin öz/valideyn şriftinə nəzərəndir; em iç-içə vurulur."],
            ["Niyə şrift üçün px yox rem?", "İstifadəçinin brauzerdəki default şrift ayarı rem-ə təsir edir, px-ə yox."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "html 16px olanda 1.5rem neçə pikseldir?", options: ["15px", "24px", "32px"], answer: 1, why: "1.5 × 16 = 24." },
          { t: "quiz", q: "Şrift ölçüsü üçün ən yaxşı vahid?", options: ["px", "rem", "vh"], answer: 1, why: "rem istifadəçi ayarlarına hörmət edir və iç-içə vurulmur." },
        ],
      },
    ],
    exercise: {
      task: "h1 üçün clamp ilə rəvan ölçü (min 2rem, maks 3.5rem), p üçün 1rem və max-width 65ch, .konteyner üçün width: min(100% - 2rem, 60rem) və mərkəzləşdirmə yaz.",
      starter: `<style>\n\n</style>\n<div class="konteyner">\n  <h1>Vahidlər</h1>\n  <p>Uzun bir paraqraf mətni burada olur və oxunaqlı uzunluqda qalmalıdır.</p>\n</div>\n`,
      expect: "h1 font-size clamp(2rem, ..., 3.5rem) və ortada rem+vw; p font-size 1rem, max-width 65ch; .konteyner width min(100% - 2rem, 60rem) və margin-inline: auto (və ya margin 0 auto); html font-size px ilə sabitlənməyib.",
    },
  },
  {
    slug: "renger",
    title: "Rənglər və fon",
    intro: "Rəng yazmağın yolları (hex, rgb, hsl, oklch), şəffaflıq, qradiyent və fon şəkilləri. Kontrast — gözəllikdən əvvəl oxunaqlılıqdır.",
    sections: [
      {
        level: "baslangic",
        title: "Rəng yazılışları",
        blocks: [
          { t: "analogy", text: "Rəssam palitrası: hex — boya qutusunun kodu (#38bdf8), rgb — üç boya qarışığı (qırmızı, yaşıl, göy), hsl — «hansı rəng, nə qədər doymuş, nə qədər açıq» sualına cavab." },
          { t: "code", lang: "css", code: `.a { color: red; }                    /* ad */
.b { color: #38bdf8; }                /* hex: RR GG BB (00–ff) */
.c { color: rgb(56 189 248); }        /* 0–255 */
.d { color: rgb(56 189 248 / 50%); }  /* 50% şəffaf */
.e { color: hsl(199 93% 60%); }       /* çalar, doyma, açıqlıq */
.f { background-color: #0c111c; }` },
          { t: "terms", items: [
            ["color", "mətnin rəngi."],
            ["background-color", "fonun rəngi."],
            ["hex", "16-lıq say sistemində rəng kodu: #rrggbb, qısa #rgb."],
            ["alpha / opacity", "şəffaflıq: 0 — görünməz, 1 (100%) — tam."],
            ["hue (çalar)", "rəng çarxında bucaq: 0 qırmızı, 120 yaşıl, 240 göy."],
          ]},
          { t: "tip", text: "hsl ilə rəng ailəsi yaratmaq asandır: eyni hue, yalnız açıqlığı dəyiş — hsl(199 93% 30%), 50%, 70%." },
        ],
      },
      {
        level: "orta",
        title: "Qradiyent, fon şəkli, opacity",
        blocks: [
          { t: "code", lang: "css", code: `.hero {
  background: linear-gradient(135deg, #062a43, #05070d 70%);
}
.isiq {
  background: radial-gradient(circle at top, #38bdf833, transparent 60%);
}
.banner {
  background-image: url("dag.webp");
  background-size: cover;       /* sahəni doldur, kəsilə bilər */
  background-position: center;
  background-repeat: no-repeat;
}` },
          { t: "list", items: [
            "Qradiyent şəkil sayılır — background-image (və ya background) ilə yazılır, background-color ilə yox.",
            "cover — boş yer qalmır, contain — şəkil tam görünür, amma boşluq qala bilər.",
            "Bir neçə fon vergüllə üst-üstə qoyulur: birinci yazılan ən üstdədir.",
          ]},
          { t: "mistake", lang: "css", wrong: `.kart { opacity: 0.5; }  /* yalnız fonu solğun etmək istəyirdik */`, right: `.kart { background: rgb(12 17 28 / 50%); }`, why: "opacity bütün elementi — mətni, uşaqları da — şəffaf edir. Yalnız fon üçün rəngin alpha kanalını işlət." },
          { t: "mistake", lang: "css", wrong: `.duyme { color: #777; background: #555; }`, right: `.duyme { color: #fff; background: #0369a1; }`, why: "Kontrast çox aşağıdır — oxumaq çətindir. WCAG AA: adi mətn üçün ən azı 4.5:1, böyük mətn üçün 3:1. DevTools-da rəng seçicisi nisbəti göstərir." },
        ],
      },
      {
        level: "senior",
        title: "Müasir rəng sistemləri və dizayn tokenləri",
        blocks: [
          { t: "code", lang: "css", code: `:root {
  --accent: oklch(0.75 0.14 230);
  --accent-soft: color-mix(in oklch, var(--accent) 20%, transparent);
  color-scheme: dark light;
}
@media (prefers-color-scheme: light) {
  :root { --accent: oklch(0.55 0.16 230); }
}` },
          { t: "list", items: [
            "oklch qavrayış baxımından bərabərdir: eyni L dəyərli rənglər gözə eyni parlaqlıqda görünür (hsl-də sarı və göy fərqli görünür). Palitra yaratmaq üçün ideal.",
            "color-mix() ilə preprocessor olmadan açıq/tünd variant yarat.",
            "color-scheme brauzerə scrollbar və form elementlərini də tünd çəkməyi deyir.",
            "Rəngi heç vaxt TƏK məlumat daşıyıcısı etmə (məs. yalnız qırmızı = səhv) — rəng korları üçün ikon/mətn əlavə et.",
            "Təhlükəsizlik: istifadəçiyə öz CSS-ini (profil rəngi, tema) yazmağa icazə verirsənsə, yalnız rəng dəyərini qəbul et və yoxla (regex/whitelist). Sərbəst CSS url() ilə məlumat sızdıra (CSS exfiltration) və saxta elementləri üstə çəkə bilər (clickjacking).",
          ]},
          { t: "qa", items: [
            ["opacity ilə rgba fərqi?", "opacity elementi və bütün uşaqlarını, rgba/alpha yalnız o rəng xassəsini şəffaf edir."],
            ["WCAG AA kontrast tələbi?", "Adi mətn 4.5:1, böyük (24px+ və ya 18.66px qalın) 3:1."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yalnız fonu yarımşəffaf etmək üçün?", options: ["opacity: 0.5", "background: rgb(0 0 0 / 50%)", "visibility: half"], answer: 1, why: "Alpha kanalı yalnız fona təsir edir." },
          { t: "quiz", q: "hsl(0 100% 50%) hansı rəngdir?", options: ["göy", "qırmızı", "yaşıl"], answer: 1, why: "Hue 0° — qırmızı." },
        ],
      },
    ],
    exercise: {
      task: "Tünd .hero bölməsi yarat: 135° bucaqla iki rəngli linear-gradient fon, ağ başlıq, alpha ilə yarımşəffaf fonlu .etiket (opacity işlətmədən).",
      starter: `<style>\n\n</style>\n<section class="hero">\n  <span class="etiket">Yeni</span>\n  <h1>Rənglər</h1>\n</section>\n`,
      expect: "hero-da linear-gradient(135deg, ...); h1 ağ və kontrast yaxşı; .etiket fonu rgb/hsl alpha ilə, opacity işlədilməyib.",
    },
  },
  {
    slug: "tipografiya",
    title: "Tipografiya",
    intro: "Mətn saytın 90%-idir. Şrift, ölçü, sətir aralığı və sətir uzunluğu düzgün olanda sayt «bahalı» görünür və rahat oxunur.",
    sections: [
      {
        level: "baslangic",
        title: "Şrift xassələri",
        blocks: [
          { t: "analogy", text: "Yaxşı tipografiya — yaxşı səs operatoru kimidir: işini düzgün görəndə heç kim fərq etmir, səhv edəndə hamı əziyyət çəkir." },
          { t: "code", lang: "css", code: `body {
  font-family: Inter, system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #cbd5e1;
}
h1 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.qeyd {
  font-style: italic;
  text-align: center;
  text-transform: uppercase;
  text-decoration: underline;
}` },
          { t: "terms", items: [
            ["font-family", "şrift adı; vergüllə ehtiyat şriftlər (fallback) sırası."],
            ["sans-serif / serif / monospace", "ümumi ailələr: ayaqsız, ayaqlı, eyni enli (kod üçün)."],
            ["font-weight", "qalınlıq: 100–900; 400 normal, 700 qalın."],
            ["line-height", "sətir hündürlüyü; vahidsiz yazılır (1.6 = şriftin 1.6 qatı)."],
            ["letter-spacing", "hərflər arası məsafə."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Oxunaqlılıq qaydaları",
        blocks: [
          { t: "list", items: [
            "Əsas mətn 16px-dən kiçik olmasın.",
            "Sətir uzunluğu 45–75 simvol: max-width: 65ch.",
            "Mətndə line-height 1.5–1.7, başlıqlarda 1.1–1.3.",
            "Böyük başlıqlarda letter-spacing bir az mənfi, kiçik UPPERCASE etiketlərdə müsbət.",
            "Bir saytda 2 şrift ailəsi kifayətdir (mətn + kod/başlıq).",
          ]},
          { t: "code", lang: "css", code: `@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-weight: 100 900;   /* variable font: bütün qalınlıqlar bir faylda */
  font-display: swap;
}` },
          { t: "mistake", lang: "css", wrong: `p { line-height: 20px; }`, right: `p { line-height: 1.6; }`, why: "Piksel sətir hündürlüyü şrift böyüyəndə böyümür — sətirlər üst-üstə minir. Vahidsiz dəyər uşaqlara da nisbət kimi keçir." },
          { t: "mistake", lang: "css", wrong: `body { font-family: "Comic Sans", "Papyrus"; }`, right: `body { font-family: "Inter", system-ui, sans-serif; }`, why: "Ümumi ailə (sans-serif) ilə bitməyən siyahıda şrift tapılmasa brauzer default (çox vaxt serif) şrifti götürür." },
        ],
      },
      {
        level: "senior",
        title: "Şrift yükləmə performansı",
        blocks: [
          { t: "p", text: "Şrift yüklənənə qədər brauzer ya mətni gizlədir (FOIT), ya ehtiyat şriftlə göstərib sonra dəyişir (FOUT). font-display: swap ikincisini seçir — mətn dərhal görünür. Amma şriftlər fərqli ölçüdə olduğu üçün dəyişmə layout shift (CLS) yaradır." },
          { t: "list", items: [
            "Yalnız WOFF2, yalnız lazım olan dil dəstləri (unicode-range / subset): Azərbaycanca üçün latin + latin-ext (ə, ğ, ı, ş).",
            "Kritik şrifti <link rel=\"preload\" as=\"font\" crossorigin> ilə yüklə.",
            "size-adjust, ascent-override ilə ehtiyat şrifti əsas şriftə uyğunlaşdır → CLS sıfıra yaxın. next/font bunu avtomatik edir.",
            "Variable font bir faylda bütün qalınlıqları saxlayır — 4–5 fayl əvəzinə 1 sorğu.",
            "Təhlükəsizlik və məxfilik: üçüncü tərəf şrift CDN-i hər ziyarətçinin IP-sini həmin şirkətə ötürür (Avropada GDPR cəriməsi olub). Şriftləri öz serverində saxla (self-host).",
          ]},
          { t: "qa", items: [
            ["font-display: swap nə edir?", "Şrift gələnə qədər ehtiyat şriftlə mətni göstərir, gələndə dəyişir."],
            ["line-height niyə vahidsiz yazılır?", "Uşaq elementlər hesablanmış piksel yox, nisbət alır — öz şrift ölçüsünə uyğunlaşır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Oxunaqlı sətir uzunluğu üçün?", options: ["width: 100%", "max-width: 65ch", "font-size: 12px"], answer: 1, why: "65 simvol göz üçün rahat uzunluqdur." },
        ],
      },
    ],
    exercise: {
      task: "Məqalə stili: body üçün system-ui ilə bitən şrift siyahısı və line-height 1.6; article max-width 65ch və mərkəzdə; h1 qalın (800), line-height 1.1, letter-spacing mənfi.",
      starter: `<style>\n\n</style>\n<article>\n  <h1>Tipografiya</h1>\n  <p>Uzun bir paraqraf: yaxşı tipografiya oxucunu yormur və mətni rahat izləməyə imkan verir.</p>\n</article>\n`,
      expect: "font-family ümumi ailə ilə bitir; body line-height vahidsiz 1.5–1.7; article max-width 65ch və margin auto; h1 font-weight 800, line-height ~1.1, letter-spacing mənfi.",
    },
  },
  {
    slug: "display",
    title: "Display və axın",
    intro: "display elementin necə yer tutduğunu deyir: tam sətir (block), mətn kimi (inline), yoxsa öz uşaqlarını düzən konteyner (flex, grid).",
    sections: [
      {
        level: "baslangic",
        title: "block, inline, inline-block, none",
        blocks: [
          { t: "analogy", text: "block — kitab rəfindəki kitab: hər biri tam rəfi tutur, növbəti altdan başlayır. inline — cümlədəki söz: yan-yana düzülür, sətir dolanda aşağı keçir. inline-block — sözlərin arasında qoyulmuş kiçik qutu: yan-yana durur, amma öz ölçüsü var." },
          { t: "code", lang: "css", code: `div, p, h1, section { display: block; }   /* default */
span, a, strong      { display: inline; }  /* default */

.etiket { display: inline-block; padding: 4px 8px; }
.gizli  { display: none; }   /* yer tutmur, ekran oxuyucu da görmür */` },
          { t: "terms", items: [
            ["normal axın (normal flow)", "elementlərin CSS olmadan yuxarıdan aşağı, soldan sağa düzülməsi."],
            ["block", "tam en tutur, yeni sətirdən başlayır, width/height/margin işləyir."],
            ["inline", "məzmun qədər yer tutur, width/height və şaquli margin işləmir."],
            ["inline-block", "yan-yana durur + ölçü verilə bilir."],
            ["none", "element render olunmur."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Gizlətməyin 3 yolu",
        blocks: [
          { t: "code", lang: "css", code: `.a { display: none; }        /* yer yox, oxuyucu yox, klik yox */
.b { visibility: hidden; }   /* yer QALIR, görünmür, oxuyucu yox */
.c { opacity: 0; }           /* yer qalır, KLİKLƏNİR, oxuyucu oxuyur */

/* Yalnız ekran oxuyucu üçün görünən mətn */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip-path: inset(50%); white-space: nowrap;
}` },
          { t: "mistake", lang: "css", wrong: `.menyu { opacity: 0; }  /* bağlı menyu */`, right: `.menyu { visibility: hidden; opacity: 0; }\n.menyu.acig { visibility: visible; opacity: 1; }`, why: "opacity: 0 olan menyu görünməz, amma kliklənir və Tab ilə fokuslanır — istifadəçi görünməz linklərə düşür." },
          { t: "mistake", lang: "css", wrong: `a { width: 200px; height: 40px; }`, right: `a { display: inline-block; width: 200px; height: 40px; }`, why: "inline element ölçü qəbul etmir." },
          { t: "tip", text: "HTML hidden atributu = display: none. Amma CSS-də display: flex yazsan hidden «sınır» — [hidden] { display: none !important } reset-i bunun üçündür." },
        ],
      },
      {
        level: "senior",
        title: "Formatlama kontekstləri",
        blocks: [
          { t: "p", text: "display əslində iki şeyi təyin edir: xarici (outer) — element valideynin axınında necə davranır (block/inline), daxili (inner) — uşaqlarını necə düzür (flow, flex, grid). display: inline-flex = xaricdən inline, daxildən flex. Yeni sintaksis bunu açıq yazır: display: inline flex." },
          { t: "list", items: [
            "BFC (block formatting context) — float-ları saxlayan, margin collapse-ı dayandıran müstəqil sahə. display: flow-root ən təmiz yolla BFC yaradır.",
            "display: contents — elementin qutusunu silir, uşaqlar birbaşa nənəyə qoşulur. Diqqət: bəzi brauzerlərdə semantika (button, list) itə bilər.",
            "display dəyişikliyi layout-u tam yenidən hesablatdırır; animasiyada istifadə etmə.",
            "content-visibility: auto — ekrandan kənar bölmələrin render-ini təxirə salır, uzun səhifələrdə böyük qazanc.",
            "Təhlükəsizlik: display: none ilə gizlənən məlumat GİZLİ DEYİL — HTML-də qalır, «View Source» ilə görünür. Həssas məlumatı serverdə filtrlə.",
          ]},
          { t: "qa", items: [
            ["display: none ilə visibility: hidden fərqi?", "none yer tutmur və layout-dan çıxır; hidden yer tutur, sadəcə görünmür."],
            ["BFC nədir, necə yaradılır?", "Müstəqil layout sahəsi; flow-root, overflow: hidden, flex/grid uşaqları, position: absolute ilə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı element default olaraq block-dur?", options: ["<span>", "<a>", "<p>"], answer: 2, why: "p, div, h1 block; span, a inline." },
          { t: "quiz", q: "Element görünməsin, amma yeri qalsın:", options: ["display: none", "visibility: hidden", "width: 0"], answer: 1, why: "visibility: hidden yeri saxlayır." },
        ],
      },
    ],
    exercise: {
      task: "Üç .etiket span-ı yan-yana, padding-li və ölçülü düz (inline-block). .gizli class-ını yer tutmayan, .sr-only class-ını yalnız ekran oxuyucunun görəcəyi şəkildə yaz.",
      starter: `<style>\n\n</style>\n<span class="etiket">HTML</span>\n<span class="etiket">CSS</span>\n<span class="etiket">JS</span>\n<p class="gizli">Gizli</p>\n<button>🔍<span class="sr-only">Axtar</span></button>\n`,
      expect: ".etiket display: inline-block və padding; .gizli display: none; .sr-only position absolute, 1px ölçü, overflow hidden, clip(-path).",
    },
  },
  {
    slug: "position",
    title: "Position",
    intro: "position elementi normal axından çıxarıb istədiyin yerə «yapışdırır»: relative, absolute, fixed, sticky. Modal, dropdown, sticky header — hamısı bununla qurulur.",
    sections: [
      {
        level: "baslangic",
        title: "5 dəyər",
        blocks: [
          { t: "analogy", text: "static — sırada duran adam. relative — sırada yerini saxlayıb bir addım kənara çəkilən adam. absolute — sıradan çıxıb otaqda (ən yaxın «yerləşmiş» valideyndə) istədiyi yerə gedən adam. fixed — pəncərəyə yapışdırılmış stiker: otaq sürüşsə də, yerində qalır. sticky — sırada gedir, divara çatanda yapışır." },
          { t: "code", lang: "css", code: `.kart { position: relative; }        /* uşaqlar üçün istinad nöqtəsi */
.kart .nisan {
  position: absolute;
  top: 8px; right: 8px;              /* kartın küncündən */
}
.chat-duymesi {
  position: fixed;
  bottom: 24px; right: 24px;         /* ekranın küncündən */
}
.header {
  position: sticky;
  top: 0;                            /* yuxarı çatanda yapış */
  z-index: 10;
}` },
          { t: "terms", items: [
            ["static", "default; top/left işləmir."],
            ["relative", "öz yerinə nəzərən sürüşür, yeri boş qalmır."],
            ["absolute", "axından çıxır; ən yaxın position-u static OLMAYAN valideynə nəzərən yerləşir."],
            ["fixed", "viewport-a (ekrana) nəzərən; sürüşmədə qalır."],
            ["sticky", "scroll konteynerində həddə çatana qədər normal, sonra yapışır."],
            ["top/right/bottom/left", "ofset (inset) xassələri."],
            ["z-index", "üst-üstə düşəndə hansı yuxarıda olsun."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Tipik naxışlar və səhvlər",
        blocks: [
          { t: "code", lang: "css", code: `/* Tam ekran örtük (overlay) */
.overlay { position: fixed; inset: 0; background: rgb(0 0 0 / 60%); }

/* Mərkəzləşdirmə */
.modal {
  position: fixed;
  top: 50%; left: 50%;
  translate: -50% -50%;
}` },
          { t: "mistake", lang: "css", wrong: `.nisan { position: absolute; top: 0; right: 0; }\n/* valideyndə position yoxdur */`, right: `.kart { position: relative; }\n.nisan { position: absolute; top: 0; right: 0; }`, why: "Valideyn yerləşməyibsə, absolute element bütün səhifənin küncünə uçur. Valideynə position: relative ver." },
          { t: "mistake", lang: "css", wrong: `.header { position: sticky; }`, right: `.header { position: sticky; top: 0; }`, why: "sticky üçün hədd (top/bottom) mütləqdir. Valideyndə overflow: hidden olsa da sticky işləmir." },
          { t: "tip", text: "inset: 0 = top: 0; right: 0; bottom: 0; left: 0." },
        ],
      },
      {
        level: "senior",
        title: "Stacking context və z-index müharibələri",
        blocks: [
          { t: "p", text: "z-index yalnız eyni stacking context daxilində müqayisə olunur. position + z-index, opacity < 1, transform, filter, isolation: isolate yeni kontekst yaradır. Valideyni z-index: 1 olan elementin uşağı z-index: 9999 olsa belə, qonşu kontekstdəki z-index: 2-nin üstünə çıxa bilməz." },
          { t: "list", items: [
            "z-index-ləri miqyasla təyin et (dizayn tokenləri): --z-dropdown: 10, --z-header: 20, --z-modal: 50, --z-toast: 60.",
            "Komponentə isolation: isolate ver — daxili z-index-lər çölə sızmasın.",
            "transform olan valideyn fixed uşaq üçün yeni istinad olur — modal «ekrana» yox, valideynə yapışır. Ona görə modallar portal ilə body-ə render olunur.",
            "Müasir alternativ: <dialog> elementi və popover atributu brauzerin «top layer»-ində açılır — z-index lazım deyil.",
            "Təhlükəsizlik — clickjacking: başqa sayt sənin saytını şəffaf iframe-də absolute yerləşdirib düymənin üstünə öz «oyununu» qoya bilər. Qoruma: CSP frame-ancestors 'none' / X-Frame-Options: DENY (bu saytda var).",
          ]},
          { t: "qa", items: [
            ["z-index: 9999 niyə işləmir?", "Element başqa stacking context-in içindədir və ya position-u static-dir."],
            ["absolute element nəyə nəzərən yerləşir?", "position-u static olmayan ən yaxın əcdada (containing block), yoxsa ilkin konteynerə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Sürüşdürəndə ekranın küncündə qalan «yuxarı qayıt» düyməsi üçün?", options: ["absolute", "fixed", "relative"], answer: 1, why: "fixed viewport-a bağlıdır." },
          { t: "quiz", q: "Kartın küncünə nişan qoymaq üçün kart hansı position almalıdır?", options: ["static", "relative", "sticky"], answer: 1, why: "relative valideyn absolute uşaq üçün istinad olur." },
        ],
      },
    ],
    exercise: {
      task: "Kart yarat: sağ yuxarı küncündə absolute 'YENİ' nişanı. Səhifənin yuxarısına sticky header, sağ aşağı küncə fixed düymə qoy.",
      starter: `<style>\n\n</style>\n<header class="header">Logo</header>\n<div class="kart">\n  <span class="nisan">YENİ</span>\n  <h2>Kurs</h2>\n</div>\n<button class="yuxari">↑</button>\n<div style="height:2000px"></div>\n`,
      expect: ".kart position: relative; .nisan absolute + top/right; .header sticky + top: 0 + z-index; .yuxari fixed + bottom/right.",
    },
  },
  {
    slug: "flexbox",
    title: "Flexbox",
    intro: "Flexbox bir istiqamətdə (sətir və ya sütun) elementləri düzmək, aralarına boşluq qoymaq və mərkəzləşdirmək üçündür. Menyular, kartlar, düymə qrupları — gündəlik işin yarısı.",
    sections: [
      {
        level: "baslangic",
        title: "Konteyner və elementlər",
        blocks: [
          { t: "analogy", text: "Flex konteyner — avtobusun oturacaq sırasıdır. justify-content sərnişinləri sıra boyunca (əsas ox) yerləşdirir: hamı qabağa, hamı arxaya, bərabər aralıqla. align-items isə hər oturacaqda necə oturduqlarını (çarpaz ox): yuxarıda, ortada, aşağıda." },
          { t: "code", lang: "css", code: `.konteyner {
  display: flex;
  flex-direction: row;          /* əsas ox: üfüqi (default) */
  justify-content: space-between; /* əsas ox boyunca */
  align-items: center;          /* çarpaz ox boyunca */
  gap: 16px;                    /* elementlər arası boşluq */
}

/* Mükəmməl mərkəzləşdirmə */
.merkez { display: flex; justify-content: center; align-items: center; }` },
          { t: "terms", items: [
            ["flex container", "display: flex verilən valideyn."],
            ["flex item", "onun BİRBAŞA uşaqları."],
            ["main axis (əsas ox)", "flex-direction istiqaməti: row — üfüqi, column — şaquli."],
            ["cross axis (çarpaz ox)", "əsas oxa perpendikulyar."],
            ["justify-content", "əsas oxda paylanma: flex-start, center, space-between, space-around, space-evenly."],
            ["align-items", "çarpaz oxda düzülüş: stretch (default), center, flex-start, flex-end."],
            ["gap", "elementlər arası məsafə."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "flex: grow, shrink, basis və wrap",
        blocks: [
          { t: "code", lang: "css", code: `.sidebar { flex: 0 0 250px; }  /* böyümə, kiçilmə, 250px sabit */
.mezmun  { flex: 1; }          /* qalan bütün yeri tut */

.kartlar { display: flex; flex-wrap: wrap; gap: 1rem; }
.kartlar > * { flex: 1 1 240px; }  /* min ~240px, yer varsa böyü, sığmasa alt sətrə keç */

.navbar .cixis { margin-left: auto; }  /* sağa it */` },
          { t: "list", items: [
            "flex: grow shrink basis. flex: 1 = «qalan yerdən bərabər pay al».",
            "flex-wrap: wrap — sığmayan elementlər yeni sətrə keçir (default nowrap — sıxılır).",
            "margin-left: auto flex-də qalan bütün boşluğu udur — elementi kənara itələyir.",
            "align-self — tək bir elementin çarpaz oxda yerini dəyişir.",
            "column istiqamətində oxlar dəyişir: justify-content şaquli, align-items üfüqi işləyir.",
          ]},
          { t: "mistake", lang: "css", wrong: `.kart { margin-right: 16px; }\n.kart:last-child { margin-right: 0; }`, right: `.kartlar { display: flex; gap: 16px; }`, why: "gap yalnız elementlər ARASINA boşluq qoyur — kənarlarda artıq margin, son element üçün xüsusi qayda lazım deyil." },
          { t: "mistake", lang: "css", wrong: `.mezmun { flex: 1; }\n/* uzun kod sətri konteyneri partladır */`, right: `.mezmun { flex: 1; min-width: 0; }`, why: "Flex elementin default min-width: auto-dur — məzmunundan kiçik ola bilmir. Uzun söz/kod/cədvəl daşıb layout-u sındırır. min-width: 0 bunu həll edir." },
        ],
      },
      {
        level: "senior",
        title: "Flex alqoritmi və nə vaxt Grid",
        blocks: [
          { t: "p", text: "Brauzer əvvəl hər elementin flex-basis-ini (və ya məzmun ölçüsünü) hesablayır, cəmini konteynerlə müqayisə edir. Boş yer qalırsa, onu flex-grow nisbətində paylayır; yer çatmırsa, flex-shrink × basis nisbətində kiçildir (böyük element daha çox kiçilir). min/max-width bu prosesi məhdudlaşdırır və yenidən paylanma dövrü başlayır." },
          { t: "list", items: [
            "Flex — bir ölçülü, məzmundan çıxan (content-out) layout: menyu, alət paneli, element sırası.",
            "Grid — iki ölçülü, layout-dan çıxan (layout-in): səhifə skeleti, kart torları, sütunların düzlənməsi.",
            "order ilə vizual sıranı dəyişmək klaviatura/ekran oxuyucu sırasını DƏYİŞMİR — fokus «tullanır». HTML sırasını düzgün yaz.",
            "flex-basis: 0 vs auto: flex: 1 (basis 0%) elementləri məzmundan asılı olmayaraq bərabər edir; flex: auto məzmuna görə.",
            "Təhlükəsizlik/UX: istifadəçi məzmunu (uzun URL, ad) layout-u sındıra bilər — overflow-wrap: anywhere və min-width: 0 ilə qoru; sınmış layout bəzən düymələri görünməz edir.",
          ]},
          { t: "qa", items: [
            ["justify-content ilə align-items fərqi?", "Biri əsas ox, digəri çarpaz ox boyunca düzür."],
            ["flex: 1 nəyin qısaltmasıdır?", "flex-grow: 1; flex-shrink: 1; flex-basis: 0%."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Elementi həm üfüqi, həm şaquli mərkəzə qoymaq üçün flex-də?", options: ["justify-content + align-items: center", "text-align: center", "margin: center"], answer: 0, why: "İki oxun hər birində center." },
          { t: "quiz", q: "flex-direction: column olanda justify-content hansı istiqamətdə işləyir?", options: ["üfüqi", "şaquli", "işləmir"], answer: 1, why: "Əsas ox şaquli olur." },
        ],
      },
    ],
    exercise: {
      task: "Navbar: solda loqo, ortada 3 link, sağda 'Giriş' düyməsi (margin-left: auto). Altında flex-wrap ilə 3 kart: hər biri min ~200px, bərabər böyüsün, aralarında gap.",
      starter: `<style>\n\n</style>\n<nav class="navbar">\n  <b>Logo</b>\n  <a href="#">Ana</a><a href="#">Dərslər</a><a href="#">Əlaqə</a>\n  <button class="giris">Giriş</button>\n</nav>\n<div class="kartlar">\n  <div class="kart">1</div><div class="kart">2</div><div class="kart">3</div>\n</div>\n`,
      expect: ".navbar display flex, align-items center, gap; .giris margin-left: auto; .kartlar flex + flex-wrap: wrap + gap; .kart flex: 1 1 ~200px; margin hack-ları yoxdur.",
    },
  },
  {
    slug: "grid",
    title: "CSS Grid",
    intro: "Grid iki ölçülü layout sistemidir: sətirlər VƏ sütunlar birlikdə. Səhifə skeleti və kart torları üçün ən güclü alət.",
    sections: [
      {
        level: "baslangic",
        title: "Sütunlar, sətirlər, fr",
        blocks: [
          { t: "analogy", text: "Grid — şahmat taxtası və ya Excel cədvəlidir: əvvəl xətləri çəkirsən (sütun və sətirlər), sonra elementləri xanalara qoyursan. Bir element bir neçə xananı tuta bilər." },
          { t: "code", lang: "css", code: `.tor {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* 3 bərabər sütun */
  /* qısa: repeat(3, 1fr) */
  gap: 1rem;
}
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;     /* sabit sidebar + qalan yer */
}
.genis { grid-column: span 2; }         /* 2 sütun tut */` },
          { t: "terms", items: [
            ["grid-template-columns", "sütunların sayı və eni."],
            ["grid-template-rows", "sətirlərin hündürlüyü."],
            ["fr", "fraction — qalan boş yerin bir payı."],
            ["repeat(n, x)", "eyni ölçünü n dəfə təkrarla."],
            ["grid-column: span 2", "element 2 sütun en tutsun."],
            ["track", "bir sütun və ya sətir."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Responsive tor və adlı sahələr",
        blocks: [
          { t: "code", lang: "css", code: `/* Media query olmadan responsive kartlar */
.kartlar {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

/* Səhifə skeleti — sahə adları ilə */
.sehife {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
}
.sehife > header { grid-area: header; }
.sehife > aside  { grid-area: sidebar; }
.sehife > main   { grid-area: main; }
.sehife > footer { grid-area: footer; }` },
          { t: "list", items: [
            "minmax(240px, 1fr) — sütun ən azı 240px, yer varsa böyüyür.",
            "auto-fill boş sütunları saxlayır, auto-fit onları yığıb elementləri genişləndirir.",
            "grid-template-areas layout-u «şəkil kimi» göstərir — oxumaq çox asandır.",
            "place-items: center — grid-də bir sətirlə mərkəzləşdirmə.",
          ]},
          { t: "mistake", lang: "css", wrong: `grid-template-columns: 33.33% 33.33% 33.33%;\ngap: 20px;  /* üfüqi scroll yaranır */`, right: `grid-template-columns: repeat(3, 1fr);\ngap: 20px;`, why: "Faiz + gap 100%-i keçir. fr gap çıxılandan SONRA qalan yeri bölür." },
          { t: "mistake", lang: "css", wrong: `grid-template-columns: repeat(3, 1fr);\n/* uzun kod sütunu partladır */`, right: `grid-template-columns: repeat(3, minmax(0, 1fr));`, why: "1fr əslində minmax(auto, 1fr)-dir — məzmundan kiçilə bilmir. minmax(0, 1fr) həqiqi bərabər sütun verir." },
        ],
      },
      {
        level: "senior",
        title: "Subgrid, implicit tor və a11y",
        blocks: [
          { t: "code", lang: "css", code: `.kartlar { display: grid; grid-template-columns: repeat(3, 1fr); }
.kart {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;   /* başlıq, mətn, düymə BÜTÜN kartlarda eyni sətirdə */
}` },
          { t: "list", items: [
            "Implicit grid: elementlər təyin olunmuş sətirlərdən çox olanda brauzer yeni sətirlər yaradır; ölçüsünü grid-auto-rows idarə edir.",
            "grid-auto-flow: dense boşluqları doldurur, amma vizual sıra DOM sırasından ayrılır — klaviatura istifadəçisi üçün çaşdırıcıdır.",
            "subgrid — iç-içə elementlər valideynin xətlərinə düzlənir; kart torlarının «qeyri-bərabər hündürlük» problemi həll olunur.",
            "Grid xətlərinə ad vermək: [main-start] 1fr [main-end] — mürəkkəb layout-da oxunaqlıdır.",
            "Təhlükəsizlik: layout-u heç vaxt «gizli» məlumatı vizual olaraq örtmək üçün işlətmə (məs. qiyməti başqa elementlə üstələmək) — DOM-da qalır, maşınlar və ekran oxuyucular onu oxuyur; aldadıcı UI həm də hüquqi problemdir (dark patterns).",
          ]},
          { t: "qa", items: [
            ["auto-fill ilə auto-fit fərqi?", "auto-fit boş track-ları 0-a yığır və elementlər genişlənir; auto-fill boş track-ları saxlayır."],
            ["Flex yoxsa Grid?", "Bir ölçü və məzmundan asılı ölçülər — flex; iki ölçü və layout-dan gələn ölçülər — grid. Çox vaxt birlikdə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "grid-template-columns: 200px 1fr 1fr; konteyner 800px-dir (gap yoxdur). 1fr neçə pikseldir?", options: ["200px", "300px", "266px"], answer: 1, why: "(800 − 200) / 2 = 300." },
          { t: "quiz", q: "Media query olmadan responsive kart toru üçün?", options: ["repeat(3, 1fr)", "repeat(auto-fill, minmax(240px, 1fr))", "flex: 1"], answer: 1, why: "Sütun sayı ekran eninə görə avtomatik dəyişir." },
        ],
      },
    ],
    exercise: {
      task: "grid-template-areas ilə səhifə skeleti (header, sidebar, main, footer) qur; main-in içində auto-fill + minmax ilə responsive kart toru yarat.",
      starter: `<style>\n\n</style>\n<div class="sehife">\n  <header>Header</header>\n  <aside>Menyu</aside>\n  <main>\n    <div class="kartlar">\n      <div>1</div><div>2</div><div>3</div><div>4</div>\n    </div>\n  </main>\n  <footer>Footer</footer>\n</div>\n`,
      expect: ".sehife display grid, grid-template-areas 3 sətir, uşaqlarda grid-area; .kartlar repeat(auto-fill|auto-fit, minmax(..., 1fr)) və gap.",
    },
  },
  {
    slug: "responsive",
    title: "Responsive dizayn və media query",
    intro: "Sayt 360px telefonda da, 2560px monitorda da yaxşı görünməlidir. Mobile-first yanaşma, media query, container query və responsive şəkillər.",
    sections: [
      {
        level: "baslangic",
        title: "Mobile-first və media query",
        blocks: [
          { t: "analogy", text: "Su qabın formasını alır. Responsive sayt da ekranın formasını alır. Mobile-first — əvvəl ən kiçik stəkan üçün düşünmək, sonra böyük qablara «əlavələr» etmək; tərsi (böyükdən kiçiyə sıxmaq) həmişə daha çətindir." },
          { t: "code", lang: "css", code: `/* 1. Default — telefon */
.kartlar { display: grid; gap: 1rem; }

/* 2. 640px və daha geniş — planşet */
@media (min-width: 640px) {
  .kartlar { grid-template-columns: repeat(2, 1fr); }
}

/* 3. 1024px və daha geniş — kompüter */
@media (min-width: 1024px) {
  .kartlar { grid-template-columns: repeat(3, 1fr); }
}` },
          { t: "terms", items: [
            ["media query", "şərtli CSS: «ekran bu qədər genişdirsə, bu stili tətbiq et»."],
            ["breakpoint", "layout-un dəyişdiyi en (640, 768, 1024, 1280...)."],
            ["min-width", "bu endən BÖYÜK ekranlar üçün (mobile-first)."],
            ["max-width", "bu endən KİÇİK ekranlar üçün (desktop-first)."],
          ]},
          { t: "tip", text: "head-də <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> olmasa, media query-lər telefonda işləmir!" },
        ],
      },
      {
        level: "orta",
        title: "Breakpoint-i məzmun seçir",
        blocks: [
          { t: "list", items: [
            "Breakpoint-i cihaz adına (iPhone) görə yox, dizaynın «sındığı» yerə görə seç: brauzeri dartıb bax.",
            "Fluid tipografiya (clamp) + auto-fill grid çox breakpoint-i lazımsız edir.",
            "Toxunma ekranı üçün düymələr ən azı 44×44px.",
            "Hover yalnız siçan olanda: @media (hover: hover) { .kart:hover { ... } }.",
            "Animasiyanı sevməyənlər üçün: @media (prefers-reduced-motion: reduce).",
          ]},
          { t: "code", lang: "css", code: `img, video { max-width: 100%; height: auto; }  /* şəkil heç vaxt daşmasın */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition: none !important; }
}` },
          { t: "mistake", lang: "css", wrong: `.konteyner { width: 1200px; }`, right: `.konteyner { width: min(100% - 2rem, 1200px); margin-inline: auto; }`, why: "Sabit en telefonda üfüqi scroll yaradır. Maksimum en ver, kiçik ekranda sıxılsın." },
          { t: "mistake", lang: "css", wrong: `@media (max-width: 768px) { ... }\n@media (min-width: 768px) { ... }`, right: `@media (width < 768px) { ... }\n@media (width >= 768px) { ... }`, why: "768px-də iki qayda eyni anda işləyir. Yeni range sintaksisi (<, >=) sərhədi dəqiq edir və oxunaqlıdır." },
        ],
      },
      {
        level: "senior",
        title: "Container query və müasir responsive",
        blocks: [
          { t: "code", lang: "css", code: `.kart-yeri { container-type: inline-size; }

/* Kart ekrana yox, OLDUĞU YERƏ görə dəyişir */
@container (min-width: 420px) {
  .kart { display: grid; grid-template-columns: 140px 1fr; }
}` },
          { t: "list", items: [
            "Container query komponenti həqiqətən təkrar istifadə olunan edir: eyni kart sidebar-da dar, main-də geniş formada.",
            "Responsive təkcə en deyil: qısa ekranlar (height), landscape telefonlar, zoom 200–400% (WCAG 1.4.10 Reflow: 320px endə üfüqi scroll olmamalıdır).",
            "Mobil üçün daha az məlumat yüklə: srcset/sizes, lazy loading, ağır JS komponentlərini şərti yüklə — CSS ilə gizlətmək yükləməni dayandırmır.",
            "dvh/svh/lvh — mobil ünvan çubuğunun açılıb-yığılmasını nəzərə alan vahidlər.",
            "Təhlükəsizlik: mobil versiyada CSS ilə gizlədilən admin düyməsi, debug məlumatı və s. HTML-də qalır — yetki yoxlaması həmişə serverdə olmalıdır, «görünmür» = «qorunur» DEYİL.",
          ]},
          { t: "qa", items: [
            ["Media query ilə container query fərqi?", "Media — viewport-a (ekrana), container — elementin valideyn konteynerinin ölçüsünə baxır."],
            ["Mobile-first niyə tövsiyə olunur?", "Sadə baza üzərinə əlavə etmək asandır, mobil cihaz lazımsız CSS-i ləğv etmək məcburiyyətində qalmır, prioritetlər düzgün qoyulur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Mobile-first yanaşmada hansı media query işlədilir?", options: ["max-width", "min-width", "orientation"], answer: 1, why: "Default telefon üçündür, böyük ekranlar min-width ilə əlavə olunur." },
          { t: "quiz", q: "viewport meta teqi olmasa nə olur?", options: ["Heç nə", "Telefonda media query-lər düzgün işləmir", "CSS yüklənmir"], answer: 1, why: "Brauzer səhifəni ~980px kimi render edib kiçildir." },
        ],
      },
    ],
    exercise: {
      task: "Mobile-first kart toru: telefonda 1 sütun, 640px+ 2 sütun, 1024px+ 3 sütun. Şəkillər daşmasın; .konteyner maks 1100px və mərkəzdə; hover effekti yalnız (hover: hover) cihazlarda.",
      starter: `<style>\n\n</style>\n<div class="konteyner">\n  <div class="kartlar">\n    <div class="kart">1</div><div class="kart">2</div><div class="kart">3</div>\n  </div>\n</div>\n`,
      expect: "default 1 sütun; @media min-width (və ya >=) 640 → 2, 1024 → 3 sütun; img max-width 100%; .konteyner min(...,1100px) + margin auto; :hover @media (hover: hover) içində.",
    },
  },
];
