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
];
