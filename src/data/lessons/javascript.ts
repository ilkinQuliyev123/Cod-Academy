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
];
