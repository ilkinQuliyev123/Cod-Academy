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
];
