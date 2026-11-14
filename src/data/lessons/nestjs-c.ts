import type { Lesson } from "../types";

export const nestjsC: Lesson[] = [
  {
    slug: "guard",
    title: "Guard və autentifikasiya",
    intro: "Guard — sorğunun marşruta girib-girməyəcəyinə qərar verən sinifdir (true/false). Autentifikasiya («sən kimsən?») və avtorizasiya («buna icazən var?») məhz burada həll olunur.",
    sections: [
      {
        level: "baslangic",
        title: "Guard nədir",
        blocks: [
          { t: "analogy", text: "Guard — binanın girişindəki mühafizəçidir. O, sənin nə işlə gəldiyinə baxmır: yalnız vəsiqəni yoxlayır və qapını ya açır, ya bağlayır. İçəri keçəndən sonra isə resepşn (controller) işə başlayır." },
          { t: "code", lang: "typescript", code: `import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiAcarGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const acar = req.headers['x-api-key'];
    if (acar !== process.env.API_ACAR) {
      throw new UnauthorizedException('API açarı yanlışdır');
    }
    return true;                       // true → sorğu davam edir
  }
}

// İstifadə
@Controller('hesabat')
@UseGuards(ApiAcarGuard)               // controller-in bütün marşrutları
export class HesabatController {
  @Get()
  oxu() { return []; }
}` },
          { t: "terms", items: [
            ["autentifikasiya", "istifadəçinin kimliyini yoxlamaq («sən kimsən?»)."],
            ["avtorizasiya", "icazəni yoxlamaq («bunu edə bilərsən?»)."],
            ["CanActivate", "guard-ın interfeysi; true/false (və ya Promise/Observable) qaytarır."],
            ["ExecutionContext", "cari sorğunun konteksti (HTTP, WS, RPC)."],
            ["401 / 403", "401 — kimlik yoxdur/yanlışdır; 403 — kimlik var, amma icazə yoxdur."],
          ]},
          { t: "tip", text: "Guard false qaytarsa Nest 403 verir; 401 üçün UnauthorizedException at. Hansı kodun nə vaxt lazım olduğunu dəqiq ayır." },
        ],
      },
      {
        level: "orta",
        title: "JWT, rollar və @Public()",
        blocks: [
          { t: "code", lang: "bash", code: `npm install @nestjs/jwt bcrypt
npm install -D @types/bcrypt` },
          { t: "code", lang: "typescript", code: `// auth.service.ts
@Injectable()
export class AuthService {
  constructor(private readonly istifadeciler: IstifadecilerService, private readonly jwt: JwtService) {}

  async giris(email: string, parol: string) {
    const istifadeci = await this.istifadeciler.emailIleTap(email);
    // Hər halda müqayisə et ki, cavab vaxtı istifadəçinin olub-olmadığını açmasın
    const dogru = await bcrypt.compare(parol, istifadeci?.parolHesi ?? SAXTA_HES);
    if (!istifadeci || !dogru) throw new UnauthorizedException('Email və ya parol yanlışdır');

    const yuk = { sub: istifadeci.id, rollar: istifadeci.rollar };
    return { access_token: await this.jwt.signAsync(yuk, { expiresIn: '15m' }) };
  }
}

// auth.module.ts
JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (k: ConfigService) => ({ secret: k.getOrThrow('JWT_SIRR'), signOptions: { algorithm: 'HS256' } }),
})

// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const acıq = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()]);
    if (acıq) return true;

    const req = context.switchToHttp().getRequest();
    const [tip, token] = (req.headers.authorization ?? '').split(' ');
    if (tip !== 'Bearer' || !token) throw new UnauthorizedException();

    try {
      req.user = await this.jwt.verifyAsync(token, { algorithms: ['HS256'] });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

// public.decorator.ts və roles.decorator.ts
export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);
export const ROLLAR = 'rollar';
export const Rollar = (...rollar: string[]) => SetMetadata(ROLLAR, rollar);

// roles.guard.ts
@Injectable()
export class RollarGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const telebOlunan = this.reflector.getAllAndOverride<string[]>(ROLLAR, [context.getHandler(), context.getClass()]);
    if (!telebOlunan?.length) return true;
    const { user } = context.switchToHttp().getRequest();
    return telebOlunan.some((r) => user?.rollar?.includes(r));
  }
}

// app.module.ts — qlobal, default qapalı
providers: [
  { provide: APP_GUARD, useClass: JwtAuthGuard },
  { provide: APP_GUARD, useClass: RollarGuard },
]

// İstifadə
@Public() @Post('giris') giris(@Body() dto: GirisDto) { ... }
@Rollar('admin') @Delete(':id') sil(...) { ... }` },
          { t: "list", items: [
            "Reflector metadata oxuyur: SetMetadata ilə qoyulan @Public/@Rollar dekoratorları guard-da oxunur.",
            "getAllAndOverride metod səviyyəsini sinif səviyyəsindən üstün tutur.",
            "Qlobal guard-ları sıra ilə qoş: əvvəl autentifikasiya, sonra rollar (req.user lazımdır).",
            "Parolu bcrypt/argon2 ilə heşlə; heç vaxt açıq və ya sadə SHA ilə saxlama.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `if (parol === istifadeci.parol) { ... }       // açıq mətn parol
// və ya
const hes = crypto.createHash('sha256').update(parol).digest('hex');`, right: `const hes = await bcrypt.hash(parol, 12);                 // qeydiyyatda
const dogru = await bcrypt.compare(parol, istifadeci.parolHesi);`, why: "Açıq mətn və sürətli heşlər baza sızanda saniyələr içində qırılır. bcrypt/argon2 yavaş və duzludur (hər parol üçün fərqli salt), hücumu bahalaşdırır." },
          { t: "mistake", lang: "typescript", wrong: `@Get('admin-panel')
panel() { ... }          // yalnız frontend-də düymə gizlədilib`, right: `@Rollar('admin')
@Get('admin-panel')
panel() { ... }`, why: "Frontend-də düyməni gizlətmək müdafiə deyil — hər kəs API-ni birbaşa çağırır. İcazə yalnız serverdə (guard) yoxlanılır." },
        ],
      },
      {
        level: "senior",
        title: "Token təhlükəsizliyi, refresh, rate limit və dərin müdafiə",
        blocks: [
          { t: "list", items: [
            "Guard-lar middleware-dən sonra, interceptor və pipe-dan əvvəl işləyir; ExecutionContext sayəsində handler və sinif metadatasına çıxışı var — middleware-də bu yoxdur.",
            "Access token qısa ömürlü (5–15 dəq), refresh token uzun ömürlü və bazada heşlənmiş saxlanılır; hər yeniləmədə dəyişdirilir (rotation) və təkrar istifadə aşkarlananda bütün sessiyalar ləğv edilir.",
            "Tokeni harada saxlamaq: brauzerdə localStorage XSS-ə açıqdır; httpOnly + Secure + SameSite cookie daha etibarlıdır (amma CSRF üçün SameSite=Lax/Strict və ya CSRF tokeni lazımdır).",
            "Passport: @nestjs/passport + passport-jwt/passport-local/OAuth strategiyaları — hazır və sınaqdan keçmiş; AuthGuard('jwt') ilə birləşir. Öz guard-ın da uyğundur, amma token yoxlamasını özün yazmaqdan qaç — kitabxana işlət.",
            "Ayrı-ayrı autentifikasiya növləri: JWT, sessiya (cookie + Redis), API açarları, OAuth2/OIDC (Google, Microsoft). Daxili xidmətlər arasında mTLS və ya imzalanmış sorğular.",
            "Throttler: @nestjs/throttler ilə qlobal sorğu limiti; giriş/parol-sıfırlama marşrutlarına ayrıca, daha sərt limit (@Throttle). Brute force və credential stuffing-ə qarşı vacibdir.",
            "Təhlükəsizlik — alqoritm: verifyAsync-də algorithms-i açıq göstər. «alg: none» və ya RS256→HS256 qarışdırma hücumları token yoxlamasını aşır.",
            "Təhlükəsizlik — sirr: JWT sirri uzun, təsadüfi, mühitdən (ConfigService) gəlməlidir; koddakı 'secret' və ya git-də saxlanan açar qəbuledilməzdir. Asimmetrik (RS256/EdDSA) açar cütü xidmətlər arasında daha etibarlıdır.",
            "Təhlükəsizlik — avtorizasiya yalnız rol deyil: «admin» olmaq hər obyekti dəyişmək demək deyil. Obyekt səviyyəsində (sahiblik, tenant) servisdə yoxla — rol guard-ı bunu əvəz etmir. Yalnız rol yoxlayıb obyektə baxmamaq BOLA/IDOR-un əsas səbəbidir.",
            "Təhlükəsizlik — default qapalı: qlobal JwtAuthGuard + @Public(). Yeni controller yazanda auth yadından çıxmır.",
            "Təhlükəsizlik — enumeration: giriş, qeydiyyat və parol sıfırlamada «bu email yoxdur» və «parol yanlışdır» fərqli cavab/vaxt verməsin.",
            "Təhlükəsizlik — token ləğvi: stateless JWT ləğv olunmur. Çıxış, parol dəyişimi və hesab bloku üçün qısa ömür + refresh bazada, və ya jti qara siyahısı/tokenVersiyası.",
            "Təhlükəsizlik — rol dəyişikliyi: tokenin içindəki rol köhnəlir. Həssas əməliyyatlarda rolu bazadan təzələ və ya ömrü qısa saxla.",
            "Təhlükəsizlik — WebSocket və microservice: HTTP guard-ları onlara avtomatik tətbiq olunmur; Gateway və transportlarda autentifikasiyanı ayrıca yoxla (handshake).",
            "Təhlükəsizlik — səhv cavab kodları sızma: 403 obyektin mövcudluğunu açır; başqasının obyektinə 404 qaytarmaq daha az məlumat verir.",
          ]},
          { t: "code", lang: "typescript", caption: "httpOnly cookie ilə token və sərt giriş limiti", code: `// auth.controller.ts
@Public()
@Throttle({ default: { limit: 5, ttl: 60_000 } })          // dəqiqədə 5 cəhd
@Post('giris')
@HttpCode(200)
async giris(@Body() dto: GirisDto, @Res({ passthrough: true }) res: Response) {
  const { accessToken, refreshToken } = await this.auth.giris(dto.email, dto.parol);
  res.cookie('refresh', refreshToken, {
    httpOnly: true,                // JavaScript oxuya bilmir (XSS-dən qoruyur)
    secure: true,                  // yalnız HTTPS
    sameSite: 'strict',            // CSRF-ə qarşı
    path: '/auth/yenile',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return { accessToken };
}

// refresh token rotation (qısa nümunə)
async yenile(kohne: string) {
  const qeyd = await this.sessiyalar.tapHes(sha256(kohne));
  if (!qeyd || qeyd.istifadeEdilib) {
    if (qeyd) await this.sessiyalar.hamisiniLegvEt(qeyd.istifadeciId);   // təkrar istifadə = oğurlanma şübhəsi
    throw new UnauthorizedException();
  }
  await this.sessiyalar.istifadeEdilmisEt(qeyd.id);
  return this.tokenlerYarat(qeyd.istifadeciId);                           // yeni cüt
}

// Obyekt səviyyəli avtorizasiya servisdə
async sil(id: number, cari: CariIstifadeci) {
  const sened = await this.repo.findOne({ where: { id } });
  if (!sened || (sened.sahibId !== cari.id && !cari.rollar.includes('admin'))) {
    throw new NotFoundException();                          // mövcudluğu açma
  }
  await this.repo.remove(sened);
}` },
          { t: "qa", items: [
            ["Guard və middleware fərqi?", "Guard ExecutionContext vasitəsilə hansı handler-in çağırılacağını və onun metadatasını bilir; middleware bilmir. Guard-lar autentifikasiya/avtorizasiya üçün nəzərdə tutulub."],
            ["401 və 403 fərqi?", "401 — kimlik yoxdur və ya yanlışdır; 403 — kimlik var, amma icazə yoxdur."],
            ["Nə üçün qlobal guard + @Public()?", "Defolt qapalı olur: yeni marşrutda auth unudulsa belə, qorunur."],
            ["JWT ləğv oluna bilərmi?", "Stateless token sona qədər etibarlıdır. Qısa ömür, refresh rotation, jti/tokenVersiyası və ya qara siyahı ilə idarə olunur."],
            ["Rol yoxlaması IDOR-dan qoruyurmu?", "Xeyr. Obyektin cari istifadəçiyə (və ya tenant-a) aidliyi ayrıca servisdə yoxlanmalıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Guard nəyə qərar verir?", options: ["Cavabın formatına", "Sorğunun marşruta girib-girməyəcəyinə", "Parametrin tipinə"], answer: 1, why: "Guard true/false ilə keçidi idarə edir." },
          { t: "quiz", q: "Kimliyi var, amma icazəsi yoxdur — status?", options: ["401", "403", "404"], answer: 1, why: "403 Forbidden: kimlik var, icazə yoxdur." },
          { t: "quiz", q: "Parolu necə saxlamaq düzgündür?", options: ["Açıq mətn", "SHA-256", "bcrypt/argon2 heşi"], answer: 2, why: "Yavaş və duzlu heş." },
        ],
      },
    ],
    exercise: {
      task: "Qlobal auth sistemi yaz. 1) `@Public()` və `@Rollar(...)` dekoratorları (SetMetadata). 2) `JwtAuthGuard`: `@Public()` marşrutları buraxır, qalanları Bearer tokenlə yoxlayır (`algorithms: ['HS256']` açıq göstər), `req.user`-i doldurur, səhvdə `UnauthorizedException`. 3) `RollarGuard`: `Reflector.getAllAndOverride` ilə tələb olunan rolları oxuyur. 4) `AppModule`-da hər ikisini `APP_GUARD` ilə qoş. 5) `AuthService.giris`: bcrypt ilə müqayisə, istifadəçi olmasa da müqayisə aparsın, eyni xəta mesajı. 6) `SenedlerService.sil(id, cari)`: rol yoxlamasına əlavə olaraq sahibliyi yoxla; başqasının obyektində 404 qaytarsın.",
      starter: `import { CanActivate, ExecutionContext, Injectable, NotFoundException, SetMetadata, UnauthorizedException } from '@nestjs/common';\nimport { Reflector, APP_GUARD } from '@nestjs/core';\nimport { JwtService } from '@nestjs/jwt';\nimport * as bcrypt from 'bcrypt';\n\n// Dekoratorlar, guard-lar, AuthService, SenedlerService, AppModule\n`,
      expect: "Public = () => SetMetadata(IS_PUBLIC, true); Rollar = (...r) => SetMetadata(ROLLAR, r); JwtAuthGuard Reflector.getAllAndOverride ilə IS_PUBLIC, Bearer parse, jwt.verifyAsync(token, { algorithms: ['HS256'] }), req.user, catch → UnauthorizedException; RollarGuard telebOlunan rollar üzərində some/includes; AppModule providers APP_GUARD ikisi (JwtAuthGuard əvvəl); AuthService.giris istifadəçi olmasa da bcrypt.compare çağırır və eyni UnauthorizedException mesajı; sil() sahibliyi yoxlayır və başqasının obyektinə NotFoundException atır.",
    },
  },
  {
    slug: "interceptor",
    title: "Interceptor və middleware",
    intro: "Middleware sorğunu marşrutdan əvvəl emal edən funksiyadır (Express üslubunda). Interceptor isə handler-in əvvəlinə və sonuna «girib» cavabı dəyişə, vaxtı ölçə, keşləyə, xətanı çevirə bilir.",
    sections: [
      {
        level: "baslangic",
        title: "Middleware və Interceptor",
        blocks: [
          { t: "analogy", text: "Middleware — qapıdakı qeydiyyat masasıdır: hər gələni qeyd edir və içəri buraxır. Interceptor isə ofisin içindəki köməkçidir: sənə yeməyi aparmazdan əvvəl və sonra bir iş görür — vaxtı ölçür, yeməyi qutuya qoyur, lazım olsa dəyişdirir." },
          { t: "code", lang: "typescript", code: `// Middleware
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.method + ' ' + req.originalUrl);
    next();                                  // çağırmasan sorğu asılı qalır
  }
}

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

// Interceptor: icra müddətini ölçür
@Injectable()
export class VaxtInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const baslangic = Date.now();
    return next.handle().pipe(
      tap(() => console.log('Müddət: ' + (Date.now() - baslangic) + ' ms')),
    );
  }
}

@UseInterceptors(VaxtInterceptor)           // və ya qlobal: app.useGlobalInterceptors(...)
@Controller('mehsullar')
export class MehsullarController { ... }` },
          { t: "terms", items: [
            ["middleware", "marşruta çatmazdan əvvəl req/res üzərində işləyən funksiya/sinif."],
            ["interceptor", "handler-in əvvəlinə və sonuna girən, cavabı dəyişə bilən sinif."],
            ["CallHandler", "next.handle() — handler-i çağırır və cavabı Observable kimi verir."],
            ["RxJS", "interceptor-larda cavab axınını dəyişmək üçün istifadə olunan kitabxana (map, tap, catchError)."],
          ]},
          { t: "tip", text: "Sadə qayda: sorğunu «qapıda» emal etmək (log, CORS, cookie) — middleware; metoda xas məntiq, cavabı dəyişmək, keş, vaxt ölçmə — interceptor." },
        ],
      },
      {
        level: "orta",
        title: "Cavabı dəyişmək, keş, timeout və log",
        blocks: [
          { t: "code", lang: "typescript", code: `// Cavabı vahid zərfə salır: { data, meta }
@Injectable()
export class ZerfInterceptor<T> implements NestInterceptor<T, { data: T }> {
  intercept(_ctx: ExecutionContext, next: CallHandler<T>): Observable<{ data: T }> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}

// Timeout: 5 saniyədən uzun çəkən sorğunu kəsir
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      timeout(5000),
      catchError((xeta) =>
        throwError(() => (xeta instanceof TimeoutError ? new RequestTimeoutException() : xeta)),
      ),
    );
  }
}

// Sadə keş: eyni URL üçün cavabı saxlayır (nümunə üçün yaddaşda)
@Injectable()
export class KeshInterceptor implements NestInterceptor {
  private readonly kesh = new Map<string, { zaman: number; deyer: unknown }>();

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    if (req.method !== 'GET') return next.handle();
    const acar = req.originalUrl;
    const var_ = this.kesh.get(acar);
    if (var_ && Date.now() - var_.zaman < 10_000) return of(var_.deyer);   // handler çağırılmır
    return next.handle().pipe(tap((deyer) => this.kesh.set(acar, { zaman: Date.now(), deyer })));
  }
}

// Orqa planda iş (audit) cavabı gecikdirmədən
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly audit: AuditService) {}
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const { user, method, originalUrl } = ctx.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => void this.audit.yaz({ istifadeciId: user?.sub, metod: method, yol: originalUrl })),
    );
  }
}` },
          { t: "list", items: [
            "Middleware: funksional (const logger = (req, res, next) => ...) və sinif şəklində olur; next() çağırmağı unutma.",
            "Middleware qlobal üçün main.ts-də app.use(...) (helmet, cookieParser, compression) da yazıla bilər.",
            "Interceptor-lar RxJS ilə işləyir; əsas operatorlar: map (cavabı dəyiş), tap (yan təsir), catchError (xətanı tut/çevir), timeout.",
            "Hazır: ClassSerializerInterceptor, CacheInterceptor (@nestjs/cache-manager), FileInterceptor (fayl yükləmə).",
          ]},
          { t: "mistake", lang: "typescript", wrong: `use(req, res, next) {
  console.log(req.url);
  // next() çağırılmayıb → sorğu heç vaxt cavab almır
}`, right: `use(req, res, next) {
  console.log(req.url);
  next();
}`, why: "Middleware sorğunu özü bitirmirsə next() çağırmalıdır. Yoxsa sorğu asılı qalır və müştəri timeout alır." },
          { t: "mistake", lang: "typescript", wrong: `intercept(ctx, next) {
  const bas = Date.now();
  const cavab = next.handle();
  console.log(Date.now() - bas);      // handler hələ işləməyib, ~0 ms çıxır
  return cavab;
}`, right: `intercept(ctx, next) {
  const bas = Date.now();
  return next.handle().pipe(tap(() => console.log(Date.now() - bas)));
}`, why: "next.handle() Observable qaytarır, handler abunə olunanda icra olunur. «Sonra» məntiqi pipe/tap içində olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Sıra, middleware-in yeri, helmet və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Tam sıra: middleware (qlobal → modul) → guard (qlobal → controller → marşrut) → interceptor (əvvəl) → pipe → handler → interceptor (sonra, tərs sıra) → exception filter.",
            "Middleware-in ExecutionContext-i yoxdur (hansı handler olduğunu bilmir) — buna görə autentifikasiya/avtorizasiya guard-da olmalıdır. Middleware-də JWT yoxlayıb req.user qoymaq mümkündür, amma metadata əsaslı qərar (@Public) ala bilməz.",
            "Hər interceptor-un çıxışı sıra ilə «soğan» kimi qatlanır: ilk qoşulan ən xaricdədir.",
            "Qlobal qeydiyyat: app.useGlobalInterceptors yalnız DI-siz; DI lazımdırsa APP_INTERCEPTOR provider-i.",
            "Streaming cavablarda (StreamableFile, SSE) cavabı map ilə dəyişmək axını pozur. Zərf interceptor-unu belə marşrutlarda tətbiq etmə.",
            "Performans: hər sorğuda işləyən ağır interceptor (məsələn, sinxron JSON.stringify ilə böyük log) gecikməni artırır. Loglamanı asinxron/bufferlə et, pino kimi sürətli loqqer istifadə et.",
            "Korrelyasiya: hər sorğuya requestId ver (middleware/AsyncLocalStorage), logda və xəta cavabında göstər — izləmək asanlaşır. OpenTelemetry ilə trace.",
            "Təhlükəsizlik — başlıqlar: helmet() (CSP, HSTS, X-Content-Type-Options, X-Frame-Options) və app.disable('x-powered-by') — texnologiya haqqında məlumatı azaldır.",
            "Təhlükəsizlik — CORS: app.enableCors({ origin: ['https://sayt.az'], credentials: true }). origin: '*' ilə credentials birlikdə işləmir və təhlükəlidir; ağ siyahı işlət, origin-i sorğudan olduğu kimi əks etdirmə.",
            "Təhlükəsizlik — loqlarda həssas məlumat: parol, token, kart nömrəsi, Authorization başlığı loqlanmasın. Interceptor-da gövdəni olduğu kimi yazma; həssas sahələri maskala (redact).",
            "Təhlükəsizlik — keş interceptor-u: istifadəçiyə xas cavabı URL açarı ilə ümumi keşləmə başqasının məlumatını verir. Açarda istifadəçi/tenant id olmalı və ya həssas marşrutlar keşlənməməlidir. Authorization-lı cavablar üçün Cache-Control: private.",
            "Təhlükəsizlik — sorğu limiti və ölçü: gövdə limiti (body parser), throttler. Middleware-də erkən rədd etmək resurs xərcini azaldır.",
            "Təhlükəsizlik — CSRF: cookie əsaslı autentifikasiyada dəyişdirici metodlar üçün SameSite və CSRF tokeni; yalnız Bearer başlığı işlədirsənsə CSRF riski azdır.",
            "Təhlükəsizlik — proxy arxasında: app.set('trust proxy', ...) düzgün qurulmasa req.ip saxta ola bilər və rate limit/audit yanlış IP-yə işləyər. X-Forwarded-For-a ancaq tanıdığın proxy-dən etibar et.",
          ]},
          { t: "code", lang: "typescript", caption: "Qlobal təhlükəsizlik qatı və həssas sahələri maskalama", code: `// main.ts
import helmet from 'helmet';

const app = await NestFactory.create(AppModule);
app.use(helmet());
app.getHttpAdapter().getInstance().disable('x-powered-by');
app.enableCors({
  origin: ['https://kodakademiyasi.az'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
});

// DI lazım olan interceptor-lar modulda qeydiyyatdan keçir
@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestIdInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
  ],
})
export class AppModule {}

// Həssas sahələrin maskalanması
const HESSAS = new Set(['parol', 'password', 'token', 'authorization', 'kartNomresi']);
function maskala(deyer: unknown): unknown {
  if (Array.isArray(deyer)) return deyer.map(maskala);
  if (deyer && typeof deyer === 'object') {
    return Object.fromEntries(
      Object.entries(deyer).map(([a, d]) => [a, HESSAS.has(a.toLowerCase()) ? '***' : maskala(d)]),
    );
  }
  return deyer;
}

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    const bas = Date.now();
    return next.handle().pipe(
      tap({
        next: () => this.logger.log(JSON.stringify({ id: req.id, metod: req.method, yol: req.originalUrl, ms: Date.now() - bas, gövdə: maskala(req.body) })),
        error: (x) => this.logger.warn(JSON.stringify({ id: req.id, yol: req.originalUrl, xeta: x?.message })),
      }),
    );
  }
}` },
          { t: "qa", items: [
            ["Middleware və interceptor fərqi?", "Middleware marşrutdan əvvəl işləyir və handler-i bilmir; interceptor ExecutionContext ilə handler-i bilir, əvvəl və sonra işləyir, cavabı dəyişə bilir."],
            ["next() çağırılmasa nə olur?", "Middleware-də sorğu asılı qalır. Interceptor-da next.handle() çağırılmasa handler işə düşmür (keşdə bu bilərəkdən edilir)."],
            ["Hansı sırada işləyirlər?", "Middleware → guard → interceptor → pipe → handler → interceptor (tərs) → filter."],
            ["Keş interceptor-unda əsas təhlükə nədir?", "İstifadəçiyə xas cavabı ümumi açarla saxlamaq: başqa istifadəçi həmin cavabı alır."],
            ["Loqlarda nəyi yazmamalıyıq?", "Parol, token, Authorization başlığı, kart və şəxsi məlumat; maskalama lazımdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Cavabı dəyişdirə bilən qat hansıdır?", options: ["Middleware", "Interceptor", "Guard"], answer: 1, why: "Interceptor next.handle() axınına map/tap tətbiq edə bilir." },
          { t: "quiz", q: "Middleware-də next() çağırılmasa?", options: ["Sorğu davam edir", "Sorğu asılı qalır", "400 qaytarılır"], answer: 1, why: "Sorğu zənciri kəsilir." },
          { t: "quiz", q: "İstifadəçiyə xas cavabı keşləyəndə açar nə olmalıdır?", options: ["Yalnız URL", "URL + istifadəçi/tenant id", "Heç nə"], answer: 1, why: "Yoxsa başqa istifadəçi həmin cavabı alar." },
        ],
      },
    ],
    exercise: {
      task: "Üç komponent yaz. 1) `RequestIdMiddleware`: gələn `x-request-id` başlığı varsa (yalnız /^[A-Za-z0-9-]{8,64}$/ uyğundursa) onu, yoxdursa `randomUUID()` götürüb `req.id`-yə yazsın və cavab başlığına qoysun; `next()` çağırsın. 2) `ZerfInterceptor`: cavabı `{ data, id }` formasına salsın. 3) `LogInterceptor`: metod, yol, müddət və `id`-ni JSON kimi `Logger` ilə yazsın; gövdədən `parol`, `token`, `authorization` sahələrini `'***'` ilə maskalasın. Sonra `AppModule`-da middleware-i `forRoutes('*')` ilə, interceptor-ları `APP_INTERCEPTOR` ilə qeydiyyatdan keç. `main.ts`-də helmet və ağ siyahılı CORS əlavə et.",
      starter: `import { CallHandler, ExecutionContext, Injectable, Logger, MiddlewareConsumer, Module, NestInterceptor, NestMiddleware, NestModule } from '@nestjs/common';\nimport { APP_INTERCEPTOR } from '@nestjs/core';\nimport { randomUUID } from 'node:crypto';\nimport { map, tap } from 'rxjs';\n\n// Middleware, interceptor-lar, AppModule, main.ts hissəsi\n`,
      expect: "RequestIdMiddleware regex yoxlaması, randomUUID, req.id və res.setHeader('x-request-id'), next() çağırılır; ZerfInterceptor map(data => ({ data, id: req.id })); LogInterceptor tap ilə müddət ölçür və gövdəni maskalayır (parol/token/authorization → '***'); AppModule NestModule.configure consumer.apply(...).forRoutes('*') və providers APP_INTERCEPTOR; main.ts-də app.use(helmet()), enableCors origin ağ siyahı, origin '*' deyil.",
    },
  },
  {
    slug: "xetalar",
    title: "Exception filter-lər",
    intro: "Nest-də hər atılmış istisna exception filter-ə düşür və müştəriyə JSON cavab çevrilir. Standart davranış yaxşıdır, amma öz formatını, loqlamanı və təhlükəsiz xəta cavabını filter ilə idarə edirsən.",
    sections: [
      {
        level: "baslangic",
        title: "HttpException və hazır istisnalar",
        blocks: [
          { t: "analogy", text: "Exception filter — xəstəxananın qəbul şöbəsidir. Nə qədər qarışıq problem gəlsə də, o, hamısını düzgün qeydlə, sakit və anlaşılan formada pasiyentə çatdırır — bütün daxili səs-küyü (stack trace) pərdə arxasında saxlayır." },
          { t: "code", lang: "typescript", code: `import {
  BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class IstifadecilerService {
  async tap(id: number) {
    const i = await this.repo.findOne({ where: { id } });
    if (!i) throw new NotFoundException('İstifadəçi tapılmadı');   // 404
    return i;
  }

  async yarat(dto: CreateIstifadeciDto) {
    if (await this.emailVarmi(dto.email)) {
      throw new ConflictException('Bu email artıq qeydiyyatdadır');     // 409
    }
    // ...
  }

  qadagan() {
    throw new HttpException({ mesaj: 'Limit aşıldı', kod: 'LIMIT' }, HttpStatus.TOO_MANY_REQUESTS);
  }
}

// Default cavab: { "statusCode": 404, "message": "İstifadəçi tapılmadı", "error": "Not Found" }` },
          { t: "terms", items: [
            ["HttpException", "status kodu və cavab gövdəsi daşıyan əsas istisna sinfi."],
            ["NotFoundException (404), BadRequestException (400), UnauthorizedException (401), ForbiddenException (403), ConflictException (409)", "hazır törəmə siniflər."],
            ["exception filter", "istisnanı tutub cavabı formalaşdıran sinif."],
            ["@Catch()", "filter-in hansı istisnanı tutduğunu bildirir."],
          ]},
          { t: "tip", text: "Tanıdığın xətanı (tapılmadı, yanlış giriş) uyğun HttpException ilə at. Gözlənilməz xətalar (null.x, baza düşdü) isə avtomatik 500 olur — onu istifadəçiyə detalsız göstərmək lazımdır." },
        ],
      },
      {
        level: "orta",
        title: "Öz filter-in və vahid xəta formatı",
        blocks: [
          { t: "code", lang: "typescript", code: `import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

// Hər şeyi tutan filter: bilinən xəta → öz status; bilinməyən → 500 (detalsız)
@Catch()
export class HamisiFilter implements ExceptionFilter {
  private readonly logger = new Logger('Xeta');

  catch(xeta: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request & { id?: string }>();

    const http = xeta instanceof HttpException;
    const status = http ? xeta.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const mesaj = http ? this.mesaj(xeta) : 'Daxili server xətası';

    if (!http) {
      // Detallı xəta yalnız loqda
      this.logger.error('[' + req.id + '] ' + req.method + ' ' + req.originalUrl, (xeta as Error)?.stack);
    }

    res.status(status).json({
      statusCode: status,
      mesaj,
      id: req.id,
      vaxt: new Date().toISOString(),
    });
  }

  private mesaj(x: HttpException): string | string[] {
    const cavab = x.getResponse();
    return typeof cavab === 'string' ? cavab : (cavab as { message?: string | string[] }).message ?? x.message;
  }
}

// Qlobal qeydiyyat (DI ilə)
providers: [{ provide: APP_FILTER, useClass: HamisiFilter }]

// Yalnız bir növ xətanı tutan filter
@Catch(QueryFailedError)
export class BazaXetaFilter implements ExceptionFilter {
  catch(xeta: QueryFailedError & { code?: string }, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    if (xeta.code === '23505') {                    // PostgreSQL: unique pozulması
      return res.status(409).json({ statusCode: 409, mesaj: 'Belə qeyd artıq var' });
    }
    return res.status(500).json({ statusCode: 500, mesaj: 'Daxili server xətası' });
  }
}` },
          { t: "list", items: [
            "@Catch() — parametrsiz bütün xətaları; @Catch(HttpException) — yalnız onu; bir neçə sinif də verilə bilər.",
            "Filter-lər xüsusidən ümumiyə gedir: marşrut → controller → qlobal. Daha xüsusi @Catch seçilir.",
            "Doğrulama xətaları (ValidationPipe) BadRequestException-dır: filter-də message massiv ola bilər.",
            "Qlobal filter üçün DI lazımdırsa APP_FILTER; app.useGlobalFilters(new X()) DI-siz.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `try {
  return await this.repo.save(x);
} catch (e) {
  throw new BadRequestException(e.message);     // SQL mətni müştəriyə gedir
}`, right: `try {
  return await this.repo.save(x);
} catch (e) {
  this.logger.error(e);                         // detal loqda
  throw new InternalServerErrorException();     // müştəriyə ümumi mesaj
}`, why: "Verilənlər bazası xəta mətni cədvəl, sütun və sorğu detalları verir və hücumçuya yol göstərir. Daxili detalı loqda saxla, müştəriyə ümumi cavab göndər." },
          { t: "mistake", lang: "typescript", wrong: `try {
  await this.servis.is();
} catch (e) {
  console.log(e);          // udulur: cavab uğurlu kimi qayıdır
}`, right: `try {
  await this.servis.is();
} catch (e) {
  this.logger.error(e);
  throw e;                 // yenidən at ki, filter xətanı cavaba çevirsin
}`, why: "Xətanı yalnız loqlayıb udmaq problemi gizlədir və gözlənilməz vəziyyətə aparır. Ya işlə, ya da yenidən at." },
        ],
      },
      {
        level: "senior",
        title: "Xəta strategiyası, monitorinq və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Domen xətaları: servisdə HTTP-dən asılı olmayan öz xəta siniflərin (OdenisRedEdildi, StokYoxdur). Filter onları HTTP statusuna xəritələyir — servis HTTP qatından təmiz qalır.",
            "Xəta kodları: mesajla yanaşı sabit maşın kodu (kod: 'STOK_YOXDUR'): klient mətni parse etmir, tərcümə də asanlaşır.",
            "RFC 9457 (Problem Details): type, title, status, detail, instance — standart xəta formatı. Klientlərlə müqavilə üçün faydalıdır.",
            "Operasional və proqramçı xətalarını ayır: gözlənilən (400/404/409) vs gözlənilməyən (500). Gözlənilməyənlər həyəcan siqnalı yaradır (Sentry, alert); gözlənilənlər isə yalnız metrikadır.",
            "Gözlənilməyən istisnalar: process.on('unhandledRejection'/'uncaughtException') — təmiz bağlanma və yenidən başlama (orkestrator). Vəziyyəti pozulmuş prosesi işlətməyə davam etmə.",
            "Asinxron xətalar: await unudulubsa, Promise rədd olunur və filter-ə çatmır — unhandledRejection. ESLint no-floating-promises qaydasını aç.",
            "Mikroservis və WebSocket kontekstində HTTP filter işləməz: RpcException və WsException + uyğun filter lazımdır; host.getType() ilə kontekst fərqləndirilir.",
            "Test: filter sadə sinifdir — saxta ArgumentsHost ilə catch() çağır, status və gövdəni yoxla; e2e testdə supertest ilə real cavab formatını təsdiqlə.",
            "Təhlükəsizlik — stack trace və daxili detalı müştəriyə vermə. Production-da yalnız ümumi mesaj və requestId; stack yalnız loqda. NODE_ENV-ə görə detal göstərmək belə riskli ola bilər (yanlış konfiqurasiya).",
            "Təhlükəsizlik — enumeration: «bu email yoxdur» / «parol yanlışdır» ayrı-ayrı cavablar verməsin; vahid ümumi mesaj. Başqasının obyektinə 403 əvəzinə 404.",
            "Təhlükəsizlik — xəta vaxtı fərqi: mövcud/mövcud olmayan istifadəçi üçün cavab müddəti fərqlənməsin (timing).",
            "Təhlükəsizlik — xəta mesajına istifadəçi girişini əks etdirmə: mesajda XSS/log injection ola bilər. Girişi loqa yazarkən sətir sonu (\\n, \\r) simvollarını təmizlə.",
            "Təhlükəsizlik — 404/405 və gözlənilməz marşrutlarda framework-ün standart cavabı texnologiyanı açır; vahid formatlı filter bunu da örtür.",
            "Təhlükəsizlik — xəta daşqını: təkrarlanan eyni xətanı hər dəfə yazmaq loq fayllarını və disk/pulu doldurur (log flooding). Nümunələmə və sürət limiti istifadə et.",
          ]},
          { t: "code", lang: "typescript", caption: "Domen xətası, xəritələmə və RFC 9457 forması", code: `// domain/xetalar.ts — HTTP-dən xəbərsiz
export abstract class DomenXetasi extends Error {
  abstract readonly kod: string;
}
export class StokYoxdur extends DomenXetasi {
  readonly kod = 'STOK_YOXDUR';
  constructor(public readonly mehsulId: number) { super('Stok çatmır'); }
}
export class SifarisTapilmadi extends DomenXetasi {
  readonly kod = 'SIFARIS_TAPILMADI';
  constructor() { super('Sifariş tapılmadı'); }
}

// filter: xəritələmə
const STATUS: Record<string, HttpStatus> = {
  STOK_YOXDUR: HttpStatus.CONFLICT,
  SIFARIS_TAPILMADI: HttpStatus.NOT_FOUND,
};

@Catch()
export class ProblemFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemFilter.name);

  catch(xeta: unknown, host: ArgumentsHost) {
    if (host.getType() !== 'http') throw xeta;      // WS/RPC üçün başqa filter
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request & { id?: string }>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let kod = 'DAXILI_XETA';
    let detal = 'Gözlənilməz xəta baş verdi';

    if (xeta instanceof DomenXetasi) {
      status = STATUS[xeta.kod] ?? HttpStatus.BAD_REQUEST;
      kod = xeta.kod;
      detal = xeta.message;
    } else if (xeta instanceof HttpException) {
      status = xeta.getStatus();
      kod = 'HTTP_' + status;
      detal = xeta.message;
    } else {
      this.logger.error('[' + req.id + '] ' + (xeta as Error)?.stack);   // yalnız loqda
    }

    res.status(status).type('application/problem+json').json({
      type: 'https://kodakademiyasi.az/xetalar/' + kod,
      title: kod,
      status,
      detail: detal,
      instance: req.originalUrl,
      requestId: req.id,
    });
  }
}` },
          { t: "qa", items: [
            ["Exception filter nə edir?", "Atılmış istisnanı tutub müştəriyə gedən cavabı (status və gövdə) formalaşdırır."],
            ["Niyə domen xətaları ayrıca yazılır?", "Servis HTTP-dən asılı olmur; filter statusa xəritələyir, beləcə eyni məntiq HTTP, RPC və WS-də işləyir."],
            ["500 xətasında müştəriyə nə göstərməliyik?", "Ümumi mesaj və requestId; stack və daxili detal yalnız loqda."],
            ["await unudulsa nə baş verir?", "Rədd olunan Promise filter-ə çatmır, unhandledRejection olur; tətbiq düşə və ya sakitcə səhv işləyə bilər."],
            ["Başqasının obyektinə niyə 404?", "403 obyektin mövcud olduğunu açır; 404 bu məlumatı vermir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yoxlanılmamış gözlənilməz xəta default necə qayıdır?", options: ["400", "500", "404"], answer: 1, why: "HttpException olmayan xəta 500 olur." },
          { t: "quiz", q: "@Catch() parametrsiz nəyi tutur?", options: ["Yalnız HttpException", "Bütün istisnaları", "Yalnız validasiya xətalarını"], answer: 1, why: "Boş @Catch() hər şeyi tutur." },
          { t: "quiz", q: "500 cavabında stack trace müştəriyə verilməlidirmi?", options: ["Bəli, debug üçün", "Xeyr, yalnız loqda", "Yalnız mobil klientə"], answer: 1, why: "Daxili detal hücumçuya kömək edir." },
        ],
      },
    ],
    exercise: {
      task: "Xəta sistemi yaz. 1) `DomenXetasi` abstrakt sinfi və iki törəmə (`StokYoxdur`, `SifarisTapilmadi`) — hər birində `kod`. 2) `ProblemFilter` (`@Catch()`): `DomenXetasi` → xəritədən status; `HttpException` → öz statusu; digər → 500, `Logger.error` ilə stack-i yaz, müştəriyə yalnız ümumi mesaj və `requestId` ver. Cavab RFC 9457 formasında (`type`, `title`, `status`, `detail`, `instance`). 3) `host.getType() !== 'http'` olduqda xətanı yenidən at. 4) Modulda `APP_FILTER` ilə qeydiyyatdan keç. 5) Şərhdə «bu email yoxdur» əvəzinə niyə vahid mesaj və başqasının obyekti üçün niyə 404 verdiyini izah et.",
      starter: `import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, Module } from '@nestjs/common';\nimport { APP_FILTER } from '@nestjs/core';\nimport type { Request, Response } from 'express';\n\n// Domen xətaları, ProblemFilter, AppModule\n`,
      expect: "abstract class DomenXetasi extends Error { abstract kod }; StokYoxdur və SifarisTapilmadi; STATUS xəritəsi; @Catch() ProblemFilter implements ExceptionFilter; host.getType() yoxlaması; DomenXetasi/HttpException/digər ayrı budaqlar; 500 üçün logger.error(stack) və müştəriyə ümumi mesaj + requestId; cavabda type/title/status/detail/instance; providers APP_FILTER useClass; şərhdə enumeration və 403/404 izahı var.",
    },
  },
  {
    slug: "db",
    title: "TypeORM / Prisma ilə verilənlər bazası",
    intro: "Back-end-in əksəriyyəti verilənlər bazası ilə işləyir. ORM (TypeORM, Prisma) cədvəlləri kod obyektlərinə bağlayır: SQL-i əl ilə yazmadan sorğu, əlaqə, miqrasiya və tranzaksiya idarə edirsən.",
    sections: [
      {
        level: "baslangic",
        title: "TypeORM ilə entity və repozitoriya",
        blocks: [
          { t: "analogy", text: "ORM — tərcüməçidir. Sən kod (obyektlər) dilində danışırsan, tərcüməçi bunu bazanın dilinə (SQL) çevirir və cavabı yenidən obyektə qaytarır. Yaxşı tərcüməçi işi asanlaşdırır, amma ona nə dediyini yenə də bilməlisən." },
          { t: "code", lang: "bash", code: `npm install @nestjs/typeorm typeorm pg` },
          { t: "code", lang: "typescript", code: `// istifadeci.entity.ts
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('istifadeciler')
export class Istifadeci {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 120 })
  email: string;

  @Column({ length: 80 })
  ad: string;

  @Column({ select: false })              // sorğularda default çıxmır
  parolHesi: string;

  @CreateDateColumn()
  yaradilma: Date;

  @OneToMany(() => Sifaris, (s) => s.istifadeci)
  sifarisler: Sifaris[];
}

// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (k: ConfigService) => ({
        type: 'postgres',
        url: k.getOrThrow('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,               // production-da HEÇ VAXT true olmasın
      }),
    }),
  ],
})
export class AppModule {}

// istifadeciler.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Istifadeci])],
  providers: [IstifadecilerService],
  exports: [IstifadecilerService],
})
export class IstifadecilerModule {}

// istifadeciler.service.ts
@Injectable()
export class IstifadecilerService {
  constructor(@InjectRepository(Istifadeci) private readonly repo: Repository<Istifadeci>) {}

  siyahi() { return this.repo.find({ order: { yaradilma: 'DESC' }, take: 20 }); }
  tap(id: number) { return this.repo.findOneBy({ id }); }
  yarat(dto: CreateIstifadeciDto) { return this.repo.save(this.repo.create(dto)); }
}` },
          { t: "terms", items: [
            ["ORM", "obyekt-relyasion xəritələmə: cədvəl ↔ sinif."],
            ["entity", "bazadakı cədvəli təmsil edən sinif."],
            ["repozitoriya", "entity üçün find/save/remove metodları verən obyekt."],
            ["miqrasiya", "sxem dəyişikliklərinin versiyalı skriptləri."],
            ["synchronize", "entity-dən sxemi avtomatik yeniləyir — yalnız lokal inkişaf üçün."],
          ]},
          { t: "tip", text: "synchronize: true istehsalatda sütunu və verilənləri silə bilər. Sxemi miqrasiya ilə idarə et." },
        ],
      },
      {
        level: "orta",
        title: "Əlaqələr, tranzaksiya, miqrasiya və Prisma",
        blocks: [
          { t: "code", lang: "typescript", code: `// Əlaqə: bir istifadəçi — çox sifariş
@Entity('sifarisler')
export class Sifaris {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Istifadeci, (i) => i.sifarisler, { onDelete: 'CASCADE', nullable: false })
  istifadeci: Istifadeci;

  @Column() istifadeciId: number;
  @Column('decimal', { precision: 10, scale: 2 }) mebleg: string;
}

// Sorğular
this.repo.find({
  where: { istifadeciId: 5 },
  relations: { istifadeci: true },            // JOIN: lazım olanda
  select: { id: true, mebleg: true },
  order: { id: 'DESC' }, skip: 0, take: 20,
});

// QueryBuilder: mürəkkəb sorğu (parametrləşdirilmiş!)
this.repo.createQueryBuilder('s')
  .leftJoinAndSelect('s.istifadeci', 'i')
  .where('s.mebleg > :min AND i.ad ILIKE :ad', { min: 100, ad: '%' + axtar + '%' })
  .getMany();

// Tranzaksiya: ya hamısı, ya heç nə
async kocur(kimden: number, kime: number, mebleg: number) {
  await this.dataSource.transaction(async (em) => {
    const a = await em.findOneByOrFail(Hesab, { id: kimden });
    const b = await em.findOneByOrFail(Hesab, { id: kime });
    if (a.balans < mebleg) throw new ConflictException('Balans kifayət deyil');
    a.balans -= mebleg;
    b.balans += mebleg;
    await em.save([a, b]);
  });
}

// Miqrasiya (CLI)
// npx typeorm migration:generate src/migrations/Yeni -d src/data-source.ts
// npx typeorm migration:run -d src/data-source.ts

// ——— Prisma alternativi ———
// schema.prisma:  model Istifadeci { id Int @id @default(autoincrement())  email String @unique  sifarisler Sifaris[] }
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() { await this.$connect(); }
  async onModuleDestroy() { await this.$disconnect(); }
}

this.prisma.istifadeci.findMany({ where: { email: { contains: 'az' } }, include: { sifarisler: true }, take: 20 });
this.prisma.$transaction([this.prisma.hesab.update(...), this.prisma.hesab.update(...)]);` },
          { t: "list", items: [
            "TypeORM — dekoratorlar, Active Record/Data Mapper; Prisma — sxem faylı, avtomatik tipli klient və güclü miqrasiya aləti. Yeni layihələrdə Prisma tipləri üçün populyardır; TypeORM Nest ilə sıx inteqrasiyalıdır.",
            "Əlaqələri yalnız lazım olanda yüklə (relations/include). Hər şeyi eager yükləmək yavaşladır.",
            "Səhifələmə üçün take/skip və ya böyük cədvəllərdə kursor (id > son) istifadə et.",
            "Tranzaksiyada bütün əməliyyatlar eyni em/tx üzərində aparılmalıdır; repozitoriyanı birbaşa çağırsan, tranzaksiyadan kənarda qalır.",
          ]},
          { t: "mistake", lang: "typescript", wrong: `const sifarisler = await this.sifarisRepo.find();        // 100 sifariş
for (const s of sifarisler) {
  s.istifadeci = await this.istifadeciRepo.findOneBy({ id: s.istifadeciId });   // 100 əlavə sorğu
}`, right: `const sifarisler = await this.sifarisRepo.find({ relations: { istifadeci: true }, take: 100 });`, why: "Bu N+1 problemidir: 1 + N sorğu. Əlaqəni bir sorğuda JOIN ilə və ya IN ilə topla; böyük siyahıda baza yüklənir və cavab yavaşlayır." },
          { t: "mistake", lang: "typescript", wrong: `const sorgu = 'SELECT * FROM istifadeciler WHERE ad = \\'' + ad + '\\'';
await this.dataSource.query(sorgu);        // SQL inyeksiyası`, right: `await this.dataSource.query('SELECT * FROM istifadeciler WHERE ad = $1', [ad]);
// və ya repo.find({ where: { ad } })`, why: "Sətir birləşdirməsi ilə sorğu qurmaq SQL inyeksiyasıdır: ad = ' OR 1=1 -- bütün cədvəli verir. Həmişə parametrləşdirilmiş sorğu işlət." },
        ],
      },
      {
        level: "senior",
        title: "Performans, bağlantı hovuzu, miqrasiya strategiyası və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "İndekslər: tez-tez filtr/sort/JOIN edilən sütunlara (istifadeciId, yaradilma) indeks; kompozit indeksdə sıra vacibdir. EXPLAIN ANALYZE ilə yoxla; hər indeks yazma əməliyyatını yavaşladır.",
            "Bağlantı hovuzu: hər Nest nüsxəsi max bağlantı açır. pod sayı × hovuz ölçüsü baza limitini keçməsin; PgBouncer və ya Prisma Accelerate / pooler istifadə et.",
            "Böyük siyahı: take-i məhdud saxla, kursor səhifələmə (WHERE id < :son ORDER BY id DESC LIMIT n) offset-dən sürətlidir.",
            "Oxu-yazı ayırması: replika-dan oxu, əsas bazaya yaz; replikasiya gecikməsi (stale read) nəzərə alınmalıdır.",
            "Miqrasiya strategiyası: geri uyğun (expand/contract). Əvvəl yeni sütun əlavə et, kodu yenilə, sonra köhnəni sil. Böyük cədvəldə sütun əlavə edib doldurmaq cədvəli kilidləyə bilər — hissə-hissə (batch).",
            "Yumşaq silmə (soft delete): @DeleteDateColumn; bütün sorğularda deletedAt nəzərə alınır. GDPR üçün «unudulmaq hüququ» halında həqiqətən silmək/anonimləşdirmək lazımdır.",
            "Konkurent yeniləmə: optimistik kilid (@VersionColumn) və ya pessimist (setLock('pessimistic_write')). Balans/stok kimi yarış (race condition) hallarında UPDATE ... SET stok = stok - 1 WHERE stok > 0 atomar şərti işlət.",
            "İdempotentlik: ödəniş kimi əməliyyatlarda təkrar sorğu iki dəfə icra olunmasın — unikal idempotency key.",
            "Test: e2e üçün Testcontainers ilə real PostgreSQL; SQLite ilə əvəz etmək fərqli davranış (tiplər, kilidlər) gizlədir.",
            "Təhlükəsizlik — SQL inyeksiyası: query()/queryRaw/QueryBuilder-də sətir birləşdirməsi qadağandır; Prisma-da $queryRawUnsafe-dən qaç, $queryRaw tagged template işlət. ORDER BY sahəsini istifadəçidən alırsansa ağ siyahı.",
            "Təhlükəsizlik — mass assignment: repo.save(body)/Object.assign ilə gövdəni entity-yə yazma — rol, balans, sahib ID dəyişə bilər. Dar DTO + açıq xəritələmə.",
            "Təhlükəsizlik — həssas sütunlar: parolHesi select: false; cavab DTO-su ilə çıxış məhdudlaşdır; PII sütunlarını şifrələ (at-rest) və ya ayrıca saxla.",
            "Təhlükəsizlik — minimal hüquq: tətbiqin baza istifadəçisinə yalnız lazım olan icazələr (DDL/DROP yox). Miqrasiya üçün ayrı daha yüksək hüquqlu hesab.",
            "Təhlükəsizlik — bağlantı sətri və sirlər: DATABASE_URL kodda/gitdə deyil, sirr menecerindədir; TLS (ssl: true) ilə bağlan, sertifikatı yoxla (rejectUnauthorized: false istifadə etmə).",
            "Təhlükəsizlik — tenant izolyasiyası: çox kirayəçili sistemdə hər sorğuya tenantId şərti avtomatik əlavə olunsun (subscriber/middleware, PostgreSQL RLS). Unudulmuş where bütün müştərilərin məlumatını açır.",
            "Təhlükəsizlik — synchronize: true və prod bazaya dev-dən qoşulmaq: təsadüfən sütun silmək; istehsalatda yalnız miqrasiya və ayrı əlçatanlıq.",
            "Təhlükəsizlik — ehtiyat nüsxə: şifrələnmiş, ayrı yerdə və bərpa testi olunmuş. Sınanmayan backup — backup deyil.",
          ]},
          { t: "code", lang: "typescript", caption: "Atomar stok, optimistik kilid və tenant süzgəci", code: `// Atomar yeniləmə: yarışa davamlı
async rezervEt(mehsulId: number, say: number): Promise<void> {
  const netice = await this.dataSource
    .createQueryBuilder()
    .update(Mehsul)
    .set({ stok: () => 'stok - :say' })
    .where('id = :id AND stok >= :say', { id: mehsulId, say })
    .execute();
  if (netice.affected === 0) throw new ConflictException('Stok çatmır');
}

// Optimistik kilid
@Entity()
export class Hesab {
  @PrimaryGeneratedColumn() id: number;
  @Column('int') balans: number;
  @VersionColumn() versiya: number;       // paralel dəyişiklikdə save xəta verir
}

// Tranzaksiya + idempotentlik
async odenisEt(acar: string, dto: OdenisDto, istifadeciId: number) {
  return this.dataSource.transaction(async (em) => {
    const var_ = await em.findOne(Odenis, { where: { acar, istifadeciId } });
    if (var_) return var_;                              // təkrar sorğu: eyni nəticə
    const yeni = em.create(Odenis, { ...dto, acar, istifadeciId });
    return em.save(yeni);                               // (acar, istifadeciId) üzərində unikal indeks
  });
}

// Tenant süzgəci: hər sorğuya məcburi şərt
async siyahi(cari: CariIstifadeci) {
  return this.repo.find({ where: { tenantId: cari.tenantId }, take: 50 });   // tenantId tokendən, gövdədən yox
}

// Prisma: təhlükəsiz xam sorğu
const adlar = await this.prisma.$queryRaw<{ ad: string }[]>(
  Prisma.sql\\\`SELECT ad FROM istifadeciler WHERE email = \\\${email}\\\`,   // parametrləşir
);` },
          { t: "qa", items: [
            ["TypeORM və Prisma fərqi?", "TypeORM — dekoratorlu entity siniflər, Nest ilə sıx inteqrasiya. Prisma — sxem faylı, avtomatik tipli klient və güclü miqrasiya aləti."],
            ["N+1 problemi nədir?", "Siyahı üçün 1 sorğu, hər element üçün əlavə sorğu. JOIN/include və ya toplu (IN) sorğu ilə həll olunur."],
            ["synchronize: true niyə təhlükəlidir?", "Entity dəyişəndə sxemi avtomatik dəyişdirir və verilənləri silə bilər; istehsalatda miqrasiya işlədilir."],
            ["Stok azaltmada yarışı necə önləyirsən?", "Atomar UPDATE ... WHERE stok >= n, yaxud kilid/tranzaksiya; oxu-dəyiş-yaz ardıcıllığı yarış yaradır."],
            ["SQL inyeksiyasından necə qorunursan?", "Parametrləşdirilmiş sorğu/ORM, sətir birləşdirməsi yoxdur, ORDER BY üçün ağ siyahı, minimal baza hüququ."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Production-da synchronize necə olmalıdır?", options: ["true", "false, miqrasiya ilə", "Fərqi yoxdur"], answer: 1, why: "Avtomatik sxem dəyişikliyi məlumat itkisinə səbəb ola bilər." },
          { t: "quiz", q: "N+1 problemini nə həll edir?", options: ["Daha çox sorğu", "JOIN / relations ilə birdəfəlik yükləmə", "synchronize"], answer: 1, why: "Əlaqəni bir sorğuda yüklə." },
          { t: "quiz", q: "SQL inyeksiyasından əsas qorunma?", options: ["Sətir birləşdirmə", "Parametrləşdirilmiş sorğu", "Kiçik hərf"], answer: 1, why: "Dəyər sorğudan ayrı ötürülür." },
        ],
      },
    ],
    exercise: {
      task: "`Kurs` və `Qeydiyyat` entity-lərini yaz (bir kurs — çox qeydiyyat; `Qeydiyyat`: `istifadeciId`, `kursId`, unikal indeks `(istifadeciId, kursId)`). 1) `KurslarService`: `siyahi(sehife, olcu)` (olcu ≤ 50), relations ilə N+1-siz. 2) `qeydiyyat(kursId, istifadeciId)`: tranzaksiya içində kursu `pessimistic_write` ilə kilidlə, yer qalıbsa `yerSayi` azalt, yoxsa `ConflictException`; təkrar qeydiyyatda unikal xətanı `ConflictException`-a çevir. 3) `axtar(soz)` — QueryBuilder ilə parametrləşdirilmiş `ILIKE`. 4) Konfiqurasiyada `synchronize: false` və `getOrThrow('DATABASE_URL')` istifadə et. 5) Şərhdə N+1, SQL inyeksiyası və mass assignment-ə qarşı nə etdiyini yaz.",
      starter: `import { ConflictException, Injectable } from '@nestjs/common';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Column, DataSource, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository } from 'typeorm';\n\n// Entity-lər və KurslarService\n`,
      expect: "Kurs @OneToMany qeydiyyatlar, Qeydiyyat @ManyToOne kurs və @Index(['istifadeciId','kursId'], { unique: true }); siyahi find({ relations, take: Math.min(olcu, 50), skip }); qeydiyyat dataSource.transaction içində lock: { mode: 'pessimistic_write' }, yer yoxdursa ConflictException, unikal xətada (23505) ConflictException; axtar createQueryBuilder .where('k.ad ILIKE :soz', { soz }) parametrləşdirilmiş; synchronize: false və getOrThrow; şərhdə N+1, SQL inyeksiyası, mass assignment izah olunub.",
    },
  },
];
