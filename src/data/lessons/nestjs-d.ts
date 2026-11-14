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
