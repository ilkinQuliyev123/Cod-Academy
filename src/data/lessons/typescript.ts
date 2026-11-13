import type { Lesson } from "../types";

export const typescript: Lesson[] = [
  {
    slug: "giris",
    title: "TypeScript nədir?",
    intro: "TypeScript (TS) — JavaScript + tiplər. Kod işə düşməmiş səhvləri tutur, redaktorda ağıllı tamamlanma verir. Brauzer TS bilmir — TS JS-ə çevrilir (kompilyasiya).",
    sections: [
      {
        level: "baslangic",
        title: "Niyə tiplər?",
        blocks: [
          { t: "analogy", text: "JS — yol nişanı olmayan şəhərdir: hara istəsən gedə bilərsən, amma səhv dönəndə yalnız divara dəyəndə bilirsən (icra zamanı xəta). TS — GPS: səhv döngəni hələ sükanı çevirməmiş deyir (kompilyasiya xətası)." },
          { t: "code", lang: "typescript", code: `function salamla(ad: string): string {
  return "Salam, " + ad;
}

salamla("Aysel");     // ✓
// salamla(42);       // ✗ Argument of type 'number' is not assignable to parameter of type 'string'

const yas: number = 25;
let aktiv = true;      // tip avtomatik çıxarılır: boolean
// aktiv = "hə";       // ✗` },
          { t: "terms", items: [
            ["tip annotasiyası", ": string — dəyişənin/parametrin tipini yazmaq."],
            ["type inference", "TS tipi dəyərdən özü çıxarır — hər yerə yazmaq lazım deyil."],
            ["tsc", "TypeScript kompilyatoru: .ts → .js."],
            ["compile-time", "kod işə düşməzdən əvvəl (TS xətaları burada)."],
            ["runtime", "icra zamanı (TS tipləri burada YOXDUR)."],
          ]},
          { t: "tip", text: "Bu saytın məşq səhifəsi TS kodundan tipləri silib icra edir (sürət üçün) — tip xətalarını AI müəllim yoxlayır. Real layihədə VS Code və tsc onları dərhal göstərir." },
        ],
      },
      {
        level: "orta",
        title: "Layihədə TS",
        blocks: [
          { t: "code", lang: "bash", code: `npm install -D typescript
npx tsc --init          # tsconfig.json yaradır
npx tsc                 # yoxla və kompilyasiya et
npx tsc --noEmit        # yalnız yoxla (Next.js, Vite özü kompilyasiya edir)` },
          { t: "list", items: [
            "tsconfig.json-da \"strict\": true — HƏMİŞƏ. Strict olmadan TS-in yarı faydası itir.",
            "Mövcud JS layihəsini addım-addım keçirmək olar: allowJs, sonra faylları bir-bir .ts edirsən.",
            "Next.js, Vite, NestJS TS-i qutudan dəstəkləyir.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `function cem(a, b) {\n  return a + b;\n}  // a, b gizli any`, right: `function cem(a: number, b: number): number {\n  return a + b;\n}`, why: "Parametr tipi yazılmayanda (strict olmadan) any olur — TS susur və səhvləri tutmur. strict-də bu xətadır (noImplicitAny)." },
        ],
      },
      {
        level: "senior",
        title: "Tip silinməsi və etibar sərhədi",
        blocks: [
          { t: "p", text: "TS «type erasure» edir: kompilyasiyadan sonra bütün tiplər silinir, JS-də iz qalmır. Ona görə TS yalnız SƏNİN kodunun daxili ardıcıllığını yoxlayır. Xaricdən gələn məlumat (API cavabı, form, JSON.parse, localStorage) runtime-da istənilən formada ola bilər — const user = data as User TS-i «aldadır», yoxlamır." },
          { t: "code", lang: "typescript", code: `import { z } from "zod";

const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
});
type User = z.infer<typeof UserSchema>;     // tip sxemdən çıxır

const user: User = UserSchema.parse(await res.json());   // runtime yoxlaması` },
          { t: "list", items: [
            "Təhlükəsizlik: sərhəddə (API girişi, form, webhook) runtime validasiya — zod, valibot, class-validator. TS tipləri hücumçunun göndərdiyi JSON-u dayandırmır.",
            "TS strukturaldır (structural typing): formaya baxır, ada yox — { id, email } olan istənilən obyekt User-dir.",
            "Böyük kod bazasında TS refaktorinqi təhlükəsiz edir: sahənin adını dəyiş — kompilyator bütün istifadə yerlərini göstərir.",
          ]},
          { t: "qa", items: [
            ["TS runtime-da tipləri yoxlayırmı?", "Xeyr. Tiplər kompilyasiyada silinir; runtime yoxlaması üçün sxem validasiyası lazımdır."],
            ["Structural typing nədir?", "Tip uyğunluğu adla yox, struktura (xassələrə) görə müəyyən olunur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "TS tip xətaları nə vaxt görünür?", options: ["Brauzerdə icra zamanı", "Kompilyasiya / redaktorda", "Heç vaxt"], answer: 1, why: "TS kod işləməzdən əvvəl yoxlayır." },
        ],
      },
    ],
    exercise: {
      task: "Tipli funksiyalar yaz: kvadrat(n: number): number, tamAd(ad: string, soyad: string): string, boyukdur(yas: number): boolean. Hər birini çağırıb nəticəni çap et. Bir sətirdə qəsdən yanlış tipli çağırışı şərhdə göstər və TS-in hansı xətanı verəcəyini yaz.",
      starter: `// bura\n`,
      expect: "Bütün parametr və qaytarma tipləri yazılıb; any yoxdur; çağırışlar düzgün; şərhdə yanlış çağırış və 'is not assignable' tipli xəta izahı.",
    },
  },
  {
    slug: "esas-tipler",
    title: "Əsas tiplər",
    intro: "string, number, boolean, massivlər, tuple, obyekt tipləri, any, unknown, never, null/undefined — TS-in əlifbası.",
    sections: [
      {
        level: "baslangic",
        title: "Primitivlər və massivlər",
        blocks: [
          { t: "analogy", text: "Tiplər — konteyner limanındakı etiketlərdir: «yalnız maye», «yalnız 10 ton», «3 bölməli». any — etiketsiz konteynerdir: içinə nə qoysan keçir, amma limanda partlaya bilər." },
          { t: "code", lang: "typescript", code: `const ad: string = "Aysel";
const bal: number = 92.5;
const aktiv: boolean = true;

const ballar: number[] = [90, 85, 77];
const adlar: Array<string> = ["Aysel", "Murad"];

const koordinat: [number, number] = [40.41, 49.87];   // tuple — sabit uzunluq və tiplər
const cavab: [string, number] = ["OK", 200];

const user: { ad: string; yas: number; email?: string } = { ad: "Aysel", yas: 25 };
// email? — ixtiyari xassə` },
          { t: "terms", items: [
            ["number", "tam və kəsr ədədlər (bir tip)."],
            ["T[] / Array<T>", "T tipli elementlərin massivi."],
            ["tuple", "[string, number] — mövqeyə görə tipli, sabit uzunluqlu massiv."],
            ["?", "ixtiyari (optional) xassə — ola da bilər, olmaya da."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "any, unknown, never, null",
        blocks: [
          { t: "code", lang: "typescript", code: `let x: any = 5;
x.istenilenMetod();         // TS susur — runtime-da çökür!

let y: unknown = JSON.parse('{"a":1}');
// y.a;                     // ✗ əvvəl yoxla
if (typeof y === "object" && y !== null && "a" in y) {
  console.log((y as { a: number }).a);
}

function xeta(mesaj: string): never {
  throw new Error(mesaj);   // heç vaxt normal qayıtmır
}

let email: string | null = null;   // strictNullChecks ilə null ayrıca tipdir
console.log(email?.length ?? 0);` },
          { t: "list", items: [
            "any — tip yoxlamasını SÖNDÜRÜR və «yoluxucudur» (any ilə əlaqəli hər şey any olur).",
            "unknown — «hələ bilmirəm»: işlətməzdən əvvəl daraltmaq (narrowing) məcburidir. Xarici məlumat üçün düzgün seçim.",
            "never — mümkün olmayan dəyər: həmişə xəta atan funksiya, bütün halları yoxlanmış switch-in sonu.",
            "void — funksiya faydalı heç nə qaytarmır.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `const data: any = await res.json();\ndata.user.name.toUpperCase();`, right: `const data: unknown = await res.json();\n// sxem ilə yoxla (zod) və ya type guard`, why: "any ilə TS heç nə yoxlamır — user yoxdursa runtime xətası. unknown səni yoxlamağa məcbur edir." },
        ],
      },
      {
        level: "senior",
        title: "Literal genişlənmə, readonly, satisfies",
        blocks: [
          { t: "code", lang: "typescript", code: `let a = "salam";            // string (genişlənir)
const b = "salam";          // "salam" literal tipi

const RENGLER = ["mavi", "qırmızı"] as const;   // readonly ["mavi", "qırmızı"]
type Reng = (typeof RENGLER)[number];           // "mavi" | "qırmızı"

const ballar: readonly number[] = [1, 2, 3];
// ballar.push(4);          // ✗

const konfiq = {
  port: 3000,
  host: "localhost",
} satisfies Record<string, string | number>;   // yoxla, amma dəqiq tipi saxla
konfiq.port.toFixed();      // port hələ number-dir` },
          { t: "list", items: [
            "as const — dəyərləri ən dar literal tiplərə və readonly-yə çevirir; sabit siyahılar və xəritələr üçün.",
            "satisfies — dəyərin müəyyən tipə uyğun olduğunu yoxlayır, amma çıxarılan dəqiq tipi itirmir (as-dan fərqli).",
            "noUncheckedIndexedAccess — arr[i] tipini T | undefined edir; indeks xətalarını tutur. Strict layihələrdə tövsiyə olunur.",
            "Təhlükəsizlik: as (type assertion) yoxlama DEYİL, «mən bilirəm» deməkdir. Xarici məlumatda as User yazmaq — validasiyanı atlamaqdır. Kod review-da hər as-ı sorğula.",
          ]},
          { t: "qa", items: [
            ["any ilə unknown fərqi?", "any yoxlamanı söndürür; unknown təhlükəsizdir — istifadədən əvvəl daraltma tələb edir."],
            ["as const nə edir?", "Literal tipləri saxlayır və bütün strukturu readonly edir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "API-dən gələn naməlum JSON üçün ən təhlükəsiz tip:", options: ["any", "unknown", "object"], answer: 1, why: "unknown istifadədən əvvəl yoxlamağa məcbur edir." },
          { t: "quiz", q: "[string, number] nədir?", options: ["massiv", "tuple", "union"], answer: 1, why: "Mövqeyə görə tipli, sabit uzunluqlu massiv." },
        ],
      },
    ],
    exercise: {
      task: "Telebe obyekt tipi yaz (ad: string, bal: number, email ixtiyari). Telebe[] massivi yarat, ən yüksək balı tap. Sonra koordinat tuple-ı və as const ilə HEFTE_GUNLERI siyahısından Gun union tipi çıxar. any işlətmə.",
      starter: `// bura\n`,
      expect: "obyekt tipi email?; Telebe[] massiv; Math.max(...map) və ya reduce; [number, number] tuple; as const + (typeof X)[number]; any yoxdur.",
    },
  },
  {
    slug: "funksiya-tipleri",
    title: "Funksiya tipləri",
    intro: "Parametr və qaytarma tipləri, ixtiyari və default parametrlər, funksiya tipləri, overload-lar. Funksiyalar TS-in ən çox fayda verdiyi yerdir.",
    sections: [
      {
        level: "baslangic",
        title: "Parametrlər və qaytarma",
        blocks: [
          { t: "analogy", text: "Funksiya tipi — müqavilədir: «mənə iki ədəd verəcəksən, mən sənə ədəd qaytaracağam». TS notariusdur: müqaviləni pozan çağırışı imzalamağa qoymur." },
          { t: "code", lang: "typescript", code: `function topla(a: number, b: number): number {
  return a + b;
}

const vur = (a: number, b: number): number => a * b;

function salamla(ad: string, leqeb?: string): string {   // ixtiyari
  return leqeb ? \`Salam, \${leqeb} \${ad}\` : \`Salam, \${ad}\`;
}

function endirim(qiymet: number, faiz = 10): number {   // default → tip çıxarılır
  return qiymet * (1 - faiz / 100);
}

function logla(mesaj: string): void {
  console.log(mesaj);
}

console.log(topla(2, 3), salamla("Aysel"), endirim(200));` },
          { t: "terms", items: [
            ["(a: number)", "parametr tipi."],
            ["): number", "qaytarma tipi."],
            ["leqeb?", "ixtiyari parametr — string | undefined."],
            ["faiz = 10", "default dəyər."],
            ["void", "faydalı dəyər qaytarmır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Funksiya tipləri və callback-lər",
        blocks: [
          { t: "code", lang: "typescript", code: `type Emeliyyat = (a: number, b: number) => number;

const cix: Emeliyyat = (a, b) => a - b;     // parametr tipləri avtomatik

function tetbiqEt(ededler: number[], f: (n: number) => number): number[] {
  return ededler.map(f);
}
console.log(tetbiqEt([1, 2, 3], (n) => n * 10));

function cem(...ededler: number[]): number {   // rest parametr
  return ededler.reduce((s, n) => s + n, 0);
}

type Secimler = { limit?: number; sirala?: "artan" | "azalan" };
function siyahi({ limit = 10, sirala = "artan" }: Secimler = {}) {
  return { limit, sirala };
}` },
          { t: "mistake", lang: "typescript", wrong: `function getir(id: number) {\n  if (id > 0) return { id };\n}  // qaytarma: { id } | undefined`, right: `function getir(id: number): { id: number } | null {\n  if (id > 0) return { id };\n  return null;\n}`, why: "Açıq qaytarma tipi niyyəti sənədləşdirir və unudulmuş return-ü kompilyator tutur." },
          { t: "tip", text: "Export olunan (public) funksiyaların qaytarma tipini açıq yaz; daxili kiçik funksiyalarda inference kifayətdir." },
        ],
      },
      {
        level: "senior",
        title: "Overload, this tipi, assertion funksiyaları",
        blocks: [
          { t: "code", lang: "typescript", code: `function formatla(x: number): string;
function formatla(x: Date): string;
function formatla(x: number | Date): string {
  return typeof x === "number" ? x.toFixed(2) : x.toISOString().slice(0, 10);
}

function assertNumber(x: unknown, ad: string): asserts x is number {
  if (typeof x !== "number" || Number.isNaN(x)) throw new TypeError(ad + " ədəd olmalıdır");
}

function emal(girish: unknown) {
  assertNumber(girish, "miqdar");
  return girish * 2;          // burada artıq number-dir
}` },
          { t: "list", items: [
            "Overload-lar çağıranın gördüyü imzalardır; implementasiya imzası çöldən görünmür. Çox vaxt union və ya generic daha sadədir.",
            "Parametrlərin «bivariance» qaydası bəzi callback tiplərində boşluq yaradır — strictFunctionTypes açıq olsun (strict daxilindədir).",
            "asserts x is T — funksiya uğurla qayıdırsa, TS sonrakı kodda tipi daraldır: validasiya funksiyaları üçün ideal.",
            "Təhlükəsizlik: assertion funksiyası həqiqətən YOXLAMALIDIR — içi boş «asserts» TS-i yalandan inandırır. Sərhəddə bütün xarici girişlər bu cür yoxlanılsın.",
          ]},
          { t: "qa", items: [
            ["Overload nə vaxt lazımdır?", "Fərqli giriş tiplərinə görə fərqli qaytarma tipi lazım olanda və union bunu ifadə edə bilməyəndə."],
            ["asserts x is T nə edir?", "Funksiya xəta atmadan qayıdarsa, x-in sonrakı kodda T olduğunu TS-ə bildirir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "function f(x?: string) — x-in tipi:", options: ["string", "string | undefined", "any"], answer: 1, why: "İxtiyari parametr undefined ola bilər." },
        ],
      },
    ],
    exercise: {
      task: "1) type Filtr = (n: number) => boolean; filtrlə(ededler: number[], f: Filtr): number[] yaz. 2) ortalama(...ededler: number[]): number | null — boşda null. 3) assertMusbet(x: unknown): asserts x is number yaz və istifadə et.",
      starter: `// 1)\n// 2)\n// 3)\n`,
      expect: "Funksiya tipi alias-ı; rest parametr; qaytarma tipləri açıq; asserts funksiyası həqiqətən typeof və > 0 yoxlayır, xəta atır; any yoxdur.",
    },
  },
  {
    slug: "interface-type",
    title: "Interface və type",
    intro: "Obyektlərin formasını təsvir etməyin iki yolu: interface və type alias. Oxşardırlar, amma fərqləri var — nə vaxt hansını seçməli?",
    sections: [
      {
        level: "baslangic",
        title: "Obyekt formasını adlandırmaq",
        blocks: [
          { t: "analogy", text: "Interface — iş elanındakı tələblər siyahısıdır: «adı, yaşı, emaili olmalıdır». Bu tələblərə cavab verən hər namizəd (obyekt) qəbul olunur — haradan gəldiyindən asılı olmayaraq." },
          { t: "code", lang: "typescript", code: `interface User {
  id: number;
  ad: string;
  email?: string;
  readonly yaradilib: Date;
}

type Mehsul = {
  id: number;
  ad: string;
  qiymet: number;
};

const u: User = { id: 1, ad: "Aysel", yaradilib: new Date() };
// u.yaradilib = new Date();   // ✗ readonly

function goster(m: Mehsul): string {
  return \`\${m.ad}: \${m.qiymet} AZN\`;
}` },
          { t: "terms", items: [
            ["interface", "obyekt forması üçün ad; genişlənə bilir."],
            ["type", "istənilən tipə ad (alias): obyekt, union, tuple, funksiya."],
            ["readonly", "yalnız yaradılanda təyin olunur."],
            ["?", "ixtiyari xassə."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Genişləndirmə və fərqlər",
        blocks: [
          { t: "code", lang: "typescript", code: `interface Heyvan { ad: string }
interface It extends Heyvan { cins: string }

type Noqte = { x: number; y: number };
type Noqte3D = Noqte & { z: number };     // intersection

type Status = "aktiv" | "bloklanib";       // yalnız type ilə
type Cavab = [number, string];              // yalnız type ilə

// İndeks imzası
interface Lugat { [acar: string]: string }
type Ballar = Record<string, number>;      // eyni fikir, utility ilə` },
          { t: "list", items: [
            "interface: extends, «declaration merging» (eyni adlı iki interface birləşir), xəta mesajlarında daha aydın.",
            "type: union, tuple, primitiv alias, mapped/conditional tiplər — daha çevik.",
            "Praktiki qayda: obyekt/sinif müqavilələri üçün interface, qalan hər şey üçün type. Ən vacibi — layihədə ardıcıl ol.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `const u: User = { id: 1, ad: "A", yaradilib: new Date(), yas: 25 };`, right: `const u: User = { id: 1, ad: "A", yaradilib: new Date() };`, why: "Obyekt literalında artıq xassə (excess property) xətadır — çox vaxt yazı səhvini (emial) tutur." },
        ],
      },
      {
        level: "senior",
        title: "Declaration merging, modul genişləndirmə",
        blocks: [
          { t: "code", lang: "typescript", code: `// Kitabxananın tipini genişləndirmək (module augmentation)
declare global {
  interface Window { analytics?: { track(ad: string): void } }
}

// Express Request-ə istifadəçi əlavə etmək (NestJS/Express-də tez-tez)
declare module "express-serve-static-core" {
  interface Request { user?: { id: number; rol: "admin" | "user" } }
}` },
          { t: "list", items: [
            "Declaration merging qlobal tipləri genişləndirməyə imkan verir, amma təsadüfi birləşmə sürprizlər yaradır — type alias-lar birləşmir (təkrar ad xətadır).",
            "Böyük union-larda və dərin intersection-larda type yoxlaması yavaşlaya bilər; interface extends keşlənir və daha sürətlidir.",
            "Domen modelləri üçün readonly default — dəyişikliklər açıq metodlarla.",
            "Təhlükəsizlik: frontend və backend eyni DTO tipini paylaşanda (monorepo), backend-də daxili sahələri (parol_hash, rol) DTO-dan çıxar — tip paylaşmaq məlumat paylaşmaq demək deyil; cavab tipini ayrıca (UserPublic) təyin et.",
          ]},
          { t: "qa", items: [
            ["interface və type fərqi?", "interface yalnız obyekt formaları, extends və merging; type istənilən tip (union, tuple), merging yoxdur."],
            ["Excess property check nədir?", "Obyekt literalı tipdə olmayan xassə saxlayanda TS-in verdiyi xəta."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "type Status = \"a\" | \"b\" — bunu interface ilə yazmaq olarmı?", options: ["Bəli", "Xeyr", "Yalnız extends ilə"], answer: 1, why: "Union yalnız type alias ilə ifadə olunur." },
        ],
      },
    ],
    exercise: {
      task: "interface Kurs (id readonly, ad, saat, muellim?). interface OnlineKurs extends Kurs (link). type KursStatus = \"aktiv\" | \"bitib\". Kurslar massivi yarat, cəmi saatı hesabla və statusa görə mesaj qaytaran funksiya yaz.",
      starter: `// bura\n`,
      expect: "readonly id, muellim?; extends; union type; Kurs[] üzərində reduce; funksiya parametri KursStatus; artıq xassə xətası yoxdur.",
    },
  },
  {
    slug: "union",
    title: "Union və intersection",
    intro: "Union (A | B) — «ya bu, ya o». Intersection (A & B) — «həm bu, həm o». Discriminated union isə TS-in ən güclü modelləşdirmə alətidir.",
    sections: [
      {
        level: "baslangic",
        title: "| və &",
        blocks: [
          { t: "analogy", text: "Union — restoranda «çay VƏ YA qəhvə» seçimi: ikisindən biri gələcək, amma hansı olduğunu yoxlamalısan. Intersection — kombo menyu: burger VƏ kartof — hər ikisinin hər şeyi var." },
          { t: "code", lang: "typescript", code: `let id: number | string;
id = 42;
id = "abc-42";

function goster(id: number | string): string {
  // id.toUpperCase();   // ✗ number-də yoxdur
  return typeof id === "string" ? id.toUpperCase() : id.toFixed(0);
}

type Ad = { ad: string };
type Yas = { yas: number };
type Sexs = Ad & Yas;          // { ad: string; yas: number }
const s: Sexs = { ad: "Aysel", yas: 25 };

type Olcu = "S" | "M" | "L";   // literal union
const o: Olcu = "M";` },
          { t: "terms", items: [
            ["union (|)", "dəyər sadalanan tiplərdən biridir."],
            ["intersection (&)", "dəyər bütün tiplərin xassələrinə malikdir."],
            ["literal union", "\"S\" | \"M\" — yalnız bu dəyərlər."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Discriminated union",
        blocks: [
          { t: "code", lang: "typescript", code: `type Netice =
  | { status: "yuklenir" }
  | { status: "ugurlu"; data: string[] }
  | { status: "xeta"; mesaj: string };

function render(n: Netice): string {
  switch (n.status) {
    case "yuklenir": return "Yüklənir…";
    case "ugurlu":   return n.data.join(", ");   // burada data var
    case "xeta":     return "Xəta: " + n.mesaj;  // burada mesaj var
  }
}

console.log(render({ status: "ugurlu", data: ["HTML", "CSS"] }));` },
          { t: "p", text: "Ortaq «etiket» sahəsi (status) TS-ə hər halda hansı xassələrin olduğunu deyir. Mümkün olmayan vəziyyətlər (həm data, həm xəta) tip səviyyəsində qadağandır." },
          { t: "mistake", lang: "typescript", wrong: `type Veziyyet = {\n  yuklenir: boolean;\n  data?: string[];\n  xeta?: string;\n};  // yuklenir: true + xeta + data — mümkündür!`, right: `type Veziyyet =\n  | { status: "yuklenir" }\n  | { status: "ugurlu"; data: string[] }\n  | { status: "xeta"; xeta: string };`, why: "Boolean bayraqlar və ixtiyari sahələr qeyri-mümkün kombinasiyalara icazə verir. Discriminated union onları kökündən kəsir: «make impossible states impossible»." },
        ],
      },
      {
        level: "senior",
        title: "Exhaustiveness və tip modelləşdirmə",
        blocks: [
          { t: "code", lang: "typescript", code: `function assertNever(x: never): never {
  throw new Error("Gözlənilməz hal: " + JSON.stringify(x));
}

type Odenis = { tip: "kart"; son4: string } | { tip: "nagd" } | { tip: "kocurme"; iban: string };

function izah(o: Odenis): string {
  switch (o.tip) {
    case "kart": return "Kart ****" + o.son4;
    case "nagd": return "Nağd";
    case "kocurme": return "Köçürmə";
    default: return assertNever(o);   // yeni tip əlavə olunub unudulsa — KOMPİLYASİYA xətası
  }
}` },
          { t: "list", items: [
            "assertNever ilə yeni hal əlavə ediləndə emal olunmayan bütün switch-lər kompilyasiyada üzə çıxır.",
            "Primitivlərin intersection-u never olur: string & number = never.",
            "Branded tiplər: type UserId = number & { __brand: \"UserId\" } — UserId və SifarisId-ni qarışdırmağın qarşısını alır.",
            "Təhlükəsizlik: rol/icazə modelini union ilə dəqiq təyin et (type Rol = \"admin\" | \"muellim\" | \"telebe\") və serverdə gələn string-i bu siyahıya qarşı yoxla — tip özü runtime-da yoxlamır.",
            "Təhlükəsizlik: branded ID tipləri «başqa resursun ID-sini ötürmək» bug-larını (IDOR-a aparan) kompilyasiyada tutmağa kömək edir.",
          ]},
          { t: "qa", items: [
            ["Discriminated union nədir?", "Hər variantda ortaq literal etiket sahəsi olan union; TS etiketə görə tipi daraldır."],
            ["Exhaustiveness check necə edilir?", "switch-in default-unda dəyəri never tipinə təyin etməklə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "{ a: string } & { b: number } tipli obyektdə hansı xassələr olmalıdır?", options: ["a və ya b", "a və b", "heç biri"], answer: 1, why: "Intersection — hər ikisi." },
        ],
      },
    ],
    exercise: {
      task: "Fiqur discriminated union: daire (r), kvadrat (a), duzbucaqli (en, uz) — etiket sahəsi tip. sahe(f: Fiqur): number funksiyasını switch ilə yaz və default-da assertNever işlət. 3 fiqurun sahəsini çap et.",
      starter: `type Fiqur = // bura\n\nfunction assertNever(x: never): never {\n  throw new Error("Gözlənilməz: " + JSON.stringify(x));\n}\n\nfunction sahe(f: Fiqur): number {\n  // bura\n}\n`,
      expect: "3 variantlı union, ortaq tip literal sahəsi; switch hər hal üçün düzgün düstur (Math.PI * r ** 2, a * a, en * uz); default: assertNever(f); any/as yoxdur.",
    },
  },
  {
    slug: "narrowing",
    title: "Narrowing (tipin daraldılması)",
    intro: "Union tipli dəyəri işlətməzdən əvvəl TS-ə «bu, hazırda hansıdır» deməliyik. typeof, in, instanceof, bərabərlik və öz type guard-larımızla.",
    sections: [
      {
        level: "baslangic",
        title: "typeof və truthiness",
        blocks: [
          { t: "analogy", text: "Qaranlıq otaqda qutu var: içində ya alma, ya top. Dişləməzdən əvvəl əllə yoxlayırsan (typeof) — alma çıxsa yeyirsən, top çıxsa atırsan. TS də yoxlamadan sonra qutunun içini «bilir»." },
          { t: "code", lang: "typescript", code: `function uzunluq(x: string | number | null): number {
  if (x === null) return 0;          // burada x: null
  if (typeof x === "string") {
    return x.length;                 // burada x: string
  }
  return x.toString().length;        // burada x: number
}

function salamla(ad?: string) {
  if (!ad) return "Salam, qonaq";    // "" və undefined
  return "Salam, " + ad.trim();      // ad: string
}` },
          { t: "terms", items: [
            ["narrowing", "yoxlamadan sonra TS-in tipi daha dar tipə endirməsi."],
            ["type guard", "tipi daraldan ifadə: typeof, instanceof, in, ===."],
            ["control flow analysis", "TS kodun axınını (if, return, switch) izləyib hər nöqtədə tipi bilir."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "in, instanceof və öz guard-ların",
        blocks: [
          { t: "code", lang: "typescript", code: `type Baliq = { uz: () => string };
type Qus = { uc: () => string };

function hereket(h: Baliq | Qus) {
  if ("uz" in h) return h.uz();      // h: Baliq
  return h.uc();                     // h: Qus
}

function tarix(x: Date | string): string {
  return x instanceof Date ? x.toISOString() : x;
}

interface User { id: number; email: string }
function isUser(x: unknown): x is User {          // user-defined type guard
  return typeof x === "object" && x !== null
    && typeof (x as Record<string, unknown>).id === "number"
    && typeof (x as Record<string, unknown>).email === "string";
}

const data: unknown = JSON.parse('{"id":1,"email":"a@b.az"}');
if (isUser(data)) console.log(data.email);` },
          { t: "mistake", lang: "typescript", wrong: `function isUser(x: unknown): x is User {\n  return true;  // «sonra yazaram»\n}`, right: `function isUser(x: unknown): x is User {\n  return typeof x === "object" && x !== null && "id" in x && "email" in x;\n}`, why: "Type guard-ın gövdəsini TS yoxlamır — yalan danışan guard bütün tip sistemini aldadır." },
          { t: "mistake", lang: "typescript", wrong: `if (typeof x === "object") {\n  x.ad;  // x null ola bilər!\n}`, right: `if (typeof x === "object" && x !== null) { ... }`, why: "typeof null === \"object\" — JS-in köhnə xüsusiyyəti. null-u ayrıca yoxla." },
        ],
      },
      {
        level: "senior",
        title: "Daralmanın sərhədləri",
        blocks: [
          { t: "list", items: [
            "Callback-lərin içində daralma itə bilər: dəyişən let-dirsə, TS callback çağırılanda onun dəyişmədiyinə zəmanət vermir — const-a köçür.",
            "Obyekt xassəsinin daralması funksiya çağırışından sonra «sıfırlanmır», amma bu, potensial yalandır (funksiya obyekti dəyişə bilər).",
            "Array.filter(Boolean) TS 5.5-dən əvvəl tipi daraltmırdı; indi inferred type predicates bir çox halda avtomatik işləyir.",
            "Böyük type guard-lar yazmaq əvəzinə sxem kitabxanası (zod: schema.safeParse) — həm yoxlama, həm tip bir yerdə.",
            "Təhlükəsizlik: sərhəddə daralma həm TİP, həm DƏYƏR yoxlaması olmalıdır: typeof id === \"number\" kifayət deyil — Number.isSafeInteger(id) && id > 0. Email-in string olması onun etibarlı olması demək deyil.",
          ]},
          { t: "qa", items: [
            ["Type predicate (x is T) nədir?", "true qaytaranda arqumentin T olduğunu TS-ə bildirən funksiya qaytarma tipi."],
            ["in operatoru ilə narrowing?", "Xassənin mövcudluğuna görə union-un uyğun variantını seçir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "typeof null nə qaytarır?", options: ["\"null\"", "\"object\"", "\"undefined\""], answer: 1, why: "Tarixi səbəbdən \"object\"." },
        ],
      },
    ],
    exercise: {
      task: "Mehsul tipi (ad: string, qiymet: number) üçün isMehsul(x: unknown): x is Mehsul guard yaz (qiymət sonlu və mənfi olmayan olmalıdır). JSON massivindən yalnız düzgün məhsulları filtrlə və cəmi qiyməti hesabla.",
      starter: `type Mehsul = { ad: string; qiymet: number };\n\nconst xam: unknown[] = JSON.parse('[{"ad":"Kitab","qiymet":12},{"ad":"Qələm"},{"ad":"Çanta","qiymet":-5},null,{"ad":"Dəftər","qiymet":3}]');\n\n// bura\n`,
      expect: "guard null və object yoxlayır, typeof ad === string, Number.isFinite(qiymet) && qiymet >= 0; filter(isMehsul) → Kitab, Dəftər; cəm 15; any/as ilə aldatma yoxdur.",
    },
  },
  {
    slug: "generics",
    title: "Generics",
    intro: "Generic — tip parametri olan funksiya/tip: «hansı tipi versən, onunla işləyəcəm və tipi itirməyəcəm». Array<T>, Promise<T>, useState<T> — hamısı generic-dir.",
    sections: [
      {
        level: "baslangic",
        title: "<T> nədir?",
        blocks: [
          { t: "analogy", text: "Generic — şəffaf qutudur: içinə alma qoysan, «alma qutusu» olur; kitab qoysan — «kitab qutusu». Qutu hər şeyə uyğundur, amma içindəkinin nə olduğunu unutmur (any qutusu isə qara qutudur — nə olduğunu unudur)." },
          { t: "code", lang: "typescript", code: `function ilk<T>(arr: T[]): T | undefined {
  return arr[0];
}

const a = ilk([1, 2, 3]);          // a: number | undefined
const b = ilk(["x", "y"]);         // b: string | undefined

type Cavab<T> = { ok: true; data: T } | { ok: false; xeta: string };

const c: Cavab<number[]> = { ok: true, data: [1, 2] };

const qutu: Array<string> = ["a"];   // daxili generic` },
          { t: "terms", items: [
            ["<T>", "tip parametri — çağırışda konkret tipə çevrilir."],
            ["T[]", "T tipli massiv."],
            ["Cavab<T>", "generic tip alias."],
            ["inference", "T çox vaxt arqumentdən avtomatik çıxarılır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Məhdudiyyətlər (constraints) və keyof",
        blocks: [
          { t: "code", lang: "typescript", code: `function uzun<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
uzun("salam", "hi");      // string
uzun([1, 2], [1]);        // number[]
// uzun(5, 6);            // ✗ number-də length yoxdur

function xasse<T, K extends keyof T>(obj: T, acar: K): T[K] {
  return obj[acar];
}
const user = { ad: "Aysel", yas: 25 };
const yas = xasse(user, "yas");     // number
// xasse(user, "email");            // ✗

function qrupla<T, K extends PropertyKey>(arr: T[], f: (x: T) => K): Record<K, T[]> {
  const n = {} as Record<K, T[]>;
  for (const x of arr) (n[f(x)] ??= []).push(x);
  return n;
}` },
          { t: "mistake", lang: "typescript", wrong: `function ilk(arr: any[]): any {\n  return arr[0];\n}`, right: `function ilk<T>(arr: T[]): T | undefined {\n  return arr[0];\n}`, why: "any ilə tip məlumatı itir: nəticə ilə nə etsən TS susur. Generic tipi «ötürür»." },
          { t: "tip", text: "Tip parametri yalnız bir dəfə işlədilirsə, generic lazım deyil: function f<T>(x: T): void → function f(x: unknown): void." },
        ],
      },
      {
        level: "senior",
        title: "Generic API dizaynı",
        blocks: [
          { t: "code", lang: "typescript", code: `async function api<T>(url: string, parse: (x: unknown) => T): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return parse(await res.json());    // runtime yoxlaması məcburi parametrdir
}

// const user = await api("/api/me", UserSchema.parse);

class Anbar<T extends { id: number }> {
  #items = new Map<number, T>();
  elave(x: T) { this.#items.set(x.id, x); }
  tap(id: number): T | undefined { return this.#items.get(id); }
}` },
          { t: "list", items: [
            "Default tip parametrləri: type Cavab<T = unknown>.",
            "Variance: readonly T[] kovariantdır; mutable massivlər nəzəri olaraq invariant olmalı olsa da TS onları kovariant sayır (praktik güzəşt).",
            "const tip parametrləri (TS 5): function f<const T>(x: T) — literal tipləri saxlayır.",
            "Generic-lər çox mürəkkəbləşəndə (5+ parametr, iç-içə conditional) oxunaqlılıq ölür — sadə overload və ya konkret tiplər daha yaxşı ola bilər.",
            "Təhlükəsizlik: fetch<T>(url): Promise<T> kimi «generic yalan» — heç nə yoxlamadan T qaytarır. Yuxarıdakı kimi parse funksiyasını MƏCBURİ et ki, validasiya unudulmasın.",
          ]},
          { t: "qa", items: [
            ["Generic niyə any-dən yaxşıdır?", "Tip əlaqəsini saxlayır: girişin tipi çıxışa ötürülür, yoxlama itmir."],
            ["T extends X nə deməkdir?", "T yalnız X-ə uyğun tiplər ola bilər (constraint)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "ilk<T>(arr: T[]) funksiyasına [\"a\"] verəndə T nədir?", options: ["any", "string", "string[]"], answer: 1, why: "Element tipi string-dir." },
        ],
      },
    ],
    exercise: {
      task: "1) sonuncu<T>(arr: T[]): T | undefined. 2) cutlesdir<A, B>(a: A[], b: B[]): [A, B][] (zip). 3) secSaheler<T, K extends keyof T>(obj: T, acarlar: K[]): Pick<T, K>. Hər birini fərqli tiplərlə çağır.",
      starter: `// 1)\n// 2)\n// 3)\n`,
      expect: "Generic parametrlər düzgün; keyof constraint; qaytarma tipləri dəqiq; any yoxdur; nümunələr fərqli tiplərlə çağırılır.",
    },
  },
  {
    slug: "sinifler",
    title: "Siniflər",
    intro: "TS sinifləri JS siniflərinə tip, giriş modifikatorları (public, private, protected), readonly, abstract və implements əlavə edir.",
    sections: [
      {
        level: "baslangic",
        title: "Tipli siniflər",
        blocks: [
          { t: "analogy", text: "TS sinfi — möhürlü çertyojdur: hansı otağa kim girə bilər (public/private), hansı divar sökülməz (readonly) — hamısı çertyojda yazılıb və inşaatçı (kompilyator) yoxlayır." },
          { t: "code", lang: "typescript", code: `class Telebe {
  readonly id: number;
  ad: string;
  private ballar: number[] = [];

  constructor(id: number, ad: string) {
    this.id = id;
    this.ad = ad;
  }

  balElaveEt(b: number): void {
    if (b < 0 || b > 100) throw new RangeError("0–100");
    this.ballar.push(b);
  }

  get orta(): number {
    return this.ballar.length ? this.ballar.reduce((s, b) => s + b, 0) / this.ballar.length : 0;
  }
}

const t = new Telebe(1, "Aysel");
t.balElaveEt(90); t.balElaveEt(80);
console.log(t.orta);   // 85
// t.ballar;           // ✗ private` },
          { t: "terms", items: [
            ["public", "hər yerdən (default)."],
            ["private", "yalnız sinif daxilində (TS səviyyəsində)."],
            ["protected", "sinif və törəmələri."],
            ["readonly", "yalnız konstruktorda təyin olunur."],
            ["get", "hesablanan xassə."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Parametr xassələri, implements, abstract",
        blocks: [
          { t: "code", lang: "typescript", code: `interface Saxlanan { saxla(): string }

abstract class Fiqur implements Saxlanan {
  constructor(public readonly ad: string) {}      // parametr xassəsi — qısa yazılış
  abstract sahe(): number;
  saxla(): string { return JSON.stringify({ ad: this.ad, sahe: this.sahe() }); }
}

class Daire extends Fiqur {
  constructor(private r: number) { super("daire"); }
  sahe(): number { return Math.PI * this.r ** 2; }
}

const d = new Daire(2);
console.log(d.saxla());` },
          { t: "list", items: [
            "constructor(private r: number) — xassəni elan edib dərhal təyin edir.",
            "implements sinfin interfeysə uyğunluğunu yoxlayır (heç nə miras vermir).",
            "abstract metod gövdəsizdir — törəmələr məcburi yazır.",
            "override açar sözü (noImplicitOverride ilə) — valideyndə olmayan metodu «override» etməyə çalışanda xəta.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `class A {\n  ad: string;   // strictPropertyInitialization xətası\n}`, right: `class A {\n  constructor(public ad: string) {}\n}`, why: "Strict rejimdə hər xassə konstruktorda və ya elanda dəyər almalıdır — «yarımçıq» obyekt olmasın." },
        ],
      },
      {
        level: "senior",
        title: "private vs #private, nominal davranış",
        blocks: [
          { t: "list", items: [
            "TS private yalnız kompilyasiyadadır — JS-də sahə açıqdır (obj[\"ballar\"] işləyir). JS #private runtime-da da gizlidir. Həqiqi inkapsulyasiya lazımdırsa #.",
            "private/# sahəsi olan siniflər struktural yox, nominal kimi davranır: eyni formalı başqa sinif ona təyin oluna bilmir.",
            "Dekoratorlar (TS 5 standart dekoratorları; NestJS/Angular köhnə experimentalDecorators) — metadata və davranış əlavə edir.",
            "Domen modelləri üçün siniflər, məlumat daşıyıcıları (DTO) üçün düz obyekt tipləri — JSON-a çevrilmə və serializasiya sadə olur.",
            "Təhlükəsizlik: TS private həssas sahəni gizlətmir — JSON.stringify(user) private parol hash-ini də yazır. Cavablarda açıq DTO istifadə et və ya toJSON() ilə idarə et.",
          ]},
          { t: "qa", items: [
            ["private ilə # fərqi?", "private TS-in kompilyasiya yoxlamasıdır; # JS runtime-da əlçatmaz sahədir."],
            ["implements ilə extends fərqi?", "extends kodu miras alır; implements yalnız interfeysə uyğunluğu yoxlayır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "constructor(private ad: string) {} nə edir?", options: ["Yalnız parametr", "private ad xassəsi elan edib təyin edir", "Xəta"], answer: 1, why: "Parametr xassəsi qısa yazılışı." },
        ],
      },
    ],
    exercise: {
      task: "interface Odenis { odeyir(mebleg: number): string }. abstract class Hesab (readonly sahib, protected balans, abstract komissiya(m): number). KartHesabi (1% komissiya) implements Odenis — balans çatmasa xəta. 2 əməliyyat edib nəticəni çap et.",
      starter: `// bura\n`,
      expect: "interface + abstract class + extends + implements; parametr xassələri; protected balans; komissiya hesablanır (1%); yetərsiz balansda Error; readonly sahib dəyişdirilmir; any yoxdur.",
    },
  },
  {
    slug: "utility",
    title: "Utility tiplər",
    intro: "TS-in hazır tip «alətləri»: Partial, Required, Readonly, Pick, Omit, Record, ReturnType, Awaited... Mövcud tiplərdən yenisini təkrar yazmadan yaratmaq.",
    sections: [
      {
        level: "baslangic",
        title: "Partial, Pick, Omit, Record",
        blocks: [
          { t: "analogy", text: "Utility tiplər — paltar dəyişdirmə xidmətidir: eyni kostyumdan (User tipi) qolları qısaldılmış (Omit), yalnız pencək (Pick), bütün düymələri ixtiyari (Partial) versiya tikirsən — yeni kostyum almadan." },
          { t: "code", lang: "typescript", code: `interface User {
  id: number;
  ad: string;
  email: string;
  parolHash: string;
}

type UserYenile = Partial<Omit<User, "id">>;      // id-siz, hamısı ixtiyari
type UserKart = Pick<User, "id" | "ad">;          // yalnız id və ad
type UserPublic = Omit<User, "parolHash">;        // həssas sahə çıxarıldı
type Rollar = Record<"admin" | "user", string[]>; // açar → dəyər

function yenile(id: number, deyisiklik: UserYenile) { /* ... */ }
yenile(1, { ad: "Aysel" });` },
          { t: "terms", items: [
            ["Partial<T>", "bütün xassələr ixtiyari."],
            ["Required<T>", "bütün xassələr məcburi."],
            ["Readonly<T>", "bütün xassələr readonly."],
            ["Pick<T, K>", "yalnız K açarları."],
            ["Omit<T, K>", "K açarlarından başqa hamısı."],
            ["Record<K, V>", "K açarları, V dəyərləri olan obyekt."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Funksiya və union utility-ləri",
        blocks: [
          { t: "code", lang: "typescript", code: `function userYarat(ad: string, yas: number) {
  return { id: Date.now(), ad, yas };
}
type YeniUser = ReturnType<typeof userYarat>;        // { id: number; ad: string; yas: number }
type Arqumentler = Parameters<typeof userYarat>;     // [string, number]

async function getir() { return { ok: true }; }
type Netice = Awaited<ReturnType<typeof getir>>;     // { ok: boolean }

type Status = "aktiv" | "bloklanib" | "silinib";
type Gorunen = Exclude<Status, "silinib">;           // "aktiv" | "bloklanib"
type Yalniz = Extract<Status, "aktiv" | "x">;        // "aktiv"
type Var = NonNullable<string | null | undefined>;   // string` },
          { t: "mistake", lang: "typescript", wrong: `interface UserCavab {\n  id: number;\n  ad: string;\n  email: string;\n}  // User-in əl ilə surəti — sinxron qalmayacaq`, right: `type UserCavab = Omit<User, "parolHash">;`, why: "Tipləri əl ilə təkrar yazanda User dəyişəndə surət köhnəlir. Törəmə tiplər mənbədən avtomatik yenilənir." },
        ],
      },
      {
        level: "senior",
        title: "Utility-lər necə qurulub",
        blocks: [
          { t: "code", lang: "typescript", code: `// Partial-ın özü — mapped type
type MeninPartial<T> = { [K in keyof T]?: T[K] };

// Dərin readonly
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] };

// Omit təhlükəsizliyi: Omit<User, "parol"> — səhv yazılmış açar XƏTA vermir!
type StrictOmit<T, K extends keyof T> = Omit<T, K>;
// type X = StrictOmit<User, "parol">;   // ✗ — "parol" User-də yoxdur` },
          { t: "list", items: [
            "Omit<T, K>-da K keyof T ilə məhdudlaşdırılmayıb — açarın adında yazı səhvi səssiz keçir və həssas sahə ÇIXARILMIR. StrictOmit və ya Pick (ağ siyahı) daha etibarlıdır.",
            "Təhlükəsizlik: API cavabı üçün Pick (ağ siyahı) Omit-dən (qara siyahı) təhlükəsizdir — User-ə yeni həssas sahə (twoFactorSecret) əlavə olunanda Omit-li tip onu avtomatik cavaba buraxır, Pick buraxmır.",
            "Partial<T> PATCH sorğuları üçün rahatdır, amma runtime-da da yalnız icazəli sahələri qəbul et — tip mass assignment-dan qorumur.",
            "Mürəkkəb utility zəncirləri xəta mesajlarını oxunmaz edir — ara adlı tiplər yarat.",
          ]},
          { t: "qa", items: [
            ["Pick ilə Omit-dən hansı təhlükəsizdir və niyə?", "Pick — ağ siyahıdır; yeni sahələr avtomatik daxil olmur. Omit yeni (bəlkə həssas) sahələri buraxır."],
            ["ReturnType nə edir?", "Funksiya tipinin qaytarma tipini çıxarır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Bütün xassələri ixtiyari edən utility:", options: ["Required", "Partial", "Pick"], answer: 1, why: "Partial hər xassəyə ? əlavə edir." },
        ],
      },
    ],
    exercise: {
      task: "interface Mehsul (id, ad, qiymet, stok, daxiliQeyd). 1) MehsulYarat = Omit<Mehsul, \"id\">. 2) MehsulYenile = Partial<MehsulYarat>. 3) MehsulPublic — Pick ilə yalnız id, ad, qiymet. 4) Record<Kateqoriya, Mehsul[]> ilə qruplaşdırma. Hər tipdən bir dəyər yarat.",
      starter: `interface Mehsul {\n  id: number;\n  ad: string;\n  qiymet: number;\n  stok: number;\n  daxiliQeyd: string;\n}\ntype Kateqoriya = "kitab" | "texnika";\n\n// bura\n`,
      expect: "Omit, Partial, Pick, Record düzgün; public tipdə daxiliQeyd yoxdur (Pick ilə); nümunə dəyərlər tiplərə uyğun; əl ilə təkrarlanmış interface yoxdur.",
    },
  },
  {
    slug: "enum",
    title: "Enum və literal tiplər",
    intro: "Sabit seçimlər dəsti: status, rol, istiqamət. TS-də iki yol var — enum və literal union. Müasir layihələrdə çox vaxt ikincisi üstündür.",
    sections: [
      {
        level: "baslangic",
        title: "Literal union və enum",
        blocks: [
          { t: "analogy", text: "Svetoforun yalnız 3 rəngi var: qırmızı, sarı, yaşıl. «Bənövşəyi» yazmaq olmaz. Literal tiplər məhz bunu təmin edir: dəyər yalnız icazəli siyahıdan ola bilər." },
          { t: "code", lang: "typescript", code: `type Isiq = "qirmizi" | "sari" | "yasil";
let i: Isiq = "sari";
// i = "benovseyi";   // ✗

enum Rol {
  Admin = "ADMIN",
  Muellim = "MUELLIM",
  Telebe = "TELEBE",
}
const r: Rol = Rol.Muellim;
console.log(r);                // "MUELLIM"

enum Istiqamet { Yuxari, Asagi }   // rəqəmsal: 0, 1
console.log(Istiqamet.Asagi, Istiqamet[1]);   // 1 "Asagi"` },
          { t: "terms", items: [
            ["literal tip", "konkret dəyər tip kimi: \"sari\", 42, true."],
            ["literal union", "icazəli dəyərlər siyahısı."],
            ["enum", "adlı sabitlər toplusu — runtime-da obyekt yaradır."],
            ["string enum", "hər üzvün açıq string dəyəri var."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "as const obyekt — enum-un müasir əvəzi",
        blocks: [
          { t: "code", lang: "typescript", code: `const ROL = {
  Admin: "admin",
  Muellim: "muellim",
  Telebe: "telebe",
} as const;

type Rol = (typeof ROL)[keyof typeof ROL];   // "admin" | "muellim" | "telebe"

function icaze(rol: Rol): boolean {
  return rol === ROL.Admin || rol === ROL.Muellim;
}

const ROLLAR = Object.values(ROL);           // runtime siyahısı da var
function isRol(x: string): x is Rol {
  return (ROLLAR as readonly string[]).includes(x);
}` },
          { t: "list", items: [
            "Literal union: sıfır runtime kodu, sadə, JSON-la uyğundur.",
            "as const obyekt: həm adlı sabitlər (ROL.Admin), həm runtime siyahı, həm tip.",
            "Rəqəmsal enum-lar zəif tiplidir: köhnə TS-də Istiqamet tipinə istənilən ədəd təyin olunurdu.",
            "Node-un «type stripping» rejimi və bəzi transpilyatorlar enum-u dəstəkləmir (runtime kodu yaradır) — tsconfig-də erasableSyntaxOnly.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `if (user.rol === "admn") { ... }  // rol: string`, right: `type Rol = "admin" | "user";\n// user.rol: Rol → "admn" yazanda xəta`, why: "string tipli sahə yazı səhvlərini tutmur; literal union tutur." },
        ],
      },
      {
        level: "senior",
        title: "Template literal tiplər və sabit dəstlər",
        blocks: [
          { t: "code", lang: "typescript", code: `type Hadise = "klik" | "fokus";
type Handler = \`on\${Capitalize<Hadise>}\`;   // "onKlik" | "onFokus"

type Route = \`/\${"frontend" | "backend"}/\${string}\`;
const r: Route = "/frontend/html";            // ✓
// const x: Route = "/admin/x";               // ✗

const enum Bayraq { A = 1, B = 2 }           // inline olunur (izolə modullarda problemli)` },
          { t: "list", items: [
            "Template literal tiplər URL, CSS sinif adları, hadisə adları kimi string naxışlarını tip səviyyəsində məhdudlaşdırır.",
            "const enum kompilyasiyada inline olunur, amma isolatedModules (Next, Vite, esbuild) ilə uyğun deyil.",
            "Enum-u API sərhədində string kimi göndər — rəqəm dəyərləri (0, 1) sıra dəyişəndə məna dəyişir və köhnə klientləri sındırır.",
            "Təhlükəsizlik: serverə gələn rol/status string-ini literal union-a qarşı runtime-da yoxla (isRol) — tip annotasiyası istifadəçinin \"superadmin\" göndərməsini dayandırmır. Bilinməyən dəyər → rədd et (deny by default).",
          ]},
          { t: "qa", items: [
            ["enum yoxsa literal union?", "Çox vaxt literal union (və ya as const obyekt): runtime kodu yoxdur, sadədir; enum köhnə kod bazalarında və C#-dan gələnlər üçün tanışdır."],
            ["Rəqəmsal enum-un problemi?", "Zəif tip təhlükəsizliyi və sıra dəyişəndə dəyərlərin dəyişməsi."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "type T = \"a\" | \"b\"; const x: T = \"c\" — nəticə?", options: ["İşləyir", "Kompilyasiya xətası", "Runtime xətası"], answer: 1, why: "\"c\" icazəli literal deyil." },
        ],
      },
    ],
    exercise: {
      task: "SIFARIS_STATUS as const obyekti (gozleyir, hazirlanir, catdirildi, legv). Ondan Status tipi çıxar. isStatus(x: string) guard yaz. novbeti(s: Status): Status | null — statusun növbəti mərhələsini qaytarsın (legv və catdirildi üçün null).",
      starter: `// bura\n`,
      expect: "as const obyekt + (typeof X)[keyof typeof X]; guard Object.values ilə includes; novbeti switch və ya xəritə ilə, bütün hallar əhatə olunub; enum işlədilməsə də olar; any yoxdur.",
    },
  },
  {
    slug: "modullar",
    title: "Modullar və tsconfig",
    intro: "TS layihəsinin «idarə paneli» tsconfig.json-dur: strictlik, modul sistemi, yollar. Bir də: tipləri import/export etmək, .d.ts faylları.",
    sections: [
      {
        level: "baslangic",
        title: "Tipləri paylaşmaq",
        blocks: [
          { t: "analogy", text: "tsconfig — avtomobilin rejim düyməsidir: «eko», «idman», «qış». Eyni maşın (kod), amma davranış (yoxlamaların sərtliyi, çıxış formatı) bu ayarlardan asılıdır." },
          { t: "code", lang: "typescript", code: `// types.ts
export interface User { id: number; ad: string }
export type Rol = "admin" | "user";

// service.ts
import type { User, Rol } from "./types";   // yalnız tip — JS-ə düşmür
import { formatla } from "./utils";

export function goster(u: User, r: Rol): string {
  return formatla(u.ad) + " (" + r + ")";
}` },
          { t: "terms", items: [
            ["import type", "yalnız tip importu — kompilyasiyada tamamilə silinir."],
            ["tsconfig.json", "kompilyator ayarları."],
            [".d.ts", "yalnız tip elanları (declaration) faylı."],
            ["@types/paket", "JS kitabxanaları üçün tip paketləri (DefinitelyTyped)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Vacib tsconfig ayarları",
        blocks: [
          { t: "code", lang: "json", code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}` },
          { t: "list", items: [
            "strict — strictNullChecks, noImplicitAny və s. paketini açır. Yeni layihədə həmişə true.",
            "target — hansı JS versiyasına çevrilsin; module/moduleResolution — import-lar necə həll olunsun (Next/Vite üçün Bundler).",
            "paths — @/components kimi qısa yollar (bundler-də də eyni alias olmalıdır).",
            "skipLibCheck — node_modules-dakı .d.ts-ləri yoxlamır, build-i sürətləndirir.",
          ]},
          { t: "mistake", lang: "json", wrong: `{ "compilerOptions": { "strict": false } }`, right: `{ "compilerOptions": { "strict": true } }`, why: "strict olmadan null/undefined xətaları və gizli any-lər TS-in tutmalı olduğu bug-ların əksəriyyətini buraxır." },
        ],
      },
      {
        level: "senior",
        title: "Monorepo, project references, tədarük zənciri",
        blocks: [
          { t: "list", items: [
            "Project references (composite: true) — monorepoda paketləri ayrıca və artımlı (incremental) yoxlamaq; tsc -b.",
            "Kitabxana yazırsansa: declaration: true ilə .d.ts yarat, package.json-da exports + types sahələri.",
            "verbatimModuleSyntax — import type məcburiyyəti; tip importlarının JS-ə «sızmasının» qarşısını alır.",
            "Tip yoxlaması CI-də ayrıca addım olsun (tsc --noEmit) — bundler-lər (esbuild, swc) tipləri yoxlamadan silir.",
            "Təhlükəsizlik: @types paketləri də npm paketidir — typosquatting (@types/reakt) mümkündür. Lock faylı və rəsmi DefinitelyTyped mənbəyi.",
            "Təhlükəsizlik: paths alias-ları server kodunu klient bundle-ına təsadüfən salmağa imkan verə bilər — server-only modulları (açarlar, DB) \"server-only\" paketi və ya ayrı qovluqla qoru.",
          ]},
          { t: "qa", items: [
            ["import type niyə lazımdır?", "Tip importunun JS-də iz buraxmamasını təmin edir; dövri asılılıq və yan təsirli importların qarşısını alır."],
            ["Bundler tip xətalarını tutur?", "Xeyr, esbuild/swc tipləri sadəcə silir; yoxlama üçün tsc --noEmit lazımdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yeni layihədə strict ayarı:", options: ["false", "true", "fərq etmir"], answer: 1, why: "strict TS-in əsas faydasını verir." },
        ],
      },
    ],
    exercise: {
      task: "İki faylı şərhlə təsvir et: types.ts (export interface Kurs, export type Seviyye) və main.ts (import type ilə al, kurslari filtrlə funksiyası). Sonra məşq üçün hamısını bir faylda işlək yaz. Əlavə olaraq strict tsconfig-in 4 vacib ayarını şərhdə sadala və nə etdiyini yaz.",
      starter: `// types.ts\n\n// main.ts\n\n// tsconfig qeydləri:\n`,
      expect: "export/import type sintaksisi düzgün; filtr funksiyası tipli; tsconfig şərhində strict, noUncheckedIndexedAccess, moduleResolution, paths/isolatedModules kimi ayarlar izahla.",
    },
  },
  {
    slug: "kecid",
    title: "Senior: conditional və mapped tiplər",
    intro: "Tiplərlə «proqramlaşdırma»: şərtli tiplər (T extends U ? X : Y), infer, mapped tiplər və key remapping. Kitabxana müəlliflərinin və senior-ların aləti.",
    sections: [
      {
        level: "baslangic",
        title: "Tip səviyyəsində if",
        blocks: [
          { t: "analogy", text: "Conditional tip — tip fabrikindəki çeşidləmə maşınıdır: «gələn qutu massivdirsə, içindəki elementin tipini çıxar; deyilsə, olduğu kimi burax»." },
          { t: "code", lang: "typescript", code: `type MassivdirMi<T> = T extends unknown[] ? "bəli" : "xeyr";
type A = MassivdirMi<number[]>;   // "bəli"
type B = MassivdirMi<string>;     // "xeyr"

type Element<T> = T extends (infer E)[] ? E : T;
type C = Element<string[]>;       // string
type D = Element<number>;         // number` },
          { t: "terms", items: [
            ["T extends U ? X : Y", "conditional tip — T U-ya uyğundursa X, yoxsa Y."],
            ["infer E", "uyğunluq zamanı tipin bir hissəsini «tutub» adlandırmaq."],
            ["mapped type", "{ [K in keyof T]: ... } — hər açar üçün yeni tip."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Mapped tiplər və key remapping",
        blocks: [
          { t: "code", lang: "typescript", code: `type Nullable<T> = { [K in keyof T]: T[K] | null };

type Getterler<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
interface User { ad: string; yas: number }
type UG = Getterler<User>;   // { getAd: () => string; getYas: () => number }

// Yalnız funksiya xassələrini saxla
type Metodlar<T> = { [K in keyof T as T[K] extends (...a: never[]) => unknown ? K : never]: T[K] };

// Distributiv conditional
type Siz<T> = T extends null | undefined ? never : T;
type E = Siz<string | null | number>;   // string | number` },
          { t: "list", items: [
            "as ilə açar yenidən adlandırılır; never qaytarsan açar silinir (filtrləmə).",
            "Çılpaq T üzərində conditional union-da hər üzvə ayrıca tətbiq olunur (distributive). Söndürmək üçün [T] extends [U].",
            "Readonly, Partial, Pick, Record — hamısı mapped tiplərdir.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `type Deep<T> = { [K in keyof T]: Deep<T[K]> };  // primitivlərdə də dərinə gedir`, right: `type Deep<T> = T extends object ? { [K in keyof T]: Deep<T[K]> } : T;`, why: "Bazis hal olmayan rekursiv tip ya mənasız nəticə, ya «Type instantiation is excessively deep» xətası verir." },
        ],
      },
      {
        level: "senior",
        title: "Real nümunələr və hədlər",
        blocks: [
          { t: "code", lang: "typescript", code: `// Route parametrlərini string-dən çıxarmaq
type Params<S extends string> =
  S extends \`\${string}:\${infer P}/\${infer Rest}\` ? { [K in P | keyof Params<Rest>]: string }
  : S extends \`\${string}:\${infer P}\` ? { [K in P]: string }
  : {};

type X = Params<"/kurs/:kursId/ders/:dersId">;   // { kursId: string; dersId: string }

// Hadisə xəritəsindən tipli emit
type Hadiseler = { login: { userId: number }; logout: undefined };
declare function emit<K extends keyof Hadiseler>(ad: K, data: Hadiseler[K]): void;
emit("login", { userId: 1 });` },
          { t: "list", items: [
            "Bu texnikalar tRPC, Prisma, zod, Next.js typed routes kimi kitabxanaların əsasıdır.",
            "Tip səviyyəsində mürəkkəblik kompilyasiya vaxtını və IDE sürətini öldürə bilər — tsc --extendedDiagnostics ilə ölç.",
            "Tətbiq kodunda «ağıllı» tiplərdən qaç; onları paylaşılan kitabxana/infrastruktur qatında saxla, komanda üçün sənədləşdir.",
            "Təhlükəsizlik: tipli route parametrləri yalnız formanı yoxlayır — kursId-nin istifadəçiyə aid olub-olmadığını (yetki) serverdə yoxlamaq lazımdır.",
          ]},
          { t: "qa", items: [
            ["infer nə edir?", "Conditional tip daxilində uyğunlaşan tipin bir hissəsini dəyişənə «tutur»."],
            ["Distributive conditional nədir?", "Çılpaq tip parametri union olanda conditional hər üzvə ayrıca tətbiq olunur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "type R<T> = T extends string ? 1 : 0; R<\"a\" | 5> = ?", options: ["1", "0", "1 | 0"], answer: 2, why: "Distributiv: \"a\" → 1, 5 → 0." },
        ],
      },
    ],
    exercise: {
      task: "1) PromiseIci<T> — Promise<X>-dən X-i çıxar (infer), Promise deyilsə T. 2) Optional<T, K extends keyof T> — yalnız K açarlarını ixtiyari et. 3) EventHandlers<T> — { klik: ..., fokus: ... } tipindən { onKlik: () => void; onFokus: () => void } yarat (key remapping). Hər biri üçün nümunə tip yaz.",
      starter: `// 1)\n// 2)\n// 3)\n`,
      expect: "T extends Promise<infer X> ? X : T; Omit<T, K> & Partial<Pick<T, K>>; [K in keyof T as `on${Capitalize<string & K>}`]: () => void; nümunə tiplər düzgün nəticə verir.",
    },
  },
  {
    slug: "senior",
    title: "Senior: tip təhlükəsiz arxitektura",
    intro: "Böyük layihədə TS-dən maksimum: sərhəddə validasiya, son-to-son (end-to-end) tiplər, domen modelləri, xəta tipləri və komanda qaydaları.",
    sections: [
      {
        level: "baslangic",
        title: "Prinsiplər",
        blocks: [
          { t: "analogy", text: "Ölkə sərhədində pasport yoxlaması bir dəfə ciddi aparılır; içəridə hər küçədə pasport soruşmurlar. Kodda da belədir: xaricdən gələn məlumat SƏRHƏDDƏ (API, form, env) yoxlanır, içəridə tiplərə güvənirsən." },
          { t: "list", items: [
            "Parse, don't validate: unknown-u bir dəfə yoxlayıb dəqiq tipə çevir (User), sonra kod yalnız User ilə işləsin.",
            "Qeyri-mümkün vəziyyətləri tiplərlə qadağan et (discriminated union).",
            "any = texniki borc. ESLint: @typescript-eslint/no-explicit-any, no-unsafe-*.",
            "Mühit dəyişənlərini də start zamanı validasiya et — çatışmayan açar prodda gec yox, dərhal üzə çıxsın.",
          ]},
          { t: "code", lang: "typescript", code: `import { z } from "zod";

const Env = z.object({
  DATABASE_URL: z.string().url(),
  GEMINI_API_KEY: z.string().min(10),
});
export const env = Env.parse(process.env);   // səhvdirsə tətbiq başlamır` },
        ],
      },
      {
        level: "orta",
        title: "Xətaları tipləşdirmək və son-to-son tiplər",
        blocks: [
          { t: "code", lang: "typescript", code: `type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

type QeydiyyatXetasi = "email_var" | "zeif_parol";

async function qeydiyyat(email: string, parol: string): Promise<Result<{ id: number }, QeydiyyatXetasi>> {
  if (parol.length < 12) return { ok: false, error: "zeif_parol" };
  // ...
  return { ok: true, value: { id: 1 } };
}

const r = await qeydiyyat("a@b.az", "qisa");
if (!r.ok) {
  // r.error: "email_var" | "zeif_parol" — hər birini emal etməyə məcbursan
}` },
          { t: "list", items: [
            "Gözlənilən xətalar tipdə görünsün (Result); gözlənilməzlər — throw.",
            "Son-to-son tiplər: server sxemi → klient tipi avtomatik (tRPC, OpenAPI generator, Next.js server actions). Əl ilə sinxronlaşdırılan DTO-lar köhnəlir.",
            "Branded ID-lər: UserId, KursId qarışmasın.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `// @ts-ignore\nconst x = riskli();`, right: `// @ts-expect-error — kitabxana tipi səhvdir, issue #123\nconst x = riskli();`, why: "@ts-ignore problem həll olunandan sonra da susur. @ts-expect-error xəta yox olanda özü xəbərdarlıq edir və səbəb yazılır." },
        ],
      },
      {
        level: "senior",
        title: "Təhlükəsizlik və komanda miqyası",
        blocks: [
          { t: "list", items: [
            "Təhlükəsizlik: sərhəd validasiyası təkcə tip deyil — uzunluq, aralıq, format, ağ siyahı (z.string().max(200), z.enum([...])). Sxemsiz req.body birbaşa DB-yə getməsin (mass assignment, NoSQL injection).",
            "Təhlükəsizlik: sxemlərdə .strict() — gözlənilməyən sahələri rədd et (isAdmin göndərilsə xəta).",
            "Təhlükəsizlik: server-only kodu (açarlar, DB klienti) klient bundle-ına düşməsin — import \"server-only\"; env-ləri NEXT_PUBLIC_ prefiksi ilə yalnız açıq olanları ver.",
            "Tip sağlamlığı metrikası: any sayı, ts-ignore sayı, strict bayraqlar — CI-də izlə.",
            "Miqrasiya strategiyası: köhnə JS layihəsində allowJs + checkJs + JSDoc tiplər, sonra fayl-fayl .ts.",
            "Performans: böyük monorepoda project references, incremental, tsc --generateTrace ilə yavaş tipləri tap.",
          ]},
          { t: "qa", items: [
            ["«Parse, don't validate» nə deməkdir?", "Xam məlumatı bir dəfə yoxlayıb dəqiq tipə çevirmək, sonra kodun qalanında yenidən yoxlamamaq — tip artıq zəmanətdir."],
            ["TS layihəsində təhlükəsizliyin əsas qaydası?", "Tiplər runtime zəmanəti vermir: bütün xarici girişləri sxemlə yoxla, gözlənilməz sahələri rədd et."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Xarici məlumat harada yoxlanmalıdır?", options: ["Hər funksiyada", "Sərhəddə (giriş nöqtəsində)", "Heç yerdə — TS kifayətdir"], answer: 1, why: "Bir dəfə sərhəddə; içəridə tiplərə güvən." },
        ],
      },
    ],
    exercise: {
      task: "Result<T, E> tipi yaz. parseYas(x: unknown): Result<number, \"ededdeyil\" | \"araliq\"> — ədəd deyilsə və 0–150 xaricindədirsə uyğun xəta. Sonra 4 girişi emal edib hər xəta növü üçün fərqli Azərbaycanca mesaj çap et (switch + exhaustive).",
      starter: `type Result<T, E> = // bura\n\nfunction parseYas(x: unknown) {\n  // bura\n}\n\nfor (const g of [25, "30", -4, 200]) {\n  // bura\n}\n`,
      expect: "discriminated Result; parseYas typeof/Number.isFinite yoxlaması, aralıq; qaytarma tipi açıq; switch(error) hər hal + never yoxlaması; throw yox, Result işlədilir; any yoxdur.",
    },
  },
];
