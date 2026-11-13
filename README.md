# Kod Akademiyası

Front End və Back End-i başlanğıcdan senior səviyyəsinə qədər Azərbaycanca öyrədən sayt. Next.js 16, TypeScript, Tailwind CSS 4.

## İşə salmaq

```bash
npm install
cp .env.example .env.local   # sonra GEMINI_API_KEY-i doldur
npm run dev
```

Brauzerdə: http://localhost:3000

## AI açarı (pulsuz)

1. https://aistudio.google.com/apikey → **Create API key**.
2. `.env.local` faylında: `GEMINI_API_KEY=açarın`.
3. Deploy zamanı eyni dəyişəni Vercel → Settings → Environment Variables-a əlavə et.

Açarı heç vaxt koda yazma və GitHub-a göndərmə (`.env.local` artıq `.gitignore`-dadır).
