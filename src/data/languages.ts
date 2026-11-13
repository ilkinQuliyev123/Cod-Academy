import type { Language, TrackId, Topic } from "./types";

/** "slug|Başlıq" sətirlərindən mövzu siyahısı */
const T = (...rows: string[]): Topic[] =>
  rows.map((r) => {
    const [slug, title] = r.split("|");
    return { slug, title };
  });

export const LANGUAGES: Language[] = [
  // ───────────── FRONT END ─────────────
  {
    id: "html", name: "HTML", short: "HTML", track: "frontend", editor: "html", runnable: "web",
    desc: "Veb səhifənin skeleti: məzmun və struktur.",
    topics: T(
      "giris|HTML nədir? İlk səhifə", "teqler|Teqlər, elementlər və atributlar", "struktur|Sənəd strukturu: html, head, body",
      "metn|Mətn teqləri: başlıq, paraqraf, vurğu", "linkler|Linklər və naviqasiya", "sekiller|Şəkillər və media",
      "siyahilar|Siyahılar", "cedveller|Cədvəllər", "formalar|Formalar və input-lar", "semantik|Semantik HTML",
      "meta|Meta teqlər və SEO", "elcatanliq|Əlçatanlıq (a11y) və ARIA", "validasiya|Forma validasiyası",
      "dom|DOM ağacı necə qurulur", "performans|Render, yükləmə və performans", "best-practice|Senior: arxitektura və best practice",
    ),
  },
  {
    id: "css", name: "CSS", short: "CSS", track: "frontend", editor: "css", runnable: "web",
    desc: "Görünüş: rənglər, ölçülər, düzülüş və animasiya.",
    topics: T(
      "giris|CSS nədir? Qoşulma yolları", "selektorlar|Selektorlar", "kaskad|Kaskad, irsiyyət və spesifiklik",
      "box-model|Box model", "vahidler|Ölçü vahidləri", "renger|Rənglər və fon", "tipografiya|Tipografiya",
      "display|Display və axın", "position|Position", "flexbox|Flexbox", "grid|CSS Grid", "responsive|Responsive dizayn və media query",
      "deyisenler|CSS dəyişənləri", "kecid-animasiya|Transition və animasiya", "psevdo|Psevdo-klass və psevdo-elementlər",
      "arxitektura|BEM və CSS arxitekturası", "performans|Senior: render pipeline və performans",
    ),
  },
  {
    id: "tailwind", name: "Tailwind CSS", short: "TW", track: "frontend", editor: "html", runnable: "none",
    desc: "Utility-first CSS: klasslarla sürətli dizayn.",
    topics: T(
      "giris|Tailwind nədir? Utility-first fəlsəfəsi", "qurulus|Quraşdırma və konfiqurasiya", "spacing|Spacing və ölçülər",
      "renger|Rənglər və tipografiya", "flex-grid|Flex və Grid ilə düzülüş", "responsive|Responsive prefikslər",
      "veziyyetler|Hover, focus və digər hallar", "dark|Dark mode", "tema|@theme ilə öz dizayn sistemin",
      "komponent|Komponentləşdirmə və təkrarın qarşısı", "animasiya|Animasiyalar", "senior|Senior: böyük layihədə Tailwind",
    ),
  },
  {
    id: "javascript", name: "JavaScript", short: "JS", track: "frontend", editor: "javascript", runnable: "js",
    desc: "Veb-in proqramlaşdırma dili: məntiq və interaktivlik.",
    topics: T(
      "giris|JavaScript nədir? İlk kod", "deyisenler|Dəyişənlər: let, const, var", "tipler|Məlumat tipləri",
      "operatorlar|Operatorlar", "sertler|Şərtlər: if, else, switch", "dovrler|Dövrlər", "funksiyalar|Funksiyalar",
      "massivler|Massivlər və metodları", "obyektler|Obyektlər", "scope|Scope və closure", "this|this açar sözü",
      "dom|DOM ilə işləmək", "hadiseler|Hadisələr (events)", "asinxron|Asinxron JS: callback, Promise, async/await",
      "fetch|Fetch və API", "xetalar|Xətaların idarəsi", "modullar|Modullar", "sinifler|Siniflər və OOP",
      "prototip|Prototiplər", "event-loop|Senior: Event loop", "yaddas|Senior: yaddaş və performans", "pattern|Senior: dizayn pattern-ləri",
    ),
  },
  {
    id: "typescript", name: "TypeScript", short: "TS", track: "frontend", editor: "typescript", runnable: "ts",
    desc: "Tipləri olan JavaScript: səhvləri kod işləmədən tutur.",
    topics: T(
      "giris|TypeScript nədir?", "esas-tipler|Əsas tiplər", "funksiya-tipleri|Funksiya tipləri", "interface-type|Interface və type",
      "union|Union və intersection", "narrowing|Narrowing (tipin daraldılması)", "generics|Generics", "sinifler|Siniflər",
      "utility|Utility tiplər", "enum|Enum və literal tiplər", "modullar|Modullar və tsconfig",
      "kecid|Senior: conditional və mapped tiplər", "senior|Senior: tip təhlükəsiz arxitektura",
    ),
  },
  {
    id: "react", name: "React", short: "⚛", track: "frontend", editor: "javascript", runnable: "none",
    desc: "Komponentlərlə interfeys qurmaq üçün kitabxana.",
    topics: T(
      "giris|React nədir?", "jsx|JSX", "komponentler|Komponentlər", "props|Props", "state|useState", "hadiseler|Hadisələr",
      "sert-render|Şərti render", "siyahilar|Siyahılar və key", "formalar|Formalar", "useeffect|useEffect",
      "hooks|Digər hook-lar: useRef, useMemo, useCallback", "context|Context", "custom-hook|Öz hook-larını yazmaq",
      "reducer|useReducer və state idarəsi", "performans|Senior: render və performans", "arxitektura|Senior: arxitektura və pattern-lər",
    ),
  },
  {
    id: "nextjs", name: "Next.js", short: "N", track: "frontend", editor: "typescript", runnable: "none",
    desc: "React üzərində full-stack framework.",
    topics: T(
      "giris|Next.js nədir?", "app-router|App Router və fayl-marşrutlama", "layout|Layout və səhifələr", "link|Link və naviqasiya",
      "server-client|Server və Client komponentlər", "data|Məlumat çəkmə", "dinamik|Dinamik marşrutlar", "route-handler|Route Handler (API)",
      "server-actions|Server Actions", "kesh|Keşləmə və revalidasiya", "metadata|Metadata və SEO", "sekil-font|Şəkil və font optimizasiyası",
      "auth|Autentifikasiya", "deploy|Deploy", "senior|Senior: rendering strategiyaları",
    ),
  },

  // ───────────── BACK END ─────────────
  {
    id: "csharp", name: "C#", short: "C#", track: "backend", editor: "csharp", runnable: "none",
    desc: "Microsoft-un güclü, tipli OOP dili.",
    topics: T(
      "giris|C# və .NET nədir? İlk proqram", "deyisenler|Dəyişənlər və tiplər", "operatorlar|Operatorlar", "sertler|Şərtlər",
      "dovrler|Dövrlər", "metodlar|Metodlar", "massiv-kolleksiya|Massivlər və kolleksiyalar", "sinifler|Siniflər və obyektlər",
      "oop|OOP: inkapsulyasiya, irsiyyət, polimorfizm", "interface|Interface və abstrakt siniflər", "xetalar|İstisnalar (exceptions)",
      "generics|Generics", "linq|LINQ", "delegate|Delegate, lambda, event", "async|async/await və Task",
      "yaddas|Senior: yaddaş, GC, struct vs class", "solid|Senior: SOLID və dizayn pattern-ləri",
    ),
  },
  {
    id: "cpp", name: "C++", short: "C++", track: "backend", editor: "cpp", runnable: "none",
    desc: "Sürət və yaddaşa tam nəzarət dili.",
    topics: T(
      "giris|C++ nədir? İlk proqram", "deyisenler|Dəyişənlər və tiplər", "giris-cixis|Giriş və çıxış (iostream)", "sertler|Şərtlər",
      "dovrler|Dövrlər", "funksiyalar|Funksiyalar", "massivler|Massivlər və string", "pointer|Pointer və referans",
      "yaddas|Dinamik yaddaş: new/delete", "sinifler|Siniflər və obyektlər", "oop|İrsiyyət və polimorfizm", "stl|STL: vector, map, alqoritmlər",
      "sablonlar|Şablonlar (templates)", "smart-pointer|Smart pointer-lər və RAII", "move|Senior: move semantikası",
      "senior|Senior: performans və müasir C++",
    ),
  },
  {
    id: "aspnet", name: "ASP.NET Core", short: ".NET", track: "backend", editor: "csharp", runnable: "none",
    desc: "C# ilə veb API və MVC tətbiqləri.",
    topics: T(
      "giris|ASP.NET Core nədir?", "layihe|Layihə strukturu və Program.cs", "middleware|Middleware pipeline", "routing|Routing",
      "controller|Controller və action", "minimal-api|Minimal API", "di|Dependency Injection", "model-binding|Model binding və validasiya",
      "mvc|MVC və Razor Views", "ef-core|Entity Framework Core", "migration|Migration-lar", "auth|Autentifikasiya: JWT və Identity",
      "konfiq|Konfiqurasiya və mühitlər", "xetalar|Xəta idarəsi və logging", "senior|Senior: Clean Architecture", "performans|Senior: performans və keşləmə",
    ),
  },
  {
    id: "nestjs", name: "Nest.js", short: "Nest", track: "backend", editor: "typescript", runnable: "none",
    desc: "TypeScript ilə strukturlu Node.js back-end.",
    topics: T(
      "giris|Nest.js nədir? (Node.js əsasları ilə)", "cli|CLI və layihə strukturu", "modul|Modullar", "controller|Controller-lər",
      "provider|Provider və servislər", "di|Dependency Injection", "dto|DTO və validasiya", "pipe|Pipe-lar", "guard|Guard və autentifikasiya",
      "interceptor|Interceptor və middleware", "xetalar|Exception filter-lər", "db|TypeORM / Prisma ilə verilənlər bazası",
      "konfiq|Konfiqurasiya", "test|Testləmə", "senior|Senior: mikroservislər və arxitektura",
    ),
  },
  {
    id: "sql", name: "SQL", short: "SQL", track: "backend", editor: "sql", runnable: "sql",
    desc: "Verilənlər bazası ilə danışmaq dili.",
    topics: T(
      "giris|SQL və verilənlər bazası nədir?", "select|SELECT", "where|WHERE və filtrləmə", "order|ORDER BY və LIMIT",
      "aqreqat|Aqreqat funksiyalar", "group|GROUP BY və HAVING", "join|JOIN-lər", "insert-update|INSERT, UPDATE, DELETE",
      "cedvel|CREATE TABLE və tiplər", "acarlar|Primary və foreign key", "alt-sorgu|Alt sorğular", "normallasdirma|Normallaşdırma",
      "index|İndekslər", "tranzaksiya|Tranzaksiyalar və ACID", "window|Senior: window funksiyaları", "optimizasiya|Senior: sorğu optimizasiyası",
    ),
  },
  {
    id: "mysql", name: "MySQL", short: "My", track: "backend", editor: "sql", runnable: "sql",
    desc: "Ən populyar açıq mənbəli verilənlər bazası.",
    topics: T(
      "giris|MySQL nədir? Quraşdırma", "tipler|MySQL məlumat tipləri", "istifadeci|İstifadəçilər və icazələr", "engine|InnoDB və storage engine",
      "funksiyalar|MySQL funksiyaları", "view|View-lar", "procedure|Stored procedure və funksiyalar", "trigger|Trigger-lər",
      "index|İndekslər və EXPLAIN", "backup|Backup və bərpa", "senior|Senior: replikasiya və miqyaslama",
    ),
  },
  {
    id: "python", name: "Python", short: "Py", track: "backend", editor: "python", runnable: "python",
    desc: "Sadə sintaksisli, çox yönlü dil.",
    topics: T(
      "giris|Python nədir? İlk kod", "deyisenler|Dəyişənlər və tiplər", "operatorlar|Operatorlar", "string|String-lər",
      "sertler|Şərtlər", "dovrler|Dövrlər", "list-tuple|List və tuple", "dict-set|Dictionary və set", "funksiyalar|Funksiyalar",
      "comprehension|Comprehension-lar", "fayllar|Fayllarla işləmək", "xetalar|İstisnalar", "modullar|Modullar və paketlər",
      "oop|Siniflər və OOP", "dekorator|Dekoratorlar və generator-lar", "async|asyncio", "fastapi|FastAPI ilə API",
      "senior|Senior: daxili işləmə və performans",
    ),
  },
];

export const TRACKS: Record<TrackId, { name: string; team: string; tagline: string }> = {
  frontend: { name: "Front End", team: "Blue Team", tagline: "İstifadəçinin gördüyü dünya" },
  backend: { name: "Back End", team: "Red Team", tagline: "Pərdə arxasındakı güc" },
};

export const langsOf = (track: TrackId) => LANGUAGES.filter((l) => l.track === track);
export const getLang = (track: string, id: string) =>
  LANGUAGES.find((l) => l.track === track && l.id === id);
export const isTrack = (t: string): t is TrackId => t === "frontend" || t === "backend";
