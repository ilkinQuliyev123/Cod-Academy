import type { TrackId } from "./types";

export type StageId = "junior" | "middle" | "senior";

export interface Stage {
  id: StageId;
  title: string;
  goal: string;
  /** Bu mərhələdən sonra bacaracaqların */
  skills: string[];
  /** Ardıcıl öyrənmə addımları: dil + mövzular (languages.ts slug-ları) */
  steps: { lang: string; topics: string[]; optional?: boolean }[];
  projects: { title: string; desc: string }[];
  exam: { lang: string; task: string; starter: string; expect: string };
}

export const examId = (track: TrackId, stage: StageId) => `${track}-${stage}`;

export const CAREER: Record<TrackId, Stage[]> = {
  frontend: [
    {
      id: "junior",
      title: "Junior Front-end",
      goal: "Statik və sadə interaktiv saytları sıfırdan, təmiz kodla qurmaq.",
      skills: ["Semantik HTML", "Responsive CSS (Flexbox, Grid)", "JavaScript əsasları və DOM", "Formalar və hadisələr"],
      steps: [
        { lang: "html", topics: ["giris", "teqler", "struktur", "metn", "linkler", "sekiller", "siyahilar", "cedveller", "formalar", "semantik"] },
        { lang: "css", topics: ["giris", "selektorlar", "kaskad", "box-model", "vahidler", "renger", "tipografiya", "display", "position", "flexbox", "grid", "responsive"] },
        { lang: "javascript", topics: ["giris", "deyisenler", "tipler", "operatorlar", "sertler", "dovrler", "funksiyalar", "massivler", "obyektler", "dom", "hadiseler"] },
      ],
      projects: [
        { title: "Şəxsi portfolio", desc: "Semantik HTML + responsive CSS: haqqımda, layihələr, əlaqə forması." },
        { title: "To-do siyahısı", desc: "Əlavə et, sil, tamamlandı işarəsi; localStorage-də saxla." },
        { title: "Kafe landing səhifəsi", desc: "Grid ilə menyu, mobil naviqasiya, hover effektləri." },
      ],
      exam: {
        lang: "javascript",
        task: "tapsiriqlar massivi verilib. Elə funksiya yaz ki, yalnız tamamlanmamış tapşırıqların adlarını böyük hərflə qaytarsın və neçə dənə olduğunu konsola çıxarsın.",
        starter: `const tapsiriqlar = [\n  { ad: "Alış-veriş", tamam: false },\n  { ad: "İdman", tamam: true },\n  { ad: "Kitab oxu", tamam: false },\n];\n\nfunction qalanlar(list) {\n  // kodun\n}\n\nconsole.log(qalanlar(tapsiriqlar));\n`,
        expect: "filter(!tamam) + map(toUpperCase) istifadəsi (və ya dövr), ['ALIŞ-VERİŞ','KİTAB OXU'] qaytarır, sayı (2) konsola çıxır. Funksiya giriş massivini dəyişmir.",
      },
    },
    {
      id: "middle",
      title: "Middle Front-end",
      goal: "API ilə işləyən, komponentli, tipli tətbiqləri müstəqil qurmaq.",
      skills: ["Asinxron JS və API", "TypeScript", "React və state idarəsi", "Tailwind ilə dizayn sistemi"],
      steps: [
        { lang: "javascript", topics: ["scope", "this", "asinxron", "fetch", "xetalar", "modullar", "sinifler", "prototip"] },
        { lang: "typescript", topics: ["giris", "esas-tipler", "funksiya-tipleri", "interface-type", "union", "narrowing", "generics", "sinifler", "utility", "enum", "modullar"] },
        { lang: "react", topics: ["giris", "jsx", "komponentler", "props", "state", "hadiseler", "sert-render", "siyahilar", "formalar", "useeffect", "hooks", "context", "custom-hook", "reducer"] },
        { lang: "tailwind", topics: ["giris", "qurulus", "spacing", "renger", "flex-grid", "responsive", "veziyyetler", "dark", "tema", "komponent"] },
        { lang: "css", topics: ["deyisenler", "kecid-animasiya", "psevdo", "arxitektura"] },
      ],
      projects: [
        { title: "Hava proqnozu tətbiqi", desc: "Açıq API, yüklənmə/xəta halları, axtarış, son axtarışlar." },
        { title: "Onlayn mağaza səbəti", desc: "React + TypeScript: məhsullar, filtr, səbət (useReducer), ümumi qiymət." },
        { title: "Admin dashboard", desc: "Tailwind, dark mode, cədvəl, səhifələmə, formalar və validasiya." },
      ],
      exam: {
        lang: "typescript",
        task: "Generic qrupla<T, K> funksiyası yaz: massivi və açar seçən funksiyanı qəbul edib Record<K, T[]> qaytarsın. Məhsulları kateqoriyaya görə qrupla və nəticəni çıxar.",
        starter: `interface Mehsul { ad: string; kateqoriya: string; qiymet: number }\n\nconst mehsullar: Mehsul[] = [\n  { ad: "Alma", kateqoriya: "meyvə", qiymet: 2 },\n  { ad: "Kök", kateqoriya: "tərəvəz", qiymet: 1 },\n  { ad: "Armud", kateqoriya: "meyvə", qiymet: 3 },\n];\n\n// function qrupla<T, K extends string>(...)\n\nconsole.log(qrupla(mehsullar, (m) => m.kateqoriya));\n`,
        expect: "Generic imza (T, K extends PropertyKey/string), açar funksiyası parametri, Record<K, T[]> qaytarır, reduce və ya dövr ilə düzgün qruplayır, any yoxdur.",
      },
    },
    {
      id: "senior",
      title: "Senior Front-end",
      goal: "Böyük, sürətli, əlçatan sistemlər dizayn etmək və komandaya istiqamət vermək.",
      skills: ["Next.js və rendering strategiyaları", "Performans və Web Vitals", "Arxitektura və pattern-lər", "Əlçatanlıq və keyfiyyət"],
      steps: [
        { lang: "javascript", topics: ["event-loop", "yaddas", "pattern"] },
        { lang: "typescript", topics: ["kecid", "senior"] },
        { lang: "react", topics: ["performans", "arxitektura"] },
        { lang: "nextjs", topics: ["giris", "app-router", "layout", "link", "server-client", "data", "dinamik", "route-handler", "server-actions", "kesh", "metadata", "sekil-font", "auth", "deploy", "senior"] },
        { lang: "html", topics: ["meta", "elcatanliq", "validasiya", "dom", "performans", "best-practice"] },
        { lang: "css", topics: ["performans"] },
        { lang: "tailwind", topics: ["animasiya", "senior"] },
      ],
      projects: [
        { title: "Full-stack Next.js tətbiqi", desc: "Autentifikasiya, server actions, keşləmə, SEO, deploy." },
        { title: "Komponent kitabxanası", desc: "Dizayn sistemi, əlçatanlıq (a11y), sənədləşmə, testlər." },
        { title: "Performans auditi", desc: "Real saytın Lighthouse balını ölç, darboğazları tap, 90+ et." },
      ],
      exam: {
        lang: "typescript",
        task: "Tipli memoAsync funksiyası yaz: asinxron funksiyanı qəbul edib nəticəni TTL (ms) müddətinə keşləsin; eyni arqumentlə paralel çağırışlarda funksiya yalnız 1 dəfə işləsin (eyni Promise paylaşılsın), xəta olanda keşdən silinsin.",
        starter: `function memoAsync<A extends unknown[], R>(fn: (...a: A) => Promise<R>, ttl: number) {\n  // kodun\n}\n\nlet say = 0;\nconst yukle = memoAsync(async (id: number) => { say++; return { id }; }, 1000);\n\nawait Promise.all([yukle(1), yukle(1), yukle(2)]);\nconsole.log("çağırış sayı:", say); // 2 olmalıdır\n`,
        expect: "Map ilə açar (JSON.stringify(args)), Promise-in özünü keşləmək (in-flight dedup), TTL yoxlaması, catch-də keşdən silmə, düzgün generic tiplər; nəticə 'çağırış sayı: 2'.",
      },
    },
  ],
  backend: [
    {
      id: "junior",
      title: "Junior Back-end",
      goal: "Proqramlaşdırma məntiqini, OOP-u və verilənlər bazası sorğularını mənimsəmək.",
      skills: ["C# əsasları və OOP", "SQL sorğuları", "Python əsasları", "Alqoritmik düşüncə"],
      steps: [
        { lang: "csharp", topics: ["giris", "deyisenler", "operatorlar", "sertler", "dovrler", "metodlar", "massiv-kolleksiya", "sinifler", "oop"] },
        { lang: "sql", topics: ["giris", "select", "where", "order", "aqreqat", "group", "join", "insert-update", "cedvel"] },
        { lang: "python", topics: ["giris", "deyisenler", "operatorlar", "string", "sertler", "dovrler", "list-tuple", "dict-set", "funksiyalar"] },
      ],
      projects: [
        { title: "Bank hesabı (konsol)", desc: "C# OOP: hesab aç, pul köçür, tarixçə; istisnaların idarəsi." },
        { title: "Tələbə bazası", desc: "SQL: cədvəllər, əlaqələr, hesabat sorğuları (orta bal, ən yaxşılar)." },
        { title: "Fayl təşkilatçısı", desc: "Python skripti: qovluqdakı faylları növünə görə ayırır." },
      ],
      exam: {
        lang: "sql",
        task: "Hər kurs üçün kursun adını, qeydiyyatdan keçən tələbə sayını və orta balı (tam ədəd) çıxar. Yalnız orta balı 80-dən yuxarı olan kursları göstər, orta bala görə azalan sıra ilə.",
        starter: `-- Cədvəllər: telebeler(id, ad, soyad, yas, seher), kurslar(id, ad, saat), qeydiyyat(telebe_id, kurs_id, bal)\n\n`,
        expect: "JOIN kurslar və qeydiyyat, GROUP BY kurs, COUNT, ROUND/CAST(AVG(bal)), HAVING AVG(bal) > 80, ORDER BY ... DESC. Gözlənilən sıra: SQL (2 tələbə, 92), JavaScript (2, ~90), HTML (2, ~87); C# (66) görünməməlidir.",
      },
    },
    {
      id: "middle",
      title: "Middle Back-end",
      goal: "Real REST API-lər, verilənlər bazası və autentifikasiya ilə istehsala hazır servislər qurmaq.",
      skills: ["ASP.NET Core Web API + EF Core", "Nest.js", "SQL dizaynı və tranzaksiyalar", "Asinxron proqramlaşdırma"],
      steps: [
        { lang: "csharp", topics: ["interface", "xetalar", "generics", "linq", "delegate", "async"] },
        { lang: "aspnet", topics: ["giris", "layihe", "middleware", "routing", "controller", "minimal-api", "di", "model-binding", "mvc", "ef-core", "migration", "auth", "konfiq", "xetalar"] },
        { lang: "sql", topics: ["acarlar", "alt-sorgu", "normallasdirma", "index", "tranzaksiya"] },
        { lang: "mysql", topics: ["giris", "tipler", "istifadeci", "engine", "funksiyalar", "view", "procedure", "trigger"] },
        { lang: "nestjs", topics: ["giris", "cli", "modul", "controller", "provider", "di", "dto", "pipe", "guard", "interceptor", "xetalar", "db", "konfiq", "test"] },
        { lang: "python", topics: ["comprehension", "fayllar", "xetalar", "modullar", "oop", "dekorator", "async", "fastapi"] },
        { lang: "cpp", topics: ["giris", "deyisenler", "giris-cixis", "sertler", "dovrler", "funksiyalar", "massivler", "pointer", "yaddas", "sinifler", "oop", "stl"], optional: true },
      ],
      projects: [
        { title: "Kitabxana REST API", desc: "ASP.NET Core + EF Core + SQL Server: CRUD, JWT, validasiya, Swagger." },
        { title: "Blog API", desc: "Nest.js + Prisma: istifadəçilər, postlar, şərhlər, rol əsaslı icazə." },
        { title: "Qısa link servisi", desc: "FastAPI + MySQL: link qısaltma, klik statistikası, rate limit." },
      ],
      exam: {
        lang: "python",
        task: "Anbar sinfi yaz: elave(ad, say), cixar(ad, say) — kifayət qədər yoxdursa ValueError atsın — və hesabat() — məhsulları say-a görə azalan sıra ilə siyahı kimi qaytarsın. Nümunə ssenarini işə sal.",
        starter: `class Anbar:\n    pass  # kodun\n\nanbar = Anbar()\nanbar.elave("alma", 10)\nanbar.elave("armud", 4)\nanbar.cixar("alma", 3)\nprint(anbar.hesabat())\n\ntry:\n    anbar.cixar("armud", 99)\nexcept ValueError as e:\n    print("Xəta:", e)\n`,
        expect: "__init__ ilə dict, elave toplayır, cixar yoxlayır və ValueError atır (Azərbaycanca mesaj), hesabat sorted(..., key, reverse=True); çıxış [('alma', 7), ('armud', 4)] və xəta mesajı.",
      },
    },
    {
      id: "senior",
      title: "Senior Back-end",
      goal: "Yüksək yüklü, təhlükəsiz, miqyaslanan sistemlər dizayn etmək və texniki qərar vermək.",
      skills: ["Clean Architecture və SOLID", "Sorğu optimizasiyası və miqyaslama", "Mikroservislər", "Yaddaş və performans (C#, C++)"],
      steps: [
        { lang: "csharp", topics: ["yaddas", "solid"] },
        { lang: "aspnet", topics: ["senior", "performans"] },
        { lang: "sql", topics: ["window", "optimizasiya"] },
        { lang: "mysql", topics: ["index", "backup", "senior"] },
        { lang: "nestjs", topics: ["senior"] },
        { lang: "python", topics: ["senior"] },
        { lang: "cpp", topics: ["sablonlar", "smart-pointer", "move", "senior"], optional: true },
      ],
      projects: [
        { title: "Sifariş sistemi (mikroservislər)", desc: "Sifariş, ödəniş, bildiriş servisləri; mesaj növbəsi, idempotentlik." },
        { title: "Yük altında optimizasiya", desc: "Yavaş API-ni profil et: indekslər, keş (Redis), N+1 problemini həll et." },
        { title: "Sistem dizaynı sənədi", desc: "1 milyon istifadəçili tətbiqin arxitekturası: diaqram, trade-off-lar." },
      ],
      exam: {
        lang: "sql",
        task: "Window funksiyaları ilə: hər tələbənin hər kurs üzrə balını, həmin kurs daxilində yerini (RANK) və kursun orta balından fərqini göstər. Kurs adı və yerə görə sırala.",
        starter: `-- Cədvəllər: telebeler, kurslar, qeydiyyat\n\n`,
        expect: "JOIN-lər, RANK() OVER (PARTITION BY kurs ORDER BY bal DESC), AVG(bal) OVER (PARTITION BY kurs) ilə fərq, ORDER BY kurs, yer. GROUP BY istifadə olunmamalıdır.",
      },
    },
  ],
};

export const getExam = (id: string) => {
  for (const track of ["frontend", "backend"] as const)
    for (const s of CAREER[track]) if (examId(track, s.id) === id) return { track, stage: s };
  return undefined;
};
