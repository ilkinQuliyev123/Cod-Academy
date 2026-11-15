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
          { t: "h", text: "Tip olmayan parametr və default arqument" },
          { t: "p", text: "Şablon parametri yalnız tip olmaq məcburiyyətində deyil. Tam ədəd, bool və ya (C++20-dən) bəzi sabit dəyərlər də şablon parametri ola bilər. Buna tip olmayan şablon parametri (non-type template parameter, NTTP) deyilir. Məsələn std::array<int, 5> içindəki 5 məhz belə parametrdir: ölçü tipin bir hissəsinə çevrilir və kompilyasiya vaxtı məlum olur. Tip parametrləri kimi, NTTP üçün də default dəyər vermək olar." },
          { t: "code", lang: "cpp", caption: "NTTP, default şablon arqumenti və overload qaydası", code: `#include <array>
#include <iostream>
#include <string>

// Tip olmayan şablon parametri (NTTP): ölçü kompilyasiya vaxtı məlumdur
template <typename T, std::size_t N>
class Sabit {
public:
    constexpr std::size_t olcu() const { return N; }
    T& operator[](std::size_t i) { return data_[i]; }
    const T& operator[](std::size_t i) const { return data_[i]; }
private:
    T data_[N]{};
};

// Default şablon arqumenti
template <typename T = int>
struct Qutu {
    T deyer{};
};

// Funksiya şablonu overload ilə: qeyri-şablon funksiya həmişə üstündür
template <typename T>
void cap(T x) { std::cout << "sablon: " << x << '\\n'; }
void cap(int x) { std::cout << "int: " << x << '\\n'; }

template <typename T>
T kvadrat(T x) { return x * x; }

int main() {
    Sabit<int, 4> s;
    s[0] = 10; s[3] = 40;
    std::cout << s.olcu() << ' ' << s[0] << ' ' << s[1] << ' ' << s[3] << '\\n';

    Qutu<> a;                // T = int (default)
    Qutu<std::string> b{"mətn"};
    std::cout << a.deyer << ' ' << b.deyer << '\\n';

    cap(5);                  // qeyri-şablon
    cap(5.5);                // şablon, T = double
    cap<int>(7);             // açıq şablon çağırışı
    std::cout << kvadrat(1.5) << ' ' << kvadrat(12) << '\\n';
}

/* Çıxış:
4 10 0 40
0 mətn
int: 5
sablon: 5.5
sablon: 7
2.25 144
*/` },
          { t: "list", items: [
            "Sabit<int, 4> və Sabit<int, 5> tamamilə ayrı tiplərdir: biri o birinə çevrilmir.",
            "Funksiya çağırışında qeyri-şablon funksiya və şablon eyni dərəcədə uyğundursa, adi (qeyri-şablon) funksiya seçilir. Şablonu məcbur etmək üçün cap<int>(7) kimi açıq göstər.",
            "Qutu<> yazanda boş bucaqlı mötərizə default tipi (int) götürür; mötərizələri tamamilə atmaq olmaz (C++17-də CTAD bunu bəzi hallarda həll edir, aşağıda baxacağıq).",
            "Şablon parametrlərinin adı istənilən ola bilər, amma təcrübədə T, U (tip), N (say), Args (variadic) qəbul olunmuş adlardır.",
          ]},
          { t: "warn", text: "Şablon xətaları adətən uzun olur. Qorxma: ilk «error:» sətrinə bax. Əksər hallarda səbəb ya tipin lazım olan əməliyyatı (məs. operator>) dəstəkləməməsi, ya da T-nin arqumentlərdən fərqli çıxmasıdır." },
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
          { t: "h", text: "Alias şablonu, CTAD və deduction guide" },
          { t: "p", text: "using ilə şablon üçün ad vermək olar (alias template): template <typename T> using Siyahi = std::vector<T>. Köhnə typedef bunu bacarmır. C++17-dən başlayaraq sinif şablonlarının tipi konstruktor arqumentlərindən çıxarıla bilər: std::vector v{1,2,3} yazanda vector<int> alınır. Buna CTAD (Class Template Argument Deduction) deyilir. Kompilyatorun çıxarışı səhv və ya qeyri-kafi olduqda deduction guide yazırsan: «bu arqumentlərlə bu tip alınsın»." },
          { t: "code", lang: "cpp", caption: "Alias, CTAD, deduction guide, typename, üzv şablonu", code: `#include <iostream>
#include <map>
#include <string>
#include <utility>
#include <vector>

// Alias şablonu
template <typename T>
using Siyahi = std::vector<T>;

template <typename T>
using AdXeritesi = std::map<std::string, T>;

// CTAD və deduction guide
template <typename A, typename B>
struct Cut {
    A birinci;
    B ikinci;
    Cut(A a, B b) : birinci(std::move(a)), ikinci(std::move(b)) {}
};
// Deduction guide: "metn" literalından std::string çıxar
template <typename A, typename B>
Cut(A, B) -> Cut<A, B>;
Cut(const char*, int) -> Cut<std::string, int>;

// Asılı (dependent) adlar: typename lazımdır
template <typename Konteyner>
typename Konteyner::value_type birinciElement(const Konteyner& k) {
    typename Konteyner::const_iterator it = k.begin();
    return *it;
}

// Üzv şablonu
class Dyisdirici {
public:
    template <typename T>
    std::string cevir(const T& x) const { return "[" + std::to_string(x) + "]"; }
};

// Statik üzv hər instansiya üçün ayrıdır
template <typename T>
struct Say {
    static inline int n = 0;
    Say() { ++n; }
};

int main() {
    Siyahi<int> v = {5, 6, 7};
    AdXeritesi<double> bal;
    bal["Aysel"] = 91.5;
    std::cout << birinciElement(v) << ' ' << bal["Aysel"] << '\\n';

    Cut c1(3, 4.5);                   // Cut<int,double>
    Cut c2("Elnur", 21);              // guide: Cut<std::string,int>
    std::cout << c1.birinci << ' ' << c1.ikinci << ' ' << c2.birinci << ' ' << c2.ikinci << '\\n';

    std::vector vv{1, 2, 3};          // CTAD: vector<int>
    std::cout << vv.size() << '\\n';

    Dyisdirici d;
    std::cout << d.cevir(42) << ' ' << d.cevir(2.5) << '\\n';

    Say<int> a1, a2; Say<double> b1;
    std::cout << Say<int>::n << ' ' << Say<double>::n << '\\n';
}

/* Çıxış:
5 91.5
3 4.5 Elnur 21
3
[42] [2.500000]
2 1
*/` },
          { t: "list", items: [
            "Şablon parametrindən asılı olan daxili tip adının qarşısında typename yazmaq lazımdır: typename Konteyner::value_type. Çünki kompilyator Konteyner məlum olmayana qədər value_type-ın tip, yoxsa dəyər olduğunu bilmir. C++20 bəzi kontekstlərdə (məs. alias elanı) typename-i ixtiyari edib, amma onu yazmaq həmişə təhlükəsizdir.",
            "Üzv şablonu (member template): sinfin özü şablon olmasa da, metodu şablon ola bilər (cevir<T>). Virtual metod şablon ola bilməz, çünki virtual cədvəl kompilyasiya vaxtı sabit ölçülü olmalıdır.",
            "Statik üzv hər instansiya üçün ayrıdır: Say<int>::n və Say<double>::n iki ayrı dəyişəndir. static inline (C++17) ilə onu sinif daxilində başlatmaq olar.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `template <typename Konteyner>
Konteyner::value_type birinci(const Konteyner& k) {   // XƏTA
    return *k.begin();
}`, right: `template <typename Konteyner>
typename Konteyner::value_type birinci(const Konteyner& k) {
    return *k.begin();
}`, why: "Konteyner şablon parametridir, kompilyator onun daxilindəki value_type-ın tip olduğunu bilmir və onu dəyər kimi oxumağa çalışır. typename ona «bu bir tipdir» deyir." },
          { t: "mistake", lang: "cpp", wrong: `template <typename T>
void yazdir(const T& x) {
    std::cout << x.size();   // yalnız çağırılanda yoxlanır
}
yazdir(5);                   // uzun, çaşdırıcı xəta mesajı`, right: `template <typename T>
    requires requires(const T& x) { x.size(); }
void yazdir(const T& x) {
    std::cout << x.size();
}
// yazdir(5)  -> qısa xəta: "T.size() tələbi ödənmir"`, why: "Konstraint yoxdursa, xəta şablonun dərinliyində üzə çıxır və başa düşmək çətin olur. requires tələbi funksiyanın başlığında yazır və xətanı çağırış yerinə gətirir." },
          { t: "tip", text: "Şablon yazanda əvvəl adi (qeyri-şablon) funksiyanı bir tip üçün yaz və yoxla. Sonra tipi T ilə əvəz et. Bu üsul çoxlu xətanı əvvəlcədən tutur." },
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
            ["CRTP nədir və nə üçün istifadə olunur?", "Törəmə sinif özünü baza şablonun arqumenti kimi verir; baza static_cast ilə törəməni çağırır. Virtual çağırış xərci olmadan statik polimorfizm, mixin davranışı (məs. operator== -dan bütün müqayisələri yaratmaq) və inline imkanı verir."],
            ["Tag dispatch nədir?", "Eyni funksiyanın overload-larını tip xüsusiyyətinə görə seçmək: əlavə arqument kimi std::true_type/false_type (və ya iterator_category) ötürülür. if constexpr və concepts-dən əvvəl standart üsul idi (std::advance bunu istifadə edir)."],
            ["Şablonda iki mərhələli axtarış nədir?", "Təyin anında asılı olmayan adlar yoxlanır, instansiyalaşdırma anında asılı adlar (ADL ilə) həll olunur. Buna görə asılı baza sinifin üzvünə this-> və ya Baza<T>:: ilə müraciət lazımdır."],
            ["if constexpr ilə adi if arasındakı fərq?", "if constexpr şərti kompilyasiya vaxtı qiymətləndirir və uğursuz budağı instansiyaya daxil etmir; adi if hər iki budağı kompilyasiya edir və yalnız runtime-da seçir."],
            ["Concepts SFINAE-dən nə ilə yaxşıdır?", "Oxunaqlı sintaksis, qısa xəta mesajı, konseptlər arasında subsumption (daha ixtisaslaşmış concept üstünlük qazanır), overload-ları ayırmaq üçün enable_if hiyləsinə ehtiyac yoxdur."],
            ["Parameter pack-i necə açırlar?", "Pack expansion (args...) və ya fold expression (args + ...). C++17-dən əvvəl rekursiv şablon və ya initializer_list hiyləsi istifadə olunurdu."],
          ]},
          { t: "h", text: "Şablon metaprogramlaşdırması: type traits, tag dispatch, CRTP" },
          { t: "p", text: "Şablon metaprogramlaşdırması (TMP) — kompilyasiya vaxtı kod yaratmaq və hesablamaq texnikasıdır. Başlanğıcda təsadüfən kəşf olunub, sonra C++-ın ən güclü alətlərindən birinə çevrilib. Müasir C++-da TMP-nin əksər hissəsi constexpr funksiyalar, if constexpr və concepts ilə oxunaqlı yazılır; klassik rekursiv şablon üslubu isə köhnə kodu anlamaq üçün lazımdır." },
          { t: "code", lang: "cpp", caption: "Rekursiv şablon, type trait, tag dispatch, CRTP, requires ifadəsi, variadic", code: `#include <concepts>
#include <iostream>
#include <string>
#include <type_traits>
#include <utility>

// Kompilyasiya vaxtı rekursiya (köhnə TMP üslubu)
template <unsigned N>
struct Faktorial { static constexpr unsigned long long deyer = N * Faktorial<N - 1>::deyer; };
template <>
struct Faktorial<0> { static constexpr unsigned long long deyer = 1; };

// Öz type trait-imiz
template <typename T> struct gosterici_mi : std::false_type {};
template <typename T> struct gosterici_mi<T*> : std::true_type {};
template <typename T> inline constexpr bool gosterici_mi_v = gosterici_mi<T>::value;

// Tag dispatch
template <typename T>
void emal(T x, std::true_type)  { std::cout << "tam eded: " << x << '\\n'; }
template <typename T>
void emal(T x, std::false_type) { std::cout << "digər: " << x << '\\n'; }
template <typename T>
void emal(T x) { emal(x, std::is_integral<T>{}); }

// CRTP: statik polimorfizm
template <typename Derived>
struct Heyvan {
    void danis() const { static_cast<const Derived*>(this)->sesCix(); }
};
struct Pisik : Heyvan<Pisik> { void sesCix() const { std::cout << "miyov\\n"; } };
struct It : Heyvan<It>       { void sesCix() const { std::cout << "hav\\n"; } };

template <typename D>
void cagir(const Heyvan<D>& h) { h.danis(); }

// requires ifadəsi ilə concept
template <typename T>
concept Cap_olunan = requires(T x) {
    { std::cout << x } -> std::same_as<std::ostream&>;
};
template <typename T>
concept Konteyner = requires(T c) {
    typename T::value_type;
    { c.size() } -> std::convertible_to<std::size_t>;
    c.begin(); c.end();
};

template <Cap_olunan T>
void yaz(const T& x) { std::cout << "yaz: " << x << '\\n'; }

// Variadic: tiplərin sayı və if constexpr ilə rekursiya
template <typename... Ts>
constexpr std::size_t say = sizeof...(Ts);

template <typename T, typename... Qalan>
void hamisiniYaz(const T& ilk, const Qalan&... q) {
    std::cout << ilk;
    if constexpr (sizeof...(q) > 0) {
        std::cout << ", ";
        hamisiniYaz(q...);
    } else {
        std::cout << '\\n';
    }
}

int main() {
    static_assert(Faktorial<10>::deyer == 3628800);
    std::cout << Faktorial<10>::deyer << '\\n';
    std::cout << gosterici_mi_v<int*> << gosterici_mi_v<int> << '\\n';
    emal(42); emal(3.5);
    Pisik p; It i;
    cagir(p); cagir(i);
    yaz(7); yaz("salam");
    static_assert(Konteyner<std::string>);
    static_assert(!Konteyner<int>);
    std::cout << say<int, double, char> << '\\n';
    hamisiniYaz(1, "iki", 3.5, 'c');
}

/* Çıxış:
3628800
10
tam eded: 42
digər: 3.5
miyov
hav
yaz: 7
yaz: salam
3
1, iki, 3.5, c
*/` },
          { t: "terms", items: [
            ["type trait", "tip haqqında kompilyasiya vaxtı sual: std::is_integral_v<T>, std::is_pointer_v<T>. Öz trait-ini std::true_type/false_type-dan miras alaraq yaza bilərsən."],
            ["tag dispatch", "overload-u tipə əsasən seçmək üçün boş «etiket» tipi ötürmək (std::true_type/false_type). if constexpr-dan əvvəl standart üsul idi."],
            ["CRTP", "Curiously Recurring Template Pattern: sinif özünü baza şablon arqumenti kimi verir (struct Pisik : Heyvan<Pisik>). Virtual olmadan statik polimorfizm verir."],
            ["requires ifadəsi", "concept daxilində «bu kod yazıla bilərmi» sualını yoxlayan ifadə: requires(T x) { x.size(); }."],
            ["parameter pack", "variadic şablonda Args... : sıfır və ya daha çox tip/dəyər. sizeof...(Args) sayını verir."],
          ]},
          { t: "h", text: "İki mərhələli axtarış, ADL və ODR" },
          { t: "p", text: "Şablon iki mərhələdə kompilyasiya olunur. Birinci mərhələdə (şablon təyin olunanda) T-dən asılı olmayan adlar axtarılır və sintaksis yoxlanır. İkinci mərhələdə (instansiyalaşdırma anında) T-dən asılı adlar axtarılır; bu axtarışa ADL (Argument-Dependent Lookup) da qoşulur: funksiya çağırışında arqumentin tipinin namespace-i də yoxlanır. Buna görə std::swap-ı şablonda using std::swap; swap(a, b); kimi çağırmaq tövsiyə olunur: tip öz namespace-ində daha yaxşı swap təqdim edibsə, ADL onu tapır." },
          { t: "list", items: [
            "ODR (One Definition Rule): eyni şablonun müxtəlif tərcümə vahidlərindəki instansiyaları eyni olmalıdır. Fərqli makro və ya fərqli tərif səbəbindən uyğunsuzluq «No diagnostic required» pozuntusudur: xəta mesajı olmadan sessiz UB.",
            "Açıq instansiyalaşdırma: template class Yigin<int>; bir .cpp-də instansiyanı yaradır, başlıqda extern template class Yigin<int>; digər fayllarda təkrar yaranmanın qarşısını alır. Build vaxtını azaldır.",
            "static_assert(false) şablonda, hətta budaq işləməsə də, bəzi kompilyatorlarda (C++23-dən əvvəl) dərhal xəta verir. Çıxış yolu: template <typename> inline constexpr bool hemise_yalan = false; və static_assert(hemise_yalan<T>).",
            "Fold expression-ın növləri: (args + ...) sağ, (... + args) sol, (init + ... + args) başlanğıc dəyərli fold. Boş paketdə yalnız &&, || və vergül işləyir; digərlərində init lazımdır.",
            "Compile-time hesablama üçün əvvəlcə constexpr funksiyanı seç; rekursiv Faktorial<N> üslubu yalnız tip hesablamaları lazım olanda (tip siyahıları, tip çevirmələri) əsaslıdır.",
            "Perfect forwarding üçün şablon T&& və std::forward<T> işlədir. Eyni sarğı funksiya hər kateqoriyadan arqumentləri itkisiz ötürür (move dərsinə bax).",
            "Static polimorfizm (CRTP, şablon) çağırışı kompilyasiya vaxtı həll edir və inline etməyə imkan verir. Dinamik polimorfizm (virtual) isə runtime-da müxtəlif tipləri eyni konteynerdə saxlamağa imkan verir. Seçim: tiplər kompilyasiya vaxtı məlumdursa şablon, heterogen kolleksiya lazımdırsa virtual.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `template <typename T>
void sil(T* p) {
    if constexpr (std::is_array_v<T>) delete[] p;
    else delete p;
}
int* a = new int[3];
sil(a);        // T = int, array deyil -> delete (UB!)`, right: `auto a = std::make_unique<int[]>(3);   // sahiblik tipdə yazılıb
// və ya std::vector<int>`, why: "T burada int çıxır (int[3] yox), çünki göstərici arqumentindən massiv ölçüsü çıxarılmır. Tipə əsaslanan «əl ilə» silmə məntiqi yanlış hesab edir. Sahiblik məlumatını tipdə saxla (unique_ptr<int[]>, vector)." },
          { t: "mistake", lang: "cpp", wrong: `template <typename T>
void emal(T x) {
    if (std::is_integral_v<T>) {       // adi if
        x % 2;                         // double üçün kompilyasiya xətası
    }
}
emal(2.5);`, right: `template <typename T>
void emal(T x) {
    if constexpr (std::is_integral_v<T>) {
        x % 2;       // budaq yalnız integral T üçün kompilyasiya olunur
    }
}`, why: "Adi if hər iki budağı da kompilyasiya edir; double üçün % yazıla bilmir. if constexpr istifadə olunmayan budağı instansiyaya daxil etmir (şablonun daxilində)." },
          { t: "warn", text: "«Şablon sehri» oxunmaz kod yaratmaq üçün səbəb deyil. Hər TMP həllini ən sadə alternativlə (constexpr funksiya, concept, adi overload) müqayisə et və yalnız lazım olduqda mürəkkəbləş." },
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Şablon funksiyanın gövdəsi harada yazılmalıdır?", options: ["Yalnız .cpp faylında","Header-də, istifadə edən faylın görə biləcəyi yerdə","Fərqi yoxdur"], answer: 1, why: "Kompilyator instansiyalaşdırarkən gövdəni görməlidir." },
          { t: "quiz", q: "boyuk(5, 3.2) niyə xəta verir (template<typename T> T boyuk(T, T))?", options: ["double dəstəklənmir","T həm int, həm double çıxır","Funksiya adı səhvdir"], answer: 1, why: "Hər arqumentdən fərqli T çıxır, kompilyator seçim edə bilmir." },
          { t: "quiz", q: "C++20-də şablonun tələblərini ən aydın necə yazmaq olar?", options: ["#define","concept və requires","goto"], answer: 1, why: "Concepts oxunaqlı məhdudiyyət və yaxşı xəta mesajı verir." },
        ],
      },
    ],
    exercise: {
      task: "1) `template <typename T> T minimum(T a, T b)` funksiya şablonu yaz. 2) `Cut<T>` sinif şablonu yaz: `T birinci, ikinci;` sahələri, konstruktor və `T cem() const` metodu. 3) C++20 `concept Eded` elan et (`std::integral<T> || std::floating_point<T>`) və `cem` metodunu/`ortalama` funksiyasını bu concept ilə məhdudlaşdır. 4) Variadic `cemHamisi(Args... args)` funksiyasını fold expression ilə yaz. 5) main-də hər birini çağır.",
      starter: "#include <concepts>\n#include <iostream>\n\n// minimum, Cut<T>, Eded concept və cemHamisi\n\nint main() {\n    return 0;\n}\n",
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
          { t: "h", text: "unique_ptr ilə sahiblik: ötürmə, qaytarma, get/reset/release" },
          { t: "p", text: "unique_ptr-i funksiyalara ötürəndə əsas sual: «sahiblik keçirmi?» Cavab bəli isədir, unique_ptr dəyərlə (std::move ilə) ötürülür. Cavab xeyirdirsə, obyektə istinad (T&) və ya sadə göstərici ötürülür: funksiya sahib deyil, yalnız istifadə edir. Fabrika funksiyası unique_ptr qaytararsa, sahiblik avtomatik çağırana keçir." },
          { t: "code", lang: "cpp", caption: "Sahiblik: ötürmə, fabrika, get, reset, release, massiv", code: `#include <iostream>
#include <memory>

struct Oyuncaq {
    int id;
    explicit Oyuncaq(int i) : id(i) { std::cout << "Oyuncaq " << id << " yarandi\\n"; }
    ~Oyuncaq() { std::cout << "Oyuncaq " << id << " silindi\\n"; }
};

// Sahiblik keçir: dəyərlə unique_ptr alır
void sahiblikAl(std::unique_ptr<Oyuncaq> p) {
    std::cout << "sahiblikAl: " << p->id << '\\n';
}   // p burada ölür

// Sahiblik keçmir: yalnız istifadə
void bax(const Oyuncaq& o) { std::cout << "bax: " << o.id << '\\n'; }

// Fabrika: unique_ptr qaytarmaq = sahibliyi çağırana vermək
std::unique_ptr<Oyuncaq> yarat(int id) {
    return std::make_unique<Oyuncaq>(id);
}

int main() {
    auto a = yarat(1);
    bax(*a);                       // *a ilə istinad ötürülür
    Oyuncaq* xam = a.get();        // müşahidə: sahib olmayan göstərici
    std::cout << "get: " << xam->id << '\\n';

    sahiblikAl(std::move(a));      // 1 burada silinir
    std::cout << "a boşdur: " << (a == nullptr) << '\\n';

    auto b = yarat(2);
    b.reset(new Oyuncaq(3));       // köhnəni silir (2), yenisini tutur (3)
    Oyuncaq* azad = b.release();   // sahiblikdən imtina: silinmir!
    std::cout << "release sonra b boşdur: " << !b << '\\n';
    delete azad;                   // artıq əl ilə silməliyik

    auto massiv = std::make_unique<int[]>(3);   // massiv üçün
    massiv[0] = 7; massiv[2] = 9;
    std::cout << massiv[0] << ' ' << massiv[1] << ' ' << massiv[2] << '\\n';
    std::cout << "son\\n";
}

/* Çıxış:
Oyuncaq 1 yarandi
bax: 1
get: 1
sahiblikAl: 1
Oyuncaq 1 silindi
a boşdur: 1
Oyuncaq 2 yarandi
Oyuncaq 3 yarandi
Oyuncaq 2 silindi
release sonra b boşdur: 1
Oyuncaq 3 silindi
7 0 9
son
*/` },
          { t: "terms", items: [
            ["get()", "daxili xam göstəricini qaytarır, sahiblik dəyişmir. Yalnız müvəqqəti müşahidə üçün."],
            ["reset(p)", "köhnə obyekti silir və yenisini qəbul edir; reset() isə sadəcə silir və nullptr edir."],
            ["release()", "sahiblikdən imtina edir: göstərici qaytarılır, silinmir. Sonra özün silməlisən."],
            ["unique_ptr<T[]>", "massiv üçün versiya; destruktorda delete[] çağırır və [] operatoru verir."],
          ]},
          { t: "list", items: [
            "unique_ptr kopyalanmır, amma move olunur: sahiblik dəqiq bir yerdə qalır, buna görə «kim silir» sualı həmişə aydındır.",
            "Funksiyada unique_ptr&& və ya const unique_ptr& götürmək nadir hallarda lazımdır; ya T& ötür, ya da sahiblik keçirirsə dəyərlə götür.",
            "make_unique<int[]>(n) elementləri sıfırlayır (value-initialization). Sıfırlamaq lazım deyilsə, C++20-nin make_unique_for_overwrite-ı daha sürətlidir.",
            "Tez-tez yanlış anlama: release() silmir. Çox vaxt reset() və ya sadəcə scope bitirmək lazımdır.",
          ]},
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
          { t: "h", text: "Polimorfizm, enable_shared_from_this və lambda deleter" },
          { t: "p", text: "Smart pointer-lər polimorf sinif iyerarxiyası ilə də işləyir. unique_ptr<Baza> törəmə obyekti tuta bilər, amma baza sinifin destruktoru virtual olmalıdır; yoxsa baza göstərici ilə silmə törəmə hissəni silmir və bu undefined behavior-dur. Obyektin özündən shared_ptr almaq lazımdırsa, sinif enable_shared_from_this-dən miras alır və shared_from_this() çağırılır: bu, mövcud idarəetmə blokunu paylaşır." },
          { t: "code", lang: "cpp", caption: "Polimorfizm, lambda deleter, shared_from_this", code: `#include <iostream>
#include <memory>
#include <string>
#include <vector>

// Polimorfizm: baza sinifin destruktoru virtual olmalıdır
struct Fiqur {
    virtual ~Fiqur() { std::cout << "~Fiqur\\n"; }
    virtual double sahe() const = 0;
};
struct Kvadrat : Fiqur {
    double a;
    explicit Kvadrat(double x) : a(x) {}
    ~Kvadrat() override { std::cout << "~Kvadrat\\n"; }
    double sahe() const override { return a * a; }
};
struct Daire : Fiqur {
    double r;
    explicit Daire(double x) : r(x) {}
    ~Daire() override { std::cout << "~Daire\\n"; }
    double sahe() const override { return 3.14 * r * r; }
};

std::unique_ptr<Fiqur> fabrik(char n, double x) {
    if (n == 'k') return std::make_unique<Kvadrat>(x);
    return std::make_unique<Daire>(x);
}

// enable_shared_from_this
class Is : public std::enable_shared_from_this<Is> {
public:
    std::shared_ptr<Is> ozum() { return shared_from_this(); }
    ~Is() { std::cout << "Is silindi\\n"; }
};

int main() {
    std::vector<std::unique_ptr<Fiqur>> fiqurlar;
    fiqurlar.push_back(fabrik('k', 3));
    fiqurlar.push_back(fabrik('d', 1));
    for (const auto& f : fiqurlar) std::cout << f->sahe() << '\\n';
    fiqurlar.clear();             // hər ikisi düzgün silinir

    // Lambda deleter
    {
        std::shared_ptr<int> p(new int(5), [](int* x) {
            std::cout << "xüsusi silici: " << *x << '\\n';
            delete x;
        });
    }

    auto i = std::make_shared<Is>();
    auto j = i->ozum();
    std::cout << i.use_count() << '\\n';   // 2
    i.reset();
    std::cout << "i reset\\n";
    j.reset();
    std::cout << "son\\n";
}

/* Çıxış:
9
3.14
~Kvadrat
~Fiqur
~Daire
~Fiqur
xüsusi silici: 5
2
i reset
Is silindi
son
*/` },
          { t: "mistake", lang: "cpp", wrong: `struct Baza { ~Baza() {} };            // virtual deyil
struct Toren : Baza { std::string s; };
std::unique_ptr<Baza> p = std::make_unique<Toren>();
// p ölür -> ~Baza() çağırılır, ~Toren() yox -> UB`, right: `struct Baza { virtual ~Baza() = default; };
struct Toren : Baza { std::string s; };
std::unique_ptr<Baza> p = std::make_unique<Toren>();`, why: "Baza sinifin destruktoru virtual deyilsə, Baza* vasitəsilə silmə UB-dir; Toren-in üzvləri (std::string) təmizlənmir. Polimorf iyerarxiyanın baza sinfində həmişə virtual destruktor ver. Qeyd: shared_ptr<Baza>(new Toren) deleter-i yaradılma anında yadda saxladığı üçün bu halda işləyir, amma buna güvənmə." },
          { t: "mistake", lang: "cpp", wrong: `class Is {
public:
    std::shared_ptr<Is> ozum() { return std::shared_ptr<Is>(this); }   // SƏHV
};
auto a = std::make_shared<Is>();
auto b = a->ozum();     // yeni idarəetmə bloku -> double free`, right: `class Is : public std::enable_shared_from_this<Is> {
public:
    std::shared_ptr<Is> ozum() { return shared_from_this(); }
};`, why: "shared_ptr<Is>(this) ikinci, müstəqil sayğac yaradır; iki blok eyni obyekti silməyə çalışır. shared_from_this() mövcud blokdan kopya götürür. Qeyd: shared_from_this() yalnız obyekt artıq shared_ptr ilə idarə olunanda çağırıla bilər (konstruktorda yox)." },
          { t: "mistake", lang: "cpp", wrong: `std::unique_ptr<int> p(new int[3]);   // massiv, amma delete çağırılır
// p ölür: delete (delete[] yox) -> UB`, right: `auto p = std::make_unique<int[]>(3);    // delete[] çağırır
// və ya std::vector<int>`, why: "Massiv delete[] ilə silinməlidir. unique_ptr<int> adi delete çağırır; massiv üçün unique_ptr<int[]> və ya sadəcə vector işlət." },
          { t: "list", items: [
            "Hansı seçilsin: yerli dəyişən (stack) > std::vector/std::string > unique_ptr > shared_ptr. shared_ptr yalnız həqiqətən çoxlu sahib lazım olanda.",
            "Funksiya imzası bələdçisi (Herb Sutter): sahiblik keçmir -> T& və ya T*; sahiblik keçir -> unique_ptr<T> dəyərlə; paylaşılan sahiblik əlavə olunur -> shared_ptr<T> dəyərlə; sadəcə istifadə -> const shared_ptr<T>& (ancaq lazım olsa).",
            "Deleter tipi unique_ptr-in bir hissəsidir (unique_ptr<FILE, decltype(&fclose)>), shared_ptr-də isə deyil (silici idarəetmə blokunda saxlanır). Lambda deleter unique_ptr-in ölçüsünü artırmır, əgər lambda heç nə tutmursa (stateless).",
          ]},
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
            ["shared_ptr-in idarəetmə blokunda nələr var?", "Strong sayğac, weak sayğac, deleter və allocator (tip-silinmiş şəkildə). Obyektin ölçüsünə təsir etmir, amma make_shared ilə yanaşı yerləşir."],
            ["make_shared-in çatışmazlığı nədir?", "Obyekt və blok bir ayırmadadır; weak_ptr yaşayırsa, obyektin yaddaşı blokla birlikdə azad edilmir. Həmçinin xüsusi operator new/deleter vermək çətinləşir (allocate_shared var)."],
            ["unique_ptr niyə shared_ptr-dən sürətlidir?", "Sayğac yoxdur, atomik əməliyyat yoxdur, əlavə ayırma yoxdur; ölçüsü xam göstərici qədərdir (stateless deleter ilə) və kompilyator onu tam inline edir."],
            ["Pimpl idiom nədir və nə üçün lazımdır?", "Implementasiya detallarını unique_ptr<Impl> ilə gizlədir: başlıq dəyişmir, rebuild azalır, ABI sabit qalır. Destruktor .cpp-də təyin olunmalıdır."],
            ["Aliasing constructor nə işə yarayır?", "Başqa tipli göstəricini mövcud sahibin sayğacı ilə paylaşmaq: üzvə baxan shared_ptr bütün obyektin ömrünü uzadır."],
            ["Smart pointer-lər exception-təhlükəsizliyi necə təmin edir?", "RAII: stack unwinding zamanı destruktorlar çağırılır, beləliklə exception olsa belə resurs azad olunur. f(unique_ptr<A>(new A), g()) kimi sırasıyla yaranma problemləri make_unique ilə həll olunub."],
          ]},
          { t: "h", text: "Idarəetmə bloku, aliasing, pimpl və atomik shared_ptr" },
          { t: "p", text: "shared_ptr-in iki göstəricisi var: obyektə və idarəetmə blokuna (control block). Blokda strong sayğac (shared_ptr sayı), weak sayğac (weak_ptr sayı +1 kollektiv strong üçün), deleter və allocator saxlanılır. Strong sayğac sıfıra çatanda obyekt məhv edilir, weak sayğac sıfıra çatanda blok azad olunur. Buna görə weak_ptr obyekt ölsə də bloku yaşadır və expired()/lock() ona müraciətlə işləyir." },
          { t: "code", lang: "cpp", caption: "Ölçülər, aliasing constructor, weak_ptr və pimpl", code: `#include <iostream>
#include <memory>
#include <string>

struct Detal {
    int x = 1;
    std::string ad = "detal";
    ~Detal() { std::cout << "Detal silindi\\n"; }
};

// Pimpl: başlıq yalnız elan görür
class Motor {
public:
    Motor();
    ~Motor();
    void isle();
private:
    struct Impl;
    std::unique_ptr<Impl> p_;
};
struct Motor::Impl { int say = 0; };
Motor::Motor() : p_(std::make_unique<Impl>()) {}
Motor::~Motor() = default;           // Impl tam tipi burada görünür
void Motor::isle() { std::cout << "isledi " << ++p_->say << '\\n'; }

int main() {
    std::cout << (sizeof(std::unique_ptr<int>) == sizeof(int*)) << '\\n';   // 1
    std::cout << (sizeof(std::shared_ptr<int>) == 2 * sizeof(int*)) << '\\n'; // 1

    // Aliasing constructor: sayğac a-nındır, göstərici üzvə baxır
    std::shared_ptr<int> adIcinde;
    {
        auto d = std::make_shared<Detal>();
        adIcinde = std::shared_ptr<int>(d, &d->x);   // d-nin ömrünü uzadır
        std::cout << "use_count: " << d.use_count() << '\\n';   // 2
    }
    std::cout << "d çıxdı, x = " << *adIcinde << '\\n';           // 1
    adIcinde.reset();                                           // Detal indi silinir

    // weak_ptr control blok ömrü
    auto s = std::make_shared<int>(10);
    std::weak_ptr<int> w = s;
    std::cout << s.use_count() << ' ' << w.use_count() << '\\n';  // 1 1
    s.reset();
    std::cout << w.expired() << '\\n';                            // 1

    Motor m; m.isle(); m.isle();
}

/* Çıxış:
1
1
use_count: 2
d çıxdı, x = 1
Detal silindi
1 1
1
isledi 1
isledi 2
*/` },
          { t: "list", items: [
            "make_shared ilə obyekt və blok bir ayırmadadır. Mənfi tərəf: weak_ptr hələ yaşayırsa, obyektin yaddaşı (məhv olunsa belə) blokla birlikdə azad olunmur. Böyük obyektlər və çoxlu uzunömürlü weak_ptr olan halda shared_ptr<T>(new T) ayrı ayırma ilə daha yaxşı ola bilər.",
            "Aliasing constructor: shared_ptr<U>(sahib, U* gosterici) sayğacı sahibdən götürür, göstərici başqa obyektə (məs. üzvə) baxır. Üzvə baxan göstərici bütün obyektin ömrünü uzadır, bu da massivin elementi, sinfin üzvü üçün faydalıdır.",
            "Pimpl idiom: sinifin gizli hissəsi Impl strukturunda, onun unique_ptr-i başlıqda saxlanır. Başlıqda yalnız ön elan (forward declaration) olur; build asılılığı azalır. Destruktor və move üzvləri .cpp-də (Impl-in tam göründüyü yerdə) = default edilməlidir; yoxsa «incomplete type» xətası alırsan.",
            "C++20 std::atomic<std::shared_ptr<T>> kilidsiz-təhlükəsiz oxu/yazma verir. C++11-də bunun üçün std::atomic_load/atomic_store(&sp) funksiyaları var (C++20-də deprecated).",
            "C++17-dən shared_ptr<T[]> massivlər üçündür. make_shared<T[]>(n) isə C++20-dədir.",
            "owner_before / owner_less: shared_ptr-ləri sahiblik (blok) əsasında sıralayır; weak_ptr-i map-də açar kimi istifadə etmək üçün lazımdır.",
            "Deleter-i çağırmaq heç vaxt exception atmamalıdır; destruktorlar noexcept-dir, atsa std::terminate çağırılır.",
            "Sayğac artırma atomikdir, amma həmin shared_ptr dəyişəninin özünə eyni anda yazmaq data race-dir. Hər thread öz kopyasını götürürsə təhlükəsizdir.",
            "Performans: shared_ptr kopyası atomik əməliyyatdır (çox nüvədə cache line mübahisəsi). Sıx dövrdə const shared_ptr<T>& və ya xam T& ötür, kopyanı yalnız sahiblik həqiqətən paylaşılanda et.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `void emal(std::shared_ptr<Is> p);        // hər çağırışda atomik artırma

for (int i = 0; i < 1'000'000; ++i) emal(ptr);`, right: `void emal(const Is& i);                  // sahiblik lazım deyil

for (int i = 0; i < 1'000'000; ++i) emal(*ptr);`, why: "Funksiya yalnız obyekti oxuyursa, shared_ptr dəyərlə ötürmək hər çağırışda atomik sayğac artırıb-azaltmaq deməkdir. Bu, çox thread-də ciddi yavaşlama yaradır. Sahiblik lazım deyilsə, istinad ötür." },
          { t: "warn", text: "shared_ptr hər problemin həlli deyil. «Kim sahibdir?» sualına cavab verə bilmirsənsə, dizaynı yenidən düşün. Qlobal paylaşılan vəziyyət shared_ptr ilə gizlədilir, amma aradan qalxmır." },
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Varsayılan seçim hansı smart pointer olmalıdır?", options: ["shared_ptr","unique_ptr","raw pointer"], answer: 1, why: "Tək sahiblik ən sadə və ən ucuzdur." },
          { t: "quiz", q: "Dairəvi shared_ptr referansını necə qırmaq olar?", options: ["delete ilə","Bir istiqaməti weak_ptr etməklə","get() ilə"], answer: 1, why: "weak_ptr sayğacı artırmır." },
          { t: "quiz", q: "Eyni xam göstəricidən iki shared_ptr yaratsaq nə olur?", options: ["Heç nə","Double free (UB)","Avtomatik birləşir"], answer: 1, why: "İki müstəqil sayğac var, hər biri obyekti silir." },
        ],
      },
    ],
    exercise: {
      task: "1) `Kitab` strukturu (ad sahəsi, konstruktor və destruktor mesajı ilə) yaz. 2) `make_unique<Kitab>` ilə obyekt yarat və `std::move` ilə başqa unique_ptr-ə ötür. 3) `make_shared<Kitab>` yarat, ikinci shared_ptr-ə kopyala və `use_count()` çap et. 4) `weak_ptr` götür, `lock()` ilə yoxla, sonra bütün shared_ptr-ləri `reset()` et və `expired()` yoxla. 5) Şərhdə niyə xam göstərici və new/delete yerinə make_unique seçildiyini izah et.",
      starter: "#include <iostream>\n#include <memory>\n#include <string>\n\n// Kitab strukturu\n\nint main() {\n    return 0;\n}\n",
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
          { t: "h", text: "Kopya, move və RVO əməli olaraq: izləmə sinfi" },
          { t: "p", text: "Move semantikasını anlamağın ən yaxşı yolu: hər xüsusi funksiyada mesaj çap edən sinif yazıb nə vaxt hansının çağırıldığını görmək. Aşağıdakı nümunə üç sualı cavablandırır: dəyərlə ötürmədə nə baş verir, std::move nə edir, funksiyadan qaytarma nə qədər bahalıdır." },
          { t: "code", lang: "cpp", caption: "Hər çağırışı izləyən sinif və dəyər kateqoriyaları", code: `#include <iostream>
#include <string>
#include <utility>

struct Sesli {
    std::string ad;
    Sesli(std::string a) : ad(std::move(a)) { std::cout << "ctor " << ad << '\\n'; }
    Sesli(const Sesli& o) : ad(o.ad) { std::cout << "KOPYA " << ad << '\\n'; }
    Sesli(Sesli&& o) noexcept : ad(std::move(o.ad)) { std::cout << "MOVE " << ad << '\\n'; }
    ~Sesli() { std::cout << "dtor [" << ad << "]\\n"; }
};

Sesli yarat() { return Sesli("temp"); }   // prvalue: elision

void kopyaAl(Sesli s) { std::cout << "kopyaAl: " << s.ad << '\\n'; }

void kateqoriya(int&)  { std::cout << "lvalue\\n"; }
void kateqoriya(int&&) { std::cout << "rvalue\\n"; }

int main() {
    int x = 5;
    kateqoriya(x);          // lvalue
    kateqoriya(10);         // rvalue
    kateqoriya(x + 1);      // rvalue
    kateqoriya(std::move(x)); // rvalue (cast)

    std::cout << "--- 1\\n";
    Sesli a("a");
    std::cout << "--- 2\\n";
    kopyaAl(a);              // kopya
    std::cout << "--- 3\\n";
    kopyaAl(std::move(a));   // move
    std::cout << "--- 4\\n";
    Sesli b = yarat();       // nə kopya, nə move
    std::cout << "--- son\\n";
}

/* Çıxış:
lvalue
rvalue
rvalue
rvalue
--- 1
ctor a
--- 2
KOPYA a
kopyaAl: a
dtor [a]
--- 3
MOVE a
kopyaAl: a
dtor [a]
--- 4
ctor temp
--- son
dtor [temp]
dtor []
*/` },
          { t: "terms", items: [
            ["lvalue", "adı olan, ünvanı götürülə bilən ifadə (x, a[0], *p)."],
            ["prvalue", "«saf» müvəqqəti dəyər (literal, x + 1, funksiyanın dəyərlə qaytardığı). C++17-dən obyekt ona qədər yaradılmır, birbaşa hədəfdə qurulur."],
            ["xvalue", "«bitməkdə olan» dəyər: std::move(x) nəticəsi. Resursu köçürülə bilər."],
            ["glvalue / rvalue", "glvalue = lvalue + xvalue, rvalue = prvalue + xvalue. Move yalnız rvalue-lara bağlanır."],
          ]},
          { t: "list", items: [
            "Hər şeyin əsasında bir qayda: adı olan hər şey lvalue-dur, hətta tipi T&& olsa belə. Funksiyaya gələn T&& parametri funksiya daxilində lvalue-dur; ötürmək üçün yenidən std::move lazımdır.",
            "Nümunənin çıxışında kopyaAl(a) KOPYA, kopyaAl(std::move(a)) MOVE göstərir; yarat() çağırışı isə heç bir kopya/move yaratmır, çünki obyekt birbaşa b-də qurulur (copy elision).",
            "Move-dan sonra a boş olur (dtor [] sətri). Obyekt məhv olunur, amma içindəki resurs artıq yoxdur; destruktoru təhlükəsiz çağırılır.",
          ]},
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
          { t: "h", text: "noexcept move, move-only tiplər və exchange" },
          { t: "p", text: "vector böyüyəndə (reallocation) köhnə yaddaşdakı elementləri yeni yaddaşa köçürməlidir. Əgər köçürmə yarıda exception atsa, köhnə vəziyyət də pozulmuş ola bilər. Bunun qarşısını almaq üçün vector yalnız move konstruktoru noexcept olduqda move edir, əks halda kopyalayır (kopya köhnəni toxunulmaz saxlayır). Aşağıdakı nümunə bu fərqi göstərir." },
          { t: "code", lang: "cpp", caption: "noexcept-in vector-a təsiri, move-only tiplər, swap", code: `#include <iostream>
#include <memory>
#include <string>
#include <utility>
#include <vector>

struct Yaxsi {
    int id;
    explicit Yaxsi(int i) : id(i) {}
    Yaxsi(const Yaxsi& o) : id(o.id) { std::cout << "  kopya " << id << '\\n'; }
    Yaxsi(Yaxsi&& o) noexcept : id(o.id) { std::cout << "  move " << id << '\\n'; }
};
struct Pis {
    int id;
    explicit Pis(int i) : id(i) {}
    Pis(const Pis& o) : id(o.id) { std::cout << "  kopya " << id << '\\n'; }
    Pis(Pis&& o) : id(o.id) { std::cout << "  move " << id << '\\n'; }   // noexcept yoxdur
};

template <typename T>
void sina(const char* ad) {
    std::cout << ad << ":\\n";
    std::vector<T> v;
    v.reserve(1);
    v.emplace_back(1);
    v.emplace_back(2);          // reallocation: köhnə element köçürülür/kopyalanır
}

int main() {
    sina<Yaxsi>("noexcept move");
    sina<Pis>("noexcept-siz move");

    // move-only tiplər vector-da
    std::vector<std::unique_ptr<int>> v;
    v.push_back(std::make_unique<int>(1));
    v.push_back(std::make_unique<int>(2));
    auto q = std::move(v[0]);
    std::cout << *q << ' ' << (v[0] == nullptr) << ' ' << *v[1] << '\\n';

    // swap move ilə işləyir
    std::string a = "birinci", b = "ikinci";
    std::swap(a, b);
    std::cout << a << ' ' << b << '\\n';

    // string move sonra
    std::string s = "cox uzun metn cox uzun metn cox uzun metn";
    std::string t = std::move(s);
    std::cout << "s olcu: " << s.size() << ", t olcu: " << t.size() << '\\n';
}

/* Çıxış:
noexcept move:
  move 1
noexcept-siz move:
  kopya 1
1 1 2
ikinci birinci
s olcu: 0, t olcu: 41
*/` },
          { t: "code", lang: "cpp", caption: "std::exchange, universal konstruktor və referans yığılması", code: `#include <iostream>
#include <string>
#include <type_traits>
#include <utility>

// std::exchange ilə qısa və təhlükəsiz move
class Tutacaq {
public:
    explicit Tutacaq(int h) : h_(h) {}
    Tutacaq(Tutacaq&& o) noexcept : h_(std::exchange(o.h_, -1)) {}
    Tutacaq& operator=(Tutacaq&& o) noexcept {
        if (this != &o) h_ = std::exchange(o.h_, -1);
        return *this;
    }
    Tutacaq(const Tutacaq&) = delete;
    Tutacaq& operator=(const Tutacaq&) = delete;
    int deyer() const { return h_; }
private:
    int h_;
};

// Universal konstruktor "oğurluğu": T&& kopya konstruktordan yaxşı uyğun gələ bilər
struct Sarici {
    std::string s;
    template <typename T>
    explicit Sarici(T&& x) : s(std::forward<T>(x)) { std::cout << "sablon ctor\\n"; }
    Sarici(const Sarici& o) : s(o.s) { std::cout << "kopya ctor\\n"; }
};

int main() {
    Tutacaq a(7);
    Tutacaq b = std::move(a);
    std::cout << a.deyer() << ' ' << b.deyer() << '\\n';   // -1 7

    Sarici x("salam");
    const Sarici y = x;                 // şablon explicit-dir: kopya-initialization-da iştirak etmir
    // Sarici z(x);                     // XƏTA: şablon (T = Sarici&) daha yaxşı uyğun gəlir
    std::cout << y.s << '\\n';

    // Referans yığılması: T&& + T = int& => int&
    int n = 1;
    int& r = n;
    auto&& u1 = r;                      // int&
    auto&& u2 = 5;                      // int&&
    static_assert(std::is_same_v<decltype(u1), int&>);
    static_assert(std::is_same_v<decltype(u2), int&&>);
    std::cout << "ok\\n";
}

/* Çıxış:
-1 7
sablon ctor
kopya ctor
salam
ok
*/` },
          { t: "list", items: [
            "std::exchange(köhnə, yeni) köhnənin dəyərini qaytarır və ona yenisini yazır. Move konstruktoru üçün ideal alətdir: h_(std::exchange(o.h_, -1)).",
            "Move-only tiplər (unique_ptr, thread, fstream) vector-a push_back(std::move(x)) və ya emplace_back ilə əlavə olunur. vector-un kopya konstruktoru bu tiplər üçün avtomatik silinir.",
            "Sinif const üzvə və ya istinad üzvə malikdirsə, defolt kopya/move təyinatı silinmiş (deleted) olur. Sinifi təyinat ilə istifadə edəndə bunu nəzərə al.",
            "Kopya və move təyinatında özünə təyinatı (this != &o) nəzərə al. Copy-and-swap idiomu bunu avtomatik həll edir.",
            "Aşağıdakı hallarda kompilyator move operasiyalarını avtomatik YARATMIR: sinifdə istifadəçi tərəfindən yazılmış destruktor, kopya konstruktor və ya kopya təyinat varsa. Bu, rule of five-in səbəbidir.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `std::string s = "salam";
std::string t = std::move(s);
std::cout << s.size();   // dəyər bilinmir, ehtimalla 0
if (s == "salam") {}     // məntiq xətası: s boş ola bilər`, right: `std::string t = std::move(s);
s = "yeni";              // yenidən təyin et
// və ya s.clear(); s artıq istifadə olunmur`, why: "Standart moved-from standart kitabxana obyektlərini «etibarlı, lakin qeyri-müəyyən» vəziyyətdə saxlayır. Onu yenidən təyin etmək, clear() və ya məhv etmək olar; dəyər haqqında fərziyyə etmək olmaz." },
          { t: "mistake", lang: "cpp", wrong: `void qoy(const std::string& s) {
    ad_ = std::move(s);   // s const: move yox, kopya
}`, right: `void qoy(std::string s) {
    ad_ = std::move(s);   // həqiqi move
}`, why: "const obyektdən std::move const T&& verir; move konstruktoru const olmayan T&& tələb edir, ona görə kopya konstruktoru seçilir. Kod move kimi görünür, amma kopyalayır." },
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
            ["lvalue, prvalue və xvalue arasındakı fərq?", "lvalue: adı/ünvanı var. prvalue: saf müvəqqəti dəyər (literal, dəyərlə qaytarma). xvalue: resursu köçürülə bilən bitən obyekt (std::move nəticəsi). Move yalnız rvalue (prvalue və xvalue) ilə bağlanır."],
            ["Referans yığılması nədir?", "Referansa referans formalaşanda qayda: yalnız T&& && -> T&&, qalan hamısı T&. Forwarding referansın işləməsinin əsasıdır."],
            ["Universal referans və rvalue referans fərqi?", "T&& deduksiya olunan şablon parametridirsə forwarding referansdır (hər şeyə bağlanır), konkret tipdirsə (std::string&&) yalnız rvalue-ya bağlanır."],
            ["Niyə sarğı funksiyada std::forward lazımdır?", "Adlı parametr lvalue-dur. forward arqumentin orijinal dəyər kateqoriyasını bərpa edir ki, hədəf funksiya move və ya kopya overload-unu düzgün seçsin."],
            ["Moved-from obyektdə hansı əməliyyatlar təhlükəsizdir?", "Məhv etmək və yenidən təyin etmək. İçərisindəki dəyəri oxumaq standart tiplər üçün «qeyri-müəyyən» sayılır; öz siniflərində hansı vəziyyətə düşdüyünü sənədləşdir."],
            ["Return std::move(x) niyə pis, amma return std::move(m.field) lazım ola bilər?", "Lokal dəyişən üçün sadə return avtomatik move/elision verir. Üzv, parametr (R&&) və ya forwarding referans üçün isə avtomatik move yoxdur, orada açıq move lazım ola bilər."],
          ]},
          { t: "h", text: "Forwarding reference, referans yığılması və universal konstruktor tələsi" },
          { t: "p", text: "Şablonda T&& «universal» (forwarding) referansdır: arqument lvalue-dursa T = X& çıxır, rvalue-dursa T = X. Referans yığılması qaydası: X& && -> X&, X&& && -> X&&. Yəni lvalue-dan alınan T&& lvalue-referansına çevrilir. std::forward<T>(x) də bu qaydadan istifadə edir: T lvalue-referansdırsa lvalue, əks halda rvalue qaytarır." },
          { t: "code", lang: "cpp", caption: "forward ilə forward-sız fərq, decltype(auto) sarğı", code: `#include <functional>
#include <iostream>
#include <string>
#include <type_traits>
#include <utility>

void isle(const std::string&) { std::cout << "const& (kopya yolu)\\n"; }
void isle(std::string&&)      { std::cout << "&& (move yolu)\\n"; }

// Düzgün: forward kateqoriyanı saxlayır
template <typename T>
void duzgun(T&& x) { isle(std::forward<T>(x)); }

// Səhv: adlı istinad həmişə lvalue-dur
template <typename T>
void sehv(T&& x) { isle(x); }

// T-nin nə çıxdığını göstər
template <typename T>
void tipGoster(T&&) {
    if constexpr (std::is_lvalue_reference_v<T>) std::cout << "T = lvalue istinad\\n";
    else std::cout << "T = adi tip (rvalue)\\n";
}

// Sarğı: istənilən funksiyanı çağırır, nəticəni də olduğu kimi qaytarır
template <typename F, typename... A>
decltype(auto) cagirSar(F&& f, A&&... a) {
    std::cout << "[çağırış]\\n";
    return std::invoke(std::forward<F>(f), std::forward<A>(a)...);
}

int topla(int a, int b) { return a + b; }

struct Sayici {
    int n = 0;
    int& ref() { return n; }
};

int main() {
    std::string s = "x";
    duzgun(s);                       // const& yolu
    duzgun(std::string("y"));        // && yolu
    sehv(std::string("y"));          // const& yolu (səhv!)
    tipGoster(s);
    tipGoster(std::string("z"));

    std::cout << cagirSar(topla, 2, 3) << '\\n';
    Sayici c;
    cagirSar(&Sayici::ref, c) = 99;  // decltype(auto) int& saxlayır
    std::cout << c.n << '\\n';

    // move_if_noexcept
    static_assert(std::is_nothrow_move_constructible_v<std::string>);
}

/* Çıxış:
const& (kopya yolu)
&& (move yolu)
const& (kopya yolu)
T = lvalue istinad
T = adi tip (rvalue)
[çağırış]
5
[çağırış]
99
*/` },
          { t: "list", items: [
            "Adlandırılmış T&& parametri funksiyada lvalue-dur: forward-sız onu ötürsən, həmişə kopya yolu seçilir (nümunədəki sehv()).",
            "decltype(auto) qaytarma tipi sarğıda çox vacibdir: auto istinadı düşürür (dəyər qaytarır), decltype(auto) isə orijinalın int& xüsusiyyətini saxlayır.",
            "std::invoke üzv funksiya göstəricilərini, funktorları və lambda-ları eyni sintaksislə çağırır; sarğılarda f(args...) əvəzinə std::invoke istifadə et.",
            "Universal konstruktor tələsi: template <typename T> Sarici(T&& x) kopya konstruktorunu «uda» bilər. Non-const lvalue-dan kopyalanmaq istəyəndə (Sarici y(x)) şablon const Sarici&-dən daha yaxşı uyğun gəlir və x-i string-ə çevirməyə çalışıb xəta verir. Həll: requires (!std::same_as<std::remove_cvref_t<T>, Sarici>) ilə məhdudlaşdır.",
            "T&& yalnız deduksiya olunan şablon parametri olduqda forwarding referansdır. vector<T>&& və ya sinif şablonunun üzvündə T&& adi rvalue istinadıdır. const T&& də forwarding deyil.",
            "std::move_if_noexcept(x): move konstruktoru noexcept deyilsə (və kopya mümkündürsə), lvalue qaytarır ki, kopya seçilsin. Güclü exception təminatı olan kod (vector::push_back) bunu daxildə işlədir.",
            "Sink parametr üçün üç yol: (1) dəyərlə götür və std::move et (sadə, bir əlavə move), (2) iki overload yaz (const T& və T&&, maksimum sürət), (3) forwarding şablon (çevik, amma tələlərlə). Əksər hallarda 1-ci kifayətdir.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `template <typename T>
void saxla(T&& x) {
    kolleksiya.push_back(x);           // həmişə kopya!
}`, right: `template <typename T>
void saxla(T&& x) {
    kolleksiya.push_back(std::forward<T>(x));
}`, why: "x adlı dəyişəndir, ona görə lvalue-dur. forward olmadan rvalue arqument belə kopyalanır. Forwarding referansı yalnız std::forward ilə ötürüləndə mənalıdır." },
          { t: "mistake", lang: "cpp", wrong: `template <typename T>
void f(T&& x) {
    g(std::forward<T>(x));
    h(std::forward<T>(x));   // x artıq köçürülmüş ola bilər
}`, right: `template <typename T>
void f(T&& x) {
    g(x);                    // lvalue kimi ötür (kopya/istinad)
    h(std::forward<T>(x));   // forward yalnız SON istifadədə
}`, why: "std::forward rvalue arqumenti rvalue kimi ötürür və g onu köçürə bilər. Ondan sonra h «moved-from» obyekt alır. Eyni arqumenti bir neçə dəfə istifadə edirsənsə, forward yalnız sonuncu istifadədə olmalıdır." },
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "std::move əslində nə edir?", options: ["Obyekti kopyalayır","İfadəni rvalue-ya çevirir (cast)","Yaddaşı silir"], answer: 1, why: "Köçürməni move konstruktoru edir, std::move yalnız cast-dır." },
          { t: "quiz", q: "return std::move(lokal); niyə zərərlidir?", options: ["Xəta verir","Copy elision/NRVO-nu söndürür","Heç bir fərqi yoxdur"], answer: 1, why: "Sadə return lokal; daha effektivdir." },
          { t: "quiz", q: "vector böyüyəndə elementləri kopyalamaması üçün move konstruktoru necə olmalıdır?", options: ["virtual","noexcept","static"], answer: 1, why: "Yalnız noexcept move istifadə olunur." },
        ],
      },
    ],
    exercise: {
      task: "1) `Massiv` sinfi yaz: `int* data_` və `std::size_t n_` üzvləri, konstruktor, destruktor (`delete[]`). 2) Kopya konstruktor və kopya təyinatı dərin kopya ilə yaz. 3) Move konstruktor və move təyinatı yaz — hər ikisi `noexcept`, köhnə obyektin göstəricisini `nullptr`, ölçüsünü 0 et; təyinatda özünə təyinat yoxlaması et. 4) main-də `Massiv a(5); Massiv b = std::move(a);` yaz və a-nın ölçüsünün 0 olduğunu çap et. 5) Şərhdə niyə `return std::move(lokal)` yazılmadığını izah et.",
      starter: "#include <cstddef>\n#include <iostream>\n#include <utility>\n\n// Massiv sinfi (rule of five)\n\nint main() {\n    return 0;\n}\n",
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
          { t: "h", text: "Müasir sintaksis: structured binding, std::format, visit" },
          { t: "p", text: "Müasir C++ daha az təkrar kod və daha çox ifadəlik verir. Structured binding bir neçə qiyməti birbaşa adlandırır, if/switch-ə başlanğıc şərti əlavə etmək olar, std::format printf-in təhlükəsizliyini iostream-in tip dəstəyi ilə birləşdirir, std::visit isə variant-ın hər tipi üçün ayrıca kod yazmağa imkan verir. Aşağıdakı proqram -std=c++23 ilə yoxlanılıb (std::format C++20-dir, amma kitabxananın yeni versiyası tələb olunur)." },
          { t: "code", lang: "cpp", caption: "Structured binding, if ilə başlanğıc, format, variant və visit", code: `#include <format>
#include <iostream>
#include <map>
#include <string>
#include <tuple>
#include <variant>
#include <vector>

struct Netice { int bal; std::string ad; };

std::tuple<int, double> hesabla() { return {3, 2.5}; }

// std::visit üçün overloaded köməkçisi
template <typename... F> struct Overloaded : F... { using F::operator()...; };
template <typename... F> Overloaded(F...) -> Overloaded<F...>;

int main() {
    // Structured binding
    Netice n{95, "Leyla"};
    auto [bal, ad] = n;
    std::cout << ad << ' ' << bal << '\\n';

    auto [i, d] = hesabla();
    std::cout << i << ' ' << d << '\\n';

    std::map<std::string, int> yas{{"Aysel", 20}, {"Murad", 25}};
    for (const auto& [isim, y] : yas) std::cout << isim << '=' << y << ' ';
    std::cout << '\\n';

    // if ilə başlanğıc
    if (auto it = yas.find("Murad"); it != yas.end()) {
        std::cout << "tapildi: " << it->second << '\\n';
    }

    // std::format
    std::cout << std::format("{} {:>6.2f} {:05d} {:x}\\n", "ad", 3.14159, 42, 255);

    // variant + visit
    std::variant<int, double, std::string> v = 2.5;
    std::visit(Overloaded{
        [](int x)                { std::cout << "int " << x << '\\n'; },
        [](double x)             { std::cout << "double " << x << '\\n'; },
        [](const std::string& x) { std::cout << "string " << x << '\\n'; },
    }, v);

    // string_view-ın təhlükəsiz tərəfi
    std::string_view sv = "salam dunya";
    std::cout << sv.substr(0, 5) << ' ' << sv.size() << '\\n';
}

/* Çıxış:
Leyla 95
3 2.5
Aysel=20 Murad=25 
tapildi: 25
ad   3.14 00042 ff
double 2.5
salam 11
*/` },
          { t: "list", items: [
            "auto [a, b] = ifadə; strukturun, cütün, tuple-ın və massivin üzvlərini ayrı adlarla verir. auto& ilə kopya etmədən istinad götürə bilərsən.",
            "if (auto it = m.find(k); it != m.end()) — it yalnız if/else daxilində görünür. Dəyişən ömrünü daraldır.",
            "std::format('{:>6.2f}') yerləşdirmə, dəqiqlik və formatı tip təhlükəsiz yoxlayır. Format sətri kompilyasiya vaxtı yoxlanır, səhv spesifikator kompilyasiya xətasıdır.",
            "std::variant-da visit hər tip üçün handler tələb edir: birini unutsan kompilyasiya xətası alırsan. Bu, if-else zəncirindən (unudulan tip səssiz keçilir) daha təhlükəsizdir.",
            "Overloaded köməkçisi lambda-ları bir funktora yığır: using F::operator()...; C++17 xüsusiyyətidir.",
          ]},
          { t: "tip", text: "Yeni kitabxana tiplərini kiçik funksiyalarda sına: optional qaytarma, span parametri, string_view parametri, variant vəziyyət. Çoxu mövcud kodu dəyişmədən yaxşılaşdırır." },
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
          { t: "h", text: "Atomics: memory order, release/acquire, condition_variable" },
          { t: "p", text: "Atomik əməliyyat bölünməzdir, amma ən vacib sual sıralamadır: bir thread-in yazması digərinə hansı ardıcıllıqla görünür? Kompilyator və prosessor əməliyyatları yenidən sıralaya bilər. memory_order bu azadlığı tənzimləyir. Defolt memory_order_seq_cst ən güclü və ən yavaş variantdır: bütün thread-lər üçün vahid qlobal sıra. memory_order_relaxed yalnız atomikliyi təmin edir, sıralamanı yox (məs. sadə sayğac). Release/acquire cütü isə klassik «publikasiya» modelidir: release yazma, ondan əvvəlki bütün yazmaları acquire ilə həmin dəyəri oxuyan thread-ə görünən edir." },
          { t: "code", lang: "cpp", caption: "release/acquire, condition_variable, jthread, relaxed sayğac, CAS", code: `#include <atomic>
#include <condition_variable>
#include <iostream>
#include <mutex>
#include <queue>
#include <thread>

int melumat = 0;
std::atomic<bool> hazir{false};

void istehsalci() {
    melumat = 42;                                   // 1) adi yazma
    hazir.store(true, std::memory_order_release);   // 2) release: əvvəlki yazmalar görünür
}
void istehlakci() {
    while (!hazir.load(std::memory_order_acquire)) {}   // acquire: release ilə cütləşir
    std::cout << "melumat = " << melumat << '\\n';        // həmişə 42
}

std::mutex m;
std::condition_variable cv;
std::queue<int> novbe;
bool bitdi = false;

void yazan() {
    for (int i = 1; i <= 3; ++i) {
        { std::lock_guard<std::mutex> k(m); novbe.push(i * 10); }
        cv.notify_one();
    }
    { std::lock_guard<std::mutex> k(m); bitdi = true; }
    cv.notify_one();
}
void oxuyan() {
    std::unique_lock<std::mutex> k(m);
    while (true) {
        cv.wait(k, [] { return !novbe.empty() || bitdi; });   // spurious wakeup-a qarşı predikat
        while (!novbe.empty()) { std::cout << "aldi: " << novbe.front() << '\\n'; novbe.pop(); }
        if (bitdi) break;
    }
}

int main() {
    std::thread a(istehlakci), b(istehsalci);
    a.join(); b.join();

    std::thread y(yazan), o(oxuyan);
    y.join(); o.join();

    // C++20 jthread: destruktorda avtomatik join
    {
        std::jthread j([] { std::cout << "jthread isledi\\n"; });
    }

    // Kilidsiz say: relaxed yetərlidir, çünki sıralama lazım deyil
    std::atomic<int> say{0};
    std::thread t1([&] { for (int i = 0; i < 1000; ++i) say.fetch_add(1, std::memory_order_relaxed); });
    std::thread t2([&] { for (int i = 0; i < 1000; ++i) say.fetch_add(1, std::memory_order_relaxed); });
    t1.join(); t2.join();
    std::cout << say.load() << '\\n';

    // compare_exchange: CAS dövrü
    std::atomic<int> x{5};
    int gozlenen = 5;
    bool ok = x.compare_exchange_strong(gozlenen, 9);
    std::cout << ok << ' ' << x.load() << '\\n';
    ok = x.compare_exchange_strong(gozlenen, 11);   // gozlenen=9 oldu, uğursuz
    std::cout << ok << ' ' << gozlenen << '\\n';
}

/* Çıxış:
melumat = 42
aldi: 10
aldi: 20
aldi: 30
jthread isledi
2000
1 9
0 9
*/` },
          { t: "list", items: [
            "release/acquire: yazan thread istehsalçıdır, flag-i release ilə yazır; oxuyan acquire ilə oxuyur. Flag true gələndə flag-dən əvvəlki bütün yazmalar (melumat = 42) görünür. Bu sıra olmasa, melumat-ın köhnə dəyəri oxuna bilərdi.",
            "relaxed: sıralama zəmanəti yoxdur, amma atomiklik var. Yalnız sayğac, statistika kimi yerlərdə, nəticə sonda join ilə sinxronlaşanda istifadə et.",
            "compare_exchange_strong/weak: «gözlənilən dəyər isə yenisi ilə əvəz et». Uğursuz olanda gözlənilən dəyəri cari dəyərə yeniləyir. Kilidsiz alqoritmlərin əsasıdır. weak yalandan uğursuz ola bilər (dövr içində daha sürətlidir).",
            "condition_variable ilə həmişə predikat istifadə et: cv.wait(kilid, []{ return şərt; }). Spurious wakeup (səbəbsiz oyanma) və itirilmiş bildirişdən qoruyur.",
            "std::jthread (C++20) destruktorda avtomatik join edir və stop_token dəstəkləyir. std::thread isə join/detach olunmadan məhv olsa std::terminate çağırır.",
            "std::scoped_lock bir neçə mutex-i deadlock olmadan eyni anda kilidləyir: std::scoped_lock l(m1, m2). Mutex-ləri əl ilə fərqli sırada kilidləmək deadlock yaradır.",
            "False sharing: iki thread ayrı dəyişənlərə yazır, amma onlar eyni 64 baytlıq cache line-dadır; nüvələr bir-birini sıxışdırır. Həll: alignas(64) və ya padding. Aşağıdakı senior bölməsində sizeof nümunəsinə bax.",
            "volatile thread təhlükəsizliyi vermir! C++-da volatile yalnız xüsusi (hardware) yaddaş üçündür. Thread-lər arası dəyişənlər üçün atomic və ya mutex.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `int say = 0;
std::mutex m1, m2;
// thread A: m1.lock(); m2.lock();
// thread B: m2.lock(); m1.lock();   // deadlock`, right: `std::mutex m1, m2;
{
    std::scoped_lock kilid(m1, m2);   // deadlock-sız alqoritm
    // ...
}`, why: "İki thread eyni iki mutex-i əks sırada kilidləsə, hər biri digərinin açmasını gözləyir və proqram donur. scoped_lock bir neçə mutex-i deadlock-dan qoruyan alqoritmlə kilidləyir (həm də RAII ilə buraxır)." },
          { t: "mistake", lang: "cpp", wrong: `bool hazir = false;                 // adi bool
std::thread t([&]{ while (!hazir) {} });
hazir = true;                       // data race + optimizasiya sonsuz dövr`, right: `std::atomic<bool> hazir{false};
std::thread t([&]{ while (!hazir.load(std::memory_order_acquire)) {} });
hazir.store(true, std::memory_order_release);
t.join();`, why: "Adi bool iki thread arasında data race-dir. Kompilyator dəyəri registerdə saxlayıb dövrü sonsuz edə bilər. Atomic həm bölünməzliyi, həm də görünürlük zəmanətini verir." },
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
            ["Concepts, ranges, coroutines və modules nədir?", "Concepts: şablon tələbləri. Ranges: tənbəl, birləşdirilən alqoritmlər. Coroutines: co_await/co_yield ilə dayandırıla bilən funksiyalar. Modules: başlıq faylları əvəzinə import."],
            ["std::expected exception-dan nə ilə fərqlənir?", "Xəta tipin içindədir və qaytarma dəyəri kimi ötürülür; xəta yolu runtime-da proqnozlaşdırıla bilən və sürətlidir. Çağıran xətanı yoxlamağa məcburdur. Exception isə nadir istisnalar üçün və qaytarma yolunu təmiz saxlayır."],
            ["memory_order_relaxed nə vaxt istifadə olunur?", "Yalnız atomiklik lazımdır, sıralama yox: statistik sayğaclar, ID generatorları. Digər dəyişənlərin görünürlüyü ilə bağlıdırsa acquire/release lazımdır."],
            ["release/acquire cütü nə təmin edir?", "Release yazmadan əvvəlki bütün yazmalar, həmin atomik dəyəri acquire ilə oxuyan thread-ə görünür (happens-before əlaqəsi). Kilidsiz məlumat ötürməsinin əsasıdır."],
            ["False sharing nədir?", "Fərqli thread-lərin yazdığı müxtəlif dəyişənlər eyni cache line-dadırsa, nüvələr line-ı bir-birindən alır və performans kəskin düşür. Həll: alignas(64), padding, thread-local toplama."],
            ["constexpr, consteval və constinit fərqi?", "constexpr: kompilyasiya vaxtı hesablana bilər (runtime-da da işləyə bilər). consteval: yalnız kompilyasiya vaxtı. constinit: statik dəyişənin kompilyasiya vaxtı başlanğıc dəyəri olmasını tələb edir (dəyişən sonra dəyişə bilər)."],
            ["Niyə vector çox vaxt list-dən sürətlidir, nəzəri O(1) əlavəyə baxmayaraq?", "vector ardıcıl yaddaşdadır, cache və prefetcher effektiv işləyir. list hər düyün üçün ayrı ayırma və göstərici izləmə tələb edir, cache buraxmaları ilə ölçüdə yeyilir. Kiçik və orta ölçüdə vector demək olar həmişə qalib gəlir."],
          ]},
          { t: "h", text: "Müasir C++ (17/20/23): ranges, expected, consteval, alignas" },
          { t: "p", text: "C++20 və C++23 dilə dörd böyük dəyişiklik gətirdi: concepts (şablon məhdudiyyətləri), ranges (tənbəl, kompozisiya olunan alqoritmlər), coroutines (dayandırıla bilən funksiyalar) və modules (#include-un əvəzi). C++23 bunun üzərinə std::expected, std::print, deducing this və flat_map kimi əlavələr gətirib. Aşağıdakı nümunədə ranges, expected, consteval və alignas bir yerdədir; kod -std=c++23 ilə yoxlanıb." },
          { t: "code", lang: "cpp", caption: "expected, consteval, ranges və alignas", code: `#include <algorithm>
#include <expected>
#include <iostream>
#include <ranges>
#include <string>
#include <vector>

// C++23 std::expected: xəta də tipin içindədir
std::expected<int, std::string> parse(const std::string& s) {
    try {
        std::size_t pos{};
        int n = std::stoi(s, &pos);
        if (pos != s.size()) return std::unexpected("artiq simvol var");
        return n;
    } catch (...) {
        return std::unexpected("eded deyil");
    }
}

// consteval: yalnız kompilyasiya vaxtı
consteval int kvadrat(int x) { return x * x; }

// alignas: false sharing-in qarşısı
struct alignas(64) Sayici { long n = 0; };

int main() {
    for (const char* s : {"123", "12x", "abc"}) {
        auto r = parse(s);
        if (r) std::cout << "OK " << *r << '\\n';
        else   std::cout << "XETA " << r.error() << '\\n';
    }
    std::cout << parse("5").transform([](int x) { return x * 2; }).value_or(-1) << '\\n';

    constexpr int k = kvadrat(7);
    std::cout << k << '\\n';

    // ranges: tənbəl (lazy) boru xətti
    std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    auto netice = v
        | std::views::filter([](int x) { return x % 2 == 0; })
        | std::views::transform([](int x) { return x * x; });
    for (int x : netice) std::cout << x << ' ';
    std::cout << '\\n';

    std::ranges::sort(v, std::greater{});
    std::cout << v.front() << ' ' << v.back() << '\\n';

    std::cout << sizeof(Sayici) << ' ' << alignof(Sayici) << '\\n';
}

/* Çıxış:
OK 123
XETA artiq simvol var
XETA eded deyil
10
49
4 16 36 64 
8 1
64 64
*/` },
          { t: "terms", items: [
            ["std::expected<T, E>", "C++23: ya dəyər T, ya da xəta E saxlayır. Exception-un əvəzinə, performansı proqnozlaşdırıla bilən xəta ötürməsi."],
            ["views", "tənbəl (lazy) baxışlar: filter, transform, take, drop. Heç bir ara konteyner yaranmır, hesablama dövr zamanı baş verir."],
            ["consteval", "funksiyanın mütləq kompilyasiya vaxtı çağırılmasını tələb edir (constexpr isə runtime-da da işləyə bilər)."],
            ["alignas(N)", "tipin hizalanmasını N bayt edir. Cache line (adətən 64) hizalanması false sharing-i önləyir."],
            ["coroutine", "co_await / co_yield / co_return ilə dayandırılıb davam etdirilən funksiya. Generator, asinxron kod üçün; standart kitabxana yalnız əsas mexanizmi verir (C++23-ün std::generator-u istisna)."],
          ]},
          { t: "list", items: [
            "ranges::sort(v) alqoritmləri bütün konteynerlə çağırmaq imkanı verir (begin/end yazmaq lazım deyil) və projections dəstəkləyir: ranges::sort(isciler, {}, &Isci::maas).",
            "views::filter | views::transform boru xətti heç bir müvəqqəti vector yaratmır. Diqqət: view mənbə konteynerdən asılıdır; mənbə ölsə, view asılı qalır (string_view kimi).",
            "expected exception-lardan fərqli olaraq xərc yaratmır: xəta hər zaman qaytarma dəyəridir. Bu, tez-tez uğursuz olan əməliyyatlarda (parsing, giriş) exception-dan çox sürətlidir. Nadir, həqiqətən istisna hallar üçün exception qalır.",
            "std::print/println (C++23) format ilə birlikdə iostream-i əvəz edir: std::println('Salam {}', ad). Daha sürətli və Unicode-dostdur.",
            "Deducing this (C++23): üzv funksiyada explicit this parametri const/non-const, lvalue/rvalue üçün təkrar yazmağı aradan qaldırır.",
            "Modules: import std; build vaxtını əhəmiyyətli azaldır, amma alətlər (CMake, kompilyator) hələ tam yetişməyib. Böyük layihələrdə mərhələli keç.",
            "Three-way müqayisə (<=>, spaceship): auto operator<=>(const T&) const = default; bütün 6 müqayisə operatorunu yaradır.",
          ]},
          { t: "h", text: "Performans və profilləmə" },
          { t: "list", items: [
            "Optimizasiyadan əvvəl ölç. Alətlər: perf, VTune, Valgrind callgrind, Tracy, Google Benchmark. Çox vaxt darboğaz təxmin etdiyin yer olmur.",
            "Alqoritmik mürəkkəblik adətən mikro-optimizasiyadan daha vacibdir. Sonra məlumat strukturunun yaddaş yerləşməsi (cache locality): vector, flat_map, struct-of-arrays.",
            "Link-time optimization (-flto) və profile-guided optimization (PGO) ilə kompilyator bütün proqram boyu inline və budaqlanma qərarları verir; 5-20% qazanc mümkündür.",
            "Benchmark tələləri: kompilyator nəticəsi istifadə olunmayan kodu silir (dead code elimination). benchmark::DoNotOptimize(x) və ya nəticəni oxumaq lazımdır. Həmişə -O2/-O3 ilə ölç, Debug build-də yox.",
            "Yaddaş ayırması bahalıdır: reserve() ilə əvvəlcədən ayır, kiçik string optimizasiyası (SSO) və std::pmr (polymorphic memory resources) ilə arena/pool allocator istifadə et.",
            "Branch prediction: gözlənilməz budaqlar bahalıdır. Sıralanmış məlumat üzərində şərt çox vaxt sürətli işləyir. [[likely]]/[[unlikely]] (C++20) kompilyatora ipucu verir, amma ölçmədən istifadə etmə.",
            "Copy elision və move-u pozma: return std::move(x), lazımsız const_cast, və uzun ömürlü shared_ptr kopyaları ən çox rast gəlinən performans zədələridir.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v = {1, 2, 3};
for (int x : v) {
    if (x == 2) v.push_back(4);   // iterator etibarsızlaşır -> UB
}`, right: `std::vector<int> v = {1, 2, 3};
std::vector<int> elave;
for (int x : v) {
    if (x == 2) elave.push_back(4);
}
v.insert(v.end(), elave.begin(), elave.end());`, why: "push_back reallocation edə bilər və bütün iterator/referansları etibarsız edir. Konteyneri dövr zamanı dəyişmə; dəyişiklikləri ayrıca saxlayıb sonra tətbiq et. Hər konteynerin hansı əməliyyatla iterator-ları etibarsız etdiyini bil (cppreference-də «iterator invalidation»)." },
          { t: "mistake", lang: "cpp", wrong: `auto cutler() {
    std::vector<int> v{1, 2, 3, 4};
    return v | std::views::filter([](int x) { return x % 2 == 0; });
}   // v ölür, qaytarılan view asılı qalır`, right: `std::vector<int> cutler() {
    std::vector<int> v{1, 2, 3, 4};
    std::vector<int> n;
    for (int x : v | std::views::filter([](int x) { return x % 2 == 0; })) n.push_back(x);
    return n;     // sahib dəyər qaytarılır
}`, why: "View sahib deyil: mənbə konteyner view-dan uzun yaşamalıdır. Lokal konteynerin view-nu qaytarmaq string_view kimi asılı göstərici (use-after-free) yaradır. Nəticəni vector-a yığıb sahib tip qaytar." },
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı alət data race-i tutur?", options: ["ASan","TSan","UBSan"], answer: 1, why: "ThreadSanitizer (TSan) thread xətaları üçündür." },
          { t: "quiz", q: "string_view funksiyadan lokal std::string üçün qaytarılsa nə olur?", options: ["Təhlükəsiz kopya","Asılı göstərici (use-after-free)","Kompilyator xətası"], answer: 1, why: "View sahib deyil, lokal string ölür." },
          { t: "quiz", q: "Struct sahələrinin sırası ölçüyə təsir edirmi?", options: ["Xeyr","Bəli, padding səbəbindən","Yalnız release-də"], answer: 1, why: "Hizalama (alignment) üçün boşluq əlavə olunur; böyükdən kiçiyə düzmək ölçünü azaldır." },
        ],
      },
    ],
    exercise: {
      task: "1) `std::optional<int> tapIndeks(std::span<const int> v, int x)` funksiyasını yaz. 2) `std::size_t tehlukesizCarp(...)` əvəzinə `std::optional<std::size_t>` qaytaran overflow-yoxlayan vurma funksiyası yaz. 3) `std::atomic<int>` sayğacını 4 `std::thread` ilə artır, `join` et və nəticəni çap et. 4) Şərhdə `g++` əmrini ASan və UBSan bayraqları ilə yaz. 5) Şərhdə `string_view`-in lokal string üçün niyə qaytarılmamalı olduğunu izah et.",
      starter: "#include <atomic>\n#include <cstddef>\n#include <iostream>\n#include <limits>\n#include <optional>\n#include <span>\n#include <thread>\n#include <vector>\n\n// tapIndeks, tehlukesizCarp\n\nint main() {\n    return 0;\n}\n",
      expect: "tapIndeks std::optional<int> və std::span<const int> ilə, tapılmasa std::nullopt; tehlukesizCarp-da b > max / a yoxlaması və nullopt; std::atomic<int> və 4 std::thread, hamısı join olunur, nəticə 4*N; şərhdə g++ -fsanitize=address,undefined əmri; şərhdə string_view lokal string üçün asılı göstərici izahı; kod kompilyasiya olunan C++20.",
    },
  },
];
