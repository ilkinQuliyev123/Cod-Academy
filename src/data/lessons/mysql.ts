import type { Lesson } from "../types";

export const mysql: Lesson[] = [
  {
    slug: "giris",
    title: "MySQL nədir? Quraşdırma",
    intro: "MySQL — dünyada ən çox işlədilən açıq mənbəli verilənlər bazası serveridir. SQL dilini artıq bilirsən; burada onu real serverdə — istifadəçilər, icazələr, şəbəkə ilə birlikdə öyrənəcəksən.",
    sections: [
      {
        level: "baslangic",
        title: "Server və klient",
        blocks: [
          { t: "analogy", text: "Kitabxananı düşün. Kitablar anbardadır, sən ora girmirsən — kitabxanaçıya sifariş verirsən, o gətirir. MySQL serveri kitabxanaçıdır: məlumat ondadır, proqramlar (klientlər) ona sorğu göndərir." },
          { t: "code", lang: "bash", code: `# Ən asan yol: Docker
docker run --name mysql-ders -e MYSQL_ROOT_PASSWORD=GucluSifre_123 -p 3306:3306 -d mysql:8.4

# Serverə qoşul
mysql -u root -p`, caption: "Docker yoxdursa: dev.mysql.com-dan MySQL Installer (Windows) və ya apt install mysql-server (Linux)" },
          { t: "code", lang: "sql", code: `SHOW DATABASES;                 -- bütün bazalar
CREATE DATABASE akademiya;      -- yeni baza
USE akademiya;                  -- onu seç

CREATE TABLE telebeler (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  ad   VARCHAR(50) NOT NULL,
  yas  INT
);

INSERT INTO telebeler (ad, yas) VALUES ('Aysel', 21), ('Murad', 24);
SELECT * FROM telebeler;
SHOW TABLES;
DESCRIBE telebeler;             -- cədvəlin quruluşu` },
          { t: "terms", items: [
            ["server (mysqld)", "məlumatı saxlayan və sorğuları icra edən proqram. Default port: 3306."],
            ["klient", "serverə qoşulan proqram: mysql əmr sətri, MySQL Workbench, DBeaver, sənin tətbiqin."],
            ["baza (database / schema)", "cədvəllərin toplusu. Bir serverdə çoxlu baza ola bilər."],
            ["USE", "sonrakı sorğuların hansı bazada işləyəcəyini seçir."],
            ["AUTO_INCREMENT", "hər yeni sətirə növbəti nömrəni özü verir (1, 2, 3...)."],
          ]},
          { t: "tip", text: "Bu saytın məşq səhifəsi SQL-i brauzerdə SQLite ilə işlədir. Ümumi SQL (SELECT, JOIN, GROUP BY) orada işləyir; yalnız MySQL-ə aid əmrləri (SHOW, CREATE USER, prosedurlar) öz kompüterində sına — belə tapşırıqları AI yoxlayır." },
        ],
      },
      {
        level: "orta",
        title: "MySQL-in SQL-dən fərqli tərəfləri",
        blocks: [
          { t: "code", lang: "sql", code: `-- Kodlaşdırma: Azərbaycan hərfləri və emoji üçün utf8mb4
CREATE DATABASE magaza
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

SELECT VERSION();               -- server versiyası
SELECT DATABASE(), USER();      -- cari baza və istifadəçi
SHOW CREATE TABLE telebeler;    -- cədvəli yaradan tam əmr
SHOW VARIABLES LIKE 'max_connections';
SHOW PROCESSLIST;               -- hazırda kim nə icra edir` },
          { t: "terms", items: [
            ["utf8mb4", "tam Unicode (simvol 4 bayta qədər). Köhnə «utf8» (utf8mb3) emoji-ni saxlaya bilmir — işlətmə."],
            ["collation", "müqayisə və sıralama qaydası. _ai_ci: aksent və böyük/kiçik hərf fərqi nəzərə alınmır."],
            ["SHOW ...", "MySQL-ə məxsus məlumat əmrləri. Standart SQL-də yoxdur."],
          ]},
          { t: "list", items: [
            "Sətir həm '...' , həm \"...\" ilə yazıla bilir; ad üçün tərs dırnaq (backtick) işlədilir. Standart SQL-də isə \"...\" addır — qarışdırma, sətir üçün həmişə tək dırnaq yaz.",
            "LIMIT 10 OFFSET 20 — səhifələmə (SQL Server-də TOP, standartda FETCH FIRST).",
            "Sətir birləşdirmə: CONCAT(a, b). || operatoru MySQL-də default olaraq «və ya» deməkdir.",
            "Mətn müqayisəsi default olaraq böyük/kiçik hərfə həssas DEYİL: 'Ali' = 'ali' doğrudur.",
            "Versiyalar: 8.0 (köhnə), 8.4 LTS (uzunmüddətli dəstək). MariaDB — MySQL-dən ayrılmış qohum layihədir, əksər şey uyğundur, amma eyni deyil.",
          ]},
          { t: "mistake", lang: "sql", wrong: `CREATE DATABASE magaza CHARACTER SET utf8;`, right: `CREATE DATABASE magaza CHARACTER SET utf8mb4;`, why: "MySQL-də «utf8» əslində 3 baytlıq natamam variantdır: emoji və bəzi simvollar xəta verir və ya kəsilir. Həmişə utf8mb4." },
          { t: "mistake", lang: "sql", wrong: `SELECT seher, ad, COUNT(*)\nFROM telebeler\nGROUP BY seher;`, right: `SELECT seher, COUNT(*)\nFROM telebeler\nGROUP BY seher;`, why: "ONLY_FULL_GROUP_BY rejimi (default) qruplaşdırılmayan sütunu qadağan edir: bir şəhərdə çox ad var — hansı göstərilsin? Köhnə MySQL təsadüfi birini qaytarırdı, bu səhv nəticə verirdi." },
        ],
      },
      {
        level: "senior",
        title: "Arxitektura və ilk təhlükəsizlik addımları",
        blocks: [
          { t: "p", text: "Sorğunun yolu: bağlantı qatı (autentifikasiya, hər bağlantıya bir axın) → parser (sintaksis ağacı) → optimallaşdırıcı (icra planını seçir: hansı indeks, hansı JOIN sırası) → icraçı → storage engine (InnoDB — diskdən oxuyur/yazır). MySQL-in özəlliyi budur ki, SQL qatı ilə saxlama mühərriki ayrıdır. 8.0-dan query cache yoxdur — keşləmə tətbiq səviyyəsində (Redis) edilir." },
          { t: "list", items: [
            "sql_mode: STRICT_TRANS_TABLES (default) — səhv/uzun dəyəri səssizcə kəsmək əvəzinə xəta verir. Söndürmə.",
            "Bağlantı bahadır: tətbiqdə bağlantı hovuzu (connection pool) işlət; max_connections-ı kor-koranə artırma — hər bağlantı yaddaş tutur.",
            "Vaxt zonası: serverdə UTC saxla, göstərəndə çevir.",
            "Konfiqurasiya: my.cnf / my.ini; 8.0+ da SET PERSIST dəyişəni yenidən başlatmadan sonra da saxlayır.",
            "Baxım pəncərəsi: böyük ALTER TABLE cədvəli kilidləyə bilər — ALGORITHM=INSTANT/INPLACE və ya gh-ost / pt-online-schema-change.",
          ]},
          { t: "warn", text: "TƏHLÜKƏSİZLİK: 3306 portunu internetə AÇMA. Skanerlər açıq MySQL serverini dəqiqələr içində tapır və parolları sınayır. Server yalnız daxili şəbəkədən (bind-address, firewall, VPC) əlçatan olmalıdır." },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK: tətbiq heç vaxt root ilə qoşulmamalıdır. Hər tətbiqə ayrıca, yalnız lazımi icazəli istifadəçi (növbəti dərslərdə).",
            "TƏHLÜKƏSİZLİK: quraşdırmadan sonra mysql_secure_installation işlət: root parolu, anonim istifadəçilərin və test bazasının silinməsi, uzaqdan root girişinin bağlanması.",
            "TƏHLÜKƏSİZLİK: parolu əmr sətrində yazma (mysql -pSifre) — shell tarixçəsində və proses siyahısında qalır. -p yazıb soruşulanda daxil et və ya mysql_config_editor işlət.",
            "TƏHLÜKƏSİZLİK: bağlantı sətrini (parol daxil) koda yazma — mühit dəyişəni / sirr meneceri. Docker nümunəsindəki parol yalnız lokal dərs üçündür.",
            "TƏHLÜKƏSİZLİK: şəbəkədə TLS tələb et (require_secure_transport=ON), yoxsa parol və məlumat açıq gedə bilər.",
          ]},
          { t: "qa", items: [
            ["MySQL ilə PostgreSQL fərqi?", "MySQL sadə, oxuma-ağır veb yüklərdə sürətli və geniş yayılıb. PostgreSQL standartlara daha yaxındır, zəngin tiplər (JSONB, massiv), güclü genişlənmələr verir. Hər ikisi ACID-dir; seçim komanda təcrübəsi və tələblərə görədir."],
            ["utf8 ilə utf8mb4 fərqi?", "utf8 (utf8mb3) simvol başına maksimum 3 bayt saxlayır və tam Unicode deyil. utf8mb4 4 bayta qədər — emoji daxil hər şey."],
            ["Sorğu MySQL-də hansı mərhələlərdən keçir?", "Bağlantı/autentifikasiya → parse → optimallaşdırma (plan) → icra → storage engine-dən oxuma/yazma → nəticə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "MySQL serverinin default portu?", options: ["5432", "3306", "1433"], answer: 1, why: "5432 — PostgreSQL, 1433 — SQL Server." },
          { t: "quiz", q: "Emoji saxlamaq üçün hansı kodlaşdırma?", options: ["utf8", "latin1", "utf8mb4"], answer: 2, why: "utf8mb4 tam Unicode-dur (4 bayt)." },
          { t: "quiz", q: "Veb tətbiq bazaya hansı istifadəçi ilə qoşulmalıdır?", options: ["root", "Ayrıca, məhdud icazəli istifadəçi", "Fərqi yoxdur"], answer: 1, why: "Tətbiq sındırılsa, zərər yalnız həmin istifadəçinin icazələri qədər olar." },
        ],
      },
    ],
    exercise: {
      task: "«kitabxana» bazası üçün skript yaz (AI yoxlayır): bazanı utf8mb4 ilə yarat, seç; kitablar cədvəli (id AUTO_INCREMENT PK, ad VARCHAR(100) NOT NULL, muellif VARCHAR(80), il INT); 3 kitab əlavə et; 2000-ci ildən sonrakıları ilə görə sırala; sonda cədvəlin quruluşunu göstər.",
      starter: `-- MySQL skripti\nCREATE DATABASE kitabxana\n`,
      expect: "CREATE DATABASE ... CHARACTER SET utf8mb4; USE kitabxana; CREATE TABLE-də id INT AUTO_INCREMENT PRIMARY KEY, ad NOT NULL; 3 sətirlik INSERT; SELECT ... WHERE il > 2000 ORDER BY il; DESCRIBE və ya SHOW CREATE TABLE. Sətirlər tək dırnaqdadır.",
    },
  },
  {
    slug: "tipler",
    title: "MySQL məlumat tipləri",
    intro: "Hər sütunun tipi var: ədəd, mətn, tarix. Düzgün tip yaddaşa qənaət edir, sorğunu sürətləndirir və səhv məlumatın bazaya düşməsinin qarşısını alır.",
    sections: [
      {
        level: "baslangic",
        title: "Əsas tiplər",
        blocks: [
          { t: "analogy", text: "Mətbəxdə hər şeyin öz qabı var: su üçün stəkan, şorba üçün kasa, duz üçün duzqabı. Şorbanı duzqabına tökə bilməzsən. Sütun tipi də qabdır — içinə nə düşəcəyini müəyyən edir." },
          { t: "code", lang: "sql", code: `CREATE TABLE mehsullar (
  id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ad        VARCHAR(100)  NOT NULL,
  tesvir    TEXT,
  qiymet    DECIMAL(10,2) NOT NULL,
  say       INT           NOT NULL DEFAULT 0,
  aktiv     BOOLEAN       NOT NULL DEFAULT TRUE,
  yaradilib DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);` },
          { t: "terms", items: [
            ["INT", "tam ədəd, təxminən ±2 milyard. UNSIGNED — yalnız müsbət, hədd ikiqat böyüyür."],
            ["VARCHAR(100)", "uzunluğu dəyişən mətn, ən çox 100 simvol."],
            ["TEXT", "uzun mətn (64 KB-a qədər). Daha böyüyü: MEDIUMTEXT, LONGTEXT."],
            ["DECIMAL(10,2)", "dəqiq onluq ədəd: cəmi 10 rəqəm, 2-si vergüldən sonra. Pul üçün."],
            ["BOOLEAN", "əslində TINYINT(1)-dir: 0 — yalan, 1 — doğru."],
            ["DATETIME", "tarix və vaxt: '2026-11-14 09:30:00'."],
          ]},
          { t: "tip", text: "Qayda: məlumata sığan ƏN KİÇİK tipi seç. Yaş üçün TINYINT UNSIGNED (0–255) kifayətdir, BIGINT lazım deyil." },
        ],
      },
      {
        level: "orta",
        title: "Seçim etmək: oxşar tiplər",
        blocks: [
          { t: "terms", items: [
            ["TINYINT / SMALLINT / INT / BIGINT", "1 / 2 / 4 / 8 bayt. BIGINT — milyardlarla sətirli cədvəlin id-si üçün."],
            ["CHAR(n) / VARCHAR(n)", "CHAR sabit uzunluqdur (ölkə kodu 'AZ', heş). VARCHAR dəyişən — əksər mətnlər üçün."],
            ["FLOAT / DOUBLE", "təqribi kəsr ədəd. Elmi ölçmə, koordinat üçün. Pul üçün YOX."],
            ["DATE / TIME / DATETIME / TIMESTAMP", "TIMESTAMP UTC-də saxlanır və sessiyanın vaxt zonasına çevrilir, həddi 2038-ci ilə qədərdir. DATETIME olduğu kimi saxlanır."],
            ["ENUM('yeni','odenilib')", "sabit siyahıdan bir dəyər. Yığcamdır, amma siyahını dəyişmək ALTER TABLE tələb edir."],
            ["JSON", "strukturlu sənəd; yazanda yoxlanılır, içindən sahə seçmək olur."],
          ]},
          { t: "code", lang: "sql", code: `CREATE TABLE sifarisler (
  id       BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  status   ENUM('yeni', 'odenilib', 'gonderilib', 'legv') NOT NULL DEFAULT 'yeni',
  mebleg   DECIMAL(12,2) NOT NULL,
  elave    JSON,
  yenilenib TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_mebleg CHECK (mebleg >= 0)
);

INSERT INTO sifarisler (mebleg, elave)
VALUES (59.90, '{"hediyye": true, "qeyd": "Zəng edin"}');

SELECT id, elave->>'$.qeyd' AS qeyd
FROM sifarisler
WHERE elave->>'$.hediyye' = 'true';` },
          { t: "mistake", lang: "sql", wrong: `qiymet FLOAT\n-- 0.1 + 0.2 = 0.30000000447...`, right: `qiymet DECIMAL(10,2)`, why: "FLOAT/DOUBLE ikilik təqribi ədəddir — qəpiklər itir və hesabatlar tutmur. Pul həmişə DECIMAL (və ya qəpiklə tam ədəd)." },
          { t: "mistake", lang: "sql", wrong: `telefon INT\n-- 0501234567 → 501234567, +994 yazılmır`, right: `telefon VARCHAR(20)`, why: "Telefon, poçt indeksi, FİN — ədəd deyil, rəqəmlərdən ibarət mətndir: üzərində hesab aparılmır, əvvəldəki 0 və + itməməlidir." },
        ],
      },
      {
        level: "senior",
        title: "Saxlama, indeks ölçüsü və tip təhlükəsizliyi",
        blocks: [
          { t: "p", text: "InnoDB-də hər ikinci dərəcəli indeks sətirin PRIMARY KEY dəyərini də saxlayır. Ona görə PK-nın ölçüsü bütün indekslərə vurulur: INT (4 bayt) ilə CHAR(36) UUID arasında fərq böyük cədvəldə giqabaytlardır. Təsadüfi UUID həm də B-ağacın ortasına yazdığı üçün səhifə parçalanması yaradır. UUID lazımdırsa: BINARY(16) + UUID_TO_BIN(UUID(), 1) (vaxta görə sıralı) və ya UUIDv7." },
          { t: "list", items: [
            "INT(11)-dəki 11 ölçü DEYİL — köhnə «göstərmə eni»dir və 8.0-da ləğv olunub. Tutum yalnız tipdən (INT, BIGINT) asılıdır.",
            "VARCHAR(255) ilə VARCHAR(50) diskdə eyni yer tutur, amma müvəqqəti cədvəllər və sıralama üçün yaddaş maksimuma görə ayrılır. Real həddi yaz.",
            "TEXT/BLOB sütunları sətirdən kənarda saxlana bilər; SELECT * onları hər dəfə oxuyur. Böyük faylı bazada yox, obyekt anbarında (S3) saxla, bazada yalnız yolunu.",
            "JSON sütununu birbaşa indeksləmək olmur: hesablanan (generated) sütun yaradıb onu indekslə və ya funksional indeks qur.",
            "NULL ilə NOT NULL: mümkün olan yerdə NOT NULL — məntiq sadələşir, optimallaşdırıcı daha yaxşı plan qurur.",
            "Gizli tip çevrilməsi: WHERE telefon = 501234567 (sütun VARCHAR) hər sətri ədədə çevirir — indeks işləmir. Müqayisədə tiplər eyni olsun.",
            "Vaxt: hadisə anı üçün UTC saxla; gələcək görüş vaxtı üçün yerli vaxt + zona adı ayrıca.",
          ]},
          { t: "warn", text: "TƏHLÜKƏSİZLİK: strict rejim söndürülübsə, MySQL uzun dəyəri SƏSSİZCƏ kəsir. Klassik hücum: 'admin' + çoxlu boşluq + 'x' adı ilə qeydiyyat — VARCHAR(20)-yə kəsiləndə 'admin' qalır və ikinci «admin» hesabı yaranır. Strict rejimi açıq saxla və UNIQUE məhdudiyyəti qoy." },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK: parolu VARCHAR-da açıq mətnlə saxlama. Tətbiqdə bcrypt/argon2 heşi hesabla, bazada heşi saxla (VARCHAR(255)). MySQL-in MD5()/SHA1() funksiyaları parol üçün yaramır — çox sürətlidir.",
            "TƏHLÜKƏSİZLİK: default collation böyük/kiçik hərfi və aksenti fərqləndirmir — 'Admin' = 'admin', 'ə'-li və 'e'-li adlar bəzən bərabər sayıla bilər. Token, API açarı, parol heşi kimi dəqiq müqayisə lazım olan sütunlara utf8mb4_bin və ya VARBINARY ver.",
            "TƏHLÜKƏSİZLİK: tip seçimi validasiyadır: ENUM, CHECK, NOT NULL, UNSIGNED tətbiqdəki səhvdən və ya hücumdan sonra da «mənfi qiymət», «naməlum status» kimi zibilin bazaya düşməsinə mane olur.",
            "TƏHLÜKƏSİZLİK: kart nömrəsi, FİN kimi həssas sütunları tətbiq səviyyəsində şifrələ; ardıcıl AUTO_INCREMENT id-ni URL-də göstərmək sifariş sayını sızdırır və sadalamağa (enumeration) imkan verir — açıq id üçün təsadüfi identifikator işlət.",
          ]},
          { t: "qa", items: [
            ["DATETIME ilə TIMESTAMP fərqi?", "TIMESTAMP UTC-yə çevrilib saxlanır, oxunanda sessiya zonasına qaytarılır, 4 bayt, həddi 2038. DATETIME zonadan asılı deyil, olduğu kimi saxlanır, 1000–9999 illər."],
            ["Niyə pul üçün DECIMAL?", "DECIMAL onluq dəqiq hesablayır. FLOAT/DOUBLE ikilik təqribi təsvirdir — yuvarlaqlaşdırma xətaları yığılır."],
            ["UUID-ni PK etməyin problemi?", "Böyük ölçü bütün ikinci dərəcəli indeksləri şişirdir; təsadüfi sıra səhifə parçalanması və keş səmərəsizliyi yaradır. Həll: BINARY(16), sıralı UUID (v7) və ya daxili BIGINT + xarici UUID."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Məhsulun qiyməti üçün ən doğru tip?", options: ["FLOAT", "DECIMAL(10,2)", "VARCHAR(10)"], answer: 1, why: "DECIMAL dəqiqdir — qəpik itmir." },
          { t: "quiz", q: "Telefon nömrəsi üçün tip?", options: ["INT", "BIGINT", "VARCHAR(20)"], answer: 2, why: "Əvvəldəki 0 və + işarəsi saxlanmalıdır, hesab aparılmır." },
        ],
      },
    ],
    exercise: {
      task: "«istifadeciler» cədvəlini düzgün tiplərlə yarat (AI yoxlayır): id, email (unikal, məcburi), parol heşi, ad, telefon, doğum tarixi, balans (pul, mənfi ola bilməz), rol (istifadeci / moderator / admin, default istifadeci), aktivlik (default doğru), yaradılma vaxtı (avtomatik).",
      starter: `CREATE TABLE istifadeciler (\n  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n\n);\n`,
      expect: "email VARCHAR NOT NULL UNIQUE; parol_hash VARCHAR(255) NOT NULL (açıq parol sütunu yox); telefon VARCHAR; dogum DATE; balans DECIMAL(x,2) NOT NULL DEFAULT 0 + CHECK (balans >= 0) və ya UNSIGNED; rol ENUM(...) DEFAULT 'istifadeci'; aktiv BOOLEAN/TINYINT(1) DEFAULT TRUE; yaradilib DATETIME/TIMESTAMP DEFAULT CURRENT_TIMESTAMP. FLOAT pul üçün işlədilməyib.",
    },
  },
  {
    slug: "istifadeci",
    title: "İstifadəçilər və icazələr",
    intro: "MySQL serverinə hər kəs öz hesabı ilə girir və yalnız icazə verilən işi görə bilir. Düzgün icazə sistemi — bazanın təhlükəsizliyinin əsasıdır.",
    sections: [
      {
        level: "baslangic",
        title: "Hesab yaratmaq və icazə vermək",
        blocks: [
          { t: "analogy", text: "Oteldə hər qonağın kartı yalnız öz otağını açır. Xadimənin kartı bütün otaqları açır, amma seyfi yox. Müdirin kartı hər yeri açır. MySQL-də də hər hesabın «kartı» var — nəyi aça biləcəyini GRANT müəyyən edir." },
          { t: "code", lang: "sql", code: `-- 1. Hesab yarat
CREATE USER 'magaza_app'@'localhost' IDENTIFIED BY 'Uzun-Tesadufi-Parol-91x!';

-- 2. İcazə ver: yalnız magaza bazasında oxu və yaz
GRANT SELECT, INSERT, UPDATE, DELETE ON magaza.* TO 'magaza_app'@'localhost';

-- 3. Yoxla
SHOW GRANTS FOR 'magaza_app'@'localhost';` },
          { t: "terms", items: [
            ["'ad'@'host'", "hesab iki hissədən ibarətdir: ad və HARADAN qoşulduğu. 'localhost' — yalnız serverin özündən."],
            ["IDENTIFIED BY", "hesabın parolu."],
            ["GRANT ... ON ... TO", "icazə ver: nə (SELECT), harada (magaza.*), kimə."],
            ["magaza.*", "magaza bazasının bütün cədvəlləri. *.* — bütün server."],
            ["SHOW GRANTS", "hesabın icazələrini göstərir."],
          ]},
          { t: "tip", text: "root — hər şeyə icazəsi olan baş hesabdır. Onu yalnız idarəetmə üçün işlət, tətbiqdə yox." },
        ],
      },
      {
        level: "orta",
        title: "İcazəni geri almaq, rollar, host",
        blocks: [
          { t: "code", lang: "sql", code: `-- Geri al
REVOKE DELETE ON magaza.* FROM 'magaza_app'@'localhost';

-- Yalnız bir cədvəl, hətta yalnız bəzi sütunlar
GRANT SELECT ON magaza.mehsullar TO 'hesabat'@'10.0.0.%';
GRANT SELECT (id, ad, seher) ON magaza.musteriler TO 'hesabat'@'10.0.0.%';

-- Parolu dəyiş, hesabı kilidlə, sil
ALTER USER 'magaza_app'@'localhost' IDENTIFIED BY 'Yeni-Parol-77q#';
ALTER USER 'kohne'@'%' ACCOUNT LOCK;
DROP USER 'kohne'@'%';` },
          { t: "code", lang: "sql", code: `-- Rol: icazələr toplusu (8.0+)
CREATE ROLE 'oxucu', 'yazici';
GRANT SELECT ON magaza.* TO 'oxucu';
GRANT INSERT, UPDATE, DELETE ON magaza.* TO 'yazici';

CREATE USER 'aysel'@'%' IDENTIFIED BY 'Parol-Aysel-55k!';
GRANT 'oxucu', 'yazici' TO 'aysel'@'%';
SET DEFAULT ROLE ALL TO 'aysel'@'%';`, caption: "10 əməkdaşa tək-tək icazə vermək əvəzinə — rol" },
          { t: "terms", items: [
            ["'%'", "istənilən host. '10.0.0.%' — yalnız həmin alt şəbəkə."],
            ["REVOKE", "icazəni geri alır."],
            ["ALL PRIVILEGES", "bütün icazələr. Tətbiq hesabına vermə."],
            ["WITH GRANT OPTION", "hesab öz icazələrini başqasına verə bilir — təhlükəlidir."],
          ]},
          { t: "mistake", lang: "sql", wrong: `GRANT ALL PRIVILEGES ON *.* TO 'app'@'%' IDENTIFIED BY '123456';`, right: `CREATE USER 'app'@'10.0.1.5' IDENTIFIED BY 'Uzun-Tesadufi-Parol-91x!';\nGRANT SELECT, INSERT, UPDATE, DELETE ON magaza.* TO 'app'@'10.0.1.5';`, why: "Üç səhv birdən: bütün serverə bütün icazə, istənilən yerdən giriş, zəif parol. (8.0-da GRANT ilə hesab yaratmaq sintaksisi də artıq yoxdur — əvvəl CREATE USER.)" },
          { t: "mistake", lang: "sql", wrong: `GRANT SELECT ON magaza.* TO 'hesabat';\n-- sonra: FLUSH PRIVILEGES;`, right: `GRANT SELECT ON magaza.* TO 'hesabat'@'10.0.0.%';`, why: "Host yazılmasa '%' götürülür — hər yerdən giriş. FLUSH PRIVILEGES isə yalnız mysql.* cədvəllərini əllə dəyişəndə lazımdır; GRANT dərhal qüvvəyə minir." },
        ],
      },
      {
        level: "senior",
        title: "Ən az imtiyaz prinsipi və SQL injection",
        blocks: [
          { t: "p", text: "Ən az imtiyaz prinsipi (least privilege): hər hesab yalnız işi üçün zəruri olan icazəni alır. Praktikada ayrı hesablar: tətbiq (SELECT/INSERT/UPDATE/DELETE), miqrasiya (CREATE/ALTER/DROP — yalnız deploy zamanı), hesabat (yalnız SELECT, tercihən replikada), backup (SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER, RELOAD). Tətbiq sındırılsa belə, cədvəlləri DROP edə və ya başqa bazaları oxuya bilməyəcək." },
          { t: "list", items: [
            "Autentifikasiya plaqini: caching_sha2_password (default). mysql_native_password (SHA1 əsaslı, zəif) 8.4-də default olaraq söndürülüb — köhnə klient kitabxanalarını yenilə.",
            "Parol siyasəti: validate_password komponenti (uzunluq, mürəkkəblik), PASSWORD EXPIRE, FAILED_LOGIN_ATTEMPTS 5 PASSWORD_LOCK_TIME 1 — kobud güc hücumuna qarşı.",
            "TLS məcburiyyəti: CREATE USER ... REQUIRE SSL (və ya REQUIRE X509 — klient sertifikatı ilə).",
            "İkili parol (dual password): ALTER USER ... RETAIN CURRENT PASSWORD — parolu fasiləsiz dəyişmək (rotation) üçün köhnə və yeni bir müddət birlikdə işləyir.",
            "Təhlükəli qlobal icazələr: FILE (serverdə fayl oxu/yaz), SUPER / SYSTEM_VARIABLES_ADMIN, PROCESS (başqalarının sorğularını gör), GRANT OPTION. Tətbiqə heç biri lazım deyil.",
            "Audit: kim nə vaxt qoşulub, hansı DDL-i icra edib — audit log plaqini və ya ən azı general/slow log; hesabları mütəmadi yoxla: SELECT user, host FROM mysql.user.",
            "Bulud bazalarında (RDS, Cloud SQL) IAM autentifikasiyası — uzunömürlü parol əvəzinə qısaömürlü token.",
          ]},
          { t: "code", lang: "js", code: `// ❌ SQL injection: ad = "' OR '1'='1"
const sorgu = "SELECT * FROM istifadeciler WHERE ad = '" + ad + "'";

// ✅ Parametrli sorğu (prepared statement) — mysql2
const [setirler] = await pool.execute(
  "SELECT id, ad FROM istifadeciler WHERE ad = ? AND aktiv = ?",
  [ad, 1]
);`, caption: "TƏHLÜKƏSİZLİK: icazələr ikinci müdafiə xəttidir, birincisi — parametrli sorğu" },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK — SQL injection: istifadəçi mətnini sorğuya birləşdirmə. Parametr (?) dəyəri koddan ayrı göndərir — dırnaq sorğunu «qıra» bilmir. Cədvəl/sütun adı parametr ola bilmir: onları ağ siyahıdan seç.",
            "TƏHLÜKƏSİZLİK: injection baş versə, zərəri icazələr məhdudlaşdırır: FILE icazəsi yoxdursa LOAD_FILE('/etc/passwd') və INTO OUTFILE işləmir; DROP icazəsi yoxdursa cədvəl silinmir.",
            "TƏHLÜKƏSİZLİK: multipleStatements (bir sorğuda bir neçə əmr) seçimini drayverdə söndürülmüş saxla — yoxsa injection «; DROP TABLE ...» əlavə edə bilər.",
            "TƏHLÜKƏSİZLİK: anonim hesabları ('' @ localhost) və istifadəsiz hesabları sil; işdən çıxan əməkdaşın hesabını həmin gün kilidlə; paylaşılan «ümumi» hesab olmasın — kimin nə etdiyi bilinməz.",
            "TƏHLÜKƏSİZLİK: parolu git-ə, Slack-ə, log-a yazma. Sızıbsa — dərhal dəyiş (rotate), sadəcə silmək kifayət deyil.",
          ]},
          { t: "qa", items: [
            ["Least privilege nədir və niyə vacibdir?", "Hər hesaba yalnız zəruri icazə. Boşluq və ya səhv baş verəndə zərərin həcmini (blast radius) məhdudlaşdırır."],
            ["'app'@'%' ilə 'app'@'localhost' eyni hesabdır?", "Yox, iki ayrı hesabdır — parolları və icazələri fərqli ola bilər. MySQL ən spesifik host uyğunluğunu seçir."],
            ["Prepared statement injection-dan necə qoruyur?", "Sorğunun mətni və dəyərlər serverə ayrı göndərilir; server əvvəl sorğunu parse edir, sonra dəyərləri məlumat kimi yerinə qoyur — dəyər heç vaxt SQL kodu kimi şərh olunmur."],
            ["Rolların faydası?", "İcazələr bir yerdə təyin olunur və çoxlu hesaba verilir; dəyişiklik bir dəfə edilir, audit asanlaşır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "'app'@'%' nə deməkdir?", options: ["app hesabı yalnız localhost-dan", "app hesabı istənilən hostdan", "bütün hesablar"], answer: 1, why: "% — istənilən host deməkdir." },
          { t: "quiz", q: "İcazəni geri alan əmr?", options: ["DROP GRANT", "REVOKE", "DENY"], answer: 1, why: "REVOKE ... ON ... FROM." },
          { t: "quiz", q: "Veb tətbiq hesabına hansı icazə dəsti uyğundur?", options: ["ALL PRIVILEGES ON *.*", "SELECT, INSERT, UPDATE, DELETE ON magaza.*", "SUPER, FILE"], answer: 1, why: "Yalnız öz bazasında məlumatla işləmək — sxemi dəyişmək, fayl oxumaq lazım deyil." },
        ],
      },
    ],
    exercise: {
      task: "«bloq» bazası üçün 3 hesab qur (AI yoxlayır): 1) bloq_app — 10.0.1.% şəbəkəsindən, yalnız məlumat oxu/yaz; 2) bloq_hesabat — yalnız SELECT, yalnız yazilar və serhler cədvəllərinə; 3) bloq_miqrasiya — localhost-dan, sxem dəyişmə icazələri. Sonra bloq_app-dan DELETE-i geri al və icazələrini göstər.",
      starter: `-- 1) tətbiq hesabı\nCREATE USER \n`,
      expect: "Hər hesab CREATE USER 'ad'@'host' IDENTIFIED BY güclü parol ilə; bloq_app: GRANT SELECT, INSERT, UPDATE, DELETE ON bloq.*; hesabat: GRANT SELECT ON bloq.yazilar və bloq.serhler; miqrasiya: CREATE, ALTER, DROP, INDEX (və s.) ON bloq.* @localhost; REVOKE DELETE ON bloq.* FROM bloq_app; SHOW GRANTS FOR. ALL ON *.*, '%' hostu, GRANT OPTION və zəif parol yoxdur.",
    },
  },
  {
    slug: "engine",
    title: "InnoDB və storage engine",
    intro: "Storage engine (saxlama mühərriki) — cədvəlin diskdə necə saxlandığını, kilidləndiyini və bərpa olunduğunu müəyyən edən hissədir. MySQL-də default və demək olar həmişə düzgün seçim InnoDB-dir.",
    sections: [
      {
        level: "baslangic",
        title: "Mühərrik nədir?",
        blocks: [
          { t: "analogy", text: "Eyni kuzova fərqli mühərrik qoymaq olar: biri sürətli, amma etibarsız; o biri möhkəm və təhlükəsiz. Sürücü (SQL) eyni qalır — sükan, pedal eynidir. MySQL-də də sorğular eynidir, altında işləyən mühərrik fərqli ola bilər." },
          { t: "code", lang: "sql", code: `SHOW ENGINES;                         -- mövcud mühərriklər

CREATE TABLE hesablar (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  sahib  VARCHAR(50) NOT NULL,
  balans DECIMAL(12,2) NOT NULL
) ENGINE = InnoDB;                    -- default, yazmasan da InnoDB olur

SHOW TABLE STATUS LIKE 'hesablar';    -- Engine sütununa bax` },
          { t: "terms", items: [
            ["InnoDB", "default mühərrik: tranzaksiya, xarici açar, sətir səviyyəli kilid, qəzadan sonra avtomatik bərpa."],
            ["MyISAM", "köhnə mühərrik: tranzaksiya və xarici açar yoxdur, bütün cədvəli kilidləyir. Yeni layihədə işlətmə."],
            ["MEMORY", "məlumat yalnız operativ yaddaşda — server sönəndə itir."],
            ["tranzaksiya", "bir neçə əməliyyat: ya hamısı baş tutur, ya heç biri."],
          ]},
          { t: "tip", text: "Köhnə cədvəli çevirmək: ALTER TABLE ad ENGINE = InnoDB;" },
        ],
      },
      {
        level: "orta",
        title: "Tranzaksiya və kilidlər praktikada",
        blocks: [
          { t: "code", lang: "sql", code: `START TRANSACTION;

UPDATE hesablar SET balans = balans - 100 WHERE id = 1;
UPDATE hesablar SET balans = balans + 100 WHERE id = 2;

COMMIT;      -- hər ikisi yadda qaldı
-- ROLLBACK; -- və ya hər ikisi ləğv olundu`, caption: "Pul köçürməsi: yarımçıq qala bilməz" },
          { t: "code", lang: "sql", code: `-- Oxu və sonra dəyiş: sətri kilidlə ki, başqası araya girməsin
START TRANSACTION;

SELECT balans FROM hesablar WHERE id = 1 FOR UPDATE;
-- tətbiq yoxlayır: balans >= 100 ?

UPDATE hesablar SET balans = balans - 100 WHERE id = 1;
COMMIT;` },
          { t: "terms", items: [
            ["sətir səviyyəli kilid (row lock)", "yalnız dəyişən sətirlər kilidlənir — başqaları digər sətirlərlə işləyə bilir."],
            ["FOR UPDATE", "oxunan sətirləri tranzaksiya bitənə qədər yazı üçün kilidləyir."],
            ["deadlock", "iki tranzaksiya bir-birinin kilidini gözləyir. InnoDB bunu aşkar edib birini ləğv edir (xəta 1213) — tətbiq yenidən cəhd etməlidir."],
            ["autocommit", "default açıqdır: START TRANSACTION yazmasan, hər əmr ayrıca tranzaksiyadır."],
          ]},
          { t: "mistake", lang: "sql", wrong: `-- T1: UPDATE hesablar ... WHERE id = 1; sonra id = 2\n-- T2: UPDATE hesablar ... WHERE id = 2; sonra id = 1\n-- → deadlock`, right: `-- Hər iki tranzaksiya sətirləri EYNİ sıra ilə kilidləyir:\n-- əvvəl kiçik id, sonra böyük id`, why: "Deadlock-un ən çox yayılmış səbəbi fərqli kilid sırasıdır. Sıranı sabit saxla, tranzaksiyanı qısa et, xəta 1213-də təkrar cəhd et." },
          { t: "mistake", lang: "sql", wrong: `START TRANSACTION;\nSELECT ... FOR UPDATE;\n-- tətbiq kənar API-yə sorğu göndərir, 10 saniyə gözləyir\nCOMMIT;`, right: `-- Kənar sorğunu tranzaksiyadan ƏVVƏL və ya SONRA et;\n-- tranzaksiya yalnız baza əməliyyatlarını əhatə etsin`, why: "Uzun tranzaksiya kilidləri saxlayır, başqalarını gözlədir, undo jurnalını şişirdir. Tranzaksiya millisaniyələrlə ölçülməlidir." },
        ],
      },
      {
        level: "senior",
        title: "InnoDB daxildən: clustered index, MVCC, redo/undo",
        blocks: [
          { t: "p", text: "InnoDB cədvəli PRIMARY KEY üzrə qurulmuş B+ ağacdır (clustered index): sətirlərin özü ağacın yarpaqlarında, PK sırası ilə saxlanır. İkinci dərəcəli indeksin yarpağında isə sətir yox, PK dəyəri var — ona görə belə indekslə axtarış iki addımdır (indeks → PK ilə cədvəl). Nəticə: PK qısa və artan olmalıdır; PK-sız cədvəl yaratma (InnoDB gizli açar düzəldir, replikasiya və alətlər əziyyət çəkir)." },
          { t: "list", items: [
            "Buffer pool: səhifələrin (16 KB) yaddaşdakı keşi. innodb_buffer_pool_size — ən vacib parametr; ayrıca baza serverində RAM-ın ~60–75%-i.",
            "Redo log (WAL): dəyişiklik əvvəl ardıcıl jurnala yazılır, səhifələr diskə sonra köçürülür. Qəzadan sonra redo ilə bərpa olunur — Durability budur. innodb_flush_log_at_trx_commit=1 tam zəmanət; 2 sürətlidir, amma OS çökəndə son ~1 saniyə itə bilər.",
            "Undo log: sətirin köhnə versiyaları. ROLLBACK və MVCC üçün lazımdır.",
            "MVCC: oxuyan yazanı, yazan oxuyanı bloklamır — hər tranzaksiya özünə aid «şəkli» (snapshot) undo-dan görür. Uzun açıq tranzaksiya köhnə versiyaların təmizlənməsinə (purge) mane olur → baza şişir və yavaşlayır.",
            "İzolyasiya: default REPEATABLE READ (əksər bazalarda READ COMMITTED). Fantom oxunuşun qarşısını gap lock və next-key lock alır — aralığı kilidləyir; bu, gözlənilməz bloklanma və deadlock mənbəyidir. Bir çox komanda READ COMMITTED-ə keçir.",
            "İndekssiz WHERE ilə UPDATE/DELETE skan etdiyi BÜTÜN sətirləri kilidləyir — faktiki olaraq cədvəl kilidi. Yazı sorğularının indeksdən istifadə etdiyini yoxla.",
            "Diaqnostika: SHOW ENGINE INNODB STATUS (son deadlock), performance_schema.data_locks, sys.innodb_lock_waits.",
            "DDL: 8.0-da atomikdir; ALGORITHM=INSTANT sütun əlavəsini cədvəli köçürmədən edir.",
          ]},
          { t: "warn", text: "TƏHLÜKƏSİZLİK — yarış vəziyyəti (race condition): «balansı oxu → tətbiqdə yoxla → yaz» ardıcıllığı kilidsiz olsa, iki paralel sorğu eyni balansı görüb hər ikisi pul çıxara bilər (double spend). Kupon, stok, limit yoxlamaları da belədir. Həll: SELECT ... FOR UPDATE və ya atomik şərtli yeniləmə." },
          { t: "code", lang: "sql", code: `-- Atomik variant: yoxlama və dəyişiklik bir əmrdə
UPDATE hesablar
SET balans = balans - 100
WHERE id = 1 AND balans >= 100;
-- təsirlənən sətir sayı 0-dırsa → vəsait çatmır` },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK: MyISAM-da tranzaksiya yoxdur — xəta ortada baş versə, məlumat yarımçıq qalır (pul çıxıb, daxil olmayıb). Maliyyə və hər hansı vacib məlumat yalnız InnoDB-də.",
            "TƏHLÜKƏSİZLİK: dincəlmədə şifrələmə (encryption at rest): InnoDB tablespace, redo/undo və binlog şifrələnməsi (keyring ilə) — disk və ya backup oğurlananda məlumat oxunmasın.",
            "TƏHLÜKƏSİZLİK: kilid gözləməsi DoS vektorudur: bir uzun tranzaksiya bütün sistemi dondura bilər. innodb_lock_wait_timeout, max_execution_time və tətbiqdə sorğu vaxt həddi qoy.",
          ]},
          { t: "qa", items: [
            ["InnoDB ilə MyISAM fərqi?", "InnoDB: ACID tranzaksiyalar, xarici açarlar, sətir kilidi, MVCC, qəzadan bərpa. MyISAM: heç biri yoxdur, cədvəl kilidi, qəzada korlanma riski."],
            ["Clustered index nədir?", "Cədvəlin özünün PK üzrə B+ ağac kimi saxlanması: sətirlər yarpaqlardadır. İkinci dərəcəli indekslər PK-ya istinad edir."],
            ["MVCC nədir?", "Çoxversiyalı paralellik nəzarəti: yazı köhnə versiyanı undo-da saxlayır, oxuyan tranzaksiya öz snapshot-unu görür — oxu və yazı bir-birini bloklamır."],
            ["Deadlock-la necə mübarizə aparırsan?", "Sabit kilid sırası, qısa tranzaksiyalar, uyğun indekslər (az sətir kilidlənsin), lazım gələrsə READ COMMITTED, tətbiqdə 1213 xətasında təkrar cəhd; SHOW ENGINE INNODB STATUS ilə təhlil."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "MySQL-in default mühərriki?", options: ["MyISAM", "InnoDB", "MEMORY"], answer: 1, why: "5.5-dən bəri default InnoDB-dir." },
          { t: "quiz", q: "Tranzaksiyanı ləğv edən əmr?", options: ["COMMIT", "ROLLBACK", "CANCEL"], answer: 1, why: "ROLLBACK bütün dəyişiklikləri geri qaytarır." },
          { t: "quiz", q: "İki paralel sorğunun eyni balansı iki dəfə xərcləməsinin qarşısını nə alır?", options: ["Daha sürətli server", "SELECT ... FOR UPDATE və ya şərtli UPDATE", "MyISAM"], answer: 1, why: "Sətir kilidlənir və ya yoxlama ilə dəyişiklik atomik olur." },
        ],
      },
    ],
    exercise: {
      task: "Pul köçürməsini təhlükəsiz yaz (AI yoxlayır): hesablar(id, sahib, balans) cədvəlində 1 nömrəli hesabdan 2-yə 250 köçür. Tranzaksiya işlət, göndərənin balansı çatmırsa heç nə dəyişməsin, deadlock riskini azaltmaq üçün kilid sırasını şərhdə izah et.",
      starter: `START TRANSACTION;\n\n`,
      expect: "START TRANSACTION ... COMMIT; ya SELECT ... FOR UPDATE ilə kilid (sabit sıra ilə, məs. id-yə görə), ya da UPDATE ... SET balans = balans - 250 WHERE id = 1 AND balans >= 250 şərtli yeniləmə və təsirlənən sətir yoxlaması; çatmayanda ROLLBACK; iki UPDATE eyni tranzaksiyadadır; şərhdə kilid sırası izah olunub.",
    },
  },
  {
    slug: "funksiyalar",
    title: "MySQL funksiyaları",
    intro: "MySQL-də mətn, ədəd, tarix və şərtlərlə işləmək üçün yüzlərlə hazır funksiya var. Onlar məlumatı sorğunun içindəcə formatlayır və hesablayır.",
    sections: [
      {
        level: "baslangic",
        title: "Mətn, ədəd və tarix",
        blocks: [
          { t: "analogy", text: "Kalkulyatorun düymələri kimidir: √ basırsan — kök alır, % basırsan — faiz hesablayır. Funksiya da belə düymədir: içinə dəyər verirsən, nəticə qaytarır." },
          { t: "code", lang: "sql", code: `SELECT
  UPPER(ad)                       AS boyuk,       -- AYSEL
  LENGTH(ad)                      AS bayt,
  CHAR_LENGTH(ad)                 AS simvol,
  CONCAT(ad, ' ', soyad)          AS tam_ad,
  SUBSTRING(email, 1, 3)          AS ilk_uc,
  ROUND(qiymet * 1.18, 2)         AS edv_ile,
  NOW()                           AS indi,
  CURDATE()                       AS bu_gun,
  YEAR(dogum)                     AS il,
  DATEDIFF(CURDATE(), qeydiyyat)  AS nece_gun
FROM musteriler;` },
          { t: "terms", items: [
            ["CONCAT(a, b)", "mətnləri birləşdirir."],
            ["CHAR_LENGTH", "simvol sayı. LENGTH isə BAYT sayıdır — 'ə' 2 bayt tutur."],
            ["ROUND(x, 2)", "2 onluq rəqəmə yuvarlaqlaşdırır."],
            ["NOW() / CURDATE()", "cari tarix-vaxt / yalnız tarix."],
            ["DATEDIFF(a, b)", "iki tarix arasındakı gün sayı."],
          ]},
          { t: "tip", text: "Funksiyanı FROM-suz sınamaq olar: SELECT UPPER('salam'), 7 % 3, NOW();" },
        ],
      },
      {
        level: "orta",
        title: "Şərt, NULL və qruplaşdırma funksiyaları",
        blocks: [
          { t: "code", lang: "sql", code: `SELECT
  ad,
  IFNULL(telefon, 'yoxdur')                      AS telefon,
  COALESCE(mobil, ev_tel, 'əlaqə yoxdur')        AS elaqe,
  IF(balans >= 0, 'müsbət', 'borc')              AS veziyyet,
  CASE
    WHEN bal >= 90 THEN 'əla'
    WHEN bal >= 70 THEN 'yaxşı'
    ELSE 'zəif'
  END                                            AS qiymet,
  DATE_FORMAT(qeydiyyat, '%d.%m.%Y')             AS tarix,
  DATE_ADD(qeydiyyat, INTERVAL 1 YEAR)           AS bitme
FROM musteriler;` },
          { t: "code", lang: "sql", code: `-- Hər kursun tələbələri bir sətirdə
SELECT k.ad,
       COUNT(*)                                        AS say,
       GROUP_CONCAT(t.ad ORDER BY t.ad SEPARATOR ', ') AS telebeler
FROM qeydiyyat q
JOIN kurslar k   ON k.id = q.kurs_id
JOIN telebeler t ON t.id = q.telebe_id
GROUP BY k.id, k.ad;`, caption: "GROUP_CONCAT — MySQL-ə məxsus aqreqat funksiya" },
          { t: "terms", items: [
            ["IFNULL(a, b)", "a NULL-dursa b. COALESCE — bir neçə variantdan ilk NULL olmayan."],
            ["IF(şərt, a, b)", "MySQL-ə məxsus qısa şərt. Standart variant: CASE."],
            ["DATE_FORMAT", "tarixi mətnə çevirir: %d gün, %m ay, %Y il, %H:%i saat:dəqiqə."],
            ["INTERVAL", "tarixə müddət əlavə edir: INTERVAL 7 DAY, 1 MONTH, 2 HOUR."],
          ]},
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM sifarisler\nWHERE YEAR(tarix) = 2026;`, right: `SELECT * FROM sifarisler\nWHERE tarix >= '2026-01-01' AND tarix < '2027-01-01';`, why: "Sütunu funksiyaya bükəndə indeks işləmir — MySQL hər sətir üçün YEAR() hesablayır. Aralıq şərti isə indeksdən istifadə edir (sargable)." },
          { t: "mistake", lang: "sql", wrong: `SELECT CONCAT(ad, ' ', ata_adi) FROM telebeler;\n-- ata_adi NULL-dursa bütün nəticə NULL`, right: `SELECT CONCAT_WS(' ', ad, ata_adi) FROM telebeler;`, why: "CONCAT-da bir NULL hər şeyi NULL edir. CONCAT_WS (ayırıcı ilə) NULL-ları ötürür." },
        ],
      },
      {
        level: "senior",
        title: "Window funksiyaları, determinizm və təhlükəli funksiyalar",
        blocks: [
          { t: "p", text: "MySQL 8.0-dan window funksiyaları (ROW_NUMBER, RANK, LAG, SUM() OVER) və CTE (WITH) tam dəstəklənir — köhnə dərsliklərdəki dəyişənli (@rn := @rn + 1) hiylələrə ehtiyac yoxdur, onlar etibarsızdır. Funksiyalar deterministik (eyni giriş → eyni çıxış: UPPER, ROUND) və qeyri-deterministik (NOW, RAND, UUID) olur; ikincilər generated sütunda və funksional indeksdə işlədilə bilməz və ifadə əsaslı replikasiyada fərqli nəticə verə bilər." },
          { t: "code", lang: "sql", code: `-- Funksional indeks (8.0.13+): ifadənin özü indekslənir
CREATE INDEX idx_email_kicik ON musteriler ((LOWER(email)));
SELECT id FROM musteriler WHERE LOWER(email) = 'a@b.az';   -- indeks işləyir

-- JSON funksiyaları
SELECT JSON_EXTRACT(elave, '$.reng')      AS reng,
       elave->>'$.olcu'                   AS olcu,
       JSON_CONTAINS(elave->'$.teqler', '"yeni"') AS yenidir
FROM mehsullar;` },
          { t: "list", items: [
            "GROUP_CONCAT nəticəsi group_concat_max_len (default 1024 bayt) ilə SƏSSİZCƏ kəsilir. Böyük siyahılar üçün dəyişəni artır və ya JSON_ARRAYAGG işlət.",
            "ORDER BY RAND() bütün cədvəli sıralayır — böyük cədvəldə fəlakətdir. Təsadüfi sətir üçün təsadüfi id aralığı və ya əvvəlcədən hesablanmış sütun.",
            "NOW() sorğunun başlanğıc vaxtını qaytarır (bütün sətirlər üçün eyni), SYSDATE() isə çağırılan anı.",
            "Tam mətn axtarışı: FULLTEXT indeks + MATCH(...) AGAINST(...). LIKE '%söz%' indeksdən istifadə edə bilmir.",
            "Ağır hesablamanı hər sorğuda təkrarlama: STORED generated sütun və ya tətbiq qatında hesabla.",
            "Vaxt zonası: CONVERT_TZ(dt, '+00:00', 'Asia/Baku') — zona cədvəlləri yüklənməlidir (mysql_tzinfo_to_sql).",
          ]},
          { t: "warn", text: "TƏHLÜKƏSİZLİK: parol üçün MD5(), SHA1(), SHA2() işlətmə — sürətli heşlərdir, GPU ilə saniyədə milyardlarla variant sınanır. Parolu tətbiqdə bcrypt / argon2 ilə heşlə. Köhnə PASSWORD() funksiyası isə 8.0-da silinib." },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK: funksiya injection-dan qorumur. CONCAT ilə dinamik SQL yığıb PREPARE etmək — yenə injection-dur. Dəyərlər yalnız parametr kimi ötürülməlidir.",
            "TƏHLÜKƏSİZLİK: injection hücumçusunun sevimli funksiyaları: SLEEP() və BENCHMARK() (kor/vaxt əsaslı injection və DoS), LOAD_FILE() (serverdən fayl oxumaq), VERSION(), USER(), DATABASE() (kəşfiyyat). FILE icazəsini vermə, secure_file_priv-i məhdud saxla, max_execution_time qoy.",
            "TƏHLÜKƏSİZLİK: LIKE-da istifadəçi mətni % və _ simvollarını daşıya bilər: '%' göndərib bütün cədvəli çəkmək və ya ağır axtarışla serveri yükləmək olur. Onları escape et və minimum uzunluq tələb et.",
            "TƏHLÜKƏSİZLİK: şifrələmə üçün AES_ENCRYPT bazada açarı sorğu mətnində daşıyır (log-lara düşə bilər). Həssas sahələri tətbiq qatında, açar meneceri (KMS) ilə şifrələ.",
            "TƏHLÜKƏSİZLİK: UUID() və RAND() kriptoqrafik təsadüfi DEYİL — sessiya tokeni, parol sıfırlama kodu üçün yaramır. RANDOM_BYTES() və ya tətbiqin kripto kitabxanası.",
          ]},
          { t: "qa", items: [
            ["IFNULL ilə COALESCE fərqi?", "IFNULL iki arqument alır və MySQL-ə məxsusdur. COALESCE standartdır, istənilən sayda arqument alır və ilk NULL olmayanı qaytarır."],
            ["WHERE-də sütuna funksiya tətbiq etmək niyə pisdir?", "Şərt sargable olmur: indeks sütunun xam dəyərləri üzrə qurulub, funksiyanın nəticəsi üzrə yox. Həll: şərti çevirmək və ya funksional indeks."],
            ["LENGTH ilə CHAR_LENGTH fərqi?", "LENGTH bayt sayı, CHAR_LENGTH simvol sayı. utf8mb4-də qeyri-ASCII simvollar 2–4 bayt tutur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "CONCAT('a', NULL, 'b') nə qaytarır?", options: ["'ab'", "NULL", "'a b'"], answer: 1, why: "CONCAT-da hər hansı NULL nəticəni NULL edir." },
          { t: "quiz", q: "Tarixi '14.11.2026' kimi göstərmək üçün?", options: ["DATE_FORMAT(t, '%d.%m.%Y')", "FORMAT(t, 'dd.mm.yyyy')", "TO_CHAR(t)"], answer: 0, why: "MySQL-də tarix formatı DATE_FORMAT ilə verilir." },
        ],
      },
    ],
    exercise: {
      task: "Məşq bazasında (telebeler, kurslar, qeydiyyat) hər kurs üçün göstər: kurs adı BÖYÜK hərflə, tələbə sayı, orta bal (1 onluqla), ən yüksək bal və orta bala görə səviyyə (CASE: ≥85 «güclü», ≥70 «orta», əks halda «zəif»). Orta bala görə azalan sırala. (Ümumi SQL — brauzerdə işləyir.)",
      starter: `SELECT UPPER(k.ad) AS kurs\n  -- qalan sütunlar\nFROM qeydiyyat q\nJOIN kurslar k ON k.id = q.kurs_id\n`,
      expect: "UPPER(k.ad), COUNT(*), ROUND(AVG(q.bal), 1), MAX(q.bal), CASE WHEN AVG(q.bal) >= 85 ... END; GROUP BY k.id / k.ad; ORDER BY orta bal DESC. Qruplaşdırılmayan sütun SELECT-də yoxdur.",
    },
  },
  {
    slug: "view",
    title: "View-lar",
    intro: "View (görünüş) — yadda saxlanmış SELECT sorğusudur. Onu cədvəl kimi çağırırsan, amma özü məlumat saxlamır — hər dəfə altındakı sorğu icra olunur.",
    sections: [
      {
        level: "baslangic",
        title: "Sorğuya ad vermək",
        blocks: [
          { t: "analogy", text: "Pəncərəni düşün. Pəncərə mənzərəni saxlamır — sadəcə bayıra baxmağın çərçivəsidir. Bayırda nə dəyişsə, pəncərədən də onu görürsən. View da cədvəllərə açılan pəncərədir." },
          { t: "code", lang: "sql", code: `CREATE VIEW v_ela_telebeler AS
SELECT t.id, t.ad, k.ad AS kurs, q.bal
FROM qeydiyyat q
JOIN telebeler t ON t.id = q.telebe_id
JOIN kurslar k   ON k.id = q.kurs_id
WHERE q.bal >= 90;

-- Cədvəl kimi işlət
SELECT ad, kurs FROM v_ela_telebeler ORDER BY bal DESC;

DROP VIEW v_ela_telebeler;      -- silmək` },
          { t: "terms", items: [
            ["CREATE VIEW ad AS SELECT ...", "sorğunu ad altında yadda saxlayır."],
            ["virtual cədvəl", "view-da məlumat yoxdur — yalnız sorğunun mətni saxlanır."],
            ["v_ prefiksi", "adət: view-u cədvəldən ayırmaq üçün."],
          ]},
          { t: "tip", text: "Eyni uzun JOIN-i 5 yerdə yazırsansa — onu view et. Dəyişiklik lazım olanda bir yerdə düzəldəcəksən." },
        ],
      },
      {
        level: "orta",
        title: "Dəyişmək, yeniləmək, məhdudlaşdırmaq",
        blocks: [
          { t: "code", lang: "sql", code: `-- Varsa əvəz et
CREATE OR REPLACE VIEW v_kurs_statistika AS
SELECT k.id, k.ad,
       COUNT(q.id)          AS telebe_sayi,
       ROUND(AVG(q.bal), 1) AS orta_bal
FROM kurslar k
LEFT JOIN qeydiyyat q ON q.kurs_id = k.id
GROUP BY k.id, k.ad;

SHOW CREATE VIEW v_kurs_statistika;
SHOW FULL TABLES WHERE Table_type = 'VIEW';` },
          { t: "code", lang: "sql", code: `-- Sadə view üzərindən yazmaq olur
CREATE VIEW v_bakili AS
SELECT id, ad, seher FROM telebeler
WHERE seher = 'Bakı'
WITH CHECK OPTION;

UPDATE v_bakili SET ad = 'Aysel M.' WHERE id = 1;      -- işləyir
INSERT INTO v_bakili (ad, seher) VALUES ('Əli', 'Gəncə');
-- XƏTA: CHECK OPTION failed — sətir view-un şərtinə uymur` },
          { t: "terms", items: [
            ["yenilənə bilən view (updatable)", "bir cədvələ əsaslanan, GROUP BY / DISTINCT / aqreqat / UNION olmayan view. Onun üzərindən INSERT/UPDATE/DELETE mümkündür."],
            ["WITH CHECK OPTION", "view vasitəsilə yalnız onun WHERE şərtinə uyğun sətir yazmağa icazə verir."],
          ]},
          { t: "mistake", lang: "sql", wrong: `CREATE VIEW v_telebeler AS SELECT * FROM telebeler;\n-- sonra cədvələ sütun əlavə olunur → view onu GÖRMÜR`, right: `CREATE VIEW v_telebeler AS\nSELECT id, ad, seher FROM telebeler;`, why: "* view yaradılan anda sütun siyahısına açılır və «donur». Sütunları açıq yaz — həm də view-un «müqaviləsi» aydın olur." },
          { t: "mistake", lang: "sql", wrong: `CREATE VIEW v1 AS SELECT ... FROM v2;\nCREATE VIEW v2 AS SELECT ... FROM v3;\n-- v3 → v4 → ...`, right: `-- Ən çox 1–2 qat; mürəkkəb məntiq üçün CTE və ya hesabat cədvəli`, why: "İç-içə view-ları oxumaq və optimallaşdırmaq çətindir: sadə görünən SELECT arxasında 10 JOIN gizlənir." },
        ],
      },
      {
        level: "senior",
        title: "MERGE / TEMPTABLE, materializasiya və view ilə təhlükəsizlik",
        blocks: [
          { t: "p", text: "MySQL view-u iki alqoritmlə icra edir. MERGE: view-un mətni xarici sorğuya birləşdirilir və hamısı bir sorğu kimi optimallaşdırılır — xarici WHERE daxili cədvəlin indeksindən istifadə edə bilir. TEMPTABLE: view əvvəlcə tam hesablanıb müvəqqəti cədvələ yazılır, sonra süzülür — GROUP BY, DISTINCT, aqreqat, UNION, LIMIT olan view-lar belə işləyir və yavaş ola bilər. EXPLAIN-də <derived> görürsənsə, materializasiya var." },
          { t: "list", items: [
            "MySQL-də materialized view YOXDUR (PostgreSQL-dən fərqli). Əvəzi: xülasə cədvəli + EVENT (planlaşdırılmış yeniləmə) və ya trigger-lər; ya da tətbiq keşi.",
            "View performans vermir — yalnız abstraksiyadır. Ağır view hər çağırışda yenidən hesablanır.",
            "8.0-da optimallaşdırıcı bəzi hallarda xarici şərti materializasiya olunan view-un içinə «itələyə» bilir (derived condition pushdown), amma buna güvənmə — EXPLAIN ilə yoxla.",
            "View API kimi: tətbiq view-dan oxuyursa, altındakı cədvəlləri yenidən qurmaq (refaktor) olar — view-un sütunları dəyişmədikcə tətbiq hiss etmir.",
            "Miqrasiyalarda view-ları versiyalandır (CREATE OR REPLACE skriptləri git-də).",
          ]},
          { t: "code", lang: "sql", code: `-- Hesabat komandası maaşı və FİN-i görməməlidir
CREATE SQL SECURITY DEFINER VIEW v_emekdas_aciq AS
SELECT id, ad, vezife, sobe
FROM emekdaslar
WHERE aktiv = 1;

GRANT SELECT ON sirket.v_emekdas_aciq TO 'hesabat'@'10.0.0.%';
-- emekdaslar cədvəlinin özünə icazə VERİLMİR`, caption: "TƏHLÜKƏSİZLİK: sütun və sətir səviyyəli məhdudiyyət" },
          { t: "list", items: [
            "TƏHLÜKƏSİZLİK: view ilə həssas sütunları (maaş, FİN, parol heşi) və sətirləri gizlədib yalnız view-a SELECT icazəsi vermək — klassik sütun/sətir səviyyəli müdafiədir.",
            "TƏHLÜKƏSİZLİK — SQL SECURITY: DEFINER (default) — view yaradanın icazələri ilə işləyir; INVOKER — çağıranın icazələri ilə. DEFINER root-dursa, view-a icazəsi olan hər kəs dolayı yolla root-un görə bildiyini görür. View-u məhdud icazəli xüsusi hesabla yarat.",
            "TƏHLÜKƏSİZLİK: DEFINER hesabı silinsə, view «yetim» qalır və ya eyni adla yaradılan yeni hesab onun səlahiyyətini miras alır. Hesab silməzdən əvvəl information_schema.VIEWS-da DEFINER-ləri yoxla.",
            "TƏHLÜKƏSİZLİK: WITH CHECK OPTION olmadan yenilənə bilən view vasitəsilə istifadəçi öz görmə sahəsindən kənar sətir yarada və ya sətri oradan «çıxara» bilər (məs. sobe sütununu dəyişməklə).",
            "TƏHLÜKƏSİZLİK: çoxkirayəçili (multi-tenant) sistemdə WHERE tenant_id = ... süzgəcini yalnız view-a etibar etmə — view-u yan keçən bir sorğu bütün müştərilərin məlumatını açır. Tətbiq qatında da məcburi et və testlə yoxla.",
          ]},
          { t: "qa", items: [
            ["View məlumat saxlayırmı?", "Yox. Yalnız sorğu tərifi saxlanır; hər müraciətdə əsas cədvəllərdən oxunur."],
            ["Hansı view yenilənə bilmir?", "Aqreqat, GROUP BY, HAVING, DISTINCT, UNION, alt sorğu SELECT siyahısında, bəzi JOIN-lər olan və ya TEMPTABLE alqoritmli view-lar."],
            ["MERGE ilə TEMPTABLE fərqi?", "MERGE view-u xarici sorğuya birləşdirir (indekslər işləyir, sürətli). TEMPTABLE əvvəl nəticəni müvəqqəti cədvələ yazır — indekssiz və yavaş, yenilənə bilmir."],
            ["DEFINER və INVOKER fərqi?", "DEFINER — obyekt yaradanın imtiyazları ilə icra; INVOKER — çağıranın imtiyazları ilə. DEFINER imtiyaz yüksəltmə riski daşıyır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "View-da nə saxlanır?", options: ["Məlumatın surəti", "Yalnız sorğunun tərifi", "İndeks"], answer: 1, why: "View virtual cədvəldir — məlumat əsas cədvəllərdədir." },
          { t: "quiz", q: "WITH CHECK OPTION nə edir?", options: ["View-u sürətləndirir", "View şərtinə uymayan sətrin yazılmasını qadağan edir", "View-u yalnız oxunan edir"], answer: 1, why: "View vasitəsilə yazılan sətir onun WHERE şərtinə uyğun olmalıdır." },
        ],
      },
    ],
    exercise: {
      task: "Məşq bazasında v_telebe_netice adlı view yarat: hər tələbə üçün ad, şəhər, kurs sayı və orta bal (1 onluqla); heç bir kursa yazılmayan tələbələr də görünsün (say 0). Sonra view-dan orta balı 80-dən yuxarı olanları seç. (Brauzerdə işləyir.)",
      starter: `CREATE VIEW v_telebe_netice AS\nSELECT t.ad, t.seher\n  -- say, orta bal\nFROM telebeler t\n`,
      expect: "CREATE VIEW ... AS SELECT t.ad, t.seher, COUNT(q.id), ROUND(AVG(q.bal), 1) FROM telebeler t LEFT JOIN qeydiyyat q ON q.telebe_id = t.id GROUP BY t.id (ad, seher); sütunlar açıq yazılıb (* yox), aliaslar var; ikinci sorğu: SELECT ... FROM v_telebe_netice WHERE orta_bal > 80.",
    },
  },
  {
    slug: "procedure",
    title: "Stored procedure və funksiyalar",
    intro: "Stored procedure (saxlanmış prosedur) — bazanın içində saxlanan, ad verilmiş SQL proqramıdır. Bir neçə əmri bir çağırışla icra edir. Stored function isə dəyər qaytarır və sorğunun içində işlədilir.",
    sections: [
      {
        level: "baslangic",
        title: "İlk prosedur",
        blocks: [
          { t: "analogy", text: "Prosedur — kofe aparatının düyməsidir. «Kapuçino» düyməsini basırsan, aparat özü su qızdırır, kofe üyüdür, süd köpürdür. Sən addımları bilmirsən — yalnız düyməni və nə qədər şəkər istədiyini (parametr) deyirsən." },
          { t: "code", lang: "sql", code: `DELIMITER //

CREATE PROCEDURE telebe_ballari(IN p_telebe_id INT)
BEGIN
  SELECT k.ad AS kurs, q.bal
  FROM qeydiyyat q
  JOIN kurslar k ON k.id = q.kurs_id
  WHERE q.telebe_id = p_telebe_id
  ORDER BY q.bal DESC;
END //

DELIMITER ;

-- Çağırış
CALL telebe_ballari(1);

-- Silmək
DROP PROCEDURE IF EXISTS telebe_ballari;` },
          { t: "terms", items: [
            ["CREATE PROCEDURE", "proseduru yaradır və bazada saxlayır."],
            ["CALL", "proseduru işə salır."],
            ["IN parametr", "prosedura verilən giriş dəyəri."],
            ["BEGIN ... END", "prosedurun gövdəsi — bir neçə əmr."],
            ["DELIMITER", "mysql klientinə əmrin sonunu göstərən işarəni dəyişir; gövdədəki ; əmri vaxtından əvvəl bitirməsin."],
          ]},
          { t: "tip", text: "Parametrə p_ prefiksi ver (p_telebe_id). Parametr adı sütun adı ilə eyni olsa, MySQL parametri seçir və şərt həmişə doğru olur." },
        ],
      },
      {
        level: "orta",
        title: "OUT parametr, dəyişənlər, şərtlər və funksiya",
        blocks: [
          { t: "code", lang: "sql", code: `DELIMITER //

-- OUT: nəticəni parametrlə qaytarır
CREATE PROCEDURE kurs_statistika(IN p_kurs_id INT, OUT p_say INT, OUT p_orta DECIMAL(5,1))
BEGIN
  SELECT COUNT(*), ROUND(AVG(bal), 1)
  INTO p_say, p_orta
  FROM qeydiyyat
  WHERE kurs_id = p_kurs_id;
END //

-- Dəyişən, IF, tranzaksiya və xəta idarəsi
CREATE PROCEDURE pul_kocur(IN p_kimden INT, IN p_kime INT, IN p_mebleg DECIMAL(12,2))
BEGIN
  DECLARE v_balans DECIMAL(12,2);

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;                       -- xətanı çağırana ötür
  END;

  IF p_mebleg <= 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Məbləğ müsbət olmalıdır';
  END IF;

  START TRANSACTION;

  SELECT balans INTO v_balans FROM hesablar WHERE id = p_kimden FOR UPDATE;

  IF v_balans IS NULL OR v_balans < p_mebleg THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Balans çatmır';
  END IF;

  UPDATE hesablar SET balans = balans - p_mebleg WHERE id = p_kimden;
  UPDATE hesablar SET balans = balans + p_mebleg WHERE id = p_kime;

  COMMIT;
END //

-- Funksiya: bir dəyər qaytarır, sorğuda işlənir
CREATE FUNCTION bal_seviyyesi(p_bal INT) RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
  IF p_bal >= 91 THEN RETURN 'Əla';
  ELSEIF p_bal >= 51 THEN RETURN 'Keçdi';
  ELSE RETURN 'Kəsildi';
  END IF;
END //

DELIMITER ;

CALL kurs_statistika(2, @say, @orta);
SELECT @say, @orta;

SELECT telebe_id, bal, bal_seviyyesi(bal) AS seviyye FROM qeydiyyat;` },
          { t: "list", items: [
            "Prosedur: CALL ilə çağırılır, bir neçə nəticə dəsti qaytara bilər, tranzaksiya idarə edə bilər.",
            "Funksiya: SELECT içində işlənir, tək dəyər qaytarır, tranzaksiya idarə edə bilməz.",
            "DECLARE — lokal dəyişən (v_ prefiksi). @ad — sessiya dəyişəni, bağlantı boyu yaşayır.",
            "SIGNAL — öz xətanı atmaq; HANDLER — xətanı tutmaq.",
          ]},
          { t: "mistake", lang: "sql", wrong: `CREATE PROCEDURE telebe_tap(IN id INT)
BEGIN
  SELECT * FROM telebeler WHERE id = id;   -- həmişə doğru: bütün sətirlər
END`, right: `CREATE PROCEDURE telebe_tap(IN p_id INT)
BEGIN
  SELECT id, ad, soyad FROM telebeler WHERE id = p_id;
END`, why: "Parametr və sütun adı eynidirsə, hər iki «id» parametr kimi oxunur — şərt id = id olur. Parametrə prefiks ver." },
          { t: "mistake", lang: "sql", wrong: `CREATE PROCEDURE sifaris_yarat(...)
BEGIN
  INSERT INTO sifarisler ...;
  UPDATE anbar SET say = say - 1 ...;     -- xəta olsa, sifariş yarımçıq qalır
END`, right: `CREATE PROCEDURE sifaris_yarat(...)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN ROLLBACK; RESIGNAL; END;

  START TRANSACTION;
  INSERT INTO sifarisler ...;
  UPDATE anbar SET say = say - 1 ...;
  COMMIT;
END`, why: "Prosedur öz-özünə atom deyil. Bir neçə dəyişiklik varsa, tranzaksiya və xəta tutucusu olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Nə vaxt işlətməli, performans, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Üstünlük: şəbəkə gediş-gəlişi azalır (10 sorğu əvəzinə 1 çağırış), məntiq bütün tətbiqlər üçün bir yerdədir, icazəni cədvələ yox, prosedura vermək olur.",
            "Çatışmazlıq: versiya nəzarəti və testi çətindir, debug zəifdir, baza serverinin CPU-sunu yükləyir (onu miqyaslamaq tətbiq serverindən bahadır), başqa bazaya keçid çətinləşir. Müasir layihələrdə biznes məntiqi adətən tətbiqdə qalır.",
            "Prosedurları miqrasiya faylları ilə idarə et (DROP ... IF EXISTS + CREATE). «Canlı bazada əl ilə düzəliş» — itən koddur.",
            "MySQL prosedurun planını keşləmir (hər bağlantı öz nüsxəsini kompilyasiya edir). Dövr içində sətir-sətir emal (CURSOR) yavaşdır — mümkünsə bir çoxluq əməliyyatı (UPDATE ... JOIN) yaz.",
            "WHERE-də saxlanmış funksiya indeksi söndürür və hər sətir üçün çağırılır. Filtr sütununa funksiya tətbiq etmə.",
            "DETERMINISTIC yalnız eyni girişə həmişə eyni cavab verən funksiyaya yazılır. Yanlış bəyan replikasiyada və optimizatorda səhv nəticə verir. Lazım olanda READS SQL DATA / NO SQL göstər.",
            "Təhlükəsizlik — dinamik SQL: prosedur içində CONCAT ilə sorğu qurub PREPARE etmək SQL injection-dur — prosedurda olması onu təhlükəsiz etmir. Dəyərləri ? ilə EXECUTE ... USING vasitəsilə ötür; cədvəl/sütun adını yalnız ağ siyahıdan seç.",
            "Təhlükəsizlik — DEFINER və INVOKER: standart SQL SECURITY DEFINER-dir — prosedur onu yaradanın hüquqları ilə işləyir. root yaradıbsa, hər çağıran root gücü alır (hüquq yüksəltmə). Minimal hüquqlu ayrıca hesabı DEFINER et və ya SQL SECURITY INVOKER yaz.",
            "Təhlükəsizlik — ən az hüquq: tətbiq hesabına cədvəllərə birbaşa giriş vermə, yalnız GRANT EXECUTE ON PROCEDURE. Onda tətbiq yalnız icazə verilən əməliyyatı edə bilər — injection olsa belə zərər məhduddur.",
            "Təhlükəsizlik — girişi yoxla: prosedur son müdafiə xəttidir. Mənfi məbləğ, başqasının hesabı, həddən böyük LIMIT — hamısını içəridə yoxla və SIGNAL ilə rədd et.",
            "Təhlükəsizlik — xəta mesajları: SIGNAL mətnində cədvəl adı, sorğu və ya daxili məlumat vermə — tətbiq onu istifadəçiyə göstərə bilər.",
          ]},
          { t: "code", lang: "sql", caption: "Təhlükəsiz dinamik sıralama: ağ siyahı + parametr", code: `DELIMITER //

CREATE DEFINER = 'bloq_proc'@'localhost' PROCEDURE yazilari_al(
  IN p_muellif_id INT, IN p_siralama VARCHAR(20), IN p_limit INT)
SQL SECURITY DEFINER
BEGIN
  DECLARE v_sutun VARCHAR(20);

  -- sütun adı yalnız ağ siyahıdan
  SET v_sutun = CASE p_siralama
    WHEN 'tarix' THEN 'yaradilib'
    WHEN 'baxis' THEN 'baxis_sayi'
    ELSE 'yaradilib'
  END;

  SET @sorgu = CONCAT(
    'SELECT id, basliq, yaradilib FROM yazilar WHERE muellif_id = ? ORDER BY ',
    v_sutun, ' DESC LIMIT ?');
  SET @m = p_muellif_id;
  SET @l = LEAST(GREATEST(p_limit, 1), 100);     -- üst hədd

  PREPARE s FROM @sorgu;
  EXECUTE s USING @m, @l;                        -- dəyərlər parametrlə
  DEALLOCATE PREPARE s;
END //

DELIMITER ;

GRANT EXECUTE ON PROCEDURE bloq.yazilari_al TO 'bloq_app'@'10.0.1.%';` },
          { t: "qa", items: [
            ["Prosedur ilə funksiyanın fərqi?", "Prosedur CALL ilə çağırılır, nəticə dəsti və OUT parametr qaytara bilər, tranzaksiya idarə edir. Funksiya tək dəyər qaytarır və ifadə içində işlənir."],
            ["DELIMITER nə üçündür?", "Klient ; görəndə əmri serverə göndərir. Gövdədə ; çox olduğu üçün son işarəsi müvəqqəti dəyişdirilir. Bu, server yox, klient əmridir."],
            ["SQL SECURITY DEFINER nə deməkdir?", "Prosedur çağıranın yox, DEFINER hesabının hüquqları ilə icra olunur. Hüquqlu DEFINER təhlükəlidir."],
            ["Prosedur SQL injection-dan qoruyurmu?", "Parametrlər adi sorğuda işlənirsə — bəli. İçəridə CONCAT ilə dinamik SQL qurulursa — yox."],
            ["Biznes məntiqini prosedurda saxlamaq olarmı?", "Olar, amma test, versiya və miqyaslama çətinləşir. Adətən yalnız məlumata yaxın, çoxluq əməliyyatları üçün seçilir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Proseduru hansı əmr işə salır?", options: ["RUN", "CALL", "EXEC"], answer: 1, why: "MySQL-də CALL ad(...)." },
          { t: "quiz", q: "SELECT içində işlədilə bilən hansıdır?", options: ["Prosedur", "Funksiya", "Hər ikisi"], answer: 1, why: "Funksiya dəyər qaytarır və ifadədə işlənir." },
          { t: "quiz", q: "Nəticəni çağırana qaytaran parametr növü?", options: ["IN", "OUT", "DECLARE"], answer: 1, why: "OUT parametr dəyəri bayıra ötürür." },
        ],
      },
    ],
    exercise: {
      task: "Məşq bazası üçün (AI yoxlayır — MySQL sintaksisi): 1) `telebe_yaz(p_telebe_id, p_kurs_id, p_bal)` proseduru yaz: bal 0–100 aralığında deyilsə SIGNAL ilə xəta atsın; tələbə artıq həmin kursa yazılıbsa balı yeniləsin, yoxdursa yeni sətir əlavə etsin. 2) `orta_bal(p_telebe_id)` funksiyası yaz: tələbənin orta balını 1 onluqla qaytarsın, qeydiyyatı yoxdursa 0. 3) Proseduru çağır və funksiyanı SELECT-də işlət.",
      starter: `DELIMITER //\n\nCREATE PROCEDURE telebe_yaz(IN p_telebe_id INT, IN p_kurs_id INT, IN p_bal INT)\nBEGIN\n\nEND //\n\nDELIMITER ;\n`,
      expect: "DELIMITER işlədilib; parametrlər prefikslidir (sütun adı ilə eyni deyil); bal < 0 OR bal > 100 olanda SIGNAL SQLSTATE '45000'; mövcudluq yoxlaması (SELECT COUNT/EXISTS INTO dəyişən) və IF ... THEN UPDATE ... ELSE INSERT ... END IF (və ya INSERT ... ON DUPLICATE KEY UPDATE); funksiya RETURNS DECIMAL, READS SQL DATA (və ya DETERMINISTIC deyil), RETURN IFNULL/COALESCE(ROUND(AVG(bal),1), 0); CALL telebe_yaz(...) və SELECT orta_bal(...) var; dinamik SQL yoxdur.",
    },
  },
  {
    slug: "trigger",
    title: "Trigger-lər",
    intro: "Trigger (tətikləyici) — cədvəldə INSERT, UPDATE və ya DELETE baş verəndə avtomatik işə düşən koddur. Onu çağırmırsan — hadisə özü çağırır.",
    sections: [
      {
        level: "baslangic",
        title: "Hadisəyə bağlı kod",
        blocks: [
          { t: "analogy", text: "Trigger — mağazanın qapısındakı zəngdir. Onu heç kim xüsusi çalmır: qapı açılan kimi özü səslənir. Kim girir-girsin, zəng həmişə işləyir." },
          { t: "code", lang: "sql", code: `CREATE TABLE bal_tarixcesi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  telebe_id INT NOT NULL,
  kurs_id INT NOT NULL,
  kohne_bal INT,
  yeni_bal INT,
  deyisib DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE TRIGGER trg_qeydiyyat_au
AFTER UPDATE ON qeydiyyat
FOR EACH ROW
BEGIN
  IF OLD.bal <> NEW.bal THEN
    INSERT INTO bal_tarixcesi (telebe_id, kurs_id, kohne_bal, yeni_bal)
    VALUES (NEW.telebe_id, NEW.kurs_id, OLD.bal, NEW.bal);
  END IF;
END //

DELIMITER ;

UPDATE qeydiyyat SET bal = 97 WHERE telebe_id = 1 AND kurs_id = 1;
SELECT * FROM bal_tarixcesi;      -- 95 → 97 qeydi özü yarandı` },
          { t: "terms", items: [
            ["BEFORE / AFTER", "trigger əməliyyatdan əvvəl və ya sonra işləyir."],
            ["INSERT / UPDATE / DELETE", "trigger-i işə salan hadisə."],
            ["FOR EACH ROW", "dəyişən hər sətir üçün ayrıca işləyir."],
            ["OLD", "sətrin dəyişiklikdən əvvəlki dəyərləri (UPDATE, DELETE)."],
            ["NEW", "sətrin yeni dəyərləri (INSERT, UPDATE)."],
          ]},
          { t: "tip", text: "Ad qəlibi: trg_cədvəl_bi / ai / bu / au / bd / ad (before insert, after update...). Adından nə vaxt işlədiyi görünsün." },
        ],
      },
      {
        level: "orta",
        title: "BEFORE ilə yoxlama və düzəliş, AFTER ilə sayğac",
        blocks: [
          { t: "code", lang: "sql", code: `DELIMITER //

-- BEFORE: dəyəri düzəlt və ya rədd et
CREATE TRIGGER trg_telebeler_bi
BEFORE INSERT ON telebeler
FOR EACH ROW
BEGIN
  SET NEW.ad = TRIM(NEW.ad);                       -- NEW-u yalnız BEFORE-da dəyişmək olar

  IF NEW.yas < 16 OR NEW.yas > 100 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Yaş 16–100 aralığında olmalıdır';
  END IF;
END //

-- AFTER: törəmə məlumatı yenilə
CREATE TRIGGER trg_qeydiyyat_ai
AFTER INSERT ON qeydiyyat
FOR EACH ROW
BEGIN
  UPDATE kurslar SET telebe_sayi = telebe_sayi + 1 WHERE id = NEW.kurs_id;
END //

CREATE TRIGGER trg_qeydiyyat_ad
AFTER DELETE ON qeydiyyat
FOR EACH ROW
BEGIN
  UPDATE kurslar SET telebe_sayi = telebe_sayi - 1 WHERE id = OLD.kurs_id;
END //

-- Silinməyə qadağa
CREATE TRIGGER trg_audit_bd
BEFORE DELETE ON bal_tarixcesi
FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tarixçə silinə bilməz';
END //

DELIMITER ;

SHOW TRIGGERS;
DROP TRIGGER IF EXISTS trg_qeydiyyat_ai;` },
          { t: "p", text: "Trigger əsas əməliyyatla eyni tranzaksiyadadır. Trigger xəta versə, onu işə salan INSERT/UPDATE/DELETE də geri qayıdır." },
          { t: "mistake", lang: "sql", wrong: `CREATE TRIGGER trg_telebeler_ai
AFTER INSERT ON telebeler
FOR EACH ROW
BEGIN
  SET NEW.ad = TRIM(NEW.ad);     -- xəta: AFTER-də NEW dəyişmir
END`, right: `CREATE TRIGGER trg_telebeler_bi
BEFORE INSERT ON telebeler
FOR EACH ROW
BEGIN
  SET NEW.ad = TRIM(NEW.ad);
END`, why: "AFTER-də sətir artıq yazılıb. Dəyəri düzəltmək və ya yoxlamaq üçün BEFORE, başqa cədvələ yazmaq üçün AFTER işlət." },
          { t: "mistake", lang: "sql", wrong: `CREATE TRIGGER trg_kurslar_au
AFTER UPDATE ON kurslar
FOR EACH ROW
BEGIN
  UPDATE kurslar SET yenilenib = NOW() WHERE id = NEW.id;   -- xəta 1442
END`, right: `CREATE TRIGGER trg_kurslar_bu
BEFORE UPDATE ON kurslar
FOR EACH ROW
BEGIN
  SET NEW.yenilenib = NOW();
END`, why: "Trigger öz cədvəlini dəyişə bilməz (sonsuz dövr olardı). Cari sətri BEFORE-da NEW ilə dəyiş. Bu hal üçün ən sadəsi isə sütunda ON UPDATE CURRENT_TIMESTAMP-dir." },
          { t: "mistake", lang: "sql", wrong: `-- Sadə qayda üçün trigger
CREATE TRIGGER ... BEFORE INSERT ... IF NEW.qiymet < 0 THEN SIGNAL ...`, right: `ALTER TABLE mehsullar
  ADD CONSTRAINT chk_qiymet CHECK (qiymet >= 0);`, why: "Sadə qaydanı CHECK, NOT NULL, UNIQUE, FOREIGN KEY ilə yaz: daha sürətli, daha aydın və sxemdə görünür. Trigger yalnız məhdudiyyətlə ifadə olunmayan hal üçündür." },
        ],
      },
      {
        level: "senior",
        title: "Gizli məntiqin qiyməti və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Trigger «gizli» koddur: tətbiq kodunu oxuyan onu görmür. Hər trigger sənədləşdirilsin və miqrasiyada saxlansın. Çoxlu trigger sistemi anlaşılmaz edir.",
            "Performans: FOR EACH ROW — 1 milyon sətirlik UPDATE trigger-i 1 milyon dəfə işlədir. MySQL-də əmr səviyyəli (statement-level) trigger yoxdur. Kütləvi yükləmədə bu, əsas ləngimə mənbəyidir.",
            "Trigger əlavə kilidlər götürür (sayğac sətrini yeniləyən hər INSERT eyni sətri kilidləyir) — yüksək yükdə növbə və deadlock yaranır. Sayğacı dövri hesablamaq və ya ayrı cədvəldə saxlamaq daha yaxşı ola bilər.",
            "Kaskad: trigger başqa cədvəli dəyişir, onun trigger-i üçüncünü... İzləmək çətinləşir. Xarici açarın ON DELETE CASCADE-i isə InnoDB-də trigger-ləri işə salmır — audit boşluğu yarana bilər.",
            "Eyni hadisəyə bir neçə trigger: sıra FOLLOWS / PRECEDES ilə verilir. TRUNCATE trigger-ləri işə salmır.",
            "Replikasiya: sətir əsaslı (ROW) binlog-da trigger replikada yenidən işləmir — dəyişikliklər hazır gəlir. Qeyri-deterministik trigger (NOW(), UUID()) STATEMENT rejimində uyğunsuzluq yaradır.",
            "Alternativlər: sadə qayda → məhdudiyyət; hesablanan sütun → GENERATED COLUMN; audit → binlog / CDC (Debezium); biznes məntiqi → tətbiq.",
            "Təhlükəsizlik — audit izi: trigger auditi tətbiqdən yan keçən dəyişiklikləri də tutur (birbaşa SQL, başqa xidmət). Audit cədvəlinə tətbiq hesabının yalnız INSERT hüququ olsun, UPDATE/DELETE yox — hücumçu izini silə bilməsin.",
            "Təhlükəsizlik — kim etdi: trigger içində USER() bağlantı hesabını verir, bu isə adətən ümumi tətbiq hesabıdır. Real istifadəçini tətbiq sessiya dəyişəni ilə ötürməlidir (SET @cari_istifadeci = ...) və trigger onu yazmalıdır. Dəyişən boşdursa əməliyyatı rədd et.",
            "Təhlükəsizlik — DEFINER: trigger DEFINER hüquqları ilə işləyir. Yüksək hüquqlu hesabın yaratdığı trigger adi istifadəçinin INSERT-i ilə icazəsiz cədvələ yaza bilər. DEFINER minimal hüquqlu olsun; TRIGGER hüququnu tətbiq hesabına vermə.",
            "Təhlükəsizlik — zərərli trigger: bazaya giriş əldə edən hücumçu trigger ilə daimi arxa qapı qura bilər (məs. yeni admin yaradan). SHOW TRIGGERS / information_schema.TRIGGERS-i dövri yoxla və gözlənilən siyahı ilə tutuşdur.",
            "Təhlükəsizlik — həssas məlumat: audit cədvəlinə parol heşini, kart nömrəsini köçürmə. Yalnız lazım olan sahələri yaz; audit cədvəlinin öz giriş nəzarəti və saxlama müddəti olsun.",
          ]},
          { t: "code", lang: "sql", caption: "Silinməz audit: kim, nə vaxt, nəyi dəyişdi", code: `CREATE TABLE audit_hesablar (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  hesab_id INT NOT NULL,
  emeliyyat ENUM('UPDATE','DELETE') NOT NULL,
  kohne_balans DECIMAL(12,2),
  yeni_balans DECIMAL(12,2),
  istifadeci_id INT NOT NULL,
  db_hesabi VARCHAR(100) NOT NULL,
  vaxt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE = InnoDB;

DELIMITER //

CREATE DEFINER = 'audit_yazan'@'localhost' TRIGGER trg_hesablar_au
AFTER UPDATE ON hesablar
FOR EACH ROW
BEGIN
  IF @cari_istifadeci IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'İstifadəçi konteksti yoxdur';
  END IF;

  IF NOT (OLD.balans <=> NEW.balans) THEN          -- NULL-a davamlı müqayisə
    INSERT INTO audit_hesablar
      (hesab_id, emeliyyat, kohne_balans, yeni_balans, istifadeci_id, db_hesabi)
    VALUES
      (NEW.id, 'UPDATE', OLD.balans, NEW.balans, @cari_istifadeci, USER());
  END IF;
END //

DELIMITER ;

-- Tətbiq hesabı auditi nə dəyişə, nə silə bilər
REVOKE ALL ON bank.audit_hesablar FROM 'bank_app'@'10.0.1.%';
GRANT SELECT ON bank.audit_hesablar TO 'bank_auditor'@'10.0.1.%';` },
          { t: "qa", items: [
            ["BEFORE ilə AFTER trigger fərqi?", "BEFORE-da NEW-u dəyişmək və əməliyyatı rədd etmək olar. AFTER-də sətir artıq yazılıb — adətən başqa cədvələ (audit, sayğac) yazmaq üçündür."],
            ["OLD və NEW hansı hadisədə mövcuddur?", "INSERT — yalnız NEW; DELETE — yalnız OLD; UPDATE — hər ikisi."],
            ["Trigger xəta versə nə olur?", "Onu işə salan əmr də geri qayıdır — hər ikisi eyni tranzaksiyadadır."],
            ["Trigger-in əsas çatışmazlıqları?", "Gizli məntiq, hər sətir üçün icra (yavaş kütləvi əməliyyat), əlavə kilidlər, çətin debug."],
            ["Trigger yerinə nə işlətmək olar?", "CHECK/UNIQUE/FK məhdudiyyətləri, generated column, ON UPDATE CURRENT_TIMESTAMP, tətbiq məntiqi, CDC."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "DELETE trigger-ində hansı mövcuddur?", options: ["NEW", "OLD", "Hər ikisi"], answer: 1, why: "Silinən sətrin yalnız köhnə dəyərləri var." },
          { t: "quiz", q: "Daxil olan dəyəri düzəltmək üçün hansı trigger?", options: ["BEFORE INSERT", "AFTER INSERT", "AFTER DELETE"], answer: 0, why: "NEW yalnız BEFORE-da dəyişdirilə bilər." },
          { t: "quiz", q: "Trigger-i kim çağırır?", options: ["CALL əmri", "Cədvəldəki hadisə", "Tətbiq kodu"], answer: 1, why: "Trigger hadisə baş verəndə avtomatik işləyir." },
        ],
      },
    ],
    exercise: {
      task: "Mağaza bazası üçün (AI yoxlayır — MySQL sintaksisi). Cədvəllər: mehsullar(id, ad, qiymet, stok), sifaris_setirleri(id, mehsul_id, say). 1) `qiymet_tarixcesi` cədvəli yarat və məhsulun qiyməti dəyişəndə köhnə/yeni qiyməti ora yazan AFTER UPDATE trigger yaz (qiymət dəyişməyibsə yazmasın). 2) Sifariş sətri əlavə olunmazdan ƏVVƏL stoku yoxlayan trigger: stok çatmırsa SIGNAL ilə rədd etsin. 3) Sifariş sətri əlavə olunandan SONRA stoku azaldan trigger. 4) Şərhdə yaz: «qiymet >= 0» qaydası üçün niyə trigger yox, CHECK daha yaxşıdır.",
      starter: `CREATE TABLE qiymet_tarixcesi (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n\n);\n\nDELIMITER //\n\n-- trigger-lər\n\nDELIMITER ;\n`,
      expect: "qiymet_tarixcesi: mehsul_id, kohne_qiymet, yeni_qiymet DECIMAL, vaxt DEFAULT CURRENT_TIMESTAMP; AFTER UPDATE ON mehsullar FOR EACH ROW, IF OLD.qiymet <> NEW.qiymet THEN INSERT; BEFORE INSERT ON sifaris_setirleri: stoku SELECT ... INTO dəyişən ilə oxuyur və stok < NEW.say olanda SIGNAL SQLSTATE '45000'; AFTER INSERT ON sifaris_setirleri: UPDATE mehsullar SET stok = stok - NEW.say WHERE id = NEW.mehsul_id; DELIMITER işlədilib; adlar mənalıdır; şərhdə CHECK-in sadə, sürətli və sxemdə görünən olduğu yazılıb.",
    },
  },
  {
    slug: "index",
    title: "İndekslər və EXPLAIN",
    intro: "İndeks — axtarışı sürətləndirən əlavə quruluşdur. EXPLAIN isə MySQL-in sorğunu necə icra edəcəyini göstərir: hansı indeksi işlədir, neçə sətir oxuyur.",
    sections: [
      {
        level: "baslangic",
        title: "İndeks nədir, necə yaradılır",
        blocks: [
          { t: "analogy", text: "Kitabın sonundakı əlifba göstəricisini düşün. «Trigger» sözünü tapmaq üçün 500 səhifəni vərəqləmirsən — göstəricidə sözü tapıb birbaşa 312-ci səhifəyə gedirsən. İndeks cədvəl üçün həmin göstəricidir." },
          { t: "code", lang: "sql", code: `-- İndeks yaratmaq
CREATE INDEX idx_telebeler_seher ON telebeler (seher);

-- Unikal indeks: təkrar dəyərə icazə vermir
CREATE UNIQUE INDEX uq_istifadeciler_email ON istifadeciler (email);

-- Cədvəl yaradarkən
CREATE TABLE sifarisler (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,     -- PRIMARY KEY özü indeksdir
  musteri_id INT NOT NULL,
  status VARCHAR(20) NOT NULL,
  yaradilib DATETIME NOT NULL,
  INDEX idx_sifarisler_musteri (musteri_id)
);

SHOW INDEX FROM sifarisler;                 -- mövcud indekslər
DROP INDEX idx_telebeler_seher ON telebeler;

-- Sorğu indeksi işlədirmi?
EXPLAIN SELECT * FROM sifarisler WHERE musteri_id = 42;` },
          { t: "terms", items: [
            ["indeks (index)", "sütun dəyərlərinin sıralanmış surəti + sətrə göstərici."],
            ["PRIMARY KEY", "əsas açar — avtomatik unikal indeksdir."],
            ["UNIQUE INDEX", "təkrarı qadağan edən indeks."],
            ["EXPLAIN", "sorğunun icra planını göstərir (sorğunu icra etmir)."],
            ["full table scan", "indeks olmayanda bütün cədvəlin sətir-sətir oxunması."],
          ]},
          { t: "tip", text: "İndeksi WHERE, JOIN ... ON və ORDER BY-da tez-tez işlənən sütunlara qoy. Hər sütuna indeks qoyma — hər indeks yazmanı yavaşladır." },
        ],
      },
      {
        level: "orta",
        title: "Kompozit indeks və EXPLAIN-i oxumaq",
        blocks: [
          { t: "code", lang: "sql", code: `-- Kompozit (çoxsütunlu) indeks: sıra vacibdir
CREATE INDEX idx_sifarisler_musteri_status_tarix
  ON sifarisler (musteri_id, status, yaradilib);

-- İşlədir (soldan başlayır):
SELECT * FROM sifarisler WHERE musteri_id = 42;
SELECT * FROM sifarisler WHERE musteri_id = 42 AND status = 'odenilib';
SELECT * FROM sifarisler WHERE musteri_id = 42 AND status = 'odenilib' ORDER BY yaradilib DESC;

-- İşlətmir (ilk sütun yoxdur):
SELECT * FROM sifarisler WHERE status = 'odenilib';

EXPLAIN SELECT id, yaradilib FROM sifarisler
WHERE musteri_id = 42 AND status = 'odenilib'
ORDER BY yaradilib DESC LIMIT 10;` },
          { t: "terms", items: [
            ["type", "giriş üsulu. Yaxşıdan pisə: const, eq_ref, ref, range, index, ALL (bütün cədvəl)."],
            ["possible_keys / key", "işlənə biləcək indekslər / faktiki seçilən indeks. key = NULL — indeks yoxdur."],
            ["rows", "oxunacağı təxmin edilən sətir sayı. Nə qədər az, o qədər yaxşı."],
            ["Extra: Using index", "örtən indeks — cədvələ getmədən yalnız indeksdən cavab verir."],
            ["Extra: Using filesort", "sıralama indekssiz, ayrıca aparılır — yavaş ola bilər."],
            ["Extra: Using temporary", "müvəqqəti cədvəl qurulur (GROUP BY, DISTINCT) — bahadır."],
          ]},
          { t: "p", text: "«Sol prefiks» qaydası: (a, b, c) indeksi a, (a, b) və (a, b, c) üzrə axtarışda işləyir; yalnız b və ya c üzrə işləmir. Telefon kitabçasında soyad → ad sırası kimi: yalnız ada görə axtarmaq olmur." },
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM sifarisler WHERE YEAR(yaradilib) = 2026;       -- indeks işləmir
SELECT * FROM istifadeciler WHERE LOWER(email) = 'a@b.az';`, right: `SELECT * FROM sifarisler
WHERE yaradilib >= '2026-01-01' AND yaradilib < '2027-01-01';
SELECT * FROM istifadeciler WHERE email = 'a@b.az';          -- collation onsuz da hərfə həssas deyil`, why: "Sütuna funksiya tətbiq olunanda MySQL indeksdəki sıralanmış dəyərlərdən istifadə edə bilmir. Şərti elə yaz ki, sütun «çılpaq» qalsın (və ya funksional indeks yarat)." },
          { t: "mistake", lang: "sql", wrong: `SELECT * FROM mehsullar WHERE ad LIKE '%telefon%';   -- əvvəldə % → tam skan`, right: `SELECT * FROM mehsullar WHERE ad LIKE 'telefon%';    -- prefiks → indeks işləyir
-- söz axtarışı üçün:
ALTER TABLE mehsullar ADD FULLTEXT INDEX ft_mehsullar_ad (ad);
SELECT * FROM mehsullar WHERE MATCH(ad) AGAINST ('telefon');`, why: "B-tree indeks soldan sağa sıralanıb. Əvvəli məlum olmayan nümunəni tapa bilmir. Mətn axtarışı üçün FULLTEXT indeks və ya ayrıca axtarış mühərriki lazımdır." },
          { t: "mistake", lang: "sql", wrong: `-- telefon VARCHAR sütunudur
SELECT * FROM istifadeciler WHERE telefon = 501234567;    -- ədədlə müqayisə`, right: `SELECT * FROM istifadeciler WHERE telefon = '501234567';`, why: "Tip uyğun gəlməyəndə MySQL hər sətri ədədə çevirir (gizli çevirmə) — indeks işləmir. Dəyərin tipi sütunun tipi ilə eyni olsun." },
        ],
      },
      {
        level: "senior",
        title: "B+tree, örtən indeks, optimizasiya və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "InnoDB-də cədvəl özü PRIMARY KEY üzrə B+tree-dir (clustered index): yarpaqlarda sətrin özü durur. İkinci dərəcəli indeksin yarpağında isə PK dəyəri saxlanır — axtarış iki mərhələlidir: indeks → PK → sətir.",
            "Ona görə PK qısa və artan olmalıdır. Uzun PK bütün indeksləri şişirdir; təsadüfi PK (UUID v4) səhifə bölünməsi və parçalanma yaradır. BIGINT AUTO_INCREMENT və ya vaxta görə sıralanan UUID v7 seç.",
            "Örtən indeks (covering index): sorğuya lazım olan bütün sütunlar indeksdədirsə, cədvələ ümumiyyətlə gedilmir (Extra: Using index). Ən güclü optimizasiyalardan biridir — SELECT * onu mümkünsüz edir.",
            "Kompozit indeksdə sıra: əvvəl bərabərlik (=) sütunları, sonra aralıq (>, <, BETWEEN) və ya sıralama sütunu. Aralıq şərtindən sonrakı sütunlar axtarışda işlənmir.",
            "Seçicilik (selectivity): unikal dəyərlərin payı. «cins» və ya «aktiv» kimi az dəyərli sütunda tək indeks faydasızdır — optimizator onsuz da tam skanı seçəcək.",
            "EXPLAIN ANALYZE (8.0.18+) sorğunu həqiqətən icra edir və real vaxtı, real sətir sayını göstərir. Təxminlə reallıq çox fərqlidirsə — ANALYZE TABLE ilə statistikanı yenilə.",
            "Hər indeks INSERT/UPDATE/DELETE-i yavaşladır və yer tutur. İşlənməyən indeksləri sys.schema_unused_indexes, təkrarlananları sys.schema_redundant_indexes ilə tap. Silməzdən əvvəl ALTER TABLE ... ALTER INDEX ... INVISIBLE ilə sına.",
            "Böyük OFFSET yavaşdır: LIMIT 20 OFFSET 1000000 bir milyon sətir oxuyub atır. Açarla səhifələmə (keyset): WHERE id < son_gorulen ORDER BY id DESC LIMIT 20.",
            "Xüsusi indekslər: funksional indeks ((LOWER(email))), prefiks indeksi (ad(20)), azalan indeks (yaradilib DESC), FULLTEXT, SPATIAL, JSON üçün generated column + indeks.",
            "Böyük cədvələ indeks əlavə etmək: ALGORITHM=INPLACE, LOCK=NONE (online DDL). Çox böyük cədvəllərdə gh-ost / pt-online-schema-change.",
            "Yavaş sorğuları tap: slow_query_log + long_query_time, performance_schema, pt-query-digest. Təxminlə yox, ölçərək optimallaşdır.",
            "Təhlükəsizlik — DoS: indekssiz sorğu bir sorğu ilə bütün cədvəli oxutdurur. Hücumçu axtarış, sıralama və ya filtr parametri ilə ağır sorğuları təkrarlayaraq bazanı çökdürə bilər. İstifadəçiyə açıq hər filtr/sıralama sahəsi indeksli və ağ siyahıda olsun; LIMIT-ə üst hədd, sorğuya vaxt limiti (MAX_EXECUTION_TIME) qoy.",
            "Təhlükəsizlik — LIKE joker simvolları: istifadəçi girişindəki % və _ işarələrini escape et. Əks halda «%» göndərən istifadəçi bütün cədvəli skan etdirir və ya gözlənilməz sətirlərə çatır.",
            "Təhlükəsizlik — UNIQUE indeks tətbiq yoxlamasından etibarlıdır: «əvvəl SELECT ilə yoxla, sonra INSERT et» yarış vəziyyətinə açıqdır — iki sorğu eyni emaili qeydiyyatdan keçirə, kuponu iki dəfə işlədə bilər. Unikallığı baza təmin etsin, tətbiq 1062 xətasını tutsun.",
            "Təhlükəsizlik — məlumat sızması: unikal indeks xətası («Duplicate entry 'x@y.az'») istifadəçiyə göstərilsə, emailin sistemdə olub-olmadığı öyrənilir (enumeration). Cavab vaxtı fərqi də bunu sızdıra bilər. Ümumi mesaj qaytar.",
            "Təhlükəsizlik — EXPLAIN və sxem: icra planı, indeks adları və sxem məlumatı hücumçuya xəritə verir. Xam SQL xətalarını, EXPLAIN nəticəsini və ya debug məlumatını istifadəçiyə qaytarma.",
          ]},
          { t: "code", lang: "sql", caption: "Örtən indeks + açarla səhifələmə + vaxt limiti", code: `-- Sorğu: müştərinin ödənilmiş sifarişləri, ən yenidən
-- Bərabərlik sütunları əvvəl, sıralama sütunu sonra; id və mebleg — örtmək üçün
CREATE INDEX idx_sifarisler_ortucu
  ON sifarisler (musteri_id, status, yaradilib DESC, id, mebleg);

EXPLAIN ANALYZE
SELECT id, yaradilib, mebleg
FROM sifarisler
WHERE musteri_id = 42 AND status = 'odenilib'
ORDER BY yaradilib DESC, id DESC
LIMIT 20;
-- type: ref, Extra: Using index — cədvələ getmir, filesort yoxdur

-- Növbəti səhifə: OFFSET yox, sonuncu görülən sətirdən davam
SELECT /*+ MAX_EXECUTION_TIME(2000) */ id, yaradilib, mebleg
FROM sifarisler
WHERE musteri_id = 42 AND status = 'odenilib'
  AND (yaradilib, id) < ('2026-11-01 12:30:00', 98311)
ORDER BY yaradilib DESC, id DESC
LIMIT 20;

-- İstifadəçi girişi ilə LIKE: joker simvollar escape olunur (tətbiqdə), dəyər parametrdir
SELECT id, ad FROM mehsullar WHERE ad LIKE CONCAT(?, '%') ESCAPE '\\\\' LIMIT 20;` },
          { t: "qa", items: [
            ["İndeks niyə oxumanı sürətləndirir, yazmanı yavaşladır?", "Oxumada sıralanmış ağacda O(log n) axtarış gedir. Yazmada isə cədvəllə yanaşı hər indeks də yenilənməlidir."],
            ["Clustered və secondary indeks fərqi?", "Clustered (PK) yarpağında sətrin özü var — cədvəl elə odur. Secondary indeksin yarpağında PK dəyəri var, sətir üçün əlavə axtarış lazımdır."],
            ["Örtən indeks nədir?", "Sorğunun bütün sütunlarını ehtiva edən indeks; cədvələ müraciət olmur (Using index)."],
            ["Sol prefiks qaydası?", "(a, b, c) indeksi yalnız a-dan başlayan şərtlərdə işləyir: a; a,b; a,b,c."],
            ["EXPLAIN-də nəyə baxırsan?", "type (ALL pisdir), key (seçilən indeks), rows (oxunan sətir), Extra (Using filesort / temporary / index)."],
            ["Nə vaxt indeks işləmir?", "Sütuna funksiya, tip uyğunsuzluğu, LIKE '%...', kompozit indeksin ilk sütunu yoxdursa, seçicilik aşağıdırsa."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "EXPLAIN-də type = ALL nə deməkdir?", options: ["Bütün indekslər işlənir", "Bütün cədvəl oxunur", "Sorğu optimaldır"], answer: 1, why: "ALL — tam cədvəl skanıdır." },
          { t: "quiz", q: "(a, b) indeksi hansı şərtdə işləmir?", options: ["WHERE a = 1", "WHERE a = 1 AND b = 2", "WHERE b = 2"], answer: 2, why: "Sol prefiks qaydası: a olmadan işləmir." },
          { t: "quiz", q: "Çox indeksin mənfi tərəfi?", options: ["SELECT yavaşlayır", "INSERT/UPDATE yavaşlayır", "Heç bir"], answer: 1, why: "Hər yazıda bütün indekslər yenilənir." },
        ],
      },
    ],
    exercise: {
      task: "sifarisler(id PK, musteri_id, status, mebleg, yaradilib) cədvəli üçün (AI yoxlayır — MySQL sintaksisi): 1) Bu sorğuya ən uyğun kompozit indeksi yarat: `SELECT id, mebleg FROM sifarisler WHERE musteri_id = ? AND status = ? ORDER BY yaradilib DESC LIMIT 10`. Sütun sırasını şərhdə əsaslandır. 2) EXPLAIN ilə yoxla və şərhdə hansı type/Extra gözlədiyini yaz. 3) Bu yavaş sorğunu indeks işlədəcək şəkildə yenidən yaz: `SELECT * FROM sifarisler WHERE DATE(yaradilib) = '2026-11-14'`. 4) `LIMIT 20 OFFSET 500000` sorğusunu açarla səhifələməyə çevir.",
      starter: `-- 1) indeks\nCREATE INDEX \n\n-- 2) EXPLAIN\n\n-- 3) tarix sorğusu\n\n-- 4) açarla səhifələmə\n`,
      expect: "İndeks (musteri_id, status, yaradilib [DESC]) sırası ilə — bərabərlik sütunları əvvəl, sıralama sonra (mebleg əlavə olunub örtən edilə bilər); şərhdə səbəb izah olunub; EXPLAIN SELECT ... yazılıb, gözlənilən type ref, filesort yoxdur; tarix sorğusu yaradilib >= '2026-11-14' AND yaradilib < '2026-11-15' kimi (sütunda funksiya yox, tercihen SELECT * yox); səhifələmə WHERE id < ? (və ya (yaradilib, id) < (?, ?)) ORDER BY ... DESC LIMIT 20, OFFSET yoxdur.",
    },
  },
  {
    slug: "backup",
    title: "Backup və bərpa",
    intro: "Backup (ehtiyat nüsxə) — bazanın başqa yerdə saxlanan surətidir. Disk xarab olsa, kimsə səhvən cədvəli silsə və ya hücum olsa, məlumatı yalnız backup qaytarır.",
    sections: [
      {
        level: "baslangic",
        title: "mysqldump ilə nüsxə və bərpa",
        blocks: [
          { t: "analogy", text: "Backup — evin açarının ehtiyat nüsxəsidir. Onu elə həmin açar dəstəsində gəzdirsən, dəst itəndə o da itəcək. Ehtiyat açar başqa yerdə — qonşuda, valideyndə olmalıdır. Və arada bir yoxlamalısan: qapını açırmı?" },
          { t: "code", lang: "bash", code: `# Bir bazanın nüsxəsi (SQL faylı)
mysqldump -u backup_user -p --single-transaction magaza > magaza_2026-11-14.sql

# Sıxılmış
mysqldump -u backup_user -p --single-transaction magaza | gzip > magaza.sql.gz

# Yalnız bir cədvəl
mysqldump -u backup_user -p magaza sifarisler > sifarisler.sql

# Bütün bazalar
mysqldump -u backup_user -p --single-transaction --all-databases > hamisi.sql

# Bərpa
mysql -u root -p magaza < magaza_2026-11-14.sql
gunzip < magaza.sql.gz | mysql -u root -p magaza` },
          { t: "terms", items: [
            ["mysqldump", "bazanı SQL əmrləri (CREATE TABLE, INSERT) şəklində fayla yazan alət."],
            ["dump", "bazanın mətn şəklində çıxarışı."],
            ["bərpa (restore)", "backup-dan bazanı geri qaytarmaq."],
            ["--single-transaction", "InnoDB-də cədvəlləri kilidləmədən, bir andakı vəziyyəti çıxarır."],
            ["-p", "parolu soruşur. Parolu əmrin içində yazma."],
          ]},
          { t: "tip", text: "Bərpası sınanmamış backup — backup deyil. Ayda ən azı bir dəfə nüsxəni boş serverə bərpa edib yoxla." },
        ],
      },
      {
        level: "orta",
        title: "Tam, artımlı nüsxə və zamanda nöqtəyə bərpa",
        blocks: [
          { t: "code", lang: "bash", code: `# Tam nüsxə: prosedur, trigger, event-lərlə və binlog mövqeyi ilə
mysqldump -u backup_user -p \\
  --single-transaction --routines --triggers --events \\
  --source-data=2 --set-gtid-purged=AUTO \\
  magaza | gzip > /backup/magaza_$(date +%F).sql.gz

# Binar jurnal (binlog): nüsxədən sonrakı bütün dəyişikliklər
mysql -e "SHOW BINARY LOGS;"

# Zamanda nöqtəyə bərpa (PITR): səhv DELETE 14:32-də olub
# 1) son tam nüsxəni bərpa et
gunzip < /backup/magaza_2026-11-14.sql.gz | mysql -u root -p magaza
# 2) binlog-u səhvdən bir an əvvələ qədər tətbiq et
mysqlbinlog --start-datetime="2026-11-14 02:00:00" \\
            --stop-datetime="2026-11-14 14:31:59" \\
            /var/lib/mysql/binlog.000042 | mysql -u root -p

# Avtomatik: hər gecə 02:00 (cron)
# 0 2 * * * /usr/local/bin/mysql-backup.sh >> /var/log/mysql-backup.log 2>&1` },
          { t: "list", items: [
            "Məntiqi nüsxə (mysqldump, mysqlpump, MySQL Shell dump): SQL faylı. Daşınandır, amma böyük bazada bərpası yavaşdır.",
            "Fiziki nüsxə (Percona XtraBackup, MySQL Enterprise Backup): məlumat fayllarının surəti. Sürətlidir, artımlı (incremental) nüsxəni dəstəkləyir.",
            "Tam nüsxə — hər şey. Artımlı — yalnız son nüsxədən bəri dəyişənlər.",
            "RPO — nə qədər məlumat itirməyə razısan (son nüsxədən bəri). RTO — bərpa nə qədər çəkə bilər.",
            "3-2-1 qaydası: 3 nüsxə, 2 fərqli daşıyıcıda, 1-i başqa məkanda.",
          ]},
          { t: "mistake", lang: "bash", wrong: `mysqldump -u root -pGizliParol123 magaza > magaza.sql`, right: `# ~/.my.cnf (icazə 600):
# [mysqldump]
# user=backup_user
# password=...
mysqldump --single-transaction magaza > magaza.sql`, why: "Əmr sətrindəki parol shell tarixçəsində və proses siyahısında (ps) hamıya görünür. Parolu qorunan konfiqurasiya faylında və ya mysql_config_editor ilə saxla; root yox, ayrıca backup hesabı işlət." },
          { t: "mistake", lang: "bash", wrong: `mysqldump -u backup_user -p magaza > magaza.sql     # default: cədvəlləri kilidləyir`, right: `mysqldump -u backup_user -p --single-transaction magaza > magaza.sql`, why: "--single-transaction olmadan cədvəllər nüsxə boyu yazıya bağlanır və ya nüsxə uyğunsuz olur (bir cədvəl 02:00, digəri 02:05 vəziyyətində). InnoDB üçün həmişə bu açarı yaz." },
          { t: "mistake", lang: "bash", wrong: `# Backup eyni serverdə, eyni diskdə
mysqldump ... > /var/lib/mysql/backup/magaza.sql`, right: `mysqldump ... | gzip | aws s3 cp - s3://sirket-backup/mysql/magaza_$(date +%F).sql.gz`, why: "Disk yansa və ya server ələ keçirilsə, baza ilə birlikdə backup da gedir. Nüsxə ayrı serverdə/buludda, mümkünsə başqa regionda saxlanmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Strategiya, yoxlama və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Replika backup deyil. DROP TABLE və ya səhv UPDATE saniyələr içində replikaya da çatır. Replikasiya əlçatanlıq üçündür, backup isə geri qayıtmaq üçün. (Gecikdirilmiş replika — SOURCE_DELAY — əlavə təminatdır.)",
            "Böyük bazalarda (yüz GB+) mysqldump bərpası saatlarla, günlərlə çəkir. Fiziki nüsxə (XtraBackup) və ya disk snapshot-u + binlog işlət. MySQL Shell util.dumpInstance() paralel işləyir və mysqldump-dan dəfələrlə sürətlidir.",
            "PITR üçün binlog aktiv olmalı və ayrıca yerə köçürülməlidir (mysqlbinlog --read-from-remote-server --raw --stop-never). Binlog itsə, yalnız son tam nüsxəyə qayıda bilərsən.",
            "Nüsxəni yükü az olan replikadan götür — əsas serverə təsir etməsin. --single-transaction uzun tranzaksiya açır: undo jurnalı böyüyür, bunu izlə.",
            "Bərpanı avtomatlaşdır və sına: hər gecə nüsxəni müvəqqəti serverə bərpa et, sətir sayını/yoxlama cəmini (checksum) tutuşdur, nəticəni monitorinqə göndər. Bərpa vaxtını ölç — RTO-ya sığırmı?",
            "Monitorinq: backup uğursuz olsa və ya fayl ölçüsü kəskin kiçilsə xəbərdarlıq gəlsin. «Səssiz» uğursuz backup ən təhlükəlisidir.",
            "Saxlama siyasəti (retention): məs. gündəlik 7 gün, həftəlik 4 həftə, aylıq 12 ay. Köhnələri avtomatik sil; qanuni saxlama müddətini (GDPR, yerli qanun) nəzərə al — silinməli şəxsi məlumat backup-da əbədi qalmasın.",
            "Bulud xidmətində (RDS, Cloud SQL) avtomatik backup və PITR var, amma hesab silinsə onlar da silinə bilər — kritik məlumat üçün ayrı hesabda/provayderdə əlavə nüsxə saxla.",
            "Təhlükəsizlik — şifrələmə: backup faylı bazanın tam surətidir — bütün şəxsi məlumat, parol heşləri orada var. Faylı saxlamazdan əvvəl şifrələ (age, gpg, openssl və ya KMS ilə server tərəfi şifrələmə); açar backup-la eyni yerdə saxlanmasın.",
            "Təhlükəsizlik — giriş nəzarəti: sızmaların çoxu məhz açıq qalmış backup-dan olur (public S3 bucket, veb qovluğunda dump.sql). Bucket qapalı olsun, public girişi blokla, giriş jurnalını aktiv et. Dump-ı heç vaxt veb serverin kök qovluğuna və ya git-ə qoyma.",
            "Təhlükəsizlik — ransomware: hücumçu əvvəlcə backup-ları silir/şifrələyir, sonra bazanı. Backup yazan hesabın silmə hüququ olmasın; dəyişməz (immutable) saxlama işlət (S3 Object Lock, WORM) və bir nüsxəni oflayn saxla.",
            "Təhlükəsizlik — backup hesabı: yalnız lazım olan hüquqlar — SELECT, SHOW VIEW, TRIGGER, EVENT, LOCK TABLES, RELOAD, PROCESS, REPLICATION CLIENT. root yox. Hesab yalnız backup serverinin ünvanından qoşula bilsin.",
            "Təhlükəsizlik — test mühiti: production nüsxəsini developer mühitinə olduğu kimi bərpa etmə — real müştəri məlumatı zəif qorunan yerə düşür. Əvvəl anonimləşdir (email, telefon, ad maskalanır, parol heşləri sıfırlanır).",
            "Təhlükəsizlik — bərpa zamanı: etibarsız mənbədən gələn dump-ı icra etmə — o, ixtiyari SQL-dir (istifadəçi yarada, DEFINER-li trigger qura bilər). Nüsxənin bütövlüyünü yoxlama cəmi/imza ilə təsdiqlə.",
          ]},
          { t: "code", lang: "bash", caption: "Şifrələnmiş, yoxlanan gecə nüsxəsi", code: `#!/usr/bin/env bash
set -euo pipefail                      # hər hansı xətada dayan — səssiz uğursuzluq olmasın

TARIX=$(date +%F)
FAYL="magaza_\${TARIX}.sql.gz.age"
ACIQ_ACAR="age1q...xyz"               # yalnız AÇIQ açar; gizli açar bu serverdə YOXDUR

# Parol ~/.my.cnf-dədir (chmod 600), əmr sətrində yox
mysqldump --single-transaction --routines --triggers --events \\
          --source-data=2 magaza \\
  | gzip \\
  | age -r "$ACIQ_ACAR" \\
  > "/tmp/$FAYL"

# Boş və ya şübhəli kiçik fayl — xəta
OLCU=$(stat -c %s "/tmp/$FAYL")
if [ "$OLCU" -lt 1000000 ]; then
  echo "XƏTA: backup çox kiçikdir ($OLCU bayt)" >&2
  exit 1
fi

sha256sum "/tmp/$FAYL" > "/tmp/$FAYL.sha256"

# Başqa məkana; bu hesabın yalnız PutObject hüququ var (silə bilmir), bucket-də Object Lock aktivdir
aws s3 cp "/tmp/$FAYL" "s3://sirket-backup/mysql/$FAYL" --sse aws:kms
aws s3 cp "/tmp/$FAYL.sha256" "s3://sirket-backup/mysql/$FAYL.sha256"

shred -u "/tmp/$FAYL"                  # lokal nüsxəni təhlükəsiz sil
echo "OK $FAYL $OLCU"` },
          { t: "qa", items: [
            ["Məntiqi və fiziki backup fərqi?", "Məntiqi — SQL əmrləri (mysqldump): daşınan, amma yavaş bərpa. Fiziki — məlumat fayllarının surəti (XtraBackup): sürətli, artımlı nüsxə mümkündür."],
            ["--single-transaction nə edir?", "REPEATABLE READ tranzaksiyası açıb InnoDB cədvəllərinin bir andakı uyğun görüntüsünü kilidsiz çıxarır."],
            ["PITR nədir, nə lazımdır?", "Zamanda istənilən nöqtəyə bərpa: son tam nüsxə + o vaxtdan bəri binlog-lar."],
            ["Replika niyə backup-ı əvəz etmir?", "Səhv və ya zərərli dəyişiklik dərhal replikaya da tətbiq olunur. Replika nasazlıqdan qoruyur, insan səhvindən yox."],
            ["RPO və RTO nədir?", "RPO — qəbul edilən məlumat itkisi (vaxtla). RTO — xidmətin bərpasına ayrılan vaxt."],
            ["Backup-ı necə qoruyursan?", "Şifrələmə, qapalı və dəyişməz saxlama, ayrı məkan, minimal hüquqlu hesab, bərpa testi."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Bazanı SQL faylına çıxaran alət?", options: ["mysqldump", "mysqladmin", "EXPLAIN"], answer: 0, why: "mysqldump məntiqi nüsxə yaradır." },
          { t: "quiz", q: "Backup harada saxlanmalıdır?", options: ["Eyni diskdə", "Başqa serverdə/məkanda", "Veb qovluğunda"], answer: 1, why: "Server itəndə nüsxə salamat qalmalıdır." },
          { t: "quiz", q: "Backup-ın işlədiyini necə bilirsən?", options: ["Fayl mövcuddur", "Bərpa edib yoxlayıram", "Ölçüsü böyükdür"], answer: 1, why: "Yalnız uğurlu bərpa sübutdur." },
        ],
      },
    ],
    exercise: {
      task: "«magaza» bazası üçün backup planı yaz (AI yoxlayır — skript + şərhlər). 1) Minimal hüquqlu `backup_user` hesabı yarat (SQL). 2) Prosedur və trigger-lərlə birlikdə, cədvəlləri kilidləmədən sıxılmış nüsxə götürən mysqldump əmri yaz; fayl adında tarix olsun; parol əmr sətrində olmasın. 3) Həmin nüsxədən bərpa əmrini yaz. 4) Şərhdə izah et: bu gün 14:32-də səhvən `DELETE FROM sifarisler` icra olunub — məlumatı necə qaytarırsan (addımlarla)? 5) Şərhdə backup faylının təhlükəsizliyi üçün 3 tədbir yaz.",
      starter: `-- 1) backup hesabı (SQL)\nCREATE USER \n\n# 2) nüsxə (bash)\n\n# 3) bərpa\n\n# 4) PITR addımları\n\n# 5) təhlükəsizlik\n`,
      expect: "CREATE USER 'backup_user'@'konkret host' + GRANT SELECT, SHOW VIEW, TRIGGER, EVENT, LOCK TABLES (RELOAD/PROCESS da olar) — ALL və ya root yox; mysqldump --single-transaction --routines --triggers ... | gzip > magaza_$(date +%F).sql.gz, parol -pParol şəklində yazılmayıb (-p və ya .my.cnf); bərpa gunzip < ... | mysql magaza; PITR: son tam nüsxəni bərpa et + mysqlbinlog --stop-datetime ilə 14:32-dən əvvələ qədər binlog tətbiq et; təhlükəsizlik: şifrələmə, başqa məkanda/qapalı saxlama, giriş məhdudiyyəti / immutable / bərpa testi kimi ən azı 3 tədbir.",
    },
  },
  {
    slug: "senior",
    title: "Senior: replikasiya və miqyaslama",
    intro: "Bir server bir gün çatmayacaq və ya sıradan çıxacaq. Replikasiya məlumatı bir neçə serverdə saxlayır; miqyaslama (scaling) isə artan yükü qaldırmağın yollarıdır.",
    sections: [
      {
        level: "baslangic",
        title: "Replikasiya nədir",
        blocks: [
          { t: "analogy", text: "Müəllim lövhədə yazır, şagirdlər dəftərə köçürür. Yazan yalnız müəllimdir (source), şagirdlər (replica) onun yazdığını təkrarlayır. Sual vermək istəyən istənilən şagirdin dəftərinə baxa bilər — müəllimi narahat etmədən. Müəllim xəstələnsə, ən yaxşı dəftəri olan şagird lövhəyə çıxır." },
          { t: "list", items: [
            "Source (əsas server): bütün yazılar (INSERT, UPDATE, DELETE) bura gəlir.",
            "Replica (surət server): source-un dəyişikliklərini təkrarlayır; oxuma sorğularına cavab verir.",
            "Nəyə lazımdır: oxuma yükünü paylamaq, nasazlıqda əvəzləmək (failover), backup və hesabatları əsas serveri yükləmədən aparmaq.",
          ]},
          { t: "code", lang: "sql", code: `-- Source-da: replikasiya üçün hesab
CREATE USER 'repl'@'10.0.2.%' IDENTIFIED BY '...' REQUIRE SSL;
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'10.0.2.%';

-- Replikada: source-a qoşul (GTID ilə)
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST = '10.0.2.10',
  SOURCE_USER = 'repl',
  SOURCE_PASSWORD = '...',
  SOURCE_AUTO_POSITION = 1,
  SOURCE_SSL = 1;

START REPLICA;

-- Vəziyyət
SHOW REPLICA STATUS\\G
-- Replica_IO_Running: Yes
-- Replica_SQL_Running: Yes
-- Seconds_Behind_Source: 0` },
          { t: "terms", items: [
            ["replikasiya", "bir serverdəki dəyişikliklərin başqa serverlərə avtomatik köçürülməsi."],
            ["binlog (binary log)", "source-da bütün dəyişikliklərin jurnalı; replika onu oxuyur."],
            ["GTID", "hər tranzaksiyanın qlobal unikal nömrəsi — replikanın harada qaldığını dəqiq bilməyə imkan verir."],
            ["replikasiya gecikməsi (lag)", "replikanın source-dan geri qaldığı vaxt."],
            ["failover", "source sıradan çıxanda replikanın onun yerinə keçməsi."],
          ]},
          { t: "tip", text: "MySQL 8.0.22-dən köhnə master/slave terminləri source/replica ilə əvəz olunub. Köhnə məqalələrdə SHOW SLAVE STATUS görsən — eyni şeydir." },
        ],
      },
      {
        level: "orta",
        title: "Oxu/yaz bölgüsü, gecikmə və bağlantı hovuzu",
        blocks: [
          { t: "code", lang: "sql", code: `-- my.cnf (source)
-- [mysqld]
-- server_id = 1
-- log_bin = binlog
-- binlog_format = ROW
-- gtid_mode = ON
-- enforce_gtid_consistency = ON

-- my.cnf (replica)
-- server_id = 2
-- read_only = ON
-- super_read_only = ON            -- adminlər də təsadüfən yaza bilməsin
-- replica_parallel_workers = 8    -- gecikməni azaldır

-- Replikada gecikməni yoxla
SELECT SERVICE_STATE, LAST_ERROR_MESSAGE
FROM performance_schema.replication_applier_status_by_worker;

-- Yarı-sinxron: COMMIT ən azı bir replikanın təsdiqini gözləyir
INSTALL PLUGIN rpl_semi_sync_source SONAME 'semisync_source.so';
SET GLOBAL rpl_semi_sync_source_enabled = 1;` },
          { t: "list", items: [
            "Oxu/yaz bölgüsü (read/write split): yazılar source-a, oxumalar replikalara. Bunu tətbiq (iki bağlantı sətri) və ya proksi (ProxySQL, MySQL Router) edir.",
            "Asinxron replikasiya (default): source replikanı gözləmir — sürətlidir, amma source çöksə son tranzaksiyalar itə bilər.",
            "Yarı-sinxron (semi-sync): ən azı bir replika jurnalı aldığını təsdiqləyir — itki riski azalır, yazma bir az yavaşlayır.",
            "Bağlantı hovuzu (connection pool): hər sorğu üçün yeni bağlantı açmaq bahadır. Hovuz hazır bağlantıları təkrar işlədir. max_connections-u hovuz ölçüləri × tətbiq nüsxələri ilə hesabla.",
            "Vertikal miqyaslama — daha güclü server (sadə, amma həddi var). Horizontal — daha çox server (replikalar, sharding).",
          ]},
          { t: "mistake", lang: "sql", wrong: `-- Tətbiq: profili yenilə (source), dərhal oxu (replika)
UPDATE istifadeciler SET ad = 'Aysel' WHERE id = 7;     -- source
SELECT ad FROM istifadeciler WHERE id = 7;              -- replika: hələ köhnə ad`, right: `-- Yazıdan dərhal sonrakı oxumanı source-dan et
-- (və ya həmin istifadəçini qısa müddət source-a yönləndir)
UPDATE istifadeciler SET ad = 'Aysel' WHERE id = 7;     -- source
SELECT ad FROM istifadeciler WHERE id = 7;              -- source`, why: "Replikasiya asinxrondur: replika millisaniyələr (bəzən saniyələr) geri qalır. İstifadəçi öz dəyişikliyini görməlidir («read your own writes») — kritik oxumaları source-dan et." },
          { t: "mistake", lang: "sql", wrong: `-- binlog_format = STATEMENT
UPDATE kuponlar SET kod = UUID() WHERE id = 5;          -- replikada başqa UUID`, right: `-- binlog_format = ROW
UPDATE kuponlar SET kod = UUID() WHERE id = 5;          -- sətrin hazır dəyəri köçürülür`, why: "STATEMENT rejimində əmr replikada yenidən icra olunur; UUID(), NOW(), RAND() fərqli nəticə verir və məlumat ayrılır. ROW formatı dəyişən sətirlərin özünü köçürür." },
          { t: "mistake", lang: "sql", wrong: `-- Replika yaza bilir: kimsə səhvən ona UPDATE göndərir
-- read_only = OFF`, right: `SET GLOBAL super_read_only = ON;`, why: "Replikaya birbaşa yazı onu source-dan ayırır və replikasiya sınır. Replikalar həmişə super_read_only olsun." },
        ],
      },
      {
        level: "senior",
        title: "Yüksək əlçatanlıq, sharding və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Miqyaslama sırası: əvvəl sorğu və indeksləri düzəlt → keş (Redis) → vertikal → oxu replikaları → funksional bölgü (hər xidmətə öz bazası) → cədvəl partition-u → sharding. Sharding ən sondadır — mürəkkəbliyi çox bahadır.",
            "Yüksək əlçatanlıq (HA): InnoDB Cluster (Group Replication + MySQL Router + Shell) avtomatik failover verir. Alternativlər: Orchestrator, Percona XtraDB Cluster (Galera), bulud xidmətləri (RDS Multi-AZ, Aurora).",
            "Split-brain: şəbəkə bölünəndə iki server özünü source sayıb yazı qəbul edir — məlumat ayrılır. Həlli kvorum (səs çoxluğu, tək sayda node) və köhnə source-un təcridi (fencing).",
            "Failover-dan sonra asinxron replikada son tranzaksiyalar itmiş ola bilər. Tətbiq idempotent olmalı və bağlantı xətasında təkrar cəhd etməlidir (qısa TTL-li DNS və ya proksi).",
            "Gecikmənin səbəbləri: tək axınlı tətbiq (replica_parallel_workers artır), böyük tranzaksiya (milyon sətirlik DELETE — hissələrə böl), PK-sız cədvəl (ROW formatında hər sətir üçün tam skan), zəif replika diski.",
            "Partition (bölmə): bir cədvəli tarixə/aralığa görə fiziki hissələrə bölür — köhnə məlumatı DROP PARTITION ilə ani silmək olur. Sorğu bölmə açarını ehtiva etməlidir (partition pruning). Partition bir serverdədir — sharding deyil.",
            "Sharding: məlumat açara (məs. musteri_id) görə bir neçə müstəqil bazaya paylanır. Qiyməti: shard-lararası JOIN və tranzaksiya yoxdur, yenidən balanslaşdırma çətindir, isti shard problemi. Hazır həll: Vitess, PlanetScale, TiDB.",
            "Shard açarını düzgün seç: sorğuların çoxu bir shard-a düşsün, paylanma bərabər olsun. Qlobal unikal id üçün AUTO_INCREMENT yaramır — UUID v7 / Snowflake tipli id.",
            "Böyük cədvəldə sxem dəyişikliyi: online DDL (ALGORITHM=INSTANT/INPLACE), gh-ost. Replikada gecikmə yaradır — yükü izlə.",
            "Monitorinq: gecikmə, bağlantı sayı, yavaş sorğular, InnoDB bufer hovuzunun dolması, disk, deadlock sayı (Prometheus mysqld_exporter, PMM).",
            "Təhlükəsizlik — replikasiya kanalı: binlog axını bütün məlumatı açıq mətnlə daşıyır. SOURCE_SSL = 1 + REQUIRE SSL ilə şifrələ; replikasiya hesabının yalnız REPLICATION SLAVE hüququ və konkret şəbəkə ünvanı olsun. 3306 portu internetə açıq olmasın — yalnız daxili şəbəkə/VPN.",
            "Təhlükəsizlik — replika da production-dur: «yalnız hesabat üçündür» deyə zəif qorunan replika eyni şəxsi məlumatı saxlayır. Eyni giriş nəzarəti, şifrələmə (TLS, diskdə şifrələmə — TDE) və audit tətbiq olunsun.",
            "Təhlükəsizlik — yayılan zərər: səhv və ya zərərli DROP/UPDATE saniyələr içində bütün replikalara çatır. Replikasiya bundan qorumur — backup + PITR və gecikdirilmiş replika (SOURCE_DELAY = 3600) lazımdır.",
            "Təhlükəsizlik — çoxkirayəçili sharding: shard seçimi və ya tenant_id filtri istifadəçi girişinə əsaslanırsa, bir müştəri başqasının məlumatına çata bilər. Kirayəçini tokendən (serverdə) təyin et, hər sorğuda tenant filtri məcburi olsun.",
            "Təhlükəsizlik — bağlantı tükənməsi (DoS): limitsiz bağlantı açan tətbiq və ya hücum max_connections-u doldurur və hamı «Too many connections» alır. Hovuz ölçüsünü məhdudlaşdır, hesab başına MAX_USER_CONNECTIONS qoy, admin üçün ayrıca bağlantı saxla (admin_address).",
            "Təhlükəsizlik — sirlər və binlog: binlog-da parol dəyişmə əmrləri və həssas məlumat ola bilər. Binlog fayllarını şifrələ (binlog_encryption = ON), saxlama müddətini məhdudlaşdır (binlog_expire_logs_seconds), bağlantı parollarını sirr menecerində saxla və dövri dəyiş.",
          ]},
          { t: "code", lang: "sql", caption: "Partition, gecikdirilmiş replika və bağlantı limitləri", code: `-- Tarixə görə bölmə: köhnə ayları ani silmək olur
CREATE TABLE hadiseler (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  istifadeci_id INT NOT NULL,
  nov VARCHAR(30) NOT NULL,
  yaradilib DATETIME NOT NULL,
  PRIMARY KEY (id, yaradilib),              -- bölmə açarı PK-nın hissəsi olmalıdır
  INDEX idx_hadiseler_istifadeci (istifadeci_id, yaradilib)
)
PARTITION BY RANGE (TO_DAYS(yaradilib)) (
  PARTITION p2026_10 VALUES LESS THAN (TO_DAYS('2026-11-01')),
  PARTITION p2026_11 VALUES LESS THAN (TO_DAYS('2026-12-01')),
  PARTITION p_gelecek VALUES LESS THAN MAXVALUE
);

ALTER TABLE hadiseler DROP PARTITION p2026_10;      -- milyonlarla sətir, ani

-- Böyük silməni hissələrlə: replikada gecikmə yaratmasın
DELETE FROM sessiyalar WHERE bitme < NOW() LIMIT 5000;   -- 0 sətir qalana qədər təkrarla

-- İnsan səhvinə qarşı: 1 saat geridə gedən replika
STOP REPLICA;
CHANGE REPLICATION SOURCE TO SOURCE_DELAY = 3600;
START REPLICA;

-- Tətbiq hesabı bütün bağlantıları tuta bilməsin
ALTER USER 'magaza_app'@'10.0.1.%' WITH MAX_USER_CONNECTIONS 200;

-- Oxu hesabı replikada: yalnız SELECT, şifrəli bağlantı məcburi
CREATE USER 'magaza_oxu'@'10.0.1.%' IDENTIFIED BY '...' REQUIRE SSL;
GRANT SELECT ON magaza.* TO 'magaza_oxu'@'10.0.1.%';` },
          { t: "qa", items: [
            ["MySQL replikasiyası necə işləyir?", "Source dəyişiklikləri binlog-a yazır. Replikanın IO axını onu relay log-a köçürür, SQL (applier) axınları isə tətbiq edir."],
            ["Asinxron və yarı-sinxron fərqi?", "Asinxronda source replikanı gözləmir (itki mümkündür). Yarı-sinxronda COMMIT ən azı bir replikanın qəbul təsdiqini gözləyir."],
            ["Replikasiya gecikməsi niyə problemdir, necə həll olunur?", "Replikadan köhnə məlumat oxunur. Kritik oxumaları source-a yönləndir, paralel tətbiqi aç, böyük tranzaksiyaları böl, gecikməni izlə."],
            ["Partition ilə sharding fərqi?", "Partition bir cədvəli bir server daxilində hissələrə bölür. Sharding məlumatı bir neçə müstəqil serverə paylayır."],
            ["Split-brain nədir?", "İki node-un eyni vaxtda özünü əsas sayıb yazı qəbul etməsi. Kvorum və fencing ilə qarşısı alınır."],
            ["Miqyaslamaya nədən başlayırsan?", "Ölçmədən: yavaş sorğular, indekslər, keş. Sonra vertikal, oxu replikaları; sharding ən son addımdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yazı sorğuları hara göndərilir?", options: ["Source-a", "İstənilən replikaya", "Hamısına eyni vaxtda"], answer: 0, why: "Yazılar yalnız source-da olur, replikalar təkrarlayır." },
          { t: "quiz", q: "Replika source-un dəyişikliklərini haradan oxuyur?", options: ["Slow log", "Binlog", "EXPLAIN"], answer: 1, why: "Binar jurnal bütün dəyişiklikləri saxlayır." },
          { t: "quiz", q: "Replikasiya backup-ı əvəz edirmi?", options: ["Bəli", "Xeyr — səhv DELETE replikaya da çatır", "Yalnız GTID ilə"], answer: 1, why: "Replika nasazlıqdan qoruyur, səhv dəyişiklikdən yox." },
        ],
      },
    ],
    exercise: {
      task: "Onlayn mağaza üçün baza arxitekturası planla (AI yoxlayır — SQL + şərhlər). Vəziyyət: sorğuların 90%-i oxumadır, sayt yavaşlayıb, bir serverdir. 1) Şərhdə miqyaslama addımlarını düzgün SIRA ilə yaz (ən ucuzdan ən bahaya) və hər birini bir cümlə ilə əsaslandır. 2) Replikasiya hesabı yarat: minimal hüquq, konkret şəbəkə, şifrəli bağlantı məcburi. 3) Replikanı source-a GTID ilə qoşan əmrləri yaz və vəziyyəti yoxla. 4) Replikanı yazıdan qoruyan parametri yaz. 5) Şərhdə: istifadəçi profilini yeniləyib dərhal köhnə adı görür — səbəb nədir və necə həll edirsən? 6) `sessiyalar` cədvəlindən 10 milyon köhnə sətri replikada gecikmə yaratmadan necə silərsən?",
      starter: `-- 1) miqyaslama sırası\n\n-- 2) replikasiya hesabı\nCREATE USER \n\n-- 3) replikanı qoş\n\n-- 4) yazıdan qoru\n\n-- 5) köhnə məlumat problemi\n\n-- 6) böyük silmə\n`,
      expect: "Sıra: sorğu/indeks optimizasiyası → keş → vertikal → oxu replikaları → (partition) → sharding ən sonda, əsaslandırma ilə; CREATE USER 'repl'@'konkret şəbəkə' ... REQUIRE SSL + GRANT REPLICATION SLAVE ON *.* (ALL yox, '%' yox); CHANGE REPLICATION SOURCE TO ... SOURCE_AUTO_POSITION = 1 (SSL ilə), START REPLICA, SHOW REPLICA STATUS; super_read_only = ON (və ya read_only); 5-də replikasiya gecikməsi izah olunub və həll: yazıdan sonrakı oxumanı source-dan et; 6-da DELETE ... LIMIT ilə hissə-hissə (dövrlə) və ya partition DROP — tək böyük DELETE yox.",
    },
  },
];
