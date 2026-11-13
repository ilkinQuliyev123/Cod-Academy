import type { Lesson } from "../types";

export const nextjs: Lesson[] = [
  {
    slug: "giris",
    title: "Next.js nədir?",
    intro: "Next.js — React üzərində qurulmuş full-stack framework-dür. React yalnız UI qatıdır; Next.js ona marşrutlaşdırma, serverdə render, məlumat çəkmə, keş və API əlavə edir. Bu dərslər Next.js 16 (App Router) üzrədir.",
    sections: [
      {
        level: "baslangic",
        title: "React + nə çatmırdı?",
        blocks: [
          { t: "analogy", text: "React — mühərrikdir. Güclüdür, amma tək mühərriklə yola çıxa bilməzsən: sükan, təkər, əyləc lazımdır. Next.js — hazır maşındır: mühərrik (React) içindədir, üstəlik yol xəritəsi (router), yanacaq sistemi (data) və təhlükəsizlik kəməri (server) də var." },
          { t: "code", lang: "bash", code: `npx create-next-app@latest menim-saytim
cd menim-saytim
npm run dev        # http://localhost:3000`, caption: "Yeni layihə" },
          { t: "code", lang: "tsx", caption: "app/page.tsx — ana səhifə", code: `export default function Page() {
  return <h1>Salam, Next.js!</h1>;
}` },
          { t: "terms", items: [
            ["framework", "hazır qaydaları və alətləri olan karkas; kitabxanadan fərqli olaraq quruluşu o diktə edir."],
            ["App Router", "app/ qovluğuna əsaslanan marşrutlaşdırma sistemi (müasir yol)."],
            ["page.tsx", "bir URL-in səhifəsi olan fayl."],
            ["SSR (Server-Side Rendering)", "HTML-in serverdə hazırlanması."],
            ["Turbopack", "Next.js-in sürətli yığıcısı (bundler); dev və build-də default-dur."],
          ]},
          { t: "tip", text: "Bu saytın özü Next.js 16 ilə yazılıb: hər dərs səhifəsi app/[track]/[lang]/[topic]/page.tsx faylından yaranır." },
        ],
      },
      {
        level: "orta",
        title: "Next.js nə verir?",
        blocks: [
          { t: "list", items: [
            "Fayl-marşrutlama: qovluq yaratdın — URL hazırdır. Ayrıca router kitabxanası lazım deyil.",
            "Server Components: komponent serverdə işləyir, bazaya birbaşa müraciət edir, JS-i brauzerə getmir.",
            "Məlumat çəkmə və keş: async komponent + \"use cache\" direktivi.",
            "Route Handler və Server Actions: back-end kodu eyni layihədə.",
            "Optimizasiya: şəkil (next/image), font (next/font), kod bölünməsi avtomatikdir.",
            "SEO: HTML serverdən hazır gəlir — axtarış sistemi məzmunu görür.",
          ]},
          { t: "code", lang: "text", caption: "Tipik layihə quruluşu", code: `app/
  layout.tsx      ← bütün səhifələrin ümumi qəlibi
  page.tsx        ← /
  haqqinda/
    page.tsx      ← /haqqinda
public/           ← statik fayllar (şəkil, favicon)
next.config.ts    ← konfiqurasiya
proxy.ts          ← sorğudan əvvəl işləyən kod (köhnə adı: middleware)` },
          { t: "mistake", lang: "tsx", wrong: `// app/page.tsx
import { useState } from "react";

export default function Page() {
  const [say, setSay] = useState(0); // XƏTA
  return <button onClick={() => setSay(say + 1)}>{say}</button>;
}`, right: `// app/Sayqac.tsx
"use client";
import { useState } from "react";

export default function Sayqac() {
  const [say, setSay] = useState(0);
  return <button onClick={() => setSay(say + 1)}>{say}</button>;
}`, why: "App Router-də komponentlər default olaraq Server Component-dir — state və hadisə işləmir. İnteraktiv hissəni ayrı fayla çıxar və başına \"use client\" yaz." },
        ],
      },
      {
        level: "senior",
        title: "Nə vaxt Next.js, nə vaxt yox?",
        blocks: [
          { t: "p", text: "Next.js sorğunu belə emal edir: proxy → marşrut uyğunluğu → layout və page Server Component-ləri render olunur → nəticə (RSC payload + HTML) axınla (streaming) brauzerə gedir → Client Component-lər hydrate olunur. Build zamanı mümkün olan hər şey əvvəlcədən render edilir (prerender)." },
          { t: "list", items: [
            "Uyğundur: məzmun saytları, e-ticarət, SEO vacib olan layihələr, full-stack tətbiqlər.",
            "Artıq ola bilər: yalnız girişdən sonra işləyən daxili panel (Vite + React SPA kifayətdir), sadə statik səhifə.",
            "Versiya fərqləri böyükdür: Next 16-da middleware → proxy adlanır, params Promise-dir, keş \"use cache\" ilə açıq yazılır. Köhnə dərsliklərdəki kod işləməyə bilər — rəsmi sənədə bax.",
            "Təhlükəsizlik: server və client kodu eyni layihədədir — sərhədi qarışdırmaq asandır. Yalnız NEXT_PUBLIC_ ilə başlayan mühit dəyişənləri brauzerə düşür; API açarına bu prefiksi VERMƏ.",
          ]},
          { t: "qa", items: [
            ["Next.js React-dan nə ilə fərqlənir?", "React — UI kitabxanası; Next.js — onun üzərində router, server render, data, keş və API verən framework."],
            ["App Router ilə Pages Router fərqi?", "Pages Router köhnə sistemdir (pages/, getServerSideProps). App Router (app/) Server Components, layout-lar və streaming üzərində qurulub — yeni layihələr üçün tövsiyə olunur."],
            ["NEXT_PUBLIC_ prefiksi nə edir?", "Dəyişəni build zamanı client koduna yazır — hər kəs görə bilər. Sirlər üçün istifadə olunmur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "App Router-də komponent default olaraq hansı növdür?", options: ["Client Component", "Server Component", "Hər ikisi"], answer: 1, why: "\"use client\" yazılmayıbsa, komponent serverdə render olunur." },
          { t: "quiz", q: "Hansı mühit dəyişəni brauzer koduna düşür?", options: ["DATABASE_URL", "NEXT_PUBLIC_SAYT_ADI", "GEMINI_API_KEY"], answer: 1, why: "Yalnız NEXT_PUBLIC_ prefiksli dəyişənlər client-ə gedir." },
        ],
      },
    ],
    exercise: {
      task: "app/page.tsx üçün ana səhifə yaz: h1 «Kod Akademiyası», altında 3 kursun siyahısı (massivdən map ilə). Aşağıda «Bəyən» düyməsi olsun — klik sayını göstərsin. Düyməni ayrı Client Component kimi yaz (eyni cavabda iki fayl kimi göstər).",
      starter: `// app/page.tsx\nexport default function Page() {\n  const kurslar = ["HTML", "CSS", "JavaScript"];\n  // bura\n}\n\n// app/BeyenDuymesi.tsx\n`,
      expect: "page.tsx-də \"use client\" YOXDUR və useState işlədilmir; kurslar map ilə və key ilə render olunur; BeyenDuymesi ayrı faylda, başında \"use client\", useState ilə say; page onu import edib işlədir.",
    },
  },
  {
    slug: "app-router",
    title: "App Router və fayl-marşrutlama",
    intro: "Next.js-də marşrut yazmırsan — qovluq yaradırsan. app/ içindəki hər qovluq URL-in bir hissəsidir, içindəki page.tsx isə həmin ünvanın səhifəsidir.",
    sections: [
      {
        level: "baslangic",
        title: "Qovluq = URL",
        blocks: [
          { t: "analogy", text: "Kompüterdə fayl yolu kimi düşün: Sənədlər/Şəkillər/yay.jpg. Next.js-də də eynidir: app/kurslar/html/page.tsx → saytda /kurslar/html ünvanı. Qovluq ağacı saytın xəritəsidir." },
          { t: "code", lang: "text", code: `app/
  page.tsx                → /
  haqqinda/page.tsx       → /haqqinda
  kurslar/
    page.tsx              → /kurslar
    html/page.tsx         → /kurslar/html
  komponentler/Kart.tsx   → URL DEYİL (page.tsx yoxdur)` },
          { t: "terms", items: [
            ["seqment (segment)", "URL-in / ilə ayrılan bir hissəsi; hər qovluq bir seqmentdir."],
            ["page.tsx", "seqmenti açıq (public) səhifəyə çevirən fayl."],
            ["default export", "page.tsx-in səhifə komponentini ixrac etmə üsulu — məcburidir."],
            ["kolokasiya (colocation)", "komponent, stil və test fayllarını marşrut qovluğunda saxlamaq; page.tsx olmadıqca URL yaranmır."],
          ]},
          { t: "tip", text: "Qovluq adları URL-də görünür — kiçik hərf və defis işlət: app/bizimle-elaqe, app/BizimleElaqe yox." },
        ],
      },
      {
        level: "orta",
        title: "Xüsusi fayllar və qruplar",
        blocks: [
          { t: "code", lang: "text", caption: "Bir seqmentdə ola bilən xüsusi fayllar", code: `layout.tsx      ← seqmentin və alt səhifələrin ümumi qabığı
page.tsx        ← səhifənin özü
loading.tsx     ← yüklənmə zamanı göstərilən UI (Suspense)
error.tsx       ← xəta zamanı göstərilən UI ("use client" olmalıdır)
not-found.tsx   ← 404 UI
route.ts        ← API nöqtəsi (page.tsx ilə eyni qovluqda OLMAZ)` },
          { t: "code", lang: "text", caption: "Route group və şəxsi qovluq", code: `app/
  (marketinq)/          ← mötərizə: URL-ə düşmür, yalnız qruplaşdırır
    layout.tsx          ← yalnız bu qrupun layout-u
    page.tsx            → /
    qiymetler/page.tsx  → /qiymetler
  (panel)/
    layout.tsx
    hesab/page.tsx      → /hesab
  _lib/                 ← alt xətt: marşrutlamadan tam kənar` },
          { t: "mistake", lang: "text", wrong: `app/
  kurslar/
    Kurslar.tsx      ← /kurslar açılmır (404)`, right: `app/
  kurslar/
    page.tsx         ← /kurslar işləyir`, why: "Fayl adı mütləq page.tsx (və ya page.js) olmalıdır. Başqa adlı fayl sadəcə adi moduldur, səhifə deyil." },
          { t: "mistake", lang: "text", wrong: `app/
  (a)/haqqinda/page.tsx   → /haqqinda
  (b)/haqqinda/page.tsx   → /haqqinda   ← ziddiyyət`, right: `app/
  (a)/haqqinda/page.tsx   → /haqqinda
  (b)/elaqe/page.tsx      → /elaqe`, why: "Route group URL-ə təsir etmir, ona görə iki qrup eyni yolu verə bilməz — build xətası alırsan." },
        ],
      },
      {
        level: "senior",
        title: "Paralel və kəsici marşrutlar, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Paralel marşrut (@slot): app/@analitika/page.tsx və app/@komanda/page.tsx eyni layout-da yanaşı render olunur; hər birinin öz loading/error halı var.",
            "Kəsici marşrut (intercepting, (.)qovluq): linkə klikdə səhifə modal kimi açılır, URL isə dəyişir; birbaşa girişdə tam səhifə göstərilir (şəkil qalereyası nümunəsi).",
            "Hər marşrut ayrı JS parçasıdır (code splitting) — istifadəçi yalnız açdığı səhifənin kodunu yükləyir.",
            "Build çıxışında ○ statik, ◐ qismən əvvəlcədən render, ƒ dinamik marşrutu göstərir — hər build-dən sonra bu cədvələ bax.",
            "Təhlükəsizlik: qovluq quruluşu giriş nəzarəti DEYİL. app/(admin)/ qrupu və ya _gizli/ adı səhifəni qorumur — URL-i bilən hər kəs açar. Yoxlama serverdə, məlumat oxunan yerdə edilməlidir.",
            "Təhlükəsizlik: public/ qovluğundakı hər fayl hər kəsə açıqdır — ora .env, ehtiyat nüsxə, daxili sənəd qoyma.",
          ]},
          { t: "qa", items: [
            ["Route group nə üçündür?", "URL-i dəyişmədən marşrutları qruplaşdırmaq və hər qrupa ayrı layout vermək üçün (məs. marketinq və panel)."],
            ["page.tsx ilə route.ts eyni qovluqda ola bilərmi?", "Xeyr. Eyni URL həm səhifə, həm API ola bilməz — ziddiyyət yaranır."],
            ["loading.tsx necə işləyir?", "Next.js səhifəni avtomatik <Suspense>-ə bürüyür; məlumat gələnə qədər loading.tsx göstərilir, sonra səhifə axınla gəlir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "app/(magaza)/sebet/page.tsx hansı URL-i verir?", options: ["/magaza/sebet", "/sebet", "/(magaza)/sebet"], answer: 1, why: "Mötərizəli qovluq (route group) URL-ə düşmür." },
          { t: "quiz", q: "app/blog/Yazi.tsx faylı var, page.tsx yoxdur. /blog açılır?", options: ["Bəli", "Xeyr, 404", "Yalnız dev rejimində"], answer: 1, why: "Səhifəni yalnız page.tsx yaradır." },
        ],
      },
    ],
    exercise: {
      task: "Onlayn mağaza üçün app/ qovluq ağacını yaz (mətn kimi): ana səhifə /, /mehsullar, /mehsullar/yeni, /sebet, /haqqinda. Marketinq səhifələri (/, /haqqinda) bir route group-da, mağaza səhifələri başqa qrupda olsun; hər qrupun öz layout.tsx-i, /mehsullar üçün loading.tsx olsun. Komponentlər üçün URL yaratmayan qovluq əlavə et.",
      starter: `// Qovluq ağacını şərh kimi yaz:\n// app/\n//   layout.tsx\n//   ...\n`,
      expect: "İki mötərizəli route group, hər birində layout.tsx; hər URL üçün düzgün yerdə page.tsx; mehsullar/loading.tsx var; komponent qovluğu _ ilə başlayır və ya page.tsx-siz; eyni URL-i verən iki page.tsx yoxdur; kök layout.tsx saxlanılıb.",
    },
  },
  {
    slug: "layout",
    title: "Layout və səhifələr",
    intro: "Layout — bir neçə səhifənin paylaşdığı qabıqdır: başlıq, menyu, altlıq. Səhifədən səhifəyə keçəndə layout yenidən render olunmur, vəziyyətini saxlayır.",
    sections: [
      {
        level: "baslangic",
        title: "Kök layout",
        blocks: [
          { t: "analogy", text: "Layout — şəkil çərçivəsidir, page — içindəki şəkil. Şəkli dəyişirsən, çərçivə divarda qalır. Menyu və altlıq çərçivədir; hər səhifə isə onun içinə qoyulan yeni şəkildir." },
          { t: "code", lang: "tsx", caption: "app/layout.tsx — məcburi kök layout", code: `export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body>
        <header>Kod Akademiyası</header>
        <main>{children}</main>
        <footer>© 2026</footer>
      </body>
    </html>
  );
}` },
          { t: "terms", items: [
            ["kök layout (root layout)", "app/layout.tsx; <html> və <body> teqləri yalnız burada yazılır."],
            ["children", "layout-un içinə qoyulan alt layout və ya səhifə."],
            ["iç-içə layout (nested)", "alt qovluqdakı layout.tsx; valideyn layout-un children-i kimi render olunur."],
          ]},
          { t: "tip", text: "<head> teqini əl ilə yazma — title və meta üçün metadata ixracı var (Metadata dərsinə bax)." },
        ],
      },
      {
        level: "orta",
        title: "İç-içə layout, params və searchParams",
        blocks: [
          { t: "code", lang: "tsx", caption: "app/panel/layout.tsx — yalnız /panel/* səhifələri üçün", code: `export default function PanelLayout({ children }: LayoutProps<"/panel">) {
  return (
    <div className="grid grid-cols-[200px_1fr]">
      <nav>Panel menyusu</nav>
      <section>{children}</section>
    </div>
  );
}` },
          { t: "code", lang: "tsx", caption: "app/kurslar/[slug]/page.tsx — params və searchParams Promise-dir", code: `export default async function Page(props: PageProps<"/kurslar/[slug]">) {
  const { slug } = await props.params;
  const { sira = "yeni" } = await props.searchParams;

  return <h1>{slug} — sıralama: {sira}</h1>;
}` },
          { t: "p", text: "PageProps və LayoutProps qlobal tip köməkçiləridir — import lazım deyil, marşrut yoluna görə params tipini özü çıxarır." },
          { t: "mistake", lang: "tsx", wrong: `export default function Page({ params }) {
  return <h1>{params.slug}</h1>; // Next 15+: params Promise-dir
}`, right: `export default async function Page({ params }: PageProps<"/kurslar/[slug]">) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}`, why: "Next.js 15-dən params və searchParams asinxrondur. await etmədən oxumaq xəta verir." },
          { t: "mistake", lang: "tsx", wrong: `// app/panel/layout.tsx
export default function PanelLayout({ children }) {
  return <html><body>{children}</body></html>;
}`, right: `export default function PanelLayout({ children }: LayoutProps<"/panel">) {
  return <section>{children}</section>;
}`, why: "<html> və <body> yalnız kök layout-da olur. Alt layout-da təkrar yazmaq sənədi pozur." },
        ],
      },
      {
        level: "senior",
        title: "Layout nə vaxt yenilənir? template, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Naviqasiyada yalnız dəyişən seqment render olunur (partial rendering) — layout qalır, içindəki state (məs. açıq menyu, axtarış mətni) itmir.",
            "Layout searchParams almır və cari pathname-i bilmir, çünki hər keçiddə yenidən render olunmur. Aktiv menyu elementi üçün Client Component-də usePathname işlət.",
            "template.tsx layout kimidir, amma hər keçiddə yenidən yaradılır — giriş animasiyası, səhifə baxışı sayğacı üçün.",
            "Layout-da məlumat çəkirsənsə, eyni sorğunu page də çəkə bilər — React.cache ilə funksiyanı sar ki, bir sorğuda bir dəfə işləsin.",
            "Kök layout-u route group-larla bir neçə yerə bölmək olar (hər qrupun öz <html>-i), amma qruplar arası keçid tam səhifə yüklənməsidir.",
            "Təhlükəsizlik: giriş yoxlamasını YALNIZ layout-da etmə. Layout keçiddə yenidən işləmir, üstəlik Server Action və Route Handler layout-dan keçmir. Yoxlamanı məlumatın oxunduğu funksiyada (Data Access Layer) et.",
          ]},
          { t: "qa", items: [
            ["Layout ilə template fərqi?", "Layout keçidlər arasında qalır və state saxlayır; template hər keçiddə yenidən mount olunur."],
            ["Niyə layout searchParams almır?", "Layout naviqasiyada yenidən render olunmur — köhnə dəyər göstərərdi. Ona görə searchParams yalnız page-ə verilir."],
            ["Layout-da auth yoxlaması niyə kifayət deyil?", "Keçiddə layout yenidən işləməyə bilər, API və Server Action isə ondan heç keçmir. Yoxlama hər məlumat girişində olmalıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "<html> və <body> teqləri harada yazılır?", options: ["Hər page.tsx-də", "Yalnız kök layout-da", "Hər layout.tsx-də"], answer: 1, why: "Kök layout bütün sənədin qabığıdır." },
          { t: "quiz", q: "/panel/a-dan /panel/b-yə keçəndə app/panel/layout.tsx nə olur?", options: ["Yenidən render olunur", "Olduğu kimi qalır, yalnız page dəyişir", "Silinir"], answer: 1, why: "Ortaq layout saxlanılır — partial rendering." },
        ],
      },
    ],
    exercise: {
      task: "İki fayl yaz: 1) app/layout.tsx — lang=\"az\", header-də sayt adı, main içində children, footer. 2) app/kurslar/[slug]/page.tsx — params-dan slug-u, searchParams-dan «dil» parametrini (default \"az\") oxuyub h1-də göstərsin. Next.js 16 qaydalarına uyğun yaz.",
      starter: `// app/layout.tsx\nexport default function RootLayout() {\n  // bura\n}\n\n// app/kurslar/[slug]/page.tsx\n`,
      expect: "RootLayout children qəbul edir, html lang=\"az\" və body var; page async-dir, params və searchParams await olunur (PageProps və ya Promise tipi ilə); default dəyər \"az\"; page-də html/body yoxdur; any işlədilməyib.",
    },
  },
  {
    slug: "link",
    title: "Link və naviqasiya",
    intro: "Səhifələr arasında keçid üçün <a> yox, <Link> komponenti işlədilir. O, səhifəni tam yeniləmədən keçir və hədəf səhifəni əvvəlcədən yükləyir.",
    sections: [
      {
        level: "baslangic",
        title: "<Link>",
        blocks: [
          { t: "analogy", text: "<a> — binadan çıxıb yenidən girmək kimidir: hər şey sıfırdan yüklənir. <Link> — binanın içində otaqdan otağa keçməkdir: dəhliz (layout) yerində qalır, yalnız otaq dəyişir. Üstəlik qapıya yaxınlaşanda otağın işığı əvvəlcədən yanır (prefetch)." },
          { t: "code", lang: "tsx", code: `import Link from "next/link";

export default function Menyu() {
  return (
    <nav>
      <Link href="/">Ana səhifə</Link>
      <Link href="/kurslar">Kurslar</Link>
      <Link href={"/kurslar/" + "html"}>HTML</Link>
      <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
        React sənədi
      </a>
    </nav>
  );
}` },
          { t: "terms", items: [
            ["Link", "next/link-dən gələn komponent; nəticədə <a> teqi yaradır."],
            ["href", "hədəf ünvan; daxili yollar / ilə başlayır."],
            ["prefetch", "link ekranda görünəndə hədəf səhifənin əvvəlcədən yüklənməsi."],
            ["client-side keçid", "səhifə tam yenilənmədən, yalnız dəyişən hissənin əvəzlənməsi."],
          ]},
          { t: "tip", text: "Daxili səhifə → <Link>. Xarici sayt → adi <a>. Xarici linkdə target=\"_blank\" varsa, rel=\"noopener noreferrer\" əlavə et." },
        ],
      },
      {
        level: "orta",
        title: "Aktiv link və kodla keçid",
        blocks: [
          { t: "code", lang: "tsx", caption: "Aktiv menyu elementi — Client Component", code: `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenyuLinki({ href, children }: { href: string; children: React.ReactNode }) {
  const yol = usePathname();
  const aktiv = yol === href;
  return (
    <Link href={href} aria-current={aktiv ? "page" : undefined}
      className={aktiv ? "text-accent font-bold" : "text-slate-400"}>
      {children}
    </Link>
  );
}` },
          { t: "code", lang: "tsx", caption: "Kodla keçid: client-də useRouter, serverdə redirect", code: `"use client";
import { useRouter } from "next/navigation";

export function GeriDuymesi() {
  const router = useRouter();
  return <button onClick={() => router.back()}>← Geri</button>;
}

// Server Component və ya Server Action içində:
// import { redirect } from "next/navigation";
// if (!istifadeci) redirect("/giris");` },
          { t: "mistake", lang: "tsx", wrong: `<a href="/kurslar">Kurslar</a>`, right: `<Link href="/kurslar">Kurslar</Link>`, why: "Adi <a> bütün səhifəni yenidən yükləyir: layout state-i itir, JS yenidən işə düşür, keçid yavaşdır." },
          { t: "mistake", lang: "tsx", wrong: `import { useRouter } from "next/router"; // Pages Router`, right: `import { useRouter } from "next/navigation"; // App Router`, why: "App Router-də hook-lar next/navigation-dan gəlir. next/router burada işləmir." },
          { t: "mistake", lang: "tsx", wrong: `<button onClick={() => router.push("/kurslar")}>Kurslar</button>`, right: `<Link href="/kurslar">Kurslar</Link>`, why: "Adi keçid üçün düymə + router.push pisdir: prefetch yoxdur, yeni tabda açmaq olmur, ekran oxuyucu link kimi tanımır. router.push yalnız hadisədən sonrakı keçid üçündür (məs. forma göndərildi)." },
        ],
      },
      {
        level: "senior",
        title: "Prefetch, streaming və açıq yönləndirmə",
        blocks: [
          { t: "list", items: [
            "Prefetch yalnız production-da işləyir. Statik marşrut tam, dinamik marşrut isə loading.tsx sərhədinə qədər əvvəlcədən yüklənir — ona görə dinamik səhifələrə loading.tsx qoy ki, keçid dərhal başlasın.",
            "Çoxlu link olan siyahıda (məs. 500 məhsul) prefetch={false} ver və ya yalnız hover-də yüklə — yoxsa lazımsız sorğular serveri yükləyir.",
            "useLinkStatus hook-u keçid gözləyən linkdə göstərici (spinner) üçündür — yavaş şəbəkədə istifadəçi klikin işlədiyini görür.",
            "router.refresh() cari marşrutun server məlumatını yenidən çəkir, client state-i saxlayır.",
            "Yalnız URL-i dəyişmək üçün (filtr, tab) window.history.pushState işlətmək olar — Next.js usePathname/useSearchParams ilə sinxron saxlayır.",
            "Təhlükəsizlik — açıq yönləndirmə (open redirect): /giris?novbeti=https://pis-sayt.com kimi parametri yoxlamadan redirect etmə. Yalnız / ilə başlayan və // ilə başlamayan daxili yollara icazə ver.",
            "Təhlükəsizlik: istifadəçidən gələn URL-i href-ə birbaşa qoyma — javascript: sxemi XSS-dir. Sxemi yoxla (yalnız http/https).",
          ]},
          { t: "code", lang: "ts", caption: "Təhlükəsiz yönləndirmə yoxlaması", code: `export function tehlukesizYol(novbeti: string | undefined): string {
  if (!novbeti) return "/";
  // yalnız daxili yol: "/panel" olar, "//pis.com" və "https://..." olmaz
  if (!novbeti.startsWith("/") || novbeti.startsWith("//")) return "/";
  return novbeti;
}` },
          { t: "qa", items: [
            ["<Link> <a>-dan nə ilə üstündür?", "Client-side keçid (tam yenilənmə yox), prefetch, layout state-inin saxlanması."],
            ["redirect ilə router.push fərqi?", "redirect serverdə (Server Component, Action, Route Handler) işləyir; router.push yalnız Client Component-də, hadisə içində."],
            ["Open redirect nədir?", "Saytın istifadəçini parametrdə verilən istənilən ünvana yönləndirməsi; fişinq üçün istifadə olunur. Qarşısı — yalnız daxili yollara icazə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "App Router-də usePathname haradan import olunur?", options: ["next/router", "next/navigation", "next/link"], answer: 1, why: "App Router hook-ları next/navigation-dadır." },
          { t: "quiz", q: "Xarici sayta keçid üçün nə işlədilir?", options: ["<Link>", "Adi <a>", "router.push"], answer: 1, why: "Link daxili marşrutlar üçündür; xarici ünvan adi <a> ilə açılır." },
        ],
      },
    ],
    exercise: {
      task: "Naviqasiya komponenti yaz: «Ana səhifə», «Kurslar», «Əlaqə» linkləri massivdən render olunsun. Cari səhifənin linki aria-current=\"page\" alsın və fərqli klassla görünsün. Sonda GitHub-a xarici link olsun (yeni tabda, təhlükəsiz).",
      starter: `"use client";\nimport Link from "next/link";\n\nconst linkler = [\n  { href: "/", ad: "Ana səhifə" },\n  { href: "/kurslar", ad: "Kurslar" },\n  { href: "/elaqe", ad: "Əlaqə" },\n];\n\nexport default function Menyu() {\n  // bura\n}\n`,
      expect: "usePathname next/navigation-dan; linklər map + key ilə; daxili keçidlər <Link>; aktiv linkdə aria-current=\"page\" və fərqli className; xarici link adi <a>, target=\"_blank\" və rel=\"noopener noreferrer\"; nav teqi işlədilib.",
    },
  },
  {
    slug: "server-client",
    title: "Server və Client komponentlər",
    intro: "Next.js-də iki növ komponent var. Server Component serverdə işləyir və brauzerə yalnız nəticəni göndərir. Client Component brauzerdə də işləyir — state, hadisə və brauzer API-ləri üçün lazımdır.",
    sections: [
      {
        level: "baslangic",
        title: "Hansı harada işləyir?",
        blocks: [
          { t: "analogy", text: "Restoranı düşün. Mətbəx (server) — yeməyi hazırlayır, reseptlər və anbar oradadır, müştəri oranı görmür. Masa (client) — müştəri duz səpir, çəngəl götürür, yəni qarşılıqlı əlaqə buradadır. Yemək mətbəxdə bişir, masada yeyilir. Anbarın açarını masaya qoymazsan." },
          { t: "code", lang: "tsx", caption: "Server Component (default) — app/kurslar/page.tsx", code: `import { BeyenDuymesi } from "./BeyenDuymesi";

export default async function Page() {
  const cavab = await fetch("https://api.example.com/kurslar");
  const kurslar: { id: number; ad: string }[] = await cavab.json();

  return (
    <ul>
      {kurslar.map((k) => (
        <li key={k.id}>
          {k.ad} <BeyenDuymesi kursId={k.id} />
        </li>
      ))}
    </ul>
  );
}` },
          { t: "code", lang: "tsx", caption: "Client Component — app/kurslar/BeyenDuymesi.tsx", code: `"use client";
import { useState } from "react";

export function BeyenDuymesi({ kursId }: { kursId: number }) {
  const [beyenildi, setBeyenildi] = useState(false);
  return (
    <button onClick={() => setBeyenildi(!beyenildi)} aria-pressed={beyenildi}>
      {beyenildi ? "♥" : "♡"}
    </button>
  );
}` },
          { t: "terms", items: [
            ["Server Component", "yalnız serverdə render olunur; async ola bilər, bazaya və sirlərə çıxışı var."],
            ["Client Component", "\"use client\" ilə işarələnir; serverdə ilkin HTML üçün, sonra brauzerdə işləyir."],
            ["\"use client\"", "faylın ən başındakı direktiv; bu fayl və onun import etdiyi hər şey client paketinə düşür."],
            ["hydration", "serverdən gələn HTML-ə brauzerdə hadisələrin bağlanması."],
          ]},
          { t: "tip", text: "Qayda: default Server. \"use client\" yalnız lazım olanda: useState/useEffect, onClick/onChange, window/localStorage, brauzer kitabxanaları." },
        ],
      },
      {
        level: "orta",
        title: "Sərhədi düzgün çəkmək",
        blocks: [
          { t: "list", items: [
            "\"use client\" sərhəddir: ondan aşağı import olunan hər şey client-dir. Ona görə onu ağacın mümkün qədər aşağısına (yarpağa) qoy.",
            "Server → Client props serializasiya olunmalıdır: sətir, ədəd, massiv, sadə obyekt, Date, Promise olar; funksiya və sinif nümunəsi olmaz (Server Action istisnadır).",
            "Client Component Server Component-i import edə bilməz, amma children kimi qəbul edə bilər.",
          ]},
          { t: "code", lang: "tsx", caption: "Server komponenti client-in içinə children ilə ötürmək", code: `// Modal.tsx
"use client";
import { useState } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const [aciq, setAciq] = useState(false);
  return (
    <>
      <button onClick={() => setAciq(true)}>Aç</button>
      {aciq && <div role="dialog">{children}</div>}
    </>
  );
}

// page.tsx (Server)
// <Modal><Sebet /></Modal>   ← Sebet serverdə render olunur` },
          { t: "mistake", lang: "tsx", wrong: `"use client"; // bütün səhifə client oldu
import { useState } from "react";

export default function Page() {
  const [axtar, setAxtar] = useState("");
  // ...uzun statik məzmun, siyahılar, mətnlər
}`, right: `// page.tsx — Server
import { Axtaris } from "./Axtaris"; // yalnız bu "use client"

export default function Page() {
  return (
    <>
      <Axtaris />
      {/* statik məzmun serverdə qalır */}
    </>
  );
}`, why: "Bir input üçün bütün səhifəni client etmək lazımsız JS göndərir və serverdə məlumat çəkmə imkanını itirir." },
          { t: "mistake", lang: "tsx", wrong: `// Server Component
<Duyme onClick={() => console.log("klik")} />`, right: `// Duyme.tsx — "use client"; hadisə öz içində
<Duyme etiket="Göndər" />`, why: "Funksiya serverdən client-ə ötürülə bilməz — serializasiya olunmur. Hadisəni Client Component-in içində yaz." },
        ],
      },
      {
        level: "senior",
        title: "RSC payload, paket ölçüsü və məlumat sızması",
        blocks: [
          { t: "p", text: "Server Component-lər RSC payload adlı xüsusi formata render olunur: içində server nəticəsi, Client Component-lərin yeri və onlara ötürülən props var. İlk yükləmədə bundan HTML də düzəlir; sonrakı keçidlərdə yalnız payload gəlir və React ağacı DOM-u itirmədən yeniləyir." },
          { t: "list", items: [
            "Server Component-in asılılıqları (məs. markdown parser, tarix kitabxanası) brauzerə getmir — paket kiçilir.",
            "Context Server Component-də işləmir. Provider-i \"use client\" faylına çıxar və layout-da children-i ona bürü.",
            "Brauzer API-si (window) işlədən üçüncü tərəf komponentini öz \"use client\" faylında yenidən ixrac et.",
            "Hydration xətası: server və client fərqli HTML verəndə (Date.now(), Math.random(), localStorage oxumaq). Bunları useEffect-ə keçir.",
            "Təhlükəsizlik: Client Component-ə ötürdüyün HƏR prop brauzerə gedir, ekranda göstərməsən belə. Bütöv istifadəçi obyektini (şifrə heşi, email, token) ötürmə — yalnız lazım olan sahələri seç.",
            "Təhlükəsizlik: baza və sirr işlədən modulun başına import \"server-only\" yaz — təsadüfən client-ə import olunsa, build xəta verir.",
          ]},
          { t: "code", lang: "ts", caption: "lib/istifadeci.ts — yalnız server", code: `import "server-only";

export async function profilAl(id: string) {
  const u = await db.istifadeci.tap(id);
  // DTO: client-ə yalnız təhlükəsiz sahələr
  return { ad: u.ad, sekil: u.sekil };
}` },
          { t: "qa", items: [
            ["Client Component serverdə render olunurmu?", "Bəli, ilkin HTML üçün serverdə də render olunur, sonra brauzerdə hydrate olur. «Client» adı yalnız brauzerdə işləyir demək deyil."],
            ["Niyə \"use client\"-i aşağı salmaq lazımdır?", "Sərhəddən aşağı hər şey client paketinə düşür. Sərhəd nə qədər aşağıdırsa, brauzerə o qədər az JS gedir."],
            ["server-only nə edir?", "Modulu client koduna import etməyi build xətasına çevirir — sirlərin sızmasının qarşısını alır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı halda \"use client\" lazımdır?", options: ["Bazadan məlumat oxumaq", "onClick ilə state dəyişmək", "Statik mətn göstərmək"], answer: 1, why: "Hadisə və state yalnız Client Component-də işləyir." },
          { t: "quiz", q: "Server Component-dən Client Component-ə nə ötürmək OLMAZ?", options: ["Sətir", "Massiv", "Adi funksiya"], answer: 2, why: "Funksiya serializasiya olunmur (Server Action istisna)." },
          { t: "quiz", q: "Client Component-ə bütöv user obyektini ötürdün, amma yalnız adını göstərirsən. Qalan sahələr?", options: ["Serverdə qalır", "Brauzerə gedir və görünə bilər", "Avtomatik silinir"], answer: 1, why: "Bütün props RSC payload-da brauzerə göndərilir." },
        ],
      },
    ],
    exercise: {
      task: "Məhsul səhifəsi yaz (iki fayl). page.tsx (Server): mehsulAl() funksiyasından məhsulu alır (ad, qiymət, maya_deyeri, tedarukcu_telefonu), adını və qiymətini göstərir. SayDuymesi.tsx (Client): +/− ilə say seçilir (minimum 1) və cəm qiymət göstərilir. Client-ə yalnız lazım olan məlumatı ötür.",
      starter: `// app/mehsul/page.tsx\nasync function mehsulAl() {\n  return { ad: "Klaviatura", qiymet: 89, maya_deyeri: 41, tedarukcu_telefonu: "+994..." };\n}\n\nexport default async function Page() {\n  // bura\n}\n\n// app/mehsul/SayDuymesi.tsx\n`,
      expect: "page.tsx-də \"use client\" yoxdur, async-dir, mehsulAl await olunur; SayDuymesi başında \"use client\", useState, say 1-dən aşağı düşmür; client-ə yalnız qiymet (və lazımdırsa ad) ötürülür — bütöv obyekt, maya_deyeri və tedarukcu_telefonu ÖTÜRÜLMÜR; funksiya prop kimi serverdən ötürülmür.",
    },
  },
  {
    slug: "data",
    title: "Məlumat çəkmə",
    intro: "Server Component async ola bilər — məlumatı birbaşa komponentin içində await ilə çəkirsən. useEffect, yüklənmə state-i, ayrıca API qatı lazım deyil.",
    sections: [
      {
        level: "baslangic",
        title: "async komponent",
        blocks: [
          { t: "analogy", text: "Köhnə üsul (client-də fetch): boş boşqab gətirilir, sonra ofisiant yeməyin dalınca gedir, sən gözləyirsən. Server Component: boşqab mətbəxdən dolu çıxır. Yemək hələ hazır deyilsə, əvvəl çörək və salat gəlir (Suspense), isti yemək sonra çatır (streaming)." },
          { t: "code", lang: "tsx", caption: "app/kurslar/page.tsx", code: `type Kurs = { id: number; ad: string };

export default async function Page() {
  const cavab = await fetch("https://api.example.com/kurslar");
  if (!cavab.ok) throw new Error("Kurslar yüklənmədi");
  const kurslar: Kurs[] = await cavab.json();

  return (
    <ul>
      {kurslar.map((k) => <li key={k.id}>{k.ad}</li>)}
    </ul>
  );
}` },
          { t: "terms", items: [
            ["async komponent", "Promise qaytaran Server Component; içində await işlədilir."],
            ["fetch", "HTTP sorğusu; Next.js-də default olaraq keşlənmir."],
            ["Suspense", "məlumat gələnə qədər fallback göstərən React sərhədi."],
            ["streaming", "HTML-in hissə-hissə, hazır olduqca göndərilməsi."],
          ]},
          { t: "tip", text: "Serverdə fetch məcburi deyil: ORM və ya baza müştərisini birbaşa çağıra bilərsən — kod brauzerə getmir." },
        ],
      },
      {
        level: "orta",
        title: "Suspense, paralel sorğular, xətalar",
        blocks: [
          { t: "code", lang: "tsx", caption: "Yavaş hissəni ayır — səhifənin qalanı dərhal görünür", code: `import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <h1>Panel</h1>
      <Suspense fallback={<p>Statistika yüklənir…</p>}>
        <Statistika />
      </Suspense>
    </>
  );
}

async function Statistika() {
  const s = await statistikaAl(); // yavaş sorğu
  return <p>Bu gün: {s.ziyaret} ziyarət</p>;
}` },
          { t: "code", lang: "tsx", caption: "Paralel çəkmə", code: `export default async function Page({ params }: PageProps<"/muellif/[id]">) {
  const { id } = await params;

  // ikisi eyni anda başlayır
  const [muellif, yazilar] = await Promise.all([
    muellifAl(id),
    yazilariAl(id),
  ]);

  return <Profil muellif={muellif} yazilar={yazilar} />;
}` },
          { t: "mistake", lang: "tsx", wrong: `const muellif = await muellifAl(id);   // 300 ms
const yazilar = await yazilariAl(id);  // 400 ms → cəmi 700 ms`, right: `const [muellif, yazilar] = await Promise.all([
  muellifAl(id),
  yazilariAl(id),
]); // cəmi ~400 ms`, why: "Bir-birindən asılı olmayan sorğuları ardıcıl await etmək «şəlalə» (waterfall) yaradır. Promise.all ilə paralel çək." },
          { t: "mistake", lang: "tsx", wrong: `"use client";
export default function Page() {
  const [kurslar, setKurslar] = useState([]);
  useEffect(() => {
    fetch("/api/kurslar").then((r) => r.json()).then(setKurslar);
  }, []);
  // ...
}`, right: `export default async function Page() {
  const kurslar = await kurslariAl();
  // ...
}`, why: "Client-də çəkəndə: boş HTML (SEO zəif), əlavə sorğu, yüklənmə/xəta state-i əl ilə. Server Component-də bunların heç biri yoxdur." },
          { t: "p", text: "Xətalar: gözlənilməyən xəta ən yaxın error.tsx-də tutulur; «tapılmadı» halı üçün notFound() çağır — not-found.tsx göstərilir." },
        ],
      },
      {
        level: "senior",
        title: "Təkrarsızlaşdırma, client-də çəkmə, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Eyni məlumat layout, page və generateMetadata-da lazımdırsa, funksiyanı React.cache ilə sar — bir sorğu ərzində bir dəfə işləyir. (Eyni URL-ə GET fetch-lər onsuz da avtomatik birləşdirilir.)",
            "Client-də çəkmək lazımdırsa (canlı yenilənmə, sonsuz scroll): serverdə Promise-i await ETMƏDƏN prop kimi ötür, client-də use(promise) ilə oxu; və ya SWR / TanStack Query işlət.",
            "Preload nümunəsi: funksiyanı await etmədən erkən çağır (void melumatAl(id)) — sorğu başlayır, sonradan await edən komponent hazır nəticəni alır.",
            "Hər Suspense sərhədi ayrıca axır. Çox xırda sərhəd — ekran «titrəyir»; mənalı bloklar üzrə qruplaşdır və fallback-in ölçüsünü məzmunla eyni et (CLS olmasın).",
            "Təhlükəsizlik — SSRF: istifadəçinin verdiyi URL-ə serverdən fetch etmə. Server daxili şəbəkəyə (169.254.169.254, localhost) çıxa bilir. Lazımdırsa, domen ağ siyahısı işlət.",
            "Təhlükəsizlik: sorğunu sətir birləşdirməklə qurma — SQL injection. Parametrli sorğu və ya ORM işlət. Sirlər yalnız process.env-dən, server faylında oxunur.",
            "Təhlükəsizlik: komponentə bütöv sətri (SELECT *) qaytarma — yalnız lazım olan sütunları seç (DTO).",
          ]},
          { t: "code", lang: "ts", caption: "lib/data.ts — təkrarsız və təhlükəsiz", code: `import "server-only";
import { cache } from "react";

export const kursAl = cache(async (slug: string) => {
  // parametrli sorğu — injection yoxdur
  const [kurs] = await sql\`SELECT ad, tesvir FROM kurslar WHERE slug = \${slug}\`;
  return kurs as { ad: string; tesvir: string } | undefined;
});` },
          { t: "qa", items: [
            ["Waterfall nədir və necə aradan qaldırılır?", "Sorğuların ardıcıl gözlənilməsi. Asılı olmayanları Promise.all ilə paralel çək və ya ayrı Suspense sərhədlərinə böl."],
            ["React.cache nə üçündür?", "Bir render (sorğu) ərzində eyni arqumentli çağırışları bir dəfəyə endirir — layout və page eyni məlumatı iki dəfə çəkmir."],
            ["SSRF nədir?", "Hücumçunun serveri öz seçdiyi ünvana sorğu göndərməyə məcbur etməsi; daxili xidmətlərə çıxış verir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Server Component-də məlumat çəkmək üçün nə lazımdır?", options: ["useEffect + useState", "async funksiya və await", "getServerSideProps"], answer: 1, why: "Server Component özü async ola bilər." },
          { t: "quiz", q: "İki müstəqil sorğunu ən sürətli necə çəkmək olar?", options: ["Ardıcıl await", "Promise.all", "setTimeout ilə"], answer: 1, why: "Promise.all sorğuları paralel başladır." },
        ],
      },
    ],
    exercise: {
      task: "Müəllif səhifəsi yaz: params-dan id oxu; muellifAl(id) və yazilariAl(id)-ni PARALEL çək; müəllif yoxdursa notFound() çağır; adını h1-də, yazıları siyahıda göstər. Yavaş olan <Reyler id={id} /> komponentini Suspense ilə ayır.",
      starter: `import { Suspense } from "react";\nimport { notFound } from "next/navigation";\nimport { muellifAl, yazilariAl } from "@/lib/data";\nimport { Reyler } from "./Reyler";\n\nexport default async function Page({ params }: PageProps<"/muellif/[id]">) {\n  // bura\n}\n`,
      expect: "params await olunur; Promise.all ilə iki sorğu paralel; müəllif yoxdursa notFound(); yazılar map + key; Reyler <Suspense fallback=...> içindədir; \"use client\", useEffect, useState yoxdur.",
    },
  },
  {
    slug: "dinamik",
    title: "Dinamik marşrutlar",
    intro: "Min məhsul üçün min qovluq yaratmırsan. Kvadrat mötərizəli qovluq — [slug] — URL-in dəyişən hissəsini tutur və onu params ilə səhifəyə verir.",
    sections: [
      {
        level: "baslangic",
        title: "[slug]",
        blocks: [
          { t: "analogy", text: "Dinamik marşrut — blank (forma) kimidir: «Hörmətli ____, sifarişiniz hazırdır». Mətn birdir, boşluğa hər dəfə başqa ad yazılır. [slug] həmin boşluqdur." },
          { t: "code", lang: "tsx", caption: "app/blog/[slug]/page.tsx → /blog/ilk-yazi, /blog/next-nedir …", code: `import { notFound } from "next/navigation";
import { yaziAl } from "@/lib/data";

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const yazi = await yaziAl(slug);
  if (!yazi) notFound();

  return (
    <article>
      <h1>{yazi.basliq}</h1>
      <p>{yazi.metn}</p>
    </article>
  );
}` },
          { t: "terms", items: [
            ["dinamik seqment", "[ad] formasında qovluq; URL-in həmin hissəsi dəyişən olur."],
            ["params", "dinamik seqmentlərin dəyərləri; Promise-dir, await olunur."],
            ["slug", "URL-də işlənən oxunaqlı ad: next-nedir."],
            ["notFound()", "404 səhifəsini göstərir və render-i dayandırır."],
          ]},
          { t: "tip", text: "params dəyərləri həmişə sətirdir. Ədəd lazımdırsa çevir və yoxla: Number(id), sonra Number.isInteger." },
        ],
      },
      {
        level: "orta",
        title: "generateStaticParams və catch-all",
        blocks: [
          { t: "code", lang: "tsx", caption: "Build zamanı səhifələri əvvəlcədən yarat", code: `export async function generateStaticParams() {
  const yazilar = await butunYazilar();
  return yazilar.map((y) => ({ slug: y.slug }));
}

// Siyahıda olmayan slug gələndə nə olsun?
// true (default) — ilk sorğuda yaradılır; false — 404
export const dynamicParams = false;` },
          { t: "code", lang: "text", caption: "Seqment növləri", code: `app/blog/[slug]/page.tsx              /blog/a        → { slug: "a" }
app/magaza/[...yol]/page.tsx          /magaza/a/b    → { yol: ["a", "b"] }   (ən azı 1 hissə)
app/sened/[[...yol]]/page.tsx         /sened         → { yol: undefined }    (0 və ya çox)
app/[dil]/kurs/[id]/page.tsx          /az/kurs/7     → { dil: "az", id: "7" }` },
          { t: "mistake", lang: "tsx", wrong: `export default async function Page({ params }) {
  const { slug } = await params;
  const yazi = await yaziAl(slug);
  return <h1>{yazi.basliq}</h1>; // yazi undefined ola bilər → 500
}`, right: `const yazi = await yaziAl(slug);
if (!yazi) notFound();
return <h1>{yazi.basliq}</h1>;`, why: "İstifadəçi URL-ə istənilən şey yaza bilər. Tapılmayan məlumat üçün 500 yox, 404 qaytar." },
          { t: "mistake", lang: "tsx", wrong: `export async function generateStaticParams() {
  return [{ id: 1 }, { id: 2 }];
}`, right: `export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}`, why: "params dəyərləri sətir olmalıdır və açar adı qovluq adı ilə eyni olmalıdır ([id] → id)." },
        ],
      },
      {
        level: "senior",
        title: "Statik, dinamik, ISR; params-a etibar etmə",
        blocks: [
          { t: "list", items: [
            "generateStaticParams-da qaytarılan yollar build-də HTML olur (ən sürətli). Min səhifə varsa, yalnız populyar olanları qaytar — qalanları ilk sorğuda yaranıb keşlənir.",
            "Cache Components aktivdirsə, params-ı oxuyan hissə runtime məlumatıdır: ya generateStaticParams ver, ya da onu Suspense içində oxu.",
            "Yuxarı seqmentin generateStaticParams-ı aşağıya ötürülür: [kateqoriya]/[mehsul] üçün alt funksiya params.kateqoriya alır.",
            "Kök layout-da [dil] kimi seqment varsa, bütün sayt həmin parametrə görə şaxələnir — i18n belə qurulur.",
            "Təhlükəsizlik: params — istifadəçi girişidir. Yoxlamadan fayl yoluna qoyma: fs.readFile(\"data/\" + slug) → ../../.env oxuna bilər (path traversal). Ağ siyahı və ya ciddi regex işlət.",
            "Təhlükəsizlik — IDOR: /sifaris/[id] səhifəsində yalnız id ilə axtarma. Sifarişin cari istifadəçiyə aid olduğunu da yoxla, yoxsa hər kəs id-ni dəyişib başqasının sifarişini görər.",
          ]},
          { t: "code", lang: "ts", caption: "Girişin yoxlanması", code: `const SLUG = /^[a-z0-9-]{1,80}$/;

export async function yaziAl(slug: string) {
  if (!SLUG.test(slug)) return undefined; // şübhəli giriş → 404
  return db.yazi.tap({ slug });
}

export async function sifarisAl(id: string, istifadeciId: string) {
  // IDOR-a qarşı: sahibini də şərtə əlavə et
  return db.sifaris.tap({ id, istifadeciId });
}` },
          { t: "qa", items: [
            ["generateStaticParams nə edir?", "Dinamik marşrut üçün build zamanı hansı parametrlərlə səhifə yaradılacağını bildirir — həmin səhifələr statik olur."],
            ["[...yol] ilə [[...yol]] fərqi?", "Birincisi ən azı bir seqment tələb edir; ikincisi (optional catch-all) seqmentsiz kök yolu da tutur."],
            ["IDOR nədir?", "Insecure Direct Object Reference: obyektə yalnız id ilə çıxış verilməsi, sahiblik yoxlanmadan. Qarşısı — hər sorğuda icazə yoxlaması."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "app/kurs/[id]/page.tsx üçün /kurs/42 açılanda params.id nədir?", options: ["42 (ədəd)", "\"42\" (sətir)", "[\"42\"]"], answer: 1, why: "URL parametrləri həmişə sətirdir." },
          { t: "quiz", q: "Məlumat tapılmayanda nə çağırılır?", options: ["throw new Error()", "notFound()", "redirect(\"/\")"], answer: 1, why: "notFound() düzgün 404 statusu və not-found.tsx verir." },
        ],
      },
    ],
    exercise: {
      task: "app/kurslar/[slug]/page.tsx yaz: generateStaticParams bütün kursların slug-larını qaytarsın; siyahıda olmayan slug 404 versin (dynamicParams); səhifə slug-u regex ilə yoxlasın, kursu tapıb adını və təsvirini göstərsin, tapılmasa notFound().",
      starter: `import { notFound } from "next/navigation";\n\nconst kurslar = [\n  { slug: "html", ad: "HTML", tesvir: "Veb-in skeleti" },\n  { slug: "css", ad: "CSS", tesvir: "Görünüş" },\n];\n\n// bura\n`,
      expect: "generateStaticParams {slug} obyektləri massivi qaytarır (sətir dəyərlər); export const dynamicParams = false; Page async, params await olunur; slug formatı yoxlanır (regex və ya ağ siyahı); tapılmayanda notFound(); any yoxdur.",
    },
  },
  {
    slug: "route-handler",
    title: "Route Handler (API)",
    intro: "Route Handler — Next.js-də API nöqtəsidir. app/ içində route.ts faylı yaradırsan və HTTP metodlarının adı ilə funksiyalar ixrac edirsən: GET, POST, PUT, DELETE.",
    sections: [
      {
        level: "baslangic",
        title: "route.ts",
        blocks: [
          { t: "analogy", text: "page.tsx — vitrindir: insan baxır. route.ts — anbarın yük qapısıdır: oradan insan yox, proqramlar (mobil tətbiq, başqa sayt, webhook) mal alıb-verir. Qapıda mühafizəçi olmalıdır." },
          { t: "code", lang: "ts", caption: "app/api/kurslar/route.ts → GET/POST /api/kurslar", code: `import { NextResponse } from "next/server";

const kurslar = [{ id: 1, ad: "HTML" }];

export async function GET() {
  return NextResponse.json(kurslar);
}

export async function POST(request: Request) {
  const body = await request.json();
  const yeni = { id: kurslar.length + 1, ad: String(body.ad) };
  kurslar.push(yeni);
  return NextResponse.json(yeni, { status: 201 });
}` },
          { t: "terms", items: [
            ["Route Handler", "route.ts faylında HTTP metodu adı ilə ixrac olunan funksiya."],
            ["Request / Response", "veb standart obyektləri; sorğu və cavabı təmsil edir."],
            ["NextResponse.json()", "JSON cavabı və status kodu qaytarmağın qısa yolu."],
            ["status kodu", "nəticəni bildirən ədəd: 200 uğur, 201 yaradıldı, 400 səhv giriş, 401 giriş lazımdır, 404 tapılmadı."],
          ]},
          { t: "tip", text: "Öz səhifən üçün məlumat lazımdırsa, API yazma — Server Component-də birbaşa oxu. Route Handler kənar müştərilər, webhook-lar və client-dən çağırışlar üçündür." },
        ],
      },
      {
        level: "orta",
        title: "Parametrlər, sorğu sətri, validasiya",
        blocks: [
          { t: "code", lang: "ts", caption: "app/api/kurslar/[id]/route.ts", code: `import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: RouteContext<"/api/kurslar/[id]">) {
  const { id } = await ctx.params;
  const dil = request.nextUrl.searchParams.get("dil") ?? "az";

  const kurs = await kursAl(Number(id));
  if (!kurs) return NextResponse.json({ xeta: "Tapılmadı" }, { status: 404 });

  return NextResponse.json({ ...kurs, dil });
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/kurslar/[id]">) {
  const { id } = await ctx.params;
  await kursSil(Number(id));
  return new Response(null, { status: 204 });
}` },
          { t: "code", lang: "ts", caption: "Girişi yoxla — body-yə etibar etmə", code: `export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ xeta: "JSON deyil" }, { status: 400 });
  }

  const ad = (body as { ad?: unknown })?.ad;
  if (typeof ad !== "string" || ad.length < 2 || ad.length > 80) {
    return NextResponse.json({ xeta: "ad 2–80 simvol olmalıdır" }, { status: 400 });
  }
  // ...yarat
}` },
          { t: "mistake", lang: "ts", wrong: `export default function handler(req, res) {
  res.status(200).json({ ok: true }); // Pages Router üslubu
}`, right: `export async function GET() {
  return Response.json({ ok: true });
}`, why: "App Router-də default export və res obyekti yoxdur. Metod adı ilə funksiya ixrac edib Response qaytarırsan." },
          { t: "mistake", lang: "ts", wrong: `export async function GET() {
  try { /* ... */ } catch (e) {
    return NextResponse.json({ xeta: String(e), stack: (e as Error).stack }, { status: 500 });
  }
}`, right: `catch (e) {
  console.error(e); // tam xəta yalnız server jurnalında
  return NextResponse.json({ xeta: "Daxili xəta" }, { status: 500 });
}`, why: "Xətanın təfərrüatı (stack, SQL, fayl yolları) hücumçuya xəritədir. Müştəriyə ümumi mesaj ver." },
        ],
      },
      {
        level: "senior",
        title: "Keş, axın və API təhlükəsizliyi",
        blocks: [
          { t: "list", items: [
            "Route Handler default olaraq keşlənmir. Cache Components aktivdirsə, GET səhifələrlə eyni modelə tabedir: keşlənəcək hissəni \"use cache\" işlədən köməkçi funksiyaya çıxar.",
            "Axınla cavab (streaming): ReadableStream qaytar — AI cavabları, böyük fayllar üçün. Cavabdan sonra iş görmək üçün after() var (jurnal, analitika).",
            "Webhook-da imzanı yoxlamaq üçün gövdəni request.text() ilə xam oxu — JSON-a çevirib yenidən yığsan, imza uyğun gəlməz.",
            "Təhlükəsizlik — autentifikasiya: route.ts açıq internet ünvanıdır. Hər handler-də sessiyanı yoxla; layout və ya proxy-dəki yoxlamaya arxalanma.",
            "Təhlükəsizlik — CSRF: cookie ilə işləyən POST/PUT/DELETE üçün Origin başlığını öz domeninlə müqayisə et, cookie-yə SameSite=Lax/Strict ver. GET heç vaxt məlumat dəyişməməlidir.",
            "Təhlükəsizlik — limitlər: gövdə ölçüsünü məhdudlaşdır, IP üzrə sorğu limiti (rate limit) qoy — xüsusən pullu API-yə (AI) vasitəçilik edən nöqtələrdə.",
            "Təhlükəsizlik — CORS: Access-Control-Allow-Origin: * + credentials işlətmə; konkret domen yaz. Sirli açarı heç vaxt cavabda və ya xəta mesajında qaytarma.",
          ]},
          { t: "code", lang: "ts", caption: "Origin və ölçü yoxlaması (bu saytın /api/agent nöqtəsindəki kimi)", code: `export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || new URL(origin).host !== host) {
    return Response.json({ xeta: "İcazə yoxdur" }, { status: 403 });
  }

  const xam = await request.text();
  if (xam.length > 40_000) {
    return Response.json({ xeta: "Çox böyük" }, { status: 413 });
  }
  // ...JSON.parse(xam) + sahələrin yoxlanması
}` },
          { t: "qa", items: [
            ["Route Handler nə vaxt lazımdır?", "Kənar müştərilər (mobil, üçüncü tərəf), webhook-lar, client-dən çağırılan nöqtələr, fayl/axın cavabları üçün. Öz Server Component-in üçün lazım deyil."],
            ["Niyə GET məlumat dəyişməməlidir?", "GET linklə, şəkil teqi ilə, prefetch ilə təsadüfən və ya qəsdən çağırıla bilər — CSRF üçün ən asan yol."],
            ["Rate limit niyə vacibdir?", "Brute-force, spam və xərc hücumlarının (pullu API-nin boşaldılması) qarşısını alır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "POST /api/mesaj üçün fayl harada olmalıdır?", options: ["app/api/mesaj/page.tsx", "app/api/mesaj/route.ts", "pages/api/mesaj.ts"], answer: 1, why: "App Router-də API nöqtəsi route.ts faylıdır." },
          { t: "quiz", q: "Səhv formatlı giriş üçün hansı status?", options: ["200", "400", "500"], answer: 1, why: "400 Bad Request — müştərinin səhvi." },
        ],
      },
    ],
    exercise: {
      task: "app/api/reyler/route.ts yaz. GET — rəylər massivini JSON qaytarsın. POST — body-dən { ad, metn } alsın; JSON deyilsə 400; ad 2–40, metn 5–500 simvol sətir deyilsə 400; Origin host ilə uyğun deyilsə 403; uğurda yeni rəyi 201 ilə qaytarsın. Xəta mesajlarında daxili təfərrüat olmasın.",
      starter: `import { NextResponse } from "next/server";\n\ntype Rey = { id: number; ad: string; metn: string };\nconst reyler: Rey[] = [];\n\n// bura\n`,
      expect: "GET və POST adlı ixraclar (default export yox); request.json() try/catch-də; typeof və uzunluq yoxlamaları; Origin/host müqayisəsi → 403; uğurda status 201; 400/403 cavabları JSON; stack və ya xam xəta qaytarılmır; any yoxdur.",
    },
  },
  {
    slug: "server-actions",
    title: "Server Actions",
    intro: "Server Action — serverdə işləyən, amma formadan və ya düymədən birbaşa çağırılan async funksiyadır. Məlumatı dəyişmək (yaratmaq, yeniləmək, silmək) üçün ayrıca API yazmağa ehtiyac qalmır.",
    sections: [
      {
        level: "baslangic",
        title: "\"use server\" və forma",
        blocks: [
          { t: "analogy", text: "Server Action — ofisiantın zəngidir. Masadan (brauzer) düyməni basırsan, mətbəxdə (server) iş görülür. Sən mətbəxə girmirsən, resepti görmürsən — yalnız sifarişi ötürürsən və nəticəni alırsan." },
          { t: "code", lang: "ts", caption: "app/actions.ts", code: `"use server";
import { revalidatePath } from "next/cache";

export async function reyElaveEt(formData: FormData) {
  const metn = String(formData.get("metn") ?? "").trim();
  if (metn.length < 5) return;

  await db.rey.yarat({ metn });
  revalidatePath("/reyler"); // siyahını təzələ
}` },
          { t: "code", lang: "tsx", caption: "app/reyler/page.tsx — JS yüklənməsə belə forma işləyir", code: `import { reyElaveEt } from "../actions";

export default function Page() {
  return (
    <form action={reyElaveEt}>
      <label htmlFor="metn">Rəyin</label>
      <textarea id="metn" name="metn" required minLength={5} />
      <button type="submit">Göndər</button>
    </form>
  );
}` },
          { t: "terms", items: [
            ["\"use server\"", "faylın (və ya funksiyanın) başında direktiv; ixrac olunan async funksiyaları Server Action edir."],
            ["FormData", "formanın sahələrini daşıyan obyekt; formData.get(\"ad\") ilə oxunur."],
            ["action", "<form>-un atributu; Server Action funksiyasını birbaşa qəbul edir."],
            ["mutasiya (mutation)", "məlumatı dəyişən əməliyyat: yarat, yenilə, sil."],
          ]},
          { t: "tip", text: "\"use server\" ≠ Server Component. O, funksiyanı brauzerdən çağırıla bilən server nöqtəsinə çevirir." },
        ],
      },
      {
        level: "orta",
        title: "Vəziyyət, xətalar, gözləmə",
        blocks: [
          { t: "code", lang: "ts", caption: "Action nəticə qaytarır", code: `"use server";
import { updateTag } from "next/cache";

export type Netice = { xeta?: string; ugur?: boolean };

export async function kursYarat(_evvelki: Netice, formData: FormData): Promise<Netice> {
  const ad = String(formData.get("ad") ?? "").trim();
  if (ad.length < 2 || ad.length > 80) return { xeta: "Ad 2–80 simvol olmalıdır" };

  await db.kurs.yarat({ ad });
  updateTag("kurslar"); // istifadəçi öz dəyişikliyini dərhal görsün
  return { ugur: true };
}` },
          { t: "code", lang: "tsx", caption: "Client: useActionState ilə xəta və gözləmə", code: `"use client";
import { useActionState } from "react";
import { kursYarat, type Netice } from "./actions";

const ilkin: Netice = {};

export function KursFormasi() {
  const [netice, action, gozleyir] = useActionState(kursYarat, ilkin);

  return (
    <form action={action}>
      <input name="ad" required aria-describedby="xeta" />
      <button disabled={gozleyir}>{gozleyir ? "Göndərilir…" : "Yarat"}</button>
      <p id="xeta" role="alert">{netice.xeta}</p>
    </form>
  );
}` },
          { t: "mistake", lang: "ts", wrong: `export async function sil(id: string) {
  try {
    await db.kurs.sil(id);
    redirect("/kurslar"); // redirect xəta atır — catch udur
  } catch {
    return { xeta: "Alınmadı" };
  }
}`, right: `export async function sil(id: string) {
  try {
    await db.kurs.sil(id);
  } catch {
    return { xeta: "Alınmadı" };
  }
  redirect("/kurslar");
}`, why: "redirect() daxildə xüsusi xəta atmaqla işləyir. try içində çağırsan, catch onu tutur və yönləndirmə baş vermir." },
          { t: "mistake", lang: "ts", wrong: `await db.kurs.yarat({ ad });
return { ugur: true }; // siyahı köhnə qalır`, right: `await db.kurs.yarat({ ad });
updateTag("kurslar"); // və ya revalidatePath("/kurslar")
return { ugur: true };`, why: "Keşlənmiş məlumat özü yenilənmir. Mutasiyadan sonra keşi etibarsız et, yoxsa istifadəçi köhnə siyahını görür." },
        ],
      },
      {
        level: "senior",
        title: "Action — açıq API nöqtəsidir",
        blocks: [
          { t: "p", text: "Hər Server Action üçün Next.js gizli ID ilə POST nöqtəsi yaradır. UI-də düyməni gizlətsən belə, hücumçu həmin nöqtəni birbaşa, istənilən arqumentlə çağıra bilər. Ona görə action-a Route Handler kimi yanaş." },
          { t: "list", items: [
            "Təhlükəsizlik — autentifikasiya və icazə: HƏR action-ın başında sessiyanı yoxla və əməliyyatın bu istifadəçiyə icazəli olduğunu təsdiqlə (məs. yazı onundurmu?).",
            "Təhlükəsizlik — validasiya: arqumentlərin TypeScript tipi icra zamanı heç nə yoxlamır. formData və arqumentləri serverdə yenidən yoxla (zod və ya əl ilə).",
            "Təhlükəsizlik — gizli sahələr: <input type=\"hidden\" name=\"istifadeciId\"> dəyərinə etibar etmə — istifadəçi dəyişə bilər. Kimliyi sessiyadan götür. bind ilə ötürülən arqumentlər də müştəridən gəlir.",
            "Təhlükəsizlik — CSRF: action-lar yalnız POST qəbul edir və Next.js Origin ilə Host-u müqayisə edir. Reverse proxy arxasındasansa, serverActions.allowedOrigins-i dəqiq yaz — * qoyma.",
            "Qaytarılan dəyər brauzerə gedir — bütöv baza sətrini yox, yalnız lazım olanı qaytar.",
            "Action-lar ardıcıl icra olunur (bir-birini gözləyir) — məlumat çəkmək üçün işlətmə, yalnız mutasiya üçün. Optimistik UI üçün useOptimistic var.",
            "Mütərəqqi təkmilləşmə (progressive enhancement): <form action={...}> JS-siz də işləyir; onClick ilə çağırılan action isə yox.",
          ]},
          { t: "code", lang: "ts", caption: "Təhlükəsiz action qəlibi", code: `"use server";
import { sessiyaAl } from "@/lib/dal";

export async function yaziSil(yaziId: string) {
  const sessiya = await sessiyaAl();           // 1. kimdir?
  if (!sessiya) throw new Error("Giriş lazımdır");

  if (!/^[a-z0-9]{8,32}$/.test(yaziId)) return; // 2. giriş düzgündür?

  const yazi = await db.yazi.tap(yaziId);
  if (yazi?.muellifId !== sessiya.istifadeciId) { // 3. icazəsi var?
    throw new Error("İcazə yoxdur");
  }

  await db.yazi.sil(yaziId);
  updateTag("yazilar");
}` },
          { t: "qa", items: [
            ["Server Action ilə Route Handler fərqi?", "Action — öz UI-ndən çağırılan mutasiya (forma, düymə), yalnız POST; Route Handler — istənilən metod, kənar müştərilər üçün açıq API."],
            ["Niyə action-da icazə yoxlaması məcburidir?", "Action açıq POST nöqtəsidir — səhifədəki yoxlama onu qorumur, birbaşa çağırıla bilər."],
            ["updateTag ilə revalidateTag fərqi?", "updateTag yalnız action-da işləyir və keşi dərhal silir (öz yazdığını oxu); revalidateTag köhnəni göstərib fonda yeniləyir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Server Action-ı harada çağırmaq olar?", options: ["Yalnız Server Component-də", "Formanın action-ında və Client Component hadisəsində", "Yalnız route.ts-də"], answer: 1, why: "Action həm <form action>, həm də client hadisəsindən çağırıla bilər." },
          { t: "quiz", q: "Gizli input-dakı istifadeciId-yə etibar etmək olar?", options: ["Bəli, gizlidir", "Xeyr, istifadəçi dəyişə bilər", "Yalnız HTTPS-də"], answer: 1, why: "Brauzerdən gələn hər şey dəyişdirilə bilər; kimlik sessiyadan götürülür." },
        ],
      },
    ],
    exercise: {
      task: "«Tapşırıq əlavə et» funksionallığı yaz (iki fayl). actions.ts: tapsiriqElaveEt(evvelki, formData) — sessiyaAl() ilə girişi yoxlasın (yoxdursa xəta mesajı qaytarsın), «metn» sahəsini trim edib 3–120 simvol yoxlasın, db.tapsiriq.yarat çağırsın (sahib — sessiyadan), keşi etibarsız etsin və { ugur: true } qaytarsın. Forma.tsx: useActionState ilə forma, gözləmə zamanı düymə disabled, xəta role=\"alert\" ilə.",
      starter: `// app/tapsiriqlar/actions.ts\n"use server";\nimport { sessiyaAl } from "@/lib/dal";\n\n// bura\n\n// app/tapsiriqlar/Forma.tsx\n`,
      expect: "actions.ts başında \"use server\"; sessiya yoxlanır; metn String + trim + uzunluq yoxlaması serverdə; istifadeciId formadan YOX, sessiyadan; updateTag və ya revalidatePath çağırılır; Forma \"use client\" + useActionState(action, ilkin); button disabled={pending}; xəta role=\"alert\"; redirect try/catch içində deyil.",
    },
  },
  {
    slug: "kesh",
    title: "Keşləmə və revalidasiya",
    intro: "Keş — bir dəfə hesablanmış nəticəni saxlayıb növbəti sorğularda hazır verməkdir. Next.js 16-da keş açıq yazılır: nəyi keşləmək istəyirsənsə, ora \"use cache\" direktivi qoyursan.",
    sections: [
      {
        level: "baslangic",
        title: "\"use cache\"",
        blocks: [
          { t: "analogy", text: "Çayxananı düşün. Hər müştəri üçün ayrıca samovar qaynatmırsan — bir dəfə dəmləyirsən, hamıya ondan süzürsən (keş). Amma dəm köhnəlir: müəyyən vaxtdan sonra təzəsini dəmləyirsən (revalidasiya). Kimsə «çay bitdi» desə, dərhal təzələyirsən (tələblə revalidasiya)." },
          { t: "code", lang: "ts", caption: "next.config.ts — Cache Components aktiv olmalıdır", code: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;` },
          { t: "code", lang: "ts", caption: "lib/data.ts — funksiyanın nəticəsini keşlə", code: `import { cacheLife, cacheTag } from "next/cache";

export async function kurslariAl() {
  "use cache";
  cacheLife("hours");   // nə qədər təzə sayılır
  cacheTag("kurslar");  // sonradan adı ilə etibarsız etmək üçün

  return db.kurs.hamisi();
}` },
          { t: "terms", items: [
            ["keş (cache)", "nəticənin saxlanıb təkrar istifadəsi."],
            ["\"use cache\"", "async funksiyanın və ya komponentin nəticəsini keşləyən direktiv."],
            ["cacheLife", "keşin ömrü; hazır profillər: seconds, minutes, hours, days, weeks, max."],
            ["cacheTag", "keş yazısına ad (teq) verir."],
            ["revalidasiya", "köhnəlmiş keşin yenilənməsi."],
          ]},
          { t: "tip", text: "Hər \"use cache\"-in yanında cacheLife yaz. Yazmasan, default profil işləyir — ömrü sənin fikirləşdiyin kimi olmaya bilər." },
        ],
      },
      {
        level: "orta",
        title: "Təzələmək: vaxtla və tələblə",
        blocks: [
          { t: "code", lang: "ts", caption: "Mutasiyadan sonra keşi etibarsız et", code: `"use server";
import { updateTag, revalidateTag, revalidatePath } from "next/cache";

export async function kursYarat(formData: FormData) {
  await db.kurs.yarat({ ad: String(formData.get("ad")) });

  updateTag("kurslar");            // dərhal: istifadəçi öz dəyişikliyini görür
  // revalidateTag("kurslar", "max"); // fonda: köhnəni göstər, arxada yenilə
  // revalidatePath("/kurslar");      // teq bilinmirsə — bütün yolu
}` },
          { t: "code", lang: "text", caption: "Hansını seçməli?", code: `updateTag(teq)             yalnız Server Action   keşi dərhal silir
revalidateTag(teq, "max")  Action + Route Handler köhnəni verir, fonda yeniləyir
revalidatePath(yol)        Action + Route Handler həmin yolun bütün keşi` },
          { t: "code", lang: "tsx", caption: "Bir səhifədə: statik qabıq + keşli hissə + canlı hissə", code: `import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <h1>Mağaza</h1>                {/* statik qabıq */}
      <MehsulSiyahisi />             {/* "use cache" — keşdən */}
      <Suspense fallback={<p>Səbət…</p>}>
        <Sebet />                    {/* cookies oxuyur — hər sorğuda */}
      </Suspense>
    </>
  );
}` },
          { t: "mistake", lang: "ts", wrong: `export async function profilAl() {
  "use cache";
  const c = await cookies(); // XƏTA: keşli funksiyada runtime API
  return db.istifadeci.tap(c.get("sid")?.value);
}`, right: `export async function profilAl(istifadeciId: string) {
  "use cache";
  cacheLife("minutes");
  return db.istifadeci.tap(istifadeciId); // id keş açarına düşür
}
// çağıran yerdə: const s = await sessiyaAl(); profilAl(s.istifadeciId)`, why: "Keşli funksiya cookies/headers oxuya bilməz. Dəyəri kənarda oxu və arqument kimi ötür — arqumentlər keş açarının hissəsidir." },
          { t: "mistake", lang: "tsx", wrong: `export default async function Page() {
  const c = await cookies(); // Suspense yoxdur → bütün səhifə bloklanır
  return <Panel tema={c.get("tema")?.value} />;
}`, right: `export default function Page() {
  return (
    <Suspense fallback={<Skelet />}>
      <TemaliPanel />
    </Suspense>
  );
}`, why: "Runtime məlumatı (cookies, headers, searchParams) oxuyan hissəni Suspense-ə bürü — qalan səhifə statik qabıq kimi dərhal göndərilir." },
        ],
      },
      {
        level: "senior",
        title: "Keş açarı, köhnəlmə modeli və məlumat sızması",
        blocks: [
          { t: "p", text: "cacheLife üç dəyər idarə edir: stale — brauzer keşi nə qədər yoxlamadan işlədir; revalidate — serverdə nə vaxtdan sonra fonda yenilənir; expire — nə vaxtdan sonra köhnə nəticə heç verilmir. Məsələn hours profili: stale 5 dəq, revalidate 1 saat, expire 1 gün." },
          { t: "list", items: [
            "Keş açarı: funksiyanın kimliyi + arqumentlər + kənardan tutulan (closure) dəyərlər. Fərqli giriş — ayrı keş yazısı.",
            "Qısa ömürlü keş (seconds profili, expire < 5 dəq) əvvəlcədən render-ə düşmür — həmin hissə dinamik olur.",
            "Fayl başında \"use cache\" yazsan, fayldakı bütün ixraclar keşlənir. Komponenti də keşləmək olar; children keşə daxil olmadan ötürülür.",
            "Xidmətlərarası keş: çox instansiyalı serverdə yaddaş keşi hər instansiyada ayrıdır. \"use cache: remote\" və ya xüsusi cacheHandler ilə ortaq saxlanca (məs. Redis) keçilir.",
            "Köhnə model (Cache Components olmadan): fetch(url, { next: { revalidate: 60, tags: [...] } }) və unstable_cache. Köhnə layihədə bunları görəcəksən.",
            "Təhlükəsizlik — keş zəhərlənməsi/sızması: istifadəçiyə məxsus məlumatı ümumi açarla keşləmə. İstifadəçi id-si arqument OLMALIDIR, yoxsa bir nəfərin profili hamıya göstərilər.",
            "Təhlükəsizlik: şəxsi məlumat üçün \"use cache: private\" (yalnız brauzer yaddaşında) və ya ümumiyyətlə keşləməmək seçimini düşün. CDN-də şəxsi cavabı public keşləmə.",
            "Təhlükəsizlik: icazə yoxlamasını keşli funksiyanın İÇİNƏ qoyma — ilk çağıranın icazəsi ilə nəticə keşlənər. Əvvəl yoxla, sonra keşli funksiyanı çağır.",
          ]},
          { t: "qa", items: [
            ["updateTag nə vaxt, revalidateTag nə vaxt?", "İstifadəçi öz dəyişikliyini dərhal görməlidirsə — updateTag (yalnız action). Kiçik gecikmə olarsa, məs. webhook-dan — revalidateTag(teq, \"max\")."],
            ["Niyə keşli funksiya cookies oxuya bilmir?", "Nəticə bütün istifadəçilər üçün paylaşılır; sorğuya məxsus məlumat keşə düşsə, başqasına göstərilərdi. Dəyər arqument kimi ötürülməlidir."],
            ["Stale-while-revalidate nədir?", "Köhnə nəticə dərhal verilir, təzəsi fonda hazırlanır; növbəti sorğu təzəsini alır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yeni kurs yaratdın, amma siyahıda görünmür. Səbəb?", options: ["Baza yavaşdır", "Keş etibarsız edilməyib", "Brauzer köhnədir"], answer: 1, why: "Mutasiyadan sonra updateTag/revalidateTag/revalidatePath çağırılmalıdır." },
          { t: "quiz", q: "İstifadəçinin sifarişlərini keşləyirsən. Keş açarında nə olmalıdır?", options: ["Heç nə", "İstifadəçi id-si (arqument kimi)", "Cari tarix"], answer: 1, why: "Yoxsa bir istifadəçinin məlumatı başqasına göstərilər." },
        ],
      },
    ],
    exercise: {
      task: "Blog üçün iki funksiya yaz. 1) yazilariAl() — \"use cache\", ömrü saatlarla, teq \"yazilar\". 2) Server Action yaziYarat(formData) — başlığı yoxlasın (3–100 simvol), db.yazi.yarat çağırsın, müəllif öz yazısını DƏRHAL görsün deyə keşi etibarsız etsin, sonra /blog-a yönləndirsin.",
      starter: `// lib/data.ts\nimport { cacheLife, cacheTag } from "next/cache";\n\n// bura\n\n// app/blog/actions.ts\n"use server";\n`,
      expect: "yazilariAl async, gövdəsinin ilk sətri \"use cache\", cacheLife(\"hours\"), cacheTag(\"yazilar\"); içində cookies/headers yoxdur; yaziYarat \"use server\" faylında, başlıq trim + uzunluq yoxlaması; updateTag(\"yazilar\") (revalidateTag yox — dərhal görünməlidir); redirect(\"/blog\") try/catch-dən kənarda və updateTag-dan sonra.",
    },
  },
  {
    slug: "metadata",
    title: "Metadata və SEO",
    intro: "Metadata — səhifə haqqında məlumatdır: başlıq, təsvir, paylaşım şəkli. Next.js-də <head> teqini əl ilə yazmırsan — metadata obyekti və ya generateMetadata funksiyası ixrac edirsən.",
    sections: [
      {
        level: "baslangic",
        title: "metadata obyekti",
        blocks: [
          { t: "analogy", text: "Metadata — kitabın üz qabığıdır. Mağazada (Google) insanlar kitabın içini oxumur, əvvəl qabığa baxır: adı, qısa təsviri, şəkli. Qabıq zəifdirsə, içi nə qədər yaxşı olsa da kitabı götürən olmur." },
          { t: "code", lang: "tsx", caption: "app/layout.tsx — bütün sayt üçün", code: `import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://kodakademiyasi.az"),
  title: {
    default: "Kod Akademiyası",
    template: "%s | Kod Akademiyası", // alt səhifələr: "HTML | Kod Akademiyası"
  },
  description: "Front End və Back End-i Azərbaycanca öyrən.",
};` },
          { t: "code", lang: "tsx", caption: "app/kurslar/page.tsx — səhifəyə məxsus", code: `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurslar",
  description: "HTML-dən Next.js-ə qədər bütün kurslar.",
};` },
          { t: "terms", items: [
            ["metadata", "layout və ya page-dən ixrac olunan obyekt; Next.js ondan <head> teqlərini yaradır."],
            ["title.template", "alt səhifələrin başlığına şablon; %s yerinə səhifənin title-ı düşür."],
            ["description", "axtarış nəticəsində başlığın altında görünən mətn (~150 simvol)."],
            ["metadataBase", "nisbi URL-lərin (məs. şəkil) tam ünvana çevrilməsi üçün əsas domen."],
          ]},
          { t: "tip", text: "metadata yalnız Server Component-dən ixrac olunur. \"use client\" olan page.tsx-də işləmir." },
        ],
      },
      {
        level: "orta",
        title: "generateMetadata, Open Graph, sitemap",
        blocks: [
          { t: "code", lang: "tsx", caption: "Dinamik səhifə üçün — məlumata görə", code: `import type { Metadata } from "next";
import { yaziAl } from "@/lib/data";

export async function generateMetadata(
  { params }: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await params;
  const yazi = await yaziAl(slug); // React.cache ilə — page ilə bir sorğu
  if (!yazi) return { title: "Tapılmadı" };

  return {
    title: yazi.basliq,
    description: yazi.xulase,
    alternates: { canonical: "/blog/" + slug },
    openGraph: {
      title: yazi.basliq,
      description: yazi.xulase,
      type: "article",
      images: [{ url: yazi.sekil, width: 1200, height: 630 }],
    },
  };
}` },
          { t: "code", lang: "ts", caption: "app/sitemap.ts → /sitemap.xml", code: `import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const yazilar = await butunYazilar();
  return [
    { url: "https://kodakademiyasi.az", lastModified: new Date() },
    ...yazilar.map((y) => ({
      url: "https://kodakademiyasi.az/blog/" + y.slug,
      lastModified: y.yenilendi,
    })),
  ];
}` },
          { t: "code", lang: "ts", caption: "app/robots.ts → /robots.txt", code: `import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/panel/", "/api/"] },
    sitemap: "https://kodakademiyasi.az/sitemap.xml",
  };
}` },
          { t: "mistake", lang: "tsx", wrong: `export default function Page() {
  return (
    <>
      <head><title>Kurslar</title></head>
      <h1>Kurslar</h1>
    </>
  );
}`, right: `export const metadata: Metadata = { title: "Kurslar" };

export default function Page() {
  return <h1>Kurslar</h1>;
}`, why: "<head>-i əl ilə yazmaq layout-dakı teqlərlə toqquşur və təkrarlar yaradır. Metadata API birləşdirməni özü edir." },
          { t: "mistake", lang: "tsx", wrong: `// hər səhifədə eyni
export const metadata = { title: "Kod Akademiyası", description: "Sayt" };`, right: `export const metadata = {
  title: "CSS Grid dərsi",
  description: "CSS Grid ilə iki ölçülü düzülüş: sütunlar, sətirlər, sahələr.",
};`, why: "Təkrarlanan başlıq və təsvir SEO-nu zəiflədir: Google səhifələri ayırd edə bilmir. Hər səhifənin özünəməxsus metadata-sı olsun." },
        ],
      },
      {
        level: "senior",
        title: "Fayl əsaslı metadata, JSON-LD, təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Fayl konvensiyaları: app/favicon.ico, icon.png, apple-icon.png, opengraph-image.png (və ya .tsx — ImageResponse ilə kodla şəkil yaratmaq), manifest.ts.",
            "Metadata birləşir: kökdən yarpağa doğru, eyni açarı aşağıdakı əvəz edir. openGraph obyekti dərin birləşmir — tam yenidən yazılmalıdır.",
            "Dinamik səhifələrdə metadata axınla gəlir və UI-ni bloklamır; botlar üçün Next.js onu HTML-in başına qoyur.",
            "viewport və themeColor ayrıca ixracdır: export const viewport: Viewport = {...} (metadata-nın içində yox).",
            "Dublikat məzmun: filtr/sıralama parametrli səhifələrdə alternates.canonical ilə əsas ünvanı göstər.",
            "Strukturlu məlumat (JSON-LD): məhsul, məqalə, FAQ üçün <script type=\"application/ld+json\"> — axtarışda zəngin nəticə verir.",
            "Təhlükəsizlik — JSON-LD XSS: JSON.stringify </script> ardıcıllığını neytrallaşdırmır. İstifadəçi məzmunu varsa, < simvolunu \\u003c ilə əvəz et.",
            "Təhlükəsizlik: robots.txt gizlətmə vasitəsi DEYİL — hər kəs oxuya bilir və disallow siyahısı hücumçuya gizli yolları göstərir. Qorunan səhifəni autentifikasiya ilə qoru, noindex üçün robots: { index: false } ver.",
            "Təhlükəsizlik: daxili panel, sınaq (staging) mühiti və istifadəçi profilləri indekslənməsin; title/description-a şəxsi məlumat (email, sifariş nömrəsi) yazma.",
          ]},
          { t: "code", lang: "tsx", caption: "Təhlükəsiz JSON-LD", code: `export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const yazi = await yaziAl(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: yazi.basliq,
    datePublished: yazi.tarix,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\\\u003c"),
        }}
      />
      <h1>{yazi.basliq}</h1>
    </article>
  );
}` },
          { t: "qa", items: [
            ["metadata ilə generateMetadata fərqi?", "metadata — statik obyekt; generateMetadata — params və ya çəkilən məlumata görə dinamik hesablayan async funksiya. Bir faylda ikisi birlikdə olmaz."],
            ["Canonical URL nə üçündür?", "Eyni məzmun bir neçə ünvanda açılanda axtarış sisteminə əsas ünvanı göstərir — dublikat cəzasının qarşısını alır."],
            ["robots.txt səhifəni qoruyurmu?", "Xeyr. O yalnız botlara xahişdir. Qoruma autentifikasiya ilə olur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "title.template: \"%s | Sayt\", səhifədə title: \"Əlaqə\". Nəticə?", options: ["Sayt", "Əlaqə | Sayt", "%s | Sayt"], answer: 1, why: "%s yerinə səhifənin başlığı qoyulur." },
          { t: "quiz", q: "/sitemap.xml yaratmaq üçün hansı fayl?", options: ["public/sitemap.tsx", "app/sitemap.ts", "next.config.ts"], answer: 1, why: "app/sitemap.ts xüsusi fayl konvensiyasıdır." },
        ],
      },
    ],
    exercise: {
      task: "Məhsul səhifəsi üçün generateMetadata yaz: params-dan id al, mehsulAl(id) ilə məhsulu çək; tapılmasa title \"Məhsul tapılmadı\" və indekslənməsin; tapılsa title — məhsulun adı, description — təsvirin ilk 150 simvolu, canonical ünvan və Open Graph şəkli (1200×630).",
      starter: `import type { Metadata } from "next";\nimport { mehsulAl } from "@/lib/data";\n\nexport async function generateMetadata(\n  { params }: PageProps<"/mehsul/[id]">,\n): Promise<Metadata> {\n  // bura\n}\n`,
      expect: "params await olunur; tapılmayanda title və robots: { index: false }; tapılanda title, description slice(0, 150), alternates.canonical, openGraph.images url + width 1200 + height 630; <head> əl ilə yazılmayıb; any yoxdur.",
    },
  },
  {
    slug: "sekil-font",
    title: "Şəkil və font optimizasiyası",
    intro: "Şəkillər adətən səhifənin ən ağır hissəsidir, fontlar isə mətnin «sıçramasına» səbəb olur. Next.js-in <Image> komponenti və next/font modulu bu işi avtomatik görür.",
    sections: [
      {
        level: "baslangic",
        title: "<Image>",
        blocks: [
          { t: "analogy", text: "Adi <img> — hamıya eyni ölçüdə kostyum verməkdir: uşağa da, böyüyə də XL. <Image> — dərzidir: hər ekrana öz ölçüsündə şəkil tikir, müasir formatda (WebP/AVIF) verir və yalnız ekrana yaxınlaşanda gətirir." },
          { t: "code", lang: "tsx", code: `import Image from "next/image";
import muellim from "./muellim.jpg"; // lokal fayl: ölçü avtomatik bilinir

export default function Page() {
  return (
    <>
      <Image src={muellim} alt="Müəllim Aysel dərs deyir" placeholder="blur" />

      <Image
        src="/banner.jpg"       // public/banner.jpg
        alt="Yay kursları — 30% endirim"
        width={1200}
        height={400}
        preload                 // yuxarıdakı əsas şəkil: gözləmədən yüklə
      />
    </>
  );
}` },
          { t: "terms", items: [
            ["next/image", "şəkli ölçüləndirən, formatını çevirən və tənbəl yükləyən komponent."],
            ["width / height", "şəklin nisbəti üçün; yer əvvəlcədən ayrılır, səhifə sıçramır."],
            ["lazy loading", "şəklin yalnız ekrana yaxınlaşanda yüklənməsi (default)."],
            ["preload", "əsas (LCP) şəkli dərhal yükləmək; Next 16-da köhnə priority-ni əvəz edir."],
            ["alt", "şəklin mətn təsviri — məcburidir."],
          ]},
          { t: "tip", text: "Səhifədə yalnız bir, ən çox iki şəklə preload ver — ekranın yuxarısında görünən ən böyük şəklə. Hamısına versən, heç birinin üstünlüyü qalmır." },
        ],
      },
      {
        level: "orta",
        title: "Uzaq şəkillər, fill, sizes və fontlar",
        blocks: [
          { t: "code", lang: "ts", caption: "next.config.ts — uzaq şəkil mənbələrinə icazə", code: `const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.kodakademiyasi.az", pathname: "/sekiller/**" },
    ],
  },
};` },
          { t: "code", lang: "tsx", caption: "Ölçüsü bilinməyən şəkil: fill + sizes", code: `<div className="relative aspect-video">
  <Image
    src={kurs.sekil}
    alt={kurs.ad + " kursunun üz şəkli"}
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-cover"
  />
</div>` },
          { t: "code", lang: "tsx", caption: "app/layout.tsx — next/font", code: `import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="az" className={inter.variable + " " + mono.variable}>
      <body>{children}</body>
    </html>
  );
}` },
          { t: "p", text: "next/font fontu build zamanı yükləyib öz serverindən verir: Google-a sorğu getmir, font yüklənənə qədər mətn sıçramır. Azərbaycan hərfləri (ə, ğ, ı, ş) üçün latin-ext alt çoxluğunu əlavə et." },
          { t: "mistake", lang: "tsx", wrong: `<Image src="/kart.jpg" alt="" fill />
// sizes yoxdur → mobil-də də tam enli şəkil yüklənir`, right: `<Image src="/kart.jpg" alt="" fill
  sizes="(max-width: 768px) 100vw, 400px" />`, why: "fill ilə sizes yazılmasa, brauzer şəklin 100vw olduğunu güman edir və lazımsız böyük fayl yükləyir." },
          { t: "mistake", lang: "tsx", wrong: `<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />`, right: `import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin", "latin-ext"] });`, why: "Xarici <link> əlavə şəbəkə sorğusudur, render-i bloklayır, mətn sıçrayır, CSP-ni genişləndirir və istifadəçinin IP-sini üçüncü tərəfə verir." },
        ],
      },
      {
        level: "senior",
        title: "Core Web Vitals və şəkil xidmətinin təhlükəsizliyi",
        blocks: [
          { t: "list", items: [
            "LCP: əsas şəkil — preload, düzgün sizes, lazy YOX. CLS: width/height və ya aspect-ratio konteyner; next/font size-adjust ilə font dəyişimində sürüşməni sıfırlayır.",
            "Şəkil optimizatoru /_next/image nöqtəsidir: tələblə ölçüləndirir və keşləyir. Öz serverində bu CPU və disk yeyir — çox şəkil varsa, xarici loader (Cloudinary, imgix) və ya CDN düşün.",
            "Statik eksportda (output: \"export\") default optimizator işləmir — unoptimized və ya xüsusi loader lazımdır.",
            "Dekorativ şəkil: alt=\"\". SVG ikonlar üçün <Image> lazım deyil — birbaşa JSX kimi yaz.",
            "Dəyişən font (variable font) işlət: bir fayl bütün qalınlıqları verir. Yalnız lazım olan subset və weight-ləri seç.",
            "Təhlükəsizlik — remotePatterns: hostname-ə ** və ya geniş şablon yazma. Əks halda optimizatorun açıq proxy olur: hər kəs sənin serverinlə istənilən şəkli çəkdirir (trafik oğurluğu, SSRF, DoS). Protokol + dəqiq host + pathname yaz.",
            "Təhlükəsizlik — SVG: SVG-nin içində skript ola bilər. İstifadəçi yüklədiyi SVG-ni göstərmə; dangerouslyAllowSVG-ni yalnız zərurətdə, sərt CSP ilə aç.",
            "Təhlükəsizlik — yükləmələr: istifadəçi şəklini public/ qovluğuna yazma. Ayrı saxlanc (S3 və s.), tip və ölçü yoxlaması, təsadüfi ad, ayrı domen.",
          ]},
          { t: "qa", items: [
            ["<Image> <img>-dən nə ilə üstündür?", "Avtomatik srcset, müasir format, lazy loading, yer ayırma (CLS yox), tələblə ölçüləndirmə və keş."],
            ["sizes nə üçündür?", "Brauzerə şəklin ekranda nə qədər yer tutacağını deyir ki, srcset-dən uyğun ölçünü seçsin."],
            ["Niyə remotePatterns dar olmalıdır?", "Geniş şablon optimizatoru açıq proxy edir: başqaları sənin resursunla şəkil emal etdirir və daxili ünvanlara sorğu göndərtməyə cəhd edir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Səhifənin yuxarısındakı əsas bannerə hansı prop verilir?", options: ["loading=\"lazy\"", "preload", "unoptimized"], answer: 1, why: "LCP şəkli gözləmədən yüklənməlidir." },
          { t: "quiz", q: "width və height nə üçün vacibdir?", options: ["Şəkli böyütmək üçün", "Yer ayrılır, səhifə sıçramır", "Faylı kiçiltmək üçün"], answer: 1, why: "Nisbət əvvəlcədən bilinir — CLS olmur." },
        ],
      },
    ],
    exercise: {
      task: "Kurs kartları səhifəsi yaz: yuxarıda banner (1200×400, dərhal yüklənsin), altında kurslar massivindən kartlar — hər kartda nisbəti 16:9 olan konteynerdə fill şəkil (mobil-də tam en, böyük ekranda 3 sütun), mənalı alt mətni və kursun adı. Faylın sonunda şərhdə bu şəkillər üçün remotePatterns nümunəsini yaz (yalnız https://cdn.misal.az/kurslar/**).",
      starter: `import Image from "next/image";\n\nconst kurslar = [\n  { id: 1, ad: "HTML", sekil: "https://cdn.misal.az/kurslar/html.jpg" },\n  { id: 2, ad: "CSS", sekil: "https://cdn.misal.az/kurslar/css.jpg" },\n];\n\nexport default function Page() {\n  // bura\n}\n`,
      expect: "Banner width/height + preload (priority də qəbul, amma lazy yox); kartlarda fill, valideyn relative + aspect-video; sizes mobil 100vw, böyük ekranda ~33vw; alt kurs adına görə mənalı; map + key; remotePatterns protocol https, hostname cdn.misal.az, pathname /kurslar/** — geniş wildcard host yoxdur; <img> işlədilməyib.",
    },
  },
  {
    slug: "auth",
    title: "Autentifikasiya",
    intro: "Autentifikasiya — «sən kimsən?» sualının cavabıdır; avtorizasiya — «buna icazən varmı?». Next.js-də ikisi də serverdə, məlumatın oxunduğu və dəyişdiyi yerdə yoxlanır.",
    sections: [
      {
        level: "baslangic",
        title: "Üç addım: giriş, sessiya, icazə",
        blocks: [
          { t: "analogy", text: "Konsertə gedirsən. Girişdə biletini və şəxsiyyətini yoxlayırlar (autentifikasiya) və qoluna bilərzik taxırlar (sessiya). İçəridə hər qapıda bilərziyə baxırlar: VIP zonaya yalnız qızılı bilərziklə buraxırlar (avtorizasiya). Hər qapıda yenidən pasport soruşmurlar — amma bilərziyə HƏR qapıda baxırlar." },
          { t: "code", lang: "ts", caption: "lib/sessiya.ts — sessiya cookie-si", code: `import "server-only";
import { cookies } from "next/headers";

export async function sessiyaYarat(token: string) {
  const c = await cookies();
  c.set("sessiya", token, {
    httpOnly: true,   // JS oxuya bilmir (XSS-ə qarşı)
    secure: true,     // yalnız HTTPS
    sameSite: "lax",  // CSRF-ə qarşı
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 gün
  });
}

export async function sessiyaSil() {
  (await cookies()).delete("sessiya");
}` },
          { t: "terms", items: [
            ["autentifikasiya", "kimliyin təsdiqi (email + şifrə, Google ilə giriş və s.)."],
            ["avtorizasiya", "təsdiqlənmiş istifadəçinin nəyə icazəsi olduğunun yoxlanması."],
            ["sessiya", "girişdən sonra istifadəçini sorğular arasında tanımaq üçün saxlanan vəziyyət."],
            ["cookie", "brauzerdə saxlanan və hər sorğu ilə serverə göndərilən kiçik məlumat."],
            ["httpOnly", "cookie-ni JavaScript-dən gizlədən bayraq."],
          ]},
          { t: "tip", text: "Autentifikasiyanı sıfırdan yazma. Hazır kitabxana işlət (Auth.js, Better Auth, Clerk və s.) — şifrə heşləmə, token yeniləmə, OAuth kimi incə işləri onlar düzgün görür. Bu dərs onların arxasındakı prinsipləri öyrədir." },
        ],
      },
      {
        level: "orta",
        title: "Data Access Layer və proxy",
        blocks: [
          { t: "code", lang: "ts", caption: "lib/dal.ts — yoxlamanın tək mərkəzi", code: `import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const sessiyaAl = cache(async () => {
  const token = (await cookies()).get("sessiya")?.value;
  if (!token) return null;
  return tokenYoxla(token); // imza + müddət; { istifadeciId, rol } | null
});

export async function girisTeleb() {
  const s = await sessiyaAl();
  if (!s) redirect("/giris");
  return s;
}

export async function sifarislerim() {
  const s = await girisTeleb();
  // yalnız öz sifarişləri, yalnız lazım olan sahələr
  return db.sifaris.tap({ istifadeciId: s.istifadeciId }, ["id", "mebleg", "tarix"]);
}` },
          { t: "code", lang: "ts", caption: "proxy.ts — sürətli, optimistik yönləndirmə", code: `import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const var_ = request.cookies.has("sessiya");
  if (!var_ && request.nextUrl.pathname.startsWith("/panel")) {
    return NextResponse.redirect(new URL("/giris", request.url));
  }
}

export const config = { matcher: ["/panel/:path*"] };` },
          { t: "p", text: "proxy yalnız cookie-nin varlığına baxır — bu rahatlıqdır (giriş etməyəni dərhal yönləndirir), təhlükəsizlik deyil. Əsl yoxlama (imza, müddət, rol) DAL-da, məlumat oxunan anda edilir." },
          { t: "mistake", lang: "tsx", wrong: `"use client";
export function AdminPanel({ user }) {
  if (user.rol !== "admin") return null; // yalnız UI gizlənir
  return <button onClick={() => fetch("/api/sil", { method: "POST" })}>Sil</button>;
}`, right: `// app/api/sil/route.ts
export async function POST() {
  const s = await sessiyaAl();
  if (s?.rol !== "admin") return Response.json({ xeta: "İcazə yoxdur" }, { status: 403 });
  // ...
}`, why: "Client-dəki yoxlama yalnız görünüşdür — hücumçu API-ni birbaşa çağırır. İcazə serverdə, əməliyyatın özündə yoxlanmalıdır." },
          { t: "mistake", lang: "ts", wrong: `localStorage.setItem("token", token); // XSS olsa, oğurlanır`, right: `// serverdə: httpOnly + secure + sameSite cookie`, why: "localStorage-ı istənilən skript oxuyur. Bir XSS boşluğu bütün sessiyaları oğurlamağa bəs edir. httpOnly cookie JS-ə görünmür." },
        ],
      },
      {
        level: "senior",
        title: "Hücum səthi: hər giriş nöqtəsi qorunmalıdır",
        blocks: [
          { t: "list", items: [
            "Dörd giriş nöqtəsi var və hər biri ayrıca yoxlanır: Server Component (səhifə), Server Action, Route Handler, proxy. Birində yoxlama digərini qorumur.",
            "Layout-da yoxlama kifayət deyil: keçidlərdə layout yenidən render olunmaya bilər, action və API ondan keçmir.",
            "Şifrələr: heç vaxt açıq və ya sürətli heşlə (MD5, SHA-256) saxlama. argon2id və ya bcrypt + hər istifadəçiyə duz (salt).",
            "Sessiya növləri: stateless (imzalı/şifrəli JWT cookie-də — sürətli, amma ləğv etmək çətin) və ya bazada sessiya (cookie-də yalnız təsadüfi ID — istənilən an ləğv olunur). Girişdən və rol dəyişəndən sonra sessiya ID-sini yenilə (session fixation).",
            "Giriş forması: sorğu limiti (brute-force), eyni xəta mesajı («email və ya şifrə səhvdir» — hansının səhv olduğunu demə), sabit vaxtlı müqayisə.",
            "OAuth: state parametri (CSRF) və PKCE məcburidir; redirect_uri dəqiq ağ siyahıdan.",
            "Yönləndirmə: /giris?novbeti=... parametrini yoxla — yalnız daxili yol (open redirect).",
            "Sirlər (SESSION_SECRET) yalnız mühit dəyişənində, NEXT_PUBLIC_ prefiksi OLMADAN. Açarı dəyişmək (rotation) planın olsun.",
            "Keşlə birlikdə: istifadəçiyə məxsus məlumat ümumi keşə düşməsin; yoxlamanı keşli funksiyadan ƏVVƏL et.",
          ]},
          { t: "code", lang: "ts", caption: "Giriş action-ı — əsas qorumalar", code: `"use server";

export async function giris(_e: { xeta?: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const sifre = String(formData.get("sifre") ?? "");

  if (await limitAsildi("giris:" + email)) return { xeta: "Çox cəhd. Bir az sonra yoxla." };

  const u = await db.istifadeci.tap({ email });
  // istifadəçi yoxdursa da heşi yoxla — vaxt fərqi email-in varlığını bildirməsin
  const duz = await sifreYoxla(sifre, u?.sifreHesi ?? SAXTA_HES);
  if (!u || !duz) return { xeta: "Email və ya şifrə səhvdir" };

  await sessiyaYarat(await tokenYarat({ istifadeciId: u.id, rol: u.rol }));
  redirect("/panel");
}` },
          { t: "qa", items: [
            ["Autentifikasiya ilə avtorizasiya fərqi?", "Birincisi kimliyi təsdiqləyir (401 — giriş lazımdır); ikincisi icazəni yoxlayır (403 — icazə yoxdur)."],
            ["Niyə proxy-dəki yoxlama kifayət deyil?", "Proxy sürətli olmalıdır, baza sorğusu etmir və matcher-dən kənar yollar, action-lar ondan yan keçə bilər. O, optimistik yönləndirmədir; əsl yoxlama DAL-dadır."],
            ["httpOnly, secure, sameSite nə edir?", "httpOnly — JS oxuya bilmir (XSS); secure — yalnız HTTPS; sameSite — başqa saytdan gələn sorğuda göndərilmir (CSRF)."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Sessiya tokenini harada saxlamaq ən təhlükəsizdir?", options: ["localStorage", "httpOnly cookie", "URL parametri"], answer: 1, why: "httpOnly cookie JavaScript-dən oxunmur." },
          { t: "quiz", q: "Admin düyməsini client-də gizlətdin. Bu kifayətdir?", options: ["Bəli", "Xeyr, serverdə də yoxlanmalıdır", "Yalnız production-da"], answer: 1, why: "API birbaşa çağırıla bilər — UI gizlətmək qoruma deyil." },
          { t: "quiz", q: "Giriş etmiş, amma icazəsi olmayan istifadəçiyə hansı status?", options: ["401", "403", "404"], answer: 1, why: "403 Forbidden — kimlik bəllidir, icazə yoxdur." },
        ],
      },
    ],
    exercise: {
      task: "lib/dal.ts faylı yaz: 1) sessiyaAl() — cookie-dən «sessiya» tokenini oxuyub tokenYoxla ilə yoxlasın (React.cache ilə bir sorğuda bir dəfə); 2) girisTeleb() — sessiya yoxdursa /giris-ə yönləndirsin; 3) adminTeleb() — rol admin deyilsə xəta atsın; 4) profilim() — cari istifadəçinin yalnız ad və email sahələrini qaytarsın. Fayl client-ə import oluna bilməsin.",
      starter: `import { cookies } from "next/headers";\nimport { redirect } from "next/navigation";\nimport { tokenYoxla } from "./token";\n\n// bura\n`,
      expect: "Başında import \"server-only\"; sessiyaAl cache(...) ilə sarınıb, cookies() await olunur, token yoxdursa null; girisTeleb redirect(\"/giris\"); adminTeleb rol yoxlayır və xəta atır/403; profilim girisTeleb çağırır, id sessiyadan götürülür (arqumentdən yox), yalnız ad və email qaytarılır (şifrə heşi yox); any yoxdur.",
    },
  },
  {
    slug: "deploy",
    title: "Deploy",
    intro: "Deploy — saytı öz kompüterindən internetə çıxarmaqdır. Next.js tətbiqini hazır platformaya (Vercel), öz Node.js serverinə, Docker konteynerinə və ya statik fayllar kimi yerləşdirmək olar.",
    sections: [
      {
        level: "baslangic",
        title: "build və start",
        blocks: [
          { t: "analogy", text: "npm run dev — mətbəxdə sınaq bişirməkdir: hər şey açıqdır, yavaşdır, dəyişiklik dərhal görünür. npm run build — yeməyi qablaşdırmaqdır: hər şey sıxılır, yoxlanır, hazır hala gəlir. npm run start — qablaşdırılmış yeməyi müştəriyə təqdim etməkdir." },
          { t: "code", lang: "bash", code: `npm run build   # production yığımı: tip yoxlaması, optimizasiya, əvvəlcədən render
npm run start   # yığılmış tətbiqi işə sal (default port 3000)` },
          { t: "code", lang: "text", caption: "Vercel ilə ən sadə yol", code: `1. Kodu GitHub-a göndər (git push).
2. vercel.com → Add New → Project → repozitoriyanı seç (Import).
3. Environment Variables bölməsinə sirləri yaz (məs. GEMINI_API_KEY).
4. Deploy. Bundan sonra hər push avtomatik yeni versiya yaradır;
   hər Pull Request öz önizləmə (preview) ünvanını alır.` },
          { t: "terms", items: [
            ["deploy", "tətbiqin serverə yerləşdirilib istifadəyə verilməsi."],
            ["build", "mənbə kodundan optimallaşdırılmış production versiyasının yığılması."],
            ["mühit dəyişəni (environment variable)", "koddan kənarda saxlanan ayar və ya sirr; process.env.AD ilə oxunur."],
            ["preview deploy", "hər dəyişiklik üçün ayrıca sınaq ünvanı."],
          ]},
          { t: "tip", text: "Deploydan əvvəl lokalda npm run build işlət. Dev rejimində işləyən kod build-də tip və ya render xətası verə bilər." },
        ],
      },
      {
        level: "orta",
        title: "Mühit dəyişənləri və yerləşdirmə yolları",
        blocks: [
          { t: "code", lang: "bash", caption: ".env.local — yalnız lokal, git-ə DÜŞMÜR", code: `# Yalnız server (sirr)
DATABASE_URL=postgres://...
GEMINI_API_KEY=...

# Brauzerə də gedir — yalnız açıq dəyərlər
NEXT_PUBLIC_SAYT_URL=https://kodakademiyasi.az` },
          { t: "code", lang: "text", caption: "Dörd yerləşdirmə yolu", code: `Platforma (Vercel və s.)   ən asan; bütün imkanlar; avtomatik miqyas
Node.js serveri            next build + next start; bütün imkanlar; idarə səndə
Docker                     output: "standalone" → kiçik image; istənilən bulud
Statik eksport             output: "export" → yalnız HTML/CSS/JS; server imkanları YOXDUR` },
          { t: "code", lang: "dockerfile", caption: "Dockerfile (qısaldılmış) — next.config-də output: \"standalone\"", code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]` },
          { t: "mistake", lang: "bash", wrong: `git add .env.local
git commit -m "ayarlar"`, right: `# .gitignore
.env*.local

# sirlər platformanın Environment Variables bölməsində`, why: "Git tarixçəsinə düşən sirr oradan silinmir — repozitoriya açıqdırsa, botlar dəqiqələr içində tapır. Açar sızıbsa, dərhal ləğv edib yenisini yarat." },
          { t: "mistake", lang: "ts", wrong: `const acar = process.env.NEXT_PUBLIC_GEMINI_API_KEY;`, right: `// yalnız server faylında (route.ts, action, "server-only")
const acar = process.env.GEMINI_API_KEY;`, why: "NEXT_PUBLIC_ dəyişənləri build zamanı JS paketinə mətn kimi yazılır — hər ziyarətçi görür. Sirr üçün bu prefiks qadağandır." },
        ],
      },
      {
        level: "senior",
        title: "Production yoxlama siyahısı",
        blocks: [
          { t: "list", items: [
            "Öz serverində (self-hosting): çox instansiya varsa keş hər birində ayrıdır — ortaq cacheHandler qur; şəkil optimizasiyası CPU yeyir; qarşıya reverse proxy (nginx) və ya CDN qoy; build ID və deployment ID-ni instansiyalar arasında eyni saxla.",
            "Platforma adapterləri: Next.js Adapter API ilə fərqli platformalara uyğunlaşır (Vercel və Bun təsdiqlənmiş adapterlərdir; digərləri öz inteqrasiyalarını təqdim edir).",
            "Statik eksportda işləməyənlər: Server Actions, proxy, cookies/headers, default şəkil optimizatoru, tələblə revalidasiya.",
            "Müşahidə: instrumentation.ts ilə xəta izləmə (Sentry və s.) və OpenTelemetry; jurnallara sirr və şəxsi məlumat yazma.",
            "CI: hər PR-da lint + tsc + build + testlər. Build keşini (.next/cache) CI-da saxla — yığım sürətlənir.",
            "Geri qaytarma (rollback) planı: əvvəlki versiyaya bir kliklə dönə bilməlisən; baza miqrasiyaları geriyə uyğun olsun.",
            "Təhlükəsizlik başlıqları (next.config-də headers): Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options: nosniff, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy; poweredByHeader: false.",
            "Təhlükəsizlik: preview deploy-lar da internetə açıqdır — production bazasına və açarlarına bağlama, parolla qoru. Hər mühitin öz sirləri olsun.",
            "Təhlükəsizlik: asılılıqları yenilə (npm audit, Dependabot), package-lock.json-u commit et, npm ci işlət. Docker-də root istifadəçi ilə işləmə. productionBrowserSourceMaps-i açıq qoyma.",
            "Təhlükəsizlik: HTTPS məcburi (HSTS), pullu API nöqtələrinə rate limit, xəta səhifələrində stack trace göstərmə.",
          ]},
          { t: "code", lang: "ts", caption: "next.config.ts — əsas təhlükəsizlik başlıqları", code: `const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};` },
          { t: "qa", items: [
            ["output: \"standalone\" nə edir?", "Yalnız lazım olan faylları və minimal node_modules-u .next/standalone qovluğuna yığır — Docker image kiçilir."],
            ["Statik eksportun məhdudiyyəti?", "Server tələb edən heç nə işləmir: Server Actions, proxy, runtime API-lər, tələblə revalidasiya, default şəkil optimizatoru."],
            ["Sirr git-ə düşdü. Nə etməli?", "Dərhal açarı ləğv et və yenisini yarat (rotation). Tarixçədən silmək kifayət deyil — artıq kopyalanmış ola bilər."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "API açarı Vercel-də harada saxlanır?", options: ["Kodda sabit kimi", "Environment Variables bölməsində", "public/ qovluğunda"], answer: 1, why: "Sirlər koddan kənarda, platformanın mühit dəyişənlərində olur." },
          { t: "quiz", q: "Hansı fayl git-ə göndərilməməlidir?", options: ["package-lock.json", ".env.local", "next.config.ts"], answer: 1, why: ".env.local sirləri saxlayır və .gitignore-da olmalıdır." },
        ],
      },
    ],
    exercise: {
      task: "Deploy-a hazırlıq üçün üç fayl yaz: 1) .env.example — DATABASE_URL, SESSION_SECRET (boş dəyərlə, izahlı şərhlə) və NEXT_PUBLIC_SAYT_URL; 2) .gitignore-a lazım olan sətirlər; 3) next.config.ts — poweredByHeader söndürülsün, bütün yollara HSTS, nosniff, X-Frame-Options DENY və Referrer-Policy başlıqları verilsin.",
      starter: `# .env.example\n\n# .gitignore\n\n// next.config.ts\nimport type { NextConfig } from "next";\n`,
      expect: ".env.example-də real sirr yoxdur, yalnız açar adları; sirlərdə NEXT_PUBLIC_ prefiksi yoxdur, yalnız SAYT_URL-də var; .gitignore-da .env*.local (və ya .env.local), node_modules, .next; next.config.ts-də poweredByHeader: false və async headers() source bütün yollar, 4 başlıq düzgün dəyərlərlə; export default nextConfig.",
    },
  },
  {
    slug: "senior",
    title: "Senior: rendering strategiyaları",
    intro: "Bu dərs bölmənin yekunudur: HTML harada və nə vaxt yaranır? Statik, dinamik, axınla və qismən əvvəlcədən render — hər birinin öz yeri var. Senior mühəndis hər komponent üçün düzgün strategiyanı seçə bilir.",
    sections: [
      {
        level: "baslangic",
        title: "Dörd strategiya",
        blocks: [
          { t: "analogy", text: "Yeməkxananı düşün. Hazır qablaşdırılmış buterbrod — dərhal verilir, amma hamıya eynidir (statik). Sifarişlə bişən yemək — təzədir, amma gözləyirsən (dinamik). Hazır boşqabın üstünə isti sousu sonradan tökmək — ikisinin yaxşı tərəfi (qismən əvvəlcədən render). Çiy ərzağı evə aparıb özün bişirmək — client-də render." },
          { t: "code", lang: "text", code: `SSG   Static Site Generation     HTML build zamanı yaranır        ən sürətli; məzmun hamıya eyni
ISR   Incremental Static Regen.  statik + vaxtla/tələblə yenilənir blog, kataloq
SSR   Server-Side Rendering      HTML hər sorğuda yaranır          şəxsi, canlı məlumat
CSR   Client-Side Rendering      HTML brauzerdə JS ilə yaranır     girişdən sonrakı interaktiv hissə
PPR   Partial Prerendering       statik qabıq + axınla dinamik     Next 16-da əsas model` },
          { t: "terms", items: [
            ["prerender", "HTML-in sorğudan əvvəl (build və ya revalidasiya zamanı) hazırlanması."],
            ["statik qabıq (static shell)", "səhifənin əvvəlcədən hazırlanmış, dərhal göndərilən hissəsi."],
            ["streaming", "qalan hissələrin hazır olduqca eyni cavabda axınla göndərilməsi."],
            ["hydration", "HTML-ə brauzerdə interaktivliyin bağlanması."],
            ["TTFB", "Time To First Byte — serverdən ilk baytın gəlmə vaxtı."],
          ]},
          { t: "tip", text: "Build çıxışına bax: ○ statik, ◐ qismən əvvəlcədən render, ƒ dinamik. Gözləmədiyin ƒ görürsənsə — haradasa lazımsız runtime API oxunur." },
        ],
      },
      {
        level: "orta",
        title: "Cache Components modeli: komponent səviyyəsində qərar",
        blocks: [
          { t: "p", text: "Köhnə modeldə qərar səhifə səviyyəsində idi: səhifə ya statik, ya dinamik. Next 16-da (cacheComponents) qərar komponent səviyyəsindədir. Üç növ məzmun var və hər biri fərqli davranır:" },
          { t: "code", lang: "tsx", code: `import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { cookies } from "next/headers";

export default function Page() {
  return (
    <>
      <Basliq />                          {/* 1. statik: sinxron, məlumatsız */}
      <Mehsullar />                       {/* 2. keşli: "use cache" → qabığa düşür */}
      <Suspense fallback={<SebetSkeleti />}>
        <Sebet />                         {/* 3. dinamik: sorğu zamanı axır */}
      </Suspense>
    </>
  );
}

async function Mehsullar() {
  "use cache";
  cacheLife("hours");
  const siyahi = await db.mehsul.hamisi();
  return <ul>{siyahi.map((m) => <li key={m.id}>{m.ad}</li>)}</ul>;
}

async function Sebet() {
  const sid = (await cookies()).get("sid")?.value;
  const sebet = await sebetAl(sid);
  return <p>Səbətdə {sebet.say} məhsul</p>;
}` },
          { t: "list", items: [
            "Statik və keşli hissələr build zamanı statik qabığa yazılır — istifadəçi onları dərhal görür (CDN-dən).",
            "Runtime API (cookies, headers, searchParams) və keşsiz async məlumat Suspense içində olmalıdır — fallback qabığa düşür, məzmun axınla gəlir.",
            "Suspense-siz keşsiz məlumat oxusan, Next.js dev rejimində xəbərdarlıq edir: bütün səhifə bloklanardı.",
          ]},
          { t: "mistake", lang: "tsx", wrong: `export default async function Page() {
  const istifadeci = await sessiyaAl(); // cookies → bütün səhifə dinamik
  const mehsullar = await mehsullariAl();
  return <><Salam ad={istifadeci?.ad} /><Siyahi m={mehsullar} /></>;
}`, right: `export default function Page() {
  return (
    <>
      <Suspense fallback={null}><Salam /></Suspense> {/* yalnız bu dinamik */}
      <Siyahi />                                      {/* keşli */}
    </>
  );
}`, why: "Bir kiçik şəxsi element üçün bütün səhifəni sorğu zamanına bağlama. Dinamik hissəni ən kiçik komponentə endir və Suspense-ə bürü." },
          { t: "mistake", lang: "tsx", wrong: `"use client";
export default function Page() {
  const [m, setM] = useState(null);
  useEffect(() => { fetch("/api/meqale").then(/* ... */); }, []);
  // məqalə mətni JS-dən sonra görünür
}`, right: `export default async function Page() {
  "use cache";
  const m = await meqaleAl();
  return <article>{m.metn}</article>;
}`, why: "Açıq, SEO üçün vacib məzmunu CSR ilə göstərmək: boş HTML, yavaş LCP, zəif indeksləmə. Belə məzmun serverdə və keşli olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Seçim meyarları, ölçmə və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Suallar: məzmun hamıya eynidirmi? (bəli → keşlə). Nə qədər köhnə ola bilər? (cacheLife). Dəyişəndə dərhal görünməlidirmi? (updateTag). Şəxsidirmi? (dinamik + Suspense və ya \"use cache: private\"). Yalnız qarşılıqlı əlaqədən sonra lazımdır? (client-də çək).",
            "Suspense sərhədi — UX qərarıdır: fallback məzmunla eyni ölçüdə olsun (CLS), mənalı bloklar üzrə qruplaşdır, vacib məzmunu skelet arxasında gizlətmə.",
            "Hydration bahadır: nə qədər çox Client Component, o qədər çox JS və daha gec interaktivlik (INP). Ağır client hissələrini next/dynamic və ya React.lazy ilə tənbəl yüklə.",
            "Ölçmə: laboratoriya (Lighthouse) kifayət deyil — real istifadəçi göstəricilərini topla (useReportWebVitals): LCP < 2.5 s, INP < 200 ms, CLS < 0.1.",
            "Naviqasiya: Partial Prefetching ilə link əvvəlcədən statik qabığı yükləyir — klik dərhal cavab verir, dinamik hissə sonra axır.",
            "Edge və Node runtime: edge soyuq başlanğıcı azaldır, amma Node API-ləri məhduddur və baza uzaqdırsa, hər sorğu yavaşıyır. Hesablamanı məlumata yaxın saxla.",
            "Təhlükəsizlik — statik/keşli HTML hamıya eynidir: içində şəxsi məlumat, bir istifadəçiyə məxsus token və ya bir sorğuya aid CSP nonce OLA BİLMƏZ. Nonce əsaslı CSP səhifəni dinamik edir — bunu bilərək seç.",
            "Təhlükəsizlik — CDN keşi: şəxsi cavaba Cache-Control: private ver; public cavabda Set-Cookie olmasın. Əks halda bir istifadəçinin səhifəsi başqasına verilə bilər.",
            "Təhlükəsizlik — RSC payload: Client Component-ə ötürülən props və axınla gələn məlumat brauzerdə açıq görünür. Sirli sahələri serverdə süz (DTO), taint API-ləri əlavə sığortadır.",
            "Təhlükəsizlik: icazə yoxlaması strategiyadan asılı deyil — statik səhifə özü qorunmur. Qorunan məzmun dinamik hissədə və DAL yoxlamasından sonra render olunmalıdır.",
          ]},
          { t: "qa", items: [
            ["SSG, ISR və SSR-i necə seçirsən?", "Məzmun nadir dəyişir və hamıya eynidir — SSG. Vaxtaşırı dəyişir — ISR (keş + revalidasiya). Şəxsi və ya hər sorğuda fərqlidir — SSR/dinamik. Real səhifədə adətən qarışıq: PPR."],
            ["Partial Prerendering nədir?", "Bir səhifədə statik qabığın əvvəlcədən hazırlanıb dərhal göndərilməsi, dinamik hissələrin isə eyni cavabda Suspense sərhədləri üzrə axınla gəlməsi."],
            ["Streaming TTFB və LCP-yə necə təsir edir?", "Qabıq dərhal göndərildiyi üçün TTFB və ilk boyama sürətlənir; yavaş sorğu bütün səhifəni yox, yalnız öz blokunu gözlədir."],
            ["Niyə statik səhifədə nonce əsaslı CSP işləmir?", "Nonce hər sorğuda unikal olmalıdır, statik HTML isə hamıya eynidir. Ya səhifə dinamik olur, ya da heş əsaslı CSP işlədilir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Blog məqaləsi (gündə bir dəfə dəyişir, hamıya eyni) üçün ən uyğun?", options: ["Hər sorğuda SSR", "Keşli/statik + revalidasiya", "Client-də fetch"], answer: 1, why: "Hamıya eyni və nadir dəyişən məzmun keşlənməlidir." },
          { t: "quiz", q: "Statik səhifədə istifadəçinin səbət sayını necə göstərmək olar?", options: ["Bütün səhifəni dinamik etməklə", "Yalnız səbət komponentini Suspense içində dinamik etməklə", "Mümkün deyil"], answer: 1, why: "PPR: statik qabıq + kiçik dinamik hissə." },
          { t: "quiz", q: "Statik (hamıya eyni) HTML-in içində nə OLMAMALIDIR?", options: ["Məhsul adları", "İstifadəçiyə məxsus məlumat", "Menyu linkləri"], answer: 1, why: "Statik HTML bütün ziyarətçilərə eyni verilir." },
        ],
      },
    ],
    exercise: {
      task: "Mağaza ana səhifəsini düzgün strategiya ilə yaz: 1) <Basliq /> — statik; 2) <PopulyarMehsullar /> — bazadan gəlir, saatda bir yenilənsin, teqi \"mehsullar\"; 3) <Salamlama /> — cookie-dən sessiyanı oxuyub istifadəçinin adını göstərir; 4) <SonBaxilanlar /> — istifadəçiyə məxsus, yavaş sorğu. Səhifənin qabığı dərhal görünməli, şəxsi hissələr axınla gəlməlidir. Şəxsi məlumat keşə düşməməlidir.",
      starter: `import { Suspense } from "react";\nimport { cacheLife, cacheTag } from "next/cache";\nimport { sessiyaAl } from "@/lib/dal";\n\nexport default function Page() {\n  // bura\n}\n\n// komponentlər\n`,
      expect: "Page async deyil və ya cookies oxumur; PopulyarMehsullar-da \"use cache\" + cacheLife(\"hours\") + cacheTag(\"mehsullar\"); Salamlama və SonBaxilanlar ayrı-ayrı <Suspense fallback=...> içindədir və \"use cache\" İŞLƏTMİR (və ya id arqumenti ilə private); sessiya yalnız dinamik komponentlərdə oxunur; bütün səhifə \"use client\" deyil; siyahılarda key var.",
    },
  },
];
