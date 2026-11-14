import type { Lesson } from "../types";

export const cppC: Lesson[] = [
  {
    slug: "yaddas",
    title: "Dinamik yaddaş: new/delete",
    intro: "C++-da yaddası özün idarə edə bilərsən: new ilə ayırır, delete ilə qaytarırsan. Bu güc böyük məsuliyyətdir — səhv olsa, sızma, çökmə və təhlükəsizlik boşluğu yaranır.",
    sections: [
      {
        level: "baslangic",
        title: "Stack, heap və new/delete",
        blocks: [
          { t: "analogy", text: "Stack — masanın üstü: kiçik, sürətli, iş bitən kimi özü təmizlənir. Heap — anbar: böyük və ixtiyari müddətə saxlayır, amma götürdüyün qutunu özün geri qaytarmalısan. Qaytarmasan, anbar yavaş-yavaş dolur (yaddaş sızması)." },
          { t: "code", lang: "cpp", code: `#include <iostream>

int main() {
    int a = 10;                  // stack: funksiya bitəndə avtomatik silinir

    int* p = new int(42);        // heap: bir int ayır, dəyəri 42
    std::cout << *p << "\\n";
    delete p;                    // yaddaşı qaytar
    p = nullptr;                 // «asılı göstərici» qalmasın

    int n = 5;
    int* massiv = new int[n]{1, 2, 3, 4, 5};   // heap-də 5 int
    for (int i = 0; i < n; ++i) {
        std::cout << massiv[i] << " ";
    }
    std::cout << "\\n";
    delete[] massiv;             // new[] üçün MÜTLƏQ delete[]
    massiv = nullptr;

    std::cout << a << "\\n";
    return 0;
}` },
          { t: "terms", items: [
            ["stack (çağırış yığını)", "yerli dəyişənlər üçün sürətli, ölçüsü məhdud (adətən 1–8 MB) yaddaş."],
            ["heap (yığın/dinamik yaddaş)", "icra zamanı ayrılan, ömrünü özünün idarə etdiyi böyük yaddaş."],
            ["new / delete", "bir obyekt ayır / sil. Massiv üçün new[] / delete[]."],
            ["göstərici (pointer)", "yaddaş ünvanını saxlayan dəyişən; boş ünvan nullptr ilə yazılır."],
            ["yaddaş sızması (memory leak)", "ayrılıb heç vaxt qaytarılmayan yaddaş."],
          ]},
          { t: "tip", text: "Qızıl qayda: hər new üçün tam bir delete, hər new[] üçün tam bir delete[]. Müasir C++-da isə əvvəlcə new/delete əvəzinə std::vector və ağıllı göstəricilər (smart pointer) düşün." },
        ],
      },
      {
        level: "orta",
        title: "Klassik səhvlər: sızma, double free, use-after-free",
        blocks: [
          { t: "p", text: "Dinamik yaddaşın dörd klassik xətası var. Hamısı kompilyasiyadan keçir, amma proqramı çökdürə və ya sındıra bilər." },
          { t: "code", lang: "cpp", caption: "Sızma: erkən çıxışda delete işləmir", code: `#include <iostream>
#include <stdexcept>

void emal(int n) {
    int* data = new int[n];
    if (n > 100) {
        throw std::runtime_error("çox böyükdür");   // delete[] heç vaxt çağırılmır → sızma
    }
    data[0] = 1;
    delete[] data;
}` },
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: aşağıdakı kod undefined behavior (UB) ehtiva edir
int* p = new int(5);
delete p;
delete p;          // double free: eyni yaddaş iki dəfə silinir`, right: `int* p = new int(5);
delete p;
p = nullptr;       // nullptr-ı silmək təhlükəsizdir (heç nə etmir)
delete p;`, why: "İkinci delete artıq azad edilmiş yaddaşı silir: heap strukturu pozulur, proqram çöküb və ya hakerə istismar imkanı verə bilər. Silən kimi göstəricini nullptr et." },
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — use-after-free
int* p = new int(7);
delete p;
std::cout << *p << "\\n";   // silinmiş yaddaşı oxuyur`, right: `int* p = new int(7);
std::cout << *p << "\\n";
delete p;
p = nullptr;               // sonra *p yazmaq dərhal çökər, səssiz səhv olmaz`, why: "Silinmiş yaddaş artıq başqasına verilmiş ola bilər. Oxumaq zibil, yazmaq isə başqa obyekti pozur. nullptr isə səhvi aydın göstərir." },
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — uyğunsuz cüt
int* a = new int[10];
delete a;          // new[] üçün delete[] lazımdır`, right: `int* a = new int[10];
delete[] a;`, why: "new[] massivin ölçüsünü və destruktorları izləyir. Adi delete bunu bilmir — yaddaşı pozur. Cütlər: new↔delete, new[]↔delete[]." },
          { t: "list", items: [
            "Sızma: ayır, amma qaytarma (xüsusən return, throw və ya continue ilə erkən çıxışda).",
            "Double free: eyni göstəricini iki dəfə silmək (adətən iki yerdə «sahib» olduqda).",
            "Use-after-free: sildikdən sonra istifadə (asılı göstərici — dangling pointer).",
            "Heap overflow: ayrılmış sərhəddən kənara yazmaq (aşağıda senior hissədə).",
          ]},
        ],
      },
      {
        level: "senior",
        title: "Daxildə necə işləyir, alətlər və təhlükəsizlik",
        blocks: [
          { t: "p", text: "new iki iş görür: operator new ilə xam yaddaş ayırır (adətən malloc üzərindən), sonra konstruktoru çağırır. delete əksinə: əvvəl destruktor, sonra yaddaşı qaytarmaq. Ayrılan hər blokun yanında allokatorun gizli metadata-sı (ölçü, növbəti blok) durur — buna görə kənara yazmaq allokatoru pozur." },
          { t: "list", items: [
            "Heap ayırma stack-dən yüzlərlə dəfə yavaş ola bilər (kilid, axtarış, fraqmentasiya). Kiçik, qısa ömürlü obyektlər üçün stack seç.",
            "Böyük massivi stack-də elan etmə (int a[10000000]) — stack overflow. Heap və ya std::vector işlət.",
            "new uğursuz olarsa std::bad_alloc atır; new(std::nothrow) isə nullptr qaytarır.",
            "Sızmanı tapmaq: valgrind --leak-check=full ./proqram (Linux), və ya g++ -fsanitize=address -g (AddressSanitizer). ASan use-after-free, double free və heap overflow-u icra zamanı tutur.",
            "Təhlükəsizlik — heap buffer overflow: ayrılan massivdən kənara yazmaq ən çox istismar olunan boşluqlardandır (kod icrası, məlumat sızması).",
            "Təhlükəsizlik — integer overflow: new int[n * m] hesablanarkən n*m dövrə vurub kiçik ədəd ola bilər, nəticədə kiçik bufer ayrılır, sonra isə böyük yazılır. Ölçüləri yoxla.",
            "Təhlükəsizlik — use-after-free: hücumçu silinmiş yaddaşın yerinə öz məlumatını yerləşdirib virtual funksiya göstəricisini ələ keçirə bilər.",
            "Təhlükəsizlik — sirri (parol, açar) heap-də saxlayırsansa, silməzdən əvvəl sıfırla (compilerin optimize edib atmaması üçün OS-in secure zero funksiyası).",
            "Əsl həll — RAII: yaddaşın ömrünü obyektə bağla. Destruktor avtomatik çağırıldığı üçün istisna zamanı da təmizlik baş verir.",
          ]},
          { t: "code", lang: "cpp", caption: "Əl ilə idarə → RAII", code: `#include <iostream>
#include <memory>
#include <stdexcept>
#include <vector>

struct Sorgu {
    int id;
    explicit Sorgu(int i) : id(i) { std::cout << "yarandı " << id << "\\n"; }
    ~Sorgu() { std::cout << "silindi " << id << "\\n"; }
};

void emal(int n) {
    auto s = std::make_unique<Sorgu>(n);       // sahib: s. Scope bitəndə avtomatik delete
    std::vector<int> bufer(static_cast<std::size_t>(n), 0);   // massiv əvəzinə vector
    if (n > 100) {
        throw std::runtime_error("çox böyükdür");   // istisna olsa da sızma YOXDUR
    }
    bufer.at(0) = n;                           // at() sərhəddi yoxlayır
}

int main() {
    try {
        emal(5);
        emal(500);
    } catch (const std::exception& e) {
        std::cout << "xəta: " << e.what() << "\\n";
    }
    return 0;
}` },
          { t: "p", text: "Aşağıdakı nümunə yalnız nümayiş üçündür — heap overflow-u göstərir və heç vaxt belə yazılmamalıdır." },
          { t: "code", lang: "cpp", caption: "DİQQƏT: aşağıdakı kod UB-dir (yalnız öyrənmək üçün)", code: `// ZƏİF: ölçü yoxlanmır (#include <cstring>, <string> lazımdır)
void kopyala(const char* menbe) {
    char* bufer = new char[8];
    std::strcpy(bufer, menbe);     // menbe 8 simvoldan uzundursa heap overflow
    delete[] bufer;
}

// TƏHLÜKƏSİZ: std::string ölçünü özü idarə edir
void kopyalaDuz(const std::string& menbe) {
    std::string bufer = menbe;
}` },
          { t: "qa", items: [
            ["Stack və heap fərqi nədir?", "Stack avtomatik, sürətli, kiçikdir və LIFO işləyir; heap əl ilə idarə olunur, böyükdür, ayırma yavaşdır və fraqmentasiya ola bilər."],
            ["delete və delete[] fərqi?", "delete bir obyekti silir, delete[] massivdəki hər elementin destruktorunu çağırıb bütün bloku qaytarır. Uyğunsuz istifadə UB-dir."],
            ["Double free niyə təhlükəlidir?", "Heap metadata-sını pozur; hücumçu bunu yaddaş yazma primitivinə çevirə bilər. Həmçinin proqram çökür."],
            ["Yaddaş sızmasını necə tapırsan?", "Valgrind, AddressSanitizer (LeakSanitizer); kodda isə RAII ilə sızmanın qarşısını əvvəlcədən alırsan."],
            ["RAII nədir?", "Resursun alınması konstruktorda, buraxılması destruktorda olur. Scope bitəndə (istisna daxil) təmizlik avtomatikdir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "new int[10] ilə ayrılan yaddaş necə silinir?", options: ["delete a;", "delete[] a;", "free(a) və ya delete — fərqi yoxdur"], answer: 1, why: "new[] üçün delete[] istifadə olunmalıdır." },
          { t: "quiz", q: "Silinmiş göstərici vasitəsilə yaddaşı oxumaq nədir?", options: ["Təhlükəsiz, dəyər 0 olur", "Use-after-free (undefined behavior)", "Kompilyasiya xətası"], answer: 1, why: "Silinmiş yaddaşa müraciət UB-dir və təhlükəsizlik boşluğudur." },
          { t: "quiz", q: "Hansı alət heap səhvlərini icra zamanı tutur?", options: ["AddressSanitizer", "std::cout", "#pragma once"], answer: 0, why: "g++ -fsanitize=address use-after-free, double free və overflow-u aşkarlayır." },
        ],
      },
    ],
    exercise: {
      task: "Aşağıdakı proqramı yaz: 1) istifadəçidən `n` oxu (n > 0 və n <= 1000 yoxla). 2) `new int[n]` ilə massiv ayır və 1..n ədədləri ilə doldur. 3) cəmi çap et. 4) `delete[]` ilə sil və göstəricini nullptr et. 5) Sonra eyni işi `std::vector<int>` ilə yaz və şərhdə hansının daha təhlükəsiz olduğunu izah et.",
      starter: `#include <iostream>\n#include <vector>\n\nint main() {\n    // 1) n oxu və yoxla\n    // 2) new[] ilə massiv\n    // 3) vector variantı\n    return 0;\n}\n`,
      expect: "n oxunur və 1..1000 aralığı yoxlanır; new int[n] ayrılır, dövrlə doldurulur, cəm hesablanır; delete[] (delete yox) çağırılır və göstərici nullptr olur; double free və use-after-free yoxdur; std::vector<int> variantı eyni nəticəni verir; şərhdə vector/RAII-nin sızma və sərhəd səhvlərinə qarşı daha təhlükəsiz olduğu izah olunur.",
    },
  },
  {
    slug: "sinifler",
    title: "Siniflər və obyektlər",
    intro: "Sinif (class) məlumatı və onu emal edən funksiyaları bir yerdə birləşdirir. Yaxşı sinif öz daxili vəziyyətini qoruyur: kənardan səhv dəyər verməyə imkan vermir.",
    sections: [
      {
        level: "baslangic",
        title: "Sinif, obyekt, konstruktor",
        blocks: [
          { t: "analogy", text: "Sinif — evin layihəsidir, obyekt isə layihə əsasında tikilmiş ev. Layihə bir dənədir, evlər çox ola bilər. Hər evin öz mebeli (üzvləri) var, amma qapının açarı (private) yalnız sahibindədir." },
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <string>
#include <utility>

class Hesab {
public:                                   // kənardan görünən hissə
    Hesab(std::string sahib, double balans)
        : sahib_(std::move(sahib)), balans_(balans) {}    // member initializer list

    void yatir(double mebleg) {
        if (mebleg > 0) {
            balans_ += mebleg;
        }
    }

    bool cixar(double mebleg) {
        if (mebleg <= 0 || mebleg > balans_) {
            return false;                  // qaydanı pozan əməliyyat rədd olunur
        }
        balans_ -= mebleg;
        return true;
    }

    double balans() const { return balans_; }      // const: obyekti dəyişmir
    const std::string& sahib() const { return sahib_; }

private:                                  // yalnız sinfin özü toxuna bilər
    std::string sahib_;
    double balans_;
};

int main() {
    Hesab h("Aysel", 100.0);
    h.yatir(50);
    h.cixar(30);
    std::cout << h.sahib() << ": " << h.balans() << "\\n";   // Aysel: 120
    // h.balans_ = 1e9;                    // XƏTA: private
    return 0;
}` },
          { t: "terms", items: [
            ["class / struct", "eyni şeydir; yeganə fərq: class-da default private, struct-da public."],
            ["access specifier", "public, private, protected — kimin görə biləcəyini təyin edir."],
            ["constructor", "obyekt yaranarkən çağırılan, adı sinif adı olan xüsusi funksiya."],
            ["destructor", "~Sinif(): obyekt ölərkən çağırılır, resursları buraxır."],
            ["encapsulation (inkapsulyasiya)", "məlumatı gizlədib yalnız təhlükəsiz metodlarla açmaq."],
          ]},
          { t: "tip", text: "Üzvləri default olaraq private et, yalnız lazım olan interfeysi public aç. Private üzvlərin adını sonuna _ qoyaraq ayırmaq geniş yayılmış adətdir." },
        ],
      },
      {
        level: "orta",
        title: "this, const, static və initializer list",
        blocks: [
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <string>
#include <utility>

class Telebe {
public:
    explicit Telebe(std::string ad, int yas = 18)
        : ad_(std::move(ad)), yas_(yas) {
        ++say_;                           // static üzv: bütün obyektlərə ortaq
    }
    ~Telebe() { --say_; }

    Telebe& adDeyis(const std::string& yeni) {
        ad_ = yeni;
        return *this;                     // this: cari obyektə göstərici; zəncirləmə üçün
    }
    Telebe& yasDeyis(int yeni) {
        yas_ = yeni;
        return *this;
    }

    void yaz() const {                    // const metod: ad_ və yas_ dəyişmək olmaz
        std::cout << ad_ << " (" << yas_ << ")\\n";
    }

    static int say() { return say_; }     // static metod: this yoxdur

private:
    std::string ad_;
    int yas_;
    static inline int say_ = 0;           // C++17: sinif daxilində inline static
};

int main() {
    Telebe a("Orxan");
    Telebe b("Leyla", 20);
    a.adDeyis("Orxan Əliyev").yasDeyis(19);
    a.yaz();
    std::cout << "Tələbə sayı: " << Telebe::say() << "\\n";   // 2
    return 0;
}` },
          { t: "list", items: [
            "Initializer list (: ad_(...), yas_(...)) üzvü birbaşa qurur. Bədəndə mənimsətmək isə əvvəl default qurur, sonra dəyişir — həm yavaş, həm const/referans üzvlər üçün mümkünsüz.",
            "Üzvlər elan olunma sırası ilə qurulur (initializer list-dəki sıra ilə yox). Sıra qarışsa xəbərdarlıq verilir.",
            "const metod yalnız oxuyur; const obyekt üzərində yalnız const metodları çağırmaq olar.",
            "explicit tək arqumentli konstruktorların səssiz çevrilməsinin qarşısını alır.",
            "static üzv sinfə aiddir, obyektə yox: Telebe::say().",
          ]},
          { t: "mistake", lang: "cpp", wrong: `class Nokta {
public:
    Nokta(int x, int y) {
        x_ = x;          // bədəndə mənimsətmə
        y_ = y;
    }
private:
    const int x_;        // XƏTA: const üzv bədəndə mənimsədilə bilməz
    const int y_;
};`, right: `class Nokta {
public:
    Nokta(int x, int y) : x_(x), y_(y) {}   // initializer list
private:
    const int x_;
    const int y_;
};`, why: "const və referans üzvlər yaranan anda qiymət almalıdır; bu yalnız initializer list ilə mümkündür." },
          { t: "mistake", lang: "cpp", wrong: `class Say {
public:
    int al() { return n_; }   // const deyil
private:
    int n_ = 0;
};
void yaz(const Say& s) {
    std::cout << s.al();      // XƏTA: const obyektdə const olmayan metod çağırılır
}`, right: `class Say {
public:
    int al() const { return n_; }
private:
    int n_ = 0;
};`, why: "Dəyişməyən metodları const işarələ. Əks halda const referansla işləmək mümkün olmur və niyyət aydın olmur." },
        ],
      },
      {
        level: "senior",
        title: "Invariant, kopyalama və Rule of Three/Five",
        blocks: [
          { t: "p", text: "Invariant — sinfin həmişə doğru olmalı olan şərtidir (məsələn, «balans mənfi olmaz»). Konstruktor onu qurur, hər public metod onu qoruyur. Bu, inkapsulyasiyanın əsl mənasıdır." },
          { t: "list", items: [
            "Rule of Zero: mümkünsə heç bir xüsusi funksiya yazma; std::string, std::vector, unique_ptr resursu özü idarə edir.",
            "Rule of Three: destruktor, kopyalama konstruktoru və kopyalama mənimsətməsindən birini yazırsansa, çox güman üçünü də yazmalısan.",
            "Rule of Five: üstəlik move konstruktoru və move mənimsətməsi (C++11).",
            "= delete kopyalanmaması lazım olan sinifləri bağlayır; = default kompilyatorun versiyasını açıq istəyir.",
            "Təhlükəsizlik — initsializasiya edilməmiş üzv: int n_; (dəyər verilməyib) oxumaq UB-dir və köhnə yaddaşdakı məlumatı sızdıra bilər. Üzvlərə həmişə default dəyər ver: int n_ = 0;",
            "Təhlükəsizlik — dayaz kopyalama (shallow copy): xam göstərici saxlayan sinif kopyalananda hər iki obyekt eyni yaddaşa baxır, destruktorlar onu iki dəfə silir (double free).",
            "Təhlükəsizlik — validasiya konstruktorda aparılır; yarımçıq qurulmuş obyekt yaranmasın deyə yanlış dəyərdə istisna at.",
            "Qaytardığın const olmayan referans (int& al()) private üzvü açıb invariantı pozur. Çox vaxt dəyərlə və ya const referansla qaytar.",
          ]},
          { t: "code", lang: "cpp", caption: "Resurs sahibi sinif: Rule of Five", code: `#include <cstddef>
#include <algorithm>
#include <utility>

class Bufer {
public:
    explicit Bufer(std::size_t n) : n_(n), data_(new int[n]()) {}   // () sıfırlayır

    ~Bufer() { delete[] data_; }

    Bufer(const Bufer& o) : n_(o.n_), data_(new int[o.n_]) {        // dərin kopyalama
        std::copy(o.data_, o.data_ + o.n_, data_);
    }

    Bufer& operator=(const Bufer& o) {
        if (this != &o) {
            Bufer tmp(o);                  // copy-and-swap: istisna təhlükəsiz
            std::swap(n_, tmp.n_);
            std::swap(data_, tmp.data_);
        }
        return *this;
    }

    Bufer(Bufer&& o) noexcept : n_(o.n_), data_(o.data_) {          // sahibliyi köçür
        o.n_ = 0;
        o.data_ = nullptr;
    }

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

    int& operator[](std::size_t i) { return data_[i]; }
    std::size_t olcu() const { return n_; }

private:
    std::size_t n_;
    int* data_;
};` },
          { t: "p", text: "Real layihədə bu sinfin yerinə sadəcə std::vector<int> işlət (Rule of Zero). Yuxarıdakı nümunə yalnız qaydaların mahiyyətini göstərir." },
          { t: "qa", items: [
            ["class və struct fərqi?", "Yalnız default giriş səviyyəsi: class-da private, struct-da public. Başqa fərq yoxdur."],
            ["Member initializer list niyə vacibdir?", "Üzvləri birbaşa qurur (artıq default qurma + mənimsətmə yoxdur); const və referans üzvlər üçün məcburidir."],
            ["Rule of Three nədir?", "Destruktor, kopyalama konstruktoru və kopyalama operator=-dan birini özün yazırsansa, qalan ikisini də yazmalısan; yoxsa dayaz kopyalama və double free olur."],
            ["const metod nə deməkdir?", "this-i const edir: metod obyektin (mutable olmayan) üzvlərini dəyişə bilməz; const obyektdən çağırıla bilər."],
            ["Invariant nədir?", "Obyektin ömrü boyu doğru qalmalı şərt; konstruktor qurur, public metodlar qoruyur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "class-da üzvlər default olaraq hansı girişdədir?", options: ["public", "private", "protected"], answer: 1, why: "class-da default private, struct-da public." },
          { t: "quiz", q: "const üzvü necə başlatmaq olar?", options: ["Konstruktor bədənində =", "Member initializer list ilə", "Mümkün deyil"], answer: 1, why: "const və referans üzvlər yalnız initializer list-də qurula bilər." },
          { t: "quiz", q: "Xam göstərici saxlayan sinif dayaz kopyalananda nə baş verir?", options: ["Heç nə", "Double free təhlükəsi", "Avtomatik dərin kopya"], answer: 1, why: "İki obyekt eyni yaddaşı silməyə çalışır." },
        ],
      },
    ],
    exercise: {
      task: "`Kitab` sinfini yaz: private `ad_` (string), `sehife_` (int, default 0), `static inline int say_`. 1) Konstruktor initializer list ilə, səhifə sayı <= 0 olarsa std::invalid_argument atsın. 2) `const` getter-lər: ad() və sehife(). 3) Obyekt yaranarkən say_ artsın, silinəndə azalsın; static metod say(). 4) Kopyalama konstruktorunu və operator=-u dəyişdirmə, amma say_ düzgün işləsin (kopya da sayılmalıdır — kopyalama konstruktoru yazılsın). 5) main-də iki kitab yarat və say-ı çap et.",
      starter: `#include <iostream>\n#include <stdexcept>\n#include <string>\n\nclass Kitab {\n    // ...\n};\n\nint main() {\n    return 0;\n}\n`,
      expect: "class Kitab; private ad_, sehife_, static inline say_; konstruktor initializer list ilə və sehife<=0 üçün std::invalid_argument atır; ad() və sehife() const metodlardır; destruktor say_-ı azaldır; konstruktor və kopyalama konstruktoru say_-ı artırır; static int say(); main-də iki kitab yaradılıb say çap olunur; üzvlər default dəyərlə başlatılıb.",
    },
  },
  {
    slug: "oop",
    title: "İrsiyyət və polimorfizm",
    intro: "İrsiyyət (inheritance) mövcud sinfi genişləndirməyə, polimorfizm isə eyni interfeys vasitəsilə fərqli davranış çağırmağa imkan verir. C++-da bunun açarı virtual funksiyalardır.",
    sections: [
      {
        level: "baslangic",
        title: "Baza sinif, törəmə sinif, virtual",
        blocks: [
          { t: "analogy", text: "«Heyvan» ümumi vəsiqədir: hamısı ses çıxara bilir. Pişik və it həmin vəsiqəni daşıyır, amma hərəsi səsi öz üsulu ilə çıxarır. Sən sadəcə «ses çıxar» deyirsən — kimin olduğunu bilməsən də düzgün səs gəlir." },
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <memory>
#include <string>
#include <utility>
#include <vector>

class Heyvan {
public:
    explicit Heyvan(std::string ad) : ad_(std::move(ad)) {}
    virtual ~Heyvan() = default;               // virtual destruktor: MÜTLƏQ
    virtual void sesCixar() const = 0;         // saf virtual: abstrakt sinif
    const std::string& ad() const { return ad_; }

private:
    std::string ad_;
};

class Pisik : public Heyvan {
public:
    using Heyvan::Heyvan;                      // baza konstruktorunu miras al
    void sesCixar() const override {           // override: səhv yazılışı tutur
        std::cout << ad() << ": miyav\\n";
    }
};

class It : public Heyvan {
public:
    using Heyvan::Heyvan;
    void sesCixar() const override {
        std::cout << ad() << ": hav\\n";
    }
};

int main() {
    std::vector<std::unique_ptr<Heyvan>> suru;
    suru.push_back(std::make_unique<Pisik>("Mestan"));
    suru.push_back(std::make_unique<It>("Qara"));

    for (const auto& h : suru) {
        h->sesCixar();                         // polimorfizm: icra zamanı düzgün versiya seçilir
    }
    return 0;
}` },
          { t: "terms", items: [
            ["public irsiyyət", "«Pisik Heyvandır» (is-a) münasibəti: törəmə obyekt baza yerinə işlədilə bilər."],
            ["virtual funksiya", "çağırış icra zamanı obyektin real tipinə görə seçilir."],
            ["override", "törəmə sinifdə virtual funksiyanı əvəz etdiyini bildirir; imza uyğun gəlməsə kompilyator xəta verir."],
            ["abstrakt sinif", "ən azı bir saf virtual funksiyası (= 0) olan sinif; obyekti yaradıla bilməz."],
            ["final", "sinfin irsi və ya funksiyanın əvəzlənməsini qadağan edir."],
          ]},
          { t: "tip", text: "Hər əvəzləyən funksiyaya override yaz. Bu bir söz sənə bütöv səhv növündən (imza uyğunsuzluğu) qurtulmaq verir." },
        ],
      },
      {
        level: "orta",
        title: "Slicing, dynamic_cast, composition",
        blocks: [
          { t: "code", lang: "cpp", code: `#include <iostream>
#include <memory>
#include <string>

struct Shekil {
    virtual ~Shekil() = default;
    virtual double sahe() const { return 0.0; }
};

struct Daire : Shekil {
    explicit Daire(double r) : r_(r) {}
    double sahe() const override { return 3.14159 * r_ * r_; }
    double radius() const { return r_; }
private:
    double r_;
};

void yaz(const Shekil& s) {                    // referansla: polimorfizm işləyir
    std::cout << "sahə: " << s.sahe() << "\\n";
}

int main() {
    Daire d(2.0);
    yaz(d);                                    // 12.566...

    std::unique_ptr<Shekil> p = std::make_unique<Daire>(1.0);
    if (auto* dd = dynamic_cast<Daire*>(p.get())) {   // təhlükəsiz aşağı çevirmə
        std::cout << "radius: " << dd->radius() << "\\n";
    } else {
        std::cout << "dairə deyil\\n";
    }
    return 0;
}` },
          { t: "mistake", lang: "cpp", wrong: `void yaz(Shekil s) {            // DƏYƏRLƏ alır → slicing
    std::cout << s.sahe();      // həmişə Shekil::sahe() → 0
}
Daire d(2.0);
yaz(d);                         // Daire hissəsi kəsilib atılır`, right: `void yaz(const Shekil& s) {      // referans (və ya göstərici)
    std::cout << s.sahe();      // Daire::sahe()
}`, why: "Törəmə obyekti baza tipinə dəyərlə ötürəndə yalnız baza hissəsi kopyalanır (object slicing) — törəmə sahələr və virtual davranış itir. Polimorfik obyektləri həmişə referans/göstərici ilə ötür." },
          { t: "mistake", lang: "cpp", wrong: `struct Baza {
    virtual void isle() const {}
};
struct Toreme : Baza {
    void isle() {}              // const unudulub: yeni funksiya, əvəzləmə deyil!
};`, right: `struct Toreme : Baza {
    void isle() const override {}   // imza uyğun gəlməsə kompilyator xəta verir
};`, why: "override olmadan imzası bir az fərqli funksiya sakitcə yeni funksiya yaradır və baza versiyası çağırılmağa davam edir. override səhvi kompilyasiyada üzə çıxarır." },
          { t: "list", items: [
            "dynamic_cast icra zamanı tipi yoxlayır: göstərici nullptr, referans std::bad_cast qaytarır/atır. Baza sinifdə ən azı bir virtual funksiya olmalıdır.",
            "Çox dynamic_cast görürsənsə dizayn problemi ola bilər: bunun əvəzinə virtual funksiya əlavə et.",
            "Composition (tərkib) «has-a»: Avtomobil mühərrik üzvünü saxlayır. İrsiyyət isə «is-a»-dır. Əmin deyilsənsə composition seç — daha az bağlıdır.",
            "Mənasız irsiyyət: Stack-in vector-dan public irs almasına ehtiyac yoxdur; vector-u üzv kimi saxla.",
          ]},
        ],
      },
      {
        level: "senior",
        title: "vtable, diamond və təhlükəsizlik",
        blocks: [
          { t: "p", text: "Virtual funksiyası olan hər obyektin gizli göstəricisi (vptr) var; o, sinfə aid virtual cədvələ (vtable) baxır. Çağırış bu cədvəldən funksiya ünvanını götürüb işə salır. Bir əlavə göstərici (8 bayt) və bir dolayı keçid — çox vaxt ucuz, amma inline olunmur və sıx dövrlərdə hiss oluna bilər." },
          { t: "code", lang: "cpp", caption: "Diamond problemi və virtual irsiyyət", code: `#include <iostream>

struct Cihaz {
    int id = 0;
};

struct Printer : virtual Cihaz {};     // virtual irsiyyət: Cihaz yalnız bir nüsxə
struct Skaner  : virtual Cihaz {};

struct Kombayn : Printer, Skaner {};   // diamond: Cihaz→(Printer,Skaner)→Kombayn

int main() {
    Kombayn k;
    k.id = 5;                          // virtual olmasaydı: qeyri-müəyyən (ambiguous)
    std::cout << k.id << "\\n";
    return 0;
}` },
          { t: "list", items: [
            "Bazanın destruktoru virtual deyilsə və baza göstəricisi ilə delete edirsənsə, yalnız baza destruktoru işləyir — törəmənin resursları sızır, davranış undefined-dır. Polimorfik baza: virtual ~Baza() = default; (və ya protected non-virtual).",
            "Təhlükəsizlik — slicing: təhlükəsizlik yoxlaması törəmə sinifdə virtual olduqda, dəyərlə ötürmə yoxlamanı atlayıb baza (icazəli) versiyanı çağırır.",
            "Təhlükəsizlik — static_cast baza→törəmə yoxlanmır. Obyekt əslində başqa tip olsa UB. Əmin deyilsənsə dynamic_cast və nullptr yoxlaması.",
            "Təhlükəsizlik — konstruktor/destruktor daxilində virtual çağırış törəmə versiyaya getmir (törəmə hissə hələ qurulmayıb/artıq silinib). Gözlənilməz davranışa gətirir.",
            "Təhlükəsizlik — vtable göstəricisi use-after-free hücumlarında ələ keçirilir (vptr üzərinə yazmaq kod icrasına gətirir). Silinmiş obyekti istifadə etmə, unique_ptr ilə sahibliyi aydın saxla.",
            "Öz tipinin sətir və ya ədəd ilə müqayisəsi əvəzinə tip kodu saxlayan switch əvəzinə virtual funksiya işlət; yeni tip əlavə etmək asan olar.",
            "final siniflər kompilyatora devirtualization (virtual çağırışı birbaşa çağırışa çevirmək) imkanı verir; performans üçün də faydalıdır.",
            "Interface kimi sinif: yalnız saf virtual funksiyalar və virtual destruktor; məlumat üzvü olmasın.",
          ]},
          { t: "code", lang: "cpp", caption: "DİQQƏT: UB — virtual destruktorsuz delete (yalnız nümayiş)", code: `struct Baza {
    ~Baza() {}                          // virtual DEYİL
};
struct Toreme : Baza {
    int* data = new int[100];
    ~Toreme() { delete[] data; }
};

void problem() {
    Baza* b = new Toreme();
    delete b;                           // UB: Toreme::~Toreme çağırılmır → 400 bayt sızır
}

// DÜZGÜN:
struct BazaDuz {
    virtual ~BazaDuz() = default;
};` },
          { t: "qa", items: [
            ["virtual funksiya necə işləyir?", "Obyektdəki vptr sinfin vtable-ına işarə edir; çağırış icra zamanı vtable-dan düzgün funksiyanı seçir."],
            ["Niyə baza sinifin destruktoru virtual olmalıdır?", "Baza göstəricisi ilə delete edəndə törəmə destruktorun çağırılması üçün; əks halda UB və sızma."],
            ["Object slicing nədir?", "Törəmə obyekti baza tipinə dəyərlə mənimsətdikdə törəmə hissənin itməsi."],
            ["override və final nə üçündür?", "override əvəzləməni yoxlayır; final əvəzlənmə və ya irsiyyəti qadağan edir."],
            ["Diamond problemi və həlli?", "Baza iki yolla miras alınanda iki nüsxə yaranır; virtual irsiyyət tək nüsxə təmin edir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Saf virtual funksiya necə yazılır?", options: ["virtual void f() = 0;", "virtual void f() {}", "abstract void f();"], answer: 0, why: "= 0 funksiyanı saf virtual edir və sinfi abstrakt edir." },
          { t: "quiz", q: "Baza göstəricisi ilə törəmə obyekti delete edəndə baza destruktoru virtual deyilsə?", options: ["Hər ikisi çağırılır", "Undefined behavior", "Kompilyasiya xətası"], answer: 1, why: "Virtual destruktor yoxdursa davranış undefined-dır." },
          { t: "quiz", q: "Polimorfik obyekti funksiyaya necə ötürmək düzgündür?", options: ["Dəyərlə", "Referans və ya göstərici ilə", "Heç cür olmur"], answer: 1, why: "Dəyərlə ötürmə slicing-ə səbəb olur." },
        ],
      },
    ],
    exercise: {
      task: "Abstrakt `Shekil` sinfi yaz (saf virtual `sahe() const`, `ad() const`, virtual destruktor). Ondan `Duzbucaq` və `Daire` törət (override ilə). `std::vector<std::unique_ptr<Shekil>>`-də onları saxla, dövrlə hər birinin adını və sahəsini çap et. Şərhdə: 1) niyə destruktor virtual olmalıdır, 2) niyə vector-da dəyər (Shekil) yox, unique_ptr saxlanır (slicing).",
      starter: `#include <iostream>\n#include <memory>\n#include <string>\n#include <vector>\n\n// Shekil, Duzbucaq, Daire\n\nint main() {\n    return 0;\n}\n`,
      expect: "Shekil abstrakt: virtual double sahe() const = 0; virtual destruktor; törəmələr public irs alır və override istifadə edir; vector<unique_ptr<Shekil>> make_unique ilə doldurulur; dövr const referansla gedir və polimorfik çağırış edir; şərhdə virtual destruktorun delete zamanı törəmənin təmizlənməsi üçün lazım olduğu və dəyərlə saxlamanın slicing yaratdığı izah olunur.",
    },
  },
  {
    slug: "stl",
    title: "STL: vector, map, alqoritmlər",
    intro: "STL (Standard Template Library) hazır konteynerlər, iteratorlar və alqoritmlər toplusudur. Düzgün istifadə etsən, əl ilə massiv və dövrlərdən həm daha təhlükəsiz, həm də daha sürətli kod alırsan.",
    sections: [
      {
        level: "baslangic",
        title: "vector, map və alqoritmlər",
        blocks: [
          { t: "analogy", text: "vector — genişlənən rəf: kitabı sona qoyursan, rəf dolanda özü böyüyür. map — lüğət: açar verirsən, dəyəri alırsan. Alqoritmlər isə kitabxanaçıdır: «sırala», «tap», «say» deyirsən, o özü edir." },
          { t: "code", lang: "cpp", code: `#include <algorithm>
#include <iostream>
#include <map>
#include <numeric>
#include <set>
#include <string>
#include <unordered_map>
#include <vector>

int main() {
    std::vector<int> ededler = {5, 2, 9, 1, 7};
    ededler.push_back(3);                          // sona əlavə
    std::sort(ededler.begin(), ededler.end());     // 1 2 3 5 7 9

    for (int e : ededler) {                        // range-based for
        std::cout << e << " ";
    }
    std::cout << "\\n";

    std::map<std::string, int> yaslar;             // açara görə sıralı
    yaslar["Aysel"] = 20;
    yaslar["Orxan"] = 25;
    for (const auto& [ad, yas] : yaslar) {         // structured binding (C++17)
        std::cout << ad << " -> " << yas << "\\n";
    }

    std::unordered_map<std::string, int> tez;      // hash cədvəl: orta O(1)
    tez["a"] = 1;
    if (tez.count("a") > 0) {
        std::cout << "tapıldı\\n";
    }

    std::set<int> unikal = {3, 1, 3, 2, 1};        // təkrarsız, sıralı: 1 2 3
    std::cout << unikal.size() << "\\n";           // 3

    int cem = std::accumulate(ededler.begin(), ededler.end(), 0);
    std::cout << "cəm: " << cem << "\\n";          // 27
    return 0;
}` },
          { t: "terms", items: [
            ["konteyner", "məlumat saxlayan şablon sinif: vector, array, map, set və s."],
            ["iterator", "konteynerdə mövqeyi göstərən, göstərici kimi davranan obyekt (begin(), end())."],
            ["std::array", "ölçüsü kompilyasiya zamanı məlum olan sabit massiv, ölçüsünü bilir."],
            ["std::pair", "iki dəyəri birləşdirən sadə cüt (first, second)."],
            ["alqoritm", "<algorithm> və <numeric> funksiyaları: sort, find, transform, accumulate."],
          ]},
          { t: "tip", text: "Defolt konteyner seçimin std::vector olsun. Yalnız ölçü qaydası, açar-dəyər və ya təkrarsızlıq lazım olanda başqa konteynerə keç." },
        ],
      },
      {
        level: "orta",
        title: "Lambda ilə alqoritmlər və tipik nümunələr",
        blocks: [
          { t: "code", lang: "cpp", code: `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

struct Mehsul {
    std::string ad;
    double qiymet;
};

int main() {
    std::vector<Mehsul> siyahi = {
        {"Noutbuk", 1500.0}, {"Siçan", 25.0}, {"Monitor", 400.0}, {"Klaviatura", 60.0}
    };

    // 1) Lambda ilə sıralama: qiymətə görə azalan
    std::sort(siyahi.begin(), siyahi.end(),
              [](const Mehsul& a, const Mehsul& b) { return a.qiymet > b.qiymet; });

    // 2) find_if: şərtə uyğun ilk element
    auto it = std::find_if(siyahi.begin(), siyahi.end(),
                           [](const Mehsul& m) { return m.qiymet < 100.0; });
    if (it != siyahi.end()) {                       // end() yoxlaması MÜTLƏQ
        std::cout << "ilk ucuz: " << it->ad << "\\n";
    }

    // 3) transform: yeni vector-a qiymətləri yaz
    std::vector<double> endirimli(siyahi.size());
    std::transform(siyahi.begin(), siyahi.end(), endirimli.begin(),
                   [](const Mehsul& m) { return m.qiymet * 0.9; });

    // 4) count_if
    int bahali = static_cast<int>(std::count_if(siyahi.begin(), siyahi.end(),
                           [](const Mehsul& m) { return m.qiymet > 300.0; }));
    std::cout << "bahalı: " << bahali << "\\n";

    // 5) erase-remove (C++17); C++20-də: std::erase_if(siyahi, ...)
    siyahi.erase(std::remove_if(siyahi.begin(), siyahi.end(),
                 [](const Mehsul& m) { return m.qiymet < 50.0; }), siyahi.end());
    return 0;
}` },
          { t: "list", items: [
            "Lambda: [tutma](parametrlər) { gövdə }. [] heç nə tutmur, [=] dəyərlə, [&] referansla tutur. Lambda-nı funksiya bitəndən sonra yaşayacaqsa referansla tutma.",
            "remove/remove_if elementləri silmir, yalnız sona suruşdürür; real silmək üçün erase ilə birləşdirilir (erase-remove idiomu).",
            "map-da m[açar] açar yoxdursa onu yaradır! Yoxlamaq üçün find() və ya count(), oxumaq üçün at() işlət.",
            "Əl ilə dövr əvəzinə alqoritm adı niyyəti aydın göstərir: std::find, std::count, std::any_of.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v = {1, 2, 3};
std::cout << v[10];          // DİQQƏT: UB — sərhəddən kənar, yoxlama yoxdur
std::map<std::string, int> m;
if (m["yox"] == 0) { }       // yoxlama niyyətlə, amma "yox" açarı yaranır`, right: `std::vector<int> v = {1, 2, 3};
try {
    std::cout << v.at(10);   // std::out_of_range atır
} catch (const std::out_of_range& e) {
    std::cout << "sərhəd xətası\\n";
}
std::map<std::string, int> m;
if (m.find("yox") == m.end()) { }   // açar yaradılmır`, why: "operator[] vector-da sərhəd yoxlamır (UB), map-da isə səssizcə yeni element əlavə edir. at() istisna atır; find()/count() konteyneri dəyişmir." },
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v = {1, 2, 3, 4};
for (auto it = v.begin(); it != v.end(); ++it) {
    if (*it % 2 == 0) {
        v.erase(it);          // DİQQƏT: UB — it etibarsız oldu, ++it davam edir
    }
}`, right: `for (auto it = v.begin(); it != v.end(); ) {
    if (*it % 2 == 0) {
        it = v.erase(it);     // erase növbəti etibarlı iterator qaytarır
    } else {
        ++it;
    }
}
// və ya: v.erase(std::remove_if(...), v.end());`, why: "erase silinən mövqedən sonrakı iteratorları etibarsız edir. Köhnə iteratordan istifadə UB-dir; erase-in qaytardığı iteratoru götür." },
        ],
      },
      {
        level: "senior",
        title: "Daxildə, mürəkkəblik və təhlükəsizlik",
        blocks: [
          { t: "p", text: "vector bitişik yaddaş blokudur: size (elementlər) və capacity (ayrılmış yer). Yer çatmayanda yeni daha böyük blok ayrılır (adətən 1.5–2 dəfə), elementlər köçürülür/move olunur, köhnə blok silinir. Buna görə push_back amortizə olunmuş O(1)-dir, amma ayrı-ayrı çağırışda bahalı ola bilər." },
          { t: "code", lang: "cpp", caption: "reserve və reallocation təhlükəsi", code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.reserve(1000);                 // əvvəlcədən yer ayır: reallocation yoxdur

    v.push_back(1);
    int& ilk = v[0];                 // referans/iterator saxlayırıq
    for (int i = 0; i < 500; ++i) {
        v.push_back(i);              // reserve etdiyimiz üçün ilk hələ də etibarlıdır
    }
    std::cout << ilk << "\\n";

    // reserve olmasaydı: push_back reallocation edər, 'ilk' asılı referansa çevrilərdi
    return 0;
}` },
          { t: "list", items: [
            "Mürəkkəblik cədvəli: vector — [] O(1), push_back amortizə O(1), ortada insert/erase O(n), find O(n).",
            "deque — hər iki ucda O(1). list — ortada O(1) (iterator varsa), amma bitişik deyil və keş-yaxşı deyil; çox hallarda vector qalib gəlir.",
            "map/set (qırmızı-qara ağac) — find/insert/erase O(log n), sıralı. unordered_map/set (hash) — orta O(1), pis halda O(n), sırasız.",
            "sort — O(n log n); binary_search/lower_bound yalnız sıralı aralıqda O(log n).",
            "Iterator invalidation: vector-da push_back reallocation olsa bütün iteratorlar/referanslar; insert/erase mövqedən sonrakılar etibarsız. map/list-də yalnız silinən element.",
            "Təhlükəsizlik — out-of-bounds: v[i] sərhəd yoxlamır, UB. İstifadəçi girişi olan indeksdə at() və ya əvvəlcədən yoxlama. Əlavə: g++ -D_GLIBCXX_ASSERTIONS və ya -fsanitize=address sərhəd xətalarını tutur.",
            "Təhlükəsizlik — invalidated iterator/referans istifadəsi use-after-free-ə bərabərdir (köhnə yaddaşa müraciət).",
            "Təhlükəsizlik — işarəsiz ölçü: v.size() size_t-dir. i < v.size() - 1 boş vector-da dövrə vurub çox böyük ədəd olur; for (int i = 0; i < n-1) bu hala diqqət et.",
            "Təhlükəsizlik — unordered_map-ə hücumçu ilə seçilmiş açarlar kolliziyalar yaradıb O(n) əməliyyatlara (DoS) gətirə bilər; etibarsız girişdə açarların sayını məhdudlaşdır.",
            "Təhlükəsizlik — dövr zamanı konteyneri dəyişmə: range-for içində push_back/erase UB-dir (gizli iteratorlar).",
            "Performans: reserve(), emplace_back (obyekti yerində qurur), const auto& ilə dövr (kopya yoxdur), ən az kopyalama üçün std::move.",
          ]},
          { t: "code", lang: "cpp", caption: "Təhlükəsiz indeks yoxlaması", code: `#include <iostream>
#include <optional>
#include <vector>

std::optional<int> elementAl(const std::vector<int>& v, std::size_t i) {
    if (i >= v.size()) {
        return std::nullopt;         // sərhəddən kənar: dəyər yoxdur
    }
    return v[i];
}

int main() {
    std::vector<int> v = {10, 20, 30};
    if (auto e = elementAl(v, 5)) {
        std::cout << *e << "\\n";
    } else {
        std::cout << "yanlış indeks\\n";
    }
    return 0;
}` },
          { t: "qa", items: [
            ["vector və array fərqi?", "array ölçüsü kompilyasiya zamanı sabitdir (stack-də ola bilər), vector dinamikdir və heap-də saxlayır."],
            ["vector necə böyüyür?", "Capacity bitəndə daha böyük blok ayrılır, elementlər köçürülür, köhnə blok silinir; iteratorlar etibarsız olur."],
            ["map və unordered_map fərqi?", "map sıralıdır, O(log n); unordered_map hash əsaslıdır, orta O(1), sırasızdır."],
            ["at() və [] fərqi?", "at() sərhəd yoxlayır və istisna atır; [] yoxlamır (UB)."],
            ["Iterator invalidation nədir?", "Konteyner dəyişəndə (reallocation, erase) bəzi iteratorların və referansların etibarsız olması; onlardan istifadə UB-dir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Defolt olaraq hansı konteynerdən başlamalı?", options: ["std::list", "std::vector", "std::map"], answer: 1, why: "vector bitişik yaddaşdadır, keş-yaxşıdır və əksər hallarda ən sürətlidir." },
          { t: "quiz", q: "map-da m[açar] açar yoxdursa nə edir?", options: ["Xəta atır", "Yeni element yaradır", "nullptr qaytarır"], answer: 1, why: "operator[] açar tapılmasa default dəyərlə yeni element əlavə edir. Yoxlamaq üçün find/count/at." },
          { t: "quiz", q: "v.erase(it) çağırışından sonra köhnə it ilə davam etmək nədir?", options: ["Təhlükəsiz", "UB (iterator etibarsızdır)", "Kompilyasiya xətası"], answer: 1, why: "erase iteratoru etibarsız edir; qaytardığı yeni iteratordan istifadə et." },
        ],
      },
    ],
    exercise: {
      task: "Aşağıdakı proqramı yaz: `std::vector<std::string>` içində sözlər var ({\"alma\", \"armud\", \"nar\", \"alma\", \"heyva\", \"nar\", \"alma\"}). 1) `std::map<std::string,int>` ilə hər sözün sayını hesabla (range-for ilə). 2) Nəticəni structured binding ilə çap et. 3) `std::sort` və lambda ilə sözləri uzunluğa görə sırala (bərabər uzunluqda əlifba sırası). 4) `std::sort` + `std::unique` + `erase` ilə təkrarları sil. 5) Şərhdə at() ilə [] fərqini və iterator invalidation-ı izah et.",
      starter: `#include <algorithm>\n#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> sozler = {"alma", "armud", "nar", "alma", "heyva", "nar", "alma"};\n    // ...\n    return 0;\n}\n`,
      expect: "map<string,int> ilə sayma (range-for), structured binding ilə çap; std::sort lambda ilə uzunluğa, bərabərdə əlifbaya görə; sort + unique + erase (erase-unique idiomu) ilə təkrarlar silinir; sərhəddən kənar indeks və invalid iterator yoxdur; şərhdə at()-in istisna atdığı, []-in vector-da yoxlamadığı və map-da açar yaratdığı, erase/push_back-in iteratorları etibarsız etdiyi izah olunur.",
    },
  },
];
