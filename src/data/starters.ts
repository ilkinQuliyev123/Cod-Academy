/** Sərbəst məşq üçün başlanğıc kodlar */
export const STARTERS: Record<string, string> = {
  html: `<!DOCTYPE html>\n<html lang="az">\n  <body>\n    <h1>Salam!</h1>\n  </body>\n</html>\n`,
  css: `/* Önizləmədə h1, p, a, button və .kart var */\nh1 {\n  color: #38bdf8;\n}\n`,
  tailwind: `<div class="p-6 rounded-xl bg-sky-500 text-white">\n  Salam, Tailwind!\n</div>\n`,
  javascript: `// Ctrl+Enter — işə sal\nconst ad = "Dünya";\nconsole.log(\`Salam, \${ad}!\`);\n`,
  typescript: `function salamla(ad: string): string {\n  return \`Salam, \${ad}!\`;\n}\n\nconsole.log(salamla("Dünya"));\n`,
  react: `function Sayac() {\n  const [say, setSay] = useState(0);\n  return <button onClick={() => setSay(say + 1)}>{say}</button>;\n}\n`,
  nextjs: `// app/page.tsx\nexport default function Page() {\n  return <h1>Salam, Next.js!</h1>;\n}\n`,
  csharp: `using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Salam, dünya!");\n    }\n}\n`,
  cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Salam, dünya!" << std::endl;\n    return 0;\n}\n`,
  aspnet: `var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\napp.MapGet("/", () => "Salam, dünya!");\n\napp.Run();\n`,
  nestjs: `import { Controller, Get } from '@nestjs/common';\n\n@Controller('salam')\nexport class SalamController {\n  @Get()\n  salamla() {\n    return 'Salam, dünya!';\n  }\n}\n`,
  sql: `-- Cədvəllər: telebeler, kurslar, qeydiyyat\nSELECT ad, soyad, yas\nFROM telebeler\nWHERE seher = 'Bakı';\n`,
  mysql: `-- Cədvəllər: telebeler, kurslar, qeydiyyat (SQLite ilə işləyir)\nSELECT t.ad, k.ad AS kurs, q.bal\nFROM qeydiyyat q\nJOIN telebeler t ON t.id = q.telebe_id\nJOIN kurslar k ON k.id = q.kurs_id\nORDER BY q.bal DESC;\n`,
  python: `ad = "Dünya"\nprint(f"Salam, {ad}!")\n\nfor i in range(3):\n    print(i)\n`,
};
