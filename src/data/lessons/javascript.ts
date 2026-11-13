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
];
