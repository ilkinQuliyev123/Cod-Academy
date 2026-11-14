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
          { t: "tip", text: "Hər ifadənin sonunda nöqtəli vergül (;) qoy. Bu, ən çox unudulan şeydir və kompilyator səhvlərinin yarısını yaradır." },
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
          { t: "tip", text: "Defolt olaraq const yaz: dəyişməyən hər şeyi const et. Bu, təsadüfi dəyişiklikləri kompilyatora tutdurur." },
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
          { t: "tip", text: "Ad kimi boşluqlu mətn üçün cin >> yox, std::getline işlət: cin >> yalnız ilk sözü götürür." },
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
