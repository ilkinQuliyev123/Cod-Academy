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
];
