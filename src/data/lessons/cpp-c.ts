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
          { t: "h", text: "Stack frame: yerli dəyişənlər harada yaşayır" },
          { t: "p", text: "Hər funksiya çağırışı üçün stack-də ayrıca «çərçivə» (stack frame) yaranır: parametrlər, yerli dəyişənlər və geri qayıdış ünvanı orada durur. Funksiya bitəndə çərçivə birdəfəlik silinir. Ona görə yerli dəyişənin ünvanını funksiyadan kənara qaytarmaq olmaz: ünvan qalır, amma altındakı yaddaş artıq başqa çağırışlara aiddir. Heap isə funksiyalardan asılı deyil — new ilə ayrılan blok sən delete deyənə qədər yaşayır. Göstəricinin özü stack-də ola bilər, işarə etdiyi obyekt isə heap-də." },
          { t: "h", text: "Struct-ın və 2D massivin heap-də yaradılması" },
          { t: "code", lang: "cpp", caption: "Struct, 2D massiv və new(std::nothrow)", code: `#include <iostream>
#include <new>

struct Nokta { int x; int y; };

int main() {
    Nokta* p = new Nokta{3, 4};              // heap-də struct
    std::cout << p->x << "," << p->y << "\\n";  // 3,4   (-> = (*p). qısaltması)
    delete p;

    int s = 3, h = 4;
    int** m = new int*[s];                   // sətir göstəriciləri
    for (int i = 0; i < s; ++i) {
        m[i] = new int[h]{};                 // hər sətir ayrıca blok, sıfırlanmış
    }
    m[1][2] = 7;
    int cem = 0;
    for (int i = 0; i < s; ++i) {
        for (int j = 0; j < h; ++j) {
            cem += m[i][j];
        }
    }
    std::cout << "cem: " << cem << "\\n";      // cem: 7
    for (int i = 0; i < s; ++i) {
        delete[] m[i];                       // əvvəl sətirlər
    }
    delete[] m;                              // sonra göstərici massivi

    int* q = new (std::nothrow) int[4]{1, 2, 3, 4};
    if (q == nullptr) {
        std::cout << "yer yoxdur\\n";
        return 1;
    }
    std::cout << q[3] << "\\n";                // 4
    delete[] q;
    return 0;
}` },
          { t: "p", text: "Diqqət et: 2D massivdə 1 + 3 = 4 ayrı new və 4 ayrı delete lazım oldu. Bu qədər əl işi səhv üçün geniş meydan açır — buna görə real kodda iç-içə new əvəzinə std::vector<std::vector<int>> və ya tək bitişik vector işlədilir." },
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — başlanğıc dəyər verilməyib
int* p;              // p-də təsadüfi «zibil» ünvan var
*p = 5;              // təsadüfi yaddaşa yazır`, right: `int* p = nullptr;   // həmişə başlat
int x = 0;
p = &x;              // ya mövcud dəyişənə
// ya da: int* q = new int(5);`, why: "Başlanmamış göstərici təsadüfi ünvana baxır. Ora yazmaq çökmə və ya başqa dəyişəni səssiz pozmaqdır. Göstəricini ya düzgün ünvanla, ya nullptr ilə başlat." },
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — yerli dəyişənin ünvanı qaytarılır
int* yarat() {
    int x = 10;      // stack-də, funksiya bitəndə yox olur
    return &x;       // asılı göstərici (dangling pointer)
}`, right: `int yarat() {
    return 10;       // sadə dəyər dəyərlə qaytarılır
}
// obyekt funksiyadan sonra da yaşamalıdırsa:
// std::unique_ptr<int> yarat() { return std::make_unique<int>(10); }`, why: "Stack çərçivəsi funksiya bitəndə silinir. Qaytarılan ünvan artıq etibarsızdır; oxumaq UB-dir. Kompilyator adətən xəbərdarlıq verir — onu ciddi qəbul et." },
          { t: "list", items: [
            "new int — başlanğıc dəyər yoxdur (zibil). new int() və ya new int{} — sıfırlanır. new int[n]() massivi sıfırlayır.",
            "malloc/free C-dəndir və konstruktor/destruktor çağırmır. new ilə malloc, ya da malloc ilə delete qarışdırma — UB-dir.",
            "new[] ilə ayrılmış massivin ölçüsünü göstəricidən öyrənmək olmaz; ölçünü ayrıca saxla (və ya vector işlət).",
            "Göstəricinin özünü silmək olmaz: delete obyektə işarə edən göstəricini dəyişmir, yalnız yaddaşı qaytarır. Buna görə sonra p = nullptr yazırıq.",
          ]},
          { t: "terms", items: [
            ["stack frame", "bir funksiya çağırışının stack-dəki yaddaş çərçivəsi; funksiya bitəndə silinir."],
            ["dangling pointer", "artıq mövcud olmayan yaddaşa baxan göstərici."],
            ["nullptr", "heç bir şeyə işarə etməyən göstərici; NULL və 0-dan daha təhlükəsizdir (tipi var)."],
            ["value-initialization", "new int() / new int{} — dəyəri sıfır etməklə yaradılma."],
          ]},
          { t: "warn", text: "Heap yaddaşı avtomatik sıfırlanmır. new int[1000] oxuyanda içində əvvəlki proqramlardan qalan məlumat ola bilər. Oxumazdan əvvəl mütləq dəyər ver." },
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
          { t: "h", text: "Ağıllı göstəricilər: unique_ptr, shared_ptr, weak_ptr" },
          { t: "p", text: "Ağıllı göstərici (smart pointer) heap obyektinə sahiblik edən kiçik sinifdir. Destruktoru obyekti avtomatik silir — beləliklə yuxarıdakı dörd səhvin çoxu yox olur. <memory> başlığındadır." },
          { t: "list", items: [
            "std::unique_ptr — tək sahib. Kopyalana bilməz, yalnız std::move ilə köçürülür. Overhead praktiki olaraq sıfırdır (xam göstərici ölçüsündə). Defolt seçimin bu olsun.",
            "std::shared_ptr — paylaşılan sahiblik. İçində referans sayğacı (control block) var; kopyalananda say artır, öləndə azalır, 0 olanda obyekt silinir. Say atomikdir — bir az bahalıdır.",
            "std::weak_ptr — obyektə baxır, amma sayğacı artırmır. Obyekt hələ varsa lock() ilə müvəqqəti shared_ptr verir, yoxdursa boş qaytarır. Dövri istinadı qırmaq üçündür.",
            "std::make_unique / std::make_shared — new-i əl ilə yazmaqdan qaçın. make_shared obyekti və sayğacı tək ayırmada yaradır.",
          ]},
          { t: "code", lang: "cpp", caption: "Sahiblik köçürülməsi, paylaşma və weak_ptr", code: `#include <iostream>
#include <memory>
#include <string>
#include <utility>

struct Fayl {
    std::string ad;
    explicit Fayl(std::string a) : ad(std::move(a)) { std::cout << "aç " << ad << "\\n"; }
    ~Fayl() { std::cout << "bağla " << ad << "\\n"; }
};

struct Dugun {
    std::string ad;
    std::shared_ptr<Dugun> novbeti;     // sahiblik
    std::weak_ptr<Dugun> evvelki;       // sahiblik YOX: dövr yaranmır
    explicit Dugun(std::string a) : ad(std::move(a)) {}
    ~Dugun() { std::cout << "~Dugun " << ad << "\\n"; }
};

std::unique_ptr<Fayl> yarat() { return std::make_unique<Fayl>("a.txt"); }

int main() {
    auto f = yarat();
    auto g = std::move(f);                    // sahiblik g-yə keçdi
    std::cout << (f == nullptr) << "\\n";      // 1

    {
        auto s1 = std::make_shared<Fayl>("b.txt");
        auto s2 = s1;                         // eyni obyekt, say 2
        std::cout << "say: " << s1.use_count() << "\\n";
    }                                         // say 0 → obyekt silinir
    std::cout << "scope bitdi\\n";

    auto a = std::make_shared<Dugun>("A");
    auto b = std::make_shared<Dugun>("B");
    a->novbeti = b;
    b->evvelki = a;
    std::cout << a.use_count() << " " << b.use_count() << "\\n";
    if (auto x = b->evvelki.lock()) {         // weak_ptr → müvəqqəti shared_ptr
        std::cout << "evvəlki: " << x->ad << "\\n";
    }
    return 0;
}
// Çıxış:
// aç a.txt
// 1
// aç b.txt
// say: 2
// bağla b.txt
// scope bitdi
// 1 2
// evvəlki: A
// ~Dugun A
// ~Dugun B
// bağla a.txt` },
          { t: "p", text: "Sonuncu üç sətrə fikir ver: yerli dəyişənlər elan olunmanın əksi sırası ilə silinir (b, a, g, f). a silinəndə onun novbeti üzvü də buraxılır və B də silinir. Bu, RAII-nin gözəlliyidir: heç bir delete yazmadıq." },
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — iki ayrı sayğac, eyni obyekt
int* raw = new int(1);
std::shared_ptr<int> a(raw);
std::shared_ptr<int> b(raw);   // a və b bir-birindən xəbərsizdir`, right: `auto a = std::make_shared<int>(1);
auto b = a;                    // sayğac ortaqdır, say = 2`, why: "Eyni xam göstəricidən iki dəfə shared_ptr düzəltsən, iki müstəqil sayğac yaranır və hər biri obyekti silməyə çalışır (double free). Xam göstəricini yalnız bir dəfə, mümkünsə birbaşa make_shared ilə sahibə ver." },
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — delete[] əvəzinə delete çağırılır
std::unique_ptr<int> p(new int[5]);`, right: `std::unique_ptr<int[]> p(new int[5]);   // massiv versiyası delete[] çağırır
// daha yaxşı: std::vector<int> v(5);`, why: "Defolt unique_ptr<int> delete çağırır; massiv üçün isə delete[] lazımdır. unique_ptr<int[]> ixtisaslaşması bunu düzgün edir, amma vector hələ də daha rahatdır." },
          { t: "mistake", lang: "cpp", wrong: `// Yaddaş sızması: dövri shared_ptr
struct A { std::shared_ptr<struct B> b; };
struct B { std::shared_ptr<A> a; };   // A↔B bir-birini saxlayır
// a->b = b; b->a = a;  → say heç vaxt 0 olmur, destruktorlar çağırılmır`, right: `struct B { std::weak_ptr<A> a; };    // geri istinad zəifdir`, why: "İki obyekt bir-birinə shared_ptr ilə baxanda say heç vaxt sıfır olmur. Mülkiyyət ağac kimi bir istiqamətli olmalıdır, geri istinadlar weak_ptr və ya xam (baxıcı) göstərici olmalıdır." },
          { t: "tip", text: "Qayda: sahib olan yer unique_ptr saxlayır. Sadəcə baxan funksiyaya xam göstərici və ya referans ötür (void emal(const Fayl& f)). shared_ptr-ı yalnız həqiqətən paylaşılan sahiblik üçün işlət — hər yerdə shared_ptr dizayn problemini gizlədir." },
          { t: "terms", items: [
            ["RAII", "Resource Acquisition Is Initialization: resurs konstruktorda alınır, destruktorda buraxılır."],
            ["control block", "shared_ptr-ın gizli strukturu: istifadə sayğacı, weak sayğacı və silici (deleter)."],
            ["non-owning pointer", "yalnız baxan, silməyən xam göstərici/referans."],
            ["deleter", "yaddaşı necə buraxmaq lazımdırsa onu göstərən funksiya (məs. fclose)."],
          ]},
          { t: "qa", items: [
            ["unique_ptr və shared_ptr fərqi?", "unique_ptr tək sahibdir, kopyalanmır, overhead yoxdur. shared_ptr sayğac vasitəsilə çox sahibi dəstəkləyir, amma sayğac əməliyyatları (atomik) və əlavə yaddaş tələb edir."],
            ["weak_ptr nə üçündür?", "Obyekti sahiblik etmədən müşahidə etmək və dövri istinadları qırmaq üçün. lock() obyekt yaşayırsa shared_ptr verir."],
            ["Niyə new əvəzinə make_unique/make_shared?", "Daha qısadır, istisna təhlükəsizdir (arqument hesablaması arasında sızma olmur) və make_shared bir ayırma ilə həm obyekti, həm sayğacı yaradır."],
            ["Funksiyaya unique_ptr necə ötürülür?", "Sahiblik verirsənsə dəyərlə və std::move ilə; yalnız istifadə edirsənsə, obyektə referans və ya xam göstərici ötür."],
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
          { t: "h", text: "Allokatorun içində: ayırma, hizalama və placement new" },
          { t: "p", text: "operator new adətən malloc üzərində qurulub. Glibc-də malloc «arena» və ölçü sinifləri üzrə bölünmüş sərbəst siyahılar (bin) saxlayır: kiçik blok istəyəndə hazır sərbəst blokdan verir, böyük blok (adətən 128 KB-dən yuxarı) üçün isə birbaşa əməliyyat sistemindən (mmap) səhifələr alır. İki növ fraqmentasiya var: daxili (blok istəyindən böyükdür, artıq hissə itir) və xarici (boş yer çoxdur, amma bitişik deyil). Çox kiçik ömürlü ayırmalar həm yavaşdır, həm də yaddaşı parçalayır." },
          { t: "p", text: "Hizalama (alignment) da vacibdir. Hər tipin alignof dəyəri var və obyekt ünvanı ona bölünməlidir; operator new defolt olaraq alignof(std::max_align_t)-i (x86-64-da adətən 16) təmin edir. alignas(32) kimi artıq hizalanmış tiplər üçün C++17 «aligned new» işlədilir və sən bunu özün düşünmürsən." },
          { t: "code", lang: "cpp", caption: "Ayırmaları saymaq, placement new və alignas", code: `#include <cstddef>
#include <cstdlib>
#include <iostream>
#include <new>
#include <vector>

static int say = 0;

void* operator new(std::size_t n) {          // qlobal operator new: hər ayırmanı sayır
    ++say;
    if (void* p = std::malloc(n)) {
        return p;
    }
    throw std::bad_alloc();
}
void operator delete(void* p) noexcept { std::free(p); }
void operator delete(void* p, std::size_t) noexcept { std::free(p); }

struct Obyekt {
    int deyer;
    explicit Obyekt(int d) : deyer(d) { std::cout << "qurulur " << deyer << "\\n"; }
    ~Obyekt() { std::cout << "silinir " << deyer << "\\n"; }
};

struct alignas(32) Vektor8 { float v[8]; };

int main() {
    say = 0;
    std::vector<int> a;
    for (int i = 0; i < 100; ++i) {
        a.push_back(i);
    }
    int birinci = say;

    say = 0;
    std::vector<int> b;
    b.reserve(100);
    for (int i = 0; i < 100; ++i) {
        b.push_back(i);
    }
    int ikinci = say;
    std::cout << "reserve-siz: " << birinci << ", reserve ilə: " << ikinci << "\\n";

    alignas(Obyekt) unsigned char bufer[sizeof(Obyekt)];   // hazır yaddaş (heap deyil)
    Obyekt* o = new (bufer) Obyekt(5);                     // placement new: yalnız konstruktor
    o->~Obyekt();                                          // əl ilə destruktor

    std::cout << sizeof(Vektor8) << " " << alignof(Vektor8) << "\\n";
    return 0;
}
// Çıxış:
// reserve-siz: 8, reserve ilə: 1
// qurulur 5
// silinir 5
// 32 32` },
          { t: "p", text: "100 push_back reserve olmadan 8 ayırma etdi (capacity 1, 2, 4, 8, 16, 32, 64, 128; nümunədə libstdc++ artımı), reserve ilə isə cəmi 1. Hər reallocation əvvəlki elementləri köçürür və köhnə bloku silir. Placement new isə yaddaş ayırmır: artıq mövcud (stack, arena, bufer) yaddaşda yalnız konstruktoru çağırır. Bu STL konteynerlərinin və custom allokatorların əsas mexanizmidir." },
          { t: "list", items: [
            "Keş (cache): CPU yaddaşı 64 baytlıq keş sətirləri ilə oxuyur. Bitişik massiv ardıcıl oxunanda prefetcher işləyir; göstəricilərlə bağlı struktur (int** , bağlı siyahı) isə hər elementdə keş boşluğu (cache miss, yüzlərlə dövr) verir. 2D massivi int** əvəzinə tək blok kimi saxla: new int[s*h] və i*h+j indeksi, ya da vector<int>.",
            "std::pmr (C++17): monotonic_buffer_resource ilə böyük bufer ayırıb içindən obyekt paylayırsan; hamısı birdən azad olunur. Sorğu başına (request-scoped) ayırmalarda böyük sürət verir.",
            "Small String Optimization: std::string-in içində kiçik (libstdc++-da ≈15 simvol) sətirlər üçün daxili bufer var — belə sətirlər heap-ə getmir. Bu səbəbdən kiçik string kopyası ucuzdur.",
            "Optimizasiya: kompilyator ayırma və silməni birlikdə ləğv edə bilər (heap elision, C++14-dən icazəlidir), ona görə «new çağırıldı» fərziyyəsinə güvənmə. Ayırmalar say funksiyası ilə ölçülsün, fərziyyə ilə yox.",
            "UB və optimizasiya: kompilyator UB olmadığını fərz edir. Use-after-free və ya sərhəddən çıxma debug rejimində «işləyə», -O2-də isə fərqli davranıb sındıra bilər. «Mənim kompüterimdə işləyir» UB üçün sübut deyil.",
            "new[] destruktoru olan tiplər üçün massivin əvvəlində gizli say (cookie) saxlayır; delete[] onu oxuyub neçə destruktor çağıracağını bilir. Bu səbəbdən delete a (new[] üçün) həm yaddaş ünvanını, həm də sayı pozur.",
            "Stack ölçüsü məhduddur: Linux-da adətən 8 MB, Windows-da 1 MB. Dərin rekursiya və böyük yerli massivlər stack overflow verir. C++-da VLA (int a[n]) standart deyil, alloca-dan da çəkin.",
            "Alətlər: -fsanitize=address (ASan: heap/stack overflow, use-after-free, sızma), -fsanitize=undefined (UBSan: signed overflow, yanlış shift, hizalanmamış göstərici), valgrind (yavaş, amma yenidən kompilyasiya tələb etmir). ASan proqramı təxminən 2 dəfə yavaşladır — test və CI-də həmişə aç.",
            "Exception təhlükəsizliyi: new T(args)-da T-nin konstruktoru istisna atsa, ayrılmış yaddaş avtomatik qaytarılır. Amma f(new A, new B) kimi ifadədə B-nin ayrılması uğursuz olsa, A sızır — RAII bunu həll edir.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — stack buferinə delete
alignas(Obyekt) unsigned char bufer[sizeof(Obyekt)];
Obyekt* o = new (bufer) Obyekt(5);
delete o;           // heap-ə aid olmayan yaddaşı free-yə verir`, right: `Obyekt* o = new (bufer) Obyekt(5);
o->~Obyekt();       // placement new ilə yaradılmış obyekt: əl ilə destruktor
// buferin yaddaşını yaradan kim varsa (burada stack) o buraxır`, why: "Placement new yaddaş ayırmır, ona görə delete də yaddaşı qaytara bilməz. Cütlük: placement new ↔ açıq destruktor çağırışı." },
          { t: "warn", text: "Öz operator new-nu yazsan və ya malloc-u birbaşa istifadə etsən, mütləq uyğun azad etmə cütünü istifadə et: malloc↔free, new↔delete, new[]↔delete[]. Qarışdırılmış cütlər heap strukturunu pozur və tez-tez xəbərdarlıqsız çökmə yaradır." },
          { t: "qa", items: [
            ["new operatoru ilə operator new funksiyasının fərqi?", "new ifadəsi (new expression) əvvəlcə operator new ilə xam yaddaş ayırır, sonra konstruktoru çağırır. operator new yalnız xam yaddaş verən funksiyadır (malloc kimi) və yenidən təyin oluna bilər."],
            ["Placement new nədir və nə vaxt lazım olur?", "Artıq mövcud yaddaşda (bufer, arena) obyekt qurmaq üçün: new (ünvan) T(args). Allokatorlar, pool-lar və std::vector bunu daxildə istifadə edir. Silmək üçün destruktoru əl ilə çağırmaq lazımdır."],
            ["Niyə int** əvəzinə bitişik blok yaxşıdır?", "Bir ayırma, bir azad etmə, keş-dostudur (sətirlər yan-yanadır), indeks hesabı sadədir. int** isə hər sətir üçün ayrıca blok və əlavə göstərici oxunuşu tələb edir."],
            ["make_shared-in çatışmazlığı?", "Obyekt və sayğac tək blokda olduğu üçün sonuncu weak_ptr ölənə qədər bütün blok (obyektin yaddaşı da) azad olunmur, baxmayaraq ki obyekt artıq silinib."],
            ["Stack overflow nədən olur?", "Çox dərin rekursiya və ya stack-də böyük massiv. Həll: iterativ alqoritm, böyük məlumatı heap-də (vector) saxlamaq."],
          ]},
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
          { t: "h", text: "Obyektin həyat dövrü: konstruktor və destruktor sırası" },
          { t: "p", text: "Obyekt scope-a girəndə konstruktor, scope-dan çıxanda destruktor avtomatik çağırılır. Bir sinfin içində başqa sinif obyektləri (üzvlər) varsa, onlar əvvəl, elan olunma sırası ilə qurulur; sonra sinfin öz konstruktor bədəni işləyir. Silinmə isə tam əks sırada gedir: əvvəl sinfin destruktor bədəni, sonra üzvlər sondan əvvələ." },
          { t: "code", lang: "cpp", caption: "Qurulma və silinmə sırası", code: `#include <iostream>
#include <string>
#include <utility>

class Lampa {
public:
    explicit Lampa(std::string ad) : ad_(std::move(ad)) {
        std::cout << "yarandı: " << ad_ << "\\n";
    }
    ~Lampa() { std::cout << "söndü: " << ad_ << "\\n"; }
    void yandir() { yanir_ = true; }
    bool yanirmi() const { return yanir_; }

private:
    std::string ad_;
    bool yanir_ = false;
};

class Otaq {
public:
    Otaq() : tavan_("tavan"), stol_("stol") { std::cout << "otaq hazır\\n"; }
    ~Otaq() { std::cout << "otaq bağlandı\\n"; }
private:
    Lampa tavan_;       // üzvlər elan sırası ilə qurulur
    Lampa stol_;
};

int main() {
    Lampa a("A");
    {
        Lampa b("B");
        b.yandir();
        std::cout << std::boolalpha << b.yanirmi() << " " << a.yanirmi() << "\\n";
    }                                    // b burada ölür
    Otaq o;
    std::cout << "main bitir\\n";
    return 0;
}
// Çıxış:
// yarandı: A
// yarandı: B
// true false
// söndü: B
// yarandı: tavan
// yarandı: stol
// otaq hazır
// main bitir
// otaq bağlandı
// söndü: stol
// söndü: tavan
// söndü: A` },
          { t: "p", text: "Bu «yarat — istifadə et — avtomatik təmizlə» davranışı C++-ın ən güclü xüsusiyyətidir (RAII). Fayl, kilid, şəbəkə bağlantısı kimi resursları sinfin içinə qoyub destruktorda buraxsan, heç vaxt unutmazsan." },
          { t: "mistake", lang: "cpp", wrong: `// (Lampa-nın arqumentsiz konstruktoru olduğunu fərz edək)
Lampa l();          // «most vexing parse»: bu obyekt deyil, funksiya elanıdır!
l.yandir();         // XƏTA: l funksiyadır`, right: `Lampa l;           // arqumentsiz default konstruktor — parantezsiz
Lampa l2{};         // və ya {} ilə
l.yandir();`, why: "Parametrsiz konstruktor çağıranda Sinif s(); yazmaq C++ qrammatikasında funksiya elanı sayılır. Sadəcə Sinif s; və ya Sinif s{}; yaz." },
          { t: "mistake", lang: "cpp", wrong: `class Mebel {
public:
    double en;          // public üzv: istənilən yerdən dəyişir
    double uzunluq;
};
Mebel m;
m.en = -5;              // mənfi ölçü qəbul olundu`, right: `class Mebel {
public:
    explicit Mebel(double en, double uz) : en_(en), uz_(uz) {
        if (en <= 0 || uz <= 0) throw std::invalid_argument("ölçü müsbət olmalıdır");
    }
private:
    double en_;
    double uz_;
};`, why: "Public üzvlərlə sinfin qaydaları pozula bilər. Konstruktor yoxlayır, üzvlər isə private-dir — beləliklə obyekt həmişə düzgün vəziyyətdə olur." },
          { t: "terms", items: [
            ["default constructor", "arqumentsiz çağırıla bilən konstruktor. Heç bir konstruktor yazmasan, kompilyator özü yaradır; sən başqa konstruktor yazsan isə avtomatik yaranmır."],
            ["getter / setter", "private üzvü oxuyan / dəyişən metodlar; setter-də yoxlama aparmaq inkapsulyasiyanın mənasıdır."],
            ["member function (metod)", "sinfin daxilində elan olunan və obyekt üzərində çağırılan funksiya."],
            ["scope", "dəyişənin mövcud olduğu {} bloku; blok bitəndə yerli obyektlər destruktorla silinir."],
          ]},
          { t: "list", items: [
            "Header faylında sinfin elanı (.h/.hpp), metodların uzun gövdələri isə .cpp faylında yazılır: void Hesab::yatir(double m) { ... }. Sinfin içində yazılan qısa metodlar avtomatik inline-dır.",
            "Çoxluq fayllı layihədə header-i təkrar daxil etməmək üçün #pragma once və ya include guard işlət.",
            "Getter-i hər üzv üçün avtomatik yazma. Çoxlu getter/setter sinfi sadəcə «dəyişənlər çantasına» çevirir; davranış (metodlar) yaz.",
          ]},
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
          { t: "h", text: "Operator overloading, delegating constructor və default üzv dəyərləri" },
          { t: "p", text: "C++ sənə operatorları (+, ==, <<, []) öz siniflərin üçün təyin etməyə icazə verir. Məqsəd kodu oxunaqlı etməkdir: a + b yazmaq a.topla(b)-dən təbiidir. Qayda: operatorun adi mənasına uyğun davran. + yeni nəticə qaytarır və operandları dəyişmir, += isə cari obyekti dəyişib *this qaytarır. << axın operatorudur və sinfin üzvü ola bilməz (sol operand std::ostream-dir), ona görə friend və ya sadə funksiya kimi yazılır." },
          { t: "code", lang: "cpp", caption: "Vektor sinfi: operatorlar, = default və delegating constructor", code: `#include <iostream>

class Vektor {
public:
    Vektor() = default;                                   // x_ = y_ = 0
    Vektor(double x, double y) : x_(x), y_(y) {}
    explicit Vektor(double x) : Vektor(x, x) {}           // delegating constructor

    Vektor operator+(const Vektor& o) const { return {x_ + o.x_, y_ + o.y_}; }
    Vektor& operator+=(const Vektor& o) {
        x_ += o.x_;
        y_ += o.y_;
        return *this;
    }
    bool operator==(const Vektor&) const = default;       // C++20: üzv-üzv müqayisə

    friend std::ostream& operator<<(std::ostream& os, const Vektor& v) {
        return os << "(" << v.x_ << ", " << v.y_ << ")";
    }

private:
    double x_ = 0.0;                                      // default member initializer
    double y_ = 0.0;
};

int main() {
    Vektor a(1, 2), b(3, 4), c, d(5);
    std::cout << a + b << " " << c << " " << d << "\\n";   // (4, 6) (0, 0) (5, 5)
    a += b;
    std::cout << a << "\\n";                               // (4, 6)
    std::cout << (a == Vektor(4, 6)) << "\\n";             // 1
    return 0;
}` },
          { t: "list", items: [
            "Delegating constructor: bir konstruktor eyni sinfin digər konstruktorunu çağırır (: Vektor(x, x)). Təkrar kodun qarşısını alır.",
            "Default member initializer (double x_ = 0.0;) hər konstruktorda üzvü başlatmağı unutmamağa kömək edir. Konstruktor initializer list-də yazılsa, o üstünlük təşkil edir.",
            "= default kompilyatora «sənin üçün standart versiyanı yaz» deyir. C++20-də operator== = default bütün üzvləri sırayla müqayisə edir; operator<=> = default isə <, >, <=, >= verir.",
            "Operatoru həddən artıq istifadə etmə: Telebe + Telebe mənasızdır. Operator mənası aydın olmayanda adlı funksiya yaz.",
            "Kopyalama zamanı obyektin bütün üzvləri kopyalanır. Üzvlər arasında xam göstərici varsa, yalnız ünvan kopyalanır (dayaz kopya), data yox.",
          ]},
          { t: "h", text: "Kopyalama, köçürmə və copy elision: nə vaxt hansı çağırılır" },
          { t: "p", text: "Kopyalama konstruktoru (T(const T&)) yeni obyekti mövcud obyektin surəti kimi yaradır. Köçürmə konstruktoru (T(T&&)) isə müvəqqəti və ya std::move ilə «vaxtı bitmiş» obyektin resurslarını oğurlayır: surəti yox, sahibliyi keçirir. Köçürülmüş obyekt «etibarlı, amma qeyri-müəyyən» vəziyyətdə qalır — onu silmək və ona yeni dəyər vermək olar, amma dəyərinə güvənmək olmaz." },
          { t: "code", lang: "cpp", caption: "Hansı konstruktor çağırılır?", code: `#include <iostream>
#include <string>
#include <utility>

struct Iz {
    std::string ad;
    Iz(std::string a) : ad(std::move(a)) { std::cout << "ctor " << ad << "\\n"; }
    Iz(const Iz& o) : ad(o.ad + "-kopya") { std::cout << "copy " << ad << "\\n"; }
    Iz(Iz&& o) noexcept : ad(std::move(o.ad)) { std::cout << "move " << ad << "\\n"; }
    ~Iz() { std::cout << "dtor " << ad << "\\n"; }
};

Iz yarat() { return Iz("x"); }
void al(Iz) {}

int main() {
    Iz a("a");
    Iz b = a;              // kopyalama
    Iz c = std::move(a);   // köçürmə
    al(Iz("t"));           // müvəqqəti obyekt birbaşa parametrdə qurulur
    Iz d = yarat();        // copy elision
    std::cout << "son\\n";
    return 0;
}
// Çıxış:
// ctor a
// copy a-kopya
// move a
// ctor t
// dtor t
// ctor x
// son
// dtor x
// dtor a
// dtor a-kopya
// dtor` },
          { t: "p", text: "Çıxışa bax. al(Iz(\"t\")) və yarat() üçün nə copy, nə də move çağırılmadı — obyekt birbaşa son yerində quruldu. Buna copy elision deyilir; C++17-dən funksiyadan müvəqqəti obyekt (prvalue) qaytaranda bu məcburidir. Sonda isə boş ad ilə «dtor» sətri var: a obyektinin string üzvü c-yə köçürüldü, a boş qaldı. Destruktorlar elan sırasının əksi ilə çağırıldı: d, c, b, a." },
          { t: "mistake", lang: "cpp", wrong: `Iz yarat() {
    Iz x("x");
    return std::move(x);     // pis: copy elision-u (NRVO) söndürür
}`, right: `Iz yarat() {
    Iz x("x");
    return x;                // kompilyator özü move edir və ya tamamilə ləğv edir
}`, why: "Yerli dəyişəni qaytararkən std::move yazma. Kompilyator ya elision edir (heç köçürmə də yoxdur), ya da avtomatik move edir. Açıq std::move elision-u əngəlləyir və xəbərdarlıq verir (-Wpessimizing-move)." },
          { t: "mistake", lang: "cpp", wrong: `struct Sayac {
    int n_;
    Sayac() {}              // n_ başlanmayıb
};
Sayac s;
std::cout << s.n_;          // DİQQƏT: UB — zibil dəyər oxunur`, right: `struct Sayac {
    int n_ = 0;             // default dəyər
    Sayac() = default;
};`, why: "Fundamental tiplər (int, double, göstərici) özləri başlanmır. Default member initializer ən sadə həll yoludur." },
          { t: "tip", text: "Tək arqumentli konstruktorları explicit yaz, boş konstruktoru isə = default ilə elan et. Sinifdə kopyalama və köçürmə üçün heç nə yazmasan (Rule of Zero), kompilyator hamısını düzgün yaradır." },
          { t: "qa", items: [
            ["Kopyalama konstruktoru nə vaxt çağırılır?", "Obyekt başqa obyektdən yaradılanda (T b = a;), dəyərlə funksiyaya ötürüləndə və ya dəyərlə qaytarılanda (elision olmadıqda)."],
            ["Köçürmə (move) nə edir?", "Mənbə obyektin resurslarını (məsələn, heap göstəricisini) hədəfə verir, mənbəni boş qoyur. Kopyalamadan daha ucuzdur, çünki data kopyalanmır."],
            ["Delegating constructor nədir?", "Eyni sinfin bir konstruktorunun digər konstruktorunu initializer list-də çağırması; təkrar kodu azaldır."],
          ]},
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
          { t: "h", text: "Yaddaş layout-u: padding, hizalama və noexcept move" },
          { t: "p", text: "Sinfin ölçüsü üzvlərin ölçüsünün sadə cəmi deyil. Hər üzv öz tipinin hizalamasına (alignment) uyğun ünvanda durmalıdır: int adətən 4-ə bölünən ünvanda. Kompilyator üzvlər arasına görünməz boşluq (padding) qoyur, sinfin ölçüsünü isə ən böyük hizalamaya bölünən edir. Eyni üzvlər fərqli sırayla elan olunsa, ölçü fərqli ola bilər." },
          { t: "code", lang: "cpp", caption: "Padding və noexcept move-un vector üzərində təsiri", code: `#include <cstddef>
#include <iostream>
#include <string>
#include <utility>
#include <vector>

struct Pis    { char a; int b; char c; };   // a | 3 bayt boşluq | b | c | 3 bayt boşluq
struct Yaxsi  { int b; char a; char c; };   // b | a | c | 2 bayt boşluq
struct Bos    {};

static int kopya = 0, kocurme = 0;

struct Nox {                                // move noexcept DEYİL
    std::string s = "x";
    Nox() = default;
    Nox(const Nox& o) : s(o.s) { ++kopya; }
    Nox(Nox&& o) : s(std::move(o.s)) { ++kocurme; }
};
struct Nox2 {                               // move noexcept
    std::string s = "x";
    Nox2() = default;
    Nox2(const Nox2& o) : s(o.s) { ++kopya; }
    Nox2(Nox2&& o) noexcept : s(std::move(o.s)) { ++kocurme; }
};

template <class T>
void say(const char* ad) {
    kopya = kocurme = 0;
    std::vector<T> v;
    for (int i = 0; i < 8; ++i) {
        v.emplace_back();
    }
    std::cout << ad << ": kopya=" << kopya << " köçürmə=" << kocurme << "\\n";
}

int main() {
    std::cout << sizeof(Pis) << " " << sizeof(Yaxsi) << " " << sizeof(Bos) << "\\n";
    std::cout << offsetof(Pis, b) << " " << offsetof(Pis, c) << "\\n";
    say<Nox>("noexcept-siz");
    say<Nox2>("noexcept ilə");
    return 0;
}
// Çıxış (64-bit g++):
// 12 8 1
// 4 8
// noexcept-siz: kopya=7 köçürmə=0
// noexcept ilə: kopya=0 köçürmə=7` },
          { t: "p", text: "İlk iki rəqəm eyni üç üzvün 12 və 8 bayt tutduğunu göstərir. Boş sinfin ölçüsü 1-dir: hər obyektin unikal ünvanı olmalıdır. Sonrakı nəticə daha mühüm dərsdir: vector böyüyəndə elementləri yeni blokda yerləşdirməlidir. Köçürmə konstruktoru noexcept deyilsə, vector «strong exception guarantee»-ni qorumaq üçün köçürmək əvəzinə KOPYALAYIR (yarıda istisna atılsa, köhnə məlumat qorunur). Beləcə, noexcept-in unudulması səssizcə 7 kopya = performans itkisi deməkdir." },
          { t: "list", items: [
            "Move konstruktoru və move mənimsətməsini mümkünsə noexcept işarələ. std::vector, std::swap və başqa alqoritmlər bunu yoxlayır.",
            "Rule of Zero-nu pozmursansa kompilyator move-u özü noexcept yaradır. Destruktoru və ya kopyalamanı özün elan etsən, move avtomatik yaranmır — kopyalama səssizcə «move əvəzinə» işlənir.",
            "Hot/cold ayrımı: tez-tez oxunan üzvləri sinfin əvvəlində birlikdə saxla ki, bir keş sətrinə (64 bayt) düşsünlər. Böyük kolleksiyalarda «Array of Structs» yerinə «Struct of Arrays» (hər sahə üçün ayrı vector) çox vaxt SIMD və keş üçün daha yaxşıdır.",
            "Empty Base Optimization: boş baza sinif yer tutmur; üzv kimi saxlasan 1+ bayt tutar. C++20: [[no_unique_address]] boş üzvə eyni imkan verir (stateless allokatorlar və deleter-lər üçün).",
            "this gizli birinci parametrdir: obj.f(x) kompilyasiyada təxminən Sinif::f(&obj, x) olur. Non-virtual metodun çağırışı adi funksiya çağırışıdır və inline oluna bilər.",
            "Pimpl idiom: sinfin implementasiyasını .cpp-dəki ayrıca struct-da gizlədib header-də yalnız unique_ptr<Impl> saxla. ABI sabit qalır, header dəyişikliyi başqa faylları yenidən kompilyasiya etdirmir.",
            "const metod və thread: const metodlar standart kitabxanada paralel oxuma üçün təhlükəsiz sayılır. mutable üzv (kesh, mutex) sən onu özün sinxronlaşdırmasan bunu pozur.",
            "Static initialization order fiasco: müxtəlif .cpp fayllarındakı qlobal obyektlərin qurulma sırası qeyri-müəyyəndir. Qlobal obyekt başqa qlobal obyektdən asılı olursa, funksiya daxilində static dəyişən (Meyers singleton) işlət — ilk çağırışda qurulur və thread-safe-dir.",
            "[[nodiscard]] qaytarılan dəyərin atılmasının qarşısını alır: [[nodiscard]] bool cixar(double);. Səhv xəbərdarlıq kimi ələ keçir.",
            "final sinif (class A final) törədilə bilməz; kompilyator virtual çağırışları devirtualize edə bilər.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `class Resurs {
public:
    ~Resurs() { /* təmizlik */ }          // yalnız destruktor yazılıb
    // move konstruktoru AVTOMATİK YARANMIR
};
std::vector<Resurs> v;                    // vector böyüyəndə köçürmə əvəzinə kopyalanır`, right: `class Resurs {
public:
    ~Resurs() { /* təmizlik */ }
    Resurs(Resurs&&) noexcept = default;
    Resurs& operator=(Resurs&&) noexcept = default;
    Resurs(const Resurs&) = default;
    Resurs& operator=(const Resurs&) = default;
};`, why: "Destruktor elan etmək implicit move-u söndürür; kompilyator kopyalamaya qayıdır. Əməliyyat işləyir, amma yavaşdır. Ya Rule of Zero, ya da hamısını açıq = default / = delete et." },
          { t: "mistake", lang: "cpp", wrong: `Bufer& operator=(const Bufer& o) {
    delete[] data_;                       // əvvəl köhnəni sil
    data_ = new int[o.n_];                // new atsa data_ asılı qalır
    std::copy(o.data_, o.data_ + o.n_, data_);   // a = a olsa o.data_ artıq silinib!
    n_ = o.n_;
    return *this;
}`, right: `Bufer& operator=(Bufer o) noexcept {  // dəyərlə al: kopya artıq burada edilir
    std::swap(n_, o.n_);
    std::swap(data_, o.data_);
    return *this;                         // köhnə məlumat o-nun destruktorunda silinir
}`, why: "Əvvəlki variant iki problemlidir: öz-özünə mənimsətmə (a = a) məlumatı silir və new uğursuz olarsa obyekt etibarsız qalır. Copy-and-swap həm öz-özünə mənimsətməni, həm də istisna təhlükəsizliyini həll edir." },
          { t: "warn", text: "Hər xüsusi funksiyanı (destruktor, kopyalama, köçürmə) ya hamısını, ya heç birini yaz. Yarımçıq yazılan «beşlik» ən çox rast gəlinən resurs sızması və double free mənbəyidir." },
          { t: "qa", items: [
            ["Niyə sizeof sinfin üzvlərinin cəmindən böyük ola bilər?", "Kompilyator hər üzvü hizalamaya uyğun ünvana qoyur və üzvlər arasında/sonda padding əlavə edir. Üzvləri böyükdən kiçiyə sıralamaq çox vaxt ölçünü azaldır."],
            ["Niyə move konstruktoru noexcept olmalıdır?", "std::vector yenidən ayırma zamanı strong guarantee üçün noexcept move yoxdursa kopyalayır. noexcept işarəsi performans fərqi yaradır."],
            ["Copy-and-swap idiomu nədir?", "operator=-u dəyərlə qəbul olunan kopya üzərindən yazırsan: kopyanı yaradırsan, üzvləri swap edirsən, köhnə məlumat kopyanın destruktorunda silinir. İstisna və öz-özünə mənimsətmə təhlükəsizdir."],
            ["Pimpl nə üçündür?", "Implementasiyanı header-dən gizlətmək: kompilyasiya vaxtı azalır, ABI uyğunluğu qorunur."],
            ["Static initialization order fiasco nədir?", "Fərqli tərcümə vahidlərindəki qlobal obyektlərin qurulma sırası qeyri-müəyyən olduğundan, biri digərindən asılıdırsa UB baş verə bilər. Həll: funksiya-daxili static (lazy init)."],
          ]},
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
          { t: "h", text: "protected, konstruktor sırası və baza funksiyasını çağırmaq" },
          { t: "p", text: "Üç giriş səviyyəsi: public hər kəsə, protected sinfin özünə və törəmələrinə, private yalnız sinfin özünə açıqdır. Törəmə sinif bazanın private üzvünə birbaşa çıxış tapa bilməz — bazanın protected və ya public metodları ilə işləməlidir. Obyekt yaranarkən əvvəl baza hissəsi qurulur (törəmənin initializer list-ində baza konstruktoru çağırılır), sonra törəmənin üzvləri və bədəni. Silinmə əks sıradadır." },
          { t: "code", lang: "cpp", caption: "İşçi və Menecer: qurulma/silinmə sırası və virtual çağırış", code: `#include <iostream>
#include <string>
#include <utility>

class Isci {
public:
    Isci(std::string ad, double maas) : ad_(std::move(ad)), maas_(maas) {
        std::cout << "Isci qurulur: " << ad_ << "\\n";
    }
    virtual ~Isci() { std::cout << "Isci silinir: " << ad_ << "\\n"; }

    virtual double aylikOdenis() const { return maas_; }
    void tanit() const {
        std::cout << ad_ << " -> " << aylikOdenis() << " AZN\\n";
    }

protected:                                   // törəmə siniflər görür, kənar kod yox
    double maas() const { return maas_; }

private:
    std::string ad_;
    double maas_;
};

class Menecer : public Isci {
public:
    Menecer(std::string ad, double maas, double bonus)
        : Isci(std::move(ad), maas), bonus_(bonus) {          // baza əvvəl qurulur
        std::cout << "Menecer qurulur\\n";
    }
    ~Menecer() override { std::cout << "Menecer silinir\\n"; }

    double aylikOdenis() const override { return maas() + bonus_; }

private:
    double bonus_;
};

int main() {
    Menecer m("Kamran", 2000, 500);
    m.tanit();                                // Isci::tanit → virtual → Menecer versiyası
    Isci i("Nigar", 1500);
    i.tanit();
    return 0;
}
// Çıxış:
// Isci qurulur: Kamran
// Menecer qurulur
// Kamran -> 2500 AZN
// Isci qurulur: Nigar
// Nigar -> 1500 AZN
// Isci silinir: Nigar
// Menecer silinir
// Isci silinir: Kamran` },
          { t: "p", text: "tanit() Isci-də yazılıb və bir dəfə yazılıb, amma menecer üçün 2500, adi işçi üçün 1500 çıxdı: çünki içindəki aylikOdenis() virtual çağırışdır. Bu, polimorfizmin əsl gücüdür — ümumi kod bir dəfə yazılır, xüsusi hissə törəmədə dəyişir." },
          { t: "mistake", lang: "cpp", wrong: `class Pisik : Heyvan {      // class üçün default irsiyyət PRIVATE-dır
    // ...
};
std::unique_ptr<Heyvan> p = std::make_unique<Pisik>("Mestan");   // XƏTA: çevirmək olmaz`, right: `class Pisik : public Heyvan {
    // ...
};`, why: "struct-da irsiyyət default public, class-da private-dir. Private irsiyyətdə törəmə baza kimi istifadə oluna bilməz (is-a deyil, «implemented-in-terms-of»). Normal hallarda həmişə public yaz." },
          { t: "mistake", lang: "cpp", wrong: `class Toreme : public Baza {
public:
    Toreme(int x) {          // Baza-nın default konstruktoru yoxdursa XƏTA
        x_ = x;
    }
};`, right: `class Toreme : public Baza {
public:
    Toreme(int x, int b) : Baza(b), x_(x) {}   // baza konstruktoru açıq çağırılır
};`, why: "Baza hissəsi mütləq qurulmalıdır. Baza-nın arqumentsiz konstruktoru yoxdursa, törəmə onu initializer list-də açıq çağırmalıdır." },
          { t: "list", items: [
            "Baza funksiyasını törəmədən çağırmaq: Baza::funksiya(); — əvəzləyən funksiya baza versiyasını tamamlaya bilər.",
            "Törəmə sinifdə eyni adlı funksiya (virtual olmasa) bazanın bütün həddindən artıq yüklənmələrini gizlədir (name hiding). Onları açmaq üçün using Baza::f; yaz.",
            "Kod təkrarını azaltmaq üçün irsiyyət əvəzinə üzvlük (composition) çox vaxt daha yaxşıdır; irsiyyət yalnız «is-a» və Liskov prinsipi (törəmə baza əvəzinə düzgün işləyir) ödəndikdə.",
            "Abstrakt sinifin də konstruktoru ola bilər: törəmə obyekt qurulanda çağırılır, amma abstrakt sinfin obyekti birbaşa yaradıla bilməz.",
          ]},
          { t: "terms", items: [
            ["is-a / has-a", "is-a: irsiyyət (Pisik Heyvandır); has-a: tərkib (Avtomobilin mühərriki var)."],
            ["Liskov Substitution Principle", "törəmə sinif obyekti baza sinfin gözlənilən davranışını pozmadan onun yerinə işlənə bilməlidir."],
            ["early binding / late binding", "funksiya çağırışının kompilyasiya / icra zamanı seçilməsi; virtual funksiyalar late binding-dir."],
            ["interface", "yalnız saf virtual funksiyaları və virtual destruktoru olan sinif — davranış müqaviləsi."],
          ]},
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
          { t: "h", text: "Strategy nümunəsi: interfeys + composition" },
          { t: "p", text: "Polimorfizm ən çox «davranışı dəyişdirmək» lazım olanda işə yarayır. Aşağıdakı Strategy nümunəsində Magaza hansı ödəniş növünün işləndiyini bilmir — o yalnız Odenis interfeysi ilə danışır. Ödəniş üsulunu icra zamanı dəyişmək də olar. İrsiyyət yalnız interfeys üçündür; Magaza isə Odenis-i üzv kimi saxlayır (composition)." },
          { t: "code", lang: "cpp", caption: "Interfeys, unique_ptr və iş zamanı strategiya dəyişikliyi", code: `#include <iostream>
#include <memory>
#include <string>
#include <utility>

class Odenis {                                      // interfeys
public:
    virtual ~Odenis() = default;
    virtual bool ode(double mebleg) = 0;
    virtual std::string ad() const = 0;
};

class Kart : public Odenis {
public:
    bool ode(double m) override { return m <= 1000.0; }
    std::string ad() const override { return "Kart"; }
};

class Nagd : public Odenis {
public:
    bool ode(double m) override { return m <= 200.0; }
    std::string ad() const override { return "Nağd"; }
};

class Magaza {                                      // composition: strategiyanı saxlayır
public:
    explicit Magaza(std::unique_ptr<Odenis> o) : odenis_(std::move(o)) {}
    void sat(double m) {
        std::cout << odenis_->ad() << " ilə " << m << " AZN: "
                  << (odenis_->ode(m) ? "uğurlu" : "rədd") << "\\n";
    }
    void odenisDeyis(std::unique_ptr<Odenis> o) { odenis_ = std::move(o); }   // iş zamanı dəyişir
private:
    std::unique_ptr<Odenis> odenis_;
};

int main() {
    Magaza m(std::make_unique<Kart>());
    m.sat(500);
    m.odenisDeyis(std::make_unique<Nagd>());
    m.sat(500);
    return 0;
}
// Çıxış:
// Kart ilə 500 AZN: uğurlu
// Nağd ilə 500 AZN: rədd` },
          { t: "p", text: "Yeni ödəniş növü (məsələn, Kripto) əlavə etmək üçün Magaza-ya toxunmayırıq: yalnız yeni sinif yazırıq. Buna Open/Closed prinsipi deyilir: genişləməyə açıq, dəyişməyə bağlı. if (tip == KART) ... else if (tip == NAGD) ... şəkilli kod isə hər yeni növdə hər yerdə dəyişməyi tələb edir." },
          { t: "h", text: "dynamic_cast, bad_cast və final" },
          { t: "code", lang: "cpp", caption: "Tipi icra zamanı yoxlamaq", code: `#include <iostream>
#include <memory>
#include <typeinfo>

struct Baza {
    virtual void f(int) const { std::cout << "Baza::f(int)\\n"; }
    virtual ~Baza() = default;
};
struct Toreme : Baza {
    void f(int) const override { std::cout << "Toreme::f(int)\\n"; }
    void g() { std::cout << "g\\n"; }
};
struct Son final : Toreme {};                 // final: bundan törətmək olmaz

int main() {
    std::unique_ptr<Baza> p = std::make_unique<Toreme>();
    p->f(1);
    Baza* bp = p.get();
    if (dynamic_cast<Son*>(bp) == nullptr) {  // göstərici: uğursuzluq → nullptr
        std::cout << "Son deyil\\n";
    }
    try {
        Baza& r = *bp;
        (void)dynamic_cast<Son&>(r);          // referans: uğursuzluq → istisna
    } catch (const std::bad_cast& e) {
        std::cout << "bad_cast tutuldu\\n";
    }
    return 0;
}
// Çıxış:
// Toreme::f(int)
// Son deyil
// bad_cast tutuldu` },
          { t: "p", text: "dynamic_cast icra zamanı RTTI (run-time type information) istifadə edir, ona görə bir qədər bahalıdır. Hər çağırışda onu görürsənsə, yəqin ki, virtual funksiya çatışmır. Əvvəlcədən əmin olduğun hallarda isə sadə yoxlamalar (məsələn, obyektin tip kodu) kifayət edə bilər, amma dizayn məsələsi olaraq virtual funksiya daha təmizdir." },
          { t: "mistake", lang: "cpp", wrong: `struct Baza {
    virtual void yaz(int x) const {}
};
struct Toreme : Baza {
    void yaz(double x) const override {}   // XƏTA: override uyğun virtual tapmır (double ≠ int)
};`, right: `struct Toreme : Baza {
    void yaz(int x) const override {}
};`, why: "Parametr tipi dəyişsə, bu artıq əvəzləmə deyil, yeni funksiyadır. override sayəsində kompilyator bu səhvi dərhal göstərir; onsuz baza versiyası səssizcə çağırılmağa davam edərdi." },
          { t: "mistake", lang: "cpp", wrong: `struct Heyvan {
    virtual void ses() const = 0;
};
Heyvan h;                         // XƏTA: abstrakt sinif obyekti yaradıla bilməz
std::vector<Heyvan> suru;         // XƏTA: eyni səbəb`, right: `std::vector<std::unique_ptr<Heyvan>> suru;   // göstərici ilə
suru.push_back(std::make_unique<Pisik>("Mestan"));`, why: "Abstrakt sinif yalnız interfeysdir. Polimorfik kolleksiyalar baza göstərici (unique_ptr<Baza>) və ya referans (reference_wrapper) ilə saxlanılır." },
          { t: "tip", text: "Müsahibədə tez-tez soruşulur: «interfeys və abstrakt sinif fərqi?» C++-da dil səviyyəsində interface açar sözü yoxdur — interfeys yalnız saf virtual funksiyalar və virtual destruktordan ibarət abstrakt sinifdir. Abstrakt sinifdə isə üzv dəyişənlər və hazır metodlar ola bilər." },
          { t: "qa", items: [
            ["Open/Closed prinsipi virtual funksiyalarla necə işləyir?", "Yeni davranış yeni törəmə sinif kimi əlavə olunur, mövcud kod (Magaza) dəyişmir. Əvəzində tip yoxlayıb if/switch yazsaydın, hər yeni tipdə bütün yerləri dəyişməli olardın."],
            ["override açar sözünün faydası?", "Yazdığın funksiyanın həqiqətən virtual funksiyanı əvəzlədiyini kompilyator yoxlayır; imza uyğunsuzluğu kompilyasiya xətası verir."],
            ["dynamic_cast nə zaman uğursuz olur?", "Obyektin real tipi hədəf tipi (və ya ondan törəmə) deyilsə: göstəricidə nullptr, referansda std::bad_cast."],
            ["Composition irsiyyətdən niyə çox vaxt yaxşıdır?", "Daha az bağlıdır: daxili sinifin dəyişməsi xaricdə daha az təsir göstərir, irsiyyət isə baza interfeysini tamamilə miras alır və Liskov pozuntusuna aparır."],
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
          { t: "h", text: "vtable-ın daxilində: virtual çağırışı əl ilə yazaq" },
          { t: "p", text: "Ən geniş yayılmış ABI-də (Itanium ABI: GCC, Clang) virtual funksiyası olan sinfin hər obyektinin əvvəlində vptr durur. O, sinif üçün bir dəfə yaradılmış vtable-a işarə edir. Vtable-da virtual funksiyaların ünvanları (və dynamic_cast/typeid üçün RTTI göstəricisi, çoxlu irsiyyətdə offset-lər) olur. p->ses() çağırışı təxminən belə işləyir: p-dən vptr oxu, vtable-dan N-ci ünvanı götür, onu çağır. Aşağıda eyni mexanizmi C üslubunda əl ilə yazırıq." },
          { t: "code", lang: "cpp", caption: "Əl ilə vtable, CRTP və std::variant: üç polimorfizm yolu", code: `#include <iostream>
#include <type_traits>
#include <variant>

// 1) Əl ilə vtable: virtual-ın mahiyyəti
struct Obyekt;
struct VTable { void (*ses)(const Obyekt*); };
struct Obyekt { const VTable* vt; int id; };
void pisikSes(const Obyekt* o) { std::cout << "miyav " << o->id << "\\n"; }
void itSes(const Obyekt* o) { std::cout << "hav " << o->id << "\\n"; }
const VTable pisikVT{&pisikSes};
const VTable itVT{&itSes};

// 2) CRTP: statik polimorfizm, vtable yoxdur
template <class T>
struct Shekil {
    double sahe() const { return static_cast<const T*>(this)->saheImpl(); }
};
struct Kvadrat : Shekil<Kvadrat> {
    explicit Kvadrat(double a) : a_(a) {}
    double saheImpl() const { return a_ * a_; }
private:
    double a_;
};
template <class T>
void yaz(const Shekil<T>& s) { std::cout << "sahə: " << s.sahe() << "\\n"; }

// 3) std::variant + visit: qapalı tiplər çoxluğu
struct Daire { double r; };
struct Duzbucaq { double a, b; };
using Fiqur = std::variant<Daire, Duzbucaq>;

template <class... Fs> struct overloaded : Fs... { using Fs::operator()...; };
template <class... Fs> overloaded(Fs...) -> overloaded<Fs...>;

double sahe(const Fiqur& f) {
    return std::visit(overloaded{
        [](const Daire& d) { return 3.14159 * d.r * d.r; },
        [](const Duzbucaq& d) { return d.a * d.b; },
    }, f);
}

int main() {
    Obyekt a{&pisikVT, 1}, b{&itVT, 2};
    for (const Obyekt* o : {&a, &b}) {
        o->vt->ses(o);                      // virtual çağırışın əl ilə versiyası
    }
    yaz(Kvadrat(3));
    Fiqur f1 = Daire{1.0}, f2 = Duzbucaq{2.0, 3.0};
    std::cout << sahe(f1) << " " << sahe(f2) << "\\n";
    return 0;
}
// Çıxış:
// miyav 1
// hav 2
// sahə: 9
// 3.14159 6` },
          { t: "list", items: [
            "Dinamik polimorfizm (virtual): açıq tiplər çoxluğu, istənilən yerdə yeni törəmə sinif əlavə edə bilərsən (plagin arxitekturası). Qiyməti: dolayı çağırış, inline yoxdur, hər obyektdə +8 bayt.",
            "CRTP: statik (kompilyasiya zamanı) polimorfizm. Çağırış inline olunur, vptr yoxdur. Amma müxtəlif tipləri bir konteynerdə saxlamaq olmur, hər tip ayrı şablon instansiyasıdır (kod şişməsi).",
            "std::variant + std::visit: tiplər çoxluğu qapalıdır və kompilyasiya zamanı məlumdur. Heap-ə ehtiyac yoxdur, keş-dostudur; yeni tip əlavə etsən visit-lər kompilyasiya xətası verir (unutmazsan).",
            "Type erasure (std::function, std::any): daxildə virtual-dan istifadə edir, amma xaricə dəyər semantikası verir; irsiyyət tələb etmir.",
            "Çoxlu irsiyyətdə obyektdə hər baza üçün ayrıca vptr ola bilər; törəmə→ikinci baza çevirməsi göstərici ünvanını dəyişir (adjustment). Buna görə reinterpret_cast ilə baza göstəricilərini çevirmək təhlükəlidir.",
            "Dolayı çağırışın qiyməti mikrosaniyələr yox, nanosaniyələrlə ölçülür; əsl problem inline olunmamasıdır və CPU-nun branch predictor-unun səhv proqnozudur. Eyni tip obyektləri ardıcıl emal etsən proqnoz yaxşı olur; qarışıq tiplərdə pisləşir.",
            "Devirtualization: kompilyator obyektin real tipini bilirsə (final, yerli obyekt, LTO/PGO) virtual çağırışı birbaşa çağırışa çevirir. final bunun ən sadə yoludur.",
            "Covariant return: əvəzləyən funksiya baza qaytarma tipinin törəməsini qaytara bilər (Baza* klon() → Toreme* klon()). Virtual klon() idiomu kopyalamanı polimorfik edir (slicing olmadan).",
            "Saf virtual funksiyanın gövdəsi də ola bilər (törəmə onu Baza::f() ilə çağıra bilər). Saf virtual destruktor da mümkündür, amma gövdəsi mütləq yazılmalıdır.",
            "Kompilyator bayraqları: -Wnon-virtual-dtor, -Woverloaded-virtual, -Wsuggest-override. -fno-rtti dynamic_cast və typeid-i söndürür (bəzi embedded layihələrdə).",
          ]},
          { t: "code", lang: "cpp", caption: "Konstruktorda virtual çağırış və vptr ölçüsü", code: `#include <iostream>

struct Baza {
    Baza() { salam(); }                                   // virtual çağırış konstruktorda
    virtual void salam() const { std::cout << "Baza\\n"; }
    virtual ~Baza() = default;
};
struct Toreme : Baza {
    void salam() const override { std::cout << "Toreme\\n"; }
};

struct Adi { int x; };
struct Virtual { int x; virtual void f() {} };

int main() {
    Toreme t;               // konstruktor zamanı Toreme hissəsi hələ qurulmayıb
    t.salam();              // indi artıq Toreme versiyası
    std::cout << sizeof(Adi) << " " << sizeof(Virtual) << "\\n";
    return 0;
}
// Çıxış (64-bit):
// Baza
// Toreme
// 4 16` },
          { t: "p", text: "Birinci sətirə diqqət: Toreme obyekti qurulanda Baza-nın konstruktoru işləyərkən obyektin «tipi» hələ Baza-dır (vptr Baza vtable-ına qurulub), ona görə salam() Toreme-yə yox, Baza versiyasına gedir. Əgər salam() saf virtual olsaydı, bu, UB (praktiki olaraq «pure virtual function called» xətası) olardı. Ölçü nəticəsi də maraqlıdır: Virtual strukturu int (4) + 8 baytlıq vptr + 4 bayt padding = 16 bayt tutur." },
          { t: "mistake", lang: "cpp", wrong: `struct Baza {
    virtual std::unique_ptr<Baza> klon() const = 0;
};
void kopyala(const Baza& b) {
    Baza yeni = b;                    // Baza abstraktdırsa XƏTA; abstrakt deyilsə slicing (törəmə hissə itir)
}`, right: `struct Baza {
    virtual ~Baza() = default;
    virtual std::unique_ptr<Baza> klon() const = 0;   // virtual copy constructor idiomu
};
struct Toreme : Baza {
    std::unique_ptr<Baza> klon() const override {
        return std::make_unique<Toreme>(*this);
    }
};
// istifadə: auto surət = b.klon();`, why: "Polimorfik obyekti kopyalamaq üçün baza tipin kopyalama konstruktoru yaramır (slicing). Virtual klon() törəmə tipi özü bilir və düzgün surət yaradır." },
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — C tipli çevirmə ilə yanlış baza göstəricisi
struct A { virtual ~A() = default; int a; };
struct B { virtual ~B() = default; int b; };
struct C : A, B {};
C c;
B* pb = reinterpret_cast<B*>(static_cast<A*>(&c));   // B alt-obyektinin ünvanı deyil!`, right: `C c;
A* pa = &c;
B* pb = &c;              // kompilyator ünvanı düzgün düzəldir (adjustment)
// aşağı çevirmə: dynamic_cast<C*>(pb)`, why: "Çoxlu irsiyyətdə B hissəsi C obyektinin əvvəlində yox, A-dan sonra durur. Düzgün implicit çevirmə ünvanı avtomatik hesablayır; reinterpret_cast isə sadəcə bitləri kopyalayır." },
          { t: "warn", text: "Təhlükəsizlik mühəndisliyində: vptr/vtable ələ keçirmə (vtable hijacking) klassik exploit üsuludur. Müasir müdafiələr: control-flow integrity (clang: -fsanitize=cfi, MSVC Control Flow Guard), vtable-lar yalnız oxunan yaddaşda (.rodata) durur. Sən isə use-after-free və heap overflow-dan qaçmaqla bu hücumların əsasını aradan qaldırırsan." },
          { t: "qa", items: [
            ["Virtual çağırışın qiyməti nədir?", "Bir vptr oxunuşu, bir vtable oxunuşu və dolayı keçid: inline olunmur, branch prediction səhv ola bilər. Tipik proqramlarda kiçikdir, sıx dövrlərdə ciddi ola bilər; qapalı tip çoxluğu üçün variant/CRTP alternativdir."],
            ["Konstruktor/destruktorda virtual çağırış niyə törəməyə getmir?", "Konstruktor zamanı obyektin dinamik tipi hələ baza tipidir (vptr baza vtable-ına qurulub), destruktorda isə törəmə hissə artıq silinib. Ona görə cari sinfin versiyası çağırılır."],
            ["CRTP nədir?", "Curiously Recurring Template Pattern: sinif öz özünü şablon arqumenti kimi bazaya verir (class A : Base<A>). Baza static_cast ilə törəmənin funksiyasını çağırır — statik polimorfizm, vtable yoxdur."],
            ["Virtual funksiya şablon ola bilərmi?", "Xeyr. Virtual funksiya vtable-da sabit yerə malik olmalıdır, şablon isə hər instansiyada fərqli funksiya yaradır. Həll: type erasure və ya CRTP."],
            ["Çoxlu irsiyyətdə niyə iki vptr ola bilər?", "Hər baza sinfin öz vtable düzümü olmalıdır; törəmə obyektdə ikinci baza alt-obyekti öz vptr-i ilə ayrıca dayanır. Göstərici çevirməsi ünvanı bu offset qədər düzəldir."],
          ]},
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
          { t: "h", text: "vector ilə gündəlik əməliyyatlar" },
          { t: "p", text: "std::vector C++-da ən çox işlənən konteynerdir. Ölçüsü işləyərkən dəyişir, elementləri yaddaşda yan-yana (bitişik) durur və massiv kimi indekslə oxunur. İterator (begin(), end()) vasitəsilə mövqeyi göstərə bilərsən; end() son elementdən SONRAKI mövqedir və oxunmamalıdır. Aşağıdakı nümunədə əsas əməliyyatları görürsən." },
          { t: "code", lang: "cpp", caption: "insert, erase, iterator, 2D vector, emplace_back", code: `#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<int> v = {10, 20, 30};
    v.insert(v.begin() + 1, 15);                 // 10 15 20 30
    v.erase(v.begin());                          // 15 20 30
    v.pop_back();                                // 15 20
    std::cout << v.front() << " " << v.back() << " " << v.size() << "\\n";   // 15 20 2

    for (auto it = v.begin(); it != v.end(); ++it) {   // iterator ilə dövr
        std::cout << *it << " ";                       // 15 20
    }
    std::cout << "\\n";

    std::vector<std::vector<int>> cedvel(3, std::vector<int>(4, 0));   // 3 sətir, 4 sütun, hamısı 0
    cedvel[1][2] = 7;
    int cem = 0;
    for (const auto& setir : cedvel) {
        for (int x : setir) {
            cem += x;
        }
    }
    std::cout << cem << " " << cedvel.size() << "x" << cedvel[0].size() << "\\n";   // 7 3x4

    std::vector<std::string> adlar;
    adlar.push_back("Aysel");
    adlar.emplace_back("Orxan");                 // string-i yerində qurur
    std::string birlesmis;
    for (const std::string& ad : adlar) {        // const& — kopya yoxdur
        birlesmis += ad + ";";
    }
    std::cout << birlesmis << "\\n";               // Aysel;Orxan;

    std::cout << std::boolalpha << v.empty() << "\\n";   // false
    v.clear();
    std::cout << v.empty() << " " << v.size() << "\\n";  // true 0
    return 0;
}` },
          { t: "list", items: [
            "size() cari elementlərin sayıdır, capacity() isə yeni yer ayırmadan neçə element yerləşdiyini göstərir. Əlavə etdikcə size artır, capacity vaxtaşırı böyüyür.",
            "push_back mövcud obyekti kopyalayır/köçürür, emplace_back isə arqumentləri götürüb obyekti vektorun içində birbaşa qurur.",
            "Ortada insert/erase bütün sonrakı elementləri sürüşdürür (O(n)). Sona əlavə isə (amortizə olunmuş) ucuzdur.",
            "range-based for-da dəyəri dəyişmək istəyirsənsə for (auto& x : v), yalnız oxumaq istəyirsənsə for (const auto& x : v), kiçik tiplər (int) üçün for (int x : v).",
            "vector<bool> xüsusi (bit-paketlənmiş) versiyadır və adi konteyner kimi davranmır; çoxlu bool lazımdırsa vector<char> və ya std::bitset götür.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v(5);       // 5 element: 0 0 0 0 0
v.push_back(9);              // 6 element: 0 0 0 0 0 9 — gözlənilən deyil
std::vector<int> w;
w[0] = 1;                    // DİQQƏT: UB — boş vector-da element yoxdur`, right: `std::vector<int> v;
v.reserve(5);                // yer ayır, ölçü 0
v.push_back(9);              // 1 element
std::vector<int> w(5);
w[0] = 1;                    // OK: 5 element mövcuddur`, why: "vector<int> v(5) ölçüsü 5 olan vector yaradır (reserve deyil). İndekslə yalnız artıq mövcud elementlərə yazmaq olar; boş vector-a w[0] yazmaq UB-dir. Yeni elementlər üçün push_back işlət." },
          { t: "mistake", lang: "cpp", wrong: `for (const std::string s : adlar) {   // hər addımda string KOPYALANIR
    std::cout << s << "\\n";
}`, right: `for (const std::string& s : adlar) {  // referans: kopya yoxdur
    std::cout << s << "\\n";
}`, why: "Böyük obyektləri (string, struct) dövrdə dəyərlə alsan hər element kopyalanır. const auto& həm sürətli, həm təhlükəsizdir." },
          { t: "terms", items: [
            ["size / capacity", "elementlərin sayı / yeni ayırmadan əvvəl yerləşə bilən element sayı."],
            ["emplace_back", "elementi konteynerin içində birbaşa qurur (artıq kopyalama/köçürmə yoxdur)."],
            ["range-based for", "for (auto x : kolleksiya) — begin/end iteratorlarını gizli idarə edən dövr."],
            ["begin() / end()", "ilk elementə / sonuncudan sonrakı mövqeyə iterator."],
          ]},
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
          { t: "h", text: "Digər konteynerlər: array, deque, priority_queue, string_view" },
          { t: "code", lang: "cpp", caption: "Əlavə konteynerlər və alqoritmlər", code: `#include <algorithm>
#include <array>
#include <deque>
#include <functional>
#include <iostream>
#include <map>
#include <queue>
#include <string>
#include <string_view>
#include <unordered_map>
#include <vector>

void salamla(std::string_view ad) {                 // kopyalamadan yalnız baxır
    std::cout << "Salam, " << ad << "\\n";
}

int main() {
    std::array<int, 4> a = {4, 3, 2, 1};
    std::sort(a.begin(), a.end());
    std::cout << a[0] << a[3] << " ölçü=" << a.size() << "\\n";            // 14 ölçü=4

    std::priority_queue<int> max_heap;               // ən böyük üstdə
    for (int x : {3, 9, 1, 7}) max_heap.push(x);
    std::cout << "top: " << max_heap.top() << "\\n";                        // top: 9

    std::priority_queue<int, std::vector<int>, std::greater<>> min_heap;   // ən kiçik üstdə
    for (int x : {3, 9, 1, 7}) min_heap.push(x);
    std::cout << "min: " << min_heap.top() << "\\n";                        // min: 1

    std::deque<int> dq;
    dq.push_back(2);
    dq.push_front(1);
    dq.push_back(3);
    std::cout << dq.front() << dq.back() << "\\n";                          // 13

    std::map<std::string, int> m;
    m.try_emplace("a", 1);
    auto [it, eklendi] = m.insert({"a", 5});         // artıq var: əlavə olunmur
    std::cout << eklendi << " " << it->second << "\\n";                     // 0 1

    std::vector<int> v = {1, 3, 5, 5, 7, 9};         // SIRALI
    auto lo = std::lower_bound(v.begin(), v.end(), 5);
    auto hi = std::upper_bound(v.begin(), v.end(), 5);
    std::cout << (lo - v.begin()) << " " << (hi - v.begin()) << "\\n";      // 2 4

    std::unordered_map<std::string, int> say;
    for (std::string_view s : {"a", "b", "a", "c", "a"}) {
        ++say[std::string(s)];
    }
    std::cout << say["a"] << "\\n";                                          // 3

    salamla("Aysel");                                // Salam, Aysel
    std::string uzun = "Orxan";
    salamla(uzun);                                   // Salam, Orxan
    return 0;
}` },
          { t: "list", items: [
            "std::array<T, N> — ölçüsü kompilyasiyada məlum, stack-də yaşayır, heap ayırmır. C massivindən üstünlüyü: ölçünü bilir (size()), kopyalana bilir, funksiyaya göstəriciyə «çürümür».",
            "std::deque — hər iki ucda O(1) əlavə/silmə. Elementlər bir neçə bloka bölünür: massiv kimi indekslənir, amma tam bitişik deyil.",
            "std::priority_queue — heap əsaslıdır: top() O(1), push/pop O(log n). Defolt max-heap; min-heap üçün std::greater<> ver.",
            "map::insert və try_emplace mövcud açarı üzərinə yazmır; cüt (iterator, bool) qaytarır, bool əlavə olunub-olunmadığını bildirir. insert_or_assign isə üstündən yazır.",
            "lower_bound — ilk element ≥ dəyər; upper_bound — ilk element > dəyər. Aralarındakı məsafə təkrarların sayıdır. Yalnız SIRALI aralıqda işləyir.",
            "std::string_view (C++17) — sətrə kopyalamadan baxan yüngül «pəncərə» (göstərici + ölçü). Funksiya parametri kimi const std::string&-dən çox vaxt yaxşıdır. Amma sətrin sahibi deyil: orijinal silinsə, view asılı qalır.",
            "std::stable_sort bərabər elementlərin nisbi sırasını saxlayır, sort isə yox. Strukturu iki açara görə sıralayanda stable_sort + iki keçid istifadə edilə bilər.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `std::string_view yarat() {
    std::string s = "müvəqqəti";
    return s;                    // DİQQƏT: UB — s silinəndən sonra view asılı qalır
}
std::string_view v = std::string("abc");   // müvəqqəti string dərhal silinir`, right: `std::string yarat() {
    return "müvəqqəti";          // sahib sinfi qaytar
}
std::string s = "abc";
std::string_view v = s;          // s yaşadıqca v etibarlıdır`, why: "string_view sətri saxlamır, yalnız ona baxır. Mənbə (string) silinəndə view-in göstəricisi etibarsız olur (use-after-free). Funksiya parametrində işlət, qaytarmada və üzvdə ehtiyatlı ol." },
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v = {5, 1, 4};
auto it = std::lower_bound(v.begin(), v.end(), 4);   // v SIRALI DEYİL: nəticə mənasızdır`, right: `std::sort(v.begin(), v.end());
auto it = std::lower_bound(v.begin(), v.end(), 4);   // artıq O(log n) və düzgün`, why: "Binary axtarış alqoritmləri (lower_bound, upper_bound, binary_search, equal_range) aralığın sıralı olduğunu fərz edir. Sıralanmamış aralıqda nəticə qeyri-müəyyəndir." },
          { t: "tip", text: "Konteyner seçimi sualları: 1) açar-dəyər lazımdırmı (map / unordered_map)? 2) təkrarsızlıq lazımdırmı (set)? 3) sıra lazımdırmı (map / set / sort edilmiş vector)? 4) ucda növbə (deque / queue)? Əksər cavab «hələlik vector»dur — yoxla, ölç, sonra dəyiş." },
          { t: "terms", items: [
            ["string_view", "sətrə sahiblik etmədən baxan yüngül sinif (C++17)."],
            ["heap (data structure)", "ən böyük/kiçik elementin üstdə olduğu ağac strukturu; priority_queue onun üzərində qurulub."],
            ["lower_bound / upper_bound", "sıralı aralıqda ikili axtarışla uyğun mövqeyi tapan alqoritmlər."],
            ["structured binding", "auto [a, b] = cüt; — cüt/tuple/struct-ı adlı dəyişənlərə ayırmaq (C++17)."],
          ]},
          { t: "qa", items: [
            ["unordered_map nə vaxt map-dan yaxşıdır?", "Sıra lazım deyilsə və açarın yaxşı hash-ı varsa: orta O(1) axtarış. Sıralı keçid, aralıq sorğuları (lower_bound) və ya pis hash riski varsa map."],
            ["string_view və const string& fərqi?", "string_view eyni zamanda C sətirlərindən və hissə-sətirlərdən kopyasız yaradıla bilir; amma sahib deyil və null-terminat zəmanəti vermir."],
            ["emplace_back push_back-dən nə ilə fərqlənir?", "emplace_back arqumentləri konstruktora ötürüb obyekti vektorda birbaşa qurur; push_back hazır obyekti kopyalayır/köçürür. Praktik fərq çox vaxt kiçikdir, amma çox arqumentli tiplərdə aydınlıq və sürət verir."],
            ["priority_queue-də ən kiçik elementi necə almaq olar?", "Üçüncü şablon arqumenti kimi std::greater<>: priority_queue<int, vector<int>, greater<>>."],
          ]},
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
          { t: "h", text: "Capacity artımı, ranges, span və xüsusi hash" },
          { t: "code", lang: "cpp", caption: "C++20: capacity müşahidəsi, ranges, erase_if, span, unordered_set + hash", code: `#include <algorithm>
#include <cstddef>
#include <iostream>
#include <ranges>
#include <span>
#include <unordered_set>
#include <vector>

struct Nokta {
    int x, y;
    bool operator==(const Nokta&) const = default;
};
struct NoktaHash {
    std::size_t operator()(const Nokta& p) const {
        return std::hash<int>{}(p.x) * 31 + std::hash<int>{}(p.y);
    }
};

int cem(std::span<const int> s) {                    // massiv, vector, array — hamısını qəbul edir
    int c = 0;
    for (int x : s) c += x;
    return c;
}

int main() {
    std::vector<int> v;
    std::size_t kohne = 0;
    for (int i = 0; i < 20; ++i) {
        v.push_back(i);
        if (v.capacity() != kohne) {
            kohne = v.capacity();
            std::cout << "capacity=" << kohne << " ";
        }
    }
    std::cout << "\\n";

    std::vector<int> w = {1, 2, 3};
    w.reserve(3);
    const int* evvel = w.data();
    w.push_back(4);                                  // capacity bitdi → yeni blok
    std::cout << (evvel == w.data() ? "eyni blok" : "yeni blok") << "\\n";

    std::vector<int> e = {5, 2, 8, 1, 9, 4};
    auto cut_kvadrat = e | std::views::filter([](int x) { return x % 2 == 0; })
                         | std::views::transform([](int x) { return x * x; });
    for (int x : cut_kvadrat) std::cout << x << " ";
    std::cout << "\\n";

    std::ranges::sort(e);
    std::cout << e.front() << " " << e.back() << "\\n";

    std::erase_if(e, [](int x) { return x > 5; });   // C++20
    std::cout << e.size() << " " << cem(e) << "\\n";

    std::unordered_set<Nokta, NoktaHash> s;
    s.insert({1, 2});
    s.insert({1, 2});
    s.insert({3, 4});
    std::cout << s.size() << "\\n";
    return 0;
}
// Çıxış (g++/libstdc++):
// capacity=1 capacity=2 capacity=4 capacity=8 capacity=16 capacity=32
// yeni blok
// 4 64 16
// 1 9
// 4 12
// 2` },
          { t: "p", text: "libstdc++ və libc++ capacity-ni hər dəfə 2 dəfə artırır; MSVC isə 1.5 dəfə. Hər artımda köhnə elementlər yeni blokda yerləşdirilir və köhnə blok silinir — ona görə w.data() ünvanı dəyişdi: əvvəl saxlanmış hər hansı iterator, göstərici və referans etibarsız oldu. ranges::views isə tənbəldir (lazy): filter və transform yalnız dövr zamanı hesablanır, heç bir aralıq vector yaradılmır." },
          { t: "list", items: [
            "Iterator invalidation cədvəli (qısa): vector — push_back reallocation olarsa hamısı, olmazsa yalnız end(); insert/erase — mövqedən sonrakılar. deque — ortaya insert/erase hamısını, başa/sona insert iteratorları (referanslar yox). list/map/set — yalnız silinən element. unordered_* — rehash olarsa bütün iteratorlar (referanslar və göstəricilər qalır).",
            "Hash cədvəli: elementlər bucket-lərə (bölmələrə) paylanır; load_factor = elementlər / bucket sayı. Hədd (max_load_factor, defolt 1.0) aşılanda rehash baş verir: bütün elementlər yenidən paylanır. Əvvəlcədən reserve(n) çağır.",
            "libstdc++-da unordered_map «node-based»-dir: hər element ayrıca heap-ə ayrılır, bağlı siyahı ilə əlaqələnir. Keş üçün pisdir. Böyük performans üçün open-addressing (flat) hash cədvəlləri (absl::flat_hash_map, boost::unordered_flat_map) 2-10 dəfə sürətli ola bilir.",
            "map/set qırmızı-qara ağacdır: hər düyündə 3 göstərici + rəng (təxminən 32 bayt əlavə yük) var. Sıralanmış vector + binary_search kiçik/statik verilənlər üçün tez-tez həm kiçik, həm sürətli olur. C++23: std::flat_map.",
            "Heterogeneous lookup: map<string, int, std::less<>> ilə m.find(std::string_view(...)) və ya C sətirləri üçün müvəqqəti string yaratmadan axtarış mümkündür (C++14 / unordered üçün C++20).",
            "sort introsort-dur (quicksort + heapsort + insertion sort): ən pis halda belə O(n log n). Hissəvi lazımdırsa: partial_sort, nth_element (O(n) — median/top-k üçün). Müqayisə funksiyası strict weak ordering olmalıdır: a < a həmişə false.",
            "list-in keş problemi: hər düyün ayrıca ayrılır, yan-yana yox. Praktikada vector hətta ortaya insert/erase-də belə çox vaxt list-i keçir (bu bir qayda yox, ölçülmüş müşahidədir: həmişə benchmark et).",
            "shrink_to_fit() artıq capacity-ni azaldır (tələb deyil, istək). Konteyner tamamilə boşaldıb yaddaşı qaytarmaq üçün std::vector<int>().swap(v) və ya v = {}; v.shrink_to_fit().",
            "Paralel alqoritmlər (C++17): std::sort(std::execution::par, ...) — çox nüvəli emal. Müvafiq lib (məs. libtbb) quraşdırılmalıdır.",
            "std::span (C++20) bitişik yaddaşa sahibliksiz «baxış»dır (göstərici + ölçü): massiv, vector, array hamısı ötürülür. Sərhəd bilgisi qorunur.",
            "views mənbə konteynerə baxır, ona sahib deyil. Mənbə vector-a push_back edib reallocation olsa və ya mənbə silinsə, view etibarsız olur. Müvəqqəti (rvalue) vector-u views-a pipe etmək isə kompilyasiya xətası verir — bu, dangling-dən qoruyan təhlükəsizlik yoxlamasıdır.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `// DİQQƏT: UB — strict weak ordering pozulub
std::sort(v.begin(), v.end(), [](int a, int b) { return a <= b; });`, right: `std::sort(v.begin(), v.end(), [](int a, int b) { return a < b; });`, why: "Müqayisə a <= b bərabər elementlər üçün true verir və strict weak ordering-i pozur. sort daxildə sərhəd yoxlamadığı üçün massivdən kənara çıxa bilər (çökmə və ya sonsuz dövr). Həmişə < və ya > istifadə et." },
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v;
for (std::size_t i = 0; i < v.size() - 1; ++i) {   // v boşdursa v.size()-1 = 18446744073709551615
    std::cout << v[i];
}`, right: `for (std::size_t i = 0; i + 1 < v.size(); ++i) {   // çıxma əvəzinə toplama
    std::cout << v[i];
}`, why: "size() işarəsizdir. 0 - 1 çox böyük ədəd olur, dövr sərhəddən kənara çıxır. Müqayisəni elə qur ki, mənfi ədəd yaranmasın." },
          { t: "mistake", lang: "cpp", wrong: `std::unordered_map<std::string, int> m = {{"a", 1}};
for (auto& [k, v] : m) {
    if (v == 1) {
        m["yeni"] = 2;     // DİQQƏT: rehash iteratorları etibarsız edə bilər → UB
    }
}`, right: `std::vector<std::string> elave;
for (const auto& [k, v] : m) {
    if (v == 1) elave.push_back("yeni");
}
for (const auto& k : elave) m[k] = 2;   // dövr bitəndən sonra dəyiş`, why: "Dövr zamanı konteynerə yeni element əlavə etmək rehash və ya reallocation yarada bilər; gizli iteratorlar etibarsız olur. Dəyişiklikləri yığ, dövrdən sonra tətbiq et." },
          { t: "warn", text: "Müəyyən etdiyin operator== və hash uyğun olmalıdır: iki obyekt == olarsa, hash-ları mütləq eyni olmalıdır. Əks halda unordered_set/map ən yaxşı halda səhv nəticə, ən pis halda dəyişilməz (invariant) pozuntusu yaradır. Mutable açarı konteynerdə dəyişmə — dəyişənin hash-ı və ya sırası dəyişir, element «itir»." },
          { t: "tip", text: "Performansı ölçmədən qərar vermə: -O2/-O3 ilə kompilyasiya et, google benchmark və ya sadə std::chrono ilə vaxtı ölç, perf/VTune ilə profil çıxar. Mikro-benchmark-da nəticənin istifadə olunduğundan əmin ol (yoxsa kompilyator hesablamanı silir)." },
          { t: "qa", items: [
            ["Niyə vector çox vaxt list-dən sürətlidir?", "vector bitişikdir: keş sətirləri və prefetcher səmərəli işləyir. list-də hər düyün ayrıca ayrılır, keş boşluqları və göstərici izləməsi dominant olur. Hətta ortaya əlavədə də vector tez-tez qalib gəlir; qərar ölçmə ilə verilməlidir."],
            ["unordered_map-də rehash nə edir və iteratorlara təsiri?", "Bucket sayı artırılır, elementlər yenidən paylanır. Bütün iteratorlar etibarsız olur, referans/göstəricilər isə etibarlı qalır (düyünlər yerində qalır)."],
            ["strict weak ordering nədir?", "irreflexiv (a<a false), asimmetrik, tranzitiv və «bərabərlik» tranzitiv olan müqayisə. sort və map/set bunu tələb edir; pozulsa UB."],
            ["std::span nədir və nə zaman işlədilir?", "Bitişik yaddaşa sahibliksiz baxış (göstərici + ölçü). C massivi, vector, array qəbul edən funksiyalar üçün vahid parametrdir, kopyalamır."],
            ["ranges::views-in adi alqoritmlərdən fərqi?", "Views tənbəldir və aralıq nəticə saxlamır (kompozisiya ilə |), alqoritmlər isə dərhal icra olunur. Views mənbə konteynerə baxır — mənbə silinərsə dangling olur."],
            ["nth_element nə üçündür?", "Ortalama O(n) vaxtda n-ci elementi sıralı mövqeyinə yerləşdirir (median, top-k). Tam sort-dan ucuzdur."],
          ]},
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
