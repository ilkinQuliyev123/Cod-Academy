import type { Lesson } from "../types";

export const python: Lesson[] = [
  {
    slug: "giris",
    title: "Python nədir? İlk kod",
    intro: "Python oxunması ingilis dilinə yaxın, sadə və güclü dildir. Back-end, süni intellekt, data analizi və avtomatlaşdırmada ən çox istifadə olunan dillərdəndir.",
    sections: [
      {
        level: "baslangic",
        title: "İlk proqram",
        blocks: [
          { t: "analogy", text: "Python sənə «tərcüməçi» ilə danışmaq kimidir: sən sadə cümlələr yazırsan, interpretator onları kompüterin anladığı dilə çevirir və dərhal icra edir." },
          { t: "code", lang: "python", code: `print("Salam, dünya!")

ad = input("Adın nədir? ")
print("Xoş gəldin,", ad)` },
          { t: "terms", items: [
            ["print", "«Çap et» — dəyəri ekrana yazır."],
            ["input", "«Giriş» — istifadəçidən mətn alır (həmişə str qaytarır)."],
            ["ad =", "Dəyişən yaradır: sağdakı dəyəri «ad» adlı yerə yazır."],
            ["\"...\"", "Mətn (str). Tək dırnaq '...' da olar."],
          ]},
          { t: "h", text: "Python-un fərqi: girinti (indentation)" },
          { t: "p", text: "Başqa dillər blokları { } ilə ayırır, Python isə boşluqla (4 boşluq). Girinti burada bəzək deyil — qaydadır." },
          { t: "code", lang: "python", code: `yas = 18
if yas >= 18:
    print("Böyüksən")   # 4 boşluq içəri
print("Bu həmişə işləyir")` },
        ],
      },
      {
        level: "orta",
        title: "Tez-tez edilən səhvlər",
        blocks: [
          { t: "mistake", lang: "python", wrong: `if True:\nprint("salam")`, right: `if True:\n    print("salam")`, why: "IndentationError: iki nöqtədən (:) sonra gələn blok içəri sürüşdürülməlidir." },
          { t: "mistake", lang: "python", wrong: `yas = input("Yaş: ")\nprint(yas + 1)`, right: `yas = int(input("Yaş: "))\nprint(yas + 1)`, why: "input həmişə mətn qaytarır. Mətnə rəqəm əlavə etmək TypeError verir — int() ilə ədədə çevir." },
          { t: "tip", text: "f-string ən rahat formatlamadır: print(f\"{ad} {yas} yaşındadır\")" },
        ],
      },
      {
        level: "senior",
        title: "CPython daxildə",
        blocks: [
          { t: "p", text: "Ən geniş yayılmış reallaşdırma CPython-dur: kod əvvəlcə bytecode-a (.pyc) kompilyasiya olunur, sonra virtual maşın onu icra edir. Python-da hər şey obyektdir — hətta 5 rəqəmi də: tipi, referans sayğacı (reference count) və dəyəri var." },
          { t: "list", items: [
            "GIL (Global Interpreter Lock) eyni anda yalnız bir thread-in Python bytecode icra etməsinə icazə verir — CPU-ağır iş üçün multiprocessing, I/O üçün asyncio/threading. Python 3.13+ GIL-siz (free-threaded) build də təklif edir.",
            "Virtual mühit (python -m venv .venv) hər layihənin asılılıqlarını ayırır — senior üçün məcburi vərdiş.",
            "PEP 8 — rəsmi stil bələdçisi; ruff və black ilə avtomatlaşdır.",
            "Tip ipucları (def f(x: int) -> str) + mypy/pyright böyük layihələrdə səhvləri azaldır.",
          ]},
          { t: "qa", items: [
            ["Python interpretasiya olunan dildir?", "Mənbə kod bytecode-a kompilyasiya olunur, bytecode isə virtual maşında interpretasiya edilir."],
            ["GIL nədir?", "CPython-da bir prosesdə eyni anda tək thread-in bytecode icra etməsini təmin edən kilid."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "type(input()) nə qaytarar?", options: ["int", "str", "Daxil edilənə görə dəyişir"], answer: 1, why: "input həmişə str qaytarır, hətta 42 yazsan belə." },
        ],
      },
    ],
    exercise: {
      task: "İki ədədi dəyişənlərdə saxla (a = 12, b = 5) və f-string ilə cəmi, fərqi və hasilini çap et.",
      starter: `a = 12\nb = 5\n# kodun\n`,
      expect: "print(f\"...{a + b}...\") kimi 3 nəticə: 17, 7, 60.",
    },
  },
  {
    slug: "deyisenler",
    title: "Dəyişənlər və tiplər",
    intro: "Dəyişən dəyərə verilmiş addır. Python-da tipi yazmırsan — dəyərə baxıb özü anlayır (dinamik tipləşmə). Amma tipi bilmək yenə vacibdir.",
    sections: [
      {
        level: "baslangic",
        title: "Yaratmaq və tiplər",
        blocks: [
          { t: "analogy", text: "Python-da dəyişən qutu yox, yapışqan etiketdir. ad = \"Aysel\" — «Aysel» dəyərinin üstünə «ad» etiketi yapışdırırsan. ad = 5 yazsan, etiketi qoparıb 5-in üstünə yapışdırırsan." },
          { t: "code", lang: "python", code: `ad = "Aysel"          # str — mətn
yas = 25              # int — tam ədəd
boy = 1.68            # float — kəsr
telebedir = True      # bool — True / False
unvan = None          # None — «heç nə»

print(type(ad))       # <class 'str'>
print(type(yas))      # <class 'int'>

x, y = 10, 20         # bir sətirdə bir neçə dəyişən
x, y = y, x           # yerini dəyiş — 20, 10
print(x, y)` },
          { t: "terms", items: [
            ["str", "string — mətn."],
            ["int", "integer — tam ədəd (ölçüsü məhdud deyil!)."],
            ["float", "kəsr ədəd."],
            ["bool", "True və ya False (böyük hərflə)."],
            ["None", "dəyər yoxdur (JS-dəki null kimi)."],
            ["type()", "dəyərin tipini göstərir."],
          ]},
          { t: "tip", text: "Adlandırma: snake_case — kiçik hərf və alt xətt: tam_ad, dogum_ili. Sabitlər BÖYÜK: MAX_YAS = 120." },
        ],
      },
      {
        level: "orta",
        title: "Tip çevrilməsi və f-string",
        blocks: [
          { t: "code", lang: "python", code: `yas = int("25")         # str → int
qiymet = float("9.99")  # str → float
metn = str(42)          # int → str
print(bool(0), bool(""), bool("0"))  # False False True

ad = "Murad"
yas = 22
print(f"{ad} {yas} yaşındadır")          # f-string
print(f"Gələn il: {yas + 1}")            # ifadə də olar
print(f"Qiymət: {9.98765:.2f} AZN")      # 9.99 — 2 rəqəm` },
          { t: "mistake", lang: "python", wrong: `yas = 25\nprint("Yaşım " + yas)`, right: `yas = 25\nprint(f"Yaşım {yas}")`, why: "Python JS kimi gizli çevirmə etmir: str + int → TypeError. f-string işlət və ya str(yas)." },
          { t: "mistake", lang: "python", wrong: `1ad = "Aysel"\nclass = "A"`, right: `ad1 = "Aysel"\nsinif = "A"`, why: "Ad rəqəmlə başlaya bilməz; açar sözlər (class, if, for, def) dəyişən adı ola bilməz." },
        ],
      },
      {
        level: "senior",
        title: "Hər şey obyektdir: id, mutability, type hints",
        blocks: [
          { t: "p", text: "Python-da hər dəyər obyektdir və yaddaşda ünvanı (id()) var. Dəyişən yalnız istinaddır. Dəyişməz (immutable) tiplər: int, float, str, bool, tuple, frozenset — «dəyişəndə» əslində yeni obyekt yaranır. Dəyişən (mutable): list, dict, set — yerində dəyişir və bütün istinadlar bunu görür." },
          { t: "code", lang: "python", code: `a = [1, 2]
b = a           # eyni siyahı
b.append(3)
print(a)        # [1, 2, 3]
print(a is b)   # True — eyni obyekt

# Type hints — icrada yoxlanmır, amma IDE və mypy tutur
def salamla(ad: str, yas: int = 0) -> str:
    return f"Salam, {ad}"` },
          { t: "list", items: [
            "is — eyni obyektdirmi; == — dəyərlər bərabərdirmi. None üçün həmişə: x is None.",
            "Kiçik int-lər (-5..256) və bəzi str-lər keşlənir — is ilə ədəd müqayisə etmə.",
            "Type hints böyük layihədə bug-ların böyük hissəsini kod işləmədən tutur; FastAPI onları validasiya üçün işlədir.",
            "Təhlükəsizlik: sirləri (API açarı, parol) kodda dəyişənə yazma — os.environ[\"API_KEY\"] ilə mühitdən oxu; kod git-ə düşəndə açar da düşür.",
          ]},
          { t: "qa", items: [
            ["is ilə == fərqi?", "is obyekt eyniliyini (id), == dəyər bərabərliyini yoxlayır."],
            ["Mutable və immutable tiplər?", "Immutable: int, float, str, tuple, frozenset; mutable: list, dict, set."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "type(3.0) nədir?", options: ["int", "float", "str"], answer: 1, why: "Nöqtəli ədəd float-dır." },
          { t: "quiz", q: "print(\"5\" + 5) nə edir?", options: ["10", "\"55\"", "TypeError"], answer: 2, why: "Python str ilə int-i avtomatik birləşdirmir." },
        ],
      },
    ],
    exercise: {
      task: "ad, dogum_ili, boy (float) dəyişənləri yarat. Yaşı hesabla (2026 - dogum_ili) və f-string ilə \"Aysel 25 yaşındadır, boyu 1.68 m\" formatında çap et (boy 2 rəqəmlə). Hər dəyişənin tipini də çap et.",
      starter: `ad = "Aysel"\ndogum_ili = 2001\nboy = 1.68\n\n# bura\n`,
      expect: "dəyişənlər snake_case; yas = 2026 - dogum_ili; f-string və {boy:.2f}; type() ilə tiplər çap olunur; str + int birləşdirməsi yoxdur.",
    },
  },
  {
    slug: "operatorlar",
    title: "Operatorlar",
    intro: "Riyazi, müqayisə və məntiqi operatorlar. Python-un bir neçə «sürprizi» var: / həmişə float qaytarır, // tam bölmədir, and/or sözlə yazılır.",
    sections: [
      {
        level: "baslangic",
        title: "Riyaziyyat",
        blocks: [
          { t: "analogy", text: "Pizzanı 3 nəfərə bölürsən: 10 dilim / 3 = 3.33 (hər kəsə düşən, kəsrli), 10 // 3 = 3 (hər kəsə tam dilim), 10 % 3 = 1 (artıq qalan dilim)." },
          { t: "code", lang: "python", code: `print(10 + 3)    # 13
print(10 - 3)    # 7
print(10 * 3)    # 30
print(10 / 3)    # 3.3333333333333335 — həmişə float
print(10 // 3)   # 3 — tam bölmə (floor)
print(10 % 3)    # 1 — qalıq
print(2 ** 10)   # 1024 — qüvvət

say = 5
say += 2         # 7  (Python-da ++ YOXDUR)
print(say)` },
          { t: "terms", items: [
            ["/", "bölmə — nəticə float."],
            ["//", "tam bölmə — aşağı yuvarlaqlaşdırır."],
            ["%", "qalıq: n % 2 == 0 → cüt."],
            ["**", "qüvvət."],
            ["+=, -=, *=", "qısa təyinat."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Müqayisə və məntiq",
        blocks: [
          { t: "code", lang: "python", code: `yas = 20
print(yas == 20, yas != 18)        # True True
print(18 <= yas < 65)              # True — zəncirvari müqayisə!
print(yas > 18 and yas < 30)       # and, or, not — sözlə
print(not True)                    # False

ad = "" or "Qonaq"                 # "Qonaq" — ilk truthy
print("a" in "Aysel", 3 in [1, 2, 3])   # False True — in operatoru` },
          { t: "list", items: [
            "Falsy: False, None, 0, 0.0, \"\", [], {}, set(). Qalan hər şey truthy.",
            "in — mətndə, siyahıda, lüğətin açarlarında axtarış.",
            "Python-da === yoxdur: == dəyəri müqayisə edir və tipləri gizlicə çevirmir (1 == \"1\" → False).",
          ]},
          { t: "mistake", lang: "python", wrong: `if yas > 18 && yas < 30:`, right: `if 18 < yas < 30:`, why: "Python-da && və || yoxdur — and / or. Zəncirvari müqayisə isə daha oxunaqlıdır." },
          { t: "mistake", lang: "python", wrong: `print(-7 // 2)  # -3 gözləyirdim`, right: `print(int(-7 / 2))  # -3 (sıfıra doğru)`, why: "// aşağı (mənfi sonsuzluğa doğru) yuvarlaqlaşdırır: -7 // 2 = -4. Sıfıra doğru kəsmək lazımdırsa int()." },
        ],
      },
      {
        level: "senior",
        title: "Dəqiqlik, walrus, operator overloading",
        blocks: [
          { t: "code", lang: "python", code: `print(0.1 + 0.2 == 0.3)        # False
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))  # True — pul üçün

import math
print(math.isclose(0.1 + 0.2, 0.3))  # True

# Walrus := — ifadə içində təyinat (3.8+)
if (n := len("Kod Akademiyası")) > 10:
    print(f"Uzun ad: {n} simvol")` },
          { t: "list", items: [
            "int ölçüsüz böyüyə bilər: 2 ** 1000 işləyir, amma çox böyük ədədlərlə əməliyyat yavaşdır.",
            "Operatorlar «dunder» metodlarına çevrilir: a + b → a.__add__(b). Öz siniflərinə + , == , < öyrədə bilərsən.",
            "and/or bool yox, operandın ÖZÜNÜ qaytarır: [] or [1] → [1].",
            "Təhlükəsizlik: istifadəçidən gələn ədədlə ** və ya çox böyük int yaratmaq (10 ** 10**8) CPU/yaddaşı tükəndirir (DoS). Python 3.11+ int → str çevirmədə 4300 rəqəm limiti məhz buna görə əlavə olunub. Girişləri məhdudlaşdır.",
            "Təhlükəsizlik: parol/token müqayisəsində == əvəzinə hmac.compare_digest — sabit zamanlı müqayisə timing hücumunun qarşısını alır.",
          ]},
          { t: "qa", items: [
            ["/ və // fərqi?", "/ həmişə float qaytarır, // aşağı yuvarlaqlaşdırılmış tam bölmədir."],
            ["Pul hesablamaları üçün nə işlədilir?", "decimal.Decimal (str-dən yaradılmış) və ya qəpiklə int."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "17 // 5 = ?", options: ["3.4", "3", "2"], answer: 1, why: "Tam bölmə, kəsr atılır." },
          { t: "quiz", q: "Python-da «və» operatoru:", options: ["&&", "and", "&"], answer: 1, why: "Python məntiqi operatorları sözlə yazır." },
        ],
      },
    ],
    exercise: {
      task: "saniye = 7385 verilib. // və % ilə saat, dəqiqə, saniyəyə çevir və \"2 saat 3 dəqiqə 5 saniyə\" formatında çap et. Sonra ilin uzun il olub-olmadığını yoxlayan ifadə yaz (4-ə bölünür və 100-ə bölünmür, və ya 400-ə bölünür).",
      starter: `saniye = 7385\n\n# 1) saat, dəqiqə, saniyə\n\nil = 2024\n# 2) uzun il?\n`,
      expect: "saat = saniye // 3600, deqiqe = saniye % 3600 // 60, san = saniye % 60 → 2 3 5; uzun il: (il % 4 == 0 and il % 100 != 0) or il % 400 == 0 → True; and/or sözlə.",
    },
  },
  {
    slug: "string",
    title: "String-lər",
    intro: "Mətnlə işləmək — ad, email, mesaj, fayl məzmunu. Python string-ləri güclüdür: dilimləmə (slicing), onlarla hazır metod və f-string.",
    sections: [
      {
        level: "baslangic",
        title: "İndeks və dilimləmə",
        blocks: [
          { t: "analogy", text: "String — muncuq düzülmüş sapdır: hər muncuğun nömrəsi var (0-dan). Dilimləmə [a:b] — qayçı ilə a-dan b-yə qədər (b daxil deyil) kəsmək." },
          { t: "code", lang: "python", code: `s = "Python"
print(s[0])      # P
print(s[-1])     # n — sondan
print(s[0:3])    # Pyt — 0,1,2
print(s[2:])     # thon
print(s[::-1])   # nohtyP — tərsinə
print(len(s))    # 6

cox = """Bir neçə
sətirli mətn"""` },
          { t: "terms", items: [
            ["indeks", "simvolun yeri, 0-dan; mənfi indeks sondan sayır."],
            ["slice [a:b:addım]", "a-dan b-yə qədər (b daxil deyil)."],
            ["len()", "uzunluq."],
            ["\"\"\" \"\"\"", "çoxsətirli mətn."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Ən çox işlədilən metodlar",
        blocks: [
          { t: "code", lang: "python", code: `email = "  Aysel@Mail.AZ  "
temiz = email.strip().lower()           # "aysel@mail.az"
print(temiz.endswith(".az"))            # True
print(temiz.split("@"))                 # ['aysel', 'mail.az']
print("-".join(["2026", "11", "13"]))   # 2026-11-13
print("salam dünya".title())            # Salam Dünya
print("ababab".count("ab"))             # 3
print("kod".replace("k", "K"))          # Kod
print("123".isdigit())                  # True
print("Python".find("th"))              # 2 (yoxdursa -1)` },
          { t: "mistake", lang: "python", wrong: `s = "kod"\ns[0] = "K"`, right: `s = "kod"\ns = "K" + s[1:]`, why: "String dəyişməzdir (immutable) — TypeError. Yeni string yarat." },
          { t: "mistake", lang: "python", wrong: `netice = ""\nfor soz in sozler:\n    netice += soz + ", "`, right: `netice = ", ".join(sozler)`, why: "Dövrdə += hər dəfə yeni string yaradır (böyük siyahıda yavaş) və sonda artıq vergül qalır. join həm sürətli, həm düzgündür." },
        ],
      },
      {
        level: "senior",
        title: "Unicode, kodlaşdırma və injection",
        blocks: [
          { t: "p", text: "Python 3-də str Unicode kod nöqtələrinin ardıcıllığıdır; bytes isə xam baytlardır. Diskə/şəbəkəyə yazanda kodlaşdırma (encoding) lazımdır: \"ə\".encode(\"utf-8\") → b'\\xc9\\x99' (2 bayt). Faylları həmişə encoding=\"utf-8\" ilə aç — Windows-da default fərqli ola bilər." },
          { t: "code", lang: "python", code: `print("İ".lower(), len("İ".lower()))     # i̇ 2 — türk/azərbaycan İ problemi!
print("ı".upper())                        # I
print("straße".casefold() == "STRASSE".casefold())  # True — dil-neytral müqayisə

import unicodedata
print(unicodedata.normalize("NFC", "e\\u0301") == "é")  # True` },
          { t: "list", items: [
            "Azərbaycan dilində İ/i və I/ı cütləri Python-un default lower/upper-i ilə səhv işləyir — istifadəçi adlarını müqayisə edəndə casefold + normalize et və ya xüsusi xəritə istifadə et.",
            "Eyni görünən fərqli simvollar (Kiril «а» və Latın «a») — saxta istifadəçi adları/domenlər (homoglyph hücumu). Qeydiyyatda normalizə et və qarışıq skriptləri məhdudlaşdır.",
            "Təhlükəsizlik: string birləşdirmə ilə SQL, shell əmri və ya HTML qurma — injection. SQL üçün parametrlər, shell üçün subprocess.run([...]) siyahı ilə (shell=True YOX), HTML üçün şablon mühərrikinin avtomatik escape-i.",
            "f-string-ə istifadəçi şablonu vermə: str.format(**obyekt) istifadəçinin {obj.__class__...} ilə daxili məlumatlara çatmasına imkan verə bilər.",
          ]},
          { t: "qa", items: [
            ["str ilə bytes fərqi?", "str Unicode mətndir, bytes xam baytlar; encode/decode ilə çevrilir."],
            ["String niyə immutable-dır?", "Təhlükəsiz paylaşmaq, hash-lənmək (dict açarı olmaq) və keşləmək üçün."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "\"Bakı\"[1:3] = ?", options: ["\"Bak\"", "\"ak\"", "\"akı\""], answer: 1, why: "İndeks 1 və 2 — 3 daxil deyil." },
          { t: "quiz", q: "Siyahıdakı sözləri boşluqla birləşdirmək:", options: ["\" \".join(sozler)", "sozler.join(\" \")", "sum(sozler)"], answer: 0, why: "join ayırıcı string-in metodudur." },
        ],
      },
    ],
    exercise: {
      task: "metn = \"  python Öyrənmək ÇOX maraqlıdır  \". 1) Boşluqları təmizlə, hər sözün baş hərfi böyük olsun. 2) Söz sayını tap. 3) Mətni tərsinə çevir. 4) Sözləri \"-\" ilə birləşdir.",
      starter: `metn = "  python Öyrənmək ÇOX maraqlıdır  "\n\n# 1)\n# 2)\n# 3)\n# 4)\n`,
      expect: "strip().title(); len(metn.split()) → 4; [::-1]; \"-\".join(...split()); metodlar zəncirlənib, string yerində dəyişdirilməyə çalışılmayıb.",
    },
  },
  {
    slug: "sertler",
    title: "Şərtlər",
    intro: "if / elif / else ilə qərar vermək. Python-da bloklar girinti ilə müəyyən olunur — iki nöqtəni (:) və 4 boşluğu unutma.",
    sections: [
      {
        level: "baslangic",
        title: "if, elif, else",
        blocks: [
          { t: "analogy", text: "Bankomat: əgər PIN səhvdirsə — rədd et, yox əgər balans azdırsa — «kifayət deyil», əks halda — pulu ver. Yuxarıdan aşağı yoxlanır, ilk doğru şərtdə dayanır." },
          { t: "code", lang: "python", code: `bal = 78

if bal >= 90:
    print("Əla")
elif bal >= 70:
    print("Yaxşı")       # ← bu
elif bal >= 50:
    print("Kafi")
else:
    print("Qeyri-kafi")

# Bir sətirlik (ternary)
status = "keçdi" if bal >= 50 else "kəsildi"
print(status)` },
          { t: "terms", items: [
            ["if şərt:", "şərt doğrudursa girintili blok icra olunur."],
            ["elif", "else if — növbəti şərt."],
            ["else:", "heç biri doğru deyilsə."],
            [":", "blokun başladığını bildirir — mütləqdir."],
            ["girinti", "4 boşluq — bloka aid sətirlər."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Truthy yoxlamalar və match",
        blocks: [
          { t: "code", lang: "python", code: `sebet = []
if not sebet:
    print("Səbət boşdur")      # boş list falsy-dir

user = None
if user is None:
    print("Daxil olmayıb")

# match (3.10+) — güclü switch
emr = "dayan"
match emr:
    case "başla":
        print("Başladı")
    case "dayan" | "stop":
        print("Dayandı")
    case _:
        print("Naməlum əmr")` },
          { t: "mistake", lang: "python", wrong: `if yas >= 18\n    print("Böyük")`, right: `if yas >= 18:\n    print("Böyük")`, why: "İki nöqtə unudulub — SyntaxError." },
          { t: "mistake", lang: "python", wrong: `if len(siyahi) > 0:`, right: `if siyahi:`, why: "Boş olmayan siyahı özü truthy-dir — Python üslubu (pythonic) daha qısadır." },
          { t: "mistake", lang: "python", wrong: `if x == None:`, right: `if x is None:`, why: "None tək obyektdir (singleton) — is ilə yoxlanır; == bəzi siniflərdə yenidən təyin oluna bilər." },
        ],
      },
      {
        level: "senior",
        title: "Struktur pattern matching və erkən qayıtma",
        blocks: [
          { t: "code", lang: "python", code: `def emal(hadise: dict) -> str:
    match hadise:
        case {"tip": "klik", "x": x, "y": y}:
            return f"Klik: {x},{y}"
        case {"tip": "klaviş", "dusme": str(d)} if len(d) == 1:
            return f"Düymə: {d}"
        case _:
            return "Naməlum"

print(emal({"tip": "klik", "x": 5, "y": 9}))` },
          { t: "list", items: [
            "match sadəcə switch deyil: lüğət, siyahı, sinif strukturunu «açır» və dəyişənlərə bağlayır; guard (if) əlavə edir.",
            "Guard clause: funksiyanın əvvəlində uyğunsuzları return ilə çıxart — iç-içəlik azalır.",
            "Çox elif əvəzinə lüğət xəritəsi: EMELLER = {\"topla\": topla, ...}; EMELLER.get(ad, default)(...).",
            "Təhlükəsizlik: assert-i yetki/validasiya yoxlaması üçün işlətmə — python -O ilə işə salınanda assert-lər tamamilə silinir. if + raise yaz.",
            "Təhlükəsizlik: istifadəçinin göndərdiyi əmr adını getattr(obj, ad)() ilə çağırma — gizli metodlara giriş açılır; ağ siyahı (dict) işlət.",
          ]},
          { t: "qa", items: [
            ["is None niyə == None-dan yaxşıdır?", "None singleton-dur; is eynilik yoxlayır, __eq__ təsir etmir və daha sürətlidir."],
            ["assert nə vaxt təhlükəlidir?", "Optimallaşdırma rejimində (-O) silinir — təhlükəsizlik yoxlaması kimi işlədiləndə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Python-da «else if» necə yazılır?", options: ["else if", "elif", "elseif"], answer: 1, why: "elif — qısa forma." },
        ],
      },
    ],
    exercise: {
      task: "bmi(ceki, boy) funksiyası yaz: BMI = çəki / boy². 18.5-dən az \"Arıq\", 25-dən az \"Normal\", 30-dan az \"Artıq çəki\", qalanı \"Piylənmə\" qaytarsın. Çəki və ya boy ≤ 0 olanda \"Yanlış məlumat\" (guard). 3 nümunə ilə çap et.",
      starter: `def bmi(ceki, boy):\n    # bura\n    pass\n\nprint(bmi(70, 1.75))   # Normal\nprint(bmi(50, 1.80))   # Arıq\nprint(bmi(0, 1.70))    # Yanlış məlumat\n`,
      expect: "əvvəlcə ceki <= 0 or boy <= 0 → return \"Yanlış məlumat\"; boy ** 2; if/elif ardıcıl artan hədlərlə; nəticələr Normal, Arıq, Yanlış məlumat.",
    },
  },
  {
    slug: "dovrler",
    title: "Dövrlər",
    intro: "for — kolleksiyanın hər elementini gəzir, while — şərt doğru olduqca təkrarlayır. range, enumerate, zip — Python dövrlərini çox rahat edən köməkçilər.",
    sections: [
      {
        level: "baslangic",
        title: "for və range",
        blocks: [
          { t: "analogy", text: "for — poçtalyonun küçə boyunca hər evə məktub qoyması: ev sayını o bilmir, küçə (siyahı) bitənə qədər gedir. while — «yağış yağdıqca evdə otur»: neçə saat olacağı bəlli deyil." },
          { t: "code", lang: "python", code: `for meyve in ["alma", "armud", "nar"]:
    print(meyve)

for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 11, 2):   # 1, 3, 5, 7, 9 — başla, bitir (daxil deyil), addım
    print(i)

for herf in "Kod":
    print(herf)

pul = 100
while pul > 0:
    pul -= 30
    print("Qaldı:", pul)` },
          { t: "terms", items: [
            ["for x in kolleksiya:", "hər element üçün bloku icra edir."],
            ["range(n)", "0-dan n-1-ə qədər ədədlər."],
            ["range(a, b, addım)", "a-dan b-yə qədər (b daxil deyil)."],
            ["while şərt:", "şərt doğru olduqca təkrar."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "enumerate, zip, break, continue, else",
        blocks: [
          { t: "code", lang: "python", code: `adlar = ["Aysel", "Murad", "Leyla"]
ballar = [92, 65, 78]

for i, ad in enumerate(adlar, start=1):
    print(i, ad)                # 1 Aysel ...

for ad, bal in zip(adlar, ballar):
    print(f"{ad}: {bal}")

for n in range(1, 20):
    if n % 2 == 0:
        continue                # cütü ötür
    if n > 9:
        break                   # dayandır
    print(n)                    # 1 3 5 7 9

for n in [3, 5, 7]:
    if n % 2 == 0:
        print("Cüt tapıldı")
        break
else:
    print("Cüt yoxdur")         # break olmayanda işləyir` },
          { t: "mistake", lang: "python", wrong: `for i in range(len(adlar)):\n    print(i, adlar[i])`, right: `for i, ad in enumerate(adlar):\n    print(i, ad)`, why: "range(len()) — başqa dillərdən gələn vərdişdir. enumerate həm indeks, həm dəyər verir, daha oxunaqlıdır." },
          { t: "mistake", lang: "python", wrong: `for x in siyahi:\n    if x < 0:\n        siyahi.remove(x)`, right: `siyahi = [x for x in siyahi if x >= 0]`, why: "Gəzdiyin siyahını dövr içində dəyişmək elementlərin ötürülməsinə səbəb olur. Yeni siyahı yarat." },
        ],
      },
      {
        level: "senior",
        title: "İteratorlar və performans",
        blocks: [
          { t: "p", text: "for daxildə iter(obj) çağırır, sonra StopIteration olana qədər next(). range tənbəldir (lazy) — range(10**9) yaddaşda milyard ədəd saxlamır, hər dəfə birini yaradır. Böyük məlumatı generator ilə emal et: yaddaş sabit qalır." },
          { t: "code", lang: "python", code: `cem = sum(n * n for n in range(1_000_000))   # generator — siyahı yaranmır
print(cem)

import itertools
for a, b in itertools.pairwise([1, 4, 9, 16]):
    print(b - a)   # 3 5 7` },
          { t: "list", items: [
            "Python dövrləri C-dən yavaşdır; daxili funksiyalar (sum, max, sorted, \"\".join) C-də işləyir — onları üstün tut.",
            "Rəqəm hesablaması üçün NumPy vektorlaşdırması dövrdən 10–100 dəfə sürətlidir.",
            "Dövr içində in siyahı ilə yoxlama O(n) — set-ə çevir, O(1).",
            "Təhlükəsizlik: while True və istifadəçinin verdiyi range(n) — həmişə yuxarı hədd və ya timeout qoy; yoxsa bir sorğu worker-i saatlarla məşğul edər (DoS). Bu saytın məşq səhifəsi də kodu 20 saniyədən sonra dayandırır.",
          ]},
          { t: "qa", items: [
            ["for...else nə vaxt işləyir?", "Dövr break olmadan sona çatanda."],
            ["range niyə yaddaşa qənaət edir?", "Ədədləri əvvəlcədən yaratmır, tələb olunanda hesablayır (lazy sequence)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "range(2, 8, 3) hansı ədədləri verir?", options: ["2, 5", "2, 5, 8", "3, 6"], answer: 0, why: "2-dən başla, 3 addım, 8 daxil deyil." },
        ],
      },
    ],
    exercise: {
      task: "1) 1-dən 100-ə qədər 7-yə bölünən ədədlərin cəmini tap. 2) adlar və ballar siyahısını zip ilə gəz, 70+ olanları \"✓\", qalanları \"✗\" ilə çap et. 3) Vurma cədvəlinin 1–5 hissəsini iç-içə dövrlə çap et.",
      starter: `adlar = ["Aysel", "Murad", "Leyla", "Orxan"]\nballar = [92, 65, 78, 55]\n\n# 1)\n# 2)\n# 3)\n`,
      expect: "1) cəm 735 (range + % və ya range(7, 101, 7)); 2) zip(adlar, ballar) ilə; 3) iç-içə for range(1, 6); sonsuz while yoxdur.",
    },
  },
  {
    slug: "list-tuple",
    title: "List və tuple",
    intro: "list — dəyişən sıralı siyahı, tuple — dəyişməz sıralı qrup. Python-da ən çox işlədilən kolleksiyalar.",
    sections: [
      {
        level: "baslangic",
        title: "List",
        blocks: [
          { t: "analogy", text: "list — karandaşla yazılmış alış-veriş siyahısı: əlavə edirsən, silirsən, sırasını dəyişirsən. tuple — daşa həkk olunmuş koordinat: (40.4, 49.8) — dəyişmir." },
          { t: "code", lang: "python", code: `dersler = ["HTML", "CSS", "JS"]
dersler.append("Python")      # sona əlavə
dersler.insert(0, "Git")      # indeksə əlavə
dersler.remove("CSS")         # dəyərə görə sil
son = dersler.pop()           # sondan çıxar və qaytar
print(dersler, son)
print(dersler[1:], len(dersler), "JS" in dersler)

ededler = [5, 2, 9, 1]
ededler.sort()                # yerində sıralayır
print(ededler, sorted(ededler, reverse=True), max(ededler), sum(ededler))` },
          { t: "terms", items: [
            ["append / insert", "sona / indeksə əlavə."],
            ["remove / pop", "dəyərə görə sil / indeksdən çıxar."],
            ["sort()", "siyahını YERİNDƏ sıralayır, None qaytarır."],
            ["sorted()", "yeni sıralanmış siyahı qaytarır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Tuple, açmaq (unpacking), kopyalamaq",
        blocks: [
          { t: "code", lang: "python", code: `koordinat = (40.41, 49.87)
enlik, uzunluq = koordinat          # unpacking
ilk, *qalan = [1, 2, 3, 4]          # ilk=1, qalan=[2,3,4]

def min_max(ededler):
    return min(ededler), max(ededler)   # tuple qaytarır
kicik, boyuk = min_max([4, 8, 1])

a = [1, 2, 3]
b = a.copy()        # və ya a[:] / list(a)
b.append(4)
print(a, b)         # [1, 2, 3] [1, 2, 3, 4]

tek = (5,)          # bir elementli tuple — vergül vacibdir!` },
          { t: "mistake", lang: "python", wrong: `ededler = ededler.sort()\nprint(ededler)  # None`, right: `ededler.sort()\n# və ya: ededler = sorted(ededler)`, why: "sort() yerində işləyir və None qaytarır; nəticəni təyin edəndə siyahını itirirsən." },
          { t: "mistake", lang: "python", wrong: `cedvel = [[0] * 3] * 3\ncedvel[0][0] = 1  # hər sətir dəyişdi!`, right: `cedvel = [[0] * 3 for _ in range(3)]`, why: "* 3 eyni daxili siyahıya 3 istinad yaradır. Hər sətir üçün ayrıca siyahı lazımdır." },
        ],
      },
      {
        level: "senior",
        title: "Daxili quruluş və mürəkkəblik",
        blocks: [
          { t: "p", text: "list dinamik massivdir: elementlərə istinadları ardıcıl saxlayır, dolanda ~1.125 dəfə böyüyür (amortized O(1) append). İndekslə oxumaq O(1), sona əlavə O(1), əvvələ əlavə/silmə O(n) — hamı sürüşür. Növbə (queue) üçün collections.deque — hər iki ucda O(1)." },
          { t: "list", items: [
            "x in list — O(n); tez-tez yoxlama üçün set.",
            "tuple list-dən yüngüldür, hash-lənə bilir (elementləri immutable-dırsa) — dict açarı ola bilər.",
            "Dayaz surət (copy) iç-içə siyahıları paylaşır — copy.deepcopy.",
            "Default arqumentdə list: def f(x=[]) — siyahı bir dəfə yaranır və çağırışlar arasında paylaşılır! x=None yaz.",
            "Təhlükəsizlik: istifadəçidən gələn siyahının uzunluğunu yoxla; pickle ilə siyahı/obyekt «yükləmə» — pickle.loads etibarsız məlumatda ixtiyari kod icra edir. JSON işlət.",
          ]},
          { t: "qa", items: [
            ["list ilə tuple fərqi?", "list mutable-dır, tuple immutable; tuple hash-lənə bilir və bir az yüngüldür."],
            ["list.insert(0, x) niyə yavaşdır?", "Bütün elementlər bir yerə sürüşür — O(n); deque.appendleft O(1)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "[3, 1, 2].sort() nə qaytarır?", options: ["[1, 2, 3]", "None", "[3, 2, 1]"], answer: 1, why: "sort yerində işləyir, nəticə None." },
          { t: "quiz", q: "Bir elementli tuple:", options: ["(5)", "(5,)", "[5]"], answer: 1, why: "(5) sadəcə mötərizəli ədəddir." },
        ],
      },
    ],
    exercise: {
      task: "ballar = [78, 92, 55, 61, 88, 92]. 1) Orijinalı dəyişmədən azalan sıralanmış surət al. 2) Orta balı (2 rəqəm) tap. 3) Ən yüksək və ən aşağını bir funksiyadan tuple kimi qaytar və unpacking et. 4) Təkrarları sil (sıra qorunsun).",
      starter: `ballar = [78, 92, 55, 61, 88, 92]\n\n# 1)\n# 2)\n# 3)\n# 4)\n`,
      expect: "sorted(ballar, reverse=True); round(sum/len, 2) → 77.67; return min, max → kicik, boyuk = ...; sıralı təkrarsız: list(dict.fromkeys(ballar)) və ya dövr; orijinal dəyişməyib.",
    },
  },
  {
    slug: "dict-set",
    title: "Dictionary və set",
    intro: "dict — açar → dəyər lüğəti (JSON-un Python qarşılığı), set — unikal elementlər toplusu. İkisi də hash cədvəlinə əsaslanır və axtarışı çox sürətlidir.",
    sections: [
      {
        level: "baslangic",
        title: "dict",
        blocks: [
          { t: "analogy", text: "dict — telefon kitabçasıdır: adı (açar) bilirsən, nömrəni (dəyər) dərhal tapırsan, səhifə-səhifə axtarmırsan. set — klubun üzv siyahısı: hər kəs bir dəfə yazılır." },
          { t: "code", lang: "python", code: `user = {"ad": "Aysel", "yas": 25, "seher": "Bakı"}

print(user["ad"])                 # Aysel
print(user.get("email"))          # None — xəta yox
print(user.get("email", "yoxdur"))

user["email"] = "a@mail.az"       # əlavə / dəyiş
del user["seher"]                 # sil

for acar, deyer in user.items():
    print(acar, "→", deyer)

print("ad" in user)               # açar varmı` },
          { t: "terms", items: [
            ["açar (key)", "unikal və immutable olmalıdır: str, int, tuple."],
            ["get(k, default)", "açar yoxdursa xəta əvəzinə default."],
            ["items() / keys() / values()", "cütlər / açarlar / dəyərlər."],
            ["in", "AÇARLARDA axtarır."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "set və tez-tez naxışlar",
        blocks: [
          { t: "code", lang: "python", code: `a = {"HTML", "CSS", "JS"}
b = {"JS", "Python"}
print(a | b)   # birləşmə
print(a & b)   # kəsişmə {'JS'}
print(a - b)   # fərq
print(set([1, 1, 2, 3, 3]))   # {1, 2, 3}

# Saymaq
from collections import Counter, defaultdict
sozler = "alma nar alma heyva alma".split()
print(Counter(sozler).most_common(1))   # [('alma', 3)]

# Qruplaşdırma
qrup = defaultdict(list)
for ad, seher in [("Aysel", "Bakı"), ("Murad", "Gəncə"), ("Nərmin", "Bakı")]:
    qrup[seher].append(ad)
print(dict(qrup))

birlesmis = {**user, "yas": 26}   # və ya user | {"yas": 26}` },
          { t: "mistake", lang: "python", wrong: `bos = {}\nbos.add(1)`, right: `bos = set()\nbos.add(1)`, why: "{} boş DICT yaradır, set yox." },
          { t: "mistake", lang: "python", wrong: `print(user["telefon"])  # KeyError`, right: `print(user.get("telefon", "-"))`, why: "Olmaya bilən açar üçün get işlət." },
        ],
      },
      {
        level: "senior",
        title: "Hash cədvəli, sıra və HashDoS",
        blocks: [
          { t: "p", text: "dict və set hash cədvəlidir: açarın hash()-i yeri müəyyən edir → axtarış, əlavə, silmə orta hesabla O(1). Python 3.7-dən dict əlavə olunma SIRASINI qoruyur (dil zəmanətidir), set isə qorumur. Açar mutable ola bilməz, çünki dəyişsə hash-i dəyişər və «itər»." },
          { t: "list", items: [
            "Dövr zamanı dict-in ölçüsünü dəyişmək RuntimeError verir — list(d.items()) üzərində gəz.",
            "Öz sinfini açar etmək üçün __hash__ və __eq__ ardıcıl olmalıdır (dataclass(frozen=True) bunu edir).",
            "dict yaddaş baxımından «ac»dır; milyonlarla kiçik obyekt üçün __slots__ və ya tuple/namedtuple.",
            "Təhlükəsizlik — HashDoS: hücumçu eyni hash-ə düşən minlərlə açar göndərsə, O(1) → O(n) olur və server donur. Python str hash-ini hər prosesdə təsadüfi «duz» ilə hesablayır (PYTHONHASHSEED) — bu, məhz bu hücuma qarşıdır; söndürmə.",
            "Təhlükəsizlik: JSON-dan gələn dict-i birbaşa obyektə tökmə (setattr dövrü, **data) — mass assignment; icazəli sahələri ağ siyahı ilə seç (pydantic modeli).",
          ]},
          { t: "qa", items: [
            ["dict-də axtarış niyə O(1)-dir?", "Açarın hash-i birbaşa yaddaşdakı yeri göstərir, bütün elementləri gəzmək lazım deyil."],
            ["Niyə list dict açarı ola bilməz?", "Mutable-dır — dəyişəndə hash-i dəyişər; ona görə hash-lənmir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "type({}) nədir?", options: ["set", "dict", "list"], answer: 1, why: "Boş fiqurlu mötərizə dict yaradır." },
          { t: "quiz", q: "Siyahıdan təkrarları ən sürətli silmək:", options: ["set(siyahi)", "siyahi.unique()", "dövr + remove"], answer: 0, why: "set yalnız unikal elementləri saxlayır." },
        ],
      },
    ],
    exercise: {
      task: "metn = \"kod öyrən kod yaz kod paylaş öyrən\". 1) Hər sözün neçə dəfə təkrarlandığını dict-də say (Counter-siz, get ilə). 2) Ən çox təkrarlanan sözü tap. 3) İki dərs siyahısının ortaq və fərqli dərslərini set ilə tap.",
      starter: `metn = "kod öyrən kod yaz kod paylaş öyrən"\n\n# 1)\n# 2)\n\nmenim = ["HTML", "CSS", "JS"]\nseninki = ["JS", "Python", "CSS"]\n# 3)\n`,
      expect: "say[s] = say.get(s, 0) + 1 → {'kod': 3, 'öyrən': 2, ...}; max(say, key=say.get) → 'kod'; set(menim) & set(seninki) → {CSS, JS}, fərq - ilə.",
    },
  },
  {
    slug: "funksiyalar",
    title: "Funksiyalar",
    intro: "Funksiya adlı, təkrar istifadə olunan kod blokudur. Python-da def ilə yaradılır; default, adlı, *args, **kwargs arqumentləri çox çevikdir.",
    sections: [
      {
        level: "baslangic",
        title: "def və return",
        blocks: [
          { t: "analogy", text: "Funksiya — mətbəx robotudur: içinə inqrediyent (arqument) atırsan, düyməni basırsan (çağırırsan), nəticə (return) çıxır. Bir dəfə alırsan, min dəfə işlədirsən." },
          { t: "code", lang: "python", code: `def salamla(ad):
    return f"Salam, {ad}!"

print(salamla("Aysel"))

def sahe(en, uzunluq=1):        # default dəyər
    """Düzbucaqlının sahəsini qaytarır."""   # docstring
    return en * uzunluq

print(sahe(5, 3))               # 15
print(sahe(5))                  # 5
print(sahe(uzunluq=4, en=2))    # adlı arqumentlər — sıra fərq etmir` },
          { t: "terms", items: [
            ["def", "define — funksiya təyin et."],
            ["parametr", "funksiyanın gözlədiyi ad (en)."],
            ["arqument", "çağırışda verilən dəyər (5)."],
            ["return", "nəticəni qaytarır və funksiyadan çıxır; yoxdursa None qaytarılır."],
            ["docstring", "funksiyanın izahı — help() göstərir."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "*args, **kwargs, lambda, scope",
        blocks: [
          { t: "code", lang: "python", code: `def cem(*ededler):              # istənilən sayda mövqe arqumenti → tuple
    return sum(ededler)
print(cem(1, 2, 3, 4))           # 10

def profil(ad, **melumat):        # adlı arqumentlər → dict
    print(ad, melumat)
profil("Aysel", yas=25, seher="Bakı")

kvadrat = lambda x: x * x         # kiçik anonim funksiya
telebeler = [("Aysel", 92), ("Murad", 65)]
print(sorted(telebeler, key=lambda t: t[1], reverse=True))

say = 0
def artir():
    global say                    # qlobal dəyişəni dəyişmək (az işlət!)
    say += 1` },
          { t: "mistake", lang: "python", wrong: `def elave_et(x, siyahi=[]):\n    siyahi.append(x)\n    return siyahi\nprint(elave_et(1), elave_et(2))  # [1, 2] [1, 2] !`, right: `def elave_et(x, siyahi=None):\n    if siyahi is None:\n        siyahi = []\n    siyahi.append(x)\n    return siyahi`, why: "Default dəyər funksiya TƏYİN olunanda bir dəfə yaranır — mutable default bütün çağırışlar arasında paylaşılır. Python-un ən məşhur tələsi." },
          { t: "mistake", lang: "python", wrong: `def topla(a, b):\n    print(a + b)\nnetice = topla(2, 3) * 2  # TypeError`, right: `def topla(a, b):\n    return a + b`, why: "print göstərir, return qaytarır. print-li funksiya None qaytarır." },
        ],
      },
      {
        level: "senior",
        title: "Birinci dərəcəli funksiyalar, closure, LEGB",
        blocks: [
          { t: "code", lang: "python", code: `def vurucu(n):
    def vur(x):
        return x * n           # n — closure ilə yadda qalır
    return vur

ikiqat = vurucu(2)
print(ikiqat(21))              # 42

def emal(*, sert: bool = False, limit: int = 10) -> None:  # * — yalnız adlı arqumentlər
    ...

def bol(a, b, /):              # / — yalnız mövqe arqumentləri
    return a / b` },
          { t: "list", items: [
            "Ad axtarışı LEGB sırası ilə: Local → Enclosing → Global → Built-in. Daxili funksiyada xarici dəyişəni dəyişmək üçün nonlocal.",
            "Funksiyalar obyektdir: dəyişənə mənimsədilir, arqument kimi ötürülür, qaytarılır — dekoratorların əsası.",
            "Saf (pure) funksiya — eyni girişə eyni nəticə, yan təsir yoxdur: test etmək asandır.",
            "Rekursiya limiti ~1000 (sys.getrecursionlimit) — dərin rekursiyanı dövrə çevir.",
            "Təhlükəsizlik: eval()/exec() ilə istifadəçi mətnini icra etmə — tam kod icrası (RCE). Riyazi ifadə üçün ast.literal_eval və ya xüsusi parser.",
            "Təhlükəsizlik: funksiya girişlərini sərhəddə yoxla (validasiya) və xəta mesajında daxili məlumatı (yol, SQL, stack trace) istifadəçiyə qaytarma.",
          ]},
          { t: "qa", items: [
            ["*args və **kwargs nədir?", "*args əlavə mövqe arqumentlərini tuple-a, **kwargs adlı arqumentləri dict-ə yığır."],
            ["Closure nədir?", "Daxili funksiyanın xarici funksiyanın dəyişənlərini, o bitdikdən sonra da xatırlaması."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "return olmayan funksiya nə qaytarır?", options: ["0", "None", "xəta"], answer: 1, why: "Default qaytarılan dəyər None-dır." },
          { t: "quiz", q: "def f(x, s=[]) niyə təhlükəlidir?", options: ["Sintaksis səhvidir", "Siyahı çağırışlar arasında paylaşılır", "Yavaşdır"], answer: 1, why: "Default bir dəfə yaranır." },
        ],
      },
    ],
    exercise: {
      task: "1) statistika(*ededler) funksiyası: cəm, orta, min, max-ı dict kimi qaytarsın; boş çağırışda None. 2) telebeler siyahısını lambda ilə bala görə azalan sırala. 3) endirim(qiymet, faiz=10) — default parametrli, faiz 0–100 xaricində ValueError.",
      starter: `def statistika(*ededler):\n    pass\n\nprint(statistika(4, 8, 15, 16, 23, 42))\nprint(statistika())\n\ntelebeler = [("Aysel", 92), ("Murad", 65), ("Leyla", 78)]\n# 2)\n\n# 3)\n`,
      expect: "statistika return {'cem': 108, 'orta': 18.0, 'min': 4, 'max': 42}, boşda None; sorted(..., key=lambda t: t[1], reverse=True); endirim-də if not 0 <= faiz <= 100: raise ValueError; mutable default yoxdur.",
    },
  },
  {
    slug: "comprehension",
    title: "Comprehension-lar",
    intro: "Comprehension — bir sətirdə yeni list, dict və ya set qurmağın Python yoludur. Dövr + şərt + append üçlüyünü tək, oxunaqlı ifadəyə çevirir.",
    sections: [
      {
        level: "baslangic",
        title: "List comprehension",
        blocks: [
          { t: "analogy", text: "Bazarda satıcıya deyirsən: «Bu yeşikdəki almalardan qırmızı olanları seç və hər birini yu». Bir cümlədə üç iş: haradan (yeşik), hansını (qırmızı), nə et (yu). Comprehension da belə oxunur: [nə_et for element in haradan if hansı]." },
          { t: "code", lang: "python", code: `ededler = [1, 2, 3, 4, 5, 6]

# Adi yol
kvadratlar = []
for x in ededler:
    kvadratlar.append(x * x)

# Comprehension — eyni nəticə
kvadratlar = [x * x for x in ededler]
print(kvadratlar)                 # [1, 4, 9, 16, 25, 36]

cutler = [x for x in ededler if x % 2 == 0]
print(cutler)                     # [2, 4, 6]

adlar = ["aysel", "murad", "leyla"]
print([ad.title() for ad in adlar])   # ['Aysel', 'Murad', 'Leyla']` },
          { t: "terms", items: [
            ["comprehension", "mövcud ardıcıllıqdan yeni kolleksiya quran qısa ifadə."],
            ["ifadə (expression)", "hər element üçün hesablanan hissə: x * x."],
            ["filtr", "sondakı if — yalnız şərti ödəyən elementlər götürülür."],
          ]},
          { t: "tip", text: "Oxuma sırası: əvvəl for hissəsini oxu (haradan), sonra if (hansını), ən sonda başdakı ifadəni (nə et)." },
        ],
      },
      {
        level: "orta",
        title: "Dict, set, şərti ifadə, iç-içə",
        blocks: [
          { t: "code", lang: "python", code: `ballar = {"Aysel": 92, "Murad": 65, "Leyla": 78}

# dict comprehension
kecenler = {ad: bal for ad, bal in ballar.items() if bal >= 70}
print(kecenler)                   # {'Aysel': 92, 'Leyla': 78}

# set comprehension — təkrarsız
seherler = ["Bakı", "gəncə", "BAKI", "Gəncə"]
print({s.lower() for s in seherler})   # {'bakı', 'gəncə'}

# Şərti ifadə (if/else) — ƏVVƏLDƏ yazılır, filtr deyil
qiymetler = ["keçdi" if b >= 70 else "kəsildi" for b in ballar.values()]
print(qiymetler)                  # ['keçdi', 'kəsildi', 'keçdi']

# İç-içə: matrisi düzləşdirmək
matris = [[1, 2], [3, 4], [5, 6]]
print([x for setir in matris for x in setir])   # [1, 2, 3, 4, 5, 6]

# zip və enumerate ilə
adlar, yaslar = ["Aysel", "Murad"], [25, 30]
print({ad: yas for ad, yas in zip(adlar, yaslar)})` },
          { t: "mistake", lang: "python", wrong: `netice = [x if x > 0 for x in ededler]      # SyntaxError`, right: `netice = [x for x in ededler if x > 0]           # filtr — sonda
netice = [x if x > 0 else 0 for x in ededler]    # əvəzləmə — əvvəldə, else ilə`, why: "Filtr (yalnız if) for-dan SONRA yazılır. Əvvəldəki if mütləq else ilə olur və elementi atmır, dəyərini dəyişir." },
          { t: "mistake", lang: "python", wrong: `[print(x) for x in ededler]   # yan təsir üçün comprehension`, right: `for x in ededler:
    print(x)`, why: "Comprehension nəticə yaratmaq üçündür. Yan təsir (print, fayla yazmaq) üçün adi for işlət — lazımsız [None, None, …] siyahısı yaranmır və niyyət aydındır." },
          { t: "mistake", lang: "python", wrong: `netice = [f(x, y) for x in a if x > 0 for y in b if y != x if g(y)]`, right: `netice = []
for x in a:
    if x <= 0:
        continue
    for y in b:
        if y != x and g(y):
            netice.append(f(x, y))`, why: "İki for və bir neçə şərtdən sonra comprehension oxunmaz olur. Qayda: bir sətrə sığmırsa və ya izah tələb edirsə — adi dövr yaz." },
        ],
      },
      {
        level: "senior",
        title: "Generator ifadələri, yaddaş və təhlükəsizlik",
        blocks: [
          { t: "code", lang: "python", code: `import sys

siyahi = [x * x for x in range(1_000_000)]      # hamısı yaddaşda
generator = (x * x for x in range(1_000_000))   # tənbəl: lazım olduqca

print(sys.getsizeof(siyahi))      # ~8 MB
print(sys.getsizeof(generator))   # ~200 bayt

print(sum(x * x for x in range(1_000_000)))   # mötərizə təkrar yazılmır
print(any(x > 999_990 for x in range(1_000_000)))  # ilk True-da dayanır

# Walrus (:=) — bahalı hesablamanı bir dəfə et
def emal(x):
    return x * 3
print([y for x in range(10) if (y := emal(x)) > 15])` },
          { t: "list", items: [
            "List comprehension adi for + append-dən sürətlidir: dövr C səviyyəsində işləyir, append metodu hər dəfə axtarılmır.",
            "Generator ifadəsi () tənbəldir və yalnız BİR dəfə gəzilir. İkinci dəfə gəzsən — boşdur. Nəticə bir neçə dəfə lazımdırsa, list qur.",
            "sum, any, all, min, max, \"\".join kimi funksiyalara list yox, generator ver — aralıq siyahı yaranmır (join istisnadır: list bir qədər sürətlidir).",
            "Comprehension-un öz scope-u var: dövr dəyişəni bayıra sızmır (Python 3). Walrus ilə mənimsədilən dəyişən isə sızır.",
            "dict comprehension-da təkrar açar səssizcə əvvəlkini əzir — məlumat itkisini yoxla.",
            "Təhlükəsizlik — yaddaş tükətmə (DoS): istifadəçinin göndərdiyi ölçüyə görə list qurma: [0] * n və ya [f(x) for x in range(n)], n = 10**10 olsa, proses çökür. Ölçünü əvvəlcədən məhdudlaşdır və ya generator + itertools.islice işlət.",
            "Təhlükəsizlik: filtr comprehension-u sanitizasiya deyil. [c for c in metn if c != \"<\"] kimi «qara siyahı» təmizləməsi yan keçilir. HTML üçün html.escape, SQL üçün parametrli sorğu, fayl adı üçün ağ siyahı işlət.",
            "Təhlükəsizlik: icazə filtrini (məs. yalnız istifadəçinin öz sənədləri) Python-da comprehension ilə yox, bazada WHERE ilə et — yoxsa bütün məlumat əvvəlcə yaddaşa yüklənir və filtr unudulanda sızır.",
          ]},
          { t: "qa", items: [
            ["List comprehension ilə generator ifadəsi fərqi?", "[...] bütün nəticəni dərhal yaddaşda qurur; (...) elementləri tələb olunduqca verir, az yaddaş işlədir, amma bir dəfə gəzilir."],
            ["Comprehension nə vaxt işlədilməməlidir?", "Yan təsir üçün, çox iç-içə/şərtli olanda və oxunaqlılıq itəndə."],
            ["map/filter yoxsa comprehension?", "Comprehension daha «pythonic» və oxunaqlıdır; hazır funksiya varsa (map(str, xs)) map də yaxşıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "[x * 2 for x in [1, 2, 3] if x > 1] nəticəsi?", options: ["[2, 4, 6]", "[4, 6]", "[2, 3]"], answer: 1, why: "Əvvəl filtr (2 və 3), sonra hər biri 2-yə vurulur." },
          { t: "quiz", q: "Milyonlarla elementin cəmini tapmaq üçün ən qənaətcil yol?", options: ["sum([x for x in data])", "sum(x for x in data)", "Hər ikisi eynidir"], answer: 1, why: "Generator ifadəsi aralıq siyahı yaratmır." },
        ],
      },
    ],
    exercise: {
      task: "Comprehension ilə həll et: 1) 1–30 arasında 3-ə bölünən ədədlərin kvadratları (list); 2) sozler siyahısından uzunluğu 4-dən çox olan sözlərin {söz: uzunluq} lüğəti; 3) mətndəki unikal saitlər (set, kiçik hərflə); 4) ballar lüğətindən 70+ olanların adlarını böyük hərflə list kimi; 5) 1-dən 1 000 000-a qədər cüt ədədlərin cəmini generator ifadəsi ilə çap et.",
      starter: `sozler = ["kod", "python", "dövr", "funksiya", "list"]\nmetn = "Proqramlaşdırma Öyrənirəm"\nballar = {"Aysel": 92, "Murad": 65, "Leyla": 78}\n\n# 1)\n\n# 2)\n\n# 3)\n\n# 4)\n\n# 5)\n`,
      expect: "1) [x*x for x in range(1, 31) if x % 3 == 0]; 2) dict comprehension len(s) > 4 filtri ilə; 3) set comprehension, .lower() və sait yoxlaması; 4) [ad.upper() for ad, b in ballar.items() if b >= 70]; 5) sum(... for ...) — kvadrat mötərizəsiz generator; for + append işlədilməyib.",
    },
  },
  {
    slug: "fayllar",
    title: "Fayllarla işləmək",
    intro: "Proqram bağlananda dəyişənlər itir. Məlumatı saxlamaq üçün fayla yazırsan. Python-da bu open() funksiyası və with bloku ilə edilir.",
    sections: [
      {
        level: "baslangic",
        title: "Oxumaq və yazmaq",
        blocks: [
          { t: "analogy", text: "Fayl — dəftərdir. İşləmək üçün onu açırsan (open), yazır və ya oxuyursan, sonda bağlayırsan. Açıq qalan dəftər yağışda islanır: bağlanmayan fayl məlumat itirə bilər. with bloku — dəftəri özü bağlayan köməkçidir." },
          { t: "code", lang: "python", code: `# Yazmaq ("w" — yenidən yaz, köhnəni silir)
with open("qeydler.txt", "w", encoding="utf-8") as f:
    f.write("Salam, dünya!\\n")
    f.write("İkinci sətir\\n")

# Əlavə etmək ("a" — sona yaz)
with open("qeydler.txt", "a", encoding="utf-8") as f:
    f.write("Üçüncü sətir\\n")

# Oxumaq ("r" — default)
with open("qeydler.txt", encoding="utf-8") as f:
    metn = f.read()
print(metn)

# Sətir-sətir (böyük fayllar üçün)
with open("qeydler.txt", encoding="utf-8") as f:
    for setir in f:
        print(setir.strip())` },
          { t: "terms", items: [
            ["open()", "faylı açır və fayl obyekti qaytarır."],
            ["rejim (mode)", "\"r\" oxu, \"w\" yaz (üstündən), \"a\" əlavə et, \"x\" yalnız yoxdursa yarat, \"b\" ikili."],
            ["with", "blok bitəndə (xəta olsa belə) faylı avtomatik bağlayır."],
            ["encoding", "mətnin baytlara çevrilmə qaydası; həmişə utf-8 yaz."],
          ]},
          { t: "tip", text: "encoding=\"utf-8\" yazmağı vərdiş et. Yazmasan, Windows-da köhnə kodlaşdırma işlənə bilər və ə, ş, ğ hərfləri xarab olar." },
        ],
      },
      {
        level: "orta",
        title: "pathlib, JSON və CSV",
        blocks: [
          { t: "code", lang: "python", code: `from pathlib import Path
import json, csv

qovluq = Path("melumat")
qovluq.mkdir(exist_ok=True)

# pathlib — yolları / ilə birləşdir (hər əməliyyat sistemində işləyir)
fayl = qovluq / "telebeler.json"

telebeler = [{"ad": "Aysel", "bal": 92}, {"ad": "Murad", "bal": 65}]

# JSON yazmaq və oxumaq
fayl.write_text(json.dumps(telebeler, ensure_ascii=False, indent=2), encoding="utf-8")
yuklenen = json.loads(fayl.read_text(encoding="utf-8"))
print(yuklenen[0]["ad"])          # Aysel

# CSV
with open(qovluq / "ballar.csv", "w", newline="", encoding="utf-8") as f:
    yazici = csv.DictWriter(f, fieldnames=["ad", "bal"])
    yazici.writeheader()
    yazici.writerows(telebeler)

with open(qovluq / "ballar.csv", encoding="utf-8") as f:
    for setir in csv.DictReader(f):
        print(setir["ad"], int(setir["bal"]))

print(fayl.exists(), fayl.suffix, fayl.stat().st_size)
print([p.name for p in qovluq.iterdir()])` },
          { t: "mistake", lang: "python", wrong: `f = open("qeydler.txt")
metn = f.read()
# f.close() unuduldu; xəta olsa, heç vaxt bağlanmır`, right: `with open("qeydler.txt", encoding="utf-8") as f:
    metn = f.read()`, why: "Bağlanmayan fayl resurs sızmasıdır; yazma rejimində məlumat buferdə qalıb itə bilər. with həmişə bağlayır." },
          { t: "mistake", lang: "python", wrong: `with open("hesabat.txt", "w") as f:   # köhnə məzmun dərhal silindi
    f.write(yeni_setir)`, right: `with open("hesabat.txt", "a", encoding="utf-8") as f:
    f.write(yeni_setir)`, why: "\"w\" faylı açan kimi boşaldır. Sona əlavə etmək üçün \"a\", təsadüfən üstündən yazmamaq üçün \"x\" işlət." },
          { t: "mistake", lang: "python", wrong: `yol = "melumat" + "\\\\" + "fayl.txt"   # yalnız Windows`, right: `from pathlib import Path
yol = Path("melumat") / "fayl.txt"`, why: "Yol ayırıcısı əməliyyat sistemindən asılıdır. pathlib düzgün ayırıcını özü seçir." },
        ],
      },
      {
        level: "senior",
        title: "Böyük fayllar, atomar yazma və fayl təhlükəsizliyi",
        blocks: [
          { t: "list", items: [
            "f.read() bütün faylı yaddaşa yükləyir. Böyük faylı sətir-sətir (for setir in f) və ya hissə-hissə (f.read(64 * 1024)) oxu.",
            "Atomar yazma: əvvəl müvəqqəti fayla yaz, sonra os.replace(tmp, hedef). Yazma yarıda kəsilsə, köhnə fayl bütöv qalır.",
            "İkili fayllar (şəkil, PDF) \"rb\"/\"wb\" ilə açılır — encoding verilmir, bytes ilə işləyirsən.",
            "Müvəqqəti fayl üçün tempfile modulu: təhlükəsiz ad və icazələrlə yaradır, özü silir.",
            "Təhlükəsizlik — path traversal: istifadəçinin verdiyi adı yola birbaşa qoşma. \"../../etc/passwd\" və ya mütləq yol baza qovluğundan çıxır. resolve() et və nəticənin baza qovluğunun içində olduğunu yoxla.",
            "Təhlükəsizlik — pickle: pickle.load etibarsız mənbədən gələn faylda İXTİYARİ KOD icra edir. Məlumat mübadiləsi üçün JSON işlət. Eyni təhlükə: yaml.load (yaml.safe_load işlət).",
            "Təhlükəsizlik — yükləmələr: ölçünü məhdudlaşdır, uzantını VƏ məzmunu ağ siyahı ilə yoxla, faylı öz yaratdığın təsadüfi adla, veb kökündən kənarda saxla. Zip faylı açanda «zip bomb» və içindəki ../ yollarına diqqət et.",
            "Təhlükəsizlik — CSV injection: xanası =, +, -, @ ilə başlayan dəyər Excel-də düstur kimi icra olunur. İxracda belə dəyərlərin əvvəlinə ' qoy.",
            "Təhlükəsizlik: sirləri (parol, açar) koda və ya git-ə düşən fayla yazma; sirr faylının icazəsini daralt (chmod 600). Jurnal fayllarına şəxsi məlumat yazma.",
          ]},
          { t: "code", lang: "python", caption: "Təhlükəsiz yol yoxlaması", code: `from pathlib import Path

BAZA = Path("yuklemeler").resolve()

def tehlukesiz_yol(ad: str) -> Path:
    hedef = (BAZA / ad).resolve()
    if not hedef.is_relative_to(BAZA):
        raise PermissionError("İcazəsiz yol")
    return hedef

print(tehlukesiz_yol("hesabat.txt").name)       # hesabat.txt
try:
    tehlukesiz_yol("../../gizli.txt")
except PermissionError as e:
    print("Rədd edildi:", e)` },
          { t: "qa", items: [
            ["with nə üçündür?", "Kontekst meneceridir: blokdan çıxanda (xəta olsa belə) resursu bağlayır — __enter__/__exit__ metodları ilə."],
            ["Niyə pickle təhlükəlidir?", "Yükləmə zamanı obyektin yenidən qurulması ixtiyari funksiya çağırışına imkan verir — etibarsız fayl kod icra edir."],
            ["Path traversal nədir?", "../ və ya mütləq yol vasitəsilə nəzərdə tutulan qovluqdan kənar fayla çıxış. Qarşısı: resolve + baza qovluğu yoxlaması."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Faylın sonuna əlavə etmək üçün hansı rejim?", options: ["\"w\"", "\"a\"", "\"r\""], answer: 1, why: "\"a\" (append) mövcud məzmunu saxlayır." },
          { t: "quiz", q: "with blokunun əsas faydası?", options: ["Sürətli oxuyur", "Faylı avtomatik bağlayır", "Faylı şifrələyir"], answer: 1, why: "Blok bitəndə fayl, xəta olsa belə, bağlanır." },
        ],
      },
    ],
    exercise: {
      task: "Qeyd dəftəri yaz: 1) qeyd_elave_et(metn) — qeydi «qeydler.json» faylına əlavə etsin (fayl yoxdursa boş siyahı ilə başlasın); hər qeyd {\"id\": n, \"metn\": ...} olsun. 2) qeydleri_goster() — bütün qeydləri «1. mətn» formatında çap etsin. 3) Üç qeyd əlavə et və göstər. pathlib, json və utf-8 işlət; boş və ya 200 simvoldan uzun mətn ValueError versin.",
      starter: `from pathlib import Path\nimport json\n\nFAYL = Path("qeydler.json")\n\ndef qeyd_elave_et(metn):\n    pass\n\ndef qeydleri_goster():\n    pass\n\nqeyd_elave_et("Python öyrən")\n`,
      expect: "FAYL.exists() yoxlanır və ya xəta tutulur; json.loads/json.dumps (ensure_ascii=False), encoding=\"utf-8\"; id artan; metn.strip() boşdursa və ya uzunluq > 200 — raise ValueError; qeydleri_goster siyahını çap edir; with və ya Path.read_text/write_text; pickle işlədilməyib.",
    },
  },
  {
    slug: "xetalar",
    title: "İstisnalar",
    intro: "İstisna (exception) — proqram icrası zamanı baş verən xətadır: sıfıra bölmə, olmayan fayl, yanlış giriş. Tutulmasa, proqram dayanır. try/except ilə xətanı tutub düzgün reaksiya verirsən.",
    sections: [
      {
        level: "baslangic",
        title: "try / except",
        blocks: [
          { t: "analogy", text: "Sirk akrobatı ipin üstündə gəzir, altında tor var. Yıxılsa (xəta), tor onu tutur (except) və tamaşa davam edir. Torsuz yıxılma — tamaşanın sonu (proqram çökür). Amma tor hər şeyi gizlətməməlidir: akrobat niyə yıxıldığını bilməlidir." },
          { t: "code", lang: "python", code: `def bol(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Sıfıra bölmək olmaz!")
        return None

print(bol(10, 2))    # 5.0
print(bol(10, 0))    # Sıfıra bölmək olmaz! → None

try:
    yas = int("iyirmi")
except ValueError as e:
    print("Xəta:", e)   # invalid literal for int() with base 10: 'iyirmi'` },
          { t: "terms", items: [
            ["istisna (exception)", "icra zamanı yaranan xəta obyekti."],
            ["try", "xəta ola biləcək kod bloku."],
            ["except", "müəyyən növ xətanı tutan blok."],
            ["traceback", "xətanın harada və hansı çağırış zəncirində baş verdiyini göstərən çıxış."],
          ]},
          { t: "list", items: [
            "ValueError — tip düzdür, dəyər yanlışdır: int(\"abc\").",
            "TypeError — tip yanlışdır: \"5\" + 5.",
            "KeyError / IndexError — lüğətdə açar / siyahıda indeks yoxdur.",
            "FileNotFoundError — fayl tapılmadı.",
            "ZeroDivisionError — sıfıra bölmə.",
          ]},
        ],
      },
      {
        level: "orta",
        title: "else, finally, raise və öz istisnan",
        blocks: [
          { t: "code", lang: "python", code: `def yas_oxu(metn):
    try:
        yas = int(metn)
    except ValueError:
        print("Rəqəm daxil edin")
        return None
    else:                       # xəta OLMADISA
        if yas < 0:
            raise ValueError("Yaş mənfi ola bilməz")   # özün xəta at
        return yas
    finally:                    # HƏMİŞƏ işləyir
        print("yoxlama bitdi")

print(yas_oxu("25"))
print(yas_oxu("abc"))


class BalansCatmir(Exception):
    """Hesabda kifayət qədər vəsait yoxdur."""
    def __init__(self, balans, mebleg):
        super().__init__(f"Balans {balans}, tələb olunan {mebleg}")
        self.catmayan = mebleg - balans

def cixar(balans, mebleg):
    if mebleg > balans:
        raise BalansCatmir(balans, mebleg)
    return balans - mebleg

try:
    cixar(50, 80)
except BalansCatmir as e:
    print(e, "| çatmır:", e.catmayan)` },
          { t: "mistake", lang: "python", wrong: `try:
    emal_et()
except:
    pass          # hər şeyi ud, heç nə demə`, right: `try:
    emal_et()
except (ValueError, KeyError) as e:
    print("Emal alınmadı:", e)`, why: "Çılpaq except hər şeyi tutur — hətta Ctrl+C (KeyboardInterrupt) və yazı səhvlərini (NameError). pass ilə birlikdə xəta izsiz itir və bug günlərlə axtarılır." },
          { t: "mistake", lang: "python", wrong: `if os.path.exists(yol):       # yoxla
    f = open(yol)             # ...bu arada fayl silinə bilər`, right: `try:
    f = open(yol, encoding="utf-8")
except FileNotFoundError:
    print("Fayl yoxdur")`, why: "Python yanaşması EAFP-dir: «icazə soruşmaqdansa, üzr istəmək asandır». Yoxlama ilə əməliyyat arasında vəziyyət dəyişə bilər (yarış vəziyyəti)." },
          { t: "mistake", lang: "python", wrong: `except ValueError as e:
    raise RuntimeError("Konfiq səhvdir")   # əsl səbəb itdi`, right: `except ValueError as e:
    raise RuntimeError("Konfiq səhvdir") from e`, why: "raise ... from e əsl səbəbi (__cause__) saxlayır — traceback-də hər iki xəta görünür." },
        ],
      },
      {
        level: "senior",
        title: "İyerarxiya, kontekst, jurnal və məlumat sızması",
        blocks: [
          { t: "code", lang: "text", caption: "İstisna iyerarxiyası (qısa)", code: `BaseException
 ├── KeyboardInterrupt, SystemExit      ← bunları tutma
 └── Exception                          ← tətbiq xətaları
      ├── ValueError, TypeError
      ├── LookupError → KeyError, IndexError
      ├── ArithmeticError → ZeroDivisionError
      └── OSError → FileNotFoundError, PermissionError, TimeoutError` },
          { t: "list", items: [
            "except Exception ən geniş qanuni tutmadır və yalnız sərhəddə (sorğu emalçısı, işçi dövrü) yer alır: jurnala yaz, ümumi cavab ver. Daxili kodda konkret tip tut.",
            "Xətanı həll edə bilmirsənsə, tutma — yuxarı qalxsın. Tutub jurnala yazıb yenidən atmaq üçün arqumentsiz raise işlət (traceback qorunur).",
            "Öz iyerarxiyan: class TetbiqXetasi(Exception) → ondan törəyən konkret xətalar. Çağıran tərəf lazım olan səviyyədə tutur.",
            "Resurs təmizliyi üçün finally əvəzinə kontekst meneceri (with) və ya contextlib.ExitStack işlət.",
            "Python 3.11+: ExceptionGroup və except* — paralel tapşırıqlardan gələn bir neçə xətanı birlikdə emal edir; e.add_note() əlavə kontekst yazır.",
            "assert yoxlama deyil: python -O ilə işə salınanda bütün assert-lər silinir. Giriş validasiyası və icazə yoxlaması üçün if + raise.",
            "Təhlükəsizlik — məlumat sızması: traceback və str(e) daxili fayl yollarını, SQL mətnini, konfiqi, bəzən sirləri göstərir. İstifadəçiyə ümumi mesaj + xəta ID-si ver, təfərrüatı yalnız server jurnalına yaz. Production-da debug rejimini söndür.",
            "Təhlükəsizlik — fail-open: xətada «icazə ver» məntiqi fəlakətdir. except: return True (icazə yoxlamasında) hər xətanı girişə çevirir. Xətada həmişə rədd et (fail-closed).",
            "Təhlükəsizlik: jurnala parol, token, kart nömrəsi yazma — xəta mesajına düşən sorğu gövdəsini maskala. Giriş xətalarında «istifadəçi yoxdur» / «parol səhvdir» ayrımını bildirmə.",
            "Təhlükəsizlik: geniş except hücum əlamətlərini (gözlənilməz tip, injection cəhdi) udur — monitorinq heç nə görmür. Gözlənilməz xətaları say və xəbərdarlıq qur.",
          ]},
          { t: "code", lang: "python", caption: "Sərhəddə: təfərrüat jurnala, istifadəçiyə ümumi mesaj", code: `import logging, uuid

logging.basicConfig(level=logging.ERROR)
log = logging.getLogger("tetbiq")

def sorgu_emal_et(melumat):
    try:
        return {"netice": 100 / melumat["bolen"]}
    except (KeyError, ZeroDivisionError):
        return {"xeta": "Yanlış giriş"}            # gözlənilən — 400
    except Exception:
        xeta_id = uuid.uuid4().hex[:8]
        log.exception("Gözlənilməz xəta %s", xeta_id)   # tam traceback jurnalda
        return {"xeta": "Daxili xəta", "id": xeta_id}  # 500 — təfərrüatsız

print(sorgu_emal_et({"bolen": 4}))
print(sorgu_emal_et({"bolen": 0}))
print(sorgu_emal_et(None))` },
          { t: "qa", items: [
            ["else və finally nə vaxt işləyir?", "else — try blokunda xəta olmadıqda; finally — həmişə (return və ya xəta olsa belə)."],
            ["Niyə çılpaq except pisdir?", "KeyboardInterrupt/SystemExit daxil hər şeyi tutur, bug-ları gizlədir. Ən azı except Exception, daha yaxşısı konkret tip."],
            ["EAFP və LBYL nədir?", "EAFP — əvvəl et, xətanı tut (Python üslubu); LBYL — əvvəl yoxla, sonra et. EAFP yarış vəziyyətindən qoruyur."],
            ["Fail-closed nə deməkdir?", "Xəta və qeyri-müəyyənlik halında sistemin girişi rədd etməsi — təhlükəsiz default."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "int(\"abc\") hansı istisnanı verir?", options: ["TypeError", "ValueError", "KeyError"], answer: 1, why: "Tip (str) qəbul olunur, amma dəyəri ədədə çevrilmir." },
          { t: "quiz", q: "finally bloku nə vaxt işləyir?", options: ["Yalnız xəta olanda", "Yalnız xəta olmayanda", "Həmişə"], answer: 2, why: "finally hər halda icra olunur — təmizlik üçün." },
        ],
      },
    ],
    exercise: {
      task: "Bank hesabı funksiyaları yaz. 1) Öz istisnaların: BankXetasi(Exception) və ondan törəyən BalansCatmir, YanlisMebleg. 2) cixar(balans, mebleg): məbləğ ədəd deyilsə və ya ≤ 0-dırsa YanlisMebleg, balansdan çoxdursa BalansCatmir atsın, əks halda yeni balansı qaytarsın. 3) Üç çağırışı (uğurlu, mənfi məbləğ, çatmayan balans) try/except ilə sına — hər xəta üçün fərqli mesaj, sonda finally-də «əməliyyat bitdi» çap et.",
      starter: `class BankXetasi(Exception):\n    pass\n\n# digər siniflər\n\ndef cixar(balans, mebleg):\n    pass\n\nfor mebleg in (30, -5, 500):\n    pass\n`,
      expect: "İki sinif BankXetasi-dan törəyir; isinstance(mebleg, (int, float)) və mebleg <= 0 yoxlaması raise YanlisMebleg; mebleg > balans raise BalansCatmir; try/except-də konkret siniflər ayrı-ayrı tutulur (çılpaq except yox); finally var; assert validasiya üçün işlədilməyib.",
    },
  },
  {
    slug: "modullar",
    title: "Modullar və paketlər",
    intro: "Modul — içində Python kodu olan .py faylıdır. Kodu fayllara bölür, import ilə bir-birinə qoşursan. Paket — modulların qovluğudur. pip isə başqalarının yazdığı paketləri quraşdırır.",
    sections: [
      {
        level: "baslangic",
        title: "import",
        blocks: [
          { t: "analogy", text: "Modul — alət qutusudur. Bütün alətləri cibində gəzdirmirsən: lazım olanda qutunu gətirirsən (import math) və içindən aləti götürürsən (math.sqrt). Python-la birlikdə gələn qutular toplusu «standart kitabxana» adlanır — yüzlərlə hazır alət." },
          { t: "code", lang: "python", code: `import math
print(math.sqrt(16))            # 4.0
print(math.pi)

from random import randint, choice
print(randint(1, 6))            # zər
print(choice(["daş", "kağız", "qayçı"]))

import datetime as dt           # ləqəb
print(dt.date.today())

from collections import Counter
print(Counter("proqramlaşdırma").most_common(2))` },
          { t: "terms", items: [
            ["modul", "bir .py faylı; funksiyalar, siniflər, dəyişənlər saxlayır."],
            ["import", "modulu yükləyib adını cari fayla gətirir."],
            ["standart kitabxana", "Python ilə birlikdə gələn modullar: math, random, datetime, json, pathlib…"],
            ["pip", "kənar paketləri quraşdıran alət: pip install requests."],
          ]},
          { t: "tip", text: "Öz faylına standart modulun adını vermə (random.py, json.py, math.py). Python əvvəl sənin faylını tapır və import random sənin faylını yükləyir — anlaşılmaz xətalar alırsan." },
        ],
      },
      {
        level: "orta",
        title: "Öz modulun, __name__, paketlər və venv",
        blocks: [
          { t: "code", lang: "python", caption: "hesab.py — öz modulun", code: `"""Sadə hesablama funksiyaları."""

def topla(a, b):
    return a + b

def orta(ededler):
    return sum(ededler) / len(ededler)

if __name__ == "__main__":
    # yalnız birbaşa işə salınanda: python hesab.py
    # import olunanda bu blok İŞLƏMİR
    print(topla(2, 3))` },
          { t: "code", lang: "text", caption: "Paket quruluşu", code: `layihe/
  main.py                 ← from magaza.sebet import cem
  magaza/
    __init__.py           ← qovluğu paket edir (boş ola bilər)
    sebet.py
    odenis.py
  requirements.txt        ← asılılıqlar: fastapi==0.115.0
  .venv/                  ← virtual mühit (git-ə düşmür)` },
          { t: "code", lang: "bash", caption: "Virtual mühit — hər layihəyə öz paketləri", code: `python -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
pip install requests
pip freeze > requirements.txt    # versiyaları qeyd et
pip install -r requirements.txt  # başqa kompüterdə eyni mühit` },
          { t: "mistake", lang: "python", wrong: `from math import *
from statistics import *
# hansı ad haradan gəlir? eyni adlar bir-birini əzir`, right: `import math
from statistics import mean, median`, why: "Ulduzlu import ad məkanını zibilləyir, adlar səssizcə toqquşur və kodun oxunuşu çətinləşir." },
          { t: "mistake", lang: "python", wrong: `# hesab.py
def topla(a, b):
    return a + b

print(topla(2, 3))   # import edən hər kəsdə çap olunur`, right: `if __name__ == "__main__":
    print(topla(2, 3))`, why: "import modulun bütün üst səviyyə kodunu icra edir. Sınaq və işəsalma kodunu __main__ blokuna qoy." },
          { t: "mistake", lang: "bash", wrong: `pip install requests        # qlobal Python-a`, right: `python -m venv .venv
source .venv/bin/activate
pip install requests`, why: "Qlobal quraşdırma layihələrin versiyalarını toqquşdurur. Virtual mühit hər layihəni təcrid edir." },
        ],
      },
      {
        level: "senior",
        title: "Import sistemi və təchizat zənciri təhlükəsizliyi",
        blocks: [
          { t: "list", items: [
            "Modul bir dəfə icra olunur və sys.modules-də keşlənir; sonrakı import-lar həmin obyekti qaytarır. Ona görə modul səviyyəli dəyişən faktiki olaraq singleton-dur.",
            "Axtarış sırası sys.path: skriptin qovluğu → PYTHONPATH → standart kitabxana → site-packages. Skript qovluğunun birinci olması «kölgələmə» (shadowing) probleminin səbəbidir.",
            "Dairəvi import (a → b → a): yarımçıq modul görünür, AttributeError/ImportError alınır. Həll: ortaq kodu üçüncü modula çıxar və ya import-u funksiyanın içinə keçir.",
            "Müasir layihə: pyproject.toml (metadata + asılılıqlar), src/ düzümü, kilid faylı (uv.lock, poetry.lock) — təkrarlana bilən quraşdırma. __all__ modulun açıq API-sini bildirir.",
            "Ağır import-u gecikdir (funksiya daxilində) — işəsalma vaxtını azaldır; importlib.import_module dinamik yükləmə üçündür.",
            "Təhlükəsizlik — təchizat zənciri (supply chain): pip install paketin quraşdırma kodunu SƏNİN hüquqlarınla icra edir. Typosquatting (requets, python-dateutil əvəzinə dateutil-python) real hücumdur. Adı dəqiq yoxla, populyarlığa və mənbəyə bax.",
            "Təhlükəsizlik: versiyaları sancaqla (==) və heşlərlə quraşdır (pip install --require-hashes); pip-audit / Dependabot ilə məlum boşluqları izlə; istifadə etmədiyin asılılığı sil.",
            "Təhlükəsizlik — dependency confusion: daxili paketin adı açıq PyPI-da da qeydiyyata alına bilər və pip onu seçər. Daxili indeks üçün --index-url işlət (--extra-index-url yox), adları rezerv et.",
            "Təhlükəsizlik — dinamik import: importlib.import_module(istifadeci_girisi) və ya __import__ istifadəçi mətninə görə ixtiyari modul yükləyir → kod icrası. Yalnız ağ siyahıdan seç.",
            "Təhlükəsizlik: sys.path-ə yazıla bilən qovluq (məs. /tmp, yükləmə qovluğu) əlavə etmə — ora atılan os.py sənin kodunun yerinə işləyər. Sirləri modulda sabit kimi saxlama — mühit dəyişənindən oxu.",
          ]},
          { t: "code", lang: "python", caption: "Dinamik yükləmə — yalnız ağ siyahıdan", code: `import importlib

ICAZELI = {"json": "json", "csv": "csv"}

def formatlayici_al(ad: str):
    if ad not in ICAZELI:
        raise ValueError("Naməlum format")
    return importlib.import_module(ICAZELI[ad])

print(formatlayici_al("json").dumps({"ok": True}))
try:
    formatlayici_al("os")
except ValueError as e:
    print("Rədd edildi:", e)` },
          { t: "qa", items: [
            ["if __name__ == \"__main__\" nə edir?", "Fayl birbaşa işə salınanda __name__ \"__main__\" olur; import olunanda modulun adı. Blok yalnız birbaşa işəsalmada icra olunur."],
            ["Virtual mühit niyə lazımdır?", "Hər layihənin asılılıqlarını təcrid edir — versiya toqquşması olmur, mühit təkrarlana bilir."],
            ["Typosquatting nədir?", "Populyar paketin adına oxşar adla zərərli paket yayımlamaq; yazı səhvi edən istifadəçi onu quraşdırır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "from math import sqrt-dan sonra necə çağırılır?", options: ["math.sqrt(9)", "sqrt(9)", "import.sqrt(9)"], answer: 1, why: "from ... import adı birbaşa cari fayla gətirir." },
          { t: "quiz", q: "Layihənin paketlərini təcrid etmək üçün nə işlədilir?", options: ["Virtual mühit (venv)", "Qlobal pip", "__init__.py"], answer: 0, why: "venv hər layihəyə ayrı paket qovluğu verir." },
        ],
      },
    ],
    exercise: {
      task: "Standart kitabxana ilə kiçik alət yaz (bir fayl, amma modul kimi). Funksiyalar: 1) zer_at(n) — random ilə n zər atıb nəticələrin siyahısını qaytarsın; 2) statistika(ededler) — statistics modulundan mean və median ilə lüğət qaytarsın; 3) en_cox(ededler) — collections.Counter ilə ən çox düşən ədədi qaytarsın. Sınaq kodu yalnız fayl birbaşa işə salınanda işləsin: 20 zər at, statistikanı və ən çox düşəni çap et. Ulduzlu import işlətmə.",
      starter: `import random\n\ndef zer_at(n):\n    pass\n\n# digər funksiyalar\n\nif __name__ == "__main__":\n    pass\n`,
      expect: "random.randint(1, 6) n dəfə (comprehension); from statistics import mean, median (və ya import statistics); Counter(...).most_common(1)[0][0]; sınaq kodu if __name__ == \"__main__\": blokunda; from x import * yoxdur; funksiyalar return edir (print yox).",
    },
  },
  {
    slug: "oop",
    title: "Siniflər və OOP",
    intro: "Sinif (class) — məlumatı (atributlar) və onunla işləyən funksiyaları (metodlar) bir yerdə saxlayan qəlibdir. Obyekt — həmin qəlibdən yaradılan konkret nümunədir.",
    sections: [
      {
        level: "baslangic",
        title: "class, __init__, self",
        blocks: [
          { t: "analogy", text: "Sinif — peçenye qəlibidir, obyekt — peçenyenin özü. Bir qəliblə yüzlərlə peçenye bişirirsən: forması eynidir (metodlar), amma hərəsinin üstündəki bəzək fərqlidir (atributların dəyəri)." },
          { t: "code", lang: "python", code: `class Telebe:
    def __init__(self, ad, bal):      # obyekt yaradılanda işləyir
        self.ad = ad                  # atribut
        self.bal = bal

    def kecdi(self):                  # metod
        return self.bal >= 51

    def tanit(self):
        netice = "keçdi" if self.kecdi() else "kəsildi"
        return f"{self.ad}: {self.bal} bal — {netice}"

aysel = Telebe("Aysel", 92)           # obyekt (nümunə)
murad = Telebe("Murad", 40)

print(aysel.ad)                       # Aysel
print(aysel.tanit())                  # Aysel: 92 bal — keçdi
print(murad.tanit())                  # Murad: 40 bal — kəsildi` },
          { t: "terms", items: [
            ["sinif (class)", "obyekt yaratmaq üçün qəlib."],
            ["obyekt / nümunə (instance)", "sinifdən yaradılmış konkret dəyər."],
            ["__init__", "konstruktor — yeni obyektin atributlarını qurur."],
            ["self", "metodun çağırıldığı obyektin özü; hər metodun ilk parametri."],
            ["atribut / metod", "obyektin məlumatı / obyektin funksiyası."],
          ]},
          { t: "tip", text: "Sinif adları BöyükHərflə (CamelCase), metod və atributlar kiçik_hərflə (snake_case) yazılır." },
        ],
      },
      {
        level: "orta",
        title: "İrsiyyət, property, xüsusi metodlar, dataclass",
        blocks: [
          { t: "code", lang: "python", code: `class Hesab:
    faiz = 0.05                           # sinif atributu — hamı üçün ortaq

    def __init__(self, sahib, balans=0):
        self.sahib = sahib
        self._balans = balans             # _ : «daxilidir, toxunma» razılaşması

    @property
    def balans(self):                     # hesab.balans — mötərizəsiz oxunur
        return self._balans

    def yatir(self, mebleg):
        if mebleg <= 0:
            raise ValueError("Məbləğ müsbət olmalıdır")
        self._balans += mebleg

    def __repr__(self):                   # print və debug üçün
        return f"Hesab({self.sahib!r}, balans={self._balans})"


class EmanetHesabi(Hesab):                # irsiyyət
    def __init__(self, sahib, balans=0, muddet=12):
        super().__init__(sahib, balans)   # valideynin konstruktoru
        self.muddet = muddet

    def gelir(self):
        return self._balans * self.faiz * self.muddet / 12


h = EmanetHesabi("Aysel", 1000, muddet=6)
h.yatir(500)
print(h)                                  # Hesab('Aysel', balans=1500)
print(h.balans, h.gelir())                # 1500 37.5
print(isinstance(h, Hesab))               # True` },
          { t: "code", lang: "python", caption: "dataclass — məlumat sinifləri üçün qısa yol", code: `from dataclasses import dataclass, field

@dataclass
class Mehsul:
    ad: str
    qiymet: float
    etiketler: list[str] = field(default_factory=list)

    def endirimli(self, faiz: float) -> float:
        return round(self.qiymet * (1 - faiz / 100), 2)

m = Mehsul("Klaviatura", 89.9)
print(m)                                   # __repr__ hazırdır
print(m == Mehsul("Klaviatura", 89.9))     # True — __eq__ hazırdır
print(m.endirimli(10))` },
          { t: "mistake", lang: "python", wrong: `class Sebet:
    mehsullar = []            # sinif atributu — BÜTÜN səbətlər paylaşır

    def elave_et(self, m):
        self.mehsullar.append(m)`, right: `class Sebet:
    def __init__(self):
        self.mehsullar = []   # hər obyektin öz siyahısı`, why: "Sinif səviyyəsində dəyişən obyekt (list, dict) bütün nümunələr arasında ortaqdır: bir səbətə əlavə etdiyin məhsul hamısında görünür." },
          { t: "mistake", lang: "python", wrong: `class Telebe:
    def tanit():              # self unudulub
        return "Salam"

Telebe().tanit()  # TypeError: takes 0 positional arguments but 1 was given`, right: `class Telebe:
    def tanit(self):
        return "Salam"`, why: "Python obyekti metodun birinci arqumenti kimi avtomatik ötürür. Metodun ilk parametri həmişə self olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Kompozisiya, protokollar, obyekt modeli və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "İrsiyyətdən çox kompozisiya: «Maşın mühərrikdir» yox, «Maşının mühərriki var». Dərin irsiyyət zənciri kövrəkdir; obyekti başqa obyektlərdən yığ.",
            "Duck typing və Protocol: Python-da «interfeys» davranışdır — metodu varsa, uyğundur. typing.Protocol bunu tip yoxlayıcıya bildirir; abc.ABC + @abstractmethod isə məcburi edir.",
            "Çoxlu irsiyyətdə metod axtarışı MRO (C3 linearizasiya) ilə gedir; super() valideyni yox, MRO-dakı növbəti sinfi çağırır. Sinif.__mro__ ilə bax.",
            "Xüsusi (dunder) metodlar obyekti dilə inteqrasiya edir: __eq__ + __hash__, __lt__, __len__, __iter__, __enter__/__exit__, __call__. __eq__ yazıb __hash__ yazmasan, obyekt set/dict açarı ola bilmir.",
            "__slots__ atributları sabitləyir: __dict__ yaranmır, milyonlarla obyektdə yaddaş xeyli azalır. @dataclass(frozen=True, slots=True) — dəyişməz, yüngül dəyər obyekti.",
            "@classmethod alternativ konstruktor üçündür (Tarix.setirden(\"2026-01-05\")); @staticmethod sinfə məntiqi bağlı, amma self-siz funksiyadır.",
            "Təhlükəsizlik — «gizli» atribut yoxdur: _ad yalnız razılaşmadır, __ad isə sadəcə adı dəyişir (_Sinif__ad) — hər ikisi oxuna bilir. İnkapsulyasiya təhlükəsizlik sərhədi DEYİL: sirri obyektdə «gizlətmək» onu qorumur.",
            "Təhlükəsizlik — mass assignment: for k, v in sorgu.items(): setattr(istifadeci, k, v) hücumçuya is_admin=True yazmağa imkan verir. Yalnız ağ siyahıdakı sahələri mənimsət (və ya Pydantic modeli ilə qəbul et).",
            "Təhlükəsizlik — __repr__/jurnal: avtomatik repr (dataclass) bütün sahələri çap edir — parol və token jurnala düşür. Həssas sahəyə field(repr=False) ver.",
            "Təhlükəsizlik: getattr(obyekt, istifadeci_girisi)() ilə metodu adla çağırmaq istənilən metodu (sil, __class__, daxili köməkçilər) açır. İcazəli əməliyyatların lüğətini saxla. pickle ilə obyekt yükləmə kod icrasıdır.",
            "Təhlükəsizlik: invariantları konstruktorda və setter-də yoxla (mənfi balans, boş ad) — obyekt heç vaxt yanlış vəziyyətdə olmasın; validasiyanı kənardan gözləmə.",
          ]},
          { t: "code", lang: "python", caption: "Təhlükəsiz yeniləmə və həssas sahə", code: `from dataclasses import dataclass, field

@dataclass
class Istifadeci:
    ad: str
    email: str
    sifre_hesi: str = field(repr=False)     # jurnala düşmür
    is_admin: bool = False

    DEYISE_BILEN = frozenset({"ad", "email"})

    def yenile(self, **deyisiklik):
        for acar, deyer in deyisiklik.items():
            if acar not in self.DEYISE_BILEN:
                raise PermissionError(f"{acar} dəyişdirilə bilməz")
            setattr(self, acar, deyer)

u = Istifadeci("Aysel", "a@kod.az", "$argon2id$...")
u.yenile(ad="Aysel M.")
print(u)                                    # sifre_hesi görünmür
try:
    u.yenile(is_admin=True)
except PermissionError as e:
    print("Rədd edildi:", e)` },
          { t: "qa", items: [
            ["Sinif atributu ilə nümunə atributunun fərqi?", "Sinif atributu bütün obyektlər üçün ortaqdır; nümunə atributu (self.x) hər obyektin özündədir."],
            ["İrsiyyət yoxsa kompozisiya?", "«-dır» (is-a) münasibəti real və sabitdirsə irsiyyət; əks halda kompozisiya — daha çevik və test üçün asandır."],
            ["__repr__ və __str__ fərqi?", "__repr__ — proqramçı üçün birmənalı təsvir; __str__ — istifadəçi üçün oxunaqlı mətn. __str__ yoxdursa, __repr__ işlənir."],
            ["Mass assignment nədir?", "Sorğudan gələn bütün sahələrin obyektə kor-koranə yazılması; hücumçu icazəsiz sahəni (rol) dəyişir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "self nədir?", options: ["Sinfin adı", "Metodun çağırıldığı obyekt", "Açar söz"], answer: 1, why: "self cari nümunəyə istinad edir." },
          { t: "quiz", q: "Valideyn sinfin __init__-ini çağırmaq üçün?", options: ["parent.__init__()", "super().__init__(...)", "self.init()"], answer: 1, why: "super() valideyn (MRO-da növbəti) sinfə çıxış verir." },
          { t: "quiz", q: "class A: siyahi = [] — iki obyekt yaradıb birinə append etdin. İkincidə?", options: ["Boşdur", "Eyni element görünür", "Xəta verir"], answer: 1, why: "Sinif atributu olan siyahı ortaqdır." },
        ],
      },
    ],
    exercise: {
      task: "Kitabxana modeli yaz. Kitab sinfi (dataclass ola bilər): ad, muellif, movcud=True. Kitabxana sinfi: kitablar siyahısı (hər obyektin öz siyahısı!), elave_et(kitab), icareye_ver(ad) — kitab yoxdursa və ya artıq icarədədirsə ValueError; qaytar(ad); movcud_kitablar property-si — mövcud kitabların adları. __len__ kitab sayını qaytarsın. Sonda 3 kitab əlavə et, birini icarəyə ver, mövcudları və len-i çap et, eyni kitabı yenidən icarəyə verməyə çalışıb xətanı tut.",
      starter: `from dataclasses import dataclass\n\n@dataclass\nclass Kitab:\n    pass\n\nclass Kitabxana:\n    pass\n`,
      expect: "Kitabxana.__init__-də self.kitablar = [] (sinif atributu yox); icareye_ver tapılmayanda və movcud False olanda raise ValueError; qaytar movcud-u True edir; @property movcud_kitablar comprehension ilə; __len__ var; sınaqda try/except ValueError; self bütün metodlarda var.",
    },
  },
];
