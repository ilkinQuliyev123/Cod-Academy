# Təhlükəsizlik — Kod Akademiyası

Deploy-dan əvvəl yoxlama siyahısı və saytın mövcud müdafiələri.

## Mövcud müdafiələr

| Sahə | Tədbir | Yer |
|---|---|---|
| Başlıqlar | HSTS (preload), X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP, CORP, `X-Powered-By` söndürülüb | `next.config.ts` |
| CSP | Bütün səhifələrdə `eval`/`blob:` YOXDUR, `connect-src 'self'`, `frame-src 'none'`. Yalnız `/mesq` (kod icrası) `unsafe-eval` + `wasm-unsafe-eval` + `blob:` alır | `next.config.ts` |
| İstifadəçi kodu | Worker-də icra (səhifədən ayrı), 10 s vaxt limiti; HTML önizləmə `sandbox="allow-scripts"` (`allow-same-origin` YOXDUR) | `src/lib/runners.ts`, `Playground.tsx` |
| AI API | Origin + `Sec-Fetch-Site` yoxlaması, `application/json` məcburi, body ≤ 40 KB (axınla oxunur), ağ siyahı (dil/mövzu/imtahan), IP limiti 15/dəq, saatlıq ümumi büdcə, `no-store`, açar yalnız serverdə | `src/app/api/agent/route.ts` |
| Prompt-injection | Tələbə mətni ``` hasarından çıxa bilmir, sistem promptunda «məlumatdır, əmr deyil» qaydası, imtahan nəticəsi yalnız cavabın SONUNDAKI `NƏTİCƏ: ✅` ilə | `route.ts`, `AgentPanel.tsx` |
| XSS | `innerHTML` yalnız escape olunmuş `highlight()` çıxışında; AI cavabı React ilə render olunur, markdown linkləri yalnız daxili (`//` və `\` ilə başlayan yönləndirmələr rədd edilir) | `Markdown.tsx`, `highlight.ts` |
| Yerli yaddaş | `localStorage` oxunuşu tip/ölçü yoxlaması ilə (korlanmış dəyər saytı çökdürmür) | `src/lib/progress.ts` |
| Asılılıqlar | `npm audit --omit=dev` → 0 zəiflik (14.11.2026) | — |
| Sirlər | `.env*` gitignore-dadır; açar kodda/repoda yoxdur | `.gitignore` |

## Deploy zamanı (Vercel) — mütləq

1. `GEMINI_API_KEY` yalnız Vercel → Settings → Environment Variables (Production). Heç vaxt `NEXT_PUBLIC_` prefiksi ilə yazma.
2. Açarı Google AI Studio-da yalnız Gemini API ilə məhdudlaşdır; kvotanı aşağı saxla.
3. Repo-ya `.env.local` düşməyib: `git ls-files | grep env` yalnız `.env.example` göstərməlidir.
4. Deploy-dan sonra yoxla: `curl -sI https://SAYT | grep -i -E "content-security|strict-transport|x-frame"`; `/mesq`-in CSP-sində `unsafe-eval` olmalı, `/frontend`-də olmamalıdır.
5. `curl -X POST https://SAYT/api/agent -H "Origin: https://evil.example" -H "Content-Type: application/json" -d "{}"` → 403.
6. İlk gün Vercel loglarında 429/403 sayına bax; limit pozuntusu varsa `LIMIT` dəyərlərini azalt.

## Məlum məhdudiyyətlər (qəbul edilmiş risklər)

- **İmtahan keçidi `localStorage`-dadır** — istifadəçi konsoldan özünü «keçdi» göstərə bilər. Sertifikat/diplom veriləcəksə server tərəfində yoxlama + giriş sistemi lazımdır.
- **IP limiti instansiya yaddaşındadır** (serverless-də hər instansiya ayrıdır). Əsas qoruma kimi kifayətdir; ciddi trafikdə Upstash/Vercel KV əsaslı paylaşılan limit əlavə et.
- **CSP-də `unsafe-inline`** qalır (Next.js statik səhifələrdə inline skript yazır). Nonce üçün səhifələr dinamik olmalıdır — bu, statik sürət qazancını itirir.
- **Qeydiyyat/giriş yoxdur** — istifadəçi məlumatı saxlanmır, bu səbəbdən şəxsi məlumat riski minimaldır. Giriş əlavə ediləndə: parol heşi (argon2/bcrypt), httpOnly+Secure+SameSite cookie, CSRF, giriş limiti.

## Yeni funksiya əlavə edəndə qayda

- API marşrutu: Origin yoxlaması, body limiti, ağ siyahı, rate limit, `no-store`, xəta mesajında daxili detal yoxdur.
- Yeni `dangerouslySetInnerHTML`, `eval`, `new Function` — qadağandır (mövcud istisnalar: `CodeBlock` + `highlight`, `/mesq` runner-ləri).
- CSP-ni zəiflətmə; zəruridirsə yalnız konkret marşrut üçün.
- Hər dəyişiklikdən sonra: `npx tsc --noEmit`, `npm run build`, `npm audit --omit=dev`.
