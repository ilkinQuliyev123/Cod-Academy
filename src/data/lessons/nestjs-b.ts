import type { Lesson } from "../types";

export const nestjsB: Lesson[] = [
  {
    slug: "provider",
    title: "Provider və servislər",
    intro: "Provider — Nest-in idarə etdiyi və başqa siniflərə «yeridə» biləcəyi istənilən sinifdir (servis, repozitoriya, fabrik, köməkçi). Ən çox rast gəlinəni @Injectable() ilə işarələnmiş servisdir: biznes məntiqi burada yaşayır.",
    sections: [
      {
        level: "baslangic",
        title: "Servis nədir və nə üçün lazımdır",
        blocks: [
          { t: "analogy", text: "Controller — resepşn, servis isə otelin mətbəxidir. Resepşn sifarişi qəbul edir, mətbəx isə yeməyi hazırlayır. Eyni mətbəxdən həm otaq xidməti, həm restoran istifadə edə bilər — məntiq bir yerdə, təkrarsız." },
          { t: "code", lang: "typescript", code: `import { Injectable, NotFoundException } from '@nestjs/common';

export interface Mehsul { id: number; ad: string; qiymet: number }

@Injectable()
export class MehsullarService {
  private readonly mehsullar: Mehsul[] = [{ id: 1, ad: 'Noutbuk', qiymet: 1500 }];

  siyahi(): Mehsul[] {
    return this.mehsullar;
  }

  tap(id: number): Mehsul {
    const m = this.mehsullar.find((x) => x.id === id);
    if (!m) throw new NotFoundException('Məhsul tapılmadı');
    return m;
  }

  yarat(ad: string, qiymet: number): Mehsul {
    const yeni = { id: this.mehsullar.length + 1, ad, qiymet };
    this.mehsullar.push(yeni);
    return yeni;
  }
}

// mehsullar.module.ts
@Module({
  controllers: [MehsullarController],
  providers: [MehsullarService],        // Nest-ə: bu sinfi idarə et
})
export class MehsullarModule {}

// controller konstruktordan alır
@Controller('mehsullar')
export class MehsullarController {
  constructor(private readonly mehsullar: MehsullarService) {}

  @Get(':id')
  biri(@Param('id', ParseIntPipe) id: number) {
    return this.mehsullar.tap(id);
  }
}` },
          { t: "terms", items: [
            ["provider", "modulun providers siyahısındakı, Nest-in yaradıb idarə etdiyi sinif/dəyər."],
            ["@Injectable()", "sinfin DI sisteminə qoşula biləcəyini bildirən dekorator."],
            ["servis", "biznes məntiqini saxlayan provider."],
            ["singleton", "default olaraq tətbiq boyu yalnız bir nüsxə yaranır."],
          ]},
          { t: "tip", text: "Qayda sadədir: controller nazik, servis qalın. Controller-də if/else yığınları görürsənsə, onu servisə köçür." },
        ],
      },
      {
        level: "orta",
        title: "Provider növləri: useClass, useValue, useFactory, useExisting",
        blocks: [
          { t: "code", lang: "typescript", code: `@Module({
  providers: [
    // 1) Qısa forma = { provide: MehsullarService, useClass: MehsullarService }
    MehsullarService,

    // 2) useClass — mühitə görə başqa realizasiya
    {
      provide: OdenisServisi,
      useClass: process.env.NODE_ENV === 'test' ? SahteOdenisServisi : StripeOdenisServisi,
    },

    // 3) useValue — hazır dəyər (konfiqurasiya, mock)
    { provide: 'SAYT_ADI', useValue: 'Kod Akademiyası' },

    // 4) useFactory — asılılıqlardan hesablanan dəyər, async ola bilər
    {
      provide: 'REDIS',
      inject: [ConfigService],
      useFactory: async (konfiq: ConfigService) => {
        const klient = createClient({ url: konfiq.getOrThrow('REDIS_URL') });
        await klient.connect();
        return klient;
      },
    },

    // 5) useExisting — mövcud provider üçün ləqəb
    { provide: 'POCT', useExisting: PoctServisi },
  ],
  exports: ['REDIS'],
})
export class AppModule {}

// Sinif olmayan token ilə yeritmə
constructor(
  @Inject('SAYT_ADI') private readonly sayt: string,
  @Inject('REDIS') private readonly redis: RedisClientType,
) {}` },
          { t: "list", items: [
            "Sinif tokenləri tip sistemi ilə işləyir; sətir/Symbol tokenləri üçün @Inject('AD') lazımdır, çünki interfeys icra zamanı yoxdur.",
            "Tokenləri sabitdə saxla: export const REDIS = Symbol('REDIS') — sətir səhvinin qarşısı alınır.",
            "useFactory async ola bilər: Nest həll olunana qədər gözləyir (verilənlər bazası bağlantısı üçün tipikdir).",
            "@Optional() asılılıq olmaya bilərsə: konstruktorda @Optional() @Inject('KESH') kesh?: Kesh.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `@Injectable()
export class SayacService {
  private sayac = 0;                 // hər kəs üçün ortaq vəziyyət
  artir() { return ++this.sayac; }
}
// istifadəçiyə xas məlumatı burada saxlamaq`, right: `@Injectable()
export class SayacService {
  constructor(private readonly redis: RedisService) {}
  artir(istifadeciId: number) {
    return this.redis.incr('sayac:' + istifadeciId);
  }
}`, why: "Servis singleton-dur: bütün sorğular eyni obyekti paylaşır. Sorğuya və ya istifadəçiyə xas məlumatı sinif sahəsində saxlasan, istifadəçilər bir-birinin məlumatını görür. Vəziyyət bazada/keşdə olmalıdır." },
          { t: "mistake", lang: "typescript", wrong: `@Module({
  controllers: [XController],
  // providers: [XService],   ← unudulub
})`, right: `@Module({
  controllers: [XController],
  providers: [XService],
})`, why: "Servis providers-ə yazılmayıbsa: «Nest can't resolve dependencies of the XController». @Injectable() tək kifayət deyil — modul da servisi tanımalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Scope-lar, həyat dövrü və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Scope.DEFAULT — singleton, ən sürətli. Scope.REQUEST — hər sorğuya yeni nüsxə; Scope.TRANSIENT — hər yeridən yerə ayrıca nüsxə.",
            "Request scope «yoluxucudur»: request-scoped servisdən asılı olan hər provider və controller də request-scoped olur. Performans düşür (hər sorğuda obyekt ağacı yenidən qurulur) — yalnız zəruri hallarda (multi-tenant).",
            "Sorğu kontekstini singleton-a ötürməyin əvəzi: AsyncLocalStorage (nestjs-cls) ilə sorğu vəziyyəti — scope-u dəyişmədən.",
            "Həyat dövrü qarmaqları: OnModuleInit (asılılıqlar hazırdır), OnApplicationBootstrap (hər şey qalxıb), OnModuleDestroy / BeforeApplicationShutdown / OnApplicationShutdown (təmizlik). Bağlantıları burada bağla.",
            "app.enableShutdownHooks() — SIGTERM-də qarmaqları işə salır; onsuz konteynerdə verilənlər bazası bağlantıları kəsilmir, sorğular yarımçıq qalır.",
            "Dairəvi asılılıq: A B-dən, B A-dan asılıdır — forwardRef(() => B) simptomu gizlədir. Daha yaxşı həll: ortaq məntiqi üçüncü servisə çıxar və ya hadisə (EventEmitter) ilə ayır.",
            "Dinamik provider-lər: moduleRef.resolve() ilə scope-lu provider-i əl ilə al; ModuleRef.get(X, { strict: false }) ilə servis lokatoru — yalnız istisna hallarda (gizli asılılıq yaradır).",
            "Təhlükəsizlik — vəziyyət sızması: singleton-da sorğu/istifadəçi məlumatını (cari istifadəçi, token) sahədə saxlamaq paralel sorğularda başqa istifadəçinin məlumatını açır. Bu, klassik Nest səhvidir.",
            "Təhlükəsizlik — sirlər: provider-də API açarını koda yazma. useFactory + ConfigService.getOrThrow ilə ətraf mühitdən al; yoxdursa tətbiq qalxmasın (fail fast).",
            "Təhlükəsizlik — qlobal provider-lərin həddindən çox istifadəsi: @Global modul asılılıqları gizlədir və hər modula təsadüfən giriş verir.",
          ]},
          { t: "code", lang: "typescript", caption: "Bağlantı həyat dövrü və fail-fast fabrik", code: `export const POSTGRES = Symbol('POSTGRES');

@Module({
  providers: [
    {
      provide: POSTGRES,
      inject: [ConfigService],
      useFactory: (konfiq: ConfigService) => {
        // getOrThrow: dəyər yoxdursa tətbiq qalxmır
        return new Pool({ connectionString: konfiq.getOrThrow<string>('DATABASE_URL'), max: 10 });
      },
    },
    PostgresBagla,
  ],
  exports: [POSTGRES],
})
export class VerilenlerBazasiModule {}

@Injectable()
export class PostgresBagla implements OnApplicationShutdown {
  constructor(@Inject(POSTGRES) private readonly pool: Pool) {}

  async onApplicationShutdown(siqnal?: string) {
    await this.pool.end();                 // bağlantıları təmiz bağla
  }
}

// main.ts
const app = await NestFactory.create(AppModule);
app.enableShutdownHooks();                 // SIGTERM/SIGINT-də yuxarıdakı qarmaq işləyir
await app.listen(3000);` },
          { t: "qa", items: [
            ["Provider nədir?", "Nest DI konteynerinin yaradıb idarə etdiyi və başqa siniflərə yeritdiyi sinif və ya dəyər."],
            ["useClass, useValue, useFactory fərqi?", "useClass — sinif nüsxəsi; useValue — hazır dəyər; useFactory — asılılıqlardan hesablanan (async ola bilən) dəyər."],
            ["Provider-lər niyə default singleton-dur?", "Performans və ortaq resurs (bağlantı hovuzu) üçün. Buna görə sorğuya xas vəziyyət sahədə saxlanmamalıdır."],
            ["Request scope-un bahası nədir?", "Hər sorğuda yeni nüsxə yaranır və scope yuxarı zəncirlə yayılır — gecikmə və yaddaş artır."],
            ["Tətbiq söndürülərkən bağlantılar necə təmiz bağlanır?", "enableShutdownHooks() + OnApplicationShutdown/OnModuleDestroy qarmaqları."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Servisi Nest-ə tanıtmaq üçün nə lazımdır?", options: ["Yalnız @Injectable()", "@Injectable() və modulun providers siyahısı", "Yalnız controller-də import"], answer: 1, why: "Dekorator sinfi işarələyir, providers isə modulda qeydiyyat edir." },
          { t: "quiz", q: "Servis default olaraq neçə nüsxə ilə yaranır?", options: ["Hər sorğuda yeni", "Tətbiq boyu bir", "Hər controller üçün bir"], answer: 1, why: "Default scope singleton-dur." },
          { t: "quiz", q: "Sətir tokeni ilə provider yeritmək üçün?", options: ["@Inject('AD')", "@Optional()", "@Global()"], answer: 0, why: "Sinif olmayan tokenlər @Inject ilə göstərilir." },
        ],
      },
    ],
    exercise: {
      task: "`SayfaService` və modulunu yaz. 1) `@Injectable()` servis `ziyaretSay(sehife)` metodu ilə sayı Map-də saxlasın (sadəlik üçün). 2) Modulda `'SAYT_ADI'` tokeni üçün `useValue`, `ZAMAN` tokeni üçün `useFactory` (cari Date qaytarır) provider-ləri elan et. 3) Servis konstruktordan `@Inject('SAYT_ADI')` alsın. 4) `OnModuleInit` qarmağı ilə konsola «hazır» yazsın. 5) Şərhdə servisin niyə sorğuya xas məlumat (istifadəçi adı) saxlamamalı olduğunu izah et.",
      starter: `import { Inject, Injectable, Module, OnModuleInit } from '@nestjs/common';\n\n// SayfaService, provider-lər və SayfaModule\n`,
      expect: "@Injectable() SayfaService; Map ilə sayğac; constructor(@Inject('SAYT_ADI') private readonly sayt: string); implements OnModuleInit + onModuleInit(); modulda providers: SayfaService, { provide: 'SAYT_ADI', useValue: ... }, { provide: 'ZAMAN' (və ya Symbol), useFactory: () => new Date() }; şərhdə singleton-da sorğuya/istifadəçiyə xas vəziyyətin paylaşılacağı izah olunub.",
    },
  },
  {
    slug: "di",
    title: "Dependency Injection",
    intro: "Dependency Injection (DI) — sinif öz asılılıqlarını özü yaratmır, onları kənardan alır. Nest-də bu işi IoC konteyner görür: konstruktora baxır, lazım olan provider-ləri tapıb verir.",
    sections: [
      {
        level: "baslangic",
        title: "Niyə DI?",
        blocks: [
          { t: "analogy", text: "Aşpaz hər dəfə un əkib dəyirman qurmur — un hazır gətirilir. DI də belədir: sinif «mənə verilənlər bazası lazımdır» deyir, konteyner onu gətirir. Sabah baza dəyişsə, aşpaz heç nə bilmir." },
          { t: "code", lang: "typescript", caption: "DI-siz (bərk bağlı) və DI ilə", code: `// ❌ Sinif asılılığı özü yaradır: test etmək və dəyişmək çətindir
class SifarisServisi {
  private poct = new PoctServisi();        // birbaşa bağlılıq
  yarat() { this.poct.gonder('Sifariş qəbul edildi'); }
}

// ✅ Konstruktordan alır
@Injectable()
export class SifarislerService {
  constructor(private readonly poct: PoctServisi) {}   // Nest özü verir
  yarat() { this.poct.gonder('Sifariş qəbul edildi'); }
}

// Testdə asanlıqla əvəz olunur:
const servis = new SifarislerService({ gonder: jest.fn() } as any);` },
          { t: "terms", items: [
            ["asılılıq", "sinfin işləməsi üçün lazım olan başqa sinif/dəyər."],
            ["IoC konteyner", "obyektləri yaradan və asılılıqları bağlayan Nest daxili mexanizmi."],
            ["konstruktor yeridilməsi", "asılılıqların konstruktor parametri kimi alınması (ən çox işlənən yol)."],
            ["token", "provider-i tapmaq üçün açar (sinif, sətir, Symbol)."],
          ]},
          { t: "tip", text: "private readonly parametr qısa yazılışdır: TypeScript həm sahə yaradır, həm də ona dəyər mənimsədir. Nest konstruktor parametrlərinin tipinə baxaraq nəyi yeridəcəyini bilir." },
        ],
      },
      {
        level: "orta",
        title: "İnterfeys, abstrakt sinif və modullar arası həll",
        blocks: [
          { t: "p", text: "TypeScript interfeysləri icra zamanı yoxdur, ona görə onları token kimi işlətmək olmur. İki yol: abstrakt sinif (tip və token eyni anda) və ya Symbol token + @Inject." },
          { t: "code", lang: "typescript", code: `// Variant A: abstrakt sinif həm kontrakt, həm tokendir
export abstract class PoctGondericisi {
  abstract gonder(kime: string, metn: string): Promise<void>;
}

@Injectable()
export class SmtpGonderici extends PoctGondericisi {
  async gonder(kime: string, metn: string) { /* nodemailer ... */ }
}

@Module({
  providers: [{ provide: PoctGondericisi, useClass: SmtpGonderici }],
  exports: [PoctGondericisi],
})
export class PoctModule {}

@Injectable()
export class BildirisService {
  constructor(private readonly poct: PoctGondericisi) {}   // konkret sinifi bilmir
}

// Variant B: interfeys + Symbol token
export const KESH = Symbol('KESH');
export interface Kesh { al(a: string): Promise<string | null>; yaz(a: string, d: string, san: number): Promise<void> }

constructor(@Inject(KESH) private readonly kesh: Kesh) {}` },
          { t: "list", items: [
            "Nest asılılığı həll edərkən: eyni modulun providers-ə, sonra imports etdiyin modulların exports-una baxır.",
            "Başqa modulun servisi lazımdırsa: o modul onu exports etməli, sən də modulunu imports etməlisən. Servisi öz providers-inə köçürmək ikinci nüsxə yaradır.",
            "Xəta: «Nest can't resolve dependencies of the A (?). Please make sure that the argument B at index [0] is available in the AModule context» — B ya providers-də, ya da imports-dakı modulun exports-undadır.",
            "Property injection (@Inject sahəyə) mümkündür, amma konstruktor yeridilməsi tövsiyə olunur: asılılıqlar açıq görünür.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `@Module({
  providers: [SifarislerService, IstifadecilerService],   // başqa modulun servisini kopyalayır
})
export class SifarislerModule {}`, right: `@Module({
  imports: [IstifadecilerModule],        // o modul IstifadecilerService-i exports edir
  providers: [SifarislerService],
})
export class SifarislerModule {}`, why: "Servisi iki modulda providers-ə yazanda iki ayrı nüsxə yaranır; vəziyyət və bağlantılar bölünür, öz asılılıqları da bu modulda həll olunmalı olur." },
          { t: "mistake", lang: "typescript", wrong: `export interface Gonderici { gonder(): void }

constructor(private readonly g: Gonderici) {}    // icra zamanı interfeys yoxdur`, right: `export const GONDERICI = Symbol('GONDERICI');

constructor(@Inject(GONDERICI) private readonly g: Gonderici) {}`, why: "Interfeys kompilyasiyadan sonra silinir, Nest onu token kimi tapa bilmir. Abstrakt sinif və ya Symbol + @Inject işlət." },
        ],
      },
      {
        level: "senior",
        title: "Konteynerin içi, dairəvi asılılıq və test",
        blocks: [
          { t: "list", items: [
            "TypeScript emitDecoratorMetadata açıq olanda kompilyator konstruktor parametr tiplərini design:paramtypes metadatasına yazır; Nest onu reflect-metadata ilə oxuyur. Bu parametr olmasa DI işləmir (tsconfig-də emitDecoratorMetadata və experimentalDecorators).",
            "Konteyner asılılıq qrafını qurur və topoloji sıra ilə yaradır. Dairə varsa — qalxarkən xəta. forwardRef iki tərəfdə lazımdır və yalnız simptomu gizlədir.",
            "Dairəvi asılılığın düzgün həlli: ortaq məntiqi üçüncü servisə çıxar; yaxud hadisə ilə ayır (EventEmitter2): A hadisə yayır, B dinləyir — kod bağlılığı yoxdur.",
            "Modul sərhədləri: exports yalnız lazım olanı aç. Hər şeyi export etmək və @Global işlətmək «hamı hamıdan asılıdır» vəziyyətinə aparır.",
            "ModuleRef: kontekstdə provider-i dinamik tapmaq (moduleRef.get / resolve / create). Plugin sistemləri və strategiya seçimi üçün faydalı, amma gizli asılılıq yaradır.",
            "Strategiya nümunəsi: çoxlu realizasiyanı multi-provider kimi topla — fabrik ilə massiv yerit və ya DiscoveryService ilə metadata əsaslı tap.",
            "Test: Test.createTestingModule({ providers: [X, { provide: Asilik, useValue: mock }] }) — yalnız lazım olan qrafı qurur, real asılılıq yerinə saxta qoyursan. DI-nin əsas qazancı budur.",
            "overrideProvider(...).useValue(...) mövcud modulu götürüb yalnız bir provider-i dəyişməyə imkan verir (e2e testdə real ödəniş servisi əvəzinə saxta).",
            "Təhlükəsizlik — sirrin yeridilməsi: parolu və açarı sinif sahəsinə yazıb log/serializasiya zamanı çıxarma. Konfiqurasiyanı ConfigService-dən al və obyekti olduğu kimi loqlama.",
            "Təhlükəsizlik — saxta (mock) provider-lərin istehsalata düşməsi: useClass-ı şərtə bağlayanda (NODE_ENV) yanlış mühitdə «hər kəsə icazə verən» saxta guard/servis aktiv ola bilər. Təhlükəsizliklə bağlı provider-ləri heç vaxt mühitə görə söndürmə.",
            "Təhlükəsizlik — tədarük zənciri: hər üçüncü tərəf modul DI konteynerində tam hüquqla işləyir (bütün qlobal provider-lərə çatır). Etibar etdiyin paketləri istifadə et, lockfile-ı yoxla (npm audit).",
          ]},
          { t: "code", lang: "typescript", caption: "Saxta asılılıqla modul testi", code: `describe('SifarislerService', () => {
  let servis: SifarislerService;
  const poct = { gonder: jest.fn().mockResolvedValue(undefined) };
  const repo = { save: jest.fn(), findOne: jest.fn() };

  beforeEach(async () => {
    const modul = await Test.createTestingModule({
      providers: [
        SifarislerService,
        { provide: PoctGondericisi, useValue: poct },
        { provide: getRepositoryToken(Sifaris), useValue: repo },
      ],
    }).compile();

    servis = modul.get(SifarislerService);
  });

  it('sifariş yaradanda bildiriş göndərir', async () => {
    repo.save.mockResolvedValue({ id: 1, istifadeciId: 5 });
    await servis.yarat({ mehsulId: 2 }, 5);
    expect(poct.gonder).toHaveBeenCalledTimes(1);
  });
});` },
          { t: "qa", items: [
            ["DI nə verir?", "Zəif bağlılıq, asan test (mock yeridilir), asılılığın mərkəzləşmiş idarəsi və ömür dövrü nəzarəti."],
            ["Nest asılılığı necə tanıyır?", "Konstruktor parametrlərinin tip metadatasından (emitDecoratorMetadata) və ya @Inject tokenindən."],
            ["Interfeysi niyə birbaşa yeridə bilmirik?", "İcra zamanı interfeys yoxdur; abstrakt sinif və ya Symbol token işlədilir."],
            ["Dairəvi asılılıq necə həll olunur?", "forwardRef müvəqqətidir; düzgün yol — ortaq məntiqi ayırmaq və ya hadisə ilə ayırmaq."],
            ["Testdə provider-i necə əvəz edirsən?", "createTestingModule-da { provide, useValue } və ya overrideProvider."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "DI-nin əsas faydası?", options: ["Kod qısalır", "Asılılıqlar kənardan verilir, əvəz etmək və test asanlaşır", "Tətbiq sürətlənir"], answer: 1, why: "Zəif bağlılıq və testlənəbilirlik." },
          { t: "quiz", q: "Başqa modulun servisini istifadə etmək üçün?", options: ["Onu öz providers-inə köçür", "O modul exports etsin, sən modulunu imports et", "@Global qoy"], answer: 1, why: "exports + imports düzgün yoldur; kopyalama ikinci nüsxə yaradır." },
          { t: "quiz", q: "Interfeys tokeni üçün nə işlədilir?", options: ["Symbol + @Inject və ya abstrakt sinif", "@Injectable() interfeysə", "Heç nə lazım deyil"], answer: 0, why: "Interfeys icra zamanı yoxdur." },
        ],
      },
    ],
    exercise: {
      task: "Abstrakt `Kesh` sinfi (al/yaz) və iki realizasiya yaz: `YaddasKesh` (Map) və `RedisKesh` (sadəcə şərhli skelet). 1) Modulda `{ provide: Kesh, useClass: YaddasKesh }` ilə qeydiyyat et və exports et. 2) `MehsullarService` konstruktordan `Kesh` alsın (konkret sinifi bilməsin). 3) Test yaz: `Test.createTestingModule` ilə `Kesh` əvəzinə `useValue` saxta obyekti qoy və servisin keşi çağırdığını yoxla. 4) Şərhdə dairəvi asılılığın niyə forwardRef ilə deyil, üçüncü servis ilə həll olunmalı olduğunu yaz.",
      starter: `import { Injectable, Module } from '@nestjs/common';\nimport { Test } from '@nestjs/testing';\n\n// Kesh, YaddasKesh, RedisKesh, MehsullarService, KeshModule, test\n`,
      expect: "abstract class Kesh abstract al/yaz; YaddasKesh extends Kesh Map ilə; modulda { provide: Kesh, useClass: YaddasKesh } + exports: [Kesh]; MehsullarService constructor(private readonly kesh: Kesh); test Test.createTestingModule providers-də { provide: Kesh, useValue: mock } və expect(mock.al).toHaveBeenCalled; şərhdə dairəvi asılılıq üçün üçüncü servis/hadisə yolu izah olunub.",
    },
  },
  {
    slug: "dto",
    title: "DTO və validasiya",
    intro: "DTO (Data Transfer Object) — sorğunun və cavabın formasını təsvir edən sinifdir. class-validator ilə birlikdə gələn məlumatı avtomatik yoxlayır: yanlış məlumat controller-ə çatmadan 400 ilə rədd olunur.",
    sections: [
      {
        level: "baslangic",
        title: "İlk DTO və ValidationPipe",
        blocks: [
          { t: "analogy", text: "DTO — hava limanındakı təhlükəsizlik yoxlamasıdır. Çantada nə var, nə yoxdur — qapıdan keçməmiş yoxlanılır. Qadağan olunmuş əşya (yanlış məlumat) içəri buraxılmır." },
          { t: "code", lang: "bash", code: `npm install class-validator class-transformer` },
          { t: "code", lang: "typescript", code: `// create-istifadeci.dto.ts
import { IsEmail, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreateIstifadeciDto {
  @IsString()
  @Length(2, 50)
  ad: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 72)
  parol: string;

  @IsOptional()
  @IsInt()
  @Min(13)
  @Max(120)
  yas?: number;
}

// main.ts — qlobal aktivləşdirmə
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,              // DTO-da olmayan sahələri atır
  forbidNonWhitelisted: true,   // artıq sahə varsa 400
  transform: true,              // JSON-u DTO nüsxəsinə çevirir
}));

// controller
@Post()
yarat(@Body() dto: CreateIstifadeciDto) {
  return this.istifadeciler.yarat(dto);
}` },
          { t: "p", text: "Yanlış sorğu göndərəndə Nest özü 400 qaytarır: { statusCode: 400, message: ['email must be an email', 'parol must be longer than or equal to 8 characters'], error: 'Bad Request' }." },
          { t: "terms", items: [
            ["DTO", "məlumatın formasını təsvir edən sinif."],
            ["class-validator", "dekoratorlarla yoxlama qaydaları (@IsEmail, @Length)."],
            ["class-transformer", "düz obyekti sinif nüsxəsinə çevirir (@Type, @Transform)."],
            ["ValidationPipe", "DTO-nu yoxlayan Nest pipe-ı."],
            ["whitelist", "DTO-da elan olunmayan sahələri silir."],
          ]},
          { t: "tip", text: "DTO üçün interface yox, sinif işlət: interfeys icra zamanı yoxdur, dekoratorlar isə yalnız sinifdə işləyir." },
        ],
      },
      {
        level: "orta",
        title: "İç-içə obyektlər, Partial, Query DTO və Swagger",
        blocks: [
          { t: "code", lang: "typescript", code: `import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsPositive, ValidateNested } from 'class-validator';
import { PartialType, OmitType, PickType } from '@nestjs/mapped-types';

export enum Kateqoriya { Telefon = 'telefon', Noutbuk = 'noutbuk' }

class SifarisSetirDto {
  @IsInt() @IsPositive() mehsulId: number;
  @IsInt() @IsPositive() say: number;
}

export class CreateSifarisDto {
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => SifarisSetirDto)             // iç-içə obyektin çevrilməsi üçün vacib
  setirler: SifarisSetirDto[];
}

// Yenilənmə: bütün sahələr ixtiyari
export class UpdateIstifadeciDto extends PartialType(OmitType(CreateIstifadeciDto, ['parol'] as const)) {}

// Query DTO: sətir gələn dəyəri ədədə çevirir
export class SehifelemeDto {
  @Type(() => Number) @IsInt() @Min(1) sehife: number = 1;
  @Type(() => Number) @IsInt() @Min(1) @Max(100) olcu: number = 20;
  @IsOptional() @IsEnum(Kateqoriya) kateqoriya?: Kateqoriya;
}

@Get()
siyahi(@Query() sorgu: SehifelemeDto) { ... }` },
          { t: "list", items: [
            "PartialType / PickType / OmitType / IntersectionType (@nestjs/mapped-types və ya @nestjs/swagger) — DTO-nu təkrar yazmadan yenidən qur.",
            "Xüsusi xəta mesajı: @IsEmail({}, { message: 'Email düzgün deyil' }).",
            "Xüsusi qayda: @Matches(/regex/), @IsStrongPassword(), öz dekoratorun (registerDecorator) və ya ValidatorConstraint ilə (məsələn, email unikaldırmı — async yoxlama).",
            "ValidationPipe qlobal qoşulur; ayrı marşrutda dəyişdirmək üçün @UsePipes(new ValidationPipe({ ... })).",
          ]},
          { t: "mistake", lang: "typescript", wrong: `class SifarisDto {
  @ValidateNested({ each: true })
  setirler: SifarisSetirDto[];          // @Type yoxdur → yoxlama keçilir
}`, right: `class SifarisDto {
  @ValidateNested({ each: true })
  @Type(() => SifarisSetirDto)
  setirler: SifarisSetirDto[];
}`, why: "@Type olmadan class-transformer iç-içə düz obyektləri sinfə çevirmir və class-validator onların dekoratorlarını görmür — yanlış məlumat sakitcə keçir." },
          { t: "mistake", lang: "typescript", wrong: `app.useGlobalPipes(new ValidationPipe());      // whitelist yoxdur

@Post()
yarat(@Body() dto: CreateIstifadeciDto) {
  return this.repo.save(dto);          // gövdədə rol: 'admin' də gəlsə?
}`, right: `app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));`, why: "whitelist olmasa DTO-da olmayan sahələr də obyektdə qalır; repo.save onları bazaya yazar. «rol: admin» göndərən hücumçu özünü admin edə bilər (mass assignment)." },
        ],
      },
      {
        level: "senior",
        title: "Zod/valibot, cavab DTO-su, performans və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Validasiya iki yerdə olmalıdır: daxil olan sorğu (DTO + ValidationPipe) və bazaya/xarici API-yə gedən məlumat. Tip sistemi icra zamanı məlumatı yoxlamır.",
            "Alternativ: Zod/valibot sxemləri (nestjs-zod) — tip sxemdən çıxarılır (z.infer), DTO dekoratorlarına ehtiyac qalmır. Tək həqiqət mənbəyi.",
            "transform: true tip çevirməsi edir, amma enableImplicitConversion ilə ehtiyatlı ol: 'false' sətri Boolean('false') = true çevirə bilər. Açıq @Transform yaz.",
            "Cavab DTO-su ayrıca olmalıdır: entity-ni birbaşa qaytarmaq parol heşi, daxili sahələr kimi həssas məlumatı çıxarır. @Expose + ClassSerializerInterceptor (excludeExtraneousValues) və ya əl ilə xəritələndirmə.",
            "Validasiya xətası cavabı: exceptionFactory ilə öz formatını ver (sahə → mesajlar xəritəsi); daxili detalları (sinif adı, yol) sızdırma.",
            "Performans: class-validator hər sorğuda yoxlama aparır; böyük massivləri @ArrayMaxSize ilə məhdudla, dərin iç-içə strukturu qadağan et.",
            "Təhlükəsizlik — ReDoS: @Matches ilə mürəkkəb regex bir sorğu ilə CPU-nu doldura bilər. Sadə, xətti regex işlət və sətir uzunluğunu əvvəl məhdudla (@MaxLength).",
            "Təhlükəsizlik — ölçü limiti: JSON gövdə ölçüsünü məhdudla (app.useBodyParser('json', { limit: '100kb' })); massiv/sətir uzunluğuna üst hədd qoy. Yoxlamasız 50 MB JSON yaddaşı doldurur.",
            "Təhlükəsizlik — prototype pollution: gövdədə __proto__ / constructor açarları. whitelist + forbidNonWhitelisted onları rədd edir; Object.assign(entity, body) kimi birbaşa birləşdirmədən qaçın.",
            "Təhlükəsizlik — NoSQL inyeksiyası: JSON-da { $ne: null } kimi obyekt gələ bilər. @IsString() ilə tipi məcbur et; yoxsa Mongo sorğusuna operator keçir.",
            "Təhlükəsizlik — validasiya ≠ təmizləmə: @IsString() HTML/skripti rədd etmir. Çıxışda kodlaşdırma (XSS), sorğuda parametrləşdirmə (SQL) əlavə lazımdır.",
            "Təhlükəsizlik — klient validasiyasına güvənmə: brauzer yoxlaması UX üçündür; real müdafiə yalnız serverdədir.",
          ]},
          { t: "code", lang: "typescript", caption: "Sərt konfiqurasiya və cavab DTO-su", code: `// main.ts
app.useBodyParser('json', { limit: '100kb' });
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  stopAtFirstError: false,
  exceptionFactory: (xetalar) =>
    new BadRequestException({
      mesaj: 'Yanlış məlumat',
      sahələr: Object.fromEntries(
        xetalar.map((x) => [x.property, Object.values(x.constraints ?? {})]),
      ),
    }),
}));

// istifadeci.cavab.dto.ts — yalnız ağ siyahıdakı sahələr çıxır
export class IstifadeciCavabDto {
  @Expose() id: number;
  @Expose() ad: string;
  @Expose() email: string;
  // parolHesi burada YOXDUR

  static dan(e: Istifadeci): IstifadeciCavabDto {
    return plainToInstance(IstifadeciCavabDto, e, { excludeExtraneousValues: true });
  }
}

// Unikal email: async validator
@ValidatorConstraint({ async: true })
@Injectable()
export class EmailBosdurMu implements ValidatorConstraintInterface {
  constructor(private readonly istifadeciler: IstifadecilerService) {}
  async validate(email: string) { return !(await this.istifadeciler.emailVarmi(email)); }
  defaultMessage() { return 'Bu email artıq qeydiyyatdadır'; }
}` },
          { t: "qa", items: [
            ["DTO niyə sinif olmalıdır?", "Dekoratorlar və metadata yalnız siniflərdə işləyir; interfeys icra zamanı yoxdur."],
            ["whitelist nə edir?", "DTO-da elan olunmayan sahələri silir; forbidNonWhitelisted ilə isə 400 qaytarır. Mass assignment-dən qoruyur."],
            ["İç-içə obyekt yoxlanmırsa səbəb nə ola bilər?", "@ValidateNested ilə yanaşı @Type(() => Sinif) yoxdur."],
            ["Cavab DTO-su niyə lazımdır?", "Entity-ni birbaşa qaytarmaq həssas sahələri (parol heşi) sızdıra bilər; ağ siyahı ilə nəyin çıxdığını özün seçirsən."],
            ["Validasiya SQL inyeksiyasından qoruyurmu?", "Tək başına yox. Parametrləşdirilmiş sorğu/ORM və çıxışda kodlaşdırma əlavə lazımdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "DTO üçün interfeys niyə yaramır?", options: ["Yavaşdır", "İcra zamanı yoxdur, dekoratorlar işləməz", "Nest qadağan edib"], answer: 1, why: "Dekoratorlar siniflərə bağlıdır; interfeys kompilyasiyada silinir." },
          { t: "quiz", q: "DTO-da olmayan sahələri silən seçim?", options: ["transform", "whitelist", "skipMissing"], answer: 1, why: "whitelist: true artıq sahələri atır." },
          { t: "quiz", q: "İç-içə DTO-nu yoxlamaq üçün?", options: ["@ValidateNested + @Type", "Yalnız @IsObject", "@Nested"], answer: 0, why: "Hər ikisi lazımdır." },
        ],
      },
    ],
    exercise: {
      task: "`CreateKursDto` yaz: `ad` (2–80 simvol sətir), `qiymet` (müsbət ədəd, ən çox 10000), `etiketler` (sətir massivi, ən çox 10 element, hər biri 1–20 simvol), `muellim` (iç-içə `MuellimDto`: `ad` sətir, `email` düzgün email), `kateqoriya` (enum: web | mobil | data, ixtiyari). Sonra: 1) `UpdateKursDto` — hamısı ixtiyari (PartialType). 2) `KursSorgusuDto` — query-dən `sehife` (≥1, default 1), `olcu` (1–50, default 20) ədəd kimi. 3) `main.ts` üçün `ValidationPipe` konfiqurasiyasını yaz (whitelist, forbidNonWhitelisted, transform) və JSON limiti 100kb. 4) `KursCavabDto` — yalnız id, ad, qiymet çıxsın (@Expose + excludeExtraneousValues).",
      starter: `import { Type, Expose, plainToInstance } from 'class-transformer';\nimport { IsArray, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, Length, Max, Min, ValidateNested, ArrayMaxSize } from 'class-validator';\nimport { PartialType } from '@nestjs/mapped-types';\n\n// DTO-lar və pipe konfiqurasiyası\n`,
      expect: "CreateKursDto: @IsString @Length(2,80) ad; @IsNumber/@IsPositive @Max(10000) qiymet; @IsArray @ArrayMaxSize(10) @IsString({each:true}) @Length(1,20,{each:true}) etiketler; @ValidateNested + @Type(() => MuellimDto) muellim (MuellimDto: @IsString ad, @IsEmail email); @IsOptional @IsEnum kateqoriya; UpdateKursDto extends PartialType(CreateKursDto); KursSorgusuDto @Type(() => Number) @IsInt @Min(1) sehife=1, olcu @Max(50) =20; ValidationPipe({whitelist:true, forbidNonWhitelisted:true, transform:true}) və json limit '100kb'; KursCavabDto @Expose id/ad/qiymet və plainToInstance excludeExtraneousValues: true.",
    },
  },
  {
    slug: "pipe",
    title: "Pipe-lar",
    intro: "Pipe — controller metoduna çatmazdan əvvəl parametri çevirən (transform) və ya yoxlayan (validate) sinifdir. Yanlış dəyər olarsa, istisna atır və metod heç işə düşmür.",
    sections: [
      {
        level: "baslangic",
        title: "Hazır pipe-lar",
        blocks: [
          { t: "analogy", text: "Pipe — fabrik xəttindəki nəzarətçidir. Məhsul (parametr) maşına çatmamış ya düzgün formaya salınır, ya da qüsurludursa kənara atılır. Maşın (controller) yalnız təmiz məhsulla işləyir." },
          { t: "code", lang: "typescript", code: `import {
  Controller, Get, Param, Query,
  ParseIntPipe, ParseBoolPipe, ParseUUIDPipe, ParseArrayPipe, ParseEnumPipe, DefaultValuePipe,
} from '@nestjs/common';

enum Siralama { Artan = 'artan', Azalan = 'azalan' }

@Controller('kitablar')
export class KitablarController {
  @Get(':id')
  biri(@Param('id', ParseIntPipe) id: number) {            // "abc" → 400
    return { id };
  }

  @Get('uuid/:kod')
  uuid(@Param('kod', new ParseUUIDPipe({ version: '4' })) kod: string) {
    return { kod };
  }

  @Get()
  siyahi(
    @Query('aktiv', new DefaultValuePipe(true), ParseBoolPipe) aktiv: boolean,
    @Query('sira', new ParseEnumPipe(Siralama)) sira: Siralama,
    @Query('idler', new ParseArrayPipe({ items: Number, separator: ',' })) idler: number[],
  ) {
    return { aktiv, sira, idler };
  }
}` },
          { t: "terms", items: [
            ["ParseIntPipe", "sətri tam ədədə çevirir; alınmasa 400."],
            ["ParseUUIDPipe", "UUID formatını yoxlayır."],
            ["ParseEnumPipe", "dəyərin enum-a daxil olduğunu yoxlayır."],
            ["DefaultValuePipe", "dəyər yoxdursa standart verir."],
            ["ValidationPipe", "DTO yoxlayır (əvvəlki dərs)."],
          ]},
          { t: "tip", text: "Pipe-ı üç yerdə qoşmaq olar: parametrdə (@Param('id', ParseIntPipe)), metoddakı/controllerdəki @UsePipes ilə, və ya qlobal app.useGlobalPipes ilə." },
        ],
      },
      {
        level: "orta",
        title: "Öz pipe-ını yazmaq",
        blocks: [
          { t: "code", lang: "typescript", code: `import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

// Sətri kiçik hərflə, kənar boşluqsuz formaya salır
@Injectable()
export class TemizSetirPipe implements PipeTransform<string, string> {
  transform(deyer: string, meta: ArgumentMetadata): string {
    if (typeof deyer !== 'string') {
      throw new BadRequestException(meta.data + ' sətir olmalıdır');
    }
    return deyer.trim().toLowerCase();
  }
}

// Parametrli pipe: ədəd aralığı
@Injectable()
export class AralikPipe implements PipeTransform<string, number> {
  constructor(private readonly min: number, private readonly max: number) {}

  transform(deyer: string): number {
    const n = Number(deyer);
    if (!Number.isInteger(n) || n < this.min || n > this.max) {
      throw new BadRequestException('Dəyər ' + this.min + ' ilə ' + this.max + ' arasında tam ədəd olmalıdır');
    }
    return n;
  }
}

@Get('axtar')
axtar(
  @Query('soz', TemizSetirPipe) soz: string,
  @Query('olcu', new AralikPipe(1, 100)) olcu: number,
) { ... }

// Məlumatı DB-dən yükləyən pipe: id → obyekt
@Injectable()
export class KitabPipe implements PipeTransform<string, Promise<Kitab>> {
  constructor(private readonly kitablar: KitablarService) {}
  async transform(id: string) {
    const n = Number(id);
    if (!Number.isInteger(n)) throw new BadRequestException('id yanlışdır');
    return this.kitablar.tap(n);                  // tapılmasa NotFoundException
  }
}
// @Get(':id') biri(@Param('id', KitabPipe) kitab: Kitab) { return kitab; }` },
          { t: "list", items: [
            "transform(deyer, meta): meta.type (body/query/param/custom), meta.metatype (tip), meta.data (parametr adı).",
            "Pipe yalnız bir parametrə baxır; bütün sorğuya yoxlama (məsələn, rollar) üçün guard işlət.",
            "Pipe-da istisna atsan, metod işə düşmür və istisna filtrlərə gedir. ValidationPipe də eyni mexanizmlə işləyir.",
            "Pipe-lar nümunə (new X(...)) və ya sinif kimi verilə bilər. Sinif verəndə Nest DI ilə yaradır — servis yeridə bilərsən.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `@Get(':id')
biri(@Param('id') id: string) {
  const n = parseInt(id);          // NaN ola bilər
  return this.servis.tap(n);       // NaN ilə sorğu
}`, right: `@Get(':id')
biri(@Param('id', ParseIntPipe) id: number) {
  return this.servis.tap(id);
}`, why: "parseInt('abc') = NaN; NaN servisə və bazaya ötürülür, anlaşılmaz xətaya və ya gözlənilməz sorğuya səbəb olur. ParseIntPipe 400 qaytarır." },
          { t: "mistake", lang: "typescript", wrong: `@Query('olcu') olcu: number      // tip ədəddir, amma əslində sətir gəlir`, right: `@Query('olcu', ParseIntPipe) olcu: number`, why: "TypeScript tipi icra zamanı çevirmə etmir. Query və param həmişə sətirdir; olcu + 1 = '201' kimi nəticə verə bilər. Çevirmə pipe ilə olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Qlobal pipe, sıra, test və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "İcra sırası: middleware → guard → interceptor (əvvəl) → pipe → controller → interceptor (sonra) → exception filter (xəta olsa). Pipe guard-dan SONRA işləyir: giriş icazəsiz sorğuda boş yerə yoxlama aparılmır.",
            "Qlobal pipe: app.useGlobalPipes(...) DI-dən kənardadır (modul kontekstinə çıxışı yoxdur). DI lazımdırsa modulda { provide: APP_PIPE, useClass: X } yaz.",
            "Pipe-ların çoxluğu: @Query('x', A, B, C) — soldan sağa, hər birinin çıxışı növbətinin girişidir.",
            "Pipe-ı çox işlətmə: hər parametrə baza sorğusu edən pipe (KitabPipe) sorğunu bir qədər gizlədir və kütləvi çağırışda N+1 yarada bilər. Mürəkkəb halda servisi çağırmaq daha şəffafdır.",
            "ParseFilePipe, ParseDatePipe (yeni versiyalarda) kimi hazır pipe-lara bax; təkrar yazma.",
            "Test: pipe sadə sinifdir — new AralikPipe(1, 10).transform('5') çağır, istisnanı expect(...).toThrow ilə yoxla. Nest konteyneri lazım deyil.",
            "Təhlükəsizlik — giriş tipinin məcbur edilməsi: sorğu parametri massiv ya obyekt ola bilər (?id[]=1&id[$ne]=1). Tipi pipe ilə dəqiq çevir (ParseIntPipe, @IsString) — yoxsa ORM-ə gözlənilməz operator keçir.",
            "Təhlükəsizlik — pipe validasiya üçün son müdafiə xətti deyil: səlahiyyət yoxlamasını pipe ilə etmə (IDOR). Pipe «formatı» yoxlayır, «icazəni» yox — bunu guard və servis edir.",
            "Təhlükəsizlik — xəta mesajlarında daxili detal (SQL, yol) sızdırma. Pipe-da atdığın mesajlar istifadəçiyə gedir: yalnız nəyin düzgün olmadığını yaz.",
            "Təhlükəsizlik — ədəd sərhədləri: Number('1e9999') = Infinity, çox böyük ədədlər dəqiqliyi itirir. Id-lər üçün Number.isSafeInteger yoxla, ölçü və ofset üçün üst hədd qoy.",
          ]},
          { t: "code", lang: "typescript", caption: "Təhlükəsiz tam ədəd pipe və DI ilə qlobal pipe", code: `@Injectable()
export class TehlukesizIdPipe implements PipeTransform<string, number> {
  transform(deyer: string, meta: ArgumentMetadata): number {
    if (typeof deyer !== 'string' || !/^[0-9]{1,15}$/.test(deyer)) {
      throw new BadRequestException(meta.data + ' müsbət tam ədəd olmalıdır');
    }
    const n = Number(deyer);
    if (!Number.isSafeInteger(n) || n < 1) {
      throw new BadRequestException(meta.data + ' yanlışdır');
    }
    return n;
  }
}

// DI ilə qlobal qeydiyyat (modul kontekstində)
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    },
  ],
})
export class AppModule {}

// Pipe testi (Nest konteyneri lazım deyil)
describe('AralikPipe', () => {
  const pipe = new AralikPipe(1, 100);
  it('düzgün dəyəri ədədə çevirir', () => expect(pipe.transform('50')).toBe(50));
  it('aralıqdan kənarı rədd edir', () => expect(() => pipe.transform('500')).toThrow(BadRequestException));
});` },
          { t: "qa", items: [
            ["Pipe-ın iki əsas rolu?", "Transformasiya (sətri ədədə çevirmək) və validasiya (yanlış dəyərə istisna atmaq)."],
            ["Pipe guard-a nisbətən nə vaxt işləyir?", "Guard-dan sonra, controller-dən əvvəl."],
            ["Niyə @Query('olcu') olcu: number tək kifayət deyil?", "TypeScript tipləri icra zamanı çevirmə etmir; dəyər sətir qalır. ParseIntPipe və ya DTO @Type(() => Number) lazımdır."],
            ["APP_PIPE niyə useGlobalPipes-dən fərqlənir?", "APP_PIPE modul kontekstində qeydiyyat olunur və DI-dən istifadə edə bilir; useGlobalPipes yox."],
            ["Pipe səlahiyyət yoxlamaq üçün uyğundurmu?", "Xeyr. Pipe formatı yoxlayır; icazə guard və servisdə yoxlanmalıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "\"abc\" ParseIntPipe-dan keçsə nə olur?", options: ["NaN qaytarır", "400 Bad Request", "0 olur"], answer: 1, why: "Pipe istisna atır, metod işə düşmür." },
          { t: "quiz", q: "Pipe-lar hansı ardıcıllıqla işləyir?", options: ["Guard-dan əvvəl", "Guard-dan sonra, controller-dən əvvəl", "Controller-dən sonra"], answer: 1, why: "Sıra: middleware → guard → interceptor → pipe → controller." },
          { t: "quiz", q: "Pipe-da DI-dən istifadə edən qlobal qeydiyyat?", options: ["APP_PIPE provider", "useGlobalPipes(new X())", "@Global()"], answer: 0, why: "APP_PIPE modul kontekstində işləyir." },
        ],
      },
    ],
    exercise: {
      task: "`SlugPipe` yaz: gələn sətri kiçik hərflə, kənar boşluqlarsız edir, boşluqları '-' ilə əvəz edir, yalnız a-z, 0-9 və '-' qalmasına icazə verir; boşdursa və ya 60 simvoldan uzundursa `BadRequestException`. Sonra `MehsulIdPipe` yaz: yalnız 1–15 rəqəmdən ibarət sətri qəbul edib `Number.isSafeInteger` ilə yoxlasın. Controller-də `GET /yazilar/:slug` (SlugPipe) və `GET /yazilar/id/:id` (MehsulIdPipe) marşrutları ver (sıraya diqqət!). Üç unit test yaz: düzgün, boş və çox uzun dəyər.",
      starter: `import { ArgumentMetadata, BadRequestException, Controller, Get, Injectable, Param, PipeTransform } from '@nestjs/common';\n\n// SlugPipe, MehsulIdPipe, YazilarController, testlər\n`,
      expect: "SlugPipe implements PipeTransform: trim, toLowerCase, boşluq → '-', regex ilə a-z0-9- yoxlaması, boş/60-dan uzunda BadRequestException; MehsulIdPipe: /^[0-9]{1,15}$/ + Number.isSafeInteger; controller @Get('id/:id') sabit yol @Get(':slug')-dan əvvəl yazılıb və hər parametr öz pipe-ı ilə; testlərdə düzgün dəyər, boş və uzun dəyər üçün toThrow yoxlanılıb.",
    },
  },
];
