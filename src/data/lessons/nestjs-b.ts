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
          { t: "h", text: "Servis başqa servisdən istifadə edir və log yazır" },
          { t: "p", text: "Servislər bir-birindən asılı ola bilər: SifarislerService məhsulu MehsullarService-dən alır. Hər servis öz məsuliyyətinə sadiq qalır. Nest-in daxili Logger sinfi ilə servis öz adı altında log yaza bilər — console.log əvəzinə onu işlət, çünki Logger səviyyələri (log, warn, error) və formatı tənzimlənir." },
          { t: "code", lang: "typescript", code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SifarislerService {
  private readonly logger = new Logger(SifarislerService.name);

  constructor(private readonly mehsullar: MehsullarService) {}

  yarat(mehsulId: number, say: number) {
    const mehsul = this.mehsullar.tap(mehsulId);            // başqa servisi çağırır
    const cem = mehsul.qiymet * say;
    this.logger.log('Sifariş yaradıldı: ' + mehsul.ad + ' x' + say);
    return { mehsul: mehsul.ad, say, cem };
  }
}` },
          { t: "list", items: [
            "Servis HTTP-ni bilmir: req, res və status kodları controller-in işidir. Servis yalnız məlumat qaytarır və ya istisna atır.",
            "Hər servis bir məsuliyyət daşıyır: sifariş məntiqi, email göndərmə, ödəniş ayrı servislərdir.",
            "Servisin metodları kiçik və adı aydın olsun: yarat, tap, yenile, sil — fəaliyyət adı + obyekt.",
          ]},
          { t: "tip", text: "Servis yazarkən özündən soruş: «Bunu controller olmadan, sadəcə TypeScript funksiyası kimi çağıra bilərəmmi?» Əgər bəli — düzgün yerdədir." },
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
          { t: "h", text: "Scope-lar: DEFAULT, REQUEST, TRANSIENT" },
          { t: "code", lang: "typescript", code: `import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';

// Singleton (default): tətbiq boyu bir nüsxə
@Injectable()
export class KonfiqService {}

// Hər sorğu üçün yeni nüsxə: sorğunun özünü yeridə bilər
@Injectable({ scope: Scope.REQUEST })
export class SorguKontekstiService {
  constructor(@Inject(REQUEST) private readonly req: Request) {}

  dil(): string {
    return this.req.headers['accept-language']?.toString() ?? 'az';
  }
}

// Hər yeridən yerdə ayrıca nüsxə (məsələn, hər sinifin öz logger-i)
@Injectable({ scope: Scope.TRANSIENT })
export class ReqemLogger {
  private oncul = '';
  setOncul(s: string) { this.oncul = s; }
}` },
          { t: "h", text: "Asinxron fabrik və ixtiyari asılılıq" },
          { t: "code", lang: "typescript", code: `export const KESH = Symbol('KESH');

@Module({
  providers: [
    {
      provide: KESH,
      // { token, optional: true } — asılılıq yoxdursa undefined ötürülür, xəta atılmır
      inject: [ConfigService, { token: METRIKA, optional: true }],
      useFactory: async (konfiq: ConfigService, metrika?: MetrikaServisi) => {
        const kesh = new RedisKesh(konfiq.getOrThrow<string>('REDIS_URL'));
        await kesh.qosul();
        metrika?.say('kesh.qosuldu');
        return kesh;
      },
    },
  ],
  exports: [KESH],
})
export class KeshModule {}` },
          { t: "mistake", lang: "typescript", wrong: `// @Injectable() unudulub
export class XService {
  constructor(private readonly y: YService) {}
}`, right: `@Injectable()
export class XService {
  constructor(private readonly y: YService) {}
}`, why: "Sinifdə heç bir dekorator olmasa TypeScript konstruktor tiplərinin metadatasını yazmır və Nest-in nəyi yeridəcəyini bilməsi mümkün olmur: «can't resolve dependencies» xətası. @Injectable() metadatanın yazılmasını tətikləyir." },
          { t: "mistake", lang: "typescript", wrong: `@Injectable()
export class SifarislerService {
  private readonly poct = new PoctServisi(process.env.SMTP_URL);   // özün yaradırsan
}`, right: `@Injectable()
export class SifarislerService {
  constructor(private readonly poct: PoctServisi) {}               // konteyner verir
}`, why: "Provider-in içində başqa provider-i new ilə yaratmaq konteynerdən yan keçmək deməkdir: onun asılılıqları, ömür dövrü (bağlantını bağlamaq) və testdə əvəz edilməsi idarə olunmur." },
          { t: "qa", items: [
            ["@Injectable() olmayan sinfi provider kimi qeydiyyat etsək nə olar?", "Asılılığı olmayan sinif işləyə bilər, amma asılılığı varsa TypeScript tip metadatasını yazmır və Nest parametrləri həll edə bilmir. Həmişə @Injectable() işlət."],
            ["Singleton ilə request scope fərqi?", "Singleton — tətbiq boyu bir nüsxə, sorğular paylaşır; request scope — hər sorğu üçün yeni nüsxə, sorğu kontekstini (REQUEST) yeridə bilir, amma bahalıdır."],
          ]},
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
          { t: "h", text: "Lifecycle qarmaqlarının dəqiq sırası" },
          { t: "p", text: "Qalxış: modulların asılılıqları həll olunur → onModuleInit (hər modulun provider-ləri üçün) → onApplicationBootstrap → app.listen (şəbəkəni açır). Söndürülmə siqnalı gələndə: onModuleDestroy → beforeApplicationShutdown → (server bağlantıları qəbul etməyi dayandırır) → onApplicationShutdown. Qarmaq async ola bilər — Nest Promise-in həllini gözləyir." },
          { t: "code", lang: "typescript", caption: "Bütün qarmaqlar bir yerdə", code: `@Injectable()
export class BagliqServisi
  implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown
{
  private readonly log = new Logger(BagliqServisi.name);

  async onModuleInit() {
    this.log.log('1) onModuleInit: asılılıqlar hazırdır, bağlantı aç');
  }
  async onApplicationBootstrap() {
    this.log.log('2) onApplicationBootstrap: bütün modullar qalxıb, işçiləri başlat');
  }
  async onModuleDestroy() {
    this.log.log('3) onModuleDestroy: yeni iş qəbul etməyi dayandır');
  }
  async beforeApplicationShutdown(siqnal?: string) {
    this.log.log('4) beforeApplicationShutdown: ' + siqnal + ' — cari işləri bitir');
  }
  async onApplicationShutdown(siqnal?: string) {
    this.log.log('5) onApplicationShutdown: bağlantıları bağla');
  }
}` },
          { t: "h", text: "ModuleRef ilə sorğu kontekstində scope-lu provider" },
          { t: "code", lang: "typescript", code: `import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class ImportServisi {
  constructor(private readonly moduleRef: ModuleRef) {}

  async isle(tenantId: string) {
    // Hər iş üçün ayrı kontekst id: request-scoped provider-in bir nüsxəsi bu iş üçün yaranır
    const kontekstId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId({ tenantId }, kontekstId);

    const servis = await this.moduleRef.resolve(TenantServisi, kontekstId);
    return servis.hesabat();
  }
}` },
          { t: "list", items: [
            "moduleRef.get(X) singleton provider-i sinxron verir; request/transient scope-lu üçün moduleRef.resolve(X) (Promise qaytarır) lazımdır — get() onlar üçün xəta atır.",
            "Request scope ağacı: asılılıq zənciri uzundursa, hər sorğuda onlarla obyekt yaranır. Ölçü: sorğu başına gecikmə və GC yükü. Əksər hallarda AsyncLocalStorage ilə singleton servis daha sürətlidir.",
            "Durable provider-lər (@Injectable({ scope: Scope.REQUEST, durable: true }) + ContextIdStrategy): multi-tenant sistemdə hər sorğu üçün yox, hər tenant üçün bir nüsxə yaradıb paylaşmaq mümkündür. Bu, request scope-un bahasını kəskin azaldır.",
            "Asinxron provider-in xətası: useFactory qalxışda xəta atarsa, tətbiq qalxmır. Bu çox vaxt yaxşıdır (fail fast): baza əlçatmazdırsa, tətbiq «sağlam» görünüb səssiz çökməsin.",
            "Provider-lərin sayı: yüzlərlə provider normaldır, qalxış vaxtı onların asinxron init işlərindən (bağlantılar) asılıdır. Uzun init-ləri paralel yox, lazım olanda yüklə; qalxış metrikini ölç.",
            "Test: singleton servisi vahid testdə new X(mock1, mock2) ilə birbaşa yaratmaq ən sürətlisidir — Nest konteyneri lazım deyil. Konteynerlə test yalnız DI konfiqurasiyasını yoxlamaq lazım olanda.",
          ]},
          { t: "qa", items: [
            ["Provider nədir?", "Nest DI konteynerinin yaradıb idarə etdiyi və başqa siniflərə yeritdiyi sinif və ya dəyər."],
            ["useClass, useValue, useFactory fərqi?", "useClass — sinif nüsxəsi; useValue — hazır dəyər; useFactory — asılılıqlardan hesablanan (async ola bilən) dəyər."],
            ["Provider-lər niyə default singleton-dur?", "Performans və ortaq resurs (bağlantı hovuzu) üçün. Buna görə sorğuya xas vəziyyət sahədə saxlanmamalıdır."],
            ["Request scope-un bahası nədir?", "Hər sorğuda yeni nüsxə yaranır və scope yuxarı zəncirlə yayılır — gecikmə və yaddaş artır."],
            ["Tətbiq söndürülərkən bağlantılar necə təmiz bağlanır?", "enableShutdownHooks() + OnApplicationShutdown/OnModuleDestroy qarmaqları."],
            ["Lifecycle qarmaqları hansı sıra ilə işləyir?", "onModuleInit → onApplicationBootstrap; söndürmədə onModuleDestroy → beforeApplicationShutdown → onApplicationShutdown (shutdown hooks aktiv olmalıdır)."],
            ["moduleRef.get və resolve fərqi?", "get singleton provider-i sinxron verir; scope-lu (request/transient) provider üçün resolve (Promise) lazımdır."],
            ["Multi-tenant tətbiqdə request scope-un alternativi?", "AsyncLocalStorage (nestjs-cls) ilə singleton servislər və ya durable provider-lər (tenant başına nüsxə)."],
            ["Provider useFactory xəta atarsa nə olur?", "Qalxış uğursuz olur, tətbiq başlamır. Bu, fail-fast davranışıdır və çox vaxt istənilən haldır."],
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
          { t: "h", text: "DI-ni Nest olmadan əl ilə görək" },
          { t: "p", text: "DI mürəkkəb texnologiya deyil — sadəcə «lazım olanı özün yaratma, kənardan al» prinsipidir. Nest-in konteyneri əl ilə yazacağın bu işi avtomatlaşdırır: kim kimdən asılıdır, hansı sıra ilə yaradılmalıdır, hansı nüsxə paylaşılmalıdır." },
          { t: "code", lang: "typescript", caption: "Əl ilə DI (Nest-siz)", code: `class PoctServisi {
  gonder(kime: string, metn: string) { console.log('Poçt →', kime, metn); }
}

class SifarisServisi {
  constructor(private readonly poct: PoctServisi) {}
  yarat(email: string) { this.poct.gonder(email, 'Sifariş qəbul edildi'); }
}

// «Kompozisiya kökü»: obyektləri bir yerdə düzürük
const poct = new PoctServisi();
const sifaris = new SifarisServisi(poct);        // asılılığı kənardan veririk
sifaris.yarat('aysel@example.az');

// Nest-də bu işi konteyner görür: providers siyahısına yazırsan, o özü bağlayır.` },
          { t: "list", items: [
            "Asılılıq sayı artdıqca əl ilə bağlamaq çətinləşir: A B-yə, B C-yə, C D-yə lazımdır. Konteyner bu zənciri özü həll edir.",
            "Eyni nüsxə paylaşılır: PoctServisi bir dəfə yaradılır və ona ehtiyacı olan hamıya verilir (singleton).",
            "Əvəzetmə asandır: test üçün saxta poçt, production üçün real poçt — yalnız qeydiyyat dəyişir.",
          ]},
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
          { t: "h", text: "Strategiya nümunəsi: çoxlu realizasiya, bir token" },
          { t: "code", lang: "typescript", code: `export const ODENIS_USULLARI = Symbol('ODENIS_USULLARI');

export interface OdenisUsulu {
  readonly ad: string;
  ode(mebleg: number): Promise<void>;
}

@Injectable() export class KartOdenis implements OdenisUsulu { readonly ad = 'kart'; async ode(m: number) { /* ... */ } }
@Injectable() export class NagdOdenis implements OdenisUsulu { readonly ad = 'nagd'; async ode(m: number) { /* ... */ } }

@Module({
  providers: [
    KartOdenis,
    NagdOdenis,
    {
      provide: ODENIS_USULLARI,
      inject: [KartOdenis, NagdOdenis],
      useFactory: (...usullar: OdenisUsulu[]) => usullar,
    },
  ],
})
export class OdenisModule {}

@Injectable()
export class OdenisServisi {
  private readonly xerite: Map<string, OdenisUsulu>;

  constructor(@Inject(ODENIS_USULLARI) usullar: OdenisUsulu[]) {
    this.xerite = new Map(usullar.map((u) => [u.ad, u]));
  }

  ode(usul: string, mebleg: number) {
    const secilen = this.xerite.get(usul);
    if (!secilen) throw new BadRequestException('Bilinməyən ödəniş üsulu');
    return secilen.ode(mebleg);                 // yeni üsul əlavə etmək = yeni sinif + qeydiyyat
  }
}` },
          { t: "h", text: "Tipli konfiqurasiya yeridilməsi" },
          { t: "code", lang: "typescript", code: `// config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  hovuzOlcusu: Number(process.env.DB_POOL ?? 10),
}));

// ConfigModule.forRoot({ load: [databaseConfig] })

// Servisdə: açar sətri yazmadan, tam tiplə
@Injectable()
export class BazaServisi {
  constructor(
    @Inject(databaseConfig.KEY) private readonly konfiq: ConfigType<typeof databaseConfig>,
  ) {}

  hovuz() {
    return this.konfiq.hovuzOlcusu;              // number, avtomatik tamamlama ilə
  }
}` },
          { t: "mistake", lang: "typescript", wrong: `{
  provide: 'REDIS',
  useFactory: (konfiq: ConfigService) => createClient({ url: konfiq.get('REDIS_URL') }),
  // inject göstərilməyib → konfiq = undefined
}`, right: `{
  provide: 'REDIS',
  inject: [ConfigService],
  useFactory: (konfiq: ConfigService) => createClient({ url: konfiq.getOrThrow('REDIS_URL') }),
}`, why: "useFactory parametrlərini Nest özü tanımır: inject massivində hansı provider-lərin hansı sıra ilə ötürüləcəyini açıq yazmalısan. Yoxsa parametrlər undefined gəlir." },
          { t: "mistake", lang: "typescript", wrong: `// a.service.ts
constructor(private readonly b: BService) {}
// b.service.ts
constructor(private readonly a: AService) {}      // dairə → qalxışda xəta`, right: `// ortaq məntiq üçüncü servisə
@Injectable() export class OrtaqService { /* A və B-nin ortaq işi */ }

// a.service.ts: constructor(private readonly ortaq: OrtaqService) {}
// b.service.ts: constructor(private readonly ortaq: OrtaqService) {}`, why: "İki sinif bir-birini konstruktorda tələb edəndə heç biri ilk yaradıla bilmir. forwardRef + @Inject(forwardRef(() => X)) onu keçici işlədir, amma dizayn problemini həll etmir." },
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
          { t: "h", text: "Konteyner asılılığı addım-addım necə həll edir" },
          { t: "list", items: [
            "1) Skan: modul qrafı gəzilir, providers siyahıları token → provider xəritəsinə yazılır (token adətən sinfin özüdür).",
            "2) Parametrlərin oxunması: hər provider üçün konstruktor tipləri 'design:paramtypes' metadatasından, açıq @Inject(token) göstərişləri isə 'self:paramtypes' metadatasından oxunur. @Inject olan parametr tipi üstələyir.",
            "3) Axtarış: token əvvəl cari modulun provider-lərində, sonra imports-dakı modulların exports-unda, sonra qlobal modullarda axtarılır. Tapılmasa «can't resolve dependencies» xətası.",
            "4) Yaratma: asılılıqlar əvvəl yaradılır (dərinlik üzrə), sonra provider özü; hazır nüsxə modulun xəritəsində singleton kimi saxlanır. Async fabriklər gözlənilir.",
            "5) Request/transient scope-lu provider-lərin nüsxəsi qalxışda deyil, uyğun kontekstdə yaranır; onlardan asılı olan provider-lər də həmin scope-a «keçir».",
          ]},
          { t: "p", text: "Fayl səviyyəsində dairəvi idxal (a.ts b.ts-i idxal edir, b.ts a.ts-i) fərqli problemdir: dekorator metadatası hesablananda sinfin dəyəri hələ undefined ola bilər və Nest xətada 'argument at index [0] is undefined' deyir. Bu halda @Inject(forwardRef(() => Sinif)) tipin həllini gecikdirir. Amma ən yaxşı yol idxal dövrəsini qırmaqdır." },
          { t: "code", lang: "typescript", caption: "Hadisə ilə ayırmaq: A B-ni tanımır", code: `// npm i @nestjs/event-emitter
// app.module.ts: imports: [EventEmitterModule.forRoot()]

@Injectable()
export class SifarislerService {
  constructor(private readonly hadiseler: EventEmitter2) {}

  async yarat(dto: CreateSifarisDto, istifadeciId: number) {
    const sifaris = await this.repo.save({ ...dto, istifadeciId });
    this.hadiseler.emit('sifaris.yaradildi', { sifarisId: sifaris.id, istifadeciId });
    return sifaris;                              // bildiriş, anbar və s. haqqında heç nə bilmir
  }
}

@Injectable()
export class BildirisDinleyicisi {
  @OnEvent('sifaris.yaradildi')
  async isle(payload: { sifarisId: number; istifadeciId: number }) {
    // email göndər; SifarislerService-i idxal etməyə ehtiyac yoxdur
  }
}` },
          { t: "code", lang: "typescript", caption: "Fabrik, async provider və overrideProvider ilə e2e test", code: `const modul = await Test.createTestingModule({ imports: [AppModule] })
  .overrideProvider(OdenisServisi)
  .useValue({ ode: jest.fn().mockResolvedValue({ ugurlu: true }) })
  .overrideGuard(JwtAuthGuard)
  .useValue({ canActivate: (ctx: ExecutionContext) => {
    ctx.switchToHttp().getRequest().user = { id: 1, rollar: ['istifadeci'] };
    return true;
  } })
  .compile();

const app = modul.createNestApplication();
await app.init();` },
          { t: "list", items: [
            "Metadata ilə plugin sistemi: öz dekoratorunu (SetMetadata və ya Reflector.createDecorator) yaz, DiscoveryService.getProviders() ilə bütün provider-ləri gəz və metadata olanları avtomatik qeydiyyat et — işləyici/strategiya siyahısını əl ilə saxlamaq lazım qalmır.",
            "Servis lokatoru anti-pattern-i: hər yerdə moduleRef.get(...) çağırmaq asılılığı gizlədir və konstruktoru yalan edir. Yalnız dinamik seçim (runtime-da hansı strategiyanı götürəcəyini bilirsən) üçün işlət.",
            "Mock-lardan çox istifadə: hər şeyi saxta ilə əvəz edəndə test yalnız mock-u yoxlayır. Servis məntiqi üçün vahid test, DI və HTTP konfiqurasiyası üçün az sayda inteqrasiya/e2e test qarışığı daha etibarlıdır.",
          ]},
          { t: "qa", items: [
            ["DI nə verir?", "Zəif bağlılıq, asan test (mock yeridilir), asılılığın mərkəzləşmiş idarəsi və ömür dövrü nəzarəti."],
            ["Nest asılılığı necə tanıyır?", "Konstruktor parametrlərinin tip metadatasından (emitDecoratorMetadata) və ya @Inject tokenindən."],
            ["Interfeysi niyə birbaşa yeridə bilmirik?", "İcra zamanı interfeys yoxdur; abstrakt sinif və ya Symbol token işlədilir."],
            ["Dairəvi asılılıq necə həll olunur?", "forwardRef müvəqqətidir; düzgün yol — ortaq məntiqi ayırmaq və ya hadisə ilə ayırmaq."],
            ["Testdə provider-i necə əvəz edirsən?", "createTestingModule-da { provide, useValue } və ya overrideProvider."],
            ["Konstruktor yeridilməsi ilə property yeridilməsi fərqi?", "Konstruktor — asılılıqlar açıq və məcburidir, obyekt natamam yaranmır. Property (@Inject sahəyə) — gizli asılılıq yaradır; yalnız miras zəncirində konstruktoru dəyişmək çətin olanda işlədilir."],
            ["@Inject() hansı hallarda mütləqdir?", "Token sinif olmayanda: sətir, Symbol, interfeys əvəzi tokeni; həmçinin forwardRef və custom provider-lər."],
            ["Fayl idxalı dövrəsi ilə modul asılılığı dövrəsi fərqi?", "Fayl dövrəsi — JS modul yükləməsində dəyərin undefined qalması; modul/provider dövrəsi — DI qrafında. Hər ikisi forwardRef ilə müvəqqəti həll olunur, amma əsl həll dizaynı dəyişməkdir."],
            ["Strategiya nümunəsini DI ilə necə qurursan?", "Hər realizasiyanı provider kimi qeydiyyat edib massiv tokeni (useFactory + inject) altında topluyuram; seçici servis xəritədən istədiyini götürür."],
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
          { t: "h", text: "Ən çox işlədilən validatorlar" },
          { t: "code", lang: "typescript", code: `import { ArrayNotEmpty, IsBoolean, IsDate, IsIn, IsNotEmpty, IsNumber, IsUrl, IsUUID, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeqaleDto {
  @IsNotEmpty({ message: 'Başlıq boş ola bilməz' })
  @MaxLength(120)
  basliq: string;

  @IsUrl()
  menbe: string;

  @IsBoolean()
  derc: boolean;

  @IsIn(['qaralama', 'yayimda'])
  status: string;

  @IsUUID()
  muellifId: string;

  @Type(() => Date)                    // JSON-da tarix sətir gəlir, Date-ə çevir
  @IsDate()
  planlasdirilmisTarix: Date;

  @ArrayNotEmpty()
  etiketler: string[];
}` },
          { t: "list", items: [
            "Hər sahəyə ən azı tip dekoratoru ver (@IsString, @IsInt). Dekoratorsuz sahə whitelist: true olanda tamamilə silinir.",
            "Ixtiyari sahə üçün @IsOptional() yaz; yoxsa dəyər olmadıqda digər validatorlar xəta verir.",
            "Xəta mesajlarını dekoratorun message parametri ilə özün yaza bilərsən.",
          ]},
          { t: "tip", text: "strict rejimdə TypeScript DTO sahələrinin başlanğıc dəyəri olmadığına görə şikayət edə bilər. İki həll var: sahəyə ! qoy (ad!: string) və ya tsconfig-də strictPropertyInitialization-ı DTO-lar üçün söndür. Nest şablonu bunu söndürülmüş saxlayır." },
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
          { t: "h", text: "@Transform, @ValidateIf və öz dekoratorun" },
          { t: "code", lang: "typescript", code: `import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, ValidateIf, registerDecorator, ValidationOptions } from 'class-validator';

// Öz dekoratorun
export function IsAzMobil(secimler?: ValidationOptions) {
  return (obyekt: object, sahe: string) =>
    registerDecorator({
      name: 'isAzMobil',
      target: obyekt.constructor,
      propertyName: sahe,
      options: { message: 'Mobil nömrə +994XXXXXXXXX formatında olmalıdır', ...secimler },
      validator: {
        validate: (deyer: unknown) => typeof deyer === 'string' && /^\\+994(50|51|55|70|77|99)[0-9]{7}$/.test(deyer),
      },
    });
}

export class QeydiyyatDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail()
  email: string;

  @IsAzMobil()
  mobil: string;

  @IsString()
  odenisUsulu: 'kart' | 'nagd';

  // Yalnız kartla ödənişdə tələb olunur
  @ValidateIf((o: QeydiyyatDto) => o.odenisUsulu === 'kart')
  @IsString()
  kartNomresi?: string;
}` },
          { t: "list", items: [
            "@Transform dəyəri yoxlamadan əvvəl normallaşdırır (trim, kiçik hərf). Sıra: əvvəl transformasiya, sonra validasiya.",
            "@ValidateIf şərti yoxlama üçündür: şərt false-dursa, həmin sahənin digər validatorları keçilir.",
            "Boolean query: ?aktiv=false sətri gəlir. Onu @Transform(({ value }) => value === 'true') ilə çevir; implicit conversion 'false'-u true edə bilər.",
            "Tarix: @Type(() => Date) + @IsDate(); Yalnız ISO sətri qəbul etmək üçün @IsISO8601().",
          ]},
          { t: "mistake", lang: "typescript", wrong: `@Get()
siyahi(@Query() sorgu: SehifelemeDto) {
  console.log(sorgu instanceof SehifelemeDto);     // false!
}
// main.ts: new ValidationPipe({ whitelist: true })   // transform yoxdur`, right: `app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));`, why: "transform: false olduqda ValidationPipe yoxlayır, amma controller-ə düz obyekt ötürür: @Type çevirmələri tətbiq olunmur, default dəyərlər (sehife = 1) işləmir və instanceof yalan qaytarır." },
          { t: "mistake", lang: "typescript", wrong: `export class FilterDto {
  @IsInt()
  yas: number;                  // query-dən '25' sətri gəlir → @IsInt rədd edir
}`, right: `export class FilterDto {
  @Type(() => Number)
  @IsInt()
  yas: number;
}`, why: "Query və param dəyərləri sətirdir. Tip çevirməsi olmadan @IsInt həmişə rədd edəcək. @Type(() => Number) əvvəl çevirir, sonra validasiya yoxlayır." },
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
          { t: "h", text: "Validasiya xətası cavabında həssas məlumatı sızdırma" },
          { t: "p", text: "Default olaraq class-validator xəta obyektlərində target (bütün DTO) və value (göndərilən dəyər) də olur. Standart ValidationPipe cavabda yalnız mesajları qaytarır, amma öz exceptionFactory-ni yazanda x.target-i (parol daxil olmaqla bütün gövdəni) və ya x.value-nu cavaba/loga qoymamaq lazımdır. validationError: { target: false, value: false } seçimi bunu ümumiyyətlə söndürür." },
          { t: "code", lang: "typescript", caption: "Zod ilə sxem əsaslı pipe (alternativ yanaşma)", code: `import { z } from 'zod';

export const CreateKursSxemi = z.object({
  ad: z.string().min(2).max(80),
  qiymet: z.number().positive().max(10_000),
  etiketler: z.array(z.string().min(1).max(20)).max(10),
});
export type CreateKursGiris = z.infer<typeof CreateKursSxemi>;     // tip sxemdən çıxarılır

@Injectable()
export class ZodPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly sxem: z.ZodType<T>) {}

  transform(deyer: unknown): T {
    const netice = this.sxem.safeParse(deyer);
    if (!netice.success) {
      throw new BadRequestException({ mesaj: 'Yanlış məlumat', sahələr: netice.error.flatten().fieldErrors });
    }
    return netice.data;                         // yoxlanmış və tipli
  }
}

@Post()
yarat(@Body(new ZodPipe(CreateKursSxemi)) giris: CreateKursGiris) {
  return this.kurslar.yarat(giris);
}` },
          { t: "h", text: "Giriş DTO-sunu daxili modeldən ayırmaq" },
          { t: "code", lang: "typescript", code: `// Üç ayrı model: hər birinin öz məsuliyyəti var
//   CreateIstifadeciDto   — klientdən gələn (validasiya, ağ siyahı)
//   Istifadeci (entity)   — bazadakı forma (parolHesi, yaradilma tarixi və s.)
//   IstifadeciCavabDto    — klientə gedən (yalnız açıq sahələr)

@Injectable()
export class IstifadecilerService {
  async yarat(dto: CreateIstifadeciDto): Promise<IstifadeciCavabDto> {
    const parolHesi = await argon2.hash(dto.parol);                 // parol düz saxlanmır
    const entity = await this.repo.save({ ad: dto.ad, email: dto.email, parolHesi });
    return IstifadeciCavabDto.dan(entity);
  }
}` },
          { t: "list", items: [
            "Eyni DTO-nu həm giriş, həm cavab üçün işlətmə: giriş DTO-su parolu qəbul edir, cavab DTO-su isə ona heç vaxt sahib olmamalıdır.",
            "DTO versiyalaşdırma: API-nin v2-si yeni DTO sinifləri ilə gəlir; köhnə klientlər v1 DTO-su ilə işləməyə davam edir. Mövcud DTO-nu geriyə uyğunsuz dəyişmə.",
            "OpenAPI: @nestjs/swagger plugin-i DTO sahələrini və class-validator dekoratorlarını oxuyub sxem yaradır; sənədləşmə kodla sinxron qalır. Yeni sahə əlavə edəndə sənədi əl ilə yeniləməyə ehtiyac yoxdur.",
            "Performans: ValidationPipe hər sorğuda plainToInstance + validate çağırır — reflektiv və nisbətən bahalıdır. İsti endpoint-lərdə DTO-nu kiçik saxla, böyük massivi limitlə; ölçmədən optimallaşdırma etmə.",
            "Qlobal pipe ilə marşrut pipe-ı eyni vaxtda işləyəndə hər ikisi tətbiq olunur: eyni DTO iki dəfə yoxlana bilər. Ya qlobal, ya marşrut səviyyəsində birini seç.",
            "forbidUnknownValues: class-validator-un yeni versiyalarında default true-dur — dekoratoru olmayan (tanınmayan) obyekt validasiyadan keçmir. DTO-da heç bir dekorator olmayan sinif bu səbəbdən bütün sorğuları rədd edə bilər.",
          ]},
          { t: "qa", items: [
            ["DTO niyə sinif olmalıdır?", "Dekoratorlar və metadata yalnız siniflərdə işləyir; interfeys icra zamanı yoxdur."],
            ["whitelist nə edir?", "DTO-da elan olunmayan sahələri silir; forbidNonWhitelisted ilə isə 400 qaytarır. Mass assignment-dən qoruyur."],
            ["İç-içə obyekt yoxlanmırsa səbəb nə ola bilər?", "@ValidateNested ilə yanaşı @Type(() => Sinif) yoxdur."],
            ["Cavab DTO-su niyə lazımdır?", "Entity-ni birbaşa qaytarmaq həssas sahələri (parol heşi) sızdıra bilər; ağ siyahı ilə nəyin çıxdığını özün seçirsən."],
            ["Validasiya SQL inyeksiyasından qoruyurmu?", "Tək başına yox. Parametrləşdirilmiş sorğu/ORM və çıxışda kodlaşdırma əlavə lazımdır."],
            ["@Type(() => Number) nə üçündür?", "class-transformer-ə sətir dəyəri (query/param) ədədə çevirməyi bildirir; çevirmədən @IsInt sətri rədd edər."],
            ["transform: true nə verir?", "Gövdəni DTO sinfinin nüsxəsinə çevirir (@Type işləyir, default dəyərlər tətbiq olunur) və primitivləri metoddakı tipə uyğun çevirir."],
            ["class-validator ilə Zod arasında necə seçirsən?", "Nest ekosistemi və Swagger inteqrasiyası vacibdirsə class-validator; tək həqiqət mənbəyi və güclü tip çıxarımı vacibdirsə Zod. Komandada ardıcıl olmaq daha vacibdir."],
            ["Validasiya xətası cavabında nələrə diqqət edirsən?", "Göndərilən dəyəri və DTO-nu (parol ola bilər) cavaba/loga qoymuram; yalnız sahə adı və mənalı mesaj qaytarıram."],
            ["Giriş, entity və cavab modelini niyə ayırırsan?", "Hər birinin məsuliyyəti fərqlidir: giriş doğrulanır, entity saxlanır, cavab ağ siyahı ilə çıxır. Qarışdırmaq mass assignment və məlumat sızması riski yaradır."],
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
          { t: "h", text: "Xəta statusunu və mesajını tənzimləmək" },
          { t: "p", text: "Hazır pipe-lara seçimlər verə bilərsən: xəta olanda hansı status kodu qayıtsın, hansı mesaj olsun. Pipe-ı sinif kimi yox, new ilə nüsxə kimi yazanda parametr ötürmək olur." },
          { t: "code", lang: "typescript", code: `@Get(':id')
biri(
  @Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,                  // 406
    exceptionFactory: () => new BadRequestException('id müsbət tam ədəd olmalıdır'),
  })) id: number,
) {
  return { id };
}

@Get('qiymet')
qiymet(@Query('mebleg', ParseFloatPipe) mebleg: number) {          // '12.5' → 12.5
  return { mebleg };
}

// Metod səviyyəsində: bütün parametrlərə tətbiq olunur
@Post()
@UsePipes(new ValidationPipe({ whitelist: true }))
yarat(@Body() dto: CreateKitabDto) { ... }` },
          { t: "list", items: [
            "Pipe parametr səviyyəsində ən dəqiqdir; metod, controller və qlobal səviyyə isə bütün parametrlərə tətbiq olunur.",
            "Query-dəki hər şey sətirdir: ədəd, boolean və massiv lazımdırsa uyğun Parse*Pipe işlət.",
            "Pipe istisna atanda metod ümumiyyətlə çağırılmır — yanlış məlumat servisə çatmır.",
          ]},
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
          { t: "h", text: "Pipe-ların sırası və DefaultValuePipe" },
          { t: "code", lang: "typescript", code: `// DefaultValuePipe ƏVVƏL gəlməlidir: dəyər yoxdursa default verir, sonra ParseIntPipe çevirir
@Get()
siyahi(
  @Query('sehife', new DefaultValuePipe(1), ParseIntPipe) sehife: number,
  @Query('olcu', new DefaultValuePipe(20), ParseIntPipe) olcu: number,
) { ... }

// Birdən çox pipe soldan sağa işləyir: trim → uzunluq → kiçik hərf
@Get('axtar')
axtar(@Query('soz', TrimPipe, new MaxUzunluqPipe(50), KicikHerfPipe) soz: string) { ... }

// Body-ni normallaşdıran ümumi pipe (obyektin sətir sahələrini trim edir)
@Injectable()
export class BodyTrimPipe implements PipeTransform {
  transform(deyer: unknown, meta: ArgumentMetadata) {
    if (meta.type !== 'body' || typeof deyer !== 'object' || deyer === null) return deyer;
    return Object.fromEntries(
      Object.entries(deyer).map(([a, d]) => [a, typeof d === 'string' ? d.trim() : d]),
    );
  }
}` },
          { t: "p", text: "ArgumentMetadata-nın metatype sahəsi parametrin TypeScript tipidir (məsələn, DTO sinfi). Məhz buna görə ValidationPipe parametrin hansı DTO olduğunu bilir və onu class-validator-a verir. Primitiv tip üçün (String, Number) validasiya adətən keçilir." },
          { t: "mistake", lang: "typescript", wrong: `@Query('sehife', ParseIntPipe, new DefaultValuePipe(1)) sehife: number
// ?sehife göndərilməyib → ParseIntPipe undefined-ı çevirə bilmir → 400`, right: `@Query('sehife', new DefaultValuePipe(1), ParseIntPipe) sehife: number`, why: "Pipe-lar soldan sağa işləyir. DefaultValuePipe əvvəl dəyəri təmin etməlidir; əks halda ParseIntPipe undefined alır və 400 ilə rədd edir." },
          { t: "mistake", lang: "typescript", wrong: `// main.ts
app.useGlobalPipes(new ValidationPipe());

// Pipe öz içində servis tələb edir
@Injectable()
export class IdVarMiPipe { constructor(private readonly servis: XService) {} ... }
app.useGlobalPipes(new IdVarMiPipe());     // XService yoxdur!`, right: `@Module({
  providers: [{ provide: APP_PIPE, useClass: IdVarMiPipe }],
})
export class AppModule {}`, why: "useGlobalPipes DI konteynerindən kənardadır, ona görə nüsxəni özün yaradırsan və asılılıqlar verilmir. DI lazım olan qlobal pipe-ı APP_PIPE provider-i ilə qeydiyyat et." },
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
          { t: "h", text: "Pipe-lar və xüsusi parametr dekoratorları" },
          { t: "p", text: "Pipe-lar yalnız @Body/@Param/@Query-ə aid deyil: createParamDecorator ilə yaradılmış dekoratorun parametrinə də pipe bağlana bilər. Bu zaman ValidationPipe default olaraq xüsusi dekoratorları yoxlamır — validateCustomDecorators: true seçimi lazımdır." },
          { t: "code", lang: "typescript", code: `export const Oturum = createParamDecorator((sahe: string | undefined, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return sahe ? req.session?.[sahe] : req.session;
});

@Get('profil')
profil(@Oturum('istifadeci', new ValidationPipe({ validateCustomDecorators: true })) i: CariIstifadeciDto) {
  return i;
}` },
          { t: "h", text: "Fayl yükləmə üçün ParseFilePipeBuilder" },
          { t: "code", lang: "typescript", code: `@Post('avatar')
@UseInterceptors(FileInterceptor('fayl'))
avatar(
  @UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: /^image\\/(png|jpeg)$/ })
      .addMaxSizeValidator({ maxSize: 1024 * 1024 })          // 1 MB
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  )
  fayl: Express.Multer.File,
) {
  return { olcu: fayl.size };
}` },
          { t: "list", items: [
            "Pipe nüsxələri: new XPipe() ilə hər marşrut üçün ayrı nüsxə yaranır, sinif kimi verəndə isə (DI ilə) bir nüsxə paylaşılır. Pipe vəziyyətsiz (stateless) olmalıdır ki, paylaşılması təhlükəsiz olsun.",
            "Asinxron pipe-lar (verilənlər bazasına baxanlar) hər sorğuda işləyir: hesab et — hər parametrə baza sorğusu N+1 problemi və yük yaradır. Çox istifadə olunan yoxlamaları keşlə və ya servisdə et.",
            "Pipe və exception filter: pipe-dan atılan istisna da eyni exception filter zəncirinə düşür. Qlobal filter-də validasiya xətalarını (BadRequestException) uyğun formata sala bilərsən.",
            "Yaxşı pipe kiçikdir, bir iş görür və başqa pipe-larla birləşir (kompozisiya). Çox böyük 'hər şeyi edən' pipe oxunmaz və test edilməsi çətin olur.",
            "Pipe səviyyəsində validasiya ilə DTO validasiyasının fərqi: sadə, tək parametrli yoxlamalar üçün pipe (ParseIntPipe, UUID), mürəkkəb obyektlər üçün DTO + ValidationPipe.",
          ]},
          { t: "qa", items: [
            ["Pipe-ın iki əsas rolu?", "Transformasiya (sətri ədədə çevirmək) və validasiya (yanlış dəyərə istisna atmaq)."],
            ["Pipe guard-a nisbətən nə vaxt işləyir?", "Guard-dan sonra, controller-dən əvvəl."],
            ["Niyə @Query('olcu') olcu: number tək kifayət deyil?", "TypeScript tipləri icra zamanı çevirmə etmir; dəyər sətir qalır. ParseIntPipe və ya DTO @Type(() => Number) lazımdır."],
            ["APP_PIPE niyə useGlobalPipes-dən fərqlənir?", "APP_PIPE modul kontekstində qeydiyyat olunur və DI-dən istifadə edə bilir; useGlobalPipes yox."],
            ["Pipe səlahiyyət yoxlamaq üçün uyğundurmu?", "Xeyr. Pipe formatı yoxlayır; icazə guard və servisdə yoxlanmalıdır."],
            ["Pipe-lara parametr ötürməyin iki yolu hansılardır?", "Sinif kimi (@Param('id', MyPipe)) — Nest DI ilə yaradır; nüsxə kimi (new MyPipe(1, 100)) — parametrləri özün verirsən, amma DI işləmir."],
            ["ValidationPipe xüsusi dekorator parametrini yoxlayırmı?", "Default olaraq yox; validateCustomDecorators: true lazımdır."],
            ["DefaultValuePipe ilə ParseIntPipe-ın sırası niyə vacibdir?", "Pipe-lar soldan sağa işləyir. DefaultValuePipe əvvəl dəyəri təmin etməlidir, yoxsa ParseIntPipe undefined alıb 400 qaytarır."],
            ["Pipe-da verilənlər bazasına sorğu atmaq nə vaxt məntiqlidir?", "Nadir və yalnız şəffaflıq üçün (id → obyekt). Çoxlu parametrdə N+1 yaradır; ümumiyyətlə servisdə açıq çağırış daha aydındır."],
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
