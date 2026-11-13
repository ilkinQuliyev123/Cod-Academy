import type { Lesson } from "../types";

export const csharp: Lesson[] = [
  {
    slug: "giris",
    title: "C# və .NET nədir? İlk proqram",
    intro: "C# Microsoft-un güclü, tipli, obyekt yönümlü dilidir. .NET platformasında işləyir: veb API (ASP.NET Core), masaüstü, oyun (Unity), bulud xidmətləri.",
    sections: [
      {
        level: "baslangic",
        title: "İlk proqram",
        blocks: [
          { t: "analogy", text: "C# — sənin yazdığın resept, .NET — mətbəx (sobalar, qablar, aşpazlar). Resepti (kodu) kompilyator əvvəlcə ümumi dilə (IL) tərcümə edir, sonra mətbəx (CLR) onu sənin kompüterinə uyğun bişirir." },
          { t: "code", lang: "csharp", code: `// Program.cs — müasir (top-level) yazılış
Console.WriteLine("Salam, dünya!");

string ad = "Aysel";
Console.WriteLine($"Xoş gəldin, {ad}!");` },
          { t: "code", lang: "csharp", code: `// Klassik yazılış — böyük layihələrdə görəcəksən
namespace KodAkademiyasi;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Salam!");
    }
}`, caption: "Hər iki forma eyni işi görür" },
          { t: "terms", items: [
            ["Console.WriteLine", "konsola yazır və yeni sətrə keçir."],
            ["$\"...{ad}\"", "string interpolasiya — dəyişəni mətnin içinə qoyur."],
            ["namespace", "sinifləri qruplaşdıran ad sahəsi (qovluq kimi)."],
            ["class", "kodun əsas «qutusu» — C#-da hər şey sinif içindədir."],
            ["static void Main", "proqramın başlanğıc nöqtəsi."],
            [";", "hər əmrin sonu — məcburidir."],
          ]},
          { t: "tip", text: "Quraşdırma: .NET SDK yüklə → terminalda: dotnet new console -n IlkProqram → cd IlkProqram → dotnet run." },
        ],
      },
      {
        level: "orta",
        title: "Necə işləyir və nə ilə yazılır",
        blocks: [
          { t: "list", items: [
            "C# kompilyasiya olunan dildir: xəta kod İŞƏ DÜŞMƏMİŞ tapılır (Python/JS-dən fərqli).",
            "Tipli (statically typed): hər dəyişənin tipi var, string-ə ədəd yazmaq olmur.",
            "Böyük/kiçik hərfə həssasdır: Console ≠ console.",
            "IDE: Visual Studio, JetBrains Rider və ya VS Code + C# Dev Kit.",
            "Adlandırma: sinif və metodlar PascalCase (WriteLine), dəyişənlər camelCase (tamAd).",
          ]},
          { t: "mistake", lang: "csharp", wrong: `console.writeline("Salam")`, right: `Console.WriteLine("Salam");`, why: "C# hərfə həssasdır və nöqtəli vergül tələb edir. Kompilyator bunu dərhal göstərir." },
          { t: "mistake", lang: "csharp", wrong: `Console.WriteLine('Salam');`, right: `Console.WriteLine("Salam");`, why: "Tək dırnaq yalnız TƏK simvol (char) üçündür: 'A'. Mətn — cüt dırnaq." },
        ],
      },
      {
        level: "senior",
        title: "CLR, IL, JIT və AOT",
        blocks: [
          { t: "p", text: "Roslyn kompilyatoru C#-ı IL-ə (Intermediate Language) çevirir və .dll faylına yazır. İcrada CLR (Common Language Runtime) IL-i JIT (Just-In-Time) ilə maşın koduna çevirir; tez-tez çağırılan metodları tiered compilation ilə yenidən optimallaşdırır. Native AOT isə əvvəlcədən maşın kodu yaradır — sürətli başlanğıc, kiçik yaddaş (serverless, konteynerlər)." },
          { t: "list", items: [
            "CLR yaddaşı özü idarə edir (Garbage Collector) — C++-dakı kimi delete yazmırsan.",
            "Type safety və massiv sərhəd yoxlaması buffer overflow kimi yaddaş zəifliklərinin böyük hissəsini aradan qaldırır (unsafe blokları istisna).",
            ".NET açıq mənbəlidir, Linux/macOS/Windows-da işləyir; LTS versiyaları 3 il dəstəklənir — istehsalda LTS seç.",
            "Təhlükəsizlik: NuGet paketlərini yoxla (dotnet list package --vulnerable), sirləri appsettings.json-a yox, User Secrets / mühit dəyişənləri / Key Vault-a yaz.",
          ]},
          { t: "qa", items: [
            ["IL və JIT nədir?", "IL — platformadan asılı olmayan ara kod; JIT onu icra zamanı konkret prosessorun koduna çevirir."],
            ["C# ilə .NET fərqi?", "C# dildir, .NET isə runtime (CLR), standart kitabxana və alətlərdən ibarət platformadır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "C#-da mətn hansı dırnaqla yazılır?", options: ["'mətn'", "\"mətn\"", "`mətn`"], answer: 1, why: "Cüt dırnaq — string, tək dırnaq — char." },
        ],
      },
    ],
    exercise: {
      task: "ad, şəhər və yaş dəyişənləri yarat və interpolasiya ilə \"Mən Aysel, Bakıdanam, 25 yaşım var.\" çap et. Sonra gələn il neçə yaşın olacağını ayrıca sətirdə yaz.",
      starter: `// C# (məşq səhifəsində işə salınmır — AI yoxlayır)\nstring ad = "Aysel";\n\n`,
      expect: "string, int tipləri düzgün; Console.WriteLine($\"...{ad}...\") interpolasiya; nöqtəli vergüllər; yaş + 1 hesablanır.",
    },
  },
  {
    slug: "deyisenler",
    title: "Dəyişənlər və tiplər",
    intro: "C#-da hər dəyişənin tipi var və dəyişmir. Bu, səhvləri kod işə düşməmiş tutur. int, double, decimal, string, bool, var və null-lar.",
    sections: [
      {
        level: "baslangic",
        title: "Əsas tiplər",
        blocks: [
          { t: "analogy", text: "C# dəyişəni etiketli qabdır: «Yalnız süd» yazılmış butulkaya şirə tökə bilməzsən. Tip — qabın üstündəki yazıdır, kompilyator — qapıdakı yoxlayıcı." },
          { t: "code", lang: "csharp", code: `int yas = 25;               // tam ədəd
long ehali = 10_200_000L;   // böyük tam ədəd
double boy = 1.68;          // kəsr (sürətli, təxmini)
decimal qiymet = 19.99m;    // pul üçün (dəqiq)
bool aktiv = true;
char herf = 'A';
string ad = "Aysel";

var seher = "Bakı";         // tip avtomatik: string
const double PI = 3.14159;  // sabit

Console.WriteLine($"{ad}, {yas}, {qiymet:C}");` },
          { t: "terms", items: [
            ["int / long", "32 / 64 bitlik tam ədəd."],
            ["double", "64 bitlik kəsr (elmi hesablamalar)."],
            ["decimal", "128 bitlik dəqiq onluq — pul. Sonunda m."],
            ["bool", "true / false (kiçik hərflə)."],
            ["var", "tipi kompilyator çıxarır — amma tip yenə sabitdir."],
            ["const", "kompilyasiya zamanı sabit."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Çevirmə və null",
        blocks: [
          { t: "code", lang: "csharp", code: `int a = 10;
double b = a;               // gizli çevirmə — itki yoxdur
int c = (int)9.8;           // açıq (cast) — 9, kəsr atılır

int yas = int.Parse("25");
if (int.TryParse("abc", out int netice))
    Console.WriteLine(netice);
else
    Console.WriteLine("Ədəd deyil");

string? email = null;       // ? — null ola bilər
int? bal = null;            // nullable int
Console.WriteLine(email ?? "email yoxdur");
Console.WriteLine(email?.Length);` },
          { t: "mistake", lang: "csharp", wrong: `int yas = int.Parse(Console.ReadLine());`, right: `if (!int.TryParse(Console.ReadLine(), out int yas))\n{\n    Console.WriteLine("Yanlış yaş");\n    return;\n}`, why: "İstifadəçi «abc» yazsa Parse FormatException atır və proqram çökür. TryParse uğuru bool kimi qaytarır." },
          { t: "mistake", lang: "csharp", wrong: `double cem = 0.1 + 0.2;  // 0.30000000000000004`, right: `decimal cem = 0.1m + 0.2m;  // 0.3`, why: "double ikilik sistemdədir və pulda xəta toplanır. Maliyyə üçün decimal." },
        ],
      },
      {
        level: "senior",
        title: "Value vs reference, overflow, nullable reference types",
        blocks: [
          { t: "p", text: "Value tiplər (int, double, bool, struct) dəyərin özünü saxlayır və kopyalanır. Reference tiplər (string, class, massiv) heap-dəki obyektə istinad saxlayır. string reference tipdir, amma immutable-dır — ona görə dəyər kimi davranır." },
          { t: "code", lang: "csharp", code: `int max = int.MaxValue;
int dasdi = max + 1;               // -2147483648 — səssiz overflow!
// checked { int x = max + 1; }     // OverflowException

#nullable enable
string ad = null;                  // xəbərdarlıq: null təyin olunur` },
          { t: "list", items: [
            "Default olaraq tam ədəd overflow-u yoxlanmır — «checked» kontekst və ya layihədə <CheckForOverflowUnderflow> aç.",
            "Nullable reference types (NRT) yeni layihələrdə aktivdir: string? və string fərqlidir — NullReferenceException-ların çoxunu kompilyator tutur.",
            "Təhlükəsizlik: overflow real zəiflik ola bilər — məs. miqdar × qiymət daşır və mənfi məbləğ olur, ödəniş yoxlaması keçilir. Pul və miqdar hesablamalarında checked və sərhəd yoxlaması.",
            "Təhlükəsizlik: istifadəçidən gələn rəqəmi həmişə TryParse + aralıq yoxlaması (0 < miqdar <= 100) ilə qəbul et.",
          ]},
          { t: "qa", items: [
            ["decimal və double fərqi?", "double ikilik, sürətli, təxmini; decimal onluq, dəqiq, yavaş — pul üçün."],
            ["var dinamik tipdir?", "Xeyr. Tip kompilyasiya zamanı çıxarılır və dəyişmir; dinamik olan dynamic-dir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Pul məbləği üçün tip:", options: ["double", "decimal", "float"], answer: 1, why: "decimal onluq hesabda dəqiqdir." },
          { t: "quiz", q: "(int)7.9 nəticəsi:", options: ["8", "7", "xəta"], answer: 1, why: "Cast kəsri atır, yuvarlaqlaşdırmır." },
        ],
      },
    ],
    exercise: {
      task: "Mətn kimi verilən \"12\" miqdarı və 4.75m qiyməti ilə ümumi məbləği hesabla. Miqdarı TryParse ilə çevir, uğursuzsa xəbər ver. Nəticəni decimal ilə və 2 rəqəmlə çap et. Endirim kodu string? olsun və ?? ilə \"yoxdur\" göstər.",
      starter: `string miqdarMetn = "12";\ndecimal qiymet = 4.75m;\nstring? endirimKodu = null;\n\n// bura\n`,
      expect: "int.TryParse(miqdarMetn, out int miqdar) uğursuzluq halı ilə; decimal cem = miqdar * qiymet → 57.00; {cem:F2} və ya :C; endirimKodu ?? \"yoxdur\"; double işlədilməyib.",
    },
  },
  {
    slug: "operatorlar",
    title: "Operatorlar",
    intro: "C# operatorları JS və Python-a bənzəyir, amma tipli dünyada: int / int tam bölmədir, == tipləri çevirmir, ?? və ?. null ilə işləməyi asanlaşdırır.",
    sections: [
      {
        level: "baslangic",
        title: "Riyazi, müqayisə, məntiqi",
        blocks: [
          { t: "analogy", text: "C# kalkulyatoru «tip»ə baxır: iki tam ədədi bölsən, cavab da tam olur (7 / 2 = 3) — sanki kalkulyator kəsr düyməsini gizlədib. Kəsr istəyirsənsə, ədədlərdən biri kəsr olmalıdır." },
          { t: "code", lang: "csharp", code: `Console.WriteLine(7 + 2);    // 9
Console.WriteLine(7 / 2);    // 3   — int / int
Console.WriteLine(7 / 2.0);  // 3.5
Console.WriteLine(7 % 2);    // 1

int say = 5;
say++;          // 6
say += 10;      // 16

bool netice = say > 10 && say < 20;   // true
bool ya = say == 0 || say == 16;      // true
bool deyil = !netice;                 // false` },
          { t: "terms", items: [
            ["/", "bölmə; hər iki tərəf tamdırsa nəticə tam."],
            ["%", "qalıq."],
            ["&& / || / !", "və / və ya / deyil (qısa dövrəli)."],
            ["==, !=", "bərabər / bərabər deyil."],
            ["++ / --", "1 artır / azalt."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Ternary, null operatorları, string müqayisəsi",
        blocks: [
          { t: "code", lang: "csharp", code: `int bal = 75;
string status = bal >= 50 ? "keçdi" : "kəsildi";

string? ad = null;
string goster = ad ?? "Qonaq";     // null-dursa sağ tərəf
ad ??= "Qonaq";                    // null-dursa təyin et
int? uzunluq = ad?.Length;         // ad null-dursa null

string a = "salam", b = "SALAM";
Console.WriteLine(a == b);   // false
Console.WriteLine(string.Equals(a, b, StringComparison.OrdinalIgnoreCase)); // true

object x = 5;
if (x is int n && n > 3) Console.WriteLine($"int: {n}");  // pattern` },
          { t: "mistake", lang: "csharp", wrong: `double orta = (90 + 85 + 70) / 3;  // 81, 81.67 yox`, right: `double orta = (90 + 85 + 70) / 3.0;`, why: "Bölmə int-lər arasında baş verir, kəsr itir, SONRA double-a yazılır." },
          { t: "mistake", lang: "csharp", wrong: `if (ad.ToLower() == "admin")`, right: `if (string.Equals(ad, "admin", StringComparison.OrdinalIgnoreCase))`, why: "ToLower yeni string yaradır və mədəniyyətdən asılıdır (Türk/Azərbaycan İ problemi: \"ADMIN\".ToLower() tr-TR-də «admın» olur!). Ordinal müqayisə həm sürətli, həm proqnozlaşdırılandır." },
        ],
      },
      {
        level: "senior",
        title: "Operator overloading və mədəniyyət tələsi",
        blocks: [
          { t: "code", lang: "csharp", code: `public readonly record struct Pul(decimal Mebleg, string Valyuta)
{
    public static Pul operator +(Pul a, Pul b) =>
        a.Valyuta == b.Valyuta
            ? new Pul(a.Mebleg + b.Mebleg, a.Valyuta)
            : throw new InvalidOperationException("Valyutalar fərqlidir");
}

var cem = new Pul(10m, "AZN") + new Pul(5m, "AZN");  // Pul { Mebleg = 15, Valyuta = AZN }` },
          { t: "list", items: [
            "Operator overloading domen tiplərini (Pul, Vektor) təbii edir; == overload edəndə Equals və GetHashCode da yazılmalıdır (record bunu avtomatik edir).",
            "&& və || qısa dövrəlidir; & və | hər iki tərəfi hesablayır (bool-da da) — yan təsirli metodlarda fərq var.",
            "Təhlükəsizlik — «Turkish I» problemi real zəifliklərə səbəb olub: ad.ToUpper() == \"ADMIN\" yoxlaması tr/az mədəniyyətdə fərqli işləyir və filtrlər keçilir. Təhlükəsizlik müqayisələrində həmişə StringComparison.Ordinal(IgnoreCase).",
            "Təhlükəsizlik: token/HMAC müqayisəsində == yox, CryptographicOperations.FixedTimeEquals — timing hücumuna qarşı.",
          ]},
          { t: "qa", items: [
            ["?? və ?. nə edir?", "?? null olanda alternativ dəyər verir; ?. obyekt null-dursa xəta atmadan null qaytarır."],
            ["Niyə Ordinal müqayisə?", "Mədəniyyətdən asılı deyil, sürətlidir və təhlükəsizlik yoxlamalarında proqnozlaşdırılandır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "C#-da 9 / 2 = ?", options: ["4.5", "4", "5"], answer: 1, why: "İki int — tam bölmə." },
        ],
      },
    ],
    exercise: {
      task: "Üç imtahan balının ortasını (kəsrlə) hesabla; 50+ olarsa ternary ilə \"Keçdi\", yoxsa \"Kəsildi\". string? ləqəb null olanda ?? ilə \"Tələbə\" göstər. İstifadəçi adının \"admin\" olub-olmadığını hərfə həssas olmadan, Ordinal ilə yoxla.",
      starter: `int b1 = 72, b2 = 45, b3 = 60;\nstring? leqeb = null;\nstring istifadeci = "ADMIN";\n\n// bura\n`,
      expect: "/ 3.0 və ya (double) ilə orta 59; ternary; leqeb ?? \"Tələbə\"; string.Equals(..., StringComparison.OrdinalIgnoreCase) — ToLower müqayisəsi yox.",
    },
  },
  {
    slug: "sertler",
    title: "Şərtlər",
    intro: "if/else, switch və C#-ın güclü switch ifadəsi (switch expression) və pattern matching ilə qərar vermək.",
    sections: [
      {
        level: "baslangic",
        title: "if / else if / else",
        blocks: [
          { t: "analogy", text: "Hava proqnozu: əgər yağış yağırsa — çətir götür, yox əgər günəşlidirsə — eynək, əks halda — gödəkçə. İlk doğru şərt qalib gəlir." },
          { t: "code", lang: "csharp", code: `int bal = 78;

if (bal >= 90)
{
    Console.WriteLine("Əla");
}
else if (bal >= 70)
{
    Console.WriteLine("Yaxşı");
}
else
{
    Console.WriteLine("Çalış");
}` },
          { t: "terms", items: [
            ["if (şərt)", "şərt bool olmalıdır — C#-da if (5) yazmaq olmaz."],
            ["else if", "növbəti şərt."],
            ["{ }", "blok; tək sətirdə də yazmaq tövsiyə olunur."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "switch ifadəsi və pattern-lər",
        blocks: [
          { t: "code", lang: "csharp", code: `string gun = "Şənbə";
switch (gun)
{
    case "Şənbə":
    case "Bazar":
        Console.WriteLine("İstirahət");
        break;
    default:
        Console.WriteLine("İş günü");
        break;
}

// Switch expression — dəyər qaytarır
int bal = 83;
string qiymet = bal switch
{
    >= 90 => "A",
    >= 75 => "B",
    >= 60 => "C",
    < 0 or > 100 => "Yanlış",
    _ => "F",
};
Console.WriteLine(qiymet);  // B` },
          { t: "mistake", lang: "csharp", wrong: `if (bal = 100) { }`, right: `if (bal == 100) { }`, why: "C# burada xəta verir (int bool deyil) — JS-dən fərqli olaraq bu bug kompilyasiyadan keçmir. Yaxşı xəbərdir!" },
          { t: "mistake", lang: "csharp", wrong: `case "A":\n    Console.WriteLine("A");\ncase "B":`, right: `case "A":\n    Console.WriteLine("A");\n    break;\ncase "B":`, why: "C#-da kodu olan case-dən növbətiyə «düşmək» qadağandır — break, return və ya goto case lazımdır." },
        ],
      },
      {
        level: "senior",
        title: "Pattern matching dərinliyi",
        blocks: [
          { t: "code", lang: "csharp", code: `record Sifaris(string Status, decimal Mebleg, string? Kupon);

static decimal Endirim(Sifaris s) => s switch
{
    { Status: "ləğv" } => 0,
    { Mebleg: > 500, Kupon: not null } => s.Mebleg * 0.15m,
    { Mebleg: > 500 } => s.Mebleg * 0.10m,
    _ => 0,
};

object v = new[] { 1, 2, 3 };
if (v is int[] { Length: > 2 } arr && arr[0] == 1) Console.WriteLine("uyğun");` },
          { t: "list", items: [
            "Property, relational (>, <), logical (and, or, not), list ([1, .., 3]) pattern-ləri — mürəkkəb if zəncirlərini deklarativ edir.",
            "Kompilyator switch expression-da bütün halların əhatə olunmadığını xəbərdar edir — enum-larda unudulmuş hal tutulur.",
            "Guard clause: metodun əvvəlində ArgumentNullException.ThrowIfNull(x) və uyğunsuz halda return.",
            "Təhlükəsizlik: yetki qərarlarını dağınıq if-lərlə yox, mərkəzləşdirilmiş siyasətlə ver (ASP.NET Core Authorization policies) — bir if unudulsa bütün endpoint açıq qalır. Default — QADAĞAN (deny by default).",
          ]},
          { t: "qa", items: [
            ["switch statement və expression fərqi?", "Statement əmrləri icra edir, expression dəyər qaytarır, daha qısadır və exhaustiveness yoxlanır."],
            ["«Deny by default» nədir?", "İcazə açıq verilməyibsə, giriş qadağandır — unudulmuş qayda açıq qapı yaratmır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "switch expression-da «hər şey qalan» halı:", options: ["default", "_", "else"], answer: 1, why: "Expression formasında _ (discard) işlədilir." },
        ],
      },
    ],
    exercise: {
      task: "Temperatur (int) üçün switch expression yaz: 0-dan aşağı \"Şaxta\", 0–15 \"Soyuq\", 16–25 \"Mülayim\", 26+ \"İsti\". Sonra bal (0–100) üçün if/else ilə qiymət ver; aralıq xaricində əvvəlcə guard ilə xəbərdarlıq.",
      starter: `int temp = 18;\nint bal = 87;\n\n// bura\n`,
      expect: "temp switch { < 0 => ..., <= 15 => ..., <= 25 => ..., _ => ... } → Mülayim; bal üçün əvvəl if (bal < 0 || bal > 100) yoxlanır; == və bool şərtlər düzgün.",
    },
  },
  {
    slug: "dovrler",
    title: "Dövrlər",
    intro: "for, while, do-while və foreach. C#-da foreach kolleksiyaları gəzməyin əsas yoludur.",
    sections: [
      {
        level: "baslangic",
        title: "for və foreach",
        blocks: [
          { t: "analogy", text: "for — saatla məşq: «10 dəfə təkrar». foreach — səbətdəki hər almanı bir-bir götürmək: neçə alma olduğunu düşünmürsən." },
          { t: "code", lang: "csharp", code: `for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"Addım {i}");
}

string[] dersler = { "HTML", "CSS", "C#" };
foreach (string d in dersler)
{
    Console.WriteLine(d);
}

int pul = 100;
while (pul > 0)
{
    pul -= 30;
}

do
{
    Console.WriteLine("Ən azı bir dəfə");
} while (false);` },
          { t: "terms", items: [
            ["for (başla; şərt; addım)", "sayğaclı dövr."],
            ["foreach (tip x in kolleksiya)", "hər elementi gəzir."],
            ["while", "şərt doğru olduqca."],
            ["do...while", "əvvəl icra, sonra yoxla."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "break, continue və tipik səhvlər",
        blocks: [
          { t: "code", lang: "csharp", code: `for (int i = 1; i <= 20; i++)
{
    if (i % 2 == 0) continue;
    if (i > 9) break;
    Console.Write($"{i} ");   // 1 3 5 7 9
}

int[] ededler = { 4, 8, 15, 16, 23, 42 };
int cem = 0;
foreach (var n in ededler) cem += n;
Console.WriteLine(cem);  // 108` },
          { t: "mistake", lang: "csharp", wrong: `foreach (var ad in adlar)\n{\n    if (ad == "") adlar.Remove(ad);\n}`, right: `adlar.RemoveAll(ad => ad == "");`, why: "foreach zamanı kolleksiyanı dəyişmək InvalidOperationException atır. RemoveAll və ya geriyə doğru for." },
          { t: "mistake", lang: "csharp", wrong: `for (int i = 0; i <= arr.Length; i++)`, right: `for (int i = 0; i < arr.Length; i++)`, why: "Son indeks Length - 1-dir. <= IndexOutOfRangeException verir." },
        ],
      },
      {
        level: "senior",
        title: "Iterator-lar, yield və performans",
        blocks: [
          { t: "code", lang: "csharp", code: `static IEnumerable<int> Cutler(int max)
{
    for (int i = 0; i <= max; i += 2)
        yield return i;     // tənbəl — tələb olunanda bir-bir verir
}

foreach (var c in Cutler(10)) Console.Write($"{c} ");` },
          { t: "list", items: [
            "foreach IEnumerable/GetEnumerator ilə işləyir; massiv və List<T>-də kompilyator onu sürətli for-a çevirir.",
            "yield return tənbəl ardıcıllıq yaradır — milyonlarla sətri yaddaşa yükləmədən emal etmək.",
            "Böyük dövrlərdə string += əvəzinə StringBuilder; dövr içində LINQ zəncirləri qurma (allocation).",
            "Span<T> ilə massiv dilimləri kopyalamadan gəzilir — yüksək performanslı kod.",
            "Təhlükəsizlik: istifadəçidən gələn sayla dövr (pageSize, count) — yuxarı hədd qoy və CancellationToken ilə uzun dövrləri dayandırıla bilən et; yoxsa bir sorğu serveri yükləyər (DoS).",
          ]},
          { t: "qa", items: [
            ["foreach-də kolleksiyanı niyə dəyişmək olmaz?", "Enumerator versiyanı izləyir; dəyişiklik onu etibarsız edir və istisna atılır."],
            ["yield return nə edir?", "Metodu tənbəl iterator-a çevirir: hər element tələb olunanda hesablanır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Ən azı bir dəfə icra olunan dövr:", options: ["while", "do...while", "for"], answer: 1, why: "Şərt sonda yoxlanır." },
        ],
      },
    ],
    exercise: {
      task: "1) 1–30 FizzBuzz (for). 2) int massivində ən böyük ədədi foreach ilə tap (Max() işlətmədən). 3) Faktorialı while ilə hesabla (n = 10, long tip).",
      starter: `int[] ededler = { 12, 7, 45, 3, 29 };\n\n// 1)\n// 2)\n// 3)\n`,
      expect: "FizzBuzz-da 15 əvvəl yoxlanır; foreach ilə max 45; long faktorial 3628800; i < Length, sonsuz dövr yoxdur.",
    },
  },
  {
    slug: "metodlar",
    title: "Metodlar",
    intro: "Metod — C#-da funksiyadır, həmişə sinif içində yaşayır. Qaytarma tipi, parametrlər, overloading, ref/out və ifadə gövdəli metodlar.",
    sections: [
      {
        level: "baslangic",
        title: "Metod yazmaq",
        blocks: [
          { t: "analogy", text: "Metod — müqaviləli işçidir: «mənə iki ədəd ver (parametrlər, tipləri ilə), sənə bir ədəd qaytarım (qaytarma tipi)». Müqaviləni pozmaq (string vermək) kompilyator tərəfindən qadağandır." },
          { t: "code", lang: "csharp", code: `static int Topla(int a, int b)
{
    return a + b;
}

static void Salamla(string ad)        // void — heç nə qaytarmır
{
    Console.WriteLine($"Salam, {ad}!");
}

static double Sahe(double r) => Math.PI * r * r;   // ifadə gövdəli

Console.WriteLine(Topla(3, 4));   // 7
Salamla("Aysel");
Console.WriteLine(Sahe(2).ToString("F2"));` },
          { t: "terms", items: [
            ["static", "obyekt yaratmadan çağırılan metod."],
            ["int (əvvəldə)", "qaytarma tipi."],
            ["void", "heç nə qaytarmır."],
            ["parametr", "tipi ilə: int a."],
            ["=>", "tək ifadəli metodun qısa yazılışı."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Default, adlı arqumentlər, overloading, out",
        blocks: [
          { t: "code", lang: "csharp", code: `static decimal Endirim(decimal qiymet, int faiz = 10) => qiymet * (100 - faiz) / 100;
Console.WriteLine(Endirim(200m));             // 180
Console.WriteLine(Endirim(faiz: 25, qiymet: 200m));  // adlı arqumentlər

// Overloading — eyni ad, fərqli parametrlər
static int Max(int a, int b) => a > b ? a : b;
static double Max(double a, double b) => a > b ? a : b;

// out — bir neçə nəticə
static bool Bol(int a, int b, out int netice)
{
    if (b == 0) { netice = 0; return false; }
    netice = a / b;
    return true;
}
if (Bol(10, 2, out var n)) Console.WriteLine(n);

// Tuple qaytarmaq — daha müasir
static (int Min, int Max) Hedler(int[] a) => (a.Min(), a.Max());` },
          { t: "mistake", lang: "csharp", wrong: `static int Yoxla(int x)\n{\n    if (x > 0) return 1;\n}`, right: `static int Yoxla(int x)\n{\n    if (x > 0) return 1;\n    return 0;\n}`, why: "Bütün yollar dəyər qaytarmalıdır — kompilyator «not all code paths return a value» xətası verir." },
          { t: "mistake", lang: "csharp", wrong: `static void Hesabla(List<int> l, int a, int b, int c, int d, bool x, bool y) {...}`, right: `record HesabSecimi(int A, int B, int C, int D, bool X, bool Y);\nstatic void Hesabla(List<int> l, HesabSecimi s) {...}`, why: "Çox parametrli metod oxunmur və səhv sıra ilə çağırılır. Parametrləri obyektə yığ." },
        ],
      },
      {
        level: "senior",
        title: "ref, in, params, local funksiyalar",
        blocks: [
          { t: "code", lang: "csharp", code: `static void Iki(ref int x) => x *= 2;     // çağıranın dəyişənini dəyişir
int d = 5; Iki(ref d);                       // d = 10

static int Cem(params int[] ededler) => ededler.Sum();
Cem(1, 2, 3);

static int Fakt(int n)
{
    return n < 0 ? throw new ArgumentOutOfRangeException(nameof(n)) : Hesab(n);
    static int Hesab(int k) => k <= 1 ? 1 : k * Hesab(k - 1);   // local function
}` },
          { t: "list", items: [
            "Value tiplər default olaraq kopya ilə ötürülür; ref/out/in istinad verir. Böyük struct-ları in ilə ötürmək kopyalamanı aradan qaldırır.",
            "Overload həllində gizli çevirmələr gözlənilməz metodu seçə bilər (int → long vs double) — eyni adda çox overload-dan çəkin.",
            "Saf metodlar test olunur; yan təsirləri (DB, fayl, saat) interfeys arxasına çıxar (dependency injection).",
            "Təhlükəsizlik: public metodlarda arqumentləri yoxla (ArgumentNullException.ThrowIfNull, ArgumentOutOfRangeException.ThrowIfNegative) — «fail fast». Xəta mesajlarında həssas dəyərləri (parol, token) yazma.",
          ]},
          { t: "qa", items: [
            ["ref və out fərqi?", "ref — dəyişən əvvəlcədən dəyər almalıdır; out — metod mütləq dəyər verməlidir."],
            ["Overloading nədir?", "Eyni adlı, fərqli parametr siyahılı metodlar; kompilyator arqumentlərə görə seçir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Heç nə qaytarmayan metodun tipi:", options: ["null", "void", "empty"], answer: 1, why: "void — «boş»." },
        ],
      },
    ],
    exercise: {
      task: "1) Ortalama(params int[] ballar) — double qaytarsın, boş massivdə 0. 2) Qiymet(int bal) — switch expression ilə hərf qaytarsın. 3) TryBol(int a, int b, out double netice) — sıfıra bölmədə false. Main-də hamısını çağır.",
      starter: `static double Ortalama(params int[] ballar)\n{\n    // bura\n}\n\n// Qiymet, TryBol\n\nConsole.WriteLine(Ortalama(80, 90, 75));\n`,
      expect: "Ortalama boş halda 0, (double)Sum / Length → 81.67; Qiymet switch expression; TryBol out parametrli, b == 0 → false; bütün yollar return edir.",
    },
  },
  {
    slug: "massiv-kolleksiya",
    title: "Massivlər və kolleksiyalar",
    intro: "Massiv (sabit ölçü), List<T> (dinamik), Dictionary<K,V> (açar-dəyər), HashSet<T> (unikal). Düzgün kolleksiya seçmək — həm sürət, həm təmiz kod.",
    sections: [
      {
        level: "baslangic",
        title: "Massiv və List<T>",
        blocks: [
          { t: "analogy", text: "Massiv — 10 yerlik avtobus: yer sayı sabitdir. List — elastik avtobus: sərnişin gəldikcə uzanır. Dictionary — qarderob: nömrəni (açar) verirsən, paltarını (dəyər) dərhal alırsan." },
          { t: "code", lang: "csharp", code: `int[] ballar = { 90, 75, 88 };
string[] adlar = new string[3];      // 3 boş (null) yer
Console.WriteLine(ballar[0]);        // 90
Console.WriteLine(ballar.Length);    // 3

var dersler = new List<string> { "HTML", "CSS" };
dersler.Add("C#");
dersler.Remove("CSS");
dersler.Insert(0, "Git");
Console.WriteLine(dersler.Count);    // 3
Console.WriteLine(dersler.Contains("C#"));  // true
dersler.Sort();` },
          { t: "terms", items: [
            ["T[]", "massiv — ölçüsü yaradılanda sabitlənir."],
            ["List<T>", "ölçüsü dəyişən siyahı; T — elementlərin tipi (generic)."],
            ["Length / Count", "massivin / List-in element sayı."],
            ["Add / Remove / Insert", "əlavə / silmə / yerə qoyma."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Dictionary, HashSet, Queue, Stack",
        blocks: [
          { t: "code", lang: "csharp", code: `var telefonlar = new Dictionary<string, string>
{
    ["Aysel"] = "050-111-22-33",
    ["Murad"] = "055-444-55-66",
};
telefonlar["Leyla"] = "070-777-88-99";

if (telefonlar.TryGetValue("Aysel", out var nomre))
    Console.WriteLine(nomre);

foreach (var (ad, tel) in telefonlar)
    Console.WriteLine($"{ad}: {tel}");

var unikal = new HashSet<string> { "C#", "SQL", "C#" };   // 2 element

var novbe = new Queue<string>();   novbe.Enqueue("1-ci"); novbe.Dequeue();   // FIFO
var yigin = new Stack<int>();      yigin.Push(1); yigin.Pop();               // LIFO` },
          { t: "mistake", lang: "csharp", wrong: `var tel = telefonlar["Orxan"];  // KeyNotFoundException`, right: `if (telefonlar.TryGetValue("Orxan", out var tel)) { ... }`, why: "Olmayan açarı indekslə oxumaq istisna atır. TryGetValue həm təhlükəsiz, həm bir axtarışdır." },
          { t: "mistake", lang: "csharp", wrong: `if (list.Contains(x)) ... // 100 000 elementli List, dövr içində`, right: `var set = list.ToHashSet();\nif (set.Contains(x)) ...`, why: "List.Contains O(n), HashSet.Contains O(1). Dövr içində fərq saniyələrlə ölçülür." },
        ],
      },
      {
        level: "senior",
        title: "Daxili quruluş, capacity, immutable kolleksiyalar",
        blocks: [
          { t: "list", items: [
            "List<T> daxildə massivdir: dolanda 2 dəfə böyük yeni massiv yaradılıb kopyalanır. Ölçünü bilirsənsə new List<T>(capacity) — lazımsız kopyalamalar olmur.",
            "Dictionary hash cədvəlidir; açar tipinin GetHashCode/Equals-ı düzgün olmalıdır. String açarlar üçün StringComparer.OrdinalIgnoreCase verə bilərsən.",
            "API-dən kolleksiya qaytaranda IReadOnlyList<T> / IReadOnlyCollection<T> — çağıran daxili siyahını dəyişə bilməsin.",
            "Çoxaxınlı (multi-thread) mühitdə adi Dictionary təhlükəsiz deyil — ConcurrentDictionary.",
            "Collection expressions (C# 12): int[] a = [1, 2, 3]; List<int> l = [..a, 4];",
            "Təhlükəsizlik: istifadəçi açarları ilə dolan Dictionary-yə limit qoy (məs. sorğu başına açar sayı) — hash toqquşma və yaddaş DoS-u. .NET string hash-ini təsadüfiləşdirir, amma ölçü limiti yenə lazımdır.",
          ]},
          { t: "qa", items: [
            ["Massiv və List<T> fərqi?", "Massiv sabit ölçülüdür, List dinamik böyüyür (daxildə massiv saxlayır)."],
            ["Nə vaxt HashSet?", "Unikallıq və sürətli «varmı?» yoxlaması lazım olanda."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Ad → telefon saxlamaq üçün:", options: ["List<string>", "Dictionary<string, string>", "string[]"], answer: 1, why: "Açar-dəyər cütü." },
          { t: "quiz", q: "List-in element sayı:", options: [".Length", ".Count", ".Size"], answer: 1, why: "Massivdə Length, kolleksiyalarda Count." },
        ],
      },
    ],
    exercise: {
      task: "1) List<int> ballardan 70-dən aşağıları sil (RemoveAll) və qalanların ortasını tap. 2) Mətndəki sözlərin tezliyini Dictionary<string,int> ilə say (TryGetValue və ya GetValueOrDefault). 3) Təkrarlanan email-ləri HashSet ilə tap.",
      starter: `var ballar = new List<int> { 92, 65, 78, 55, 88 };\nstring metn = "kod yaz kod oxu kod paylaş";\nstring[] emailler = { "a@x.az", "b@x.az", "a@x.az" };\n\n// 1)\n// 2)\n// 3)\n`,
      expect: "RemoveAll(b => b < 70) → [92, 78, 88], orta 86; Dictionary say[s] = say.GetValueOrDefault(s) + 1 → kod: 3; HashSet.Add false qaytaranda təkrar → a@x.az.",
    },
  },
  {
    slug: "sinifler",
    title: "Siniflər və obyektlər",
    intro: "Sinif (class) — obyektin çertyojudur: hansı məlumatı (xassələr) və davranışı (metodlar) var. C# tamamilə siniflər üzərində qurulub.",
    sections: [
      {
        level: "baslangic",
        title: "Sinif, obyekt, konstruktor",
        blocks: [
          { t: "analogy", text: "Sinif — avtomobilin zavod çertyojudur. Obyekt — həmin çertyojla yığılmış konkret maşın: birinin rəngi qırmızı, digərininki ağ. Konstruktor — yığım xətti: maşın çıxanda ona başlanğıc parametrləri verir." },
          { t: "code", lang: "csharp", code: `public class Telebe
{
    public string Ad { get; set; }
    public int Yas { get; private set; }

    public Telebe(string ad, int yas)    // konstruktor
    {
        Ad = ad;
        Yas = yas;
    }

    public void Tanit() => Console.WriteLine($"Mən {Ad}, {Yas} yaşım var.");
    public void AdGunu() => Yas++;
}

var t = new Telebe("Aysel", 20);
t.Tanit();
t.AdGunu();
Console.WriteLine(t.Yas);   // 21
// t.Yas = 50;   // xəta: set private-dir` },
          { t: "terms", items: [
            ["class", "çertyoj."],
            ["obyekt (instance)", "new ilə yaradılan konkret nüsxə."],
            ["property { get; set; }", "xassə — oxuma/yazma icazələri ilə."],
            ["konstruktor", "sinif adı ilə eyni metod — obyekt yaradılanda işləyir."],
            ["public / private", "çöldən görünür / yalnız sinif daxilində."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Primary constructor, init, static, record",
        blocks: [
          { t: "code", lang: "csharp", code: `// C# 12 primary constructor
public class Hesab(string sahib, decimal balans)
{
    public string Sahib { get; } = sahib;
    public decimal Balans { get; private set; } = balans;

    public void Medaxil(decimal mebleg)
    {
        if (mebleg <= 0) throw new ArgumentException("Məbləğ müsbət olmalıdır");
        Balans += mebleg;
    }
}

public class Kurs
{
    public required string Ad { get; init; }   // yalnız yaradılanda
    public static int Say { get; private set; } // bütün obyektlər üçün ortaq
    public Kurs() => Say++;
}
var k = new Kurs { Ad = "C#" };

public record Noqte(int X, int Y);   // dəyər bərabərliyi, immutable
Console.WriteLine(new Noqte(1, 2) == new Noqte(1, 2));  // true` },
          { t: "mistake", lang: "csharp", wrong: `public class Hesab\n{\n    public decimal Balans;   // hər kəs yaza bilər\n}\nhesab.Balans = -1000000;`, right: `public decimal Balans { get; private set; }\npublic void Mexaric(decimal m) { /* yoxla, sonra çıx */ }`, why: "Açıq sahə (field) obyektin qaydalarını pozmağa imkan verir. Vəziyyəti metodlarla, yoxlama ilə dəyiş — inkapsulyasiya." },
          { t: "tip", text: "class — istinad bərabərliyi (eyni obyektdirmi), record — dəyər bərabərliyi (dəyərlər eynidirmi). DTO və dəyər obyektləri üçün record." },
        ],
      },
      {
        level: "senior",
        title: "Yaddaş, bərabərlik, dizayn",
        blocks: [
          { t: "list", items: [
            "class obyektləri heap-də yaranır, GC təmizləyir; dəyişən yalnız istinad saxlayır — iki dəyişən eyni obyektə işarə edə bilər.",
            "Equals/GetHashCode-u override etməyən class Dictionary açarı kimi istinadla müqayisə olunur.",
            "Konstruktorda invariant-ları təmin et: obyekt heç vaxt «yarımçıq» vəziyyətdə olmamalıdır (məs. mənfi balans).",
            "sealed — irsiyyət lazım deyilsə; JIT optimallaşdırmasına da kömək edir.",
            "Təhlükəsizlik — over-posting: ASP.NET-də birbaşa domen/Entity sinfini request modeli kimi qəbul etmə; istifadəçi IsAdmin = true göndərə bilər. Ayrıca DTO (record) işlət, yalnız icazəli sahələr.",
            "Təhlükəsizlik: ToString()-i override edəndə parol, token kimi sahələri daxil etmə — log-lara sızır. record avtomatik ToString bütün xassələri yazır — həssas record-larda override et.",
          ]},
          { t: "qa", items: [
            ["class və record fərqi?", "class istinad bərabərliyi və default mutable; record dəyər bərabərliyi, with ifadəsi, adətən immutable."],
            ["Property ilə field fərqi?", "Field birbaşa dəyişəndir; property get/set metodlarıdır — yoxlama, yalnız-oxuma, gələcək dəyişikliklər mümkün."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Obyekt hansı açar sözlə yaradılır?", options: ["create", "new", "make"], answer: 1, why: "new Telebe(...)." },
        ],
      },
    ],
    exercise: {
      task: "BankHesabi sinfi yaz: Sahib (yalnız oxuma), Balans (private set), Medaxil(m) və Mexaric(m) metodları. Mənfi/sıfır məbləğ və balansdan çox məxaric üçün istisna at. 2 əməliyyat edib balansı çap et.",
      starter: `public class BankHesabi\n{\n    // bura\n}\n\nvar h = new BankHesabi("Aysel", 100m);\n`,
      expect: "Balans { get; private set; } decimal; Medaxil/Mexaric-də mebleg <= 0 və balansdan çox halda ArgumentException/InvalidOperationException; konstruktor Sahib və başlanğıc balansı təyin edir; public field yoxdur.",
    },
  },
  {
    slug: "oop",
    title: "OOP: inkapsulyasiya, irsiyyət, polimorfizm",
    intro: "Obyekt yönümlü proqramlaşdırmanın 4 sütunu: inkapsulyasiya, abstraksiya, irsiyyət, polimorfizm. Müsahibələrin ən çox soruşulan mövzusu.",
    sections: [
      {
        level: "baslangic",
        title: "4 sütun sadə dillə",
        blocks: [
          { t: "analogy", text: "Avtomobil: İnkapsulyasiya — mühərrik kapotun altındadır, sən yalnız pedal və sükanı görürsən. Abstraksiya — «sür» deyirsən, yanacağın necə yandığını bilmirsən. İrsiyyət — elektromobil də avtomobildir, əsas xüsusiyyətləri miras alır. Polimorfizm — «sür» əmri benzin və elektrik maşınında fərqli işləyir, amma əmr eynidir." },
          { t: "code", lang: "csharp", code: `public class Heyvan
{
    public string Ad { get; }
    public Heyvan(string ad) => Ad = ad;
    public virtual string SesVer() => "...";
}

public class It : Heyvan
{
    public It(string ad) : base(ad) { }
    public override string SesVer() => "Hav!";
}

public class Pisik : Heyvan
{
    public Pisik(string ad) : base(ad) { }
    public override string SesVer() => "Miyav!";
}

List<Heyvan> heyvanlar = [new It("Toplan"), new Pisik("Mırmır")];
foreach (var h in heyvanlar)
    Console.WriteLine($"{h.Ad}: {h.SesVer()}");   // polimorfizm` },
          { t: "terms", items: [
            [": Heyvan", "irsiyyət — It Heyvan-dan törəyir."],
            ["base(ad)", "valideyn sinfin konstruktorunu çağırır."],
            ["virtual", "«bu metodu törəmə sinif dəyişə bilər»."],
            ["override", "valideynin virtual metodunu yenidən yazmaq."],
            ["polimorfizm", "eyni çağırış, obyektin həqiqi tipinə görə fərqli davranış."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "abstract, protected, sealed",
        blocks: [
          { t: "code", lang: "csharp", code: `public abstract class Fiqur
{
    public abstract double Sahe();                 // gövdəsiz — törəmələr MƏCBURDUR
    public override string ToString() => $"{GetType().Name}: {Sahe():F2}";
}

public sealed class Daire(double r) : Fiqur
{
    public override double Sahe() => Math.PI * r * r;
}

public sealed class Duzbucaqli(double en, double uz) : Fiqur
{
    public override double Sahe() => en * uz;
}

Fiqur[] fiqurlar = [new Daire(1), new Duzbucaqli(2, 3)];
Console.WriteLine(fiqurlar.Sum(f => f.Sahe()));
// new Fiqur();  // xəta: abstract sinifdən obyekt yaratmaq olmaz` },
          { t: "list", items: [
            "abstract sinif — natamam çertyoj: ortaq kod + məcburi metodlar.",
            "protected — sinifin özü və törəmələri görür, çöl yox.",
            "sealed — bu sinifdən törəmək olmaz.",
            "C#-da sinif yalnız BİR sinifdən törəyə bilər, amma bir neçə interfeysi tətbiq edə bilər.",
          ]},
          { t: "mistake", lang: "csharp", wrong: `public class It : Heyvan\n{\n    public new string SesVer() => "Hav!";\n}\nHeyvan h = new It("T");\nh.SesVer();  // "..." !`, right: `public override string SesVer() => "Hav!";`, why: "new metodu gizlədir (hiding), override etmir — valideyn tipi ilə çağırılanda köhnə metod işləyir. Polimorfizm üçün virtual + override." },
        ],
      },
      {
        level: "senior",
        title: "Composition over inheritance və LSP",
        blocks: [
          { t: "p", text: "Dərin irsiyyət zəncirləri (A → B → C → D) kövrəkdir: valideyndə dəyişiklik bütün törəmələri sındırır (fragile base class). Müasir tövsiyə: «irsiyyət əvəzinə tərkib» (composition) — davranışı interfeyslər və daxili obyektlər vasitəsilə birləşdir. İrsiyyəti yalnız həqiqi «is-a» əlaqəsi və ortaq invariantlar olanda işlət." },
          { t: "code", lang: "csharp", code: `// İrsiyyət əvəzinə tərkib
public interface IBildiris { void Gonder(string mesaj); }
public sealed class EmailBildiris : IBildiris { public void Gonder(string m) { /* ... */ } }
public sealed class SmsBildiris : IBildiris { public void Gonder(string m) { /* ... */ } }

public sealed class SifarisXidmeti(IBildiris bildiris)
{
    public void Tamamla() => bildiris.Gonder("Sifarişiniz hazırdır");
}` },
          { t: "list", items: [
            "Liskov prinsipi (LSP): törəmə sinif valideynin yerinə qoyulanda proqram düzgün işləməlidir. Kvadrat : Düzbucaqlı klassik pozuntudur (eni dəyişəndə hündürlük də dəyişir).",
            "virtual çağırışlar bir az bahalıdır (vtable); sealed siniflərdə JIT çağırışı birbaşa edə bilər.",
            "Konstruktorda virtual metod çağırma — törəmə sinif hələ tam qurulmayıb.",
            "Təhlükəsizlik: yetki yoxlamasını virtual metodda saxlayıb törəmə sinfə «override» imkanı vermə — törəmə yoxlamanı söndürə bilər. Kritik yoxlamaları sealed/qeyri-virtual metodlarda və ya ayrıca servisdə saxla.",
            "Təhlükəsizlik: JSON deserializasiyasında polimorfik tip adını ($type) istifadəçidən qəbul etmək (Newtonsoft TypeNameHandling.All) uzaqdan kod icrasına yol açıb — System.Text.Json-da yalnız açıq [JsonDerivedType] ağ siyahısı ilə.",
          ]},
          { t: "qa", items: [
            ["OOP-un 4 prinsipi?", "İnkapsulyasiya, abstraksiya, irsiyyət, polimorfizm."],
            ["abstract class və interface fərqi?", "abstract class vəziyyət (sahə) və konstruktor saxlaya bilər, tək irsiyyət; interface müqavilədir, bir sinif çoxunu tətbiq edə bilər."],
            ["Niyə composition over inheritance?", "Daha az asılılıq, daha çevik dəyişiklik, test zamanı asan əvəzləmə (mock)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Valideynin metodunu törəmə sinifdə dəyişmək üçün valideyndə nə yazılmalıdır?", options: ["static", "virtual", "sealed"], answer: 1, why: "virtual + törəmədə override." },
          { t: "quiz", q: "abstract sinifdən obyekt yaratmaq olar?", options: ["Bəli", "Xeyr", "Yalnız static"], answer: 1, why: "abstract sinif natamamdır — yalnız törəmələri yaradılır." },
        ],
      },
    ],
    exercise: {
      task: "abstract İsci sinfi (Ad, abstract decimal Maas()). Törəmələr: SaatliqIsci (saat × tarif) və AyliqIsci (sabit maaş + bonus). List<Isci>-də hamısının maaşını polimorfizmlə çap et və cəmini hesabla.",
      starter: `public abstract class Isci\n{\n    // bura\n}\n\n// SaatliqIsci, AyliqIsci\n\n// List<Isci> və cəm\n`,
      expect: "abstract class + abstract decimal Maas(); törəmələrdə override və base(ad) konstruktor; decimal tip; foreach ilə polimorf çağırış; cəm Sum(i => i.Maas()) və ya dövr; new ilə gizlətmə yoxdur.",
    },
  },
  {
    slug: "interface",
    title: "Interface və abstrakt siniflər",
    intro: "Interface — müqavilədir: sinfin NƏ edə bilməli olduğunu deyir, NECƏ edəcəyini yox. Abstrakt sinif isə yarımçıq qəlibdir: ortaq kodu verir, qalanını törəmələrə həvalə edir.",
    sections: [
      {
        level: "baslangic",
        title: "Müqavilə",
        blocks: [
          { t: "analogy", text: "Rozetka — interfeysdir. Ona ütü, telefon adapteri, soyuducu qoşa bilərsən: rozetkaya cihazın içi maraqlı deyil, təki ştepseli standarta uyğun olsun. Kodda da belədir: IOdenis interfeysini kart da, nağd da, kripto da həyata keçirə bilər — səbət üçün fərqi yoxdur." },
          { t: "code", lang: "csharp", code: `public interface IOdenis
{
    bool Ode(decimal mebleg);        // yalnız imza — gövdə yoxdur
}

public class KartOdenisi : IOdenis
{
    public bool Ode(decimal mebleg)
    {
        Console.WriteLine($"Kartdan {mebleg} AZN çıxıldı");
        return true;
    }
}

public class NagdOdenis : IOdenis
{
    public bool Ode(decimal mebleg)
    {
        Console.WriteLine($"Nağd {mebleg} AZN alındı");
        return true;
    }
}

// İstifadə: səbət konkret sinfi tanımır
IOdenis odenis = new KartOdenisi();
odenis.Ode(49.90m);

var usullar = new List<IOdenis> { new KartOdenisi(), new NagdOdenis() };
foreach (var u in usullar) u.Ode(10m);` },
          { t: "terms", items: [
            ["interface", "üzvlərin imzalarından ibarət müqavilə; adı I ilə başlayır (IOdenis)."],
            ["həyata keçirmək (implement)", "sinfin interfeysdəki bütün üzvlərə gövdə yazması."],
            ["abstrakt sinif", "obyekti yaradıla bilməyən, törəmələr üçün əsas olan sinif."],
            ["polimorfizm", "eyni çağırışın (u.Ode) fərqli siniflərdə fərqli işləməsi."],
          ]},
          { t: "tip", text: "Sinif yalnız BİR sinifdən törəyə bilər, amma İSTƏNİLƏN sayda interfeysi həyata keçirə bilər: class Fayl : Sened, IDisposable, IComparable<Fayl>." },
        ],
      },
      {
        level: "orta",
        title: "Interface yoxsa abstrakt sinif?",
        blocks: [
          { t: "code", lang: "csharp", code: `// Abstrakt sinif: ortaq vəziyyət və kod + məcburi hissə
public abstract class Bildiris
{
    public DateTime Yaradilib { get; } = DateTime.UtcNow;   // ortaq vəziyyət

    public void Gonder(string metn)                          // ortaq alqoritm
    {
        if (string.IsNullOrWhiteSpace(metn))
            throw new ArgumentException("Mətn boş ola bilməz");
        Catdir(metn.Trim());
    }

    protected abstract void Catdir(string metn);             // törəmə yazmalıdır
}

public class EmailBildirisi : Bildiris
{
    protected override void Catdir(string metn) => Console.WriteLine($"Email: {metn}");
}

// Interface: bir-biri ilə əlaqəsi olmayan siniflərə ortaq bacarıq
public interface IIxracOlunan
{
    string CsvKimi();
}

public class Telebe : IIxracOlunan, IComparable<Telebe>
{
    public string Ad { get; init; } = "";
    public int Bal { get; init; }

    public string CsvKimi() => $"{Ad};{Bal}";
    public int CompareTo(Telebe? diger) => Bal.CompareTo(diger?.Bal ?? 0);
}` },
          { t: "code", lang: "text", caption: "Seçim cədvəli", code: `                       interface                 abstrakt sinif
Vəziyyət (sahə)        yox                       var
Konstruktor            yox                       var
Çoxlu irsiyyət         bəli (çox interfeys)      xeyr (bir əsas sinif)
Münasibət              «bacarır» (can-do)        «-dır» (is-a)
Nə vaxt                əlaqəsiz siniflərə        yaxın qohum siniflərə
                       ortaq müqavilə            ortaq kod + vəziyyət` },
          { t: "mistake", lang: "csharp", wrong: `public class SifarisXidmeti
{
    private readonly SqlSifarisAnbari _anbar = new SqlSifarisAnbari();
    // konkret sinfə bağlıdır: test üçün əsl baza lazımdır
}`, right: `public class SifarisXidmeti
{
    private readonly ISifarisAnbari _anbar;
    public SifarisXidmeti(ISifarisAnbari anbar) => _anbar = anbar;
    // testdə saxta (fake) anbar verilir
}`, why: "Konkret sinfə birbaşa bağlılıq kodu dəyişməyə və test etməyə qapayır. Interfeysdən asılı ol, konkret obyekti kənardan al (dependency injection)." },
          { t: "mistake", lang: "csharp", wrong: `public interface IHeyvan
{
    void Uc();
    void Uz();
    void Qac();
}
public class Baliq : IHeyvan
{
    public void Uc() => throw new NotSupportedException();  // məcburi yalan
    public void Uz() { }
    public void Qac() => throw new NotSupportedException();
}`, right: `public interface IUcan { void Uc(); }
public interface IUzen { void Uz(); }

public class Baliq : IUzen { public void Uz() { } }
public class Ordek : IUcan, IUzen { public void Uc() { } public void Uz() { } }`, why: "«Kök» interfeys sinifləri lazımsız metodlar yazmağa məcbur edir. Kiçik, bir işə fokuslanmış interfeyslər yaz (Interface Segregation)." },
        ],
      },
      {
        level: "senior",
        title: "Default metodlar, explicit implementation və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Default interface metodları (C# 8+): interfeysə gövdəli metod əlavə etmək olur — mövcud implementasiyaları sındırmadan müqaviləni genişləndirmək üçün. Vəziyyət yenə olmur.",
            "Explicit implementation: void IDisposable.Dispose() — üzv yalnız interfeys tipi üzərindən görünür. İki interfeysdə eyni adlı metod olanda və ya API-ni təmiz saxlamaq üçün.",
            "static abstract interfeys üzvləri (C# 11): generic riyaziyyat (INumber<T>) və T.Parse(...) kimi statik müqavilələr.",
            "Vacib hazır interfeyslər: IEnumerable<T> (foreach), IDisposable / IAsyncDisposable (using), IComparable<T>, IEquatable<T>, IReadOnlyList<T> (yalnız oxuma görünüşü).",
            "Interfeys çağırışı virtual dispatch-dir; isti dövrdə sealed sinif və ya generic constraint (where T : IOdenis) JIT-ə devirtualizasiya imkanı verir. Struct-ı interfeys tipinə mənimsətmək boxing-dir.",
            "Abstrakt sinif + Template Method nümunəsi alqoritmin skeletini sabitləyir, addımları törəmələrə buraxır. Dərin irsiyyət əvəzinə interfeys + kompozisiya üstün tutulur.",
            "Təhlükəsizlik — interfeys icazə sərhədi deyil: IReadOnlyList<T> qaytarmaq siyahını qorumur — çağıran onu List<T>-ə cast edib dəyişə bilər. Həqiqi qoruma üçün surət (ToArray), ImmutableArray və ya AsReadOnly().",
            "Təhlükəsizlik — etibarsız implementasiya: plugin və ya kənar kitabxananın verdiyi IOdenis istənilən şey edə bilər (istisna atmaq, yalan true qaytarmaq, məlumatı kənara göndərmək). Kritik qərarı (ödəniş təsdiqi, icazə) kənar implementasiyanın sözünə həvalə etmə — nəticəni öz tərəfində yoxla.",
            "Təhlükəsizlik — icazə yoxlamasını müqaviləyə qoyma, mərkəzə qoy: hər implementasiyanın «özü yoxlayacağına» güvənsən, biri unudacaq. Yoxlamanı abstrakt əsas sinifdəki sealed/qeyri-virtual metodda və ya dekoratorda et.",
            "Təhlükəsizlik — virtual metodlar hücum səthidir: törəmə sinif təhlükəsizlik yoxlamasını override edib söndürə bilər. Kritik sinifləri sealed et, kritik metodları virtual etmə.",
            "Təhlükəsizlik: tip adına görə dinamik yükləmə (Activator.CreateInstance(Type.GetType(istifadeci_girisi))) ixtiyari sinfin yaradılmasıdır. Yalnız ağ siyahıdakı tipləri qeydiyyatdan seç.",
          ]},
          { t: "code", lang: "csharp", caption: "Yoxlama əsas sinifdə — törəmə onu ötürə bilmir", code: `public abstract class QorunanEmeliyyat
{
    // qeyri-virtual: override oluna bilməz
    public void Icra(Istifadeci istifadeci)
    {
        if (!istifadeci.Rollar.Contains(TelebOlunanRol))
            throw new UnauthorizedAccessException("İcazə yoxdur");

        IcraEt(istifadeci);
    }

    protected abstract string TelebOlunanRol { get; }
    protected abstract void IcraEt(Istifadeci istifadeci);
}

public sealed class HesabatSilme : QorunanEmeliyyat
{
    protected override string TelebOlunanRol => "admin";
    protected override void IcraEt(Istifadeci istifadeci) => Console.WriteLine("Silindi");
}` },
          { t: "qa", items: [
            ["Interface ilə abstrakt sinif fərqi?", "Interface — vəziyyətsiz müqavilə, çoxlu irsiyyət mümkündür; abstrakt sinif — vəziyyət, konstruktor və ortaq kod saxlaya bilir, amma yalnız bir əsas sinif olur."],
            ["Niyə interfeysdən asılı olmaq yaxşıdır?", "Bağlılığı azaldır: implementasiyanı dəyişmək və testdə saxta obyekt vermək asanlaşır (Dependency Inversion)."],
            ["Explicit interface implementation nədir?", "Üzvün yalnız interfeys tipi üzərindən çağırıla bilməsi; ad toqquşmasını həll edir və sinfin açıq API-sini təmiz saxlayır."],
            ["IReadOnlyList<T> məlumatı qoruyurmu?", "Xeyr, yalnız görünüşdür — əsl obyektə cast etmək olar. Dəyişməzlik üçün immutable kolleksiya və ya surət lazımdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Bir sinif neçə interfeysi həyata keçirə bilər?", options: ["Yalnız bir", "İstənilən sayda", "Ən çox iki"], answer: 1, why: "Sinif irsiyyəti təkdir, interfeys sayı məhdud deyil." },
          { t: "quiz", q: "Ortaq sahə və konstruktor lazımdırsa, nə seçilir?", options: ["interface", "abstrakt sinif", "static sinif"], answer: 1, why: "Interfeysdə vəziyyət və konstruktor olmur." },
        ],
      },
    ],
    exercise: {
      task: "Fiqur sistemi yaz. IFiqur interfeysi: double Sahe(), double Perimetr(). IRenglenen interfeysi: string Reng { get; set; }. Sinflər: Duzbucaqli (hər iki interfeys), Daire (yalnız IFiqur). List<IFiqur>-də hamısının sahəsini çap et; yalnız IRenglenen olanların rəngini «is» pattern matching ilə çap et. Mənfi ölçü verilsə, konstruktor ArgumentOutOfRangeException atsın.",
      starter: `public interface IFiqur\n{\n    // bura\n}\n\n// IRenglenen, Duzbucaqli, Daire\n\n// List<IFiqur> və dövr\n`,
      expect: "İki interfeys (I prefiksi), Duzbucaqli : IFiqur, IRenglenen; Daire : IFiqur; Math.PI işlədilib; konstruktorda ölçü <= 0 yoxlaması və ArgumentOutOfRangeException; foreach ilə polimorf Sahe(); if (f is IRenglenen r) ilə rəng; kök interfeys (hər şey bir yerdə) yoxdur.",
    },
  },
  {
    slug: "xetalar",
    title: "İstisnalar (exceptions)",
    intro: "İstisna — proqramın normal axınını pozan xətadır: fayl tapılmadı, sıfıra bölmə, null obyekt. C#-da onlar try/catch ilə tutulur, throw ilə atılır, finally və using ilə resurslar təmizlənir.",
    sections: [
      {
        level: "baslangic",
        title: "try, catch, finally",
        blocks: [
          { t: "analogy", text: "Maşında təhlükəsizlik yastığı var. Normal sürüşdə o görünmür (try). Qəza olanda açılır və səni qoruyur (catch). Qəza olsa da, olmasa da, sonda mühərriki söndürürsən (finally). Yastıq qəzanın qarşısını almır — nəticəsini idarə edir." },
          { t: "code", lang: "csharp", code: `try
{
    Console.Write("Ədəd daxil edin: ");
    int eded = int.Parse(Console.ReadLine()!);
    Console.WriteLine(100 / eded);
}
catch (FormatException)
{
    Console.WriteLine("Bu ədəd deyil!");
}
catch (DivideByZeroException)
{
    Console.WriteLine("Sıfıra bölmək olmaz!");
}
finally
{
    Console.WriteLine("Hesablama bitdi");   // həmişə işləyir
}

// Çox vaxt istisna əvəzinə TryParse daha yaxşıdır:
if (int.TryParse("12a", out int netice))
    Console.WriteLine(netice);
else
    Console.WriteLine("Çevrilmədi");` },
          { t: "terms", items: [
            ["exception", "xəta haqqında məlumat daşıyan obyekt (Message, StackTrace)."],
            ["try", "xəta ola biləcək kod."],
            ["catch", "müəyyən tip istisnanı tutan blok."],
            ["finally", "xəta olsa da, olmasa da icra olunan blok."],
            ["throw", "istisna atmaq."],
          ]},
          { t: "list", items: [
            "NullReferenceException — null obyektin üzvünə müraciət.",
            "ArgumentException / ArgumentNullException — metodun arqumenti yanlışdır.",
            "InvalidOperationException — obyekt bu əməliyyat üçün uyğun vəziyyətdə deyil.",
            "KeyNotFoundException, IndexOutOfRangeException — açar/indeks yoxdur.",
            "FileNotFoundException, IOException — fayl əməliyyatları.",
          ]},
        ],
      },
      {
        level: "orta",
        title: "throw, öz istisnan, using, filtr",
        blocks: [
          { t: "code", lang: "csharp", code: `public class BalansCatmirException : Exception
{
    public decimal Catmayan { get; }

    public BalansCatmirException(decimal balans, decimal mebleg)
        : base($"Balans {balans}, tələb olunan {mebleg}")
    {
        Catmayan = mebleg - balans;
    }
}

public class Hesab
{
    public decimal Balans { get; private set; }

    public void Cixar(decimal mebleg)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(mebleg);   // .NET 8+
        if (mebleg > Balans)
            throw new BalansCatmirException(Balans, mebleg);
        Balans -= mebleg;
    }
}

// using: blok bitəndə Dispose() avtomatik çağırılır (xəta olsa belə)
using (var oxuyucu = new StreamReader("qeydler.txt"))
{
    Console.WriteLine(oxuyucu.ReadLine());
}
using var fayl = new StreamWriter("log.txt");   // qısa forma: metodun sonunda bağlanır

// İstisna filtri
try
{
    await client.GetStringAsync(url);
}
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
{
    Console.WriteLine("Səhifə tapılmadı");
}` },
          { t: "mistake", lang: "csharp", wrong: `try
{
    EmalEt();
}
catch (Exception)
{
    // heç nə — xəta izsiz itdi
}`, right: `try
{
    EmalEt();
}
catch (IOException ex)
{
    _logger.LogError(ex, "Fayl emalı alınmadı");
    throw;
}`, why: "Boş catch xətanı gizlədir: proqram yanlış vəziyyətdə davam edir, bug-ın izi qalmır. Ya konkret tipi tut və mənalı reaksiya ver, ya da heç tutma." },
          { t: "mistake", lang: "csharp", wrong: `catch (Exception ex)
{
    throw ex;   // stack trace sıfırlanır — xətanın əsl yeri itir
}`, right: `catch (Exception ex)
{
    _logger.LogError(ex, "Xəta");
    throw;      // orijinal stack trace qorunur
}`, why: "throw ex; istisnanı yenidən «bu sətirdən» atır. Arqumentsiz throw; əsl çağırış zəncirini saxlayır. Yeni istisnaya büküləndə köhnəni innerException kimi ötür." },
          { t: "mistake", lang: "csharp", wrong: `try
{
    yas = int.Parse(giris);      // səhv giriş — adi haldır
}
catch (FormatException) { yas = 0; }`, right: `if (!int.TryParse(giris, out int yas))
    yas = 0;`, why: "İstisna bahalıdır (stack trace yığılır) və «istisnai» hallar üçündür. Gözlənilən vəziyyəti (səhv istifadəçi girişi) Try… metodları və şərtlə idarə et." },
        ],
      },
      {
        level: "senior",
        title: "İstisna strategiyası və məlumat sızması",
        blocks: [
          { t: "list", items: [
            "Qayda: «at erkən, tut gec». Yanlış arqumenti metodun girişində rədd et (guard clause); istisnanı yalnız mənalı reaksiya verə biləcəyin səviyyədə tut — adətən tətbiqin sərhədində (middleware, işçi dövrü).",
            "Tutulmalı olmayanlar: NullReferenceException, IndexOutOfRangeException — bunlar bug-dır, düzəldilməlidir. OutOfMemoryException/StackOverflowException-dan bərpa mümkün deyil.",
            "Öz istisna iyerarxiyan: domen xətaları üçün əsas sinif (DomenException) və törəmələr. Hər yerdə Exception atma — çağıran nəyi tutacağını bilməlidir.",
            "Gözlənilən uğursuzluqlar üçün alternativ: Result<T> nümunəsi və ya Try… metodu — axın açıq olur, istisna qiyməti ödənilmir.",
            "async kodda: istisna Task-ın içində saxlanır və await zamanı atılır. await olunmayan Task-ın xətası itir; Task.WhenAll bir neçə xətanı AggregateException-da toplayır; async void-də tutulmayan istisna prosesi çökdürür.",
            "finally və using təmizliyi istisna yolunda da işləyir; IAsyncDisposable üçün await using. finally-dən return etmə və orada istisna atma — orijinal xətanı əzir.",
            "Performans: istisna atmaq adi return-dən yüz dəfələrlə bahalıdır. İsti yolda (hot path) axın idarəsi üçün işlətmə.",
            "Təhlükəsizlik — məlumat sızması: ex.Message və ex.ToString() fayl yollarını, SQL mətnini, bağlantı sətrini, daxili sinif adlarını göstərir. İstifadəçiyə ümumi mesaj + korrelyasiya ID-si ver; təfərrüat yalnız jurnalda. ASP.NET-də production-da developer exception page söndürülməlidir, ProblemDetails qaytarılmalıdır.",
            "Təhlükəsizlik — fail-closed: icazə yoxlamasında catch { return true; } hər xətanı girişə çevirir. Xətada həmişə rədd et. Təhlükəsizlik yoxlamasını try-ın içində «udulan» yerə qoyma.",
            "Təhlükəsizlik — jurnal: istisna obyektinə və jurnala parol, token, kart nömrəsi düşməsin (sorğu gövdəsini bütöv loglama). İstifadəçi girişini jurnala yazanda sətir sonlarını təmizlə (log injection).",
            "Təhlükəsizlik — DoS: hücumçu qəsdən istisna yolunu işə salan sorğular göndərərək CPU-nu yeyə bilər (bahalı stack trace, sinxron jurnal). Girişi erkən və ucuz yoxla, sorğu limiti qoy.",
            "Təhlükəsizlik: giriş xətasında «istifadəçi yoxdur» və «parol səhvdir» üçün fərqli istisna mesajı vermə — hesab siyahıyaalmasına imkan yaradır.",
          ]},
          { t: "code", lang: "csharp", caption: "Sərhəddə: təfərrüat jurnala, müştəriyə ümumi cavab", code: `app.UseExceptionHandler(xetaTetbiqi => xetaTetbiqi.Run(async context =>
{
    var xeta = context.Features.Get<IExceptionHandlerFeature>()?.Error;
    var id = Activity.Current?.Id ?? context.TraceIdentifier;

    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
    logger.LogError(xeta, "Gözlənilməz xəta {XetaId}", id);   // tam təfərrüat — yalnız jurnalda

    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
    await context.Response.WriteAsJsonAsync(new
    {
        title = "Daxili xəta baş verdi",
        xetaId = id                                             // dəstək üçün
    });
}));` },
          { t: "qa", items: [
            ["throw ilə throw ex fərqi?", "throw; orijinal stack trace-i saxlayır; throw ex; onu cari sətirdən yenidən başladır — xətanın mənbəyi itir."],
            ["finally nə vaxt işləyir?", "try bloku necə bitsə də (normal, return, istisna) — resurs təmizliyi üçün. using eyni işi IDisposable üçün avtomatik edir."],
            ["İstisna nə vaxt işlədilməməlidir?", "Gözlənilən, tez-tez baş verən hallar üçün (səhv giriş, tapılmayan element) — TryParse, TryGetValue və ya Result tipi daha uyğundur."],
            ["İstisna filtri (when) nə verir?", "Şərt ödənmirsə, catch işləmir və stack açılmır — eyni tip istisnanı vəziyyətə görə ayırmağa imkan verir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "int.Parse(\"abc\") hansı istisnanı atır?", options: ["NullReferenceException", "FormatException", "DivideByZeroException"], answer: 1, why: "Sətrin formatı ədədə uyğun deyil." },
          { t: "quiz", q: "Tutulan istisnanı stack trace-i itirmədən yenidən atmaq üçün?", options: ["throw ex;", "throw;", "return ex;"], answer: 1, why: "Arqumentsiz throw orijinal izi saxlayır." },
        ],
      },
    ],
    exercise: {
      task: "Yaş yoxlayan kod yaz. 1) YasXetasiException sinfi (Exception-dan törəyir, Yas xüsusiyyəti var). 2) YasYoxla(string giris) metodu: int.TryParse alınmasa FormatException, yaş 0–150 aralığında deyilsə YasXetasiException atsın, əks halda yaşı qaytarsın. 3) Main-də \"25\", \"abc\", \"-3\" girişləri üçün try/catch: hər istisna tipi ayrıca tutulsun, fərqli mesaj çap olunsun, finally-də «yoxlama bitdi» yazılsın.",
      starter: `public class YasXetasiException : Exception\n{\n    // bura\n}\n\nstatic int YasYoxla(string giris)\n{\n    // bura\n}\n\nforeach (var giris in new[] { "25", "abc", "-3" })\n{\n    // try/catch/finally\n}\n`,
      expect: "YasXetasiException : Exception, base(mesaj) çağırır, Yas xüsusiyyəti; int.TryParse işlədilib; aralıq yoxlaması və throw new YasXetasiException; catch (FormatException) və catch (YasXetasiException ex) ayrı-ayrı (ümumi catch (Exception) yox və ya ən sonda); finally var; boş catch və throw ex; yoxdur.",
    },
  },
  {
    slug: "generics",
    title: "Generics",
    intro: "Generics — tipi parametr kimi ötürməkdir. Bir dəfə List<T> yazırsan, sonra List<int>, List<string>, List<Telebe> kimi işlədirsən: kod təkrarlanmır, tip təhlükəsizliyi isə itmir.",
    sections: [
      {
        level: "baslangic",
        title: "<T> — tip parametri",
        blocks: [
          { t: "analogy", text: "Generic sinif — üstünə etiket yapışdırılan qutudur. Qutunun forması birdir, amma etiketə «Alma» yazsan, içinə yalnız alma qoyulur; «Kitab» yazsan — yalnız kitab. Səhv şey qoymaq istəsən, anbardar (kompilyator) elə qapıda saxlayır." },
          { t: "code", lang: "csharp", code: `var ededler = new List<int> { 3, 1, 2 };
ededler.Add(5);
// ededler.Add("salam");   // XƏTA: kompilyasiya zamanı tutulur

var ballar = new Dictionary<string, int>
{
    ["Aysel"] = 92,
    ["Murad"] = 65,
};

// Öz generic sinfin
public class Qutu<T>
{
    private T _icindeki;

    public Qutu(T deyer) => _icindeki = deyer;

    public T Al() => _icindeki;
    public void Qoy(T deyer) => _icindeki = deyer;
}

var ededQutusu = new Qutu<int>(42);
int x = ededQutusu.Al();                 // cast lazım deyil

var metnQutusu = new Qutu<string>("salam");
string s = metnQutusu.Al();` },
          { t: "terms", items: [
            ["generic", "tip parametri qəbul edən sinif, metod və ya interfeys."],
            ["T", "tip parametrinin şərti adı (Type); istifadədə konkret tiplə əvəz olunur."],
            ["tip təhlükəsizliyi", "yanlış tipin kompilyasiya zamanı rədd edilməsi."],
            ["List<T>, Dictionary<TKey, TValue>", "ən çox işlənən hazır generic kolleksiyalar."],
          ]},
          { t: "tip", text: "Köhnə ArrayList hər şeyi object kimi saxlayır: cast lazımdır, xəta yalnız icra zamanı çıxır. Həmişə generic kolleksiya işlət." },
        ],
      },
      {
        level: "orta",
        title: "Generic metodlar və məhdudiyyətlər (constraints)",
        blocks: [
          { t: "code", lang: "csharp", code: `// Generic metod: T çağırışdan çıxarılır
static T EnBoyuk<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) >= 0 ? a : b;

Console.WriteLine(EnBoyuk(3, 7));            // 7
Console.WriteLine(EnBoyuk("alma", "nar"));   // nar

// Məhdudiyyətlər
public interface IVarliq { int Id { get; } }

public class Anbar<T> where T : class, IVarliq, new()
{
    private readonly Dictionary<int, T> _melumat = new();

    public void Elave(T varliq) => _melumat[varliq.Id] = varliq;

    public T? Tap(int id) => _melumat.TryGetValue(id, out var v) ? v : null;

    public T Yeni() => new T();                // new() məhdudiyyəti sayəsində
}

public class Mehsul : IVarliq
{
    public int Id { get; set; }
    public string Ad { get; set; } = "";
}

var anbar = new Anbar<Mehsul>();
anbar.Elave(new Mehsul { Id = 1, Ad = "Klaviatura" });
Console.WriteLine(anbar.Tap(1)?.Ad);` },
          { t: "code", lang: "text", caption: "Məhdudiyyət növləri", code: `where T : class          istinad tipi olmalıdır
where T : struct         dəyər tipi olmalıdır
where T : notnull        null ola bilməz
where T : new()          parametrsiz konstruktoru olmalıdır
where T : BazaSinif      həmin sinifdən törəməlidir
where T : IInterfeys     interfeysi həyata keçirməlidir
where T : unmanaged      idarə olunmayan sadə tip (int, double, sadə struct)` },
          { t: "mistake", lang: "csharp", wrong: `public class Kes
{
    private readonly Dictionary<string, object> _d = new();
    public object Al(string acar) => _d[acar];
}
var say = (int)kes.Al("say");    // cast; səhv tip — icra zamanı çökür`, right: `public class Kes<T>
{
    private readonly Dictionary<string, T> _d = new();
    public T Al(string acar) => _d[acar];
}
int say = sayKesi.Al("say");`, why: "object ilə işləmək tip yoxlamasını icra zamanına saxlayır və dəyər tiplərində boxing yaradır. Generic həm təhlükəsiz, həm sürətlidir." },
          { t: "mistake", lang: "csharp", wrong: `static T Topla<T>(T a, T b) => a + b;   // XƏTA: T-nin + operatoru olduğu bilinmir`, right: `static T Topla<T>(T a, T b) where T : INumber<T> => a + b;   // .NET 7+`, why: "Kompilyator T haqqında yalnız məhdudiyyətin dediyini bilir. Əməliyyat lazımdırsa, onu verən interfeysi məhdudiyyət kimi yaz." },
        ],
      },
      {
        level: "senior",
        title: "Variance, reifikasiya, performans və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Kovariantlıq (out T): IEnumerable<Pisik> → IEnumerable<Heyvan> mənimsədilə bilir — T yalnız çıxışda işlənir. Kontravariantlıq (in T): IComparer<Heyvan> → IComparer<Pisik>. List<T> invariantdır: List<Pisik> List<Heyvan> deyil.",
            "C# generic-ləri reifikasiya olunub: tip məlumatı icra zamanında qalır (typeof(T) işləyir) — Java-dakı tip silinməsindən (erasure) fərqli.",
            "JIT hər dəyər tipi üçün ayrıca ixtisaslaşmış kod yaradır (List<int> boxing-siz işləyir), istinad tipləri isə bir kodu paylaşır. Ona görə List<int> ArrayList-dən qat-qat sürətlidir.",
            "Generic sinifdə static sahə hər qapalı tip üçün ayrıdır: Kes<int>.Say və Kes<string>.Say müxtəlif dəyişənlərdir.",
            "default(T) — istinad tipi üçün null, dəyər tipi üçün sıfır. T? nullable annotasiyası məhdudiyyətdən asılı olaraq fərqli davranır.",
            "Generic riyaziyyat (INumber<T>, static abstract üzvlər) və generic atributlar (C# 11) kitabxana kodunu sadələşdirir. Həddən artıq generic kod isə oxunmaz olur — real təkrar olanda tətbiq et.",
            "Təhlükəsizlik — deserializasiya: JsonSerializer.Deserialize<T> T-ni SƏN seçəndə təhlükəsizdir. Tipi girişdən götürmək (Type.GetType(sorgu.Tip), Newtonsoft TypeNameHandling.All, BinaryFormatter) hücumçuya ixtiyari sinfi yaratmağa imkan verir → uzaqdan kod icrası. BinaryFormatter-i heç işlətmə.",
            "Təhlükəsizlik — generic anbar və icazə: Anbar<T>.Tap(id) kimi ümumi metod sahiblik yoxlamasını «unudur» — hər varlıq üçün eyni açıq qapı (IDOR). Filtri (istifadəçi/tenant) generic qatın özünə məcburi daxil et: where T : ISahibli.",
            "Təhlükəsizlik — mass assignment: Yenile<T>(id, T melumat) kimi ümumi yeniləmə gövdədən gələn bütün sahələri (Rol, Balans) yazır. Hər əməliyyat üçün ayrıca giriş modeli (DTO) işlət.",
            "Təhlükəsizlik — paylaşılan generic keş: Kes<T> açarında istifadəçi kimliyi yoxdursa, bir istifadəçinin məlumatı digərinə qayıdır. Açara kimliyi daxil et, ölçünü məhdudlaşdır.",
            "Təhlükəsizlik: reflection ilə MakeGenericType/MakeGenericMethod-a istifadəçi girişindən gələn tip adı ötürmə — yalnız ağ siyahı.",
          ]},
          { t: "code", lang: "csharp", caption: "Sahiblik filtri generic qatın içində", code: `public interface ISahibli
{
    int Id { get; }
    int SahibId { get; }
}

public class QorunanAnbar<T> where T : class, ISahibli
{
    private readonly List<T> _melumat = new();
    private readonly int _cariIstifadeciId;

    public QorunanAnbar(int cariIstifadeciId) => _cariIstifadeciId = cariIstifadeciId;

    // filtrsiz oxuma yolu YOXDUR
    public T? Tap(int id) =>
        _melumat.FirstOrDefault(x => x.Id == id && x.SahibId == _cariIstifadeciId);

    public IReadOnlyList<T> Hamisi() =>
        _melumat.Where(x => x.SahibId == _cariIstifadeciId).ToArray();
}` },
          { t: "qa", items: [
            ["Generics nə verir?", "Kodun təkrar istifadəsi + kompilyasiya zamanı tip təhlükəsizliyi + dəyər tiplərində boxing-in olmaması."],
            ["Constraint nə üçündür?", "T-nin hansı tiplər ola biləcəyini məhdudlaşdırır və kompilyatora T üzərində hansı üzvlərin çağırıla biləcəyini bildirir."],
            ["Kovariantlıq və kontravariantlıq nədir?", "out T — daha törəmə tipdən əsas tipə çevrilmə (çıxış mövqeyi); in T — əksinə (giriş mövqeyi)."],
            ["Niyə List<Pisik> List<Heyvan>-a mənimsədilmir?", "List həm oxuyur, həm yazır: icazə verilsəydi, pişik siyahısına it əlavə etmək mümkün olardı. IEnumerable<out T> yalnız oxuduğu üçün təhlükəsizdir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "List<int>-ə \"salam\" əlavə etsən nə olar?", options: ["İcra zamanı xəta", "Kompilyasiya xətası", "0 kimi əlavə olunur"], answer: 1, why: "Generic tip yoxlaması kompilyasiya zamanı aparılır." },
          { t: "quiz", q: "where T : new() nə deməkdir?", options: ["T yeni versiyadır", "T-nin parametrsiz konstruktoru var", "T interfeysdir"], answer: 1, why: "Bu məhdudiyyət new T() yazmağa imkan verir." },
        ],
      },
    ],
    exercise: {
      task: "1) Generic Yigin<T> (stack) sinfi yaz: Qoy(T), T Cixar() (boşdursa InvalidOperationException), bool TryCixar(out T? deyer), int Say, bool Bosdur. Daxildə List<T> işlət. 2) Generic metod: static T EnKicik<T>(IEnumerable<T> elementler) where T : IComparable<T> — boş kolleksiyada ArgumentException atsın. 3) Yigin<int> və Yigin<string> ilə sına; EnKicik-i ədədlər və sətirlər üçün çağır.",
      starter: `public class Yigin<T>\n{\n    private readonly List<T> _elementler = new();\n\n    // bura\n}\n\n// EnKicik<T>\n\n// sınaq\n`,
      expect: "Yigin<T>-də Qoy Add ilə, Cixar son elementi qaytarıb silir, boşda throw new InvalidOperationException; TryCixar out parametri və bool; Say və Bosdur xüsusiyyət; EnKicik-də where T : IComparable<T> və CompareTo müqayisəsi, boşda ArgumentException; object və cast işlədilməyib; iki fərqli tip arqumenti ilə sınaq.",
    },
  },
  {
    slug: "linq",
    title: "LINQ",
    intro: "LINQ (Language Integrated Query) — kolleksiyalar üzərində sorğu yazmağın C# yoludur: filtrlə, seç, sırala, qruplaşdır. Dövr və şərtlərin əvəzinə nə istədiyini yazırsan.",
    sections: [
      {
        level: "baslangic",
        title: "Where, Select, OrderBy",
        blocks: [
          { t: "analogy", text: "LINQ — konveyer xəttidir. Lentə meyvələr düzülüb. Birinci işçi çürükləri atır (Where), ikincisi qalanları soyur (Select), üçüncüsü ölçüyə görə düzür (OrderBy). Hər işçi bir iş görür, məhsul bir stansiyadan o birinə keçir." },
          { t: "code", lang: "csharp", code: `var telebeler = new List<Telebe>
{
    new("Aysel", 92, "Bakı"),
    new("Murad", 65, "Gəncə"),
    new("Leyla", 78, "Bakı"),
    new("Tural", 45, "Sumqayıt"),
};

var kecenler = telebeler
    .Where(t => t.Bal >= 51)            // filtr
    .OrderByDescending(t => t.Bal)      // sıralama
    .Select(t => t.Ad);                 // yalnız ad

foreach (var ad in kecenler)
    Console.WriteLine(ad);              // Aysel, Leyla, Murad

Console.WriteLine(telebeler.Count(t => t.Seher == "Bakı"));   // 2
Console.WriteLine(telebeler.Average(t => t.Bal));              // 70
Console.WriteLine(telebeler.Max(t => t.Bal));                  // 92
Console.WriteLine(telebeler.Any(t => t.Bal < 50));             // True
Console.WriteLine(telebeler.First(t => t.Seher == "Gəncə").Ad);

public record Telebe(string Ad, int Bal, string Seher);` },
          { t: "terms", items: [
            ["LINQ", "kolleksiyalar üçün sorğu metodları toplusu (System.Linq)."],
            ["lambda", "qısa anonim funksiya: t => t.Bal >= 51."],
            ["Where", "şərtə uyğun elementləri saxlayır."],
            ["Select", "hər elementi yeni formaya çevirir (proyeksiya)."],
            ["OrderBy / OrderByDescending", "artan / azalan sıra."],
          ]},
          { t: "tip", text: "LINQ SQL-ə çox oxşayır: Where = WHERE, Select = SELECT, OrderBy = ORDER BY, GroupBy = GROUP BY, Join = JOIN." },
        ],
      },
      {
        level: "orta",
        title: "GroupBy, Join, proyeksiya və gecikmiş icra",
        blocks: [
          { t: "code", lang: "csharp", code: `// Qruplaşdırma
var seherler = telebeler
    .GroupBy(t => t.Seher)
    .Select(q => new
    {
        Seher = q.Key,
        Say = q.Count(),
        Orta = q.Average(t => t.Bal),
    })
    .OrderByDescending(x => x.Orta);

foreach (var s in seherler)
    Console.WriteLine($"{s.Seher}: {s.Say} tələbə, orta {s.Orta:F1}");

// Lüğətə çevirmək, hissələrə bölmək, səhifələmək
Dictionary<string, int> ballar = telebeler.ToDictionary(t => t.Ad, t => t.Bal);
var ilkIki = telebeler.OrderBy(t => t.Ad).Skip(0).Take(2).ToList();
var adlar = string.Join(", ", telebeler.Select(t => t.Ad));

// Təhlükəsiz axtarış
Telebe? tapilan = telebeler.FirstOrDefault(t => t.Ad == "Kamran");   // null
Console.WriteLine(tapilan?.Ad ?? "tapılmadı");

// SelectMany: iç-içə kolleksiyanı düzləşdirir
var sifarisler = new[] { new[] { "qələm", "dəftər" }, new[] { "çanta" } };
var butunMehsullar = sifarisler.SelectMany(s => s).Distinct().ToList();

// Sorğu sintaksisi (eyni nəticə)
var bakililar = from t in telebeler
                where t.Seher == "Bakı"
                orderby t.Ad
                select t.Ad;` },
          { t: "p", text: "Gecikmiş icra (deferred execution): Where, Select kimi metodlar dərhal heç nə hesablamır — yalnız «resepti» qurur. Hesablama nəticə tələb olunanda başlayır: foreach, ToList(), Count(), First()." },
          { t: "mistake", lang: "csharp", wrong: `var kecenler = telebeler.Where(t => t.Bal >= 51);   // hələ hesablanmayıb

Console.WriteLine(kecenler.Count());                 // 1-ci dəfə gəzilir
foreach (var t in kecenler) { }                      // 2-ci dəfə
var siyahi = kecenler.ToList();                      // 3-cü dəfə`, right: `var kecenler = telebeler.Where(t => t.Bal >= 51).ToList();   // bir dəfə hesabla

Console.WriteLine(kecenler.Count);
foreach (var t in kecenler) { }`, why: "Gecikmiş sorğu hər gəzintidə yenidən icra olunur. Mənbə baza və ya bahalı hesablamadırsa, eyni iş üç dəfə görülür. Nəticə bir neçə dəfə lazımdırsa, ToList() ilə sabitlə." },
          { t: "mistake", lang: "csharp", wrong: `var t = telebeler.First(t => t.Ad == "Kamran");   // yoxdur → InvalidOperationException`, right: `var t = telebeler.FirstOrDefault(t => t.Ad == "Kamran");
if (t is null) { /* tapılmadı */ }`, why: "First və Single element tapmasa istisna atır. Elementin olmaya biləcəyi halda …OrDefault işlət və null-u yoxla." },
          { t: "mistake", lang: "csharp", wrong: `if (telebeler.Where(t => t.Bal > 90).Count() > 0) { }`, right: `if (telebeler.Any(t => t.Bal > 90)) { }`, why: "Count() bütün kolleksiyanı gəzir. Any() ilk uyğun elementdə dayanır — daha sürətli və niyyəti aydın." },
        ],
      },
      {
        level: "senior",
        title: "IEnumerable və IQueryable, performans, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "IEnumerable<T> — yaddaşda, delegatlarla icra olunur (LINQ to Objects). IQueryable<T> — ifadə ağacı (expression tree) qurur və provayder (EF Core) onu SQL-ə çevirir.",
            "Sərhəd vacibdir: AsEnumerable() və ya ToList()-dən sonrakı hər şey yaddaşda işləyir. db.Sifarisler.ToList().Where(...) bütün cədvəli yükləyir; db.Sifarisler.Where(...).ToList() isə filtri bazada edir.",
            "EF Core tərcümə edə bilmədiyi metodu (öz C# funksiyan) sorğuda görsə, istisna atır — sorğunu SQL-ə çevrilən ifadələrlə yaz və ya şüurlu şəkildə AsEnumerable() ilə client tərəfə keç.",
            "N+1: dövr içində naviqasiya xüsusiyyətinə müraciət hər sətir üçün ayrıca sorğu göndərir. Include / proyeksiya (Select ilə DTO) işlət; yalnız lazım olan sütunları seç.",
            "Yalnız oxuma sorğularında AsNoTracking() dəyişiklik izləməsini söndürür — yaddaş və vaxt qazancı.",
            "LINQ to Objects qiyməti: hər operator iterator və delegat ayırır. İsti dövrdə adi for/Span daha sürətlidir — amma əvvəl ölç. .NET 9-da bir çox LINQ metodu xeyli optimallaşdırılıb.",
            "Yeni metodlar: Chunk, DistinctBy, MinBy/MaxBy, Zip (üçlü), CountBy, AggregateBy, Index.",
            "Closure tələsi: lambda dəyişənin özünü tutur, dəyərini yox. Gecikmiş sorğu icra olunanda dəyişən artıq dəyişmiş ola bilər.",
            "Təhlükəsizlik — injection: LINQ → SQL tərcüməsi dəyərləri parametr kimi göndərir, ona görə adi LINQ injection-dan qoruyur. Təhlükə xam SQL-dədir: FromSqlRaw($\"... WHERE Ad = '{ad}'\") — injection. FromSqlInterpolated / FromSql (parametrləşdirir) işlət. Dynamic LINQ-ə istifadəçi sətri verməmək lazımdır.",
            "Təhlükəsizlik — sıralama/filtr sahəsi: OrderBy sütununu istifadəçidən gələn adla reflection/dinamik ifadə ilə qurma — gizli sütuna görə sıralama məlumat sızdırır (məs. ParolHesi üzrə sıralayıb simvol-simvol çıxarmaq). Yalnız ağ siyahıdakı sahələr.",
            "Təhlükəsizlik — limitsiz nəticə (DoS): ToList() öncəsi həmişə Take(maksimum). Səhifə ölçüsünü serverdə məhdudlaşdır; istifadəçi «pageSize=10000000» göndərə bilər.",
            "Təhlükəsizlik — icazə filtri bazada: db.Senedler.ToList().Where(s => s.SahibId == id) bütün sənədləri yaddaşa çəkir, filtr unudulanda isə hamısını qaytarır. Filtri IQueryable üzərində yaz; çoxkirayəçili sistemdə EF Core qlobal sorğu filtri (HasQueryFilter) işlət.",
            "Təhlükəsizlik — artıq məlumat: varlığı (entity) birbaşa qaytarma — Select ilə DTO-ya proyeksiya et ki, ParolHesi və daxili sahələr cavaba düşməsin.",
          ]},
          { t: "code", lang: "csharp", caption: "Təhlükəsiz və səmərəli sorğu (EF Core)", code: `private static readonly Dictionary<string, Expression<Func<Sifaris, object>>> Siralamalar = new()
{
    ["tarix"] = s => s.Tarix,
    ["mebleg"] = s => s.Mebleg,
};

public async Task<List<SifarisDto>> SifarisleriAl(int istifadeciId, string siralama, int sehife, int olcu)
{
    olcu = Math.Clamp(olcu, 1, 100);                         // üst hədd
    if (!Siralamalar.TryGetValue(siralama, out var acar))    // ağ siyahı
        acar = Siralamalar["tarix"];

    return await _db.Sifarisler
        .AsNoTracking()
        .Where(s => s.IstifadeciId == istifadeciId)          // icazə filtri — bazada
        .OrderByDescending(acar)
        .Skip((Math.Max(sehife, 1) - 1) * olcu)
        .Take(olcu)
        .Select(s => new SifarisDto(s.Id, s.Tarix, s.Mebleg)) // yalnız lazımi sütunlar
        .ToListAsync();
}` },
          { t: "qa", items: [
            ["Gecikmiş icra nədir?", "Sorğu təyin olunanda yox, nəticəsi gəzilən anda icra olunur; hər gəzintidə yenidən hesablanır."],
            ["IEnumerable ilə IQueryable fərqi?", "IEnumerable yaddaşda delegatlarla işləyir; IQueryable ifadə ağacını provayderə verir və sorğu mənbədə (SQL) icra olunur."],
            ["First, FirstOrDefault, Single fərqi?", "First — ilk uyğun, yoxdursa istisna; FirstOrDefault — yoxdursa default; Single — dəqiq bir element olmalıdır, əks halda istisna."],
            ["Select ilə SelectMany fərqi?", "Select hər elementi birə-bir çevirir; SelectMany hər elementdən kolleksiya alıb hamısını bir ardıcıllığa düzləşdirir."],
            ["LINQ SQL injection-dan qoruyurmu?", "Bəli, dəyərlər parametr kimi ötürülür. Risk xam SQL sətirlərini birləşdirəndə və dinamik sorğu qurulanda yaranır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yalnız şərtə uyğun elementləri saxlayan metod?", options: ["Select", "Where", "OrderBy"], answer: 1, why: "Where filtrləyir, Select çevirir." },
          { t: "quiz", q: "«Ən azı biri varmı?» üçün ən uyğunu?", options: ["Count() > 0", "Any()", "First()"], answer: 1, why: "Any ilk uyğun elementdə dayanır." },
          { t: "quiz", q: "var q = siyahi.Where(...); — bu sətirdə filtr icra olunur?", options: ["Bəli, dərhal", "Xeyr, nəticə gəziləndə", "Yalnız debug-da"], answer: 1, why: "LINQ sorğuları gecikmiş icra olunur." },
        ],
      },
    ],
    exercise: {
      task: "Məhsullar siyahısı üzərində LINQ sorğuları yaz: 1) stokda olan (Stok > 0) məhsulların adları, qiymətə görə artan; 2) ən bahalı 3 məhsul; 3) kateqoriyaya görə qruplaşdır: kateqoriya, məhsul sayı, orta qiymət; 4) ümumi anbar dəyəri (Qiymet × Stok cəmi); 5) «Monitor» adlı məhsulu təhlükəsiz tap və yoxdursa «tapılmadı» çap et; 6) qiyməti 100-dən baha məhsul varmı? Hər nəticəni çap et.",
      starter: `var mehsullar = new List<Mehsul>\n{\n    new("Klaviatura", "Aksesuar", 89m, 12),\n    new("Siçan", "Aksesuar", 35m, 0),\n    new("Noutbuk", "Kompüter", 1850m, 4),\n    new("Planşet", "Kompüter", 640m, 7),\n    new("Qulaqlıq", "Səs", 120m, 20),\n};\n\n// sorğular\n\npublic record Mehsul(string Ad, string Kateqoriya, decimal Qiymet, int Stok);\n`,
      expect: "1) Where + OrderBy + Select; 2) OrderByDescending + Take(3); 3) GroupBy + Select anonim tip (Key, Count(), Average); 4) Sum(m => m.Qiymet * m.Stok); 5) FirstOrDefault + null yoxlaması (First yox); 6) Any (Count() > 0 yox); foreach/for ilə əl filtri yoxdur; decimal saxlanılıb.",
    },
  },
];
