import type { Lesson } from "../types";

export const cppA: Lesson[] = [
  {
    slug: "giris",
    title: "C++ nədir? İlk proqram",
    intro: "C++ — sürətli, kompilyasiya olunan və aşağı səviyyəli idarəetmə verən proqramlaşdırma dilidir. Oyunlar, brauzerlər, əməliyyat sistemləri və verilənlər bazaları bu dildə yazılır.",
    sections: [
      {
        level: "baslangic",
        title: "C++ nədir və ilk proqram",
        blocks: [
          { t: "analogy", text: "C++ proqramı kitab tərcüməsi kimidir: sən Azərbaycanca (insan dilində) resept yazırsan, kompilyator onu maşının başa düşdüyü dilə tam çevirir. Sonra maşın heç bir tərcüməçi olmadan birbaşa oxuyub icra edir. Buna görə də C++ çox sürətlidir." },
          { t: "p", text: "C++ 1980-ci illərin əvvəlində Bjarne Stroustrup tərəfindən «C with Classes» adı ilə yaradıldı. Sonra C++98, C++11, C++14, C++17, C++20 və C++23 standartları gəldi. Bu kursda müasir C++ (C++17/20) öyrənirik." },
          { t: "code", lang: "cpp", caption: "salam.cpp — ən sadə proqram", code: `#include <iostream>   // giriş-çıxış kitabxanasını qoşur

int main() {          // proqram buradan başlayır
    std::cout << "Salam, dünya!" << std::endl;   // ekrana yazır
    return 0;         // 0 = uğurla bitdi
}` },
          { t: "code", lang: "bash", caption: "Kompilyasiya və işə salma (g++ ilə)", code: `# salam.cpp faylını salam adlı icra olunan fayla çevir
g++ -std=c++20 -Wall -Wextra -o salam salam.cpp

# işə sal (Linux/macOS)
./salam

# Windows-da
salam.exe` },
          { t: "terms", items: [
            ["kompilyator (compiler)", "mənbə kodu maşın koduna çevirən proqram (g++, clang++, MSVC)."],
            ["main()", "proqramın giriş nöqtəsi; hər proqramda tam bir dənə olmalıdır."],
            ["#include", "başqa faylın (başlıq faylı) məzmununu bu fayla əlavə edir."],
            ["std::cout", "standart çıxış axını (stream); ekrana yazmaq üçündür."],
            ["namespace (ad sahəsi)", "adların toqquşmaması üçün qrup; standart kitabxana std daxilindədir."],
          ]},
          { t: "h", text: "Proqramın hissələri sətir-sətir" },
          { t: "list", items: [
            "#include <iostream> — preprocessor-a göstəriş: iostream başlığını bu yerə yapışdır. Onsuz std::cout kompilyatora tanış olmaz.",
            "int main() — funksiya elanıdır: «int» qaytarma tipi (proqramın çıxış kodu), «main» adı, «()» isə parametrlərin siyahısıdır (burada boş).",
            "{ ... } — funksiyanın gövdəsi; mötərizələr içindəki hər şey funksiyaya aiddir.",
            "std::cout << \"...\" — «std::» ad sahəsidir, «<<» isə məlumatı axına göndərən operatordur. Zəncirlənə bilər: cout << a << b << c.",
            "std::endl — sətir sonu yazır və buferi boşaldır. Sadə hallarda '\\n' kifayətdir.",
            "return 0; — əməliyyat sisteminə «uğurla bitdim» deyir. Sıfırdan fərqli dəyər xəta kodudur.",
          ]},
          { t: "p", text: "C++ böyük/kiçik hərfə həssasdır: Main, main, MAIN üç fərqli addır. Boşluqlar və sətir keçidləri kompilyator üçün əhəmiyyətsizdir (ifadələri ; ayırır), amma oxunaqlılıq üçün girinti (4 boşluq) vacibdir. Şərhlər isə kompilyator tərəfindən atılır: // tək sətirlik, /* ... */ çoxsətirlik şərhdir." },
          { t: "code", lang: "cpp", caption: "Şərhlər, xüsusi simvollar və axın zənciri", code: `#include <iostream>

// Bu bir təkrar-sətirli şərhdir
/* Bu isə
   çoxsətirli şərhdir */

int main() {
    std::cout << "Sətir 1\\n";
    std::cout << "Tab:\\tburada\\n";                  // \\t = tabulyasiya
    std::cout << "Dırnaq: \\"salam\\"\\n";             // \\" = dırnaq simvolu
    std::cout << R"(Xam sətir: C:\\proqram\\n heç nə dəyişmir)" << "\\n";   // R"(...)" escape-i söndürür
    std::cout << "Bir " << "zəncirdə " << 3 << " tip: " << 2.5 << ' ' << true << "\\n";
    std::cerr << "Bu xəta axınına gedir\\n";         // cerr ayrı axındır (stderr)
    return 0;
}

// Çıxış (stdout):
// Sətir 1
// Tab:	burada
// Dırnaq: "salam"
// Xam sətir: C:\\proqram\\n heç nə dəyişmir
// Bir zəncirdə 3 tip: 2.5 1
// (cerr sətri stderr-ə gedir, adətən terminalda yenə görünür)` },
          { t: "terms", items: [
            ["escape ardıcıllığı", "\\n (yeni sətir), \\t (tab), \\\\ (əks xətt), \\\" (dırnaq) kimi «\\» ilə başlayan xüsusi simvollar."],
            ["xam sətir (raw string)", "R\"(...)\" — içindəki «\\» simvollarını olduğu kimi saxlayır; yollar və regex üçün əlverişlidir."],
            ["stdout / stderr", "normal çıxış axını (cout) və xəta axını (cerr); ayrıca yönləndirilə bilər: ./proqram > fayl.txt yalnız stdout-u fayla yazır."],
            ["çıxış kodu", "main-in qaytardığı ədəd; qabıqda $? (Linux/macOS) və ya %ERRORLEVEL% (Windows) ilə oxunur."],
          ]},
          { t: "warn", text: "Windows terminalında Azərbaycan hərfləri (ə, ı, ş, ğ) bəzən sınıq görünür. Terminalda əvvəlcə «chcp 65001» yaz (UTF-8 rejimi) və mənbə faylını UTF-8 kodlaşdırmasında saxla. Proqramın özündə səhv yoxdur — məsələ terminalın kodlaşdırmasındadır." },
          { t: "tip", text: "Hər ifadənin sonunda nöqtəli vergül (;) qoy. Bu, ən çox unudulan şeydir və kompilyator səhvlərinin yarısını yaradır." },
          { t: "tip", text: "Kompilyator xətalarını YUXARIDAN aşağı oxu: ilk xəta əsl səbəbdir, sonrakıların çoxu onun nəticəsidir. Birinci xətanı düzəlt, yenidən kompilyasiya et." },
        ],
      },
      {
        level: "orta",
        title: "Kompilyasiya mərhələləri və başlıq faylları",
        blocks: [
          { t: "p", text: "g++ bir əmrlə üç iş görür: preprocessor (öncədən işləyici) → compiler (kompilyator) → linker (birləşdirici)." },
          { t: "list", items: [
            "1) Preprocessor: #include və #define sətirlərini emal edir. #include <iostream> sadəcə həmin faylın mətnini yerinə yapışdırır.",
            "2) Kompilyator: hər .cpp faylını ayrıca yoxlayır (sintaksis, tiplər) və obyekt faylına (.o / .obj) çevirir.",
            "3) Linker: obyekt fayllarını və kitabxanaları bir icra olunan fayla birləşdirir. «undefined reference» xətası burada çıxır.",
          ]},
          { t: "code", lang: "bash", caption: "Mərhələləri ayrı-ayrı görmək", code: `g++ -E salam.cpp -o salam.ii    # yalnız preprocessor (mətn nəticəsi)
g++ -S salam.cpp -o salam.s     # assembly kodu
g++ -c salam.cpp -o salam.o     # obyekt faylı (linker yoxdur)
g++ salam.o -o salam            # linker: icra olunan fayl` },
          { t: "code", lang: "cpp", caption: "Bir neçə fayl: başlıq (.hpp) və mənbə (.cpp)", code: `// hesab.hpp — yalnız ELAN (declaration)
#pragma once                     // faylın iki dəfə qoşulmasının qarşısını alır
int topla(int a, int b);

// hesab.cpp — TƏYİN (definition)
#include "hesab.hpp"
int topla(int a, int b) {
    return a + b;
}

// main.cpp
#include <iostream>
#include "hesab.hpp"             // öz fayllarımız dırnaqla
int main() {
    std::cout << topla(2, 3) << std::endl;   // 5
    return 0;
}

// g++ -std=c++20 main.cpp hesab.cpp -o proqram` },
          { t: "list", items: [
            "<...> sistem/standart başlıqlar üçün, \"...\" öz başlıqlarımız üçün.",
            "Başlıq faylında elan, .cpp faylında təyin yazılır.",
            "#pragma once (və ya include guard) eyni başlığın təkrar qoşulmasını önləyir.",
            "-Wall -Wextra xəbərdarlıqları açır: həmişə işlət. -std=c++20 standartı seçir.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `#include <iostream>

int main() {
    std::cout << "Salam"     // ; unudulub
    return 0;
}`, right: `#include <iostream>

int main() {
    std::cout << "Salam";
    return 0;
}`, why: "Nöqtəli vergül yoxdur — kompilyator «expected ';'» xətası verir. Xəta çox vaxt unudulan sətirdən BİR SONRAKI sətirdə göstərilir, ona görə əvvəlki sətrə də bax." },
          { t: "mistake", lang: "cpp", wrong: `#include <iostream>

int main() {
    cout << "Salam";       // std:: yoxdur
    return 0;
}`, right: `#include <iostream>

int main() {
    std::cout << "Salam";
    return 0;
}`, why: "cout std ad sahəsindədir. Ya std::cout yaz, ya da using std::cout; Başlıq fayllarında «using namespace std;» yazma — adlar toqquşur və problem bütün qoşulan fayllara yayılır." },
          { t: "h", text: "Preprocessor: makrolar və şərti kompilyasiya" },
          { t: "p", text: "Preprocessor C++ kodunu başa düşmür — o, sadəcə mətn üzərində əvəzləmə aparır. #define ilə makro yaradırsan, #ifdef/#ifndef ilə kodun bir hissəsini kompilyasiyaya qoşub-çıxara bilərsən. Bu, platformaya görə fərqli kod yazmaq və sazlama rejimini ayırmaq üçün istifadə olunur. Amma makrolar tipi, əhatə dairəsini və mötərizəni bilmir, ona görə müasir C++-da sabitlər üçün constexpr, kiçik funksiyalar üçün inline funksiyalar üstündür." },
          { t: "code", lang: "cpp", caption: "Makrolar, hazır adlar və main-in arqumentləri", code: `#include <iostream>

#define PI_DEYER 3.14159
#define KVADRAT(x) ((x) * (x))     // hər x və bütün ifadə mötərizədədir

int main(int argc, char* argv[]) {
    std::cout << "Arqument sayı: " << argc << "\\n";
    for (int i = 0; i < argc; ++i) {
        std::cout << "argv[" << i << "] = " << argv[i] << "\\n";
    }
    std::cout << "__cplusplus = " << __cplusplus << "\\n";   // seçilmiş standart
    std::cout << "Sətir nömrəsi: " << __LINE__ << "\\n";
#ifdef NDEBUG
    std::cout << "Buraxılış rejimi\\n";
#else
    std::cout << "Sazlama rejimi\\n";
#endif
    std::cout << KVADRAT(2 + 3) << " " << PI_DEYER << "\\n";
    return 0;
}

// Əmr: g++ -std=c++20 -o prog prog.cpp   və   ./prog x y
// Çıxış:
// Arqument sayı: 3
// argv[0] = ./prog          (proqramın öz adı/yolu)
// argv[1] = x
// argv[2] = y
// __cplusplus = 202002      (C++20; C++17 üçün 201703)
// Sətir nömrəsi: 12
// Sazlama rejimi            (-DNDEBUG ilə kompilyasiya etsən: Buraxılış rejimi)
// 25 3.14159` },
          { t: "list", items: [
            "argc — arqumentlərin sayı (proqramın adı daxil olmaqla), argv — onların C üslublu mətn massivi. argv[0] həmişə proqramın özüdür.",
            "-DAD və ya -DAD=dəyər bayrağı kompilyasiya zamanı makro təyin edir (məs. -DNDEBUG assert-ləri söndürür).",
            "KVADRAT(2 + 3) = ((2 + 3) * (2 + 3)) = 25. Mötərizəsiz yazılsaydı 2 + 3 * 2 + 3 = 11 olardı — makro tipik tələdir.",
            "__FILE__, __LINE__, __cplusplus kompilyatorun hazır təyin etdiyi makrolardır; xəta mesajlarında və log-larda faydalıdır.",
          ]},
          { t: "terms", items: [
            ["makro (macro)", "preprocessor-un mətn əvəzləməsi; tipi və əhatə dairəsi yoxdur."],
            ["include guard", "#ifndef/#define/#endif ilə başlığın təkrar qoşulmasının qarşısını alan quruluş; #pragma once-un standart alternativi."],
            ["translation unit", "preprocessor-dan keçmiş bir .cpp faylı və onun qoşduğu bütün başlıqlar; kompilyatora bir vahid kimi verilir."],
            ["linkage", "adın başqa translation unit-lərdə görünüb-görünməməsi (external / internal)."],
          ]},
          { t: "mistake", lang: "cpp", wrong: `// hesab.hpp
int topla(int a, int b);          // yalnız elan var

// main.cpp
#include <iostream>
#include "hesab.hpp"
int main() {
    std::cout << topla(2, 3);     // kompilyasiya olur, link olmur
}
// g++ main.cpp -o prog   →   undefined reference to \`topla(int, int)\``, right: `// g++ main.cpp hesab.cpp -o prog    (hesab.cpp də verilir)
// hesab.cpp mövcuddur və topla-nın TƏYİNİNİ saxlayır:
#include "hesab.hpp"
int topla(int a, int b) { return a + b; }`, why: "Kompilyator yalnız elanı görür və qərar verir ki, funksiya «bir yerdə» var. Linker isə həmin təyini axtarıb tapa bilmir. Xəta mənbə kodda deyil, əmr sətrində (və ya build sistemində) olur: .cpp faylını əlavə etməyi unutmusan." },
          { t: "mistake", lang: "cpp", wrong: `// alet.hpp — include guard YOXDUR
struct Nokta { int x; int y; };

// main.cpp
#include "alet.hpp"
#include "alet.hpp"               // dolayısı ilə də ola bilər (A.hpp → alet.hpp, B.hpp → alet.hpp)
int main() {}                     // error: redefinition of 'struct Nokta'`, right: `// alet.hpp
#pragma once                      // və ya #ifndef ALET_HPP / #define ALET_HPP / ... / #endif
struct Nokta { int x; int y; };`, why: "Preprocessor #include-u sadəcə mətn yapışdırmaq kimi icra edir. Eyni başlıq iki yolla qoşularsa, eyni struktur iki dəfə təyin olunur. Hər başlığa #pragma once (və ya include guard) qoy." },
          { t: "warn", text: "Başlıq faylında adi funksiya və qlobal dəyişən TƏYİN etmə (yalnız elan et). Başlıq bir neçə .cpp tərəfindən qoşulur, hər biri öz nüsxəsini alır və linker «multiple definition» xətası verir. İstisna: inline/constexpr funksiyalar, şablonlar, inline dəyişənlər (C++17) və siniflərin təyini." },
          { t: "tip", text: "Böyük layihədə kompilyasiya əmrini əllə yazmaq əvəzinə CMake və ya Makefile işlət: o, yalnız dəyişən .cpp fayllarını yenidən kompilyasiya edir və vaxta qənaət edir." },
        ],
      },
      {
        level: "senior",
        title: "Daxildə necə işləyir və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "C++ «sıfır xərc abstraksiya» prinsipinə əsaslanır: istifadə etmədiyin şeyə görə ödəmirsən; istifadə etdiyini əl ilə yaza bilməzdin daha yaxşı.",
            "Kompilyasiya vahidi (translation unit): preprocessor-dan sonra hər .cpp ayrıca kompilyasiya olunur. One Definition Rule (ODR): hər funksiya/dəyişənin təyini bütün proqramda yalnız bir olmalıdır (inline istisna).",
            "main-də return 0 yazmasan, kompilyator avtomatik 0 qaytarır (yalnız main üçün). Proses çıxış kodu qabıqda ($?) yoxlanılır.",
            "Optimallaşdırma: -O2 adi buraxılış üçün, -O0 -g sazlama üçün. Optimallaşdırıcı UB-nin olmadığını FƏRZ edir — bu, bəzən kodu gözlənilməz dəyişir.",
            "Müasir C++20 modulları (import) başlıq fayllarının əvəzidir, lakin alətlər dəstəyi hələ qeyri-bərabərdir; hələlik başlıqlar standartdır.",
            "Təhlükəsizlik — C++ yaddaş təhlükəsizliyini sənin əlinə verir: buffer overflow, use-after-free, undefined behavior (UB) real zəifliklərin əsas mənbəyidir (məsələn, Chrome və Windows zəifliklərinin təxminən 70%-i yaddaş xətalarıdır).",
            "Təhlükəsizlik — həmişə -Wall -Wextra yandır, CI-də -Werror istifadə et. Sazlamada -fsanitize=address,undefined (ASan/UBSan) ilə yaddaş xətalarını işləmə vaxtı tut.",
            "Təhlükəsizlik — buraxılış üçün sərtləşdirmə bayraqları: -D_FORTIFY_SOURCE=2, -fstack-protector-strong, -fPIE -pie, -Wl,-z,relro,-z,now.",
            "Təhlükəsizlik — C üslublu API-lərdən (gets, strcpy, sprintf) qaç; standart konteynerlər (std::string, std::vector) və RAII-ə üstünlük ver.",
          ]},
          { t: "code", lang: "bash", caption: "Sazlama və buraxılış üçün tövsiyə olunan əmrlər", code: `# Sazlama: xətaları tutan sanitayzerlərlə
g++ -std=c++20 -Wall -Wextra -Wpedantic -g -O0 \\
    -fsanitize=address,undefined -o proqram_debug main.cpp

# Buraxılış: optimallaşdırma + sərtləşdirmə
g++ -std=c++20 -Wall -Wextra -O2 -D_FORTIFY_SOURCE=2 \\
    -fstack-protector-strong -o proqram main.cpp` },
          { t: "code", lang: "cpp", caption: "Təhlükəli (C üslubu) və təhlükəsiz (C++) — UB nümunəsi aydın işarələnib", code: `#include <cstring>
#include <iostream>
#include <string>

// TƏHLÜKƏLİ: 8 baytlıq bufer, giriş uzun ola bilər — buffer overflow (UB)!
void pis(const char* ad) {
    char bufer[8];
    std::strcpy(bufer, ad);          // ad 8 baytdan uzundursa yaddaşı pozur
    std::cout << bufer << "\\n";
}

// TƏHLÜKƏSİZ: std::string ölçünü özü idarə edir
void yaxsi(const std::string& ad) {
    std::string nusxe = ad;          // istənilən uzunluq
    std::cout << nusxe << "\\n";
}

int main() {
    yaxsi("çox uzun istifadəçi adı, problem yoxdur");
    // pis("çox uzun istifadəçi adı");   // BUNU ÇAĞIRMA: undefined behavior
    return 0;
}` },
          { t: "qa", items: [
            ["C++ kompilyasiya prosesinin mərhələləri hansılardır?", "Preprocessor (#include, #define), kompilyator (obyekt faylı), linker (obyekt fayllarını və kitabxanaları icra olunan fayla birləşdirir)."],
            ["Elan (declaration) ilə təyin (definition) fərqi nədir?", "Elan adın mövcudluğunu və tipini bildirir (bir neçə dəfə ola bilər); təyin yaddaş ayırır/gövdəni yazır (ODR görə yalnız bir dəfə)."],
            ["«undefined reference» xətası hansı mərhələdə çıxır və niyə?", "Linker mərhələsində: funksiya elan olunub, amma təyini (.cpp və ya kitabxana) birləşdirməyə verilməyib."],
            ["Undefined behavior nədir?", "Standartın nəticəni təyin etmədiyi kod: proqram çöküb, səhv nəticə verib və ya «işləyə» bilər. Optimallaşdırıcı onun baş vermədiyini fərz edir, ona görə nəticə proqnozlaşdırılmazdır."],
            ["Niyə başlıqda «using namespace std;» yazmaq pis təcrübədir?", "Başlığı qoşan hər fayla std adlarını yayır, ad toqquşmalarına və gözlənilməz funksiya seçiminə səbəb olur."],
          ]},
          { t: "h", text: "Linkage, ODR, name mangling və ABI" },
          { t: "p", text: "C++-da funksiyalar eyni adla, lakin fərqli parametrlərlə mövcud ola bilər (overloading). Obyekt faylında isə yalnız sadə simvol adları var, ona görə kompilyator ad və parametr tiplərini birləşdirib «dolaşıq» ad (name mangling) yaradır. Linker «undefined reference» xətasında bu adı sənə dekodlaşdırılmış halda göstərir." },
          { t: "code", lang: "bash", caption: "Obyekt faylındakı simvollar (GCC/Itanium ABI)", code: `# m.cpp:  int topla(int, int);   namespace m { double f(double); }
g++ -c m.cpp -o m.o
nm m.o                 # xam (mangled) adlar
# T _Z5toplaii         (5 hərfli «topla», parametrlər: i i)
# T _ZN1m1fEd          (m::f, parametr: d = double)

nm -C m.o              # c++filt ilə dekodlaşdırılmış adlar
# T topla(int, int)
# T m::f(double)` },
          { t: "list", items: [
            "External linkage (defolt): funksiya və qlobal dəyişən bütün translation unit-lərdə görünür. Internal linkage: static və ya adsız namespace { } — yalnız bu .cpp faylında. Bu fayl üçün lokal köməkçi funksiyaları həmişə adsız namespace-ə qoy.",
            "ODR (One Definition Rule) pozuntusu «ill-formed, no diagnostic required»-dir: kompilyator və linker səni xəbərdar etməyə bilər. Nəticədə iki fərqli sinif eyni adla müxtəlif .cpp-lərdə təyin olunarsa, proqram səssizcə yanlış işləyə bilər. Qoruma: adsız namespace, unikal ad sahələri, -flto -Wodr.",
            "inline açar sözü bu gün «inline-a çevir» demək deyil — «bu təyin bir neçə translation unit-də eyni ola bilər» deməkdir. Başlıqda funksiya təyin etməyin yolu budur. C++17: inline dəyişənlər (inline constexpr int N = 5;) başlıqda təhlükəsizdir.",
            "extern \"C\" mangling-i söndürür: C kitabxanalarını çağırmaq və ya başqa dillərdən (Python ctypes, Rust FFI) çağırılan funksiya ixrac etmək üçün lazımdır.",
            "ABI (Application Binary Interface) — kompilyasiya olunmuş kodun ikilik səviyyəsində razılaşmadır: tiplərin ölçüsü, yaddaşda düzülüşü, funksiya çağırış qaydası, mangling. Kitabxananı bir kompilyatorla, proqramı başqası ilə qurmaq ABI uyğunsuzluğuna gətirə bilər (məs. MSVC ilə GCC uyğun deyil; libstdc++-da köhnə və yeni std::string ABI-si _GLIBCXX_USE_CXX11_ABI ilə seçilir).",
            "Statik bağlama (.a/.lib) kodu icra olunan fayla kopyalayır; dinamik bağlama (.so/.dll) işləmə zamanı yükləyir. Dinamik kitabxananın ictimai interfeysində STL tiplərini ötürmək ABI riskidir.",
            "As-if qaydası: optimallaşdırıcı proqramın GÖRÜNƏN davranışını (çıxış, uçucu oxuma/yazma) saxladığı müddətcə kodu istədiyi kimi dəyişə bilər — hesablamanı silə, dövrləri açıb-yaya, funksiyaları inline edə bilər. Buna görə sadə «vaxt ölçən» dövrlər çox vaxt tamamilə silinir.",
            "-flto (link-time optimization) linkerə bütün translation unit-lərin ara təsvirini verir: .cpp sərhədləri üzrə inline və ölü kodun silinməsi mümkün olur. Bahalıdır, lakin buraxılış qurulmalarında tez-tez 5-20% qazandırır.",
            "Kompilyasiya sürəti: böyük başlıqlar hər .cpp-də yenidən emal olunur. Precompiled header (PCH), ccache, forward declaration və C++20 modulları bu xərci azaldır.",
          ]},
          { t: "code", lang: "cpp", caption: "Kompilyasiya vaxtı yoxlamalar: constexpr, static_assert, [[nodiscard]]", code: `#include <iostream>
#include <type_traits>

constexpr int faktorial(int n) { return n <= 1 ? 1 : n * faktorial(n - 1); }

struct Nokta { int x; int y; };

[[nodiscard]] int hesabla() { return 42; }     // nəticəni atsan, xəbərdarlıq verir

int main() {
    static_assert(faktorial(5) == 120, "faktorial yanlışdır");           // kompilyasiyada yoxlanır
    static_assert(sizeof(int) >= 4, "int ən azı 4 bayt olmalıdır");
    constexpr int cedvel[faktorial(4)]{};          // ölçü kompilyasiya zamanı: 24
    std::cout << "Massiv ölçüsü: " << sizeof(cedvel) / sizeof(cedvel[0]) << "\\n";

    Nokta n{3, 4};
    auto [x, y] = n;                               // C++17 structured binding
    std::cout << x << "," << y << "\\n";

    std::cout << std::boolalpha << std::is_same_v<decltype(x), int> << "\\n";
    int r = hesabla();                             // hesabla(); yazsaydın: -Wunused-result
    std::cout << r << "\\n";
    return 0;
}

// Çıxış:
// Massiv ölçüsü: 24
// 3,4
// true
// 42` },
          { t: "terms", items: [
            ["name mangling", "kompilyatorun funksiya adını parametr tiplərini də kodlayan simvola çevirməsi (_Z5toplaii)."],
            ["ABI", "ikilik səviyyəsində razılaşma: tiplərin düzülüşü, çağırış qaydası, mangling."],
            ["ODR", "One Definition Rule: hər varlığın proqramda bir təyini olmalıdır; pozuntu çox vaxt diaqnostika olmadan UB-dir."],
            ["LTO", "link-time optimization: translation unit-lər arası optimallaşdırma."],
            ["as-if qaydası", "optimallaşdırıcı yalnız müşahidə olunan davranışı saxlamalıdır; qalan hər şeyi dəyişə bilər."],
            ["implementation-defined / unspecified / undefined", "implementasiyanın sənədləşdirdiyi / sənədləşdirməli olmadığı seçim / standartın heç nə demədiyi davranış (ən təhlükəlisi)."],
          ]},
          { t: "warn", text: "«Mənim kompilyatorumda işləyir» ölçü deyil. UB «düzgün işləyən» kimi görünə bilər, amma kompilyatorun versiyası, optimallaşdırma səviyyəsi və hətta kod əlavəsi nəticəni dəyişə bilər. Həmişə -fsanitize=undefined ilə yoxla və 2+ kompilyatorla (GCC, Clang) qur." },
          { t: "qa", items: [
            ["Name mangling nədir və niyə lazımdır?", "Obyekt fayllarında yalnız simvol adı var; C++ overloading və ad sahələrini dəstəkləmək üçün kompilyator funksiya adına parametr tiplərini və ad sahəsini kodlayır (_ZN1m1fEd). extern \"C\" bunu söndürür."],
            ["ODR nədir və pozulsa nə olar?", "Hər funksiya, dəyişən və sinfin proqramda tək təyini olmalıdır (inline/şablonlar eyni təyinlə təkrarlana bilər). Pozuntu çox vaxt diaqnostika edilmir və UB-dir: kompilyator səssizcə bir təyini seçə bilər."],
            ["Başlıqda funksiyanı necə təyin etməli?", "inline (və ya constexpr/şablon) edərək: bu, bir neçə translation unit-də eyni təyinə icazə verir. Adi (inline olmayan) təyin multiple definition linker xətası verir."],
            ["static və adsız namespace arasında nə fərq var?", "Hər ikisi internal linkage verir. C++-da adsız namespace tövsiyə olunur, çünki tiplərə (struct) də tətbiq olunur; static yalnız funksiya və dəyişənlər üçündür."],
            ["Statik və dinamik bağlama fərqi?", "Statik: kitabxana kodu icra olunan fayla kopyalanır (böyük fayl, asılılıq yoxdur). Dinamik: işləmə zamanı .so/.dll yüklənir (kiçik fayl, yeniləmə asan, lakin ABI uyğunluğu lazımdır)."],
            ["-O2 ilə -O3 fərqi və niyə -O2 daha geniş yayılıb?", "-O3 əlavə aqressiv optimallaşdırmalar (dövr açma, vektorlaşma) əlavə edir, kod ölçüsünü artırır; həmişə sürətli olmur. -O2 sürət/ölçü/etibarlılıq balansıdır; real gücü profil ilə ölç."],
            ["as-if qaydası nə deməkdir?", "Kompilyator proqramın müşahidə olunan davranışını (I/O, volatile, atomik əməliyyatlar) saxlayarsa, hesablamaları silə, yenidən sıralaya və birləşdirə bilər."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı mərhələ obyekt fayllarını icra olunan fayla birləşdirir?", options: ["Preprocessor", "Kompilyator", "Linker"], answer: 2, why: "Linker obyekt fayllarını və kitabxanaları bir icra olunan fayla birləşdirir." },
          { t: "quiz", q: "main funksiyasından return 0 nə bildirir?", options: ["Proqram xəta ilə bitdi", "Proqram uğurla bitdi", "Heç nə bildirmir"], answer: 1, why: "0 uğurlu çıxış kodudur; sıfırdan fərqli dəyər xəta bildirir." },
          { t: "quiz", q: "Öz başlıq faylını necə qoşursan?", options: ["#include <hesab.hpp>", "#include \"hesab.hpp\"", "#import hesab.hpp"], answer: 1, why: "Öz fayllar dırnaqla, sistem başlıqları bucaq mötərizələri ilə qoşulur." },
        ],
      },
    ],
    exercise: {
      task: "`salam.cpp` proqramı yaz. 1) <iostream> qoş. 2) main funksiyasında std::cout ilə «Mən C++ öyrənirəm» sətrini, sonra ayrıca sətirdə «2 + 3 = » və toplamın nəticəsini (5) çap et. 3) Sonda return 0 olsun. 4) Şərhdə (// ilə) bu proqramı kompilyasiya edən g++ əmrini (-std=c++20 -Wall -Wextra ilə) yaz.",
      starter: `// Kompilyasiya əmri: \n\n#include <iostream>\n\nint main() {\n    // kodunu bura yaz\n}\n`,
      expect: "#include <iostream>; int main(); std::cout (std:: prefiksi ilə və ya using std::cout) ilə «Mən C++ öyrənirəm» çap olunur; ikinci sətirdə 2 + 3 hesablanıb 5 çap olunur; hər ifadə ; ilə bitir; return 0 var; şərhdə g++ -std=c++20 -Wall -Wextra ... əmri yazılıb.",
    },
  },
  {
    slug: "deyisenler",
    title: "Dəyişənlər və tiplər",
    intro: "Dəyişən — yaddaşda ad verilmiş yerdir; tipi onun nə saxlaya biləcəyini və neçə bayt tutduğunu müəyyən edir. C++ statik tipli dildir: tip kompilyasiya zamanı bəlli olur.",
    sections: [
      {
        level: "baslangic",
        title: "Əsas tiplər",
        blocks: [
          { t: "analogy", text: "Dəyişən etiketli qutudur. int qutusuna yalnız tam ədəd, double qutusuna kəsr, char qutusuna bir hərf, bool qutusuna yalnız hə/yox sığır. Qutunun ölçüsü sabitdir: çox böyük ədəd qoysan, daşar." },
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <string>

int main() {
    int yas = 25;                    // tam ədəd
    double boy = 1.78;               // kəsr ədəd (təxminən 15 rəqəm dəqiqlik)
    char herf = 'A';                 // bir simvol (tək dırnaq)
    bool telebe = true;              // true / false
    std::string ad = "Aysel";        // mətn (çox simvol)

    auto say = 10;                   // auto: tip sağdan çıxarılır (int)
    auto qiymet = 4.5;               // double

    const double PI = 3.14159;       // dəyişməz
    constexpr int GUN = 7;           // kompilyasiya zamanı məlum sabit

    std::cout << ad << " " << yas << " yaşında, boyu " << boy << "\\n";
    std::cout << "Gün sayı: " << GUN << ", pi: " << PI << "\\n";
    std::cout << "Sayı: " << say << ", qiymət: " << qiymet << "\\n";
    std::cout << "Hərf: " << herf << ", tələbə: " << telebe << "\\n";   // bool 1 kimi çıxır
    return 0;
}` },
          { t: "terms", items: [
            ["int", "tam ədəd; adətən 4 bayt (təxminən ±2,1 milyard)."],
            ["double", "ikiqat dəqiqlikli kəsr ədəd (8 bayt); float 4 baytdır, daha az dəqiqdir."],
            ["char", "1 bayt; simvol və ya kiçik ədəd."],
            ["bool", "true və ya false."],
            ["auto", "kompilyatorun tipi başlanğıc dəyərdən çıxarması."],
            ["const / constexpr", "const — dəyişməz; constexpr — dəyəri kompilyasiya zamanı hesablanan sabit."],
          ]},
          { t: "h", text: "Elan, başlatma, mənimsətmə və əhatə dairəsi" },
          { t: "p", text: "Dəyişən elan edəndə kompilyator ona yaddaşda yer ayırır. Elan (int x;), başlatma (int x = 5; — elanla birlikdə ilk dəyər vermək) və mənimsətmə (x = 7; — sonradan dəyər dəyişmək) üç fərqli şeydir. C++-da dəyişənin əhatə dairəsi (scope) onu elan edən {} blokudur: blok bitəndə dəyişən yox olur. Daxili blokda eyni adlı yeni dəyişən elan etsən, o, xaricini «gizlədir» (shadowing) — bu, qarışıqlıq mənbəyidir və -Wshadow bayrağı bunu göstərir." },
          { t: "code", lang: "cpp", caption: "Əhatə dairəsi, char hesabı və artırma operatorları", code: `#include <iostream>
#include <string>

int umumi = 100;                       // qlobal (tövsiyə olunmur)

int main() {
    int x = 1;
    {
        int x = 2;                     // xarici x-i gizlədir (shadowing)
        std::cout << "daxili x = " << x << "\\n";
    }
    std::cout << "xarici x = " << x << "\\n";

    for (int i = 0; i < 3; ++i) {}     // i yalnız dövr daxilindədir
    // std::cout << i;                 // XƏTA: i burada yoxdur

    char c = 'A';
    c += 2;                            // 'C'
    std::cout << c << " " << static_cast<int>(c) << "\\n";
    std::cout << 'a' - 'A' << "\\n";    // 32: kiçik və böyük hərf arasındakı ASCII fərqi

    int say = 5;
    int evvel = say++;                          // əvvəl köhnə dəyər götürülür
    std::cout << evvel << " " << say << "\\n";   // 5 6
    std::cout << ++say << "\\n";                 // 7  (əvvəl artır, sonra oxuyur)
    say += 3; say *= 2; say %= 7;               // 10 → 20 → 6
    std::cout << say << "\\n";

    auto s = std::string("abc") + "def";
    auto uzun = s.size();               // size_t (işarəsiz tam ədəd)
    std::cout << s << " " << uzun << "\\n";
    std::cout << umumi << "\\n";
    return 0;
}

// Çıxış:
// daxili x = 2
// xarici x = 1
// C 67
// 32
// 5 6
// 7
// 6
// abcdef 6
// 100` },
          { t: "list", items: [
            "Ad qaydaları: hərf və ya _ ilə başlayır, rəqəm və _ ola bilər; açar sözlər (int, class, return...) ad ola bilməz. Böyük-kiçik hərf fərqlidir: yas və Yas fərqli dəyişənlərdir.",
            "Ad seçərkən mənanı yaz: x1, tmp yox, telebeSayi, maksBal kimi. Uzun, amma aydın ad qısa və sirli addan yaxşıdır.",
            "++x (prefiks) əvvəl artırır sonra dəyəri qaytarır, x++ (postfiks) köhnə dəyəri qaytarır sonra artırır. Tək başına yazanda fərq yoxdur, lakin dövrlərdə ++i vərdiş et.",
            "Mürəkkəb mənimsətmələr: +=, -=, *=, /=, %=. x += 3 eynidir x = x + 3.",
            "% (modul) yalnız tam ədədlərdə işləyir: 17 % 5 = 2. Cüt-tək yoxlaması: n % 2 == 0.",
            "char əslində 1 baytlıq ədəddir: 'A' = 65. cout onu simvol kimi çap edir, hesabda isə ədəd kimi davranır.",
          ]},
          { t: "warn", text: "Lokal dəyişən başlanmayanda zibil dəyərə malikdir, qlobal dəyişən isə avtomatik 0 ilə başlayır. Bu fərqi ezbərləmə — sadəcə hər dəyişəni elan edəndə başlat: int say{};" },
          { t: "tip", text: "Defolt olaraq const yaz: dəyişməyən hər şeyi const et. Bu, təsadüfi dəyişiklikləri kompilyatora tutdurur." },
          { t: "tip", text: "Tipi özün yazmaq sənə aydın görünməli olan yerdə (int say = 0;) tipi açıq yaz; tip uzundursa və ya aydındırsa (iteratorlar, new nəticəsi, make_unique) auto işlət. Hər yerdə auto yazmaq oxunaqlılığı pisləşdirə bilər." },
        ],
      },
      {
        level: "orta",
        title: "Ölçülər, başlatma növləri və çevirmələr",
        blocks: [
          { t: "code", lang: "cpp", caption: "sizeof, limitlər və başlatma", code: `#include <cstdint>
#include <iostream>
#include <limits>

int main() {
    std::cout << "int: " << sizeof(int) << " bayt\\n";
    std::cout << "double: " << sizeof(double) << " bayt\\n";
    std::cout << "int max: " << std::numeric_limits<int>::max() << "\\n";   // 2147483647

    // Sabit ölçülü tiplər (<cstdint>): platformadan asılı deyil
    std::int32_t a = 100;
    std::uint8_t kicik = 255;        // 0..255
    std::int64_t boyuk = 9000000000LL;

    // Başlatma növləri
    int x1 = 5;        // kopya başlatma (köhnə üslub)
    int x2(5);         // birbaşa başlatma
    int x3{5};         // fiqurlu (brace) başlatma — müasir və daha təhlükəsiz
    int x4{};          // 0-a başlayır (boş {} = sıfır)

    // int bos = 3.9;  // səssizcə 3 olur (məlumat itir)
    // int z{3.9};     // XƏTA: narrowing conversion — kompilyator qadağan edir

    int tam = static_cast<int>(3.9);   // açıq çevirmə: 3
    std::cout << a << " " << static_cast<int>(kicik) << " " << boyuk << "\\n";
    std::cout << x1 << x2 << x3 << x4 << " " << tam << "\\n";
    return 0;
}` },
          { t: "list", items: [
            "Fiqurlu {} başlatma «narrowing» çevirməni (məlumat itkisi) kompilyasiya xətası edir — səssiz itkidən yaxşıdır.",
            "std::uint8_t (<cstdint>) char kimi çap olunur: ədəd görmək üçün int-ə çevir.",
            "int / int tam bölmədir: 7 / 2 = 3. Kəsr üçün ən azı biri double olmalıdır: 7 / 2.0 = 3.5.",
            "Ədədlərdə f (float), LL (long long), u (unsigned) şəkilçiləri var: 3.5f, 100LL, 5u.",
            "char və string fərqli: 'A' (bir simvol, tək dırnaq), \"A\" (mətn, cüt dırnaq).",
          ]},
          { t: "mistake", lang: "cpp", wrong: `int say;                  // başlanmayıb
std::cout << say;         // zibil dəyər çap olunur (UB)`, right: `int say{};                // 0
std::cout << say;         // 0`, why: "Lokal dəyişən avtomatik sıfırlanmır: yaddaşda əvvəl nə varsa, o olur. Oxumaq undefined behavior-dur. Həmişə başlat: int say{};" },
          { t: "mistake", lang: "cpp", wrong: `int a = 7;
int b = 2;
double netice = a / b;    // 3 (3.5 deyil!)`, right: `int a = 7;
int b = 2;
double netice = static_cast<double>(a) / b;   // 3.5`, why: "a / b iki tam ədədin bölməsidir və nəticə əvvəlcə tam olur (3), sonra double-a çevrilir. Birini əvvəlcədən double et." },
          { t: "h", text: "Kəsr ədədlərin dəqiqliyi, tip yüksəlməsi və enum" },
          { t: "p", text: "float və double ədədləri ikilik kəsr kimi saxlayır (IEEE 754). 0.1 kimi bəzi onluq kəsrlər ikilik sistemdə sonsuz kəsrdir və yalnız təxmini saxlanılır. Ona görə kəsr ədədlərin hesabında kiçik xəta yığılır və «tam bərabərlik» yoxlaması etibarsızdır. Pul hesabında double əvəzinə tam ədəd (qəpiklə) saxlamaq daha düzgündür." },
          { t: "code", lang: "cpp", caption: "Kəsr dəqiqliyi, integer promotion, enum class və tam bölmə", code: `#include <iomanip>
#include <iostream>
#include <type_traits>

enum class Reng { Qirmizi, Yasil, Mavi };    // güclü tipli enum
using Say = unsigned int;                     // tipə ikinci ad

int main() {
    std::cout << std::setprecision(17);
    std::cout << 0.1 + 0.2 << "\\n";                              // 0.30000000000000004
    std::cout << std::boolalpha << (0.1 + 0.2 == 0.3) << "\\n";   // false
    float f = 0.1f;
    std::cout << f << " " << static_cast<double>(f) << "\\n";     // float daha az dəqiqdir

    unsigned char a = 200, b = 100;
    auto c = a + b;                       // kiçik tiplər int-ə yüksəlir (integer promotion)
    std::cout << c << " " << std::is_same_v<decltype(c), int> << "\\n";   // 300 true
    unsigned char d = a + b;              // geri 1 baytlıq tipə: 300 % 256 = 44
    std::cout << static_cast<int>(d) << "\\n";

    Reng r = Reng::Yasil;
    std::cout << static_cast<int>(r) << "\\n";                    // 1 (açıq çevirmə lazımdır)
    Say s = 7;
    std::cout << s << "\\n";

    long long boyuk = 3000000000LL;
    int kicik = static_cast<int>(boyuk);  // int-ə sığmır: implementasiya-təyinli (adətən -1294967296)
    std::cout << kicik << "\\n";
    std::cout << (5 / 2) << " " << (-5 / 2) << " " << (-5 % 3) << "\\n";   // 2 -2 -2
    return 0;
}

// Çıxış:
// 0.30000000000000004
// false
// 0.10000000149011612 0.10000000149011612
// 300 true
// 44
// 1
// 7
// -1294967296
// 2 -2 -2` },
          { t: "list", items: [
            "Tam bölmə sıfıra doğru yuvarlaqlaşır (-5 / 2 = -2) və a % b-nin işarəsi a-nın işarəsi ilə eynidir (-5 % 3 = -2). Python-dan fərqlidir!",
            "Integer promotion: char, short kimi tiplər hesabda int-ə yüksəlir. unsigned char + unsigned char = int; nəticəni yenə char-a mənimsətmək kəsilməyə gətirir.",
            "enum class adlarını ad sahəsi ilə yazırsan (Reng::Yasil) və ədədə avtomatik çevrilmir: köhnə enum-dan (adlar qlobal, int-ə sərbəst çevrilir) daha təhlükəsizdir.",
            "using Say = unsigned int; — tip üçün ad (alias); köhnə typedef-in müasir və oxunaqlı variantıdır, şablonlarla da işləyir.",
            "Kəsr ədədləri müqayisə etmək üçün fərqi yoxla: std::abs(a - b) < 1e-9, == yazma.",
            "float: ~7, double: ~15-16 mənalı rəqəm. Defolt seçim double olsun; float yalnız yaddaş/GPU/SIMD üçündür.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `double a = 0.1 + 0.2;
if (a == 0.3) {
    std::cout << "bərabər";      // heç vaxt işləmir
}`, right: `#include <cmath>
double a = 0.1 + 0.2;
if (std::abs(a - 0.3) < 1e-9) {
    std::cout << "bərabər";      // işləyir
}`, why: "0.1 və 0.2 ikilik sistemdə dəqiq saxlanmır, cəmi 0.30000000000000004 olur. Kəsr ədədləri == ilə yox, kiçik tolerantlıqla (epsilon) müqayisə et." },
          { t: "mistake", lang: "cpp", wrong: `#include <iostream>
#include <cstdint>

std::uint8_t say = 65;
std::cout << say;                // «A» çap edir (ədəd yox)`, right: `#include <iostream>
#include <cstdint>

std::uint8_t say = 65;
std::cout << static_cast<int>(say);   // 65`, why: "std::uint8_t əslində unsigned char-dır və cout onu simvol kimi çap edir. Ədədi görmək üçün int-ə çevir (və ya unary + işlət: +say)." },
          { t: "mistake", lang: "cpp", wrong: `int a = 1000000;
int b = 1000000;
long long cem = a * b;           // a * b əvvəl int-də hesablanır!`, right: `int a = 1000000;
int b = 1000000;
long long cem = static_cast<long long>(a) * b;   // 1000000000000`, why: "Mənimsətmənin sol tərəfinin tipi sağ tərəfin hesablanmasına təsir etmir. a * b int * int-dir və daşır (UB), sonra nəticə long long-a çevrilir. Çevirməni hesablamadan ƏVVƏL et." },
          { t: "tip", text: "Kompilyatora kömək et: -Wconversion və -Wsign-conversion bayraqları itkili çevirmələri xəbərdarlıq kimi göstərir. Yeni layihədə -Wall -Wextra -Wconversion ilə başla." },
        ],
      },
      {
        level: "senior",
        title: "Overflow, yaddaş və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "İşarəli (signed) tam ədədin daşması — undefined behavior-dur: INT_MAX + 1 «dövr etmir», kompilyator bu halı heç olmayacaq kimi qəbul edib kodu silə bilər.",
            "İşarəsiz (unsigned) daşma müəyyəndir: modul 2^N ilə «dövr edir» (0 - 1 → ən böyük dəyər). Lakin bu da məntiq xətası yaradır.",
            "İşarəli və işarəsiz tipləri qarışdırma: -1 < 1u müqayisəsi false verir, çünki -1 böyük işarəsiz ədədə çevrilir.",
            "Başlanmamış dəyişən: lokal dəyişən oxunması UB-dir; zibil dəyər həssas məlumat (köhnə yaddaş) sızdıra bilər.",
            "Tiplərin ölçüsü platformadan asılıdır (long Windows-da 4, Linux-da 8 bayt ola bilər). Dəqiq ölçü lazımdırsa <cstdint> tiplərini işlət.",
            "constexpr hesablamanı kompilyasiya vaxtına köçürür: işləmə vaxtı sıfır xərc. static_assert ilə ölçü fərziyyələrini yoxla.",
            "Təhlükəsizlik — tam ədəd daşması klassik zəiflikdir: ölçü hesablamasında (n * sizeof(T)) daşma kiçik bufer ayırıb böyük məlumat yazılmasına səbəb olur (heap overflow). Əməliyyatdan ƏVVƏL yoxla.",
            "Təhlükəsizlik — xarici girişdən gələn ədədləri (uzunluq, say, indeks) həmişə aralıq yoxlamasından keçir; mənfi dəyər size_t-ə çevrilərkən çox böyük ədəd olur.",
            "Təhlükəsizlik — GCC/Clang-də __builtin_add_overflow, __builtin_mul_overflow daşmanı təhlükəsiz aşkarlayır; -fsanitize=undefined signed overflow-nu işləmə vaxtı tutur.",
            "C++20: std::in_range<T>(x) dəyərin T tipinə itkisiz sığıb-sığmadığını yoxlayır (<utility>).",
          ]},
          { t: "code", lang: "cpp", caption: "Daşmadan əvvəl yoxlama (təhlükəsiz toplama)", code: `#include <iostream>
#include <limits>
#include <optional>

// Daşma olarsa nullopt qaytarır; UB yoxdur
std::optional<int> tehlukesizTopla(int a, int b) {
    if (b > 0 && a > std::numeric_limits<int>::max() - b) return std::nullopt;
    if (b < 0 && a < std::numeric_limits<int>::min() - b) return std::nullopt;
    return a + b;                   // bura çatanda daşma mümkün deyil
}

int main() {
    auto n1 = tehlukesizTopla(2000000000, 100000000);
    auto n2 = tehlukesizTopla(2000000000, 200000000);   // daşardı

    if (n1) std::cout << "Nəticə: " << *n1 << "\\n";
    if (!n2) std::cout << "Daşma aşkarlandı!\\n";

    // İşarəsiz «dövr etmə» (müəyyən davranış, lakin məntiq xətası ola bilər)
    unsigned int u = 0;
    u = u - 1;                      // 4294967295
    std::cout << u << "\\n";
    return 0;
}` },
          { t: "code", lang: "cpp", caption: "TƏHLÜKƏLİ nümunə (yalnız göstərmək üçün): ölçü daşması", code: `#include <cstdint>
#include <cstdlib>

// UB / zəiflik: say * 4 daşa bilər, kiçik yaddaş ayrılır, sonra dövr hamısını yazır
void pis(std::uint32_t say) {
    std::uint32_t bayt = say * 4;                 // say = 0x40000001 olsa, bayt = 4
    int* massiv = static_cast<int*>(std::malloc(bayt));
    for (std::uint32_t i = 0; i < say; ++i) {
        massiv[i] = 0;                            // sərhəddən kənara yazır (heap overflow)
    }
    std::free(massiv);
}
// Düzgün yol: std::vector<int> massiv(say); və giriş say üçün yuxarı hədd yoxlaması` },
          { t: "qa", items: [
            ["Signed və unsigned daşma arasında fərq nədir?", "Signed daşma UB-dir (kompilyator nəticəni fərz edə bilməz); unsigned daşma müəyyəndir və modul 2^N ilə dövr edir."],
            ["{} başlatma nə üstünlük verir?", "Narrowing çevirmələri (məsələn double→int) kompilyasiya xətası edir, həm də boş {} dəyişəni sıfıra başladır."],
            ["const ilə constexpr fərqi?", "const — başlandıqdan sonra dəyişməz (dəyəri icra zamanı da ola bilər); constexpr — dəyər kompilyasiya zamanı hesablana bilməlidir."],
            ["Niyə int-in ölçüsünə güvənmək olmaz?", "Standart yalnız minimum ölçü verir; platformadan asılıdır. Dəqiq ölçü üçün std::int32_t kimi tiplər işlənir."],
            ["Başlanmamış lokal dəyişən nə üçün təhlükəlidir?", "Oxunması UB-dir; zibil dəyər proqramı pozur və əvvəlki yaddaş məzmununu (həssas məlumat) sızdıra bilər."],
          ]},
          { t: "h", text: "Yaddaşda düzülüş: hizalanma, padding və bitlər" },
          { t: "p", text: "Prosessor yaddaşı oxuyanda tipin ölçüsünün mislinə bölünən ünvanları sevir. Buna görə kompilyator strukturun üzvləri arasına boş baytlar (padding) qoyur və strukturun ümumi ölçüsünü ən böyük üzvün hizalanmasına (alignment) tamamlayır. Üzvlərin sırası ölçünü dəyişir: böyük tipləri əvvələ qoyub kiçikləri sonda toplamaq yaddaşa qənaət edir, və bu, kütləvi massivlərdə keş səmərəliliyini də artırır." },
          { t: "code", lang: "cpp", caption: "sizeof, alignof, padding və bit_cast (x86-64)", code: `#include <bit>
#include <cstdint>
#include <cstring>
#include <iostream>

struct Pis   { char a; int b; char c; };      // a + 3 padding + b + c + 3 padding
struct Yaxsi { int b; char a; char c; };      // b + a + c + 2 padding
struct alignas(16) Hizali { int x; };         // 16 baytlıq sərhəddə yerləşir

int main() {
    std::cout << sizeof(Pis) << " " << sizeof(Yaxsi) << " " << sizeof(Hizali) << "\\n";
    std::cout << alignof(int) << " " << alignof(double) << " " << alignof(Pis) << "\\n";

    float f = 1.0f;
    std::uint32_t bitler = std::bit_cast<std::uint32_t>(f);    // C++20: bitləri təhlükəsiz oxu
    std::cout << std::hex << bitler << std::dec << "\\n";       // 3f800000 (IEEE 754)

    std::uint32_t y;
    std::memcpy(&y, &f, sizeof y);                              // C++17-də düzgün yol
    std::cout << (y == bitler) << "\\n";

    std::cout << (std::endian::native == std::endian::little ? "little" : "big") << "\\n";
    unsigned char kicikBayt = 0xFF;
    signed char isareli = static_cast<signed char>(kicikBayt);
    std::cout << static_cast<int>(isareli) << "\\n";            // -1 (iki tamamlayıcı)
    return 0;
}

// Çıxış (x86-64):
// 12 8 16
// 4 8 4
// 3f800000
// 1
// little
// -1` },
          { t: "list", items: [
            "Type punning: *reinterpret_cast<uint32_t*>(&f) strict aliasing qaydasını pozur (fərqli tipli göstərici ilə eyni yaddaşa müraciət) və UB-dir. Düzgün yollar: std::memcpy və ya C++20 std::bit_cast — kompilyator onları birbaşa registr köçürməsinə çevirir (sıfır xərc).",
            "Strict aliasing optimallaşdırıcıya «int* və float* eyni yeri göstərə bilməz» fərziyyəsini verir və yükləmələri sıralamağa imkan verir. char*, unsigned char* və std::byte* istisnadır: istənilən obyektin baytlarına baxa bilərlər.",
            "Signed tam ədədlər iki tamamlayıcı (two's complement) formatındadır (C++20-dən məcburidir). Lakin signed daşma yenə də UB-dir; modul davranış tələb edirsənsə unsigned işlət.",
            "Böyük-kiçik bayt sırası (endianness): x86 və ARM (adətən) little-endian-dır: ən kiçik bayt ən aşağı ünvanda. Şəbəkə protokolları big-endian-dır, ona görə ikilik formatları oxuyanda baytları çevirmək (htonl, std::byteswap C++23) lazımdır.",
            "Bit əməliyyatları: &, |, ^, ~, <<, >>. İşarəli mənfi ədədi sola sürüşdürmək C++20-dən əvvəl UB idi; sürüşmə miqdarı tipin bit sayından çox və ya mənfi olarsa həmişə UB-dir. İşarəsiz tiplərdə bit manipulyasiyası et; C++20 <bit> funksiyaları: std::popcount, std::countl_zero, std::has_single_bit.",
            "float/double: NaN heç bir şeyə, hətta özünə bərabər deyil (x != x təkcə NaN-da doğrudur). -ffast-math bu və digər IEEE qaydalarını pozur, ona görə dəqiq hesab üçün istifadə etmə.",
            "Qlobal dəyişənlərin başlama sırası translation unit-lər arasında qeyri-müəyyəndir (static initialization order fiasco): bir faylın qlobalı digərinin qlobalına başlama zamanı müraciət edirsə, sıra təyin olunmur. Həll: funksiya daxilində static dəyişən (Meyers singleton) və ya constinit (C++20).",
          ]},
          { t: "terms", items: [
            ["alignment (hizalanma)", "obyektin yerləşə biləcəyi ünvanların bölündüyü ədəd (alignof)."],
            ["padding", "hizalanma üçün strukturdakı boş baytlar."],
            ["strict aliasing", "fərqli tipli göstəricilərin eyni yaddaşı göstərmədiyini fərz edən qayda; pozuntu UB-dir."],
            ["std::bit_cast", "C++20: bir tipin bit şəklini başqa tipə UB olmadan köçürür."],
            ["endianness", "çoxbaytlıq ədədin baytlarının yaddaşda sırası (little/big)."],
            ["constinit", "C++20: qlobal dəyişənin kompilyasiya vaxtı başladılmasını məcbur edir, lakin dəyişən qalır."],
          ]},
          { t: "mistake", lang: "cpp", wrong: `float f = 1.0f;
std::uint32_t bitler = *reinterpret_cast<std::uint32_t*>(&f);   // strict aliasing → UB`, right: `float f = 1.0f;
std::uint32_t bitler = std::bit_cast<std::uint32_t>(f);          // C++20
// və ya C++17-də: std::uint32_t bitler; std::memcpy(&bitler, &f, sizeof bitler);`, why: "float-ı uint32_t* ilə oxumaq standarta görə UB-dir. -O2-də kompilyator oxumanı yazmadan əvvələ qoya və ya silə bilər, nəticə «bəzən işləyir». memcpy/bit_cast eyni maşın koduna çevrilir, lakin qanunidir." },
          { t: "code", lang: "cpp", caption: "İşarəli/işarəsiz müqayisə tələsi və düzgün dövr", code: `#include <climits>
#include <iostream>
#include <vector>

int main() {
    std::cout << std::boolalpha << (-1 < 1u) << "\\n";           // false: -1 → 4294967295
    std::vector<int> v{1, 2, 3};
    // for (size_t i = v.size() - 1; i >= 0; --i)  // SONSUZ dövr: size_t heç vaxt < 0 olmur
    for (int i = static_cast<int>(v.size()) - 1; i >= 0; --i) std::cout << v[i];
    std::cout << "\\n";
    unsigned int u = 0;
    std::cout << (u - 1) << " " << UINT_MAX << "\\n";
    return 0;
}

// Çıxış:
// false
// 321
// 4294967295 4294967295` },
          { t: "qa", items: [
            ["sizeof struct niyə üzvlərin cəmindən böyük ola bilər?", "Hizalanma üçün kompilyator üzvlər arasına və sonuna padding qoyur. Üzvləri böyükdən kiçiyə sıralamaq ölçünü azaldır."],
            ["Strict aliasing qaydası nədir?", "Fərqli tipli göstəricilər eyni obyektə müraciət edə bilməz (char və std::byte istisna). Pozuntu UB-dir; optimallaşdırıcı yükləmələri yenidən sıralaya bilər. Təhlükəsiz yol: memcpy / std::bit_cast."],
            ["Static initialization order fiasco nədir?", "Fərqli translation unit-lərdəki qlobal obyektlərin başlama sırası təyin olunmur. Birinin başlanğıcı digərini istifadə edirsə, hələ başlanmamış obyekt oxuna bilər. Həll: funksiya daxilində static (ilk çağırışda başlanır) və ya constinit."],
            ["Niyə for (size_t i = n - 1; i >= 0; --i) sonsuz dövrdür?", "size_t işarəsizdir, həmişə >= 0; i == 0-dan sonra --i ən böyük ədədə dönür. n == 0 olarsa, n - 1 də böyük ədəd olur. Həll: int işlət və ya while (i-- > 0) yaz."],
            ["Little-endian və big-endian nədir?", "Çoxbaytlıq ədədin yaddaşda baytlarının sırası. Little-endian-da ən kiçik bayt ilk ünvandadır (x86/ARM). Şəbəkə protokolları big-endian-dır, ona görə baytlar çevrilməlidir."],
            ["int a = INT_MAX; a + 1 niyə təhlükəlidir, amma unsigned üçün yox?", "Signed daşma UB-dir: optimallaşdırıcı onun baş vermədiyini fərz edir (məs. a + 1 > a həmişə true sayıla bilər). Unsigned daşma modul 2^N ilə müəyyəndir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "7 / 2 ifadəsinin (hər ikisi int) nəticəsi nədir?", options: ["3.5", "3", "4"], answer: 1, why: "Tam ədədlərin bölməsi kəsr hissəni atır." },
          { t: "quiz", q: "Hansı başlatma narrowing çevirməni xəta edir?", options: ["int x = 3.9;", "int x(3.9);", "int x{3.9};"], answer: 2, why: "Fiqurlu {} başlatma məlumat itkisi olan çevirməni qadağan edir." },
          { t: "quiz", q: "int say; (lokal, başlanmayıb) dəyərini oxumaq nədir?", options: ["Həmişə 0 verir", "Undefined behavior", "Kompilyasiya xətası"], answer: 1, why: "Lokal dəyişənlər avtomatik sıfırlanmır; oxumaq UB-dir." },
        ],
      },
    ],
    exercise: {
      task: "Dəyişənlər proqramı yaz. 1) {} başlatma ilə: int yas, double ortalama, char qiymet, bool kecdi dəyişənləri elan et (yas = 20, ortalama = 4.5, qiymet = 'A', kecdi = true). 2) const double VERGI = 0.18 və constexpr int HEFTE = 7 elan et. 3) int a = 7, b = 2 üçün düzgün kəsr bölməni static_cast<double> ilə hesabla və çap et (3.5). 4) <limits> ilə int-in maksimum dəyərini çap et. 5) Şərhdə niyə başlanmamış lokal dəyişəni oxumaq təhlükəli olduğunu yaz.",
      starter: `#include <iostream>\n#include <limits>\n\nint main() {\n    // kodunu bura yaz\n    return 0;\n}\n`,
      expect: "int/double/char/bool dəyişənləri {} ilə başladılıb; const double VERGI və constexpr int HEFTE var; static_cast<double>(a) / b ilə 3.5 hesablanıb çap olunur; std::numeric_limits<int>::max() çap olunur; şərhdə başlanmamış dəyişənin oxunması UB olduğu izah olunub.",
    },
  },
  {
    slug: "giris-cixis",
    title: "Giriş və çıxış (iostream)",
    intro: "C++ -da giriş-çıxış axınlarla (stream) işləyir: std::cout çıxış, std::cin giriş üçündür. İstifadəçi girişi həmişə səhv ola bilər, ona görə doğrulama vacibdir.",
    sections: [
      {
        level: "baslangic",
        title: "cout, cin və getline",
        blocks: [
          { t: "analogy", text: "Axın boru xəttidir: << operatoru məlumatı borudan ekrana axıdır, >> operatoru klaviaturadan dəyişənə çəkir. Bir-birinin ardınca zəncirlə bağlaya bilərsən." },
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <string>

int main() {
    std::string ad;
    int yas{};

    std::cout << "Adınız: ";
    std::getline(std::cin, ad);          // boşluqlu bütöv sətri oxuyur

    std::cout << "Yaşınız: ";
    std::cin >> yas;                     // boşluğa qədər bir ədəd oxuyur

    std::cout << "Salam, " << ad << "! " << yas << " yaşınız var.\\n";
    return 0;
}` },
          { t: "terms", items: [
            ["std::cout", "standart çıxış axını; << ilə yazılır."],
            ["std::cin", "standart giriş axını; >> ilə oxunur."],
            ["std::getline", "bütöv sətri (boşluqlarla birlikdə) oxuyur."],
            ["std::endl", "sətir sonu + buferi dərhal boşaldır (flush)."],
            ["axın vəziyyəti (stream state)", "axının sağlam olub-olmadığını göstərən bayraqlar (good, fail, eof)."],
          ]},
          { t: "h", text: "Axın necə işləyir: bufer və boşluqlar" },
          { t: "p", text: "Klaviaturadan yazdığın hər şey əvvəlcə giriş buferinə düşür. Enter basanda mətn (sonundakı '\\n' simvolu ilə birlikdə) proqrama təhvil verilir. cin >> dəyişən əvvəlcə baş boşluqları (space, tab, yeni sətir) atır, sonra tipə uyğun simvolları oxuyur və ilk uyğun gəlməyən simvolda dayanır. Qalan simvollar buferdə gözləyir. Bu səbəbdən «Aysel 20 4.5» sətrini üç ardıcıl >> ilə oxumaq olar, lakin sonuncudan sonra '\\n' buferdə qalır." },
          { t: "code", lang: "cpp", caption: "Axınları fayl olmadan öyrənmək: stringstream və simvol çapı", code: `#include <iostream>
#include <sstream>
#include <string>

int main() {
    std::string setir = "Aysel 20 4.5";
    std::istringstream giris(setir);
    std::string ad;
    int yas{};
    double orta{};
    giris >> ad >> yas >> orta;                 // axından oxuyuruq, klaviatura lazım deyil
    std::cout << ad << "|" << yas << "|" << orta << "\\n";

    std::ostringstream cixis;
    cixis << "Bal: " << 95 << ", " << 3.5;
    std::string netice = cixis.str();           // axını mətnə çevirdik
    std::cout << netice << " (" << netice.size() << " simvol)\\n";

    char h = 'x';
    int kod = h;
    std::cout << h << " " << kod << " " << static_cast<char>(kod + 1) << " " << +h << "\\n";
    std::cout << 7 << ' ' << '7' << " " << "7" << "\\n";
    return 0;
}

// Çıxış:
// Aysel|20|4.5
// Bal: 95, 3.5 (12 simvol)
// x 120 y 120
// 7 7 7` },
          { t: "list", items: [
            "std::istringstream mətni, std::ostringstream isə mətn qurmağı axın kimi edir (<sstream>). Testlər və mətn parsinqi üçün çox əlverişlidir.",
            "cin >> yalnız ilk sözü oxuyur, qalan hissə buferdə qalır. Boşluqlu mətn üçün getline işlət.",
            "std::cerr xəta mesajları üçündür: buferlənmir və cout-dan ayrı axındır (./prog > fayl.txt yalnız cout-u yönləndirir).",
            "std::cout << 'x' simvolu, << 120 isə ədədi çap edir; +h (unary plus) char-ı ədədə yüksəldir və kodu göstərir.",
            "Giriş fayldan da gələ bilər: ./proqram < giris.txt, və ya borulama (pipe): echo 5 | ./proqram. Proqram kodunu dəyişmədən eyni cin işləyir.",
          ]},
          { t: "tip", text: "Ad kimi boşluqlu mətn üçün cin >> yox, std::getline işlət: cin >> yalnız ilk sözü götürür." },
          { t: "tip", text: "Test üçün hər dəfə klaviaturadan yazmaq əvəzinə giriş faylından istifadə et: ./proqram < test.txt. Bu, səhvləri təkrarlamağı və avtomatik yoxlamanı asanlaşdırır." },
        ],
      },
      {
        level: "orta",
        title: "Formatlama, cin xətaları və doğrulama",
        blocks: [
          { t: "code", lang: "cpp", caption: "<iomanip> ilə formatlama", code: `#include <iomanip>
#include <iostream>

int main() {
    double qiymet = 12.5;
    int say = 3;

    std::cout << std::fixed << std::setprecision(2);       // 2 rəqəm kəsrdən sonra
    std::cout << std::left  << std::setw(10) << "Məhsul"
              << std::right << std::setw(8)  << "Qiymət" << "\\n";
    std::cout << std::left  << std::setw(10) << "Çay"
              << std::right << std::setw(8)  << qiymet << "\\n";
    std::cout << "Cəmi: " << qiymet * say << "\\n";          // 37.50

    std::cout << std::boolalpha << true << "\\n";            // true (1 yox)
    std::cout << std::hex << 255 << std::dec << "\\n";       // ff
    return 0;
}` },
          { t: "code", lang: "cpp", caption: "Ədədi doğrulama dövrü", code: `#include <iostream>
#include <limits>

int main() {
    int yas{};
    while (true) {
        std::cout << "Yaş (0-120): ";
        if (std::cin >> yas && yas >= 0 && yas <= 120) {
            break;                                   // düzgün giriş
        }
        if (std::cin.eof()) return 1;                // giriş bitib, sonsuz dövrdən qaç
        std::cin.clear();                            // xəta bayrağını sıfırla
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');  // sətri at
        std::cout << "Yanlış giriş, yenidən cəhd edin.\\n";
    }
    std::cout << "Yaş: " << yas << "\\n";
    return 0;
}` },
          { t: "list", items: [
            "cin >> int hərf oxuyarsa axın fail vəziyyətinə düşür və sonrakı oxumalar heç nə etmir — clear() və ignore() lazımdır.",
            "'\\n' sadəcə sətir sonudur; std::endl isə həm də buferi boşaldır (yavaş). Adətən '\\n' işlət.",
            "std::fixed + setprecision(n) kəsrdən sonra n rəqəm verir; onsuz n ümumi mənalı rəqəm sayılır.",
            "C++20-də <format> var: std::format(\"{} yaşı {}\", ad, yas) — printf kimi, amma tip-təhlükəsiz. Kompilyator dəstəyi (GCC 13+) yoxlanmalıdır; yoxdursa <iomanip> işlət.",
            "std::cin >> ilə oxuyandan sonra sətirdə qalan '\\n' növbəti getline-ı boş sətirlə «yeyir».",
          ]},
          { t: "mistake", lang: "cpp", wrong: `int yas;
std::string ad;
std::cin >> yas;
std::getline(std::cin, ad);      // boş sətir oxuyur!`, right: `int yas{};
std::string ad;
std::cin >> yas;
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
std::getline(std::cin, ad);      // indi düzgün`, why: "cin >> ədədi oxuyur, lakin Enter-in '\\n' simvolu buferdə qalır. getline onu görüb dərhal boş sətir qaytarır. Əvvəlcə ignore ilə həmin sətir sonunu at." },
          { t: "mistake", lang: "cpp", wrong: `int n{};
while (true) {
    std::cin >> n;            // 'abc' yazılsa sonsuz dövr
    if (n > 0) break;
}`, right: `int n{};
while (!(std::cin >> n) || n <= 0) {
    if (std::cin.eof()) return 1;
    std::cin.clear();
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
}`, why: "Xəta olduqda axın fail vəziyyətində qalır, n dəyişmir və dövr sonsuz təkrarlanır. Hər xətadan sonra clear() + ignore() etmək və eof yoxlamaq lazımdır." },
          { t: "h", text: "Giriş bitənə qədər oxumaq" },
          { t: "p", text: "Çox vaxt neçə ədədin gələcəyini əvvəlcədən bilmirsən. Bu halda oxuma əməliyyatının özünü dövr şərti kimi yaz: while (std::cin >> x). Axın obyekti bool-a çevriləndə «son oxuma uğurlu oldumu?» sualına cavab verir. Dövr ya giriş bitəndə (EOF: Ctrl+D Linux/macOS, Ctrl+Z Enter Windows), ya da tipə uyğun gəlməyən simvol gələndə dayanır." },
          { t: "code", lang: "cpp", caption: "Ədədləri toplayan proqram (EOF və ya səhvə qədər)", code: `#include <iostream>
#include <string>

int main() {
    int say = 0;
    long long cem = 0;
    int x;
    while (std::cin >> x) {         // dövr EOF və ya səhv girişdə bitir
        cem += x;
        ++say;
    }
    std::cout << "Say: " << say << ", cəm: " << cem << "\\n";
    if (std::cin.eof()) std::cout << "Fayl sonu\\n";
    else if (std::cin.fail()) std::cout << "Səhv giriş\\n";
    return 0;
}

// Giriş: 10 20 30 (yeni sətir) 40 abc
// Çıxış:
// Say: 4, cəm: 100
// Səhv giriş
//
// Giriş: 1 2 3 (sonra EOF)
// Çıxış:
// Say: 3, cəm: 6
// Fayl sonu` },
          { t: "mistake", lang: "cpp", wrong: `int x;
while (!std::cin.eof()) {
    std::cin >> x;                // son oxuma uğursuz olsa belə x işlənir
    cem += x;
}`, right: `int x;
while (std::cin >> x) {           // oxuma uğurlu olanda daxil ol
    cem += x;
}`, why: "eof() yalnız oxuma artıq EOF-a toxunandan SONRA true olur. Giriş yeni sətirlə bitəndə (adi hal) axın bir dəfə artıq dövrə girir, uğursuz oxuma x-i dəyişmir (və ya sıfırlayır) və son dəyər iki dəfə sayılır. Oxumanın nəticəsini dövr şərti et." },
          { t: "h", text: "std::format və öz tiplərimiz üçün <<" },
          { t: "p", text: "C++20 <format> printf-in rahatlığını tip təhlükəsizliyi ilə birləşdirir: {} yer tutucusuna dəyər yerləşdirilir, {:.1f}, {:>8}, {:05d} kimi formatlama göstəriciləri var. Kompilyator formatı kompilyasiya zamanı yoxlayır. Öz sinifini cout ilə çap etmək üçün operator<< yazırsan: o, axını qaytarmalıdır ki, zəncir davam etsin." },
          { t: "code", lang: "cpp", caption: "std::format (C++20) və operator<<", code: `#include <format>
#include <iostream>
#include <string>

struct Nokta { int x, y; };

std::ostream& operator<<(std::ostream& os, const Nokta& n) {
    return os << "(" << n.x << ", " << n.y << ")";     // axını qaytar: zəncir işləsin
}

int main() {
    std::string ad = "Aysel";
    int yas = 20;
    double bal = 93.456;
    std::cout << std::format("{} {} yaşındadır\\n", ad, yas);
    std::cout << std::format("Bal: {:.1f}\\n", bal);
    std::cout << std::format("[{:>8}] [{:<8}] [{:^8}]\\n", ad, ad, ad);   // sağa, sola, mərkəzə
    std::cout << std::format("{:05d} {:x} {:#b}\\n", 42, 255, 5);
    std::cout << std::format("{1} {0}\\n", "dünya", "salam");             // mövqe ilə
    std::cout << Nokta{1, 2} << "\\n";
    return 0;
}

// Çıxış:
// Aysel 20 yaşındadır
// Bal: 93.5
// [   Aysel] [Aysel   ] [ Aysel  ]
// 00042 ff 0b101
// salam dünya
// (1, 2)` },
          { t: "list", items: [
            "Formatlama göstəriciləri: :.2f — 2 kəsr rəqəmi, :>8 — 8 genişlikdə sağa düz, :<8 sola, :^8 mərkəzə, :05d — sıfırla doldur, :x — onaltılıq, :#b — 0b prefiksli ikilik.",
            "std::format std::string qaytarır; çapa ehtiyac yoxdursa, istənilən yerdə mətn qurmaq üçün işlət. C++23: std::print(\"{}\\n\", x) birbaşa çap edir.",
            "setw, setprecision kimi manipulyatorlar axının vəziyyətini dəyişir və növbəti çıxışlara təsir edir (setw istisna: yalnız növbəti dəyərə); format isə vəziyyətsizdir.",
            "operator<< üzv funksiya yox, sərbəst funksiya olmalıdır (sol operand std::ostream-dir, sənin sinfin yox).",
          ]},
        ],
      },
      {
        level: "senior",
        title: "Performans və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Axın sinxronizasiyası: defolt olaraq iostream C-nin stdio ilə sinxrondur (yavaş). Böyük giriş üçün proqramın əvvəlində std::ios::sync_with_stdio(false); std::cin.tie(nullptr); yaz — 2-5 dəfə sürətlənə bilər. Bundan sonra printf/scanf ilə qarışdırma.",
            "std::endl hər dəfə flush edir: milyonlarla sətirdə dramatik yavaşlıq. '\\n' işlət, flush-u yalnız lazım olanda (məs. interaktiv prompt) ver.",
            "Axın vəziyyəti bitləri: eofbit, failbit, badbit. cin.exceptions(std::ios::badbit) ilə ciddi xətalarda istisna atdırmaq olar.",
            "Mətni ədədə çevirmək üçün alternativ: oxu → std::string → std::from_chars (<charconv>) və ya std::stoi (istisna atır). from_chars sürətlidir və istisnasızdır.",
            "Təhlükəsizlik — bufer daşması: char ad[10]; std::cin >> ad; köhnə standartlarda uzunluq yoxlamır. C++20 bunu ölçü ilə məhdudlaşdırdı, lakin həmişə std::string işlət.",
            "Təhlükəsizlik — format string zəifliyi: printf(istifadeciMetni) təhlükəlidir, çünki %x/%n istifadəçi tərəfindən idarə oluna bilər (yaddaş oxuma/yazma). Həmişə printf(\"%s\", metn) və ya std::cout << metn.",
            "Təhlükəsizlik — giriş ölçüsünü məhdudlaşdır: getline ilə sonsuz uzun sətir yaddaşı tükədə bilər (DoS). Ölçü yoxla və yuxarı hədd qoy.",
            "Təhlükəsizlik — giriş heç vaxt etibarlı deyil: ədədin aralığını, mətnin uzunluğunu və formatını yoxla; yoxlamanı oxumadan SONRA et. Oxunmuş dəyəri birbaşa indeks və ya ölçü kimi işlətmə.",
            "Təhlükəsizlik — istifadəçi girişini shell əmrinə (system()) vermə: əmr inyeksiyası (command injection) yaranır.",
          ]},
          { t: "code", lang: "cpp", caption: "Təhlükəsiz sətir oxuma: ölçü limiti və ədədə çevirmə", code: `#include <charconv>
#include <iostream>
#include <optional>
#include <string>
#include <string_view>

constexpr std::size_t MAKS_UZUNLUQ = 64;

// Mətni int-ə çevirir; xəta olarsa nullopt (istisnasız)
std::optional<int> intOxu(std::string_view s) {
    int netice{};
    auto [ptr, xeta] = std::from_chars(s.data(), s.data() + s.size(), netice);
    if (xeta != std::errc{} || ptr != s.data() + s.size()) return std::nullopt;
    return netice;
}

int main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);

    std::string setir;
    if (!std::getline(std::cin, setir)) return 1;          // giriş bitib
    if (setir.size() > MAKS_UZUNLUQ) {
        std::cerr << "Giriş çox uzundur\\n";
        return 1;
    }
    if (auto n = intOxu(setir); n && *n >= 1 && *n <= 100) {
        std::cout << "Qəbul edildi: " << *n << "\\n";
    } else {
        std::cerr << "Yanlış dəyər\\n";
        return 1;
    }
    return 0;
}` },
          { t: "qa", items: [
            ["'\\n' ilə std::endl arasındakı fərq?", "'\\n' yalnız sətir sonu yazır; endl həm də buferi boşaldır (flush), buna görə daha yavaşdır."],
            ["cin >> x uğursuz olduqda nə baş verir?", "failbit qurulur, sonrakı oxumalar işləmir. clear() bayraqları sıfırlayır, ignore() səhv girişi atır."],
            ["sync_with_stdio(false) nə edir?", "iostream-in C stdio ilə sinxronlaşmasını söndürür, giriş-çıxışı xeyli sürətləndirir; amma printf/scanf ilə qarışdırmaq olmaz."],
            ["printf(user_input) niyə təhlükəlidir?", "Format string zəifliyi: istifadəçi %x və %n ilə yaddaşı oxuya/yaza bilər. Həmişə printf(\"%s\", metn) istifadə et."],
            ["Niyə cin >> char[] əvəzinə std::string?", "Sabit bufer daşa bilər (buffer overflow); std::string ölçünü avtomatik idarə edir."],
          ]},
          { t: "h", text: "Axın arxitekturası: streambuf, bufer və flush" },
          { t: "p", text: "iostream iki təbəqəlidir: istream/ostream (formatlama: ədəd ↔ mətn) və onların altındakı std::streambuf (xam baytları buferləyən və mənbəyə/təyinata ötürən obyekt). Fayl axını (fstream), mətn axını (stringstream) və konsol eyni formatlama kodunu istifadə edir, yalnız streambuf fərqlidir. Buna görə cout-un buferini dəyişib çıxışı başqa yerə yönləndirmək olar." },
          { t: "code", lang: "cpp", caption: "rdbuf ilə yönləndirmə, istisnalar, məhdud oxuma", code: `#include <iostream>
#include <sstream>
#include <string>

int main() {
    // 1) cout-un çıxışını başqa yerə yönləndirmək (testlər üçün faydalı)
    std::ostringstream yigici;
    auto kohne = std::cout.rdbuf(yigici.rdbuf());
    std::cout << "gizli mətn";
    std::cout.rdbuf(kohne);                         // bərpa et
    std::cout << "Tutuldu: " << yigici.str() << "\\n";

    // 2) Xətada istisna atdırmaq
    std::istringstream giris("abc");
    giris.exceptions(std::ios::failbit);
    try {
        int x;
        giris >> x;
    } catch (const std::ios_base::failure&) {
        std::cout << "failbit istisnası tutuldu\\n";
    }

    // 3) Ölçüsü məhdud oxuma
    std::istringstream uzun("0123456789ABCDEF");
    char bufer[8];
    uzun.read(bufer, sizeof bufer);                 // ən çox 8 bayt
    std::cout << "Oxundu: " << uzun.gcount() << " bayt: ";
    std::cout.write(bufer, uzun.gcount());
    std::cout << "\\n";
    return 0;
}

// Çıxış:
// Tutuldu: gizli mətn
// failbit istisnası tutuldu
// Oxundu: 8 bayt: 01234567` },
          { t: "list", items: [
            "Buferləmə rejimləri: terminala çıxanda adətən sətir-buferli (hər '\\n'-dən sonra boşaldılır), fayla və ya boruya yönləndirəndə tam buferli (bufer dolana qədər). Proqram çöküb abort olsa, buferdə qalan mətn itə bilər — ona görə log üçün std::cerr (unitbuf) və ya açıq flush işlədilir.",
            "std::cin.tie(&std::cout) defolt bağlıdır: cin-dən oxumazdan əvvəl cout avtomatik flush olur (prompt-un görünməsi üçün). tie(nullptr) bunu söndürür və sürət verir, amma interaktiv proqramda prompt gec görünə bilər.",
            "Böyük girişdə (10^6 ədəd) tipik ardıcıllıq: sync_with_stdio(false) + tie(nullptr) + '\\n'. Daha da sürətli: bütün faylı std::fread/istreambuf_iterator ilə bir dəfəyə oxuyub std::from_chars ilə parse etmək. Əvvəl ölç, sonra optimallaşdır.",
            "Mətn və ikilik rejim: Windows-da mətn rejimində '\\n' diskdə CRLF (\\r\\n) yazılır və oxunur. İkilik fayl üçün std::ios::binary mütləqdir, yoxsa baytlar pozulur. İkilik məlumatda read/write işlət, << yox.",
            "Lokal (locale): cout ədədləri lokala görə formatlaya bilər (məs. min ayırıcı). Proqram çıxışı maşın tərəfindən oxunacaqsa std::locale::classic() / std::format (lokalsız defolt) işlət ki, 1.5 bəzi mühitdə «1,5» çıxmasın.",
            "Axın obyektləri kopyalana bilməz (move olunur). Funksiyaya std::istream& / std::ostream& ilə ötür: bu, eyni kodun fayl, string və konsol üzərində işləməsinə imkan verir və test yazmağı asanlaşdırır.",
            "Təhlükəsizlik — fayl yolu: istifadəçidən gələn fayl adını birbaşa ifstream-ə vermə, «../../etc/passwd» kimi path traversal mümkündür. Yolu normallaşdır (std::filesystem::weakly_canonical) və icazə verilən qovluq daxilində olduğunu yoxla.",
            "Təhlükəsizlik — TOCTOU: «fayl mövcuddurmu?» yoxlayıb sonra açmaq yarış vəziyyəti yaradır. Birbaşa açmağa cəhd et və uğursuzluğu emal et.",
            "Təhlükəsizlik — log inyeksiyası: istifadəçi girişini '\\n' ilə log-a yazsan, saxta log sətirləri əlavə edilə bilər. Girişi yazmazdan əvvəl idarəedici simvolları təmizlə.",
          ]},
          { t: "terms", items: [
            ["streambuf", "axının altındakı bufer və mənbə/təyinat abstraksiyası (std::streambuf)."],
            ["flush", "buferdəki məlumatın mənbəyə/təyinata göndərilməsi (endl, flush, bufer dolanda)."],
            ["unitbuf", "hər çıxışdan sonra avtomatik flush edən rejim; cerr üçün defoltdur."],
            ["tie", "bir axını digərinə bağlayır: giriş oxunmazdan əvvəl bağlı çıxış flush olunur."],
            ["CRLF", "Windows sətir sonu (\\r\\n); Linux/macOS yalnız \\n."],
            ["TOCTOU", "time-of-check to time-of-use: yoxlama ilə istifadə arasında vəziyyətin dəyişməsi."],
          ]},
          { t: "warn", text: "std::cin.tie(nullptr) və sync_with_stdio(false) interaktiv proqramlarda prompt mətninin gec görünməsinə səbəb ola bilər. Bunları yalnız böyük, qeyri-interaktiv giriş (yarışma, fayl emalı) üçün işlət; interaktiv promptdan sonra isə açıq std::cout << std::flush yaz." },
          { t: "qa", items: [
            ["iostream və printf arasında əsas fərqlər nədir?", "iostream tip-təhlükəsizdir, öz tipinə operator<< yazmaq olar, lakin defolt olaraq yavaşdır (sync + lokal); printf formatı kompilyasiya zamanı yoxlanmır (format string zəifliyi riski), amma sürətlidir. C++20 std::format ikisinin üstünlüklərini birləşdirir."],
            ["Axın niyə kopyalana bilmir?", "Axın unikal resursu (fayl dəstəyi, bufer, vəziyyət) idarə edir; kopya iki sahibə eyni vəziyyəti verərdi. Move mümkündür, funksiyaya isə istinadla ötür."],
            ["std::endl nə vaxt lazımdır?", "Yalnız buferin dərhal boşalması vacib olanda: prompt, log çökməyə yaxın, başqa proses dərhal oxuyacaqsa. Əks halda '\\n' işlət."],
            ["Fayl çökəndə buferdəki mətn niyə itir?", "Çıxış tam buferlidirsə, mətn hələ yaddaşdadır və abort/kill zamanı flush olunmur. Kritik log üçün flush, std::cerr və ya fsync lazımdır."],
            ["Mətn və ikilik fayl rejiminin fərqi?", "Mətn rejimi platformaya görə sətir sonunu çevirir (Windows-da \\n ↔ \\r\\n); ikilik rejim baytları olduğu kimi saxlayır. İkilik məlumat üçün ios::binary və read/write işlət."],
            ["cin.tie(nullptr) nə verir?", "cin və cout arasındakı avtomatik flush bağlantısını kəsir; hər oxumadan əvvəl flush olmur, sürət artır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Boşluqlu bütöv sətri oxumaq üçün hansı düzgündür?", options: ["std::cin >> ad;", "std::getline(std::cin, ad);", "std::cout >> ad;"], answer: 1, why: "cin >> boşluğa qədər oxuyur; getline bütöv sətri oxuyur." },
          { t: "quiz", q: "cin xəta vəziyyətindən sonra nə lazımdır?", options: ["Heç nə", "clear() və ignore()", "endl yazmaq"], answer: 1, why: "clear() bayrağı sıfırlayır, ignore() səhv girişi buferdən atır." },
          { t: "quiz", q: "Hansı daha sürətlidir (milyonlarla sətirdə)?", options: ["std::endl", "'\\n'", "Fərqi yoxdur"], answer: 1, why: "endl hər dəfə buferi boşaldır, '\\n' isə yox." },
        ],
      },
    ],
    exercise: {
      task: "Proqram yaz: 1) istifadəçidən std::getline ilə ad, sonra ədəd (qiymət, 0-100 aralığında) oxusun. 2) Ədəd üçün doğrulama dövrü olsun: yanlış giriş olanda cin.clear() və cin.ignore(numeric_limits<streamsize>::max(), '\\n') çağırılsın, eof olarsa çıxsın. 3) Ədəddən sonra getline işlədiləcəksə, ignore ilə qalan sətir sonu atılsın. 4) Nəticəni <iomanip> ilə std::fixed, std::setprecision(1) və setw istifadə edərək «Ad: ... Qiymət: ...» formatında çap et. 5) Çıxışda std::endl əvəzinə '\\n' işlət.",
      starter: `#include <iomanip>\n#include <iostream>\n#include <limits>\n#include <string>\n\nint main() {\n    // kodunu bura yaz\n    return 0;\n}\n`,
      expect: "std::getline(std::cin, ad); ədəd üçün while dövrü ilə cin >> ədəd və aralıq yoxlaması (0-100); xətada cin.clear() və cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n'); eof yoxlanılır; ədəddən sonra ignore çağırılır; çıxışda std::fixed, std::setprecision(1) və std::setw istifadə olunub; '\\n' işlədilib.",
    },
  },
  {
    slug: "sertler",
    title: "Şərtlər",
    intro: "Şərt operatorları proqramın qərar verməsini təmin edir: if/else, switch və ternary operator. Doğru şərt yazmaq həm düzgünlük, həm də təhlükəsizlik üçün vacibdir.",
    sections: [
      {
        level: "baslangic",
        title: "if, else və switch",
        blocks: [
          { t: "analogy", text: "Yol ayrıcında dayanıb soruşursan: «yağış yağırmı?» Hə isə çətir götürürsən, yox isə eynək taxırsan. if/else məhz belə suala görə yolu seçir." },
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <string>

int main() {
    int bal = 78;

    if (bal >= 90) {
        std::cout << "Əla\\n";
    } else if (bal >= 70) {
        std::cout << "Yaxşı\\n";
    } else {
        std::cout << "Zəif\\n";
    }

    int gun = 3;
    switch (gun) {
        case 1: std::cout << "Bazar ertəsi\\n"; break;
        case 2: std::cout << "Çərşənbə axşamı\\n"; break;
        case 3: std::cout << "Çərşənbə\\n"; break;
        default: std::cout << "Başqa gün\\n"; break;
    }

    // Ternary: qısa if/else ifadəsi
    std::string netice = (bal >= 50) ? "keçdi" : "kəsildi";
    std::cout << netice << "\\n";
    return 0;
}` },
          { t: "terms", items: [
            ["if / else", "şərt doğrudursa bir blok, əks halda başqa blok işləyir."],
            ["switch", "bir dəyişənin çoxlu sabit dəyərlərlə müqayisəsi (tam ədəd və ya enum)."],
            ["break", "switch-dən çıxır; yoxdursa növbəti case də işləyir."],
            ["ternary (?:)", "şərt ? dəyər1 : dəyər2 — ifadə kimi işləyən qısa if."],
            ["mantiqi operatorlar", "&& (və), || (və ya), ! (deyil)."],
          ]},
          { t: "h", text: "Şərt nədir: bool, doğruluq və operatorların sırası" },
          { t: "p", text: "Şərt — nəticəsi bool (true/false) olan ifadədir. C++-da istənilən ədəd də şərt ola bilər: 0 yalan (false), sıfırdan fərqli hər şey doğru (true) sayılır. Müqayisə operatorları (==, !=, <, >, <=, >=) bool qaytarır, mantiqi operatorlar (&&, ||, !) isə bool-ları birləşdirir. Operatorların prioritet sırası: ! ən güclüdür, sonra müqayisələr, sonra &&, ən sonda ||. Şübhə olanda mötərizə qoy." },
          { t: "code", lang: "cpp", caption: "İç-içə if, məntiqi operatorlar və doğruluq qaydası", code: `#include <iostream>

int main() {
    int yas = 25;
    bool telebe = true;
    bool isci = false;

    if (yas >= 18) {
        if (telebe) {
            std::cout << "Tələbə böyükdür\\n";
        } else {
            std::cout << "Tələbə deyil\\n";
        }
    }
    // && ||-dan əvvəl hesablanır: a || b && c  ==  a || (b && c)
    std::cout << std::boolalpha << (isci || telebe && yas > 30) << "\\n";    // false
    std::cout << ((isci || telebe) && yas > 30) << "\\n";                    // false
    std::cout << ((isci || telebe) && yas > 20) << "\\n";                    // true

    int x = 5;
    if (x) std::cout << "0-dan fərqli = true\\n";
    int y = 0;
    if (!y) std::cout << "0 = false\\n";
    std::cout << (x > 3) << " " << static_cast<int>(x > 3) << "\\n";

    // aralıq: 1 < x < 10 belə yazılmır, iki şərt && ilə bağlanır
    if (1 < x && x < 10) std::cout << "aralıqdadır\\n";
    std::cout << (1 < 20 < 10) << "\\n";          // (1<20)=1, sonra 1<10 → true: TƏLƏ!

    int a = 3, b = 7;
    int boyuk = (a > b) ? a : b;
    std::cout << boyuk << "\\n";
    return 0;
}

// Çıxış:
// Tələbə böyükdür
// false
// false
// true
// 0-dan fərqli = true
// 0 = false
// true 1
// aralıqdadır
// true
// 7` },
          { t: "list", items: [
            "if (x) eynidir if (x != 0). Göstəricidə if (p) eynidir if (p != nullptr).",
            "1 < x < 10 riyaziyyatdakı kimi işləmir: əvvəl (1 < x) hesablanır (0 və ya 1), sonra nəticə 10 ilə müqayisə olunur. Düzgünü: 1 < x && x < 10.",
            "else if zənciri yuxarıdan aşağı yoxlanılır və ilk doğru şərtdən sonra dayanır. Ona görə şərtləri xüsusidən ümumiyə doğru sırala (>=90 əvvəl, >=70 sonra).",
            "İç-içə if-ləri çox dərin yazma (3+ səviyyə): erkən çıxış (guard clause) — şərt pozulanda dərhal return et — kodu düz və oxunaqlı saxlayır.",
          ]},
          { t: "tip", text: "Tək sətirlik if üçün də həmişə {} yaz. Sonradan ikinci sətir əlavə edəndə səhv olmur." },
        ],
      },
      {
        level: "orta",
        title: "Operatorlar, if-initializer və tipik səhvlər",
        blocks: [
          { t: "code", lang: "cpp", caption: "Müqayisə, məntiqi operatorlar və müasir if", code: `#include <iostream>
#include <map>
#include <string>

int main() {
    int yas = 20;
    bool telebe = true;

    // && və ||: sol tərəf nəticəni həll edərsə, sağ tərəf hesablanmır (qısa dövrə)
    if (yas >= 18 && yas < 65) std::cout << "İşləyən yaş\\n";
    if (telebe || yas < 7) std::cout << "Endirim\\n";
    if (!telebe) std::cout << "Tələbə deyil\\n";

    // C++17: if-initializer — dəyişən yalnız bu if daxilində yaşayır
    std::map<std::string, int> ballar{{"Aysel", 90}, {"Orxan", 65}};
    if (auto it = ballar.find("Aysel"); it != ballar.end()) {
        std::cout << it->first << ": " << it->second << "\\n";
    } else {
        std::cout << "Tapılmadı\\n";
    }

    // switch və [[fallthrough]]: bilərəkdən növbəti case-ə keç
    int ay = 2;
    switch (ay) {
        case 12:
        case 1:
        case 2:                          // boş case-lər qrup yaradır
            std::cout << "Qış\\n";
            break;
        case 3:
            std::cout << "Mart: ";
            [[fallthrough]];             // kompilyatora: keçid qəsdəndir
        case 4:
            std::cout << "Yaz\\n";
            break;
        default:
            std::cout << "Başqa fəsil\\n";
    }
    return 0;
}` },
          { t: "list", items: [
            "Müqayisə operatorları: ==, !=, <, >, <=, >=. Bərabərlik == ilə, mənimsətmə = ilə.",
            "Qısa dövrə (short-circuit): a && b — a yalandırsa b hesablanmır; a || b — a doğrudursa b hesablanmır. Bu, təhlükəsiz yoxlama üçün istifadə olunur.",
            "switch yalnız tam ədəd, char və enum qəbul edir (std::string yox). default hallı həmişə yaz.",
            "case daxilində dəyişən elan etmək lazımdırsa, blok {} istifadə et.",
            "C++20: if constexpr (kompilyasiya vaxtı şərt) şablonlarda istifadə olunur.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `int x = 5;
if (x = 10) {                 // = mənimsətmədir!
    std::cout << "On";        // həmişə işləyir
}`, right: `int x = 5;
if (x == 10) {
    std::cout << "On";
}`, why: "x = 10 dəyəri 10 edir və ifadənin nəticəsi 10 (sıfırdan fərqli = true) olur. Şərt həmişə doğrudur, x isə sakitcə dəyişir. -Wall bu barədə xəbərdarlıq verir; sabiti solda yazmaq (10 == x) da xətanı tutur." },
          { t: "mistake", lang: "cpp", wrong: `int say = 2;
switch (say) {
    case 1: std::cout << "bir";
    case 2: std::cout << "iki";     // break yoxdur
    case 3: std::cout << "üç";
}
// say = 2 üçün: «iküç» çap olunur`, right: `int say = 2;
switch (say) {
    case 1: std::cout << "bir"; break;
    case 2: std::cout << "iki"; break;
    case 3: std::cout << "üç"; break;
}`, why: "break yoxdursa icra növbəti case-ə «düşür» (fallthrough). Qəsdən istəyirsənsə [[fallthrough]]; yaz, əks halda hər case-i break ilə bitir. -Wimplicit-fallthrough belə halları tutur." },
          { t: "h", text: "enum ilə switch, if constexpr, kəsr müqayisəsi və zəncirvari ternary" },
          { t: "p", text: "switch enum class ilə ən güclüdür: -Wswitch bayrağı enum-un bütün dəyərlərinin işləndiyini yoxlayır. Sonradan yeni dəyər əlavə edəndə kompilyator unudulan switch-ləri göstərir. Əgər default yazsan, bu xəbərdarlıq susdurulur — ona görə bütün halları sadalayan switch-də default yazma. C++17-dən switch və if üçün initializer var: if (init; şərt) və switch (init; ifadə)." },
          { t: "code", lang: "cpp", caption: "enum switch, if constexpr, epsilon müqayisəsi, switch-initializer", code: `#include <cmath>
#include <iostream>
#include <string_view>
#include <type_traits>

enum class Seviyye { Asagi, Orta, Yuksek };

std::string_view ad(Seviyye s) {
    switch (s) {                                   // default yoxdur: -Wswitch hamısını yoxlayır
        case Seviyye::Asagi:  return "aşağı";
        case Seviyye::Orta:   return "orta";
        case Seviyye::Yuksek: return "yüksək";
    }
    return "?";                                    // enum-a kənar dəyər verilərsə
}

template <typename T>
auto tipAdi(T) {
    if constexpr (std::is_integral_v<T>) return std::string_view("tam ədəd");
    else if constexpr (std::is_floating_point_v<T>) return std::string_view("kəsr");
    else return std::string_view("başqa");
}

bool beraberdir(double a, double b, double eps = 1e-9) {
    return std::abs(a - b) < eps;
}

int main() {
    std::cout << ad(Seviyye::Orta) << "\\n";
    std::cout << tipAdi(5) << " " << tipAdi(2.5) << " " << tipAdi("s") << "\\n";
    std::cout << std::boolalpha << (0.1 + 0.2 == 0.3) << " " << beraberdir(0.1 + 0.2, 0.3) << "\\n";

    switch (int n = 3; n % 2) {                    // C++17: switch-də initializer
        case 0: std::cout << "cüt\\n"; break;
        default: std::cout << "təkdir: " << n << "\\n";
    }

    int bal = 85;
    const char* qiymet = bal >= 90 ? "A" : bal >= 80 ? "B" : bal >= 70 ? "C" : "F";
    std::cout << qiymet << "\\n";
    return 0;
}

// Çıxış:
// orta
// tam ədəd kəsr başqa
// false true
// təkdir: 3
// B` },
          { t: "list", items: [
            "if constexpr şərti kompilyasiya zamanı yoxlanır və yalnız seçilən budaq kompilyasiya olunur. Şablonlarda tipə görə fərqli kod yazmaq üçündür; adi if bütün budaqların kompilyasiya olunmasını tələb edir.",
            "Ternary zəncirini 2 səviyyədən çox yığma: oxunmaz olur. Mürəkkəb hallarda if/else if və ya ayrıca funksiya yaz.",
            "Ternary-nin iki qolu uyğun tipə malik olmalıdır: cond ? 1 : \"a\" kompilyasiya olunmur (ortaq tip yoxdur).",
            "Funksiyada «guard clause» üslubu: əvvəl səhv halları yoxla və return et, əsas məntiq isə girintisiz qalsın.",
            "Dəyişəni şərtə görə başlatmaq üçün ya ternary, ya da dərhal çağırılan lambda işlət: const int n = [&]{ if (a) return 1; return 2; }();",
          ]},
          { t: "mistake", lang: "cpp", wrong: `int x = 5;
if (x > 10)
    std::cout << "c\\n";
    std::cout << "d\\n";     // girinti aldadır: bu sətir şərtə aid DEYİL`, right: `int x = 5;
if (x > 10) {
    std::cout << "c\\n";
    std::cout << "d\\n";
}`, why: "Mötərizəsiz if yalnız BİR ifadəyə aiddir. Girinti insan üçündür, kompilyator onu görməzdən gəlir. -Wmisleading-indentation belə halı xəbərdarlıq kimi göstərir, lakin ən etibarlı yol həmişə {} yazmaqdır." },
          { t: "mistake", lang: "cpp", wrong: `switch (n) {
    case 1:
        std::string s = "bir";   // XƏTA: case-i atlayıb dəyişənin üstündən keçmək olar
        break;
    case 2:
        break;
}`, right: `switch (n) {
    case 1: {
        std::string s = "bir";
        break;
    }
    case 2:
        break;
}`, why: "Bütün case-lər eyni əhatə dairəsini paylaşır. case 2-yə tullananda s başlanmamış qalardı, buna görə kompilyator «jump to case label crosses initialization» xətası verir. Dəyişən lazımdırsa, case-in gövdəsini {} içinə al." },
          { t: "mistake", lang: "cpp", wrong: `if (x > 0 && x < 10);     // artıq ;
{
    std::cout << "aralıqda";   // həmişə işləyir
}`, right: `if (x > 0 && x < 10) {
    std::cout << "aralıqda";
}`, why: "if-dən sonrakı ; boş ifadədir və if-in gövdəsi sayılır. Sonrakı {} bloku şərtlə əlaqəsiz, adi blok olur. -Wempty-body bunu tutur." },
          { t: "tip", text: "Mürəkkəb şərtləri adlı bool dəyişənə və ya funksiyaya çıxar: const bool yasUygundur = yas >= 18 && yas < 65; if (yasUygundur && telebe) ... Kod özünü izah edir." },
        ],
      },
      {
        level: "senior",
        title: "Daxildə necə işləyir və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Kompilyator if-i müqayisə + şərti keçid (branch) təlimatlarına çevirir. Prosessor budaqlanmanı proqnozlaşdırır; yanlış proqnoz bahadır. Çox təsadüfi şərtlər dövr daxilində yavaşlığa səbəb ola bilər.",
            "Sıx switch (ardıcıl case-lər) atlama cədvəlinə (jump table) çevrilə bilir: O(1). Seyrək dəyərlərdə if zəncirinə bənzəyir.",
            "Ternary operator ifadədir, if isə ifadə deyil: const dəyişəni şərtlə başlatmaq üçün ternary əlverişlidir: const auto ad = x ? \"a\" : \"b\";",
            "C++17 [[likely]]/[[unlikely]] (C++20) atributları budaq ehtimalını kompilyatora deyir; yalnız ölçmədən sonra istifadə et.",
            "enum class ilə switch: -Wswitch bütün halların örtülməməsini xəbərdarlıq edir — yeni hal əlavə edəndə unudulan yerləri tapır. default yazma ki, bu xəbərdarlıq işləsin.",
            "Qeyd: float/double-ı == ilə müqayisə etmə (0.1 + 0.2 == 0.3 false verir). Fərq üçün epsilon istifadə et: std::abs(a - b) < 1e-9.",
            "Təhlükəsizlik — = vs ==: sabit ilə yazılmış mənimsətmə (if (user.isAdmin = true)) səlahiyyət yüksəltmə (privilege escalation) kimi real zəifliklər yaradıb. -Wall -Werror və kod baxışı.",
            "Təhlükəsizlik — qısa dövrədən təhlükəsizlik üçün istifadə: if (ptr != nullptr && ptr->deyer > 0) və if (i < olcu && massiv[i] == x) — sıra vacibdir; tərsinə yazsan, nullptr/sərhəddən kənar oxuma (UB) baş verir.",
            "Təhlükəsizlik — işarəli/işarəsiz müqayisə: if (i < vektor.size()) əgər i = -1 isə, -1 çox böyük size_t-ə çevrilir və yoxlama «keçir» (sərhəd yoxlamasının bypass-ı). i-ni əvvəlcə mənfilik üçün yoxla və ya eyni tip işlət; C++20 std::cmp_less(a, b) işarə-təhlükəsiz müqayisə edir.",
            "Təhlükəsizlik — «dangling else» və {} buraxılması: if (x) a(); b(); — b həmişə işləyir. Apple «goto fail» zəifliyi məhz bu cür təkrarlanan sətir/mötərizəsiz if-dən yarandı: SSL yoxlaması səssizcə atlandı. Həmişə {} yaz.",
            "Təhlükəsizlik — vaxt hücumları (timing attack): sirr/parol müqayisəsini == və ya ilk uyğunsuzluqda çıxan dövrlə etmə; sabit vaxtlı müqayisə funksiyası (məs. CRYPTO_memcmp) işlət.",
          ]},
          { t: "code", lang: "cpp", caption: "Təhlükəsiz şərtlər: işarə, sərhəd və qısa dövrə", code: `#include <iostream>
#include <utility>      // std::cmp_less
#include <vector>

// i indeksi vektorda mövcuddurmu? İşarə-təhlükəsiz yoxlama
bool indeksDuzgun(int i, const std::vector<int>& v) {
    return i >= 0 && static_cast<std::size_t>(i) < v.size();
}

int main() {
    std::vector<int> ballar{70, 85, 92};
    int sorgu = -1;

    // Düzgün: əvvəl mənfilik, sonra sərhəd; && qısa dövrəsi at(i)-ə çatmağa imkan vermir
    if (indeksDuzgun(sorgu, ballar) && ballar[sorgu] > 80) {
        std::cout << "Yüksək bal\\n";
    } else {
        std::cout << "İndeks yanlışdır və ya bal aşağıdır\\n";
    }

    // C++20: işarə-təhlükəsiz müqayisə
    if (std::cmp_less(sorgu, ballar.size())) {
        std::cout << "-1 kiçikdir (mənfi ədəd hesablanır)\\n";
    }

    // Göstərici yoxlaması: sıra vacibdir
    const int* gosterici = nullptr;
    if (gosterici != nullptr && *gosterici > 0) {   // nullptr olsa *gosterici-yə toxunulmur
        std::cout << "Müsbət\\n";
    }

    // TƏHLÜKƏLİ (yalnız göstərmək üçün, çağırma): tərs sıra nullptr-ı dereferens edir (UB)
    // if (*gosterici > 0 && gosterici != nullptr) { ... }
    return 0;
}` },
          { t: "qa", items: [
            ["Qısa dövrə (short-circuit) nədir və nə üçün lazımdır?", "&& və || sol tərəf nəticəni artıq müəyyən edirsə, sağ tərəfi hesablamırlar. Bu, sürət və təhlükəsiz yoxlama (məs. nullptr yoxlaması ardınca dereferens) üçün işlədilir."],
            ["switch-də break buraxsan nə olur?", "İcra növbəti case-ə «düşür». Qəsdəndirsə [[fallthrough]] yazılır, yoxsa bu ümumi səhvdir."],
            ["if (x = 5) nə edir?", "x-ə 5 mənimsədir və ifadə 5 (true) olduğu üçün şərt həmişə doğrudur. Çox ciddi səhv; -Wall xəbərdarlıq verir."],
            ["if-initializer nə verir?", "if (auto it = m.find(k); it != m.end()) — dəyişənin əhatə dairəsi yalnız if/else ilə məhduddur, kod daha təmiz və təhlükəsizdir."],
            ["Niyə -1 < vektor.size() yanlış nəticə verir?", "-1 işarəsiz size_t-ə çevrilib çox böyük ədəd olur. Buna görə işarəli/işarəsiz müqayisədən qaçmaq və ya std::cmp_less istifadə etmək lazımdır."],
          ]},
          { t: "h", text: "Budaq proqnozu, <=> və optimallaşdırıcının şərtlərə baxışı" },
          { t: "p", text: "Müasir prosessor əmrləri konveyerdə (pipeline) öncədən yerinə yetirir. Şərti keçidə (branch) çatanda hansı yola gedəcəyini təxmin edir (branch prediction) və o yoldakı əmrləri spekulyativ icra edir. Təxmin düzgündürsə, xərc sıfırdır; yanlışdırsa, konveyer boşaldılır və təxminən 10-20 dövr itir. Klassik nümunə: massivin sıralı olub-olmamasından asılı olaraq eyni if dövrü bir neçə dəfə fərqli sürətdə işləyir, çünki sıralı məlumatda şərt uzun ardıcıllıqla eyni nəticəni verir və proqnoz demək olar ki, həmişə düz olur." },
          { t: "code", lang: "cpp", caption: "C++20: <=>, [[unlikely]], budaqsız hesab, işarə-təhlükəsiz müqayisə", code: `#include <algorithm>
#include <compare>
#include <iostream>
#include <string>
#include <utility>

struct Versiya {
    int esas, alt;
    auto operator<=>(const Versiya&) const = default;   // <, >, <=, >=, ==, != hamısı avtomatik
};

int isaretle(int x) {
    if (x < 0) [[unlikely]] return -1;                  // kompilyatora ehtimal haqqında ipucu
    return x > 0 ? 1 : 0;
}

int main() {
    Versiya a{1, 4}, b{1, 10};
    std::cout << std::boolalpha << (a < b) << " " << (a == b) << " " << (a >= b) << "\\n";

    auto nat = (3 <=> 5);                                // nəticə: less / equal / greater
    std::cout << (nat < 0) << "\\n";

    std::cout << std::cmp_less(-1, 1u) << " " << (-1 < 1u) << "\\n";   // true false

    int v = 7;
    int budaqsiz = (v > 5) * 10 + (v <= 5) * 20;        // bool → 0/1: budaqsız (branchless) hesab
    std::cout << budaqsiz << " " << std::clamp(v, 0, 5) << " " << std::max(v, 9) << "\\n";
    std::cout << isaretle(-4) << isaretle(0) << isaretle(9) << "\\n";
    return 0;
}

// Çıxış:
// true false false
// true
// true false
// 10 5 9
// -101` },
          { t: "list", items: [
            "Üçtərəfli müqayisə (<=>, spaceship): a <=> b nəticəsi «kiçik/bərabər/böyük» qaytarır. = default etsən, kompilyator üzvləri leksikoqrafik sırayla müqayisə edən bütün operatorları yaradır. Əl ilə 6 operator yazmaqdan qurtarır, səhv ehtimalı azalır.",
            "Kompilyator sadə if/else-i bəzən budaqsız cmov (conditional move) təlimatına çevirir: hər iki nəticə hesablanır, sonra seçilir. Bu, proqnozlaşdırıla bilməyən şərtlərdə sürətlidir, amma hər iki tərəfdə yan təsir və ya bahalı hesab varsa, çevirmə baş vermir.",
            "Sürətlə bağlı qaydalar: əvvəlcə düzgün və oxunaqlı yaz, sonra profilerlə (perf, VTune, Instruments) ölç. [[likely]]/[[unlikely]] yalnız ölçülmüş «isti» yollarda və real tezlik paylamasını bildiyin halda faydalıdır; yanlış ipucu zərər verir.",
            "UB və şərt: optimallaşdırıcı UB-ni «olmayacaq» sayır. if (x + 1 > x) signed x üçün həmişə true-ya çevrilə bilər, çünki daşma UB-dir. Daşma yoxlamasını əməliyyatdan ƏVVƏL et: if (x == INT_MAX).",
            "UB və null yoxlaması: göstəricini dereferens etdikdən SONRA nullptr yoxlayırsansa, kompilyator «göstərici null ola bilməz, çünki dereferens etdim» deyib yoxlamanı silə bilər. Bu, Linux nüvəsində real boşluq (CVE-2009-1897) yaratdı. Yoxlama həmişə istifadədən əvvəl olmalıdır.",
            "İfadələrin hesablanma sırası: a() + b()-də hansının əvvəl çağırılması təyin olunmayıb (unspecified). Yalnız &&, ||, ?: və vergül operatorunda soldan-sağa sıra və qısa dövrə qarantiyalıdır. Yan təsirli şərtlər (if (f() && g())) ehtiyatla işlədilməlidir.",
            "Tip kodu ilə switch yazmaq (switch (shape.type)) əvəzinə qapalı tip ailəsi üçün std::variant + std::visit, açıq üçün virtual funksiyalar işlət: yeni tip əlavə edəndə kompilyator unudulan yerləri göstərir.",
            "Təhlükəsizlik — Spectre v1: if (i < n) arr[i] sərhəd yoxlaması spekulyativ icrada keçilə bilər və yan kanal vasitəsilə yaddaş sızdıra bilər. Həssas kodda (kernel, kripto, brauzer) indeks maskalama və ya kompilyator yumşaltmaları (-mspeculative-load-hardening, Clang) istifadə olunur.",
            "Təhlükəsizlik — assert yalnız sazlamada işləyir (-DNDEBUG ilə silinir). Xarici girişin doğrulamasını assert-ə etibar etmə: assert proqramçı səhvləri, if isə iş vaxtı səhvləri üçündür.",
            "Təhlükəsizlik — «fail-open» tələsi: şərtdə naməlum hal gələndə defoltun icazə verməsi (default: return true) təhlükəlidir. İcazə sistemlərində defolt həmişə «rədd et» olsun (fail-closed).",
          ]},
          { t: "code", lang: "cpp", caption: "Fail-closed icazə yoxlaması (default rədd edir)", code: `#include <iostream>

enum class Rol { Qonaq, Istifadeci, Admin };

bool silmeIcazesi(Rol r) {
    switch (r) {
        case Rol::Admin: return true;
        case Rol::Istifadeci:
        case Rol::Qonaq: return false;
    }
    return false;                      // naməlum dəyər gəlsə belə: RƏDD
}

int main() {
    std::cout << std::boolalpha;
    std::cout << silmeIcazesi(Rol::Admin) << " " << silmeIcazesi(Rol::Qonaq) << "\\n";
    std::cout << silmeIcazesi(static_cast<Rol>(99)) << "\\n";   // kənar dəyər → false
    return 0;
}

// Çıxış:
// true false
// false` },
          { t: "terms", items: [
            ["branch prediction", "prosessorun şərti keçidin istiqamətini əvvəlcədən təxmin etməsi."],
            ["cmov", "şərti köçürmə təlimatı: budaqsız şərti seçim."],
            ["spaceship operator (<=>)", "C++20 üçtərəfli müqayisə operatoru."],
            ["fail-closed", "şübhəli/naməlum halda icazəni RƏDD edən təhlükəsiz defolt."],
            ["short-circuit", "&& və || sol tərəf nəticəni müəyyən edəndə sağı hesablamır."],
            ["unspecified behavior", "standartın bir neçə düzgün variant verdiyi, seçimi sənədləşdirməyi tələb etmədiyi davranış (məs. arqumentlərin hesablanma sırası)."],
          ]},
          { t: "qa", items: [
            ["Branch prediction nədir və kodu necə təsir edir?", "Prosessor if-in hansı yola gedəcəyini əvvəlcədən təxmin edib spekulyativ icra edir. Düz təxmin pulsuzdur, yanlış təxmin konveyeri boşaldır. Proqnozlaşdırıla bilməyən şərtlər dövrdə yavaşlıq yarada bilər; sıralama və ya budaqsız hesab kömək edə bilər."],
            ["if (x + 1 > x) signed int üçün niyə təhlükəlidir?", "Signed daşma UB-dir, ona görə optimallaşdırıcı ifadəni daim true edə bilər. Daşmanı yoxlamaq üçün əməliyyatdan əvvəl x == INT_MAX yoxla və ya __builtin_add_overflow işlət."],
            ["Spaceship operatoru (<=>) nə verir?", "Bir operator ilə bütün müqayisələri təyin edir; = default üzvləri sıra ilə müqayisə edir. Nəticə tipi (strong/weak/partial_ordering) bərabərlik və sıralamanın xarakterini göstərir (məs. double üçün partial_ordering, çünki NaN var)."],
            ["Niyə dereferensdən sonra null yoxlaması təhlükəlidir?", "Dereferens null göstərici üçün UB-dir, kompilyator göstəricinin null olmadığını fərz edib sonrakı yoxlamanı silə bilər. Yoxlama istifadədən əvvəl olmalıdır."],
            ["assert və if ilə doğrulama fərqi?", "assert sazlama zamanı proqramçı fərziyyələrini yoxlayır və -DNDEBUG ilə silinir. İş vaxtı səhvləri və xarici giriş if/istisna ilə həmişə yoxlanmalıdır."],
            ["if və if constexpr fərqi?", "if şərti işləmə vaxtında yoxlayır, hər iki budaq kompilyasiya olunmalıdır. if constexpr şərti kompilyasiya zamanı yoxlayır, atılan budaq şablonda kompilyasiya olunmur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "if (x = 3) ifadəsi nə edir?", options: ["x-in 3 olub-olmadığını yoxlayır", "x-ə 3 mənimsədir, şərt doğru olur", "Kompilyasiya xətası verir"], answer: 1, why: "= mənimsətmədir; nəticə 3 olduğu üçün şərt həmişə true-dur. Müqayisə üçün == lazımdır." },
          { t: "quiz", q: "switch-də break yazılmasa nə olur?", options: ["Proqram dayanır", "Növbəti case də icra olunur", "Xəta verir"], answer: 1, why: "Fallthrough: icra break-ə çatana qədər növbəti case-lərə davam edir." },
          { t: "quiz", q: "Hansı yoxlama sırası təhlükəsizdir?", options: ["*p > 0 && p != nullptr", "p != nullptr && *p > 0", "Fərqi yoxdur"], answer: 1, why: "&& qısa dövrə edir: p nullptr isə, sağ tərəf hesablanmır və dereferens olmur." },
        ],
      },
    ],
    exercise: {
      task: "`kateqoriya.cpp` yaz. 1) int bal üçün if/else if/else: >=90 «Əla», >=70 «Yaxşı», əks halda «Zəif» çap etsin (bütün bloklar {} ilə). 2) int gun (1-7) üçün switch: 6 və 7 üçün «Həftə sonu» (boş case qrupu ilə), 1-5 üçün «İş günü», default «Yanlış gün». Hər halda break olsun. 3) Ternary ilə bal >= 50 olduqda «keçdi», əks halda «kəsildi» sətri ayrıca dəyişənə mənimsədilsin. 4) std::vector<int> və int indeks üçün təhlükəsiz funksiya yaz: indeks >= 0 && static_cast<size_t>(indeks) < v.size() yoxlayıb elementi qaytarsın (yoxsa -1). 5) Şərhdə if (x = 5) səhvini izah et.",
      starter: `#include <iostream>\n#include <string>\n#include <vector>\n\nint get(const std::vector<int>& v, int indeks) {\n    // təhlükəsiz yoxlama\n}\n\nint main() {\n    // kodunu bura yaz\n    return 0;\n}\n`,
      expect: "if/else if/else ilə bal kateqoriyası ({} ilə); switch ilə gün (case 6: case 7: qrupu, break-lər, default); ternary ilə keçdi/kəsildi; get funksiyasında indeks >= 0 && static_cast<std::size_t>(indeks) < v.size() yoxlaması (qısa dövrə sırası düzgün) və -1 qaytarılması; şərhdə = mənimsətmə, == müqayisədir və şərtin həmişə true olması izah olunub.",
    },
  },
];
