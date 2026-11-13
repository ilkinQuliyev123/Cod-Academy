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
  {
    slug: "dekorator",
    title: "Dekoratorlar və generator-lar",
    intro: "Dekorator — funksiyanı dəyişmədən ona əlavə davranış (jurnal, vaxt ölçmə, icazə yoxlaması) qoşur. Generator — dəyərləri hamısını birdən yox, lazım olduqca bir-bir verən funksiyadır.",
    sections: [
      {
        level: "baslangic",
        title: "Funksiyanı bürümək və yield",
        blocks: [
          { t: "analogy", text: "Dekorator — hədiyyə kağızıdır: içindəki hədiyyə (funksiya) dəyişmir, amma üstünə bant və açıqca əlavə olunur. Generator — çay süzən dəmkeşdir: bütün çayı bir dəfəyə stəkanlara tökmür, kim istəsə, o anda bir stəkan süzür." },
          { t: "code", lang: "python", code: `def jurnal(funksiya):
    def burunmus(*args, **kwargs):
        print(f"→ {funksiya.__name__} çağırıldı")
        netice = funksiya(*args, **kwargs)
        print(f"← nəticə: {netice}")
        return netice
    return burunmus

@jurnal                      # topla = jurnal(topla) ilə eynidir
def topla(a, b):
    return a + b

topla(2, 3)


def say(n):
    for i in range(1, n + 1):
        yield i              # dəyəri ver və burada «dayan»

for x in say(3):
    print(x)                 # 1, 2, 3 — hər biri tələb olunanda hesablanır` },
          { t: "terms", items: [
            ["dekorator", "funksiya qəbul edib yeni (bürünmüş) funksiya qaytaran funksiya."],
            ["@ad", "dekoratoru tətbiq etməyin qısa yazılışı."],
            ["generator", "içində yield olan funksiya; çağırılanda iterator qaytarır."],
            ["yield", "dəyəri qaytarır və funksiyanın vəziyyətini saxlayıb dayanır; növbəti tələbdə davam edir."],
          ]},
          { t: "tip", text: "Dekoratoru başa düşmək üçün iki şeyi xatırla: funksiya dəyişənə mənimsədilə bilir və daxili funksiya xarici dəyişənləri yadda saxlayır (closure) — Funksiyalar dərsinə bax." },
        ],
      },
      {
        level: "orta",
        title: "wraps, parametrli dekorator, generator zənciri",
        blocks: [
          { t: "code", lang: "python", code: `import time
from functools import wraps

def vaxt_olc(funksiya):
    @wraps(funksiya)                      # adı və docstring-i qoruyur
    def burunmus(*args, **kwargs):
        basla = time.perf_counter()
        try:
            return funksiya(*args, **kwargs)
        finally:
            muddet = time.perf_counter() - basla
            print(f"{funksiya.__name__}: {muddet:.4f} s")
    return burunmus


def tekrar(defe):                         # parametrli: 3 qat funksiya
    def dekorator(funksiya):
        @wraps(funksiya)
        def burunmus(*args, **kwargs):
            for cehd in range(1, defe + 1):
                try:
                    return funksiya(*args, **kwargs)
                except ConnectionError:
                    print(f"cəhd {cehd} alınmadı")
            raise ConnectionError("Bütün cəhdlər uğursuz")
        return burunmus
    return dekorator


@vaxt_olc
def hesabla(n):
    """n-ə qədər kvadratların cəmi."""
    return sum(i * i for i in range(n))

print(hesabla(100_000))
print(hesabla.__name__, "—", hesabla.__doc__)

cehdler = iter([ConnectionError, ConnectionError, "cavab"])

@tekrar(3)
def sorgu():
    netice = next(cehdler)
    if netice is ConnectionError:
        raise ConnectionError
    return netice

print(sorgu())` },
          { t: "code", lang: "python", caption: "Generator zənciri (pipeline) — yaddaşda bir sətirdən artıq saxlanmır", code: `def setirler(metn):
    for setir in metn.splitlines():
        yield setir

def bos_olmayanlar(axin):
    for s in axin:
        if s.strip():
            yield s.strip()

def boyuk_herfle(axin):
    for s in axin:
        yield s.upper()

metn = "salam\\n\\n  dünya  \\npython"
for s in boyuk_herfle(bos_olmayanlar(setirler(metn))):
    print(s)

def fibonacci():                 # sonsuz generator
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

from itertools import islice
print(list(islice(fibonacci(), 10)))` },
          { t: "mistake", lang: "python", wrong: `def jurnal(funksiya):
    def burunmus(*args, **kwargs):
        print("çağırıldı")
        funksiya(*args, **kwargs)     # return unudulub → None
    return burunmus`, right: `def jurnal(funksiya):
    @wraps(funksiya)
    def burunmus(*args, **kwargs):
        print("çağırıldı")
        return funksiya(*args, **kwargs)
    return burunmus`, why: "Bürünmüş funksiya nəticəni qaytarmalıdır, yoxsa dekorasiya olunan hər funksiya None verir. @wraps olmadan isə funksiyanın adı «burunmus» olur — debug və sənədləşmə pozulur." },
          { t: "mistake", lang: "python", wrong: `kvadratlar = (x * x for x in range(3))
print(list(kvadratlar))   # [0, 1, 4]
print(list(kvadratlar))   # [] — artıq tükənib`, right: `kvadratlar = [x * x for x in range(3)]   # təkrar lazımdırsa — list
# və ya generatoru hər dəfə yenidən yarat`, why: "Generator bir dəfə gəzilir. İkinci dövr səssizcə boş nəticə verir — xəta yoxdur, məlumat da yoxdur." },
        ],
      },
      {
        level: "senior",
        title: "Daxili mexanizm, hazır dekoratorlar və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Dekoratorlar aşağıdan yuxarı tətbiq olunur: @a @b def f → f = a(b(f)). Çağırışda isə a-nın bürüməsi birinci işləyir. Sıra nəticəni dəyişir.",
            "Hazır alətlər: functools.lru_cache / cache (memoizasiya), cached_property, singledispatch, contextlib.contextmanager (generatordan kontekst meneceri), dataclass, property.",
            "Sinif də dekorator ola bilər (__call__ ilə) və dekorator sinfə tətbiq oluna bilər. Tipləri qorumaq üçün ParamSpec və TypeVar işlət.",
            "Generator vəziyyət maşınıdır: hər yield-də çərçivə (frame) saxlanır. yield from alt generatora ötürür; send() ilə generatora dəyər göndərmək olar — asyncio korutinləri bu mexanizm üzərində qurulub.",
            "Generatorda try/finally təmizliyi generator bağlananda (close və ya zibil yığımı) işləyir — yarıda buraxılan generatorun resursu gec azad oluna bilər; with ilə idarə et.",
            "Təhlükəsizlik — icazə dekoratorunun sırası: @app.get(...) ilə @giris_teleb-in yeri səhv düşsə, marşrut qorunmamış funksiyanı qeydiyyata alır. Dekorator sırasını testlə yoxla; yoxlamanı unutmaq mümkün olmayan yerə (ümumi asılılıq, middleware) qoy.",
            "Təhlükəsizlik — fail-closed: icazə dekoratoru xəta alanda funksiyanı çağırmamalıdır. try/except-də «xəta oldu — davam et» yazmaq hər nasazlığı girişə çevirir.",
            "Təhlükəsizlik — keş sızması: @lru_cache nəticəni arqumentlərə görə saxlayır. İstifadəçi kimliyi arqumentdə yoxdursa, bir istifadəçinin məlumatı başqasına qayıdır. Şəxsi məlumatı qlobal keşləmə və ya açara istifadəçi id-sini daxil et; maxsize ver — limitsiz keş yaddaş DoS-udur.",
            "Təhlükəsizlik — jurnal dekoratoru: arqumentləri olduğu kimi çap etmək parolu və tokeni jurnala yazır. Həssas parametrləri maskala.",
            "Təhlükəsizlik — sonsuz generator: istifadəçinin idarə etdiyi ölçü ilə list(generator) çağırma. islice və ya açıq limit qoy.",
          ]},
          { t: "code", lang: "python", caption: "Fail-closed icazə dekoratoru və təhlükəsiz keş", code: `from functools import wraps, lru_cache

def rol_teleb(rol):
    def dekorator(funksiya):
        @wraps(funksiya)
        def burunmus(istifadeci, *args, **kwargs):
            # atribut yoxdursa və ya uyğun deyilsə — RƏDD
            if getattr(istifadeci, "rol", None) != rol:
                raise PermissionError("İcazə yoxdur")
            return funksiya(istifadeci, *args, **kwargs)
        return burunmus
    return dekorator

class Istifadeci:
    def __init__(self, id, rol):
        self.id, self.rol = id, rol

@rol_teleb("admin")
def hesabat_sil(istifadeci, hesabat_id):
    return f"{hesabat_id} silindi"

print(hesabat_sil(Istifadeci(1, "admin"), 7))
try:
    hesabat_sil(Istifadeci(2, "telebe"), 7)
except PermissionError as e:
    print("Rədd edildi:", e)

@lru_cache(maxsize=256)
def profil(istifadeci_id: int):        # id açarın hissəsidir
    return {"id": istifadeci_id}

print(profil(1), profil.cache_info().currsize)` },
          { t: "qa", items: [
            ["Dekorator nədir?", "Funksiya qəbul edib onu bürüyən yeni funksiya qaytaran çağırıla bilən obyekt; @ sintaksisi f = dekorator(f) deməkdir."],
            ["functools.wraps nə üçündür?", "Bürünmüş funksiyaya orijinalın adını, docstring-ini və digər metadata-sını köçürür."],
            ["Generator ilə list fərqi?", "List bütün elementləri yaddaşda saxlayır; generator onları tələb olunduqca hesablayır, az yaddaş işlədir, bir dəfə gəzilir."],
            ["yield ilə return fərqi?", "return funksiyanı bitirir; yield dəyəri verib dayanır və vəziyyəti saxlayır — növbəti next() ilə davam edir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "@jurnal\\ndef f(): ... nəyə bərabərdir?", options: ["f = jurnal(f)", "jurnal = f(jurnal)", "f = jurnal()"], answer: 0, why: "@ sintaksisi funksiyanı dekoratora ötürüb nəticəni eyni ada mənimsədir." },
          { t: "quiz", q: "Generatoru ikinci dəfə gəzsən nə olar?", options: ["Eyni dəyərlər", "Boş nəticə", "Xəta"], answer: 1, why: "Generator tükənir; yenidən yaratmaq lazımdır." },
        ],
      },
    ],
    exercise: {
      task: "1) say_sayan dekoratoru yaz: funksiyanın neçə dəfə çağırıldığını saysın (burunmus.cagiris atributunda) və hər çağırışda «ad: N-ci çağırış» çap etsin; @wraps işlət, nəticəni qaytar. Onu salamla(ad) funksiyasına tətbiq edib 3 dəfə çağır. 2) cut_ededler(limit) generatoru yaz: 0-dan limit-ə qədər cüt ədədləri yield etsin. 3) hisselere_bol(siyahi, olcu) generatoru: siyahını verilən ölçüdə hissələrə bölüb yield etsin ([1..7], 3 → [1,2,3], [4,5,6], [7]); olcu ≤ 0 olsa ValueError.",
      starter: `from functools import wraps\n\ndef say_sayan(funksiya):\n    pass\n\n@say_sayan\ndef salamla(ad):\n    return f"Salam, {ad}!"\n\n# 2)\n\n# 3)\n`,
      expect: "say_sayan-da @wraps, burunmus.cagiris artır, return funksiya(*args, **kwargs); cut_ededler yield işlədir (list qaytarmır); hisselere_bol range(0, len, olcu) + dilim ilə yield edir, olcu <= 0 → raise ValueError; nəticələr list(...) və ya for ilə göstərilir.",
    },
  },
  {
    slug: "async",
    title: "asyncio",
    intro: "asyncio — bir axında (thread) çoxlu gözləmə işini eyni anda aparmağın yoludur. Şəbəkə sorğusu cavab gözləyərkən proqram boş dayanmır, başqa işə keçir.",
    sections: [
      {
        level: "baslangic",
        title: "async və await",
        blocks: [
          { t: "analogy", text: "Aşpaz düyünü ocağa qoyur. Sinxron aşpaz 20 dəqiqə qazanın başında dayanıb baxır. Asinxron aşpaz düyü bişərkən salat doğrayır, çay dəmləyir. Aşpaz birdir (bir axın), amma gözləmə vaxtını boş keçirmir. await — «bu bişənə qədər başqa işə baxım» deməkdir." },
          { t: "code", lang: "python", code: `import asyncio

async def cay_demle():
    print("Çay dəmlənir…")
    await asyncio.sleep(2)        # gözləmə: idarəni burax
    print("Çay hazırdır")
    return "çay"

async def cörek_qizart():
    print("Çörək qızarır…")
    await asyncio.sleep(1)
    print("Çörək hazırdır")
    return "çörək"

async def main():
    # ikisi eyni anda: cəmi ~2 saniyə (3 yox)
    netice = await asyncio.gather(cay_demle(), cörek_qizart())
    print(netice)                 # ['çay', 'çörək']

asyncio.run(main())` },
          { t: "terms", items: [
            ["korutin (coroutine)", "async def ilə yazılan, dayandırılıb davam etdirilə bilən funksiya."],
            ["await", "korutinin nəticəsini gözləyir və bu müddətdə idarəni dövrə qaytarır."],
            ["event loop", "hazır olan korutinləri növbə ilə işlədən dövr."],
            ["asyncio.gather", "bir neçə korutini eyni anda işə salıb nəticələri sıra ilə qaytarır."],
          ]},
          { t: "tip", text: "Bu saytın Məşq səhifəsində (brauzerdə) sonuncu sətirdə asyncio.run(main()) əvəzinə await main() yaz — orada event loop artıq işləyir. Öz kompüterində .py faylında isə asyncio.run(main()) düzgündür." },
        ],
      },
      {
        level: "orta",
        title: "Task, timeout, xətalar, Semaphore",
        blocks: [
          { t: "code", lang: "python", code: `import asyncio, time

async def yukle(ad, saniye):
    await asyncio.sleep(saniye)
    if ad == "xarab":
        raise ValueError(f"{ad} yüklənmədi")
    return f"{ad} ({saniye}s)"

async def main():
    basla = time.perf_counter()

    # TaskGroup (3.11+): biri xəta versə, qalanları ləğv olunur
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(yukle("a", 0.3))
        t2 = tg.create_task(yukle("b", 0.2))
    print(t1.result(), t2.result())

    # Xətaları ayrı-ayrı topla
    neticeler = await asyncio.gather(
        yukle("c", 0.1), yukle("xarab", 0.1), return_exceptions=True
    )
    print(neticeler)

    # Vaxt limiti
    try:
        async with asyncio.timeout(0.2):
            await yukle("yavaş", 5)
    except TimeoutError:
        print("Vaxt bitdi")

    # Eyni anda ən çox 2 iş
    limit = asyncio.Semaphore(2)
    async def mehdud(ad):
        async with limit:
            return await yukle(ad, 0.1)
    print(await asyncio.gather(*(mehdud(f"m{i}") for i in range(5))))

    print(f"cəmi {time.perf_counter() - basla:.1f} s")

asyncio.run(main())` },
          { t: "mistake", lang: "python", wrong: `async def main():
    netice = yukle("a", 1)     # await unudulub
    print(netice)              # <coroutine object ...> — heç nə işləmədi`, right: `async def main():
    netice = await yukle("a", 1)
    print(netice)`, why: "Korutini çağırmaq onu işə salmır — yalnız obyekt yaradır. Nəticə üçün await et (və ya create_task ilə planlaşdır)." },
          { t: "mistake", lang: "python", wrong: `async def main():
    time.sleep(2)              # bütün event loop-u dondurur
    requests.get(url)          # sinxron kitabxana — eyni problem`, right: `async def main():
    await asyncio.sleep(2)
    await asyncio.to_thread(requests.get, url)   # və ya httpx.AsyncClient`, why: "Bloklayan çağırış bir korutini yox, HAMISINI dayandırır — event loop tək axındadır. Asinxron kitabxana işlət və ya bloklayan işi to_thread ilə ayrı axına ver." },
          { t: "mistake", lang: "python", wrong: `for url in urls:
    await yukle(url)           # ardıcıl: vaxtlar toplanır`, right: `await asyncio.gather(*(yukle(u) for u in urls))   # eyni anda`, why: "Dövr içində tək-tək await etmək sinxron kod qədər yavaşdır. Müstəqil işləri gather və ya TaskGroup ilə birlikdə işə sal." },
        ],
      },
      {
        level: "senior",
        title: "Event loop, GIL, ləğvetmə və təhlükəsizlik",
        blocks: [
          { t: "code", lang: "text", caption: "Hansı alət nə üçün?", code: `asyncio           çoxlu GÖZLƏMƏ (I/O): şəbəkə, baza, fayl      1 axın, kooperativ
threading         bloklayan I/O kitabxanaları                   GIL: eyni anda 1 axın Python kodu icra edir
multiprocessing   ağır HESABLAMA (CPU): şəkil emalı, riyaziyyat hər prosesin öz GIL-i, öz yaddaşı` },
          { t: "list", items: [
            "Kooperativ çoxtapşırıqlılıq: korutin yalnız await nöqtəsində idarəni verir. await-siz uzun hesablama dövrü hər şeyi dondurur — CPU işini run_in_executor / ProcessPoolExecutor-a ver.",
            "create_task ilə yaradılan tapşırığa istinad saxla — yoxsa zibil yığımı onu yarıda silə bilər. TaskGroup bunu strukturlaşdırır: blokdan çıxanda bütün tapşırıqlar bitmiş olur.",
            "Ləğvetmə CancelledError ilə gəlir (BaseException-dan törəyir). Onu udma: təmizliyi finally-də et və yenidən qaldır. Çılpaq except onu tutub tapşırığı «ölməz» edir.",
            "Arxa təzyiq (backpressure): istehsalçı istehlakçıdan sürətlidirsə, asyncio.Queue(maxsize=...) ilə məhdudlaşdır — limitsiz növbə yaddaşı doldurur.",
            "async with / async for — asinxron kontekst menecerləri və generatorlar (bağlantı hovuzu, axınla oxuma). Debug: asyncio.run(main(), debug=True) yavaş callback-ləri və await olunmamış korutinləri göstərir.",
            "Yarış vəziyyəti asyncio-da da var: iki await arasında başqa korutin paylaşılan vəziyyəti dəyişə bilər. «Oxu → await → yaz» ardıcıllığını asyncio.Lock ilə qoru.",
            "Təhlükəsizlik — vaxt limiti: timeout-suz xarici sorğu hücumçuya bağlantıları sonsuz açıq saxlamağa imkan verir (slowloris). Hər şəbəkə əməliyyatına asyncio.timeout qoy.",
            "Təhlükəsizlik — limitsiz paralellik: istifadəçi girişinə görə gather(*minlərlə_tapşırıq) öz serverini və qarşı tərəfi boğur (DoS, IP-nin bloklanması). Semaphore ilə paralelliyi, növbə ilə yaddaşı məhdudlaşdır.",
            "Təhlükəsizlik — sorğu konteksti: cari istifadəçini qlobal dəyişəndə saxlama — paralel sorğular onu bir-birinə qarışdırır (A-nın sorğusu B-nin kimliyi ilə işləyir). contextvars.ContextVar hər tapşırığa öz dəyərini verir.",
            "Təhlükəsizlik — TOCTOU: balansı yoxla → await → çıxar ardıcıllığında iki paralel sorğu ikisi də yoxlamadan keçir. Atomar baza əməliyyatı və ya kilid işlət.",
            "Təhlükəsizlik — SSRF: istifadəçinin verdiyi URL-ə sorğu göndərən kod daxili ünvanlara (169.254.169.254, localhost) çata bilir. Sxem və host ağ siyahısı, yönləndirmələrin məhdudlaşdırılması.",
          ]},
          { t: "code", lang: "python", caption: "contextvars: hər tapşırığın öz konteksti", code: `import asyncio
from contextvars import ContextVar

cari_istifadeci: ContextVar[str] = ContextVar("cari_istifadeci")

async def emal():
    await asyncio.sleep(0.01)             # bu arada başqa sorğu işləyir
    return cari_istifadeci.get()          # yenə ÖZ dəyəri

async def sorgu(ad):
    cari_istifadeci.set(ad)
    return ad, await emal()

async def main():
    print(await asyncio.gather(sorgu("aysel"), sorgu("murad")))
    # [('aysel', 'aysel'), ('murad', 'murad')] — qarışmır

asyncio.run(main())` },
          { t: "qa", items: [
            ["asyncio paralellikdirmi?", "Xeyr — konkurentlikdir: bir axında işlər növbələşir. Həqiqi paralel hesablama üçün proseslər lazımdır."],
            ["GIL nədir?", "Global Interpreter Lock — CPython-da eyni anda yalnız bir axının Python bayt-kodu icra etməsinə icazə verən kilid. I/O gözləyərkən buraxılır."],
            ["gather ilə TaskGroup fərqi?", "TaskGroup strukturlaşdırılmışdır: bir tapşırıq xəta versə, qalanları ləğv edir və xətaları ExceptionGroup kimi qaldırır. gather-də default olaraq digərləri işləməyə davam edir."],
            ["Niyə async kodda time.sleep olmaz?", "Bloklayan çağırış event loop-u dayandırır — bütün korutinlər gözləyir. asyncio.sleep idarəni dövrə qaytarır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hərəsi 1 saniyə çəkən 3 sorğunu gather ilə işə saldın. Cəmi təxminən?", options: ["3 saniyə", "1 saniyə", "0 saniyə"], answer: 1, why: "Gözləmələr eyni anda keçir." },
          { t: "quiz", q: "await olmadan çağırılan korutin?", options: ["Dərhal işləyir", "Yalnız korutin obyekti yaranır, icra olunmur", "Xəta verir"], answer: 1, why: "Korutini işə salmaq üçün await və ya create_task lazımdır." },
          { t: "quiz", q: "Ağır riyazi hesablama üçün ən uyğunu?", options: ["asyncio", "threading", "multiprocessing"], answer: 2, why: "CPU işi GIL-ə görə yalnız ayrı proseslərdə paralel gedir." },
        ],
      },
    ],
    exercise: {
      task: "Saxta «yükləyici» yaz. yukle(ad, saniye) korutini asyncio.sleep ilə gözləyib «ad yükləndi» qaytarsın; saniye > 1 olarsa, bu çağırış asyncio.timeout(1) ilə kəsilsin və «ad: vaxt bitdi» qaytarılsın. main(): 5 faylı (müxtəlif vaxtlarla, biri 3 saniyə) EYNİ ANDA, amma Semaphore ilə ən çox 2-si paralel olmaqla yükləsin, nəticələri və ümumi vaxtı çap etsin. Məşq səhifəsində sonda await main() yaz.",
      starter: `import asyncio, time\n\nasync def yukle(ad, saniye):\n    pass\n\nasync def main():\n    fayllar = [("a", 0.3), ("b", 0.5), ("c", 3), ("d", 0.2), ("e", 0.4)]\n    # bura\n\nawait main()   # öz kompüterində: asyncio.run(main())\n`,
      expect: "yukle async def, await asyncio.sleep; async with asyncio.timeout(1) + except TimeoutError → mesaj qaytarır; asyncio.Semaphore(2) və async with; asyncio.gather (və ya TaskGroup) ilə bütün fayllar; time.sleep işlədilməyib; ümumi vaxt time.perf_counter ilə; dövrdə tək-tək await yoxdur.",
    },
  },
  {
    slug: "fastapi",
    title: "FastAPI ilə API",
    intro: "FastAPI — Python-da veb API yazmaq üçün müasir framework-dür. Tip işarələrindən (type hints) istifadə edərək girişi avtomatik yoxlayır, JSON-a çevirir və interaktiv sənəd yaradır.",
    sections: [
      {
        level: "baslangic",
        title: "İlk API",
        blocks: [
          { t: "analogy", text: "API — restoranın ofisiantıdır. Müştəri (brauzer, mobil tətbiq) mətbəxə girmir: menyudan sifariş verir (sorğu), ofisiant mətbəxdən yeməyi gətirir (cavab). FastAPI həm ofisiant, həm də menyunu özü çap edən (sənəd) və səhv sifarişi qapıda qaytaran (validasiya) işçidir." },
          { t: "code", lang: "bash", code: `pip install "fastapi[standard]"
fastapi dev main.py      # http://127.0.0.1:8000  •  sənəd: /docs` },
          { t: "code", lang: "python", caption: "main.py", code: `from fastapi import FastAPI

app = FastAPI(title="Kurs API")

kurslar = {1: {"ad": "HTML", "saat": 20}, 2: {"ad": "Python", "saat": 60}}

@app.get("/")
def ana_sehife():
    return {"mesaj": "Salam, FastAPI!"}

@app.get("/kurslar")
def siyahi(min_saat: int = 0):                 # ?min_saat=30 — sorğu parametri
    return [k for k in kurslar.values() if k["saat"] >= min_saat]

@app.get("/kurslar/{kurs_id}")
def bir_kurs(kurs_id: int):                    # yol parametri; int-ə çevrilir və yoxlanır
    return kurslar[kurs_id]` },
          { t: "terms", items: [
            ["endpoint", "API-nin bir ünvanı + metodu: GET /kurslar."],
            ["yol parametri", "URL-in dəyişən hissəsi: /kurslar/{kurs_id}."],
            ["sorğu parametri (query)", "? işarəsindən sonrakı hissə: ?min_saat=30."],
            ["type hint", "parametrin tipi (kurs_id: int); FastAPI ona görə çevirir və yoxlayır."],
            ["/docs", "avtomatik yaranan interaktiv sənəd (Swagger UI)."],
          ]},
          { t: "tip", text: "FastAPI brauzerdəki Məşq səhifəsində işləmir — server tələb edir. Kodu öz kompüterində sına; tapşırığı isə AI yoxlayacaq." },
        ],
      },
      {
        level: "orta",
        title: "Pydantic modelləri, status kodları, xətalar, Depends",
        blocks: [
          { t: "code", lang: "python", code: `from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query, status
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()

class TelebeYarat(BaseModel):                  # GİRİŞ modeli
    ad: str = Field(min_length=2, max_length=50)
    email: EmailStr
    yas: int = Field(ge=16, le=100)

class TelebeCavab(BaseModel):                  # ÇIXIŞ modeli — yalnız açıq sahələr
    id: int
    ad: str

baza: dict[int, dict] = {}

def sehifeleme(
    sehife: Annotated[int, Query(ge=1)] = 1,
    olcu: Annotated[int, Query(ge=1, le=100)] = 20,   # üst limit məcburidir
):
    return {"kecid": (sehife - 1) * olcu, "olcu": olcu}

@app.post("/telebeler", response_model=TelebeCavab, status_code=status.HTTP_201_CREATED)
def yarat(telebe: TelebeYarat):                # gövdə avtomatik yoxlanır; səhvdirsə 422
    yeni_id = len(baza) + 1
    baza[yeni_id] = {"id": yeni_id, **telebe.model_dump()}
    return baza[yeni_id]                       # email cavaba DÜŞMÜR — response_model süzür

@app.get("/telebeler", response_model=list[TelebeCavab])
def siyahi(s: Annotated[dict, Depends(sehifeleme)]):
    hamisi = list(baza.values())
    return hamisi[s["kecid"]: s["kecid"] + s["olcu"]]

@app.get("/telebeler/{telebe_id}", response_model=TelebeCavab)
def bir(telebe_id: int):
    if telebe_id not in baza:
        raise HTTPException(status_code=404, detail="Tələbə tapılmadı")
    return baza[telebe_id]` },
          { t: "mistake", lang: "python", wrong: `@app.post("/telebeler")
def yarat(melumat: dict):          # nə gəlsə, qəbul olunur
    baza.append(melumat)`, right: `@app.post("/telebeler")
def yarat(telebe: TelebeYarat):    # tip, uzunluq, aralıq yoxlanır
    ...`, why: "dict heç nəyi yoxlamır: əskik sahə, yanlış tip, 10 MB-lıq sətir — hamısı keçir. Pydantic modeli girişin «müqaviləsi»dir." },
          { t: "mistake", lang: "python", wrong: `@app.get("/istifadeciler/{id}")
def al(id: int):
    return db_istifadeci(id)       # sifre_hesi, daxili qeydlər də gedir`, right: `@app.get("/istifadeciler/{id}", response_model=IstifadeciCavab)
def al(id: int):
    return db_istifadeci(id)`, why: "Baza obyektini olduğu kimi qaytarmaq həssas sahələri sızdırır. response_model yalnız elan olunmuş sahələri buraxır." },
          { t: "mistake", lang: "python", wrong: `@app.get("/hesabat")
async def hesabat():
    time.sleep(5)                  # async endpoint-də bloklama — bütün server donur
    return {"ok": True}`, right: `@app.get("/hesabat")
def hesabat():                     # adi def: FastAPI onu axın hovuzunda işlədir
    time.sleep(5)
    return {"ok": True}`, why: "async def endpoint event loop-da işləyir: içində bloklayan çağırış hamını gözlədir. Bloklayan kod üçün adi def, asinxron kitabxana üçün async def + await." },
        ],
      },
      {
        level: "senior",
        title: "Autentifikasiya, arxitektura və API təhlükəsizliyi",
        blocks: [
          { t: "code", lang: "python", caption: "Asılılıqla autentifikasiya və sahiblik yoxlaması", code: `from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

app = FastAPI(docs_url=None, redoc_url=None)        # production-da sənədi gizlət və ya qoru
oauth2 = OAuth2PasswordBearer(tokenUrl="giris")

def cari_istifadeci(token: Annotated[str, Depends(oauth2)]) -> dict:
    istifadeci = token_yoxla(token)                 # imza + müddət; None qaytara bilər
    if istifadeci is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Giriş tələb olunur",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return istifadeci

Cari = Annotated[dict, Depends(cari_istifadeci)]

@app.get("/sifarisler/{sifaris_id}")
def sifaris(sifaris_id: int, istifadeci: Cari):
    s = sifaris_tap(sifaris_id)
    # IDOR-a qarşı: yoxdursa da, başqasınındırsa da — eyni 404
    if s is None or s["istifadeci_id"] != istifadeci["id"]:
        raise HTTPException(status_code=404, detail="Tapılmadı")
    return s` },
          { t: "list", items: [
            "Quruluş: APIRouter ilə modullara böl (routers/, schemas/, services/, db/). Endpoint nazik olsun: yoxla → servisi çağır → cavabı qaytar.",
            "Depends zənciri: baza sessiyası (yield ilə aç/bağla), cari istifadəçi, rol yoxlaması. Qlobal tələb üçün router səviyyəsində dependencies=[...] — unudulmuş endpoint qalmır.",
            "Ayarlar pydantic-settings ilə mühit dəyişənlərindən; baza üçün SQLAlchemy 2 / SQLModel + Alembic miqrasiyaları; test üçün TestClient və app.dependency_overrides.",
            "Production: uvicorn bir neçə işçi ilə (və ya gunicorn + uvicorn işçiləri), qarşıda reverse proxy/TLS; cavabdan sonrakı yüngül iş üçün BackgroundTasks, ağır iş üçün növbə (Celery, arq).",
            "Təhlükəsizlik — sınıq obyekt səviyyəli icazə (BOLA/IDOR, API-lərdə №1 boşluq): hər endpoint-də obyektin cari istifadəçiyə aid olduğunu yoxla. Giriş etmək kifayət deyil.",
            "Təhlükəsizlik — injection: sorğunu f-string ilə qurma (f\"... WHERE ad = '{ad}'\"). Parametrli sorğu və ya ORM. Pydantic tipi yoxlayır, SQL-i yox.",
            "Təhlükəsizlik — mass assignment: giriş modelində yalnız istifadəçinin dəyişə biləcəyi sahələr olsun (rol, is_admin, balans YOX). model_config = ConfigDict(extra=\"forbid\") artıq sahəni rədd edir.",
            "Təhlükəsizlik — parollar və tokenlər: parolu argon2/bcrypt ilə heşlə (pwdlib); JWT-də alqoritmi sabitlə (algorithms=[\"HS256\"]), qısa ömür ver, sirri mühit dəyişənində saxla; müqayisə üçün secrets.compare_digest.",
            "Təhlükəsizlik — CORS: allow_origins=[\"*\"] ilə allow_credentials=True birlikdə işlətmə. Konkret domenləri yaz.",
            "Təhlükəsizlik — limitlər: giriş və bahalı endpoint-lərə rate limit (slowapi və ya proxy səviyyəsində), səhifə ölçüsünə üst hədd, gövdə və yüklənən fayl ölçüsünə limit.",
            "Təhlükəsizlik — xətalar: gözlənilməz xətada stack trace qaytarma (debug=False), ümumi 500 ver, təfərrüatı jurnala yaz. Validasiya xətasında istifadəçinin göndərdiyi parolu geri əks etdirmə.",
          ]},
          { t: "qa", items: [
            ["FastAPI girişi necə yoxlayır?", "Tip işarələri və Pydantic modelləri ilə: sorğunu çevirir, qaydaları yoxlayır, səhvdirsə avtomatik 422 və izah qaytarır."],
            ["Depends nə üçündür?", "Asılılıq inyeksiyası: ortaq məntiqi (baza sessiyası, cari istifadəçi, səhifələmə) endpoint-lərə elan yolu ilə qoşur; testdə əvəzlənə bilir."],
            ["def və async def endpoint fərqi?", "async def event loop-da işləyir və daxilində yalnız bloklamayan kod olmalıdır; adi def axın hovuzunda işlədilir — bloklayan kitabxanalar üçün."],
            ["response_model nə verir?", "Cavabı süzür və yoxlayır (artıq sahələr getmir), sənədi dəqiqləşdirir."],
            ["401 ilə 403 fərqi?", "401 — kimlik təsdiqlənməyib; 403 — kimlik bəllidir, icazə yoxdur. Obyektin varlığını gizlətmək üçün bəzən 404 qaytarılır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "@app.get(\"/kurslar/{kurs_id}\") — kurs_id nədir?", options: ["Sorğu parametri", "Yol parametri", "Gövdə"], answer: 1, why: "Fiqurlu mötərizədəki hissə URL yolundan götürülür." },
          { t: "quiz", q: "Gövdədə yas sahəsinə \"abc\" göndərildi (yas: int). Nə olur?", options: ["500 xətası", "Avtomatik 422 validasiya xətası", "0 kimi qəbul olunur"], answer: 1, why: "Pydantic tipi yoxlayır və izahlı 422 qaytarır." },
          { t: "quiz", q: "Uğurlu yaratma üçün uyğun status kodu?", options: ["200", "201", "204"], answer: 1, why: "201 Created — yeni resurs yaradıldı." },
        ],
      },
    ],
    exercise: {
      task: "Tapşırıqlar (todo) API-si yaz. Modellər: TapsiriqYarat (basliq: 3–100 simvol; artıq sahə qadağan) və TapsiriqCavab (id, basliq, tamamlanib). Endpoint-lər: POST /tapsiriqlar (201), GET /tapsiriqlar (limit sorğu parametri 1–50, default 20), GET /tapsiriqlar/{id} (yoxdursa 404), PATCH /tapsiriqlar/{id}/tamamla, DELETE /tapsiriqlar/{id} (204). Yaddaşda dict saxla. Bütün cavablarda response_model işlət.",
      starter: `from typing import Annotated\nfrom fastapi import FastAPI, HTTPException, Query, status\nfrom pydantic import BaseModel, ConfigDict, Field\n\napp = FastAPI()\ntapsiriqlar: dict[int, dict] = {}\n\n# modellər\n\n# endpoint-lər\n`,
      expect: "TapsiriqYarat-da Field(min_length=3, max_length=100) və ConfigDict(extra=\"forbid\"); POST status_code=201 və response_model; limit Annotated[int, Query(ge=1, le=50)] = 20; tapılmayanda HTTPException(404); DELETE status_code=204 və heç nə qaytarmır; giriş dict kimi qəbul olunmur; async def içində bloklama yoxdur.",
    },
  },
  {
    slug: "senior",
    title: "Senior: daxili işləmə və performans",
    intro: "Bu dərs Python bölməsinin yekunudur: kod necə icra olunur, yaddaş necə idarə edilir, GIL nədir və yavaş proqramı necə — təxminlə yox, ölçmə ilə — sürətləndirmək olar.",
    sections: [
      {
        level: "baslangic",
        title: "Hər şey obyektdir, dəyişən isə addır",
        blocks: [
          { t: "analogy", text: "Python-da dəyişən qutu deyil, etiketdir. Çamadana (obyekt) iki etiket yapışdıra bilərsən: a və b. Çamadanı a etiketi ilə açıb içinə köynək qoysan, b ilə baxan da köynəyi görəcək — çünki çamadan birdir." },
          { t: "code", lang: "python", code: `a = [1, 2, 3]
b = a                # yeni siyahı YOX — eyni obyektə ikinci ad
b.append(4)
print(a)             # [1, 2, 3, 4]
print(a is b)        # True — eyni obyekt
print(id(a) == id(b))

c = a.copy()         # yeni obyekt (dayaz surət)
c.append(5)
print(a, c)          # a dəyişmədi
print(a == c[:4], a is c)   # dəyər bərabər, obyekt fərqli

x = 10
y = x
y += 1               # int dəyişməzdir: y yeni obyektə işarə edir
print(x, y)          # 10 11` },
          { t: "terms", items: [
            ["obyekt", "yaddaşdakı dəyər; hər birinin kimliyi (id), tipi və dəyəri var."],
            ["is", "eyni obyektdirmi? (kimlik müqayisəsi)"],
            ["==", "dəyərləri bərabərdirmi?"],
            ["dəyişən (mutable) / dəyişməz (immutable)", "list, dict, set dəyişir; int, str, tuple dəyişmir."],
          ]},
          { t: "tip", text: "is yalnız None, True, False ilə işlət: if x is None. Ədəd və sətirləri == ilə müqayisə et." },
        ],
      },
      {
        level: "orta",
        title: "Mürəkkəblik, düzgün struktur, ölçmə",
        blocks: [
          { t: "code", lang: "text", caption: "Əməliyyatların qiyməti", code: `Əməliyyat            list        dict / set     deque
x in kolleksiya      O(n)        O(1)           O(n)
sona əlavə           O(1)        —              O(1)
əvvələ əlavə/silmə   O(n)        —              O(1)
indekslə oxu         O(1)        O(1) açarla    O(n) ortada` },
          { t: "code", lang: "python", code: `import timeit

siyahi = list(range(100_000))
coxluq = set(siyahi)

print(timeit.timeit(lambda: 99_999 in siyahi, number=200))   # yavaş: xətti axtarış
print(timeit.timeit(lambda: 99_999 in coxluq, number=200))   # sürətli: heş

# Sətir birləşdirmə
sozler = ["söz"] * 10_000

def pis():
    s = ""
    for w in sozler:
        s += w               # hər dəfə yeni sətir yarana bilər
    return s

def yaxsi():
    return "".join(sozler)   # bir dəfə ayırır

print(timeit.timeit(pis, number=50))
print(timeit.timeit(yaxsi, number=50))

# Profilləmə: vaxt hara gedir?
import cProfile
cProfile.run("sorted(str(i) for i in range(50_000))", sort="cumulative")` },
          { t: "list", items: [
            "Əvvəl ölç: timeit (kiçik parça), cProfile (bütün proqram), tracemalloc (yaddaş). Vaxtın 90%-i adətən kodun 10%-indədir.",
            "Alqoritm və struktur dil hiylələrindən vacibdir: O(n²)-i O(n)-ə endirmək hər mikro-optimizasiyadan üstündür.",
            "Daxili funksiyalar (sum, sorted, min, str.join) C-də yazılıb — əl ilə yazılmış dövrdən sürətlidir.",
            "collections: deque (növbə), Counter (sayma), defaultdict (qruplaşdırma); heapq (ən kiçik N), bisect (sıralı siyahıda axtarış).",
          ]},
          { t: "mistake", lang: "python", wrong: `tekrarlar = []
for x in a:
    if x in b:               # b — list: hər dəfə O(n) → cəmi O(n²)
        tekrarlar.append(x)`, right: `b_coxlugu = set(b)
tekrarlar = [x for x in a if x in b_coxlugu]   # O(n)`, why: "Dövr içində siyahıda axtarış gizli kvadratik mürəkkəblikdir: 100 000 elementdə milyardlarla müqayisə. Set-də axtarış sabit vaxtdır." },
          { t: "mistake", lang: "python", wrong: `ilkin = [[0] * 3] * 3         # eyni daxili siyahıya 3 istinad
ilkin[0][0] = 1
print(ilkin)                  # [[1,0,0],[1,0,0],[1,0,0]]`, right: `ilkin = [[0] * 3 for _ in range(3)]   # 3 ayrı siyahı`, why: "* operatoru obyekti kopyalamır, istinadı təkrarlayır. Daxili siyahı birdir — bir yeri dəyişsən, «hər üçü» dəyişir." },
          { t: "mistake", lang: "python", wrong: `import copy
b = a.copy()                 # dayaz surət: daxili siyahılar ortaqdır
b[0].append(99)              # a[0] da dəyişdi`, right: `import copy
b = copy.deepcopy(a)         # daxili obyektlər də kopyalanır`, why: "Dayaz surət yalnız xarici qabı kopyalayır. İç-içə strukturda müstəqil nüsxə üçün deepcopy lazımdır." },
        ],
      },
      {
        level: "senior",
        title: "CPython daxili, GIL, sürətləndirmə və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "İcra: mənbə → AST → bayt-kod (.pyc, __pycache__) → CPython virtual maşını. dis modulu bayt-kodu göstərir. 3.11+ ixtisaslaşan (adaptive) interpretator, 3.13+ eksperimental JIT var.",
            "Yaddaş: istinad sayğacı (refcount) sıfıra düşəndə obyekt dərhal silinir; dövri istinadları nəsilli zibil yığan (gc) təmizləyir. Sızma adətən qlobal keş/siyahıda unudulmuş istinaddır — tracemalloc və weakref ilə tap.",
            "GIL: eyni anda bir axın Python bayt-kodu icra edir. I/O-da buraxılır (threading/asyncio faydalıdır), CPU işində yox (multiprocessing, concurrent.futures.ProcessPoolExecutor). 3.13+ GIL-siz (free-threaded) yığım eksperimentaldır.",
            "Sürətləndirmə pillələri: 1) alqoritm/struktur; 2) daxili funksiyalar və comprehension; 3) vektorlaşdırma (NumPy, pandas, Polars); 4) keş (functools.cache); 5) paralellik; 6) C/Rust genişlənməsi, Cython, Numba; 7) PyPy.",
            "Mikro-detallar (yalnız isti dövrdə): lokal dəyişən qlobaldan sürətlidir, atribut axtarışını dövrdən kənara çıxar, __slots__ yaddaşı azaldır, generator böyük aralıq siyahının qarşısını alır.",
            "Tiplər icra zamanı yoxlanmır — mypy/pyright statik yoxlayır. Sürətə təsir etmir, amma böyük kod bazasında səhvlərin çoxunu işə salmadan tutur.",
            "Kiçik int-lər (-5…256) və bəzi sətirlər keşlənir (interning) — ona görə is bəzən «təsadüfən» işləyir. Buna heç vaxt arxalanma.",
            "Təhlükəsizlik — kod icrası: eval, exec, pickle.loads, yaml.load, subprocess(shell=True) istifadəçi girişi ilə uzaqdan kod icrasıdır (RCE). Əvəzi: ast.literal_eval, json, yaml.safe_load, subprocess.run([siyahi]) arqument siyahısı ilə.",
            "Təhlükəsizlik — alqoritmik DoS: hücumçu ən pis hal üçün giriş seçir. Geri izləyən regex (a+)+$ (ReDoS), çox dərin iç-içə JSON (rekursiya limiti), nəhəng ədədin sətrə çevrilməsi, heş toqquşmaları. Giriş ölçüsünü məhdudlaşdır, regex-ə vaxt limiti/sadə naxış, PYTHONHASHSEED-i söndürmə.",
            "Təhlükəsizlik — vaxt hücumu: token/heş müqayisəsində == ilk fərqli simvolda dayanır və vaxt fərqi sirri açır. hmac.compare_digest sabit vaxtda müqayisə edir.",
            "Təhlükəsizlik — təsadüfilik: random modulu proqnozlaşdırıla bilir. Token, parol sıfırlama kodu, sessiya ID-si üçün yalnız secrets modulu.",
            "Təhlükəsizlik: assert -O ilə silinir (icazə yoxlaması üçün işlətmə); float pulda yuvarlaqlaşdırma xətası verir — decimal.Decimal işlət; sirləri mənbə koda yazma, .pyc və traceback-lərdə qalır.",
          ]},
          { t: "code", lang: "python", caption: "Təhlükəsiz alternativlər", code: `import ast, hmac, secrets
from decimal import Decimal

# eval əvəzinə — yalnız literal
print(ast.literal_eval("[1, 2, {'a': 3}]"))
try:
    ast.literal_eval("__import__('os').system('ls')")
except ValueError:
    print("Kod icra olunmadı")

# Sabit vaxtlı müqayisə
gozlenen = "f3a9c1"
print(hmac.compare_digest(gozlenen, "f3a9c1"))

# Kriptoqrafik təsadüfilik
print(len(secrets.token_urlsafe(32)))

# Pul
print(0.1 + 0.2 == 0.3, Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))` },
          { t: "qa", items: [
            ["is ilə == fərqi?", "is kimliyi (eyni obyekt), == dəyəri müqayisə edir. is yalnız None və digər singleton-lar üçündür."],
            ["GIL nədir və necə yan keçilir?", "CPython-da eyni anda bir axının bayt-kod icra etməsinə icazə verən kilid. CPU işi üçün proseslər, C genişlənmələri (NumPy GIL-i buraxır) və ya free-threaded yığım."],
            ["Python yaddaşı necə idarə edir?", "İstinad sayğacı ilə — sıfır olanda dərhal azad edir; dövri istinadlar üçün nəsilli zibil yığan."],
            ["Yavaş kodu necə sürətləndirirsən?", "Ölçürəm (cProfile), dar boğazı tapıram, əvvəl alqoritmi və strukturu düzəldirəm, sonra daxili funksiyalar/vektorlaşdırma, keş, ən sonda paralellik və ya native kod — hər addımdan sonra yenidən ölçürəm."],
            ["Dayaz və dərin surət fərqi?", "Dayaz yalnız xarici konteyneri kopyalayır, daxili obyektlər ortaq qalır; dərin surət bütün iç-içə obyektləri kopyalayır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "a = [1]; b = a; b.append(2). a nədir?", options: ["[1]", "[1, 2]", "Xəta"], answer: 1, why: "a və b eyni siyahı obyektinin iki adıdır." },
          { t: "quiz", q: "Milyon elementdə «x içindədirmi?» yoxlaması üçün ən sürətli struktur?", options: ["list", "set", "tuple"], answer: 1, why: "Set-də axtarış orta hesabla O(1)-dir." },
          { t: "quiz", q: "Parol sıfırlama tokeni üçün hansı modul?", options: ["random", "secrets", "math"], answer: 1, why: "secrets kriptoqrafik təhlükəsiz təsadüfilik verir." },
        ],
      },
    ],
    exercise: {
      task: "Yavaş kodu optimallaşdır və ölç. Verilib: tekrarlananlar(a, b) — iç-içə dövrlə iki siyahının ortaq elementlərini tapır (O(n²)). 1) Onu set ilə O(n) versiyaya çevir (sürətli adla yeni funksiya). 2) timeit ilə hər ikisini 5 000 elementli siyahılarda ölç və vaxtları çap et. 3) Nəticələrin eyni olduğunu yoxla (sıralayıb müqayisə et). 4) Sonda təhlükəsiz token yaradan token_yarat() funksiyası yaz və iki tokeni sabit vaxtda müqayisə edən bərabərdir(t1, t2) funksiyasını əlavə et.",
      starter: `import timeit\n\ndef tekrarlananlar(a, b):\n    netice = []\n    for x in a:\n        for y in b:\n            if x == y and x not in netice:\n                netice.append(x)\n    return netice\n\na = list(range(0, 5000, 2))\nb = list(range(0, 5000, 3))\n\n# 1) suretli(a, b)\n\n# 2) ölç\n\n# 3) yoxla\n\n# 4) token\n`,
      expect: "suretli set kəsişməsi və ya set-də axtarış işlədir (iç-içə dövr yox); timeit.timeit ilə hər iki funksiya number parametri ilə ölçülür və çap olunur; sorted(...) == sorted(...) yoxlaması; token secrets.token_urlsafe/token_hex ilə (random yox); müqayisə hmac.compare_digest ilə (== yox).",
    },
  },
];
