import type { Lesson } from "../types";

export const react: Lesson[] = [
  {
    slug: "giris",
    title: "React nədir?",
    intro: "React — istifadəçi interfeysi (UI) qurmaq üçün JavaScript kitabxanasıdır. UI-ni kiçik, təkrar istifadə olunan komponentlərdən yığırsan; məlumat dəyişəndə React ekranı özü yeniləyir.",
    sections: [
      {
        level: "baslangic",
        title: "Deklarativ UI",
        blocks: [
          { t: "analogy", text: "Vanilla JS ilə UI — aşpaza hər addımı demək: «soğanı doğra, tavaya qoy, 3 dəqiqə qızart». React — sifariş vermək: «mənə qızardılmış soğan lazımdır». Sən NƏ görünməli olduğunu təsvir edirsən, React NECƏ edəcəyini özü bilir." },
          { t: "code", lang: "jsx", code: `import { useState } from "react";

export default function Sayqac() {
  const [say, setSay] = useState(0);
  return (
    <button onClick={() => setSay(say + 1)}>
      Klik sayı: {say}
    </button>
  );
}` },
          { t: "terms", items: [
            ["komponent", "UI parçası qaytaran funksiya (adı böyük hərflə)."],
            ["JSX", "JS içində HTML-ə bənzər sintaksis."],
            ["state", "komponentin yaddaşı; dəyişəndə UI yenidən render olunur."],
            ["render", "React-in komponenti çağırıb nə göstəriləcəyini hesablaması."],
            ["deklarativ", "nəticəni təsvir edirsən, addımları yox."],
          ]},
          { t: "tip", text: "Yeni layihə: npm create vite@latest (React + TS) və ya Next.js (npx create-next-app). Bu saytın özü Next.js + React ilə qurulub." },
        ],
      },
      {
        level: "orta",
        title: "React necə işləyir?",
        blocks: [
          { t: "list", items: [
            "Komponent = state/props → UI funksiyası. Eyni giriş — eyni nəticə.",
            "State dəyişəndə React komponenti yenidən çağırır, yeni nəticəni köhnə ilə müqayisə edir (reconciliation) və DOM-da yalnız fərqi dəyişir.",
            "Məlumat yuxarıdan aşağı axır (props), hadisələr aşağıdan yuxarı (callback-lər).",
            "React yalnız UI qatıdır; marşrutlaşdırma, data çəkmə üçün framework (Next.js) və ya kitabxanalar.",
          ]},
          { t: "mistake", lang: "jsx", wrong: `let say = 0;\nfunction Sayqac() {\n  return <button onClick={() => say++}>{say}</button>;\n}`, right: `function Sayqac() {\n  const [say, setSay] = useState(0);\n  return <button onClick={() => setSay(say + 1)}>{say}</button>;\n}`, why: "Adi dəyişəni dəyişmək React-a «yenidən render et» demir — ekran dəyişmir. Görünən məlumat state-də olmalıdır." },
          { t: "mistake", lang: "jsx", wrong: `document.getElementById("say").textContent = 5;`, right: `setSay(5);`, why: "React-in idarə etdiyi DOM-u əl ilə dəyişmək React-in vəziyyəti ilə ziddiyyət yaradır — növbəti render dəyişikliyini silir." },
        ],
      },
      {
        level: "senior",
        title: "Fiber, render fazaları, server komponentləri",
        blocks: [
          { t: "p", text: "React iki fazada işləyir: render fazası (komponentləri çağırıb yeni ağacı hesablamaq — saf olmalıdır, kəsilə bilər) və commit fazası (DOM dəyişiklikləri, effektlər). Fiber arxitekturası işi kiçik vahidlərə bölür və prioritetləşdirir: istifadəçi yazısı fon render-dən önə keçir (concurrent rendering, useTransition)." },
          { t: "list", items: [
            "React Server Components (RSC): komponent serverdə render olunur, JS-i brauzerə getmir — Next.js App Router-in əsası.",
            "StrictMode inkişafda komponentləri iki dəfə render edir və effektləri iki dəfə işə salır — saf olmayan kodu üzə çıxarmaq üçün.",
            "React Compiler avtomatik memoizasiya edir — useMemo/useCallback ehtiyacı azalır.",
            "Təhlükəsizlik: React {dəyər} ilə yazılan mətni avtomatik escape edir — XSS-ə qarşı güclü default. Təhlükə dangerouslySetInnerHTML, href={\"javascript:...\"} və istifadəçi URL-lərindədir.",
          ]},
          { t: "qa", items: [
            ["Virtual DOM nədir?", "UI-nin yaddaşdakı yüngül təsviri; React yeni və köhnə təsviri müqayisə edib real DOM-da minimal dəyişiklik edir."],
            ["Render və commit fazası fərqi?", "Render — nəyin dəyişəcəyini hesablamaq (saf, təkrar oluna bilər); commit — DOM-a tətbiq və effektlər."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "UI-də görünən və dəyişən məlumat harada saxlanmalıdır?", options: ["Qlobal dəyişəndə", "State-də", "DOM-da"], answer: 1, why: "State dəyişəndə React yenidən render edir." },
        ],
      },
    ],
    exercise: {
      task: "Sayqac komponenti yaz: + və − düymələri, sıfırla düyməsi, say 0-dan aşağı düşməsin. Say 10-a çatanda mətn \"Maksimum!\" göstərsin və + düyməsi disabled olsun.",
      starter: `import { useState } from "react";\n\nexport default function Sayqac() {\n  // bura\n}\n`,
      expect: "useState(0); setSay funksional (s => s + 1) və ya düzgün; 0-dan aşağı yoxdur; disabled={say >= 10}; şərti mətn; DOM-a birbaşa müdaxilə yoxdur.",
    },
  },
  {
    slug: "jsx",
    title: "JSX",
    intro: "JSX — JavaScript-in içində HTML-ə oxşar yazılış. Əslində React.createElement çağırışlarına çevrilir. Qaydaları HTML-dən bir az fərqlidir.",
    sections: [
      {
        level: "baslangic",
        title: "Qaydalar",
        blocks: [
          { t: "analogy", text: "JSX — HTML geyinmiş JavaScript-dir. Görünüşü tanışdır, amma içində JS «qanı» axır: fiqurlu mötərizə { } açan kimi istənilən JS ifadəsi yaza bilərsən." },
          { t: "code", lang: "jsx", code: `const ad = "Aysel";
const sekil = "/aysel.jpg";

function Kart() {
  return (
    <div className="kart">
      <img src={sekil} alt={ad + " şəkli"} />
      <h2>{ad.toUpperCase()}</h2>
      <p>2 + 2 = {2 + 2}</p>
      <label htmlFor="email">Email</label>
      <input id="email" style={{ color: "white", fontSize: 14 }} />
    </div>
  );
}` },
          { t: "terms", items: [
            ["{ifadə}", "JS ifadəsinin nəticəsini qoyur (if/for yox — ifadə)."],
            ["className", "HTML class (class JS-də açar sözdür)."],
            ["htmlFor", "label-in for atributu."],
            ["style={{ }}", "obyekt; xassələr camelCase: fontSize."],
            ["<img />", "boş teqlər mütləq bağlanır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Tək kök, Fragment, ifadələr",
        blocks: [
          { t: "code", lang: "jsx", code: `function Siyahi() {
  return (
    <>
      <h2>Başlıq</h2>
      <p>Komponent yalnız BİR kök element qaytarır — <> </> boş qabdır.</p>
    </>
  );
}

function Status({ aktiv }) {
  return (
    <span className={aktiv ? "yasil" : "boz"}>
      {aktiv ? "Onlayn" : "Oflayn"}
      {/* JSX daxilində şərh belə yazılır */}
    </span>
  );
}` },
          { t: "mistake", lang: "jsx", wrong: `return (\n  <h1>Salam</h1>\n  <p>Mətn</p>\n);`, right: `return (\n  <>\n    <h1>Salam</h1>\n    <p>Mətn</p>\n  </>\n);`, why: "Funksiya iki dəyər qaytara bilməz — JSX bir kökə bükülməlidir." },
          { t: "mistake", lang: "jsx", wrong: `<div>{if (aktiv) { "Hə" }}</div>`, right: `<div>{aktiv ? "Hə" : "Yox"}</div>`, why: "{ } içində yalnız ifadə olur; if/for statement-dir. Ternary, && və ya JSX-dən əvvəl dəyişən işlət." },
        ],
      },
      {
        level: "senior",
        title: "JSX nəyə çevrilir və XSS",
        blocks: [
          { t: "code", lang: "jsx", code: `// <h1 className="b">Salam {ad}</h1>  →
import { jsx as _jsx } from "react/jsx-runtime";
_jsx("h1", { className: "b", children: ["Salam ", ad] });` },
          { t: "list", items: [
            "JSX transformu (Babel/SWC/esbuild) teqi funksiya çağırışına çevirir; nəticə sadə JS obyektidir (React element).",
            "Kiçik hərfli teq → DOM elementi (\"div\"), böyük hərfli → komponent (Kart). Ona görə komponent adı böyük hərflə başlamalıdır.",
            "Təhlükəsizlik: {istifadeciMetni} avtomatik escape olunur — <script> mətn kimi görünür, icra olunmur. Bu müdafiəni dangerouslySetInnerHTML ilə söndürmə; lazım olsa DOMPurify ilə təmizlə.",
            "Təhlükəsizlik: <a href={user.sayt}> — istifadəçi \"javascript:alert(1)\" yazsa klikdə icra olunur. URL-i new URL() ilə parse edib protokolu yalnız http/https et.",
            "Təhlükəsizlik: istifadəçi obyektini props-a yaymaq ({...userData}) — dangerouslySetInnerHTML kimi təhlükəli prop daxil ola bilər; yalnız lazım olan sahələri ötür.",
          ]},
          { t: "qa", items: [
            ["JSX niyə className işlədir?", "JSX JS-dir və class JS-də rezerv sözdür; həmçinin DOM xassəsinin adı className-dir."],
            ["React XSS-dən necə qoruyur?", "{} ilə yazılan dəyərləri mətn kimi escape edir; risk yalnız dangerouslySetInnerHTML və təhlükəli URL-lərdədir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "JSX-də CSS class necə yazılır?", options: ["class", "className", "cssClass"], answer: 1, why: "class JS açar sözüdür." },
          { t: "quiz", q: "style atributu nə qəbul edir?", options: ["String", "Obyekt", "Massiv"], answer: 1, why: "style={{ color: \"red\" }}." },
        ],
      },
    ],
    exercise: {
      task: "ProfilKarti komponenti: ad, peşə, şəkil URL-i, onlayn (boolean) dəyişənlərindən kart qur. Şəkildə mənalı alt, onlayn statusu ternary ilə, inline style ilə sərhəd rəngi (onlayndırsa yaşıl). İstifadəçi saytının linkini yalnız https ilə başlayırsa göstər.",
      starter: `export default function ProfilKarti() {\n  const ad = "Aysel";\n  const pese = "Frontend developer";\n  const sekil = "/aysel.jpg";\n  const onlayn = true;\n  const sayt = "https://aysel.dev";\n\n  // bura\n}\n`,
      expect: "className, alt, style={{ borderColor: ... }}; ternary status; Fragment və ya tək kök; sayt.startsWith(\"https://\") && <a ...>; dangerouslySetInnerHTML yoxdur.",
    },
  },
  {
    slug: "komponentler",
    title: "Komponentlər",
    intro: "Komponent — UI-nin müstəqil, təkrar istifadə olunan parçasıdır. Böyük səhifəni kiçik komponentlərə bölmək React düşüncəsinin əsasıdır.",
    sections: [
      {
        level: "baslangic",
        title: "Funksiya komponenti",
        blocks: [
          { t: "analogy", text: "Komponentlər LEGO kərpicləridir: Düymə, Kart, Header ayrı-ayrı kərpiclərdir; onları birləşdirib Səhifə qurursan. Bir kərpici dəyişəndə hər yerdə dəyişir." },
          { t: "code", lang: "jsx", code: `function Duyme() {
  return <button className="duyme">Başla</button>;
}

function Header() {
  return (
    <header>
      <h1>Kod Akademiyası</h1>
      <Duyme />
    </header>
  );
}

export default function Sehife() {
  return (
    <main>
      <Header />
      <Duyme />
    </main>
  );
}` },
          { t: "terms", items: [
            ["komponent", "JSX qaytaran funksiya."],
            ["<Duyme />", "komponenti istifadə etmək (render)."],
            ["PascalCase", "komponent adı böyük hərflə: Duyme, ProfilKarti."],
            ["export default", "faylın əsas komponentini çölə açmaq."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Bölmək və children",
        blocks: [
          { t: "code", lang: "jsx", code: `function Kart({ basliq, children }) {
  return (
    <section className="kart">
      <h2>{basliq}</h2>
      <div className="kart-govde">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <Kart basliq="Bugünkü dərs">
      <p>Komponentlər və props.</p>
      <button>Başla</button>
    </Kart>
  );
}` },
          { t: "list", items: [
            "Nə vaxt bölmək: hissə təkrarlanırsa, öz məsuliyyəti varsa, fayl 150+ sətirə çatırsa.",
            "children — açılan və bağlanan teq arasındakı məzmun: kompozisiyanın əsas aləti.",
            "Bir fayl — bir əsas komponent; köməkçi kiçik komponentlər eyni faylda ola bilər.",
          ]},
          { t: "mistake", lang: "jsx", wrong: `function App() {\n  function Duyme() { return <button>X</button>; }\n  return <Duyme />;\n}`, right: `function Duyme() { return <button>X</button>; }\nfunction App() { return <Duyme />; }`, why: "Komponenti başqa komponentin İÇİNDƏ elan etmək hər render-də yeni komponent tipi yaradır — React onu silib yenidən qurur, state itir və yavaşlayır." },
          { t: "mistake", lang: "jsx", wrong: `function duyme() { return <button>X</button>; }\n<duyme />`, right: `function Duyme() { ... }\n<Duyme />`, why: "Kiçik hərfli teqi React HTML elementi sayır — <duyme> adlı naməlum HTML teqi yaradır." },
        ],
      },
      {
        level: "senior",
        title: "Saflıq və komponent dizaynı",
        blocks: [
          { t: "p", text: "Komponent render zamanı SAF olmalıdır: eyni props/state → eyni JSX, render-də yan təsir yox (fetch, DOM dəyişikliyi, qlobal dəyişən yazmaq). Yan təsirlər hadisə handler-lərində və ya effektlərdə olur. StrictMode bu qaydanı pozan kodu iki dəfə render edərək üzə çıxarır." },
          { t: "list", items: [
            "Presentational (yalnız görünüş, props alır) və container (məlumat, məntiq) ayrımı — test və təkrar istifadə asanlaşır.",
            "Kompozisiya irsiyyətdən üstündür: React-də sinif irsiyyəti işlədilmir, children və props ilə birləşdirilir.",
            "Server Component default (Next.js): interaktivlik lazım olan kiçik hissəni \"use client\" ilə ayır — JS bundle kiçilir.",
            "Təhlükəsizlik: Server Component-də işlənən məlumat (DB sorğusu, açar) brauzerə getmir, AMMA Client Component-ə prop kimi ötürdüyün hər şey brauzerə serializasiya olunur — bütün user obyektini (parol hash ilə) ötürmə, yalnız lazımi sahələri.",
          ]},
          { t: "qa", items: [
            ["Komponent niyə saf olmalıdır?", "React render-i təkrarlaya, dayandıra, paralel edə bilər; yan təsirlər gözlənilməz nəticə verir."],
            ["children nədir?", "Komponent teqləri arasında ötürülən məzmun — xüsusi prop."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Komponent adı necə başlamalıdır?", options: ["Kiçik hərflə", "Böyük hərflə", "use ilə"], answer: 1, why: "Böyük hərf React-a bunun komponent olduğunu deyir." },
        ],
      },
    ],
    exercise: {
      task: "Səhifəni komponentlərə böl: Header (loqo + nav), Kart (basliq + children), Footer. App-də 3 Kart göstər, hər birinin içində fərqli məzmun (children). Komponentlər bir-birinin içində elan olunmasın.",
      starter: `// Header, Kart, Footer\n\nexport default function App() {\n  // bura\n}\n`,
      expect: "PascalCase adlar; komponentlər üst səviyyədə elan olunub; Kart children və basliq prop-u işlədir; semantik teqlər (header, main, footer).",
    },
  },
  {
    slug: "props",
    title: "Props",
    intro: "Props — valideyn komponentin uşağa ötürdüyü məlumatdır, funksiya arqumentləri kimi. Props yalnız oxunur — uşaq onu dəyişmir.",
    sections: [
      {
        level: "baslangic",
        title: "Props ötürmək və oxumaq",
        blocks: [
          { t: "analogy", text: "Props — restoranda sifariş vərəqəsidir: ofisiant (valideyn) aşpaza (uşaq) «2 kabab, az duzlu» yazıb verir. Aşpaz vərəqəni dəyişmir, ona əsasən bişirir." },
          { t: "code", lang: "jsx", code: `function Salam({ ad, yas = 18 }) {       // destructuring + default
  return <p>Salam, {ad}! Yaşın: {yas}</p>;
}

export default function App() {
  return (
    <>
      <Salam ad="Aysel" yas={25} />
      <Salam ad="Murad" />
    </>
  );
}` },
          { t: "terms", items: [
            ["props", "komponentə ötürülən parametrlər obyekti."],
            ["ad=\"Aysel\"", "string prop."],
            ["yas={25}", "JS dəyəri (ədəd, obyekt, funksiya) — fiqurlu mötərizə ilə."],
            ["default dəyər", "prop verilməyəndə işlədilir."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Funksiya props-ları və TS ilə tipləmə",
        blocks: [
          { t: "code", lang: "tsx", code: `type DuymeProps = {
  metn: string;
  variant?: "esas" | "ikinci";
  onClick: () => void;
  disabled?: boolean;
};

function Duyme({ metn, variant = "esas", onClick, disabled = false }: DuymeProps) {
  return (
    <button className={"duyme duyme--" + variant} onClick={onClick} disabled={disabled}>
      {metn}
    </button>
  );
}

export default function App() {
  return <Duyme metn="Yadda saxla" onClick={() => console.log("saxlandı")} />;
}` },
          { t: "list", items: [
            "Uşaq valideynə xəbər vermək üçün callback prop çağırır (onClick, onChange).",
            "TS ilə props tipləri səhv prop adlarını və tipləri dərhal tutur.",
            "Boolean prop qısa yazılış: <Duyme disabled /> = disabled={true}.",
          ]},
          { t: "mistake", lang: "jsx", wrong: `function Kart(props) {\n  props.basliq = props.basliq.toUpperCase();\n  return <h2>{props.basliq}</h2>;\n}`, right: `function Kart({ basliq }) {\n  return <h2>{basliq.toUpperCase()}</h2>;\n}`, why: "Props yalnız oxunandır. Dəyişmək valideynin məlumatını korlayır və React-in proqnozlaşdırılabilirliyini pozur." },
          { t: "mistake", lang: "jsx", wrong: `<Duyme onClick={saxla()} />`, right: `<Duyme onClick={saxla} />`, why: "saxla() render zamanı dərhal çağırılır. Funksiyanın özünü ötür." },
        ],
      },
      {
        level: "senior",
        title: "Prop drilling, kompozisiya, sabit istinadlar",
        blocks: [
          { t: "list", items: [
            "Prop drilling: məlumat 5 səviyyə aşağı ötürülür, aradakılar ona toxunmur. Həllər: kompozisiya (children ilə komponenti yuxarıda qur), Context, state kitabxanası.",
            "Hər render-də yaradılan obyekt/funksiya props-u (style={{...}}, onClick={() => ...}) memo-lu uşağın yenidən render olunmasına səbəb olur — lazım olanda useCallback/useMemo (və ya React Compiler).",
            "...rest props yaymaq çevikdir, amma API-ni qeyri-müəyyən edir; dizayn sistemində ComponentProps<\"button\"> ilə tipləndir.",
            "key və ref xüsusi props-dur — komponentə adi prop kimi ötürülmür (React 19-da ref adi prop oldu).",
            "Təhlükəsizlik: server məlumatını props-a «olduğu kimi» yaymaq ({...apiObject}) — gözlənilməz props (məs. dangerouslySetInnerHTML, href) DOM elementinə düşə bilər. Açıq sahələri seç.",
          ]},
          { t: "qa", items: [
            ["Props və state fərqi?", "Props xaricdən gəlir və oxunur; state komponentin öz daxili, dəyişən yaddaşıdır."],
            ["Prop drilling-in həlli?", "Kompozisiya (children/slot), Context və ya qlobal state."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Ədəd prop-u necə ötürülür?", options: ["yas=\"25\"", "yas={25}", "yas=25"], answer: 1, why: "Dırnaqda string olur; JS dəyəri üçün {}." },
        ],
      },
    ],
    exercise: {
      task: "MehsulKarti komponenti: props — ad, qiymet, endirim (ixtiyari, faiz), stokda (boolean), onSebeteAt callback. Endirim varsa köhnə qiyməti üstündən xətli, yenisini göstər. Stokda deyilsə düymə disabled. App-də 3 məhsul render et.",
      starter: `function MehsulKarti(/* props */) {\n  // bura\n}\n\nexport default function App() {\n  // bura\n}\n`,
      expect: "destructuring + default; endirimli qiymət hesablanır, <s> və ya <del> köhnə qiymət; disabled={!stokda}; onClick={() => onSebeteAt(ad)}; props dəyişdirilmir.",
    },
  },
  {
    slug: "state",
    title: "useState",
    intro: "State — komponentin yaddaşıdır. useState dəyər və onu dəyişən funksiya qaytarır; dəyər dəyişəndə React komponenti yenidən render edir.",
    sections: [
      {
        level: "baslangic",
        title: "useState əsasları",
        blocks: [
          { t: "analogy", text: "State — divardakı ağ lövhədir. Komponent hər render-də lövhəyə baxıb ekranı çəkir. setState — lövhədəki yazını silib yenisini yazmaq və «hamı yenidən baxsın» deməkdir." },
          { t: "code", lang: "jsx", code: `import { useState } from "react";

export default function Forma() {
  const [ad, setAd] = useState("");
  const [acig, setAcig] = useState(false);

  return (
    <>
      <input value={ad} onChange={(e) => setAd(e.target.value)} />
      <p>Salam, {ad || "qonaq"}</p>
      <button onClick={() => setAcig(!acig)}>{acig ? "Bağla" : "Aç"}</button>
      {acig && <p>Gizli məzmun</p>}
    </>
  );
}` },
          { t: "terms", items: [
            ["useState(başlanğıc)", "[dəyər, setDəyər] qaytarır."],
            ["setDəyər(yeni)", "dəyəri dəyişir və yenidən render planlaşdırır."],
            ["hook", "use ilə başlayan React funksiyası."],
            ["re-render", "komponentin yenidən çağırılması."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Funksional yeniləmə və obyekt/massiv state",
        blocks: [
          { t: "code", lang: "jsx", code: `const [say, setSay] = useState(0);
function ucDefe() {
  setSay((s) => s + 1);   // əvvəlki dəyərə əsaslan
  setSay((s) => s + 1);
  setSay((s) => s + 1);   // nəticə: +3
}

const [user, setUser] = useState({ ad: "Aysel", yas: 25 });
setUser((u) => ({ ...u, yas: u.yas + 1 }));          // yeni obyekt

const [list, setList] = useState(["HTML"]);
setList((l) => [...l, "CSS"]);                       // əlavə
setList((l) => l.filter((x) => x !== "HTML"));       // sil
setList((l) => l.map((x) => (x === "CSS" ? "Tailwind" : x)));  // dəyiş` },
          { t: "mistake", lang: "jsx", wrong: `user.yas = 26;\nsetUser(user);  // ekran dəyişmir!`, right: `setUser({ ...user, yas: 26 });`, why: "React dəyişikliyi istinadla (Object.is) yoxlayır. Eyni obyekti dəyişib versən, «heç nə dəyişməyib» sayır. Həmişə YENİ obyekt/massiv yarat." },
          { t: "mistake", lang: "jsx", wrong: `setSay(say + 1);\nconsole.log(say);  // köhnə dəyər!`, right: `const yeni = say + 1;\nsetSay(yeni);\nconsole.log(yeni);`, why: "setState asinxrondur (növbəti render üçün planlaşdırılır); cari render-də dəyişən «şəkil» kimi donub." },
        ],
      },
      {
        level: "senior",
        title: "State dizaynı",
        blocks: [
          { t: "list", items: [
            "Minimal state: hesablana bilən şeyi saxlama. tamAd = ad + soyad — render zamanı hesabla; filtrlənmiş siyahı — useMemo və ya sadəcə hesabla.",
            "Ziddiyyətli state-lərdən qaç: isLoading + isError + data əvəzinə status: \"idle\" | \"loading\" | \"error\" | \"success\".",
            "State-i lazım olan ən yaxın ortaq valideynə qaldır (lifting state up), lazımsız yerə qlobal etmə.",
            "Lazy initial state: useState(() => agirHesab()) — funksiya yalnız ilk render-də işləyir.",
            "Batching: React 18+ bir hadisədəki bütün setState-ləri birləşdirib BİR render edir (async callback-lərdə də).",
            "Təhlükəsizlik: klient state-i (səbət qiyməti, isAdmin) istifadəçi tərəfindən DevTools ilə dəyişdirilə bilər. Server heç vaxt klientdən gələn qiymətə/rola güvənməməlidir — ID göndər, qiyməti serverdə hesabla.",
          ]},
          { t: "qa", items: [
            ["Niyə state-i birbaşa dəyişmək olmaz?", "React istinad bərabərliyi ilə dəyişikliyi aşkarlayır; mutasiya render-i işə salmır və tarixçəni pozur."],
            ["Funksional setState nə vaxt lazımdır?", "Yeni dəyər əvvəlkinə əsaslananda, xüsusən ardıcıl və ya asinxron yeniləmələrdə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Massivə element əlavə etməyin düzgün yolu:", options: ["list.push(x); setList(list)", "setList([...list, x])", "list[list.length] = x"], answer: 1, why: "Yeni massiv yaradılmalıdır." },
        ],
      },
    ],
    exercise: {
      task: "Alış-veriş siyahısı: input + Əlavə et düyməsi, siyahıda hər elementin yanında Sil. Boş və təkrar elementlər əlavə olunmasın. Element sayını göstər. Bütün yeniləmələr immutable olsun.",
      starter: `import { useState } from "react";\n\nexport default function Siyahi() {\n  // bura\n}\n`,
      expect: "iki state (metn, list); setList(l => [...l, metn.trim()]); filter ilə silmə; boş/təkrar yoxlaması; push/splice yoxdur; controlled input value+onChange.",
    },
  },
  {
    slug: "hadiseler",
    title: "Hadisələr",
    intro: "React-də hadisələr camelCase props-dur: onClick, onChange, onSubmit. Handler funksiyası ötürürsən; React synthetic event obyekti verir.",
    sections: [
      {
        level: "baslangic",
        title: "onClick, onChange",
        blocks: [
          { t: "analogy", text: "Handler — qapıçıya verilən təlimatdır: «zəng çalınanda qapını aç». Sən təlimatı (funksiyanı) verirsən, zəngi isə istifadəçi çalır. Təlimatı verəndə qapını özün açsan (funksiyanı çağırsan), mənası qalmır." },
          { t: "code", lang: "jsx", code: `function Duymeler() {
  function salamla() {
    alert("Salam!");
  }
  function sil(id) {
    console.log("silinir:", id);
  }
  return (
    <>
      <button onClick={salamla}>Salam</button>
      <button onClick={() => sil(42)}>Sil #42</button>
      <input onChange={(e) => console.log(e.target.value)} />
    </>
  );
}` },
          { t: "terms", items: [
            ["onClick={f}", "klikdə f çağırılır."],
            ["() => f(42)", "arqumentli çağırış üçün arrow bükmə."],
            ["e", "SyntheticEvent — brauzer fərqlərini bərabərləşdirən hadisə obyekti."],
            ["e.target.value", "input-un cari dəyəri."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "preventDefault, stopPropagation, klaviatura",
        blocks: [
          { t: "code", lang: "jsx", code: `function Axtaris({ onAxtar }) {
  const [q, setQ] = useState("");

  function gonder(e) {
    e.preventDefault();                 // səhifə yenilənməsin
    if (q.trim()) onAxtar(q.trim());
  }

  return (
    <form onSubmit={gonder}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && setQ("")}
      />
      <button type="submit">Axtar</button>
    </form>
  );
}

function Kart({ onAc, onSil }) {
  return (
    <div onClick={onAc}>
      Kart
      <button onClick={(e) => { e.stopPropagation(); onSil(); }}>Sil</button>
    </div>
  );
}` },
          { t: "mistake", lang: "jsx", wrong: `<button onClick={sil(id)}>Sil</button>`, right: `<button onClick={() => sil(id)}>Sil</button>`, why: "sil(id) render zamanı dərhal çağırılır (bəlkə sonsuz render də yaradır). Funksiya ötür." },
          { t: "mistake", lang: "jsx", wrong: `<div onClick={ac}>Menyunu aç</div>`, right: `<button type="button" onClick={ac}>Menyunu aç</button>`, why: "div klaviatura ilə fokuslanmır və Enter/Space ilə işləmir — klaviatura və ekran oxuyucu istifadəçiləri üçün əlçatmazdır." },
        ],
      },
      {
        level: "senior",
        title: "Delegation, stale closure, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "React hadisələri özü delegation edir: dinləyicilər kök elementdə (root) qurulur, hər düyməyə ayrıca yox.",
            "Handler render zamanı yaradılır və o render-in state-ini «görür» (closure). setTimeout içində köhnə state — stale closure; funksional setState və ya useRef ilə həll.",
            "Tez-tez hadisələr (scroll, input axtarışı) — debounce; useDeferredValue/useTransition ilə ağır yeniləmələri prioritetsizləşdir.",
            "Təhlükəsizlik: düyməni klikdən sonra disabled etmək ikiqat göndərməni azaldır, amma qoruma deyil — server idempotentlik açarı və ya unikallıq ilə qorunmalıdır.",
            "Təhlükəsizlik: window.addEventListener(\"message\") ilə postMessage qəbul edəndə event.origin-i ağ siyahı ilə yoxla.",
          ]},
          { t: "qa", items: [
            ["onClick={f()} niyə səhvdir?", "f render zamanı çağırılır və nəticəsi (çox vaxt undefined) handler olur."],
            ["Stale closure nədir?", "Handler/effektin köhnə render-in state dəyərini tutub saxlaması."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Forma göndəriləndə səhifə yenilənməsin deyə:", options: ["return false", "e.preventDefault()", "e.stop()"], answer: 1, why: "Brauzerin default davranışını dayandırır." },
        ],
      },
    ],
    exercise: {
      task: "Like düyməsi: klikdə like sayı artsın və ürək dolsun, ikinci klikdə geri qayıtsın (toggle). Kartın özünə klik \"Ətraflı\" yazsın, amma like düyməsi bunu tetikləməsin (stopPropagation). Escape düyməsi like-ı sıfırlasın.",
      starter: `import { useState } from "react";\n\nexport default function Post() {\n  // bura\n}\n`,
      expect: "button type=button onClick funksiya ötürülür; toggle funksional setState ilə; e.stopPropagation(); onKeyDown Escape; div klik əvəzinə ən azı düymələr button-dır.",
    },
  },
  {
    slug: "sert-render",
    title: "Şərti render",
    intro: "Vəziyyətə görə fərqli UI göstərmək: yüklənir / xəta / məlumat, daxil olub / olmayıb. if, ternary, && və erkən return ilə.",
    sections: [
      {
        level: "baslangic",
        title: "if, ternary, &&",
        blocks: [
          { t: "analogy", text: "Mağazanın qapısındakı lövhə: açıqdırsa «Xoş gəlmisiniz», bağlıdırsa «Sabah 9:00-da». Eyni lövhə, şərtə görə fərqli mətn." },
          { t: "code", lang: "jsx", code: `function Salam({ user }) {
  if (!user) return <p>Zəhmət olmasa daxil olun</p>;    // erkən return
  return <p>Salam, {user.ad}!</p>;
}

function Bildiris({ say }) {
  return (
    <div>
      {say > 0 ? <b>{say} yeni mesaj</b> : <span>Mesaj yoxdur</span>}
      {say > 99 && <span className="nisan">99+</span>}
    </div>
  );
}` },
          { t: "terms", items: [
            ["erkən return", "şərt ödənmirsə fərqli JSX qaytar."],
            ["a ? X : Y", "iki variant."],
            ["şərt && X", "şərt doğrudursa X, yoxsa heç nə."],
            ["null", "heç nə render etməmək."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Vəziyyət maşını kimi UI",
        blocks: [
          { t: "code", lang: "jsx", code: `function Kurslar({ veziyyet }) {
  switch (veziyyet.status) {
    case "yuklenir":
      return <p>Yüklənir…</p>;
    case "xeta":
      return <p role="alert">Xəta: {veziyyet.mesaj}</p>;
    case "ugurlu":
      return veziyyet.data.length === 0
        ? <p>Kurs tapılmadı</p>
        : <ul>{veziyyet.data.map((k) => <li key={k.id}>{k.ad}</li>)}</ul>;
    default:
      return null;
  }
}` },
          { t: "mistake", lang: "jsx", wrong: `{mesajlar.length && <Siyahi />}`, right: `{mesajlar.length > 0 && <Siyahi />}`, why: "length 0 olanda && 0 qaytarır və React ekrana «0» yazır. Şərti boolean et." },
          { t: "mistake", lang: "jsx", wrong: `{a ? (b ? <X /> : <Y />) : (c ? <Z /> : null)}`, right: `// Ayrı komponentə və ya erkən return-lərə böl`, why: "İç-içə ternary-lər oxunmur. Mürəkkəb şərti funksiyaya çıxar." },
        ],
      },
      {
        level: "senior",
        title: "Şərti render və state, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Komponent şərtlə silinəndə (cond && <Forma />) onun state-i itir. Gizlətmək və state-i saxlamaq lazımdırsa CSS (hidden) və ya state-i yuxarı qaldır.",
            "Eyni yerdə fərqli tipli komponent → React köhnəni silib yenisini qurur; eyni tip → state qalır. key ilə məcburi sıfırlama: <Forma key={userId} />.",
            "Suspense + error boundary — yüklənmə və xəta hallarını deklarativ idarə etmək (Next.js loading.tsx, error.tsx).",
            "Təhlükəsizlik: {user.isAdmin && <AdminPanel />} UI-ni gizlədir, amma qoruma DEYİL. AdminPanel-in kodu bundle-dadır və onun çağırdığı API-lər serverdə yetkini ayrıca yoxlamalıdır.",
            "Təhlükəsizlik: həssas məlumatı «göstərmə» şərti ilə gizlətmə — əgər data klientə gəlibsə, istifadəçi onu Network tab-da görür. Serverdə filtrlə.",
          ]},
          { t: "qa", items: [
            ["&& ilə 0 problemi?", "Sol tərəf 0 olanda React 0-ı render edir; şərti boolean-a çevir."],
            ["Komponentin state-ini necə sıfırlamaq olar?", "key-ini dəyişməklə — React onu yeni komponent kimi qurur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Heç nə render etməmək üçün komponent nə qaytarır?", options: ["undefined", "null", "false string"], answer: 1, why: "null — boş render." },
        ],
      },
    ],
    exercise: {
      task: "KursSiyahisi komponenti: status (\"yuklenir\" | \"xeta\" | \"ugurlu\"), data və mesaj props alsın. Hər hal üçün fərqli UI, boş data üçün xüsusi mesaj, 3-dən çox kurs varsa \"Hamısını göstər\" düyməsi (state ilə). && ilə 0 tələsindən qaç.",
      starter: `import { useState } from "react";\n\nexport default function KursSiyahisi({ status, data, mesaj }) {\n  // bura\n}\n`,
      expect: "switch və ya erkən return-lər; xəta role=\"alert\"; boş siyahı mesajı; length > 3 && düymə; göstərilən say state ilə (slice); key prop siyahıda.",
    },
  },
  {
    slug: "siyahilar",
    title: "Siyahılar və key",
    intro: "Massivdən UI yaratmaq — map ilə. Hər elementə unikal və sabit key lazımdır ki, React hansı elementin dəyişdiyini bilsin.",
    sections: [
      {
        level: "baslangic",
        title: "map və key",
        blocks: [
          { t: "analogy", text: "key — sinifdəki tələbələrin şəxsiyyət nömrəsidir. Tələbələr yerlərini dəyişsə də, müəllim nömrəyə görə kimin kim olduğunu bilir. Nömrə olmasa, müəllim «3-cü partadakı» deyə yadda saxlayır — yer dəyişəndə hər şey qarışır." },
          { t: "code", lang: "jsx", code: `const kurslar = [
  { id: "html", ad: "HTML", saat: 20 },
  { id: "css", ad: "CSS", saat: 30 },
  { id: "js", ad: "JavaScript", saat: 60 },
];

export default function Kurslar() {
  return (
    <ul>
      {kurslar.map((k) => (
        <li key={k.id}>
          {k.ad} — {k.saat} saat
        </li>
      ))}
    </ul>
  );
}` },
          { t: "terms", items: [
            ["map", "massivin hər elementini JSX-ə çevirir."],
            ["key", "qardaş elementlər arasında unikal, sabit identifikator."],
            ["sabit", "render-dən render-ə dəyişməyən (DB id-si ideal)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Filtr, sıralama və key səhvləri",
        blocks: [
          { t: "code", lang: "jsx", code: `function Siyahi({ kurslar, axtaris }) {
  const gorunen = kurslar
    .filter((k) => k.ad.toLowerCase().includes(axtaris.toLowerCase()))
    .toSorted((a, b) => a.saat - b.saat);

  if (gorunen.length === 0) return <p>Heç nə tapılmadı</p>;

  return (
    <ul>
      {gorunen.map((k) => <KursSetri key={k.id} kurs={k} />)}
    </ul>
  );
}` },
          { t: "mistake", lang: "jsx", wrong: `{list.map((x, i) => <Setir key={i} data={x} />)}`, right: `{list.map((x) => <Setir key={x.id} data={x} />)}`, why: "İndeks key elementlər əlavə/silinəndə və sıralananda başqa elementə «keçir» — input-ların dəyəri, fokus, state səhv elementə yapışır. İndeks yalnız heç vaxt dəyişməyən statik siyahıda olar." },
          { t: "mistake", lang: "jsx", wrong: `<li key={Math.random()}>`, right: `<li key={item.id}>`, why: "Təsadüfi key hər render-də dəyişir — React hər elementi silib yenidən qurur: yavaş və state itir." },
        ],
      },
      {
        level: "senior",
        title: "Reconciliation və böyük siyahılar",
        blocks: [
          { t: "p", text: "React siyahını yeniləyəndə köhnə və yeni uşaqları key-ə görə cütləşdirir: eyni key — eyni komponent (state qalır, props yenilənir), yeni key — yeni komponent, itən key — silinir. Key-siz React yalnız sıraya baxır — əvvələ element əlavə etmək bütün siyahını yeniləyir." },
          { t: "list", items: [
            "1000+ sətir: virtualizasiya (react-window, TanStack Virtual) — yalnız görünən sətirlər DOM-da.",
            "Sətir komponentini memo ilə bük, props-ları sabit saxla — bir sətir dəyişəndə hamısı render olunmasın.",
            "Server tərəf səhifələmə/filtr — 10 000 elementi klientə göndərmə.",
            "Key yalnız qardaşlar arasında unikal olmalıdır, qlobal yox.",
            "Təhlükəsizlik: siyahıda istifadəçi məzmununu (şərhlər) göstərəndə {metn} ilə escape olunur — onu markdown/HTML kimi render etmək lazımdırsa təhlükəsiz renderer + sanitizer işlət.",
            "Təhlükəsizlik: siyahının hər sətrindəki əməliyyat (sil, redaktə) serverdə həmin elementin istifadəçiyə aid olduğunu yoxlamalıdır — sadəcə «UI-də görünürdü» yetki deyil (IDOR).",
          ]},
          { t: "qa", items: [
            ["Niyə indeksi key etmək pisdir?", "Sıra dəyişəndə key başqa elementə keçir; state və DOM yanlış elementlə əlaqələnir."],
            ["Key harada unikal olmalıdır?", "Eyni valideynin qardaş elementləri arasında."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Ən yaxşı key:", options: ["massiv indeksi", "Math.random()", "məlumatın unikal id-si"], answer: 2, why: "Unikal və sabitdir." },
        ],
      },
    ],
    exercise: {
      task: "Tələbə siyahısı: axtarış input-u (ada görə filtr), bal üzrə sıralama düyməsi (artan/azalan toggle), hər sətirdə Sil düyməsi. key olaraq id. Orijinal massiv mutasiya olunmasın.",
      starter: `import { useState } from "react";\n\nconst BASLANGIC = [\n  { id: 1, ad: "Aysel", bal: 92 },\n  { id: 2, ad: "Murad", bal: 65 },\n  { id: 3, ad: "Leyla", bal: 78 },\n];\n\nexport default function Telebeler() {\n  // bura\n}\n`,
      expect: "state: list, axtaris, artan; filter + toSorted (və ya [...].sort); key={t.id}; silmə filter ilə; boş nəticə mesajı; indeks key yoxdur.",
    },
  },
  {
    slug: "formalar",
    title: "Formalar",
    intro: "React-də formalar iki yolla: controlled (dəyər state-dədir) və uncontrolled (dəyər DOM-dadır, FormData ilə oxunur). Validasiya və təhlükəsiz göndərmə.",
    sections: [
      {
        level: "baslangic",
        title: "Controlled input",
        blocks: [
          { t: "analogy", text: "Controlled input — kuklaçı ilə kukladır: kukla (input) yalnız kuklaçının (state) dediyini edir. Hər hərf yazılanda state dəyişir, input da state-i göstərir." },
          { t: "code", lang: "jsx", code: `import { useState } from "react";

export default function Qeydiyyat() {
  const [form, setForm] = useState({ ad: "", email: "", seviyye: "junior", razi: false });

  function deyis(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function gonder(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={gonder}>
      <label>Ad <input name="ad" value={form.ad} onChange={deyis} required /></label>
      <label>Email <input name="email" type="email" value={form.email} onChange={deyis} /></label>
      <select name="seviyye" value={form.seviyye} onChange={deyis}>
        <option value="junior">Junior</option>
        <option value="middle">Middle</option>
      </select>
      <label><input name="razi" type="checkbox" checked={form.razi} onChange={deyis} /> Razıyam</label>
      <button disabled={!form.razi}>Göndər</button>
    </form>
  );
}` },
          { t: "terms", items: [
            ["controlled", "value + onChange — dəyər state-dən gəlir."],
            ["name", "hansı sahənin dəyişdiyini bilmək üçün."],
            ["[name]: value", "computed açar — bir handler bütün sahələr üçün."],
            ["checked", "checkbox/radio üçün value əvəzinə."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Validasiya və uncontrolled forma",
        blocks: [
          { t: "code", lang: "jsx", code: `function Elaqe() {
  const [xetalar, setXetalar] = useState({});

  function gonder(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));   // uncontrolled
    const x = {};
    if (!data.ad.trim()) x.ad = "Ad boş ola bilməz";
    if (!/^\\S+@\\S+\\.\\S+$/.test(data.email)) x.email = "Email yanlışdır";
    setXetalar(x);
    if (Object.keys(x).length === 0) console.log("Göndərilir", data);
  }

  return (
    <form onSubmit={gonder} noValidate>
      <input name="ad" aria-invalid={!!xetalar.ad} aria-describedby="ad-xeta" />
      {xetalar.ad && <p id="ad-xeta" role="alert">{xetalar.ad}</p>}
      <input name="email" type="email" aria-invalid={!!xetalar.email} />
      {xetalar.email && <p role="alert">{xetalar.email}</p>}
      <button>Göndər</button>
    </form>
  );
}` },
          { t: "mistake", lang: "jsx", wrong: `<input value={ad} />  // onChange yoxdur`, right: `<input value={ad} onChange={(e) => setAd(e.target.value)} />`, why: "value var, onChange yoxdur — input «donur», yazmaq mümkün olmur (React xəbərdarlıq edir). Yalnız başlanğıc dəyər lazımdırsa defaultValue." },
          { t: "mistake", lang: "jsx", wrong: `const [ad, setAd] = useState();\n<input value={ad} ... />`, right: `const [ad, setAd] = useState("");`, why: "undefined → string keçidi input-u uncontrolled-dan controlled-a çevirir (xəbərdarlıq). Başlanğıc dəyər boş string olsun." },
        ],
      },
      {
        level: "senior",
        title: "Server actions, kitabxanalar, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "React 19 / Next.js: <form action={serverAction}> — forma JS yüklənmədən də işləyir (progressive enhancement), useActionState ilə nəticə və xətalar, useFormStatus ilə «göndərilir» vəziyyəti.",
            "Böyük formalar: react-hook-form (uncontrolled, az render) + zod sxemi (klient və server eyni sxem).",
            "Hər hərfdə bütün formanın render olunması böyük formalarda gecikmə yaradır — sahələri ayrı komponentlərə böl və ya uncontrolled yanaşma.",
            "Təhlükəsizlik: klient validasiyası RAHATLIQ üçündür. Server eyni yoxlamanı MÜTLƏQ təkrarlamalıdır — istifadəçi curl ilə istənilən məlumatı göndərə bilər.",
            "Təhlükəsizlik: parol sahələrində autocomplete=\"new-password\"/\"current-password\", type=\"password\"; parolu state-də lazımsız saxlama və log-a yazma.",
            "Təhlükəsizlik: cookie əsaslı auth ilə POST formaları CSRF-ə qarşı qorunmalıdır (SameSite cookie, CSRF token; Next.js server actions Origin yoxlaması edir).",
          ]},
          { t: "qa", items: [
            ["Controlled və uncontrolled fərqi?", "Controlled-da dəyər React state-indədir; uncontrolled-da DOM-da və ref/FormData ilə oxunur."],
            ["Klient validasiyası kifayətdirmi?", "Xeyr — yalnız UX üçündür; server hər zaman yenidən yoxlamalıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Checkbox-un dəyəri hansı xassədən oxunur?", options: ["e.target.value", "e.target.checked", "e.target.selected"], answer: 1, why: "checked — true/false." },
        ],
      },
    ],
    exercise: {
      task: "Qeydiyyat forması (controlled): ad, email, parol, parol təkrarı, şərtlərlə razılıq. Göndərəndə yoxla: ad boş deyil, email formatı, parol ≥ 12 simvol, parollar eyni, razılıq var. Xətaları sahənin altında role=\"alert\" ilə göstər.",
      starter: `import { useState } from "react";\n\nexport default function Qeydiyyat() {\n  // bura\n}\n`,
      expect: "bir state obyekti + ümumi handler [name]; preventDefault; bütün qaydalar yoxlanır; xətalar obyektdə; aria-invalid/role=alert; parol type=password, autocomplete=new-password; parol log-lanmır.",
    },
  },
  {
    slug: "useeffect",
    title: "useEffect",
    intro: "useEffect komponenti xarici sistemlə sinxronlaşdırır: abunəlik, taymer, brauzer API-si, şəbəkə. Render-dən SONRA işləyir və təmizlik funksiyası qaytara bilər.",
    sections: [
      {
        level: "baslangic",
        title: "Effekt və asılılıqlar",
        blocks: [
          { t: "analogy", text: "useEffect — evə girəndə işığı yandırıb çıxanda söndürməkdir. «Otaq dəyişəndə» (asılılıq dəyişəndə) köhnə otağın işığını söndürür (cleanup), yenisininkini yandırırsan (effect)." },
          { t: "code", lang: "jsx", code: `import { useEffect, useState } from "react";

function Saat() {
  const [indi, setIndi] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setIndi(new Date()), 1000);
    return () => clearInterval(id);        // cleanup — komponent silinəndə
  }, []);                                   // [] — yalnız mount-da

  return <p>{indi.toLocaleTimeString("az")}</p>;
}

function Basliq({ say }) {
  useEffect(() => {
    document.title = say + " yeni mesaj";
  }, [say]);                                // say dəyişəndə
  return null;
}` },
          { t: "terms", items: [
            ["effect", "render-dən sonra işləyən yan təsir."],
            ["dependency array", "[a, b] — bunlar dəyişəndə effekt yenidən işləyir."],
            ["[]", "yalnız ilk dəfə (mount)."],
            ["cleanup", "effektin qaytardığı funksiya — növbəti effektdən əvvəl və unmount-da."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Məlumat çəkmək düzgün",
        blocks: [
          { t: "code", lang: "jsx", code: `function User({ id }) {
  const [user, setUser] = useState(null);
  const [xeta, setXeta] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    setUser(null);
    fetch("/api/users/" + id, { signal: ac.signal })
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(setUser)
      .catch((e) => { if (e.name !== "AbortError") setXeta(e.message); });
    return () => ac.abort();                // id tez dəyişsə köhnə sorğu ləğv
  }, [id]);

  if (xeta) return <p role="alert">{xeta}</p>;
  if (!user) return <p>Yüklənir…</p>;
  return <h2>{user.ad}</h2>;
}` },
          { t: "mistake", lang: "jsx", wrong: `useEffect(() => {\n  setTam(ad + " " + soyad);\n}, [ad, soyad]);`, right: `const tam = ad + " " + soyad;  // render-də hesabla`, why: "Effekt lazım deyil! Hesablana bilən dəyər üçün effekt əlavə render və gecikmə yaradır. «You might not need an effect»." },
          { t: "mistake", lang: "jsx", wrong: `useEffect(() => {\n  setSay(say + 1);\n});  // asılılıq massivi yoxdur`, right: `// Effekti ümumiyyətlə bura qoyma; hadisə handler-ində yenilə`, why: "Hər render-dən sonra state dəyişir → yeni render → sonsuz dövr." },
        ],
      },
      {
        level: "senior",
        title: "Race condition, StrictMode, effektlərdən qaçmaq",
        blocks: [
          { t: "list", items: [
            "Race condition: id=1 sorğusu id=2-dən gec gəlsə, köhnə məlumat göstərilir. AbortController və ya «ignore» bayrağı ilə həll.",
            "StrictMode inkişafda effekti mount → cleanup → mount edir — cleanup düzgün deyilsə (ikiqat abunəlik) dərhal görünür.",
            "Asılılıqları «aldatma» (eslint-disable) — stale closure bug-ları. Funksiyanı effektin içinə köçür və ya useCallback.",
            "Data çəkmək üçün framework/kitabxana daha yaxşıdır: Next.js server komponentləri, TanStack Query (keş, retry, dedup).",
            "Effektlər: xarici sistemlə sinxronizasiya (WebSocket, DOM API, analitika). İstifadəçi hərəkəti nəticəsi — hadisə handler-ində.",
            "Təhlükəsizlik: effektdə token-i URL-ə qoyma (log-larda qalır); WebSocket/EventSource-dan gələn məlumatı etibarsız say və yoxla; cleanup-da bağlantını bağla — açıq qalan abunəliklər başqa istifadəçinin məlumatını göstərə bilər (hesab dəyişəndə).",
          ]},
          { t: "qa", items: [
            ["Cleanup nə vaxt işləyir?", "Növbəti effektdən əvvəl (asılılıq dəyişəndə) və komponent silinəndə."],
            ["Effekt nə vaxt lazım DEYİL?", "Render-də hesablana bilən dəyərlər və istifadəçi hadisəsinin nəticələri üçün."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "useEffect(f, []) nə vaxt işləyir?", options: ["Hər render-də", "Yalnız mount-da", "Heç vaxt"], answer: 1, why: "Boş asılılıq — bir dəfə (StrictMode-da inkişafda iki dəfə)." },
        ],
      },
    ],
    exercise: {
      task: "Taymer komponenti: Başla/Dayan/Sıfırla. İşləyəndə hər saniyə artsın (setInterval effektdə, işləyir state-indən asılı), cleanup ilə interval təmizlənsin. Sənəd başlığında (document.title) keçən saniyəni göstər.",
      starter: `import { useEffect, useState } from "react";\n\nexport default function Taymer() {\n  // bura\n}\n`,
      expect: "useEffect asılılığı [isleyir]; interval yalnız işləyəndə; return () => clearInterval; setSaniye(s => s + 1) funksional; ayrıca effekt document.title [saniye] ilə; sonsuz dövr yoxdur.",
    },
  },
  {
    slug: "hooks",
    title: "Digər hook-lar: useRef, useMemo, useCallback",
    intro: "useRef — render yaratmayan yaddaş və DOM-a çıxış. useMemo — ağır hesabı yadda saxlamaq. useCallback — funksiyanın istinadını sabit saxlamaq.",
    sections: [
      {
        level: "baslangic",
        title: "useRef",
        blocks: [
          { t: "analogy", text: "useRef — cibindəki qeyd dəftəridir: oraya yazmaq heç kimə xəbər vermir (render yoxdur), amma yazdığın qalır. State isə divar lövhəsidir — dəyişəndə hamı baxır." },
          { t: "code", lang: "jsx", code: `import { useRef, useState } from "react";

function Axtaris() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Fokusla</button>
    </>
  );
}

function Saniyeolcen() {
  const [say, setSay] = useState(0);
  const idRef = useRef(null);
  const basla = () => { idRef.current = setInterval(() => setSay((s) => s + 1), 1000); };
  const dayan = () => clearInterval(idRef.current);
  return <p>{say} <button onClick={basla}>▶</button><button onClick={dayan}>⏸</button></p>;
}` },
          { t: "terms", items: [
            ["useRef(x)", "{ current: x } qaytarır — render-lər arası sabit obyekt."],
            ["ref={r}", "DOM elementini r.current-ə bağlayır."],
            ["current", "dəyişmək render yaratmır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "useMemo və useCallback",
        blocks: [
          { t: "code", lang: "jsx", code: `import { memo, useCallback, useMemo, useState } from "react";

function Siyahi({ mehsullar, axtaris }) {
  const filtr = useMemo(
    () => mehsullar.filter((m) => m.ad.includes(axtaris)),   // yalnız bunlar dəyişəndə
    [mehsullar, axtaris],
  );
  return <ul>{filtr.map((m) => <li key={m.id}>{m.ad}</li>)}</ul>;
}

const Duyme = memo(function Duyme({ onClick, metn }) {
  return <button onClick={onClick}>{metn}</button>;
});

function Valideyn() {
  const [say, setSay] = useState(0);
  const artir = useCallback(() => setSay((s) => s + 1), []);   // istinad sabitdir
  return <Duyme onClick={artir} metn={"Say: " + say} />;
}` },
          { t: "list", items: [
            "useMemo dəyəri, useCallback funksiyanı yadda saxlayır (useCallback(f, d) = useMemo(() => f, d)).",
            "Faydası yalnız: həqiqətən ağır hesab, memo-lu uşağa ötürülən props, və ya başqa hook-un asılılığı olanda.",
            "Hər şeyi memo-ya bükmək kodu çirkləndirir və öz xərci var. Əvvəl ölç (React Profiler).",
          ]},
          { t: "mistake", lang: "jsx", wrong: `const ref = useRef(0);\n<p>{ref.current}</p>\n<button onClick={() => ref.current++}>+</button>`, right: `const [say, setSay] = useState(0);`, why: "ref dəyişikliyi render yaratmır — ekran yenilənmir. Göstərilən məlumat state-də olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Hook qaydaları və React Compiler",
        blocks: [
          { t: "list", items: [
            "Hook qaydaları: yalnız komponentin/hook-un üst səviyyəsində (if, dövr, callback içində yox) və yalnız React funksiyalarında. React hook-ları çağırış SIRASINA görə tanıyır.",
            "Render zamanı ref.current oxuma/yazma — saflığı pozur; ref-ləri handler və effektlərdə işlət.",
            "React Compiler avtomatik memoizasiya edir — yeni kodda əl ilə useMemo/useCallback ehtiyacı xeyli azalır.",
            "useId — SSR ilə uyğun unikal id (label-input əlaqəsi üçün).",
            "useTransition / useDeferredValue — ağır yeniləmələri təcili olmayan kimi işarələ, UI cavabdeh qalsın.",
            "Təhlükəsizlik: ref ilə DOM-a birbaşa innerHTML yazmaq (ref.current.innerHTML = metn) React-in XSS qorumasını keçir. textContent işlət və ya React-in özü render etsin.",
          ]},
          { t: "qa", items: [
            ["useRef və useState fərqi?", "Hər ikisi render-lər arası saxlayır, amma ref dəyişikliyi render yaratmır."],
            ["useMemo nə vaxt lazımsızdır?", "Ucuz hesablamalarda və memo-suz uşaqlara ötürülən dəyərlərdə — fayda yox, mürəkkəblik var."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Input-a proqramla fokus vermək üçün:", options: ["useState", "useRef", "useMemo"], answer: 1, why: "ref DOM elementinə çıxış verir." },
        ],
      },
    ],
    exercise: {
      task: "1) Axtarış input-u: komponent açılanda avtomatik fokus (useRef + useEffect). 2) 5000 ədədlik massivdən axtarışa görə filtr (useMemo). 3) Əvvəlki axtarış mətnini useRef-də saxlayıb göstər (\"Əvvəlki: ...\").",
      starter: `import { useEffect, useMemo, useRef, useState } from "react";\n\nconst EDEDLER = Array.from({ length: 5000 }, (_, i) => "Element " + i);\n\nexport default function Axtar() {\n  // bura\n}\n`,
      expect: "inputRef + useEffect(() => inputRef.current?.focus(), []); useMemo asılılıqları [q]; əvvəlki dəyər ref-də effektdə yenilənir; hook-lar şərt içində çağırılmır; innerHTML yoxdur.",
    },
  },
  {
    slug: "context",
    title: "Context",
    intro: "Context məlumatı props ötürmədən komponent ağacının dərinliyinə çatdırır: tema, dil, daxil olmuş istifadəçi. Prop drilling-in həlli.",
    sections: [
      {
        level: "baslangic",
        title: "createContext, Provider, useContext",
        blocks: [
          { t: "analogy", text: "Context — binanın radio sistemidir: hər mərtəbəyə (komponentə) kabel çəkmək (props) əvəzinə, mərkəzdən yayım edirsən; kim qulaq asmaq istəyirsə, radiosunu (useContext) yandırır." },
          { t: "code", lang: "jsx", code: `import { createContext, useContext, useState } from "react";

const TemaContext = createContext("tund");

export default function App() {
  const [tema, setTema] = useState("tund");
  return (
    <TemaContext value={tema}>
      <button onClick={() => setTema((t) => (t === "tund" ? "aciq" : "tund"))}>Temanı dəyiş</button>
      <Sehife />
    </TemaContext>
  );
}

function Sehife() {
  return <Kart />;            // tema props ilə ötürülmür
}

function Kart() {
  const tema = useContext(TemaContext);
  return <div className={"kart kart--" + tema}>Tema: {tema}</div>;
}` },
          { t: "terms", items: [
            ["createContext(default)", "context obyekti yaradır."],
            ["<Ctx value={...}>", "provider — altındakı ağaca dəyər verir (React 19; köhnə: Ctx.Provider)."],
            ["useContext(Ctx)", "ən yaxın provider-in dəyərini oxuyur."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Context + öz hook",
        blocks: [
          { t: "code", lang: "jsx", code: `const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({
    user,
    daxilOl: (u) => setUser(u),
    cix: () => setUser(null),
  }), [user]);
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth AuthProvider daxilində işlədilməlidir");
  return ctx;
}

function Profil() {
  const { user, cix } = useAuth();
  return user ? <button onClick={cix}>{user.ad} — çıx</button> : <p>Qonaq</p>;
}` },
          { t: "mistake", lang: "jsx", wrong: `<AuthContext value={{ user, setUser }}>`, right: `const value = useMemo(() => ({ user, setUser }), [user]);\n<AuthContext value={value}>`, why: "Hər render-də yeni obyekt → bütün istehlakçılar yenidən render olunur, hətta user dəyişməsə də." },
        ],
      },
      {
        level: "senior",
        title: "Context nə vaxt DEYİL",
        blocks: [
          { t: "list", items: [
            "Context dəyəri dəyişəndə bütün useContext edənlər render olunur — tez-tez dəyişən məlumat (siçan mövqeyi, input mətni) üçün uyğun deyil.",
            "Böyük context-i böl: AuthContext, TemaContext, və ya state/dispatch-i ayrı context-lərə.",
            "Server state (API məlumatı) üçün context yox — TanStack Query/SWR və ya Next.js server komponentləri (keş, yenilənmə).",
            "Mürəkkəb klient state: Zustand, Redux Toolkit — selektorlarla yalnız lazım olan hissəyə abunə.",
            "Server Components-də context yoxdur — provider-lər \"use client\" faylında.",
            "Təhlükəsizlik: AuthContext-dəki user yalnız UI üçündür. Token-i context/localStorage-da saxlamaq XSS zamanı oğurlanır — HttpOnly cookie. Rolu klient context-indən götürüb API-yə «admin» kimi göndərmə; server sessiyadan oxusun.",
          ]},
          { t: "qa", items: [
            ["Context state idarəetmə kitabxanasıdırmı?", "Xeyr — o, ötürmə mexanizmidir; state yenə useState/useReducer-dədir."],
            ["Context performans problemi?", "Dəyər dəyişəndə bütün istehlakçılar render olunur; bölmək, memo və selektorlu kitabxanalar həll edir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Context nəyi həll edir?", options: ["Sürəti", "Prop drilling-i", "CSS-i"], answer: 1, why: "Props-u aralıq komponentlərdən keçirmədən ötürür." },
        ],
      },
    ],
    exercise: {
      task: "DilContext yarat (\"az\" | \"en\"). DilProvider state saxlasın, useDil() hook-u provider xaricində xəta atsın. Header-də dil dəyişmə düyməsi, Salam komponenti dilə görə \"Salam\"/\"Hello\" göstərsin. value useMemo ilə.",
      starter: `import { createContext, useContext, useMemo, useState } from "react";\n\n// bura\n\nexport default function App() {\n  // bura\n}\n`,
      expect: "createContext(null); provider value useMemo; useDil null yoxlaması ilə Error; dil dəyişdirmə funksiyası; Salam useDil ilə tərcümə; props drilling yoxdur.",
    },
  },
  {
    slug: "custom-hook",
    title: "Öz hook-larını yazmaq",
    intro: "Custom hook — use ilə başlayan, içində başqa hook-lar işlədən funksiya. Komponentlər arasında təkrarlanan məntiqi (state + effekt) bir yerə yığır.",
    sections: [
      {
        level: "baslangic",
        title: "İlk custom hook",
        blocks: [
          { t: "analogy", text: "Custom hook — mətbəxdəki hazır sous reseptidir: hər yeməkdə sousu sıfırdan hazırlamırsan, «useSous()» deyirsən. Hər yemək öz porsiyasını alır — state paylaşılmır, məntiq paylaşılır." },
          { t: "code", lang: "jsx", code: `import { useEffect, useState } from "react";

function useOnlayn() {
  const [onlayn, setOnlayn] = useState(true);
  useEffect(() => {
    const on = () => setOnlayn(true);
    const off = () => setOnlayn(false);
    setOnlayn(navigator.onLine);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return onlayn;
}

function Status() {
  const onlayn = useOnlayn();
  return <p>{onlayn ? "✅ Onlayn" : "❌ İnternet yoxdur"}</p>;
}` },
          { t: "terms", items: [
            ["custom hook", "use ilə başlayan, hook işlədən funksiya."],
            ["use- prefiksi", "React və linter-ə hook qaydalarını yoxlamağı deyir."],
            ["məntiq paylaşılır", "state hər komponentdə ayrıdır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Faydalı hook-lar",
        blocks: [
          { t: "code", lang: "jsx", code: `function useLocalStorage(acar, baslangic) {
  const [deyer, setDeyer] = useState(() => {
    try {
      const x = localStorage.getItem(acar);
      return x !== null ? JSON.parse(x) : baslangic;
    } catch {
      return baslangic;               // pozulmuş JSON
    }
  });
  useEffect(() => {
    localStorage.setItem(acar, JSON.stringify(deyer));
  }, [acar, deyer]);
  return [deyer, setDeyer];
}

function useDebounce(deyer, ms = 300) {
  const [d, setD] = useState(deyer);
  useEffect(() => {
    const id = setTimeout(() => setD(deyer), ms);
    return () => clearTimeout(id);
  }, [deyer, ms]);
  return d;
}

function Axtaris() {
  const [q, setQ] = useLocalStorage("axtaris", "");
  const gecikmisQ = useDebounce(q, 400);   // API-yə yalnız yazmaq dayananda
  // useEffect(() => { fetch("/api?q=" + encodeURIComponent(gecikmisQ)) }, [gecikmisQ]);
  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}` },
          { t: "mistake", lang: "jsx", wrong: `function getUser() {\n  const [u, setU] = useState(null);  // hook adı use ilə başlamır\n}`, right: `function useUser() { ... }`, why: "use- prefiksi olmadan linter hook qaydalarını yoxlamır və başqaları bunun hook olduğunu bilmir." },
        ],
      },
      {
        level: "senior",
        title: "Hook API dizaynı",
        blocks: [
          { t: "list", items: [
            "Hook ya dəyər, ya [dəyər, set] tuple-ı, ya da adlı sahəli obyekt qaytarsın — 3+ dəyər üçün obyekt.",
            "Hook-un içində effekt asılılıqlarını düzgün saxla; çağırandan gələn callback-ləri useEffectEvent (və ya ref) ilə sabitləşdir.",
            "SSR: window/localStorage render zamanı yoxdur — effektdə və ya useSyncExternalStore (getServerSnapshot ilə) oxu. Bu saytın irəliləyiş hook-u məhz useSyncExternalStore ilə yazılıb.",
            "Hook-ları test et: @testing-library/react renderHook.",
            "Təhlükəsizlik: localStorage hook-u — orada token/şəxsi məlumat saxlama (XSS ilə oxunur); JSON.parse-ı try ilə qoru və gələn formanı yoxla (istifadəçi və ya başqa skript dəyişə bilər).",
          ]},
          { t: "qa", items: [
            ["İki komponent eyni custom hook-u işlədəndə state paylaşılırmı?", "Xeyr — hər çağırış öz state-ini yaradır; paylaşmaq üçün context və ya store lazımdır."],
            ["useSyncExternalStore nə üçündür?", "Xarici mənbəyə (localStorage, store, brauzer API) təhlükəsiz, SSR-uyğun abunəlik üçün."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Custom hook adı necə başlamalıdır?", options: ["get", "use", "hook"], answer: 1, why: "use- konvensiyası və linter qaydası." },
        ],
      },
    ],
    exercise: {
      task: "useFetch(url) hook-u yaz: { data, xeta, yuklenir } qaytarsın, url dəyişəndə köhnə sorğunu AbortController ilə ləğv etsin, res.ok yoxlasın. Onu iki fərqli komponentdə istifadə et.",
      starter: `import { useEffect, useState } from "react";\n\nfunction useFetch(url) {\n  // bura\n}\n\nexport default function App() {\n  // bura\n}\n`,
      expect: "use prefiksi; state obyekti və ya 3 state; useEffect [url]; AbortController + cleanup abort; AbortError ignore; res.ok yoxlanır; hook şərt daxilində çağırılmır.",
    },
  },
  {
    slug: "reducer",
    title: "useReducer və state idarəsi",
    intro: "Çoxlu bir-birinə bağlı state və mürəkkəb keçidlər olanda useReducer: bütün dəyişikliklər bir funksiyada, «action» adları ilə. Redux-un ideyası da budur.",
    sections: [
      {
        level: "baslangic",
        title: "reducer və dispatch",
        blocks: [
          { t: "analogy", text: "Reducer — bank kassiridir: sən «500 AZN medaxil» qəbzi (action) verirsən, kassir qaydaya görə (reducer) yeni balansı hesablayır. Kassanı (state) özün açıb pul qoymursan." },
          { t: "code", lang: "jsx", code: `import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "artir": return { ...state, say: state.say + state.addim };
    case "azalt": return { ...state, say: state.say - state.addim };
    case "addim": return { ...state, addim: action.deyer };
    case "sifirla": return { say: 0, addim: 1 };
    default: throw new Error("Naməlum action: " + action.type);
  }
}

export default function Sayqac() {
  const [state, dispatch] = useReducer(reducer, { say: 0, addim: 1 });
  return (
    <>
      <p>{state.say}</p>
      <button onClick={() => dispatch({ type: "artir" })}>+</button>
      <button onClick={() => dispatch({ type: "azalt" })}>−</button>
      <input type="number" value={state.addim}
        onChange={(e) => dispatch({ type: "addim", deyer: Number(e.target.value) })} />
      <button onClick={() => dispatch({ type: "sifirla" })}>Sıfırla</button>
    </>
  );
}` },
          { t: "terms", items: [
            ["reducer(state, action)", "köhnə state + action → yeni state (saf funksiya)."],
            ["action", "nə baş verdiyini təsvir edən obyekt: { type, ... }."],
            ["dispatch", "action göndərmək."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Nə vaxt useReducer?",
        blocks: [
          { t: "list", items: [
            "State sahələri bir-birindən asılıdır (status + data + xəta).",
            "Növbəti state əvvəlkindən mürəkkəb qaydalarla hesablanır.",
            "Eyni dəyişiklik bir neçə yerdən edilir — action adı onu sənədləşdirir.",
            "Reducer saf funksiyadır — komponent olmadan test olunur.",
          ]},
          { t: "code", lang: "tsx", code: `type State =
  | { status: "bos" }
  | { status: "yuklenir" }
  | { status: "ugurlu"; data: string[] }
  | { status: "xeta"; mesaj: string };

type Action =
  | { type: "basla" }
  | { type: "ugur"; data: string[] }
  | { type: "xeta"; mesaj: string };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "basla": return { status: "yuklenir" };
    case "ugur": return { status: "ugurlu", data: a.data };
    case "xeta": return { status: "xeta", mesaj: a.mesaj };
  }
}` },
          { t: "mistake", lang: "jsx", wrong: `case "elave":\n  state.list.push(action.x);\n  return state;`, right: `case "elave":\n  return { ...state, list: [...state.list, action.x] };`, why: "Reducer state-i mutasiya etməməlidir — eyni istinad qaytarılanda React dəyişikliyi görmür." },
        ],
      },
      {
        level: "senior",
        title: "Context + reducer, xarici store-lar",
        blocks: [
          { t: "list", items: [
            "useReducer + Context: dispatch sabit istinaddır — onu ayrıca context-də ötürmək istehlakçıların lazımsız render-ini azaldır.",
            "Redux Toolkit: reducer + Immer (mutasiya kimi yazılır, immutable nəticə) + DevTools (time travel).",
            "Zustand: minimal API, selektorla abunə — kiçik/orta layihələr üçün populyar.",
            "Server state-i reducer-də saxlama — keş, yenilənmə, retry üçün TanStack Query.",
            "Event sourcing ideyası: action-lar tarixçəsi = vəziyyətin tam izi (undo/redo, audit).",
            "Təhlükəsizlik: reducer-ə gələn action məlumatını (xüsusən WebSocket/postMessage-dən gəlirsə) yoxla — naməlum type üçün xəta at və ya ignore et; qlobal store-u window-a açma (prod-da DevTools-u söndür) — həssas məlumat görünür.",
          ]},
          { t: "qa", items: [
            ["useState yoxsa useReducer?", "Sadə, müstəqil dəyərlər — useState; əlaqəli sahələr və mürəkkəb keçidlər — useReducer."],
            ["Reducer niyə saf olmalıdır?", "Proqnozlaşdırılan, test olunan olsun; React onu təkrar çağıra bilər (StrictMode)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Reducer nə qaytarmalıdır?", options: ["Dəyişdirilmiş köhnə state", "Yeni state obyekti", "Heç nə"], answer: 1, why: "Immutable yeniləmə — yeni obyekt." },
        ],
      },
    ],
    exercise: {
      task: "Səbət reducer-i: action-lar elave (məhsul), sil (id), miqdar (id, say ≥ 1), bosalt. State: { mehsullar: [{id, ad, qiymet, say}] }. Eyni məhsul əlavə olunanda say artsın. Ümumi məbləği render-də hesabla. Naməlum action-da xəta.",
      starter: `import { useReducer } from "react";\n\nfunction reducer(state, action) {\n  // bura\n}\n\nexport default function Sebet() {\n  // bura\n}\n`,
      expect: "switch 4 action + default throw; immutable map/filter/spread; elave-də mövcuddursa say + 1; miqdar 1-dən az olmur; cəm reduce ilə render-də (state-də yox).",
    },
  },
  {
    slug: "performans",
    title: "Senior: render və performans",
    intro: "React tətbiqini sürətli saxlamaq: nə vaxt və niyə render olur, ölçmə (Profiler), memo, kod bölmə, virtualizasiya, concurrent xüsusiyyətlər və Core Web Vitals.",
    sections: [
      {
        level: "baslangic",
        title: "Render nə vaxt olur?",
        blocks: [
          { t: "analogy", text: "Render — rəssamın şəkli yenidən çəkməsidir. Bir çiçəyin rəngi dəyişəndə bütün tablonu yenidən çəkmək israfdır. React ağıllı rəssamdır, amma ona nəyin dəyişmədiyini düzgün demək lazımdır." },
          { t: "list", items: [
            "Komponent render olur: öz state-i dəyişəndə, valideyni render olanda, istifadə etdiyi context dəyişəndə.",
            "Render ≠ DOM dəyişikliyi: React hesablayır, DOM-a yalnız fərqi yazır. Render özü adətən ucuzdur.",
            "Problem: çox komponentin lazımsız yerə və ya ağır hesablama ilə render olması.",
          ]},
          { t: "code", lang: "jsx", code: `// State-i lazım olan yerə ENDİR — yalnız input render olsun
function Sehife() {
  return (
    <>
      <AxtarisInput />   {/* öz state-i var */}
      <AgirQrafik />     {/* input yazılanda render OLMUR */}
    </>
  );
}` },
        ],
      },
      {
        level: "orta",
        title: "Alətlər və texnikalar",
        blocks: [
          { t: "code", lang: "jsx", code: `import { lazy, Suspense, memo, useDeferredValue } from "react";

const Redaktor = lazy(() => import("./Redaktor"));   // kod bölmə

function Sehife({ acig }) {
  return acig ? (
    <Suspense fallback={<p>Yüklənir…</p>}>
      <Redaktor />
    </Suspense>
  ) : null;
}

const Setir = memo(function Setir({ item }) {
  return <li>{item.ad}</li>;
});

function Netice({ q }) {
  const gecikmis = useDeferredValue(q);         // yazmaq sürətli qalır
  return <AgirSiyahi q={gecikmis} />;
}` },
          { t: "list", items: [
            "React DevTools Profiler — hansı komponent nə qədər və niyə render olub.",
            "Chrome Performance — uzun tapşırıqlar (>50 ms), INP.",
            "Kod bölmə: route səviyyəsində (Next.js avtomatik), ağır komponentlər lazy.",
            "1000+ sətir: virtualizasiya.",
            "Şəkillər: next/image, ölçü, lazy, düzgün format.",
          ]},
          { t: "mistake", lang: "jsx", wrong: `// Hər şeyi memo/useMemo/useCallback-ə bükmək`, right: `// Əvvəl Profiler ilə ölç, darboğazı tap, sonra hədəfli optimallaşdır`, why: "Memoizasiyanın öz xərci var (müqayisə, yaddaş) və kodu mürəkkəbləşdirir. Ölçmədən optimallaşdırma — təxmindir." },
        ],
      },
      {
        level: "senior",
        title: "Arxitektura səviyyəli performans",
        blocks: [
          { t: "list", items: [
            "Ən böyük qazanc JS-i ümumiyyətlə göndərməməkdir: Server Components, statik generasiya, streaming SSR — klient JS-i azalır, LCP yaxşılaşır.",
            "Hidratasiya xərci: böyük interaktiv ağac yavaş «canlanır». Interaktiv adaları kiçik saxla (\"use client\" sərhədini aşağı endir).",
            "Context-i böl, selektorlu store işlət — bir dəyər dəyişəndə bütün ağac render olmasın.",
            "useTransition — ağır yeniləməni kəsilə bilən et (tab keçidi, filtr).",
            "Bundle analizi: @next/bundle-analyzer; ağır kitabxanaları (moment, lodash tam) yüngül alternativlərlə əvəzlə.",
            "Core Web Vitals hədəfləri: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 — real istifadəçi ölçmələri (RUM).",
            "Təhlükəsizlik və performans: üçüncü tərəf skriptləri (analitika, reklam, chat) həm performansın, həm təhlükəsizliyin ən böyük riskidir — onlar səhifədəki hər şeyi oxuya bilir. Minimum saxla, CSP ilə məhdudlaşdır, next/script strategy=\"lazyOnload\".",
          ]},
          { t: "qa", items: [
            ["Komponent niyə lazımsız render olur?", "Valideyn render olur, props-lar hər dəfə yeni istinaddır və ya geniş context dəyişir."],
            ["React-də ən təsirli performans addımı?", "Daha az JS göndərmək: server render, kod bölmə, state-i lokal saxlamaq; sonra ölçülmüş memoizasiya."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı alət hansı komponentin niyə render olduğunu göstərir?", options: ["console.log", "React DevTools Profiler", "Lighthouse"], answer: 1, why: "Profiler render səbəblərini və vaxtı göstərir." },
        ],
      },
    ],
    exercise: {
      task: "Ləng tətbiqi optimallaşdır: App-də axtarış input-u və 3000 elementli AgirSiyahi var, input yazılanda hamısı render olur. 1) Input-u ayrı komponentə çıxar (state-i endir) və ya useDeferredValue işlət. 2) Sətir komponentini memo ilə bük. 3) Hər addımın niyə kömək etdiyini şərhdə izah et.",
      starter: `import { memo, useDeferredValue, useState } from "react";\n\nconst DATA = Array.from({ length: 3000 }, (_, i) => ({ id: i, ad: "Element " + i }));\n\nexport default function App() {\n  const [q, setQ] = useState("");\n  return (\n    <>\n      <input value={q} onChange={(e) => setQ(e.target.value)} />\n      <ul>{DATA.filter((d) => d.ad.includes(q)).map((d) => <li key={d.id}>{d.ad}</li>)}</ul>\n    </>\n  );\n}\n`,
      expect: "useDeferredValue və ya state ayrılması; filtr useMemo ilə və ya ayrı komponentdə; Setir memo; key id; şərhlərdə render səbəbləri izah olunub.",
    },
  },
  {
    slug: "arxitektura",
    title: "Senior: arxitektura və pattern-lər",
    intro: "Böyük React tətbiqini qurmaq: qovluq quruluşu, komponent pattern-ləri, state strategiyası, test, dizayn sistemi və təhlükəsizlik.",
    sections: [
      {
        level: "baslangic",
        title: "Qovluq quruluşu",
        blocks: [
          { t: "analogy", text: "Kiçik mənzildə hər şeyi bir otaqda saxlamaq olar. Böyük evdə isə otaqlar funksiyaya görə bölünür: mətbəx, yataq, iş otağı. Böyük layihədə də fayllar «növə» görə yox, «xüsusiyyətə» (feature) görə qruplaşır." },
          { t: "code", lang: "bash", code: `src/
  app/                 # marşrutlar (Next.js)
  features/
    auth/              # hər şey auth haqqında bir yerdə
      components/
      hooks/
      api.ts
      schema.ts
    kurslar/
  components/ui/       # ümumi dizayn sistemi: Button, Modal, Input
  lib/                 # köməkçilər, klientlər
  types/` },
          { t: "list", items: [
            "Feature-first: bir xüsusiyyəti dəyişəndə bir qovluqda işləyirsən.",
            "Ümumi UI komponentləri biznes məntiqi bilməməlidir.",
            "Import qaydası: features bir-birindən birbaşa import etməsin — ümumi hissə lib/ və ya components/-ə.",
          ]},
        ],
      },
      {
        level: "orta",
        title: "Komponent pattern-ləri",
        blocks: [
          { t: "code", lang: "jsx", code: `// Compound components — çevik, oxunaqlı API
<Tabs defaultValue="html">
  <Tabs.List>
    <Tabs.Trigger value="html">HTML</Tabs.Trigger>
    <Tabs.Trigger value="css">CSS</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="html">…</Tabs.Panel>
  <Tabs.Panel value="css">…</Tabs.Panel>
</Tabs>

// Slot / render props əvəzinə children kompozisiyası
<Layout sidebar={<Menyu />} header={<Basliq />}>
  <Mezmun />
</Layout>` },
          { t: "list", items: [
            "Compound components — Tabs, Accordion, Select: daxili state context ilə paylaşılır.",
            "Headless komponentlər (Radix, React Aria) — davranış və a11y hazır, görünüş sənindir.",
            "Container/presentational ayrımı — hook-lar məntiqi daşıyır, komponent göstərir.",
            "State strategiyası: lokal (useState) → qaldırılmış → context → store; server state ayrıca (Query/RSC).",
          ]},
          { t: "mistake", lang: "jsx", wrong: `<Button primary large rounded loading icon="x" iconLeft danger />`, right: `<Button variant="danger" size="lg" loading>\n  <Icon name="x" /> Sil\n</Button>`, why: "Boolean bayraq partlayışı ziddiyyətli kombinasiyalara (primary + danger) yol açır. Variant union və kompozisiya." },
        ],
      },
      {
        level: "senior",
        title: "Keyfiyyət və təhlükəsizlik arxitekturası",
        blocks: [
          { t: "list", items: [
            "Test piramidası: çoxlu unit (hook, reducer, util), komponent testləri (Testing Library — istifadəçi kimi test et), az sayda E2E (Playwright) kritik axınlar üçün.",
            "Error boundary-lər hər əsas bölmədə; monitorinq (Sentry) ilə istifadəçi xətalarını gör.",
            "Dizayn tokenləri (rəng, boşluq, şrift) bir mənbədən — CSS dəyişənləri/Tailwind tema.",
            "a11y avtomatik yoxlaması: eslint-plugin-jsx-a11y, axe.",
            "Təhlükəsizlik — XSS: dangerouslySetInnerHTML-i lint qaydası ilə qadağan et, istisnalar yalnız sanitizer ilə; istifadəçi URL-ləri üçün ortaq safeUrl() funksiyası.",
            "Təhlükəsizlik — sirlər: klient bundle-ında heç bir açar (NEXT_PUBLIC_ yalnız açıq dəyərlər); server-only modullar.",
            "Təhlükəsizlik — yetki: UI gizlətmə + server yoxlaması (heç vaxt yalnız birincisi); route qoruması middleware/proxy-də, amma əsas yoxlama data qatında (hər sorğuda).",
            "Təhlükəsizlik — asılılıqlar: npm audit, Dependabot/Renovate, lock fayl; CSP başlığı (bu sayt kimi).",
          ]},
          { t: "qa", items: [
            ["Böyük React layihəsində state-i necə bölürsən?", "Server state (Query/RSC), qlobal klient state (az: tema, auth UI), lokal state (çoxu) və URL state (filtr, səhifə)."],
            ["React tətbiqində XSS hansı yollarla mümkündür?", "dangerouslySetInnerHTML, javascript: URL-lər, ref ilə innerHTML, üçüncü tərəf skriptlər, SSR-də escape olunmayan JSON."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Feature-first quruluşun üstünlüyü?", options: ["Fayllar azalır", "Bir xüsusiyyətin bütün kodu bir yerdə olur", "Build sürətlənir"], answer: 1, why: "Dəyişiklik bir qovluqda cəmlənir." },
        ],
      },
    ],
    exercise: {
      task: "Compound Accordion komponenti yaz: <Accordion>, <Accordion.Item value>, <Accordion.Trigger>, <Accordion.Panel>. Eyni anda bir panel açıq olsun (context ilə). a11y: trigger button, aria-expanded, aria-controls, panel id. Bir istifadə nümunəsi göstər.",
      starter: `import { createContext, useContext, useId, useState } from "react";\n\n// bura\n\nexport default function App() {\n  // bura\n}\n`,
      expect: "context ilə açıq dəyər paylaşılır; Item öz value-sunu context-lə ötürür; button + aria-expanded + aria-controls; useId ilə id; static alt komponentlər (Accordion.Item = ...); dangerouslySetInnerHTML yoxdur.",
    },
  },
];
