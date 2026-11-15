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
          { t: "h", text: "@CurrentUser() və Passport ilə JWT" },
          { t: "p", text: "Guard req.user-i doldurandan sonra controller-də hər dəfə @Req() ilə bütün sorğu obyektini almaq yorucudur və tipləri itirir. createParamDecorator ilə öz parametr dekoratorunu yaza bilərsən: o, ExecutionContext-dən sorğunu oxuyub yalnız lazım olan hissəni qaytarır. Bu həm controller-i təmiz saxlayır, həm də test zamanı req obyektini saxtalaşdırmaq ehtiyacını azaldır." },
          { t: "code", lang: "typescript", caption: "Parametr dekoratoru və Passport strategiyası", code: `// cari-istifadeci.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CariIstifadeci { id: number; rollar: string[]; tenantId?: number }

export const CariIstifadeciDek = createParamDecorator(
  (sahe: keyof CariIstifadeci | undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user as CariIstifadeci;
    return sahe ? user?.[sahe] : user;
  },
);

// istifadə
@Get('profil')
profil(@CariIstifadeciDek() cari: CariIstifadeci, @CariIstifadeciDek('id') id: number) {
  return this.istifadeciler.tap(id);
}

// Passport ilə: jwt.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(konfiq: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: konfiq.getOrThrow<string>('JWT_SIRR'),
      algorithms: ['HS256'],
    });
  }
  // token yoxlanandan sonra çağırılır; qaytarılan dəyər req.user olur
  validate(yuk: { sub: number; rollar: string[] }): CariIstifadeci {
    return { id: yuk.sub, rollar: yuk.rollar };
  }
}

// guard: AuthGuard('jwt') — Passport strategiyasını işə salır
@Injectable()
export class JwtPassportGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) { super(); }
  canActivate(ctx: ExecutionContext) {
    const acıq = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [ctx.getHandler(), ctx.getClass()]);
    return acıq ? true : super.canActivate(ctx);
  }
}` },
          { t: "terms", items: [
            ["createParamDecorator", "controller parametri üçün öz dekoratorunu yaratmağa imkan verir (məs. @CurrentUser())."],
            ["Passport strategiyası", "autentifikasiya üsulunu (JWT, local, OAuth) kapsullaşdıran sinif; validate() nəticəsi req.user olur."],
            ["getAllAndOverride / getAllAndMerge", "metadatanı handler və sinifdən oxuyur: birincisi ilk tapılanı, ikincisi hamısını birləşdirir."],
            ["SetMetadata", "handler və ya sinifə açar-dəyər metadata qoyur; guard Reflector ilə oxuyur."],
          ]},
          { t: "mistake", lang: "typescript", wrong: `const yuk = this.jwt.decode(token);     // imza yoxlanmır!
req.user = yuk;`, right: `const yuk = await this.jwt.verifyAsync(token, { algorithms: ['HS256'] });
req.user = yuk;`, why: "decode yalnız base64 açır, imzanı və müddəti yoxlamır — hər kəs öz yazdığı tokeni «etibarlı» göstərə bilər. Həmişə verify/verifyAsync işlət." },
          { t: "mistake", lang: "typescript", wrong: `canActivate(ctx: ExecutionContext) {
  const req = ctx.switchToHttp().getRequest();
  return req.user?.rollar.includes('admin');   // user yoxdursa undefined → 403, rollar yoxdursa xəta
}`, right: `canActivate(ctx: ExecutionContext) {
  const { user } = ctx.switchToHttp().getRequest();
  return Array.isArray(user?.rollar) && user.rollar.includes('admin');
}`, why: "Guard-da gözlənilməz TypeError 500 verir və problemi gizlədir. Giriş məlumatına etibar etmə: optional chaining və tip yoxlaması ilə həmişə aydın true/false qaytar." },
          { t: "warn", text: "Guard false qaytaranda Nest ForbiddenException (403) atır. Giriş olmayanda 401 istəyirsənsə, UnauthorizedException atmalısan — guard-ın nəticəsini «sadəcə false» buraxma." },
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
          { t: "h", text: "Guard-lar müxtəlif kontekstlərdə və tenant yoxlaması" },
          { t: "p", text: "ExecutionContext yalnız HTTP üçün deyil: getType() 'http', 'ws' və ya 'rpc' qaytarır. Eyni guard sinfi üç transportda işləyəcəksə, kontekstə görə sorğu/klient obyektini düzgün almaq lazımdır. WebSocket-də autentifikasiya adətən handshake zamanı bir dəfə aparılır, çünki bağlantı uzunmüddətlidir; sonrakı mesajlarda yenidən token yoxlamaq əvəzinə bağlantıya bağlanmış istifadəçini oxuyursan." },
          { t: "code", lang: "typescript", caption: "Çox kontekstli guard və tenant guard", code: `@Injectable()
export class UmumiAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    let token: string | undefined;
    let hedef: { user?: unknown };

    if (ctx.getType() === 'ws') {
      const klient = ctx.switchToWs().getClient();
      token = klient.handshake?.auth?.token;          // socket.io handshake
      hedef = klient.data;
    } else {
      const req = ctx.switchToHttp().getRequest();
      const [tip, t] = (req.headers.authorization ?? '').split(' ');
      token = tip === 'Bearer' ? t : undefined;
      hedef = req;
    }
    if (!token) throw new UnauthorizedException();
    try {
      hedef.user = await this.jwt.verifyAsync(token, { algorithms: ['HS256'] });
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}

// Tenant guard: URL-dəki tenant tokendəkinə uyğun olmalıdır
@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const urlTenant = Number(req.params.tenantId);
    if (!Number.isInteger(urlTenant) || urlTenant !== req.user?.tenantId) {
      throw new NotFoundException();                  // başqa tenantın mövcudluğunu açma
    }
    return true;
  }
}

// Sıra: soldan sağa icra olunur — əvvəl auth, sonra tenant
@UseGuards(UmumiAuthGuard, TenantGuard)
@Controller('tenantlar/:tenantId/senedler')
export class TenantSenedlerController { /* ... */ }` },
          { t: "list", items: [
            "@UseGuards(A, B) — guard-lar soldan sağa icra olunur və ilk uğursuz olan zənciri kəsir. Qlobal APP_GUARD-lar controller guard-larından əvvəl çalışır.",
            "Guard-da verilənlər bazasına hər sorğuda getmək bahadır: token yükündəki məlumata güvən, həssas əməliyyatlarda isə servisdə bazadan təsdiqlə.",
            "Guard test edilə bilən sinifdir: saxta ExecutionContext (createMock və ya əl ilə yığılmış obyekt) ilə canActivate()-i birbaşa çağır; Reflector-u mock-la.",
            "Token müqayisələrində vaxt hücumlarına qarşı sabit müddətli müqayisə (crypto.timingSafeEqual) istifadə et — məsələn, API açarlarını heşləyib müqayisə edərkən.",
          ]},
          { t: "qa", items: [
            ["Guard ExecutionContext ilə WebSocket-i necə dəstəkləyir?", "ctx.getType() ilə kontekst təyin edilir; ws üçün switchToWs().getClient() ilə socket alınır, autentifikasiya adətən handshake-də aparılır."],
            ["getAllAndOverride və getAllAndMerge fərqi?", "Override handler metadatasını sinif metadatasının üzərinə qoyur (ilk tapılan); merge ikisini birləşdirir — rollar massivlərini toplamaq üçün faydalıdır."],
            ["Guard-ları hansı sıra ilə yazmaq lazımdır?", "Əvvəl autentifikasiya (req.user doldurur), sonra rol/tenant guard-ı. Tərs sıra user olmadığı üçün həmişə rədd verər."],
            ["Parol sıfırlama tokeni niyə JWT olmamalıdır?", "Birdəfəlik və ləğv olunan olmalıdır: təsadüfi token bazada heşlənmiş saxlanılır, qısa ömürlü və istifadədən sonra silinir."],
            ["Guard-da bazaya sorğu verməyin zərəri?", "Hər sorğuda əlavə gecikmə və yük yaradır. Lazım olanda keşlə və ya yalnız həssas əməliyyatlarda yoxla."],
            ["Guard-ın interceptor-dan fərqi?", "Guard yalnız keçid qərarı verir və handler-dən əvvəl işləyir; interceptor handler-in əvvəl-sonrasına girib cavabı dəyişə bilir."],
          ]},
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
          { t: "h", text: "Hazır interceptor-lar: serializasiya, keş və fayl yükləmə" },
          { t: "p", text: "Hər dəfə interceptor-u sıfırdan yazmaq lazım deyil. ClassSerializerInterceptor entity/DTO siniflərindəki class-transformer dekoratorlarına (@Exclude, @Expose, @Transform) baxıb cavabı süzür — parolHesi kimi sahələri cavabdan çıxarmağın ən təmiz yoludur. CacheInterceptor GET cavablarını keşləyir; FileInterceptor isə multer vasitəsilə multipart/form-data fayl yükləməsini emal edir." },
          { t: "code", lang: "typescript", code: `// Cavabdan həssas sahəni çıxar
export class IstifadeciCavabi {
  id: number;
  ad: string;

  @Exclude()
  parolHesi: string;

  @Transform(({ value }) => (value as string).toLowerCase())
  email: string;

  constructor(qismen: Partial<IstifadeciCavabi>) { Object.assign(this, qismen); }
}

@UseInterceptors(ClassSerializerInterceptor)
@Get(':id')
async tap(@Param('id', ParseIntPipe) id: number) {
  return new IstifadeciCavabi(await this.servis.tap(id));    // sinif nümunəsi qaytar, adi obyekt yox
}

// Hazır keş: açar və TTL dekoratorla
@UseInterceptors(CacheInterceptor)
@CacheKey('mehsul_siyahi')
@CacheTTL(30_000)                                   // cache-manager v5+: millisaniyə
@Get()
siyahi() { return this.servis.hamisi(); }

// Fayl yükləmə: ölçü və tip məhdudiyyəti ilə
@Post('sekil')
@UseInterceptors(FileInterceptor('fayl', {
  limits: { fileSize: 2 * 1024 * 1024 },            // 2 MB
  fileFilter: (_req, fayl, cb) =>
    cb(fayl.mimetype.startsWith('image/') ? null : new BadRequestException('Yalnız şəkil'), true),
}))
yukle(@UploadedFile() fayl: Express.Multer.File) {
  return { ad: fayl.originalname, olcu: fayl.size };
}` },
          { t: "terms", items: [
            ["ClassSerializerInterceptor", "cavabdakı sinif nümunələrini class-transformer qaydalarına görə seriallaşdırır."],
            ["@Exclude / @Expose", "sahəni cavabdan çıxarır / yalnız göstərilənləri açır."],
            ["tap / map / catchError / finalize", "RxJS operatorları: yan təsir / dəyişdirmə / xətanı tutma / uğurdan və ya xətadan asılı olmayaraq sonda işləyən təmizlik."],
            ["multer", "multipart/form-data faylları emal edən kitabxana; Nest FileInterceptor bunun üzərində qurulub."],
          ]},
          { t: "mistake", lang: "typescript", wrong: `@UseInterceptors(ClassSerializerInterceptor)
@Get(':id')
tap(@Param('id') id: string) {
  return { ...entity };          // adi obyekt: @Exclude işləmir
}`, right: `@UseInterceptors(ClassSerializerInterceptor)
@Get(':id')
async tap(@Param('id', ParseIntPipe) id: number) {
  return new IstifadeciCavabi(await this.servis.tap(id));
}`, why: "ClassSerializerInterceptor yalnız sinif nümunələrinə təsir edir. Spread və ya adi obyekt qaytarsan dekoratorlar tətbiq olunmur və həssas sahə sızır." },
          { t: "tip", text: "Interceptor-da yan təsir (audit, metrika) cavabı gecikdirməməlidir: await etmə, xətanı ayrıca tut. Əks halda uğursuz log yazısı biznes sorğusunu sındırar." },
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
          { t: "h", text: "AsyncLocalStorage ilə sorğu konteksti və RxJS axınının dərinliyi" },
          { t: "p", text: "Node.js-də sorğuya xas məlumatı (requestId, istifadəçi) hər funksiyaya parametr kimi ötürmək yorucudur. AsyncLocalStorage asinxron zəncir boyu kontekst saxlayır: middleware konteksti açır, sonrakı bütün kod (servis, repo, loqqer) onu oxuya bilir. Interceptor-da isə next.handle() Observable-dır və abunə olunana qədər soyuqdur — operatorların sırası vacibdir: timeout handler-i, finalize isə həm uğur, həm xəta, həm də ləğv zamanı işləyir." },
          { t: "code", lang: "typescript", caption: "AsyncLocalStorage, finalize və xətanın çevrilməsi", code: `// sorgu-konteksti.ts
import { AsyncLocalStorage } from 'node:async_hooks';
export const kontekst = new AsyncLocalStorage<{ id: string; istifadeciId?: number }>();

// middleware konteksti açır
@Injectable()
export class KontekstMiddleware implements NestMiddleware {
  use(req: any, _res: any, next: () => void) {
    kontekst.run({ id: req.id ?? randomUUID() }, next);   // next həmin kontekstdə çağırılır
  }
}

// istənilən yerdə oxu (parametr ötürmədən)
export function cariId() { return kontekst.getStore()?.id; }

// Aktiv sorğu sayğacı (metrika) — finalize həmişə işləyir
@Injectable()
export class AktivSorgularInterceptor implements NestInterceptor {
  private aktiv = 0;
  intercept(_ctx: ExecutionContext, next: CallHandler) {
    this.aktiv++;
    return next.handle().pipe(finalize(() => { this.aktiv--; }));   // uğur, xəta və ya client ləğvi
  }
}

// Domen xətasını HTTP xətasına çevir (filter əvəzinə, yalnız bu controller üçün)
@Injectable()
export class XetaCevirInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((x) =>
        throwError(() => (x instanceof StokYoxdur ? new ConflictException(x.message) : x)),
      ),
    );
  }
}

// Nəticəni dəyişdirmədən vaxt həddini aşanı xəbərdar et
tap({ next: () => { if (Date.now() - bas > 1000) logger.warn('Yavaş sorğu: ' + cariId()); } })` },
          { t: "list", items: [
            "Eyni interceptor-da bir neçə operator pipe-da soldan sağa tətbiq olunur: timeout(...) əvvəl, catchError sonra olmalıdır ki, TimeoutError tutulsun.",
            "AsyncLocalStorage kiçik əlavə xərc gətirir, amma loqda requestId-ni hər yerə ötürməkdən qat-qat təmizdir. nestjs-cls kimi paketlər bunu Nest-ə uyğunlaşdırır.",
            "Soyuq və isti Observable: next.handle() abunə olunmayana qədər handler-i çağırmır. İki dəfə subscribe etsən handler iki dəfə işləyər (məs. retry() ilə).",
            "retry() interceptor-da təhlükəlidir: handler-i yenidən işlədir, POST kimi dəyişdirici əməliyyat iki dəfə təsir edə bilər. Yalnız idempotent GET-lərdə düşün.",
            "Müştəri bağlantını kəsəndə Observable ləğv olunur (unsubscribe); uzun işləri finalize/takeUntil ilə təmizlə.",
          ]},
          { t: "warn", text: "Qlobal interceptor-da hər sorğuda JSON.stringify(req.body) kimi ağır əməliyyat və böyük gövdələri loqlamaq həm performansı öldürür, həm də həssas məlumat sızdırır. Ölçü limiti və maskalama qoy." },
          { t: "qa", items: [
            ["Observable soyuq olması nə deməkdir?", "next.handle() özü handler-i çağırmır; abunə olunanda icra olunur. Abunəlik olmasa handler heç işə düşmür, iki abunəlik iki icra verir."],
            ["finalize operatoru nə vaxt işləyir?", "Axın uğurla bitəndə, xəta ilə bitəndə və ya abunə ləğv edildikdə — təmizlik və sayğac üçün idealdır."],
            ["AsyncLocalStorage nə problemi həll edir?", "Sorğuya xas kontekstin (requestId, istifadəçi) parametr ötürmədən asinxron zəncir boyu əlçatan olmasını."],
            ["Interceptor və exception filter-in xəta ilə münasibəti?", "Interceptor catchError ilə xətanı çevirə bilər; çevrilməyən xəta filter-ə çatır. Interceptor xətanı udarsa filter heç işə düşməz."],
            ["Global interceptor-ları DI ilə necə qeydiyyatdan keçirirsən?", "Modulda provide: APP_INTERCEPTOR, useClass: X; app.useGlobalInterceptors(new X()) DI-siz işləyir."],
          ]},
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
          { t: "h", text: "Validasiya xətaları, HttpAdapterHost və BaseExceptionFilter" },
          { t: "p", text: "ValidationPipe default olaraq BadRequestException atır və message sahəsində sətirlər massivi olur. Klientə sahə adı ilə strukturlu cavab vermək üçün exceptionFactory yazıla bilər. Digər tərəfdən, filter-də birbaşa Express-in res.status().json() çağırmaq tətbiqi Express-ə bağlayır; Fastify-a keçmək istəsən HttpAdapterHost vasitəsilə HTTP adapterinin reply() metodundan istifadə etmək daha portativdir. Standart davranışı qismən dəyişmək istəyirsənsə BaseExceptionFilter-dən törə və super.catch() çağır." },
          { t: "code", lang: "typescript", code: `// main.ts — validasiya xətaları sahə üzrə
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (xetalar: ValidationError[]) =>
    new BadRequestException({
      mesaj: 'Doğrulama xətası',
      sahələr: xetalar.map((x) => ({ sahe: x.property, qaydalar: Object.values(x.constraints ?? {}) })),
    }),
}));

// Platformadan müstəqil filter (Express və Fastify ilə işləyir)
@Catch()
export class PortativFilter implements ExceptionFilter {
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(xeta: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.adapterHost;
    const ctx = host.switchToHttp();
    const status = xeta instanceof HttpException ? xeta.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    httpAdapter.reply(
      ctx.getResponse(),
      { statusCode: status, yol: httpAdapter.getRequestUrl(ctx.getRequest()) },
      status,
    );
  }
}

// BaseExceptionFilter: yalnız loqu əlavə et, qalanını Nest-ə burax
@Catch()
export class LoqlayanFilter extends BaseExceptionFilter {
  catch(xeta: unknown, host: ArgumentsHost) {
    if (!(xeta instanceof HttpException)) logger.error(xeta);
    super.catch(xeta, host);
  }
}

// Marşrut/controller səviyyəsində filter
@UseFilters(BazaXetaFilter)
@Controller('kurslar')
export class KurslarController { /* ... */ }` },
          { t: "terms", items: [
            ["exceptionFactory", "ValidationPipe-in xəta siyahısını öz istisnana çevirən funksiyası."],
            ["HttpAdapterHost", "altdakı HTTP platformasına (Express/Fastify) çıxış verir; filter-i platformadan müstəqil edir."],
            ["BaseExceptionFilter", "Nest-in default filter-i; üzərinə əlavə məntiq qoyub super.catch() çağırmaq üçün."],
            ["@UseFilters", "filter-i controller və ya marşrut səviyyəsində bağlayır."],
          ]},
          { t: "mistake", lang: "typescript", wrong: `if (!istifadeci) {
  return new NotFoundException();      // return — atılmır, 200 ilə obyekt qayıdır
}`, right: `if (!istifadeci) {
  throw new NotFoundException('İstifadəçi tapılmadı');
}`, why: "İstisnanı return etmək onu atmır: Nest onu adi cavab kimi JSON-a çevirir və status 200 qalır. İstisna həmişə throw ilə atılmalıdır." },
          { t: "mistake", lang: "typescript", wrong: `throw new Error('Sifariş tapılmadı');   // adi Error`, right: `throw new NotFoundException('Sifariş tapılmadı');`, why: "Adi Error Nest üçün gözlənilməz xətadır və 500 olur. Müştəri xətasını (404/400/409) uyğun HttpException ilə bildir ki, doğru status getsin." },
          { t: "warn", text: "Qlobal filter-i app.useGlobalFilters() ilə qeydiyyatdan keçirsən, ona DI inyeksiya etmək olmur (HttpAdapterHost kimi). DI lazımdırsa APP_FILTER provider-i işlət." },
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
          { t: "h", text: "Mikroservis/WS filter-ləri, qlobal xəta tutma və sıfır itki" },
          { t: "p", text: "HTTP filter-i RPC və WebSocket kontekstində işləmir. RpcException və WsException bu kontekstlər üçün nəzərdə tutulub, onları isə uyğun filter-lə (BaseRpcExceptionFilter, BaseWsExceptionFilter) emal edirsən. Prosesin özü səviyyəsində isə Nest-dən kənar qalan xətalar (unhandledRejection, uncaughtException) üçün ayrıca bağlama və monitorinq lazımdır." },
          { t: "code", lang: "typescript", code: `// RPC kontekstində xəta: Observable qaytarılır
@Catch()
export class RpcXetaFilter implements RpcExceptionFilter<RpcException> {
  catch(xeta: RpcException | Error): Observable<never> {
    const mesaj = xeta instanceof RpcException ? xeta.getError() : 'Daxili xəta';
    return throwError(() => mesaj);
  }
}

// WebSocket gateway
@UseFilters(new BaseWsExceptionFilter())
@WebSocketGateway()
export class SohbetGateway {
  @SubscribeMessage('mesaj')
  al(@MessageBody() m: string) {
    if (!m) throw new WsException('Boş mesaj');
  }
}

// main.ts: proses səviyyəsində son müdafiə
process.on('unhandledRejection', (sebeb) => {
  logger.error('unhandledRejection', sebeb as Error);
  // Node 15+ default olaraq prosesi dayandırır; orkestrator yenidən başladır
});
process.on('uncaughtException', (xeta) => {
  logger.error('uncaughtException', xeta.stack);
  process.exit(1);                                    // vəziyyət etibarsızdır: təmiz bağlan və çıx
});

app.enableShutdownHooks();                            // SIGTERM-də OnModuleDestroy/OnApplicationShutdown işləsin

// Sentry kimi alətə yalnız gözlənilməz (5xx) xətalar göndər
if (!(xeta instanceof HttpException) || xeta.getStatus() >= 500) {
  Sentry.captureException(xeta);
}` },
          { t: "list", items: [
            "Xəta büdcəsi: 4xx klientin, 5xx serverin xətasıdır. Alert-ləri 5xx nisbətinə (SLO) bağla, tək-tək 404-lərə yox.",
            "Xəta zənciri: new Error('mesaj', { cause: orijinal }) ilə kök səbəbi saxla — loqda tam zəncir görünür, müştəriyə isə yalnız ümumi mesaj gedir.",
            "Retry edilə bilən və edilə bilməyən xətaları ayır: doğrulama xətası təkrar etməyin mənası yoxdur, şəbəkə xətası var.",
            "Filter-də yenidən xəta atmaq olmaz: bu, cavab göndərilmədən sorğunu asılı qoya bilər. Filter içindəki kod sadə və xətasız olmalıdır.",
            "Xəta mesajları üçün i18n: mesajı deyil, kodu qaytar; tərcümə klientdə və ya Accept-Language ilə aparılsın.",
          ]},
          { t: "qa", items: [
            ["HTTP filter niyə mikroservisdə işləmir?", "Hər transportun öz kontekst və cavab mexanizmi var; RPC/WS üçün RpcException/WsException və uyğun filter lazımdır, host.getType() ilə fərqləndirilir."],
            ["uncaughtException-dan sonra proses davam etməlidirmi?", "Xeyr: vəziyyət naməlumdur. Xətanı loqla, resursları təmiz bağla və çıx; orkestrator (Kubernetes/PM2) yenidən başladar."],
            ["new Error(msg, { cause }) nə üçündür?", "Xətanı zəncirləyir: üst səviyyə mesajı saxlayır, kök səbəb loqda qalır."],
            ["Hansı xətaları Sentry-yə göndərmək lazımdır?", "Gözlənilməz xətaları (5xx); 400/404/409 gözlənilən xətalardır və metrika kifayətdir."],
            ["Filter və interceptor xəta işləməsində hansı daha yüksək səviyyədədir?", "Interceptor catchError ilə əvvəl tutur; çevrilməyən xəta filter-ə çatır. Filter son müdafiə xəttidir."],
          ]},
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
          { t: "h", text: "Səhifələmə, yumşaq silmə, QueryRunner və Prisma interaktiv tranzaksiyası" },
          { t: "p", text: "Siyahı endpoint-lərində həmişə məhdudiyyət qoy: findAndCount həm cari səhifəni, həm ümumi sayı verir. Yumşaq silmə (soft delete) @DeleteDateColumn ilə qeydi bazadan silmədən gizlədir: find avtomatik silinmişləri çıxarır, restore() isə geri qaytarır. Tranzaksiyanı əl ilə idarə etmək lazımdırsa QueryRunner istifadə et — connect, startTransaction, commit/rollback və mütləq release (finally-də)." },
          { t: "code", lang: "typescript", code: `// Səhifələmə + ümumi say
async siyahi(sehife = 1, olcu = 20) {
  const take = Math.min(olcu, 50);
  const [setirler, say] = await this.repo.findAndCount({
    order: { yaradilma: 'DESC' },
    skip: (sehife - 1) * take,
    take,
  });
  return { setirler, say, sehifeSayi: Math.ceil(say / take) };
}

// Yumşaq silmə
@Entity()
export class Kurs {
  @PrimaryGeneratedColumn() id: number;
  @DeleteDateColumn() silinib: Date | null;
}
await this.repo.softRemove(kurs);                       // silinib = indi
await this.repo.restore(id);                            // geri qaytar
await this.repo.find({ withDeleted: true });            // silinmişlər də

// QueryRunner: əl ilə idarə olunan tranzaksiya
const qr = this.dataSource.createQueryRunner();
await qr.connect();
await qr.startTransaction();
try {
  await qr.manager.save(sifaris);
  await qr.manager.decrement(Mehsul, { id: mehsulId }, 'stok', say);
  await qr.commitTransaction();
} catch (x) {
  await qr.rollbackTransaction();
  throw x;
} finally {
  await qr.release();                                    // bağlantını hovuza qaytar, yoxsa sızır
}

// Prisma: interaktiv tranzaksiya və select
const nəticə = await this.prisma.$transaction(async (tx) => {
  const hesab = await tx.hesab.findUniqueOrThrow({ where: { id: kimden } });
  if (hesab.balans < mebleg) throw new ConflictException('Balans kifayət deyil');
  await tx.hesab.update({ where: { id: kimden }, data: { balans: { decrement: mebleg } } });
  return tx.hesab.update({ where: { id: kime }, data: { balans: { increment: mebleg } } });
});

this.prisma.istifadeci.findMany({ select: { id: true, ad: true }, where: { aktiv: true } });   // yalnız lazım olan sütunlar` },
          { t: "terms", items: [
            ["findAndCount", "həm səhifənin sətirlərini, həm ümumi sayı qaytarır."],
            ["soft delete", "qeydi silmir, deletedAt ilə işarələyir; sorğular avtomatik süzür."],
            ["QueryRunner", "bir bağlantını və tranzaksiyanı əl ilə idarə etmək üçün obyekt."],
            ["$transaction (Prisma)", "bir neçə əməliyyatı ya massivlə, ya da interaktiv funksiya ilə atomar icra edir."],
            ["eager / lazy", "əlaqənin avtomatik yüklənməsi / lazım olanda yüklənməsi; eager ehtiyatsız istifadədə yük artırır."],
          ]},
          { t: "mistake", lang: "typescript", wrong: `await this.dataSource.transaction(async (em) => {
  await em.save(sifaris);
  await this.mehsulRepo.decrement({ id }, 'stok', 1);    // tranzaksiyadan KƏNARDA
});`, right: `await this.dataSource.transaction(async (em) => {
  await em.save(sifaris);
  await em.decrement(Mehsul, { id }, 'stok', 1);         // eyni em
});`, why: "Servisə inyeksiya olunmuş repo ayrı bağlantı götürür və tranzaksiyaya qoşulmur: xəta olsa belə həmin dəyişiklik geri qayıtmır. Tranzaksiya daxilində yalnız em/tx istifadə et." },
          { t: "mistake", lang: "typescript", wrong: `const qr = ds.createQueryRunner();
await qr.connect();
await qr.startTransaction();
await qr.manager.save(x);
await qr.commitTransaction();     // release yoxdur, xəta halında rollback yoxdur`, right: `try { /* ... */ await qr.commitTransaction(); }
catch (e) { await qr.rollbackTransaction(); throw e; }
finally { await qr.release(); }`, why: "release olunmayan QueryRunner bağlantını hovuzda tutur; bir neçə belə sorğudan sonra hovuz tükənir və bütün tətbiq asılır." },
          { t: "tip", text: "findAndCount hər çağırışda COUNT sorğusu da icra edir. Çox böyük cədvəldə dəqiq say lazım deyilsə, «növbəti səhifə var?» üçün take + 1 götür." },
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
          { t: "h", text: "Kursor səhifələmə, hovuz konfiqurasiyası və miqrasiya nümunəsi" },
          { t: "p", text: "Offset səhifələmə (OFFSET 100000) baza hər dəfə ilk 100000 sətri keçməli olduğu üçün dərinləşdikcə yavaşlayır; həm də səhifələmə zamanı yeni qeyd əlavə olunsa, sətirlər təkrar və ya buraxılmış görünür. Kursor səhifələmə son görülən açardan (id, yaradilma) davam edir və indeksdən istifadə edir — sabit müddətli və ardıcıldır. Miqrasiyalarda isə hər dəyişikliyin up və down hissəsi olmalıdır, böyük cədvəldə əməliyyatlar kilid müddətini nəzərə almalıdır." },
          { t: "code", lang: "typescript", caption: "Kursor səhifələmə, hovuz və miqrasiya", code: `// Kursor səhifələmə (id azalan sırada)
async siyahi(son?: number, olcu = 20) {
  const take = Math.min(olcu, 50);
  const setirler = await this.repo.find({
    where: son ? { id: LessThan(son) } : {},
    order: { id: 'DESC' },
    take: take + 1,                                     // +1: növbəti səhifə var?
  });
  const daha = setirler.length > take;
  const melumat = daha ? setirler.slice(0, take) : setirler;
  return { melumat, novbeti: daha ? melumat[melumat.length - 1].id : null };
}

// Hovuz və SSL: TypeORM (pg sürücüsü)
TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (k: ConfigService) => ({
    type: 'postgres',
    url: k.getOrThrow('DATABASE_URL'),
    ssl: k.get('NODE_ENV') === 'production' ? { rejectUnauthorized: true } : false,
    extra: { max: 10, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 5_000 },
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: false,                               // miqrasiyanı CI/deploy addımında ayrıca işlət
  }),
})

// Miqrasiya: expand mərhələsi (yeni sütun nullable)
export class IstifadeciTelefon1730000000000 implements MigrationInterface {
  async up(qr: QueryRunner) {
    await qr.query('ALTER TABLE istifadeciler ADD COLUMN telefon varchar(20) NULL');
  }
  async down(qr: QueryRunner) {
    await qr.query('ALTER TABLE istifadeciler DROP COLUMN telefon');
  }
}

// İndeksi kilidsiz yaratmaq (PostgreSQL): tranzaksiyadan kənarda
export class SifarisIndeks1730000001000 implements MigrationInterface {
  transaction = false;                                  // CONCURRENTLY tranzaksiya daxilində işləmir
  async up(qr: QueryRunner) {
    await qr.query('CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sifaris_istifadeci ON sifarisler (istifadeci_id)');
  }
  async down(qr: QueryRunner) {
    await qr.query('DROP INDEX CONCURRENTLY IF EXISTS idx_sifaris_istifadeci');
  }
}` },
          { t: "list", items: [
            "Prisma-da hovuz parametrləri bağlantı sətrində verilir (connection_limit, pool_timeout); serverless mühitdə hər funksiya yeni bağlantı açdığı üçün pooler (PgBouncer, Accelerate) demək olar məcburidir.",
            "N+1-i aşkar etmək üçün sorğu loqunu aç (TypeORM logging: ['query'], Prisma log: ['query']) və bir sorğuda neçə SQL getdiyinə bax. Testdə sorğu sayını assert etmək olar.",
            "Dərin əlaqə zəncirləri (A → B → C → D) kartezian partlayışa səbəb ola bilər: relations ilə hər şeyi bir JOIN-də yükləmək əvəzinə ayrı toplu sorğuya böl.",
            "Böyük hesabat sorğuları OLTP bazasını bloklamasın: oxu replikası və ya ayrıca analitik anbar, vaxt aşımı (statement_timeout) və limit.",
            "Tranzaksiya izolyasiya səviyyələri: READ COMMITTED (default) kifayət etməyəndə REPEATABLE READ/SERIALIZABLE; serialization xətası (40001) halında təkrar cəhd lazımdır.",
            "Deadlock-dan qaçmaq üçün kilidləri həmişə eyni sırada götür (məs. id artan sırası ilə); uzun tranzaksiyalardan, tranzaksiya içində xarici HTTP çağırışından qaç.",
          ]},
          { t: "warn", text: "Tranzaksiya içində xarici HTTP/e-poçt çağırışı etmə: tranzaksiya və bağlantı çağırış bitənə qədər açıq qalır, kilidlər uzanır. Əvvəl bazaya yaz, hadisəni outbox ilə sonra göndər." },
          { t: "qa", items: [
            ["Offset və kursor səhifələmə fərqi?", "Offset dərinləşdikcə yavaşlayır və dəyişən məlumatda təkrar/buraxılma verir; kursor indeksdən istifadə edir, sabit sürətlidir və ardıcıldır."],
            ["Bağlantı hovuzu niyə tükənə bilər?", "Release olunmayan QueryRunner, uzun tranzaksiyalar və pod sayı × hovuz ölçüsünün baza limitini keçməsi səbəb olur."],
            ["Expand/contract miqrasiyası nədir?", "Əvvəl yeni sütunu/cədvəli əlavə edirsən (köhnə kod işləməyə davam edir), kodu yeniləyirsən, sonda köhnəni silirsən — sıfır dayanma ilə."],
            ["CREATE INDEX CONCURRENTLY niyə fərqli işləyir?", "Cədvəli yazma əməliyyatlarına bloklamır, amma tranzaksiya daxilində çağırıla bilmir; miqrasiyada transaction = false lazımdır."],
            ["Optimistik və pessimist kilid fərqi?", "Optimistik versiya sütunu ilə konfliktdə xəta verir (az konflikt üçün); pessimist sətri əvvəlcədən kilidləyir (çox konflikt üçün) və başqalarını gözlədir."],
            ["Hansı halda repozitoriya əvəzinə QueryBuilder/xam SQL?", "Mürəkkəb JOIN, aqreqat və atomar UPDATE lazım olanda; parametrləşdirilmiş şəkildə və nəticə tipi ilə."],
          ]},
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
