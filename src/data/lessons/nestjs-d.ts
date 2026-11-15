import type { Lesson } from "../types";

export const nestjsD: Lesson[] = [
  {
    slug: "konfiq",
    title: "Konfiqurasiya",
    intro: "Tətbiq müxtəlif mühitlərdə (lokal, test, production) fərqli dəyərlərlə işləyir: port, baza ünvanı, sirlər. Konfiqurasiya kodu dəyişmədən bu dəyərləri kənardan idarə etməyə imkan verir.",
    sections: [
      {
        level: "baslangic",
        title: "ConfigModule və .env",
        blocks: [
          { t: "analogy", text: "Konfiqurasiya — maşının tənzimləmələridir: oturacaq, güzgü, radio. Maşın (kod) eynidir, amma hər sürücü (mühit) üçün fərqli qurulur. Açarı isə (sirr) heç vaxt maşının üstünə yapışdırmırsan." },
          { t: "code", lang: "bash", code: `npm install @nestjs/config` },
          { t: "code", lang: "typescript", code: `// .env  (git-ə düşmür!)
// PORT=3000
// DATABASE_URL=postgres://user:parol@localhost:5432/kod
// JWT_SIRR=uzun-tesadufi-sirr

// app.module.ts
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],     // hər yerdə ConfigService
})
export class AppModule {}

// istənilən servisdə
@Injectable()
export class PoctService {
  constructor(private readonly konfiq: ConfigService) {}

  gonder() {
    const host = this.konfiq.get<string>('SMTP_HOST', 'localhost');     // ikinci arqument: default
    const acar = this.konfiq.getOrThrow<string>('SMTP_ACAR');           // yoxdursa xəta
  }
}

// main.ts
const konfiq = app.get(ConfigService);
await app.listen(konfiq.get<number>('PORT', 3000));` },
          { t: "terms", items: [
            ["ətraf mühit dəyişəni", "prosesə kənardan verilən açar=dəyər (process.env)."],
            ["ConfigService", "konfiqurasiya dəyərlərini oxumaq üçün Nest servisi."],
            ["isGlobal", "modulu bütün modullarda import etmədən istifadə etməyə imkan verir."],
            ["getOrThrow", "dəyər yoxdursa xəta atır — səssiz boş dəyərin qarşısını alır."],
          ]},
          { t: "tip", text: ".env faylını .gitignore-a əlavə et və repoya yalnız .env.example (dəyərsiz nümunə) qoy." },
        ],
      },
      {
        level: "orta",
        title: "Tipli konfiqurasiya və validasiya",
        blocks: [
          { t: "code", lang: "typescript", code: `import * as Joi from 'joi';

// Başlanğıcda yoxlama: lazımi dəyər yoxdursa tətbiq qalxmır
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.' + process.env.NODE_ENV, '.env'],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
    PORT: Joi.number().port().default(3000),
    DATABASE_URL: Joi.string().uri().required(),
    JWT_SIRR: Joi.string().min(32).required(),          // zəif sirr qəbul edilmir
  }),
  validationOptions: { abortEarly: false },
})

// Tipli, qruplu konfiqurasiya
export default registerAs('baza', () => ({
  url: process.env.DATABASE_URL,
  hovuz: parseInt(process.env.DB_HOVUZ ?? '10', 10),
}));

ConfigModule.forRoot({ isGlobal: true, load: [bazaKonfiq] })

constructor(
  @Inject(bazaKonfiq.KEY) private readonly baza: ConfigType<typeof bazaKonfiq>,
) {}
// this.baza.url — tipi avtomatik çıxarılır` },
          { t: "list", items: [
            "Joi (və ya Zod) sxemi qalxarkən bütün dəyərləri yoxlayır — səhv konfiqurasiya production-da deyil, başlanğıcda üzə çıxır.",
            "registerAs ilə konfiqurasiya qruplaşır (baza, jwt, poct) və tip təhlükəsiz olur.",
            "Dəyərlər həmişə sətirdir: PORT, DB_HOVUZ kimi ədədləri çevir; 'false' sətri boolean true kimi qiymətləndirilir.",
            "forRootAsync / useFactory ilə modulları (TypeORM, JWT) konfiqurasiyadan qur.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `const sirr = process.env.JWT_SIRR || 'secret';       // sirr yoxdursa tanınan dəyər`, right: `const sirr = this.konfiq.getOrThrow<string>('JWT_SIRR');`, why: "Default sirr production-da təsadüfən qalsa, hər kəs «secret» ilə öz tokenini imzalaya bilər. Sirr yoxdursa tətbiq qalxmamalıdır (fail fast)." },
          { t: "mistake", lang: "typescript", wrong: `if (process.env.DEBUG_REJIMI) { ... }     // 'false' də truthy-dir`, right: `const debug = this.konfiq.get<string>('DEBUG_REJIMI') === 'true';`, why: "process.env dəyərləri sətirdir: 'false' və '0' boş olmayan sətir kimi truthy sayılır. Açıq müqayisə et və ya sxemlə boolean-a çevir." },
          { t: "h", text: "Namespace-lər, forFeature, expandVariables və keş" },
          { t: "p", text: "registerAs ilə yaradılan konfiqurasiya qrupu namespace adı alır: ConfigService.get('baza.url') kimi nöqtəli yolla oxuna bilər. Hər modul özünə aid qrupu ConfigModule.forFeature(...) ilə yükləyə bilər — bu, modulu mərkəzi AppModule-dan asılı olmayan edir. forRoot-un cache seçimi get() çağırışlarını keşləyir (process.env oxumaq nisbətən yavaşdır), expandVariables isə .env daxilində ${DB_HOST} kimi istinadları açır." },
          { t: "code", lang: "typescript", code: `// config/jwt.config.ts
export default registerAs('jwt', () => ({
  sirr: process.env.JWT_SIRR,
  omur: process.env.JWT_OMUR ?? '15m',
}));

// app.module.ts
ConfigModule.forRoot({
  isGlobal: true,
  cache: true,                       // dəyərlər bir dəfə oxunub keşlənir
  expandVariables: true,             // .env: DATABASE_URL=postgres://\${DB_USER}:\${DB_PARTOL}@\${DB_HOST}/kod
  load: [bazaKonfiq, jwtKonfiq],
})

// Modulun öz konfiqurasiyası
@Module({
  imports: [ConfigModule.forFeature(jwtKonfiq)],
})
export class AuthModule {}

// Oxu: nöqtəli yol və tipli inyeksiya
const omur = this.konfiq.get<string>('jwt.omur');
constructor(@Inject(jwtKonfiq.KEY) private readonly jwt: ConfigType<typeof jwtKonfiq>) {}

// Mühitə görə fərqli fayl ardıcıllığı (birinci tapılan üstündür)
envFilePath: [\`.env.\${process.env.NODE_ENV ?? 'development'}.local\`, '.env.local', '.env']` },
          { t: "terms", items: [
            ["namespace", "registerAs ilə verilmiş qrup adı (baza, jwt); get('baza.url') kimi oxunur."],
            ["forFeature", "konfiqurasiya qrupunu yalnız konkret modula yükləyir."],
            ["expandVariables", ".env-də dəyişənlərin bir-birinə istinadını (\${AD}) açır."],
            ["ConfigType", "registerAs funksiyasının qaytardığı tipi çıxarır."],
          ]},
          { t: "mistake", lang: "typescript", wrong: `// dekoratorda ConfigModule yüklənməmiş process.env
@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SIRR })],   // import zamanı oxunur
})`, right: `@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (k: ConfigService) => ({ secret: k.getOrThrow('JWT_SIRR') }),
    }),
  ],
})`, why: "Modul dekoratoru fayl import ediləndə icra olunur — ConfigModule .env-i hələ yükləməyib, process.env.JWT_SIRR undefined olur. registerAsync/useFactory konfiqurasiya hazır olandan sonra işləyir." },
          { t: "mistake", lang: "typescript", wrong: `PORT: Joi.number().default(3000)        // ədəd olsa keçir: 0, -5 və ya 99999 da qəbul olunur`, right: `PORT: Joi.number().port().default(3000)`, why: "Sadə tip yoxlaması kifayət deyil: port 0–65535 aralığında olmalıdır. Sxemdə mümkün qədər dar qaydalar (port, uri, min uzunluq) yaz." },
          { t: "tip", text: "Test mühitində ConfigModule.forRoot({ ignoreEnvFile: true, load: [() => ({ ... })] }) ilə konfiqurasiyanı koddan ver ki, test real .env-dən asılı olmasın." },
        ],
      },
      {
        level: "senior",
        title: "Sirr idarəsi, mühitlər və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "12-factor: konfiqurasiya koddan ayrıdır və mühitdən gəlir. Eyni build artefaktı (image) bütün mühitlərdə işləyir, yalnız konfiqurasiya dəyişir.",
            "Sirr meneceri: AWS Secrets Manager, GCP Secret Manager, Azure Key Vault, HashiCorp Vault, Kubernetes Secrets (şifrələmə ilə). .env faylı yalnız lokal inkişaf üçündür.",
            "Sirlərin rotasiyası: açarı dəyişmək mümkün olmalıdır; JWT üçün kid ilə çoxlu açar (köhnə + yeni) və qısa keçid dövrü.",
            "Konfiqurasiyanı qalxarkən bir dəfə oxu və dondur; hər sorğuda process.env oxumaq yavaş və qeyri-müəyyəndir.",
            "Feature flag-lar: konfiqurasiya və ya xüsusi xidmət (LaunchDarkly, Unleash) ilə funksiyanı yenidən deploy etmədən aç/bağla.",
            "Mühit paritetliyi: staging production-a mümkün qədər oxşar olmalıdır; fərqlər («yalnız production-da işləməyən» xətalar) konfiqurasiya sürüşməsindən gəlir.",
            "Docker/Kubernetes: sirləri image-ə bişirmə (ENV/COPY .env); runtime-da secret kimi qoşulsun.",
            "Təhlükəsizlik — .env-in gitə düşməsi: .gitignore, pre-commit sirr skaneri (gitleaks), CI-da secret scanning. Düşərsə sirri dərhal rotasiya et — gitdən silmək kifayət deyil, tarixçədə qalır.",
            "Təhlükəsizlik — sirri loqlama: konfiqurasiya obyektini console.log etmə, xəta mesajına qoyma; Nest startup loqlarında və /health, /debug marşrutlarında göstərmə.",
            "Təhlükəsizlik — NEXT_PUBLIC_/REACT_APP_ kimi frontend prefiksləri: bu dəyərlər brauzerə çıxır. Sirri onlarla təyin etmə.",
            "Təhlükəsizlik — fail fast: zəif və ya boş sirr, localhost bazası production-da aşkarlansa qalxma. NODE_ENV=production isə tələb olunan dəyərlər artırılsın (CORS ağ siyahı, https).",
            "Təhlükəsizlik — minimal hüquq: hər xidmət yalnız özünə lazım sirləri alır; ortaq «hamıya hər şey» sirri yoxdur. Fərqli mühitlərə fərqli sirr (dev açarı production-a işləməsin).",
            "Təhlükəsizlik — konfiqurasiya inyeksiyası: istifadəçi girişindən konfiqurasiya və ya yol qurma (process.env[acar]) etmə; açar adı yalnız koddan gəlsin.",
          ]},
          { t: "code", lang: "typescript", caption: "Sərt, tipli konfiqurasiya", code: `// config/env.validation.ts — Zod ilə
const EnvSxemi = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SIRR: z.string().min(32),
  CORS_ORIGINS: z.string().transform((s) => s.split(',').map((x) => x.trim())),
}).superRefine((env, ctx) => {
  if (env.NODE_ENV === 'production') {
    if (env.DATABASE_URL.includes('localhost')) {
      ctx.addIssue({ code: 'custom', message: 'Production-da localhost baza olmaz', path: ['DATABASE_URL'] });
    }
    if (env.CORS_ORIGINS.includes('*')) {
      ctx.addIssue({ code: 'custom', message: 'Production-da CORS * olmaz', path: ['CORS_ORIGINS'] });
    }
  }
});
export type Env = z.infer<typeof EnvSxemi>;

ConfigModule.forRoot({
  isGlobal: true,
  validate: (xam) => {
    const netice = EnvSxemi.safeParse(xam);
    if (!netice.success) {
      // Dəyərlərin özünü yox, yalnız sahə adlarını yaz
      const sahələr = netice.error.issues.map((i) => i.path.join('.') + ': ' + i.message);
      throw new Error('Konfiqurasiya yanlışdır → ' + sahələr.join('; '));
    }
    return netice.data;
  },
})

// Tipli giriş
constructor(private readonly konfiq: ConfigService<Env, true>) {}
const sirr = this.konfiq.get('JWT_SIRR', { infer: true });     // string tipi` },
          { t: "h", text: "Asinxron sirr yükləmə, açar rotasiyası və konteyner konfiqurasiyası" },
          { t: "p", text: "ConfigModule.forRoot-un load seçimi asinxron funksiyaları da qəbul edir: beləcə sirri qalxarkən sirr menecerindən (məs. AWS Secrets Manager) çəkib konfiqurasiyaya qoya bilərsən. Bu, sirləri mühit dəyişənlərində saxlamaqdan daha yaxşıdır, çünki dəyər prosesin mühitində və ya docker inspect çıxışında görünmür. Rotasiya üçün JWT-də kid (key id) başlığı ilə çoxlu açar saxlanır: yeni tokenlər yeni açarla imzalanır, köhnə açar isə keçid dövründə yalnız yoxlama üçün qalır." },
          { t: "code", lang: "typescript", caption: "Async load, çoxlu JWT açarı və Dockerfile", code: `// Sirr menecerindən yükləmə (qalxarkən bir dəfə)
async function sirrleriYukle() {
  const sirrler = await sirrMenecer.al('kod-akademiyasi/prod');   // sizin klient
  return { jwt: { cari: sirrler.JWT_CARI, kohne: sirrler.JWT_KOHNE } };
}

ConfigModule.forRoot({ isGlobal: true, load: [sirrleriYukle] })

// kid ilə rotasiya: JwtService.verifyAsync-də açarı başlığa görə seç
@Injectable()
export class AcarServisi {
  private readonly acarlar: Record<string, string>;
  constructor(k: ConfigService) {
    this.acarlar = { v2: k.getOrThrow('jwt.cari'), v1: k.getOrThrow('jwt.kohne') };
  }
  imzala(yuk: object) { return this.jwt.signAsync(yuk, { secret: this.acarlar.v2, header: { alg: 'HS256', kid: 'v2' } }); }
  yoxla(token: string) {
    const kid = (this.jwt.decode(token, { complete: true }) as { header?: { kid?: string } } | null)?.header?.kid;
    const sirr = kid ? this.acarlar[kid] : undefined;
    if (!sirr) throw new UnauthorizedException();
    return this.jwt.verifyAsync(token, { secret: sirr, algorithms: ['HS256'] });   // decode yalnız kid üçün
  }
}

// Dockerfile (multi-stage, sirrsiz image)
// FROM node:22-alpine AS build
// WORKDIR /app
// COPY package*.json ./
// RUN npm ci
// COPY . .
// RUN npm run build
//
// FROM node:22-alpine
// WORKDIR /app
// ENV NODE_ENV=production
// COPY --from=build /app/dist ./dist
// COPY --from=build /app/node_modules ./node_modules
// USER node
// CMD ["node", "dist/main.js"]          # sirlər image-də yox, runtime-da verilir

// Kubernetes: sirr dəyişən kimi secret-dən
// env:
//   - name: JWT_SIRR
//     valueFrom: { secretKeyRef: { name: kod-sirrler, key: jwt-sirr } }` },
          { t: "list", items: [
            "Konfiqurasiyanı tipli sinif kimi saxlamaq (class-validator + plainToInstance) alternativdir: validate funksiyasında sinfə çevirib validateSync ilə yoxla.",
            "Dəyişməz konfiqurasiya: dondurulmuş obyekt (Object.freeze) və ya yalnız oxunan tip ilə təsadüfi dəyişiklikdən qoru.",
            "Çoxlu mühit: development/staging/production üçün ayrı sirr dəstləri və ayrı bazalar; staging production məlumatını kopyalayırsa, anonimləşdir.",
            "Konfiqurasiya sənədi: hansı dəyişənlərin vacib, default və nümunə dəyərlərinin nə olduğunu .env.example və README-də saxla; yeni gələn developer dəqiqlikdə bilsin.",
            "Dinamik konfiqurasiya (restart-sız dəyişiklik): feature flag servisi və ya Consul/etcd; amma sirləri və kritik parametrləri dinamik etmək riskli ola bilər.",
            "Konfiqurasiya testi: validate funksiyasını ayrıca unit test et: etibarsız dəyərlər (zəif sirr, production-da localhost) xəta verməlidir.",
          ]},
          { t: "warn", text: "ENV direktivi və ya build arqumenti ilə sirri Docker image-ə yazma: image qatlarında qalır və docker history ilə oxunur. Sirr yalnız runtime-da (secret, mühit) verilməlidir." },
          { t: "qa", items: [
            ["Niyə jwt.decode yalnız kid oxumaq üçün istifadə olunur?", "decode imzanı yoxlamır; kid-i götürüb düzgün açarı seçmək üçün lazımdır, əsl etibar isə sonrakı verifyAsync ilə yaranır."],
            ["Sirr rotasiyasında köhnə tokenlər necə davranır?", "Köhnə açar keçid dövründə yoxlama üçün saxlanır; imzalama yalnız yeni açarladır. Köhnə tokenlərin ömrü bitəndən sonra köhnə açar silinir."],
            ["ConfigModule load async ola bilərmi?", "Bəli: load massivinə async funksiya verilə bilər; Nest onu gözləyir və nəticəni konfiqurasiyaya qoyur."],
            ["Mühit dəyişəni ilə sirr meneceri arasında hansı üstündür?", "Sirr meneceri: audit, rotasiya, girişə nəzarət verir. Mühit dəyişənləri proses və konteyner metadatasında görünə bilər."],
            ["12-factor-un konfiqurasiya prinsipi?", "Konfiqurasiya koddan ayrı, mühitdə saxlanılır; eyni build bütün mühitlərdə dəyişmədən işləyir."],
          ]},
          { t: "qa", items: [
            ["Konfiqurasiya niyə koddan ayrı saxlanır?", "Eyni kodu fərqli mühitlərdə dəyişmədən işlətmək, sirləri repoya qoymamaq və mühitə görə tənzimləmək üçün."],
            ["getOrThrow və get fərqi?", "get yoxdursa undefined (və ya default) qaytarır; getOrThrow isə xəta atır, vacib dəyərlərdə səssiz səhvin qarşısını alır."],
            ["Konfiqurasiya validasiyası niyə vacibdir?", "Səhv konfiqurasiya başlanğıcda aşkarlanır, production-da gözlənilməz xətaya çevrilmir."],
            [".env gitə düşsə nə etmək lazımdır?", "Sirləri dərhal rotasiya et; tarixçədən silmək kifayət deyil."],
            ["Sirləri harada saxlamaq daha yaxşıdır?", "Sirr meneceri (Vault, Secrets Manager, KMS) və ya orkestrator secret-ləri; .env yalnız lokaldır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: ".env faylı haraya aid deyil?", options: ["Lokal inkişaf", "Git repozitoriyası", ".gitignore"], answer: 1, why: ".env sirr saxlayır və gitə düşməməlidir." },
          { t: "quiz", q: "Vacib dəyər yoxdursa tətbiq necə davranmalıdır?", options: ["Default sirrlə davam etsin", "Qalxmasın (fail fast)", "Sakitcə boş işləsin"], answer: 1, why: "Səhv konfiqurasiya başlanğıcda üzə çıxmalıdır." },
          { t: "quiz", q: "process.env.X === 'false' olduqda if (process.env.X) nəticəsi?", options: ["false", "true", "Xəta"], answer: 1, why: "Boş olmayan sətir truthy-dir." },
        ],
      },
    ],
    exercise: {
      task: "Konfiqurasiya sistemi yaz. 1) Zod ilə `EnvSxemi`: `NODE_ENV`, `PORT` (1–65535, default 3000), `DATABASE_URL` (url), `JWT_SIRR` (≥32), `CORS_ORIGINS` (vergüllə ayrılmış → massiv). 2) Production-da `localhost` bazanı və `*` CORS-u rədd edən `superRefine`. 3) `ConfigModule.forRoot({ isGlobal: true, validate })`; səhv mesajı dəyərləri yox, yalnız sahə adlarını göstərsin. 4) `ConfigService<Env, true>` ilə tipli oxuma. 5) `main.ts`-də `enableCors({ origin: CORS_ORIGINS })`. 6) `.env.example` faylının məzmununu (dəyərsiz) şərhdə yaz və `.env`-in niyə gitdə olmamalı olduğunu izah et.",
      starter: `import { Module } from '@nestjs/common';\nimport { ConfigModule, ConfigService } from '@nestjs/config';\nimport { z } from 'zod';\n\n// EnvSxemi, validate, AppModule, main.ts hissəsi\n`,
      expect: "z.object ilə NODE_ENV/PORT(coerce, min/max, default)/DATABASE_URL url/JWT_SIRR min(32)/CORS_ORIGINS split transform; superRefine production-da localhost və '*' yoxlaması; ConfigModule.forRoot({isGlobal:true, validate}) safeParse, səhv mesajında yalnız path və message; ConfigService<Env, true> və get(..., {infer:true}); enableCors origin massiv; şərhdə .env.example və gitə düşməməsi izah olunub.",
    },
  },
  {
    slug: "test",
    title: "Testləmə",
    intro: "Test — kodun düzgün işlədiyini avtomatik yoxlayan koddur. Nest-də Jest ilə unit testlər (bir sinif təcrid olunmuş) və supertest ilə e2e testlər (real HTTP sorğusu) yazılır.",
    sections: [
      {
        level: "baslangic",
        title: "Unit test",
        blocks: [
          { t: "analogy", text: "Test — təyyarə uçuşundan əvvəl yoxlama siyahısıdır. Hər dəfə mühərriki, qanadı, yanacağı əl ilə yoxlamırsan: siyahı hamısını saniyələr içində edir və nə sındığını dəqiq göstərir." },
          { t: "code", lang: "typescript", code: `// mehsullar.service.spec.ts
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('MehsullarService', () => {
  let servis: MehsullarService;

  beforeEach(async () => {
    const modul = await Test.createTestingModule({
      providers: [MehsullarService],
    }).compile();

    servis = modul.get(MehsullarService);
  });

  it('mövcud məhsulu qaytarır', () => {
    expect(servis.tap(1)).toEqual({ id: 1, ad: 'Noutbuk', qiymet: 1500 });
  });

  it('olmayan məhsul üçün NotFoundException atır', () => {
    expect(() => servis.tap(999)).toThrow(NotFoundException);
  });
});

// İşə salmaq
// npm run test              — bütün unit testlər
// npm run test:watch        — dəyişəndə təkrar
// npm run test:cov          — əhatə hesabatı` },
          { t: "terms", items: [
            ["unit test", "tək sinfi/funksiyanı təcrid olunmuş yoxlayır."],
            ["e2e test", "tətbiqi bütövlükdə, real HTTP sorğuları ilə yoxlayır."],
            ["mock", "real asılılığı əvəz edən saxta obyekt."],
            ["Test.createTestingModule", "test üçün kiçik Nest modulu qurur."],
            ["əhatə (coverage)", "testlərin kodun neçə faizini icra etdiyi."],
          ]},
          { t: "tip", text: "Yaxşı test adı nəyi yoxladığını deyir: «olmayan məhsul üçün NotFoundException atır». Test uğursuz olanda adı problemi göstərməlidir." },
        ],
      },
      {
        level: "orta",
        title: "Mock-lar, controller və e2e (supertest)",
        blocks: [
          { t: "code", lang: "typescript", code: `// Asılılığı mock et
const mehsulRepo = { findOneBy: jest.fn(), save: jest.fn() };

const modul = await Test.createTestingModule({
  providers: [
    MehsullarService,
    { provide: getRepositoryToken(Mehsul), useValue: mehsulRepo },
  ],
}).compile();

it('tapılmayanda NotFoundException', async () => {
  mehsulRepo.findOneBy.mockResolvedValue(null);
  await expect(servis.tap(5)).rejects.toThrow(NotFoundException);
  expect(mehsulRepo.findOneBy).toHaveBeenCalledWith({ id: 5 });
});

// e2e: test/mehsullar.e2e-spec.ts
import * as request from 'supertest';

describe('Mehsullar (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modul = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(OdenisServisi).useValue({ odenis: jest.fn().mockResolvedValue(true) })
      .compile();

    app = modul.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(() => app.close());

  it('GET /mehsullar → 200', () =>
    request(app.getHttpServer()).get('/mehsullar').expect(200).expect((res) => {
      expect(Array.isArray(res.body)).toBe(true);
    }));

  it('POST /mehsullar yanlış gövdə → 400', () =>
    request(app.getHttpServer()).post('/mehsullar').send({ ad: '' }).expect(400));

  it('token olmadan → 401', () =>
    request(app.getHttpServer()).get('/menim-sifarislerim').expect(401));
});` },
          { t: "list", items: [
            "Unit testdə servisi təcrid et: baza, şəbəkə, saat kimi xarici asılılıqları mock et.",
            "Controller testi: servisi mock-la, marşrut metodunun düzgün arqumentlərlə servisi çağırdığını yoxla.",
            "e2e testdə eyni pipe və filter-ləri qoş (main.ts-dəki qurğunu təkrarla), yoxsa test real tətbiqdən fərqli davranır.",
            "overrideProvider — real xarici xidməti (ödəniş, poçt) saxta ilə əvəz edir.",
            "Hər testdən əvvəl vəziyyəti sıfırla (beforeEach); testlər bir-birindən asılı olmasın.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `it('işləyir', async () => {
  const netice = await servis.tap(1);
  expect(netice).toBeDefined();           // demək olar hər şeyi keçir
});`, right: `it('id=1 üçün məhsulu qaytarır', async () => {
  const netice = await servis.tap(1);
  expect(netice).toEqual({ id: 1, ad: 'Noutbuk', qiymet: 1500 });
});`, why: "Zəif assert (toBeDefined) səhv nəticəni də keçirir. Test dəqiq gözlənilən dəyəri yoxlamalıdır." },
          { t: "mistake", lang: "typescript", wrong: `it('xəta atır', () => {
  servis.tap(999);                        // await yoxdur, expect yoxdur
});`, right: `it('xəta atır', async () => {
  await expect(servis.tap(999)).rejects.toThrow(NotFoundException);
});`, why: "async xətanı await/rejects ilə gözləməsən, test xəta atılmadan «keçir» — yalançı yaşıl nəticə." },
          { t: "h", text: "Controller testi, useMocker, overrideGuard və parametrləşdirilmiş testlər" },
          { t: "p", text: "Controller testində məqsəd marşrutun düzgün arqumentlərlə servisi çağırması və nəticəni qaytarmasıdır; biznes məntiqi servis testlərinə aiddir. Asılılıqların hamısını əl ilə yazmaq yorucudursa, useMocker(...) çatışmayan provider-ləri avtomatik saxta ilə doldurur. Guard-ı yalnız bu testdə xüsusi hala gətirmək lazımdırsa overrideGuard işlədilir; vaxtdan asılı məntiq üçün jest.useFakeTimers + setSystemTime, çox ssenarili testlər üçün isə it.each." },
          { t: "code", lang: "typescript", code: `// Controller testi: servis mock-lanır
describe('MehsullarController', () => {
  let controller: MehsullarController;
  const servis = { tap: jest.fn(), yarat: jest.fn() };

  beforeEach(async () => {
    const modul = await Test.createTestingModule({
      controllers: [MehsullarController],
    })
      .useMocker((token) => {
        if (token === MehsullarService) return servis;
        // qalan asılılıqlar üçün boş saxta
        if (typeof token === 'function') return {};
      })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })   // YALNIZ bu unit testdə
      .compile();
    controller = modul.get(MehsullarController);
  });

  afterEach(() => jest.clearAllMocks());

  it('tap servisi düzgün id ilə çağırır', async () => {
    servis.tap.mockResolvedValue({ id: 7, ad: 'Telefon' });
    await expect(controller.tap(7)).resolves.toEqual({ id: 7, ad: 'Telefon' });
    expect(servis.tap).toHaveBeenCalledWith(7);
  });
});

// Parametrləşdirilmiş test
it.each([
  [0, false],
  [17, false],
  [18, true],
  [120, true],
])('yas %i üçün yetkinlik = %s', (yas, gozlenilen) => {
  expect(yetkinMi(yas)).toBe(gozlenilen);
});

// Vaxtdan asılı məntiq
beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date('2025-01-15T10:00:00Z'));
});
afterEach(() => jest.useRealTimers());

it('kupon vaxtı bitibsə rədd edir', () => {
  expect(() => servis.kuponTetbiqEt({ bitme: new Date('2025-01-10') })).toThrow(KuponBitib);
});

// spyOn: real obyektin metodunu izlə
const spy = jest.spyOn(servis, 'poctGonder').mockResolvedValue(undefined);
await servis.qeydiyyat(dto);
expect(spy).toHaveBeenCalledTimes(1);` },
          { t: "terms", items: [
            ["useMocker", "çatışmayan asılılıqlar üçün avtomatik saxta provider verən test köməkçisi."],
            ["overrideGuard / overrideProvider / overridePipe", "test modulunda real komponenti saxta ilə əvəz edir."],
            ["it.each", "eyni testi müxtəlif giriş cədvəli ilə işlədir."],
            ["jest.spyOn", "real metodu izləyir və ya əvəz edir; çağırışları qeyd edir."],
            ["fake timers", "vaxtı süni idarə edir (setTimeout, Date); testlər sürətli və deterministik olur."],
          ]},
          { t: "mistake", lang: "typescript", wrong: `let sayac = 0;                       // testlər arasında paylaşılan vəziyyət
it('birinci', () => { sayac++; expect(sayac).toBe(1); });
it('ikinci', () => { expect(sayac).toBe(1); });   // birincidən asılıdır`, right: `let sayac: number;
beforeEach(() => { sayac = 0; });
it('birinci', () => { sayac++; expect(sayac).toBe(1); });
it('ikinci', () => { expect(sayac).toBe(0); });`, why: "Testlər bir-birindən asılı olanda sıranın dəyişməsi və ya tək testin işlədilməsi nəticəni dəyişir (flaky). Hər testdən əvvəl vəziyyəti sıfırla." },
          { t: "mistake", lang: "typescript", wrong: `beforeAll(async () => { app = await qur(); await app.init(); });
// afterAll(() => app.close()) unudulub`, right: `afterAll(async () => { await app.close(); });`, why: "Bağlanmayan tətbiq/DB bağlantısı Jest-in prosesi bitirməsinə mane olur («did not exit» xəbərdarlığı) və CI-da asılma yaradır." },
          { t: "tip", text: "Test adlandırma: «nə edir» + «hansı halda» + «nəticə». Arrange-Act-Assert quruluşunu ardıcıl saxla: hazırla, icra et, yoxla; bir testdə bir davranış." },
        ],
      },
      {
        level: "senior",
        title: "Test strategiyası, real baza, CI və təhlükəsizlik testləri",
        blocks: [
          { t: "list", items: [
            "Test piramidası: çox sürətli unit testlər, daha az inteqrasiya (real baza), az sayda e2e. Hamısını e2e ilə örtmək yavaş və kövrək olur.",
            "Real baza ilə inteqrasiya: Testcontainers ilə hər test dəstəsi üçün təmiz PostgreSQL konteyneri. SQLite/in-memory ilə əvəzləmək fərqli davranış (tiplər, kilidlər, indekslər) gizlədir.",
            "Test məlumatı: fabrika/builder (məsələn, @faker-js/faker) ilə; paylaşılan qlobal vəziyyət yoxdur; hər test öz məlumatını yaradır və təmizləyir (tranzaksiya geri qaytarma və ya truncate).",
            "Deterministik test: vaxt (jest.useFakeTimers / saat provider-i), təsadüfilik və şəbəkədən asılılıq mock-lanır. Qeyri-sabit (flaky) test etibarı öldürür.",
            "Kontrakt testləri: klient və server arasında API müqaviləsi (OpenAPI/Pact) — sxem dəyişəndə CI sınır.",
            "Mutasiya testi (Stryker): testlərin həqiqətən səhvi tutub-tutmadığını yoxlayır. Əhatə faizi tək başına keyfiyyət göstəricisi deyil.",
            "CI: hər PR-da lint, tip yoxlaması, testlər və build; uğursuz olarsa merge bloklanır. Paralel və keşlənmiş icra.",
            "Yük və dayanıqlıq: k6/Artillery ilə yük testi; zaman aşımı, təkrar cəhd və qırıcı (circuit breaker) davranışı sınanır.",
            "Test edilə bilən dizayn: asılılıqlar DI ilə yeridilir, saat və təsadüfilik provider-dir, biznes məntiqi controller-də yox, servisdədir. Test çətindirsə, çox vaxt dizayn problemidir.",
            "Təhlükəsizlik testləri — avtorizasiya: hər qorunan marşrut üçün «token yoxdur → 401», «başqa istifadəçinin obyekti → 404/403», «kifayət qədər rol yoxdur → 403» testləri yaz. BOLA/IDOR bu testlərlə tutulur.",
            "Təhlükəsizlik testləri — giriş: ValidationPipe ilə artıq sahə (rol: 'admin'), çox uzun sətir, yanlış tip (massiv/obyekt), ağır JSON sorğuları rədd olunmalıdır.",
            "Təhlükəsizlik testləri — sızma: cavabda parolHesi, daxili ID və stack trace olmadığını təsdiqlə (expect(res.body).not.toHaveProperty('parolHesi')).",
            "Təhlükəsizlik — testlərdə sirr: real API açarı və prod baza testə qoşulmasın; ayrı test sirləri və izolyasiya olunmuş baza. Testin istehsalat məlumatını silməsi real hadisədir.",
            "Təhlükəsizlik — asılılıq skaneri: npm audit, Dependabot/Renovate, SAST (CodeQL) CI-da işləsin; zəiflik olan paketlər PR-ı bloklayır.",
            "Təhlükəsizlik — mock-un yalançı arxayınlığı: guard-ı və ya auth-u hər testdə söndürüb (overrideGuard → true) yalnız onu söndürülmüş halda yoxlamaq real auth-u heç sınamır. Auth ilə ayrıca e2e testlər saxla.",
          ]},
          { t: "code", lang: "typescript", caption: "Avtorizasiya və sızma testləri (e2e)", code: `describe('Sifarişlər təhlükəsizliyi (e2e)', () => {
  let app: INestApplication;
  let tokenA: string;
  let tokenB: string;
  let aSifarisId: number;

  beforeAll(async () => {
    app = await qur();                                  // eyni pipe/filter-lərlə
    tokenA = await girisEt(app, 'a@example.az');
    tokenB = await girisEt(app, 'b@example.az');
    const yarat = await request(app.getHttpServer())
      .post('/sifarisler').set('Authorization', 'Bearer ' + tokenA).send({ mehsulId: 1, say: 2 });
    aSifarisId = yarat.body.id;
  });

  it('token olmadan 401', () =>
    request(app.getHttpServer()).get('/sifarisler/' + aSifarisId).expect(401));

  it('başqasının sifarişinə çatmaq olmaz (IDOR) → 404', () =>
    request(app.getHttpServer())
      .get('/sifarisler/' + aSifarisId)
      .set('Authorization', 'Bearer ' + tokenB)
      .expect(404));

  it('artıq sahə (mass assignment) rədd edilir → 400', () =>
    request(app.getHttpServer())
      .post('/sifarisler').set('Authorization', 'Bearer ' + tokenA)
      .send({ mehsulId: 1, say: 1, istifadeciId: 999, status: 'odenilib' })
      .expect(400));

  it('cavabda həssas sahə yoxdur', async () => {
    const res = await request(app.getHttpServer())
      .get('/profil').set('Authorization', 'Bearer ' + tokenA).expect(200);
    expect(res.body).not.toHaveProperty('parolHesi');
    expect(JSON.stringify(res.body)).not.toMatch(/stack|node_modules/);
  });

  afterAll(() => app.close());
});` },
          { t: "h", text: "Testcontainers, test məlumatı izolyasiyası və CI" },
          { t: "p", text: "Real PostgreSQL ilə inteqrasiya testləri ən çox səhv tutan testlərdir: miqrasiyalar, indekslər, unikal məhdudiyyətlər və tranzaksiya davranışı yalnız real bazada yoxlanır. Testcontainers Docker konteynerini test başlayanda qaldırır və bitəndə silir; hər test dəsti özünün təmiz bazasını alır. Testlər arasında izolyasiya üçün hər testdən sonra cədvəlləri təmizləyirsən (TRUNCATE ... RESTART IDENTITY CASCADE) və ya hər test üçün ayrı tranzaksiya açıb geri qaytarırsan." },
          { t: "code", lang: "typescript", caption: "Real PostgreSQL ilə inteqrasiya testi", code: `import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

describe('KurslarService (inteqrasiya)', () => {
  let konteyner: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let servis: KurslarService;

  beforeAll(async () => {
    konteyner = await new PostgreSqlContainer('postgres:16-alpine').start();
    dataSource = new DataSource({
      type: 'postgres',
      url: konteyner.getConnectionUri(),
      entities: [Kurs, Qeydiyyat],
      migrations: ['src/migrations/*.ts'],
    });
    await dataSource.initialize();
    await dataSource.runMigrations();                    // sxemi real miqrasiyalarla qur
    servis = new KurslarService(dataSource.getRepository(Kurs), dataSource);
  }, 60_000);

  afterEach(async () => {
    await dataSource.query('TRUNCATE TABLE qeydiyyatlar, kurslar RESTART IDENTITY CASCADE');
  });

  afterAll(async () => {
    await dataSource.destroy();
    await konteyner.stop();
  });

  it('eyni istifadəçi eyni kursa iki dəfə yazıla bilməz', async () => {
    const kurs = await dataSource.getRepository(Kurs).save({ ad: 'Nest', yerSayi: 5 });
    await servis.qeydiyyat(kurs.id, 1);
    await expect(servis.qeydiyyat(kurs.id, 1)).rejects.toThrow(ConflictException);
  });

  it('paralel qeydiyyatda yer sayı mənfiyə düşmür', async () => {
    const kurs = await dataSource.getRepository(Kurs).save({ ad: 'Nest', yerSayi: 1 });
    const neticeler = await Promise.allSettled([1, 2, 3].map((id) => servis.qeydiyyat(kurs.id, id)));
    expect(neticeler.filter((n) => n.status === 'fulfilled')).toHaveLength(1);
  });
});

// Fabrika: test məlumatı yaradan köməkçi
export const kursFabrikasi = (ustune: Partial<Kurs> = {}): Partial<Kurs> => ({
  ad: faker.lorem.words(2),
  yerSayi: 10,
  ...ustune,
});

// jest.config (e2e): bir-bir işlət ki, baza üzərində toqquşma olmasın
// "test:e2e": "jest --config ./test/jest-e2e.json --runInBand"` },
          { t: "list", items: [
            "Testcontainers testləri yavaşdır: konteynerləri bütün dəst üçün bir dəfə qaldır (globalSetup və ya beforeAll), hər testdə yox. Paralel işçilər üçün hər işçiyə ayrı baza/şema ver.",
            "Paralel konkurent testlər (Promise.allSettled) kilid və yarış hallarını sınayır — mock-lar bunu heç vaxt tuta bilməz.",
            "Kontrakt testi: Pact ilə konsument (frontend və ya digər xidmət) gözləntisini yazır, provayder CI-da bunu yoxlayır; API dəyişəndə konsument sınmazdan əvvəl bilirsən.",
            "Snapshot testlərindən ehtiyatla istifadə et: böyük snapshot-lar diqqətsiz «update» ilə səhvi qəbul etdirir; kiçik və məqsədli saxla.",
            "Test hesabatları və qapılar: əhatə eşiyi (məs. kritik modullar üçün 80%) PR-ı bloklaya bilər, amma yalnız say deyil, kritik yolların (auth, ödəniş) test olunması vacibdir.",
            "Smoke və canlı yoxlamalar: deploy-dan sonra /health və bir neçə kritik marşrutu avtomatik yoxla; uğursuz olarsa avtomatik geri qaytarma (rollback).",
            "Chaos və dayanıqlıq testləri: asılı xidməti söndür, gecikmə əlavə et — zaman aşımı, təkrar cəhd və fallback-ların həqiqətən işlədiyini yoxla.",
          ]},
          { t: "warn", text: "Test bazasında istehsalat məlumatının surətini istifadə edirsənsə, şəxsi məlumatı anonimləşdirmədən etmə: test mühitləri adətən daha zəif qorunur və sızma riski artır." },
          { t: "qa", items: [
            ["Testcontainers SQLite-dan niyə üstündür?", "Real PostgreSQL tiplərini, kilidləri, indeksləri və miqrasiyaları eyni cür işlədir; SQLite fərqli davranışı gizlədir."],
            ["Testlər arasında bazanı necə təmizləyirsən?", "TRUNCATE ... RESTART IDENTITY CASCADE hər testdən sonra, və ya hər testi geri qaytarılan tranzaksiyada işlətmək."],
            ["Hansı halda mock yox, real asılılıq?", "Baza, kilid və tranzaksiya məntiqini yoxlayanda; mock yalnız nəzarətdən kənar xarici xidmətlər (ödəniş, poçt) üçün."],
            ["Flaky testin əsas səbəbləri?", "Paylaşılan vəziyyət, vaxt, təsadüfilik, şəbəkə və asinxron gözləmə. Həll: izolyasiya, saxta saat, deterministik məlumat."],
            ["--runInBand nə üçündür?", "Jest-in testləri paralel işçilərdə deyil, ardıcıl işlətməsi; paylaşılan bazada toqquşmanı önləyir, amma yavaşdır."],
          ]},
          { t: "qa", items: [
            ["Unit və e2e test fərqi?", "Unit tək sinfi təcrid olunmuş yoxlayır (mock-larla), e2e tətbiqi bütövlükdə real HTTP sorğuları ilə yoxlayır."],
            ["Mock nə vaxt pisdir?", "Çox mock real davranışı gizlədir; baza sorğularını mock-lamaq SQL səhvlərini tutmur. İnteqrasiya testləri real baza ilə lazımdır."],
            ["Flaky test nədir?", "Eyni kodda bəzən keçən, bəzən keçməyən test: vaxt, təsadüfilik, şəbəkə və paylaşılan vəziyyətdən yaranır."],
            ["Əhatə faizi 100%-dirsə kod düzgündür?", "Xeyr: kod icra olunub deməkdir, düzgün yoxlanıb demək deyil. Assert keyfiyyəti vacibdir (mutasiya testi)."],
            ["Təhlükəsizlik üçün hansı testlər yazılır?", "401/403/404 avtorizasiya testləri, IDOR, artıq sahə (mass assignment), həssas sahə sızması, yanlış giriş tipləri."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Xarici asılılığı əvəz edən saxta obyekt necə adlanır?", options: ["Stub-sız", "Mock", "Pipe"], answer: 1, why: "Mock/stub real asılılığı əvəz edir." },
          { t: "quiz", q: "Asinxron xətanı necə yoxlamaq düzgündür?", options: ["Çağırıb qaytarmaq", "await expect(...).rejects.toThrow(...)", "try bloku olmadan"], answer: 1, why: "await olmasa test yalançı keçir." },
          { t: "quiz", q: "e2e testdə nə vacibdir?", options: ["Eyni pipe və filter-lərin qoşulması", "Mock-sız bazanı silmək", "Yalnız controller"], answer: 0, why: "Test real tətbiqlə eyni davranmalıdır." },
        ],
      },
    ],
    exercise: {
      task: "`KurslarService` üçün testlər yaz. 1) Unit: `Test.createTestingModule` + `getRepositoryToken(Kurs)` ilə mock repo; `tap` tapılmayanda `NotFoundException`, tapılanda dəqiq obyekt (toEqual); `yarat` repo.save-i düzgün arqumentlə çağırır. 2) e2e (`supertest`): `ValidationPipe({ whitelist, forbidNonWhitelisted, transform })` qoşulmuş tətbiqdə `GET /kurslar` → 200 massiv; `POST /kurslar` boş gövdə → 400; artıq sahə (`rol: 'admin'`) → 400; token olmadan `GET /menim-kurslarim` → 401; A istifadəçisinin qeydiyyatına B istifadəçisi çatanda 404; cavab `parolHesi` saxlamır. 3) Şərhdə niyə hər testdə guard-ı söndürməyin təhlükəli yalançı arxayınlıq olduğunu izah et.",
      starter: `import { Test } from '@nestjs/testing';\nimport { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';\nimport { getRepositoryToken } from '@nestjs/typeorm';\nimport * as request from 'supertest';\n\n// Unit və e2e testlər\n`,
      expect: "Unit: Test.createTestingModule providers KurslarService + { provide: getRepositoryToken(Kurs), useValue: repoMock }, rejects.toThrow(NotFoundException), toEqual dəqiq obyekt, expect(repo.save).toHaveBeenCalledWith(...); e2e: createNestApplication, useGlobalPipes ValidationPipe whitelist+forbidNonWhitelisted, supertest ilə 200/400/400/401/404 yoxlamaları, not.toHaveProperty('parolHesi'), afterAll app.close(); şərhdə overrideGuard ilə auth söndürmənin yalançı arxayınlıq olduğu izah olunub.",
    },
  },
  {
    slug: "senior",
    title: "Senior: mikroservislər və arxitektura",
    intro: "Kiçik tətbiq modul monolit kimi başlayır. Böyüdükcə komanda, yük və dəyişmə sürəti arxitekturanı sınayır. Bu dərs Nest-in mikroservis dəstəyini, arxitektura qərarlarını və istehsalata hazırlıq qaydalarını əhatə edir.",
    sections: [
      {
        level: "baslangic",
        title: "Monolit, modul monolit və mikroservis",
        blocks: [
          { t: "analogy", text: "Monolit — bir böyük mətbəxli restorandır: hər şey bir yerdədir, idarəsi asandır, amma mətbəx tıxananda bütün restoran dayanır. Mikroservislər — yemək meydançasıdır: hər köşk ayrı işləyir, biri bağlansa digərləri davam edir — amma köşklər arasında koordinasiya (sifariş, ödəniş) çətinləşir." },
          { t: "list", items: [
            "Monolit: bir tətbiq, bir deploy. Sadə, sürətli inkişaf, kiçik komanda üçün ən yaxşı başlanğıcdır.",
            "Modul monolit: tək deploy, amma modullar aydın sərhədlərlə ayrılıb (Nest modulları). Gələcəkdə ayırmaq asan olur.",
            "Mikroservis: hər biri ayrı deploy olunan, öz bazası olan kiçik xidmətlər. Komanda və miqyas üçün üstünlük verir, amma paylanmış sistemin bütün çətinliklərini gətirir.",
            "Qayda: «mikroservislərdən başlama». Əvvəl modul monolit; yalnız real ehtiyac (müstəqil miqyas, komanda sərhədi) olanda ayır.",
          ]},
          { t: "code", lang: "typescript", caption: "Nest mikroservisi (TCP) və klient", code: `// mikroservis: main.ts
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.TCP,
  options: { host: '0.0.0.0', port: 4001 },
});
await app.listen();

// mikroservis controller
@Controller()
export class HesablaController {
  @MessagePattern({ cmd: 'cem' })                    // sorğu-cavab
  cem(@Payload() melumat: { a: number; b: number }) {
    return melumat.a + melumat.b;
  }

  @EventPattern('sifaris_yaradildi')                 // hadisə, cavab gözlənilmir
  async sifaris(@Payload() hadise: { id: number }) { /* ... */ }
}

// API gateway: klient
@Module({
  imports: [ClientsModule.register([{ name: 'HESABLA', transport: Transport.TCP, options: { host: 'hesabla', port: 4001 } }])],
})
export class AppModule {}

@Injectable()
export class CemService {
  constructor(@Inject('HESABLA') private readonly klient: ClientProxy) {}
  cem(a: number, b: number) {
    return firstValueFrom(this.klient.send({ cmd: 'cem' }, { a, b }));
  }
}` },
          { t: "terms", items: [
            ["mikroservis", "müstəqil deploy olunan, aydın məsuliyyətli kiçik xidmət."],
            ["transport", "xidmətlər arası rabitə növü (TCP, Redis, NATS, RabbitMQ, Kafka, gRPC)."],
            ["MessagePattern", "sorğu-cavab mesajına cavab verən handler."],
            ["EventPattern", "hadisəni dinləyən handler (cavab yoxdur)."],
            ["API gateway", "xarici sorğuların daxil olduğu, daxili xidmətlərə yönləndirən giriş nöqtəsi."],
          ]},
          { t: "tip", text: "Mikroservis həll yox, kompromisdir: müstəqil deploy qazanırsan, əvəzində şəbəkə gecikməsi, qismən uğursuzluq və paylanmış məlumat çətinliyini qəbul edirsən." },
        ],
      },
      {
        level: "orta",
        title: "Rabitə, hadisə əsaslı dizayn və CQRS",
        blocks: [
          { t: "code", lang: "typescript", code: `// Mesaj növbəsi: RabbitMQ ilə (dayanıqlı)
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL!],
    queue: 'sifarisler',
    queueOptions: { durable: true },
    noAck: false,                                    // əl ilə təsdiq: itki olmasın
  },
});

@EventPattern('odenis_tamamlandi')
async odenis(@Payload() data: OdenisHadisesi, @Ctx() ctx: RmqContext) {
  const kanal = ctx.getChannelRef();
  const mesaj = ctx.getMessage();
  try {
    await this.sifarisler.odenisle(data);            // idempotent olmalıdır
    kanal.ack(mesaj);
  } catch {
    kanal.nack(mesaj, false, false);                 // dead-letter-a göndər
  }
}

// CQRS (@nestjs/cqrs): yazma və oxuma ayrılır
export class SifarisYaratCommand { constructor(public readonly istifadeciId: number, public readonly setirler: Setir[]) {} }

@CommandHandler(SifarisYaratCommand)
export class SifarisYaratHandler implements ICommandHandler<SifarisYaratCommand> {
  constructor(private readonly repo: SifarisRepo, private readonly eventBus: EventBus) {}
  async execute(cmd: SifarisYaratCommand) {
    const sifaris = Sifaris.yarat(cmd.istifadeciId, cmd.setirler);   // domen məntiqi
    await this.repo.save(sifaris);
    this.eventBus.publish(new SifarisYaradildi(sifaris.id));
  }
}

@QueryHandler(SifarisleriGetirQuery)
export class SifarisleriGetirHandler { /* oxu modelindən sürətli sorğu */ }

// Hadisə
@EventsHandler(SifarisYaradildi)
export class BildirisHandler implements IEventHandler<SifarisYaradildi> {
  handle(e: SifarisYaradildi) { /* e-poçt göndər */ }
}` },
          { t: "list", items: [
            "Sinxron (HTTP/gRPC) rabitə sadədir, amma xidmətləri bir-birinə bağlayır: biri yavaşlayanda zəncir yavaşlayır. Asinxron (mesaj/hadisə) zəif bağlıdır, amma izləmək çətindir.",
            "Hadisəyönümlü: xidmət «sifariş yaradıldı» hadisəsi yayır, maraqlananlar özü dinləyir. Yeni funksiya əlavə edəndə köhnə xidmət dəyişmir.",
            "Çatdırma zəmanəti: at-least-once real dünyada standartdır — hadisə təkrar gələ bilər. Handler idempotent olmalıdır.",
            "Hər xidmətin öz bazası var: başqa xidmətin cədvəlinə birbaşa baxma, API/hadisə vasitəsilə danış.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `// Mikroservis A, B-nin bazasına birbaşa qoşulur
const sifarisler = await this.bPoolu.query('SELECT * FROM sifarisler WHERE ...');`, right: `// B xidmətinin API-si və ya hadisələri ilə
const sifarisler = await firstValueFrom(this.klient.send({ cmd: 'sifarisler.al' }, { istifadeciId }));`, why: "Ortaq baza paylanmış monolitdir: sxem dəyişikliyi hər iki xidməti sındırır və müstəqil deploy mənasını itirir. Hər xidmət öz məlumatının yeganə sahibi olmalıdır." },
          { t: "mistake", lang: "typescript", wrong: `@EventPattern('odenis_tamamlandi')
async odenis(@Payload() data) {
  await this.balans.artir(data.istifadeciId, data.mebleg);    // təkrar gələndə iki dəfə artır
}`, right: `@EventPattern('odenis_tamamlandi')
async odenis(@Payload() data) {
  if (await this.islenmis.varmi(data.hadiseId)) return;        // idempotentlik
  await this.dataSource.transaction(async (em) => {
    await em.insert(IslenmisHadise, { id: data.hadiseId });    // unikal
    await em.increment(Hesab, { istifadeciId: data.istifadeciId }, 'balans', data.mebleg);
  });
}`, why: "Mesaj növbələri adətən «ən azı bir dəfə» çatdırır: təkrar mesaj gələ bilər. İdempotent olmasa balans iki dəfə artar. Hadisə id-si ilə təkrarı qəbul etmə." },
          { t: "h", text: "Növbələr (BullMQ), keş və hadisə sənədləşdirilməsi" },
          { t: "p", text: "Uzun və ya gecikdirilə bilən işləri (e-poçt, şəkil emalı, hesabat) HTTP sorğusunda icra etmək cavabı yavaşladır və xəta olanda itirir. Növbə (BullMQ + Redis) işi dayanıqlı saxlayır, ayrıca işçi prosesi onu emal edir, uğursuzluqda isə avtomatik təkrar cəhd edir. Keş üçün cache-aside nümunəsi: əvvəl keşə bax, yoxdursa bazadan al və keşə yaz; yeniləmədə açarı sil." },
          { t: "code", lang: "typescript", code: `// Növbə: @nestjs/bullmq
BullModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (k: ConfigService) => ({ connection: { host: k.get('REDIS_HOST'), port: k.get('REDIS_PORT') } }),
}),
BullModule.registerQueue({ name: 'poct' }),

// İşi növbəyə qoy (producer)
@Injectable()
export class QeydiyyatServisi {
  constructor(@InjectQueue('poct') private readonly poct: Queue) {}

  async tamamla(istifadeci: Istifadeci) {
    await this.poct.add('xos-gelmisiniz', { istifadeciId: istifadeci.id }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: true,
      jobId: 'xos-' + istifadeci.id,                    // eyni iş iki dəfə qoyulmasın
    });
  }
}

// İşçi (consumer)
@Processor('poct')
export class PoctIscisi extends WorkerHost {
  async process(is: Job<{ istifadeciId: number }>) {
    await this.poctServisi.gonder(is.data.istifadeciId);   // xəta atsa təkrar cəhd olunur
  }
}

// Cache-aside (Redis, cache-manager v5+: TTL millisaniyə)
@Injectable()
export class MehsulKeshServisi {
  constructor(@Inject(CACHE_MANAGER) private readonly kesh: Cache, private readonly repo: MehsulRepo) {}

  async tap(id: number) {
    const acar = 'mehsul:' + id;
    const var_ = await this.kesh.get<Mehsul>(acar);
    if (var_) return var_;
    const mehsul = await this.repo.findOneByOrFail({ id });
    await this.kesh.set(acar, mehsul, 60_000);
    return mehsul;
  }

  async yenile(id: number, dto: YenileDto) {
    const m = await this.repo.update(id, dto);
    await this.kesh.del('mehsul:' + id);                // ləğv et ki, köhnə məlumat qalmasın
    return m;
  }
}` },
          { t: "terms", items: [
            ["producer / consumer", "növbəyə iş qoyan / işi növbədən götürüb emal edən tərəf."],
            ["backoff", "uğursuz cəhddən sonra gözləmə müddəti (sabit və ya eksponensial)."],
            ["cache-aside", "tətbiq özü keşə baxır, miss olanda bazadan alıb keşə yazır."],
            ["outbox", "hadisənin biznes dəyişikliyi ilə eyni tranzaksiyada yazıldığı cədvəl."],
            ["saga", "paylanmış prosesi yerli tranzaksiyalar və kompensasiya addımları ilə idarə etmək."],
          ]},
          { t: "mistake", lang: "typescript", wrong: `@Post('qeydiyyat')
async qeydiyyat(@Body() dto: CreateDto) {
  const i = await this.servis.yarat(dto);
  await this.poct.gonder(i);          // SMTP yavaşdırsa sorğu gözləyir, xəta olsa qeydiyyat da uğursuz görünür
  return i;
}`, right: `@Post('qeydiyyat')
async qeydiyyat(@Body() dto: CreateDto) {
  const i = await this.servis.yarat(dto);
  await this.poctNovbesi.add('xos-gelmisiniz', { istifadeciId: i.id }, { attempts: 3 });
  return i;
}`, why: "Yavaş və uğursuz ola bilən yan işi sorğu daxilində gözləmək cavabı gecikdirir və əsas əməliyyatı onun xətasına bağlayır. Növbəyə qoy, işçi təkrar cəhdlə emal etsin." },
          { t: "mistake", lang: "typescript", wrong: `// kəsmə: hər istifadəçiyə eyni keş açarı
await this.kesh.set('profil', profil);`, right: `await this.kesh.set('profil:' + istifadeciId, profil, 30_000);`, why: "Açarda istifadəçi id-si olmasa, bir istifadəçinin profili başqasına göstərilir. Keş açarı cavabı müəyyən edən bütün parametrləri (istifadəçi, tenant, dil) daşımalıdır." },
          { t: "tip", text: "Mikroservisə keçmədən əvvəl modul monolit daxilində növbələrdən istifadə et: asinxron işi ayırmaq çox vaxt mikroservis xərcinin yarısını verir, bahalı bölünmə olmadan." },
        ],
      },
      {
        level: "senior",
        title: "Paylanmış sistem, dayanıqlıq, müşahidə və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "CAP və uyğunluq: paylanmış sistemdə şəbəkə bölünməsi qaçılmazdır; ya uyğunluq (C), ya əlçatanlıq (A) seçirsən. Çox hallarda sonda uyğunluq (eventual consistency) qəbul edilir.",
            "Paylanmış tranzaksiya əvəzinə Saga: hər addım yerli tranzaksiyadır, uğursuzluqda kompensasiya əməliyyatları (ödənişi geri qaytar, stoku bərpa et). Orkestrasiya (mərkəzi koordinator) və xoreoqrafiya (hadisələr zənciri) variantları.",
            "Transactional Outbox: hadisəni biznes dəyişikliyi ilə eyni tranzaksiyada «outbox» cədvəlinə yaz, ayrıca proses onu brokerə göndərsin. Bazaya yazıb hadisəni itirmək (və ya əksinə) problemini həll edir.",
            "Dayanıqlıq nümunələri: zaman aşımı (hər çağırışda), təkrar cəhd (exponential backoff + jitter), qırıcı (circuit breaker), bulkhead (resurs izolyasiyası), fallback. Təkrar cəhd yalnız idempotent əməliyyatlarda.",
            "Dead-letter növbəsi: işlənməyən mesajlar ayrıca növbəyə düşür, təhlil edilir və təkrar işlədilir; zəhərli mesaj (poison message) növbəni bloklamır.",
            "Müşahidəlilik: üç sütun — log (struktur, korrelyasiya id), metrika (RED/USE: sorğu sayı, xəta, gecikmə), trace (OpenTelemetry ilə sorğunun xidmətlər arası yolu). /health (liveness/readiness) üçün @nestjs/terminus.",
            "Miqyaslama: Nest nüsxələri stateless olsun (vəziyyət Redis/bazada); üfüqi miqyaslama yük balanslayıcı ilə. Cluster/Kubernetes HPA. Uzun işlər üçün BullMQ ilə növbə və ayrıca işçi proseslər.",
            "Keş: Redis (cache-aside); ləğv etmə strategiyası, TTL, stampede (eyni anda çoxlu miss) qorunması. «Keşin ləğvi» ən çətin məsələlərdən biridir.",
            "API arxitekturası: versiyalama, geriyə uyğunluq, səhifələmə, idempotency key, OpenAPI müqaviləsi; daxili xidmətlər üçün gRPC. BFF (Backend For Frontend) hər klient üçün uyğun API verir.",
            "Deploy: Docker (multi-stage, qeyri-root istifadəçi, kiçik image), CI/CD, Kubernetes (liveness/readiness, resurs limiti), blue-green/canary, sıfır dayanma ilə miqrasiya (expand/contract), graceful shutdown (enableShutdownHooks).",
            "Təhlükəsizlik — xidmətlər arası etibar: «daxili şəbəkə təhlükəsizdir» yanlışdır. Sıfır etibar (zero trust): xidmətlər arası mTLS və ya imzalanmış token, hər xidmətdə yenidən avtorizasiya yoxlaması; gateway-in yoxladığı kimliyə kor-koranə güvənmə.",
            "Təhlükəsizlik — mesaj broker-i: autentifikasiya, TLS, ayrı istifadəçi və növbə səviyyəsində icazələr; broker-in standart qonaq (guest) hesabı bağlanmalıdır. Mesaj məzmunu etibarsız giriş kimi yoxlanılır (validasiya) — başqa xidmətdən gəlsə də.",
            "Təhlükəsizlik — hadisənin saxtalaşdırılması və təkrarı: mesajı imzala və ya broker səviyyəsində autentifikasiya et; idempotentlik və vaxt damğası ilə təkrar hücumdan (replay) qorun.",
            "Təhlükəsizlik — API gateway: rate limit, WAF, body ölçü limiti, autentifikasiya mərkəzləşdirilir; daxili xidmətlər birbaşa internetə açıq olmasın (şəbəkə siyasəti).",
            "Təhlükəsizlik — sirlərin paylanması: hər xidmətə yalnız özünə lazım olan sirr (minimal hüquq); sirr meneceri və rotasiya. Bir xidmət pozularsa zərər məhdud qalsın (blast radius).",
            "Təhlükəsizlik — tədarük zənciri: lockfile, npm audit, imzalı və skanerdən keçmiş image-lər (Trivy), qeyri-root konteyner, read-only fayl sistemi, SBOM. Asılılıq sayı artdıqca hücum səthi artır.",
            "Təhlükəsizlik — audit və izlənmə: kim nə vaxt nəyi dəyişdi (audit log) dəyişməz saxlanılır; həssas məlumat loqlanmır; log-lar mərkəzləşdirilir və giriş məhdudlaşdırılır.",
            "Təhlükəsizlik — məlumat qorunması: şifrələmə (tranzitdə TLS, saxlanmada), PII minimuma endirilir, saxlama müddəti və silmə (GDPR) siyasəti; ehtiyat nüsxələr şifrələnir və bərpa testi olunur.",
            "Təhlükəsizlik — DoS müdafiəsi: sorğu və mesaj limitləri, zaman aşımı, qırıcı, resurs kvotaları; zəhərli mesaj və çox böyük yük məhdudlaşdırılır.",
          ]},
          { t: "code", lang: "typescript", caption: "Outbox, dayanıqlı çağırış və health", code: `// 1) Transactional outbox — biznes dəyişikliyi və hadisə eyni tranzaksiyada
async sifarisYarat(dto: CreateSifarisDto, istifadeciId: number) {
  return this.dataSource.transaction(async (em) => {
    const sifaris = await em.save(em.create(Sifaris, { ...dto, istifadeciId }));
    await em.insert(Outbox, {
      id: randomUUID(),
      tip: 'sifaris_yaradildi',
      yuk: { sifarisId: sifaris.id, istifadeciId },
    });
    return sifaris;                                    // hadisə ya ikisi də yazılır, ya heç biri
  });
}

// Ayrıca işçi: outbox-u brokerə göndərir (at-least-once)
@Cron(CronExpression.EVERY_5_SECONDS)
async outboxGonder() {
  const hadiseler = await this.outboxRepo.find({ where: { gonderilib: false }, take: 100, order: { yaradilma: 'ASC' } });
  for (const h of hadiseler) {
    await firstValueFrom(this.klient.emit(h.tip, { id: h.id, ...h.yuk }));
    await this.outboxRepo.update(h.id, { gonderilib: true });
  }
}

// 2) Dayanıqlı xarici çağırış: timeout + təkrar cəhd (backoff)
cagir() {
  return this.klient.send({ cmd: 'stok.al' }, { id: 5 }).pipe(
    timeout(2000),
    retry({ count: 3, delay: (xeta, n) => timer(2 ** n * 100 + Math.random() * 100) }),   // backoff + jitter
    catchError(() => throwError(() => new ServiceUnavailableException('Stok xidməti əlçatan deyil'))),
  );
}

// 3) Health (Kubernetes liveness/readiness)
@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthCheckService, private readonly db: TypeOrmHealthIndicator) {}

  @Public()
  @Get('ready')
  @HealthCheck()
  ready() { return this.health.check([() => this.db.pingCheck('baza', { timeout: 1500 })]); }

  @Public()
  @Get('live')
  live() { return { status: 'ok' }; }                   // heç bir xarici asılılıq yoxlanmır
}` },
          { t: "h", text: "Graceful shutdown, qırıcı, idempotency key və tam sorğu həyat dövrü" },
          { t: "p", text: "Nest-də sorğunun tam yolu: gələn sorğu → middleware → guard-lar → interceptor-lar (əvvəl) → pipe-lar → controller handler → interceptor-lar (sonra, tərs sıra) → exception filter (xəta olarsa) → cavab. Bu sıranı bilmək müsahibədə ən çox soruşulanlardandır və debug zamanı qərar verməyə kömək edir: autentifikasiya nə üçün guard-dadır, validasiya nə üçün pipe-dadır, cavabın formatlanması nə üçün interceptor-dadır." },
          { t: "code", lang: "typescript", caption: "Graceful shutdown, sadə qırıcı və Idempotency-Key", code: `// main.ts: SIGTERM-də təmiz bağlanma
const app = await NestFactory.create(AppModule);
app.enableShutdownHooks();                              // OnModuleDestroy / OnApplicationShutdown çağırılır

@Injectable()
export class BazaBaglayici implements OnApplicationShutdown {
  constructor(private readonly dataSource: DataSource) {}
  async onApplicationShutdown(siqnal?: string) {
    // yeni sorğu qəbul olunmur, davam edənlər bitəndən sonra bağlan
    await this.dataSource.destroy();
  }
}

// Sadə qırıcı (circuit breaker): ardıcıl xətadan sonra çağırışı müvəqqəti dayandırır
export class Qirici {
  private xeta = 0;
  private aciqDeyilKimi = 0;                            // bu vaxtadək bağlıdır (ms)
  constructor(private readonly hed = 5, private readonly gozleme = 10_000) {}

  async icra<T>(fn: () => Promise<T>): Promise<T> {
    if (Date.now() < this.aciqDeyilKimi) throw new ServiceUnavailableException('Xidmət müvəqqəti əlçatmazdır');
    try {
      const n = await fn();
      this.xeta = 0;
      return n;
    } catch (x) {
      if (++this.xeta >= this.hed) this.aciqDeyilKimi = Date.now() + this.gozleme;
      throw x;
    }
  }
}

// Idempotency-Key: ödəniş POST-u təkrar göndəriləndə eyni nəticə
@Post('odenis')
async odenis(@Headers('idempotency-key') acar: string, @Body() dto: OdenisDto, @CariIstifadeciDek('id') id: number) {
  if (!acar || acar.length > 64) throw new BadRequestException('Idempotency-Key tələb olunur');
  return this.odenisler.birDefe(acar, id, () => this.odenisler.yarat(dto, id));
}` },
          { t: "list", items: [
            "CQRS nə vaxt? Oxu və yazma yükü/modeli kəskin fərqlənəndə (mürəkkəb hesabat vs sadə yazma). Sadə CRUD üçün CQRS artıq mürəkkəbliyi gətirir. Event Sourcing isə ayrıca, daha ağır qərardır: hadisə jurnalı həqiqət mənbəyidir.",
            "Modul sərhədləri: modul yalnız öz public API-sini (exports) açır; digər modulun repozitoriyasını birbaşa import etmə. Dairəvi asılılıq (forwardRef) çox vaxt sərhəd səhvinin əlamətidir.",
            "Hexagonal/Clean arxitektura: domen məntiqi çərçivədən (Nest, ORM) asılı olmasın; port (interfeys) və adapter (TypeORM/HTTP) ayrılsın. Böyük və uzunömürlü layihələrdə testləri və dəyişikliyi asanlaşdırır.",
            "Scope-lar və performans: REQUEST scope-lu provider zənciri hər sorğuda yenidən yaradılır və bütün asılılıq ağacı ona bağlı qalır; yalnız həqiqətən lazım olanda (çox kirayəçili kontekst) işlət, adətən AsyncLocalStorage daha yüngüldür.",
            "Fastify adapteri Express-dən daha sürətlidir (aşağı ümumi xərc), amma Express middleware-lərinin hamısı işləmir; platforma-agnostik kod yaz (HttpAdapterHost, @Res-dən qaç).",
            "Cluster/PM2 və ya konteyner çoxaltma: Node tək yivlidir; CPU-ya bağlı iş üçün worker_threads və ya ayrıca işçi xidməti, I/O üçün isə çoxlu nüsxə.",
            "Müşahidəlilik: sorğu-başına requestId, struktur loglar (pino), RED metrikaları (Prometheus), trace (OpenTelemetry); korrelyasiya ID-ni mesaj başlıqlarında xidmətlər arasında ötür.",
            "Versiya və geriyə uyğunluq: Nest versioning (URI/header), əlavə sahə əlavə etmək geriyə uyğundur, silmək və ya tipi dəyişmək yox. Köhnə versiyanı deprecation başlığı ilə elan et.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `// Hər xarici çağırışda zaman aşımı yoxdur
const res = await fetch('http://stok-xidmeti/api/stok/5');`, right: `const res = await fetch('http://stok-xidmeti/api/stok/5', { signal: AbortSignal.timeout(2000) });`, why: "Zaman aşımı olmayan çağırış asılı xidmət üzündən bütün sorğu zəncirini bloklayır: bağlantılar və yaddaş tükənir (cascading failure). Hər şəbəkə çağırışına açıq timeout qoy." },
          { t: "mistake", lang: "typescript", wrong: `// Eyni xidmət əvvəl sifarişi, sonra ödənişi tranzaksiyasız çağırır
await this.sifarisKlient.yarat(dto);
await this.odenisKlient.al(dto);       // ikincisi uğursuz olsa sifariş yetim qalır`, right: `// Saga: uğursuzluqda kompensasiya
const sifaris = await this.sifarisKlient.yarat(dto);
try {
  await this.odenisKlient.al(dto);
} catch (x) {
  await this.sifarisKlient.legvEt(sifaris.id);   // kompensasiya
  throw x;
}`, why: "Paylanmış sistemdə tək tranzaksiya yoxdur: bir addım uğursuz olsa əvvəlkiləri geri qaytarmaq (kompensasiya) lazımdır, yoxsa məlumat uyğunsuz qalır." },
          { t: "qa", items: [
            ["Nest-də sorğu həyat dövrü sırası?", "Middleware → guard → interceptor (əvvəl) → pipe → handler → interceptor (sonra) → exception filter."],
            ["CQRS nə vaxt lazım deyil?", "Sadə CRUD tətbiqlərində: əlavə abstraksiya və kod həcmi faydadan çoxdur. Oxu və yazma modelləri fərqli olanda dəyər yaradır."],
            ["REQUEST scope-un xərci nədir?", "Provider və ondan asılı hər şey hər sorğuda yenidən yaradılır, performans düşür; singleton + AsyncLocalStorage çox vaxt daha yaxşıdır."],
            ["Circuit breaker nə işə yarayır?", "Ardıcıl xətalardan sonra çağırışı müvəqqəti kəsir ki, çökmüş xidmət yüklənməsin və zəncirvari uğursuzluq olmasın; sonra yarı-açıq vəziyyətdə yenidən sınayır."],
            ["Graceful shutdown niyə vacibdir?", "Deploy zamanı davam edən sorğuları tamamlamaq, bağlantıları təmiz bağlamaq və itkini önləmək üçün; enableShutdownHooks SIGTERM-ə cavab verir."],
            ["Idempotency key nədir?", "Klientin göndərdiyi unikal açar: təkrar sorğu (şəbəkə xətası, retry) eyni nəticəni verir, əməliyyat iki dəfə icra olunmur."],
          ]},
          { t: "qa", items: [
            ["Monolit yoxsa mikroservis?", "Əvvəl modul monolit. Mikroservisə yalnız müstəqil miqyas, komanda sərhədi və ya fərqli texnologiya ehtiyacı olanda keç — paylanmış sistemin xərci böyükdür."],
            ["Paylanmış tranzaksiyanı necə əvəz edirsən?", "Saga: hər addım yerli tranzaksiya, uğursuzluqda kompensasiya əməliyyatları; sonda uyğunluq qəbul edilir."],
            ["Outbox nəyi həll edir?", "Bazaya yazıb hadisəni itirmək (və ya əksinə) problemini: hadisə biznes dəyişikliyi ilə eyni tranzaksiyada yazılır, sonra brokerə göndərilir."],
            ["Mesaj handler-i niyə idempotent olmalıdır?", "Broker adətən at-least-once çatdırır; təkrar mesaj iki dəfə təsir etməməlidir."],
            ["Daxili xidmətlər arasında təhlükəsizlik necə təmin olunur?", "Sıfır etibar: mTLS/imzalı token, hər xidmətdə avtorizasiya, minimal sirr və şəbəkə siyasəti — «daxili şəbəkə təhlükəsizdir» fərziyyəsi yoxdur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Kiçik komanda üçün ən yaxşı başlanğıc arxitektura?", options: ["Dərhal 20 mikroservis", "Modul monolit", "Hər funksiya ayrı server"], answer: 1, why: "Modul monolit sadədir və sonradan ayırmağa imkan verir." },
          { t: "quiz", q: "Hadisə handler-i niyə idempotent olmalıdır?", options: ["Sürət üçün", "Təkrar mesaj gələ bilər", "Nest tələb edir"], answer: 1, why: "At-least-once çatdırma təkrar mesajlara səbəb ola bilər." },
          { t: "quiz", q: "Paylanmış tranzaksiya əvəzinə nə işlədilir?", options: ["Saga", "synchronize", "Singleton"], answer: 0, why: "Saga kompensasiya əməliyyatları ilə uyğunluğu təmin edir." },
        ],
      },
    ],
    exercise: {
      task: "Sifariş axınını dayanıqlı et. 1) `sifarisYarat`: sifarişi və `Outbox` qeydini (`sifaris_yaradildi`) EYNİ tranzaksiyada yaz. 2) `outboxGonder` (cron): göndərilməmiş qeydləri götürüb `ClientProxy.emit` ilə yaysın və `gonderilib = true` etsin. 3) `@EventPattern('sifaris_yaradildi')` handler-i idempotent olsun: `IslenmisHadise` cədvəlinə hadisə id-ni unikal yazsın, təkrar gələndə dərhal çıxsın; RabbitMQ-da əl ilə `ack`, xətada `nack(…, false, false)`. 4) Xarici `stok.al` çağırışına `timeout(2000)` + `retry` (exponential backoff + jitter) və `ServiceUnavailableException` fallback-ı əlavə et. 5) `/health/live` və `/health/ready` (baza ping) marşrutları yaz. 6) Şərhdə: niyə başqa xidmətin bazasına birbaşa qoşulmaq olmaz, niyə hadisələr imzalanmalı/autentifikasiya olunmalıdır və daxili şəbəkəyə niyə güvənmək olmaz.",
      starter: `import { Injectable } from '@nestjs/common';\nimport { Cron, CronExpression } from '@nestjs/schedule';\nimport { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';\nimport { firstValueFrom, retry, timeout, catchError, throwError, timer } from 'rxjs';\n\n// Outbox, sifarisYarat, outboxGonder, hadisə handler-i, dayanıqlı çağırış, HealthController\n`,
      expect: "sifarisYarat dataSource.transaction içində həm sifarişi, həm Outbox-u saxlayır; @Cron outboxGonder klient.emit və gonderilib=true; handler IslenmisHadise unikal id ilə idempotent, ctx.getChannelRef().ack/nack(msg,false,false); timeout(2000) + retry({count, delay: timer(2**n*...+random)}) + catchError → ServiceUnavailableException; /health/live xarici asılılıqsız, /health/ready baza pingCheck; şərhdə ortaq baza qadağası, mesaj autentifikasiyası/imzası və sıfır etibar izah olunub.",
    },
  },
];
