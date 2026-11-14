import type { Lesson } from "../types";

export const cppB: Lesson[] = [
  {
    slug: "dovrler",
    title: "Dövrlər",
    intro: "Dövr (loop) eyni əməliyyatı şərt ödənənə qədər təkrarlayır. C++-da dörd əsas forma var: for, while, do-while və müasir range-based for. Dövrlərdəki kiçik səhvlər (bir vahid səhv, işarəsiz say) ən çox rast gəlinən böyük xətalara çevrilir.",
    sections: [
      {
        level: "baslangic",
        title: "Dövr növləri və sintaksis",
        blocks: [
          { t: "analogy", text: "Dövr — idman zalında «10 dəfə qaldır» tapşırığıdır. Sayğac saxlayırsan (for), «yorulana qədər» davam edirsən (while) və ya əvvəlcə bir dəfə qaldırıb sonra yoxlayırsan (do-while). Sayğacı səhv saysan, ya az, ya çox qaldırarsan." },
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <vector>

int main() {
    // 1) for: say məlumdur
    for (int i = 1; i <= 5; ++i) {
        std::cout << i << " ";
    }
    std::cout << '\\n';

    // 2) while: şərt əvvəlcə yoxlanır
    int qaliq = 3;
    while (qaliq > 0) {
        std::cout << "Qalıb: " << qaliq << '\\n';
        --qaliq;
    }

    // 3) do-while: ən azı bir dəfə işləyir
    int say = 0;
    do {
        std::cout << "Bir dəfə mütləq işləyir\\n";
        ++say;
    } while (say < 1);

    // 4) range-based for (C++11): konteynerin hər elementi
    std::vector<int> ballar = {80, 95, 70};
    for (int bal : ballar) {
        std::cout << bal << " ";
    }
    std::cout << '\\n';

    // break və continue
    for (int i = 1; i <= 10; ++i) {
        if (i % 2 == 0) continue;   // cütləri keç
        if (i > 7) break;           // 7-dən sonra dayan
        std::cout << i << " ";      // 1 3 5 7
    }
    std::cout << '\\n';
    return 0;
}` },
          { t: "terms", items: [
            ["for", "başlanğıc; şərt; addım üçlüyü ilə sayğaclı dövr."],
            ["while", "şərt doğru olduqca təkrarlayan dövr (şərt əvvəl yoxlanır)."],
            ["do-while", "gövdə əvvəl işləyir, şərt sonra yoxlanır."],
            ["range-based for", "konteynerin elementlərini indekssiz gəzən qısa forma."],
            ["break / continue", "dövrü tam dayandırır / cari addımı keçib növbətiyə keçir."],
            ["sonsuz dövr (infinite loop)", "şərti heç vaxt yalan olmayan dövr: while (true)."],
          ]},
          { t: "tip", text: "Elementləri sadəcə oxuyursansa, for (const auto& x : konteyner) yaz. Surətə yox, referansa baxmaq həm sürətli, həm təhlükəsizdir." },
        ],
      },
      {
        level: "orta",
        title: "Real nümunələr, off-by-one və işarəsiz say tələsi",
        blocks: [
          { t: "code", lang: "cpp", caption: "Referansla dəyişmə, indeksli for, sonsuz dövrdən çıxış", code: `#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<int> qiymetler = {10, 20, 30};

    // Referansla (int&) elementin özünü dəyişirik
    for (int& q : qiymetler) {
        q += 5;                       // 15 25 35
    }

    // Indeks lazımdırsa: size_t istifadə et
    for (std::size_t i = 0; i < qiymetler.size(); ++i) {
        std::cout << i << ": " << qiymetler[i] << '\\n';
    }

    // Sonsuz dövr + break: istifadəçidən giriş
    while (true) {
        std::string emr;
        std::cout << "Əmr (çıx): ";
        if (!(std::cin >> emr)) break;   // giriş bitdisə çıx
        if (emr == "çıx") break;
        std::cout << "Əmr qəbul edildi: " << emr << '\\n';
    }

    // C++17: tuple/map üçün structured binding
    // for (const auto& [acar, deyer] : xerite) { ... }
    return 0;
}` },
          { t: "list", items: [
            "for (int i = 0; i < n; ++i) — «0-dan n-ə qədər, n daxil deyil» deməkdir. n element varsa indekslər 0..n-1-dir.",
            "++i və i++ int üçün eynidir, amma iterator-larda ++i bir qədər ucuzdur (müvəqqəti nüsxə yaranmır). Vərdiş et: ++i.",
            "Range-based for daxildə begin()/end() çağırır. Elementi surətləmək istəmirsənsə, const auto& yaz.",
            "Dövr dəyişəni for-un daxilində elan olunur və yalnız orada görünür (scope).",
            "Daxili dövrdən break yalnız ən yaxın dövrü kəsir; iç-içə dövrdən çıxmaq üçün bayraq və ya funksiyaya return işlət.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v = {1, 2, 3};
for (std::size_t i = 0; i <= v.size(); ++i) {   // <= səhvdir
    std::cout << v[i] << '\\n';                  // i == 3: sərhəddən kənar! (UB)
}`, right: `std::vector<int> v = {1, 2, 3};
for (std::size_t i = 0; i < v.size(); ++i) {
    std::cout << v[i] << '\\n';
}
// və ya sadəcə:
for (int x : v) std::cout << x << '\\n';`, why: "Off-by-one: <= ilə sonuncu ötürülür və v[3] mövcud olmayan elementi oxuyur. Bu, undefined behavior-dur: proqram çökə, zibil çıxara və ya «işləyə» bilər. Range-based for bu səhvi mümkünsüz edir." },
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v = {1, 2, 3};
// tərsinə gəzmək (UB deyil, amma sonsuz dövr!)
for (std::size_t i = v.size() - 1; i >= 0; --i) {
    std::cout << v[i] << '\\n';
}`, right: `std::vector<int> v = {1, 2, 3};
for (std::size_t i = v.size(); i-- > 0; ) {
    std::cout << v[i] << '\\n';
}
// və ya iterator ilə:
for (auto it = v.rbegin(); it != v.rend(); ++it) {
    std::cout << *it << '\\n';
}`, why: "size_t işarəsizdir (unsigned): 0-dan 1 çıxanda mənfi olmur, çox böyük ədədə «dolanır» (wrap-around). i >= 0 isə işarəsiz ədəd üçün həmişə doğrudur — dövr bitmir və v[çox böyük] oxunur. Tərs dövrdə i-- > 0 və ya reverse iterator işlət." },
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v = {1, 2, 3};
for (int x : v) {
    if (x == 2) v.push_back(99);   // dövr zamanı konteyneri böyüdürük
}`, right: `std::vector<int> v = {1, 2, 3};
std::vector<int> elave;
for (int x : v) {
    if (x == 2) elave.push_back(99);
}
v.insert(v.end(), elave.begin(), elave.end());`, why: "push_back yaddaşı yenidən bölüşdürə bilər — dövrün iterator-ları köhnə yaddaşa baxır (iterator invalidation). Bu, use-after-free kimi davranır. Gəzərkən konteynerin ölçüsünü dəyişmə; dəyişiklikləri ayrıca yığıb sonda tətbiq et." },
        ],
      },
      {
        level: "senior",
        title: "Daxildə necə işləyir, performans və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Range-based for kompilyator tərəfindən belə açılır: auto it = konteyner.begin(); auto son = konteyner.end(); it != son; ++it. Bu səbəbdən konteyneri dövr zamanı dəyişmək iterator-ları etibarsız edir.",
            "Iterator invalidation qaydaları konteynerə görə fərqlənir: vector-da push_back/insert/erase iterator-ları (böyütmədə hamısını) pozur; list-də yalnız silinən element pozulur; map/set-də yalnız silinən element. erase-in qaytardığı iteratoru istifadə et: it = v.erase(it).",
            "Kompilyator sadə dövrləri açır (unrolling) və vektorlaşdırır (SIMD). Dövr gövdəsində pointer aliasing, virtual çağırış və ya istisna bunu əngəlləyir.",
            "Hər iterasiyada v.size() çağırmaq adətən pulsuzdur (inline), amma şərtdə bahalı funksiya (strlen, map axtarışı) olmamalıdır — əvvəlcə dəyişənə yaz.",
            "Kəşf edilmiş «erase-remove» idiomu: v.erase(std::remove_if(v.begin(), v.end(), şərt), v.end()) — dövrdən təhlükəsiz silmə. C++20: std::erase_if(v, şərt).",
            "Mümkündürsə, əl ilə dövr əvəzinə <algorithm> işlət: std::for_each, std::find_if, std::accumulate. Niyyət aydın olur, off-by-one olmur.",
            "Təhlükəsizlik — sərhəddən kənar oxu/yazı: dövr indeksi massiv ölçüsünü aşanda buffer overflow yaranır (Heartbleed bu tipli səhvdən olub). Ölçünü həmişə konteynerdən al, əl ilə yazılmış rəqəmdən yox.",
            "Təhlükəsizlik — işarəli ədəd daşması (signed integer overflow) undefined behavior-dur: for (int i = 1; i > 0; i *= 2) kimi dövrlərdə kompilyator hər şeyi güman edib kodu «optimallaşdıra» bilər. Gözlənilən daşma üçün unsigned istifadə et və ya yoxla.",
            "Təhlükəsizlik — xarici girişlə idarə olunan dövr: istifadəçinin göndərdiyi say dövri milyardlarla təkrarlaya bilər (DoS). Sayı yuxarıdan məhdudlaşdır, vaxt/ölçü limiti qoy.",
            "Təhlükəsizlik — signed/unsigned müqayisə: int i < v.size() müqayisəsində i mənfi olsa belə işarəsiz ədədə çevrilir və böyük müsbət olur. Kompilyatorun -Wsign-compare xəbərdarlığını aç, xəbərdarlıqları xəta et (-Werror).",
            "Alətlər: -fsanitize=address,undefined (ASan/UBSan) sərhəddən kənar və daşma səhvlərini işləmə zamanı tutur; testlərdə həmişə aç.",
          ]},
          { t: "code", lang: "cpp", caption: "Təhlükəsiz silmə və limitli dövr", code: `#include <algorithm>
#include <cstddef>
#include <iostream>
#include <vector>

// Gələn sayı məhdudlaşdırırıq: DoS-a qarşı
constexpr std::size_t MAKS_TEKRAR = 1000;

void salamlar(std::size_t istenilen) {
    const std::size_t say = std::min(istenilen, MAKS_TEKRAR);
    for (std::size_t i = 0; i < say; ++i) {
        std::cout << "Salam " << i << '\\n';
    }
}

int main() {
    std::vector<int> ededler = {1, 2, 3, 4, 5, 6};

    // Düzgün silmə: erase iteratoru qaytarır
    for (auto it = ededler.begin(); it != ededler.end(); ) {
        if (*it % 2 == 0) {
            it = ededler.erase(it);   // növbəti etibarlı iterator
        } else {
            ++it;
        }
    }

    // Və ya erase-remove idiomu
    ededler.erase(std::remove_if(ededler.begin(), ededler.end(),
                                 [](int x) { return x > 3; }),
                  ededler.end());

    for (int x : ededler) std::cout << x << ' ';   // 1
    std::cout << '\\n';
    salamlar(5000000000ULL);   // 1000-ə kəsilir
    return 0;
}` },
          { t: "qa", items: [
            ["for və while arasında fərq nədir?", "Mahiyyətcə eynidirlər. for sayğac başlanğıcını, şərtini və addımını bir yerdə göstərir; sayı məlum olanda aydındır. while şərt əsaslı təkrar üçündür."],
            ["Range-based for daxildə necə işləyir?", "begin()/end() iteratorlarına açılır: auto it = begin; it != end; ++it, hər addımda *it elementə bağlanır."],
            ["Iterator invalidation nədir?", "Konteyner dəyişəndə (vector-da push_back və s.) əvvəlki iterator/referansların etibarsız olması. Onlardan istifadə undefined behavior-dur."],
            ["for (size_t i = n - 1; i >= 0; --i) niyə sonsuz dövrdür?", "size_t işarəsizdir, 0-dan 1 çıxanda çox böyük ədəd olur; i >= 0 həmişə doğrudur."],
            ["Signed integer overflow niyə təhlükəlidir?", "Standartda undefined behavior-dur: kompilyator daşma olmayacağını fərz edib kodu dəyişə bilər; nəticə proqnozsuzdur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı dövr gövdəsini ən azı bir dəfə işlədir?", options: ["for", "while", "do-while"], answer: 2, why: "do-while şərti gövdədən sonra yoxlayır." },
          { t: "quiz", q: "n elementli vektoru düzgün gəzən şərt hansıdır?", options: ["i <= n", "i < n", "i == n"], answer: 1, why: "İndekslər 0..n-1-dir; i <= n sonuncudan sonra oxuyur (off-by-one)." },
          { t: "quiz", q: "for (size_t i = 5; i >= 0; --i) niyə problemdir?", options: ["size_t mənfi ola bilmir, dövr bitmir", "size_t çox yavaşdır", "Heç problem yoxdur"], answer: 0, why: "İşarəsiz ədəd 0-dan sonra çox böyük ədədə dolanır, i >= 0 həmişə doğrudur." },
        ],
      },
    ],
    exercise: {
      task: "main funksiyasında `std::vector<int> ballar = {55, 90, 72, 38, 100, 61};` elan et. 1) Range-based for ilə (const auto&) cəmi və ən böyük balı tap. 2) Indeksli dövrlə (std::size_t) yalnız 60-dan yuxarı balları indeksi ilə çap et. 3) Vektoru tərsinə, işarəsiz say tələsinə düşmədən (i-- > 0 və ya reverse iterator) çap et. 4) 50-dən aşağı balları erase-remove idiomu ilə sil. 5) Şərhdə niyə i <= ballar.size() səhv olduğunu bir cümlə ilə yaz.",
      starter: `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> ballar = {55, 90, 72, 38, 100, 61};

    // Həllini bura yaz

    return 0;
}
`,
      expect: "Range-based for (const auto& və ya int) ilə cəm və maksimum; std::size_t indeksli for ilə i < ballar.size() şərti və 60-dan yuxarı filtr; tərs gəzmə i-- > 0 forması və ya rbegin()/rend() (i >= 0 ilə size_t YOX); erase(std::remove_if(...), end()) və ya std::erase_if ilə 50-dən aşağıların silinməsi; şərhdə off-by-one/sərhəddən kənar oxu izah olunub; kod kompilyasiya olunan düzgün C++ olmalıdır.",
    },
  },
  {
    slug: "funksiyalar",
    title: "Funksiyalar",
    intro: "Funksiya adlandırılmış kod blokudur: parametr alır, nəticə qaytarır və təkrar çağırıla bilir. C++-da parametrin necə ötürüldüyü (dəyərlə, referansla, const referansla) həm sürətə, həm təhlükəsizliyə birbaşa təsir edir.",
    sections: [
      {
        level: "baslangic",
        title: "Elan, tərif və parametr ötürmə",
        blocks: [
          { t: "analogy", text: "Funksiya — mətbəxdəki reseptdir. Resepti (tərif) bir dəfə yazırsan, hər dəfə «plov bişir» (çağırış) deyəndə istifadə olunur. Parametr ötürmə isə belədir: dəyərlə — ona bir kopya verirsən; const referansla — kitabı oxumağa verirsən, yazmağa yox; referansla — öz dəftərini verirsən, o içinə yaza bilər." },
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <string>

// Prototip (elan): kompilyator çağırışdan əvvəl imzanı bilməlidir
int topla(int a, int b);
void salamla(const std::string& ad);
void artir(int& say);

int main() {
    std::cout << topla(2, 3) << '\\n';   // 5
    salamla("Aysel");

    int sayac = 0;
    artir(sayac);
    artir(sayac);
    std::cout << sayac << '\\n';          // 2
    return 0;
}

// Tərif (gövdə)
int topla(int a, int b) {
    return a + b;
}

void salamla(const std::string& ad) {   // surət çıxarılmır, dəyişmək olmaz
    std::cout << "Salam, " << ad << "!\\n";
}

void artir(int& say) {                  // orijinalı dəyişir
    ++say;
}` },
          { t: "terms", items: [
            ["prototip (declaration)", "funksiyanın adı, parametr və qaytarma tipi; gövdəsiz elan."],
            ["tərif (definition)", "gövdəsi ilə tam funksiya."],
            ["dəyərlə ötürmə", "parametr arqumentin surətidir; funksiya orijinala toxunmur."],
            ["const referans", "const T& — surətsiz, yalnız oxumaq üçün ötürmə."],
            ["referans", "T& — orijinalın ləqəbi; funksiya onu dəyişə bilər."],
            ["void", "heç nə qaytarmayan funksiya tipi."],
          ]},
          { t: "tip", text: "Qayda: kiçik tiplər (int, double, char) dəyərlə; böyük tiplər (string, vector) const T& ilə; dəyişmək lazımdırsa T&. Bu qayda 90% halı örtür." },
        ],
      },
      {
        level: "orta",
        title: "Overloading, default arqument, constexpr, lambda",
        blocks: [
          { t: "code", lang: "cpp", caption: "Müasir funksiya imkanları", code: `#include <iostream>
#include <string>

// Overloading: eyni ad, fərqli parametr siyahısı
int kvadrat(int x) { return x * x; }
double kvadrat(double x) { return x * x; }

// Default arqument: yalnız sonuncu parametrlərdə
std::string cumle(const std::string& ad, const std::string& salam = "Salam") {
    return salam + ", " + ad + "!";
}

// constexpr: kompilyasiya zamanı hesablana bilər
constexpr unsigned long long faktorial(unsigned n) {
    return n <= 1 ? 1ULL : n * faktorial(n - 1);
}
static_assert(faktorial(5) == 120, "5! = 120 olmalıdır");

// inline: kiçik funksiya (linker üçün də vacibdir: başlıq faylında)
inline bool cutdur(int n) { return n % 2 == 0; }

int main() {
    std::cout << kvadrat(4) << ' ' << kvadrat(1.5) << '\\n';   // 16 2.25
    std::cout << cumle("Nigar") << '\\n';                        // Salam, Nigar!
    std::cout << cumle("Nigar", "Sabahın xeyir") << '\\n';
    std::cout << faktorial(10) << '\\n';                          // 3628800

    // Lambda: adsız yerli funksiya
    int endirim = 10;
    auto qiymetEndirimli = [endirim](int qiymet) {
        return qiymet - qiymet * endirim / 100;
    };
    std::cout << qiymetEndirimli(200) << '\\n';                   // 180
    std::cout << std::boolalpha << cutdur(8) << '\\n';            // true
    return 0;
}` },
          { t: "list", items: [
            "Overloading qaytarma tipinə görə yox, yalnız parametrlərə görə seçilir. kvadrat(5L) kimi dəqiq uyğun olmayan çağırış ikimənalı (ambiguous) ola bilər.",
            "Default arqument yalnız elanda (prototipdə) göstərilir, tərifdə təkrar yazılmır.",
            "constexpr funksiya sabit arqumentlə kompilyasiya zamanı, adi arqumentlə işləmə zamanı hesablanır.",
            "Lambda sintaksisi: [tutma](parametrlər) { gövdə }. [x] — surətlə, [&x] — referansla tutur, [=] və [&] hamısını tutur.",
            "Funksiya yalnız bir dəyər qaytarır. Çoxlu nəticə üçün struct, std::pair və ya std::tuple qaytar.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `// Yerli dəyişənə referans qaytarmaq
const std::string& yarat() {
    std::string s = "salam";
    return s;            // s funksiya bitəndə məhv olur
}
// std::cout << yarat();  // dangling referans: UB`, right: `std::string yarat() {
    std::string s = "salam";
    return s;            // dəyərlə qaytar (move/RVO ucuzdur)
}`, why: "Yerli dəyişən stack-də yaşayır və funksiya bitəndə yox olur. Ona referans «asılı qalır» (dangling reference) və oxumaq undefined behavior-dur. Müasir C++ dəyərlə qaytarmağı optimallaşdırır (RVO/move), buna görə qorxma." },
          { t: "mistake", lang: "cpp", wrong: `// Böyük obyekti dəyərlə ötürmək
double ortalama(std::vector<double> ededler) {   // hər çağırışda tam surət
    double cem = 0;
    for (double x : ededler) cem += x;
    return cem / ededler.size();                  // boş olsa: 0/0
}`, right: `double ortalama(const std::vector<double>& ededler) {
    if (ededler.empty()) return 0.0;
    double cem = 0;
    for (double x : ededler) cem += x;
    return cem / static_cast<double>(ededler.size());
}`, why: "Dəyərlə ötürmə bütün vektoru kopyalayır: yaddaş və vaxt itkisi. const referans surətsizdir. Üstəlik boş vektoru yoxlamaq lazımdır, əks halda sıfıra bölmə baş verir." },
          { t: "mistake", lang: "cpp", wrong: `int maks(int a, int b) {
    if (a > b) return a;
    // else yoxdur: b > a olanda nə qaytarılır?
}`, right: `int maks(int a, int b) {
    if (a > b) return a;
    return b;
}`, why: "Qaytarma tipi void olmayan funksiyanın bütün yolları return ilə bitməlidir. Əks halda axın funksiyanın sonuna çatır — bu undefined behavior-dur (-Wreturn-type xəbərdarlığını aç)." },
        ],
      },
      {
        level: "senior",
        title: "Çağırış mexanizmi, rekursiya və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Hər çağırış stack-də çərçivə (stack frame) yaradır: parametrlər, yerli dəyişənlər, qaytarma ünvanı. Funksiya bitəndə çərçivə silinir — buna görə yerli dəyişənə pointer/referans qaytarmaq olmaz.",
            "Dəyərlə ötürmə kiçik tiplər üçün ən sürətlidir (registrdə gedir). 16 baytdan böyük tiplər üçün const T& düşün; std::string_view və std::span kimi yüngül «baxış» tipləri dəyərlə ötürülür.",
            "Kompilyator inline etməyə özü qərar verir; inline açar sözü əsasən ODR (bir tərif qaydası) üçündür: başlıq faylında tərif yazanda lazımdır.",
            "Tail-call optimizasiyası standartda zəmanətli deyil: dərin rekursiyaya güvənmə. Dövr (iteration) daha təhlükəsizdir.",
            "[[nodiscard]] — nəticəsi atılmamalı funksiyalara qoy (xəta kodu qaytaranlar). Çağıran nəticəni yoxlamasa, kompilyator xəbərdarlıq edir.",
            "noexcept — istisna atmayan funksiyalar üçün; move konstruktorlar və swap bunu etməlidir, konteynerlər bunu nəzərə alıb optimallaşır.",
            "Funksiya şablonları (template) və auto parametrlər (C++20) eyni məntiqi müxtəlif tiplər üçün yaradır; hər tip üçün ayrıca kod generasiya olunur.",
            "Təhlükəsizlik — stack overflow: rekursiya dərinliyi istifadəçi girişindən asılıdırsa (məs., iç-içə JSON), hücumçu stack-i doldurub proqramı çökdürə bilər. Dərinlik sayğacı və limit qoy.",
            "Təhlükəsizlik — dangling referans/pointer qaytarmaq: yerli dəyişənin ünvanı stack-də qalır və sonrakı çağırışlar onun üzərinə yazır. Bu, məlumat sızması və ya idarəetmə axınının ələ keçirilməsinə aparır.",
            "Təhlükəsizlik — C-stil variadic funksiyalar (printf ailəsi): format sətri istifadəçidən gəlirsə (printf(girish)), %n/%s ilə yaddaşı oxumaq/yazmaq olar (format string zəifliyi). Həmişə printf(\"%s\", girish) və ya std::cout / std::format istifadə et.",
            "Təhlükəsizlik — qaytarma dəyərini yoxlamamaq: xəta kodu nəzərə alınmasa, proqram yarımçıq vəziyyətdə davam edir. [[nodiscard]] və std::optional/std::expected (C++23) işlət.",
            "Təhlükəsizlik — parametr olaraq xam pointer + ölçü cütü (char* buf, int n) səhvə açıqdır; std::span (C++20) və ya konteyner referansı ötür.",
          ]},
          { t: "code", lang: "cpp", caption: "Limitli rekursiya və [[nodiscard]]", code: `#include <iostream>
#include <optional>

constexpr int MAKS_DERINLIK = 1000;

// Rekursiya dərinliyi limitlənib: stack overflow olmasın
std::optional<unsigned long long> cem(unsigned n, int derinlik = 0) {
    if (derinlik > MAKS_DERINLIK) return std::nullopt;   // limit aşıldı
    if (n == 0) return 0ULL;
    auto qalan = cem(n - 1, derinlik + 1);
    if (!qalan) return std::nullopt;
    return *qalan + n;
}

// Eyni nəticə, rekursiyasız: dərinlik problemi yoxdur
[[nodiscard]] unsigned long long cemDovr(unsigned n) {
    unsigned long long yekun = 0;
    for (unsigned i = 1; i <= n; ++i) yekun += i;
    return yekun;
}

int main() {
    if (auto r = cem(100)) std::cout << *r << '\\n';          // 5050
    if (!cem(5000000)) std::cout << "Dərinlik limiti aşıldı\\n";
    std::cout << cemDovr(100) << '\\n';                        // 5050
    return 0;
}` },
          { t: "qa", items: [
            ["Dəyərlə, referansla və const referansla ötürmə fərqi nədir?", "Dəyərlə — surət çıxarılır, orijinal dəyişmir. Referansla — orijinal dəyişə bilər. const referansla — surətsiz və dəyişməz; böyük tiplər üçün standart seçimdir."],
            ["Overloading necə seçilir?", "Kompilyator arqument tiplərinə ən yaxşı uyğun gələn imzanı seçir (dəqiq uyğunluq, sonra çevirmələr). Qaytarma tipi nəzərə alınmır. Uyğunluq birmənalı deyilsə, xəta verir."],
            ["constexpr funksiya nə verir?", "Sabit arqumentlərlə kompilyasiya zamanı hesablana bilir; static_assert, massiv ölçüsü və template arqumentlərində istifadə olunur, işləmə vaxtı xərcini sıfırlayır."],
            ["Rekursiya stack overflow-a niyə səbəb olur?", "Hər çağırış stack çərçivəsi yaradır; stack ölçüsü məhduddur (adətən 1-8 MB). Dərinlik çox olanda yaddaş bitir və proqram çökür."],
            ["Yerli dəyişənə referans qaytarmaq niyə səhvdir?", "Yerli dəyişən funksiya bitəndə məhv olur; referans dangling olur və ona müraciət undefined behavior-dur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Böyük std::string-i oxumaq üçün ötürməyin ən yaxşı yolu?", options: ["std::string s", "const std::string& s", "std::string& s"], answer: 1, why: "const referans surət çıxarmır və dəyişməyə icazə vermir." },
          { t: "quiz", q: "Default arqument harada olmalıdır?", options: ["İstənilən parametrdə", "Yalnız sonuncu parametrlərdə", "Yalnız ilk parametrdə"], answer: 1, why: "Default dəyərli parametrdən sonra gələn bütün parametrlərin də default dəyəri olmalıdır." },
          { t: "quiz", q: "Yerli dəyişənə referans qaytarsaq nə olur?", options: ["Sürətlənir", "Dangling referans, UB", "Kompilyator həmişə xəta verir"], answer: 1, why: "Dəyişən funksiya bitəndə məhv olur; referans etibarsız yaddaşa baxır." },
        ],
      },
    ],
    exercise: {
      task: "Aşağıdakıları yaz. 1) `bool ededMuracietiMi(int n)` prototipi main-dən əvvəl, tərifi sonra (n sadə ədəddirsə true). 2) `double ortalama(const std::vector<double>& v)` — boş vektor üçün 0.0 qaytarsın. 3) `void artirHamisini(std::vector<int>& v, int deyer = 1)` — default arqumentli, hər elementə deyer əlavə etsin. 4) `kvadrat(int)` və `kvadrat(double)` overload-ları. 5) `constexpr` faktorial + static_assert(faktorial(5) == 120). 6) Lambda ilə vektoru azalan sırala (std::sort). 7) Şərhdə yerli dəyişənə referans qaytarmağın niyə təhlükəli olduğunu yaz.",
      starter: `#include <algorithm>
#include <iostream>
#include <vector>

// Prototip(lər)

int main() {
    // Çağırışlar

    return 0;
}

// Tərif(lər)
`,
      expect: "Prototip + tərif ayrılıb; ortalama const std::vector<double>& qəbul edir və empty() yoxlayır; artirHamisini T& (vector<int>&) və default arqumentlə (yalnız prototipdə); kvadrat overload-ları; constexpr faktorial + static_assert; std::sort və lambda ilə (a, b) { return a > b; }; şərhdə dangling referans/UB izah olunub; kod kompilyasiya olunan C++ olmalıdır.",
    },
  },
  {
    slug: "massivler",
    title: "Massivlər və string",
    intro: "Massiv eyni tipli elementləri ardıcıl yaddaşda saxlayır. C++-da üç yanaşma var: köhnə C massivi, təhlükəsiz std::array və mətn üçün std::string. C stilli massivlər və sətirlər buffer overflow zəifliklərinin əsas mənbəyidir — ona görə müasir alternativləri öyrənəcəyik.",
    sections: [
      {
        level: "baslangic",
        title: "Massiv, std::array və std::string",
        blocks: [
          { t: "analogy", text: "Massiv — yan-yana düzülmüş nömrəli şkaflardır. Şkafın nömrəsi (indeks) 0-dan başlayır. 5 şkaflıq cərgədə 5-ci nömrəni (indeks 5) açmaq istəsən, başqasının şkafına girmiş olursan — C++ səni dayandırmaz, amma nəticəsi fəlakət ola bilər." },
          { t: "code", lang: "cpp", code: `#include <array>
#include <iostream>
#include <string>

int main() {
    // C massivi: ölçü sabitdir, ölçü haqqında məlumat daşımır
    int ballar[3] = {80, 95, 70};
    std::cout << ballar[0] << '\\n';           // 80

    // std::array: ölçünü bilir, kopyalana bilir
    std::array<int, 3> qiymetler = {10, 20, 30};
    std::cout << qiymetler.size() << '\\n';    // 3
    std::cout << qiymetler.at(1) << '\\n';     // 20 (yoxlamalı giriş)

    // std::string: avtomatik böyüyən mətn
    std::string ad = "Aysel";
    ad += " Məmmədova";
    std::cout << ad << " (" << ad.size() << " bayt)\\n";
    std::cout << ad.substr(0, 5) << '\\n';    // Aysel

    // İki ölçülü massiv
    int cedvel[2][3] = {{1, 2, 3}, {4, 5, 6}};
    std::cout << cedvel[1][2] << '\\n';        // 6

    // Hamısını sıfırla
    int sifir[5] = {};                         // hamısı 0
    std::cout << sifir[4] << '\\n';            // 0
    return 0;
}` },
          { t: "terms", items: [
            ["massiv (array)", "eyni tipli elementlərin ardıcıl yaddaş bloku."],
            ["indeks (index)", "elementin sıra nömrəsi; 0-dan başlayır."],
            ["std::array", "ölçüsü kompilyasiya zamanı məlum olan təhlükəsiz massiv qabığı."],
            ["std::string", "dinamik ölçülü mətn sinfi."],
            ["C-string", "sonu '\\0' (null) simvolu ilə bitən char massivi."],
            ["bounds checking", "indeksin icazəli aralıqda olduğunu yoxlamaq."],
          ]},
          { t: "tip", text: "Ölçüsü işləmə zamanı dəyişən massiv lazımdırsa, std::vector işlət. Yeni kodda çılpaq C massivi və char[] yazma: std::array, std::vector və std::string kifayətdir." },
        ],
      },
      {
        level: "orta",
        title: "Indeksləmə, at(), string_view və massivin pointerə çevrilməsi",
        blocks: [
          { t: "code", lang: "cpp", caption: "[] və at() fərqi, string_view, array decay", code: `#include <array>
#include <iostream>
#include <stdexcept>
#include <string>
#include <string_view>

// string_view: surətsiz «baxış» (C++17)
void yaz(std::string_view metn) {
    std::cout << "Mətn: " << metn << " (" << metn.size() << ")\\n";
}

// Massiv funksiyaya pointer kimi gedir (decay): ölçü itir
int cem(const int* arr, std::size_t n) {
    int c = 0;
    for (std::size_t i = 0; i < n; ++i) c += arr[i];
    return c;
}

// Daha yaxşı: ölçü tipdə saxlanılır
int cem2(const std::array<int, 4>& arr) {
    int c = 0;
    for (int x : arr) c += x;
    return c;
}

int main() {
    std::array<int, 4> a = {1, 2, 3, 4};

    // [] yoxlamır (sürətli, amma UB riski), at() yoxlayır
    try {
        std::cout << a.at(10) << '\\n';
    } catch (const std::out_of_range& e) {
        std::cout << "Sərhəddən kənar: " << e.what() << '\\n';
    }

    int c[4] = {1, 2, 3, 4};
    std::cout << sizeof(c) / sizeof(c[0]) << '\\n';   // 4 (burada ölçü məlumdur)
    std::cout << cem(c, 4) << ' ' << cem2(a) << '\\n'; // 10 10

    std::string s = "salam dünya";
    yaz(s);                 // surətsiz
    yaz("sabit mətn");      // literal da qəbul olunur

    // string əməliyyatları
    std::size_t yer = s.find("dünya");
    if (yer != std::string::npos) {
        std::cout << "Tapıldı: " << yer << '\\n';
    }
    return 0;
}` },
          { t: "list", items: [
            "a[i] yoxlama aparmır: i sərhəddən kənardırsa undefined behavior. a.at(i) isə std::out_of_range istisnası atır.",
            "Massivin adı ifadələrdə birinci elementin ünvanına çevrilir (array decay). Funksiyaya ötürəndə ölçü itir, ona görə ölçünü ayrıca ötür.",
            "sizeof(arr)/sizeof(arr[0]) yalnız massivin elan olunduğu yerdə işləyir, funksiya parametrində yox.",
            "std::string_view mətnə sahib deyil: yalnız göstərici və uzunluq saxlayır. Bağlı olduğu mətn yaşamalıdır.",
            "std::string mətni UTF-8 baytlar kimi saxlayır: Azərbaycan hərfləri (ə, ö, ş) 2 bayt tutur, ona görə size() simvol yox, bayt sayır.",
            "Sətirləri == ilə müqayisə et (C stilindəki strcmp lazım deyil). Birləşdirmək üçün += və ya std::format (C++20).",
          ]},
          { t: "mistake", lang: "cpp", wrong: `void say(int arr[]) {
    // arr əslində int* -dir, ölçü yoxdur
    std::size_t n = sizeof(arr) / sizeof(arr[0]);   // 8/4 = 2 (64-bit)
    for (std::size_t i = 0; i < n; ++i) { /* ... */ }
}`, right: `void say(const int* arr, std::size_t n) {
    for (std::size_t i = 0; i < n; ++i) { /* ... */ }
}
// və ya std::span<const int> (C++20) / std::vector<int>&`, why: "Parametr olaraq massiv yazsan da, kompilyator onu pointerə çevirir. sizeof pointerin ölçüsünü (4 və ya 8 bayt) qaytarır, elementlərin sayını yox — nəticə səssizcə səhv olur." },
          { t: "mistake", lang: "cpp", wrong: `std::string_view tap() {
    std::string s = "müvəqqəti mətn";
    return s;                       // s məhv olur, view qalır
}
std::string_view sv = std::string("salam");   // müvəqqəti obyekt dərhal silinir
// std::cout << sv;                            // dangling: UB`, right: `std::string tap() {
    std::string s = "müvəqqəti mətn";
    return s;                       // dəyərlə qaytar
}
std::string saxla = "salam";
std::string_view sv = saxla;       // saxla yaşadıqca sv etibarlıdır`, why: "string_view mətni kopyalamır, yalnız ona baxır. Sahibi (std::string) məhv olanda view asılı qalır (dangling). Funksiyadan string_view qaytarma, müvəqqəti string-dən view yaratma." },
        ],
      },
      {
        level: "senior",
        title: "C-string təhlükələri, buffer overflow və müdafiə",
        blocks: [
          { t: "list", items: [
            "C massivi yığında (stack) və ya statik yaddaşda ardıcıl yerləşir; yaddaş düzülüşü: yerli dəyişənlər, yadda saxlanmış çərçivə göstəricisi, qaytarma ünvanı. Buffer overflow bu qonşu məlumatların üzərinə yazır.",
            "Stack buffer overflow klassik hücumdur: hücumçu çox uzun giriş göndərir, qaytarma ünvanını öz koduna yönəldir və kod icra edir (RCE). Morris qurdu, Heartbleed və saysız zəifliklər bu sinifdəndir.",
            "gets() təhlükəli olduğundan C++14-də standartdan çıxarılıb: ölçü limiti yoxdur. Əvəzinə std::getline(std::cin, s) işlət.",
            "strcpy, strcat, sprintf uzunluğu yoxlamır. strncpy sonuna '\\0' qoymaya bilər (kəsiləndə). Ən yaxşı həll: std::string. Mütləq C API lazımdırsa snprintf və ya strlcpy tipli qoruyucular işlət.",
            "Sətirin sonundakı '\\0' unudulsa, strlen və digər funksiyalar bitmiş yaddaşdan kənara oxuyur (over-read) — məlumat sızır (Heartbleed məhz over-read idi).",
            "Off-by-one buffer overflow: char ad[5]; ad[5] = '\\0'; — bir bayt kənara yazmaq da kifayətdir (qonşu dəyişəni pozur).",
            "Format string zəifliyi: printf(istifadeciGirisi) çağırışında %x və %n ilə yaddaş oxunur/yazılır. Həmişə printf(\"%s\", girish) və ya std::cout işlət.",
            "Integer overflow → buffer overflow: ölçü hesabında (n * elementOlcusu) daşma kiçik yer ayırır, sonra böyük yazılır. Ölçü hesablarını yoxla (std::size_t, limit).",
            "Müdafiə qatları: stack canary (-fstack-protector-strong), ASLR, DEP/NX, FORTIFY_SOURCE (-D_FORTIFY_SOURCE=2). Bunlar yardım edir, amma səhvi aradan qaldırmır — əsas həll təhlükəsiz tiplərdir.",
            "Test zamanı -fsanitize=address ilə sərhəddən kənar giriş dərhal tutulur; fuzzing (libFuzzer, AFL) girişləri avtomatik sınayır.",
            "Hardened rejimlər: libstdc++-da -D_GLIBCXX_ASSERTIONS operator[]-ya sərhəd yoxlaması əlavə edir; C++26 hardened standart kitabxana bu istiqamətdədir.",
            "Performans: at() hər dəfə yoxlayır; çox isti dövrlərdə range-based for və ya alqoritmlər həm təhlükəsiz, həm sürətlidir (yoxlama dövrdən çıxarılır).",
          ]},
          { t: "code", lang: "cpp", caption: "Təhlükəsiz giriş və kopyalama", code: `#include <algorithm>
#include <array>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <string>

int main() {
    // 1) Giriş: std::getline ölçü limiti problemi yaratmır
    std::string ad;
    std::cout << "Adınız: ";
    std::getline(std::cin, ad);
    if (ad.size() > 50) ad.resize(50);           // məntiqi limit

    // 2) C buffer lazımdırsa: snprintf həmişə sonuna \\0 qoyur və kəsir
    char bufer[16];
    std::snprintf(bufer, sizeof(bufer), "Salam, %s", ad.c_str());
    std::cout << bufer << '\\n';

    // 3) Sabit ölçülü kopyalama: yoxlama ilə
    std::array<char, 8> hedef{};
    const std::string menbe = "çox uzun mətn";
    const std::size_t say = std::min(menbe.size(), hedef.size() - 1);
    std::memcpy(hedef.data(), menbe.data(), say);
    hedef[say] = '\\0';                           // sonu həmişə qapat
    std::cout << hedef.data() << '\\n';

    // 4) Format sətri sabit olmalıdır, girişdən gəlməməlidir
    std::printf("%s\\n", ad.c_str());              // DOĞRU (printf(ad.c_str()) YOX)
    return 0;
}` },
          { t: "qa", items: [
            ["[] və at() arasındakı fərq nədir?", "[] sərhəd yoxlamır, kənara çıxsa undefined behavior olur. at() yoxlayır və std::out_of_range atır; bir az yavaşdır."],
            ["Array decay nədir?", "C massivinin ifadədə birinci elementə pointer-ə çevrilməsi. Funksiyaya ötürəndə ölçü haqqında məlumat itir."],
            ["strcpy niyə təhlükəlidir?", "Mənbənin uzunluğunu hədəf buferin ölçüsü ilə müqayisə etmir; uzun mətn buferdən kənara yazır (buffer overflow)."],
            ["std::string_view-in təhlükəsi nədir?", "Mətnə sahib deyil; sahibi məhv olanda dangling olur. Müvəqqəti string-dən view yaratmaq və ya view qaytarmaq səhvdir."],
            ["Buffer overflow necə istismar olunur?", "Giriş buferdən böyük göndərilir, qonşu yaddaş (qaytarma ünvanı, dəyişənlər) pozulur; hücumçu axını öz koduna yönəldə bilər. Müdafiə: təhlükəsiz tiplər, canary, ASLR, DEP, sanitizer-lər."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "5 elementli massivin son indeksi hansıdır?", options: ["5", "4", "6"], answer: 1, why: "İndekslər 0-dan başlayır: 0,1,2,3,4." },
          { t: "quiz", q: "Hansı giriş sərhəddən kənar olanda istisna atır?", options: ["a[i]", "a.at(i)", "*(a + i)"], answer: 1, why: "at() yoxlama aparır və std::out_of_range atır; [] yoxlamır." },
          { t: "quiz", q: "İstifadəçi girişini oxumaq üçün ən təhlükəsiz yol?", options: ["gets(bufer)", "scanf(\"%s\", bufer)", "std::getline(std::cin, s)"], answer: 2, why: "std::string ölçüsünü özü idarə edir; gets və limitsiz scanf buffer overflow yaradır." },
        ],
      },
    ],
    exercise: {
      task: "1) `std::array<int, 5>` elan et, dəyərlərini doldur, cəmi range-based for ilə tap. 2) İndeks istifadəçidən (`int i`) oxunursa, `at()` ilə təhlükəsiz oxu və `std::out_of_range`-i tut, mesaj yaz. 3) `std::getline` ilə ad oxu, 30 simvoldan uzundursa kəs. 4) `std::string_view` qəbul edən `void yaz(std::string_view s)` funksiyası yaz və onu həm std::string, həm literal ilə çağır. 5) Şərhdə üç səbəb yaz: strcpy/gets niyə təhlükəlidir, array decay nədir, string_view niyə müvəqqəti string-dən yaradılmamalıdır.",
      starter: `#include <array>
#include <iostream>
#include <stdexcept>
#include <string>
#include <string_view>

int main() {
    // Həllini bura yaz

    return 0;
}
`,
      expect: "std::array<int,5> və range-based for ilə cəm; at() ilə oxu və try/catch (const std::out_of_range&); std::getline(std::cin, ad) və uzunluq limiti (resize/substr); yaz(std::string_view) və iki cür çağırış; şərhdə strcpy/gets buffer overflow, array decay (ölçü itir, pointerə çevrilir) və string_view dangling izah olunub; C stilli strcpy/gets istifadə olunmayıb; kod kompilyasiya olunan C++ olmalıdır.",
    },
  },
  {
    slug: "pointer",
    title: "Pointer və referans",
    intro: "Pointer (göstərici) başqa dəyişənin yaddaş ünvanını saxlayan dəyişəndir. Referans isə mövcud dəyişənin ikinci adıdır. Pointerlər C++-ın gücü və eyni zamanda ən çox təhlükəsizlik zəifliyinin mənbəyidir: asılı qalan, boş və başlanmamış pointerlər proqramı çökdürür və ya hücuma açır.",
    sections: [
      {
        level: "baslangic",
        title: "Ünvan, &, * və nullptr",
        blocks: [
          { t: "analogy", text: "Dəyişən — evdir, pointer isə o evin ünvan vərəqəsidir. Vərəqəni oxuyub (dereferans, *) evə gedə bilərsən. Ev sökülübsə (yaddaş azad olunub), vərəqə hələ də ünvanı göstərir — amma orada artıq heç nə yoxdur. Referans isə evin ikinci adıdır: ev eyni, yalnız ad ikidir." },
          { t: "code", lang: "cpp", code: `#include <iostream>

int main() {
    int yas = 25;
    int* p = &yas;          // p yas-ın ünvanını saxlayır

    std::cout << yas << '\\n';   // 25
    std::cout << &yas << '\\n';  // ünvan (məs. 0x7ffd...)
    std::cout << p << '\\n';     // eyni ünvan
    std::cout << *p << '\\n';    // 25 (dereferans: ünvandakı dəyər)

    *p = 30;                    // yas indi 30-dur
    std::cout << yas << '\\n';   // 30

    // nullptr: heç nəyə işarə etməyən pointer
    int* bosh = nullptr;
    if (bosh == nullptr) {
        std::cout << "Pointer boşdur\\n";
    }

    // Referans: ikinci ad, həmişə başlanmalıdır, dəyişmir
    int& r = yas;
    r = 40;                     // yas = 40
    std::cout << yas << '\\n';   // 40
    return 0;
}` },
          { t: "terms", items: [
            ["pointer (göstərici)", "başqa obyektin ünvanını saxlayan dəyişən: T*."],
            ["& (ünvan operatoru)", "dəyişənin yaddaş ünvanını verir."],
            ["* (dereferans)", "pointerin göstərdiyi ünvandakı dəyərə çatır."],
            ["nullptr", "heç nəyə işarə etməyən pointer dəyəri (C++11)."],
            ["referans (reference)", "mövcud dəyişənin ləqəbi: T&; null ola bilməz, başqa obyektə yönləndirilməz."],
            ["dangling pointer", "artıq azad olunmuş yaddaşa baxan pointer."],
          ]},
          { t: "tip", text: "Pointer lazım deyilsə, referans işlət. Sahiblik lazımdırsa, xam new/delete yox, std::unique_ptr və std::make_unique yaz. Xam pointer yalnız «baxmaq» üçündür, sahib olmaq üçün yox." },
        ],
      },
      {
        level: "orta",
        title: "const variantları, pointer arifmetikası və referans fərqi",
        blocks: [
          { t: "code", lang: "cpp", caption: "const pointerlər, arifmetika, referans vs pointer", code: `#include <iostream>
#include <memory>

void deyisPtr(int* p) {
    if (p != nullptr) *p += 1;     // həmişə nullptr yoxla
}

void deyisRef(int& r) {
    r += 1;                         // null ola bilməz: yoxlama lazım deyil
}

int main() {
    int a = 1, b = 2;

    // const variantları (sağdan sola oxu)
    const int* p1 = &a;        // dəyərə: const (*p1 = 5 qadağan), pointer dəyişə bilər
    int* const p2 = &a;        // pointer: const (p2 = &b qadağan), dəyər dəyişə bilər
    const int* const p3 = &a;  // hər ikisi const
    p1 = &b;                   // olar
    *p2 = 10;                  // olar
    (void)p3;

    // Pointer arifmetikası massivdə
    int ballar[4] = {10, 20, 30, 40};
    int* it = ballar;          // birinci elementi göstərir
    std::cout << *it << ' ';           // 10
    ++it;                              // növbəti element (4 bayt irəli)
    std::cout << *it << ' ';           // 20
    std::cout << *(ballar + 3) << '\\n'; // 40 (ballar[3] ilə eyni)

    // Referans vs pointer
    int say = 0;
    deyisPtr(&say);
    deyisRef(say);
    std::cout << say << '\\n';    // 2

    // Ağıllı pointer: sahiblik və avtomatik azad etmə
    auto sahib = std::make_unique<int>(42);
    std::cout << *sahib << '\\n'; // 42
    return 0;                     // sahib avtomatik azad olur
}` },
          { t: "list", items: [
            "const-u sağdan sola oxu: const int* — «int-ə pointer, int const-dur»; int* const — «const pointer, int-ə».",
            "Pointerə 1 əlavə etmək elementin ölçüsü qədər (int üçün 4 bayt) irəli aparır. p[i] və *(p + i) eynidir.",
            "Referans həmişə başlanmalıdır, null ola bilməz və sonradan başqa obyektə yönləndirilə bilməz. Pointer isə boş ola bilər və dəyişə bilər.",
            "Pointeri arifmetika ilə yalnız eyni massivin daxilində (və bir ötəsinə qədər) hərəkət etdirmək olar; kənara çıxmaq undefined behavior-dur.",
            "nullptr yaz, NULL və ya 0 yazma: nullptr tipli və overload-larla düzgün işləyir.",
            "void* hər tipə çevrilir, amma tip məlumatı itir: C++-da template və ya std::variant tərcih et.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `int* yarat() {
    int deyer = 42;
    return &deyer;           // yerli dəyişənin ünvanı
}
int main() {
    int* p = yarat();
    std::cout << *p;          // dangling pointer: UB
}`, right: `std::unique_ptr<int> yarat() {
    return std::make_unique<int>(42);   // heap-də, sahiblik ötürülür
}
// və ya sadəcə dəyərlə qaytar:
int yarat2() { return 42; }`, why: "deyer stack-dədir və funksiya bitəndə yox olur. Qaytarılan pointer artıq etibarsız yaddaşa baxır (dangling). Oxumaq UB-dir; sonrakı çağırışlar həmin yaddaşı üzərinə yaza bilər. Dəyərlə qaytar və ya ağıllı pointer işlət." },
          { t: "mistake", lang: "cpp", wrong: `int* p;                 // başlanmayıb: zibil ünvan (wild pointer)
*p = 10;                // naməlum yaddaşa yazır: UB

int* q = nullptr;
std::cout << *q;        // null dereference: UB (adətən çökür)`, right: `int* p = nullptr;       // həmişə başlat
int deger = 0;
p = &deger;
if (p != nullptr) {
    *p = 10;
}`, why: "Başlanmamış pointer təsadüfi ünvan saxlayır (wild pointer); ona yazmaq başqa yaddaşı pozur. nullptr-i dereferans etmək UB-dir və proqramı çökdürür. Həmişə nullptr ilə başlat və istifadədən əvvəl yoxla." },
          { t: "mistake", lang: "cpp", wrong: `int* p = new int(5);
delete p;
std::cout << *p;         // use-after-free
delete p;                // double free`, right: `auto p = std::make_unique<int>(5);
std::cout << *p << '\\n';
// delete lazım deyil: unique_ptr scope bitəndə özü azad edir`, why: "delete-dən sonra pointer hələ də köhnə ünvanı saxlayır (dangling). Onu oxumaq use-after-free, ikinci dəfə delete etmək double free-dir — heap-i pozur. unique_ptr bunun hamısını avtomatik və düzgün edir." },
        ],
      },
      {
        level: "senior",
        title: "Yaddaş modeli, ömür və təhlükəsizlik nəticələri",
        blocks: [
          { t: "list", items: [
            "Yaddaş: stack (yerli dəyişənlər, avtomatik), heap (new/make_unique, əl ilə/ağıllı idarə), statik (qlobal, static). Pointer hər üçünə baxa bilər; ömrü obyektin ömründən uzun olmamalıdır.",
            "Referans adətən pointer kimi həyata keçirilir, amma dil səviyyəsində null olmamaq zəmanəti verir. Referansa bağlanmış obyekt məhv olsa, referans da dangling olur.",
            "RAII: resurs (yaddaş, fayl, kilid) obyektin konstruktorunda alınır, destruktorunda buraxılır. Pointerin sahibi olmaq üçün unique_ptr/shared_ptr istifadə et; istisna atılsa da azad olunur.",
            "unique_ptr — tək sahib, sıfır əlavə xərc; shared_ptr — sayğaclı çox sahib, atomik say xərci var; weak_ptr — sahiblik etməyən baxış, dairəvi asılılığı qırır.",
            "Strict aliasing: fərqli tipli pointerlə eyni yaddaşa müraciət (məs. int*-i float* kimi oxumaq) UB-dir. Baytları kopyalamaq üçün std::memcpy və ya C++20 std::bit_cast işlət.",
            "Pointer arifmetikasında massivdən kənar nöqtə (bir ötəsindən başqa) yaratmaq belə UB-dir; müqayisə və fərq yalnız eyni massivdə mənalıdır.",
            "Təhlükəsizlik — use-after-free: azad edilmiş yaddaşa müraciət ən çox istismar olunan zəifliklərdən biridir (brauzer və OS xətalarının böyük hissəsi). Hücumçu azad yeri öz məlumatı ilə doldurub obyekti saxtalaşdırır.",
            "Təhlükəsizlik — double free heap metadatasını pozur və ixtiyari yazmaya aparır. Müdafiə: delete-dən sonra p = nullptr (delete nullptr təhlükəsizdir) və ya ağıllı pointerlər.",
            "Təhlükəsizlik — null dereference adətən sadəcə çökmədir (DoS), amma bəzi sistemlərdə (embedded, köhnə nüvələr) 0 ünvanı xəritələnə bilir və istismar olunur.",
            "Təhlükəsizlik — wild/başlanmamış pointer: yığındakı əvvəlki dəyərlər pointerə sızır, ixtiyari ünvana yazma yaranır. Həmişə başlat; -Wuninitialized, -Wmaybe-uninitialized xəbərdarlıqlarını aç.",
            "Təhlükəsizlik — xam pointerlə tip çevirmələri (reinterpret_cast, C-stil cast) tip qarışıqlığı (type confusion) yaradır. static_cast, dynamic_cast işlət, çevirmələri minimuma endir.",
            "Alətlər: AddressSanitizer (-fsanitize=address) use-after-free, double free və sərhəddən kənarı tutur; Valgrind yaddaş səhvlərini tapır; clang-tidy və -Wall -Wextra xəbərdarlıqlar verir. CI-də testləri sanitizer ilə işlət.",
            "Müasir yanaşma: xam new/delete və xam sahib pointerlərdən qaç (C++ Core Guidelines R.11). Baxış üçün T& və ya gsl::not_null/std::span, sahiblik üçün ağıllı pointer, nüsxəsizlik üçün string_view.",
          ]},
          { t: "code", lang: "cpp", caption: "Təhlükəsiz sahiblik və baxış", code: `#include <iostream>
#include <memory>
#include <string>
#include <utility>
#include <vector>

struct Istifadeci {
    std::string ad;
    explicit Istifadeci(std::string a) : ad(std::move(a)) {}
};

// Baxış: null ola bilməz → referans, yoxlama lazım deyil
void yaz(const Istifadeci& i) {
    std::cout << "İstifadəçi: " << i.ad << '\\n';
}

// Null ola bilərsə → pointer, mütləq yoxlama
void yazAmaNullOlaBiler(const Istifadeci* i) {
    if (i == nullptr) {
        std::cout << "İstifadəçi yoxdur\\n";
        return;
    }
    std::cout << "İstifadəçi: " << i->ad << '\\n';
}

int main() {
    // Sahiblik: unique_ptr, avtomatik azad edilir
    auto u = std::make_unique<Istifadeci>("Rəşad");
    yaz(*u);
    yazAmaNullOlaBiler(u.get());          // xam pointer yalnız baxış üçündür

    // Sahibliyi ötürmək: move
    auto basqa = std::move(u);            // u indi nullptr-dir
    yazAmaNullOlaBiler(u.get());          // "İstifadəçi yoxdur"
    yaz(*basqa);

    // Konteynerdə sahiblik
    std::vector<std::unique_ptr<Istifadeci>> siyahi;
    siyahi.push_back(std::make_unique<Istifadeci>("Leyla"));
    for (const auto& x : siyahi) yaz(*x);
    return 0;                             // hamısı avtomatik təmizlənir
}` },
          { t: "qa", items: [
            ["Pointer ilə referans arasındakı fərq?", "Pointer boş (nullptr) ola bilər, dəyişə bilər, ünvan üzərində arifmetika aparılır. Referans həmişə başlanmalıdır, null ola bilməz və başqa obyektə yönləndirilmir."],
            ["const int*, int* const və const int* const fərqi?", "Birincidə dəyər dəyişməz, pointer dəyişə bilər. İkincidə pointer dəyişməz, dəyər dəyişə bilər. Üçüncüdə hər ikisi dəyişməzdir. Sağdan sola oxu."],
            ["Dangling pointer nədir və necə yaranır?", "Azad olunmuş və ya ömrü bitmiş obyektə baxan pointer. delete-dən sonra, yerli dəyişənin ünvanını qaytarandan sonra və konteyner yenidən bölüşdürəndən sonra yaranır."],
            ["Use-after-free niyə təhlükəlidir?", "Azad edilmiş yaddaş sonra başqa obyektə verilir; köhnə pointerlə oxu/yazma həmin obyektin məlumatını pozur və ya sızdırır. Hücumçu bunu istifadə edib kod icra edə bilər."],
            ["Xam new/delete əvəzinə nə işlətmək lazımdır?", "std::make_unique və std::make_shared (RAII). Onlar istisna zamanı da yaddaşı azad edir, double free və sızmanın qarşısını alır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "p pointerinin göstərdiyi dəyərə necə müraciət edilir?", options: ["&p", "*p", "p&"], answer: 1, why: "* operatoru (dereferans) ünvandakı dəyəri verir; & isə ünvanı alır." },
          { t: "quiz", q: "int* const p nə deməkdir?", options: ["Dəyər dəyişməzdir", "Pointer dəyişməzdir, dəyər dəyişə bilər", "Hər ikisi dəyişməzdir"], answer: 1, why: "const pointerin özünə aiddir (sağdan sola oxu): p başqa ünvana yönləndirilə bilməz." },
          { t: "quiz", q: "delete p; sonra *p oxumaq nədir?", options: ["Təhlükəsiz, 0 qaytarır", "Use-after-free (UB)", "Kompilyasiya xətası"], answer: 1, why: "Azad olunmuş yaddaşa müraciət undefined behavior-dur və istismar oluna bilər." },
        ],
      },
    ],
    exercise: {
      task: "1) `int x = 7;` elan et, `int* p = &x;` ilə pointer yarat, *p ilə x-i 14 et. 2) `void artir(int* p)` (nullptr yoxlaması ilə) və `void artir(int& r)` yaz, hər ikisini çağır. 3) Üç növ pointer elan et: `const int*`, `int* const`, `const int* const` və şərhdə hansında nəyin dəyişə biləcəyini yaz. 4) Massivdə pointer arifmetikası ilə (`p + i`) 3 elementi çap et. 5) `std::make_unique<int>(5)` ilə heap dəyişəni yarat və niyə delete lazım olmadığını şərhdə yaz. 6) Şərhdə üç təhlükəni izah et: dangling pointer (yerli dəyişənin ünvanı), null dereference, use-after-free.",
      starter: `#include <iostream>
#include <memory>

// artir funksiyaları

int main() {
    // Həllini bura yaz

    return 0;
}
`,
      expect: "int* p = &x və *p = 14; artir(int*) nullptr yoxlaması ilə və artir(int&); üç const pointer variantı (const int*, int* const, const int* const) və şərhdə izah; massivdə *(p + i) və ya p[i] ilə arifmetika, sərhəd daxilində; std::make_unique<int>(5) və delete olmadan; şərhdə dangling pointer, null dereference, use-after-free izah olunub; xam new/delete istifadə olunmayıb və ya düzgün (nullptr-lanma ilə) istifadə olunub; kod kompilyasiya olunan C++ olmalıdır.",
    },
  },
];
