# Kod Akademiyası — qaydalar

Front-end və back-end öyrədən sayt. Next.js 16 (App Router) + TypeScript + Tailwind 4 + motion. Bütün UI və dərslər **Azərbaycanca**.
Next.js qaydaları üçün @AGENTS.md (bu versiya fərqlidir — şübhədə `node_modules/next/dist/docs/` oxu).

## İş qaydaları (Claude üçün)
- İstifadəçi ilə Azərbaycanca, qısa danış. Hər addımdan sonra aşağıdakı «Vəziyyət» bölməsini yenilə.
- **Token qənaəti:** faylı yalnız lazım olan hissəsini oxu; böyük faylı yenidən yazma — `Edit` et; eyni şeyi iki dəfə yoxlama; uzun izahat yazma.
- Hər dəyişiklikdən sonra: `npx tsc --noEmit` və `npm run build`. Xətasız olmadan «hazırdır» demə.
- Asılılıq əlavə etməzdən əvvəl düşün: brauzerin/Next-in özündə varsa, paket qoşma.
- API açarları yalnız `.env.local`-da / Vercel-də. Heç vaxt koda və ya söhbətə yazma.
- **Model bölgüsü (istifadəçi qaydası, HƏMİŞƏ):** xırda işləri (kiçik düzəlişlər, ad dəyişmə, format, sadə mətn/data köçürmə, təkrarlanan sadə redaktələr) sadə AI modelə (`Agent` aləti, `model: "haiku"`) yazdır. Əsas funksionallıq və mürəkkəb məntiq (arxitektura, API, DB, təhlükəsizlik, əsas komponentlər, dərslərin məzmunu) əsas (güclü) modellə — özün və ya `model: "opus"`/`"sonnet"` ilə — yazılır. Xırda işi alt-agentə verəndə nəticəni yoxla.

## Dizayn sistemi
- Tünd «terminal / kiber» üslub. Fon `ink #05070d`, panel `panel #0c111c`, xətt `line #1c2536`.
- Front End = mavi `#38bdf8`, Back End = qırmızı `#f43f5e`. «Blue/Red Team» yazısı İŞLƏDİLMİR, giriş ekranında «VS» yazısı da YOXDUR (istifadəçi istəyi). Rəng `--accent` dəyişəni ilə gəlir (`[data-track]`), komponentlərdə `text-accent`, `bg-accent`, `border-accent` işlət — rəngi hardcode etmə.
- Kod rəngləri: açar söz `#c084fc`, string `#86efac`, ədəd `#fbbf24`, şərh `#64748b`, tip `#7dd3fc`.
- Şrift: Inter (mətn), JetBrains Mono (kod, etiketlər). Başlıqlar `font-black`, kiçik etiketlər mono + `tracking-widest uppercase`.
- Animasiya: `motion/react`, yumşaq spring; 1.2 s-dən uzun animasiya olmasın. `prefers-reduced-motion`-a hörmət et.
- Mobil birinci: hər səhifə 360 px-də yoxlanmalıdır.

## Təhlükəsizlik (dəyişmə, yalnız gücləndir)
- `next.config.ts`: CSP + HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP, `poweredByHeader: false`. CSP-də `unsafe-eval`/`wasm-unsafe-eval`/`blob:` məşq runner-ləri üçün LAZIMDIR — silsən JS/Python/SQL sınır. Dəyişəndən sonra 5 runner-i Playwright ilə yoxla.
- HTML önizləmə: `sandbox="allow-scripts"` — `allow-same-origin` ƏLAVƏ ETMƏ.
- `/api/agent`: Origin yoxlaması (başqa sayt → 403), body ≤ 40 KB, `lang/topic/exam` ağ siyahıdan, mesajlar tip yoxlamalı, IP limiti 15/dəq (Map ölçüsü məhdud), sistem promptunda prompt-injection qadağası. Açar yalnız serverdə.
- Markdown render: innerHTML YOX, yalnız daxili linklər.
- İmtahan nəticəsi localStorage-dadır (saxtalaşdırıla bilər) — sertifikat verilsə serverdə yoxlanmalıdır.

## Kod qaydaları
- Server Component default; `"use client"` yalnız interaktiv hissədə (animasiya, state, brauzer API).
- Komponent bir iş görür, 150 sətirdən uzun olmasın. Adlar ingiliscə (kod), mətnlər Azərbaycanca (UI).
- `any` qadağandır. Tiplər `src/data/types.ts`-də.
- Bütün marşrutlar `generateStaticParams` ilə statik qurulur.

## Məzmun quruluşu
- Dillər və mövzu siyahıları: `src/data/languages.ts` (`"slug|Başlıq"`).
- Dərslər: `src/data/lessons/<dil>.ts` → `index.ts`-də `ALL`-a əlavə et.
- **Hər dərsin qəlibi** (pedaqogika):
  1. `intro` — 1–2 cümlə: nədir, nəyə lazımdır.
  2. **Başlanğıc**: `analogy` (həyatdan bənzətmə) → sintaksis `code` → `terms` (hər sözün mənası) → `tip`.
  3. **Orta**: real nümunələr, kodun məntiqi, `mistake` (səhv ↔ düz + səbəb).
  4. **Senior**: daxildə necə işləyir, performans, best practice, `qa` (müsahibə sualları).
  5. **Özünü yoxla**: 1–3 `quiz`.
  6. `exercise` — məşq səhifəsi üçün tapşırıq + `expect` (AI yoxlaması üçün).
- Tapşırığın `starter`-i `<` ilə başlayırsa (CSS/DOM tapşırıqları), `/mesq` onu avtomatik HTML önizləmə rejimində açır.
- Dil sadə, cümlələr qısa. Termin ilk dəfə gələndə ingilis əsli mötərizədə.

## Vəziyyət (son yeniləmə: 14.11.2026, 220/220 dərs — BÜTÜN DƏRSLƏR TAM; responsive + təhlükəsizlik sərtləşdirmə edildi; yalnız DEPLOY qalır)
- [x] Mərhələ 1: skelet; giriş ekranı — diaqonal bölünmüş döyüş afişası (mavi FRONT END / qırmızı BACK END), toqquşma + silkələnmə + işıq, klikdə bölmə rəngində lift qapısı (`Gate.tsx`, `DoorIntro.tsx`); header, mövzu siyahısı, dərs səhifəsi, irəliləyiş (localStorage, `src/lib/progress.ts`).
- [x] Mərhələ 3: məşq səhifəsi `/mesq` — CodeMirror 6; Worker-də icra (`src/lib/runners.ts`): JS, TS (sucrase), Python (Pyodide), SQL (sql.js + nümunə baza: telebeler, kurslar, qeydiyyat); HTML/CSS iframe önizləmə. Runtime-lar `public/runtimes`-ə `scripts/copy-runtimes.mjs` ilə köçürülür (postinstall/prebuild, gitignore-da).
- [x] Mərhələ 4: AI agent `/api/agent` — **Google Gemini** (istifadəçinin pullu açarı yoxdur, Claude API yox). REST, SDK yox. `GEMINI_API_KEY`, `GEMINI_MODEL` (default `gemini-3.8-flash`); model 503/404/500 versə və ya 20 s cavab verməsə ehtiyat sıra: `gemini-3.6-flash` → `gemini-3.5-flash`. `maxOutputTokens: 4000` (düşünmə tokenləri limitə daxildir — 1200-də cavab kəsilirdi). Sistem promptuna dərs mətni + mövzu linkləri gedir. IP limiti 15/dəq. **14.11.2026-da real açarla SINANDI** (check + chat + başqa origin → 403). Açar `.env.local`-dadır (E:MixMasterAgent.env-dən köçürülüb, gitignore-da).
- [x] Karyera yolu `/[track]/yol` (`src/data/career.ts`): Junior/Middle/Senior, addımlar, layihələr, imtahan (`/mesq?imtahan=backend-junior`; AI «NƏTİCƏ: ✅» → `markPassed`). Yoxlama: `node --experimental-strip-types scripts/check-data.mjs`.

## QALAN İŞLƏR (sıra ilə)
1. ~~Dərslər~~ — **HAZIRDIR: 220/220** (nestjs 15: `nestjs.ts` + `nestjs-b/c/d.ts`; cpp 16: `cpp-a/b/c/d.ts`; `index.ts`-də birləşdirilir). Yoxlama: `node --experimental-strip-types scripts/check-lessons.mjs`. NƏZƏRƏ AL: C++ nümunələri maşında kompilyasiya EDİLMƏYİB (g++ yox idi) — vaxt olanda g++/clang ilə sınamaq məsləhətdir.
2. ~~Responsive~~ — **EDİLDİ (14.11.2026)**: Header-də ☰ mobil menyu + dil naviqasiyasında kənar kölgə; `/mesq` grid-i `minmax(0,…)` (uzun kod sətri üfüqi scroll yaradırdı — 360–1024 px-də yoxlanıb, scroll yoxdur); toxunma hədəfləri ≥ 40–44 px (kopyala, Roadmap, TopicList, mesq header); `body{overflow-x:clip}`. Playwright (Edge) ilə 13 marşrut × 6 viewport ölçüldü. Qalıq: `/frontend/yol`, `/backend/yol`-da hələ çox kiçik link var (Roadmap) — ehtiyac olsa böyüt.
2b. ~~Təhlükəsizlik~~ — **SƏRTLƏŞDİRİLDİ**, bax `SECURITY.md`: CSP-də `unsafe-eval`/`blob:` yalnız `/mesq`-də; `/api/agent` (Sec-Fetch-Site, content-type, axınla body limiti, saatlıq büdcə, IP başlığı, ``` hasarı, no-store); Markdown `//evil` yönləndirməsi bağlandı; imtahan «✅» yalnız cavabın sonunda; `localStorage` təhlükəsiz parse; `npm audit` 0.
   - **Python məşqi bu maşında (4 GB RAM) 20 s limitə düşdü** (CSP bypass ilə də) — fayllar yüklənir, səbəb yaddaş çatışmazlığı sayılır, amma QƏTİ təsdiqlənməyib. Deploy-dan əvvəl normal kompüterdə `/mesq?dil=python` yoxla. JS/TS/SQL/HTML yeni CSP ilə işləyir.
3. ~~AI testi~~ — HAZIRDIR (lokalda işləyir). Qalan: brauzerdə `/mesq` AI panelini əl ilə yoxlamaq; Vercel-də `GEMINI_API_KEY` mühit dəyişənini əlavə etmək.
4. **Deploy (Vercel):** GitHub repo yarat → push → vercel.com-da Import → Environment Variables-a `GEMINI_API_KEY`. Build əmri default (`npm run build`; prebuild runtime-ları köçürür).
5. **İstəyə bağlı (istifadəçi təsdiqi lazım):** qeydiyyat/giriş + DB (Supabase və ya C# API), admin panel, dərs səhifələrində kiçik AI çat, React/Tailwind üçün canlı önizləmə (indi `runnable: "none"` — AI yoxlayır).

## EVDƏ / YENİ KOMPÜTERDƏ DAVAM ETMƏK
1. Node.js 20+ quraşdır. Zip-i aç (içində `.git` var — tarixçə qalır).
2. Qovluqda: `npm install` (postinstall Pyodide/sql.js runtime-larını `public/runtimes`-ə köçürür).
3. `.env.local` yarat: `GEMINI_API_KEY=açarın` (heç vaxt commit etmə, söhbətə yazma).
4. `npm run dev` → http://localhost:3000. Yoxlama: `npx tsc --noEmit`, `npm run build`.
5. Claude Code-u bu qovluqda aç və de: **«xatırla, CLAUDE.md-yə bax və davam et»**. Claude bu faylı oxuyub QALAN İŞLƏR-dən davam edəcək.
6. GitHub qoşulubsa: `git remote add origin <url>` → `git push -u origin master` (və ya main).

## İstifadəçi haqqında qeydlər
- Böyük işləri təsdiqsiz görmə — əvvəl soruş, tövsiyə ver.
- **DƏRSLƏR ÜÇÜN İCAZƏ VAR: «bitirənə qədər davam elə, möhkəm yaz»** — partiyalar arasında soruşma, bütün 234 dərsi bitirənə qədər yaz (hər partiyadan sonra build + commit + bu faylı yenilə; zip-i bir neçə partiyada bir göndər). Hər dərsin senior hissəsində mövzuya aid TƏHLÜKƏSİZLİK məqamı olsun (XSS, injection, CSRF, sirlər və s.).
- Nəticəni zip kimi istəyir, HƏMİŞƏ EYNİ ad `kod-akademiyasi.zip` (versiya nömrəsi YOX). `.git` daxil olsun ki, evdə tarixçə qalsın: `rm -f kod-akademiyasi.zip && zip -qr kod-akademiyasi.zip . -x 'node_modules/*' '.next/*' 'public/runtimes/*' '*.zip' '.env.local'` → SendUserFile. Kompüterinə birbaşa çıxış yoxdur.
- Commit müəllifi: `-c user.name="ilkinQuliyev123" -c user.email="noreply@users.noreply.github.com"`.
- Yoxlama serveri: `npx next start -p 3100` (köhnəsini əvvəl `pkill -f "next-server|next start"`), Playwright ilə ekran şəkli.
