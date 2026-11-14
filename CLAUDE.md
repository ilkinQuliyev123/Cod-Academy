# Kod Akademiyası — qaydalar

Front-end və back-end öyrədən sayt. Next.js 16 (App Router) + TypeScript + Tailwind 4 + motion. Bütün UI və dərslər **Azərbaycanca**.
Next.js qaydaları üçün @AGENTS.md (bu versiya fərqlidir — şübhədə `node_modules/next/dist/docs/` oxu).

## İş qaydaları (Claude üçün)
- İstifadəçi ilə Azərbaycanca, qısa danış. Hər addımdan sonra aşağıdakı «Vəziyyət» bölməsini yenilə.
- **Token qənaəti:** faylı yalnız lazım olan hissəsini oxu; böyük faylı yenidən yazma — `Edit` et; eyni şeyi iki dəfə yoxlama; uzun izahat yazma.
- Hər dəyişiklikdən sonra: `npx tsc --noEmit` və `npm run build`. Xətasız olmadan «hazırdır» demə.
- Asılılıq əlavə etməzdən əvvəl düşün: brauzerin/Next-in özündə varsa, paket qoşma.
- API açarları yalnız `.env.local`-da / Vercel-də. Heç vaxt koda və ya söhbətə yazma.

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

## Vəziyyət (son yeniləmə: 14.11.2026, 173/220 dərs — FRONT END TAM; SQL, PYTHON, C#, MySQL TAM)
- [x] Mərhələ 1: skelet; giriş ekranı — diaqonal bölünmüş döyüş afişası (mavi FRONT END / qırmızı BACK END), toqquşma + silkələnmə + işıq, klikdə bölmə rəngində lift qapısı (`Gate.tsx`, `DoorIntro.tsx`); header, mövzu siyahısı, dərs səhifəsi, irəliləyiş (localStorage, `src/lib/progress.ts`).
- [x] Mərhələ 3: məşq səhifəsi `/mesq` — CodeMirror 6; Worker-də icra (`src/lib/runners.ts`): JS, TS (sucrase), Python (Pyodide), SQL (sql.js + nümunə baza: telebeler, kurslar, qeydiyyat); HTML/CSS iframe önizləmə. Runtime-lar `public/runtimes`-ə `scripts/copy-runtimes.mjs` ilə köçürülür (postinstall/prebuild, gitignore-da).
- [x] Mərhələ 4: AI agent `/api/agent` — **Google Gemini** (istifadəçinin pullu açarı yoxdur, Claude API yox). REST, SDK yox. `GEMINI_API_KEY`, `GEMINI_MODEL` (default `gemini-3.8-flash`, sənəddən yoxlanmayıb). Sistem promptuna dərs mətni + mövzu linkləri gedir. IP limiti 15/dəq. Açarla hələ SINANMAYIB.
- [x] Karyera yolu `/[track]/yol` (`src/data/career.ts`): Junior/Middle/Senior, addımlar, layihələr, imtahan (`/mesq?imtahan=backend-junior`; AI «NƏTİCƏ: ✅» → `markPassed`). Yoxlama: `node --experimental-strip-types scripts/check-data.mjs`.

## QALAN İŞLƏR (sıra ilə)
1. **Dərslər (əsas iş). 220-dən 173-ü hazırdır** (əvvəlki «234» build-dəki yol sayı idi; mövzu sayı 220-dir). Hər dil `src/data/lessons/<dil>.ts`, `index.ts`-dəki `ALL`-a qoşulur. Qəlib yuxarıda («Məzmun quruluşu»). Hər dərsin senior hissəsində TƏHLÜKƏSİZLİK məqamı, hər dərsdə `exercise`.
   - TAM (Front End bütöv): html 16, css 17, tailwind 12, javascript 22, typescript 13, react 16, nextjs 15 (Next 16 sənədinə görə yazılıb: proxy.ts, "use cache", cacheLife/cacheTag/updateTag, params Promise, Image `preload`).
   - TAM (Back End): sql 16 (runnable nümunələr sql.js-də sınanıb), python 18 (nümunələr Pyodide-də, FastAPI isə real TestClient ilə sınanıb; Pyodide-də `asyncio.run` işləmir — məşqdə `await main()`).
   - TAM: csharp 17, mysql 11 (MySQL-ə xas tapşırıqları AI yoxlayır; brauzerdəki sql.js SQLite-dır — prosedur/trigger MySQL sintaksisi orada işləmir).
   - aspnet 0/16, nestjs 0/15, cpp 0/16 (cpp ixtiyari — sona saxla)
   - Sıra: aspnet → nestjs → cpp. Hər partiya 4–5 dərs → `npx tsc --noEmit` → `npm run build` → commit → bu siyahını yenilə.
   - Qalan dərsləri göstərən skript: `node --experimental-strip-types scripts/check-lessons.mjs`.
   - Dərs kodunda backtick və `${` varsa escape et — dərs kodu template literal içindədir.
   - DİQQƏT: eyni qovluqda iki Claude sessiyası paralel işləməsin (14.11-də belə oldu) — eyni faylı iki tərəf yazarsa iş itir.
2. **RESPONSIVE DİZAYN — telefon və planşet (istifadəçi istəyi, evdə ediləcək).** Bütün səhifələri 360, 390, 768, 820, 1024 px enlərdə Playwright ilə yoxla (telefon: `devices["iPhone 13"]`, planşet: `devices["iPad Mini"]`), üfüqi scroll OLMAMALIDIR. Yoxlanacaq yerlər:
   - `Header.tsx`: 360 px-də yuxarı linklər (Karyera yolu, Məşq, digər bölmə) sığmaya bilər → kiçik ekranda ☰ menyu (açılan panel) və ya ikonlar; dil naviqasiyası üfüqi scroll-dur — kənarda kölgə/ox göstəricisi.
   - `[track]/[lang]/layout.tsx` (mövzu siyahısı sidebar): mobil-də yuxarıda yığılan (collapsible) «Mövzular» düyməsi / drawer; planşetdə dar sidebar.
   - Dərs səhifəsi: kod blokları `overflow-x-auto`, `terms` cədvəli mobil-də sütunlar alt-alta, quiz düymələri tam en, toxunma hədəfləri ≥ 44 px.
   - `/mesq` (`Playground.tsx`): mobil-də redaktor → konsol → AI paneli alt-alta, redaktor hündürlüyü ~50vh; planşetdə 2 sütun; idarə paneli (dil/tapşırıq select-ləri) sətrə sığsın (flex-wrap).
   - `/[track]/yol` (`Roadmap.tsx`), dil kartları, giriş ekranı (`Gate.tsx` mobil-də yuxarı/aşağı bölünür — yoxla), lift qapısı animasiyası.
   - Şriftlər: başlıqlar `clamp()` və ya `text-3xl md:text-5xl`; `min-h-dvh` (100vh yox).
   - Landscape telefon (844×390) və 200% zoom.
   - Hər düzəlişdən sonra ekran şəkli çək, `npx tsc --noEmit` + `npm run build`.
3. **AI testi:** `.env.local`-a `GEMINI_API_KEY=...` (Google AI Studio-dan pulsuz açar). Model adı işləməsə `GEMINI_MODEL` dəyişdir (məs. `gemini-2.5-flash`). Hələ SINANMAYIB.
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
