import type { Lesson } from "../types";

export const javascript: Lesson[] = [
  {
    slug: "giris",
    title: "JavaScript nədir? İlk kod",
    intro:
      "JavaScript (JS) veb səhifəni «canlandıran» dildir. HTML skeletdirsə, CSS geyimdirsə, JavaScript əzələ və beyindir: düyməyə basanda nəsə baş verməsi, formanın yoxlanması, məlumatın serverdən gəlməsi — hamısı JS-dir.",
    sections: [
      {
        level: "baslangic",
        title: "JavaScript harada işləyir?",
        blocks: [
          { t: "analogy", text: "Brauzeri bir aşpaz kimi təsəvvür et. HTML — masaya qoyulan boşqablardır, CSS — süfrənin bəzəyidir, JavaScript isə aşpaza verilən təlimatlardır: «qonaq gələndə çayı süz», «boşqab boşalanda yenisini gətir»." },
          { t: "p", text: "JavaScript ilk olaraq brauzerdə işləmək üçün yaradılıb. Bu gün isə Node.js sayəsində serverdə, mobil tətbiqlərdə və hətta robotlarda da işləyir." },
          { t: "p", text: "İlk kodumuz — ekrana (konsola) mesaj yazmaq:" },
          { t: "code", lang: "javascript", code: `console.log("Salam, dünya!");`, caption: "Konsola mətn çıxarır" },
          { t: "terms", items: [
            ["console", "Brauzerin «konsolu» — proqramçının mesaj gördüyü panel (F12 → Console)."],
            [".", "Nöqtə «içindəki» deməkdir: console.log = console-un içindəki log funksiyası."],
            ["log", "İngiliscə «qeyd yazmaq». Verilən dəyəri konsola yazır."],
            ["( )", "Mötərizə funksiyanı «işə salır» və ona məlumat ötürür."],
            ['"..."', "Dırnaq içindəki hər şey mətndir (string)."],
            [";", "Nöqtəli vergül — əmrin sonu. JS-də çox vaxt məcburi deyil, amma yazmaq yaxşı vərdişdir."],
          ]},
          { t: "h", text: "JavaScript-i səhifəyə necə qoşuruq?" },
          { t: "code", lang: "html", code: `<!-- 1) Səhifənin içində -->
<script>
  console.log("Mən səhifənin içindəyəm");
</script>

<!-- 2) Ayrı fayldan (tövsiyə olunur) -->
<script src="app.js" defer></script>` },
          { t: "tip", text: "defer sözü «səhifə tam yüklənəndən sonra işə sal» deməkdir. Onsuz JS hələ yaranmamış elementləri tapmağa çalışıb səhv verə bilər." },
        ],
      },
      {
        level: "orta",
        title: "Kod necə icra olunur?",
        blocks: [
          { t: "p", text: "JS kodu yuxarıdan aşağıya, sətir-sətir oxunur və icra olunur. Hər sətir bir «əmr»dir (statement)." },
          { t: "code", lang: "javascript", code: `console.log("1-ci");
console.log("2-ci");
console.log(2 + 3);      // 5 — hesablayır
console.log("2" + "3");  // "23" — mətnləri birləşdirir` },
          { t: "p", text: "// işarəsindən sonrakı hər şey şərhdir (comment) — kompüter onu oxumur, o insanlar üçündür. Çoxsətirli şərh /* ... */ ilə yazılır." },
          { t: "mistake", lang: "javascript", wrong: `Console.log("Salam")`, right: `console.log("Salam")`, why: "JavaScript böyük-kiçik hərfə həssasdır (case-sensitive). Console və console tamam fərqli adlardır." },
          { t: "mistake", lang: "javascript", wrong: `console.log("Salam)`, right: `console.log("Salam")`, why: "Açılan dırnaq bağlanmalıdır, yoxsa JS mətnin harada bitdiyini bilmir: SyntaxError." },
        ],
      },
      {
        level: "senior",
        title: "Pərdə arxasında: mühərrik və standart",
        blocks: [
          { t: "p", text: "JavaScript-i işlədən proqrama «mühərrik» (engine) deyilir: Chrome-da V8, Firefox-da SpiderMonkey, Safari-də JavaScriptCore. Mühərrik kodu əvvəlcə parse edib AST (abstrakt sintaksis ağacı) qurur, sonra bytecode-a çevirib interpretator ilə işlədir, tez-tez işləyən hissələri isə JIT (Just-In-Time) kompilyator maşın koduna çevirir." },
          { t: "p", text: "Dilin özü ECMAScript standartı ilə müəyyən olunur (ES2015 = ES6, sonra hər il yeni versiya). console, document, fetch kimi şeylər isə dilin yox, mühitin (brauzer və ya Node.js) API-sidir." },
          { t: "list", items: [
            "Kodu monomorf saxla: eyni funksiyaya həmişə eyni formalı obyektlər ver — JIT bunu sevir.",
            "<script type=\"module\"> avtomatik defer olur və strict mode-da işləyir.",
            "Production-da console.log-ları təmizlə və ya logger istifadə et.",
          ]},
          { t: "qa", items: [
            ["JavaScript interpretasiya olunan dildir, yoxsa kompilyasiya?", "Hər ikisi: müasir mühərriklər əvvəl interpretasiya edir, «isti» kodu JIT ilə kompilyasiya edir."],
            ["ECMAScript ilə JavaScript fərqi?", "ECMAScript standartdır (spesifikasiya), JavaScript onun ən məşhur reallaşdırmasıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: 'console.log("5" + "5") nə çıxarar?', options: ["10", '"55"', "Xəta"], answer: 1, why: "Dırnaq içində olduqları üçün hər ikisi mətndir, + mətnləri birləşdirir." },
        ],
      },
    ],
    exercise: {
      task: 'Konsola əvvəl öz adını, sonra yaşını (rəqəm kimi) çıxar. Sonra 7 ilə 8-in cəmini çıxar.',
      starter: `// Kodunu bura yaz\n`,
      expect: "Üç console.log: ad (string), yaş (number), 7+8 (15).",
    },
  },

  {
    slug: "deyisenler",
    title: "Dəyişənlər: let, const, var",
    intro: "Dəyişən — proqramın yaddaşında adı olan bir yerdir. Məlumatı ora qoyur, sonra adı ilə çağırırıq.",
    sections: [
      {
        level: "baslangic",
        title: "Dəyişən nədir?",
        blocks: [
          { t: "analogy", text: "Dəyişəni üzərinə ad yazılmış qutu kimi düşün. «yas» yazılmış qutuya 20 qoyursan. Sonra «yas» deyəndə kompüter qutunu açıb 20-ni götürür. let — qutunun içini dəyişmək olar, const — qutu möhürlənib." },
          { t: "code", lang: "javascript", code: `let yas = 20;
const ad = "Aysel";

console.log(ad, yas); // Aysel 20

yas = 21;        // ✔ let dəyişə bilər
// ad = "Leyla"; // ✘ TypeError: const dəyişə bilməz` },
          { t: "terms", items: [
            ["let", "«Qoy olsun». Sonradan dəyəri dəyişə bilən dəyişən yaradır."],
            ["const", "constant = «sabit». Bir dəfə dəyər verilir, yenidən təyin olunmur."],
            ["var", "Köhnə üsul (2015-dən əvvəl). Bu gün istifadə etmirik — səbəbi aşağıda."],
            ["=", "Riyaziyyatdakı «bərabərdir» deyil! «Sağdakını soldakına yaz» deməkdir (mənimsətmə)."],
          ]},
          { t: "h", text: "Ad qoyma qaydaları" },
          { t: "list", items: [
            "Hərf, rəqəm, _ və $ ola bilər, amma rəqəmlə başlaya bilməz: ad1 ✔, 1ad ✘.",
            "Boşluq olmaz: istifadeciAdi ✔ (camelCase), istifadeci adi ✘.",
            "Ayrılmış sözlər olmaz: let, if, function və s.",
            "Mənalı ad ver: x yox, mehsulQiymeti.",
          ]},
          { t: "tip", text: "Qızıl qayda: həmişə const yaz. Dəyəri dəyişməli olsan, let-ə çevir. var yazma." },
        ],
      },
      {
        level: "orta",
        title: "Scope və const-un gizli tərəfi",
        blocks: [
          { t: "p", text: "let və const blok scope-ludur: { } içində yaradılıbsa, yalnız orada görünür." },
          { t: "code", lang: "javascript", code: `if (true) {
  const mesaj = "içəridəyəm";
  console.log(mesaj); // ✔
}
console.log(mesaj);   // ✘ ReferenceError: mesaj is not defined` },
          { t: "p", text: "const «dəyər dəyişməz» demək deyil, «başqa dəyər təyin olunmaz» deməkdir. Obyektin içi dəyişə bilər:" },
          { t: "code", lang: "javascript", code: `const user = { ad: "Ali" };
user.ad = "Vəli";     // ✔ içini dəyişmək olar
// user = {};         // ✘ yenidən təyin etmək olmaz

const tam = Object.freeze({ ad: "Ali" }); // içini də dondurur` },
          { t: "mistake", lang: "javascript", wrong: `let say = 1;\nlet say = 2;`, right: `let say = 1;\nsay = 2;`, why: "Eyni scope-da eyni adla iki dəfə let yazmaq olmaz (SyntaxError). İkincidə sadəcə dəyər ver." },
        ],
      },
      {
        level: "senior",
        title: "Hoisting, TDZ və niyə var yox",
        blocks: [
          { t: "p", text: "JS mühərriki kodu icra etməzdən əvvəl bütün elanları (declaration) yaddaşda qeyd edir — buna hoisting deyilir. var undefined ilə başladılır, let/const isə «Temporal Dead Zone» (TDZ) vəziyyətində qalır: elan sətrinə çatana qədər onlara toxunmaq ReferenceError verir." },
          { t: "code", lang: "javascript", code: `console.log(a); // undefined  — var hoist olunub
var a = 1;

console.log(b); // ReferenceError — TDZ
let b = 2;

// var-ın klassik tələsi: funksiya scope
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3 3 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j)); // 0 1 2` },
          { t: "p", text: "let dövrün hər iterasiyası üçün yeni bağlama (binding) yaradır, var isə bütün funksiya üçün bir dəyişəndir — closure-lar eyni i-ni görür." },
          { t: "list", items: [
            "var qlobal scope-da window obyektinə xassə kimi yazılır — ad toqquşmalarına səbəb olur.",
            "const istifadəsi kodu oxuyana «bu dəyişməyəcək» siqnalı verir və bug-ları azaldır.",
            "ESLint-də prefer-const və no-var qaydalarını aç.",
          ]},
          { t: "qa", items: [
            ["TDZ nədir?", "let/const dəyişəninin scope-un başlanğıcından elan sətrinə qədər olan, ona müraciətin ReferenceError verdiyi zona."],
            ["const ilə Object.freeze fərqi?", "const bağlamanı (binding) dondurur, freeze obyektin özünü (dayaz — iç-içə obyektlər donmur)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı düzgündür?", options: ["const x; x = 5;", "let 2ad = 'A';", "const pi = 3.14;"], answer: 2, why: "const elan olunanda dərhal dəyər almalıdır; dəyişən adı rəqəmlə başlaya bilməz." },
          { t: "quiz", q: "const arr = [1]; arr.push(2); — nə olar?", options: ["Xəta", "arr = [1, 2]", "arr = [2]"], answer: 1, why: "const yalnız yenidən təyini qadağan edir, massivin içi dəyişə bilər." },
        ],
      },
    ],
    exercise: {
      task: "const ilə 'ad', let ilə 'xal' = 0 yarat. xal-ı 10 artır və 'Aysel: 10 xal' formatında konsola çıxar.",
      starter: `// const ad = ...\n`,
      expect: "const ad, let xal = 0, xal += 10 və ya xal = xal + 10, console.log ilə `${ad}: ${xal} xal` kimi nəticə.",
    },
  },

  {
    slug: "funksiyalar",
    title: "Funksiyalar",
    intro: "Funksiya — adı olan, təkrar istifadə olunan kod parçasıdır. Bir dəfə yazırsan, istədiyin qədər çağırırsan.",
    sections: [
      {
        level: "baslangic",
        title: "Funksiya necə yazılır?",
        blocks: [
          { t: "analogy", text: "Funksiya çay maşınıdır: içinə su və çay qoyursan (parametrlər), düyməni basırsan (çağırış), sənə hazır çay qaytarır (return). Hər dəfə maşını yenidən qurmursan." },
          { t: "code", lang: "javascript", code: `function salamla(ad) {
  return "Salam, " + ad + "!";
}

console.log(salamla("Murad")); // Salam, Murad!
console.log(salamla("Nərmin")); // Salam, Nərmin!` },
          { t: "terms", items: [
            ["function", "«Funksiya yaradıram» deməkdir."],
            ["salamla", "Funksiyanın adı — onu bu adla çağıracağıq."],
            ["(ad)", "Parametr: funksiyaya veriləcək məlumat üçün «boş yer»."],
            ['"Murad"', "Arqument: çağıranda o boş yerə qoyulan real dəyər."],
            ["return", "«Qaytar». Nəticəni çağırana geri verir və funksiyanı dayandırır."],
            ["{ }", "Funksiyanın gövdəsi — işləyəcək kod."],
          ]},
          { t: "warn", text: "return yazmasan funksiya undefined qaytarır. console.log ekrana yazır, return isə dəyəri geri verir — bunlar eyni şey deyil!" },
        ],
      },
      {
        level: "orta",
        title: "Arrow funksiyalar, default parametrlər",
        blocks: [
          { t: "code", lang: "javascript", code: `// Arrow (ox) funksiya — qısa yazılış
const kvadrat = (x) => x * x;

// Default parametr
const vur = (a, b = 2) => a * b;
vur(5);    // 10
vur(5, 3); // 15

// Rest parametr — istənilən sayda arqument
const cem = (...ededler) => ededler.reduce((s, n) => s + n, 0);
cem(1, 2, 3, 4); // 10` },
          { t: "p", text: "Funksiyalar dəyər kimidir: dəyişənə yazmaq, başqa funksiyaya ötürmək (callback) və funksiyadan qaytarmaq olar." },
          { t: "code", lang: "javascript", code: `[1, 2, 3].map(kvadrat); // [1, 4, 9] — kvadrat funksiyasını ötürdük` },
          { t: "mistake", lang: "javascript", wrong: `const topla = (a, b) => { a + b };`, right: `const topla = (a, b) => a + b;`, why: "Fiqurlu mötərizə yazanda return avtomatik olmur. Ya mötərizəni sil, ya da { return a + b; } yaz." },
        ],
      },
      {
        level: "senior",
        title: "Saf funksiyalar, closure və yüksək səviyyəli funksiyalar",
        blocks: [
          { t: "p", text: "Saf (pure) funksiya: eyni girişə həmişə eyni nəticə verir və kənar dünyanı dəyişmir. Testi asandır, keşlənə bilir (memoization), paralel işləməyə təhlükəsizdir." },
          { t: "code", lang: "javascript", code: `// Closure: funksiya yarandığı mühiti «yadda saxlayır»
function sayac() {
  let n = 0;
  return () => ++n;
}
const s = sayac();
s(); s(); // 2 — n gizli və qorunur

// Memoization — yüksək səviyyəli funksiya
const memo = (fn) => {
  const kesh = new Map();
  return (x) => kesh.has(x) ? kesh.get(x) : (kesh.set(x, fn(x)), kesh.get(x));
};` },
          { t: "list", items: [
            "function elanı tam hoist olunur; const f = () => {} isə TDZ-dədir.",
            "Arrow funksiyanın öz this, arguments və prototype-u yoxdur — metod və konstruktor kimi istifadə etmə.",
            "Bir funksiya = bir məsuliyyət. 20 sətirdən uzundursa, böl.",
            "3-dən çox parametr varsa, obyekt ötür: create({ ad, yas, rol }).",
          ]},
          { t: "qa", items: [
            ["Closure nədir?", "Funksiyanın öz leksik mühitindəki dəyişənlərə, o mühit bitəndən sonra da çıxışının qalması."],
            ["Higher-order function?", "Funksiyanı arqument kimi qəbul edən və ya funksiya qaytaran funksiya (map, filter, memo)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "function f() { console.log(5) }  —  const x = f();  x nədir?", options: ["5", "undefined", "Xəta"], answer: 1, why: "Funksiya 5-i yalnız ekrana yazır, return yoxdur — undefined qaytarır." },
        ],
      },
    ],
    exercise: {
      task: "ortalama adlı funksiya yaz: istənilən sayda ədəd qəbul etsin və onların ədədi ortasını qaytarsın. ortalama(2, 4, 6) → 4.",
      starter: `function ortalama(...ededler) {\n  // kodun\n}\n\nconsole.log(ortalama(2, 4, 6));\n`,
      expect: "Rest parametr, cəm / say, return. Boş massivdə 0 və ya NaN-ı nəzərə almaq bonusdur.",
    },
  },
  {
    slug: "tipler",
    title: "Məlumat tipləri",
    intro: "JS-də hər dəyərin tipi var: ədəd, mətn, məntiqi, boş... Tipi bilmək «niyə 1 + '1' = '11' oldu?» kimi sürprizlərin qarşısını alır.",
    sections: [
      {
        level: "baslangic",
        title: "7 primitiv + obyekt",
        blocks: [
          { t: "analogy", text: "Tiplər — mətbəxdəki qablardır: un (ədəd) tərəzidə çəkilir, resept mətni (string) oxunur, işıq açarı (boolean) ya açıq, ya bağlı. Unu oxumağa, resepti çəkməyə çalışsan, qəribə nəticə alırsan." },
          { t: "code", lang: "javascript", code: `const yas = 25;              // number
const qiymet = 9.99;         // number (tam və kəsr eyni tipdir)
const ad = "Aysel";          // string
const telebedir = true;      // boolean
let unvan;                   // undefined — dəyər verilməyib
const secim = null;          // null — «qəsdən boş»
const boyuk = 9007199254740993n; // bigint
const id = Symbol("id");     // symbol — unikal açar

const user = { ad: "Aysel", yas: 25 }; // object
const siyahi = [1, 2, 3];              // object (massiv)

console.log(typeof yas);   // "number"
console.log(typeof ad);    // "string"` },
          { t: "terms", items: [
            ["primitiv", "sadə, dəyişməz dəyər: number, string, boolean, undefined, null, bigint, symbol."],
            ["object", "açar–dəyər toplusu; massiv və funksiya da obyektdir."],
            ["typeof", "dəyərin tipini mətn kimi qaytaran operator."],
            ["undefined", "dəyər hələ verilməyib (JS özü qoyur)."],
            ["null", "proqramçı qəsdən «boşdur» deyir."],
            ["NaN", "Not a Number — uğursuz riyazi əməliyyatın nəticəsi (tipi yenə number!)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Tip çevrilməsi (coercion)",
        blocks: [
          { t: "code", lang: "javascript", code: `console.log(1 + "1");     // "11"  — + mətnlə birləşdirir
console.log("5" - 2);     // 3     — - ədədə çevirir
console.log("5" * "2");   // 10
console.log(Number("42"));    // 42
console.log(Number("42px"));  // NaN
console.log(parseInt("42px")); // 42
console.log(String(42));      // "42"

// Falsy dəyərlər (if-də false sayılır): false, 0, "", null, undefined, NaN
if ("") console.log("görünməz");
if ("0") console.log("görünür — boş olmayan string truthy-dir");` },
          { t: "mistake", lang: "javascript", wrong: `const cem = input.value + 10; // "510"`, right: `const cem = Number(input.value) + 10; // 15`, why: "Input-dan gələn dəyər HƏMİŞƏ string-dir. Riyaziyyatdan əvvəl Number() ilə çevir." },
          { t: "mistake", lang: "javascript", wrong: `if (x === NaN) { ... }  // heç vaxt true olmur`, right: `if (Number.isNaN(x)) { ... }`, why: "NaN özünə də bərabər deyil (NaN === NaN → false). Yoxlamaq üçün Number.isNaN." },
          { t: "mistake", lang: "javascript", wrong: `console.log(0.1 + 0.2 === 0.3); // false!`, right: `console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true`, why: "Ədədlər ikilik sistemdə saxlanır, 0.1 dəqiq yazıla bilmir. Pul hesablamalarında qəpiklə (tam ədəd) işlə." },
        ],
      },
      {
        level: "senior",
        title: "Yaddaşda tiplər: dəyər və istinad",
        blocks: [
          { t: "p", text: "Primitivlər dəyərlə (by value) kopyalanır, obyektlər istinadla (by reference). const a = {x:1}; const b = a; b.x = 2 → a.x da 2 olur, çünki ikisi eyni obyektə işarə edir. Number IEEE 754 64-bit double-dır: tam ədədlər yalnız ±2^53−1-ə qədər dəqiqdir (Number.MAX_SAFE_INTEGER); daha böyüyü üçün BigInt." },
          { t: "list", items: [
            "typeof null === \"object\" — JS-in ilk versiyasından qalan tarixi bug; null yoxlamaq üçün x === null.",
            "Massiv yoxlamaq: Array.isArray(x), typeof yox.",
            "Primitivlərin metodları (\"abc\".toUpperCase()) müvəqqəti «wrapper» obyekt vasitəsilə işləyir.",
            "structuredClone(obj) — obyektin dərin surəti (JSON.parse(JSON.stringify()) Date, Map, undefined-i itirir).",
            "Təhlükəsizlik: serverdən/istifadəçidən gələn məlumatın tipinə heç vaxt güvənmə — ID-ni Number(), mətn uzunluğunu yoxla. Böyük ID-lər (Twitter, DB bigint) JSON-da number kimi gələndə dəqiqlik itir — string kimi ötür.",
          ]},
          { t: "qa", items: [
            ["null və undefined fərqi?", "undefined — dəyər verilməyib (sistem), null — qəsdən boş (proqramçı). null == undefined true, === false."],
            ["Primitiv ilə obyektin kopyalanma fərqi?", "Primitiv dəyəri kopyalanır, obyektin isə ünvanı (istinadı) — dəyişiklik hər iki dəyişəndə görünür."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "typeof \"5\" nə qaytarır?", options: ["\"number\"", "\"string\"", "\"5\""], answer: 1, why: "Dırnaq içindəki hər şey string-dir." },
          { t: "quiz", q: "\"3\" + 4 = ?", options: ["7", "\"34\"", "NaN"], answer: 1, why: "+ operatorunda biri string olanda birləşdirmə baş verir." },
          { t: "quiz", q: "Hansı falsy DEYİL?", options: ["0", "\"\"", "\"false\""], answer: 2, why: "Boş olmayan istənilən string truthy-dir, hətta \"false\"." },
        ],
      },
    ],
    exercise: {
      task: "tipiniYaz(x) funksiyası yaz: massiv üçün \"massiv\", null üçün \"null\", qalanları üçün typeof nəticəsini qaytarsın. 5 fərqli dəyərlə console.log ilə yoxla.",
      starter: `function tipiniYaz(x) {\n  // bura yaz\n}\n\nconsole.log(tipiniYaz([1, 2]));  // "massiv"\nconsole.log(tipiniYaz(null));    // "null"\nconsole.log(tipiniYaz(42));      // "number"\n`,
      expect: "Array.isArray ilə massiv yoxlanır, x === null ilə null yoxlanır, qalanında typeof qaytarılır; nəticələr: massiv, null, number və s.",
    },
  },
  {
    slug: "operatorlar",
    title: "Operatorlar",
    intro: "Operatorlar dəyərlər üzərində əməliyyatdır: riyazi, müqayisə, məntiqi, təyinat. Xüsusilə == və === fərqi müsahibələrin sevimli sualıdır.",
    sections: [
      {
        level: "baslangic",
        title: "Riyazi və müqayisə",
        blocks: [
          { t: "analogy", text: "Operatorlar kalkulyatorun düymələridir. Amma JS kalkulyatorunda iki «bərabərdir» düyməsi var: biri (==) «təxminən eynidir» deyir, digəri (===) «tamamilə eynidir». Həmişə ikincisini bas." },
          { t: "code", lang: "javascript", code: `console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.333...
console.log(10 % 3);   // 1   — qalıq
console.log(2 ** 3);   // 8   — qüvvət

let say = 5;
say += 2;   // say = say + 2 → 7
say++;      // 8

console.log(5 === 5);     // true
console.log(5 === "5");   // false — tip fərqlidir
console.log(5 !== 3);     // true
console.log(7 >= 7);      // true` },
          { t: "terms", items: [
            ["%", "modul — bölmənin qalığı. x % 2 === 0 → cüt ədəd."],
            ["**", "qüvvətə yüksəltmə."],
            ["+=, -=, *=", "qısa təyinat: a += 1 ↔ a = a + 1."],
            ["++ / --", "1 artır / azalt."],
            ["===", "ciddi bərabərlik: dəyər VƏ tip eyni."],
            ["!==", "ciddi bərabər deyil."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Məntiqi operatorlar və qısa yollar",
        blocks: [
          { t: "code", lang: "javascript", code: `const yas = 20, icaze = true;
console.log(yas >= 18 && icaze);   // && — VƏ: ikisi də true olmalı
console.log(yas < 18 || icaze);    // || — VƏ YA: biri kifayət
console.log(!icaze);               // !  — DEYİL

// Qısa dövrə (short-circuit) — dəyər qaytarır
const ad = "" || "Qonaq";          // "Qonaq" — ilk truthy
const say = 0 ?? 10;               // 0 — yalnız null/undefined-də sağ tərəf
const seher = user?.unvan?.seher;  // optional chaining: yoxdursa undefined, xəta yox

// Ternary
const status = yas >= 18 ? "böyük" : "uşaq";` },
          { t: "mistake", lang: "javascript", wrong: `if (x == 0) { ... }  // "" == 0 → true, [] == 0 → true`, right: `if (x === 0) { ... }`, why: "== tipləri gizlicə çevirir və gözlənilməz nəticələr verir. Həmişə === işlət." },
          { t: "mistake", lang: "javascript", wrong: `const limit = input || 10;  // input 0 olanda 10 olur!`, right: `const limit = input ?? 10;`, why: "|| bütün falsy-ləri (0, \"\") «yox» sayır. Yalnız null/undefined üçün default lazımdırsa ?? işlət." },
        ],
      },
      {
        level: "senior",
        title: "Prioritet, == alqoritmi, Object.is",
        blocks: [
          { t: "p", text: "Operator prioriteti (precedence) hansının əvvəl icra olunduğunu müəyyən edir: ** > * / % > + - > müqayisə > && > || > ?? > ? : > təyinat. ?? ilə && / || mötərizəsiz qarışdırıla bilməz — SyntaxError. Şübhə olanda mötərizə yaz: kod oxunaqlı olur." },
          { t: "code", lang: "javascript", code: `console.log(NaN === NaN);          // false
console.log(Object.is(NaN, NaN));  // true
console.log(0 === -0);             // true
console.log(Object.is(0, -0));     // false
console.log(null == undefined);    // true — == -in yeganə faydalı halı` },
          { t: "list", items: [
            "a++ köhnə dəyəri, ++a yeni dəyəri qaytarır — ifadə içində qarışdırma, ayrıca sətirdə yaz.",
            "Bitwise operatorlar (&, |, ^, <<) 32-bit tam ədədlə işləyir; bayraqlar (flags) və icazə maskaları üçün.",
            "&&= , ||= , ??= — məntiqi təyinat: obj.ad ??= \"Qonaq\".",
            "Təhlükəsizlik: autentifikasiya yoxlamasında == işlətmək tip çevrilməsi ilə yoxlamanı keçməyə imkan verə bilər (PHP-də məşhur «magic hash» bug-ı). Token/parol müqayisəsini serverdə sabit zamanlı (timing-safe) funksiya ilə et.",
          ]},
          { t: "qa", items: [
            ["== və === fərqi?", "== müqayisədən əvvəl tipləri çevirir (coercion), === çevirmir: həm tip, həm dəyər eyni olmalıdır."],
            ["|| və ?? fərqi?", "|| ilk truthy dəyəri, ?? ilk null/undefined olmayan dəyəri qaytarır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "17 % 5 = ?", options: ["3", "2", "3.4"], answer: 1, why: "17 = 5·3 + 2, qalıq 2." },
          { t: "quiz", q: "0 ?? 5 nəticəsi?", options: ["0", "5", "null"], answer: 0, why: "?? yalnız null/undefined-də sağ tərəfi seçir." },
        ],
      },
    ],
    exercise: {
      task: "cutdur(n) funksiyası yaz (% ilə). Sonra ad dəyişəni boş string olanda \"Qonaq\", sayi null olanda 0 götürən iki sətir yaz (|| və ?? düzgün yerdə).",
      starter: `function cutdur(n) {\n  // bura\n}\nconsole.log(cutdur(4), cutdur(7)); // true false\n\nconst adInput = "";\nconst sayInput = null;\n// const ad = ...\n// const say = ...\n`,
      expect: "cutdur n % 2 === 0 qaytarır (=== ilə); ad üçün || \"Qonaq\", say üçün ?? 0 işlədilib; == işlədilməyib.",
    },
  },
  {
    slug: "sertler",
    title: "Şərtlər: if, else, switch",
    intro: "Proqram qərar verməlidir: «əgər istifadəçi daxil olubsa — profili göstər, yoxsa — giriş formasını». Bunun üçün if/else, switch və ternary var.",
    sections: [
      {
        level: "baslangic",
        title: "if / else if / else",
        blocks: [
          { t: "analogy", text: "Svetofor: əgər qırmızıdırsa — dayan, yox əgər sarıdırsa — hazırlaş, əks halda — get. Proqram da yuxarıdan aşağı yoxlayır və İLK doğru şərtdə dayanır." },
          { t: "code", lang: "javascript", code: `const bal = 78;

if (bal >= 90) {
  console.log("Əla");
} else if (bal >= 70) {
  console.log("Yaxşı");      // ← bu işləyir və dayanır
} else if (bal >= 50) {
  console.log("Kafi");
} else {
  console.log("Qeyri-kafi");
}` },
          { t: "terms", items: [
            ["if (şərt)", "şərt true-dursa blok icra olunur."],
            ["else if", "əvvəlkilər false olubsa, yeni şərt yoxla."],
            ["else", "heç biri doğru deyilsə."],
            ["{ }", "blok — şərtə aid kodlar."],
          ]},
          { t: "tip", text: "Bir sətirlik if-də də fiqurlu mötərizə yaz — sonra sətir əlavə edəndə bug olmasın." },
        ],
      },
      {
        level: "orta",
        title: "switch, ternary və erkən çıxış",
        blocks: [
          { t: "code", lang: "javascript", code: `const gun = "şənbə";
switch (gun) {
  case "şənbə":
  case "bazar":
    console.log("İstirahət");
    break;            // break olmasa növbəti case-ə «düşür»
  default:
    console.log("İş günü");
}

// Ternary — sadə iki variant üçün
const mesaj = yas >= 18 ? "Xoş gəldin" : "Giriş qadağandır";

// Erkən çıxış (guard clause) — iç-içə if-lərin əvəzinə
function endirim(user) {
  if (!user) return 0;
  if (!user.aktiv) return 0;
  return user.vip ? 20 : 5;
}` },
          { t: "mistake", lang: "javascript", wrong: `if (yas = 18) { ... }`, right: `if (yas === 18) { ... }`, why: "= təyinatdır: yas-a 18 yazır və şərt həmişə true olur. Müqayisə üçün ===." },
          { t: "mistake", lang: "javascript", wrong: `if (a) {\n  if (b) {\n    if (c) { islet(); }\n  }\n}`, right: `if (!a || !b || !c) return;\nislet();`, why: "«Ox» formalı iç-içə kod oxunmur. Guard clause ilə uyğun olmayanı əvvəldən çıxart." },
        ],
      },
      {
        level: "senior",
        title: "Şərtləri azaltmaq: lookup və polimorfizm",
        blocks: [
          { t: "code", lang: "javascript", code: `// 10 case-li switch əvəzinə — obyekt xəritəsi
const QIYMET = { standart: 10, premium: 25, vip: 50 };
const qiymet = QIYMET[plan] ?? QIYMET.standart;

// Funksiya xəritəsi
const EMELLER = {
  topla: (a, b) => a + b,
  cix: (a, b) => a - b,
};
const netice = EMELLER[emel]?.(a, b);` },
          { t: "list", items: [
            "Lookup cədvəli yeni variant əlavə etməyi asanlaşdırır (open/closed prinsipi) və test olunur.",
            "switch ciddi bərabərlik (===) ilə müqayisə edir.",
            "Mürəkkəb şərti adlı dəyişənə çıxar: const satisaBilər = aktiv && stok > 0 && !bloklanib;",
            "Təhlükəsizlik: obyekt xəritəsində istifadəçi açarı ilə axtarışda \"__proto__\", \"constructor\" kimi açarlar gözlənilməz nəticə verə bilər. Object.hasOwn(QIYMET, plan) ilə yoxla və ya Map / Object.create(null) işlət.",
            "Təhlükəsizlik: yetki yoxlamasını (if (user.admin)) yalnız brauzerdə etmək qoruma DEYİL — istifadəçi JS-i dəyişə bilər. Server həmişə özü yoxlamalıdır.",
          ]},
          { t: "qa", items: [
            ["switch-də break unudulsa?", "Fall-through: növbəti case-lər də icra olunur."],
            ["Guard clause nədir?", "Funksiyanın əvvəlində uyğunsuz halları return ilə erkən çıxarmaq — əsas məntiq iç-içəlikdən azad olur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "bal = 95 olanda yuxarıdakı kod nə yazır?", options: ["Əla", "Əla və Yaxşı", "Yaxşı"], answer: 0, why: "İlk doğru şərtdə dayanır." },
        ],
      },
    ],
    exercise: {
      task: "qiymetlendir(bal) funksiyası: 0–100 xaricində \"Yanlış bal\" (guard clause), 90+ \"A\", 75+ \"B\", 60+ \"C\", qalanı \"F\" qaytarsın. 4 dəyərlə yoxla.",
      starter: `function qiymetlendir(bal) {\n  // bura\n}\n\nconsole.log(qiymetlendir(95));  // A\nconsole.log(qiymetlendir(80));  // B\nconsole.log(qiymetlendir(10));  // F\nconsole.log(qiymetlendir(150)); // Yanlış bal\n`,
      expect: "Əvvəlcə bal < 0 || bal > 100 yoxlanıb return; sonra azalan sıra ilə if/else if; === və >= düzgün; nəticələr A, B, F, Yanlış bal.",
    },
  },
  {
    slug: "dovrler",
    title: "Dövrlər",
    intro: "Dövr (loop) eyni işi təkrar etmək üçündür: 100 tələbəni çap et, massivdəki ədədləri topla, istifadəçi düzgün parol yazana qədər soruş.",
    sections: [
      {
        level: "baslangic",
        title: "for və while",
        blocks: [
          { t: "analogy", text: "for — idmanda «10 dəfə otur-dur»: başlanğıc (0), şərt (10-dan az), addım (+1). while — «yorulana qədər qaç»: neçə dəfə olacağı bəlli deyil, yalnız şərt var." },
          { t: "code", lang: "javascript", code: `for (let i = 1; i <= 5; i++) {
  console.log("Addım", i);
}

let pul = 100;
while (pul > 0) {
  pul -= 30;
  console.log("Qaldı:", pul);
}

const meyveler = ["alma", "armud", "nar"];
for (const m of meyveler) {
  console.log(m);
}` },
          { t: "terms", items: [
            ["let i = 1", "başlanğıc — sayğac."],
            ["i <= 5", "şərt — true olduqca davam edir."],
            ["i++", "hər dövrdən sonra addım."],
            ["iterasiya", "dövrün bir dəfə icrası."],
            ["for...of", "massivin (və ya istənilən iterable-ın) hər elementini gəzir."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "break, continue, for...in və sonsuz dövr",
        blocks: [
          { t: "code", lang: "javascript", code: `for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue;  // cütləri ötür
  if (i > 7) break;           // dövrü tamamilə dayandır
  console.log(i);             // 1 3 5 7
}

const user = { ad: "Aysel", yas: 25 };
for (const acar in user) {
  console.log(acar, user[acar]);
}

do {
  // ən azı bir dəfə icra olunur
} while (false);` },
          { t: "list", items: [
            "for...of — DƏYƏRLƏR (massiv, string, Map). for...in — AÇARLAR (obyekt).",
            "Massiv üzərində for...in işlətmə — açarlar string-dir və prototipdən gələn xassələr də düşə bilər.",
            "Çox vaxt dövr əvəzinə massiv metodları daha oxunaqlıdır: map, filter, reduce (növbəti dərslər).",
          ]},
          { t: "mistake", lang: "javascript", wrong: `let i = 0;\nwhile (i < 5) {\n  console.log(i);\n}`, right: `let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}`, why: "Sayğac artmırsa şərt heç vaxt false olmur — sonsuz dövr, səhifə donur. (Bu saytın məşq səhifəsi 5 saniyədən sonra kodu dayandırır.)" },
          { t: "mistake", lang: "javascript", wrong: `for (let i = 0; i <= arr.length; i++) { ... arr[i] }`, right: `for (let i = 0; i < arr.length; i++) { ... arr[i] }`, why: "İndekslər 0-dan length-1-ə qədərdir. <= bir artıq dövr edir və undefined alırsan (off-by-one xətası)." },
        ],
      },
      {
        level: "senior",
        title: "Performans, iterator protokolu və async dövrlər",
        blocks: [
          { t: "list", items: [
            "Dövr içində dövr O(n²)-dir: 10 000 × 10 000 = 100 milyon əməliyyat. Axtarış üçün əvvəlcə Set/Map qur — O(n).",
            "Böyük dövr əsas thread-i bloklayır: UI donur. Ağır işi parçalara böl (scheduler.yield / setTimeout) və ya Web Worker-ə köçür.",
            "for...of iterator protokolu ilə işləyir: obyektin [Symbol.iterator]() metodu olmalıdır — öz iterable-ını yarada bilərsən.",
            "await-i dövr içində ardıcıl yazsan sorğular bir-bir gedir; müstəqildirsə Promise.all ilə paralel et (amma limitə diqqət).",
            "Etiketli break: xarici: for (...) { for (...) { break xarici; } } — iç-içə dövrdən birdən çıxış.",
            "Təhlükəsizlik: istifadəçinin göndərdiyi ölçü ilə dövr qurma (for i < req.query.n) — n = 1e12 serveri çökdürür (DoS). Həmişə yuxarı limit qoy.",
          ]},
          { t: "code", lang: "javascript", code: `// O(n²) → O(n)
const qadagan = new Set(["spam", "reklam"]);
const temiz = sozler.filter((s) => !qadagan.has(s));

// Paralel sorğular
const cavablar = await Promise.all(idler.map((id) => fetch("/api/" + id)));` },
          { t: "qa", items: [
            ["for...of ilə for...in fərqi?", "of dəyərləri (iterable), in sayıla bilən açarları (obyekt, prototip daxil) gəzir."],
            ["Dövrdə await niyə yavaş ola bilər?", "Hər iterasiya əvvəlkinin bitməsini gözləyir; müstəqil işlər Promise.all ilə paralel aparılmalıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "for (let i = 0; i < 3; i++) neçə dəfə işləyir?", options: ["2", "3", "4"], answer: 1, why: "i = 0, 1, 2." },
          { t: "quiz", q: "Dövrün cari addımını ötürüb növbətinə keçmək üçün?", options: ["break", "continue", "return"], answer: 1, why: "break dövrü bitirir, continue yalnız cari addımı ötürür." },
        ],
      },
    ],
    exercise: {
      task: "1-dən 30-a qədər FizzBuzz: 3-ə bölünəndə \"Fizz\", 5-ə \"Buzz\", hər ikisinə \"FizzBuzz\", qalanında ədədin özünü çap et. Sonra massivdəki ədədlərin cəmini for...of ilə hesabla.",
      starter: `for (let i = 1; i <= 30; i++) {\n  // FizzBuzz\n}\n\nconst ededler = [4, 8, 15, 16, 23, 42];\nlet cem = 0;\n// for...of\nconsole.log(cem); // 108\n`,
      expect: "15-ə bölünmə (və ya 3 && 5) ƏVVƏL yoxlanır; % və === işlədilir; cəm for...of ilə 108; sonsuz dövr və off-by-one yoxdur.",
    },
  },
  {
    slug: "massivler",
    title: "Massivlər və metodları",
    intro: "Massiv (array) sıralı siyahıdır: tələbələr, məhsullar, mesajlar. map, filter, reduce — müasir JS-in ən çox işlədilən alətləri.",
    sections: [
      {
        level: "baslangic",
        title: "Yaratmaq, oxumaq, dəyişmək",
        blocks: [
          { t: "analogy", text: "Massiv — nömrələnmiş qatarın vaqonlarıdır. Nömrələmə 0-dan başlayır: birinci vaqon [0]. length — vaqon sayı. push — sona vaqon qoşmaq, pop — sondakını açmaq." },
          { t: "code", lang: "javascript", code: `const dersler = ["HTML", "CSS", "JS"];

console.log(dersler[0]);       // "HTML"
console.log(dersler.length);   // 3
console.log(dersler.at(-1));   // "JS" — sondan birinci

dersler.push("React");         // sona əlavə
dersler.pop();                 // sondan sil
dersler.unshift("Git");        // əvvələ əlavə
dersler.shift();               // əvvəldən sil

console.log(dersler.includes("CSS"));  // true
console.log(dersler.indexOf("JS"));    // 2` },
          { t: "terms", items: [
            ["indeks", "elementin sıra nömrəsi, 0-dan başlayır."],
            ["length", "elementlərin sayı."],
            ["push / pop", "sona əlavə / sondan silmə."],
            ["unshift / shift", "əvvələ əlavə / əvvəldən silmə."],
            ["includes", "element varmı — true/false."],
          ]},
          { t: "tip", text: "const massiv dəyişə bilər (push işləyir). const yalnız dəyişənə YENİ massiv təyin etməyi qadağan edir." },
        ],
      },
      {
        level: "orta",
        title: "map, filter, find, reduce",
        blocks: [
          { t: "code", lang: "javascript", code: `const mehsullar = [
  { ad: "Kitab", qiymet: 12, stok: 5 },
  { ad: "Qələm", qiymet: 2, stok: 0 },
  { ad: "Çanta", qiymet: 45, stok: 3 },
];

const adlar = mehsullar.map((m) => m.ad);             // ["Kitab", "Qələm", "Çanta"]
const stokda = mehsullar.filter((m) => m.stok > 0);   // 2 məhsul
const canta = mehsullar.find((m) => m.ad === "Çanta"); // obyekt və ya undefined
const cem = mehsullar.reduce((acc, m) => acc + m.qiymet, 0); // 59
const hamisiUcuz = mehsullar.every((m) => m.qiymet < 50);  // true
const varBahali = mehsullar.some((m) => m.qiymet > 40);    // true

// Zəncir
const ucuzAdlar = mehsullar
  .filter((m) => m.qiymet < 20)
  .map((m) => m.ad.toUpperCase());` },
          { t: "list", items: [
            "map — hər elementi çevirir, EYNİ uzunluqda yeni massiv.",
            "filter — şərtə uyanları saxlayır, yeni massiv.",
            "find — ilk uyğun elementi qaytarır.",
            "reduce — massivi tək dəyərə «yığır» (cəm, obyekt, qrup). İkinci arqument — başlanğıc dəyər.",
            "Bu metodlar orijinal massivi DƏYİŞMİR.",
          ]},
          { t: "mistake", lang: "javascript", wrong: `const yeni = arr.map((x) => { x * 2 });  // [undefined, ...]`, right: `const yeni = arr.map((x) => x * 2);`, why: "Fiqurlu mötərizəli arrow funksiyada return yazmalısan. Qısa formada mötərizəsiz yaz." },
          { t: "mistake", lang: "javascript", wrong: `[10, 1, 5].sort();  // [1, 10, 5]`, right: `[10, 1, 5].sort((a, b) => a - b);  // [1, 5, 10]`, why: "sort default olaraq elementləri STRING kimi müqayisə edir. Ədədlər üçün müqayisə funksiyası ver." },
        ],
      },
      {
        level: "senior",
        title: "Mutasiya, immutability və performans",
        blocks: [
          { t: "p", text: "Mutasiya edən metodlar: push, pop, shift, unshift, splice, sort, reverse, fill. React kimi kitabxanalar dəyişikliyi istinadla (===) aşkarlayır — massivi yerində dəyişsən UI yenilənmir. Müasir immutable alternativlər: toSorted(), toReversed(), toSpliced(), with(i, x), və spread [...arr, yeni]." },
          { t: "code", lang: "javascript", code: `const siralanmis = qiymetler.toSorted((a, b) => a - b);  // orijinal qalır
const yenilenmis = list.with(2, "yeni");                   // 2-ci indeks dəyişdirilmiş surət
const qruplar = Object.groupBy(mehsullar, (m) => (m.stok > 0 ? "var" : "yox"));` },
          { t: "list", items: [
            "shift/unshift O(n)-dir — bütün indeksləri sürüşdürür; növbə üçün böyük massivdə yavaşdır.",
            "includes/indexOf/find O(n)-dir; tez-tez axtarış üçün Set/Map qur.",
            "Seyrək massiv (new Array(5)) «boş yuvalar» saxlayır — map onları ötürür; Array.from({ length: 5 }, (_, i) => i) daha etibarlıdır.",
            "Təhlükəsizlik: istifadəçidən gələn massivin ölçüsünü məhdudlaşdır (məs. 1000 element) — milyonluq massiv göndərib serveri yükləmək (DoS) mümkündür. Hər elementin tipini yoxla.",
          ]},
          { t: "qa", items: [
            ["map ilə forEach fərqi?", "map yeni massiv qaytarır, forEach heç nə (undefined) — yalnız yan təsir üçün."],
            ["sort niyə «təhlükəlidir»?", "Orijinal massivi dəyişir və default olaraq string müqayisəsi edir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "[1, 2, 3].map(x => x * 10) nəticəsi?", options: ["[10, 20, 30]", "60", "[1, 2, 3]"], answer: 0, why: "map hər elementi çevirir." },
          { t: "quiz", q: "Massivdən yalnız cüt ədədləri almaq üçün?", options: ["map", "filter", "reduce"], answer: 1, why: "filter şərtə uyanları saxlayır." },
        ],
      },
    ],
    exercise: {
      task: "telebeler massivindən: 1) balı 70+ olanların adları (filter + map), 2) orta bal (reduce), 3) ən yüksək ballı tələbə (reduce və ya toSorted). Orijinal massiv dəyişməsin.",
      starter: `const telebeler = [\n  { ad: "Aysel", bal: 92 },\n  { ad: "Murad", bal: 65 },\n  { ad: "Leyla", bal: 78 },\n  { ad: "Orxan", bal: 55 },\n];\n\n// 1)\n// 2)\n// 3)\n`,
      expect: "keçənlər [\"Aysel\", \"Leyla\"]; orta 72.5; ən yüksək Aysel; sort orijinalı dəyişməyib (toSorted/spread və ya reduce); arrow funksiyalarda return düzgün.",
    },
  },
  {
    slug: "obyektler",
    title: "Obyektlər",
    intro: "Obyekt bir şeyin xüsusiyyətlərini bir yerdə saxlayır: istifadəçinin adı, yaşı, emaili. JSON da, API cavabları da obyektdir.",
    sections: [
      {
        level: "baslangic",
        title: "Açar və dəyər",
        blocks: [
          { t: "analogy", text: "Obyekt — şəxsiyyət vəsiqəsidir: «Ad: Aysel», «Doğum ili: 2000», «Şəhər: Bakı». Sol tərəf açar (key), sağ tərəf dəyər (value)." },
          { t: "code", lang: "javascript", code: `const user = {
  ad: "Aysel",
  yas: 25,
  dilller: ["JS", "Python"],
  unvan: { seher: "Bakı" },
  salamla() {
    return "Salam, mən " + this.ad;
  },
};

console.log(user.ad);            // nöqtə ilə
console.log(user["yas"]);        // kvadrat mötərizə ilə
console.log(user.unvan.seher);   // iç-içə
console.log(user.salamla());     // metod

user.email = "a@mail.az";        // əlavə et
user.yas = 26;                   // dəyiş
delete user.email;               // sil` },
          { t: "terms", items: [
            ["xassə (property)", "açar–dəyər cütü."],
            ["metod", "obyektin içindəki funksiya."],
            ["dot notation", "user.ad — açar sabit olanda."],
            ["bracket notation", "user[acar] — açar dəyişəndə və ya xüsusi simvollu olanda."],
            ["this", "metodun içində — həmin obyektin özü."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Destructuring, spread, gəzmək",
        blocks: [
          { t: "code", lang: "javascript", code: `const { ad, yas, unvan: { seher } } = user;  // destructuring
const { rol = "telebe" } = user;              // default dəyər

const yeni = { ...user, yas: 27 };   // surət + dəyişiklik (orijinal qalır)
const birlesmis = { ...a, ...b };    // b-nin açarları üstün gəlir

Object.keys(user);     // ["ad", "yas", ...]
Object.values(user);   // dəyərlər
Object.entries(user);  // [["ad","Aysel"], ["yas",25], ...]

for (const [acar, deyer] of Object.entries(user)) {
  console.log(acar + ": " + deyer);
}

const json = JSON.stringify(user);   // obyekt → mətn
const geri = JSON.parse(json);       // mətn → obyekt` },
          { t: "mistake", lang: "javascript", wrong: `const kopya = user;\nkopya.ad = "Murad";  // user.ad da "Murad" oldu!`, right: `const kopya = { ...user };\nkopya.ad = "Murad";`, why: "Obyekt istinadla kopyalanır. Spread dayaz (shallow) surət yaradır; iç-içə obyektlər üçün structuredClone." },
          { t: "mistake", lang: "javascript", wrong: `console.log(user.unvan.poct);  // xəta, əgər unvan yoxdursa`, right: `console.log(user.unvan?.poct);`, why: "undefined-in xassəsini oxumaq TypeError verir. Optional chaining (?.) təhlükəsizdir." },
        ],
      },
      {
        level: "senior",
        title: "Prototype pollution və etibarlı obyektlər",
        blocks: [
          { t: "p", text: "Obyektlər prototip zənciri ilə xassələri miras alır: user.toString user-in özündə yoxdur, Object.prototype-dan gəlir. İstifadəçi məlumatını obyektlərə «dərin birləşdirəndə» (deep merge) {\"__proto__\": {\"admin\": true}} göndərilərsə, BÜTÜN obyektlərə admin: true əlavə oluna bilər — buna prototype pollution deyilir və real hücumlarda (lodash, jQuery CVE-ləri) istifadə olunub." },
          { t: "list", items: [
            "Açarları istifadəçidən gələn lüğətlər üçün Map və ya Object.create(null) işlət.",
            "Deep merge/set funksiyalarında __proto__, constructor, prototype açarlarını rədd et.",
            "Object.hasOwn(obj, key) — xassə obyektin ÖZÜNDƏdirmi (miras deyil).",
            "Object.freeze(obj) — dəyişməz obyekt (dayaz). Konfiqurasiya sabitləri üçün.",
            "JSON.parse istifadəçi mətnini parse edir, kod icra etmir — eval-dan təhlükəsizdir; amma nəticəni sxem ilə (zod və s.) yoxla.",
            "Getter/setter: get tam() { return this.ad + \" \" + this.soyad } — hesablanan xassə.",
          ]},
          { t: "qa", items: [
            ["Shallow və deep copy fərqi?", "Shallow yalnız üst səviyyəni kopyalayır, iç-içə obyektlər paylaşılır; deep — hər səviyyəni (structuredClone)."],
            ["Prototype pollution nədir?", "Hücumçunun __proto__ vasitəsilə Object.prototype-a xassə əlavə edərək bütün obyektlərin davranışını dəyişməsi."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "const acar = \"yas\"; user-in yaşını necə oxuyuruq?", options: ["user.acar", "user[acar]", "user.\"yas\""], answer: 1, why: "Açar dəyişəndə olanda kvadrat mötərizə." },
          { t: "quiz", q: "{ ...a, x: 1 } nə edir?", options: ["a-nı dəyişir", "a-nın surətini x: 1 ilə yaradır", "xəta"], answer: 1, why: "Spread yeni obyekt yaradır." },
        ],
      },
    ],
    exercise: {
      task: "kitab obyekti yarat (ad, muellif, il, janrlar massivi, melumat() metodu). Destructuring ilə ad və muellif-i çıxart, spread ilə il-i dəyişdirilmiş surət yarat, Object.entries ilə bütün xassələri çap et.",
      starter: `const kitab = {\n  // bura\n};\n\n// destructuring\n// spread surət\n// Object.entries\n`,
      expect: "obyekt düzgün sintaksislə (vergüllər), metodda this.ad işlədilir; const { ad, muellif } = kitab; { ...kitab, il: ... } orijinalı dəyişmir; for...of Object.entries ilə çap.",
    },
  },
  {
    slug: "dom",
    title: "DOM ilə işləmək",
    intro: "DOM (Document Object Model) — HTML-in JS-dən idarə olunan ağac modelidir. Elementi tapmaq, mətnini dəyişmək, yeni element yaratmaq — interaktiv saytın əsası.",
    sections: [
      {
        level: "baslangic",
        title: "Tap və dəyiş",
        blocks: [
          { t: "analogy", text: "DOM — evin pultudur. HTML evi tikib, JS pultla işığı yandırır (class əlavə edir), televizorda kanalı dəyişir (mətni dəyişir), yeni mebel gətirir (element yaradır)." },
          { t: "code", lang: "html", code: `<h1 id="basliq">Salam</h1>
<p class="qeyd">Birinci</p>
<p class="qeyd">İkinci</p>

<script>
  const h1 = document.querySelector("#basliq");      // ilk uyğun
  const qeydler = document.querySelectorAll(".qeyd"); // hamısı (NodeList)

  h1.textContent = "Xoş gəldin!";
  h1.style.color = "tomato";
  h1.classList.add("aktiv");

  qeydler.forEach((p) => p.classList.toggle("gizli"));

  const yeni = document.createElement("li");
  yeni.textContent = "Yeni element";
  document.body.append(yeni);
</script>` },
          { t: "terms", items: [
            ["document", "bütün səhifəni təmsil edən obyekt."],
            ["querySelector", "CSS selektoru ilə İLK elementi tapır (yoxdursa null)."],
            ["querySelectorAll", "bütün uyğun elementləri tapır."],
            ["textContent", "elementin mətni."],
            ["classList", "class-ları idarə etmək: add, remove, toggle, contains."],
            ["createElement / append", "yeni element yaratmaq / içinə qoymaq."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Atributlar, siyahı render etmək",
        blocks: [
          { t: "code", lang: "javascript", code: `const link = document.querySelector("a");
link.href = "/dersler";
link.setAttribute("target", "_blank");
link.dataset.id = "42";             // data-id="42"

const input = document.querySelector("#ad");
console.log(input.value);           // istifadəçinin yazdığı

// Massivdən siyahı yaratmaq
const dersler = ["HTML", "CSS", "JS"];
const ul = document.querySelector("#siyahi");
const parca = document.createDocumentFragment();
for (const d of dersler) {
  const li = document.createElement("li");
  li.textContent = d;
  parca.append(li);
}
ul.replaceChildren(parca);          // bir dəfəyə əlavə et

element.remove();                   // sil` },
          { t: "mistake", lang: "javascript", wrong: `// <head>-də, defer olmadan\nconst btn = document.querySelector("button");\nbtn.addEventListener(...); // null-un xassəsi — xəta`, right: `<script src="app.js" defer></script>`, why: "Skript HTML oxunmamış işə düşür — element hələ yoxdur. defer və ya type=\"module\" işlət." },
          { t: "mistake", lang: "javascript", wrong: `el.style.display = "none";\nel.style.color = "red";\nel.style.fontSize = "20px";`, right: `el.classList.add("xeta");\n/* .xeta { color: red; font-size: 20px; } */`, why: "Stilləri JS-də tək-tək yazmaq CSS-i dağıdır. Vəziyyəti class ilə dəyiş, görünüşü CSS-də saxla." },
        ],
      },
      {
        level: "senior",
        title: "XSS və DOM performansı",
        blocks: [
          { t: "warn", text: "innerHTML-ə İSTİFADƏÇİ MƏTNİ YAZMA. el.innerHTML = komment; — əgər komment \"<img src=x onerror=alert(document.cookie)>\" olarsa, hücumçunun kodu sənin saytında işləyir (XSS — Cross-Site Scripting). Sessiyalar oğurlanır, hesablar ələ keçirilir." },
          { t: "code", lang: "javascript", code: `// ❌ Təhlükəli
div.innerHTML = "<p>" + userText + "</p>";

// ✅ Təhlükəsiz — mətn kimi qoyulur, HTML kimi parse olunmur
const p = document.createElement("p");
p.textContent = userText;
div.append(p);

// HTML mütləq lazımdırsa — təmizləyici (DOMPurify) və ya Sanitizer API
div.setHTML?.(userHtml);` },
          { t: "list", items: [
            "Riskli «sink»-lər: innerHTML, outerHTML, insertAdjacentHTML, document.write, eval, setTimeout(\"string\"), href=\"javascript:...\".",
            "Müdafiə qatları: textContent, framework-ün avtomatik escape-i (React {}), CSP, Trusted Types, cookie-də HttpOnly.",
            "Layout thrashing: oxu (offsetHeight) → yaz (style) → oxu ardıcıllığı dövrdə brauzeri hər dəfə layout hesablamağa məcbur edir. Əvvəl hamısını oxu, sonra hamısını yaz.",
            "Çox elementi DocumentFragment və ya replaceChildren ilə bir dəfəyə əlavə et.",
            "Elementi silərkən ona bağlı listener və istinadları da burax — yaddaş sızması (memory leak).",
          ]},
          { t: "qa", items: [
            ["textContent ilə innerHTML fərqi?", "textContent mətni olduğu kimi qoyur (təhlükəsiz), innerHTML HTML kimi parse edir (XSS riski)."],
            ["XSS-in 3 növü?", "Stored (bazada saxlanan), Reflected (URL-dən qayıdan), DOM-based (brauzerdə JS-in özü yaradır)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "class=\"kart\" olan BÜTÜN elementləri tapmaq üçün?", options: ["querySelector(\".kart\")", "querySelectorAll(\".kart\")", "getElementById(\"kart\")"], answer: 1, why: "querySelector yalnız birincini qaytarır." },
          { t: "quiz", q: "İstifadəçinin yazdığı şərhi səhifəyə qoymağın təhlükəsiz yolu?", options: ["innerHTML", "textContent", "document.write"], answer: 1, why: "textContent HTML-i parse etmir — XSS mümkün deyil." },
        ],
      },
    ],
    exercise: {
      task: "Massivdəki tapşırıqlardan ul siyahısı yarat (createElement + textContent, innerHTML İŞLƏTMƏ). Tamamlanmış tapşırıqlara \"bitib\" class-ı əlavə et; h1-də ümumi sayı göstər.",
      starter: `<h1 id="say"></h1>\n<ul id="siyahi"></ul>\n<style>.bitib { text-decoration: line-through; opacity: .6; }</style>\n<script>\n  const tapsiriqlar = [\n    { metn: "HTML öyrən", bitib: true },\n    { metn: "CSS öyrən", bitib: true },\n    { metn: "JS öyrən", bitib: false },\n  ];\n  // bura\n</script>\n`,
      expect: "querySelector ilə ul və h1 tapılır; createElement + textContent (innerHTML yox); bitib olanlara classList.add(\"bitib\"); h1-də 3 yazılır.",
    },
  },
  {
    slug: "hadiseler",
    title: "Hadisələr (events)",
    intro: "Klik, yazmaq, forma göndərmək, scroll — bunlar hadisələrdir. JS onları «dinləyir» və cavab verir. İnteraktivliyin ürəyi.",
    sections: [
      {
        level: "baslangic",
        title: "addEventListener",
        blocks: [
          { t: "analogy", text: "Hadisə dinləyicisi — qapı zəngidir. Zəngi (listener) bir dəfə quraşdırırsan, kimsə düyməni basanda (hadisə) evdə zəng çalır (funksiya işləyir)." },
          { t: "code", lang: "html", code: `<button id="say">Kliklə: 0</button>
<input id="ad" placeholder="Adın">
<p id="salam"></p>

<script>
  const btn = document.querySelector("#say");
  let n = 0;
  btn.addEventListener("click", () => {
    n++;
    btn.textContent = "Kliklə: " + n;
  });

  const input = document.querySelector("#ad");
  input.addEventListener("input", (e) => {
    document.querySelector("#salam").textContent = "Salam, " + e.target.value;
  });
</script>` },
          { t: "terms", items: [
            ["event", "hadisə: click, input, submit, keydown, scroll..."],
            ["listener (handler)", "hadisə baş verəndə çağırılan funksiya."],
            ["e (event obyekti)", "hadisə haqqında məlumat: hədəf, düymə, koordinat."],
            ["e.target", "hadisənin baş verdiyi element."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Forma, preventDefault, klaviatura",
        blocks: [
          { t: "code", lang: "javascript", code: `const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();                 // səhifə yenilənməsin
  const data = new FormData(form);
  console.log(data.get("email"));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.close();
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    axtaris.focus();
  }
});

// Bir dəfəlik dinləyici
btn.addEventListener("click", salamla, { once: true });
// Silmək — EYNİ funksiya istinadı ilə
btn.removeEventListener("click", salamla);` },
          { t: "mistake", lang: "javascript", wrong: `btn.addEventListener("click", salamla());`, right: `btn.addEventListener("click", salamla);`, why: "salamla() funksiyanı DƏRHAL çağırır və nəticəsini (undefined) ötürür. Funksiyanın özünü ver, çağırma." },
          { t: "mistake", lang: "html", wrong: `<div onclick="sil()">Sil</div>`, right: `<button type="button" id="sil">Sil</button>`, why: "div klaviatura ilə işləmir; inline onclick həm də CSP-ni zəiflətməyə məcbur edir. button + addEventListener." },
        ],
      },
      {
        level: "senior",
        title: "Bubbling, delegation, performans",
        blocks: [
          { t: "p", text: "Hadisə 3 fazada yayılır: capture (window-dan hədəfə doğru aşağı), target, bubble (hədəfdən yuxarı window-a). Default olaraq dinləyicilər bubble fazasında işləyir — buna görə valideyndəki dinləyici uşaqların kliklərini də «eşidir»." },
          { t: "code", lang: "javascript", code: `// Event delegation: 1000 düyməyə 1000 listener əvəzinə 1 listener
document.querySelector("#siyahi").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  sil(btn.dataset.id);
});

// Scroll/resize üçün passive — scroll-u bloklamır
window.addEventListener("scroll", yenile, { passive: true });

// AbortController ilə bir neçə listener-i birdən silmək
const ac = new AbortController();
el.addEventListener("click", f, { signal: ac.signal });
ac.abort();` },
          { t: "list", items: [
            "Delegation dinamik əlavə olunan elementlər üçün də işləyir və yaddaşa qənaət edir.",
            "e.stopPropagation() — yayılmanı kəsir; ehtiyatla işlət, analitika və digər komponentləri sındırır.",
            "input/scroll kimi tez-tez gələn hadisələrdə debounce/throttle və ya requestAnimationFrame.",
            "Təhlükəsizlik: isTrusted — hadisə istifadəçidən gəlibmi, yoxsa skript dispatchEvent edib. Ödəniş kimi kritik addımlarda serverdə əlavə təsdiq (CSRF token, təkrar parol) olmalıdır; klik «insan» olduğunu sübut etmir.",
            "Təhlükəsizlik: message hadisəsində (postMessage) HƏMİŞƏ e.origin-i yoxla — yoxsa istənilən sayt sənin səhifənə əmr göndərə bilər.",
          ]},
          { t: "qa", items: [
            ["Event bubbling nədir?", "Hadisənin hədəf elementdən başlayıb valideynlərə doğru yuxarı yayılması."],
            ["Event delegation niyə istifadə olunur?", "Bir valideyn dinləyicisi çoxlu uşağı idarə edir: az yaddaş, dinamik elementlər avtomatik işləyir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Forma göndəriləndə səhifənin yenilənməsinin qarşısını necə alırıq?", options: ["return false", "e.preventDefault()", "e.stop()"], answer: 1, why: "preventDefault brauzerin default davranışını ləğv edir." },
          { t: "quiz", q: "addEventListener(\"click\", f()) — problem nədir?", options: ["Problem yoxdur", "f dərhal çağırılır", "click səhv yazılıb"], answer: 1, why: "Funksiyanın özü ötürülməlidir: f." },
        ],
      },
    ],
    exercise: {
      task: "To-do: input + 'Əlavə et' düyməsi (form submit, preventDefault). Yeni tapşırıq li kimi əlavə olunsun (textContent), boş mətn qəbul edilməsin. Hər li-də 'Sil' düyməsi — silmə event delegation ilə ul üzərindən.",
      starter: `<form id="form">\n  <input id="metn" placeholder="Tapşırıq">\n  <button>Əlavə et</button>\n</form>\n<ul id="siyahi"></ul>\n<script>\n  // bura\n</script>\n`,
      expect: "submit-də e.preventDefault(); trim ilə boş yoxlanır; li textContent ilə (innerHTML yox); ul-də bir click listener, e.target.closest(\"button\") ilə silmə; funksiya çağırılmadan ötürülür.",
    },
  },
  {
    slug: "scope",
    title: "Scope və closure",
    intro: "Scope — dəyişənin «görünmə sahəsi». Closure — funksiyanın yarandığı yerin dəyişənlərini xatırlaması. JS-in ən güclü və ən çox soruşulan mövzularından.",
    sections: [
      {
        level: "baslangic",
        title: "Qlobal, funksiya və blok scope",
        blocks: [
          { t: "analogy", text: "Scope — evdəki otaqlardır. Qonaq otağındakı (qlobal) televizoru hamı görür. Yataq otağındakı (funksiya) şkafı yalnız oradakılar görür. Uşaq otağından (iç scope) xaricə baxmaq olar, xaricdən uşaq otağının içinə — yox." },
          { t: "code", lang: "javascript", code: `const sayt = "Kod Akademiyası";   // qlobal

function salamla() {
  const mesaj = "Salam";           // funksiya scope
  if (true) {
    let gizli = "blok";            // blok scope
    console.log(sayt, mesaj, gizli); // hamısı görünür
  }
  // console.log(gizli);  // ReferenceError
}
salamla();
// console.log(mesaj);   // ReferenceError` },
          { t: "terms", items: [
            ["scope", "dəyişənin əlçatan olduğu sahə."],
            ["global scope", "hər yerdən görünən."],
            ["function scope", "funksiyanın içi."],
            ["block scope", "{ } içi — let və const üçün."],
            ["scope chain", "dəyişən tapılmayanda xarici scope-a, sonra daha xaricə baxılır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Closure",
        blocks: [
          { t: "code", lang: "javascript", code: `function sayqacYarat() {
  let say = 0;                 // xaricdən əlçatmazdır
  return {
    artir: () => ++say,
    goster: () => say,
  };
}

const s = sayqacYarat();
s.artir(); s.artir();
console.log(s.goster());      // 2
// say-ı birbaşa dəyişmək mümkün deyil — gizli vəziyyət

function vurucu(n) {
  return (x) => x * n;        // n yadda qalır
}
const ucqat = vurucu(3);
console.log(ucqat(7));        // 21` },
          { t: "p", text: "Funksiya yarananda yanında «çanta» aparır — yarandığı yerdəki dəyişənlərə istinadlar. Xarici funksiya bitsə də, çanta yaşayır. Bu, closure-dur." },
          { t: "mistake", lang: "javascript", wrong: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}  // 3 3 3`, right: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}  // 0 1 2`, why: "var funksiya scope-ludur — üç closure EYNİ i-ni paylaşır. let hər iterasiyada yeni dəyişən yaradır." },
        ],
      },
      {
        level: "senior",
        title: "Lexical environment, TDZ və yaddaş",
        blocks: [
          { t: "p", text: "Hər funksiya çağırışı yeni Lexical Environment yaradır: dəyişənlər qeydi + xarici mühitə istinad. Scope «leksikdir» — kodun HARADA yazıldığına görə, harada çağırıldığına görə yox. let/const hoisting olunur, amma elan sətrinə qədər «ölü zonadadır» (TDZ) — erkən müraciət ReferenceError verir." },
          { t: "list", items: [
            "Closure-lar böyük obyektlərə istinad saxlayıb yaddaş sızmasına səbəb ola bilər (məs. listener-də tutulmuş böyük massiv). Lazımsızları null et, listener-ləri sil.",
            "Modul pattern-i və React hook-ları (useState) closure üzərində qurulub; «köhnəlmiş closure» (stale closure) React-da tez-tez bug mənbəyidir.",
            "Qlobal scope-u çirkləndirmə: modullar (type=\"module\") öz scope-una malikdir.",
            "Təhlükəsizlik: closure ilə «gizli» saxlanan dəyər (token) brauzerdə həqiqətən gizli deyil — DevTools-da breakpoint ilə görünür. Sirlər yalnız serverdə.",
            "Təhlükəsizlik: qlobal dəyişənlər (window.config) XSS zamanı hücumçu skriptinə ilk açılan yerdir və DOM clobbering ilə (id=\"config\" olan element) üstələnə bilər.",
          ]},
          { t: "qa", items: [
            ["Closure nədir?", "Funksiyanın yarandığı leksik mühitin dəyişənlərinə, o mühit bitdikdən sonra da çıxışı saxlaması."],
            ["TDZ nədir?", "let/const dəyişəninin scope başlanğıcından elan sətrinə qədər əlçatmaz olduğu zona."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "let ilə elan olunan dəyişən hansı scope-dadır?", options: ["Yalnız funksiya", "Blok", "Həmişə qlobal"], answer: 1, why: "let və const blok scope-ludur." },
        ],
      },
    ],
    exercise: {
      task: "bankHesabi(baslangic) funksiyası yaz: balansı closure ilə gizli saxlasın, medaxil(m), mexaric(m) (balansdan çox olanda xəta mesajı) və balans() metodlarını qaytarsın. Balansı birbaşa dəyişmək mümkün olmasın.",
      starter: `function bankHesabi(baslangic) {\n  // bura\n}\n\nconst h = bankHesabi(100);\nh.medaxil(50);\nh.mexaric(500);\nconsole.log(h.balans()); // 150\n`,
      expect: "let balans funksiya daxilində; metodlar obyekt kimi qaytarılır; mexaric balansdan çox olanda dəyişmir və xəbərdarlıq edir; h.balans() 150; balans xaricdən əlçatmazdır.",
    },
  },
  {
    slug: "this",
    title: "this açar sözü",
    intro: "this — funksiyanın «kimin adından» çağırıldığını göstərir. Dəyəri funksiyanın necə ÇAĞIRILDIĞINDAN asılıdır, harada yazıldığından yox (arrow funksiyalar istisna).",
    sections: [
      {
        level: "baslangic",
        title: "Metodda this",
        blocks: [
          { t: "analogy", text: "«Mən» sözü kimin dediyindən asılıdır: Aysel «mən» deyəndə Aysel, Murad deyəndə Murad. this də belədir: user.salamla() çağırılanda this = user." },
          { t: "code", lang: "javascript", code: `const user = {
  ad: "Aysel",
  salamla() {
    return "Salam, mən " + this.ad;
  },
};
console.log(user.salamla());   // Salam, mən Aysel

const diger = { ad: "Murad", salamla: user.salamla };
console.log(diger.salamla());  // Salam, mən Murad — eyni funksiya, fərqli this` },
          { t: "terms", items: [
            ["this", "çağırış kontekstindəki obyekt."],
            ["obj.metod()", "nöqtədən soldakı obyekt this olur."],
            ["arrow funksiya", "öz this-i yoxdur — xarici scope-dan götürür."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "this-in itməsi və həlləri",
        blocks: [
          { t: "code", lang: "javascript", code: `const sayqac = {
  say: 0,
  artir() { this.say++; return this.say; },
};

const f = sayqac.artir;
// f();  // TypeError (strict) — this undefined-dir, obyekt itdi

const bagli = sayqac.artir.bind(sayqac);
console.log(bagli());   // 1

console.log(sayqac.artir.call({ say: 10 }));  // 11 — this-i özün ver

const taymer = {
  saniye: 0,
  basla() {
    setInterval(() => { this.saniye++; }, 1000);  // arrow — this = taymer
  },
};` },
          { t: "list", items: [
            "Qayda sırası: new → call/apply/bind → obj.metod() → sadə çağırış (strict-də undefined).",
            "Callback kimi metod ötürəndə (addEventListener, setTimeout) this itir — bind və ya arrow.",
            "Obyekt metodunu arrow ilə yazma: this obyekt olmayacaq.",
          ]},
          { t: "mistake", lang: "javascript", wrong: `const user = {\n  ad: "Aysel",\n  salamla: () => "Salam, " + this.ad,\n};`, right: `const user = {\n  ad: "Aysel",\n  salamla() { return "Salam, " + this.ad; },\n};`, why: "Arrow funksiyanın öz this-i yoxdur — obyekt literalında this modul/qlobal kontekstdir, user deyil." },
        ],
      },
      {
        level: "senior",
        title: "Bağlanma qaydaları dərindən",
        blocks: [
          { t: "list", items: [
            "new bağlanması: new F() yeni obyekt yaradır, this ona bağlanır, F.prototype-a bağlanır və (açıq obyekt qaytarılmırsa) qaytarılır.",
            "bind ilə bağlanmış funksiyanı yenidən bind etmək təsirsizdir; amma new bind-i üstələyir.",
            "Sinif sahəsində arrow: class A { handle = () => {...} } — hər nüsxədə ayrıca funksiya (yaddaş), amma this həmişə nüsxədir. React class komponentlərinin klassik həlli.",
            "DOM listener-də adi funksiyanın this-i e.currentTarget-dir.",
            "Təhlükəsizlik: non-strict rejimdə this qlobal obyektə (window) düşür — təsadüfən window.ad = ... kimi qlobal yazılar və digər skriptlərlə toqquşma. Modullar default strict-dir; köhnə skriptlərdə \"use strict\".",
          ]},
          { t: "qa", items: [
            ["call, apply, bind fərqi?", "call və apply funksiyanı dərhal çağırır (arqumentlər ayrıca / massiv ilə), bind yeni bağlanmış funksiya qaytarır."],
            ["Arrow funksiyanın this-i?", "Leksikdir — yaradıldığı xarici funksiyanın this-i."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "user.salamla() çağırışında this nədir?", options: ["window", "user", "salamla"], answer: 1, why: "Nöqtədən soldakı obyekt." },
        ],
      },
    ],
    exercise: {
      task: "taymer obyekti yaz: saniye sahəsi və basla() metodu — setInterval ilə hər 200 ms saniye-ni artırsın və 5-ə çatanda dayansın (clearInterval) və \"Bitdi\" yazsın. this-in itmədiyinə əmin ol.",
      starter: `const taymer = {\n  saniye: 0,\n  basla() {\n    // bura\n  },\n};\ntaymer.basla();\n`,
      expect: "basla adi metod; daxildə arrow callback və ya bind(this); this.saniye artır; 5-də clearInterval(id) və \"Bitdi\"; obyekt metodu arrow ilə yazılmayıb.",
    },
  },
  {
    slug: "asinxron",
    title: "Asinxron JS: callback, Promise, async/await",
    intro: "Şəbəkə sorğusu, taymer, fayl oxuma vaxt aparır. JS gözləyərkən donmasın deyə asinxron işləyir. Promise və async/await bunu oxunaqlı edir.",
    sections: [
      {
        level: "baslangic",
        title: "Sinxron vs asinxron",
        blocks: [
          { t: "analogy", text: "Restoranda ofisiant sifarişini mətbəxə verib digər masalara xidmət edir — sənin yeməyin bişənə qədər donub dayanmır. Yemək hazır olanda (Promise yerinə yetəndə) gətirir. Bu, asinxronluqdur. Promise — sifariş qəbzidir: «hazır olanda verəcəyik»." },
          { t: "code", lang: "javascript", code: `console.log("1. Sifariş");
setTimeout(() => console.log("3. Yemək hazırdır"), 1000);
console.log("2. Digər işlər");

function gozle(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function esas() {
  console.log("Başla");
  await gozle(500);          // burada «dayanır», amma səhifə donmur
  console.log("500 ms keçdi");
}
esas();` },
          { t: "terms", items: [
            ["callback", "iş bitəndə çağırılan funksiya."],
            ["Promise", "gələcəkdə hazır olacaq nəticə: pending → fulfilled / rejected."],
            ["resolve / reject", "Promise-i uğurla / xəta ilə bitirir."],
            ["async", "funksiya həmişə Promise qaytarır."],
            ["await", "Promise bitənə qədər async funksiyanı gözlədir."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Xətalar və paralellik",
        blocks: [
          { t: "code", lang: "javascript", code: `function istifadeciGetir(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("Yanlış id"));
      else resolve({ id, ad: "Aysel" });
    }, 300);
  });
}

async function esas() {
  try {
    const u = await istifadeciGetir(1);
    console.log(u.ad);
    await istifadeciGetir(-1);
  } catch (e) {
    console.log("Xəta:", e.message);
  } finally {
    console.log("Hər halda işləyir");
  }

  // Paralel — hamısı eyni anda
  const [a, b] = await Promise.all([istifadeciGetir(1), istifadeciGetir(2)]);
  console.log(a.id, b.id);

  // Biri uğursuz olsa da hamısının nəticəsi
  const neticeler = await Promise.allSettled([istifadeciGetir(1), istifadeciGetir(-1)]);
  console.log(neticeler.map((r) => r.status));
}
esas();` },
          { t: "mistake", lang: "javascript", wrong: `const user = istifadeciGetir(1);\nconsole.log(user.ad);  // undefined`, right: `const user = await istifadeciGetir(1);\nconsole.log(user.ad);`, why: "await olmadan Promise obyektinin özünü alırsan, nəticəni yox." },
          { t: "mistake", lang: "javascript", wrong: `const a = await getir(1);\nconst b = await getir(2);  // bir-birindən asılı deyil`, right: `const [a, b] = await Promise.all([getir(1), getir(2)]);`, why: "Ardıcıl await müstəqil işləri növbəyə düzür — 2 dəfə yavaş. Promise.all paralel aparır." },
        ],
      },
      {
        level: "senior",
        title: "Microtask, ləğv etmə, unhandled rejection",
        blocks: [
          { t: "p", text: "await-dən sonrakı kod microtask kimi növbəyə düşür — cari sinxron kod bitən kimi, setTimeout-dan (macrotask) ƏVVƏL icra olunur. async funksiyanın içində atılan xəta qaytarılan Promise-i reject edir; tutulmasa «unhandled rejection» olur (Node-da proses dayana bilər)." },
          { t: "code", lang: "javascript", code: `const ac = new AbortController();
setTimeout(() => ac.abort(), 2000);           // 2 saniyədən sonra ləğv
// await fetch(url, { signal: ac.signal });

// Timeout ilə yarış
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
// await Promise.race([fetch(url), timeout(5000)]);
// Müasir: fetch(url, { signal: AbortSignal.timeout(5000) })` },
          { t: "list", items: [
            "Promise.all — biri reject olsa hamısı reject; allSettled — hamısını gözlə; any — ilk uğurlu; race — ilk bitən.",
            "Paralelliyi məhdudlaşdır: 1000 sorğunu birdən göndərmə — hovuz (pool) ilə 5-10-luq qruplar.",
            "Async xətalar stack trace-də «qırılır» — xətaları kontekstlə (cause) yenidən at: throw new Error(\"Sifariş alınmadı\", { cause: e }).",
            "Təhlükəsizlik: race condition — iki paralel sorğu eyni balansı oxuyub hər biri çıxarsa, pul iki dəfə xərclənir. Kritik əməliyyatları serverdə atomik (tranzaksiya/kilid) et, klientdə «düymə söndürülüb» kifayət deyil.",
            "Təhlükəsizlik: timeout-suz xarici sorğu serverin bütün resurslarını tuta bilər — hər xarici çağırışa timeout və ləğv.",
          ]},
          { t: "qa", items: [
            ["Promise-in 3 vəziyyəti?", "pending (gözləyir), fulfilled (uğurlu), rejected (xəta)."],
            ["Promise.all ilə allSettled fərqi?", "all ilk xətada reject olur; allSettled hamısının nəticəsini status ilə qaytarır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "async funksiya nə qaytarır?", options: ["Həmişə undefined", "Həmişə Promise", "return etdiyi dəyəri birbaşa"], answer: 1, why: "Qaytarılan dəyər Promise-ə bükülür." },
          { t: "quiz", q: "Bu nə çap edir: console.log(1); setTimeout(()=>console.log(2)); console.log(3);", options: ["1 2 3", "1 3 2", "2 1 3"], answer: 1, why: "setTimeout callback-i sinxron kod bitəndən sonra işləyir." },
        ],
      },
    ],
    exercise: {
      task: "gecikme(ms, deyer) Promise funksiyası yaz. Sonra async esas() içində: 3 müxtəlif gecikməli dəyəri Promise.all ilə paralel al, cəmini çap et; reject olan bir Promise-i try/catch ilə tut; ümumi vaxtı performance.now() ilə ölç (ən uzun gecikməyə yaxın olmalıdır).",
      starter: `function gecikme(ms, deyer) {\n  // bura\n}\n\nasync function esas() {\n  // bura\n}\nesas();\n`,
      expect: "new Promise + setTimeout(resolve); Promise.all ilə paralel; vaxt ~ən uzun gecikmə (cəmi yox); try/catch reject-i tutur; await-lər düzgün.",
    },
  },
  {
    slug: "fetch",
    title: "Fetch və API",
    intro: "fetch brauzerdən serverə HTTP sorğusu göndərir: məlumat almaq (GET), göndərmək (POST). Müasir saytların hamısı API ilə danışır.",
    sections: [
      {
        level: "baslangic",
        title: "GET sorğusu",
        blocks: [
          { t: "analogy", text: "API — restoranın menyusu və ofisiantıdır. Mətbəxə (serverə) birbaşa girmirsən; menyudakı qaydaya uyğun sifariş (sorğu) verirsən, ofisiant (HTTP) cavabı (JSON) gətirir." },
          { t: "code", lang: "javascript", code: `async function getir() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!res.ok) throw new Error("HTTP " + res.status);
  const user = await res.json();
  console.log(user.name, user.email);
}
getir().catch((e) => console.log("Xəta:", e.message));` },
          { t: "terms", items: [
            ["API", "proqramların bir-biri ilə danışma qaydası."],
            ["endpoint", "API-nin konkret ünvanı: /users/1."],
            ["HTTP metodları", "GET (oxu), POST (yarat), PUT/PATCH (dəyiş), DELETE (sil)."],
            ["status kodu", "200 OK, 201 Created, 400 Bad Request, 401, 403, 404, 500."],
            ["JSON", "mətn formatında məlumat: {\"ad\": \"Aysel\"}."],
            ["res.ok", "status 200–299 aralığındadırmı."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "POST, başlıqlar, xətalar",
        blocks: [
          { t: "code", lang: "javascript", code: `async function yarat(post) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Yaradılmadı: " + res.status);
  return res.json();
}

yarat({ title: "Salam", body: "İlk post", userId: 1 })
  .then((p) => console.log("Yaradıldı, id:", p.id));

// Query parametrləri təhlükəsiz qurmaq
const url = new URL("https://api.example.com/axtar");
url.searchParams.set("q", "c# & sql");   // avtomatik kodlanır` },
          { t: "mistake", lang: "javascript", wrong: `const res = await fetch(url);\nconst data = await res.json();  // 404-də də işləyir`, right: `const res = await fetch(url);\nif (!res.ok) throw new Error(res.status);\nconst data = await res.json();`, why: "fetch yalnız ŞƏBƏKƏ xətasında reject olur; 404/500 «uğurlu» cavabdır. res.ok-u həmişə yoxla." },
          { t: "mistake", lang: "javascript", wrong: `fetch("/api?q=" + axtaris)`, right: `fetch("/api?q=" + encodeURIComponent(axtaris))`, why: "& , # , ? kimi simvollar URL-i pozur və parametr inyeksiyasına yol açır." },
        ],
      },
      {
        level: "senior",
        title: "CORS, kredensiallar, təhlükəsizlik",
        blocks: [
          { t: "p", text: "Brauzer Same-Origin Policy tətbiq edir: başqa origin-in (domen+port+protokol) cavabını JS oxuya bilməz, əgər server CORS başlıqları (Access-Control-Allow-Origin) ilə icazə verməyibsə. Qeyri-sadə sorğulardan (JSON POST, xüsusi başlıqlar) əvvəl brauzer OPTIONS «preflight» göndərir. CORS server tərəfin qorunması deyil — brauzerdəki istifadəçinin qorunmasıdır; curl onu saymır." },
          { t: "list", items: [
            "credentials: \"include\" cookie göndərir; server Access-Control-Allow-Origin: * ilə credentials-a icazə verə bilməz — konkret origin lazımdır.",
            "Təhlükəsizlik: API açarını frontend koduna YAZMA — hər kəs DevTools-da görür. Açarlı sorğuları öz serverindən (proxy / route handler) göndər — bu saytın AI agenti məhz belə qurulub.",
            "Təhlükəsizlik: CORS-da Access-Control-Allow-Origin-i sorğunun Origin-indən kor-koranə əks etdirmək + credentials = istənilən sayt istifadəçinin adından məlumat oxuyur. Ağ siyahı işlət.",
            "Təhlükəsizlik: token-i localStorage-da saxlamaq XSS zamanı oğurlanır; HttpOnly + Secure + SameSite cookie daha etibarlıdır. Cookie ilə işləyəndə CSRF qorunması (SameSite, token).",
            "Retry: yalnız idempotent sorğuları (GET, PUT) eksponensial gecikmə ilə təkrarla; POST-u təkrar etmək iki sifariş yarada bilər (Idempotency-Key başlığı).",
          ]},
          { t: "qa", items: [
            ["fetch nə vaxt reject olur?", "Yalnız şəbəkə xətası, ləğv (abort) və ya CORS bloklananda; HTTP xəta statusunda yox."],
            ["CORS nəyi qoruyur?", "İstifadəçinin brauzerində başqa saytın onun adından cavab oxumasının qarşısını alır; serveri qorumur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Server 404 qaytaranda fetch nə edir?", options: ["reject olur", "uğurla resolve olur, res.ok false", "səhifəni yeniləyir"], answer: 1, why: "HTTP xətası şəbəkə xətası deyil." },
          { t: "quiz", q: "API açarı harada saxlanmalıdır?", options: ["Frontend JS-də", "Serverdə (env)", "localStorage-da"], answer: 1, why: "Brauzerdəki hər şey istifadəçiyə görünür." },
        ],
      },
    ],
    exercise: {
      task: "https://jsonplaceholder.typicode.com/users ünvanından istifadəçiləri al, res.ok yoxla, adları və şəhərləri (address.city) çap et. Sonra yalnız email-i .biz ilə bitənləri filtrlə. Xətanı try/catch ilə tut və 5 saniyəlik timeout (AbortSignal.timeout) əlavə et.",
      starter: `async function esas() {\n  // bura\n}\nesas();\n`,
      expect: "await fetch(url, { signal: AbortSignal.timeout(5000) }); if (!res.ok) throw; await res.json(); map ilə ad + address.city; filter(u => u.email.endsWith(\".biz\")); try/catch.",
    },
  },
  {
    slug: "xetalar",
    title: "Xətaların idarəsi",
    intro: "Xətalar qaçılmazdır: şəbəkə kəsilir, istifadəçi yanlış məlumat yazır. Yaxşı proqram xətanı tutur, istifadəçiyə anlaşılan mesaj verir və işləməyə davam edir.",
    sections: [
      {
        level: "baslangic",
        title: "try / catch / finally / throw",
        blocks: [
          { t: "analogy", text: "try — ip üstündə gəzən akrobat, catch — altındakı tor. Akrobat yıxılsa (xəta), tor tutur və tamaşa davam edir. finally — tamaşanın sonunda pərdənin bağlanması: nə olursa olsun." },
          { t: "code", lang: "javascript", code: `function yasYoxla(yas) {
  if (typeof yas !== "number" || Number.isNaN(yas)) {
    throw new TypeError("Yaş ədəd olmalıdır");
  }
  if (yas < 0 || yas > 150) {
    throw new RangeError("Yaş 0–150 aralığında olmalıdır");
  }
  return true;
}

try {
  yasYoxla(200);
} catch (e) {
  console.log(e.name + ": " + e.message);   // RangeError: ...
} finally {
  console.log("Yoxlama bitdi");
}` },
          { t: "terms", items: [
            ["throw", "xəta atır — icra dayanır və ən yaxın catch-ə keçir."],
            ["Error", "xəta obyekti: name, message, stack."],
            ["TypeError, RangeError, SyntaxError", "daxili xəta növləri."],
            ["catch (e)", "xətanı tutur."],
            ["finally", "həmişə işləyir (resursları bağlamaq üçün)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Öz xəta sinifləri və async xətalar",
        blocks: [
          { t: "code", lang: "javascript", code: `class ValidasiyaXetasi extends Error {
  constructor(sahe, mesaj) {
    super(mesaj);
    this.name = "ValidasiyaXetasi";
    this.sahe = sahe;
  }
}

function qeydiyyat(data) {
  if (!data.email?.includes("@")) throw new ValidasiyaXetasi("email", "Email yanlışdır");
}

try {
  qeydiyyat({ email: "aysel" });
} catch (e) {
  if (e instanceof ValidasiyaXetasi) {
    console.log("Sahə:", e.sahe, "—", e.message);
  } else {
    throw e;                 // tanımadığını yuxarı ötür
  }
}

// Async: await + try/catch, və ya .catch()
async function yukle() {
  try {
    const r = await fetch("/yox");
    if (!r.ok) throw new Error("HTTP " + r.status);
  } catch (e) {
    console.log("Yükləmə alınmadı");
  }
}` },
          { t: "mistake", lang: "javascript", wrong: `try {\n  riskli();\n} catch (e) {}`, right: `try {\n  riskli();\n} catch (e) {\n  console.error("riskli() alınmadı", e);\n  goster("Bir şey səhv getdi, yenidən cəhd et");\n}`, why: "Boş catch xətanı «udur» — bug görünməz olur, saatlarla axtarırsan. Ən azı log et və istifadəçiyə bildir." },
          { t: "mistake", lang: "javascript", wrong: `throw "Xəta baş verdi";`, right: `throw new Error("Xəta baş verdi");`, why: "String atanda stack trace itir, instanceof işləmir." },
        ],
      },
      {
        level: "senior",
        title: "Xəta strategiyası və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Gözlənilən xətalar (validasiya, 404) — normal axının hissəsidir: nəticə obyekti { ok: false, error } qaytarmaq daha aydın ola bilər. Gözlənilməzlər (bug) — throw və mərkəzdə tut.",
            "Error cause: throw new Error(\"Sifariş saxlanmadı\", { cause: e }) — kök səbəb itmir.",
            "Qlobal tutucular: window.addEventListener(\"error\") və \"unhandledrejection\" — monitorinqə (Sentry) göndər.",
            "React-da Error Boundary, Next.js-də error.tsx — UI-nin bir hissəsi sınanda bütün səhifə ağarmasın.",
            "Təhlükəsizlik: istifadəçiyə stack trace, SQL, fayl yolu, daxili xidmət adlarını GÖSTƏRMƏ — hücumçu üçün xəritədir. İstifadəçiyə ümumi mesaj + xəta ID, detallar yalnız server log-unda.",
            "Təhlükəsizlik: log-a parol, token, kart nömrəsi yazma; istifadəçi mətnini log-a yazanda yeni sətir simvollarını təmizlə (log injection).",
            "Təhlükəsizlik: «fail closed» — yetki yoxlaması xəta versə, girişi QADAĞAN et, icazə vermə.",
          ]},
          { t: "qa", items: [
            ["finally nə vaxt işləyir?", "try uğurlu olsa da, catch işləsə də, hətta return olsa da — həmişə."],
            ["Niyə daxili xəta detallarını istifadəçiyə göstərməmək?", "Sistemin quruluşunu açır (information disclosure) və hücumu asanlaşdırır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı blok xəta olub-olmamasından asılı olmayaraq işləyir?", options: ["catch", "finally", "throw"], answer: 1, why: "finally həmişə icra olunur." },
        ],
      },
    ],
    exercise: {
      task: "parseYas(metn) funksiyası: ədəd deyilsə TypeError, 0–150 xaricində RangeError atsın. Öz ValidasiyaXetasi sinfini yarat (sahe xassəsi ilə). 3 fərqli giriş üçün try/catch ilə instanceof-a görə fərqli mesaj çap et.",
      starter: `function parseYas(metn) {\n  // bura\n}\n\nfor (const g of ["25", "abc", "300"]) {\n  // try/catch\n}\n`,
      expect: "Number() + Number.isNaN yoxlaması; throw new TypeError/RangeError; class ValidasiyaXetasi extends Error, super(mesaj), this.name; catch-də instanceof ayrımı; boş catch yoxdur.",
    },
  },
  {
    slug: "modullar",
    title: "Modullar",
    intro: "Modul — öz scope-u olan JS faylıdır. export ilə paylaşır, import ilə alır. Böyük layihə yüzlərlə moduldan ibarətdir.",
    sections: [
      {
        level: "baslangic",
        title: "export və import",
        blocks: [
          { t: "analogy", text: "Modul — mətbəxin ayrı rəfləridir: hər rəfdə öz qabları (dəyişənlər). Qonşu rəfdən bir şey lazımdırsa, adını deyib istəyirsən (import); rəf sahibi yalnız paylaşmağa razı olduğunu verir (export)." },
          { t: "code", lang: "javascript", code: `// riyaziyyat.js
export const PI = 3.14159;
export function topla(a, b) { return a + b; }
export default function vur(a, b) { return a * b; }

// main.js
import vur, { topla, PI } from "./riyaziyyat.js";
import * as R from "./riyaziyyat.js";
import { topla as cem } from "./riyaziyyat.js";

console.log(topla(2, 3), vur(2, 3), R.PI, cem(1, 1));` },
          { t: "code", lang: "html", code: `<script type="module" src="main.js"></script>` },
          { t: "terms", items: [
            ["export", "moduldan çölə açır."],
            ["named export", "adla: export const x; import { x }."],
            ["default export", "modulun «əsas» dəyəri: import istəniləAd from."],
            ["import * as", "hamısını bir obyektə yığır."],
            ["type=\"module\"", "brauzerə faylın modul olduğunu deyir (avtomatik defer və strict)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Dinamik import və layihə quruluşu",
        blocks: [
          { t: "code", lang: "javascript", code: `// Lazım olanda yüklə — ilkin yükləməni yüngülləşdirir
btn.addEventListener("click", async () => {
  const { qrafikCek } = await import("./qrafik.js");
  qrafikCek();
});

// Re-export — «barrel» fayl
// utils/index.js
export { topla } from "./riyaziyyat.js";
export { formatTarix } from "./tarix.js";` },
          { t: "list", items: [
            "Named export-u üstün tut: avtomatik tamamlanma və refaktorinq daha yaxşı işləyir.",
            "CommonJS (require/module.exports) — köhnə Node formatıdır; yeni kodda ES modules.",
            "Modul bir dəfə icra olunur və keşlənir — 10 yerdə import etsən də kod bir dəfə işləyir.",
          ]},
          { t: "mistake", lang: "javascript", wrong: `import { topla } from "./riyaziyyat";  // brauzerdə`, right: `import { topla } from "./riyaziyyat.js";`, why: "Brauzer faylın uzantısını təxmin etmir — tam yol lazımdır. (Bundler-lər — Vite, Next — bunu bağışlayır.)" },
          { t: "mistake", lang: "javascript", wrong: `// a.js: import { b } from "./b.js"\n// b.js: import { a } from "./a.js"`, right: `// Ortaq hissəni üçüncü modula (c.js) çıxar`, why: "Dövri asılılıq (circular import) dəyərin hələ hazır olmadığı anda oxunmasına (undefined / TDZ xətası) səbəb olur." },
        ],
      },
      {
        level: "senior",
        title: "Tree shaking, bundle və tədarük zənciri",
        blocks: [
          { t: "list", items: [
            "ES modules statikdir — bundler import edilməyən export-ları atır (tree shaking). Yan təsirli modullar (qlobal dəyişən yazan) bunu çətinləşdirir — package.json-da \"sideEffects\": false.",
            "Barrel fayllar böyük layihədə tree shaking-i və build sürətini pisləşdirə bilər — dərin importlar daha yaxşı ola bilər.",
            "import.meta.url — modulun öz ünvanı; top-level await — modulda üst səviyyədə await (asılı modulları gözlədir).",
            "Import maps — brauzerdə bundler-siz paket adlarını URL-ə xəritələmək.",
            "Təhlükəsizlik — supply chain: hər npm paketi kodunu sənin tətbiqində icra edir. Az asılılıq, lock faylı (package-lock.json) commit et, npm audit, typosquatting-ə diqqət (lodash vs 1odash).",
            "Təhlükəsizlik: CDN-dən skript qoşanda integrity (SRI hash) + crossorigin atributu — CDN sındırılsa dəyişdirilmiş fayl işləməz.",
            "Təhlükəsizlik: dinamik import(userInput) — istifadəçinin seçdiyi modul yolu ilə import etmə; ağ siyahı.",
          ]},
          { t: "qa", items: [
            ["Named və default export fərqi?", "Named — adla import olunur, bir neçə ola bilər; default — moduldan bir dənə, istənilən adla import."],
            ["Tree shaking nədir?", "Bundler-in istifadə olunmayan export-ları son paketdən çıxarması."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "export default function f() {} necə import olunur?", options: ["import { f } from", "import f from", "require(f)"], answer: 1, why: "Default export fiqurlu mötərizəsiz import olunur." },
        ],
      },
    ],
    exercise: {
      task: "İki modul təsvir et (şərhlərlə fayl adlarını göstər): format.js — named export-lar formatPul(n) (\"12.50 AZN\") və formatTarix(d) (\"13.11.2026\"); main.js — onları import edib işlət. Məşq səhifəsində yoxlamaq üçün funksiyaları bir faylda yazıb çağırış nəticələrini çap et.",
      starter: `// format.js\n// export function formatPul(n) { ... }\n\n// main.js\n// import { ... } from "./format.js";\n\n// Yoxlama (bir faylda):\n`,
      expect: "export function formatPul — toFixed(2) + \" AZN\"; formatTarix — gün.ay.il padStart(2,\"0\") ilə; import { formatPul, formatTarix } from \"./format.js\" düzgün sintaksis (.js uzantısı); nəticələr çap olunur.",
    },
  },
  {
    slug: "sinifler",
    title: "Siniflər və OOP",
    intro: "class sintaksisi obyekt yaratmağın «çertyojudur»: constructor, metodlar, private sahələr, irsiyyət (extends), static üzvlər.",
    sections: [
      {
        level: "baslangic",
        title: "class və constructor",
        blocks: [
          { t: "analogy", text: "Sinif — tort qəlibidir, obyekt — o qəliblə bişirilmiş konkret tort. Hər tortun içi (dəyərlər) fərqli ola bilər, amma forması (struktur) eynidir." },
          { t: "code", lang: "javascript", code: `class Telebe {
  constructor(ad, bal) {
    this.ad = ad;
    this.bal = bal;
  }

  kecdi() {
    return this.bal >= 50;
  }

  toString() {
    return this.ad + " (" + this.bal + ")";
  }
}

const t = new Telebe("Aysel", 92);
console.log(t.kecdi(), String(t));` },
          { t: "terms", items: [
            ["class", "sinif elanı."],
            ["constructor", "new ilə çağırılan başlanğıc metodu."],
            ["this", "yaradılan obyekt."],
            ["new", "yeni nüsxə (instance) yaradır."],
            ["metod", "sinifin funksiyası — bütün nüsxələr paylaşır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Private, getter/setter, static, extends",
        blocks: [
          { t: "code", lang: "javascript", code: `class Hesab {
  #balans = 0;                 // private — çöldən əlçatmaz
  static say = 0;              // sinfə aid, nüsxəyə yox

  constructor(sahib) {
    this.sahib = sahib;
    Hesab.say++;
  }
  get balans() { return this.#balans; }     // oxu
  medaxil(m) {
    if (m <= 0) throw new RangeError("Məbləğ müsbət olmalıdır");
    this.#balans += m;
    return this;               // zəncir üçün
  }
}

class EmanetHesabi extends Hesab {
  constructor(sahib, faiz) {
    super(sahib);              // valideyn constructor — this-dən ƏVVƏL
    this.faiz = faiz;
  }
  faizHesabla() {
    return this.balans * this.faiz / 100;
  }
}

const e = new EmanetHesabi("Murad", 5).medaxil(1000);
console.log(e.balans, e.faizHesabla(), Hesab.say);   // 1000 50 1
// e.#balans  → SyntaxError` },
          { t: "mistake", lang: "javascript", wrong: `class B extends A {\n  constructor() {\n    this.x = 1;\n    super();\n  }\n}`, right: `class B extends A {\n  constructor() {\n    super();\n    this.x = 1;\n  }\n}`, why: "Törəmə sinifdə this super() çağırılmamış mövcud deyil — ReferenceError." },
          { t: "mistake", lang: "javascript", wrong: `class Hesab {\n  constructor() { this._balans = 0; }  // «gizli» saymışıq\n}`, right: `class Hesab {\n  #balans = 0;\n}`, why: "Alt xətt yalnız razılaşmadır — hər kəs dəyişə bilər. # həqiqi private-dir." },
        ],
      },
      {
        level: "senior",
        title: "Class-lar altında nə var",
        blocks: [
          { t: "p", text: "JS class-ları prototip sisteminin üstündə «sintaktik şəkərdir»: metodlar Sinif.prototype-a yazılır, nüsxələr onu prototip zənciri ilə tapır. Fərqlər: class kodu həmişə strict-dir, class hoisting olunur amma TDZ-dədir, constructor new-suz çağırıla bilməz, metodlar sayıla bilməz (non-enumerable)." },
          { t: "list", items: [
            "Kompozisiya irsiyyətdən çox vaxt yaxşıdır: dərin extends zəncirləri əvəzinə kiçik obyektləri birləşdir.",
            "Sinif sahəsində arrow funksiya (handle = () => {}) hər nüsxə üçün yeni funksiya yaradır — yaddaş; prototip metodu paylaşılır.",
            "#private sahələr həqiqətən gizlidir (Proxy, JSON.stringify görməz); #x in obj ilə yoxlanır.",
            "static blokları: static { ... } — sinif yüklənəndə bir dəfə işləyən başlanğıc kodu.",
            "Təhlükəsizlik: obyekti JSON.stringify ilə serverə/log-a göndərəndə bütün açıq sahələr gedir — həssas sahələri # ilə gizlət və ya toJSON() ilə nəyin çıxacağını özün təyin et.",
            "Təhlükəsizlik: frontend-dəki private sahə istifadəçidən qoruma DEYİL — kod onun brauzerində işləyir. Qaydaları (balans, qiymət) serverdə yoxla.",
          ]},
          { t: "qa", items: [
            ["JS class-ı ilə Java class-ı eynidirmi?", "Xeyr — JS prototiplərə əsaslanır; class sintaksisi prototip modelinin üzərindədir."],
            ["#private ilə _konvensiya fərqi?", "# dil səviyyəsində əlçatmazdır; _ yalnız adlandırma razılaşmasıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Törəmə sinfin constructor-unda ilk nə çağırılmalıdır?", options: ["this", "super()", "new"], answer: 1, why: "super() valideyni qurur və this-i yaradır." },
        ],
      },
    ],
    exercise: {
      task: "Mehsul sinfi (ad, #qiymet; qiymet getter; endirim(faiz) metodu — 0–90 xaricində RangeError). EndirimliMehsul extends Mehsul — toString-də \"(endirimli)\" əlavə etsin. Static say ilə yaradılan məhsulları say.",
      starter: `class Mehsul {\n  // bura\n}\n\nclass EndirimliMehsul extends Mehsul {\n  // bura\n}\n\nconst m = new EndirimliMehsul("Kitab", 20);\nm.endirim(25);\nconsole.log(String(m), m.qiymet, Mehsul.say);\n`,
      expect: "#qiymet private; get qiymet(); endirim RangeError ilə yoxlayır və qiyməti dəyişir (15); extends + super(...) this-dən əvvəl; toString override; static say artır.",
    },
  },
  {
    slug: "prototip",
    title: "Prototiplər",
    intro: "JS-də irsiyyət prototiplərlə işləyir: hər obyektin gizli valideyni (prototipi) var. Xassə obyektdə tapılmasa, zəncirlə valideyndə axtarılır.",
    sections: [
      {
        level: "baslangic",
        title: "Prototip zənciri",
        blocks: [
          { t: "analogy", text: "Uşaq bir sözün mənasını bilmirsə, valideynindən soruşur; o da bilmirsə — babasından. Kimsə bilmirsə — undefined. JS-də xassə axtarışı da belə zəncirlə yuxarı gedir." },
          { t: "code", lang: "javascript", code: `const heyvan = {
  nefesAl() { return this.ad + " nəfəs alır"; },
};

const it = Object.create(heyvan);   // it-in prototipi = heyvan
it.ad = "Toplan";
it.hurek = () => "Hav!";

console.log(it.nefesAl());           // it-də yoxdur → heyvan-da tapıldı
console.log(Object.getPrototypeOf(it) === heyvan);  // true
console.log(it.hasOwnProperty("ad"));       // true
console.log(it.hasOwnProperty("nefesAl"));  // false — miras

const arr = [1, 2];
// arr → Array.prototype (map, filter...) → Object.prototype → null` },
          { t: "terms", items: [
            ["prototype", "obyektin miras aldığı valideyn obyekt."],
            ["[[Prototype]] / __proto__", "obyektin prototipinə gizli istinad."],
            ["Object.create(p)", "prototipi p olan yeni obyekt."],
            ["prototype chain", "axtarış zənciri — null-a qədər."],
            ["own property", "obyektin özünə aid xassə."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Konstruktor funksiyalar və class əlaqəsi",
        blocks: [
          { t: "code", lang: "javascript", code: `function Telebe(ad) {
  this.ad = ad;
}
Telebe.prototype.salamla = function () {
  return "Salam, " + this.ad;
};

const t = new Telebe("Aysel");
console.log(t.salamla());
console.log(t.__proto__ === Telebe.prototype);   // true

// class eyni şeyi edir:
class Telebe2 { constructor(ad) { this.ad = ad; } salamla() { return "Salam, " + this.ad; } }
console.log(typeof Telebe2);                              // "function"
console.log(Object.hasOwn(Telebe2.prototype, "salamla"));  // true` },
          { t: "list", items: [
            "Metodları prototipə yazmaq yaddaşa qənaətdir: 1000 nüsxə bir funksiyanı paylaşır.",
            "Funksiyanın .prototype xassəsi ilə obyektin [[Prototype]]-u fərqli şeylərdir — çaşdırmayın.",
            "__proto__ köhnə yazılışdır; Object.getPrototypeOf / setPrototypeOf işlət.",
          ]},
          { t: "mistake", lang: "javascript", wrong: `Array.prototype.son = function () { return this[this.length - 1]; };`, right: `const son = (arr) => arr.at(-1);`, why: "Daxili prototipləri dəyişmək (monkey patching) bütün kodu, kitabxanaları təsirləyir və gələcək standartla toqquşur (məşhur «SmooshGate»)." },
        ],
      },
      {
        level: "senior",
        title: "Performans və prototype pollution",
        blocks: [
          { t: "p", text: "V8 obyektlərə gizli «forma» (hidden class / shape) verir və eyni formalı obyektlərdə xassə axtarışını inline cache ilə sürətləndirir. Prototipi sonradan dəyişmək (setPrototypeOf) bu optimallaşdırmaları sındırır — obyektin prototipini yaradılanda təyin et." },
          { t: "warn", text: "Prototype pollution: hücumçu JSON-da {\"__proto__\": {\"isAdmin\": true}} göndərir, tətbiq onu «dərin birləşdirmə» (merge) ilə obyektə yazanda Object.prototype dəyişir — artıq HƏR obyektdə isAdmin === true. Real hücumlarda yetki keçmək, hətta serverdə kod icrası (RCE) üçün istifadə olunub." },
          { t: "code", lang: "javascript", code: `// Qoruma
function tehlukesizMerge(hedef, menbe) {
  for (const k of Object.keys(menbe)) {
    if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
    hedef[k] = menbe[k];
  }
  return hedef;
}
const lugat = Object.create(null);   // prototipsiz — zəncir yoxdur
const xerite = new Map();            // açar-dəyər üçün ən təhlükəsizi
Object.freeze(Object.prototype);     // ekstremal, amma bəzi tətbiqlərdə işlədilir` },
          { t: "qa", items: [
            ["Prototype chain nədir?", "Xassə tapılmayanda [[Prototype]] istinadları ilə null-a qədər yuxarı axtarış."],
            ["Prototype pollution-dan necə qorunmaq?", "Təhlükəli açarları rədd et, Map/Object.create(null) işlət, giriş sxemlə yoxla, kitabxanaları yenilə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Xassə obyektin özündə yoxdursa JS harada axtarır?", options: ["Qlobal scope-da", "Prototipində", "Heç yerdə"], answer: 1, why: "Prototip zənciri ilə yuxarı." },
        ],
      },
    ],
    exercise: {
      task: "1) Object.create ilə nəqliyyat prototipi (hereket() metodu) və ondan maşın obyekti yarat; hasOwnProperty ilə hansı xassənin özünə, hansının miras olduğunu göstər. 2) tehlukesizMerge yaz: __proto__, constructor, prototype açarlarını ötürsün; JSON.parse('{\"__proto__\": {\"admin\": true}}') ilə sına və ({}).admin-in undefined qaldığını göstər.",
      starter: `// 1)\n\n// 2)\nfunction tehlukesizMerge(hedef, menbe) {\n  // bura\n}\n`,
      expect: "Object.create(neqliyyat); hasOwnProperty nəticələri düzgün; merge-də 3 təhlükəli açar ötürülür, Object.keys ilə gəzilir; sonda ({}).admin undefined.",
    },
  },
  {
    slug: "event-loop",
    title: "Senior: Event loop",
    intro: "JS tək axınlıdır (single-threaded), amma eyni anda minlərlə sorğunu idarə edir. Sirr — event loop: call stack, macrotask və microtask növbələri.",
    sections: [
      {
        level: "baslangic",
        title: "Bir aşpaz, çox sifariş",
        blocks: [
          { t: "analogy", text: "Mətbəxdə bir aşpaz var (call stack). Soba (brauzer API-ləri — taymer, şəbəkə) yeməyi özü bişirir. Hazır olan yeməklər növbəyə düzülür. Aşpaz əlindəki işi bitirəndə əvvəl «təcili» növbəyə (microtask — Promise) baxır, sonra adi növbəyə (macrotask — setTimeout, klik)." },
          { t: "code", lang: "javascript", code: `console.log("1 sinxron");
setTimeout(() => console.log("5 macrotask (timeout)"), 0);
Promise.resolve().then(() => console.log("3 microtask (promise)"));
queueMicrotask(() => console.log("4 microtask"));
console.log("2 sinxron");
// 1, 2, 3, 4, 5` },
          { t: "terms", items: [
            ["call stack", "hazırda icra olunan funksiyalar yığını."],
            ["Web APIs", "brauzerin JS-dən kənar işləyən hissəsi: taymerlər, fetch, DOM hadisələri."],
            ["macrotask queue", "setTimeout, setInterval, I/O, UI hadisələri."],
            ["microtask queue", "Promise.then, await-dən sonrası, queueMicrotask, MutationObserver."],
            ["event loop", "stack boşalanda növbədən növbəti işi götürən dövr."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Bir dövrün addımları",
        blocks: [
          { t: "list", items: [
            "1) Bir macrotask icra et (məs. skriptin özü, bir taymer callback-i).",
            "2) BÜTÜN microtask-ları boşalt (icra zamanı yenisi əlavə olunsa, onu da).",
            "3) Lazımdırsa render: requestAnimationFrame → style → layout → paint.",
            "4) Növbəti macrotask-a keç.",
          ]},
          { t: "code", lang: "javascript", code: `async function a() {
  console.log("A1");
  await null;               // qalanı microtask olur
  console.log("A2");
}
setTimeout(() => console.log("T"), 0);
a();
console.log("S");
// A1, S, A2, T` },
          { t: "mistake", lang: "javascript", wrong: `// Ağır hesablama əsas axında\nfor (let i = 0; i < 5e9; i++) {}\nbtn.textContent = "Bitdi";`, right: `// Web Worker-ə köçür və ya hissələrə böl\nconst w = new Worker("hesab.js");\nw.onmessage = (e) => (btn.textContent = e.data);`, why: "Uzun sinxron kod stack-i tutur: kliklər, render, taymerlər gözləyir — səhifə donur." },
          { t: "mistake", lang: "javascript", wrong: `setTimeout(f, 0);  // «dərhal» işləyəcək`, right: `queueMicrotask(f);  // və ya Promise.resolve().then(f)`, why: "setTimeout 0 minimum gecikmədir, dərhal deyil: bütün microtask-lar və bəlkə render ondan əvvəl gəlir; iç-içə taymerlərdə minimum ~4 ms." },
        ],
      },
      {
        level: "senior",
        title: "Starvation, Node fərqləri, uzun tapşırıqlar",
        blocks: [
          { t: "list", items: [
            "Microtask starvation: microtask özü yeni microtask yaradırsa (sonsuz then zənciri), macrotask-lar və render heç vaxt gəlmir — səhifə donur.",
            "Uzun tapşırıq (>50 ms) INP (Interaction to Next Paint) metrikini pisləşdirir. İşi parçala: await scheduler.yield() və ya setTimeout ilə növbəyə qaytar.",
            "requestAnimationFrame — növbəti render-dən dərhal əvvəl; animasiyalar üçün setInterval-dan düzgündür. requestIdleCallback — boş vaxtda.",
            "Node.js event loop fazaları: timers → pending → poll (I/O) → check (setImmediate) → close; process.nextTick microtask-lardan da əvvəl.",
            "Təhlükəsizlik (server): Node tək axınlıdır — bir sorğuda sinxron ağır iş (böyük JSON.parse, zəif regex, bcrypt sync) BÜTÜN istifadəçiləri dayandırır. ReDoS: (a+)+$ kimi regex xüsusi girişlə saniyələrlə işləyir. Async API-lər, worker_threads, regex yoxlaması və giriş ölçüsü limiti.",
          ]},
          { t: "qa", items: [
            ["Microtask və macrotask fərqi?", "Microtask-lar hər macrotask-dan sonra tamamilə boşaldılır; Promise callback-ləri microtask, setTimeout macrotask-dır."],
            ["JS tək axınlıdırsa necə paralel sorğular edir?", "Gözləmə işini brauzer/OS edir; JS yalnız nəticə gələndə callback-i növbədən götürür."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı birinci işləyir?", options: ["setTimeout(f, 0)", "Promise.resolve().then(f)", "Eyni anda"], answer: 1, why: "Microtask-lar macrotask-dan əvvəl boşaldılır." },
        ],
      },
    ],
    exercise: {
      task: "Aşağıdakı kodun çıxış sırasını ƏVVƏLCƏ şərhdə təxmin et, sonra işə salıb yoxla və hər sətrin niyə o yerdə olduğunu şərhlə izah et: sinxron log-lar, setTimeout, Promise.then, async/await, queueMicrotask qarışığı.",
      starter: `console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C")).then(() => console.log("D"));\n(async () => {\n  console.log("E");\n  await null;\n  console.log("F");\n})();\nqueueMicrotask(() => console.log("G"));\nconsole.log("H");\n\n// Təxminim: ...\n`,
      expect: "Düzgün sıra: A E H C F G D B (C, F, G microtask-lar növbə sırası ilə, D C-dən sonra yeni microtask, B macrotask sonda); izahlar microtask/macrotask fərqinə əsaslanır.",
    },
  },
  {
    slug: "yaddas",
    title: "Senior: yaddaş və performans",
    intro: "JS yaddaşı avtomatik idarə edir (garbage collector), amma sızmalar mümkündür. Performans — ölçmək, darboğazı tapmaq və düzgün yerdə optimallaşdırmaq.",
    sections: [
      {
        level: "baslangic",
        title: "Garbage collection",
        blocks: [
          { t: "analogy", text: "Garbage collector — ofisin xadiməsidir: heç kimin istifadə etmədiyi (heç bir istinadı olmayan) kağızları atır. Amma kağızı stolun altında «unudulmuş» qovluqda saxlasan (istinad qalıb), xadimə onu ata bilməz — sızma budur." },
          { t: "code", lang: "javascript", code: `let user = { ad: "Aysel" };
user = null;   // obyektə istinad qalmadı → GC onu silə bilər

const cache = new Map();
function getir(id) {
  if (!cache.has(id)) cache.set(id, { id, data: new Array(1e5).fill(0) });
  return cache.get(id);
}
// cache heç vaxt təmizlənmir — sızma riski!` },
          { t: "terms", items: [
            ["heap", "obyektlərin saxlandığı yaddaş."],
            ["stack", "funksiya çağırışları və primitiv lokal dəyərlər."],
            ["reachability", "kökdən (global, stack) istinadla çatıla bilən obyekt «canlı»dır."],
            ["memory leak", "lazımsız, amma hələ istinad olunan yaddaş."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Tipik sızmalar və alətlər",
        blocks: [
          { t: "list", items: [
            "Silinməmiş event listener-lər və setInterval-lar (komponent silinsə də callback obyektləri saxlayır).",
            "DOM-dan silinmiş, amma JS dəyişənində qalmış elementlər (detached DOM).",
            "Sərhədsiz keş (Map) — LRU ilə ölçünü məhdudlaşdır və ya WeakMap.",
            "Böyük obyektləri tutan closure-lar.",
            "Alətlər: DevTools → Memory (heap snapshot, iki snapshot müqayisəsi), Performance (flame chart), Lighthouse.",
          ]},
          { t: "code", lang: "javascript", code: `// WeakMap — açar obyekt silinəndə qeyd də yox olur
const meta = new WeakMap();
function isaretle(el) { meta.set(el, { klik: 0 }); }

// Komponent təmizliyi
const ac = new AbortController();
window.addEventListener("resize", onResize, { signal: ac.signal });
const id = setInterval(tick, 1000);
function destroy() { ac.abort(); clearInterval(id); }` },
          { t: "mistake", lang: "javascript", wrong: `// «Sürətli olsun» deyə əvvəlcədən optimallaşdırma\nfor (let i = 0, n = a.length; i < n; i++) {}`, right: `// Əvvəl ölç (Performance panel), darboğazı tap, sonra optimallaşdır\nfor (const x of a) {}`, why: "Mikro-optimallaşdırma adətən heç nə qazandırmır, oxunaqlılığı öldürür. Darboğaz çox vaxt şəbəkə, render və ya alqoritmdədir." },
        ],
      },
      {
        level: "senior",
        title: "V8 daxili və real performans",
        blocks: [
          { t: "list", items: [
            "Nəsil GC: yeni obyektlər «gənc nəsildə» (Scavenger, sürətli), sağ qalanlar «köhnə nəsilə» (Mark-Sweep-Compact). Çoxlu qısa ömürlü obyekt ucuzdur, uzun ömürlü böyük strukturlar bahadır.",
            "Hidden classes: obyektlərə xassələri həmişə eyni sırada əlavə et, sonradan delete etmə — monomorfik kod sürətlidir.",
            "Massivləri qarışıq tiplərlə doldurmaq (ədəd + string + undefined) «elements kind»-i pisləşdirir.",
            "Böyük siyahılar: virtualizasiya (yalnız görünən 30 sətri render et).",
            "Ağır hesablama → Web Worker; ağır render → CSS transform/opacity (compositor), layout thrashing-dən qaç.",
            "Core Web Vitals: LCP (əsas məzmun ≤ 2.5 s), INP (cavab ≤ 200 ms), CLS (sürüşmə ≤ 0.1).",
            "Təhlükəsizlik: sərhədsiz keş/növbə serverdə istifadəçi girişi ilə böyüyürsə — yaddaş tükənməsi ilə DoS. Hər keşə ölçü və TTL, hər sorğuya ölçü limiti.",
            "Təhlükəsizlik: həssas məlumatı (parol) yaddaşda uzun saxlama; string-lər immutable-dır və GC-yə qədər heap dump-da görünür.",
          ]},
          { t: "qa", items: [
            ["WeakMap nə vaxt?", "Obyektə əlavə məlumat bağlayıb, obyekt silinəndə məlumatın da avtomatik silinməsini istəyəndə."],
            ["Yaddaş sızmasını necə tapırsan?", "Heap snapshot-ları müqayisə edib böyüyən obyektləri və onları saxlayan istinad zəncirini (retainers) tapıram."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Komponent silinəndə setInterval təmizlənməsə?", options: ["Problem yoxdur", "Yaddaş sızması və boş işləyən kod", "Brauzer avtomatik dayandırır"], answer: 1, why: "Callback və onun closure-u yaşamağa davam edir." },
        ],
      },
    ],
    exercise: {
      task: "Ölçüsü məhdud LRU keş yaz: new LRU(3); get(k) — tapılsa elementi «ən yeni» et; set(k, v) — limit aşılanda ən köhnəni sil. Map-in daxiletmə sırasından istifadə et. 5 əməliyyatla göstər ki, ən köhnə açar silinir.",
      starter: `class LRU {\n  constructor(limit) {\n    // bura\n  }\n  get(k) {}\n  set(k, v) {}\n}\n\nconst c = new LRU(3);\n`,
      expect: "Map istifadə olunur; get-də delete + set ilə sona köçürmə; set-də size > limit olanda map.keys().next().value silinir; nəticə ən az istifadə olunan açarın silindiyini göstərir.",
    },
  },
  {
    slug: "pattern",
    title: "Senior: dizayn pattern-ləri",
    intro: "Pattern — təkrarlanan problemə sınanmış həll. JS-də ən çox işlədilənlər: modul, observer (pub/sub), factory, strategy, decorator, singleton — və onların müasir formaları.",
    sections: [
      {
        level: "baslangic",
        title: "Pattern nədir?",
        blocks: [
          { t: "analogy", text: "Pattern — memarlıqdakı «tağ» kimidir: hər körpü üçün yenidən icad etmirsən, sınanmış formanı öz ölçünə uyğunlaşdırırsan. Pattern adı komandaya qısa dil verir: «burada observer qoyaq» — hamı başa düşür." },
          { t: "code", lang: "javascript", code: `// Observer / Pub-Sub
class Hadiseler {
  #dinleyiciler = new Map();
  on(ad, f) {
    if (!this.#dinleyiciler.has(ad)) this.#dinleyiciler.set(ad, new Set());
    this.#dinleyiciler.get(ad).add(f);
    return () => this.#dinleyiciler.get(ad).delete(f);   // abunəlikdən çıx
  }
  emit(ad, data) {
    this.#dinleyiciler.get(ad)?.forEach((f) => f(data));
  }
}

const bus = new Hadiseler();
const cix = bus.on("sifaris", (s) => console.log("Email göndər:", s.id));
bus.emit("sifaris", { id: 42 });
cix();` },
          { t: "terms", items: [
            ["Observer", "obyekt dəyişəndə abunəçilərə xəbər verir."],
            ["Factory", "obyekt yaratmağı bir funksiyada gizlədir."],
            ["Strategy", "alqoritmi dəyişdirilə bilən obyekt/funksiya kimi ötürmək."],
            ["Singleton", "sinfin yalnız bir nüsxəsi."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Factory, Strategy, Decorator",
        blocks: [
          { t: "code", lang: "javascript", code: `// Strategy — if/switch əvəzinə
const ODENIS = {
  kart: (m) => "Kartla " + m + " AZN",
  nagd: (m) => "Nağd " + m + " AZN",
};
const ode = (usul, m) => (ODENIS[usul] ?? ODENIS.nagd)(m);

// Factory
function bildirisYarat(tip) {
  if (tip === "email") return { gonder: (msg) => console.log("📧", msg) };
  if (tip === "sms") return { gonder: (msg) => console.log("📱", msg) };
  throw new Error("Naməlum tip: " + tip);
}

// Decorator (funksional) — davranış əlavə et, orijinala toxunma
function logla(f) {
  return (...args) => {
    console.log("Çağırış:", f.name, args);
    return f(...args);
  };
}
const topla = logla(function topla(a, b) { return a + b; });
topla(2, 3);` },
          { t: "list", items: [
            "ES modulu özü singleton-dur — modulda yaradılan obyekt bütün import edənlər üçün eynidir.",
            "Pattern-i problem olanda tətbiq et, «olsun» deyə yox — artıq abstraksiya da texniki borcdur.",
          ]},
          { t: "mistake", lang: "javascript", wrong: `class Konfiq {\n  static #nusxe;\n  static al() { return (this.#nusxe ??= new Konfiq()); }\n}\n// hər yerdə Konfiq.al() — gizli qlobal asılılıq`, right: `// Asılılığı açıq ötür (dependency injection)\nfunction yaratServis(konfiq) { /* ... */ }`, why: "Singleton gizli qlobal vəziyyətdir: test zamanı əvəz etmək çətindir, modullar arasında görünməz asılılıq yaradır." },
        ],
      },
      {
        level: "senior",
        title: "Arxitektura səviyyəsində pattern-lər",
        blocks: [
          { t: "list", items: [
            "Proxy pattern — JS Proxy obyekti: reaktivlik (Vue), validasiya, lazy loading.",
            "Middleware / chain of responsibility — Express, Next.js middleware: sorğu bir sıra funksiyalardan keçir.",
            "Command — əməliyyatı obyekt kimi saxla: undo/redo, növbə.",
            "Repository — məlumat mənbəyini (API, DB) interfeys arxasında gizlət; testdə saxta (mock) versiya.",
            "Adapter — xarici API-ni öz interfeysinə uyğunlaşdır: provayderi dəyişəndə kod dağılmasın (bu saytda Gemini çağırışı bir faylda).",
            "Təhlükəsizlik pattern-ləri: «secure by default» (default-lar qapalı), «defense in depth» (çoxqatlı müdafiə: validasiya + parametrli SQL + CSP + least privilege), «fail closed», mərkəzləşdirilmiş yetki (policy) — yoxlamanı hər endpoint-də əl ilə yazmamaq.",
            "Təhlükəsizlik: observer/pub-sub-da hadisə adlarını və məlumatı istifadəçidən qəbul edirsənsə (WebSocket), hər abunəçi öz yetkisini yoxlamalıdır — «bus-a gələn məlumat etibarlıdır» fərziyyəsi təhlükəlidir.",
          ]},
          { t: "qa", items: [
            ["Strategy pattern nə həll edir?", "Böyük if/switch-ləri dəyişdirilə bilən davranış obyektləri ilə əvəzləyir (open/closed)."],
            ["Singleton-un problemi?", "Gizli qlobal vəziyyət, test çətinliyi, sıx bağlılıq."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Bir hadisəyə çoxlu abunəçinin reaksiya verməsi hansı pattern-dir?", options: ["Factory", "Observer", "Singleton"], answer: 1, why: "Observer / pub-sub." },
        ],
      },
    ],
    exercise: {
      task: "1) Observer: Magaza sinfi — stok dəyişəndə abunəçilərə (on/emit) xəbər versin, abunəlikdən çıxma funksiyası qaytarsın. 2) Strategy: çatdırılma qiymətini usul-a görə (standart 3, ekspress 8, pulsuz 0) obyekt xəritəsi ilə hesabla; naməlum usulda xəta.",
      starter: `class Magaza {\n  // bura\n}\n\nconst CATDIRILMA = {\n  // bura\n};\n`,
      expect: "Map/Set ilə dinləyicilər, on() unsubscribe funksiyası qaytarır, emit hamısını çağırır; strategy obyekt xəritəsi, Object.hasOwn və ya ?? ilə naməlum usul yoxlanır; if/switch zənciri yoxdur.",
    },
  },
];
