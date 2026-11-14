<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## İş bölgüsü: model seçimi (həmişə riayət et)

- **Xırda işlər** (import/export bağlamaq, adlandırma, formatlama, sadə düzəlişlər, tip yoxlaması, kiçik mətn dəyişiklikləri) → sadə/yüngül AI modellərə (məsələn, `haiku`) yazdırılır.
- **Əsas funksionallıq** (dərs məzmununun yazılması, mürəkkəb məntiq, arxitektura, təhlükəsizlik) → əsas/təməl AI modellərlə (`sonnet`/`opus`) yazılır.
- Bu qayda bütün sessiyalarda və bütün tapşırıqlarda tətbiq olunur.
