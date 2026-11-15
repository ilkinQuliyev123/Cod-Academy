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
          { t: "h", text: "Hansı dövrü nə vaxt seçmək lazımdır" },
          { t: "p", text: "Say əvvəlcədən məlumdursa (məsələn, «1-dən 100-ə qədər») for seçirsən: başlanğıc, şərt və addım bir sətirdə görünür və oxucu dövrün nə qədər davam edəcəyini dərhal anlayır. Dövrün neçə dəfə işləyəcəyi əvvəlcədən bilinmirsə (istifadəçi «çıx» yazana qədər, fayl bitənə qədər) while daha təbiidir. do-while isə nadir hallarda lazım olur: məsələn, menyunu ən azı bir dəfə göstərib sonra istifadəçinin seçiminə görə davam etmək." },
          { t: "p", text: "Dövr işləyərkən üç şeyi yadda saxla: (1) şərt ilk dəfə yalan olarsa, for və while gövdəsi heç işləmir; (2) dövr dəyişəni şərtdə dəyişməlidir, əks halda dövr sonsuz olar; (3) hər iterasiyanın sonunda proqramın vəziyyəti növbəti iterasiya üçün hazır olmalıdır. Dövrü yazandan sonra kiçik nümunə (0, 1 və 2 element) ilə əl ilə izləmək ən etibarlı yoxlamadır." },
          { t: "warn", text: "Şərtdə = (mənimsətmə) ilə == (müqayisə) qarışdırma: while (x = 5) həmişə doğrudur və sonsuz dövr yaradır. Kompilyatorun -Wall xəbərdarlığı bunu tutur." },
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
          { t: "h", text: "İç-içə dövrlər və ikiölçülü məlumat" },
          { t: "p", text: "İç-içə dövrdə xarici dövrün hər addımında daxili dövr tam işləyir: 3 x 3 dövr cəmi 9 iterasiya verir. Mürəkkəblik vurulur: n x m iterasiya. Matris, cədvel və cütlərin müqayisəsi kimi işlərdə bu qaçılmazdır, amma n=100000 olarsa n x n artıq on milyardlarla əməliyyat deməkdir — bu zaman alqoritmi dəyişmək lazımdır (sıralama, hash cədvəli)." },
          { t: "code", lang: "cpp", caption: "İç-içə dövr, bayraqla çıxış, Evklid alqoritmi, structured binding", code: `#include <iostream>
#include <map>
#include <string>
#include <vector>

int main() {
    // iç-içə dövr: vurma cədvəli
    for (int i = 1; i <= 3; ++i) {
        for (int j = 1; j <= 3; ++j) {
            std::cout << i * j << '\\t';
        }
        std::cout << '\\n';
    }
    // 1 2 3
    // 2 4 6
    // 3 6 9

    // iç-içə dövrdən çıxış: bayraq dəyişəni
    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}, {5, 6}};
    bool tapildi = false;
    int sira = -1, sutun = -1;
    for (std::size_t i = 0; i < mat.size() && !tapildi; ++i) {
        for (std::size_t j = 0; j < mat[i].size(); ++j) {
            if (mat[i][j] == 4) {
                sira = static_cast<int>(i);
                sutun = static_cast<int>(j);
                tapildi = true;
                break;                 // yalnız daxili dövrü kəsir
            }
        }
    }
    std::cout << sira << ',' << sutun << '\\n';   // 1,1

    // while: Evklid alqoritmi (ən böyük ortaq bölən)
    int a = 48, b = 18;
    while (b != 0) {
        int qaliq = a % b;
        a = b;
        b = qaliq;
    }
    std::cout << "ƏBOB = " << a << '\\n';          // ƏBOB = 6

    // map: C++17 structured binding
    std::map<std::string, int> ballar = {{"Aysel", 90}, {"Kamran", 75}};
    for (const auto& [ad, bal] : ballar) {
        std::cout << ad << ": " << bal << '\\n';
    }
    // Aysel: 90
    // Kamran: 75
    return 0;
}` },
          { t: "terms", items: [
            ["iterasiya", "dövrün gövdəsinin bir dəfə işləməsi."],
            ["loop invariant (dövr invariantı)", "hər iterasiyanın əvvəlində və sonunda doğru qalan şərt; dövrün düzgünlüyünü isbat etməyə kömək edir."],
            ["off-by-one", "dövrün bir dəfə az və ya çox işləməsi (< əvəzinə <=)."],
            ["structured binding", "C++17: cüt/tuple/struct elementlərini [a, b] ilə adlandırıb açmaq."],
            ["bayraq (flag) dəyişəni", "bool dəyişən; iç-içə dövrdən çıxışı idarə etmək üçün istifadə olunur."],
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
          { t: "mistake", lang: "cpp", wrong: `// Sürüşkən vergüllü say ilə dövr
for (double x = 0.0; x != 1.0; x += 0.1) {
    std::cout << x << '\\n';     // x heç vaxt dəqiq 1.0 olmur: sonsuz dövr
}`, right: `// Tam say sayğacı, dəyəri ondan hesabla
for (int i = 0; i <= 10; ++i) {
    double x = i / 10.0;
    std::cout << x << '\\n';
}`, why: "0.1 ikilik sistemdə dəqiq təmsil olunmur; on dəfə toplayanda nəticə 0.9999999999999999 olur və x != 1.0 həmişə doğru qalır. Dövr sayğacı həmişə tam ədəd olmalıdır; sürüşkən vergüllü dəyəri ondan hesabla və ya müqayisədə < / <= işlət." },
          { t: "mistake", lang: "cpp", wrong: `for (int i = 0; i < 5; ++i) {
    if (i == 2) {
        i = 4;          // sayğacı gövdədə dəyişirik
    }
    std::cout << i << ' ';   // 0 1 4 — çaşdırıcı
}`, right: `for (int i = 0; i < 5; ++i) {
    if (i == 2) continue;     // niyyət aydın: 2-ni keç
    std::cout << i << ' ';    // 0 1 3 4
}`, why: "For başlığında sayğacın necə dəyişdiyi göstərilir; gövdədə onu gizlicə dəyişmək oxunaqlığı pozur və off-by-one səhvlərinin əsas mənbəyidir. Atlama üçün continue, çıxış üçün break işlət." },
          { t: "qa", items: [
            ["break və continue arasında fərq nədir?", "break ən yaxın dövrü tam bitirir, continue isə cari iterasiyanın qalanını keçib növbəti iterasiyanın şərtinə keçir (for-da əvvəlcə addım ifadəsi işləyir)."],
            ["Dövr sonsuz ola bilməsi üçün hansı şərtlər kifayətdir?", "Şərt heç vaxt yalan olmursa: while (true), for (;;), ya da sayğac şərti dəyişmirsə. Sonsuz dövr bəzən qəsdəndir (server dövrü), amma mütləq çıxış yolu (break, return, istisna) olmalıdır."],
          ]},
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
          { t: "h", text: "Yaddaş yerləşməsi (cache) və dövrün sürəti" },
          { t: "p", text: "Müasir prosessorda dövrün sürətini çox vaxt əməliyyatların sayı yox, yaddaşa müraciətin xarakteri müəyyən edir. Prosessor yaddaşı 64 baytlıq cache sətirləri ilə oxuyur. İkiölçülü massiv C++-da sətir-sətir (row-major) saxlanılır: m[i][j] ilə m[i][j+1] yan-yanadır. Ona görə xarici dövr i, daxili dövr j olarsa, yaddaş ardıcıl oxunur və cache səmərəli işləyir. Dövrləri tərsinə çevirsən (daxildə i dəyişsə), hər müraciət 64 bayt kənara tullanır, cache boşa çıxır və eyni iş bir neçə dəfə yavaş işləyə bilər. Buna loop interchange optimizasiyası deyilir." },
          { t: "p", text: "Kompilyator -O2/-O3 ilə sadə dövrləri avtomatik vektorlaşdıra bilər: bir komanda ilə 4-8 ədədi eyni anda toplayır (SIMD: SSE/AVX). Bunu əngəlləyən şeylər: dövr daxilində funksiya çağırışı (inline olunmayan), pointerlərin eyni yaddaşa baxa bilməsi (aliasing; __restrict ilə kömək etmək olar), istisna və erkən çıxış (break). Ölçmə olmadan optimallaşdırma etmə: əvvəl profiler (perf, VTune) ilə isti nöqtəni tap." },
          { t: "code", lang: "cpp", caption: "C++20 ranges: dövrsüz, deklarativ yazılış", code: `#include <algorithm>
#include <iostream>
#include <ranges>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};

    // Tənbəl (lazy) boru xətti: filter → transform; heç bir müvəqqəti konteyner yoxdur
    auto netice = v
        | std::views::filter([](int x) { return x % 2 == 0; })
        | std::views::transform([](int x) { return x * x; });
    for (int x : netice) std::cout << x << ' ';   // 4 16 36 64
    std::cout << '\\n';

    for (int i : std::views::iota(1, 4)) std::cout << i << ' ';   // 1 2 3
    std::cout << '\\n';

    // Tərsinə ilk 3 element: size_t tələsi yoxdur
    for (int x : v | std::views::reverse | std::views::take(3)) std::cout << x << ' ';   // 8 7 6
    std::cout << '\\n';

    std::erase_if(v, [](int x) { return x % 2 == 1; });   // C++20
    for (int x : v) std::cout << x << ' ';                // 2 4 6 8
    std::cout << '\\n';

    std::ranges::sort(v, std::greater{});
    for (int x : v) std::cout << x << ' ';                // 8 6 4 2
    std::cout << '\\n';
    return 0;
}` },
          { t: "list", items: [
            "std::views tənbəldir: dəyər yalnız dövr onu istəyəndə hesablanır. Bu səbəbdən view-lar mənbə konteynerin ömründən asılıdır — mənbə məhv olsa, view dangling olur.",
            "Hər dövr yazmaq əvəzinə alqoritm (std::accumulate, std::transform, std::count_if) çağırmaq niyyəti aydınlaşdırır və standart kitabxana bu kodu yüksək dərəcədə optimallaşdırıb.",
            "Böyük konteynerlərdə eyni verilənləri bir neçə dəfə gəzmək (üç ayrı dövr) əvəzinə bir keçidlə birləşdirmək cache-i daha yaxşı işlədir; amma oxunaqlıq itirsə, əvvəl ölçmə apar.",
            "Dövr daxilində std::vector-a push_back çağıracaqsansa, əvvəlcədən reserve(n) çağır: yenidən bölüşdürmə sayı azalır və iterator invalidation riski kiçilir.",
            "Dövr daxilində lazımsız obyekt yaratmaq (məsələn, hər iterasiyada std::string a = ...;) heap bölüşdürməsinə səbəb ola bilər. Dövrdən əvvəl bir dəfə yarat və clear() ilə təkrar istifadə et.",
            "std::execution::par (C++17 paralel alqoritmlər) böyük verilənlərdə dövrü çoxnüvəli yerinə yetirə bilər; amma gövdə məlumat yarışı (data race) yaratmamalıdır.",
          ]},
          { t: "warn", text: "for (int x : v) yazanda hər element kopyalanır. String və ya struct olduqda bu gizli xərcdir; əlavə olaraq x-i dəyişsən v dəyişmir. Dəyişmək istəyirsənsə auto&, yalnız oxuyursansa const auto& yaz." },
          { t: "qa", items: [
            ["Niyə iç-içə dövrdə xarici dövr sətirlər, daxili dövr sütunlar üzərində olmalıdır?", "C++ matrisləri sətir-sətir saxlayır (row-major). Daxili dövr ardıcıl yaddaşı oxuyanda cache sətri tam istifadə olunur; tərsinə yazanda hər müraciət cache-i itirir və dəfələrlə yavaşlayır."],
            ["Kompilyator dövrü necə optimallaşdırır?", "Dövrün açılması (unrolling), vektorlaşdırma (SIMD), invariant hesablamaların dövrdən çıxarılması (loop-invariant code motion), sayğacın gücləndirilməsi (strength reduction). Signed overflow UB olduğuna görə kompilyator dövrün sonlu olduğunu güman edə bilər."],
            ["std::views və adi dövr arasında fərq nədir?", "View-lar tənbəl və kompozisiya olunandır: müvəqqəti konteyner yaratmadan filter/transform zənciri qurulur. Dayanıqlıq tələbi: mənbə view-dan uzun yaşamalıdır. Performans adətən əl ilə yazılmış dövrlə eynidir (zero-cost abstraction)."],
          ]},
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
          { t: "h", text: "Funksiya niyə lazımdır" },
          { t: "p", text: "Funksiya üç problemi həll edir: təkrarı aradan qaldırır (eyni kodu bir neçə yerdə yazmırsan), proqramı hissələrə bölür (hər funksiya bir iş görür) və adlandırma vasitəsilə niyyəti izah edir (hesablaQiymet(sebet) oxuyanda ardıcıl 15 sətir koddan aydındır). Yaxşı funksiya qısa olur, bir iş görür və adı nə etdiyini deyir." },
          { t: "p", text: "Funksiyanın imzası iki hissədən ibarətdir: qaytarma tipi və parametr siyahısı. Çağırış zamanı arqumentlər parametrlərə bağlanır: int topla(int a, int b) çağırılanda topla(2, 3) ifadəsindəki 2 və 3 arqument, a və b isə parametrdir. Kompilyator çağırışı yoxlayanda arqumentlərin sayını və tiplərini imza ilə tutuşdurur; buna görə funksiya çağırışdan əvvəl elan olunmalıdır (prototip)." },
          { t: "terms", items: [
            ["parametr", "funksiyanın tərifində adı çəkilən dəyişən (a, b)."],
            ["arqument", "çağırış zamanı verilən real dəyər (2, 3)."],
            ["imza (signature)", "ad + parametr tipləri; overload seçimi buna əsaslanır."],
            ["return", "funksiyanı bitirir və dəyəri çağırana qaytarır."],
            ["yerli dəyişən (local)", "funksiyanın daxilində elan olunan və yalnız orada yaşayan dəyişən."],
          ]},
          { t: "warn", text: "main funksiyasında return 0 yazmasan belə kompilyator onu avtomatik əlavə edir, amma başqa funksiyalarda (void-dan başqa) return unutmaq undefined behavior-dur." },
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
          { t: "h", text: "Çoxlu nəticə, sahiblik ötürmə, funksiya göstəricisi və lambda tutması" },
          { t: "p", text: "C++-da funksiya bir dəyər qaytarır, amma o dəyər struct ola bilər. Struct qaytarıb çağıran tərəfdə structured binding (auto [mn, mx] = ...) ilə açmaq həm oxunaqlı, həm təhlükəsizdir; çıxış parametrləri (int& mn, int& mx) isə köhnə üsuldur və nəticənin hara yazıldığı çağırışdan görünmür." },
          { t: "p", text: "Funksiya parametri obyektin sahibliyini götürəcəksə (məsələn, sinifin üzvünə saxlayacaq), onu dəyərlə qəbul edib std::move ilə üzvə köçürmək müasir qaydadır («sink» parametr). Çağıran lvalue verərsə kopyalanır, müvəqqəti obyekt (rvalue) verərsə köçürülür — bir imza hər iki halı optimal örtür." },
          { t: "code", lang: "cpp", caption: "struct qaytarma, sink parametr, funksiya göstəricisi, lambda tutması", code: `#include <functional>
#include <iostream>
#include <string>
#include <utility>
#include <vector>

struct Netice {
    int min;
    int maks;
};

Netice araligi(const std::vector<int>& v) {
    Netice n{v[0], v[0]};                 // v boş olmamalıdır (ön şərt)
    for (int x : v) {
        if (x < n.min) n.min = x;
        if (x > n.maks) n.maks = x;
    }
    return n;
}

// «sink» parametr: dəyərlə al, member-ə köçür
class Mesaj {
    std::string metn_;
public:
    explicit Mesaj(std::string m) : metn_(std::move(m)) {}
    const std::string& metn() const { return metn_; }
};

int tetbiq(int x, int (*f)(int)) { return f(x); }   // funksiya göstəricisi
int ikiqat(int x) { return 2 * x; }

int main() {
    std::vector<int> v = {4, 9, 2, 7};
    auto [mn, mx] = araligi(v);
    std::cout << mn << ' ' << mx << '\\n';        // 2 9

    std::string s = "uzun mətn";
    Mesaj m1(s);                  // s kopyalanır (s hələ lazımdır)
    Mesaj m2(std::move(s));       // s-in yaddaşı köçürülür (s artıq boş/etibarsız)
    std::cout << m1.metn() << '|' << m2.metn() << '\\n';   // uzun mətn|uzun mətn

    std::cout << tetbiq(21, ikiqat) << '\\n';     // 42
    std::function<int(int)> f = [](int x) { return x + 1; };
    std::cout << f(41) << '\\n';                   // 42

    // lambda: surətlə tutma ([say]) və mutable
    int say = 0;
    auto artir = [say]() mutable { return ++say; };
    std::cout << artir() << artir() << ' ' << say << '\\n';   // 12 0 (orijinal dəyişmir)

    // referansla tutma ([&cem])
    int cem = 0;
    auto topla = [&cem](int x) { cem += x; };
    topla(5); topla(7);
    std::cout << cem << '\\n';                      // 12
    return 0;
}` },
          { t: "list", items: [
            "Köçürülmüş (moved-from) obyekt etibarlı, amma qeyri-müəyyən vəziyyətdədir: onu yenidən mənimsətmək və ya məhv etmək olar, amma dəyərini fərz etmə.",
            "std::function ayrılmış yaddaş və dolayı çağırış xərci gətirə bilər; sadə lambda üçün auto və ya şablon parametri daha sürətlidir (inline olunur).",
            "Lambdanı [&] ilə tutub funksiyadan qaytarma: tutulan yerli dəyişənlər yox olur, lambda dangling referans saxlayır. Qaytarılan lambda üçün [=] və ya açıq surət işlət.",
            "Funksiya adı ifadədə öz ünvanına çevrilir (decay): tetbiq(21, ikiqat) və tetbiq(21, &ikiqat) eynidir.",
            "Çox parametrli funksiya çətin oxunur: eyni tipli 3-4-dən çox parametr varsa, struct-a qruplaşdır (bool, bool, int sırasını qarışdırmaq asandır).",
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
          { t: "mistake", lang: "cpp", wrong: `void yoxla(std::string s = "x", int n);   // default ortada, sonrakı default-suz
int kvadrat(int x);
double kvadrat(int x);                     // yalnız qaytarma tipi fərqlidir`, right: `void yoxla(int n, std::string s = "x");   // default dəyərlilər sonda
int kvadrat(int x);
double kvadrat(double x);                  // parametr tipi fərqlidir`, why: "Default arqumentlər sağdan sola ardıcıl olmalıdır, çünki çağırış zamanı arqumentlər soldan bağlanır. Overload isə yalnız parametr siyahısına görə seçilir: eyni parametrlərlə fərqli qaytarma tipi kompilyasiya xətasıdır." },
          { t: "mistake", lang: "cpp", wrong: `auto yarat() {
    int x = 5;
    return [&x]() { return x; };   // x-ə referans tutur
}
// auto f = yarat();
// f();                              // dangling referans: UB`, right: `auto yarat() {
    int x = 5;
    return [x]() { return x; };    // x surətlə tutulur
}`, why: "[&x] lambdanın daxilində x-ə referans saxlayır. yarat() bitəndə x məhv olur, lambda isə qalır — çağıranda dangling referans oxunur. Funksiyadan çıxan lambda [=] və ya açıq surət tutmalıdır." },
          { t: "qa", items: [
            ["Prototip və tərif arasında fərq nədir?", "Prototip yalnız imzanı bildirir (kompilyator çağırışı yoxlaya bilsin deyə), tərif gövdəni verir. Prototip bir neçə dəfə yazıla bilər, tərif yalnız bir dəfə (ODR)."],
            ["Nə vaxt referans, nə vaxt pointer parametr işlətmək lazımdır?", "Arqument mütləq mövcuddursa — referans (null ola bilməz). Arqument «yoxdur» ola bilərsə — pointer və ya std::optional. Dəyişdirmə niyyəti çağırışdan görünsün istəyirsənsə, bəzi üslublar (məs. Google) pointer tələb edir."],
          ]},
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
          { t: "h", text: "ABI, calling convention və kompilyatorun işi" },
          { t: "p", text: "Funksiya çağırışının maşın səviyyəsindəki qaydalarını calling convention (ABI hissəsi) müəyyən edir: arqumentlər hansı registrlərdə ötürülür, nəticə harada qaytarılır, hansı registrləri çağıran, hansılarını çağırılan funksiya saxlayır. x86-64 System V (Linux/macOS) ilk altı tam ədəd arqumentini rdi, rsi, rdx, rcx, r8, r9 registrlərində, nəticəni rax-da qaytarır; Windows x64 isə rcx, rdx, r8, r9 işlədir (4 registr). Buna görə kiçik tiplər dəyərlə sürətlidir: yaddaşa heç toxunulmur." },
          { t: "p", text: "Böyük struct dəyərlə qaytarılanda çağıran gizli bir pointer ötürür və nəticə birbaşa onun göstərdiyi yerdə qurulur. C++17-dən etibarən müvəqqəti obyektin qaytarılması (return Say{};) üçün copy elision məcburidir: nə kopya, nə move konstruktoru çağırılmır. Adlandırılmış yerli dəyişəni qaytarmaq (NRVO) məcburi deyil, amma kompilyatorlar adətən tətbiq edir; return std::move(yerli) yazmaq NRVO-nu əngəlləyir və bəzən zərərlidir." },
          { t: "p", text: "ABI (Application Binary Interface) dəyişəndə (məsələn, libstdc++-ın C++11 std::string dəyişikliyi) köhnə kompilyasiya olunmuş kitabxanalar yenilərlə uyğunsuz qalır. Funksiya adları (name mangling) kompilyator tərəfindən parametr tiplərinə görə kodlaşdırılır — overloading belə mümkün olur. extern \"C\" mangling-i söndürür və C kitabxanaları ilə uyğunluq verir." },
          { t: "code", lang: "cpp", caption: "Concepts, if constexpr, perfect forwarding, guaranteed copy elision", code: `#include <concepts>
#include <iostream>
#include <string>
#include <type_traits>
#include <utility>
#include <vector>

// Concepts (C++20): şablon tələbini tipdə yazırıq
template <typename T>
concept Eded = std::integral<T> || std::floating_point<T>;

template <Eded T>
T kvadrat(T x) { return x * x; }

// if constexpr (C++17): kompilyasiya zamanı budaq seçimi
template <typename T>
std::string tipAdi(const T&) {
    if constexpr (std::is_integral_v<T>) return "tam ədəd";
    else if constexpr (std::is_floating_point_v<T>) return "həqiqi ədəd";
    else return "digər";
}

// Say: kopya və move sayğacı
struct Say {
    static inline int kopya = 0;
    static inline int kocur = 0;
    Say() = default;
    Say(const Say&) { ++kopya; }
    Say(Say&&) noexcept { ++kocur; }
};

// Perfect forwarding: lvalue-nu kopyalayır, rvalue-nu köçürür
template <typename T>
void saxla(std::vector<Say>& v, T&& x) {
    v.push_back(std::forward<T>(x));
}

Say yarat() { return Say{}; }   // C++17: məcburi copy elision

int main() {
    std::cout << kvadrat(7) << ' ' << kvadrat(1.5) << '\\n';   // 49 2.25
    std::cout << tipAdi(3) << ", " << tipAdi(2.5) << ", " << tipAdi(std::string("a")) << '\\n';
    // tam ədəd, həqiqi ədəd, digər

    std::vector<Say> v;
    v.reserve(4);                // reallocation olmasın
    Say a;
    saxla(v, a);                 // lvalue  → kopya
    saxla(v, std::move(a));      // rvalue  → move
    Say b = yarat();             // nə kopya, nə move
    (void)b;
    std::cout << Say::kopya << ' ' << Say::kocur << '\\n';     // 1 1
    return 0;
}` },
          { t: "list", items: [
            "noexcept move konstruktoru vacibdir: std::vector böyüyəndə elementləri yalnız move noexcept olarsa köçürür, əks halda (güclü istisna zəmanəti üçün) kopyalayır — performans bir neçə dəfə düşə bilər.",
            "Universal (forwarding) referans T&& yalnız çıxarılan T ilə şablonda mənalıdır; std::forward<T>(x) arqumentin orijinal növünü (lvalue/rvalue) qoruyur. Adi (şablonsuz) Say&& tipli parametr isə yalnız rvalue qəbul edir.",
            "İnline açar sözündən asılı olmayaraq kompilyator -O2-də kiçik funksiyaları inline edir və sonra sabit yayılma (constant propagation), ölü kod silmə kimi optimizasiyaları tətbiq edir. Yeni funksiyanı ölçmədən inline-a məcbur etmə.",
            "Çağırış zənciri dərin olarsa (virtual çağırış, std::function) indirect call proqnozlaşdırıla bilmir və prosessor boru xətti dayanır; isti dövrdə şablon və ya lambda daha sürətlidir.",
            "[[maybe_unused]], [[likely]]/[[unlikely]] (C++20) və [[noreturn]] kompilyatora məlumat verir: noreturn funksiyadan sonra kod ölüdür, kompilyator onu silə bilər.",
            "Funksiyanın şablon versiyası yalnız başlıq faylında (və ya explicit instantiation ilə) görünməlidir; əks halda linker «undefined reference» verir.",
            "UB olan funksiya (return-suz yol, dangling) -O2-də gözlənilməz davranır: kompilyator UB yolunu «heç vaxt icra olunmur» sayıb ondan əvvəlki şərti belə silə bilər.",
          ]},
          { t: "warn", text: "return std::move(yerli); yazma. Bu, copy elision-u əngəlləyir və kompilyator xəbərdarlığı (-Wpessimizing-move) verir. Sadəcə return yerli; yaz." },
          { t: "qa", items: [
            ["Copy elision və move arasında fərq nədir?", "Elision zamanı obyekt birbaşa çağıranın yaddaşında qurulur: heç bir kopya/move çağırılmır. Move isə obyekti köçürür (konstruktor çağırılır). C++17-dən müvəqqəti obyektin qaytarılmasında elision məcburidir."],
            ["Perfect forwarding nədir?", "Şablonda T&& qəbul edib std::forward<T> ilə arqumenti orijinal dəyər kateqoriyasında (lvalue/rvalue) başqa funksiyaya ötürmək. Bu, std::make_unique və emplace_back-in əsasıdır."],
            ["noexcept niyə performansa təsir edir?", "Konteynerlər (vector) və alqoritmlər noexcept move olduqda köçürməni, əks halda kopyalamanı seçir. Kompilyator də noexcept funksiyada istisna açma kodunu azaldır."],
            ["Name mangling nədir?", "Kompilyator funksiya adına parametr tiplərini kodlaşdırıb unikal linker simvolu yaradır; overloading belə mümkündür. extern \"C\" bu kodlaşdırmanı söndürür."],
          ]},
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
          { t: "h", text: "Üç massiv növü: nə vaxt hansı" },
          { t: "p", text: "C massivi (int a[5]) ən sadədir, amma öz ölçüsünü bilmir, kopyalanmır (a = b xətadır) və funksiyaya pointer kimi gedir. std::array<int, 5> eyni yaddaş düzülüşünə malikdir (heç bir əlavə xərc yoxdur), lakin size(), at(), begin()/end() verir və adi tip kimi kopyalanır, funksiyadan qaytarılır. Ölçü kompilyasiya zamanı məlum deyilsə, std::vector işlət: o, heap-də yer ayırır və lazım olduqca böyüyür." },
          { t: "p", text: "std::string mətn üçün standart seçimdir: uzunluğu bilir, birləşdirir (+, +=), müqayisə edir (==, <), axtarır (find) və yaddaşı avtomatik idarə edir. C-string (char[] və ya const char*) isə sonu '\\0' ilə bitən baytlar ardıcıllığıdır; bu sondakı sıfır unudulsa, funksiyalar mətnin harada bitdiyini bilmir. Sətir literalı \"salam\" const char[6] tipindədir (5 hərf + '\\0')." },
          { t: "code", lang: "cpp", caption: "İkiölçülü massiv, sıralama, string əməliyyatları", code: `#include <algorithm>
#include <array>
#include <iostream>
#include <string>
#include <vector>

int main() {
    // vector<vector<int>>: 2 sətir, 3 sütun, hamısı 0
    std::vector<std::vector<int>> cedvel(2, std::vector<int>(3, 0));
    cedvel[1][2] = 7;
    for (const auto& setir : cedvel) {
        for (int x : setir) std::cout << x << ' ';
        std::cout << '\\n';
    }
    // 0 0 0
    // 0 0 7

    // std::array-i sıralamaq və ikili axtarış (yalnız sıralı üzərində!)
    std::array<int, 5> a = {42, 7, 19, 3, 25};
    std::sort(a.begin(), a.end());
    for (int x : a) std::cout << x << ' ';                          // 3 7 19 25 42
    std::cout << '\\n';
    std::cout << std::binary_search(a.begin(), a.end(), 19) << '\\n';   // 1

    // string: replace, insert, müqayisə
    std::string s = "salam dunya";
    s.replace(s.find("dunya"), 5, "Azerbaycan");
    std::cout << s << '\\n';                                         // salam Azerbaycan
    s.insert(0, ">> ");
    std::cout << s << '\\n';                                         // >> salam Azerbaycan
    std::cout << (std::string("a") < std::string("b")) << '\\n';     // 1
    return 0;
}` },
          { t: "list", items: [
            "Massiv elan edərkən {} ilə başlat: int a[5] = {} hamısını 0 edir; int a[5]; isə (yerli dəyişəndə) zibil dəyərlər saxlayır.",
            "Massivin ölçüsü tam ədəd sabiti olmalıdır; int n = 5; int a[n]; standart C++ deyil (VLA yalnız bəzi kompilyatorların genişlənməsidir).",
            "Massivin son elementi a[n-1]-dir. a[n] sərhəddən kənardır; kompilyator xəta vermir.",
            "std::string-in size() və length() eynidir; boş olub-olmadığını yoxlamaq üçün s.empty() yaz.",
          ]},
          { t: "mistake", lang: "cpp", wrong: `int a[3] = {1, 2, 3};
int b[3];
b = a;                       // kompilyasiya xətası: massiv mənimsədilmir

char ad[5] = "Aysel";        // xəta: '\\0' üçün yer yoxdur`, right: `std::array<int, 3> a = {1, 2, 3};
std::array<int, 3> b = a;    // kopyalanır
char ad[] = "Aysel";         // ölçü 6 olur (5 + '\\0')
std::string ad2 = "Aysel";   // ən yaxşısı`, why: "C massivləri adi dəyər kimi kopyalanmır. \"Aysel\" 5 hərf və sondakı '\\0' ilə 6 bayt tələb edir; 5 baytlıq massivə sığmır. std::array və std::string bu tələlərdən azaddır." },
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
          { t: "h", text: "Mətni bölmək və ədədə çevirmək" },
          { t: "p", text: "Real proqramlarda mətn çox vaxt parçalanır və ədədə çevrilir. std::istringstream mətni cin kimi oxumağa imkan verir: >> operatoru boşluqla ayrılmış sözləri ardıcıl çıxarır. Ədədə çevirmək üçün std::stoi/stod istifadə olunur; düzgün olmayan mətndə std::invalid_argument, çox böyük ədəddə std::out_of_range atırlar. İstifadəçi girişini həmişə try/catch ilə qoru." },
          { t: "code", lang: "cpp", caption: "istringstream, stoi, to_string", code: `#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>

int main() {
    // sözlərə bölmək
    std::istringstream giris("bir iki uc");
    std::string soz;
    int n = 0;
    while (giris >> soz) {
        ++n;
        std::cout << n << ':' << soz << ' ';
    }
    std::cout << '\\n';                       // 1:bir 2:iki 3:uc

    // mətn ⇄ ədəd
    int eded = std::stoi("123") + 1;
    std::cout << eded << ' ' << std::to_string(eded * 2) << '\\n';   // 124 248
    try {
        std::stoi("abc");
    } catch (const std::invalid_argument&) {
        std::cout << "Düzgün ədəd deyil\\n";   // Düzgün ədəd deyil
    }
    return 0;
}` },
          { t: "terms", items: [
            ["row-major", "ikiölçülü massivin sətir-sətir ardıcıl saxlanması (C/C++ qaydası)."],
            ["array decay", "massivin ifadədə birinci elementə pointerə çevrilməsi."],
            ["string_view", "mətnə sahib olmayan, göstərici + uzunluq cütü (C++17)."],
            ["std::span", "ardıcıl yaddaşa (massiv, vector) sahib olmayan baxış (C++20)."],
            ["npos", "std::string::find tapmayanda qaytardığı xüsusi dəyər."],
          ]},
          { t: "tip", text: "Sətirdə find() nəticəsini həmişə npos ilə yoxla: s.find(x) tapmadısa npos qaytarır, onunla s.substr və ya s.replace etsən istisna atılır." },
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
          { t: "mistake", lang: "cpp", wrong: `std::string s = "salam";
std::cout << s.substr(10) << '\\n';     // istisna: pos > size()
std::string_view sv = "abc";
char c = sv[5];                        // [] yoxlamır: UB
std::string t = "salam" + " dünya";    // xəta: iki const char* toplanmır`, right: `std::string s = "salam";
if (s.size() > 10) std::cout << s.substr(10) << '\\n';
std::string_view sv = "abc";
char c = sv.at(1);                     // yoxlanan giriş
std::string t = std::string("salam") + " dünya";`, why: "substr başlanğıc mövqeyi uzunluqdan böyük olanda std::out_of_range atır; string_view-un [] operatoru sərhəd yoxlamır. İki literal (const char*) pointerdir, toplanmır: soldakılardan biri std::string olmalıdır." },
          { t: "qa", items: [
            ["std::array ilə C massivinin fərqi nədir?", "Eyni yaddaş düzülüşü və sıfır əlavə xərc, amma std::array ölçünü bilir, kopyalanır, funksiyadan qaytarıla bilir, at()/begin()/end() verir və pointerə avtomatik çevrilmir."],
            ["std::string və std::string_view-un fərqi nədir?", "string mətnə sahibdir, yaddaşı idarə edir; string_view yalnız göstərici+uzunluq saxlayır, surət çıxarmır. Parametr olaraq string_view ucuzdur, amma sahibin ömrü view-dan uzun olmalıdır."],
          ]},
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
          { t: "h", text: "Yaddaş düzülüşü, alignment, padding və vector-un böyüməsi" },
          { t: "p", text: "Massivin elementləri ardıcıl yerləşir: a[i] ünvanı baza + i * sizeof(T) düsturu ilə hesablanır. Buna görə massiv cache üçün idealdır: prosessor bir cache sətri (64 bayt) oxuyanda qonşu elementlər də gəlir. Bağlı siyahı (std::list) kimi yayılmış strukturlarla müqayisədə vector/array bir neçə dəfə sürətlidir, nəzəri mürəkkəblik eyni olsa belə." },
          { t: "p", text: "Hər tip öz alignment tələbinə malikdir: int adətən 4-ə bölünən ünvanda dayanmalıdır. Struct üzvlərini bu qaydaya uyğunlaşdırmaq üçün kompilyator aralarına boş baytlar (padding) əlavə edir. Üzvləri böyükdən kiçiyə düzmək strukturun ölçüsünü azalda bilər; massivlərdə bu milyonlarla bayta qənaət deməkdir. Padding baytlarının məzmunu qeyri-müəyyəndir: struct-ı memcmp ilə müqayisə etmək və ya birbaşa fayla yazmaq (informasiya sızması!) təhlükəlidir." },
          { t: "p", text: "std::vector yaddaşı capacity ilə idarə edir. push_back capacity dolanda yeni, adətən 1.5-2 dəfə böyük blok ayırır, elementləri köçürür və köhnəni azad edir — buna görə amortizasiya olunmuş mürəkkəblik O(1)-dir, amma bəzi çağırışlar bahalıdır və bütün iterator/pointerlər etibarsız olur. Ölçünü əvvəlcədən bilirsənsə reserve(n) çağır. std::string çox vaxt kiçik mətn üçün heap istifadə etmir (SSO — small string optimization): qısa sətir obyektin daxilində saxlanılır; hədd kitabxanaya görə dəyişir (libstdc++-da 15 simvol)." },
          { t: "code", lang: "cpp", caption: "sizeof və padding, std::span, capacity, ardıcıl yerləşmə", code: `#include <cstddef>
#include <iostream>
#include <span>
#include <string>
#include <vector>

struct Pis {      // char, int, char → aralarda boşluq
    char a;
    int b;
    char c;
};
struct Yaxsi {    // böyükdən kiçiyə
    int b;
    char a;
    char c;
};

// span: massiv, vector və ya hissə — ölçü ilə birlikdə, surətsiz
int cem(std::span<const int> s) {
    int c = 0;
    for (int x : s) c += x;
    return c;
}

int main() {
    std::cout << sizeof(Pis) << ' ' << sizeof(Yaxsi) << '\\n';   // 12 8
    std::cout << alignof(int) << '\\n';                          // 4

    int c[4] = {1, 2, 3, 4};
    std::vector<int> v = {5, 6, 7};
    std::cout << cem(c) << ' ' << cem(v) << '\\n';               // 10 18
    std::cout << cem(std::span<const int>(v).subspan(1)) << '\\n';   // 13

    // capacity: reserve ilə təkrar bölüşdürmənin qarşısını al
    std::vector<int> w;
    w.reserve(5000);
    std::cout << (w.capacity() >= 5000) << '\\n';                // 1

    // 2D massiv ardıcıl (row-major) yerləşir
    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int* duz = &m[0][0];
    std::cout << duz[4] << '\\n';                                // 5

    // UTF-8: size() bayt sayır
    std::string az = "ə";
    std::cout << az.size() << '\\n';                             // 2
    return 0;
}` },
          { t: "list", items: [
            "Eyni yaddaşda yerləşən massivlər «Structure of Arrays» (SoA) şəklində «Array of Structures»-dan (AoS) tez ola bilər: yalnız bir sahə üzərində dövr edəndə lazımsız sahələr cache-ə düşmür.",
            "False sharing: iki thread eyni cache sətrindəki fərqli elementləri dəyişəndə nüvələr cache-i bir-birindən ləğv edir. Hər thread üçün massiv elementlərini alignas(64) ilə ayır.",
            "std::vector<bool> xüsusi tipdir (bit-paket); elementinə adi referans almaq olmur. Bayt-bayt bool lazımdırsa, std::vector<char> və ya std::bitset işlət.",
            "int a[10]; int* p = a + 10; hüquqidir (bir ötəsi), amma *p oxumaq UB-dir. a + 11 yaratmaq da UB-dir.",
            "Kompilyator sərhəddən kənar indeksi görürsə (a[10], 10 element), -Warray-bounds xəbərdarlığı verir, -O2-də isə UB-ə görə bu yolu «heç vaxt icra olunmaz» sayıb silə bilər.",
            "Unicode: std::string baytlar saxlayır; simvol sayını bilmək üçün UTF-8-i dekodlamaq lazımdır (ICU, utf8cpp). char8_t/u8string (C++20) tip səviyyəsində UTF-8 işarələyir.",
            "Mətnin sonuna '\\0' əlavə etmək std::string üçün lazım deyil, c_str() onu zəmanət verir; amma string daxilində '\\0' ola bilər: c_str() ilə C funksiyasına ötürəndə mətn orada kəsilir (injection üsulu).",
          ]},
          { t: "warn", text: "Struct-ı fayla və ya şəbəkəyə birbaşa yazma (fwrite(&s, sizeof s, 1, f)): padding baytları yaddaşdan sızan məlumat daşıyır və ölçü/düzülüş platformadan asılıdır. Sahələri tək-tək, sabit formatda serializasiya et." },
          { t: "qa", items: [
            ["Niyə sizeof(struct) üzvlərin cəmindən böyük ola bilər?", "Alignment tələblərinə görə kompilyator üzvlər arasında və sonunda padding əlavə edir. Üzvləri böyükdən kiçiyə düzmək ölçünü azaldır; alignof və offsetof ilə yoxlamaq olar."],
            ["Vector-un böyüməsi necə işləyir və nə üçün reserve vacibdir?", "capacity dolanda yeni blok (1.5-2x) ayrılır, elementlər köçürülür (noexcept move varsa move, yoxsa kopya), köhnə blok azad edilir. reserve əvvəlcədən yer ayırır, təkrar bölüşdürməni və iterator invalidation-u aradan qaldırır."],
            ["Nə üçün massivlər bağlı siyahıdan çox vaxt sürətlidir?", "Ardıcıl yaddaş cache və prefetcher-ə uyğundur; bağlı siyahıda hər element heap-də səpələnib və hər keçid cache miss ola bilər."],
          ]},
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
          { t: "h", text: "Yaddaş ünvanı nə deməkdir" },
          { t: "p", text: "Kompüterin yaddaşı nömrələnmiş baytlar ardıcıllığıdır. Hər dəyişən bu baytlardan birində (və ya bir neçəsində) yaşayır; int adətən 4 bayt tutur. Dəyişənin ünvanı onun ilk baytının nömrəsidir. Pointer məhz bu nömrəni saxlayan dəyişəndir; 64-bitli sistemdə istənilən tip pointerinin ölçüsü 8 baytdır, çünki ünvan 64 bit tutur." },
          { t: "p", text: "Pointerin tipi (int*, double*) kompilyatora ünvanda nə olduğunu və oxuyanda neçə bayt götürəcəyini deyir. *p ifadəsi bu tipə görə baytları dəyər kimi şərh edir. Tipi səhv olan pointerlə oxumaq mənasız nəticə və ya UB verir." },
          { t: "p", text: "Pointer + referansın əsas qaydası: referans lazım olanda (funksiyaya parametr ötürmək, dövrdə elementi dəyişmək) referans işlət; «ola bilər ki, heç nə yoxdur» və ya «yönləndirmək lazımdır» hallarında pointer. Sahibliyi isə pointerlərin yox, ağıllı pointerlərin işidir." },
          { t: "terms", items: [
            ["ünvan (address)", "yaddaşda baytın nömrəsi."],
            ["dereferans", "pointerin göstərdiyi dəyərə *p ilə çatmaq."],
            ["stack", "yerli dəyişənlərin avtomatik yaşadığı yaddaş sahəsi."],
            ["heap", "new/make_unique ilə ayrılan, ömrü əl ilə və ya ağıllı pointerlə idarə olunan yaddaş."],
            ["wild pointer", "başlanmamış, təsadüfi ünvana baxan pointer."],
            ["-> operatoru", "p->x, (*p).x ilə eynidir; pointer vasitəsilə üzvə müraciət."],
          ]},
          { t: "warn", text: "int* a, b; yazanda yalnız a pointerdir, b adi int-dir (* dəyişənə aiddir). Hər pointeri ayrıca elan et: int* a; int* b;" },
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
          { t: "h", text: "Pointer-to-pointer, funksiya göstəricisi, dinamik massiv" },
          { t: "p", text: "Pointerin özü də yaddaşda yaşayır, deməli ona da pointer ala bilərsən: int** pointerin ünvanını saxlayır. Bu, funksiyanın çağıranın pointerini dəyişməsi lazım olanda (məsələn, bağlı siyahının başlanğıcını) istifadə olunur, amma müasir kodda adətən pointerə referans (int*&) daha oxunaqlıdır." },
          { t: "p", text: "Funksiyanın da yaddaşda ünvanı var. Funksiya göstəricisi (int (*f)(int, int)) funksiyanı dəyər kimi ötürməyə imkan verir: callback-lar, əmr cədvəlləri. Sintaksis çətin oxunur; müasir C++-da using və ya std::function/lambda daha sadədir. Dinamik massiv isə new T[n] ilə yaradılır və mütləq delete[] ilə silinir (delete yox!) — amma onu əl ilə yazmaq əvəzinə std::vector və ya std::make_unique<T[]> işlət." },
          { t: "code", lang: "cpp", caption: "int**, funksiya göstəricisi, new[]/delete[], pointer fərqi, ->", code: `#include <iostream>

int topla(int a, int b) { return a + b; }
int vur(int a, int b) { return a * b; }

void yonlendir(int** pp, int* yeni) { *pp = yeni; }   // çağıranın pointerini dəyişir

struct Nokta { int x, y; };

int main() {
    int x = 1, y = 2;
    int* p = &x;
    int** pp = &p;
    **pp = 10;
    std::cout << x << '\\n';                  // 10
    yonlendir(&p, &y);
    std::cout << *p << '\\n';                 // 2

    // funksiya göstəricisi
    int (*emel)(int, int) = topla;
    std::cout << emel(3, 4) << '\\n';         // 7
    emel = vur;
    std::cout << emel(3, 4) << '\\n';         // 12
    int (*cedvel[2])(int, int) = {topla, vur};
    std::cout << cedvel[1](5, 5) << '\\n';    // 25

    // dinamik massiv: new[] → delete[]
    int n = 4;
    int* arr = new int[n]{1, 2, 3, 4};
    int cem = 0;
    for (int i = 0; i < n; ++i) cem += arr[i];
    std::cout << cem << '\\n';                // 10
    delete[] arr;
    arr = nullptr;

    // eyni massivdəki iki pointerin fərqi: element sayı
    int a[5] = {0, 1, 2, 3, 4};
    int* b = a + 4;
    std::cout << (b - a) << '\\n';            // 4
    std::cout << sizeof(void*) << '\\n';      // 8 (64-bit)

    // struct və ->
    Nokta nq{3, 4};
    Nokta* pn = &nq;
    std::cout << pn->x + (*pn).y << '\\n';    // 7
    return 0;
}` },
          { t: "list", items: [
            "new T[n] üçün delete[], new T üçün delete: uyğun gəlməyən cüt UB-dir (destruktorlar düzgün çağırılmaya bilər, heap pozular).",
            "Pointer fərqi (b - a) tipi std::ptrdiff_t-dir (işarəli); iki pointer yalnız eyni massivə aid olduqda çıxıla bilər.",
            "Pointeri bool kimi yoxlamaq olar: if (p) — nullptr yalan, qalanı doğrudur. Amma if (p != nullptr) niyyəti daha aydın göstərir.",
            "Const-correctness: dəyişmədiyin hər parametri const T& və ya const T* et. Kompilyator səhvən dəyişdirməni tutur və optimizasiyaya kömək edir.",
            "this — üzv funksiyasının daxilində cari obyektə gizli pointerdir; const üzv funksiyada tipi const T*-dir.",
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
          { t: "mistake", lang: "cpp", wrong: `int* arr = new int[10];
// ... istifadə
delete arr;              // new[] üçün delete[] lazımdır

void sizdir() {
    int* p = new int(5);
    if (xeta()) return;  // erkən çıxış: delete atlanır, yaddaş sızır
    delete p;
}`, right: `auto arr = std::make_unique<int[]>(10);   // və ya std::vector<int>(10)

void sizmir() {
    auto p = std::make_unique<int>(5);
    if (xeta()) return;  // p avtomatik azad olur
}`, why: "new[] ilə ayrılanı delete ilə silmək UB-dir (ölçü məlumatı və destruktorlar səhv idarə olunur). Üstəlik erkən return və ya istisna delete sətrini keçir və yaddaş sızması (memory leak) yaranır. RAII bunun hamısını həll edir." },
          { t: "mistake", lang: "cpp", wrong: `std::vector<int> v = {1, 2, 3};
int* p = &v[0];
v.push_back(4);          // yenidən bölüşdürmə ola bilər
std::cout << *p;         // p köhnə (azad olmuş) yaddaşa baxır: UB`, right: `std::vector<int> v = {1, 2, 3};
v.push_back(4);
int* p = &v[0];          // dəyişikliklərdən SONRA götür
std::cout << *p << '\\n';
// və ya indeks saxla: std::size_t i = 0; v[i]`, why: "vector-un capacity-si dolanda yeni yaddaş ayrılır və köhnə blok azad olunur; əvvəlcədən alınmış pointer/referans/iterator dangling olur. Konteyner dəyişə bilən yerdə pointer yox, indeks saxla və ya pointeri dəyişiklikdən sonra al." },
          { t: "qa", items: [
            ["nullptr, NULL və 0 fərqi nədir?", "nullptr std::nullptr_t tipidir və yalnız pointerə çevrilir. NULL/0 tam ədəddir: overload-larda (f(int) / f(char*)) səhv funksiyanı seçdirə bilər. C++11-dən nullptr işlət."],
            ["delete və delete[] fərqi nədir?", "delete tək obyekti, delete[] new[] ilə yaradılmış massivi silir və hər elementin destruktorunu çağırır. Uyğun gəlməsə UB-dir."],
          ]},
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
          { t: "h", text: "Ağıllı pointerlərin daxili işləməsi və type punning" },
          { t: "p", text: "unique_ptr çox vaxt yalnız bir xam pointerdən ibarətdir (sizeof(unique_ptr<int>) == sizeof(int*)), kopyalanmır, yalnız move olunur; destruktoru delete-i çağırır. Buna görə sıfır xərcli abstraksiyadır. shared_ptr isə iki göstərici saxlayır: obyektə və idarəetmə blokuna (control block). Blokda strong və weak sayğacları və deleter saxlanılır; sayğaclar atomikdir, ona görə kopyalama/məhvetmə sürətli unique_ptr-dan yavaşdır. std::make_shared obyekt və blokunu bir bölüşdürmədə ayırır." },
          { t: "p", text: "İki shared_ptr bir-birini saxlayanda (A→B və B→A) sayğaclar heç vaxt sıfıra düşmür və yaddaş sızır. Dairənin bir tərəfini weak_ptr etmək həll yoludur: weak_ptr sayğacı artırmır, istifadə üçün lock() çağırılır və obyekt hələ yaşayırsa shared_ptr qaytarır." },
          { t: "p", text: "Type punning: float-ın bitlərini tam ədəd kimi oxumaq üçün *(uint32_t*)&f yazmaq strict aliasing qaydasını pozur (UB) və optimizasiyada səhv nəticə verə bilər. Düzgün üsul std::memcpy (kompilyator onu optimallaşdırıb sıfır xərcə endirir) və ya C++20 std::bit_cast-dır." },
          { t: "code", lang: "cpp", caption: "weak_ptr ilə dairəni qırmaq, bit_cast, custom deleter, unique_ptr<T[]>", code: `#include <bit>
#include <cstdint>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <memory>
#include <string>

struct Dost;
struct Sexs {
    std::string ad;
    std::shared_ptr<Dost> dost;
    explicit Sexs(std::string a) : ad(std::move(a)) {}
    ~Sexs() { std::cout << "~Sexs " << ad << '\\n'; }
};
struct Dost {
    std::weak_ptr<Sexs> sahib;     // shared_ptr olsaydı: dairəvi asılılıq, sızma
    ~Dost() { std::cout << "~Dost\\n"; }
};

int main() {
    {
        auto s = std::make_shared<Sexs>("Aysel");
        s->dost = std::make_shared<Dost>();
        s->dost->sahib = s;
        std::cout << s.use_count() << '\\n';                    // 1 (weak saymır)
        if (auto qeyd = s->dost->sahib.lock()) {
            std::cout << qeyd->ad << ' ' << s.use_count() << '\\n';   // Aysel 2
        }
    }   // ~Sexs Aysel, ~Dost

    // type punning: UB yox, bit_cast və ya memcpy
    float f = 1.0f;
    std::uint32_t bitler = std::bit_cast<std::uint32_t>(f);
    std::cout << std::hex << bitler << std::dec << '\\n';      // 3f800000
    std::uint32_t k;
    std::memcpy(&k, &f, sizeof k);
    std::cout << (k == bitler) << '\\n';                        // 1

    // custom deleter: C resursu RAII ilə
    auto bagla = [](std::FILE* p) { if (p) std::fclose(p); };
    std::unique_ptr<std::FILE, decltype(bagla)> fayl(std::fopen("yoxdur_xyz.txt", "r"), bagla);
    std::cout << (fayl == nullptr) << '\\n';                    // 1

    auto arr = std::make_unique<int[]>(3);                      // sıfırla başlayır
    arr[0] = 7;
    std::cout << arr[0] << arr[1] << '\\n';                     // 70
    std::cout << sizeof(std::unique_ptr<int>) << ' ' << sizeof(int*) << '\\n';   // 8 8
    return 0;
}
// çıxış:
// 1
// Aysel 2
// ~Sexs Aysel
// ~Dost
// 3f800000
// 1
// 1
// 70
// 8 8` },
          { t: "list", items: [
            "Object lifetime: obyektin ömrü konstruktor bitəndən destruktor başlayana qədərdir. Bu aralıqdan kənarda pointer ilə oxumaq UB-dir; placement new ilə eyni yaddaşda yeni obyekt yaratsan, köhnə pointerlərdən std::launder lazım ola bilər.",
            "Alignment: new standart alignment-i təmin edir (adətən 16 bayt). Daha sərt tələb (SIMD, 64 baytlıq cache sətri) üçün alignas və std::aligned_alloc / aligned operator new (C++17) işlət; səhv aliqnlı pointerin dereferansı UB-dir və bəzi prosessorlarda çökmə verir.",
            "Virtual funksiyalı sinifin obyekti gizli vptr (virtual cədvəl göstəricisi) saxlayır; baza sinif pointeri vasitəsilə silmək üçün baza destruktoru virtual olmalıdır, əks halda UB (törəmə hissənin destruktoru çağırılmır).",
            "Kompilyator pointerlərin eyni yaddaşa baxmadığını güman edə bilər (alias analizi): fərqli tiplərin pointerləri (strict aliasing) və __restrict ilə işarələnmiş pointerlər. Bu fərziyyələri pozmaq optimizasiyadan sonra qəribə nəticələr verir.",
            "Pointer provenance: pointer sadəcə ədəd deyil, hansı obyektdən törədiyi barədə məntiqi məlumat da daşıyır; tam ədədə çevirib geri qaytarmaq (uintptr_t) dəqiq qaydalarla icazəlidir, amma ünvan tamamlama ilə başqa obyektə çıxmaq UB-dir.",
            "shared_ptr-ı funksiyaya dəyərlə ötürmək atomik sayğac artırır: baxış üçün const T& və ya T* ötür, sahibliyi paylaşmaq lazımdırsa shared_ptr.",
            "enable_shared_from_this: obyektin öz daxilindən shared_ptr<this> almaq üçün; yoxsa new T(this) ilə ikinci idarəetmə bloku yaranır və double free baş verir.",
            "C++ Core Guidelines: R.3 (xam pointer sahib deyil), R.20 (RAII), F.7 (baxış üçün T* və ya T&), ES.200+ (cast-lardan qaç). clang-tidy bunları avtomatik yoxlayır.",
          ]},
          { t: "warn", text: "Xam pointeri ikinci dəfə ağıllı pointerə sarma: T* r = new T; shared_ptr<T> a(r); shared_ptr<T> b(r); — iki ayrı idarəetmə bloku yaranır və obyekt iki dəfə silinir. Həmişə make_shared/make_unique işlət, mövcud shared_ptr-ı kopyala." },
          { t: "qa", items: [
            ["unique_ptr, shared_ptr və weak_ptr nə vaxt işlədilir?", "unique_ptr — tək sahibli, standart seçim (sıfır xərc). shared_ptr — həqiqətən paylaşılan sahiblik lazım olanda (atomik sayğac xərci var). weak_ptr — sahiblik etmədən baxış və dairəvi asılılığı qırmaq üçün."],
            ["Strict aliasing nədir?", "Fərqli tipli pointerlərin (char* istisna) eyni yaddaşa baxmadığına dair kompilyator fərziyyəsi. int-i float* ilə oxumaq UB-dir; düzgün yol memcpy və ya std::bit_cast-dır."],
            ["Memory leak və dangling pointer fərqi nədir?", "Leak — yaddaş ayrılıb heç vaxt azad olunmur (heç kim ona sahib deyil). Dangling — yaddaş artıq azad olub, amma pointer hələ ona baxır. Birincisi ehtiyatı tükədir, ikincisi UB və təhlükəsizlik zəifliyidir."],
            ["Virtual destruktor niyə vacibdir?", "Baza sinif pointeri ilə törəmə obyekti silərkən virtual olmayan destruktor yalnız baza hissəsini çağırır: törəmənin resursları sızır, davranış UB-dir. Polimorf baza siniflərdə destruktoru virtual et."],
          ]},
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
