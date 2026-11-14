import type { Lesson } from "../types";

export const cppD: Lesson[] = [
  {
    slug: "sablonlar",
    title: "Şablonlar (templates)",
    intro: "Şablon (template) eyni kodu müxtəlif tiplər üçün bir dəfə yazmağa imkan verir: kompilyator lazım olan tip üçün real funksiya və ya sinif yaradır. STL-in (vector, map, sort) hamısı şablonlarla qurulub.",
    sections: [
      {
        level: "baslangic",
        title: "Funksiya və sinif şablonu",
        blocks: [
          { t: "analogy", text: "Şablon — kurabiyə qəlibidir. Qəlib bir dənədir, xəmir isə müxtəlif ola bilər: şokoladlı, fındıqlı. Kompilyator hər tip üçün qəlibdən ayrıca «kurabiyə» (real funksiya) bişirir. Buna instansiyalaşdırma (instantiation) deyilir." },
          { t: "code", lang: "cpp", caption: "Funksiya şablonu və sinif şablonu", code: `#include <iostream>
#include <string>
#include <vector>

// Funksiya şablonu: T istənilən tip ola bilər
template <typename T>
T boyuk(T a, T b) {
    return (a > b) ? a : b;
}

// Sinif şablonu: sadə yığın (stack)
template <typename T>
class Yigin {
public:
    void elaveEt(const T& x) { data_.push_back(x); }
    T cixar() {
        T son = data_.back();
        data_.pop_back();
        return son;
    }
    bool bosdur() const { return data_.empty(); }
private:
    std::vector<T> data_;
};

int main() {
    std::cout << boyuk(3, 7) << '\\n';          // T = int
    std::cout << boyuk(2.5, 1.5) << '\\n';      // T = double
    std::cout << boyuk<double>(3, 2.5) << '\\n'; // T açıq göstərilib

    Yigin<std::string> adlar;                   // sinif şablonunda tip yazılır
    adlar.elaveEt("Aysel");
    adlar.elaveEt("Elnur");
    std::cout << adlar.cixar() << '\\n';         // Elnur
    return 0;
}` },
          { t: "terms", items: [
            ["template <typename T>", "T adlı tip parametri olan şablon elanı. typename əvəzinə class da yazmaq olar."],
            ["instansiyalaşdırma (instantiation)", "kompilyatorun şablondan konkret tip üçün real kod yaratması."],
            ["tip çıxarımı (type deduction)", "funksiya şablonunda T-nin arqumentlərdən avtomatik müəyyən olunması."],
            ["sinif şablonu", "tip parametri olan sinif; tip adətən açıq yazılır: Yigin<int>."],
          ]},
          { t: "tip", text: "boyuk(3, 2.5) kompilyasiya olunmur: T həm int, həm double çıxır. Ya boyuk<double>(3, 2.5) yaz, ya da arqumentləri eyni tipə gətir." },
        ],
      },
      {
        level: "orta",
        title: "Specialization, variadic şablonlar və concepts",
        blocks: [
          { t: "p", text: "Bəzən xüsusi tip üçün ayrı davranış lazımdır — bu, ixtisaslaşdırmadır (specialization). C++20 concepts isə «T hansı tələbləri ödəməlidir» sualını şablonun başlığında yazmağa imkan verir." },
          { t: "code", lang: "cpp", code: `#include <concepts>
#include <iostream>
#include <string>
#include <type_traits>

// Əsas (primary) şablon
template <typename T>
struct TipAdi {
    static std::string ad() { return "namelum"; }
};

// Tam ixtisaslaşma: yalnız int üçün
template <>
struct TipAdi<int> {
    static std::string ad() { return "int"; }
};

// Qismən ixtisaslaşma: istənilən göstərici üçün
template <typename T>
struct TipAdi<T*> {
    static std::string ad() { return "gosterici"; }
};

// C++20 concept: ədədi tiplər
template <typename T>
concept Eded = std::integral<T> || std::floating_point<T>;

template <Eded T>
T cem(T a, T b) {
    return a + b;
}

// Variadic şablon: istənilən sayda arqument (C++17 fold expression)
template <typename... Args>
auto cemHamisi(Args... args) {
    return (args + ...);          // ((a1 + a2) + a3) + ...
}

template <typename... Args>
void cap(const Args&... args) {
    ((std::cout << args << ' '), ...);
    std::cout << '\\n';
}

int main() {
    std::cout << TipAdi<int>::ad() << '\\n';      // int
    std::cout << TipAdi<double*>::ad() << '\\n';  // gosterici
    std::cout << TipAdi<char>::ad() << '\\n';     // namelum

    std::cout << cem(2, 3) << '\\n';              // 5
    std::cout << cemHamisi(1, 2, 3, 4) << '\\n';  // 10
    cap("Ad:", "Nigar", "Yas:", 22);
    // cem(std::string("a"), std::string("b"));  // XƏTA: Eded ödənmir
    return 0;
}` },
          { t: "list", items: [
            "Şablonun tam kodu adətən header-də (.h/.hpp) olmalıdır: kompilyator instansiyalaşdırarkən gövdəni görməlidir.",
            "Şablon yalnız istifadə olunduqda kompilyasiya olunur; istifadə olunmayan səhv gec üzə çıxa bilər.",
            "Funksiya şablonunun qismən ixtisaslaşması yoxdur; bunun əvəzinə overload və ya if constexpr istifadə et.",
            "Kompilyasiya xətası uzun olur: ən aşağıdakı «required from here» və ilk «error:» sətrinə bax, qalanı instansiyalaşma izidir.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `// cem.h
template <typename T> T cem(T a, T b);

// cem.cpp
template <typename T> T cem(T a, T b) { return a + b; }

// main.cpp: cem(1, 2);  -> linker xətası (undefined reference)`, right: `// cem.h  — gövdə də header-dədir
template <typename T>
T cem(T a, T b) { return a + b; }`, why: "Şablon gövdəsi .cpp-dədirsə, main.cpp onu görmür və int üçün instansiya yaranmır. Linker simvolu tapa bilmir. Şablonu header-də tam yaz." },
          { t: "mistake", lang: "cpp", wrong: `template <typename T>
T boyuk(T a, T b) { return a > b ? a : b; }

auto n = boyuk(5, 3.2);   // XƏTA: T int, yoxsa double?`, right: `auto n = boyuk<double>(5, 3.2);   // açıq göstər
// və ya: boyuk(5.0, 3.2)`, why: "Tip çıxarımı hər arqumentdən ayrıca T çıxarır; nəticələr üst-üstə düşməsə, kompilyator seçim edə bilmir və xəta verir." },
        ],
      },
      {
        level: "senior",
        title: "SFINAE, kod şişməsi və təhlükəsizlik",
        blocks: [
          { t: "p", text: "SFINAE (Substitution Failure Is Not An Error) qaydası: şablon arqumentinin əvəzlənməsi uğursuz olarsa, bu xəta deyil — həmin overload sadəcə namizədlərdən çıxır. Concepts-dən əvvəl bu, şablonları məhdudlaşdırmağın yeganə yolu idi. İndi concepts və requires daha oxunaqlıdır." },
          { t: "code", lang: "cpp", caption: "SFINAE, concepts və if constexpr müqayisəsi", code: `#include <iostream>
#include <string>
#include <type_traits>

// Köhnə üsul (SFINAE): yalnız tam ədədlər üçün
template <typename T, std::enable_if_t<std::is_integral_v<T>, int> = 0>
std::string nov(T) { return "tam ededdir"; }

template <typename T, std::enable_if_t<!std::is_integral_v<T>, int> = 0>
std::string nov(T) { return "tam eded deyil"; }

// Müasir üsul (C++20): requires
template <typename T>
    requires std::is_floating_point_v<T>
T yarisi(T x) { return x / 2; }

// C++17: if constexpr — tipə görə kod budağı kompilyasiya vaxtı seçilir
template <typename T>
std::string tesvir(const T& x) {
    if constexpr (std::is_same_v<T, std::string>) {
        return "metn: " + x;
    } else if constexpr (std::is_arithmetic_v<T>) {
        return "eded: " + std::to_string(x);
    } else {
        return "namelum tip";
    }
}

int main() {
    std::cout << nov(5) << '\\n';
    std::cout << nov(2.5) << '\\n';
    std::cout << yarisi(5.0) << '\\n';
    std::cout << tesvir(std::string("salam")) << '\\n';
    std::cout << tesvir(42) << '\\n';
    return 0;
}` },
          { t: "list", items: [
            "Kod şişməsi (code bloat): hər fərqli T üçün ayrıca maşın kodu yaranır. Yığın<int>, Yığın<double>, Yığın<std::string> üç ayrı sinifdir. Binar ölçü və instruction cache təzyiqi artır.",
            "Azaltma: tipdən asılı olmayan hissəni qeyri-şablon köməkçi funksiyaya çıxar; çoxlu eyni-ölçülü tipi eyni baza ilə işlət.",
            "Kompilyasiya vaxtı: ağır şablonlar build-i yavaşladır. Header-də lazımsız include etmə; extern template ilə bəzi instansiyaları bir .cpp-də saxla.",
            "Təhlükəsizlik — konstraint-sizlik: məhdudiyyətsiz T istənilən tipi qəbul edir. Məsələn, memcpy ilə kopyalayan şablon trivially copyable olmayan tip alsa, undefined behavior (UB) yaranır. static_assert(std::is_trivially_copyable_v<T>) və ya concept ilə qoru.",
            "Təhlükəsizlik — ədədi tiplərdə sirr: şablon int və unsigned qarışığında səssiz çevrilmə edə bilər (işarəli/işarəsiz müqayisə). Eyni T tələb et, concept ilə məhdudlaşdır.",
            "Təhlükəsizlik — şablon yalnız bir dəfə yoxlanılmır: istifadə olunmayan tip üçün səhv gizli qala bilər. Hər dəstəklənən tip üçün test yaz.",
            "Best practice: C++20-də concepts və requires işlət, xəta mesajı qısa və aydın olur. Bütün şablon parametrlərinə mənalı ad ver (T əvəzinə Element, Hesab).",
            "Şablon ötürmələrində dəyər əvəzinə const T& götür; böyük tiplərin kopyalanmasının qarşısı alınır.",
          ]},
          { t: "qa", items: [
            ["Şablon nə vaxt kompilyasiya olunur?", "Kompilyasiya vaxtı, istifadə olunan hər tip üçün ayrıca instansiyalaşdırılır. Runtime-da heç bir şablon qərarı yoxdur (sıfır xərc abstraksiyası)."],
            ["Şablon niyə header-də yazılır?", "Kompilyator instansiyalaşdırmaq üçün gövdəni görməlidir. .cpp-də olsa, başqa fayl instansiya yarada bilmir və linker xətası verir."],
            ["SFINAE nədir?", "Şablon arqumenti əvəzlənərkən yaranan xəta overload seçimində namizədi çıxarır, proqramı sındırmır. Müasir alternativ: concepts və requires."],
            ["Concepts nə verir?", "Şablonun tələblərini başlıqda elan edir; aydın xəta mesajı və overload-ları ayırmaq imkanı verir."],
            ["Tam və qismən ixtisaslaşma fərqi?", "Tam: bütün parametrlər konkret (template<> ...). Qismən: yalnız bir hissə (məs., T*). Qismən yalnız siniflərdə var, funksiyada yoxdur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Şablon funksiyanın gövdəsi harada yazılmalıdır?", options: ["Yalnız .cpp faylında", "Header-də, istifadə edən faylın görə biləcəyi yerdə", "Fərqi yoxdur"], answer: 1, why: "Kompilyator instansiyalaşdırarkən gövdəni görməlidir." },
          { t: "quiz", q: "boyuk(5, 3.2) niyə xəta verir (template<typename T> T boyuk(T, T))?", options: ["double dəstəklənmir", "T həm int, həm double çıxır", "Funksiya adı səhvdir"], answer: 1, why: "Hər arqumentdən fərqli T çıxır, kompilyator seçim edə bilmir." },
          { t: "quiz", q: "C++20-də şablonun tələblərini ən aydın necə yazmaq olar?", options: ["#define", "concept və requires", "goto"], answer: 1, why: "Concepts oxunaqlı məhdudiyyət və yaxşı xəta mesajı verir." },
        ],
      },
    ],
    exercise: {
      task: "1) `template <typename T> T minimum(T a, T b)` funksiya şablonu yaz. 2) `Cut<T>` sinif şablonu yaz: `T birinci, ikinci;` sahələri, konstruktor və `T cem() const` metodu. 3) C++20 `concept Eded` elan et (`std::integral<T> || std::floating_point<T>`) və `cem` metodunu/`ortalama` funksiyasını bu concept ilə məhdudlaşdır. 4) Variadic `cemHamisi(Args... args)` funksiyasını fold expression ilə yaz. 5) main-də hər birini çağır.",
      starter: `#include <concepts>\n#include <iostream>\n\n// minimum, Cut<T>, Eded concept və cemHamisi\n\nint main() {\n    return 0;\n}\n`,
      expect: "template <typename T> T minimum(T a, T b) düzgün; Cut<T> sinif şablonu iki sahə, konstruktor və cem(); concept Eded std::integral<T> || std::floating_point<T> ilə; template <Eded T> və ya requires ilə istifadə; variadic template <typename... Args> auto cemHamisi(Args... args) { return (args + ...); }; main-də çağırışlar; #include <concepts> və std:: prefiksi; kompilyasiya olunan kod.",
    },
  },
  {
    slug: "smart-pointer",
    title: "Smart pointer-lər və RAII",
    intro: "Smart pointer — yaddaşı sənin əvəzinə avtomatik azad edən obyektdir. RAII prinsipi ilə birlikdə new/delete əl ilə yazmaq lazımsız olur, yaddaş sızmaları və use-after-free səhvləri demək olar ki, yox olur.",
    sections: [
      {
        level: "baslangic",
        title: "RAII və unique_ptr",
        blocks: [
          { t: "analogy", text: "RAII — otel nömrəsinin avtomatik açarı kimidir: otaqdan çıxanda işıq özü sönür, sən yadında saxlamırsan. Resurs (yaddaş, fayl, kilid) obyekt yarananda alınır, obyekt ölən kimi (scope bitəndə) avtomatik buraxılır." },
          { t: "code", lang: "cpp", caption: "unique_ptr: tək sahib", code: `#include <iostream>
#include <memory>
#include <string>

struct Telebe {
    std::string ad;
    explicit Telebe(std::string a) : ad(std::move(a)) {
        std::cout << ad << " yarandi\\n";
    }
    ~Telebe() { std::cout << ad << " silindi\\n"; }
};

void test() {
    auto t = std::make_unique<Telebe>("Leyla");   // new yazmırıq
    std::cout << "Salam, " << t->ad << '\\n';
}   // t burada ölür -> Telebe avtomatik silinir (delete lazım deyil)

int main() {
    test();

    auto a = std::make_unique<Telebe>("Murad");
    // auto b = a;                    // XƏTA: unique_ptr kopyalanmır
    auto b = std::move(a);            // sahiblik b-yə keçdi
    if (!a) std::cout << "a artiq bosdur\\n";
    return 0;
}` },
          { t: "terms", items: [
            ["RAII", "Resource Acquisition Is Initialization: resurs obyektin ömrünə bağlanır, destruktor onu buraxır."],
            ["unique_ptr", "tək sahibli smart pointer; kopyalanmır, yalnız köçürülür (move)."],
            ["make_unique", "unique_ptr-i təhlükəsiz yaradan funksiya (C++14)."],
            ["sahiblik (ownership)", "obyekti kimin silməyə məsul olduğu."],
          ]},
          { t: "tip", text: "Qayda: varsayılan seçim unique_ptr-dir. Yalnız həqiqətən paylaşılan sahiblik lazımdırsa shared_ptr işlət. Ağıllı göstərici lazım deyilsə, ümumiyyətlə obyekti stack-də saxla." },
        ],
      },
      {
        level: "orta",
        title: "shared_ptr, weak_ptr və custom deleter",
        blocks: [
          { t: "code", lang: "cpp", code: `#include <cstdio>
#include <iostream>
#include <memory>
#include <string>
#include <vector>

struct Dost;

struct Sexs {
    std::string ad;
    std::vector<std::weak_ptr<Dost>> dostlar;   // weak: dövrü qırır
    explicit Sexs(std::string a) : ad(std::move(a)) {}
};

struct Dost {
    std::shared_ptr<Sexs> sexs;
};

int main() {
    // shared_ptr: sayğac ilə paylaşılan sahiblik
    auto a = std::make_shared<std::string>("ortaq mesaj");
    {
        auto b = a;                                  // sayğac 2
        std::cout << a.use_count() << '\\n';          // 2
    }                                                // b öldü, sayğac 1
    std::cout << a.use_count() << '\\n';              // 1

    // weak_ptr: sahib deyil, yalnız müşahidəçi
    std::weak_ptr<std::string> zeif = a;
    if (auto kilid = zeif.lock()) {                  // obyekt hələ yaşayırsa shared_ptr verir
        std::cout << *kilid << '\\n';
    }
    a.reset();                                       // sayğac 0 -> silinir
    std::cout << (zeif.expired() ? "bitib" : "yasayir") << '\\n';

    // Custom deleter: FILE* üçün fclose
    std::unique_ptr<std::FILE, decltype(&std::fclose)> fayl(
        std::fopen("melumat.txt", "r"), &std::fclose);
    if (!fayl) {
        std::cout << "Fayl acilmadi\\n";
    }                                                // açılıbsa fclose avtomatik çağırılır
    return 0;
}` },
          { t: "list", items: [
            "make_shared<T>() bir ayırmada həm obyekti, həm idarəetmə blokunu yaradır — daha sürətli və exception-təhlükəsizdir.",
            "Funksiya parametri kimi: sahiblik keçmirsə, smart pointer yox, T& və ya T* ötür. Yalnız sahiblik keçəndə unique_ptr dəyərlə ötürülür.",
            "Raw pointer məqbuldur, əgər sahib deyil, yalnız müşahidə edirsə (non-owning) və ömrü sahibdən qısadırsa.",
            "shared_ptr-in sayğacı atomikdir (thread-safe), amma işarə etdiyi obyekt thread-safe DEYİL. Bir shared_ptr obyektini iki thread eyni anda dəyişsə də data race ola bilər.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `int* p = new int(5);
if (xeta) {
    return;          // delete çağırılmadı -> yaddaş sızması
}
delete p;`, right: `auto p = std::make_unique<int>(5);
if (xeta) {
    return;          // p avtomatik silinir
}`, why: "Əl ilə new/delete istənilən erkən return, exception ilə sızma yaradır. unique_ptr destruktoru hər halda işləyir." },
          { t: "mistake", lang: "cpp", wrong: `int* xam = new int(7);
std::shared_ptr<int> a(xam);
std::shared_ptr<int> b(xam);   // iki ayrı idarəetmə bloku!
// ikisi də delete edəcək -> double free (UB)`, right: `auto a = std::make_shared<int>(7);
std::shared_ptr<int> b = a;    // eyni blokdan kopya`, why: "Eyni xam göstəricidən iki ayrı shared_ptr yaratmaq iki müstəqil sayğac deməkdir. Hər biri obyekti silir — double free, yəni UB. Həmişə mövcud shared_ptr-i kopyala." },
        ],
      },
      {
        level: "senior",
        title: "Daxildə necə işləyir və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "unique_ptr tipik olaraq xam göstərici ilə eyni ölçüdədir (stateless deleter-lə) və xərci sıfırdır: yalnız destruktorda delete çağırır.",
            "shared_ptr iki göstərici saxlayır: obyektə və idarəetmə blokuna (strong və weak sayğaclar, deleter). make_shared ilə blok və obyekt bir ayırmada olur.",
            "shared_ptr kopyası atomik artırma/azaltma edir — çox thread-də bahalıdır (cache line üçün mübahisə). Ehtiyac olmadıqda const shared_ptr& ötür.",
            "Dairəvi referans: A B-ni, B A-nı shared_ptr ilə tutursa, sayğac heç vaxt 0 olmur — yaddaş sızması. Həll: geri istiqaməti weak_ptr et.",
            "enable_shared_from_this: obyektin özündən shared_ptr almaq lazımdırsa, this-dən yeni shared_ptr yaratma (double free). shared_from_this() işlət.",
            "Təhlükəsizlik — use-after-free: xam göstərici silinmiş obyektə işarə etməyə davam edir. Smart pointer-lərlə sahib bir yerdədir, weak_ptr isə lock() ilə yoxlanılır — «asılı göstərici» (dangling pointer) riski çox azalır.",
            "Təhlükəsizlik — shared_ptr dairəsi sızması: DoS vektoru ola bilər (server uzun işləyir, yaddaş tükənir). Valgrind/ASan LeakSanitizer ilə yoxla.",
            "Təhlükəsizlik — get() ilə alınan xam göstəricini saxlama və ya başqa smart pointer-ə vermə. Sahib ölsə, göstərici asılı qalır.",
            "Təhlükəsizlik — reset(xam) və ya shared_ptr(xam) yalnız yeni, kimsəyə məxsus olmayan göstərici ilə çağırılmalıdır; əks halda double free.",
            "Best practice: new/delete yalnız aşağı səviyyəli kodda; custom deleter ilə C resurslarını (FILE*, socket, mutex handle) də RAII-ə sar.",
          ]},
          { t: "code", lang: "cpp", caption: "Müşahidəçi weak_ptr və təhlükəsiz giriş", code: `#include <iostream>
#include <memory>
#include <string>

class Kesh {
public:
    void yaz(const std::string& acar, std::shared_ptr<std::string> d) {
        acar_ = acar;
        deyer_ = d;               // keş obyektə sahib olmur
    }

    // Obyekt hələ yaşayırsa metn qaytarır, əks halda boş
    std::string oxu() const {
        if (auto d = deyer_.lock()) {   // thread-safe şəkildə sayğac artırır
            return *d;
        }
        return "[silinib]";
    }
private:
    std::string acar_;
    std::weak_ptr<std::string> deyer_;
};

int main() {
    Kesh k;
    auto metn = std::make_shared<std::string>("onbellek");
    k.yaz("a1", metn);
    std::cout << k.oxu() << '\\n';    // onbellek
    metn.reset();
    std::cout << k.oxu() << '\\n';    // [silinib]
    return 0;
}` },
          { t: "qa", items: [
            ["RAII nədir?", "Resursun alınması obyekt yaradılması, buraxılması destruktor ilə bağlıdır. Exception olsa belə təmizlik avtomatik işləyir."],
            ["unique_ptr və shared_ptr fərqi?", "unique_ptr tək sahibdir, kopyalanmır, xərci yoxdur. shared_ptr paylaşılan sahiblikdir, sayğac atomikdir və bahadır."],
            ["weak_ptr nə üçündür?", "Sayğacı artırmadan müşahidə: dairəvi referansı qırmaq və obyektin yaşayıb-yaşamadığını lock() ilə yoxlamaq."],
            ["make_shared niyə tövsiyə olunur?", "Tək ayırma (daha sürətli) və exception-təhlükəsizlik; ayrı new + shared_ptr ayırmasında sızma riski var."],
            ["shared_ptr thread-safe-dirmi?", "Yalnız idarəetmə bloku (sayğac). Göstərilən obyekt və eyni shared_ptr dəyişəninə yazma sinxronizasiya tələb edir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Varsayılan seçim hansı smart pointer olmalıdır?", options: ["shared_ptr", "unique_ptr", "raw pointer"], answer: 1, why: "Tək sahiblik ən sadə və ən ucuzdur." },
          { t: "quiz", q: "Dairəvi shared_ptr referansını necə qırmaq olar?", options: ["delete ilə", "Bir istiqaməti weak_ptr etməklə", "get() ilə"], answer: 1, why: "weak_ptr sayğacı artırmır." },
          { t: "quiz", q: "Eyni xam göstəricidən iki shared_ptr yaratsaq nə olur?", options: ["Heç nə", "Double free (UB)", "Avtomatik birləşir"], answer: 1, why: "İki müstəqil sayğac var, hər biri obyekti silir." },
        ],
      },
    ],
    exercise: {
      task: "1) `Kitab` strukturu (ad sahəsi, konstruktor və destruktor mesajı ilə) yaz. 2) `make_unique<Kitab>` ilə obyekt yarat və `std::move` ilə başqa unique_ptr-ə ötür. 3) `make_shared<Kitab>` yarat, ikinci shared_ptr-ə kopyala və `use_count()` çap et. 4) `weak_ptr` götür, `lock()` ilə yoxla, sonra bütün shared_ptr-ləri `reset()` et və `expired()` yoxla. 5) Şərhdə niyə xam göstərici və new/delete yerinə make_unique seçildiyini izah et.",
      starter: `#include <iostream>\n#include <memory>\n#include <string>\n\n// Kitab strukturu\n\nint main() {\n    return 0;\n}\n`,
      expect: "struct Kitab konstruktor/destruktor çap ilə; std::make_unique<Kitab> və std::move ilə sahiblik ötürülməsi; std::make_shared, kopya, use_count() 2 çap edilir; std::weak_ptr, lock() yoxlaması, reset() sonra expired() true; heç yerdə çılpaq new/delete yoxdur; şərhdə RAII/sızma/use-after-free izahı; #include <memory> və std:: prefiksi.",
    },
  },
  {
    slug: "move",
    title: "Senior: move semantikası",
    intro: "Move semantikası (C++11) böyük obyektləri kopyalamaq əvəzinə resursunu «köçürməyə» imkan verir. Bu, vector böyüməsi, funksiyadan qaytarma və unique_ptr kimi tipləri mümkün edən əsas mexanizmdir.",
    sections: [
      {
        level: "baslangic",
        title: "lvalue, rvalue və std::move",
        blocks: [
          { t: "analogy", text: "Kopyalama — kitabı fotokopi etməkdir: yeni kitab hazırlanır, vaxt və kağız gedir. Move — kitabı dostuna verməkdir: kitab köçdü, sənin rəfin boşdur. Sənədin özü saxlanılır, yalnız sahib dəyişir." },
          { t: "code", lang: "cpp", caption: "Kopyala və köçür", code: `#include <iostream>
#include <string>
#include <utility>
#include <vector>

int main() {
    std::string a = "Cox uzun bir metn, heap-de saxlanilir ...";
    std::string b = a;               // kopya: a hələ də tam
    std::string c = std::move(a);    // move: resurs c-yə köçdü

    std::cout << "b: " << b << '\\n';
    std::cout << "c: " << c << '\\n';
    // a indi «etibarlı, amma qeyri-müəyyən» vəziyyətdədir; ondan oxumaq lazım deyil
    a = "yeni deyer";                // yenidən təyin etmək təhlükəsizdir

    std::vector<std::string> siyahi;
    std::string ad = "Kamran";
    siyahi.push_back(ad);              // kopya
    siyahi.push_back(std::move(ad));   // move
    siyahi.push_back("Sevinc");        // müvəqqəti (rvalue) -> avtomatik move
    return 0;
}` },
          { t: "terms", items: [
            ["lvalue", "adı və ünvanı olan dəyər (dəyişən). Sol tərəfdə dura bilər."],
            ["rvalue", "müvəqqəti dəyər (ifadə nəticəsi, literal). Adı yoxdur."],
            ["T&&", "rvalue istinadı (rvalue reference): müvəqqəti dəyərə bağlanır."],
            ["std::move", "heç nə köçürmür, yalnız ifadəni rvalue-ya çevirir (cast). Köçürməni move konstruktoru edir."],
          ]},
          { t: "tip", text: "std::move adı yanıltıcıdır: o sadəcə «bu obyektdən köçürməyə icazə var» deməkdir. Köçürmə yalnız move konstruktoru/təyinatı çağırılanda baş verir." },
        ],
      },
      {
        level: "orta",
        title: "Move konstruktoru, rule of five və RVO",
        blocks: [
          { t: "code", lang: "cpp", code: `#include <algorithm>
#include <cstddef>
#include <iostream>
#include <utility>

// Öz massivini idarə edən sinif: rule of five tam yazılıb
class Bufer {
public:
    explicit Bufer(std::size_t n) : n_(n), data_(new int[n]()) {}

    ~Bufer() { delete[] data_; }

    // 1) kopya konstruktor (dərin kopya)
    Bufer(const Bufer& o) : n_(o.n_), data_(new int[o.n_]) {
        std::copy(o.data_, o.data_ + n_, data_);
    }

    // 2) kopya təyinat
    Bufer& operator=(const Bufer& o) {
        if (this != &o) {
            Bufer tmp(o);          // copy-and-swap
            std::swap(n_, tmp.n_);
            std::swap(data_, tmp.data_);
        }
        return *this;
    }

    // 3) move konstruktor: pointer-i oğurla, köhnəni boşalt
    Bufer(Bufer&& o) noexcept : n_(o.n_), data_(o.data_) {
        o.n_ = 0;
        o.data_ = nullptr;
    }

    // 4) move təyinat
    Bufer& operator=(Bufer&& o) noexcept {
        if (this != &o) {
            delete[] data_;
            n_ = o.n_;
            data_ = o.data_;
            o.n_ = 0;
            o.data_ = nullptr;
        }
        return *this;
    }

    std::size_t olcu() const { return n_; }

private:
    std::size_t n_;
    int* data_;
};

Bufer yarat() {
    Bufer b(1000);
    return b;                // NRVO / move: kopya yoxdur
}

int main() {
    Bufer x = yarat();               // copy elision: birbaşa x-də qurulur
    Bufer y = std::move(x);          // x boşaldı
    std::cout << x.olcu() << ' ' << y.olcu() << '\\n';   // 0 1000
    return 0;
}` },
          { t: "list", items: [
            "Rule of zero: sinif RAII üzvlərdən (vector, string, unique_ptr) ibarətdirsə, heç bir xüsusi funksiya yazma — kompilyatorunki düzgün işləyir.",
            "Rule of five: destruktor, kopya/move konstruktor və təyinatdan birini yazırsansa, hamısını düşün (yaz, = default və ya = delete et).",
            "Copy elision: C++17-dən prvalue-nu qaytarmaq (return Bufer(5);) kopya/move çağırmadan birbaşa hədəfdə qurulur (məcburi). Adlı lokal dəyişən üçün NRVO tövsiyə olunur, amma məcburi deyil.",
            "Qaytarmada return std::move(lokal); YAZMA — RVO-nu söndürür.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `Bufer yarat() {
    Bufer b(1000);
    return std::move(b);   // pessimizasiya: elision söndürülür
}`, right: `Bufer yarat() {
    Bufer b(1000);
    return b;              // kompilyator elision və ya avtomatik move edir
}`, why: "return std::move(b) ifadəni dəyişən adından çıxarır, NRVO tətbiq olunmur və məcburi move baş verir. Sadə return b daha sürətlidir." },
          { t: "mistake", lang: "cpp", wrong: `Bufer(Bufer&& o) {          // noexcept yoxdur
    n_ = o.n_; data_ = o.data_;
    o.data_ = nullptr;
}
// std::vector<Bufer> böyüyəndə KOPYALAYIR`, right: `Bufer(Bufer&& o) noexcept
    : n_(o.n_), data_(o.data_) {
    o.n_ = 0; o.data_ = nullptr;
}`, why: "vector yenidən ayırarkən güclü exception təminatı üçün move yalnız noexcept olduqda istifadə olunur (std::move_if_noexcept). Əks halda bahalı kopya seçilir." },
        ],
      },
      {
        level: "senior",
        title: "Perfect forwarding, moved-from vəziyyət və təhlükəsizlik",
        blocks: [
          { t: "p", text: "Şablonda T&& «forwarding reference»-dir: həm lvalue, həm rvalue qəbul edir. std::forward<T> arqumentin orijinal kateqoriyasını saxlayaraq ötürür. Beləliklə, sarğı funksiya (məs., make_unique, emplace_back) lazımsız kopya etmir." },
          { t: "code", lang: "cpp", caption: "Perfect forwarding", code: `#include <iostream>
#include <memory>
#include <string>
#include <utility>

struct Mesaj {
    explicit Mesaj(const std::string&) { std::cout << "lvalue -> kopya\\n"; }
    explicit Mesaj(std::string&&)      { std::cout << "rvalue -> move\\n"; }
};

// Öz make_unique-umuz: arqumentləri olduğu kimi ötürür
template <typename T, typename... Args>
std::unique_ptr<T> yarat(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}

int main() {
    std::string s = "salam";
    auto m1 = yarat<Mesaj>(s);                    // lvalue -> kopya
    auto m2 = yarat<Mesaj>(std::string("dunya")); // rvalue -> move
    auto m3 = yarat<Mesaj>(std::move(s));         // rvalue -> move
    return 0;
}` },
          { t: "list", items: [
            "Moved-from obyekt «etibarlı, lakin qeyri-müəyyən» vəziyyətdədir: destruktor və təyinat təhlükəsizdir, amma dəyəri bilinmir (std::string adətən boş olur, amma standart bunu zəmanət vermir).",
            "Təhlükəsizlik — moved-from obyektdən istifadə: köçürülmüş unique_ptr nullptr-dir. Onu dereferans etmək null dereference (UB), köçürülmüş vector-un elementinə müraciət isə sərhəddən çıxmadır.",
            "Təhlükəsizlik — std::move-un yanlış istifadəsi: const obyektdən std::move kopyaya düşür (const T&& move konstruktoruna bağlanmır). Həm də lazımsız std::move uğurla elision-u pozur.",
            "Təhlükəsizlik — özünə təyinat: x = std::move(x) halını move təyinatında yoxla (this != &o); əks halda öz resursunu silirsən.",
            "Təhlükəsizlik — move-dan sonra şifrə/açar kimi həssas məlumat yaddaşda qala bilər. Həssas buferləri açıq şəkildə sıfırla (OPENSSL_cleanse kimi, adi memset optimizasiya ilə silinə bilər).",
            "Performans: vector<T> üçün move konstruktoru noexcept olmalıdır; sinfin üzvləri də noexcept move olmalıdır.",
            "Parametr kimi: «sink» funksiya (obyekti saxlayır) üçün dəyərlə götür və daxilə std::move et: void qoy(std::string s) { ad_ = std::move(s); }.",
            "Forwarding reference yalnız deduksiya olunan T&& üçündür; sinif şablonunun üzvündə T&& adi rvalue istinadıdır.",
          ]},
          { t: "code", lang: "cpp", caption: "Sink parametr və moved-from-dan qorunma", code: `#include <iostream>
#include <memory>
#include <string>
#include <utility>
#include <vector>

class Istifadeci {
public:
    // Dəyərlə götür, sonra move: lvalue verəndə 1 kopya, rvalue verəndə 0 kopya
    explicit Istifadeci(std::string ad) : ad_(std::move(ad)) {}
    const std::string& ad() const { return ad_; }
private:
    std::string ad_;
};

int main() {
    auto p = std::make_unique<Istifadeci>("Rauf");
    auto q = std::move(p);

    if (p == nullptr) {                 // köçürülmüşü yoxla, dereferans etmə
        std::cout << "p boşdur\\n";
    }
    std::cout << q->ad() << '\\n';

    std::vector<Istifadeci> v;
    v.reserve(2);
    v.emplace_back("Nigar");            // yerində qurur, lazımsız move yoxdur
    return 0;
}` },
          { t: "qa", items: [
            ["std::move nə edir?", "Heç nə köçürmür; ifadəni rvalue-ya cast edir ki, move konstruktoru/təyinatı seçilə bilsin."],
            ["Rule of five və rule of zero?", "Resurs idarə edirsənsə, 5 xüsusi funksiyanı birlikdə yaz. Daha yaxşı: resursu RAII üzvlərə ver və heç birini yazma (zero)."],
            ["Niyə move noexcept olmalıdır?", "vector reallocation güclü exception təminatı üçün noexcept move yoxdursa kopyalayır."],
            ["Perfect forwarding nədir?", "Forwarding reference (T&&) və std::forward ilə arqumentin lvalue/rvalue kateqoriyasını saxlayaraq ötürmək."],
            ["Moved-from obyekt ilə nə etmək olar?", "Yenidən təyin etmək və ya silmək. Dəyərini oxumaq/ehtimal etmək olmaz (yalnız sinif sənədləşdirilmiş zəmanət verirsə)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "std::move əslində nə edir?", options: ["Obyekti kopyalayır", "İfadəni rvalue-ya çevirir (cast)", "Yaddaşı silir"], answer: 1, why: "Köçürməni move konstruktoru edir, std::move yalnız cast-dır." },
          { t: "quiz", q: "return std::move(lokal); niyə zərərlidir?", options: ["Xəta verir", "Copy elision/NRVO-nu söndürür", "Heç bir fərqi yoxdur"], answer: 1, why: "Sadə return lokal; daha effektivdir." },
          { t: "quiz", q: "vector böyüyəndə elementləri kopyalamaması üçün move konstruktoru necə olmalıdır?", options: ["virtual", "noexcept", "static"], answer: 1, why: "Yalnız noexcept move istifadə olunur." },
        ],
      },
    ],
    exercise: {
      task: "1) `Massiv` sinfi yaz: `int* data_` və `std::size_t n_` üzvləri, konstruktor, destruktor (`delete[]`). 2) Kopya konstruktor və kopya təyinatı dərin kopya ilə yaz. 3) Move konstruktor və move təyinatı yaz — hər ikisi `noexcept`, köhnə obyektin göstəricisini `nullptr`, ölçüsünü 0 et; təyinatda özünə təyinat yoxlaması et. 4) main-də `Massiv a(5); Massiv b = std::move(a);` yaz və a-nın ölçüsünün 0 olduğunu çap et. 5) Şərhdə niyə `return std::move(lokal)` yazılmadığını izah et.",
      starter: `#include <cstddef>\n#include <iostream>\n#include <utility>\n\n// Massiv sinfi (rule of five)\n\nint main() {\n    return 0;\n}\n`,
      expect: "Massiv sinfində destruktor delete[]; kopya konstruktor/təyinat dərin kopya (yeni new int[]); move konstruktor və move təyinat noexcept, mənbə data_=nullptr və n_=0; təyinatda this != &o yoxlaması və köhnə yaddaşın delete[] edilməsi; main-də std::move(a) sonra a.olcu()==0; şərhdə return std::move-un RVO-nu pozduğu izah olunub; kod kompilyasiya olunur.",
    },
  },
  {
    slug: "senior",
    title: "Senior: performans və müasir C++",
    intro: "Sürətli və təhlükəsiz C++ üç şeyə söykənir: yaddaşı keşə uyğun düzmək, undefined behavior-u alətlərlə tutmaq və müasir kitabxana tiplərindən (optional, variant, string_view, span) istifadə etmək. Bu dərs senior səviyyənin əsas bacarıqlarını toplayır.",
    sections: [
      {
        level: "baslangic",
        title: "Müasir tiplər: optional, variant, string_view, span",
        blocks: [
          { t: "analogy", text: "Optional — qutudur: içində ya hədiyyə var, ya yoxdur, və qutunu açmamış bilirsən. Köhnə üsulda «yoxdur» demək üçün -1 və ya nullptr kimi sehrli dəyərlər işlədirdik, onları unutmaq asandır. Qutu isə «yoxdur» halını tipin özünə yazır." },
          { t: "code", lang: "cpp", caption: "C++17/20 tipləri", code: `#include <iostream>
#include <optional>
#include <span>
#include <string>
#include <string_view>
#include <variant>
#include <vector>

// optional: nəticə olmaya bilər
std::optional<int> axtar(const std::vector<int>& v, int x) {
    for (std::size_t i = 0; i < v.size(); ++i) {
        if (v[i] == x) return static_cast<int>(i);
    }
    return std::nullopt;
}

// string_view: kopya etmədən oxu (sahib deyil!)
void salamla(std::string_view ad) {
    std::cout << "Salam, " << ad << '\\n';
}

// span: massiv/vector üzərində görünüş (C++20)
int cem(std::span<const int> eded) {
    int s = 0;
    for (int x : eded) s += x;
    return s;
}

int main() {
    std::vector<int> v = {4, 8, 15, 16};
    if (auto i = axtar(v, 15)) {
        std::cout << "Indeks: " << *i << '\\n';
    } else {
        std::cout << "Tapilmadi\\n";
    }

    salamla("Aysel");                  // literal, heç bir std::string yaranmır
    std::cout << cem(v) << '\\n';       // 43

    // variant: bir neçə tipdən biri
    std::variant<int, std::string> d = std::string("metn");
    if (std::holds_alternative<std::string>(d)) {
        std::cout << std::get<std::string>(d) << '\\n';
    }
    return 0;
}` },
          { t: "terms", items: [
            ["std::optional<T>", "T dəyəri ola və ya olmaya bilər."],
            ["std::variant", "tip təhlükəsiz birlik (union): bir anda bir tipdən biri."],
            ["std::string_view", "mətnə sahibsiz, qeyri-sahib baxış (göstərici + uzunluq)."],
            ["std::span", "ardıcıl yaddaşa (massiv, vector) baxış; ölçünü özündə daşıyır."],
          ]},
          { t: "tip", text: "Funksiya parametri kimi: yalnız oxunacaqsa string_view və span götür. Yaddaşı kopyalamırsan, həm də həm std::string, həm literal, həm char massivi qəbul edir." },
        ],
      },
      {
        level: "orta",
        title: "Keş, struct layout, constexpr və concurrency",
        blocks: [
          { t: "code", lang: "cpp", code: `#include <atomic>
#include <cstdint>
#include <iostream>
#include <mutex>
#include <thread>
#include <vector>

// Struct layout: sahələrin sırası ölçüyə təsir edir (padding)
struct Pis {          // tipik olaraq 24 bayt
    char a;           // 1 + 7 padding
    double b;         // 8
    char c;           // 1 + 7 padding
};
struct Yaxsi {        // tipik olaraq 16 bayt
    double b;         // 8
    char a;           // 1
    char c;           // 1 (+6 padding)
};

// constexpr: kompilyasiya vaxtı hesabla
constexpr int faktorial(int n) { return n <= 1 ? 1 : n * faktorial(n - 1); }
static_assert(faktorial(5) == 120, "faktorial yanlisdir");

int main() {
    std::cout << sizeof(Pis) << ' ' << sizeof(Yaxsi) << '\\n';

    // mutex ilə qorunan ortaq say
    int say = 0;
    std::mutex m;
    std::atomic<int> atomSay{0};

    auto is = [&]() {
        for (int i = 0; i < 100000; ++i) {
            {
                std::lock_guard<std::mutex> kilid(m);   // RAII kilid
                ++say;
            }
            ++atomSay;                                  // atomik, kilidsiz
        }
    };

    std::vector<std::thread> thr;
    for (int i = 0; i < 4; ++i) thr.emplace_back(is);
    for (auto& t : thr) t.join();            // join unutma: std::terminate!

    std::cout << say << ' ' << atomSay.load() << '\\n';   // 400000 400000
    return 0;
}` },
          { t: "list", items: [
            "Keş yerliliyi (cache locality): ardıcıl yaddaşda (vector) dolaşmaq göstəricilərlə bağlı siyahıdan (std::list) dəfələrlə sürətlidir. Çoxdan seçim: vector, sonra ölçüb qərar ver.",
            "Struct of arrays (SoA) çox elementdə yalnız bir sahəni oxuyanda array of structs-dan sürətli ola bilər.",
            "Kompilyator -O2 inlining, dövr açma, vektorlaşdırma edir. Ölçmədən optimizasiya etmə: perf, Valgrind callgrind, VTune ilə profil et.",
            "constexpr hesablamanı kompilyasiyaya keçirir; consteval (C++20) mütləq kompilyasiya vaxtı çağırılmasını tələb edir.",
            "Modules (C++20) #include-un yerinə import edir: build sürətlənir, makro sızması azalır. Alət dəstəyi hələ qeyri-bərabərdir, ona görə layihədə mərhələli keç.",
            "CMake: cmake_minimum_required, project, add_executable, target_compile_features(app PRIVATE cxx_std_20) və xəbərdarlıqlar (-Wall -Wextra) əsas başlanğıcdır.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `std::string_view gorunus() {
    std::string s = "mueqqeti";
    return s;               // s ölür, görünüş asılı qalır
}
auto v = gorunus();         // use-after-free`, right: `std::string saxla() {
    std::string s = "mueqqeti";
    return s;               // sahib dəyər qaytarılır
}`, why: "string_view sahib deyil. Gösterdiyi std::string lokal idi və funksiya bitəndə ölür; view asılı göstərici saxlayır. Ömrü uzun olmalı olanı sahib tiplə (std::string) qaytar." },
          { t: "mistake", lang: "cpp", wrong: `int say = 0;
std::thread a([&]{ for (int i = 0; i < 100000; ++i) ++say; });
std::thread b([&]{ for (int i = 0; i < 100000; ++i) ++say; });
a.join(); b.join();         // data race: UB, nəticə qeyri-müəyyən`, right: `std::atomic<int> say{0};
std::thread a([&]{ for (int i = 0; i < 100000; ++i) ++say; });
std::thread b([&]{ for (int i = 0; i < 100000; ++i) ++say; });
a.join(); b.join();         // dəqiq 200000`, why: "İki thread eyni dəyişəni sinxronizasiyasız dəyişir — data race, standartda UB. Atomic və ya mutex lazımdır." },
        ],
      },
      {
        level: "senior",
        title: "Undefined behavior, sanitizer-lər və təhlükəsizlik",
        blocks: [
          { t: "p", text: "Undefined behavior (UB) — standartın heç bir davranış zəmanət vermədiyi hal. Kompilyator UB-nin baş vermədiyini fərz edib optimizasiya edir, ona görə proqram test zamanı işləyib, istehsalda partlaya bilər. UB-ni ya kodla qarşısını al, ya alətlərlə tut." },
          { t: "code", lang: "cpp", caption: "Tipik UB mənbələri (YALNIZ nümunədir, işlətmə)", code: `#include <climits>
#include <vector>

// DİQQƏT: aşağıdakı hər sətir UB-dir. Məqsəd: sanitizer-in nə tutduğunu göstərmək.
void uboNumuneleri() {
    int a[3] = {1, 2, 3};
    int x = a[3];                 // sərhəddən çıxma (buffer overflow) -> ASan

    int y = INT_MAX;
    y = y + 1;                    // işarəli integer overflow -> UBSan

    int z;                        // başlanğıc dəyər verilməyib
    int w = z + 1;                // oxuma: UB (uninitialized)

    std::vector<int> v = {1, 2, 3};
    int* p = &v[0];
    v.push_back(4);               // reallocation: p artıq etibarsızdır
    int q = *p;                   // use-after-free -> ASan
    (void)x; (void)w; (void)q;
}

// Təhlükəsiz variant
int tehlukesiz(const std::vector<int>& v, std::size_t i) {
    return v.at(i);               // sərhəd yoxlanır, exception atır
}

// Build əmrləri (konsolda):
//   g++ -std=c++20 -O1 -g -fsanitize=address,undefined proqram.cpp
//   g++ -std=c++20 -O1 -g -fsanitize=thread proqram.cpp   (ayrı, TSan)` },
          { t: "list", items: [
            "ASan (AddressSanitizer): buffer overflow, use-after-free, double free, sızma. UBSan: integer overflow, null dereference, yanlış shift. TSan: data race. MSan: başlanğıcsız oxuma (clang).",
            "Sanitizer-ləri CI-də testlərlə işlət; yavaşlama 2–5 dəfədir, amma xətalar istehsaldan çox əvvəl tutulur.",
            "Fuzzing: libFuzzer/AFL++ təsadüfi və mutasiya olunmuş girişlərlə kodu bombalayır; parser və şəbəkə kodunda kritik xətalar tapır. Sanitizer ilə birlikdə işlət.",
            "Təhlükəsizlik — buffer overflow: C massivləri və strcpy/sprintf əvəzinə std::array, std::vector, std::string, std::span və at() işlət; sərhəd yoxlaması (-D_GLIBCXX_ASSERTIONS) aç.",
            "Təhlükəsizlik — integer overflow: işarəli overflow UB-dir, işarəsiz sarılır, amma ölçü hesablamasında (new[], malloc(n * k)) çoxalma zərəri yaradır. Yoxlama əvvəl, əməliyyat sonra.",
            "Təhlükəsizlik — format string: printf(istifadeciMetni) yazma; həmişə printf(\"%s\", metn) və ya std::format/iostream işlət. Əks halda %n/%x ilə yaddaş oxunub-yazıla bilər.",
            "Təhlükəsizlik — uninitialized dəyişən: həmişə {} ilə başlat (int x{};). Başlanğıcsız yaddaş məlumat sızdırır və qeyri-müəyyən davranış verir.",
            "C++ Core Guidelines (Stroustrup/Sutter) və SEI CERT C++ Coding Standard: yazılım qaydaları toplusu; clang-tidy (cppcoreguidelines-*) bunları avtomatik yoxlayır.",
            "Memory-safe praktikalar: RAII, smart pointer-lər, span/string_view, const düzgünlüyü, xam new/delete və C-tipli cast-lardan imtina, -Wall -Wextra -Wconversion -Werror.",
            "Release build-də də -fstack-protector-strong, -D_FORTIFY_SOURCE=2, ASLR/PIE kimi sərtləşdirmə bayraqlarından istifadə et.",
          ]},
          { t: "code", lang: "cpp", caption: "Təhlükəsiz hesablama: overflow yoxlaması", code: `#include <cstddef>
#include <iostream>
#include <limits>
#include <optional>
#include <vector>

// a * b overflow edəcəksə nullopt qaytar
std::optional<std::size_t> tehlukesizCarp(std::size_t a, std::size_t b) {
    if (a != 0 && b > std::numeric_limits<std::size_t>::max() / a) {
        return std::nullopt;
    }
    return a * b;
}

int main() {
    std::size_t say = 1000, olcu = 4;
    if (auto n = tehlukesizCarp(say, olcu)) {
        std::vector<char> bufer(*n);        // ölçü artıq etibarlıdır
        std::cout << "Ayrildi: " << bufer.size() << '\\n';
    } else {
        std::cout << "Overflow: ayirma imtina edildi\\n";
    }
    return 0;
}` },
          { t: "qa", items: [
            ["Undefined behavior nədir və niyə təhlükəlidir?", "Standartın davranışı təyin etmədiyi hal. Kompilyator UB olmadığını fərz edib optimizasiya edir, nəticə qeyri-proqnozlaşdırıla bilən olur və təhlükəsizlik boşluğuna çevrilə bilər."],
            ["ASan, UBSan, TSan nəyi tutur?", "ASan: yaddaş xətaları (overflow, use-after-free, sızma). UBSan: UB-lər (overflow, null, shift). TSan: data race."],
            ["Data race nədir və necə qarşısını almaq olar?", "İki thread eyni yaddaşa sinxronizasiyasız, ən azı biri yazma ilə girir. mutex, atomic, immutability və ya thread-lərə bölünmüş məlumatla."],
            ["std::string_view-in təhlükəsi?", "Sahib deyil: göstərdiyi mətn ölsə, view asılı qalır. Qaytarma və saxlamada ehtiyatlı ol."],
            ["Cache locality performansa necə təsir edir?", "Ardıcıl yaddaş keş xətlərini effektiv doldurur; göstəricilərlə dolaşmaq keş buraxmalarına (miss) səbəb olur. vector çox vaxt list-dən sürətlidir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı alət data race-i tutur?", options: ["ASan", "TSan", "UBSan"], answer: 1, why: "ThreadSanitizer (TSan) thread xətaları üçündür." },
          { t: "quiz", q: "string_view funksiyadan lokal std::string üçün qaytarılsa nə olur?", options: ["Təhlükəsiz kopya", "Asılı göstərici (use-after-free)", "Kompilyator xətası"], answer: 1, why: "View sahib deyil, lokal string ölür." },
          { t: "quiz", q: "Struct sahələrinin sırası ölçüyə təsir edirmi?", options: ["Xeyr", "Bəli, padding səbəbindən", "Yalnız release-də"], answer: 1, why: "Hizalama (alignment) üçün boşluq əlavə olunur; böyükdən kiçiyə düzmək ölçünü azaldır." },
        ],
      },
    ],
    exercise: {
      task: "1) `std::optional<int> tapIndeks(std::span<const int> v, int x)` funksiyasını yaz. 2) `std::size_t tehlukesizCarp(...)` əvəzinə `std::optional<std::size_t>` qaytaran overflow-yoxlayan vurma funksiyası yaz. 3) `std::atomic<int>` sayğacını 4 `std::thread` ilə artır, `join` et və nəticəni çap et. 4) Şərhdə `g++` əmrini ASan və UBSan bayraqları ilə yaz. 5) Şərhdə `string_view`-in lokal string üçün niyə qaytarılmamalı olduğunu izah et.",
      starter: `#include <atomic>\n#include <cstddef>\n#include <iostream>\n#include <limits>\n#include <optional>\n#include <span>\n#include <thread>\n#include <vector>\n\n// tapIndeks, tehlukesizCarp\n\nint main() {\n    return 0;\n}\n`,
      expect: "tapIndeks std::optional<int> və std::span<const int> ilə, tapılmasa std::nullopt; tehlukesizCarp-da b > max / a yoxlaması və nullopt; std::atomic<int> və 4 std::thread, hamısı join olunur, nəticə 4*N; şərhdə g++ -fsanitize=address,undefined əmri; şərhdə string_view lokal string üçün asılı göstərici izahı; kod kompilyasiya olunan C++20.",
    },
  },
];
