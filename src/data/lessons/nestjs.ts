import type { Lesson } from "../types";

export const nestjs: Lesson[] = [
  {
    slug: "giris",
    title: "Nest.js nədir? (Node.js əsasları ilə)",
    intro: "Node.js — JavaScript-i brauzerdən kənarda, serverdə işlədən mühitdir. Nest.js isə onun üzərində TypeScript ilə səliqəli, böyüyə bilən back-end yazmaq üçün freymvorkdur: hazır quruluş, modullar və Dependency Injection verir.",
    sections: [
      {
        level: "baslangic",
        title: "Node.js-dən Nest.js-ə",
        blocks: [
          { t: "analogy", text: "Node.js — boş torpaq sahəsi və tikinti alətləridir: istədiyini tikə bilərsən, amma plan səndədir. Nest.js isə hazır layihəsi olan tikinti şirkətidir: otaqların yeri, elektrik xətləri, su boruları əvvəlcədən düşünülüb. Sən yalnız otaqları doldurursan." },
          { t: "code", lang: "typescript", caption: "Xam Node.js: hər şeyi özün yazırsan", code: `import { createServer } from 'node:http';

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/salam') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mesaj: 'Salam, dünya!' }));
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(3000);` },
          { t: "code", lang: "typescript", caption: "Nest.js: eyni iş, quruluşla", code: `// salam.controller.ts
import { Controller, Get, Param } from '@nestjs/common';

@Controller('salam')
export class SalamController {
  @Get()                        // GET /salam
  salamla() {
    return { mesaj: 'Salam, dünya!' };     // obyekt avtomatik JSON olur
  }

  @Get(':ad')                   // GET /salam/Aysel
  adla(@Param('ad') ad: string) {
    return { mesaj: 'Salam, ' + ad + '!' };
  }
}

// app.module.ts
import { Module } from '@nestjs/common';

@Module({ controllers: [SalamController] })
export class AppModule {}

// main.ts
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();` },
          { t: "terms", items: [
            ["Node.js", "JavaScript-i serverdə işlədən mühit (V8 mühərriki + sistem API-ləri)."],
            ["npm", "Node.js-in paket meneceri; paketlər node_modules-a yüklənir."],
            ["Nest.js", "Node.js üçün TypeScript freymvorku: modul, controller, provider quruluşu."],
            ["dekorator", "@ ilə başlayan işarə: sinfə və ya metoda əlavə məna verir (@Controller, @Get)."],
            ["bootstrap", "tətbiqi işə salan başlanğıc funksiya (main.ts)."],
          ]},
          { t: "tip", text: "Nest.js-i öyrənməzdən əvvəl TypeScript-in siniflərini, interfeyslərini və async/await-i bilmək lazımdır. Dekoratorlar əvvəl qəribə görünür — onları «etiket» kimi düşün." },
          { t: "h", text: "Node.js-də modullar və mühit dəyişənləri" },
          { t: "p", text: "Node.js-də kod fayllara bölünür və fayllar bir-birini import edir. Müasir TypeScript layihələrində import/export sintaksisi işlədilir; Nest.js kodu TypeScript-dən JavaScript-ə kompilyasiya olunur və sonra Node onu icra edir. Yəni sən TypeScript yazırsan, Node isə dist/ qovluğundakı JavaScript-i işlədir." },
          { t: "code", lang: "typescript", caption: "Fayllar arası import və process.env", code: `// riyaziyyat.ts
export function topla(a: number, b: number): number {
  return a + b;
}

// main.ts
import { topla } from './riyaziyyat';

// Mühit dəyişənləri: tənzimləmə koddan kənarda saxlanır
const port = Number(process.env.PORT ?? 3000);
console.log('Port:', port, 'Nəticə:', topla(2, 3));

// İşə salma: PORT=8080 node dist/main.js` },
          { t: "p", text: "Sirlər (parol, API açarı) və mühitə görə dəyişən dəyərlər (port, baza ünvanı) koda yazılmır — mühit dəyişənlərindən oxunur. Nest-də bunun üçün @nestjs/config paketi var; onu sonrakı dərslərdə görəcəksən." },
          { t: "terms", items: [
            ["process.env", "Node prosesinin mühit dəyişənləri obyekti; dəyərlər həmişə sətirdir."],
            ["TypeScript → JavaScript", "Node TypeScript-i birbaşa deyil, kompilyasiyadan sonra JS kimi icra edir."],
            ["asılılıq (dependency)", "layihənin işləməsi üçün package.json-da yazılan kənar paket."],
            ["HTTP metodu", "GET (oxu), POST (yarat), PUT/PATCH (yenilə), DELETE (sil)."],
          ]},
          { t: "tip", text: "Node ilə Nest arasındakı fərqi belə yadda saxla: Node işləmə mühitidir, Nest isə onun üstündə qurulmuş qaydalar toplusudur. Nest-i öyrənmək Node-u əvəz etmir — Node-un əsasları (async, modul, npm) hər zaman lazım olacaq." },
        ],
      },
      {
        level: "orta",
        title: "Node.js-in iş prinsipi və Nest-in üç sütunu",
        blocks: [
          { t: "code", lang: "typescript", caption: "Event loop: bir axın, bloklamayan I/O", code: `import { readFile } from 'node:fs/promises';

console.log('1) başladı');

// Fayl oxunarkən Node gözləmir — başqa işlərə davam edir
readFile('qeyd.txt', 'utf8').then((metn) => console.log('3) fayl oxundu', metn.length));

console.log('2) davam edir');

// async/await ilə eyni şey
async function oxu() {
  const metn = await readFile('qeyd.txt', 'utf8');
  return metn.length;
}` },
          { t: "list", items: [
            "Node.js tək axınlıdır (single-threaded): JavaScript kodun bir axında işləyir. Fayl, şəbəkə, baza kimi gözləmə tələb edən işlər arxa planda gedir, nəticə hazır olanda növbəyə (event loop) düşür.",
            "Buna görə Node çoxlu eyni vaxtlı bağlantını az yaddaşla idarə edir — I/O ağırlıqlı API-lər üçün idealdır. Ağır hesablama (CPU) isə həmin tək axını bloklayır.",
            "Nest-in üç sütunu: Module (kodu hissələrə bölür), Controller (HTTP sorğusunu qəbul edir), Provider/Service (biznes məntiqi).",
            "Nest altda Express (default) və ya Fastify işlədir — sən onların üstündə, vahid API ilə yazırsan.",
          ]},
          { t: "code", lang: "typescript", caption: "Controller + Service: iş bölgüsü", code: `// kitab.service.ts — məntiq
import { Injectable, NotFoundException } from '@nestjs/common';

export interface Kitab { id: number; ad: string; muellif: string }

@Injectable()
export class KitabService {
  private readonly kitablar: Kitab[] = [
    { id: 1, ad: 'Əli və Nino', muellif: 'Qurban Səid' },
  ];

  hamisi(): Kitab[] {
    return this.kitablar;
  }

  biri(id: number): Kitab {
    const kitab = this.kitablar.find((k) => k.id === id);
    if (!kitab) throw new NotFoundException('Kitab tapılmadı');     // → 404
    return kitab;
  }
}

// kitab.controller.ts — HTTP
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('kitablar')
export class KitabController {
  constructor(private readonly kitabService: KitabService) {}       // Nest özü verir

  @Get()
  hamisi() {
    return this.kitabService.hamisi();
  }

  @Get(':id')
  biri(@Param('id', ParseIntPipe) id: number) {                     // "5" → 5, "abc" → 400
    return this.kitabService.biri(id);
  }
}

// kitab.module.ts
@Module({ controllers: [KitabController], providers: [KitabService] })
export class KitabModule {}` },
          { t: "mistake", lang: "typescript", wrong: `@Get('hesabat')
hesabat() {
  let cem = 0;
  for (let i = 0; i < 5_000_000_000; i++) cem += i;   // 10 saniyə — BÜTÜN sorğular gözləyir
  return { cem };
}`, right: `// Ağır hesablamanı əsas axından çıxar: worker thread və ya növbə (BullMQ)
@Post('hesabat')
async hesabat() {
  const is = await this.hesabatNovbesi.add('hesabla', {});
  return { isId: is.id };            // dərhal cavab, nəticə sonra
}`, why: "Node-da JavaScript tək axında işləyir. Uzun sinxron dövr event loop-u bloklayır — həmin an heç bir başqa sorğuya cavab verilmir. CPU işini worker_threads, ayrıca proses və ya növbəyə ver." },
          { t: "mistake", lang: "typescript", wrong: `@Get(':id')
biri(@Param('id') id: number) {
  return this.kitabService.biri(id);     // id əslində "5" sətridir → find tapmır
}`, right: `@Get(':id')
biri(@Param('id', ParseIntPipe) id: number) {
  return this.kitabService.biri(id);
}`, why: "URL parametrləri həmişə sətirdir. TypeScript tipi (: number) icra vaxtı heç nəyi çevirmir. ParseIntPipe həm çevirir, həm də səhv dəyərdə 400 qaytarır." },
          { t: "mistake", lang: "typescript", wrong: `@Get()
async hamisi() {
  this.kitabService.yukleAsync();        // await unudulub
  return { ok: true };
}`, right: `@Get()
async hamisi() {
  return await this.kitabService.yukleAsync();
}`, why: "await olmasa nəticə gözlənilmir, xəta isə tutulmur — «unhandled promise rejection» prosesi yıxa bilər. Nest qaytarılan Promise-i özü gözləyir, ona görə onu ya return et, ya da await et." },
          { t: "h", text: "Event loop-un sırası: sinxron, mikro-tapşırıq, makro-tapşırıq" },
          { t: "p", text: "Node eyni anda bir JavaScript kodu icra edir. Əvvəl sinxron kod tam bitir, sonra mikro-tapşırıqlar növbəsi (Promise.then, await-dən sonrakı hissə) boşaldılır, ən sonda növbəti makro-tapşırıq (setTimeout, I/O callback) gəlir. Bu sıranı bilmək «niyə log bu ardıcıllıqla çıxdı?» suallarına cavab verir." },
          { t: "code", lang: "typescript", caption: "Çıxış sırasını proqnozlaşdır", code: `console.log('1) sinxron başlanğıc');

setTimeout(() => console.log('4) makro-tapşırıq (setTimeout)'), 0);

Promise.resolve().then(() => console.log('3) mikro-tapşırıq (Promise)'));

console.log('2) sinxron son');

// Çıxış: 1, 2, 3, 4
// setTimeout(…, 0) «dərhal» demək deyil: cari kod və bütün mikro-tapşırıqlar bitəndən sonra işləyir.` },
          { t: "h", text: "Nest tətbiqinin tənzimləməsi: @nestjs/config" },
          { t: "code", lang: "typescript", caption: "Mühit dəyişənlərini DI ilə oxumaq", code: `// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],     // .env faylını oxuyur
})
export class AppModule {}

// istənilən servisdə
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PoctService {
  constructor(private readonly konfiq: ConfigService) {}

  server(): string {
    // getOrThrow: dəyər yoxdursa tətbiq başlamır (səssiz undefined yox)
    return this.konfiq.getOrThrow<string>('SMTP_SERVER');
  }
}` },
          { t: "list", items: [
            "Controller yalnız HTTP-ni bilir, Service yalnız məntiqi, Module isə bunların birləşməsini. Bu bölgü testi və dəyişikliyi asanlaşdırır.",
            "Nest standart olaraq JSON-u avtomatik oxuyur və yazır; qaytarılan obyekt JSON-a, string isə mətnə çevrilir.",
            "Xəta atanda (throw new NotFoundException()) Nest düzgün status kodu və JSON cavabı özü formalaşdırır.",
            "Hazır CRUD üçün nest g resource və ya əl ilə modul — hər ikisi eyni quruluşu verir.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `@Controller('kitablar')
export class KitabController {
  private readonly kitabService = new KitabService();   // özün yaradırsan
}`, right: `@Controller('kitablar')
export class KitabController {
  constructor(private readonly kitabService: KitabService) {}
}`, why: "new ilə yaratdıqda Nest-in konteyneri bu nüsxəni tanımır: servisin öz asılılıqları (baza, konfiqurasiya) yeridilmir, testdə əvəz etmək çətinləşir və hər controller ayrı nüsxə yaradır. Nest-ə nüsxəni yaratmağı həvalə et." },
          { t: "mistake", lang: "typescript", wrong: `@Get('fayl')
oxu() {
  return readFileSync('data.json', 'utf8');      // sinxron: event loop-u bloklayır
}`, right: `@Get('fayl')
async oxu() {
  return readFile('data.json', 'utf8');          // node:fs/promises — bloklamır
}`, why: "Sinxron fayl əməliyyatı bitənə qədər Node başqa sorğuya xidmət göstərə bilmir. Kiçik skriptdə problem deyil, amma server kodunda həmişə asinxron variant işlət." },
        ],
      },
      {
        level: "senior",
        title: "Daxili quruluş, platforma seçimi və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Nest başlanğıcda modul qrafını qurur: dekoratorların yazdığı metadata-nı (reflect-metadata) oxuyur, provider-ləri DI konteynerinə yığır, marşrutları altdakı HTTP adapterinə (Express/Fastify) bağlayır. Sorğu zamanı bu iş təkrarlanmır.",
            "Sorğunun yolu: middleware → guard → interceptor (əvvəl) → pipe → handler → interceptor (sonra) → exception filter. Hər mərhələnin öz işi var; bunu bilmək hər məntiqi doğru yerə qoymaq deməkdir.",
            "Express və ya Fastify: Fastify xeyli sürətlidir (sxem əsaslı serializasiya), amma Express ekosistemi daha genişdir. Adapter dəyişmək asandır, əgər @Req()/@Res() ilə platformaya xas obyektlərə bağlanmamısansa.",
            "Event loop fazaları: timers → pending → poll (I/O) → check (setImmediate) → close. Aralarında mikro-tapşırıqlar (Promise, process.nextTick) işləyir. Event loop gecikməsini (lag) metrik kimi izlə — sağlamlığın ən yaxşı göstəricisidir.",
            "Miqyaslama: bir Node prosesi bir CPU nüvəsi işlədir. Çox nüvə üçün cluster/PM2 və ya (daha yaxşısı) konteyner nüsxələri + yük paylayıcı. Tətbiq vəziyyətsiz (stateless) olmalıdır.",
            "Düzgün dayanma: app.enableShutdownHooks() — SIGTERM gələndə OnModuleDestroy / OnApplicationShutdown çağırılır: bağlantıları bağla, cari sorğuları bitir.",
            "ESM və versiyalar: Node LTS versiyasını işlət (cüt nömrələr). Nest 11 Express 5 ilə gəlir; .nvmrc / engines ilə versiyanı sabitlə.",
            "Təhlükəsizlik — helmet: app.use(helmet()) təhlükəsizlik başlıqlarını (nosniff, X-Frame-Options, HSTS, CSP) əlavə edir. Bunsuz tətbiq clickjacking və MIME-sniffing-ə açıqdır.",
            "Təhlükəsizlik — CORS: app.enableCors() parametrsiz hər origin-ə icazə verir. Konkret origin siyahısı ver; credentials: true ilə origin: true/'*' birlikdə işlətmə.",
            "Təhlükəsizlik — giriş validasiyası: qlobal ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }) — DTO-da olmayan sahələr atılır/rədd edilir (mass assignment-ə qarşı). TypeScript tipləri icra vaxtı qoruma DEYİL.",
            "Təhlükəsizlik — sürət limiti: @nestjs/throttler — brute force və DoS-a qarşı. Giriş endpoint-lərinə daha sərt limit.",
            "Təhlükəsizlik — gövdə limiti: Express-in JSON limiti default 100 KB-dır; onu ehtiyac olmadan artırma. Böyük gövdə və dərin iç-içə JSON yaddaşı və event loop-u tükəndirir.",
            "Təhlükəsizlik — asılılıqlar (supply chain): npm ekosistemi ən böyük hücum səthidir. package-lock.json-u commit et, CI-da `npm ci` işlət, `npm audit` və asılılıq skaneri qur, az tanınan paketləri yoxlamadan əlavə etmə, postinstall skriptlərinə diqqət et.",
            "Təhlükəsizlik — prototype pollution: istifadəçi JSON-unu obyektə dərin birləşdirmə (merge) __proto__ vasitəsilə bütün obyektləri zəhərləyə bilər. Etibarsız girişi Object.assign/deep merge ilə birləşdirmə; DTO + whitelist işlət.",
            "Təhlükəsizlik — ReDoS və bloklanma: pis yazılmış regex və ya böyük JSON.parse tək axını dondurur — bir sorğu ilə bütün xidmət dayanır. Giriş uzunluğunu məhdudlaşdır.",
            "Təhlükəsizlik — xətalar: production-da stack trace qaytarma. X-Powered-By başlığını söndür (Express: app.disable('x-powered-by'); helmet bunu edir).",
          ]},
          { t: "code", lang: "typescript", caption: "main.ts — production üçün əsas qoruma", code: `import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(helmet());                                   // təhlükəsizlik başlıqları

  app.enableCors({
    origin: ['https://kodakademiyasi.az'],             // yalnız öz saytın
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                                 // DTO-da olmayan sahələri at
      forbidNonWhitelisted: true,                      // və ya 400 qaytar
      transform: true,                                 // tipə çevir
    }),
  );

  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();                           // düzgün dayanma

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();` },
          { t: "h", text: "Sorğunun tam yolu: hər mərhələni gözlə görmək" },
          { t: "p", text: "Aşağıdakı nümunə hər mərhələni log edir. Real layihədə problemin hansı mərhələdə baş verdiyini tapmaq üçün belə izləmə çox işə yarayır. Sıra: middleware → guard → interceptor (əvvəl) → pipe → handler → interceptor (sonra) → exception filter (yalnız xəta olanda)." },
          { t: "code", lang: "typescript", caption: "Pipeline-ı mərhələ-mərhələ görmək", code: `import { CallHandler, CanActivate, ExecutionContext, Injectable, NestInterceptor, PipeTransform } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class IzGuard implements CanActivate {
  canActivate(_ctx: ExecutionContext): boolean {
    console.log('2) guard');
    return true;
  }
}

@Injectable()
export class IzInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    console.log('3) interceptor: əvvəl');
    return next.handle().pipe(tap(() => console.log('6) interceptor: sonra')));
  }
}

@Injectable()
export class IzPipe implements PipeTransform {
  transform(deyer: unknown) {
    console.log('4) pipe');
    return deyer;
  }
}

// main.ts: app.use((req, _res, next) => { console.log('1) middleware'); next(); });
//
// @UseGuards(IzGuard) @UseInterceptors(IzInterceptor)
// @Get(':id') biri(@Param('id', IzPipe) id: string) { console.log('5) handler'); return { id }; }` },
          { t: "h", text: "Dekoratorlar və reflect-metadata necə işləyir" },
          { t: "p", text: "@Controller, @Get kimi dekoratorlar özləri heç nə icra etmir — yalnız sinfə və ya metoda metadata yazır (Reflect.defineMetadata). Nest başlanğıcda bu metadata-nı oxuyub marşrut cədvəlini qurur. Konstruktor tipləri isə TypeScript-in emitDecoratorMetadata seçimi ilə 'design:paramtypes' açarı altında yazılır. Bu seçim söndürülərsə, DI parametrlərin tipini bilmir." },
          { t: "code", lang: "typescript", caption: "Nest-in oxuduğu metadata (yalnız anlamaq üçün)", code: `import 'reflect-metadata';

@Controller('kitablar')
class KitabController {
  constructor(private readonly servis: KitabService) {}
}

// Konstruktor parametr tipləri (emitDecoratorMetadata sayəsində):
console.log(Reflect.getMetadata('design:paramtypes', KitabController));
// [ [class KitabService] ]

// @Controller('kitablar') yolu metadata kimi saxlayır:
console.log(Reflect.getMetadata('path', KitabController));
// 'kitablar'` },
          { t: "h", text: "Event loop gecikməsi və Fastify adapteri" },
          { t: "code", lang: "typescript", caption: "Event loop lag ölçmək və Fastify ilə başlatmaq", code: `import { monitorEventLoopDelay } from 'node:perf_hooks';

// Event loop gecikməsi: yüksəlirsə, kimsə tək axını bloklayır
const histoqram = monitorEventLoopDelay({ resolution: 20 });
histoqram.enable();

setInterval(() => {
  const p99ms = histoqram.percentile(99) / 1e6;        // nanosaniyədən ms-ə
  if (p99ms > 100) console.warn('Event loop gecikməsi yüksəkdir:', p99ms.toFixed(1), 'ms');
  histoqram.reset();
}, 10_000).unref();

// Fastify adapteri (npm i @nestjs/platform-fastify)
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.listen(3000, '0.0.0.0');                   // konteynerdə 0.0.0.0 lazımdır
}
bootstrap();` },
          { t: "list", items: [
            "Konteynerdə dinləmə ünvanı: Express-də default bütün interfeyslər, Fastify-da isə default yalnız localhost-dur — konteynerdə 0.0.0.0 göstərməsən xaricdən çatmaq olmaz.",
            "Sağlamlıq yoxlaması: @nestjs/terminus ilə /health endpoint-i (baza, yaddaş, disk). Orkestrator (Kubernetes) tətbiqin hazır olub-olmadığını buradan bilir.",
            "Soyuq başlanğıc: modul qrafı nə qədər böyükdürsə, qalxma o qədər uzun çəkir. Serverless-də ağır asılılıqları lazy yüklə, qlobal bağlantıları yenidən istifadə et.",
            "Müşahidə (observability): strukturlaşdırılmış JSON loglar (pino/nestjs-pino), hər sorğuya correlation id, metriklər (sorğu müddəti, event loop lag, yaddaş). Problemi görmədən həll edə bilməzsən.",
            "Yaddaş: Node-un default heap limiti var; --max-old-space-size ilə artırmaq simptomu gizlədir. Sızıntını (böyüyən Map, silinməyən listener) tap və düzəlt.",
          ]},
          { t: "qa", items: [
            ["Node.js niyə tək axınlı olduğu halda çox sorğuya cavab verə bilir?", "I/O əməliyyatları bloklamır: əməliyyat sisteminə/axın hovuzuna verilir, nəticə hazır olanda event loop callback-i icra edir. JavaScript axını gözləmir."],
            ["Event loop-u nə bloklayır?", "Uzun sinxron kod: ağır hesablama, böyük JSON.parse, sinxron fayl əməliyyatları (readFileSync), pis regex."],
            ["Nest.js Express-dən nə ilə fərqlənir?", "Express minimal kitabxanadır — quruluşu özün seçirsən. Nest onun üstündə modul sistemi, DI, dekoratorlar, pipe/guard/interceptor kimi hazır arxitektura verir."],
            ["Nest-in əsas tikinti blokları?", "Module, Controller, Provider; əlavə olaraq Pipe, Guard, Interceptor, Exception Filter, Middleware."],
            ["Sorğu Nest-də hansı ardıcıllıqla emal olunur?", "Middleware → Guard → Interceptor → Pipe → Handler → Interceptor → Exception Filter (xəta olsa)."],
            ["CPU ağırlıqlı işi Node-da necə həll edirsən?", "worker_threads, ayrıca proses və ya növbə (BullMQ) — əsas axını bloklamadan."],
            ["emitDecoratorMetadata nə üçün lazımdır?", "Kompilyator konstruktor parametr tiplərini 'design:paramtypes' metadatasına yazır; Nest DI onu oxuyub nəyi yeridəcəyini bilir. Söndürülərsə DI tipləri tanıya bilmir."],
            ["setTimeout(fn, 0) ilə Promise.then arasında kim əvvəl işləyir?", "Promise.then (mikro-tapşırıq). Mikro-tapşırıqlar növbəti makro-tapşırıqdan əvvəl bütövlükdə boşaldılır."],
            ["Express yoxsa Fastify seçərdin?", "Ekosistem və mövcud middleware-lər vacibdirsə Express; xam sürət və sxem əsaslı serializasiya vacibdirsə Fastify. Platformaya xas obyektlərə (@Req/@Res) bağlanmasan, sonradan dəyişmək asandır."],
            ["Node.js-də event loop lag nədir və necə izlənir?", "Event loop-un planlaşdırılmış işi nə qədər gec icra etməsidir. perf_hooks.monitorEventLoopDelay ilə ölçülür; yüksək olması tək axının bloklandığını göstərir."],
            ["Nest-də tətbiq necə düzgün dayandırılır?", "enableShutdownHooks() çağırılır; SIGTERM gələndə OnModuleDestroy / BeforeApplicationShutdown / OnApplicationShutdown qarmaqları işləyir, bağlantılar bağlanır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Node.js nədir?", options: ["Brauzer", "JavaScript-i serverdə işlədən mühit", "Verilənlər bazası"], answer: 1, why: "Node JS-i brauzerdən kənarda işlədir." },
          { t: "quiz", q: "Nest.js-də HTTP sorğusunu kim qəbul edir?", options: ["Controller", "Module", "Service"], answer: 0, why: "Controller marşrutları emal edir." },
          { t: "quiz", q: "@Get() nədir?", options: ["Dəyişən", "Dekorator", "Modul"], answer: 1, why: "@ ilə başlayan işarə — dekoratordur." },
        ],
      },
    ],
    exercise: {
      task: "İlk Nest.js modulunu yaz: tapşırıqlar (todo). 1) `TapsiriqService` (@Injectable): yaddaşda massiv; `hamisi()`, `biri(id)` (yoxdursa NotFoundException), `elaveEt(basliq)`. 2) `TapsiriqController` ('tapsiriqlar'): GET / — hamısı; GET /:id — biri (id ədədə çevrilsin, səhv dəyərdə 400); POST / — gövdədən `basliq` götürüb əlavə edir. 3) `TapsiriqModule` hər ikisini qeydiyyata alsın. 4) `main.ts`-də tətbiqi 3000 portunda işə sal. Servis controller-ə konstruktordan yeridilsin.",
      starter: `import { Body, Controller, Get, Injectable, Module, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';\nimport { NestFactory } from '@nestjs/core';\n\ninterface Tapsiriq { id: number; basliq: string; tamamlanib: boolean }\n\n@Injectable()\nexport class TapsiriqService {\n  private readonly tapsiriqlar: Tapsiriq[] = [];\n  // metodlar\n}\n\n@Controller('tapsiriqlar')\nexport class TapsiriqController {\n  // konstruktor və marşrutlar\n}\n\n// modul və bootstrap\n`,
      expect: "TapsiriqService @Injectable, biri() tapmayanda throw new NotFoundException; controller constructor(private readonly tapsiriqService: TapsiriqService) ilə servisi alır (new ilə yaratmır); @Get(), @Get(':id') + @Param('id', ParseIntPipe), @Post() + @Body; @Module({ controllers: [TapsiriqController], providers: [TapsiriqService] }); bootstrap: NestFactory.create(...) və await app.listen(3000); məntiq controller-də deyil, servisdədir.",
    },
  },
  {
    slug: "cli",
    title: "CLI və layihə strukturu",
    intro: "Nest CLI — layihə yaradan, fayl generasiya edən və tətbiqi işə salan əmr sətri alətidir. O, faylları düzgün yerə qoyur və modula özü qoşur — əl ilə yazmaqdan həm sürətli, həm səhvsizdir.",
    sections: [
      {
        level: "baslangic",
        title: "Layihə yaratmaq və işə salmaq",
        blocks: [
          { t: "analogy", text: "CLI — mebel mağazasının yığma ustasıdır. «Mənə şkaf lazımdır» deyirsən, o bütün hissələri gətirir, vintləri yerinə qoyur və divara bərkidir. Özün yığsan da olar — amma vint itirmək ehtimalı var." },
          { t: "code", lang: "bash", code: `# CLI-ni quraşdır və layihə yarat
npm i -g @nestjs/cli
nest new magaza-api          # paket menecerini soruşacaq (npm / pnpm / yarn)
cd magaza-api

# İşə sal
npm run start:dev            # dəyişiklikdə avtomatik yenilənir
# http://localhost:3000

# Generasiya: fayl yaradır VƏ modula qoşur
nest generate module mehsullar        # qısa: nest g mo mehsullar
nest generate controller mehsullar    # nest g co mehsullar
nest generate service mehsullar       # nest g s mehsullar

# Hamısı birdən: modul + controller + servis + DTO + CRUD
nest g resource sifarisler` },
          { t: "code", lang: "text", caption: "Layihə quruluşu", code: `magaza-api/
├── src/
│   ├── main.ts                    # giriş nöqtəsi: tətbiqi işə salır
│   ├── app.module.ts              # kök modul
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── mehsullar/                 # bir xüsusiyyət = bir qovluq
│       ├── mehsullar.module.ts
│       ├── mehsullar.controller.ts
│       ├── mehsullar.service.ts
│       ├── mehsullar.controller.spec.ts   # test
│       └── dto/
│           ├── create-mehsul.dto.ts
│           └── update-mehsul.dto.ts
├── test/                          # e2e testlər
├── dist/                          # qurulmuş JS — git-ə düşmür
├── node_modules/                  # paketlər — git-ə düşmür
├── nest-cli.json                  # CLI tənzimləmələri
├── package.json                   # asılılıqlar və skriptlər
├── tsconfig.json                  # TypeScript tənzimləmələri
└── .env                           # sirlər — git-ə düşmür` },
          { t: "terms", items: [
            ["Nest CLI", "nest əmri: new, generate, build, start."],
            ["nest g resource", "bir resurs üçün tam CRUD skeleti yaradır."],
            ["start:dev", "izləmə (watch) rejimi: fayl dəyişəndə tətbiq yenidən başlayır."],
            ["dist/", "TypeScript-in JavaScript-ə çevrilmiş nəticəsi."],
            [".spec.ts", "vahid test faylı (Jest)."],
          ]},
          { t: "tip", text: "Fayl adı qəlibi: ad.növ.ts — mehsullar.service.ts, create-mehsul.dto.ts, auth.guard.ts. Faylın nə olduğu adından bilinir." },
          { t: "h", text: "nest new seçimləri və generasiya növləri" },
          { t: "p", text: "nest new sənə bir neçə sual verir (paket meneceri) və ya bayraqlarla birbaşa verilə bilər. Ən çox işlədilənlər --strict (TypeScript sərt rejimi), --package-manager və --skip-git bayraqlarıdır. Yaradılandan sonra nest generate (qısa: nest g) ilə hər növ fayl yarada bilərsən." },
          { t: "code", lang: "bash", code: `# Sərt TypeScript ilə, git depo yaratmadan
nest new magaza-api --strict --package-manager npm --skip-git

# Nə generasiya edə biləcəyini göstər
nest generate --help

# Ən çox işlədilənlər (qısa adları ilə)
nest g module mehsullar        # mo   — modul
nest g controller mehsullar    # co   — controller
nest g service mehsullar       # s    — servis
nest g class mehsullar/dto/create-mehsul.dto --no-spec   # cl — sadə sinif (DTO üçün)
nest g guard auth/jwt          # gu   — guard
nest g pipe common/pipes/slug  # pi   — pipe
nest g interceptor common/loglama   # itc — interceptor
nest g filter common/http-xeta      # f   — exception filter` },
          { t: "list", items: [
            "nest new — layihə skeleti, git və ilkin asılılıqlar.",
            "nest g — mövcud layihənin içində yeni element; fayl düzgün qovluğa düşür və modula avtomatik qoşulur.",
            "nest start — bir dəfə işə salır; --watch izləmə rejimidir.",
            "nest build — dist/ qovluğuna qurur.",
          ]},
          { t: "tip", text: "Əmrdən əvvəl --dry-run əlavə et: CLI nə yaradacağını göstərir, amma heç nə yazmır. Yeni başlayanlar üçün yaxşı təhlükəsizlik toru." },
        ],
      },
      {
        level: "orta",
        title: "Skriptlər, xüsusiyyətə görə quruluş və ortaq kod",
        blocks: [
          { t: "code", lang: "json", caption: "package.json — əsas skriptlər", code: `{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \\"{src,test}/**/*.ts\\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  }
}` },
          { t: "code", lang: "text", caption: "Böyüyən layihə: xüsusiyyətə görə qovluqlar", code: `src/
├── main.ts
├── app.module.ts
├── common/                        # hamının işlətdiyi ortaq kod
│   ├── decorators/                #   @CurrentUser(), @Public()
│   ├── filters/                   #   exception filter-lər
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/                        # konfiqurasiya sxemi və yüklənməsi
├── database/                      # baza modulu, miqrasiyalar
└── modules/
    ├── auth/
    │   ├── auth.module.ts
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   ├── dto/
    │   ├── guards/
    │   └── strategies/
    ├── istifadeciler/
    └── sifarisler/
        ├── sifarisler.module.ts
        ├── sifarisler.controller.ts
        ├── sifarisler.service.ts
        ├── dto/
        └── entities/` },
          { t: "code", lang: "bash", code: `# Faydalı açarlar
nest g s sifarisler --no-spec        # test faylı yaratma
nest g co sifarisler --flat          # ayrıca qovluq yaratma
nest g guard common/guards/roles     # yolu göstər
nest g resource modules/kuponlar --dry-run   # nə yaradılacağını göstər, yazma

nest info                            # versiyalar
nest build                           # dist/ qovluğuna qur
npm run start:prod                   # qurulmuş kodu işə sal` },
          { t: "mistake", lang: "text", wrong: `src/
├── controllers/     # bütün controller-lər
├── services/        # bütün servislər
├── dtos/            # bütün DTO-lar
└── entities/        # bütün entity-lər`, right: `src/modules/
├── sifarisler/      # controller + servis + dto + entity bir yerdə
└── mehsullar/`, why: "Növə görə qovluqlar kiçik layihədə səliqəli görünür, amma böyüyəndə bir xüsusiyyəti dəyişmək üçün dörd qovluğu gəzirsən. Xüsusiyyətə görə quruluş əlaqəli kodu bir yerdə saxlayır və modulu ayırmağı asanlaşdırır." },
          { t: "mistake", lang: "bash", wrong: `# Production serverində
npm run start:dev`, right: `npm ci --omit=dev
npm run build
NODE_ENV=production node dist/main`, why: "start:dev TypeScript-i icra vaxtı kompilyasiya edir, faylları izləyir, yaddaşı və CPU-nu boş yerə işlədir və dev asılılıqları tələb edir. Production-da əvvəlcədən qurulmuş dist/main işə salınır." },
          { t: "mistake", lang: "text", wrong: `# git-ə düşüb:
node_modules/
dist/
.env`, right: `# .gitignore
node_modules/
dist/
.env
.env.*
!.env.example`, why: "node_modules və dist yenidən yaradıla bilir — repoya lazım deyil. .env isə sirlərdir: git tarixçəsində əbədi qalır. .env.example-də yalnız açar adlarını saxla." },
          { t: "h", text: "nest-cli.json və konfiqurasiya" },
          { t: "p", text: "nest-cli.json CLI-nin davranışını idarə edir: mənbə qovluğu, kompilyator seçimləri, plaginlər. Ən faydalı seçim deleteOutDir-dir: hər build-dən əvvəl dist/ təmizlənir ki, silinmiş fayllar köhnə kodu işlətməsin." },
          { t: "code", lang: "json", caption: "nest-cli.json", code: `{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": ["@nestjs/swagger"]
  }
}` },
          { t: "h", text: "Konfiqurasiyanı bir yerdə toplamaq" },
          { t: "p", text: "process.env-i kodun müxtəlif yerlərində oxumaq çətin izlənir və səhvə açıqdır (dəyər sətirdir, yoxdursa undefined). Daha yaxşısı: başlanğıcda mühiti bir dəfə yoxlayıb tipli konfiqurasiya obyekti vermək." },
          { t: "code", lang: "typescript", caption: "config/env.validation.ts — qalxarkən yoxla", code: `import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsString, Max, Min, validateSync } from 'class-validator';

enum Muhit { Development = 'development', Production = 'production', Test = 'test' }

class MuhitDeyisenleri {
  @IsEnum(Muhit) NODE_ENV: Muhit;
  @IsInt() @Min(1) @Max(65535) PORT: number;
  @IsString() DATABASE_URL: string;
}

export function konfiquYoxla(xam: Record<string, unknown>) {
  const konfiq = plainToInstance(MuhitDeyisenleri, xam, { enableImplicitConversion: true });
  const xetalar = validateSync(konfiq, { skipMissingProperties: false });
  if (xetalar.length > 0) {
    throw new Error('Mühit dəyişənləri yanlışdır: ' + xetalar.toString());
  }
  return konfiq;
}

// app.module.ts
// ConfigModule.forRoot({ isGlobal: true, validate: konfiquYoxla })` },
          { t: "mistake", lang: "typescript", wrong: `// Kodun 20 yerində
const url = process.env.DATABASE_URL;
const port = process.env.PORT;           // sətir! və ya undefined`, right: `constructor(private readonly konfiq: ConfigService) {}

const url = this.konfiq.getOrThrow<string>('DATABASE_URL');`, why: "process.env hər yerdə səpələnəndə nə tip yoxlanır, nə də dəyərin yoxluğu qalxışda tutulur — xəta yalnız həmin kod işləyəndə üzə çıxır. ConfigService + validate ilə tətbiq düzgün mühit olmadan ümumiyyətlə başlamır (fail fast)." },
          { t: "mistake", lang: "bash", wrong: `npm install -g @nestjs/cli     # hər kəs fərqli CLI versiyası ilə`, right: `# package.json devDependencies-də @nestjs/cli saxla və npx / npm skriptləri ilə işlət
npx nest g resource kuponlar`, why: "Qlobal CLI komanda üzvləri arasında fərqli versiyalar deməkdir: generasiya olunan fayllar fərqlənə bilər. Layihədəki lokal versiya hamı üçün eyni nəticə verir." },
        ],
      },
      {
        level: "senior",
        title: "Monorepo, build, konteyner və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Monorepo rejimi: `nest g app` və `nest g lib` — bir repoda bir neçə tətbiq (api, worker) və ortaq kitabxanalar (libs/). nest-cli.json-da projects bölməsi. Daha böyük miqyas üçün Nx və ya Turborepo.",
            "Build variantları: default tsc; daha sürətlisi SWC (nest start -b swc) — 10–20 dəfə tez kompilyasiya. SWC tip yoxlamır — ayrıca `tsc --noEmit` və ya --type-check lazımdır.",
            "tsconfig: strict: true-nu ilk gündən aç (Nest şablonunda tam açıq deyil). strictNullChecks və noImplicitAny çox xətanı kompilyasiyada tutur.",
            "Yol qısaltmaları (paths): '@/common/...' rahatdır, amma build və Jest-də ayrıca tənzimləmə tələb edir (moduleNameMapper). Dərin '../../../' idxallarından yaxşıdır.",
            "Dairəvi idxal (circular import): fayllar bir-birini idxal edəndə dəyər undefined ola bilər. Barrel fayllar (index.ts) bunu gizlədir və artırır — modul daxilində birbaşa fayldan idxal et. `madge --circular` ilə yoxla.",
            "Schematics: komandanın öz şablonları üçün xüsusi generatorlar yazmaq olar — hər yeni modul eyni quruluşla doğulur.",
            "Linting və formatlama: ESLint + Prettier, pre-commit-də lint-staged. CI: lint → tip yoxlaması → test → build.",
            "Konteyner: çoxmərhələli Dockerfile — birinci mərhələdə qur, ikincidə yalnız dist + production asılılıqları. node:XX-slim və ya distroless; `npm ci --omit=dev`.",
            "Təhlükəsizlik — kilid faylı: package-lock.json repoda olsun və CI/production-da `npm ci` işlət (kiliddən kənara çıxmır). `npm install` versiyaları səssizcə yeniləyə bilər — zərərli yeni buraxılış belə daxil olur.",
            "Təhlükəsizlik — quraşdırma skriptləri: npm paketləri postinstall-da ixtiyari kod icra edə bilər. CI-da `npm ci --ignore-scripts` (lazım olanlara açıq icazə ilə), typosquatting-ə diqqət (paket adını hərf-hərf yoxla), `npm audit signatures`.",
            "Təhlükəsizlik — konteynerdə root olma: `USER node`. Kök istifadəçi ilə işləyən proses ələ keçirilsə, konteynerdən çıxış asanlaşır. Fayl sistemi mümkünsə yalnız oxunan (read-only) olsun.",
            "Təhlükəsizlik — image-də sirr: .env faylını image-ə COPY etmə, ARG/ENV ilə sirr ötürmə — image qatlarında qalır. .dockerignore-a .env, .git, node_modules əlavə et. Sirlər icra vaxtı mühitdən/sirr anbarından gəlir.",
            "Təhlükəsizlik — NODE_ENV=production: bir çox kitabxana bu dəyərə görə davranır (ətraflı xətalar, dev alətləri). Production-da onu təyin et; devDependencies-i image-ə salma — hücum səthini böyüdür.",
            "Təhlükəsizlik — source map və debug: --inspect debug portunu (9229) production-da açma — uzaqdan kod icrası verir. Source map-ləri ictimai paylaşma.",
            "Təhlükəsizlik — generasiya olunan kod: `nest g resource` skeletində validasiya, auth və səhifələmə YOXDUR. Onu olduğu kimi production-a çıxarma: DTO-lara validator, endpoint-lərə guard, siyahıya limit əlavə et.",
          ]},
          { t: "code", lang: "text", caption: "Təhlükəsiz çoxmərhələli Dockerfile", code: `# 1) Qurma
FROM node:24-slim AS qur
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci                                  # kilid faylına tam uyğun
COPY tsconfig*.json nest-cli.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev   # dev asılılıqları sil

# 2) İcra: yalnız lazım olanlar
FROM node:24-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=qur --chown=node:node /app/node_modules ./node_modules
COPY --from=qur --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./
USER node                                   # root deyil
EXPOSE 3000
CMD ["node", "dist/main"]

# .dockerignore
# node_modules
# dist
# .git
# .env
# .env.*` },
          { t: "h", text: "Monorepo, SWC və CI konveyeri" },
          { t: "code", lang: "json", caption: "nest-cli.json — SWC və tip yoxlaması", code: `{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "builder": "swc",
    "typeCheck": true,
    "deleteOutDir": true
  }
}` },
          { t: "p", text: "SWC tipləri yoxlamadan çox sürətli kompilyasiya edir; typeCheck: true isə build zamanı tip yoxlamasını ayrıca işlədir. Beləliklə həm sürət, həm təhlükəsizlik qalır. Testlərdə də SWC üçün jest transform tənzimləməsi lazım ola bilər." },
          { t: "code", lang: "json", caption: "Monorepo: iki tətbiq və ortaq kitabxana", code: `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/api/src",
  "monorepo": true,
  "root": "apps/api",
  "projects": {
    "api": {
      "type": "application",
      "root": "apps/api",
      "entryFile": "main",
      "sourceRoot": "apps/api/src",
      "compilerOptions": { "tsConfigPath": "apps/api/tsconfig.app.json" }
    },
    "worker": {
      "type": "application",
      "root": "apps/worker",
      "entryFile": "main",
      "sourceRoot": "apps/worker/src",
      "compilerOptions": { "tsConfigPath": "apps/worker/tsconfig.app.json" }
    },
    "common": {
      "type": "library",
      "root": "libs/common",
      "entryFile": "index",
      "sourceRoot": "libs/common/src",
      "compilerOptions": { "tsConfigPath": "libs/common/tsconfig.lib.json" }
    }
  }
}` },
          { t: "code", lang: "yaml", caption: "CI: yoxla, test et, qur", code: `name: ci
on: [push, pull_request]

jobs:
  yoxla:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit          # tip yoxlaması (SWC tipləri yoxlamır)
      - run: npm test -- --ci
      - run: npm run test:e2e
      - run: npm run build
      - run: npm audit --omit=dev --audit-level=high` },
          { t: "list", items: [
            "Build keşi: CI-da node_modules və build keşini saxla (setup-node cache). Docker-də COPY package*.json əvvəl, sonra mənbə — qat keşi işləsin.",
            "Mühit ayrılığı: eyni image dev/staging/prod-da işləməlidir; fərq yalnız mühit dəyişənlərindədir (12-factor). Mühitə görə ayrıca build etmə.",
            "Versiya sabitləmə: .nvmrc və package.json engines ilə Node versiyası; kilid faylı ilə paketlər. «Mənim kompüterimdə işləyirdi» problemini azaldır.",
            "Migrasiyalar: baza sxemi dəyişikliyi tətbiq kodundan ayrı, CI/CD addımı kimi işləsin; qalxma zamanı avtomatik sxem sinxronizasiyasını (synchronize: true) production-da bağla.",
            "Sağlamlıq və hazırlıq: Docker HEALTHCHECK və ya orkestrator probları /health endpoint-inə baxsın; yeni versiya hazır olmadan trafik yönləndirilməsin.",
          ]},
          { t: "qa", items: [
            ["nest g resource nə yaradır?", "Modul, controller, servis, DTO-lar, entity və test faylları ilə tam CRUD skeleti; modulu AppModule-a da qoşur."],
            ["main.ts və app.module.ts-in rolu?", "main.ts tətbiqi yaradır və dinləməyə başlayır (bootstrap). app.module.ts kök moduldur — bütün digər modulları birləşdirir."],
            ["start:dev ilə start:prod fərqi?", "dev — izləmə rejimində TypeScript-dən işə salır. prod — əvvəlcədən qurulmuş dist/main.js-i Node ilə birbaşa icra edir."],
            ["Layihəni necə qruplaşdırırsan?", "Xüsusiyyətə (domenə) görə modullar: hər modulun controller, servis, DTO və entity-si bir qovluqda; ortaq kod common/-da."],
            ["npm install ilə npm ci fərqi?", "ci kilid faylını dəqiq quraşdırır və onu dəyişmir, node_modules-u sıfırdan qurur — CI və production üçün. install versiyaları yeniləyə bilər."],
            ["SWC ilə tsc fərqi nədir?", "SWC Rust ilə yazılmış sürətli kompilyatordur, amma tip yoxlamır. tsc tip yoxlaması aparır. Real layihədə SWC ilə build + ayrıca tsc --noEmit (və ya typeCheck: true) birlikdə işlədilir."],
            ["Monorepo rejimi nə verir?", "Bir repoda bir neçə tətbiq və ortaq kitabxana (libs/); nest-cli.json-da projects bölməsi. nest g app / nest g lib ilə yaradılır, ortaq kod təkrarsız paylaşılır."],
            ["Niyə CLI-ni layihəyə lokal quraşdırmaq yaxşıdır?", "Komandada hamı eyni versiya ilə generasiya edir, CI-da da eyni versiya işləyir."],
            ["ConfigModule.forRoot({ validate }) nə üçündür?", "Qalxışda mühit dəyişənlərini yoxlayır; yanlış və ya əksik dəyərdə tətbiq başlamır — xəta production-da gec yox, dərhal tutulur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yeni layihə yaradan əmr?", options: ["nest new ad", "nest start ad", "npm new ad"], answer: 0, why: "nest new layihə skeleti qurur." },
          { t: "quiz", q: "Tətbiqin giriş nöqtəsi hansı fayldır?", options: ["app.module.ts", "main.ts", "package.json"], answer: 1, why: "bootstrap main.ts-dədir." },
          { t: "quiz", q: "Hansı qovluq git-ə düşməməlidir?", options: ["src", "node_modules", "test"], answer: 1, why: "Paketlər npm ci ilə yenidən yüklənir." },
        ],
      },
    ],
    exercise: {
      task: "«kitabxana-api» layihəsi üçün iş planı yaz (əmrlər + şərhlər). 1) Layihəni yaradan və dev rejimində işə salan əmrlər. 2) `kitablar` üçün tam CRUD resursu, `auth` üçün ayrıca modul + controller + servis yaradan əmrlər. 3) `common/guards` altında `roles` guard-ı və `common/filters` altında `http-exception` filter-i generasiya edən əmrlər. 4) Yaranacaq `src/` ağacını şərhdə göstər (xüsusiyyətə görə quruluş). 5) Production üçün qurma və işə salma əmrləri (dev asılılıqlarsız). 6) `.gitignore`-a düşməli olan 3 şeyi və səbəbini yaz. 7) Şərhdə: `nest g resource`-un yaratdığı koda production-dan əvvəl nələri əlavə etməlisən (ən azı 3).",
      starter: `# 1) layihə\nnest new kitabxana-api\n\n# 2) resurslar\n\n# 3) ortaq guard və filter\n\n# 4) src/ ağacı\n\n# 5) production\n\n# 6) .gitignore\n\n# 7) generasiyadan sonra əlavə olunmalılar\n`,
      expect: "nest new + npm run start:dev; nest g resource kitablar; nest g module auth, nest g controller auth, nest g service auth (qısa formalar da olar); nest g guard common/guards/roles və nest g filter common/filters/http-exception; ağacda modullar xüsusiyyətə görə (kitablar/, auth/, common/); production: npm ci (--omit=dev), npm run build, node dist/main (start:dev yox), NODE_ENV=production; .gitignore: node_modules, dist, .env + səbəblər; 7-də validasiya (class-validator DTO), autentifikasiya/guard, səhifələmə/limit, xəta idarəsi kimi ən azı 3 bənd.",
    },
  },
  {
    slug: "modul",
    title: "Modullar",
    intro: "Modul — əlaqəli controller və servisləri bir qutuda toplayan sinifdir. Hər Nest tətbiqi modullardan qurulur: biri kök moduldur (AppModule), qalanları ona budaq kimi qoşulur.",
    sections: [
      {
        level: "baslangic",
        title: "@Module və dörd sahəsi",
        blocks: [
          { t: "analogy", text: "Ticarət mərkəzində mağazalar var. Hər mağazanın (modul) öz anbarı, öz işçiləri var və qapısından içəri yalnız vitrinə qoyduqlarını görürsən (exports). Mağaza başqa mağazanın anbarına girə bilməz — yalnız onun vitrinindən nəsə ala bilər (imports)." },
          { t: "code", lang: "typescript", code: `import { Module } from '@nestjs/common';

@Module({
  imports: [],                              // başqa modullar: onların ixrac etdiklərini işlədirəm
  controllers: [MehsullarController],       // bu modulun marşrutları
  providers: [MehsullarService],            // bu modulun servisləri
  exports: [MehsullarService],              // başqa modullara açdığım servislər
})
export class MehsullarModule {}

// Kök modul hamısını birləşdirir
@Module({
  imports: [MehsullarModule, SifarislerModule, AuthModule],
})
export class AppModule {}` },
          { t: "terms", items: [
            ["@Module", "sinfi modula çevirən dekorator."],
            ["imports", "bu modulun ehtiyacı olan başqa modullar."],
            ["controllers", "modulun HTTP marşrutlarını emal edən siniflər."],
            ["providers", "modulun daxilində yeridilə bilən servislər."],
            ["exports", "başqa modulların işlədə biləcəyi provider-lər."],
          ]},
          { t: "tip", text: "Provider default olaraq modulun daxilində «gizlidir». Başqa modul onu işlətmək istəyirsə, iki şey lazımdır: sən onu exports-a yazırsan, o isə sənin modulunu imports-a." },
          { t: "h", text: "Xüsusiyyət modulu: bir qovluq, bir modul" },
          { t: "p", text: "Ən yaxşı təcrübə hər xüsusiyyət (məhsullar, sifarişlər, istifadəçilər) üçün ayrıca modul yaratmaqdır. Beləcə kod əlaqəsinə görə qruplaşır, hər modulun nə etdiyi aydındır və komanda üzvləri bir-birinə mane olmadan paralel işləyə bilər." },
          { t: "code", lang: "typescript", caption: "Tam xüsusiyyət modulu (üç fayl, bir qovluq)", code: `// kuponlar/kuponlar.service.ts
@Injectable()
export class KuponlarService {
  private readonly kuponlar = new Map<string, number>([['YAY10', 10]]);

  endirim(kod: string): number {
    return this.kuponlar.get(kod.toUpperCase()) ?? 0;
  }
}

// kuponlar/kuponlar.controller.ts
@Controller('kuponlar')
export class KuponlarController {
  constructor(private readonly kuponlar: KuponlarService) {}

  @Get(':kod')
  yoxla(@Param('kod') kod: string) {
    return { kod, endirim: this.kuponlar.endirim(kod) };
  }
}

// kuponlar/kuponlar.module.ts
@Module({
  controllers: [KuponlarController],
  providers: [KuponlarService],
  exports: [KuponlarService],         // başqa modul (sifarişlər) endirimi hesablaya bilsin
})
export class KuponlarModule {}

// app.module.ts-də imports-a əlavə et: KuponlarModule` },
          { t: "list", items: [
            "Modul yaratdıqdan sonra onu AppModule-un (və ya ona bağlı başqa modulun) imports siyahısına əlavə etməsən, marşrutları işləməyəcək.",
            "nest g module və nest g resource bunu avtomatik edir.",
            "Hər modulun adı öz domenini ifadə etməlidir: UtilsModule / HelpersModule kimi «zibil qutusu» adlarından qaç.",
          ]},
          { t: "tip", text: "Modulu yaradanda özündən soruş: «Bu modulu sabah ayrıca mikroservisə çıxarsam, nə qədər kodu dəyişməli olaram?» Cavab nə qədər azdırsa, sərhədlər o qədər düzgündür." },
        ],
      },
      {
        level: "orta",
        title: "Modullar arası əlaqə, qlobal və dinamik modullar",
        blocks: [
          { t: "code", lang: "typescript", caption: "Bir modulun servisini başqasında işlətmək", code: `// mehsullar.module.ts
@Module({
  providers: [MehsullarService],
  exports: [MehsullarService],              // vitrinə qoy
})
export class MehsullarModule {}

// sifarisler.module.ts
@Module({
  imports: [MehsullarModule],               // mağazaya gir
  controllers: [SifarislerController],
  providers: [SifarislerService],
})
export class SifarislerModule {}

// sifarisler.service.ts
@Injectable()
export class SifarislerService {
  constructor(private readonly mehsullar: MehsullarService) {}    // indi yeridilə bilir

  async yarat(mehsulId: number, say: number) {
    const mehsul = await this.mehsullar.tap(mehsulId);
    return { mehsul: mehsul.ad, cem: mehsul.qiymet * say };
  }
}` },
          { t: "code", lang: "typescript", caption: "Qlobal və dinamik modul", code: `// Qlobal: hər yerdə idxalsız əlçatandır (yalnız həqiqətən ümumi şeylər üçün)
@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}

// Dinamik: idxal edən tərəf tənzimləmə verir
export interface EmailTenzimleri { server: string; port: number; gonderen: string }

@Module({})
export class EmailModule {
  static forRoot(tenzimler: EmailTenzimleri): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        { provide: 'EMAIL_TENZIMLERI', useValue: tenzimler },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
}

// İstifadə
@Module({
  imports: [
    EmailModule.forRoot({ server: 'smtp.example.az', port: 587, gonderen: 'info@example.az' }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Mehsul]),     // modula xas tənzimləmə
  ],
})
export class AppModule {}` },
          { t: "mistake", lang: "typescript", wrong: `@Module({
  controllers: [SifarislerController],
  providers: [SifarislerService, MehsullarService],   // başqa modulun servisini təkrar qeydiyyat
})
export class SifarislerModule {}`, right: `@Module({
  imports: [MehsullarModule],                          // MehsullarModule onu ixrac edir
  controllers: [SifarislerController],
  providers: [SifarislerService],
})
export class SifarislerModule {}`, why: "Servisi iki modulun providers-inə yazsan, iki AYRI nüsxə yaranır — hərəsinin öz vəziyyəti (keş, bağlantı). Üstəlik onun asılılıqlarını da təkrar etməli olursan. Servis bir modula məxsusdur; başqaları onu idxal edir." },
          { t: "mistake", lang: "typescript", wrong: `// Nest can't resolve dependencies of the SifarislerService (?).
// Please make sure that the argument MehsullarService at index [0]
// is available in the SifarislerModule context.`, right: `// 1) MehsullarModule: exports: [MehsullarService]
// 2) SifarislerModule: imports: [MehsullarModule]`, why: "Ən çox rast gələn Nest xətası. Mənası: bu modulun kontekstində həmin provider yoxdur. Ya modul idxal olunmayıb, ya da servis ixrac edilməyib." },
          { t: "mistake", lang: "typescript", wrong: `@Global()
@Module({ providers: [MehsullarService], exports: [MehsullarService] })
export class MehsullarModule {}     // «idxal yazmayım» deyə hər modulu qlobal etmək`, right: `@Module({ providers: [MehsullarService], exports: [MehsullarService] })
export class MehsullarModule {}     // lazım olan modul onu açıq idxal edir`, why: "Hər şey qlobal olanda modulların asılılıqları görünməz olur — kim kimdən asılıdır, bilinmir və modulu ayırmaq mümkünsüzləşir. @Global yalnız konfiqurasiya, logger, baza bağlantısı kimi həqiqətən ümumi infrastruktur üçündür." },
          { t: "h", text: "ConfigurableModuleBuilder ilə dinamik modul" },
          { t: "p", text: "Əl ilə forRoot / forRootAsync yazmaq təkrarçı və səhvə açıqdır. Nest-in ConfigurableModuleBuilder-i parametrli modul üçün sinfi, tokeni və async variantı (useFactory, inject) avtomatik yaradır." },
          { t: "code", lang: "typescript", caption: "Qısa yazılmış parametrli modul", code: `// sms.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface SmsOptions {
  apiUrl: string;
  token: string;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<SmsOptions>()
  .setClassMethodName('forRoot')          // forRoot və forRootAsync yaranır
  .build();

// sms.module.ts
@Module({
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule extends ConfigurableModuleClass {}

// sms.service.ts
@Injectable()
export class SmsService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly secimler: SmsOptions) {}

  async gonder(nomre: string, metn: string) {
    // fetch(this.secimler.apiUrl, ...) — token buradan gəlir
  }
}

// İstifadə
@Module({
  imports: [
    SmsModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (konfiq: ConfigService) => ({
        apiUrl: konfiq.getOrThrow<string>('SMS_URL'),
        token: konfiq.getOrThrow<string>('SMS_TOKEN'),
      }),
    }),
  ],
})
export class AppModule {}` },
          { t: "h", text: "Modulun həyat dövrü qarmaqları" },
          { t: "code", lang: "typescript", code: `@Module({ providers: [KeshService] })
export class KeshModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly kesh: KeshService) {}

  async onModuleInit() {
    await this.kesh.isit();            // modulun asılılıqları hazır olanda: keşi doldur
  }

  async onModuleDestroy() {
    await this.kesh.bagla();           // söndürülərkən: bağlantını bağla
  }
}` },
          { t: "list", items: [
            "Modulu yenidən ixrac etmək olar: exports: [TypeOrmModule] — idxal edən modul bazanın provider-lərini də alır.",
            "forRoot hər tətbiqdə bir dəfə (AppModule-da) çağırılır; forFeature isə hər xüsusiyyət modulunda — o modulun işlətdiyi hissəni (məsələn, entity) qeydiyyatdan keçirir.",
            "isGlobal: true seçimini yalnız həqiqətən hər yerdə lazım olan infrastruktura (ConfigModule) ver.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `@Module({
  providers: [MehsullarService],
  // exports: [MehsullarService],   ← unudulub
})
export class MehsullarModule {}`, right: `@Module({
  providers: [MehsullarService],
  exports: [MehsullarService],
})
export class MehsullarModule {}`, why: "imports yazmaq kifayət deyil: modul yalnız exports-da olanı verir. Başqa modul onu yeridəndə «can't resolve dependencies» xətası alırsan. Xətanı oxu: hansı modulun kontekstində hansı provider tapılmır, ona bax." },
          { t: "mistake", lang: "typescript", wrong: `@Module({ imports: [BModule] })
export class AModule {}

@Module({ imports: [AModule] })
export class BModule {}          // A ↔ B dairəsi`, right: `@Module({ imports: [OrtaqModule] })
export class AModule {}

@Module({ imports: [OrtaqModule] })
export class BModule {}`, why: "İki modulun bir-birini idxal etməsi qalxışda xəta verir. forwardRef simptomu gizlədir; düzgün həll bir-birindən asılı olan hissəni üçüncü modula çıxarmaqdır." },
        ],
      },
      {
        level: "senior",
        title: "Modul qrafı, sərhədlər və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Hər modul öz inyeksiya konteksidir (injector): provider-lər modul daxilində singleton-dur, modullar isə qrafda bir dəfə yaradılır. Bir modulu on yerdə idxal etsən də, provider-in nüsxəsi birdir.",
            "İnkapsulyasiya: exports — modulun açıq API-sidir. Nə qədər az ixrac etsən, daxili dəyişikliklər o qədər sərbəstdir. Modulu yenidən ixrac etmək də olar: exports: [BazaModule].",
            "Dairəvi asılılıq (A → B → A): forwardRef(() => BModule) işlədir, amma dizayn qoxusudur. Daha yaxşısı: ortaq hissəni üçüncü modula çıxar və ya hadisələrlə (EventEmitter) əlaqəni tərsinə çevir.",
            "Dinamik modul konvensiyaları: forRoot — bir dəfə, qlobal tənzimləmə; forRootAsync — tənzimləmə başqa provider-dən (ConfigService) asinxron gəlir; forFeature — modula xas hissə; register — hər idxalda fərqli tənzimləmə. ConfigurableModuleBuilder bunları qısa yazmağa imkan verir.",
            "Lazy loading: LazyModuleLoader modulu ilk istifadədə yükləyir — serverless-də soyuq başlanğıcı azaldır. Controller-li modullar lazy yüklənə bilmir.",
            "Həyat dövrü qarmaqları: OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, OnApplicationShutdown — bağlantı açmaq/bağlamaq, keşi isitmək üçün. enableShutdownHooks() olmadan dayanma qarmaqları işləmir.",
            "Modul = domen sərhədi: yaxşı bölünmüş modullu monolit sonradan mikroservisə ayrıla bilər. Modullar bir-birinin entity/repository-sinə yox, ixrac olunan servisinə və ya hadisələrinə söykənsin.",
            "Sərhədləri alətlə qoru: eslint-plugin-boundaries və ya Nx module boundaries — «sifarisler modulu mehsullar-ın daxili faylını idxal edə bilməz» qaydası CI-da yoxlanır.",
            "Böyük AppModule əvəzinə: CoreModule (qlobal infrastruktur: config, logger, baza), SharedModule (ortaq köməkçilər), xüsusiyyət modulları.",
            "Təhlükəsizlik — repository-ni ixrac etmə: modul öz repository-sini ixrac edərsə, başqa modul servisdəki icazə və validasiya yoxlamalarından yan keçib bazaya birbaşa yaza bilər. Yalnız yoxlamaları olan servisi ixrac et.",
            "Təhlükəsizlik — guard-ları qlobal qoş: APP_GUARD ilə auth guard-ı bütün tətbiqə tətbiq et və açıq marşrutları @Public() ilə işarələ. Guard-ı hər modula əl ilə qoşmaq — yeni modulda unutmaq deməkdir (default qapalı prinsipi).",
            "Təhlükəsizlik — admin modulu: admin marşrutlarını ayrıca modulda topla və bütün modula rol guard-ı tətbiq et. Admin və adi endpoint-lər qarışıq olanda bir marşrutda yoxlama unudulur.",
            "Təhlükəsizlik — dinamik modulda sirlər: forRoot({ apiKey: 'sk_live_...' }) kimi sirri koda yazma. forRootAsync + ConfigService ilə mühitdən oxu; tənzimləmə obyektini loglama.",
            "Təhlükəsizlik — qlobal provider-də vəziyyət: qlobal/singleton servisdə sorğuya xas məlumat (cari istifadəçi, tenant) saxlama — paralel sorğular qarışır və bir istifadəçi başqasının məlumatını görür. Sorğu kontekstini parametr kimi ötür və ya AsyncLocalStorage (nestjs-cls) işlət.",
            "Təhlükəsizlik — debug modulları: Swagger, devtools, test üçün «seed» controller-ləri production-da qoşulmasın. Onları mühitə görə şərti idxal et və bunu testlə təsdiqlə.",
          ]},
          { t: "code", lang: "typescript", caption: "Default qapalı tətbiq: qlobal guard + asinxron dinamik modul", code: `// core.module.ts — qlobal infrastruktur
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: konfiquYoxla }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),

    // Sirr koddan yox, mühitdən
    EmailModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (konfiq: ConfigService) => ({
        server: konfiq.getOrThrow<string>('EMAIL_SERVER'),
        parol: konfiq.getOrThrow<string>('EMAIL_PAROL'),
      }),
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },     // 1) sürət limiti
    { provide: APP_GUARD, useClass: JwtAuthGuard },       // 2) hər marşrut auth tələb edir
    { provide: APP_GUARD, useClass: RolesGuard },         // 3) rol yoxlaması
  ],
})
export class CoreModule {}

// Açıq marşrut açıq şəkildə işarələnir
export const Public = () => SetMetadata('isPublic', true);

@Controller('saglamliq')
export class SaglamliqController {
  @Public()
  @Get()
  yoxla() {
    return { status: 'ok' };
  }
}

// sifarisler.module.ts — yalnız servis ixrac olunur, repository yox
@Module({
  imports: [TypeOrmModule.forFeature([Sifaris]), MehsullarModule],
  controllers: [SifarislerController],
  providers: [SifarislerService],
  exports: [SifarislerService],
})
export class SifarislerModule {}

// app.module.ts
const debugModullari = process.env.NODE_ENV === 'production' ? [] : [DevAletleriModule];

@Module({
  imports: [CoreModule, AuthModule, MehsullarModule, SifarislerModule, AdminModule, ...debugModullari],
})
export class AppModule {}` },
          { t: "h", text: "Nest qalxarkən modul qrafını necə qurur" },
          { t: "p", text: "NestFactory.create çağırılanda iki əsas mərhələ gedir. Əvvəl scanner kök moduldan başlayaraq imports qrafını rekursiv gəzir və hər modul, provider, controller üçün qeyd yaradır. Sonra instansiyalaşdırma mərhələsi gəlir: provider-lər asılılıq sırası ilə yaradılır, async fabriklər gözlənilir, ardınca onModuleInit və onApplicationBootstrap qarmaqları çağırılır. Bütün bunlar qalxışda bir dəfə olur — sorğu zamanı yeni həll yoxdur (request scope istisnadır)." },
          { t: "list", items: [
            "Modul tokeni: eyni modul sinfi fərqli dinamik tənzimləmə ilə iki dəfə idxal olunarsa, Nest tənzimləməyə görə iki ayrı modul nüsxəsi yaradır (ayrı provider nüsxələri). Bu, register() konvensiyasının mənasıdır.",
            "Provider axtarışı: Nest əvvəl modulun öz providers-inə, sonra imports etdiyi modulların exports-una baxır; @Global modulların ixracları hər yerdə görünür.",
            "Test: Test.createTestingModule({ imports: [SifarislerModule] }).overrideProvider(...) ilə real modulu götürüb yalnız xarici asılılığı (ödəniş, email) saxta ilə əvəz etmək olar.",
            "Modul sərhədi təhlili: madge və ya dependency-cruiser ilə modul asılılıq qrafını çıxar; dövrə və qadağan olunmuş idxalları CI-da yoxla.",
          ]},
          { t: "code", lang: "typescript", caption: "LazyModuleLoader: modulu ilk istifadədə yüklə", code: `import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class HesabatService {
  constructor(private readonly lazyLoader: LazyModuleLoader) {}

  async yarat(parametrler: HesabatParametrleri) {
    // Ağır modul (PDF, Excel) yalnız lazım olanda yüklənir; qalxış sürətlənir
    const { PdfModule } = await import('./pdf/pdf.module');
    const { PdfService } = await import('./pdf/pdf.service');

    const modulRef = await this.lazyLoader.load(() => PdfModule);
    return modulRef.get(PdfService).hazirla(parametrler);
  }
}` },
          { t: "code", lang: "typescript", caption: "Test: real modul, yalnız xarici asılılıq saxta", code: `describe('SifarislerModule (inteqrasiya)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modul = await Test.createTestingModule({ imports: [SifarislerModule] })
      .overrideProvider(OdenisServisi)
      .useValue({ al: jest.fn().mockResolvedValue({ ugurlu: true }) })
      .compile();

    app = modul.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(() => app.close());

  it('POST /sifarisler yaradır', () =>
    request(app.getHttpServer()).post('/sifarisler').send({ mehsulId: 1, say: 2 }).expect(201));
});` },
          { t: "list", items: [
            "Modulun ölçüsü: bir modulda 30+ provider görürsənsə, ya domen çox genişdir, ya da modul «tanrı modul»-a çevrilib. Bölmək lazımdır.",
            "Public API prinsipi: modulun index.ts-i yalnız ixrac olunan sinifləri (modul, servis, tip) göstərsin; başqa modullar yalnız ora idxal etsin, daxili fayllara yox.",
            "Domen hadisələri: modullar bir-birinin servisini birbaşa çağırmaq əvəzinə hadisə yaya bilər (@nestjs/event-emitter). Bu, bağlılığı azaldır və modulu sonradan ayırmağı asanlaşdırır.",
          ]},
          { t: "qa", items: [
            ["Modul nədir, hansı sahələri var?", "@Module ilə işarələnmiş sinif: imports, controllers, providers, exports. Əlaqəli funksionallığı qruplaşdırır."],
            ["Bir modulun servisini başqasında necə işlədirsən?", "Sahibi modul servisi exports-a yazır, istifadəçi modul həmin modulu imports-a əlavə edir."],
            ["«Nest can't resolve dependencies» xətası nə deməkdir?", "İstənilən provider cari modulun kontekstində yoxdur: modul idxal edilməyib, servis ixrac olunmayıb və ya providers-ə yazılmayıb."],
            ["@Global nə edir, nə vaxt işlədilir?", "Modulun ixraclarını idxalsız hər yerdə əlçatan edir. Yalnız ümumi infrastruktur üçün (config, logger); əks halda asılılıqlar gizlənir."],
            ["Dinamik modul nədir?", "İdxal zamanı tənzimləmə qəbul edən modul: statik metod (forRoot, forFeature, register) DynamicModule obyekti qaytarır."],
            ["Dairəvi asılılığı necə həll edirsən?", "Əvvəl dizaynı düzəldirəm (ortaq modul, hadisələr). Son çarə — forwardRef."],
            ["register, forRoot, forFeature konvensiyaları fərqi?", "forRoot — tətbiq üçün bir dəfəlik qlobal tənzimləmə; register — hər idxalda ayrı tənzimləmə; forFeature — modula xas hissə (məsələn, entity). Əlavə: ...Async variantları tənzimləməni asinxron/DI ilə alır."],
            ["ConfigurableModuleBuilder nə üçündür?", "Parametrli modulun sinfini, options tokenini və async (useFactory/inject) variantını boilerplate yazmadan yaradır."],
            ["Nest eyni dinamik modulu iki fərqli tənzimləmə ilə idxal etsə nə olur?", "İki ayrı modul nüsxəsi yaranır, hər birinin öz provider-ləri olur. Eyni tənzimləmə ilə isə bir nüsxə paylaşılır."],
            ["LazyModuleLoader nə vaxt məntiqlidir?", "Nadir istifadə olunan ağır modullar və serverless soyuq başlanğıc üçün; controller və gateway-i olan modullar lazy yüklənmir."],
            ["Modulu mikroservisə çıxarmağa hazır olub-olmadığını necə bilirsən?", "Başqa modullar ona yalnız ixrac olunan servis/hadisələr vasitəsilə bağlıdırsa və daxili repository/entity-lərə birbaşa toxunmursa — hazırdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Servisi başqa modula açmaq üçün hansı sahə?", options: ["imports", "exports", "controllers"], answer: 1, why: "exports — modulun vitrinidir." },
          { t: "quiz", q: "Başqa modulun ixraclarını almaq üçün?", options: ["imports", "providers", "exports"], answer: 0, why: "imports başqa modulu qoşur." },
          { t: "quiz", q: "Tətbiqin kök modulu adətən necə adlanır?", options: ["MainModule", "AppModule", "RootController"], answer: 1, why: "AppModule bütün modulları birləşdirir." },
        ],
      },
    ],
    exercise: {
      task: "Üç modullu kiçik tətbiq qur. 1) `IstifadecilerModule`: `IstifadecilerService` (metod: `tap(id)` — yaddaşdakı massivdən) — servisi ixrac edir. 2) `BildirisModule`: `BildirisService` (metod: `gonder(kime, metn)` — konsola yazır) — ixrac edir. 3) `SifarislerModule`: hər iki modulu idxal edir; `SifarislerService.yarat(istifadeciId, mehsul)` istifadəçini tapır və ona bildiriş göndərir; `SifarislerController` POST /sifarisler. 4) `AppModule` hamısını birləşdirir. 5) Heç bir servis iki modulun `providers`-inə yazılmasın. 6) Şərhdə: `IstifadecilerService`-i ixrac etməsən hansı xəta çıxar və niyə hər modulu @Global etmək pis fikirdir.",
      starter: `import { Body, Controller, Injectable, Module, NotFoundException, Post } from '@nestjs/common';\n\n@Injectable()\nexport class IstifadecilerService {\n  private readonly istifadeciler = [{ id: 1, ad: 'Aysel', email: 'aysel@example.az' }];\n  // tap(id)\n}\n\n@Injectable()\nexport class BildirisService {\n  // gonder(kime, metn)\n}\n\n// modullar, SifarislerService, SifarislerController, AppModule\n`,
      expect: "IstifadecilerModule: providers + exports [IstifadecilerService]; BildirisModule: providers + exports [BildirisService]; SifarislerModule: imports [IstifadecilerModule, BildirisModule], controllers [SifarislerController], providers [SifarislerService] (başqa modulların servisləri providers-də təkrarlanmır); SifarislerService konstruktordan hər iki servisi alır, tap() null olanda NotFoundException; controller @Post() + @Body; AppModule imports-da modullar; şərhdə «Nest can't resolve dependencies» xətası və @Global-ın asılılıqları gizlətməsi izah olunub.",
    },
  },
  {
    slug: "controller",
    title: "Controller-lər",
    intro: "Controller — gələn HTTP sorğusunu qəbul edən və cavab qaytaran sinifdir. Marşrutlar, parametrlər, gövdə, status kodları — hamısı dekoratorlarla təsvir olunur.",
    sections: [
      {
        level: "baslangic",
        title: "Marşrutlar və parametrlər",
        blocks: [
          { t: "analogy", text: "Controller — otelin resepşnidir. Qonaq gəlir və nə istədiyini deyir: «otaq açarı», «taksi çağırın». Resepşn işi özü görmür — uyğun xidmətə (servis) ötürür və cavabı qonağa çatdırır." },
          { t: "code", lang: "typescript", code: `import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('mehsullar')                     // bütün marşrutların prefiksi
export class MehsullarController {
  @Get()                                     // GET /mehsullar?kateqoriya=telefon
  hamisi(@Query('kateqoriya') kateqoriya?: string) {
    return { kateqoriya, mehsullar: [] };
  }

  @Get(':id')                                // GET /mehsullar/5
  biri(@Param('id') id: string) {
    return { id };
  }

  @Post()                                    // POST /mehsullar  (gövdə JSON)
  yarat(@Body() giris: { ad: string; qiymet: number }) {
    return { id: 1, ...giris };              // status avtomatik 201
  }

  @Put(':id')                                // PUT /mehsullar/5
  yenile(@Param('id') id: string, @Body() giris: { ad: string }) {
    return { id, ...giris };
  }

  @Delete(':id')                             // DELETE /mehsullar/5
  sil(@Param('id') id: string) {
    return { silindi: id };
  }
}` },
          { t: "terms", items: [
            ["@Controller('yol')", "sinfi controller edir və marşrut prefiksi verir."],
            ["@Get / @Post / @Put / @Patch / @Delete", "metodun hansı HTTP metoduna cavab verdiyini bildirir."],
            ["@Param", "URL-dəki dəyişən hissə (:id)."],
            ["@Query", "? işarəsindən sonrakı parametrlər."],
            ["@Body", "sorğunun JSON gövdəsi."],
          ]},
          { t: "tip", text: "Qaytardığın obyekt və ya massiv avtomatik JSON-a çevrilir. Status default: POST üçün 201, qalanları üçün 200." },
          { t: "h", text: "Status kodları və xətalar" },
          { t: "p", text: "HTTP cavabı həmişə status kodu ilə gəlir. Nest uğurlu cavablar üçün düzgün kodu özü seçir (GET 200, POST 201), xəta olanda isə sən istisna atırsan və Nest onu uyğun kodlu JSON cavaba çevirir." },
          { t: "list", items: [
            "200 OK — uğurlu oxuma/yeniləmə. 201 Created — yeni resurs yaradıldı. 204 No Content — uğurlu, amma cavab gövdəsi yoxdur (silmə).",
            "400 Bad Request — giriş yanlışdır. 401 Unauthorized — giriş edilməyib. 403 Forbidden — icazə yoxdur. 404 Not Found — tapılmadı. 409 Conflict — ziddiyyət (məsələn, email təkrarı).",
            "500 Internal Server Error — serverdə gözlənilməz xəta. Bunu istifadəçi səhvi üçün işlətmə.",
          ]},
          { t: "code", lang: "typescript", caption: "Xətanı istisna ilə bildirmək", code: `import { BadRequestException, ConflictException, Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

@Controller('istifadeciler')
export class IstifadecilerController {
  constructor(private readonly istifadeciler: IstifadecilerService) {}

  @Get(':id')
  async biri(@Param('id', ParseIntPipe) id: number) {
    const istifadeci = await this.istifadeciler.tap(id);
    if (!istifadeci) {
      throw new NotFoundException('İstifadəçi tapılmadı');        // → 404
    }
    return istifadeci;
  }
}

// Nest-in yaratdığı xəta cavabı:
// { "statusCode": 404, "message": "İstifadəçi tapılmadı", "error": "Not Found" }` },
          { t: "terms", items: [
            ["status kodu", "cavabın nəticəsini bildirən üç rəqəmli kod."],
            ["HttpException", "bütün Nest HTTP xətalarının əsas sinfi (NotFoundException və s. ondan törəyir)."],
            ["@HttpCode()", "uğurlu cavabın default status kodunu dəyişir."],
            ["marşrut (route)", "HTTP metodu + yol cütü: GET /mehsullar/5."],
          ]},
        ],
      },
      {
        level: "orta",
        title: "Status, başlıqlar, pipe-lar və tam CRUD",
        blocks: [
          { t: "code", lang: "typescript", code: `import {
  Body, Controller, DefaultValuePipe, Delete, Get, Header, Headers, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';

@Controller('mehsullar')
export class MehsullarController {
  constructor(private readonly mehsullar: MehsullarService) {}

  @Get()
  hamisi(
    @Query('sehife', new DefaultValuePipe(1), ParseIntPipe) sehife: number,
    @Query('olcu', new DefaultValuePipe(20), ParseIntPipe) olcu: number,
  ) {
    return this.mehsullar.siyahi(sehife, Math.min(Math.max(olcu, 1), 100));
  }

  @Get(':id')
  biri(@Param('id', ParseIntPipe) id: number) {          // sətri ədədə çevirir, səhvdə 400
    return this.mehsullar.tap(id);                        // servis NotFoundException ata bilər
  }

  @Post()
  yarat(@Body() dto: CreateMehsulDto) {                   // DTO + ValidationPipe
    return this.mehsullar.yarat(dto);
  }

  @Patch(':id')
  yenile(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMehsulDto) {
    return this.mehsullar.yenile(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)                        // 204
  async sil(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.mehsullar.sil(id);
  }

  @Get('ixrac/csv')
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="mehsullar.csv"')
  ixrac() {
    return this.mehsullar.csv();
  }

  @Get('dil/cari')
  dil(@Headers('accept-language') dil?: string) {
    return { dil: dil ?? 'az' };
  }
}` },
          { t: "list", items: [
            "Controller nazik qalır: parametri al, servisi çağır, nəticəni qaytar. Məntiq və baza servisdədir.",
            "Xətanı istisna ilə bildir: NotFoundException (404), BadRequestException (400), ForbiddenException (403), ConflictException (409). Nest onu düzgün JSON cavaba çevirir.",
            "Marşrut sırası vacibdir: sabit yol ('ixrac/csv') parametrli yoldan (':id') ƏVVƏL yazılmalıdır.",
            "async metod və ya Promise qaytarmaq olar — Nest özü gözləyir.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `@Get(':id')
biri(@Param('id') id: string) { ... }

@Get('populyar')                 // heç vaxt çağırılmır: ':id' onu tutur (id = "populyar")
populyar() { ... }`, right: `@Get('populyar')                 // sabit yol əvvəl
populyar() { ... }

@Get(':id')
biri(@Param('id', ParseIntPipe) id: number) { ... }`, why: "Marşrutlar yazıldığı sıra ilə yoxlanır. ':id' istənilən sətrə uyğun gəlir. Sabit yolları əvvəl yaz; ParseIntPipe isə «populyar»-ı 400 ilə rədd edərdi." },
          { t: "mistake", lang: "typescript", wrong: `@Get(':id')
biri(@Param('id') id: string, @Res() res: Response) {
  const m = this.mehsullar.tap(+id);
  res.status(200).json(m);       // Nest-in cavab mexanizmi söndü
}`, right: `@Get(':id')
biri(@Param('id', ParseIntPipe) id: number) {
  return this.mehsullar.tap(id);
}`, why: "@Res() yeridən kimi cavabı özün göndərməlisən: interceptor-lar, serializasiya və bəzi dekoratorlar (@HttpCode) işləmir, kod Express-ə bağlanır. Cookie/axın üçün lazımdırsa — @Res({ passthrough: true })." },
          { t: "mistake", lang: "typescript", wrong: `@Post()
yarat(@Body() giris: any) {
  return this.repo.save(giris);            // yoxlanmamış giriş birbaşa bazaya
}`, right: `@Post()
yarat(@Body() dto: CreateMehsulDto) {      // class-validator + ValidationPipe
  return this.mehsullar.yarat(dto);
}`, why: "any ilə nə tip, nə validasiya var: hücumçu istənilən sahəni (rol, qiymət, id) göndərir və o, bazaya yazılır. DTO sinfi + qlobal ValidationPipe({ whitelist: true }) işlət." },
          { t: "h", text: "Guard, interceptor və metadata ilə controller-i zənginləşdirmək" },
          { t: "p", text: "Controller-in üstünə və ya metodunun üstünə guard, interceptor, pipe, filter bağlana bilər. @UseGuards və s. controller səviyyəsində yazılanda bütün metodlara aiddir. Rolları belə təyin etmək geniş yayılmış üsuldur: @SetMetadata (və ya öz dekoratorun) ilə metadata yazırsan, guard isə Reflector ilə onu oxuyur." },
          { t: "code", lang: "typescript", caption: "@Roles dekoratoru + guard", code: `// common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'rollar';
export const Roles = (...rollar: string[]) => SetMetadata(ROLES_KEY, rollar);

// common/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // Əvvəl metoddan, yoxdursa controller-dən oxu
    const teleb = this.reflector.getAllAndOverride<string[] | undefined>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!teleb || teleb.length === 0) return true;

    const { user } = ctx.switchToHttp().getRequest();
    return !!user && teleb.some((rol) => user.rollar?.includes(rol));
  }
}

// İstifadə
@Controller('admin/istifadeciler')
@UseGuards(JwtAuthGuard, RolesGuard)            // controller səviyyəsində
@Roles('admin')                                  // bütün metodlara
export class AdminIstifadecilerController {
  @Get()
  hamisi() { ... }

  @Delete(':id')
  @Roles('admin', 'super-admin')                 // metod səviyyəsi üstünlük alır
  sil(@Param('id', ParseIntPipe) id: number) { ... }
}` },
          { t: "h", text: "Cookie və cavab başlıqları: @Res({ passthrough: true })" },
          { t: "code", lang: "typescript", code: `import { Res } from '@nestjs/common';
import type { Response } from 'express';

@Post('giris')
async giris(@Body() dto: GirisDto, @Res({ passthrough: true }) res: Response) {
  const token = await this.auth.giris(dto);

  res.cookie('sessiya', token, {
    httpOnly: true,                // JavaScript oxuya bilmir (XSS-ə qarşı)
    secure: true,                  // yalnız HTTPS
    sameSite: 'lax',               // CSRF-ə qarşı
    maxAge: 60 * 60 * 1000,
  });

  return { ugurlu: true };         // Nest cavabı hələ də özü göndərir (interceptor-lar işləyir)
}` },
          { t: "mistake", lang: "typescript", wrong: `@Get(':id')
async biri(@Param('id', ParseIntPipe) id: number) {
  try {
    return await this.servis.tap(id);
  } catch (e) {
    return { xeta: 'tapılmadı' };        // 200 OK ilə xəta!
  }
}`, right: `@Get(':id')
async biri(@Param('id', ParseIntPipe) id: number) {
  return this.servis.tap(id);            // servis NotFoundException atır → 404
}`, why: "Xətanı 200 statusu ilə gizlətmək klientin xətanı tanımasına imkan vermir: monitorinq, keş və yenidən cəhd mexanizmləri hamısı status koduna baxır. İstisnanı ötür, Nest düzgün koda çevirsin." },
          { t: "mistake", lang: "typescript", wrong: `@Post()
yarat(@Body() dto: CreateSifarisDto) {
  const mehsul = this.mehsullar.find(dto.mehsulId);
  if (mehsul.say < dto.say) throw new BadRequestException('Stok azdır');
  const cem = mehsul.qiymet * dto.say * (1 - this.endirim(dto));
  return this.repo.save({ ...dto, cem });
}`, right: `@Post()
yarat(@Body() dto: CreateSifarisDto, @CurrentUser() u: CariIstifadeci) {
  return this.sifarisler.yarat(dto, u.id);    // bütün qayda servisdə
}`, why: "Controller-də stok, endirim, hesablama məntiqi olduqda onu başqa yerdən (növbə, cron, başqa controller) təkrar istifadə etmək və vahid test etmək mümkün olmur. Controller yalnız HTTP-ni bilməlidir." },
        ],
      },
      {
        level: "senior",
        title: "Versiyalama, serializasiya, axınlar və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Controller default olaraq singleton-dur — bütün sorğular eyni nüsxəni işlədir. Sinif sahəsində sorğuya xas vəziyyət saxlama. Request-scoped provider yeritsən, controller də hər sorğuda yenidən yaranır (performans xərci).",
            "Versiyalama: app.enableVersioning({ type: VersioningType.URI }) + @Controller({ path: 'mehsullar', version: '1' }) → /v1/mehsullar. Başlıq və media-type variantları da var.",
            "Cavabın formalaşdırılması: ClassSerializerInterceptor + @Exclude()/@Expose() entity-nin həssas sahələrini gizlədir. Daha etibarlısı — ayrıca cavab DTO-su (açıq ağ siyahı).",
            "Öz parametr dekoratorun: createParamDecorator ilə @CurrentUser() — req.user-i tipli və təmiz almaq üçün.",
            "Fayl yükləmə: @UseInterceptors(FileInterceptor('fayl')) + @UploadedFile(ParseFilePipe + MaxFileSizeValidator + FileTypeValidator). Yükləmə: StreamableFile — böyük faylı yaddaşa yığmadan axınla ver.",
            "SSE və axın: @Sse() Observable qaytarır (canlı bildirişlər). WebSocket üçün ayrıca Gateway.",
            "OpenAPI: @nestjs/swagger — @ApiTags, @ApiOkResponse, DTO-lardan avtomatik sxem. CLI plaqini dekorator yazmağı azaldır.",
            "Platforma müstəqilliyi: @Req()/@Res() ilə Express obyektlərinə bağlanma — Fastify-a keçid çətinləşir və test ağırlaşır. Lazım olanı dekoratorla al (@Headers, @Ip, @Query).",
            "Təhlükəsizlik — IDOR: /sifarisler/:id marşrutunda id-ni dəyişən istifadəçi başqasının sifarişini görür. Auth guard yalnız «giriş edib» deməkdir. Servisdə sahibliyi yoxla: where: { id, istifadeciId: cari.id }. Bu, ən çox rast gələn API boşluğudur (BOLA).",
            "Təhlükəsizlik — istifadəçi id-si tokendən: @Body()-dən və ya @Query()-dən gələn istifadeciId-yə etibar etmə. Onu yalnız guard-ın doğruladığı req.user-dən (@CurrentUser()) götür.",
            "Təhlükəsizlik — mass assignment: @Body()-ni birbaşa repo.save / Object.assign-a vermə. whitelist: true olan ValidationPipe + dar DTO; rol, balans, sahib kimi sahələr DTO-da olmasın.",
            "Təhlükəsizlik — cavabda artıq məlumat: entity-ni birbaşa qaytarsan parolHesi, daxili qeydlər və əlaqəli obyektlər də çıxır. Cavab DTO-su və ya @Exclude + ClassSerializerInterceptor.",
            "Təhlükəsizlik — default qapalı: auth guard-ı qlobal qoş (APP_GUARD), açıq marşrutları @Public() ilə işarələ. Hər controller-ə @UseGuards yazmaq unudulur.",
            "Təhlükəsizlik — səhifələmə limiti: ?olcu=1000000 serveri və bazanı boğur. Üst həddi serverdə məhdudlaşdır; sıralama/filtr sahələrini ağ siyahıdan seç (istifadəçi sətrini ORM-in order-inə birbaşa vermə).",
            "Təhlükəsizlik — fayl yükləmə: ölçü və tip limiti, fayl adını istifadəçidən götürməmək (yol keçidi: ../../), mimetype-a güvənməmək (magic bytes yoxla), faylı veb kökündən kənarda saxlamaq.",
            "Təhlükəsizlik — açıq yönləndirmə: @Redirect və ya res.redirect-ə istifadəçidən gələn URL vermə — fişinq üçün istifadə olunur. Yalnız ağ siyahıdakı və ya nisbi yollar.",
            "Təhlükəsizlik — GET dəyişiklik etməsin: silmə/dəyişmə GET ilə olarsa, CSRF (<img src>) və öncədən yükləmə onu tətikləyir.",
          ]},
          { t: "code", lang: "typescript", caption: "Sahiblik, cavab DTO-su və təhlükəsiz fayl yükləmə", code: `// common/decorators/current-user.decorator.ts
export interface CariIstifadeci { id: number; rollar: string[] }

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CariIstifadeci => ctx.switchToHttp().getRequest().user,
);

// sifarisler.controller.ts — JwtAuthGuard qlobal qoşulub
@Controller({ path: 'sifarisler', version: '1' })
export class SifarislerController {
  constructor(private readonly sifarisler: SifarislerService) {}

  @Get()
  menimkiler(
    @CurrentUser() istifadeci: CariIstifadeci,
    @Query() sorgu: SehifelemeDto,                       // sehife ≥ 1, olcu 1–100 (validator ilə)
  ): Promise<SifarisCavabDto[]> {
    return this.sifarisler.siyahi(istifadeci.id, sorgu);
  }

  @Get(':id')
  biri(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() istifadeci: CariIstifadeci,
  ): Promise<SifarisCavabDto> {
    return this.sifarisler.tap(id, istifadeci.id);       // sahiblik servisdə, sorğunun içində
  }

  @Post()
  yarat(@Body() dto: CreateSifarisDto, @CurrentUser() istifadeci: CariIstifadeci) {
    return this.sifarisler.yarat(dto, istifadeci.id);    // id gövdədən YOX
  }

  @Post(':id/qebz')
  @UseInterceptors(FileInterceptor('fayl', { limits: { fileSize: 2 * 1024 * 1024, files: 1 } }))
  qebzYukle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() istifadeci: CariIstifadeci,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^(image\\/(png|jpeg)|application\\/pdf)$/ }),
        ],
      }),
    )
    fayl: Express.Multer.File,
  ) {
    // Fayl adı istifadəçidən götürülmür — servis təsadüfi ad verir və veb kökündən kənarda saxlayır
    return this.sifarisler.qebzSaxla(id, istifadeci.id, fayl.buffer, fayl.mimetype);
  }
}

// sifarisler.service.ts
async tap(id: number, istifadeciId: number): Promise<SifarisCavabDto> {
  const sifaris = await this.repo.findOne({ where: { id, istifadeciId } });
  if (!sifaris) throw new NotFoundException('Sifariş tapılmadı');   // 403 yox — varlığını sızdırma
  return { id: sifaris.id, tarix: sifaris.tarix, mebleg: sifaris.mebleg };   // açıq ağ siyahı
}` },
          { t: "h", text: "Interceptor: cavab zərfi və müddət ölçümü" },
          { t: "p", text: "Interceptor RxJS Observable ilə handler-i əhatə edir: əvvəl və sonra kod icra edə, cavabı dəyişə, vaxtı ölçə, xətanı çevirə bilər. Ardıcıllıq: qlobal → controller → metod (sorğu tərəfində); cavab tərəfində tərsinə. Guard-lar isə interceptor-lardan ƏVVƏL işləyir, yəni icazəsiz sorğu interceptor-a çatmır." },
          { t: "code", lang: "typescript", caption: "Vahid cavab formatı və yavaş sorğu xəbərdarlığı", code: `import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

export interface Zerf<T> { data: T; vaxt: string }

@Injectable()
export class ZerfInterceptor<T> implements NestInterceptor<T, Zerf<T>> {
  intercept(_ctx: ExecutionContext, next: CallHandler<T>): Observable<Zerf<T>> {
    return next.handle().pipe(map((data) => ({ data, vaxt: new Date().toISOString() })));
  }
}

@Injectable()
export class YavasSorgInterceptor implements NestInterceptor {
  private readonly log = new Logger('Yavas');

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const basladi = performance.now();
    const req = ctx.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const ms = performance.now() - basladi;
        if (ms > 500) this.log.warn(req.method + ' ' + req.url + ' ' + ms.toFixed(0) + ' ms');
      }),
    );
  }
}

// main.ts
// app.useGlobalInterceptors(new YavasSorgInterceptor());` },
          { t: "h", text: "Səhifələmə cavabı və keş başlıqları" },
          { t: "code", lang: "typescript", code: `export interface SehifeCavabi<T> {
  elementler: T[];
  cem: number;
  sehife: number;
  olcu: number;
}

@Get()
@Header('Cache-Control', 'private, max-age=30')        // brauzer 30 saniyə keşləyir
async siyahi(@Query() sorgu: SehifelemeDto): Promise<SehifeCavabi<MehsulCavabDto>> {
  const [elementler, cem] = await this.mehsullar.siyahi(sorgu);   // findAndCount
  return { elementler, cem, sehife: sorgu.sehife, olcu: sorgu.olcu };
}` },
          { t: "list", items: [
            "Offset səhifələmə (skip/take) böyük cədvəldə yavaşlayır; çox böyük səhifə nömrəsində baza ilk N sətri atmalı olur. Kursor əsaslı səhifələmə (son görünən id-dən sonrakılar) böyük məlumatda sabit sürət verir.",
            "Controller-də serializasiya: böyük cavabı JSON.stringify etmək CPU xərcidir və event loop-u bloklayır. Lazımsız sahələri bazada seç (select), cavabı kiçik saxla, axın (StreamableFile) və sıxma (compression) düşün.",
            "Idempotentlik: POST təkrarlananda (şəbəkə xətası, retry) iki sifariş yaranmasın deyə Idempotency-Key başlığı qəbul et və nəticəni saxla. Ödəniş endpoint-lərində vacibdir.",
            "Sorğu ID və izləmə: hər sorğuya correlation id ver (middleware), loglarda və xarici çağırışlarda ötür. İstifadəçi şikayət edəndə izləməni tapa bilərsən.",
            "Controller testləri: vahid testdə controller-i servis mock-u ilə yoxla; HTTP səviyyəsini (status, DTO validasiyası, guard) supertest ilə e2e testdə yoxla. Hər ikisi lazımdır: birincisi sürətli, ikincisi real pipeline-ı təsdiqləyir.",
          ]},
          { t: "qa", items: [
            ["Controller-in məsuliyyəti nədir?", "HTTP qatını emal etmək: marşrut, parametrlərin çıxarılması, servisin çağırılması, cavabın/statusun qaytarılması. Biznes məntiqi servisdədir."],
            ["@Param, @Query, @Body fərqi?", "Param — URL yolunun dəyişən hissəsi; Query — ?açar=dəyər; Body — sorğunun gövdəsi (JSON)."],
            ["@Res() işlətməyin mənfi tərəfi?", "Nest-in standart cavab emalı söndürülür: interceptor-lar, serializasiya işləmir, kod platformaya bağlanır. Lazımdırsa passthrough: true."],
            ["Status kodunu necə dəyişirsən?", "@HttpCode(204) ilə statik; xətalar üçün HttpException törəmələri (NotFoundException və s.)."],
            ["IDOR/BOLA nədir, necə qarşısını alırsan?", "İstifadəçinin id-ni dəyişib başqasının obyektinə çatması. Hər sorğuda obyektin cari istifadəçiyə aidliyini serverdə (sorğunun şərtində) yoxlayıram."],
            ["Marşrut sırası niyə vacibdir?", "Uyğunlaşdırma yazılma sırası ilə gedir; parametrli yol sabit yolu «uda» bilər."],
            ["Guard interceptor-dan əvvəl yoxsa sonra işləyir?", "Əvvəl. Sıra: middleware → guard → interceptor → pipe → handler. İcazəsiz sorğu interceptor-a və handler-ə çatmır."],
            ["Interceptor ilə middleware fərqi?", "Middleware Express səviyyəsindədir, ExecutionContext və handler haqqında məlumatı bilmir. Interceptor Nest kontekstini bilir (hansı controller/metod), RxJS ilə cavabı dəyişə bilir və DI-dən istifadə edir."],
            ["Reflector nə üçündür?", "Dekoratorla (@SetMetadata, @Roles, @Public) yazılmış metadata-nı guard/interceptor-da oxumaq üçün; getAllAndOverride metod və sinif səviyyəsini birləşdirir."],
            ["Offset və kursor səhifələmə fərqi?", "Offset (skip/take) sadədir, amma böyük ofsetdə yavaşlayır və dəyişən məlumatda təkrar/buraxılış verə bilər. Kursor son elementə görə sorğu edir — sabit sürət və düzgün nəticə."],
            ["POST sorğusunu təkrar göndərməyə qarşı necə qorunursan?", "Idempotency-Key başlığı: açar ilk dəfə gələndə əməliyyat icra olunur və nəticə saxlanır; təkrar gələndə eyni nəticə qaytarılır, əməliyyat təkrarlanmır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "/mehsullar/7 ünvanından 7-ni hansı dekorator götürür?", options: ["@Query", "@Param", "@Body"], answer: 1, why: "URL yolunun dəyişən hissəsi — @Param." },
          { t: "quiz", q: "@Post() metodunun default statusu?", options: ["200", "201", "204"], answer: 1, why: "POST üçün default 201 Created." },
          { t: "quiz", q: "\"5\" sətrini ədədə çevirib yoxlayan pipe?", options: ["ParseIntPipe", "ValidationPipe", "DefaultValuePipe"], answer: 0, why: "ParseIntPipe çevirir, səhvdə 400 qaytarır." },
        ],
      },
    ],
    exercise: {
      task: "`QeydlerController` yaz ('qeydler'). 1) Konstruktordan `QeydlerService` alsın. 2) GET / — `sehife` (default 1) və `olcu` (default 10, ən çox 50) query parametrləri ilə. 3) GET /axtar?soz=... — sabit marşrut; düzgün sırada yerləşdir. 4) GET /:id — id ədəd olmalıdır. 5) POST / — `CreateQeydDto` gövdəsi. 6) PATCH /:id — `UpdateQeydDto`. 7) DELETE /:id — 204 qaytarsın. 8) Bütün metodlar cari istifadəçini `@CurrentUser()` dekoratoru ilə alıb id-sini servisə ötürsün (gövdədən istifadəçi id-si QƏBUL ETMƏ). 9) `@Res()` işlətmə.",
      starter: `import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';\n\n// Hazırdır: CurrentUser dekoratoru, DTO-lar və servis\ndeclare const CurrentUser: () => ParameterDecorator;\ninterface CariIstifadeci { id: number }\ndeclare class CreateQeydDto { metn: string }\ndeclare class UpdateQeydDto { metn?: string }\ndeclare class QeydlerService {\n  siyahi(istifadeciId: number, sehife: number, olcu: number): Promise<unknown[]>;\n  axtar(istifadeciId: number, soz: string): Promise<unknown[]>;\n  tap(id: number, istifadeciId: number): Promise<unknown>;\n  yarat(dto: CreateQeydDto, istifadeciId: number): Promise<unknown>;\n  yenile(id: number, dto: UpdateQeydDto, istifadeciId: number): Promise<unknown>;\n  sil(id: number, istifadeciId: number): Promise<void>;\n}\n\n@Controller('qeydler')\nexport class QeydlerController {\n  // konstruktor və marşrutlar\n}\n`,
      expect: "constructor(private readonly qeydler: QeydlerService); @Get() DefaultValuePipe + ParseIntPipe ilə sehife/olcu və olcu Math.min ilə 50-yə məhdud; @Get('axtar') @Get(':id')-dən ƏVVƏL yazılıb; @Param('id', ParseIntPipe); @Post() @Body() dto: CreateQeydDto; @Patch(':id'); @Delete(':id') + @HttpCode(HttpStatus.NO_CONTENT / 204); hər metodda @CurrentUser() istifadeci və istifadeci.id servisə ötürülür; @Res() və any yoxdur; məntiq servisdədir.",
    },
  },
];
