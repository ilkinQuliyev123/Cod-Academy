import type { Lesson } from "../types";

/** Nümunələr məşq səhifəsindəki baza ilə işləyir: telebeler, kurslar, qeydiyyat (SQLite). */
export const sql: Lesson[] = [
  {
    slug: "giris",
    title: "SQL və verilənlər bazası nədir?",
    intro: "Verilənlər bazası (database) məlumatı nizamlı saxlayan sistemdir. SQL (Structured Query Language) onunla danışmaq dilidir: «Bakıdan olan tələbələri göstər» kimi sualları yazırıq.",
    sections: [
      {
        level: "baslangic",
        title: "Cədvəl, sətir, sütun",
        blocks: [
          { t: "analogy", text: "Baza — Excel faylıdır, cədvəllər — onun vərəqləri. Hər sütun bir xüsusiyyət (ad, yaş), hər sətir bir qeyd (bir tələbə). SQL isə köməkçiyə verdiyin dəqiq əmrdir: «telebeler vərəqindən ad sütununu gətir»." },
          { t: "code", lang: "sql", code: `-- Bütün tələbələri göstər
SELECT * FROM telebeler;

-- Yalnız ad və şəhər
SELECT ad, seher FROM telebeler;` },
          { t: "terms", items: [
            ["database (baza)", "əlaqəli cədvəllərin toplusu."],
            ["table (cədvəl)", "eyni növ qeydlərin toplusu: telebeler, kurslar."],
            ["row (sətir, qeyd)", "bir obyekt: bir tələbə."],
            ["column (sütun)", "xüsusiyyət: ad, yas, seher."],
            ["query (sorğu)", "bazaya verilən SQL əmri."],
            ["DBMS", "bazanı idarə edən proqram: PostgreSQL, MySQL, SQL Server, SQLite."],
            ["--", "şərh (comment) — icra olunmur."],
          ]},
          { t: "tip", text: "Məşq səhifəsində hazır baza var: telebeler (id, ad, soyad, yas, seher), kurslar (id, ad, saat), qeydiyyat (telebe_id, kurs_id, bal). Hər nümunəni orada işə sal." },
        ],
      },
      {
        level: "orta",
        title: "Niyə Excel yox, baza?",
        blocks: [
          { t: "list", items: [
            "Milyonlarla sətir və eyni anda minlərlə istifadəçi.",
            "Qaydalar: yaş ədəd olmalıdır, email təkrarlanmamalıdır — baza özü yoxlayır.",
            "Cədvəllər arası əlaqə: tələbə ↔ kurs, məlumat təkrarlanmır.",
            "Tranzaksiyalar: pul köçürməsi ya tam olur, ya heç olmur.",
            "SQL deklarativdir: NƏ istədiyini yazırsan, NECƏ tapmağı baza özü seçir.",
          ]},
          { t: "p", text: "SQL əmrləri qruplara bölünür: DQL (SELECT — oxumaq), DML (INSERT, UPDATE, DELETE — dəyişmək), DDL (CREATE, ALTER, DROP — struktur), DCL (GRANT, REVOKE — icazələr), TCL (BEGIN, COMMIT, ROLLBACK — tranzaksiya)." },
          { t: "mistake", lang: "sql", wrong: `SELECT ad seher FROM telebeler`, right: `SELECT ad, seher FROM telebeler;`, why: "Sütunlar vergüllə ayrılır. Vergülsüz yazanda «seher» ad sütununa ləqəb (alias) sayılır — xəta vermir, amma səhv nəticə alırsan." },
          { t: "tip", text: "Açar sözləri BÖYÜK (SELECT, FROM), cədvəl/sütun adlarını kiçik yaz — oxunaqlıdır. SQL açar sözlərə həssas deyil." },
        ],
      },
      {
        level: "senior",
        title: "Relyasion model və SQL injection",
        blocks: [
          { t: "p", text: "Relyasion (relational) model 1970-də Edgar Codd tərəfindən təklif olunub: məlumat cədvəllərdə (relation), əlaqələr açarlarla. Sorğu icrası: parser → optimizator (planner) → icra planı → storage engine. Eyni nəticə üçün baza onlarla plan arasından ən ucuzunu seçir — EXPLAIN ilə planı görürsən." },
          { t: "warn", text: "SQL INJECTION — ən məşhur hücumlardan biri. Kodda sorğunu mətn birləşdirərək qurma: \"SELECT * FROM users WHERE ad = '\" + ad + \"'\" — istifadəçi ad yerinə ' OR '1'='1 yazsa, BÜTÜN istifadəçilər qaytarılır; '; DROP TABLE users; -- yazsa, cədvəl silinə bilər." },
          { t: "code", lang: "javascript", code: `// ❌ Təhlükəli
db.query("SELECT * FROM telebeler WHERE ad = '" + ad + "'");

// ✅ Parametrli sorğu (prepared statement) — dəyər ayrıca göndərilir
db.query("SELECT * FROM telebeler WHERE ad = $1", [ad]);` },
          { t: "list", items: [
            "Parametrli sorğu: baza sorğunun strukturunu əvvəlcədən parse edir, dəyər heç vaxt kod kimi oxunmur.",
            "Ən az səlahiyyət prinsipi: tətbiqin DB istifadəçisinin DROP icazəsi olmasın.",
            "ORM (Entity Framework, Prisma) default olaraq parametrləyir — amma «raw SQL» funksiyalarında yenə diqqət.",
          ]},
          { t: "qa", items: [
            ["SQL deklarativ dil nə deməkdir?", "Nəticəni təsvir edirsən, alqoritmi yox — icra yolunu optimizator seçir."],
            ["SQL injection-dan necə qorunursan?", "Parametrli sorğular/ORM, giriş validasiyası, minimal DB icazələri; heç vaxt string birləşdirmə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Cədvəldə bir tələbənin bütün məlumatı nədir?", options: ["sütun", "sətir", "baza"], answer: 1, why: "Sətir — bir qeyd; sütun — bir xüsusiyyət." },
          { t: "quiz", q: "SQL injection-ın əsas müdafiəsi?", options: ["Sorğunu böyük hərflə yazmaq", "Parametrli sorğular", "Cədvəl adını gizlətmək"], answer: 1, why: "Dəyər koddan ayrı göndərilir və icra oluna bilmir." },
        ],
      },
    ],
    exercise: {
      task: "kurslar cədvəlindən bütün sütunları, sonra telebeler cədvəlindən yalnız ad, soyad və yas sütunlarını seçən iki sorğu yaz.",
      starter: `-- 1) kurslar\n\n-- 2) telebeler: ad, soyad, yas\n`,
      expect: "SELECT * FROM kurslar; və SELECT ad, soyad, yas FROM telebeler; — vergüllər düzgün, nöqtəli vergüllə ayrılıb.",
    },
  },
  {
    slug: "select",
    title: "SELECT",
    intro: "SELECT bazadan məlumat oxuyur. Sütun seçmək, ləqəb vermək, hesablamaq, təkrarları silmək — SQL-in 80%-i SELECT-dir.",
    sections: [
      {
        level: "baslangic",
        title: "Sütunlar və ləqəblər",
        blocks: [
          { t: "analogy", text: "SELECT — restoranda menyudan sifarişdir: «Mənə ad və şəhər gətirin (SELECT ad, seher), telebeler mətbəxindən (FROM telebeler)». AS — boşqaba yapışdırılan adlıq." },
          { t: "code", lang: "sql", code: `SELECT ad, soyad FROM telebeler;

SELECT ad AS "Tələbə", yas AS "Yaş" FROM telebeler;

-- Hesablanan sütun
SELECT ad, saat, saat * 60 AS deqiqe FROM kurslar;

-- Mətnləri birləşdirmək (SQLite / PostgreSQL)
SELECT ad || ' ' || soyad AS tam_ad FROM telebeler;

-- Təkrarsız
SELECT DISTINCT seher FROM telebeler;` },
          { t: "terms", items: [
            ["SELECT", "hansı sütunlar."],
            ["FROM", "hansı cədvəldən."],
            ["*", "bütün sütunlar."],
            ["AS", "ləqəb (alias) — nəticədəki sütun adı."],
            ["DISTINCT", "təkrarlanan sətirləri silir."],
            ["||", "mətn birləşdirmə (MySQL-də CONCAT())."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Funksiyalar və CASE",
        blocks: [
          { t: "code", lang: "sql", code: `SELECT UPPER(ad), LENGTH(soyad), yas + 1 AS gelen_il FROM telebeler;

SELECT ad,
       CASE
         WHEN yas < 20 THEN 'gənc'
         WHEN yas < 23 THEN 'orta'
         ELSE 'böyük'
       END AS qrup
FROM telebeler;

SELECT ad, COALESCE(seher, 'naməlum') AS seher FROM telebeler;` },
          { t: "list", items: [
            "Sətir funksiyaları: UPPER, LOWER, LENGTH, SUBSTR, TRIM, REPLACE.",
            "Ədəd: ROUND, ABS; tarix: DATE, NOW() (DBMS-ə görə fərqlənir).",
            "CASE — SQL-in if/else-i.",
            "COALESCE(a, b) — a NULL-dursa b.",
          ]},
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM telebeler;  -- tətbiq kodunda`, right: `SELECT id, ad, soyad FROM telebeler;`, why: "* lazımsız sütunları (bəzən parol hash-i!) şəbəkə ilə daşıyır, cədvələ sütun əlavə olunanda kod sınır və indeksdən tam istifadə olunmur. Yalnız lazım olanı seç." },
          { t: "mistake", lang: "sql", wrong: `SELECT ad AS Tələbə Adı FROM telebeler;`, right: `SELECT ad AS "Tələbə adı" FROM telebeler;`, why: "Boşluqlu ləqəb dırnaq içində olmalıdır. Standartda identifikator — cüt dırnaq, mətn — tək dırnaq." },
        ],
      },
      {
        level: "senior",
        title: "Məntiqi icra sırası",
        blocks: [
          { t: "p", text: "SQL yazıldığı sırada icra olunmur. Məntiqi sıra: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT. Buna görə WHERE-də SELECT-dəki ləqəbi işlədə bilmirsən (hələ yaranmayıb), amma ORDER BY-da işlədə bilirsən." },
          { t: "list", items: [
            "Projection (sütun seçimi) az olanda baza «covering index» ilə cədvələ heç toxunmadan cavab verə bilər.",
            "DISTINCT sıralama/hash tələb edir — böyük cədvəldə bahalıdır; çox vaxt düzgün JOIN və ya GROUP BY ilə əvəzlənir.",
            "Təhlükəsizlik: API-də SELECT * ilə qaytarılan obyekt parol hash-i, token, daxili qeydləri sızdıra bilər (excessive data exposure, OWASP API3). Cavab üçün açıq sütun siyahısı və ya DTO işlət.",
            "İdentifikatorları (sütun adı) parametrləmək olmur — istifadəçi «sort by» sütun seçirsə, ağ siyahı (whitelist) ilə yoxla.",
          ]},
          { t: "qa", items: [
            ["Niyə WHERE-də alias işləmir?", "WHERE SELECT-dən əvvəl icra olunur — alias hələ mövcud deyil."],
            ["SELECT * niyə tövsiyə olunmur?", "Lazımsız data, kövrək kod, indeks optimallaşdırmasının itməsi və məlumat sızması riski."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı sorğu şəhərləri təkrarsız qaytarır?", options: ["SELECT seher FROM telebeler", "SELECT DISTINCT seher FROM telebeler", "SELECT UNIQUE * FROM telebeler"], answer: 1, why: "DISTINCT təkrarları silir." },
        ],
      },
    ],
    exercise: {
      task: "telebeler-dən tam adı (ad + soyad) \"tam_ad\" ləqəbi ilə və yaşa görə CASE ilə qrup (20-dən kiçik 'gənc', qalanı 'böyük') qaytaran sorğu yaz. Sonra şəhərləri təkrarsız göstər.",
      starter: `-- 1)\n\n-- 2)\n`,
      expect: "ad || ' ' || soyad AS tam_ad; CASE WHEN yas < 20 THEN 'gənc' ELSE 'böyük' END AS ...; SELECT DISTINCT seher FROM telebeler.",
    },
  },
  {
    slug: "where",
    title: "WHERE və filtrləmə",
    intro: "WHERE sətirləri şərtə görə süzür: «yalnız Bakıdan olanlar», «yaşı 20-dən böyük», «adı A ilə başlayan».",
    sections: [
      {
        level: "baslangic",
        title: "Müqayisə və məntiq",
        blocks: [
          { t: "analogy", text: "WHERE — klubun qapısındakı mühafizəçidir: siyahıdakı şərtə uyan (yaş ≥ 18) içəri keçir, qalanları kənarda qalır." },
          { t: "code", lang: "sql", code: `SELECT * FROM telebeler WHERE seher = 'Bakı';
SELECT * FROM telebeler WHERE yas > 20;
SELECT * FROM telebeler WHERE yas >= 20 AND seher = 'Gəncə';
SELECT * FROM telebeler WHERE seher = 'Bakı' OR seher = 'Sumqayıt';
SELECT * FROM telebeler WHERE NOT seher = 'Bakı';` },
          { t: "terms", items: [
            ["=, <>, !=", "bərabər, bərabər deyil."],
            [">, <, >=, <=", "böyük, kiçik..."],
            ["AND", "iki şərt də doğru."],
            ["OR", "ən azı biri doğru."],
            ["NOT", "inkar."],
            ["'Bakı'", "mətn dəyərləri TƏK dırnaqda."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "IN, BETWEEN, LIKE, IS NULL",
        blocks: [
          { t: "code", lang: "sql", code: `SELECT * FROM telebeler WHERE seher IN ('Bakı', 'Gəncə');
SELECT * FROM telebeler WHERE yas BETWEEN 20 AND 22;   -- hər iki uc daxil
SELECT * FROM telebeler WHERE ad LIKE 'A%';            -- A ilə başlayan
SELECT * FROM telebeler WHERE soyad LIKE '%ova';       -- ova ilə bitən
SELECT * FROM telebeler WHERE ad LIKE '_u%';           -- 2-ci hərfi u
SELECT * FROM telebeler WHERE seher IS NULL;` },
          { t: "list", items: [
            "% — istənilən sayda simvol, _ — tam bir simvol.",
            "NULL «naməlum» deməkdir: = NULL həmişə naməlum qaytarır, IS NULL / IS NOT NULL yaz.",
            "AND OR-dan əvvəl icra olunur — qarışıq şərtlərdə mötərizə qoy.",
          ]},
          { t: "mistake", lang: "sql", wrong: `WHERE seher = 'Bakı' OR seher = 'Gəncə' AND yas > 21`, right: `WHERE (seher = 'Bakı' OR seher = 'Gəncə') AND yas > 21`, why: "AND əvvəl hesablanır: «Bakılı hamı VƏ YA 21-dən böyük Gəncəlilər» olur. Mötərizə niyyəti dəqiq edir." },
          { t: "mistake", lang: "sql", wrong: `WHERE seher = NULL`, right: `WHERE seher IS NULL`, why: "NULL heç nəyə, hətta özünə bərabər deyil — nəticə həmişə boş olur." },
        ],
      },
      {
        level: "senior",
        title: "Sargable şərtlər və təhlükəsiz filtrlər",
        blocks: [
          { t: "p", text: "İndeksdən istifadə edə bilən şərtə «sargable» (Search ARGument ABLE) deyilir. WHERE yas > 20 indeksdən istifadə edir; WHERE yas + 1 > 21 və ya WHERE UPPER(ad) = 'AYSEL' — sütun funksiyaya bükülüb, baza hər sətri hesablamalıdır (full scan)." },
          { t: "list", items: [
            "LIKE 'abc%' indeksdən istifadə edə bilir, LIKE '%abc' yox — tam mətn axtarışı (full-text index) lazımdır.",
            "Üçqiymətli məntiq: TRUE, FALSE, UNKNOWN. NOT IN (... NULL ...) heç bir sətir qaytarmır — NOT EXISTS daha etibarlıdır.",
            "Tarix aralığı üçün: tarix >= '2026-01-01' AND tarix < '2026-02-01' (BETWEEN saatlı tarixdə son günü itirə bilər).",
            "Təhlükəsizlik: LIKE-a istifadəçi mətni ötürəndə % və _ simvollarını escape et — yoxsa istifadəçi '%' göndərib bütün cədvəli çəkə bilər; həmçinin LIMIT qoy.",
            "Təhlükəsizlik: çox kirayəçili (multi-tenant) sistemdə HƏR sorğuda WHERE tenant_id = ? olmalıdır — unudulsa bir müştəri digərinin məlumatını görür (IDOR). PostgreSQL Row Level Security bunu bazada məcburi edir.",
          ]},
          { t: "qa", items: [
            ["Sargable nədir?", "İndeksdən istifadə edə bilən şərt — sütun dəyişdirilmədən müqayisə olunur."],
            ["NOT IN və NULL problemi?", "Alt sorğuda NULL varsa NOT IN UNKNOWN qaytarır və nəticə boş olur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Adı 'L' ilə başlayan tələbələr:", options: ["ad = 'L%'", "ad LIKE 'L%'", "ad LIKE '%L'"], answer: 1, why: "LIKE + % şablonu, % sonda." },
          { t: "quiz", q: "Şəhəri boş (NULL) olanlar:", options: ["seher = NULL", "seher IS NULL", "seher = ''"], answer: 1, why: "NULL yalnız IS NULL ilə yoxlanır." },
        ],
      },
    ],
    exercise: {
      task: "1) Bakı və ya Gəncədən olan, yaşı 20-dən böyük tələbələr (IN və ya mötərizəli OR). 2) Soyadı 'ova' ilə bitənlər. 3) Yaşı 19–21 arası olanlar (BETWEEN).",
      starter: `-- 1)\n\n-- 2)\n\n-- 3)\n`,
      expect: "1) seher IN ('Bakı','Gəncə') AND yas > 20 (və ya mötərizəli OR) → Murad, Leyla; 2) LIKE '%ova' → Aysel, Nərmin, Leyla; 3) BETWEEN 19 AND 21.",
    },
  },
  {
    slug: "order",
    title: "ORDER BY və LIMIT",
    intro: "Nəticəni sıralamaq (ən yüksək bal, ən yeni xəbər) və sayını məhdudlaşdırmaq (ilk 10) — reytinqlər və səhifələmə üçün.",
    sections: [
      {
        level: "baslangic",
        title: "Sıralama",
        blocks: [
          { t: "analogy", text: "ORDER BY — idman yarışının nəticə lövhəsidir: xala görə azalan (DESC). LIMIT 3 — pyedestala yalnız ilk üç nəfər çıxır." },
          { t: "code", lang: "sql", code: `SELECT ad, yas FROM telebeler ORDER BY yas;           -- artan (ASC default)
SELECT ad, yas FROM telebeler ORDER BY yas DESC;      -- azalan
SELECT ad, seher, yas FROM telebeler ORDER BY seher, yas DESC; -- əvvəl şəhər, sonra yaş

SELECT ad, saat FROM kurslar ORDER BY saat DESC LIMIT 2;  -- ən uzun 2 kurs` },
          { t: "terms", items: [
            ["ORDER BY", "sıralama sütunu."],
            ["ASC", "ascending — artan (A→Z, 1→9)."],
            ["DESC", "descending — azalan."],
            ["LIMIT n", "ilk n sətir."],
            ["OFFSET n", "ilk n sətri ötür."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Səhifələmə",
        blocks: [
          { t: "code", lang: "sql", code: `-- Hər səhifədə 2 tələbə, 2-ci səhifə
SELECT id, ad FROM telebeler ORDER BY id LIMIT 2 OFFSET 2;

-- SQL Server: ORDER BY id OFFSET 2 ROWS FETCH NEXT 2 ROWS ONLY
-- Köhnə SQL Server: SELECT TOP 2 ...` },
          { t: "list", items: [
            "ORDER BY olmadan sətirlərin sırası ZƏMANƏTLİ DEYİL — eyni sorğu fərqli sıra qaytara bilər.",
            "Səhifələmədə sıralama unikal olmalıdır (ORDER BY bal DESC, id) — yoxsa bərabər ballılar səhifələr arasında «itir» və ya təkrarlanır.",
            "NULL-lar sıralamada DBMS-ə görə əvvəldə və ya sonda olur: NULLS LAST ilə idarə et (PostgreSQL).",
          ]},
          { t: "mistake", lang: "sql", wrong: `SELECT ad FROM telebeler LIMIT 3;  -- "ən yaşlı 3"`, right: `SELECT ad FROM telebeler ORDER BY yas DESC LIMIT 3;`, why: "ORDER BY-sız LIMIT təsadüfi 3 sətir verir." },
        ],
      },
      {
        level: "senior",
        title: "OFFSET problemi və keyset pagination",
        blocks: [
          { t: "p", text: "OFFSET 100000 olanda baza 100 000 sətri oxuyub atır, sonra lazım olanı verir — səhifə dərinləşdikcə yavaşlayır. Həm də səhifələr arasında yeni qeyd əlavə olunanda elementlər sürüşür. Həll: keyset (cursor) pagination — son görülən dəyərdən davam et." },
          { t: "code", lang: "sql", code: `-- Əvvəlki səhifənin son id-si 2 idi
SELECT id, ad FROM telebeler
WHERE id > 2
ORDER BY id
LIMIT 2;` },
          { t: "list", items: [
            "Keyset indeks ilə birbaşa lazım olan yerə «tullanır» — hər səhifə eyni sürətdədir. Sonsuz scroll üçün idealdır.",
            "ORDER BY + LIMIT üçün indeks (ORDER BY sütunu üzrə) sıralamanı tamamilə aradan qaldırır (top-N).",
            "Təhlükəsizlik: istifadəçidən gələn limit dəyərini məhdudlaşdır (məs. max 100) — ?limit=10000000 serveri və bazanı çökdürə bilər.",
            "Təhlükəsizlik: istifadəçi sıralama sütununu seçirsə (?sort=yas), sütun adını parametrləmək mümkün deyil — ağ siyahı ilə yoxla, yoxsa ORDER BY vasitəsilə SQL injection mümkündür.",
          ]},
          { t: "qa", items: [
            ["OFFSET pagination-ın problemləri?", "Dərin səhifələrdə yavaşlıq və məlumat dəyişəndə sürüşmə/təkrar."],
            ["ORDER BY olmadan sıra?", "Təyin olunmayıb — plan, paralellik və fiziki yerləşmədən asılıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Ən gənc tələbəni tapmaq üçün:", options: ["ORDER BY yas DESC LIMIT 1", "ORDER BY yas LIMIT 1", "LIMIT 1"], answer: 1, why: "Artan sıralamada birinci ən kiçik yaşdır." },
        ],
      },
    ],
    exercise: {
      task: "1) Tələbələri şəhərə görə (A→Z), eyni şəhərdə yaşa görə azalan sırala. 2) Ən uzun (saat) 2 kursu göstər. 3) id-yə görə sıralayıb 2-ci səhifəni (səhifədə 2 nəfər) göstər.",
      starter: `-- 1)\n\n-- 2)\n\n-- 3)\n`,
      expect: "1) ORDER BY seher, yas DESC; 2) kurslar ORDER BY saat DESC LIMIT 2 → C#, JavaScript; 3) ORDER BY id LIMIT 2 OFFSET 2 → Nərmin, Tural.",
    },
  },
  {
    slug: "aqreqat",
    title: "Aqreqat funksiyalar",
    intro: "COUNT, SUM, AVG, MIN, MAX bir çox sətri bir dəyərə yığır: «neçə tələbə var?», «orta bal neçədir?».",
    sections: [
      {
        level: "baslangic",
        title: "5 əsas funksiya",
        blocks: [
          { t: "analogy", text: "Sinif jurnalına baxan direktor hər tələbəni yox, yekunu soruşur: neçə nəfər (COUNT), cəmi bal (SUM), orta (AVG), ən aşağı (MIN), ən yüksək (MAX)." },
          { t: "code", lang: "sql", code: `SELECT COUNT(*) AS say FROM telebeler;          -- 5
SELECT AVG(yas) AS orta_yas FROM telebeler;     -- 21.2
SELECT MIN(yas), MAX(yas) FROM telebeler;       -- 19, 24
SELECT SUM(saat) AS cem_saat FROM kurslar;      -- 190
SELECT ROUND(AVG(bal), 1) FROM qeydiyyat;       -- ortalama, 1 rəqəm` },
          { t: "terms", items: [
            ["COUNT(*)", "sətirlərin sayı."],
            ["COUNT(sütun)", "həmin sütunda NULL OLMAYAN dəyərlərin sayı."],
            ["SUM / AVG", "cəm / orta."],
            ["MIN / MAX", "ən kiçik / ən böyük (mətnlərdə əlifba sırası ilə)."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "NULL və WHERE ilə",
        blocks: [
          { t: "code", lang: "sql", code: `SELECT COUNT(*) FROM telebeler WHERE seher = 'Bakı';     -- 2
SELECT COUNT(DISTINCT seher) FROM telebeler;             -- 3 fərqli şəhər
SELECT AVG(bal) FROM qeydiyyat WHERE kurs_id = 2;        -- JavaScript kursunun ortası` },
          { t: "list", items: [
            "Aqreqatlar NULL-u nəzərə almır: AVG(bal) NULL balları ortaya qatmır (0 kimi saymır).",
            "Boş cədvəldə COUNT 0, SUM/AVG isə NULL qaytarır — COALESCE(SUM(x), 0).",
            "WHERE aqreqatdan ƏVVƏL işləyir — əvvəl süzür, sonra sayır.",
          ]},
          { t: "mistake", lang: "sql", wrong: `SELECT ad, MAX(yas) FROM telebeler;`, right: `SELECT ad, yas FROM telebeler ORDER BY yas DESC LIMIT 1;`, why: "Aqreqatla adi sütunu qarışdırmaq standarta ziddir (PostgreSQL xəta verir, SQLite/MySQL təsadüfi ad qaytara bilər). Ən böyüyün sətrini istəyirsənsə — ORDER BY + LIMIT və ya alt sorğu." },
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM qeydiyyat WHERE bal > AVG(bal);`, right: `SELECT * FROM qeydiyyat WHERE bal > (SELECT AVG(bal) FROM qeydiyyat);`, why: "WHERE-də aqreqat işlətmək olmaz — hələ hesablanmayıb. Alt sorğu ilə əvvəlcə ortanı tap." },
        ],
      },
      {
        level: "senior",
        title: "Dəqiqlik, performans, filtrli aqreqat",
        blocks: [
          { t: "code", lang: "sql", code: `-- Bir sorğuda bir neçə şərtli say (PostgreSQL: FILTER)
SELECT
  COUNT(*) AS hamisi,
  SUM(CASE WHEN bal >= 90 THEN 1 ELSE 0 END) AS ela,
  SUM(CASE WHEN bal < 70 THEN 1 ELSE 0 END) AS zeif
FROM qeydiyyat;` },
          { t: "list", items: [
            "Tam ədədlərin AVG-si bəzi DBMS-lərdə (SQL Server) tam ədəd qaytarır: AVG(bal * 1.0) və ya CAST.",
            "Pul üçün FLOAT yox, DECIMAL/NUMERIC — yuvarlaqlaşdırma xətaları toplananda böyüyür.",
            "Böyük cədvəldə COUNT(*) PostgreSQL-də tam scan edir (MVCC); təxmini say üçün statistikadan oxu, dəqiq say lazım deyilsə.",
            "Təhlükəsizlik və məxfilik: aqreqat statistika da məlumat sızdıra bilər — qrupda 1–2 nəfər olanda «orta maaş» fərdi maaşı açır. Hesabatlarda minimum qrup ölçüsü (k-anonimlik) tətbiq et.",
          ]},
          { t: "qa", items: [
            ["COUNT(*) ilə COUNT(sütun) fərqi?", "COUNT(*) bütün sətirləri, COUNT(sütun) yalnız NULL olmayanları sayır."],
            ["Aqreqat NULL-larla necə davranır?", "NULL-ları atır; hamısı NULL-dursa SUM/AVG NULL qaytarır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Neçə fərqli şəhər var?", options: ["COUNT(seher)", "COUNT(DISTINCT seher)", "SUM(seher)"], answer: 1, why: "DISTINCT təkrarları atır." },
        ],
      },
    ],
    exercise: {
      task: "qeydiyyat cədvəlindən: ümumi qeydiyyat sayı, orta bal (1 rəqəmə yuvarlaq), ən yüksək və ən aşağı bal — hamısı BİR sorğuda, ləqəblərlə. Sonra ortadan yüksək ballı qeydləri alt sorğu ilə göstər.",
      starter: `-- 1)\n\n-- 2)\n`,
      expect: "1) COUNT(*) AS ..., ROUND(AVG(bal), 1), MAX(bal), MIN(bal) bir sorğuda → 8, 83.5, 99, 60; 2) WHERE bal > (SELECT AVG(bal) FROM qeydiyyat).",
    },
  },
  {
    slug: "group",
    title: "GROUP BY və HAVING",
    intro: "GROUP BY sətirləri qruplara bölür və hər qrup üçün aqreqat hesablayır: «hər şəhərdə neçə tələbə?», «hər kursun orta balı?».",
    sections: [
      {
        level: "baslangic",
        title: "Qruplaşdırma",
        blocks: [
          { t: "analogy", text: "Müəllim tələbələri şəhərlərinə görə ayrı masalara oturdur (GROUP BY seher), sonra hər masada sayır (COUNT). HAVING — «yalnız 2-dən çox adam olan masaları göstər»." },
          { t: "code", lang: "sql", code: `SELECT seher, COUNT(*) AS say
FROM telebeler
GROUP BY seher;
-- Bakı 2, Gəncə 2, Sumqayıt 1

SELECT kurs_id, ROUND(AVG(bal), 1) AS orta
FROM qeydiyyat
GROUP BY kurs_id
HAVING AVG(bal) > 80;` },
          { t: "terms", items: [
            ["GROUP BY", "eyni dəyərli sətirləri bir qrupa yığır."],
            ["HAVING", "QRUPLARI süzür (aqreqat şərti ilə)."],
            ["WHERE", "SƏTİRLƏRİ qruplaşdırmadan ƏVVƏL süzür."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "WHERE + GROUP BY + HAVING + ORDER BY",
        blocks: [
          { t: "code", lang: "sql", code: `SELECT seher, COUNT(*) AS say, AVG(yas) AS orta_yas
FROM telebeler
WHERE yas >= 20          -- 1. sətirləri süz
GROUP BY seher           -- 2. qruplaşdır
HAVING COUNT(*) >= 1     -- 3. qrupları süz
ORDER BY say DESC;       -- 4. sırala` },
          { t: "list", items: [
            "Qayda: SELECT-də aqreqat olmayan HƏR sütun GROUP BY-da olmalıdır.",
            "Bir neçə sütunla: GROUP BY seher, yas — hər unikal cüt bir qrupdur.",
            "Şərt aqreqatsızdırsa WHERE-ə yaz (daha sürətli — az sətir qruplaşır); aqreqatlıdırsa HAVING-ə.",
          ]},
          { t: "mistake", lang: "sql", wrong: `SELECT seher, ad, COUNT(*) FROM telebeler GROUP BY seher;`, right: `SELECT seher, COUNT(*) FROM telebeler GROUP BY seher;`, why: "Bir qrupda bir neçə ad var — hansını göstərsin? Standart SQL xəta verir; SQLite/köhnə MySQL təsadüfi birini seçir (gizli bug)." },
          { t: "mistake", lang: "sql", wrong: `SELECT kurs_id, AVG(bal) FROM qeydiyyat WHERE AVG(bal) > 80 GROUP BY kurs_id;`, right: `SELECT kurs_id, AVG(bal) FROM qeydiyyat GROUP BY kurs_id HAVING AVG(bal) > 80;`, why: "WHERE qruplaşmadan əvvəl işləyir — aqreqat orada hələ yoxdur." },
        ],
      },
      {
        level: "senior",
        title: "Daxildə necə işləyir, ROLLUP",
        blocks: [
          { t: "p", text: "Baza qruplaşdırmanı iki yolla edir: hash aggregate (hər qrup üçün hash cədvəlində sayğac — sırasız, yaddaş tələb edir) və sort/stream aggregate (əvvəl sıralayır, sonra ardıcıl sayır — indeks varsa sıralama pulsuzdur). EXPLAIN-də HashAggregate / GroupAggregate görəcəksən." },
          { t: "code", lang: "sql", code: `-- Ara cəmlər və ümumi cəm (PostgreSQL, SQL Server, MySQL WITH ROLLUP)
SELECT seher, COUNT(*) FROM telebeler GROUP BY ROLLUP(seher);

-- Qrupdakı adları bir sətirdə birləşdir
SELECT seher, GROUP_CONCAT(ad, ', ') AS adlar FROM telebeler GROUP BY seher;  -- SQLite/MySQL
-- PostgreSQL: STRING_AGG(ad, ', ')` },
          { t: "list", items: [
            "Çox unikal dəyərli sütunla qruplaşdırma (user_id, milyonlarla) hash cədvəlini diskə «tökə» bilər — work_mem/indeks/ön-aqreqasiya.",
            "Hesabat cədvəlləri (materialized view) ağır GROUP BY-ları əvvəlcədən hesablayıb saxlayır.",
            "Təhlükəsizlik: hesabat endpoint-lərində istifadəçinin seçdiyi qruplaşdırma sütununu ağ siyahı ilə yoxla; ağır GROUP BY sorğularına timeout (statement_timeout) qoy — yoxsa bir istifadəçi bazanı «asar».",
          ]},
          { t: "qa", items: [
            ["WHERE ilə HAVING fərqi?", "WHERE sətirləri qruplaşdırmadan əvvəl, HAVING qrupları aqreqatdan sonra süzür."],
            ["GROUP BY-da hansı sütunlar olmalıdır?", "SELECT-dəki bütün aqreqat olmayan sütunlar."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "«3-dən çox tələbəsi olan şəhərlər» şərti harada yazılır?", options: ["WHERE COUNT(*) > 3", "HAVING COUNT(*) > 3", "ORDER BY COUNT(*) > 3"], answer: 1, why: "Qrup şərti — HAVING." },
        ],
      },
    ],
    exercise: {
      task: "1) Hər şəhərdə neçə tələbə olduğunu azalan sırada göstər. 2) Hər tələbənin (telebe_id) neçə kursa yazıldığını və orta balını göstər, yalnız 2 və daha çox kursu olanlar.",
      starter: `-- 1)\n\n-- 2)\n`,
      expect: "1) GROUP BY seher, COUNT(*), ORDER BY ... DESC; 2) qeydiyyat GROUP BY telebe_id, COUNT(*), AVG(bal), HAVING COUNT(*) >= 2 → telebe 1, 3, 5.",
    },
  },
  {
    slug: "join",
    title: "JOIN-lər",
    intro: "Məlumat bir neçə cədvələ bölünür ki, təkrarlanmasın. JOIN onları sorğu zamanı birləşdirir: «Aysel hansı kurslara yazılıb, balı neçədir?»",
    sections: [
      {
        level: "baslangic",
        title: "INNER JOIN",
        blocks: [
          { t: "analogy", text: "Bir dəftərdə tələbələr (id, ad), digərində qeydiyyatlar (telebe_id, kurs_id, bal). JOIN — iki dəftəri yan-yana qoyub eyni nömrəli sətirləri xətlə birləşdirməkdir: telebeler.id = qeydiyyat.telebe_id." },
          { t: "code", lang: "sql", code: `SELECT t.ad, k.ad AS kurs, q.bal
FROM qeydiyyat q
JOIN telebeler t ON t.id = q.telebe_id
JOIN kurslar  k ON k.id = q.kurs_id
ORDER BY t.ad;` },
          { t: "terms", items: [
            ["JOIN (INNER JOIN)", "yalnız hər iki cədvəldə uyğunluğu olan sətirlər."],
            ["ON", "birləşdirmə şərti — adətən açarların bərabərliyi."],
            ["t, k, q", "cədvəl ləqəbləri — qısa və oxunaqlı."],
            ["t.ad", "hansı cədvəlin sütunu — eyni adlı sütunlar (ad) olanda mütləqdir."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "LEFT JOIN və «olmayanları» tapmaq",
        blocks: [
          { t: "code", lang: "sql", code: `-- Hər kurs və neçə tələbəsi var (tələbəsiz kurslar da görünsün)
SELECT k.ad, COUNT(q.telebe_id) AS telebe_sayi
FROM kurslar k
LEFT JOIN qeydiyyat q ON q.kurs_id = k.id
GROUP BY k.id, k.ad;

-- Heç bir kursa yazılmayan tələbələr
SELECT t.ad
FROM telebeler t
LEFT JOIN qeydiyyat q ON q.telebe_id = t.id
WHERE q.telebe_id IS NULL;` },
          { t: "list", items: [
            "LEFT JOIN — soldakı cədvəlin BÜTÜN sətirləri; sağda uyğunluq yoxdursa NULL.",
            "RIGHT JOIN — tərsi (praktikada cədvəlləri yerini dəyişib LEFT yazırlar).",
            "FULL OUTER JOIN — hər iki tərəfin hamısı.",
            "CROSS JOIN — hər sətir hər sətirlə (Dekart hasili): 1000 × 1000 = 1 milyon!",
          ]},
          { t: "mistake", lang: "sql", wrong: `SELECT k.ad, q.bal FROM kurslar k\nLEFT JOIN qeydiyyat q ON q.kurs_id = k.id\nWHERE q.bal > 80;`, right: `SELECT k.ad, q.bal FROM kurslar k\nLEFT JOIN qeydiyyat q ON q.kurs_id = k.id AND q.bal > 80;`, why: "Sağ cədvəlin şərtini WHERE-ə yazanda NULL sətirlər süzülür və LEFT JOIN gizlicə INNER JOIN-ə çevrilir." },
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM telebeler, qeydiyyat;`, right: `SELECT * FROM telebeler t JOIN qeydiyyat q ON q.telebe_id = t.id;`, why: "ON şərti unudulanda CROSS JOIN olur — 5 × 8 = 40 mənasız sətir." },
        ],
      },
      {
        level: "senior",
        title: "JOIN alqoritmləri və N+1",
        blocks: [
          { t: "p", text: "Optimizator üç alqoritmdən birini seçir: Nested Loop (kiçik cədvəl × indeksli böyük cədvəl), Hash Join (böyük cədvəllər, bərabərlik şərti — kiçiyindən hash cədvəli qurur), Merge Join (hər ikisi sıralıdırsa). Foreign key sütunlarında indeks yoxdursa JOIN-lər tam scan olur — FK-ya indeks qoymaq ən çox unudulan optimallaşdırmadır." },
          { t: "list", items: [
            "N+1 problemi: 100 tələbəni çəkib hər biri üçün ayrıca «kurslarını gətir» sorğusu = 101 sorğu. Bir JOIN və ya IN (...) ilə 1–2 sorğu. ORM-də Include/eager loading.",
            "Bir-çox (1:N) JOIN sətirləri çoxaldır — sonra SUM etsən rəqəmlər şişir (fan-out). Əvvəl alt sorğuda aqreqat et, sonra JOIN.",
            "SELF JOIN — cədvəl özü ilə: işçi və onun meneceri eyni cədvəldə.",
            "Təhlükəsizlik: JOIN ilə əlaqəli məlumat çəkəndə yetki şərtini də JOIN/WHERE-ə daxil et (məs. q.telebe_id = :cari_user). Yalnız ana cədvəli yoxlayıb əlaqəlini yoxlamamaq başqasının məlumatını açır (IDOR).",
          ]},
          { t: "qa", items: [
            ["INNER və LEFT JOIN fərqi?", "INNER yalnız uyğunluğu olanları, LEFT soldakıların hamısını qaytarır (uyğunsuzda NULL)."],
            ["N+1 problemi nədir?", "Siyahı üçün 1 sorğu + hər element üçün ayrıca sorğu; JOIN/eager loading ilə həll olunur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Tələbəsi olmayan kursları da göstərmək üçün kurslar-dan başlayıb hansı JOIN?", options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN"], answer: 1, why: "LEFT JOIN soldakı bütün sətirləri saxlayır." },
        ],
      },
    ],
    exercise: {
      task: "1) Hər qeydiyyat üçün tələbənin tam adı, kursun adı və bal (3 cədvəl JOIN), bala görə azalan. 2) Hər kurs üçün orta bal (kurs adı ilə).",
      starter: `-- 1)\n\n-- 2)\n`,
      expect: "1) qeydiyyat JOIN telebeler ON id = telebe_id JOIN kurslar ON id = kurs_id, ləqəblər, ORDER BY bal DESC — ilk Leyla SQL 99; 2) JOIN + GROUP BY k.id/k.ad + AVG(bal).",
    },
  },
  {
    slug: "insert-update",
    title: "INSERT, UPDATE, DELETE",
    intro: "Məlumatı əlavə etmək, dəyişmək və silmək. Ən təhlükəli SQL sətirləri buradadır: WHERE-siz UPDATE bütün cədvəli dəyişir.",
    sections: [
      {
        level: "baslangic",
        title: "Üç əmr",
        blocks: [
          { t: "analogy", text: "INSERT — jurnala yeni tələbə yazmaq. UPDATE — pozanla düzəliş etmək. DELETE — sətri silmək. WHERE — HANSI sətir olduğunu göstərən barmaq; barmaqsız düzəliş bütün jurnalı korlayır." },
          { t: "code", lang: "sql", code: `INSERT INTO telebeler (ad, soyad, yas, seher)
VALUES ('Kamran', 'Rzayev', 23, 'Şəki');

INSERT INTO kurslar (ad, saat) VALUES ('Python', 50), ('React', 40);

UPDATE telebeler SET yas = 21, seher = 'Bakı' WHERE id = 3;

DELETE FROM qeydiyyat WHERE telebe_id = 4;

SELECT * FROM telebeler;  -- dəyişikliyi gör` },
          { t: "terms", items: [
            ["INSERT INTO ... VALUES", "yeni sətir(lər) əlavə edir."],
            ["UPDATE ... SET", "mövcud sətirləri dəyişir."],
            ["DELETE FROM", "sətirləri silir."],
            ["WHERE", "HANSI sətirlər — UPDATE/DELETE-də həyati vacibdir."],
          ]},
          { t: "tip", text: "Məşq səhifəsində baza hər işə salmada yenidən yaranır — rahat sınaq et, heç nə xarab olmur." },
        ],
      },
      {
        level: "orta",
        title: "Təhlükəsiz dəyişiklik vərdişləri",
        blocks: [
          { t: "list", items: [
            "UPDATE/DELETE-dən əvvəl eyni WHERE ilə SELECT yaz: nəyin dəyişəcəyini gör.",
            "INSERT-də sütun adlarını həmişə yaz — cədvələ sütun əlavə olunanda sorğu sınmasın.",
            "Çox sətirli INSERT tək-tək INSERT-dən dəfələrlə sürətlidir.",
            "Silmək əvəzinə «yumşaq silmə» (soft delete): UPDATE ... SET silinib = 1 — bərpa mümkündür.",
          ]},
          { t: "mistake", lang: "sql", wrong: `UPDATE telebeler SET seher = 'Bakı';`, right: `UPDATE telebeler SET seher = 'Bakı' WHERE id = 2;`, why: "WHERE unudulub — BÜTÜN tələbələr Bakılı oldu. Real bazada bu, ehtiyat nüsxədən bərpa deməkdir. Tranzaksiya içində işlə: BEGIN; ... yoxla ... COMMIT/ROLLBACK." },
          { t: "mistake", lang: "sql", wrong: `INSERT INTO kurslar VALUES (5, 'Go');`, right: `INSERT INTO kurslar (ad, saat) VALUES ('Go', 45);`, why: "Sütun sayı uyğun deyil (3 sütun var) və id-ni əl ilə yazmaq toqquşma yaradır — id-ni baza versin." },
        ],
      },
      {
        level: "senior",
        title: "UPSERT, RETURNING, kilidlər",
        blocks: [
          { t: "code", lang: "sql", code: `-- Varsa yenilə, yoxdursa əlavə et (PostgreSQL / SQLite)
INSERT INTO kurslar (id, ad, saat) VALUES (4, 'SQL', 35)
ON CONFLICT (id) DO UPDATE SET saat = excluded.saat;

-- Dəyişən sətirləri dərhal qaytar
UPDATE telebeler SET yas = yas + 1 WHERE seher = 'Bakı' RETURNING id, ad, yas;` },
          { t: "list", items: [
            "UPDATE/DELETE sətirləri kilidləyir; böyük DELETE (milyon sətir) uzun kilid və böyük log yaradır — hissə-hissə (batch) sil.",
            "TRUNCATE cədvəli tam və sürətlə boşaldır, amma trigger-ləri işə salmır və bəzi DBMS-lərdə geri qaytarılmır.",
            "Yarış vəziyyəti (race condition): «SELECT sonra UPDATE» əvəzinə atomik UPDATE ... SET stok = stok - 1 WHERE id = ? AND stok > 0.",
            "Təhlükəsizlik — mass assignment: istifadəçidən gələn JSON-u birbaşa UPDATE-ə çevirmə (SET {...body}) — istifadəçi \"rol\": \"admin\" əlavə edib özünü admin edə bilər. Dəyişdirilə bilən sahələri ağ siyahı ilə seç.",
            "Təhlükəsizlik — audit: kritik cədvəllərdə kim, nə vaxt, nəyi dəyişdi qeyd et (audit log / trigger).",
          ]},
          { t: "qa", items: [
            ["DELETE ilə TRUNCATE fərqi?", "DELETE sətir-sətir silir, WHERE qəbul edir, log yazır; TRUNCATE cədvəli tamamilə və tez boşaldır."],
            ["UPSERT nədir?", "Açar toqquşmasında INSERT əvəzinə UPDATE edən atomik əməliyyat."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "UPDATE telebeler SET yas = 30; nə edir?", options: ["Heç nə", "Birinci tələbəni dəyişir", "BÜTÜN tələbələrin yaşını 30 edir"], answer: 2, why: "WHERE olmadan bütün sətirlər dəyişir." },
        ],
      },
    ],
    exercise: {
      task: "1) Özünü telebeler-ə əlavə et (sütun adları ilə). 2) Murad-ın (id 2) şəhərini 'Bakı' et. 3) 70-dən aşağı balı olan qeydiyyatları sil. 4) Sonda SELECT ilə nəticəni yoxla.",
      starter: `-- 1)\n\n-- 2)\n\n-- 3)\n\n-- 4)\n`,
      expect: "INSERT INTO telebeler (ad, soyad, yas, seher) VALUES (...); UPDATE ... SET seher = 'Bakı' WHERE id = 2; DELETE FROM qeydiyyat WHERE bal < 70; hər UPDATE/DELETE-də WHERE var; SELECT ilə yoxlama.",
    },
  },
  {
    slug: "cedvel",
    title: "CREATE TABLE və tiplər",
    intro: "Cədvəl yaratmaq — məlumatın «müqaviləsini» yazmaqdır: hansı sütunlar, hansı tiplər, hansı qaydalar (boş ola bilməz, unikal olmalıdır).",
    sections: [
      {
        level: "baslangic",
        title: "Cədvəl yaratmaq",
        blocks: [
          { t: "analogy", text: "CREATE TABLE — boş blank çap etməkdir: «Ad: ____ (mütləq)», «Yaş: ____ (yalnız rəqəm)», «Email: ____ (təkrarlanmamalıdır)». Blank düzgün olanda yanlış məlumat yazmaq mümkün olmur." },
          { t: "code", lang: "sql", code: `CREATE TABLE muellimler (
  id        INTEGER PRIMARY KEY,
  ad        TEXT NOT NULL,
  email     TEXT NOT NULL UNIQUE,
  tecrube   INTEGER DEFAULT 0 CHECK (tecrube >= 0),
  yaradilib TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO muellimler (ad, email, tecrube) VALUES ('Rəşad', 'r@kod.az', 7);
SELECT * FROM muellimler;` },
          { t: "terms", items: [
            ["INTEGER / TEXT / REAL", "tam ədəd / mətn / kəsr (SQLite tipləri)."],
            ["PRIMARY KEY", "hər sətrin unikal identifikatoru."],
            ["NOT NULL", "boş qala bilməz."],
            ["UNIQUE", "təkrarlana bilməz."],
            ["DEFAULT", "dəyər verilməsə bu yazılır."],
            ["CHECK", "öz qaydan: tecrube >= 0."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Tiplər (PostgreSQL / MySQL / SQL Server) və ALTER",
        blocks: [
          { t: "list", items: [
            "Tam ədəd: INT, BIGINT (ID-lər üçün böyük cədvəllərdə BIGINT).",
            "Mətn: VARCHAR(n) — limitli, TEXT — uzun. SQL Server-də Unicode üçün NVARCHAR (Azərbaycan hərfləri!).",
            "Pul: DECIMAL(10, 2) — heç vaxt FLOAT.",
            "Tarix: DATE, TIMESTAMP / TIMESTAMPTZ (saat qurşağı ilə), SQL Server-də DATETIME2.",
            "Məntiqi: BOOLEAN (MySQL-də TINYINT(1), SQL Server-də BIT).",
            "UUID, JSON/JSONB (PostgreSQL) — xüsusi hallar üçün.",
          ]},
          { t: "code", lang: "sql", code: `ALTER TABLE muellimler ADD COLUMN telefon TEXT;
ALTER TABLE muellimler RENAME TO ustadlar;
DROP TABLE IF EXISTS kohne_cedvel;` },
          { t: "mistake", lang: "sql", wrong: `CREATE TABLE sifaris (mebleg FLOAT, tarix TEXT);`, right: `CREATE TABLE sifaris (mebleg DECIMAL(10,2) NOT NULL, tarix TIMESTAMP NOT NULL);`, why: "FLOAT pulda qəpik itirir; tarixi mətn kimi saxlamaq sıralamanı, müqayisəni və validasiyanı pozur." },
          { t: "mistake", lang: "sql", wrong: `CREATE TABLE users (email TEXT);`, right: `CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE);`, why: "Açarsız, qaydasız cədvəl dublikat və boş qeydlərlə dolur. Qaydaları tətbiqdə yox, bazada da qoy — bazaya hər yerdən yazıla bilər." },
        ],
      },
      {
        level: "senior",
        title: "Sxem dizaynı və təhlükəsiz saxlama",
        blocks: [
          { t: "list", items: [
            "Constraint-lər son müdafiə xəttidir: tətbiqdə bug olsa da baza yanlış məlumatı qəbul etmir.",
            "Böyük cədvəldə ALTER TABLE cədvəli kilidləyə bilər; istehsalda (production) miqrasiyalar «onlayn» planlanır: əvvəl nullable sütun əlavə et, doldur, sonra NOT NULL.",
            "Ardıcıl INT ID-lər URL-də resurs sayını və digər istifadəçilərin ID-lərini təxmin etməyə imkan verir (enumeration) — xarici ID üçün UUID/ULID, amma əsas müdafiə hər sorğuda yetki yoxlamasıdır.",
            "TƏHLÜKƏSİZLİK — parollar: heç vaxt açıq mətn və ya MD5/SHA1. Yalnız yavaş, duzlu (salted) hash: Argon2id, bcrypt. Sütun: parol_hash TEXT NOT NULL.",
            "Həssas məlumat (FİN, kart): minimal saxla, sütun səviyyəsində şifrələ, girişi məhdudlaşdır; kart nömrəsini ümumiyyətlə saxlama (PCI DSS) — ödəniş provayderinin tokenini saxla.",
            "Hər cədvəldə yaradilib/yenilenib sütunları sonradan debug və audit üçün qiymətlidir.",
          ]},
          { t: "qa", items: [
            ["VARCHAR və TEXT fərqi?", "VARCHAR(n) uzunluq limiti qoyur; PostgreSQL-də performans eynidir, fərq yalnız qaydadadır."],
            ["Parolları bazada necə saxlamalı?", "Argon2id/bcrypt kimi yavaş, duzlu hash ilə; heç vaxt açıq və ya sürətli hash ilə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Email-in təkrarlanmaması üçün?", options: ["NOT NULL", "UNIQUE", "DEFAULT"], answer: 1, why: "UNIQUE eyni dəyərin ikinci dəfə yazılmasını qadağan edir." },
          { t: "quiz", q: "Məbləğ üçün ən düzgün tip?", options: ["FLOAT", "DECIMAL(10,2)", "TEXT"], answer: 1, why: "DECIMAL dəqiqdir, yuvarlaqlaşdırma xətası yoxdur." },
        ],
      },
    ],
    exercise: {
      task: "kitablar cədvəli yarat: id (PK), ad (məcburi), muellif (məcburi), qiymet (mənfi ola bilməz), isbn (unikal), stok (default 0). 2 kitab əlavə et və SELECT ilə göstər. Sonra mənfi qiymətli INSERT-i sına və xətanı gör.",
      starter: `CREATE TABLE kitablar (\n\n);\n\n-- INSERT\n\n-- SELECT\n`,
      expect: "id INTEGER PRIMARY KEY; ad, muellif NOT NULL; qiymet CHECK (qiymet >= 0) (REAL/DECIMAL); isbn UNIQUE; stok DEFAULT 0; INSERT sütun adları ilə; mənfi qiymət CHECK xətası verir.",
    },
  },
];
