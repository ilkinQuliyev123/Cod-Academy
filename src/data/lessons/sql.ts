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
          { t: "h", text: "Ən az imtiyaz prinsipi: GRANT və REVOKE" },
          { t: "p", text: "Tətbiq bazaya admin hesabı ilə qoşulursa, bir SQL injection açığı bütün bazanın itirilməsi deməkdir. Ən az imtiyaz (least privilege) prinsipi: hər hesaba yalnız ehtiyac duyduğu hüquqlar verilir. Sorğu dili SQL standartdır, amma GRANT/REVOKE SQLite-da yoxdur (fayl əsaslı), PostgreSQL və MySQL-də var." },
          { t: "code", lang: "sql", code: `-- PostgreSQL / MySQL: ayrı hesablar
CREATE USER tetbiq_oxu   IDENTIFIED BY '...';   -- hesabat/oxuma
CREATE USER tetbiq_yaz   IDENTIFIED BY '...';   -- gündəlik tətbiq
-- migrasiya üçün ayrıca, yalnız deploy zamanı istifadə olunan hesab

GRANT SELECT ON telebeler, kurslar TO tetbiq_oxu;
GRANT SELECT, INSERT, UPDATE ON telebeler TO tetbiq_yaz;   -- DELETE, DROP, ALTER verilmir

REVOKE UPDATE ON telebeler FROM tetbiq_yaz;               -- hüququ geri al
-- Sütun səviyyəsi: həssas sahəyə çıxışı bağla
GRANT SELECT (id, ad, email) ON istifadeciler TO tetbiq_oxu;  -- parol_hes verilmir` },
          { t: "list", items: [
            "Tətbiqi superuser/root/sa hesabı ilə işlətmə. Əgər injection olarsa belə, DROP, GRANT və fayl oxuma əməliyyatları mümkün olmamalıdır.",
            "Rol-əsaslı idarəetmə: hüquqları rola ver, istifadəçilərə rolu təyin et. Hüquq dəyişikliyi bir yerdə olur.",
            "Mühitləri ayır: development, test və production üçün fərqli hesab və parollar; production parolları kod depoda yox, gizli məlumat idarəçisində saxlanır.",
            "Verilənlər bazasını internetə açıq buraxma: firewall və yalnız tətbiq serverindən bağlantı; TLS ilə şifrələnmiş bağlantı.",
            "SQLite-da: hüquq modeli yoxdur; bunun əvəzinə faylın OS səviyyəsində icazələri, tətbiq qatında yoxlama və lazım olduqda PRAGMA query_only = ON (oxuma-yalnız bağlantı) işlədilir.",
          ]},
          { t: "qa", items: [
            ["Ən az imtiyaz nə üçün vacibdir?", "Açıq-aşkar bir səhv (SQL injection, sızmış parol) baş verəndə ziyanı məhdudlaşdırır: hücumçu yalnız həmin hesabın icazə verdiyi qədər edə bilər."],
            ["Tətbiqin DB hesabına DROP/ALTER icazəsi verilməlidirmi?", "Xeyr. Sxem dəyişiklikləri ayrıca migrasiya hesabı ilə, deploy zamanı edilir."],
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
          { t: "h", text: "SELECT * və həssas məlumatın sızması" },
          { t: "code", lang: "sql", code: `-- Pis: bütün sütunlar, o cümlədən parol_hes, reset_token, telefon...
SELECT * FROM istifadeciler WHERE id = ?;

-- Yaxşı: yalnız lazım olan sahələr
SELECT id, ad, email FROM istifadeciler WHERE id = ?;

-- Daha da yaxşı: həssas sütunlara baxmayan view
CREATE VIEW acik_istifadeciler AS
SELECT id, ad, email FROM istifadeciler;` },
          { t: "list", items: [
            "SELECT * API cavabına birbaşa verilərsə, sonradan cədvələ əlavə olunan həssas sütun (token, parol heşi) avtomatik sızır (data leak).",
            "Cavab obyektini (DTO) açıq şəkildə sütunlarla qur; ORM-də select/projection seç.",
            "Xəta mesajlarında SQL mətni, cədvəl və sütun adları göstərmə — hücumçuya sxem haqqında məlumat verir. Detalları yalnız loga yaz.",
            "Mətni log-a yazarkən parolları, token və kart nömrələrini maskala.",
          ]},
          { t: "qa", items: [
            ["SELECT * nə vaxt təhlükəsizlik problemidir?", "Həssas sütunlar olan cədvəllərdə; yeni sütun əlavə olunduqda kod dəyişməyibsə də, məlumat avtomatik müştəriyə çıxır."],
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
          { t: "h", text: "SQL injection: konkatenasiya və parametrli sorğu" },
          { t: "p", text: "SQL injection istifadəçi girişi SQL mətninin içinə birləşdirildikdə (konkatenasiya) baş verir: giriş məlumat kimi qalmır, sorğunun strukturunu dəyişir. Ən kritik veb zəifliklərindən biridir." },
          { t: "code", lang: "js", code: `// TƏHLÜKƏLİ — konkatenasiya
const sql = "SELECT * FROM istifadeciler WHERE ad = '" + ad + "' AND parol_hes = '" + hes + "'";
// ad = admin' --   →   ... WHERE ad = 'admin' --' AND parol_hes = ...   (parol yoxlanmır)
// ad = ' OR '1'='1 →   ... WHERE ad = '' OR '1'='1' ...                 (hamı uyğun gəlir)
// ad = x'; DROP TABLE istifadeciler; --                                 (ikinci əmr — bəzi sürücülərdə)

// TƏHLÜKƏSİZ — parametrli sorğu (prepared statement)
const row = db.prepare("SELECT id, ad FROM istifadeciler WHERE ad = ?").get(ad);` },
          { t: "code", lang: "sql", code: `-- Əsas fikir: SQL mətni və məlumat ayrı göndərilir
-- Sorğu şablonu (əvvəlcədən tərtib olunur):
SELECT id, ad FROM istifadeciler WHERE ad = ? AND aktiv = ?;
-- Parametrlər ('admin', 1) ayrıca bağlanır və heç vaxt SQL kimi şərh olunmur.

-- Adlı parametrlər (SQLite): :ad və $ad
SELECT id, ad FROM istifadeciler WHERE ad = :ad;` },
          { t: "list", items: [
            "Prepared statement-də sorğunun strukturu server tərəfindən əvvəlcədən sabitlənir, qiymətlər isə yalnız dəyər kimi bağlanır — injection mümkün olmur.",
            "Parametr yalnız DƏYƏR yerində işləyir; cədvəl/sütun adı və ORDER BY istiqaməti parametr ola bilməz. Dinamik ad lazımdırsa ağ siyahı ilə seç: const icazeli = {ad:'ad', yas:'yas'}; const sutun = icazeli[istek.sirala] ?? 'id'.",
            "LIKE üçün: parametrə % simvollarını özün əlavə et — WHERE ad LIKE ? ilə '%' || ? || '%' və ya parametri '%' + deyer + '%' hazırla (və %, _ simvollarını escape et).",
            "IN (...) üçün: lazımi sayda ? yarat — IN (?, ?, ?) — və dəyərləri massivlə ötür.",
            "ORM (Prisma, Drizzle, SQLAlchemy, Hibernate) default olaraq parametrləşdirir; amma raw/queryRaw funksiyalarında yenə konkatenasiya etmə.",
            "Defence in depth: ən az imtiyaz hesabı, giriş validasiyası, xəta mesajlarını gizlətmək, WAF — hamısı əlavə qatdır, əsas müdafiə isə parametrli sorğudur.",
          ]},
          { t: "mistake", lang: "js", wrong: `db.run(\`SELECT * FROM mehsullar WHERE ad = '\${ad}'\`);   // template string də konkatenasiyadır`, right: `db.prepare("SELECT id, ad FROM mehsullar WHERE ad = ?").all(ad);`, why: "Template literal səliqəli görünsə də, dəyəri SQL mətninə yapışdırır. Qiyməti ? və ya :ad kimi yer tutucu ilə ayrıca ötür." },
          { t: "warn", text: "Escape funksiyaları (məsələn dırnağı ikiləşdirmək) və qara siyahılar (OR, DROP sözlərini silmək) etibarlı müdafiə deyil. Kodlaşdırma və kontekst fərqləri bunu aşır. Yalnız parametrli sorğu işlət." },
          { t: "qa", items: [
            ["SQL injection nədir və necə qarşısı alınır?", "İstifadəçi girişinin SQL mətninə birləşdirilməsi nəticəsində sorğunun strukturunun dəyişməsi. Parametrli sorğu (prepared statement), ən az imtiyaz hesabı və validasiya ilə qarşısı alınır."],
            ["Prepared statement niyə təhlükəsizdir?", "Sorğu şablonu və dəyərlər ayrı ötürülür; dəyər heç vaxt SQL kimi parse olunmur, ona görə strukturu dəyişə bilmir."],
            ["ORDER BY istifadəçi seçimi ilə necə təhlükəsiz edilir?", "Parametr ola bilmədiyi üçün icazəli sütun adlarının ağ siyahısından seçilir, istiqamət isə yalnız ASC və ya DESC olaraq yoxlanır."],
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
          { t: "h", text: "Parolları heşləmə və parametrli INSERT/UPDATE" },
          { t: "code", lang: "sql", code: `CREATE TABLE istifadeciler (
  id        INTEGER PRIMARY KEY,
  email     TEXT NOT NULL UNIQUE,
  parol_hes TEXT NOT NULL,            -- argon2id / bcrypt çıxışı (duz, parametrlər daxil)
  yaradildi TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Tətbiq heşi hesablayır, SQL yalnız nəticəni saxlayır (parametrli)
INSERT INTO istifadeciler (email, parol_hes) VALUES (?, ?);

-- Yoxlama: heşi bazadan götür, tətbiqdə argon2/bcrypt verify ilə müqayisə et
SELECT id, parol_hes FROM istifadeciler WHERE email = ?;` },
          { t: "list", items: [
            "Parolu heç vaxt açıq mətnlə və ya sürətli heşlə (MD5, SHA-1, tək SHA-256) saxlama. Yavaş, duzlu (salted) alqoritmlər istifadə et: argon2id (tövsiyə olunan), bcrypt, scrypt.",
            "Duz (salt) hər parol üçün unikaldır və müasir kitabxanalar onu heşin içinə yerləşdirir. Hesablama xərci (cost) vaxt keçdikcə artırılır.",
            "Heşləmə tətbiq tərəfində aparılır, SQL funksiyası ilə deyil; parol verilənlər bazasına heç vaxt açıq mətnlə gəlmir (və loga yazılmır).",
            "Digər həssas məlumatlar (kart nömrəsi, ŞV) — ya heç saxlama, ya da sütun səviyyəsində şifrələ və açarı bazadan kənarda saxla (KMS).",
            "UPDATE və DELETE-də həmişə WHERE və hüquq yoxlaması: UPDATE profil SET ad = ? WHERE id = ? AND istifadeci_id = ? — yalnız öz sətrini dəyişsin (IDOR-un qarşısı).",
            "Mass assignment: istifadəçi JSON-undan SET sütunlarını dinamik qurma; dəyişdirilə bilən sahələri ağ siyahı ilə seç (rol, is_admin kimi sahələr çıxarılsın).",
          ]},
          { t: "mistake", lang: "sql", wrong: `INSERT INTO istifadeciler (email, parol_hes) VALUES ('a@b.az', 'sifre123');
-- və ya MD5('sifre123')`, right: `-- parol_hes = argon2id("sifre123", unikal duz) : $argon2id$v=19$m=65536,t=3,p=4$...
INSERT INTO istifadeciler (email, parol_hes) VALUES (?, ?);`, why: "Açıq mətn və sürətli heşlər baza sızarsa dərhal bərpa olunur (rainbow cədvəl, GPU brute-force). Yavaş, duzlu parol heşi hücumu minlərlə dəfə bahalaşdırır." },
          { t: "qa", items: [
            ["Parolu necə saxlayırsan?", "Açıq mətn yox, argon2id və ya bcrypt kimi yavaş və duzlu heşləmə ilə. Giriş zamanı daxil edilən parol həmin alqoritmlə yoxlanır, heş geri çevrilmir."],
            ["Şifrələmə (encryption) ilə heşləmə (hashing) fərqi?", "Şifrələmə açarla geri qaytarıla bilir; heşləmə birtərəflidir. Parollar şifrələnmir, heşlənir."],
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
          { t: "h", text: "Sxem səviyyəsində müdafiə: məhdudiyyətlər və həssas sütunlar" },
          { t: "code", lang: "sql", code: `CREATE TABLE istifadeciler (
  id          INTEGER PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE CHECK (email LIKE '%_@_%._%'),
  parol_hes   TEXT NOT NULL,
  rol         TEXT NOT NULL DEFAULT 'istifadeci' CHECK (rol IN ('istifadeci', 'muellim', 'admin')),
  aktiv       INTEGER NOT NULL DEFAULT 1 CHECK (aktiv IN (0, 1)),
  yaradildi   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Həssas məlumatı ayrı cədvəldə saxla
CREATE TABLE istifadeci_gizli (
  istifadeci_id INTEGER PRIMARY KEY REFERENCES istifadeciler(id) ON DELETE CASCADE,
  telefon       TEXT,
  reset_token_hes TEXT,
  reset_bitir   TEXT
);` },
          { t: "list", items: [
            "NOT NULL, UNIQUE, CHECK, FOREIGN KEY — bazanın özü səhv və qəsdən yanlış məlumatın qarşısını alan son sığortadır (tətbiq xətası olsa belə).",
            "Rol kimi dəyərləri CHECK/enum ilə məhdudlaşdır; default ən aşağı hüquqlu rol olsun (ən az imtiyaz).",
            "Reset token-i də parol kimi heşlə saxla və qısa müddətlə məhdudlaşdır (bitmə vaxtı).",
            "Həssas sütunları ayrı cədvələ çıxarmaq hüquq və view ilə çıxışı idarə etməyi asanlaşdırır.",
            "SQLite-da FOREIGN KEY yoxlaması üçün hər bağlantıda PRAGMA foreign_keys = ON lazımdır.",
          ]},
          { t: "qa", items: [
            ["CHECK məhdudiyyəti təhlükəsizliyə necə kömək edir?", "Tətbiq səhv etsə belə, bazaya yanlış dəyər (icazəsiz rol, mənfi miqdar) yazmağa imkan vermir; dərin müdafiə qatıdır."],
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
  {
    slug: "acarlar",
    title: "Primary və foreign key",
    intro: "Açarlar cədvəlləri bir-birinə bağlayır. Primary key hər sətri unikal tanıdır, foreign key isə başqa cədvəlin sətrinə istinad edir və «yetim» məlumatın yaranmasına imkan vermir.",
    sections: [
      {
        level: "baslangic",
        title: "PK və FK",
        blocks: [
          { t: "analogy", text: "Primary key — şəxsiyyət vəsiqəsinin FİN kodudur: iki nəfərdə eyni ola bilməz, boş ola bilməz. Foreign key — arayışdakı «FİN: 5ABC123» yazısıdır: başqa sənəddəki adama işarə edir. Belə FİN-li adam yoxdursa, arayış etibarsızdır." },
          { t: "code", lang: "sql", code: `PRAGMA foreign_keys = ON;  -- SQLite-də FK yoxlaması belə açılır

CREATE TABLE muellifler (
  id INTEGER PRIMARY KEY,
  ad TEXT NOT NULL
);

CREATE TABLE kitablar (
  id         INTEGER PRIMARY KEY,
  ad         TEXT NOT NULL,
  muellif_id INTEGER NOT NULL REFERENCES muellifler(id)
);

INSERT INTO muellifler VALUES (1, 'Nizami');
INSERT INTO kitablar VALUES (1, 'Xəmsə', 1);    -- olar
INSERT INTO kitablar VALUES (2, 'Naməlum', 99); -- XƏTA: 99 nömrəli müəllif yoxdur` },
          { t: "terms", items: [
            ["PRIMARY KEY (PK)", "sətrin unikal identifikatoru; NULL ola bilməz, təkrarlana bilməz."],
            ["FOREIGN KEY (FK)", "başqa cədvəlin PK-sına istinad edən sütun."],
            ["REFERENCES", "FK-nın hansı cədvəl və sütuna bağlandığını göstərir."],
            ["istinad bütövlüyü (referential integrity)", "hər FK dəyərinin real mövcud sətrə işarə etməsi zəmanəti."],
          ]},
          { t: "tip", text: "Məşq bazasında qeydiyyat.telebe_id → telebeler.id və qeydiyyat.kurs_id → kurslar.id foreign key-dir. JOIN-lər məhz bu əlaqə üzrə qurulur." },
        ],
      },
      {
        level: "orta",
        title: "Əlaqə növləri, mürəkkəb açar, ON DELETE",
        blocks: [
          { t: "list", items: [
            "Birə-çox (1:N): bir müəllifin çox kitabı. FK «çox» tərəfdə dayanır (kitablar.muellif_id).",
            "Çoxa-çox (N:M): tələbə çox kursa, kurs çox tələbəyə. Aralıq cədvəl lazımdır (qeydiyyat) — iki FK ilə.",
            "Birə-bir (1:1): istifadəçi və onun profili. FK + UNIQUE.",
          ]},
          { t: "code", lang: "sql", caption: "Aralıq cədvəl: mürəkkəb (composite) PK və silinmə qaydası", code: `PRAGMA foreign_keys = ON;

CREATE TABLE istirak (
  telebe_id INTEGER NOT NULL REFERENCES telebeler(id) ON DELETE CASCADE,
  kurs_id   INTEGER NOT NULL REFERENCES kurslar(id)   ON DELETE RESTRICT,
  tarix     TEXT DEFAULT CURRENT_DATE,
  PRIMARY KEY (telebe_id, kurs_id)   -- eyni cüt iki dəfə yazıla bilməz
);

INSERT INTO telebeler VALUES (6, 'Kamran', 'Əhmədov', 23, 'Şəki');
INSERT INTO istirak (telebe_id, kurs_id) VALUES (6, 2), (3, 2);

DELETE FROM telebeler WHERE id = 6;  -- CASCADE: onun istirak sətri də silinir
SELECT * FROM istirak;               -- yalnız (3, 2) qalır
-- DELETE FROM kurslar WHERE id = 2; -- RESTRICT: XƏTA, kursa yazılan var` },
          { t: "code", lang: "text", caption: "Valideyn sətir silinəndə nə olsun?", code: `ON DELETE RESTRICT / NO ACTION   silməyə icazə vermir (default, ən təhlükəsiz)
ON DELETE CASCADE                asılı sətirləri də silir
ON DELETE SET NULL               FK-nı NULL edir (sütun nullable olmalıdır)` },
          { t: "mistake", lang: "sql", wrong: `CREATE TABLE sifarisler (
  id INTEGER PRIMARY KEY,
  musteri_id INTEGER  -- FK yoxdur
);`, right: `CREATE TABLE sifarisler (
  id INTEGER PRIMARY KEY,
  musteri_id INTEGER NOT NULL REFERENCES musteriler(id)
);`, why: "FK olmadan silinmiş müştərinin sifarişləri «yetim» qalır, JOIN-lər sətir itirir, hesabatlar səhv çıxır. Bazanın özü qorusun." },
          { t: "mistake", lang: "sql", wrong: `CREATE TABLE istifadeciler (
  email TEXT PRIMARY KEY  -- təbii açar
);`, right: `CREATE TABLE istifadeciler (
  id    INTEGER PRIMARY KEY,   -- surroqat açar
  email TEXT NOT NULL UNIQUE
);`, why: "Email dəyişə bilər. PK dəyişəndə ona istinad edən bütün cədvəllər yenilənməlidir. Dəyişməyən süni id seç, email-ə UNIQUE qoy." },
        ],
      },
      {
        level: "senior",
        title: "Açar seçimi, performans və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "PK-ya indeks avtomatik qurulur, FK sütununa isə əksər bazalarda (PostgreSQL, SQL Server) YOX. FK-ya indeks qoymasan, JOIN və valideyn silinməsi bütün cədvəli skan edir.",
            "Surroqat açar növləri: ardıcıl BIGINT (kiçik, sürətli, sıralı) və ya UUID (paylanmış sistemlərdə rahat, amma təsadüfi UUIDv4 indeksi parçalayır — UUIDv7/ULID vaxta görə sıralıdır).",
            "CASCADE güclü və təhlükəlidir: bir DELETE milyonlarla sətri apara bilər. Maliyyə və audit məlumatında RESTRICT + «yumşaq silmə» (silinib_tarix sütunu) işlət.",
            "Böyük cədvələ FK əlavə etmək bütün sətirləri yoxlayır və kilidləyir. PostgreSQL-də NOT VALID ilə əlavə et, sonra VALIDATE CONSTRAINT.",
            "TƏHLÜKƏSİZLİK — IDOR: ardıcıl id-lər təxmin olunur (/sifaris/1001 → /1002). Əsas müdafiə — hər sorğuda sahibliyi yoxlamaq: WHERE id = ? AND istifadeci_id = ?. Xarici ünvanlarda UUID əlavə qatdır, əvəz deyil.",
            "TƏHLÜKƏSİZLİK: FK yoxlamasını «sürət üçün» söndürmə (SET FOREIGN_KEY_CHECKS = 0). Zədəli istinadlar icazə yoxlamalarından yan keçən «sahibsiz» qeydlər yaradır.",
            "TƏHLÜKƏSİZLİK: tətbiq istifadəçisinə DROP/ALTER hüququ vermə — yalnız SELECT/INSERT/UPDATE/DELETE (ən az imtiyaz prinsipi).",
          ]},
          { t: "qa", items: [
            ["Təbii və surroqat açar fərqi?", "Təbii — məlumatın özündən (email, FİN); surroqat — süni id. Surroqat dəyişmir və kiçikdir; təbii dəyərə UNIQUE qoyulur."],
            ["ON DELETE CASCADE nə vaxt uyğundur?", "Asılı sətir valideynsiz mənasızdırsa (sifarişin sətirləri). Tarixçə və maliyyə məlumatında yox."],
            ["Niyə FK sütununa indeks lazımdır?", "JOIN-lər və valideyn sətrin silinməsi/yenilənməsi həmin sütunda axtarış edir; indekssiz tam skan olur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Çoxa-çox əlaqə necə qurulur?", options: ["Bir cədvəldə iki PK ilə", "Aralıq cədvəl və iki FK ilə", "Mümkün deyil"], answer: 1, why: "Aralıq cədvəl hər iki tərəfə istinad edir (qeydiyyat kimi)." },
          { t: "quiz", q: "Birə-çox əlaqədə FK hansı cədvəldə olur?", options: ["«Bir» tərəfdə", "«Çox» tərəfdə", "Hər ikisində"], answer: 1, why: "Hər kitab bir müəllifə işarə edir — FK kitablardadır." },
        ],
      },
    ],
    exercise: {
      task: "Kitabxana sxemi qur (əvvəl PRAGMA foreign_keys = ON). uzvler (id PK, ad məcburi), kitablar2 (id PK, ad məcburi), icare (uzv_id → uzvler, üzv silinəndə icarələri də silinsin; kitab_id → kitablar2, kitab silinməsinə icazə verilməsin; PK — cüt). 2 üzv, 2 kitab, 3 icarə əlavə et. Sonra mövcud olmayan üzv üçün icarə yazmağa çalış və xətanı gör.",
      starter: `PRAGMA foreign_keys = ON;\n\nCREATE TABLE uzvler (\n\n);\n`,
      expect: "Üç cədvəl; icare-də iki FK REFERENCES ilə; uzv_id ON DELETE CASCADE, kitab_id ON DELETE RESTRICT (və ya default); PRIMARY KEY (uzv_id, kitab_id); INSERT-lər işləyir; olmayan üzv üçün INSERT FOREIGN KEY xətası verir.",
    },
  },
  {
    slug: "alt-sorgu",
    title: "Alt sorğular",
    intro: "Alt sorğu (subquery) — sorğunun içində yazılmış başqa sorğudur. Əvvəl içəridəki cavablanır, nəticəsi bayırdakı sorğuda işlədilir.",
    sections: [
      {
        level: "baslangic",
        title: "Sorğu içində sorğu",
        blocks: [
          { t: "analogy", text: "«Sinifdə ortalamadan hündür olanlar kimdir?» Bu suala cavab üçün əvvəl başqa suala cavab lazımdır: «Ortalama boy nə qədərdir?». Alt sorğu həmin ilk sualdır — mötərizədə yazılır, əvvəl hesablanır." },
          { t: "code", lang: "sql", code: `-- Orta yaşdan böyük tələbələr
SELECT ad, yas
FROM telebeler
WHERE yas > (SELECT AVG(yas) FROM telebeler);

-- JavaScript kursuna yazılanlar
SELECT ad
FROM telebeler
WHERE id IN (SELECT telebe_id FROM qeydiyyat WHERE kurs_id = 2);` },
          { t: "terms", items: [
            ["alt sorğu (subquery)", "mötərizə içində yazılan daxili SELECT."],
            ["skalyar alt sorğu", "bir sətir, bir sütun — yəni tək dəyər qaytarır; = > < ilə işlənir."],
            ["IN (alt sorğu)", "dəyərin alt sorğunun qaytardığı siyahıda olub-olmadığını yoxlayır."],
          ]},
          { t: "tip", text: "Alt sorğunu ayrıca işlət və nəticəsinə bax — sonra onu böyük sorğuya yerləşdir. Mürəkkəb sorğular belə qurulur: hissə-hissə." },
        ],
      },
      {
        level: "orta",
        title: "EXISTS, FROM-da alt sorğu, korrelyasiya, CTE",
        blocks: [
          { t: "code", lang: "sql", caption: "EXISTS — «ən azı biri varmı?»", code: `INSERT INTO telebeler VALUES (6, 'Kamran', 'Əhmədov', 23, 'Şəki'); -- hələ kursu yoxdur

-- Heç bir kursa yazılmayan tələbələr
SELECT t.ad
FROM telebeler t
WHERE NOT EXISTS (
  SELECT 1 FROM qeydiyyat q WHERE q.telebe_id = t.id
);` },
          { t: "code", lang: "sql", caption: "Korrelyasiyalı alt sorğu — bayırdakı sətrə istinad edir", code: `-- Hər tələbənin öz ən yüksək balı
SELECT t.ad,
       (SELECT MAX(q.bal) FROM qeydiyyat q WHERE q.telebe_id = t.id) AS en_yuksek
FROM telebeler t;` },
          { t: "code", lang: "sql", caption: "CTE (WITH) — alt sorğuya ad vermək", code: `WITH ortalar AS (
  SELECT telebe_id, AVG(bal) AS orta
  FROM qeydiyyat
  GROUP BY telebe_id
)
SELECT t.ad, ROUND(o.orta, 1) AS orta_bal
FROM ortalar o
JOIN telebeler t ON t.id = o.telebe_id
WHERE o.orta > 85
ORDER BY o.orta DESC;` },
          { t: "mistake", lang: "sql", wrong: `SELECT ad FROM telebeler
WHERE id NOT IN (SELECT telebe_id FROM qeydiyyat);
-- alt sorğuda bir NULL olsa, nəticə BOŞ çıxır`, right: `SELECT t.ad FROM telebeler t
WHERE NOT EXISTS (
  SELECT 1 FROM qeydiyyat q WHERE q.telebe_id = t.id
);`, why: "NOT IN siyahısında NULL varsa, müqayisə «naməlum» olur və heç bir sətir qayıtmır. NOT EXISTS NULL-dan təsirlənmir." },
          { t: "mistake", lang: "sql", wrong: `SELECT ad FROM telebeler
WHERE yas = (SELECT yas FROM telebeler WHERE seher = 'Bakı');
-- alt sorğu bir neçə sətir qaytarır`, right: `SELECT ad FROM telebeler
WHERE yas IN (SELECT yas FROM telebeler WHERE seher = 'Bakı');`, why: "= yalnız tək dəyərlə işləyir. Alt sorğu bir neçə sətir qaytara bilirsə, IN, ANY və ya EXISTS işlət (əksər bazalar = ilə xəta verir, SQLite isə səssizcə yalnız birinci sətri götürür — daha pis)." },
        ],
      },
      {
        level: "senior",
        title: "Planlayıcı necə baxır? Rekursiv CTE, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Müasir planlayıcılar IN/EXISTS alt sorğusunu semi-join-a, NOT EXISTS-i anti-join-a çevirir — çox vaxt JOIN ilə eyni plan alınır. Oxunaqlılığa görə seç, sonra EXPLAIN ilə yoxla.",
            "Korrelyasiyalı skalyar alt sorğu SELECT siyahısında hər sətir üçün ayrıca icra oluna bilər (N+1-in SQL variantı). Böyük cədvəldə JOIN + GROUP BY və ya window funksiyası ilə əvəz et.",
            "CTE: PostgreSQL 12-dən əvvəl həmişə materiallaşırdı (optimizasiya baryeri). İndi tək istifadəli CTE sorğuya əridilir; MATERIALIZED / NOT MATERIALIZED ilə idarə olunur.",
            "Rekursiv CTE (WITH RECURSIVE) iyerarxiya üçündür: kateqoriya ağacı, təşkilat strukturu, qraf yolu. Mütləq dayanma şərti qoy.",
            "LATERAL JOIN (PostgreSQL) / CROSS APPLY (SQL Server): hər sətir üçün «ilk N» tipli alt sorğu — məs. hər müştərinin son 3 sifarişi.",
            "TƏHLÜKƏSİZLİK — SQL injection: alt sorğu hücumçunun əsas alətidir. Zəif yerə ' UNION SELECT parol FROM istifadeciler -- əlavə edib başqa cədvəli oxuyur. Qarşısı yalnız parametrli sorğudur.",
            "TƏHLÜKƏSİZLİK: çoxkirayəçili (multi-tenant) sistemdə şərti HƏR alt sorğuya yaz. Bayır sorğuda tenant_id = ? var, alt sorğuda unudulub — başqa müştərinin məlumatı sızır. PostgreSQL Row Level Security bunu bazada məcburi edir.",
            "TƏHLÜKƏSİZLİK: dayanma şərti olmayan rekursiv CTE və ya dekart hasili — DoS. statement_timeout qoy.",
          ]},
          { t: "code", lang: "sql", caption: "Rekursiv CTE: 1-dən 5-ə", code: `WITH RECURSIVE sayqac(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM sayqac WHERE n < 5   -- dayanma şərti
)
SELECT n FROM sayqac;` },
          { t: "qa", items: [
            ["IN ilə EXISTS fərqi?", "IN dəyəri siyahı ilə müqayisə edir; EXISTS sətrin varlığını yoxlayır və ilk uyğunluqda dayanır. NOT IN NULL-la təhlükəlidir, NOT EXISTS yox."],
            ["Korrelyasiyalı alt sorğu nədir?", "Bayırdakı sorğunun sütununa istinad edən alt sorğu; məntiqən hər bayır sətir üçün yenidən hesablanır."],
            ["CTE nə vaxt lazımdır?", "Mürəkkəb sorğunu adlı addımlara bölmək, eyni alt nəticəni bir neçə dəfə işlətmək və rekursiya üçün."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "WHERE bal > (SELECT AVG(bal) FROM qeydiyyat) — alt sorğu neçə dəyər qaytarmalıdır?", options: ["Bir", "Ən azı iki", "Fərqi yoxdur"], answer: 0, why: "> operatoru tək (skalyar) dəyər tələb edir." },
          { t: "quiz", q: "«Olmayanları» tapmaq üçün ən etibarlı yol?", options: ["NOT IN", "NOT EXISTS", "<> ALL"], answer: 1, why: "NOT EXISTS NULL dəyərlərindən təsirlənmir." },
        ],
      },
    ],
    exercise: {
      task: "Üç sorğu yaz: 1) balı bütün balların ortasından yüksək olan qeydiyyatlar (tələbə adı, kurs adı, bal); 2) heç bir tələbənin yazılmadığı kursları NOT EXISTS ilə tap (əvvəl kurslar-a 'Python', 40 əlavə et); 3) CTE ilə hər kursun orta balını hesabla və ortası 80-dən yuxarı olan kursların adını göstər.",
      starter: `-- 1)\n\n-- 2)\nINSERT INTO kurslar VALUES (5, 'Python', 40);\n\n-- 3)\n`,
      expect: "1) WHERE bal > (SELECT AVG(bal) FROM qeydiyyat) + iki JOIN; 2) NOT EXISTS korrelyasiyalı alt sorğu, nəticə Python; 3) WITH ... AS (SELECT kurs_id, AVG(bal) ... GROUP BY kurs_id) + JOIN kurslar + WHERE orta > 80. NOT IN işlədilməyib.",
    },
  },
  {
    slug: "normallasdirma",
    title: "Normallaşdırma",
    intro: "Normallaşdırma — cədvəlləri elə bölməkdir ki, hər fakt yalnız bir yerdə saxlansın. Təkrar olmayanda ziddiyyət də olmur: bir yeri dəyişirsən — hər yerdə dəyişir.",
    sections: [
      {
        level: "baslangic",
        title: "Təkrarın problemi",
        blocks: [
          { t: "analogy", text: "Dostunun nömrəsini beş fərqli dəftərə yazmısan. O, nömrəsini dəyişir — sən üç dəftəri düzəldir, ikisini unudursan. İndi hansı nömrə düzdür? Normallaşdırma — nömrəni bir dəftərdə saxlayıb, digərlərində «bax: telefon dəftəri» yazmaqdır." },
          { t: "code", lang: "sql", caption: "Pis: hər şey bir cədvəldə", code: `CREATE TABLE sifarisler_pis (
  id INTEGER PRIMARY KEY,
  musteri_ad TEXT, musteri_telefon TEXT,
  mehsullar TEXT   -- 'Qələm, Dəftər, Çanta'
);
INSERT INTO sifarisler_pis VALUES
  (1, 'Aysel', '050-111', 'Qələm, Dəftər'),
  (2, 'Aysel', '050-999', 'Çanta');   -- telefon fərqlidir: hansı düzdür?

SELECT * FROM sifarisler_pis;` },
          { t: "list", items: [
            "Yeniləmə anomaliyası: telefon dəyişəndə bütün sətirləri dəyişməlisən — biri qalsa, ziddiyyət yaranır.",
            "Əlavə anomaliyası: sifarişi olmayan müştərini yaza bilmirsən.",
            "Silmə anomaliyası: son sifarişi silsən, müştərinin özü də itir.",
          ]},
          { t: "terms", items: [
            ["normallaşdırma", "təkrarı aradan qaldırmaq üçün cədvəllərin bölünməsi."],
            ["anomaliya", "təkrar məlumatın yaratdığı ziddiyyət və ya itki."],
            ["atomar dəyər", "bölünməyən tək dəyər; bir xanada siyahı olmur."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "1NF, 2NF, 3NF",
        blocks: [
          { t: "list", items: [
            "1NF: hər xana atomardır (siyahı yox), təkrarlanan sütun qrupu yoxdur (mehsul1, mehsul2…), hər sətrin açarı var.",
            "2NF: 1NF + açar olmayan hər sütun BÜTÖV açardan asılıdır (mürəkkəb açarın yalnız bir hissəsindən yox).",
            "3NF: 2NF + açar olmayan sütun başqa açar olmayan sütundan asılı deyil (tranzitiv asılılıq yoxdur).",
            "Yadda saxla: hər sütun «açardan, bütöv açardan və yalnız açardan» asılı olmalıdır.",
          ]},
          { t: "code", lang: "sql", caption: "Yaxşı: 3NF", code: `CREATE TABLE musteriler (
  id INTEGER PRIMARY KEY, ad TEXT NOT NULL, telefon TEXT
);
CREATE TABLE mehsullar (
  id INTEGER PRIMARY KEY, ad TEXT NOT NULL, qiymet REAL NOT NULL
);
CREATE TABLE sifarisler (
  id INTEGER PRIMARY KEY,
  musteri_id INTEGER NOT NULL REFERENCES musteriler(id),
  tarix TEXT DEFAULT CURRENT_DATE
);
CREATE TABLE sifaris_setirleri (
  sifaris_id INTEGER REFERENCES sifarisler(id),
  mehsul_id  INTEGER REFERENCES mehsullar(id),
  say        INTEGER NOT NULL CHECK (say > 0),
  qiymet     REAL NOT NULL,   -- satış anındakı qiymət (tarixi fakt)
  PRIMARY KEY (sifaris_id, mehsul_id)
);` },
          { t: "mistake", lang: "sql", wrong: `CREATE TABLE telebe (
  id INTEGER PRIMARY KEY, ad TEXT,
  kurs1 TEXT, kurs2 TEXT, kurs3 TEXT
);`, right: `-- telebeler, kurslar və aralıq cədvəl:
-- qeydiyyat (telebe_id, kurs_id)`, why: "Nömrəli sütunlar 1NF-i pozur: dördüncü kurs üçün cədvəli dəyişməlisən, «SQL-ə yazılanlar» sorğusu üç sütunda axtarmalıdır." },
          { t: "mistake", lang: "sql", wrong: `CREATE TABLE isciler (
  id INTEGER PRIMARY KEY, ad TEXT,
  sobe_id INTEGER, sobe_adi TEXT, sobe_mudiri TEXT
);`, right: `CREATE TABLE sobeler (id INTEGER PRIMARY KEY, ad TEXT, mudir TEXT);
CREATE TABLE isciler (
  id INTEGER PRIMARY KEY, ad TEXT,
  sobe_id INTEGER REFERENCES sobeler(id)
);`, why: "sobe_adi işçidən yox, sobe_id-dən asılıdır (tranzitiv asılılıq — 3NF pozulur). Şöbənin adı dəyişəndə yüzlərlə sətir yenilənməli olur." },
        ],
      },
      {
        level: "senior",
        title: "Denormallaşdırma: nə vaxt qaydanı pozmaq olar?",
        blocks: [
          { t: "p", text: "Normallaşdırma yazmanı sadə və təhlükəsiz edir, amma oxuma zamanı JOIN tələb edir. Denormallaşdırma — oxumanı sürətləndirmək üçün şüurlu şəkildə təkrar saxlamaqdır. Bu, optimizasiyadır: ölçmədən əvvəl etmə." },
          { t: "list", items: [
            "Qanuni «təkrar»: tarixi fakt. Sifariş sətrindəki qiymət məhsulun indiki qiyməti deyil — satış anının şəklidir. Bu denormallaşdırma deyil, düzgün modeldir.",
            "Hesablanan sütunlar (sifariş cəmi, rəy sayı): ya hər dəfə hesabla, ya saxla və sinxron saxlamağın yolunu təmin et (trigger, eyni tranzaksiya, materialized view).",
            "Hesabat/analitika: ulduz sxem (fakt + ölçü cədvəlləri) qəsdən denormaldır. OLTP (əməliyyat) normal, OLAP (analiz) denormal.",
            "JSON sütunu: struktur dəyişkəndirsə (məhsul xüsusiyyətləri) rahatdır, amma içində axtarış, FK və constraint zəifdir. Əsas əlaqələri JSON-a qoyma.",
            "BCNF, 4NF, 5NF nəzəri davamdır; praktikada 3NF əksər sistemlər üçün kifayətdir.",
            "TƏHLÜKƏSİZLİK: həssas məlumatın (email, telefon, FİN) hər nüsxəsi ayrıca sızma nöqtəsidir. Denormal nüsxə şifrələmədən, maskalamadan və «məni unut» (GDPR silmə) prosesindən kənarda qala bilər — məlumat bir yerdə silinir, o birində yaşayır.",
            "TƏHLÜKƏSİZLİK: icazə məlumatını (rol, sahiblik) təkrar saxlama. Rol bir cədvəldə ləğv olunub, köhnə nüsxədə qalıbsa — istifadəçi hələ də admindir.",
            "TƏHLÜKƏSİZLİK: ayrı cədvəl ayrı icazə deməkdir. Həssas sütunları (parol_hash, ödəniş) ayrı cədvələ çıxar — hesabat istifadəçisinə yalnız lazımi cədvələ GRANT ver.",
          ]},
          { t: "qa", items: [
            ["3NF-i bir cümlə ilə izah et.", "Açar olmayan hər sütun açardan, bütöv açardan və yalnız açardan asılıdır."],
            ["Denormallaşdırma nə vaxt əsaslıdır?", "Ölçülmüş oxuma problemi olanda və sinxronluğu təmin edən mexanizm olanda (trigger, materialized view, tranzaksiya)."],
            ["Sifariş sətrində qiyməti saxlamaq təkrardırmı?", "Xeyr. O, satış anındakı qiymətdir — məhsulun cari qiymətindən fərqli faktdır."],
          ]},
          { t: "h", text: "Audit və izlənmə" },
          { t: "p", text: "Təhlükəsizlik yalnız qarşısını almaq deyil, baş verənləri aşkarlamaq və araşdırmaqdır. Kritik cədvəllərdə kim, nə vaxt, nəyi dəyişdi qeydə alınmalıdır." },
          { t: "code", lang: "sql", code: `CREATE TABLE audit_log (
  id         INTEGER PRIMARY KEY,
  vaxt       TEXT NOT NULL DEFAULT (datetime('now')),
  istifadeci TEXT,               -- tətbiq səviyyəsində kimdir
  cedvel     TEXT NOT NULL,
  emeliyyat  TEXT NOT NULL CHECK (emeliyyat IN ('INSERT', 'UPDATE', 'DELETE')),
  setir_id   INTEGER,
  kohne      TEXT,               -- JSON
  yeni       TEXT                -- JSON
);

-- SQLite trigger nümunəsi: rol dəyişəndə qeyd et
CREATE TRIGGER trg_rol_audit
AFTER UPDATE OF rol ON istifadeciler
BEGIN
  INSERT INTO audit_log (cedvel, emeliyyat, setir_id, kohne, yeni)
  VALUES ('istifadeciler', 'UPDATE', NEW.id,
          json_object('rol', OLD.rol), json_object('rol', NEW.rol));
END;` },
          { t: "list", items: [
            "Audit cədvəli yalnız INSERT ilə yazılmalıdır: tətbiq hesabına UPDATE/DELETE hüququ vermə (dəyişməz iz).",
            "Mümkün olduqda audit məlumatını ayrı sistemə (log anbarı) göndər ki, hücumçu öz izlərini silə bilməsin.",
            "Həssas dəyərləri (parol heşi, token) audit-ə yazma; yalnız dəyişdiyini qeyd et.",
            "«Soft delete» (silinib işarəsi) məlumatı saxlayır, amma şəxsi məlumat qanunları (məsələn GDPR) üçün həqiqi silmə və saxlanma müddəti siyasəti də lazımdır.",
            "Normallaşdırma həssas məlumatı bir yerdə saxlamağa kömək edir: şəxsi sahələr bir cədvəldədirsə, onların qorunması, şifrələnməsi və silinməsi asan olur.",
          ]},
          { t: "qa", items: [
            ["Audit log-un məqsədi nədir?", "Kim, nə vaxt, nəyi dəyişdi — incident araşdırması, uyğunluq (compliance) və sui-istifadənin aşkarlanması üçün dəyişməz iz saxlamaq."],
            ["Audit cədvəlinə yazma hüququ necə məhdudlaşdırılır?", "Tətbiq hesabına yalnız INSERT verilir; UPDATE və DELETE verilmir və ya trigger ilə bloklanır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Bir xanada 'Qələm, Dəftər, Çanta' saxlamaq hansı formanı pozur?", options: ["1NF", "2NF", "3NF"], answer: 0, why: "1NF atomar dəyər tələb edir." },
          { t: "quiz", q: "isciler cədvəlində sobe_adi sütunu niyə problemdir?", options: ["Çox yer tutur", "Şöbədən asılıdır, işçidən yox — təkrar və ziddiyyət", "Tipi səhvdir"], answer: 1, why: "Tranzitiv asılılıq — 3NF pozulur." },
        ],
      },
    ],
    exercise: {
      task: "Bu pis cədvəli 3NF-ə gətir: derzler(id, telebe_ad, telebe_email, muellim_ad, muellim_telefon, fennler) — fennler xanasında 'Riyaziyyat, Fizika' kimi siyahı var. Lazımi cədvəlləri CREATE TABLE ilə yaz (PK, FK, NOT NULL, UNIQUE), hər birinə 2 sətir əlavə et və JOIN ilə «tələbə — fənn — müəllim» siyahısını çıxar.",
      starter: `-- telebeler2, muellimler2, fennler, ... cədvəllərini yarat\n`,
      expect: "Ən azı 4 cədvəl: tələbələr, müəllimlər, fənlər (müəllimə FK) və aralıq cədvəl (tələbə–fənn, mürəkkəb PK); siyahı sütunu yoxdur; email UNIQUE; müəllim telefonu yalnız müəllim cədvəlində; JOIN sorğusu işləyir.",
    },
  },
  {
    slug: "index",
    title: "İndekslər",
    intro: "İndeks — axtarışı sürətləndirən əlavə quruluşdur. Onsuz baza lazımi sətri tapmaq üçün bütün cədvəli oxuyur; indekslə birbaşa lazımi yerə gedir.",
    sections: [
      {
        level: "baslangic",
        title: "Kitabın göstəricisi",
        blocks: [
          { t: "analogy", text: "500 səhifəlik kitabda «JOIN» sözünü axtarırsan. Göstərici (indeks) yoxdursa, bütün səhifələri vərəqləyirsən. Kitabın sonundakı əlifba göstəricisində isə: «JOIN — səh. 214». İndeks məhz budur: sıralanmış siyahı + ünvan." },
          { t: "code", lang: "sql", code: `-- İndekssiz: bütün cədvəl oxunur
EXPLAIN QUERY PLAN
SELECT * FROM telebeler WHERE seher = 'Gəncə';
-- SCAN telebeler

CREATE INDEX idx_telebeler_seher ON telebeler(seher);

-- İndekslə: birbaşa axtarış
EXPLAIN QUERY PLAN
SELECT * FROM telebeler WHERE seher = 'Gəncə';
-- SEARCH telebeler USING INDEX idx_telebeler_seher (seher=?)` },
          { t: "terms", items: [
            ["indeks (index)", "sütun dəyərlərinin sıralanmış nüsxəsi + sətrin ünvanı."],
            ["tam skan (full scan)", "cədvəlin bütün sətirlərinin oxunması."],
            ["EXPLAIN", "bazanın sorğunu necə icra edəcəyini (planı) göstərir."],
            ["CREATE INDEX", "indeks yaradır; DROP INDEX silir."],
          ]},
          { t: "tip", text: "PRIMARY KEY və UNIQUE sütunlarına indeks avtomatik qurulur. Əl ilə indeks ən çox WHERE, JOIN və ORDER BY-da işlənən sütunlara lazımdır." },
        ],
      },
      {
        level: "orta",
        title: "Mürəkkəb indeks və indeksin qiyməti",
        blocks: [
          { t: "code", lang: "sql", caption: "Mürəkkəb (composite) indeks — sütun sırası vacibdir", code: `CREATE INDEX idx_seher_yas ON telebeler(seher, yas);

-- İşlədir: sol sütundan başlayır
EXPLAIN QUERY PLAN SELECT * FROM telebeler WHERE seher = 'Bakı';
EXPLAIN QUERY PLAN SELECT * FROM telebeler WHERE seher = 'Bakı' AND yas > 19;

-- İşlətmir: sol sütun (seher) yoxdur
EXPLAIN QUERY PLAN SELECT * FROM telebeler WHERE yas > 19;` },
          { t: "p", text: "Telefon kitabçasını düşün: soyad, sonra ad üzrə sıralanıb. «Quliyev» soyadlıları tapmaq asandır; «adı Tural olan hər kəs» üçün isə bütün kitabı oxumalısan. Mürəkkəb indeks də belədir — soldan sağa işləyir (leftmost prefix)." },
          { t: "list", items: [
            "İndeks pulsuz deyil: hər INSERT/UPDATE/DELETE indeksi də yeniləyir və indeks disk tutur.",
            "Az fərqli dəyəri olan sütun (cins, aktiv/passiv) tək başına zəif indeksdir — onsuz da sətirlərin yarısı qayıdır.",
            "Kiçik cədvəldə (yüzlərlə sətir) tam skan indeksdən sürətli ola bilər — planlayıcı özü seçir.",
            "Unikal indeks həm sürət, həm qaydadır: CREATE UNIQUE INDEX ... ON istifadeciler(email).",
          ]},
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM telebeler WHERE UPPER(seher) = 'BAKI';
-- sütuna funksiya tətbiq olunub → indeks işləmir`, right: `SELECT * FROM telebeler WHERE seher = 'Bakı';
-- və ya ifadə indeksi:
CREATE INDEX idx_seher_upper ON telebeler(UPPER(seher));`, why: "İndeks sütunun xam dəyərini saxlayır. Sütunu funksiyaya və ya hesablamaya salsan (yas + 1 > 20), indeks istifadə olunmur." },
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM telebeler WHERE ad LIKE '%sel';
-- əvvəldə % → indeks işləmir`, right: `SELECT * FROM telebeler WHERE ad LIKE 'Ay%';
-- prefiks axtarışı indeksi işlədə bilir`, why: "Sıralanmış siyahıda sözün sonuna görə axtarmaq olmur. İçində axtarış üçün tam mətn (full-text) və ya trigram indeksi lazımdır." },
        ],
      },
      {
        level: "senior",
        title: "B-tree, örtən indeks, planlayıcı və təhlükəsizlik",
        blocks: [
          { t: "p", text: "Default indeks B-tree-dir: balanslı ağac, yarpaqları sıralıdır. Axtarış O(log n): milyard sətirdə 4–5 səviyyə. Bərabərlik, aralıq (BETWEEN, >), prefiks LIKE və ORDER BY üçün işləyir. Mürəkkəb indeksdə qayda: əvvəl bərabərlik sütunları, sonra aralıq/sıralama sütunu." },
          { t: "list", items: [
            "Örtən indeks (covering): sorğuya lazım olan bütün sütunlar indeksdədirsə, cədvələ heç baxılmır (index-only scan). PostgreSQL/SQL Server-də INCLUDE (...).",
            "Qismən indeks (partial): CREATE INDEX ... WHERE silinib IS NULL — yalnız lazımi sətirlər, kiçik və sürətli.",
            "Seçicilik (selectivity): planlayıcı statistikaya baxır. Sətirlərin böyük hissəsi qayıdacaqsa, indeks yerinə skan seçir. Statistika köhnədirsə (ANALYZE), plan pis olur.",
            "Klasterli indeks: InnoDB və SQL Server-də cədvəlin özü PK üzrə sıralı saxlanır; ikinci dərəcəli indekslər PK-nı saxlayır — uzun PK bütün indeksləri şişirdir.",
            "Xüsusi növlər: Hash (yalnız =), GIN (JSONB, massiv, tam mətn), GiST (coğrafi), BRIN (çox böyük, təbii sıralı cədvəllər).",
            "İstifadəsiz indeksləri sil: yazmanı yavaşladır. PostgreSQL-də pg_stat_user_indexes. Production-da CREATE INDEX CONCURRENTLY — cədvəli kilidləmir.",
            "TƏHLÜKƏSİZLİK — DoS: indekssiz sütunda axtarışa icazə verən açıq API (məs. ?axtar=%a%) hər sorğuda tam skan edir. Hücumçu bir neçə paralel sorğu ilə bazanı dondurur. Filtr sahələrini ağ siyahıya al, LIMIT və statement_timeout qoy.",
            "TƏHLÜKƏSİZLİK: unikal indeks yarış vəziyyətinə (race condition) qarşı yeganə etibarlı müdafiədir. «Əvvəl SELECT ilə yoxla, sonra INSERT et» iki paralel sorğuda dublikat hesab yaradır.",
            "TƏHLÜKƏSİZLİK: indeks məlumatın nüsxəsidir. Şifrələnmiş sütunun açıq dəyərinə indeks qurma; unikal pozuntu xətasını istifadəçiyə olduğu kimi göstərmə («bu email artıq var» — hesab siyahıyaalması).",
          ]},
          { t: "qa", items: [
            ["İndeks niyə yazmanı yavaşladır?", "Hər INSERT/UPDATE/DELETE cədvəllə yanaşı bütün əlaqəli indeksləri də yeniləməlidir."],
            ["(a, b) indeksi WHERE b = 5 üçün işləyirmi?", "Adətən yox — indeks soldan sağa işləyir, a şərti olmadan b üzrə sıralı deyil."],
            ["Örtən indeks nədir?", "Sorğunun bütün sütunlarını özündə saxlayan indeks; cədvələ müraciət lazım olmur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "İndeks ən çox hansı əməliyyatı sürətləndirir?", options: ["INSERT", "WHERE ilə axtarış", "DROP TABLE"], answer: 1, why: "İndeks oxumanı sürətləndirir, yazmanı isə bir qədər yavaşladır." },
          { t: "quiz", q: "(seher, yas) indeksi hansı sorğuda işləmir?", options: ["WHERE seher = 'Bakı'", "WHERE seher = 'Bakı' AND yas = 20", "WHERE yas = 20"], answer: 2, why: "Sol sütun (seher) şərtdə yoxdur." },
        ],
      },
    ],
    exercise: {
      task: "1) EXPLAIN QUERY PLAN ilə «qeydiyyat-da bal > 85» sorğusunun planına bax. 2) bal sütununa indeks yarat və planı yenidən yoxla. 3) (kurs_id, bal) mürəkkəb indeksi yarat və «kurs_id = 2 AND bal > 80» sorğusunun onu işlətdiyini göstər. 4) telebeler-in soyad sütununa UNIQUE indeks yarat və eyni soyadlı tələbə əlavə etməyə çalış.",
      starter: `-- 1)\nEXPLAIN QUERY PLAN\nSELECT * FROM qeydiyyat WHERE bal > 85;\n\n-- 2)\n`,
      expect: "Əvvəl SCAN, CREATE INDEX ... ON qeydiyyat(bal)-dan sonra SEARCH ... USING INDEX; mürəkkəb indeks (kurs_id, bal) sırası ilə və plan onu göstərir; CREATE UNIQUE INDEX ... ON telebeler(soyad); təkrar soyadlı INSERT UNIQUE constraint xətası verir.",
    },
  },
  {
    slug: "tranzaksiya",
    title: "Tranzaksiyalar və ACID",
    intro: "Tranzaksiya — bir neçə əmri tək bölünməz əməliyyata çevirir: ya hamısı icra olunur, ya heç biri. Pul köçürməsi, sifariş, stok — hər yerdə lazımdır.",
    sections: [
      {
        level: "baslangic",
        title: "Ya hamısı, ya heç nə",
        blocks: [
          { t: "analogy", text: "Bankomatdan kartdan karta pul köçürürsən. İki addım var: sənin hesabından çıxmaq və dostunun hesabına əlavə etmək. Birinci addımdan sonra işıq sönsə? Pul səndən çıxıb, dostuna çatmayıb. Tranzaksiya deyir: «ikisi də olmayıbsa, heç biri olmayıb» — pul geri qayıdır." },
          { t: "code", lang: "sql", code: `CREATE TABLE hesablar (
  id INTEGER PRIMARY KEY,
  sahib TEXT NOT NULL,
  balans REAL NOT NULL CHECK (balans >= 0)
);
INSERT INTO hesablar VALUES (1, 'Aysel', 100), (2, 'Murad', 50);

BEGIN;
  UPDATE hesablar SET balans = balans - 30 WHERE id = 1;
  UPDATE hesablar SET balans = balans + 30 WHERE id = 2;
COMMIT;   -- dəyişikliklər daimi oldu

BEGIN;
  UPDATE hesablar SET balans = 0;   -- səhvən WHERE unuduldu!
  SELECT * FROM hesablar;           -- hamının balansı 0 görünür
ROLLBACK;                           -- hər şeyi geri qaytar

SELECT * FROM hesablar;             -- 70 və 80 yerindədir` },
          { t: "p", text: "Tranzaksiyanın içində xəta baş verərsə (məs. balans CHECK qaydasını pozarsa), tətbiq kodu xətanı tutub ROLLBACK çağırmalıdır — yarımçıq dəyişiklik bazada qalmamalıdır." },
          { t: "terms", items: [
            ["tranzaksiya", "bir vahid kimi icra olunan əmrlər qrupu."],
            ["BEGIN", "tranzaksiyanı başladır."],
            ["COMMIT", "dəyişiklikləri təsdiqləyir — daimi olur."],
            ["ROLLBACK", "tranzaksiyadakı bütün dəyişiklikləri ləğv edir."],
          ]},
          { t: "tip", text: "BEGIN yazmasan, hər əmr özü ayrıca tranzaksiyadır (autocommit) — dərhal təsdiqlənir və geri qaytarılmır." },
        ],
      },
      {
        level: "orta",
        title: "ACID və paralel işləmə",
        blocks: [
          { t: "list", items: [
            "A — Atomicity (bölünməzlik): ya hamısı, ya heç biri.",
            "C — Consistency (uyğunluq): tranzaksiya bazanı bir düzgün vəziyyətdən digərinə aparır; constraint-lər pozulmur.",
            "I — Isolation (təcrid): paralel tranzaksiyalar bir-birinin yarımçıq işini görmür.",
            "D — Durability (davamlılıq): COMMIT-dən sonra işıq sönsə də məlumat itmir.",
          ]},
          { t: "code", lang: "text", caption: "Təcrid səviyyələri və qarşısını aldığı problemlər", code: `Səviyyə            dirty read   non-repeatable read   phantom
READ UNCOMMITTED   mümkün       mümkün                mümkün
READ COMMITTED     yox          mümkün                mümkün     (PostgreSQL, SQL Server default)
REPEATABLE READ    yox          yox                   mümkün*    (MySQL InnoDB default)
SERIALIZABLE       yox          yox                   yox        (ən ciddi, ən yavaş)` },
          { t: "terms", items: [
            ["dirty read", "başqasının hələ COMMIT etmədiyi dəyişikliyi oxumaq."],
            ["non-repeatable read", "eyni sətri iki dəfə oxuyanda fərqli nəticə almaq."],
            ["phantom read", "eyni şərtlə ikinci oxuyuşda yeni sətirlərin peyda olması."],
            ["lost update", "iki tranzaksiya eyni dəyəri oxuyub yazır — biri digərinin dəyişikliyini silir."],
          ]},
          { t: "mistake", lang: "sql", wrong: `-- tətbiq kodunda:
-- 1) SELECT stok FROM mehsullar WHERE id = 7;  → 1
-- 2) if (stok > 0) UPDATE mehsullar SET stok = 0 WHERE id = 7;
-- iki alıcı eyni anda: ikisi də 1 oxuyur, ikisi də alır`, right: `UPDATE mehsullar
SET stok = stok - 1
WHERE id = 7 AND stok > 0;
-- dəyişən sətir sayı 0-dırsa — mal bitib`, why: "«Oxu, yoxla, yaz» ardıcıllığı paralel sorğularda yarış vəziyyəti yaradır. Yoxlamanı və dəyişikliyi bir atomar əmrə sal və ya sətri kilidlə (SELECT … FOR UPDATE)." },
          { t: "mistake", lang: "sql", wrong: `BEGIN;
UPDATE hesablar SET balans = balans - 30 WHERE id = 1;
-- ...xarici API-yə sorğu, 10 saniyə gözləmə...
COMMIT;`, right: `-- xarici çağırışı tranzaksiyadan ƏVVƏL və ya SONRA et;
-- tranzaksiya qısa olsun`, why: "Açıq tranzaksiya kilidləri saxlayır: başqa sorğular gözləyir, bağlantılar tükənir. Tranzaksiyanın içində şəbəkə çağırışı və istifadəçi gözləməsi olmamalıdır." },
        ],
      },
      {
        level: "senior",
        title: "MVCC, kilidlər, deadlock və yarış hücumları",
        blocks: [
          { t: "list", items: [
            "MVCC (PostgreSQL, InnoDB): hər tranzaksiya məlumatın öz «şəklini» (snapshot) görür; oxuyanlar yazanları bloklamır. Əvəzində köhnə versiyalar təmizlənməlidir (VACUUM).",
            "Pessimist kilid: SELECT … FOR UPDATE sətri tranzaksiya bitənə qədər kilidləyir. Növbə işləri üçün FOR UPDATE SKIP LOCKED.",
            "Optimist kilid: sətirdə versiya sütunu; UPDATE … WHERE id = ? AND versiya = ?. Sıfır sətir dəyişibsə — başqası qabaqlayıb, yenidən cəhd et.",
            "Deadlock: A tranzaksiyası 1-ci sətri tutub 2-cini gözləyir, B isə əksinə. Baza birini ləğv edir. Qarşısı: sətirləri həmişə eyni sırada kilidlə, tranzaksiyanı qısa saxla, xətada yenidən cəhd et.",
            "SERIALIZABLE və deadlock xətaları normaldır — tətbiq onları tutub tranzaksiyanı təkrarlamalıdır.",
            "Davamlılıq WAL (write-ahead log) ilə təmin olunur: dəyişiklik əvvəl jurnala yazılır, sonra cədvələ. Replikasiya və bərpa da bu jurnala əsaslanır.",
            "Bir neçə xidmət arasında tək ACID tranzaksiya olmur: saga, outbox nümunəsi və idempotent əməliyyatlar işlədilir.",
            "TƏHLÜKƏSİZLİK — yarış hücumu (race condition): hücumçu eyni sorğunu paralel 50 dəfə göndərir — bir kuponu 50 dəfə işlədir, balansından artıq pul çıxarır. Müdafiə: atomar UPDATE … WHERE şərt, unikal indeks, FOR UPDATE.",
            "TƏHLÜKƏSİZLİK — idempotentlik: ödəniş sorğusu şəbəkə xətasına görə təkrarlanırsa, ikiqat çıxılmamalıdır. Müştəri unikal açar (idempotency key) göndərir, server onu UNIQUE sütunda saxlayır.",
            "TƏHLÜKƏSİZLİK: pul və icazə əməliyyatlarını eyni tranzaksiyada audit cədvəlinə yaz — əməliyyat var, jurnal yoxdur halı olmasın. READ UNCOMMITTED-i maliyyə məlumatında işlətmə.",
          ]},
          { t: "code", lang: "sql", caption: "PostgreSQL: sətri kilidləyərək təhlükəsiz köçürmə", code: `BEGIN;
  SELECT balans FROM hesablar WHERE id = 1 FOR UPDATE;  -- sətir kilidləndi
  UPDATE hesablar SET balans = balans - 30 WHERE id = 1 AND balans >= 30;
  UPDATE hesablar SET balans = balans + 30 WHERE id = 2;
  INSERT INTO audit (hesab_id, mebleg, nov) VALUES (1, -30, 'kocurme');
COMMIT;` },
          { t: "qa", items: [
            ["ACID nədir?", "Atomicity, Consistency, Isolation, Durability — tranzaksiyanın dörd zəmanəti."],
            ["Optimist və pessimist kilid fərqi?", "Pessimist sətri əvvəlcədən kilidləyir (toqquşma çoxdursa); optimist kilidsiz işləyir və yazanda versiyanı yoxlayır (toqquşma nadirdirsə)."],
            ["Deadlock-un qarşısı necə alınır?", "Resursları sabit sırada kilidləmək, qısa tranzaksiyalar, xətada yenidən cəhd."],
            ["Lost update necə baş verir?", "İki tranzaksiya eyni dəyəri oxuyur, hərəsi öz hesablamasını yazır — sonuncu əvvəlkini əzir."],
          ]},
          { t: "h", text: "Race condition-lar və atomiklik" },
          { t: "p", text: "Yarış vəziyyəti iki sorğu eyni vaxtda eyni məlumata toxunduqda baş verir. Klassik nümunə: balansı oxu, tətbiqdə yoxla, sonra yenilə — iki paralel sorğu eyni balansı oxuyub hər ikisi çıxarış edə bilər (double-spend). Bu həm səhv, həm də istismar oluna bilən təhlükəsizlik problemidir (kupon, bonus, stok, pul köçürməsi)." },
          { t: "code", lang: "sql", code: `-- TƏHLÜKƏLİ: oxu → qərar → yaz (aralıqda başqa sorğu girə bilər)
SELECT balans FROM hesablar WHERE id = 1;       -- 100
-- tətbiq: 100 >= 80, deməli olar
UPDATE hesablar SET balans = 20 WHERE id = 1;   -- 2-ci sorğu da 100 oxuyub idi

-- DÜZGÜN 1: şərt UPDATE-in özündə (atomik)
UPDATE hesablar SET balans = balans - 80
WHERE id = 1 AND balans >= 80;
-- təsirlənən sətir sayı 0 olarsa → balans kifayət etmir

-- DÜZGÜN 2: tranzaksiya + CHECK məhdudiyyəti
-- CREATE TABLE hesablar (..., balans INTEGER NOT NULL CHECK (balans >= 0));
BEGIN IMMEDIATE;     -- SQLite: yazma kilidi dərhal alınır
UPDATE hesablar SET balans = balans - 80 WHERE id = 1;
UPDATE hesablar SET balans = balans + 80 WHERE id = 2;
COMMIT;

-- Kupon: yalnız bir dəfə istifadə
UPDATE kuponlar SET istifade_olundu = 1 WHERE kod = ? AND istifade_olundu = 0;` },
          { t: "list", items: [
            "Qərarı verilənlər bazasında ver: şərtli UPDATE ... WHERE şərt, UNIQUE məhdudiyyəti, CHECK məhdudiyyəti. Tətbiqdə «yoxla, sonra yaz» (check-then-act) yarış üçün açıqdır.",
            "UNIQUE indeksi dublikat əməliyyatları da (eyni sifarişin iki dəfə göndərilməsi, idempotency key) qoruyur.",
            "PostgreSQL/MySQL-də: SELECT ... FOR UPDATE sətri kilidləyir; izolyasiya səviyyəsi (READ COMMITTED, REPEATABLE READ, SERIALIZABLE) hansı anomaliyaların mümkün olduğunu təyin edir. SERIALIZABLE-da tətbiq serializasiya xətasında əməliyyatı yenidən cəhd etməlidir.",
            "Tranzaksiyaları qısa saxla; daxilində xarici HTTP çağırışı və ya istifadəçi gözləməsi olmasın (kilid uzun qalır, deadlock riski artır).",
            "Deadlock: iki tranzaksiya sətirləri fərqli ardıcıllıqla kilidlədikdə — həmişə eyni ardıcıllıqla kilidlə və xətanı tutub yenidən cəhd et.",
          ]},
          { t: "mistake", lang: "sql", wrong: `SELECT stok FROM mehsullar WHERE id = 7;      -- 1
-- tətbiq: stok > 0 → OK
UPDATE mehsullar SET stok = stok - 1 WHERE id = 7;`, right: `UPDATE mehsullar SET stok = stok - 1 WHERE id = 7 AND stok > 0;
-- təsirlənən sətir = 0 → stok bitib`, why: "Oxuma və yazma arasında başqa sorğu girə bilər və stok mənfiyə düşər (oversell). Şərti dəyişiklik bir atomik əməliyyatdır." },
          { t: "qa", items: [
            ["Race condition-un verilənlər bazasında qarşısı necə alınır?", "Atomik şərtli UPDATE, UNIQUE/CHECK məhdudiyyətləri, tranzaksiya və lazım olduqda SELECT FOR UPDATE ya da yüksək izolyasiya səviyyəsi ilə."],
            ["Double-spend problemi nədir?", "Eyni balansdan paralel sorğularla iki dəfə çıxarış etmək; oxu-yoxla-yaz ardıcıllığı atomik olmadıqda baş verir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Tranzaksiyanın ortasında xəta oldu. Dəyişiklikləri ləğv edən əmr?", options: ["COMMIT", "ROLLBACK", "DELETE"], answer: 1, why: "ROLLBACK BEGIN-dən bəri olan hər şeyi geri qaytarır." },
          { t: "quiz", q: "COMMIT-dən sonra server sönsə, məlumat qalır. Bu hansı xüsusiyyətdir?", options: ["Atomicity", "Isolation", "Durability"], answer: 2, why: "Durability — təsdiqlənmiş məlumat itmir." },
        ],
      },
    ],
    exercise: {
      task: "anbar (id PK, mehsul, stok — mənfi ola bilməz) cədvəli yarat, 'Klaviatura' 5 ədəd əlavə et. 1) Tranzaksiya ilə 2 ədəd sat və COMMIT et. 2) Yeni tranzaksiyada 10 ədəd satmağa çalış — yoxlama UPDATE-in öz WHERE şərtində olsun (stok >= 10), sonra ROLLBACK et. 3) Sonda stokun 3 olduğunu SELECT ilə göstər.",
      starter: `CREATE TABLE anbar (\n\n);\n\nBEGIN;\n-- ...\nCOMMIT;\n`,
      expect: "stok CHECK (stok >= 0); birinci BEGIN ... UPDATE stok = stok - 2 ... COMMIT; ikinci UPDATE ... WHERE ... AND stok >= 10 (atomar yoxlama) və ROLLBACK; son SELECT stok = 3 göstərir; ayrıca SELECT ilə yoxlayıb sonra UPDATE etmə nümunəsi yoxdur.",
    },
  },
  {
    slug: "window",
    title: "Senior: window funksiyaları",
    intro: "Window funksiyası sətirləri qruplaşdırıb birləşdirmir — hər sətri saxlayır və ona «pəncərədəki» qonşu sətirlər üzrə hesablama əlavə edir: sıra nömrəsi, yığılan cəm, əvvəlki sətirlə fərq.",
    sections: [
      {
        level: "baslangic",
        title: "OVER — sətri itirmədən hesabla",
        blocks: [
          { t: "analogy", text: "GROUP BY — sinfin orta balını lövhəyə yazmaqdır: tələbələr «itir», bir rəqəm qalır. Window funksiyası — hər tələbənin jurnalındakı balının yanına əlavə sütun yazmaqdır: «sinif ortası 82, sən 3-cü yerdəsən». Tələbə də qalır, hesablama da." },
          { t: "code", lang: "sql", code: `SELECT telebe_id, kurs_id, bal,
       AVG(bal)     OVER ()                      AS umumi_orta,
       RANK()       OVER (ORDER BY bal DESC)     AS yer,
       ROW_NUMBER() OVER (ORDER BY bal DESC)     AS sira
FROM qeydiyyat;` },
          { t: "terms", items: [
            ["window funksiyası", "sətirləri birləşdirmədən, əlaqəli sətirlər çoxluğu üzrə hesablayan funksiya."],
            ["OVER (...)", "pəncərəni təyin edir; boş OVER () — bütün nəticə."],
            ["ROW_NUMBER()", "ardıcıl nömrə: 1, 2, 3, 4."],
            ["RANK()", "yer; bərabərlərdə eyni, sonra boşluq: 1, 2, 2, 4."],
            ["DENSE_RANK()", "yer; boşluqsuz: 1, 2, 2, 3."],
          ]},
          { t: "tip", text: "Fərq: GROUP BY 8 sətirdən 4 qrup düzəldir. Window funksiyası 8 sətri 8 sətir saxlayır və hərəsinə hesablama əlavə edir." },
        ],
      },
      {
        level: "orta",
        title: "PARTITION BY, LAG/LEAD, yığılan cəm",
        blocks: [
          { t: "code", lang: "sql", caption: "PARTITION BY — hər qrup üçün ayrı pəncərə", code: `SELECT k.ad AS kurs, t.ad AS telebe, q.bal,
       RANK() OVER (PARTITION BY q.kurs_id ORDER BY q.bal DESC) AS kursda_yer,
       ROUND(AVG(q.bal) OVER (PARTITION BY q.kurs_id), 1)       AS kurs_ortasi,
       q.bal - AVG(q.bal) OVER (PARTITION BY q.kurs_id)         AS ortadan_ferq
FROM qeydiyyat q
JOIN telebeler t ON t.id = q.telebe_id
JOIN kurslar  k ON k.id = q.kurs_id
ORDER BY kurs, kursda_yer;` },
          { t: "code", lang: "sql", caption: "Hər kursun ən yaxşı tələbəsi (top-N per group)", code: `WITH siralanmis AS (
  SELECT q.*, ROW_NUMBER() OVER (
           PARTITION BY kurs_id ORDER BY bal DESC, telebe_id
         ) AS rn
  FROM qeydiyyat q
)
SELECT kurs_id, telebe_id, bal
FROM siralanmis
WHERE rn = 1;` },
          { t: "code", lang: "sql", caption: "LAG və yığılan cəm (running total)", code: `SELECT telebe_id, kurs_id, bal,
       LAG(bal) OVER (ORDER BY bal)              AS evvelki_bal,
       bal - LAG(bal) OVER (ORDER BY bal)        AS ferq,
       SUM(bal) OVER (ORDER BY bal, telebe_id)   AS yigilan_cem
FROM qeydiyyat;` },
          { t: "mistake", lang: "sql", wrong: `SELECT telebe_id, bal,
       RANK() OVER (ORDER BY bal DESC) AS yer
FROM qeydiyyat
WHERE yer <= 3;  -- XƏTA: yer hələ mövcud deyil`, right: `SELECT * FROM (
  SELECT telebe_id, bal,
         RANK() OVER (ORDER BY bal DESC) AS yer
  FROM qeydiyyat
) s
WHERE yer <= 3;`, why: "Window funksiyaları WHERE, GROUP BY və HAVING-dən SONRA hesablanır. Nəticəsinə görə filtrləmək üçün alt sorğu və ya CTE lazımdır." },
          { t: "mistake", lang: "sql", wrong: `ROW_NUMBER() OVER (PARTITION BY kurs_id ORDER BY bal DESC)
-- eyni ballı iki tələbə: kim birinci olacaq — təsadüfi`, right: `ROW_NUMBER() OVER (PARTITION BY kurs_id ORDER BY bal DESC, telebe_id)`, why: "Sıralama birmənalı deyilsə, nəticə hər icrada dəyişə bilər. ORDER BY-a unikal sütun əlavə et (tiebreaker)." },
        ],
      },
      {
        level: "senior",
        title: "Çərçivə (frame), icra və təhlükəsizlik",
        blocks: [
          { t: "p", text: "Pəncərənin üç hissəsi var: PARTITION BY (bölmə), ORDER BY (sıra) və çərçivə (frame) — cari sətrə nisbətən hansı sətirlər hesablanır. ORDER BY varsa, default çərçivə RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW-dur — yəni «əvvəldən bura qədər»." },
          { t: "code", lang: "sql", caption: "Sürüşən orta: cari və əvvəlki 2 sətir", code: `SELECT telebe_id, bal,
       ROUND(AVG(bal) OVER (
         ORDER BY bal, telebe_id
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ), 1) AS suruşen_orta
FROM qeydiyyat;` },
          { t: "list", items: [
            "ROWS fiziki sətirləri sayır; RANGE dəyərə görə işləyir və eyni ORDER BY dəyərli sətirləri birlikdə götürür. Yığılan cəmdə bərabər dəyərlər varsa, default RANGE gözlənilməz «sıçrayış» verir — ROWS yaz və ya tiebreaker əlavə et.",
            "LAST_VALUE tələsi: default çərçivə cari sətirdə bitir, ona görə LAST_VALUE cari sətrin özünü qaytarır. ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING yaz.",
            "Məntiqi icra sırası: FROM → WHERE → GROUP BY → HAVING → window → SELECT → DISTINCT → ORDER BY → LIMIT. Ona görə window funksiyası aqreqatın üstündə işləyə bilər: SUM(SUM(mebleg)) OVER (...).",
            "Performans: hər fərqli pəncərə tərifi ayrıca sıralama tələb edir. Eyni tərifi WINDOW w AS (...) ilə adlandırıb təkrar işlət; (partition sütunları, order sütunları) indeksi sıralamanı aradan qaldıra bilər.",
            "Tipik istifadə: top-N per group, dublikatların silinməsi (rn > 1), ardıcıl günlər (gaps and islands), faiz payı, hərəkətli orta, əvvəlki dövrlə müqayisə.",
            "NTILE(4) — kvartillərə bölmə; PERCENT_RANK, CUME_DIST — faiz mövqeyi; FIRST_VALUE / NTH_VALUE — pəncərədən konkret sətir.",
            "TƏHLÜKƏSİZLİK: window funksiyası filtrdən KEÇƏN sətirlər üzrə hesablanır. İcazə filtri (tenant_id, sahiblik) window-dan əvvəl WHERE-də olmalıdır. Filtri bayır sorğuda qoysan, RANK və AVG başqalarının məlumatı üzrə hesablanıb sızır («sən 4827 nəfərdən 12-cisən», orta maaş).",
            "TƏHLÜKƏSİZLİK — nəticədən çıxarış (inference): kiçik qrupda orta və sıra fərdi dəyəri açır (2 nəfərlik şöbədə orta maaş). Hesabatlarda minimum qrup ölçüsü tətbiq et.",
            "TƏHLÜKƏSİZLİK: ORDER BY sütununu istifadəçidən gələn sətirlə qurma — sütun adı parametr ola bilmir, ona görə birləşdirmə injection-dur. Yalnız ağ siyahıdan seç.",
          ]},
          { t: "qa", items: [
            ["ROW_NUMBER, RANK, DENSE_RANK fərqi?", "Bərabər dəyərlərdə: ROW_NUMBER 1,2,3,4; RANK 1,2,2,4; DENSE_RANK 1,2,2,3."],
            ["Niyə window nəticəsini WHERE-də işlətmək olmur?", "WHERE window-dan əvvəl icra olunur. Alt sorğu/CTE lazımdır (bəzi bazalarda QUALIFY var)."],
            ["ROWS ilə RANGE fərqi?", "ROWS sətir sayına görə, RANGE dəyərə görə çərçivə qurur; bərabər dəyərli sətirlər RANGE-də birlikdə hesablanır."],
            ["Hər qrupdan ilk N sətri necə alırsan?", "ROW_NUMBER() OVER (PARTITION BY qrup ORDER BY ...) və bayırda WHERE rn <= N."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Ballar: 99, 95, 95, 91. RANK() nəticəsi?", options: ["1, 2, 3, 4", "1, 2, 2, 4", "1, 2, 2, 3"], answer: 1, why: "RANK bərabərlərə eyni yer verir və növbəti yeri atlayır." },
          { t: "quiz", q: "8 sətirlik cədvəldə AVG(bal) OVER () neçə sətir qaytarır?", options: ["1", "8", "Qrup sayı qədər"], answer: 1, why: "Window funksiyası sətirləri birləşdirmir." },
        ],
      },
    ],
    exercise: {
      task: "Bir sorğu ilə hər qeydiyyat üçün göstər: tələbə adı, kurs adı, bal, kurs daxilində yer (RANK, ən yüksək bal 1-ci), kursun orta balı (1 onluqla) və ümumi sıralamada sıra nömrəsi (ROW_NUMBER, birmənalı). Sonra ikinci sorğu ilə hər tələbənin ən yüksək ballı qeydiyyatını (top-1 per tələbə) CTE + ROW_NUMBER ilə çıxar.",
      starter: `-- 1)\nSELECT t.ad, k.ad AS kurs, q.bal\n  -- window sütunları\nFROM qeydiyyat q\nJOIN telebeler t ON t.id = q.telebe_id\nJOIN kurslar k ON k.id = q.kurs_id;\n\n-- 2)\n`,
      expect: "RANK() OVER (PARTITION BY q.kurs_id ORDER BY q.bal DESC); ROUND(AVG(q.bal) OVER (PARTITION BY q.kurs_id), 1); ROW_NUMBER() OVER (ORDER BY q.bal DESC, + unikal tiebreaker); 2-ci sorğuda CTE-də ROW_NUMBER() OVER (PARTITION BY telebe_id ORDER BY bal DESC ...) və bayırda WHERE rn = 1 — 5 sətir; window nəticəsi birbaşa WHERE-də işlədilməyib.",
    },
  },
  {
    slug: "optimizasiya",
    title: "Senior: sorğu optimizasiyası",
    intro: "Yavaş sorğunu təxminlə sürətləndirmək olmur. Senior yanaşma: ölç → planı oxu → səbəbi tap → düzəlt → yenidən ölç. Bu dərs bütün SQL bölməsinin yekunudur.",
    sections: [
      {
        level: "baslangic",
        title: "Əvvəl ölç: EXPLAIN",
        blocks: [
          { t: "analogy", text: "Maşın yavaş gedir. Usta kapotu açmadan «mühərriki dəyişək» demir — əvvəl diaqnostika cihazını qoşur. EXPLAIN bazanın diaqnostika cihazıdır: sorğunun hansı yolla icra olunacağını göstərir. Çox vaxt problem mühərrikdə yox, əl əyləcinin çəkili qalmasındadır (çatışmayan bir indeks)." },
          { t: "code", lang: "sql", code: `EXPLAIN QUERY PLAN
SELECT t.ad, k.ad, q.bal
FROM qeydiyyat q
JOIN telebeler t ON t.id = q.telebe_id
JOIN kurslar  k ON k.id = q.kurs_id
WHERE q.bal > 85;
-- SCAN q                                        ← bütün qeydiyyat oxunur
-- SEARCH t USING INTEGER PRIMARY KEY (rowid=?)  ← açarla birbaşa
-- SEARCH k USING INTEGER PRIMARY KEY (rowid=?)` },
          { t: "terms", items: [
            ["icra planı (execution plan)", "bazanın sorğunu yerinə yetirmək üçün seçdiyi addımlar."],
            ["SCAN", "bütün cədvəlin oxunması (böyük cədvəldə bahadır)."],
            ["SEARCH", "indeks və ya açarla birbaşa tapmaq."],
            ["planlayıcı (optimizer)", "mümkün planlardan ən ucuzunu seçən baza komponenti."],
          ]},
          { t: "tip", text: "PostgreSQL-də EXPLAIN ANALYZE sorğunu həqiqətən icra edib real vaxtı və sətir sayını göstərir. Təxmini sətir sayı realdan çox fərqlidirsə — statistika köhnədir (ANALYZE işlət)." },
        ],
      },
      {
        level: "orta",
        title: "Ən çox rast gələn səbəblər",
        blocks: [
          { t: "list", items: [
            "Çatışmayan indeks: WHERE, JOIN və ORDER BY sütunlarında.",
            "SELECT *: lazımsız sütunlar şəbəkəni yükləyir və örtən indeksi mümkünsüz edir.",
            "N+1: siyahı üçün 1 sorğu + hər sətir üçün 1 sorğu. Bir JOIN və ya IN (...) ilə əvəz et.",
            "Sargable olmayan şərt: sütuna funksiya, hesablama, əvvəldə % olan LIKE, tip uyğunsuzluğu.",
            "Böyük OFFSET: əvvəlki bütün sətirlər oxunub atılır — keyset pagination işlət.",
            "Lazımsız DISTINCT və ya ORDER BY: əlavə sıralama əməliyyatı.",
          ]},
          { t: "code", lang: "sql", caption: "Səhifələmə: OFFSET əvəzinə keyset", code: `-- Yavaş (dərin səhifədə): 100000 sətir oxunub atılır
-- SELECT * FROM qeydiyyat ORDER BY bal DESC LIMIT 20 OFFSET 100000;

-- Sürətli: son gördüyün dəyərdən davam et
SELECT telebe_id, kurs_id, bal
FROM qeydiyyat
WHERE bal < 91            -- əvvəlki səhifənin son balı
ORDER BY bal DESC
LIMIT 3;` },
          { t: "mistake", lang: "sql", wrong: `-- tətbiq kodunda dövr:
SELECT * FROM telebeler;
-- hər tələbə üçün ayrıca:
SELECT * FROM qeydiyyat WHERE telebe_id = 1;
SELECT * FROM qeydiyyat WHERE telebe_id = 2;
-- ... 1 + N sorğu`, right: `SELECT t.ad, q.kurs_id, q.bal
FROM telebeler t
LEFT JOIN qeydiyyat q ON q.telebe_id = t.id;
-- 1 sorğu`, why: "Hər sorğunun şəbəkə gediş-gəlişi var. 1000 tələbə — 1001 sorğu. ORM-lərdə bu gizli baş verir: eager loading / JOIN işlət." },
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM telebeler
WHERE yas + 1 > 21;`, right: `SELECT id, ad, yas FROM telebeler
WHERE yas > 20;`, why: "Sütun hesablamanın içindədirsə, indeks işləmir. Hesablamanı sabit tərəfə keçir. Və yalnız lazım olan sütunları seç." },
          { t: "mistake", lang: "sql", wrong: `SELECT COUNT(*) FROM qeydiyyat WHERE kurs_id = 2;
-- nəticə > 0 isə «var»`, right: `SELECT EXISTS (SELECT 1 FROM qeydiyyat WHERE kurs_id = 2);`, why: "Varlığı yoxlamaq üçün hamısını saymaq lazım deyil. EXISTS ilk uyğun sətirdə dayanır." },
        ],
      },
      {
        level: "senior",
        title: "Planı oxumaq, sistem səviyyəsi və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Planı içəridən bayıra oxu. Bax: tam skanlar, təxmini və real sətir sayının fərqi, diskə düşən sıralama/heş, böyük cədvəldə nested loop.",
            "JOIN alqoritmləri: nested loop (kiçik + indeks), hash join (böyük, bərabərlik), merge join (hər iki tərəf sıralı). Planlayıcı statistikaya görə seçir — statistika səhvdirsə, seçim də səhvdir.",
            "Parametr «iyləmə» (parameter sniffing): keşlənmiş plan ilk parametrə görə qurulur və başqa dəyər üçün pis ola bilər (SQL Server-də tez-tez).",
            "Yavaş sorğuları tap: pg_stat_statements, MySQL slow query log, SQL Server Query Store. Ən çox CƏMİ vaxt aparan sorğunu optimallaşdır — ən yavaş tək sorğunu yox.",
            "Sorğudan kənar: bağlantı hovuzu (connection pool), oxuma replikaları, keş (Redis), materialized view, arxivləmə və partition — amma əvvəl sorğunu və indeksi düzəlt.",
            "Yazma tərəfi: toplu INSERT (batch), böyük UPDATE/DELETE-i hissələrə böl (kilid və jurnal şişməsin), tranzaksiyanı qısa saxla.",
            "Vaxtından əvvəl optimizasiya etmə: düzgün sxem + əsas indekslər + ölçmə. Hər indeks yazmanın qiymətidir.",
            "TƏHLÜKƏSİZLİK — parametrli sorğu həm təhlükəsizlik, həm sürətdir: injection-u bağlayır VƏ plan keşini işlədir. Sətir birləşdirmə ilə qurulan hər sorğu yeni plan tələb edir və hücuma açıqdır.",
            "TƏHLÜKƏSİZLİK — resurs tükətmə (DoS): limitsiz sorğuya icazə vermə. Həmişə LIMIT (maksimum səhifə ölçüsü serverdə məhdudlaşsın), statement_timeout, sıralama/filtr sahələri ağ siyahıdan. Bir bahalı sorğunu paralel çağıran hücumçu bazanı dayandırır.",
            "TƏHLÜKƏSİZLİK — vaxta əsaslanan sızma: cavab vaxtı məlumat açır (kor SQL injection məhz belə işləyir: şərt doğrudursa gecikmə). Xəta mesajlarında SQL mətni, cədvəl adı və plan göstərmə.",
            "TƏHLÜKƏSİZLİK: yavaş sorğu jurnalında parametr dəyərləri (email, token, şəxsi məlumat) qala bilər — jurnalı qoru və maskala. Tətbiq istifadəçisinə ən az imtiyaz ver; hesabatlar üçün yalnız oxuma hüquqlu ayrıca istifadəçi.",
          ]},
          { t: "code", lang: "sql", caption: "Düzəlişi sübut et: əvvəl və sonra", code: `EXPLAIN QUERY PLAN
SELECT telebe_id, bal FROM qeydiyyat WHERE kurs_id = 2 AND bal > 80;
-- SCAN qeydiyyat

CREATE INDEX idx_qeyd_kurs_bal ON qeydiyyat(kurs_id, bal, telebe_id);

EXPLAIN QUERY PLAN
SELECT telebe_id, bal FROM qeydiyyat WHERE kurs_id = 2 AND bal > 80;
-- SEARCH qeydiyyat USING COVERING INDEX idx_qeyd_kurs_bal (kurs_id=? AND bal>?)` },
          { t: "qa", items: [
            ["Yavaş sorğunu necə araşdırırsan?", "Ölçürəm, EXPLAIN (ANALYZE) ilə planı oxuyuram: skanlar, sətir təxminləri, sıralamalar. Səbəbi tapıb düzəldirəm (indeks, sorğunun yenidən yazılması), sonra yenidən ölçürəm."],
            ["N+1 problemi nədir?", "Siyahı üçün 1 sorğu, sonra hər element üçün ayrıca sorğu. JOIN, IN və ya ORM-in eager loading-i ilə həll olunur."],
            ["Sargable nə deməkdir?", "Search ARGument ABLE — şərtin indeksdən istifadə edə bilməsi. Sütuna funksiya/hesablama tətbiq etmək bunu pozur."],
            ["İndeks əlavə etmək həmişə kömək edirmi?", "Xeyr. Yazmanı yavaşladır, yer tutur; az seçici sütunda planlayıcı onu işlətmir. Hər indeks ölçmə ilə əsaslandırılmalıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Optimizasiyanın ilk addımı?", options: ["İndeks əlavə etmək", "Ölçmək və planı oxumaq", "Serveri böyütmək"], answer: 1, why: "Səbəbi bilmədən edilən dəyişiklik təxmindir." },
          { t: "quiz", q: "100 müəllif və hər biri üçün ayrıca «kitabları» sorğusu — bu nədir?", options: ["Deadlock", "N+1 problemi", "Normallaşdırma"], answer: 1, why: "1 + N sorğu; bir JOIN ilə əvəz olunmalıdır." },
          { t: "quiz", q: "Parametrli sorğunun iki faydası?", options: ["Sürət və rəng", "Injection-dan qorunma və plan keşi", "Az yer və çox indeks"], answer: 1, why: "Dəyər koddan ayrı ötürülür; plan təkrar istifadə olunur." },
        ],
      },
    ],
    exercise: {
      task: "Bu yavaş sorğunu optimallaşdır və sübut et: SELECT * FROM qeydiyyat q, telebeler t WHERE q.telebe_id = t.id AND UPPER(t.seher) = 'BAKI' AND q.bal + 0 > 80 ORDER BY q.bal DESC. 1) EXPLAIN QUERY PLAN ilə əvvəlki planı göstər. 2) Sorğunu yenidən yaz: açıq JOIN, yalnız lazımi sütunlar (ad, kurs_id, bal), sargable şərtlər. 3) Uyğun indeks(lər) yarat. 4) Yeni planı göstər.",
      starter: `-- 1) əvvəlki plan\nEXPLAIN QUERY PLAN\nSELECT * FROM qeydiyyat q, telebeler t\nWHERE q.telebe_id = t.id AND UPPER(t.seher) = 'BAKI' AND q.bal + 0 > 80\nORDER BY q.bal DESC;\n\n-- 2) yeni sorğu\n`,
      expect: "Yeni sorğuda JOIN ... ON, SELECT * yoxdur; t.seher = 'Bakı' (funksiyasız) və q.bal > 80 (hesablamasız); ən azı bir CREATE INDEX (məs. telebeler(seher) və/və ya qeydiyyat(telebe_id, bal)); iki EXPLAIN QUERY PLAN — sonuncuda SEARCH ... USING INDEX görünür; nəticə eyni sətirləri qaytarır.",
    },
  },
];
