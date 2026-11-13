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
- Front End = **Blue Team** `#38bdf8`, Back End = **Red Team** `#f43f5e`. Rəng `--accent` dəyişəni ilə gəlir (`[data-track]`), komponentlərdə `text-accent`, `bg-accent`, `border-accent` işlət — rəngi hardcode etmə.
- Kod rəngləri: açar söz `#c084fc`, string `#86efac`, ədəd `#fbbf24`, şərh `#64748b`, tip `#7dd3fc`.
- Şrift: Inter (mətn), JetBrains Mono (kod, etiketlər). Başlıqlar `font-black`, kiçik etiketlər mono + `tracking-widest uppercase`.
- Animasiya: `motion/react`, yumşaq spring; 1.2 s-dən uzun animasiya olmasın. `prefers-reduced-motion`-a hörmət et.
- Mobil birinci: hər səhifə 360 px-də yoxlanmalıdır.

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
- Dil sadə, cümlələr qısa. Termin ilk dəfə gələndə ingilis əsli mötərizədə.

## Vəziyyət
- [x] Mərhələ 1: skelet, giriş animasiyası (Blue/Red Team, lift qapısı), header, mövzu siyahısı, dərs səhifəsi.
- [ ] Mərhələ 2: bütün dillərin dərsləri (hazır: JS 3, HTML 1, Python 1).
- [ ] Mərhələ 3: məşq səhifəsi (redaktor, JS/HTML/Python/SQL brauzerdə işləyir).
- [ ] Mərhələ 4: AI agent (`/api/agent`, Claude API, dərs mətnlərindən kontekst).
- [ ] Mərhələ 5: deploy (Vercel).
