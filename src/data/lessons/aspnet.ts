import type { Lesson } from "../types";

export const aspnet: Lesson[] = [
  {
    slug: "giris",
    title: "ASP.NET Core nədir?",
    intro: "ASP.NET Core — C# ilə veb API və saytlar yazmaq üçün Microsoft-un açıq mənbəli, sürətli freymvorkudur. Windows, Linux və macOS-da işləyir.",
    sections: [
      {
        level: "baslangic",
        title: "İlk veb tətbiq",
        blocks: [
          { t: "analogy", text: "Veb server — restoranın ofisiantıdır. Müştəri (brauzer) sifariş verir (sorğu), ofisiant onu mətbəxə (sənin kodun) çatdırır və hazır yeməyi (cavab) geri gətirir. ASP.NET Core bu ofisiantı və mətbəxin qaydalarını hazır verir — sən yalnız yeməyi bişirirsən." },
          { t: "code", lang: "bash", code: `# Yeni layihə yarat və işə sal
dotnet new web -o IlkApi
cd IlkApi
dotnet run
# Now listening on: http://localhost:5000` },
          { t: "code", lang: "csharp", caption: "Program.cs — bütün tətbiq", code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Salam, dünya!");

app.MapGet("/salam/{ad}", (string ad) => $"Salam, {ad}!");

app.MapGet("/vaxt", () => new { Vaxt = DateTime.Now, Server = "IlkApi" });   // JSON qaytarır

app.Run();` },
          { t: "terms", items: [
            ["ASP.NET Core", ".NET üzərində veb freymvork: API, MVC, Razor Pages, SignalR, gRPC."],
            ["dotnet CLI", "layihə yaratmaq, qurmaq və işə salmaq üçün əmr sətri aləti."],
            ["Kestrel", "ASP.NET Core-un daxili, sürətli veb serveri."],
            ["endpoint", "sorğuya cavab verən ünvan + metod: GET /salam/{ad}."],
            ["MapGet", "GET sorğusunu funksiyaya bağlayır."],
          ]},
          { t: "tip", text: "Kodu dəyişəndə hər dəfə yenidən işə salmamaq üçün `dotnet watch` işlət — fayl saxlanan kimi tətbiq özü yenilənir." },
        ],
      },
      {
        level: "orta",
        title: "Sorğu, cavab və JSON API",
        blocks: [
          { t: "code", lang: "csharp", code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var telebeler = new List<Telebe>
{
    new(1, "Aysel", 92),
    new(2, "Murad", 65),
};

// GET /telebeler — siyahı
app.MapGet("/telebeler", () => telebeler);

// GET /telebeler/1 — biri (yoxdursa 404)
app.MapGet("/telebeler/{id:int}", (int id) =>
    telebeler.FirstOrDefault(t => t.Id == id) is { } t
        ? Results.Ok(t)
        : Results.NotFound());

// POST /telebeler — yenisini əlavə et (gövdə JSON-dur)
app.MapPost("/telebeler", (TelebeYarat giris) =>
{
    var yeni = new Telebe(telebeler.Count + 1, giris.Ad, giris.Bal);
    telebeler.Add(yeni);
    return Results.Created($"/telebeler/{yeni.Id}", yeni);     // 201
});

// DELETE /telebeler/1
app.MapDelete("/telebeler/{id:int}", (int id) =>
    telebeler.RemoveAll(t => t.Id == id) > 0 ? Results.NoContent() : Results.NotFound());

app.Run();

public record Telebe(int Id, string Ad, int Bal);
public record TelebeYarat(string Ad, int Bal);` },
          { t: "list", items: [
            "HTTP metodları: GET — oxu, POST — yarat, PUT/PATCH — dəyiş, DELETE — sil.",
            "Status kodları: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.",
            "ASP.NET Core obyekti avtomatik JSON-a çevirir (System.Text.Json), JSON gövdəni isə obyektə.",
            "İki üslub var: Minimal API (yuxarıdakı kimi, qısa) və Controller (siniflərlə, böyük layihələr üçün).",
          ]},
          { t: "mistake", lang: "csharp", wrong: `app.MapGet("/telebeler/{id}", (int id) =>
{
    var t = telebeler.First(x => x.Id == id);   // yoxdursa istisna → 500
    return t;
});`, right: `app.MapGet("/telebeler/{id:int}", (int id) =>
    telebeler.FirstOrDefault(x => x.Id == id) is { } t
        ? Results.Ok(t)
        : Results.NotFound());`, why: "Tapılmayan resurs server xətası (500) deyil — müştərinin səhv ünvanıdır (404). Düzgün status kodu API-nin dilidir." },
          { t: "mistake", lang: "csharp", wrong: `app.MapGet("/telebe-sil/{id}", (int id) => { /* silir */ });`, right: `app.MapDelete("/telebeler/{id:int}", (int id) => { /* silir */ });`, why: "GET heç nəyi dəyişməməlidir: brauzer, axtarış botu və ya keş onu özü çağıra bilər. Dəyişiklik üçün POST/PUT/DELETE işlət; ünvanda feil yox, isim olsun." },
        ],
      },
      {
        level: "senior",
        title: "Arxitektura, hosting və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "ASP.NET Core modulludur: host (konfiqurasiya, DI, logging) → Kestrel → middleware zənciri → routing → endpoint. Hər sorğu bu zəncirdən keçir.",
            "Kestrel asinxron, hadisə əsaslı serverdir və HTTP/1.1, HTTP/2, HTTP/3 dəstəkləyir. Production-da adətən qarşısında əks proksi (Nginx, YARP, bulud yük paylayıcısı) durur: TLS, sıxılma, sürət limiti.",
            "Proksi arxasında ForwardedHeaders middleware-i qoş, əks halda tətbiq müştərinin real IP-sini və HTTPS olduğunu bilmir. Yalnız etibarlı proksi ünvanlarını (KnownProxies) qəbul et — əks halda X-Forwarded-For başlığı ilə IP saxtalaşdırılır.",
            "Versiyalar: cüt nömrələr LTS-dir (3 il dəstək) — .NET 8, .NET 10; tək nömrələr STS. Production üçün LTS seç və təhlükəsizlik yamalarını vaxtında qur.",
            "Native AOT: tətbiq əvvəlcədən maşın koduna çevrilir — ani başlanğıc, az yaddaş (konteyner və serverless üçün). Reflection məhdudlaşır, Minimal API buna uyğundur.",
            "Minimal API ilə Controller eyni mühərrik üzərindədir (endpoint routing). Seçim üslub məsələsidir; kiçik xidmət → Minimal, böyük və çox konvensiyalı → Controller.",
            "Sağlamlıq yoxlaması (health checks): builder.Services.AddHealthChecks(); app.MapHealthChecks(\"/healthz\") — orkestrator (Kubernetes) tətbiqin diri olduğunu bununla bilir.",
            "Təhlükəsizlik — HTTPS: app.UseHttpsRedirection() və app.UseHsts() (production). Açıq HTTP-də token və parollar şəbəkədə oxunur.",
            "Təhlükəsizlik — xəta səhifəsi: Developer Exception Page stack trace, mənbə kodu və mühit dəyişənlərini göstərir. Yalnız Development mühitində olsun; production-da ümumi xəta cavabı (UseExceptionHandler).",
            "Təhlükəsizlik — sorğu limitləri: Kestrel default gövdə limiti ~30 MB-dır. API üçün azalt (MaxRequestBodySize), başlıq və bağlantı limitlərini, sürət limitini (AddRateLimiter) qur — əks halda böyük və ya çoxlu sorğu ilə server tükəndirilir (DoS).",
            "Təhlükəsizlik — giriş etibarsızdır: route, query, başlıq və gövdədən gələn hər şey hücumçunun nəzarətindədir. Tipi, uzunluğu, aralığı yoxla; id-ni tapanda həm də sahibliyi yoxla.",
            "Təhlükəsizlik — server başlığı: Kestrel «Server: Kestrel» başlığını göndərir — texnologiyanı açıqlayır. AddServerHeader = false; təhlükəsizlik başlıqlarını (nosniff, CSP, X-Frame-Options) əlavə et.",
            "Təhlükəsizlik — asılılıqlar: `dotnet list package --vulnerable` ilə zəif paketləri yoxla, CI-da avtomatlaşdır.",
          ]},
          { t: "code", lang: "csharp", caption: "Production üçün əsas qoruma", code: `var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(o =>
{
    o.AddServerHeader = false;                          // texnologiyanı gizlət
    o.Limits.MaxRequestBodySize = 1 * 1024 * 1024;      // 1 MB
    o.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(10);
});

builder.Services.AddProblemDetails();
builder.Services.AddHealthChecks();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();                    // yalnız lokalda
}
else
{
    app.UseExceptionHandler();                          // ümumi xəta, detal yox
    app.UseHsts();
}

app.UseHttpsRedirection();

app.Use(async (ctx, next) =>
{
    ctx.Response.Headers.XContentTypeOptions = "nosniff";
    ctx.Response.Headers.XFrameOptions = "DENY";
    await next();
});

app.MapHealthChecks("/healthz");
app.MapGet("/", () => "İşləyir");

app.Run();` },
          { t: "qa", items: [
            ["ASP.NET Core ilə köhnə ASP.NET fərqi?", "Core çarpaz platformalı, açıq mənbəli, modulludur, daxili DI və Kestrel ilə gəlir, xeyli sürətlidir. Köhnə ASP.NET yalnız Windows/IIS-dədir."],
            ["Kestrel nədir?", "ASP.NET Core-un daxili çarpaz platformalı veb serveri. Tək də işləyir, adətən əks proksi arxasında qoyulur."],
            ["Minimal API ilə Controller fərqi?", "Minimal API endpoint-i birbaşa lambda ilə təyin edir — az kod. Controller sinif əsaslıdır, filtrlər və konvensiyalar zəngindir."],
            ["Sorğu tətbiqdə hansı yolu keçir?", "Kestrel → middleware zənciri (xəta, HTTPS, routing, auth) → endpoint → cavab eyni zəncirlə geri."],
            ["Niyə production-da Developer Exception Page olmaz?", "Stack trace, kod parçaları və konfiqurasiya sızdırır — hücumçuya xəritə verir."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "ASP.NET Core-un daxili veb serveri?", options: ["IIS", "Kestrel", "Apache"], answer: 1, why: "Kestrel çarpaz platformalı daxili serverdir." },
          { t: "quiz", q: "Yeni resurs yaradılanda hansı status?", options: ["200", "201", "404"], answer: 1, why: "201 Created." },
          { t: "quiz", q: "Məlumatı silmək üçün hansı metod?", options: ["GET", "DELETE", "HEAD"], answer: 1, why: "GET heç nəyi dəyişməməlidir." },
        ],
      },
    ],
    exercise: {
      task: "Kitab API-si yaz (Minimal API, yaddaşda siyahı). 1) GET /kitablar — hamısı. 2) GET /kitablar/{id} — biri, yoxdursa 404. 3) POST /kitablar — JSON gövdədən (Ad, Muellif, Il) kitab əlavə edir, 201 və Location qaytarır; ad boşdursa 400. 4) DELETE /kitablar/{id} — silir (204), yoxdursa 404. 5) GET /kitablar/axtar?muellif=... — müəllifə görə filtr.",
      starter: `var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\nvar kitablar = new List<Kitab>\n{\n    new(1, "Əli və Nino", "Qurban Səid", 1937),\n};\n\n// endpoint-lər\n\napp.Run();\n\npublic record Kitab(int Id, string Ad, string Muellif, int Il);\npublic record KitabYarat(string Ad, string Muellif, int Il);\n`,
      expect: "MapGet /kitablar siyahını qaytarır; MapGet /kitablar/{id:int} FirstOrDefault + Results.NotFound()/Results.Ok; MapPost string.IsNullOrWhiteSpace(Ad) olanda Results.BadRequest, əks halda Results.Created($\"/kitablar/{id}\", kitab); MapDelete Results.NoContent()/NotFound; axtarışda query parametri (string? muellif) ilə Where filtri; silmə GET ilə edilmir; First() ilə 500 riski yoxdur.",
    },
  },
  {
    slug: "layihe",
    title: "Layihə strukturu və Program.cs",
    intro: "ASP.NET Core layihəsi bir neçə fayldan ibarətdir: Program.cs tətbiqi qurur, .csproj asılılıqları saxlayır, appsettings.json isə tənzimləmələri. Onları tanımaq hər şeyin harada olduğunu bilmək deməkdir.",
    sections: [
      {
        level: "baslangic",
        title: "Fayllar və qovluqlar",
        blocks: [
          { t: "analogy", text: "Layihə — evin planıdır. Program.cs — giriş qapısı və elektrik qutusudur: bütün xətlər oradan başlayır. appsettings.json — sayğaclar və tənzimləyicilərdir. .csproj isə tikinti materiallarının siyahısıdır." },
          { t: "code", lang: "text", code: `MagazaApi/
├── MagazaApi.csproj          # layihə faylı: .NET versiyası, NuGet paketləri
├── Program.cs                # giriş nöqtəsi: xidmətlər + middleware + endpoint-lər
├── appsettings.json          # tənzimləmələr (bütün mühitlər)
├── appsettings.Development.json   # yalnız lokal mühit
├── Properties/
│   └── launchSettings.json   # lokal işə salma: port, mühit adı
├── Controllers/              # controller sinifləri (və ya Endpoints/)
├── Models/                   # məlumat sinifləri
├── Services/                 # biznes məntiqi
├── Data/                     # DbContext, miqrasiyalar
├── wwwroot/                  # statik fayllar (css, js, şəkil)
├── bin/  obj/                # qurulmuş fayllar — git-ə düşmür` },
          { t: "code", lang: "csharp", caption: "Program.cs — iki hissə", code: `var builder = WebApplication.CreateBuilder(args);

// 1-ci hissə: XİDMƏTLƏR (nə lazımdır?)
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddScoped<IMehsulXidmeti, MehsulXidmeti>();

var app = builder.Build();

// 2-ci hissə: PIPELINE (sorğu hansı yolla gedir?)
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();` },
          { t: "terms", items: [
            ["Program.cs", "tətbiqin giriş nöqtəsi; xidmətləri qeydiyyata alır və sorğu zəncirini qurur."],
            [".csproj", "layihə faylı (XML): hədəf freymvork, paketlər, tənzimləmələr."],
            ["NuGet", ".NET-in paket meneceri (npm kimi)."],
            ["builder.Services", "xidmətlərin (DI) qeydiyyat siyahısı."],
            ["app.Use... / app.Map...", "middleware əlavə edir / endpoint bağlayır."],
          ]},
          { t: "tip", text: "Qayda: builder.Build()-dən ƏVVƏL xidmətlər əlavə olunur, SONRA middleware və endpoint-lər. Sıranı qarışdırsan kompilyasiya və ya icra xətası alarsan." },
        ],
      },
      {
        level: "orta",
        title: ".csproj, paketlər və Program.cs-i səliqəli saxlamaq",
        blocks: [
          { t: "code", lang: "text", caption: "MagazaApi.csproj", code: `<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="10.0.0" />
  </ItemGroup>

</Project>` },
          { t: "code", lang: "bash", code: `dotnet new webapi -o MagazaApi --use-controllers   # controller şablonu
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet restore        # paketləri yüklə
dotnet build          # qur
dotnet run            # işə sal
dotnet watch          # dəyişiklikdə avtomatik yenilə
dotnet test           # testlər
dotnet publish -c Release -o ./cixis    # yayım üçün` },
          { t: "code", lang: "csharp", caption: "Böyüyən Program.cs-i genişlənmə metodlarına böl", code: `// Extensions/XidmetQeydiyyati.cs
public static class XidmetQeydiyyati
{
    public static IServiceCollection AddMagazaXidmetleri(
        this IServiceCollection services, IConfiguration konfiq)
    {
        services.AddDbContext<MagazaDb>(o =>
            o.UseSqlServer(konfiq.GetConnectionString("Esas")));
        services.AddScoped<IMehsulXidmeti, MehsulXidmeti>();
        services.AddScoped<ISifarisXidmeti, SifarisXidmeti>();
        return services;
    }
}

// Program.cs — qısa və oxunaqlı qalır
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddMagazaXidmetleri(builder.Configuration);

var app = builder.Build();
app.MapControllers();
app.Run();` },
          { t: "mistake", lang: "csharp", wrong: `var app = builder.Build();

builder.Services.AddScoped<IMehsulXidmeti, MehsulXidmeti>();   // gecdir`, right: `builder.Services.AddScoped<IMehsulXidmeti, MehsulXidmeti>();

var app = builder.Build();`, why: "Build() xidmət konteynerini «möhürləyir». Ondan sonra qeydiyyat InvalidOperationException atır." },
          { t: "mistake", lang: "text", wrong: `# git-ə düşüb:
bin/
obj/
appsettings.Production.json   (içində parol)`, right: `# .gitignore
bin/
obj/
*.user
appsettings.*.local.json
.env`, why: "bin/obj qurulmuş fayllardır — repoya lazım deyil. Sirli fayl isə git tarixçəsində əbədi qalır. `dotnet new gitignore` hazır şablon verir." },
        ],
      },
      {
        level: "senior",
        title: "Host, başlanğıc və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "WebApplication.CreateBuilder nələri qurur: konfiqurasiya mənbələri (appsettings → mühit faylı → user secrets → mühit dəyişənləri → əmr sətri), logging, DI konteyneri, Kestrel.",
            "Mühit adı ASPNETCORE_ENVIRONMENT dəyişənindən gəlir (Development / Staging / Production). Təyin olunmayıbsa Production sayılır — təhlükəsiz default.",
            "Böyük həll (solution) quruluşu: Api (giriş), Application (istifadə halları), Domain (varlıqlar, qaydalar), Infrastructure (baza, xarici xidmətlər), Tests. Asılılıqlar içəriyə doğru yönəlir.",
            "Mərkəzi paket idarəsi: Directory.Packages.props bütün layihələrin paket versiyalarını bir yerdə saxlayır; Directory.Build.props ortaq tənzimləmələri (Nullable, analizatorlar).",
            "Nullable və TreatWarningsAsErrors-u ilk gündən aç — sonradan açmaq yüzlərlə xəbərdarlıq deməkdir. Analizatorlar (AnalysisLevel=latest-recommended) çox xətanı kompilyasiyada tutur.",
            "Başlanğıcda uğursuz ol (fail fast): məcburi konfiqurasiya yoxdursa tətbiq qalxmasın — ValidateOnStart(). Yarımçıq konfiqurasiya ilə işləyən tətbiq gec və qəribə xətalar verir.",
            "Fon işləri: IHostedService / BackgroundService. Düzgün dayanma (graceful shutdown): SIGTERM gələndə host cari sorğuların bitməsini gözləyir — CancellationToken-ə hörmət et.",
            "Konteyner: çoxmərhələli Dockerfile (sdk ilə qur, aspnet və ya chiseled image ilə işlət), kök (root) olmayan istifadəçi (.NET 8+ image-lərində `app` istifadəçisi), port 8080.",
            "Təhlükəsizlik — sirlər repoda olmasın: bağlantı sətri, API açarı, JWT açarı appsettings.json-a yazılmır. Lokalda `dotnet user-secrets`, production-da mühit dəyişənləri və ya sirr anbarı (Azure Key Vault, AWS Secrets Manager).",
            "Təhlükəsizlik — launchSettings.json yalnız lokal üçündür və yayıma daxil olmur. Production-u oradakı dəyərlərə güvənərək qurma.",
            "Təhlükəsizlik — təchizat zənciri (supply chain): paket versiyalarını sabitlə, packages.lock.json işlət (RestorePackagesWithLockFile), NuGet mənbələrini məhdudlaşdır (packageSourceMapping) — «dependency confusion» hücumunun qarşısını alır.",
            "Təhlükəsizlik — yayım paketi: publish qovluğuna .pdb, test faylları, appsettings.Development.json, .git düşməsin. Debug rejimində (Debug konfiqurasiyası) yayım etmə.",
            "Təhlükəsizlik — statik fayllar: UseStaticFiles yalnız wwwroot-u açır. Kök qovluğu və ya yükləmə qovluğunu statik kimi açma — konfiqurasiya və istifadəçi faylları oxunar, yüklənmiş HTML/JS isə sənin domenində icra olunar.",
          ]},
          { t: "code", lang: "text", caption: "Təhlükəsiz çoxmərhələli Dockerfile", code: `# 1) Qurma mərhələsi
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS qur
WORKDIR /src
COPY MagazaApi.csproj packages.lock.json ./
RUN dotnet restore --locked-mode          # kilid faylından kənara çıxma
COPY . .
RUN dotnet publish -c Release -o /cixis --no-restore

# 2) İcra mərhələsi: yalnız runtime, SDK və mənbə kodu yoxdur
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=qur /cixis .
USER $APP_UID                             # root deyil
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080
ENTRYPOINT ["dotnet", "MagazaApi.dll"]` },
          { t: "qa", items: [
            ["Program.cs-də iki əsas mərhələ hansıdır?", "Xidmətlərin qeydiyyatı (builder.Services) və Build()-dən sonra sorğu zəncirinin (middleware, endpoint) qurulması."],
            [".csproj-da nə saxlanır?", "SDK, hədəf freymvork, dil tənzimləmələri, paket və layihə istinadları."],
            ["Mühit necə təyin olunur?", "ASPNETCORE_ENVIRONMENT dəyişəni ilə; default Production-dur."],
            ["Konfiqurasiya mənbələrinin üstünlük sırası?", "appsettings.json < appsettings.{Mühit}.json < user secrets (Development) < mühit dəyişənləri < əmr sətri. Sonrakı əvvəlkini əvəz edir."],
            ["Sirləri harada saxlayırsan?", "Lokalda user-secrets, production-da mühit dəyişəni və ya sirr anbarı. Heç vaxt repoda."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Xidmətlər nə vaxt qeydiyyata alınır?", options: ["Build()-dən əvvəl", "Build()-dən sonra", "app.Run()-dan sonra"], answer: 0, why: "Build() konteyneri möhürləyir." },
          { t: "quiz", q: "NuGet paketlərinin siyahısı haradadır?", options: ["Program.cs", ".csproj", "launchSettings.json"], answer: 1, why: "PackageReference-lər layihə faylındadır." },
          { t: "quiz", q: "Hansı qovluq git-ə düşməməlidir?", options: ["Controllers", "bin və obj", "Models"], answer: 1, why: "Onlar qurulmuş fayllardır." },
        ],
      },
    ],
    exercise: {
      task: "«KitabxanaApi» üçün Program.cs yaz. 1) Controller-ləri və OpenAPI-ni qeydiyyata al. 2) `IKitabXidmeti` → `KitabXidmeti` (Scoped) qeydiyyatını ayrıca genişlənmə metoduna (`AddKitabxanaXidmetleri`) çıxar və Program.cs-də çağır. 3) Development mühitində OpenAPI ünvanını aç (MapOpenApi), digər mühitlərdə UseExceptionHandler və UseHsts işlət. 4) HTTPS yönləndirməsi, authorization və controller-lərin xəritələnməsi düzgün sırada olsun. 5) Şərhdə yaz: bağlantı sətrini niyə appsettings.json-a yazmırsan və harada saxlayırsan.",
      starter: `var builder = WebApplication.CreateBuilder(args);\n\n// xidmətlər\n\nvar app = builder.Build();\n\n// pipeline\n\napp.Run();\n\npublic interface IKitabXidmeti { }\npublic class KitabXidmeti : IKitabXidmeti { }\n`,
      expect: "AddControllers və AddOpenApi Build()-dən əvvəl; static class-da this IServiceCollection genişlənmə metodu AddScoped<IKitabXidmeti, KitabXidmeti>() edir və services qaytarır; if (app.Environment.IsDevelopment()) MapOpenApi, else UseExceptionHandler + UseHsts; sıra: UseHttpsRedirection → UseAuthorization → MapControllers → Run; şərhdə: sirr git tarixçəsində qalır, user-secrets / mühit dəyişəni / sirr anbarı.",
    },
  },
  {
    slug: "middleware",
    title: "Middleware pipeline",
    intro: "Middleware — hər sorğunun keçdiyi ardıcıl addımlardır: loglama, xəta tutma, autentifikasiya, routing. Hər addım sorğunu yoxlaya, dəyişə, dayandıra və ya növbətiyə ötürə bilər.",
    sections: [
      {
        level: "baslangic",
        title: "Sorğunun yolu",
        blocks: [
          { t: "analogy", text: "Hava limanını düşün: bilet yoxlaması → təhlükəsizlik → pasport nəzarəti → qapı. Hər məntəqə səni ya növbətiyə buraxır, ya da geri qaytarır. Qayıdanda da eyni məntəqələrdən əks sıra ilə keçirsən. Middleware zənciri belə işləyir." },
          { t: "code", lang: "csharp", code: `var app = builder.Build();

// 1-ci middleware
app.Use(async (context, next) =>
{
    Console.WriteLine($"→ {context.Request.Method} {context.Request.Path}");
    await next();                                    // növbətiyə ötür
    Console.WriteLine($"← {context.Response.StatusCode}");
});

// 2-ci middleware
app.Use(async (context, next) =>
{
    context.Response.Headers["X-Akademiya"] = "kod";
    await next();
});

// Son nöqtə
app.MapGet("/", () => "Salam!");

app.Run();

// GET / sorğusunda konsol:
// → GET /
// ← 200` },
          { t: "terms", items: [
            ["middleware", "sorğu/cavab zəncirində bir addım."],
            ["pipeline", "middleware-lərin ardıcıl zənciri."],
            ["next()", "növbəti middleware-i çağırır."],
            ["HttpContext", "cari sorğu və cavab haqqında hər şey: Request, Response, User."],
            ["qısaqapanma (short-circuit)", "next() çağırmadan cavab verib zənciri dayandırmaq."],
          ]},
          { t: "tip", text: "next()-dən əvvəlki kod sorğu gələndə, sonrakı kod isə cavab qayıdanda işləyir. Bir middleware hər iki istiqamətdə iş görə bilər." },
        ],
      },
      {
        level: "orta",
        title: "Sıra, daxili middleware-lər və öz sinfin",
        blocks: [
          { t: "code", lang: "csharp", caption: "Tövsiyə olunan sıra", code: `var app = builder.Build();

app.UseExceptionHandler();        // 1. ən əvvəl: sonrakı hər şeyin xətasını tutur
app.UseHsts();
app.UseHttpsRedirection();        // 2. HTTP → HTTPS
app.UseStaticFiles();             // 3. wwwroot faylları (auth-dan əvvəl — açıqdır)
app.UseRouting();                 // 4. hansı endpoint? (adətən avtomatik əlavə olunur)
app.UseCors();                    // 5. CORS — routing-dən sonra, auth-dan əvvəl
app.UseRateLimiter();             // 6. sürət limiti
app.UseAuthentication();          // 7. sən kimsən?
app.UseAuthorization();           // 8. icazən varmı?
app.MapControllers();             // 9. endpoint-lər

app.Run();` },
          { t: "code", lang: "csharp", caption: "Öz middleware sinfin", code: `public class VaxtOlcenMiddleware(RequestDelegate next, ILogger<VaxtOlcenMiddleware> log)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var saat = Stopwatch.StartNew();
        try
        {
            await next(context);
        }
        finally
        {
            log.LogInformation("{Metod} {Yol} → {Status} ({Ms} ms)",
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode,
                saat.ElapsedMilliseconds);
        }
    }
}

// Qoşmaq
app.UseMiddleware<VaxtOlcenMiddleware>();

// Qısaqapanma: açar yoxdursa zəncir dayanır
app.Use(async (context, next) =>
{
    if (context.Request.Path.StartsWithSegments("/daxili") &&
        !context.Request.Headers.ContainsKey("X-Api-Key"))
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return;                                   // next() çağırılmır
    }
    await next();
});

// Budaqlanma: yalnız müəyyən yol üçün
app.Map("/admin", admin => admin.UseMiddleware<AdminAuditMiddleware>());
app.UseWhen(ctx => ctx.Request.Path.StartsWithSegments("/api"),
    api => api.UseMiddleware<VaxtOlcenMiddleware>());` },
          { t: "mistake", lang: "csharp", wrong: `app.UseAuthorization();
app.UseAuthentication();      // tərs sıra
app.MapControllers();`, right: `app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();`, why: "Authorization «icazən varmı?» soruşur, amma istifadəçinin kimliyi hələ təyin olunmayıb — hamı anonim görünür və [Authorize] hər kəsi rədd edir. Əvvəl kimlik, sonra icazə." },
          { t: "mistake", lang: "csharp", wrong: `app.Use(async (context, next) =>
{
    await next();
    context.Response.Headers["X-Vaxt"] = "12ms";   // cavab artıq göndərilib → istisna
});`, right: `app.Use(async (context, next) =>
{
    context.Response.OnStarting(() =>
    {
        context.Response.Headers["X-Vaxt"] = "12ms";
        return Task.CompletedTask;
    });
    await next();
});`, why: "Cavabın gövdəsi göndərilməyə başlayandan sonra başlıqları dəyişmək olmur. Başlığı next()-dən əvvəl və ya OnStarting ilə yaz." },
          { t: "mistake", lang: "csharp", wrong: `app.MapControllers();
app.UseExceptionHandler();     // sonda — heç nəyi tutmur`, right: `app.UseExceptionHandler();     // əvvəldə
app.MapControllers();`, why: "Middleware yalnız özündən SONRA gələnləri əhatə edir. Xəta tutucu zəncirin əvvəlində olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Daxili iş prinsipi, performans və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Pipeline başlanğıcda bir dəfə qurulur: hər Use əvvəlkini bükən RequestDelegate qaytarır (Func<RequestDelegate, RequestDelegate> zənciri). Sorğu zamanı yalnız hazır delegat çağırılır.",
            "Konvensiya əsaslı middleware sinfi singleton kimi yaradılır. Konstruktora scoped xidmət (DbContext) vermə — onu InvokeAsync-in parametri kimi al. IMiddleware interfeysi isə sorğu başına yaradılır.",
            "Endpoint routing: UseRouting endpoint-i seçir, UseAuthorization seçilmiş endpoint-in metadata-sına ([Authorize]) baxır, sonda endpoint icra olunur. Ona görə auth middleware-ləri routing ilə endpoint arasında olmalıdır.",
            "Middleware, filtr və ya endpoint filtri? Middleware bütün sorğulara (statik fayl daxil) tətbiq olunur və MVC kontekstini bilmir. Model, action nəticəsi lazımdırsa — filtr.",
            "Sorğu gövdəsini middleware-də oxumaq: EnableBuffering() və sonda Position = 0. Böyük gövdələri yaddaşa yığma — limit qoy.",
            "Hər middleware hər sorğuda işləyir — içində bahalı iş (baza sorğusu, sinxron I/O) görmə. Cavab sıxılması, keş (OutputCache), statik fayllar zəncirin əvvəlində olsun ki, artıq iş görülməsin.",
            "Daxili middleware-lər: ResponseCompression, OutputCache, RateLimiter, RequestTimeouts, HttpLogging, ForwardedHeaders, RequestLocalization, Session.",
            "Təhlükəsizlik — sıra boşluqdur: UseStaticFiles auth-dan əvvəldirsə, wwwroot-dakı hər fayl hamıya açıqdır. Qorunan faylları wwwroot-da saxlama — onları [Authorize] endpoint-i ilə ver.",
            "Təhlükəsizlik — CORS: AllowAnyOrigin + AllowCredentials birlikdə işləmir (və təhlükəlidir). SetIsOriginAllowed(_ => true) hər saytın istifadəçi adından sorğu göndərməsinə icazə verir. Yalnız konkret origin-lər: WithOrigins(\"https://sayt.az\").",
            "Təhlükəsizlik — təhlükəsizlik başlıqları: X-Content-Type-Options: nosniff, X-Frame-Options / CSP frame-ancestors (clickjacking), Content-Security-Policy (XSS zərərini azaldır), Referrer-Policy, Strict-Transport-Security. Bir middleware-də mərkəzləşdir.",
            "Təhlükəsizlik — sürət limiti: AddRateLimiter + UseRateLimiter. Giriş, parol sıfırlama, OTP endpoint-lərinə sərt limit qoy (brute force). Bölmə açarı (partition key) istifadəçi və ya IP olsun; proksi arxasında real IP üçün ForwardedHeaders-i düzgün qur.",
            "Təhlükəsizlik — loglarda sirr: HttpLogging və öz log middleware-in Authorization, Cookie başlıqlarını, parol və kart sahələrini yazmasın. Query string-də token ötürmə — o, loglara və Referer-ə düşür.",
            "Təhlükəsizlik — auth-u əl ilə yazma: «X-Api-Key yoxla» tipli öz middleware-ində sabit vaxtlı müqayisə (FixedTimeEquals), açarın heşlə saxlanması və hər yolun əhatə olunması lazımdır. Mümkünsə daxili authentication sxemlərini işlət və FallbackPolicy ilə «default qapalı» et.",
            "Təhlükəsizlik — host başlığı: Host başlığı saxtalaşdırıla bilər; ondan parol sıfırlama linki quranda hücumçu öz domenini yeridir. AllowedHosts-u konkret domenlərlə doldur.",
          ]},
          { t: "code", lang: "csharp", caption: "Təhlükəsizlik başlıqları, sərt CORS və giriş üçün sürət limiti", code: `builder.Services.AddCors(o => o.AddDefaultPolicy(p => p
    .WithOrigins("https://kodakademiyasi.az")        // yalnız öz saytın
    .WithMethods("GET", "POST", "PUT", "DELETE")
    .WithHeaders("Content-Type", "Authorization")
    .AllowCredentials()));

builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    o.AddPolicy("giris", ctx => RateLimitPartition.GetFixedWindowLimiter(
        ctx.Connection.RemoteIpAddress?.ToString() ?? "namelum",
        _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 5,                         // dəqiqədə 5 cəhd
            Window = TimeSpan.FromMinutes(1),
        }));
});

var app = builder.Build();

app.UseExceptionHandler();
app.UseHsts();
app.UseHttpsRedirection();

app.Use(async (ctx, next) =>
{
    var h = ctx.Response.Headers;
    h.XContentTypeOptions = "nosniff";
    h.XFrameOptions = "DENY";
    h["Referrer-Policy"] = "strict-origin-when-cross-origin";
    h.ContentSecurityPolicy = "default-src 'self'; frame-ancestors 'none'";
    await next();
});

app.UseCors();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/giris", GirisEt).RequireRateLimiting("giris");
app.MapControllers();
app.Run();` },
          { t: "qa", items: [
            ["Middleware nədir?", "Sorğu zəncirində bir komponent: sorğunu emal edir, next ilə növbətiyə ötürür və ya zənciri dayandırır; cavab qayıdanda da işləyə bilər."],
            ["Sıra niyə vacibdir?", "Hər middleware yalnız özündən sonrakıları əhatə edir. Xəta tutucu əvvəldə, authentication authorization-dan əvvəl olmalıdır."],
            ["Use, Run və Map fərqi?", "Use — növbətini çağıra bilən middleware. Run — son (terminal) middleware, next yoxdur. Map — yola görə ayrıca budaq yaradır."],
            ["Middleware ilə filtr fərqi?", "Middleware bütün sorğulara tətbiq olunur və HttpContext səviyyəsindədir. Filtr MVC/endpoint kontekstində işləyir: model, action arqumentləri, nəticə əlçatandır."],
            ["Middleware-də scoped xidməti necə alırsan?", "InvokeAsync metodunun parametri kimi — konstruktorda yox, çünki middleware singleton-dur."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "next() çağırılmasa nə olur?", options: ["Xəta atılır", "Zəncir dayanır, sonrakılar işləmir", "Sorğu təkrarlanır"], answer: 1, why: "Bu qısaqapanmadır." },
          { t: "quiz", q: "Hansı əvvəl gəlməlidir?", options: ["UseAuthorization", "UseAuthentication", "Fərqi yoxdur"], answer: 1, why: "Əvvəl kimlik, sonra icazə." },
          { t: "quiz", q: "Xəta tutan middleware harada olmalıdır?", options: ["Zəncirin əvvəlində", "Zəncirin sonunda", "Endpoint-in içində"], answer: 0, why: "Özündən sonrakıların xətasını tutur." },
        ],
      },
    ],
    exercise: {
      task: "1) `SorguIdMiddleware` sinfi yaz: hər sorğuya unikal id (Guid) versin, onu `X-Sorgu-Id` cavab başlığına yazsın və log-a metod + yol + id qeyd etsin. 2) Lambda middleware yaz: `/baxim` ünvanından başqa bütün sorğulara, əgər `baximRejimi` dəyişəni true-dursa, 503 və «Sayt baxımdadır» mətni qaytarsın (qısaqapanma). 3) Hər cavaba `X-Content-Type-Options: nosniff` başlığı əlavə edən middleware yaz. 4) Hamısını düzgün sıra ilə pipeline-a qoş: xəta tutucu → HTTPS → sənin middleware-lərin → authentication → authorization → endpoint-lər.",
      starter: `var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\nbool baximRejimi = false;\n\n// pipeline\n\napp.MapGet("/", () => "Salam");\napp.MapGet("/baxim", () => "Baxım səhifəsi");\napp.Run();\n\npublic class SorguIdMiddleware(RequestDelegate next, ILogger<SorguIdMiddleware> log)\n{\n    public async Task InvokeAsync(HttpContext context)\n    {\n        // id, başlıq, log, next\n    }\n}\n`,
      expect: "SorguIdMiddleware Guid.NewGuid() yaradır, başlığı await next(context)-dən ƏVVƏL (və ya OnStarting ilə) yazır, strukturlaşdırılmış log (şablonla) edir və next çağırır; baxım middleware-i şərt doğru olanda StatusCode = 503 təyin edib WriteAsync edir və return edir (next çağırmır), /baxim istisnadır; nosniff başlığı next-dən əvvəl; sıra: UseExceptionHandler → UseHttpsRedirection → UseMiddleware<SorguIdMiddleware> və digərləri → UseAuthentication → UseAuthorization → Map...; cavab başlandıqdan sonra başlıq dəyişdirilmir.",
    },
  },
  {
    slug: "routing",
    title: "Routing",
    intro: "Routing — gələn sorğunun ünvanını (URL) və metodunu uyğun koda (endpoint) bağlayan mexanizmdir. /mehsullar/5 ünvanından «5»-i çıxarıb metoda ötürən də odur.",
    sections: [
      {
        level: "baslangic",
        title: "Ünvan şablonları və parametrlər",
        blocks: [
          { t: "analogy", text: "Routing — poçt çeşidləmə mərkəzidir. Zərfin üstündəki ünvana baxır: şəhər, küçə, ev nömrəsi. Hər zərf doğru qutuya düşür. Ünvan heç bir qutuya uyğun gəlmirsə — «ünvan tapılmadı» (404)." },
          { t: "code", lang: "csharp", code: `// Sabit ünvan
app.MapGet("/haqqinda", () => "Kod Akademiyası");

// Parametrli: {id} ünvandan götürülür
app.MapGet("/mehsullar/{id}", (int id) => $"Məhsul #{id}");

// Bir neçə parametr
app.MapGet("/kurslar/{kurs}/dersler/{ders}", (string kurs, int ders) =>
    $"{kurs} kursu, {ders}-ci dərs");

// Query string: /axtar?soz=telefon&sehife=2
app.MapGet("/axtar", (string soz, int sehife = 1) =>
    $"«{soz}» axtarışı, səhifə {sehife}");

// İxtiyari parametr: /salam və ya /salam/Aysel
app.MapGet("/salam/{ad?}", (string? ad) => $"Salam, {ad ?? "qonaq"}!");` },
          { t: "terms", items: [
            ["route (marşrut)", "ünvan şablonu + onu emal edən kod."],
            ["route parametri", "ünvanın dəyişən hissəsi: {id}."],
            ["query string", "? işarəsindən sonrakı açar=dəyər cütləri."],
            ["ixtiyari parametr", "{ad?} — olmaya da bilər."],
            ["404 Not Found", "heç bir marşrut uyğun gəlmədi."],
          ]},
          { t: "tip", text: "Resursun kimliyini route parametrində ver (/mehsullar/5), filtr və sıralamanı isə query string-də (/mehsullar?kateqoriya=telefon&sira=qiymet)." },
        ],
      },
      {
        level: "orta",
        title: "Məhdudiyyətlər, qruplar və controller marşrutları",
        blocks: [
          { t: "code", lang: "csharp", code: `// Məhdudiyyət (constraint): uyğun gəlməsə 404
app.MapGet("/mehsullar/{id:int:min(1)}", (int id) => $"Məhsul #{id}");
app.MapGet("/yazilar/{slug:regex(^[a-z0-9-]+$)}", (string slug) => slug);
app.MapGet("/sened/{id:guid}", (Guid id) => id);
app.MapGet("/arxiv/{il:int:range(2000,2100)}/{ay:int:range(1,12)}", (int il, int ay) => $"{il}-{ay}");

// Hamısını tutan (catch-all): /fayllar/a/b/c.txt → yol = "a/b/c.txt"
app.MapGet("/fayllar/{*yol}", (string yol) => yol);

// Qrup: ortaq prefiks və tənzimləmələr
var api = app.MapGroup("/api/v1").RequireAuthorization();

var mehsullar = api.MapGroup("/mehsullar").WithTags("Məhsullar");
mehsullar.MapGet("/", HamisiniAl);
mehsullar.MapGet("/{id:int}", BiriniAl).WithName("MehsulAl");
mehsullar.MapPost("/", Yarat);

// Adlı marşrutdan link qurmaq
app.MapPost("/sifarisler", (LinkGenerator link, HttpContext ctx) =>
{
    string? unvan = link.GetUriByName(ctx, "MehsulAl", new { id = 42 });
    return Results.Created(unvan, null);
});` },
          { t: "code", lang: "csharp", caption: "Controller-də atribut marşrutları", code: `[ApiController]
[Route("api/v1/[controller]")]          // [controller] → "mehsullar"
public class MehsullarController : ControllerBase
{
    [HttpGet]                            // GET api/v1/mehsullar
    public IActionResult Hamisi() => Ok();

    [HttpGet("{id:int}")]                // GET api/v1/mehsullar/5
    public IActionResult Biri(int id) => Ok(id);

    [HttpGet("{id:int}/reyler")]         // GET api/v1/mehsullar/5/reyler
    public IActionResult Reyler(int id) => Ok();

    [HttpPost]                           // POST api/v1/mehsullar
    public IActionResult Yarat() => Created();
}` },
          { t: "mistake", lang: "csharp", wrong: `app.MapGet("/mehsullar/{id}", (int id) => ...);
app.MapGet("/mehsullar/{ad}", (string ad) => ...);    // AmbiguousMatchException`, right: `app.MapGet("/mehsullar/{id:int}", (int id) => ...);
app.MapGet("/mehsullar/{ad:alpha}", (string ad) => ...);`, why: "İki şablon eyni ünvana uyğun gəlir və router seçə bilmir. Məhdudiyyətlə ayır və ya ünvanları fərqləndir (/mehsullar/ad/{ad})." },
          { t: "mistake", lang: "csharp", wrong: `app.MapGet("/mehsullar/{id}", (int id) => ...);
// GET /mehsullar/abc → 400 Bad Request (tip çevrilmədi)`, right: `app.MapGet("/mehsullar/{id:int}", (int id) => ...);
// GET /mehsullar/abc → 404 Not Found (marşrut uyğun gəlmədi)`, why: "Məhdudiyyət olmadan şablon uyğun gəlir, amma «abc» int-ə çevrilmir. :int ilə marşrut ümumiyyətlə seçilmir və başqa şablonlara şans qalır." },
          { t: "mistake", lang: "csharp", wrong: `/api/MehsullariGetir
/api/mehsul_sil?id=5
/api/YeniMehsul`, right: `GET    /api/mehsullar
DELETE /api/mehsullar/5
POST   /api/mehsullar`, why: "REST-də ünvan resursu (isim, cəmdə, kiçik hərflə), HTTP metodu isə əməliyyatı bildirir. Ardıcıl ünvanlar API-ni öyrənməyi asanlaşdırır." },
        ],
      },
      {
        level: "senior",
        title: "Endpoint routing, versiyalama və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Endpoint routing iki mərhələlidir: UseRouting uyğun endpoint-i seçir və HttpContext-ə yazır; aradakı middleware-lər (auth, CORS, rate limit) onun metadata-sını oxuyur; sonda endpoint icra olunur.",
            "Uyğunlaşdırma: bütün şablonlar başlanğıcda bir qərar ağacına (DFA) yığılır — sorğu zamanı axtarış marşrut sayından demək olar asılı deyil. Sıra qeydiyyat sırası yox, spesifikliyə görədir: sabit seqment > məhdudiyyətli parametr > parametr > catch-all.",
            "Məhdudiyyət validasiya deyil: o, yalnız marşrut seçimi üçündür və uyğun gəlməyəndə 404 verir. İstifadəçiyə mənalı 400 lazımdırsa, validasiyanı modeldə et.",
            "regex məhdudiyyəti hər sorğuda işləyir — bahalıdır və Native AOT-da məhdudiyyətlidir. Sadə hallarda :int, :guid, :alpha, :length işlət. Öz məhdudiyyətin: IRouteConstraint.",
            "Versiyalama üsulları: URL-də (/api/v1/...), başlıqda (X-Api-Version), query-də. URL ən aydın və keşə uyğundur. Asp.Versioning paketi köhnə versiyanı «deprecated» kimi elan etməyə imkan verir.",
            "Kiçik hərfli ünvanlar: builder.Services.AddRouting(o => o.LowercaseUrls = true). Link qurarkən sətir birləşdirmə yox, LinkGenerator / CreatedAtAction işlət.",
            "MapFallback uyğun gəlməyən sorğuları tutur (SPA üçün index.html). API prefiksini fallback-dən ayır ki, səhv API ünvanı HTML yox, 404 JSON qaytarsın.",
            "Təhlükəsizlik — IDOR (obyektə birbaşa müraciət): /sifarisler/1042 ünvanında id-ni dəyişən istifadəçi başqasının sifarişini görür. Routing yalnız kodu tapır — sahibliyi SƏN yoxlamalısan: WHERE Id = @id AND IstifadeciId = @cari. Bu, OWASP-ın 1 nömrəli riskidir (Broken Access Control).",
            "Təhlükəsizlik — təxmin edilən id: ardıcıl ədədlər (1, 2, 3) resursları sadalamağı asanlaşdırır və həcmi açıqlayır. Açıq ünvanlarda GUID/slug işlət — amma bu, icazə yoxlamasını əvəz etmir.",
            "Təhlükəsizlik — catch-all və yol keçidi (path traversal): {*yol} dəyərini fayl sisteminə birbaşa vermə — «../../appsettings.json» ilə istənilən fayl oxunar. Path.GetFullPath ilə tam yolu qur və icazəli kök qovluğun içində qaldığını yoxla; mümkünsə yolu yox, bazadakı fayl id-sini qəbul et.",
            "Təhlükəsizlik — açıq yönləndirmə (open redirect): /giris?returnUrl=https://saxta.az — istifadəçi girişdən sonra saxta sayta atılır (fişinq). Yalnız lokal ünvana yönləndir: Results.LocalRedirect və ya Url.IsLocalUrl yoxlaması.",
            "Təhlükəsizlik — default qapalı: yeni endpoint əlavə edəndə [Authorize] unudulur. Qlobal FallbackPolicy (RequireAuthenticatedUser) qur və açıq olanları açıq şəkildə AllowAnonymous ilə işarələ. Qrup səviyyəsində RequireAuthorization() da eyni işi görür.",
            "Təhlükəsizlik — gizli endpoint-lər: /swagger, /openapi, /metrics, /debug, health-in detallı cavabı production-da açıq qalmasın — və ya auth arxasında olsun. «Ünvanı heç kim bilmir» qoruma deyil.",
            "Təhlükəsizlik — metod uyğunsuzluğu: eyni əməliyyatı həm GET, həm POST ilə açma. Dəyişiklik edən GET CSRF-ə (məs. <img src> ilə) açıqdır.",
          ]},
          { t: "code", lang: "csharp", caption: "IDOR, yol keçidi və açıq yönləndirməyə qarşı", code: `var api = app.MapGroup("/api/v1").RequireAuthorization();     // qrup: default qapalı

// IDOR: id + sahiblik bir sorğuda; tapılmasa 404 (varlığını da sızdırma)
api.MapGet("/sifarisler/{id:int}", async (int id, ClaimsPrincipal user, MagazaDb db, CancellationToken ct) =>
{
    int istifadeciId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var sifaris = await db.Sifarisler
        .Where(s => s.Id == id && s.IstifadeciId == istifadeciId)
        .Select(s => new SifarisDto(s.Id, s.Tarix, s.Mebleg))
        .FirstOrDefaultAsync(ct);

    return sifaris is null ? Results.NotFound() : Results.Ok(sifaris);
});

// Yol keçidi: tam yol icazəli kökün içində qalmalıdır
api.MapGet("/fayllar/{*yol}", (string yol, IWebHostEnvironment env) =>
{
    string kok = Path.GetFullPath(Path.Combine(env.ContentRootPath, "yuklemeler"));
    string tam = Path.GetFullPath(Path.Combine(kok, yol));

    if (!tam.StartsWith(kok + Path.DirectorySeparatorChar, StringComparison.Ordinal) || !File.Exists(tam))
        return Results.NotFound();

    return Results.File(tam, "application/octet-stream", Path.GetFileName(tam));   // yükləmə kimi, icra yox
});

// Açıq yönləndirmə: yalnız lokal ünvan
app.MapPost("/giris", (string? returnUrl) =>
{
    // ... giriş uğurludur
    return !string.IsNullOrEmpty(returnUrl) && returnUrl.StartsWith('/') && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\\\")
        ? Results.LocalRedirect(returnUrl)
        : Results.Redirect("/");
}).AllowAnonymous();` },
          { t: "qa", items: [
            ["Routing necə işləyir?", "Sorğunun metodu və yolu qeydiyyatdakı şablonlarla tutuşdurulur, ən spesifik uyğun endpoint seçilir, route dəyərləri çıxarılır və handler-ə ötürülür."],
            ["Atribut və konvensiya marşrutlaşdırması fərqi?", "Atribut ([Route], [HttpGet]) marşrutu birbaşa action üzərində yazır — API-lər üçün standart. Konvensiya ({controller}/{action}/{id?}) mərkəzi şablondur, MVC saytlarında işlənir."],
            ["Route məhdudiyyəti nə üçündür?", "Marşrutun yalnız uyğun formatlı dəyərlə seçilməsi üçün. Validasiya deyil — uyğun gəlməsə 404."],
            ["Route parametri ilə query string nə vaxt?", "Resursun kimliyi route-da, ixtiyari filtr/sıralama/səhifələmə query-də."],
            ["IDOR nədir və necə qarşısı alınır?", "İstifadəçinin id-ni dəyişərək başqasının resursuna çatması. Hər sorğuda resursun cari istifadəçiyə aid olduğu serverdə yoxlanmalıdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "/mehsullar/{id:int} üçün /mehsullar/abc nə qaytarır?", options: ["200", "404", "500"], answer: 1, why: "Məhdudiyyət uyğun gəlmir — marşrut seçilmir." },
          { t: "quiz", q: "/axtar?soz=kitab — «soz» nədir?", options: ["Route parametri", "Query string parametri", "Başlıq"], answer: 1, why: "? işarəsindən sonrakılar query string-dir." },
          { t: "quiz", q: "Ortaq prefiksli endpoint-ləri necə qruplaşdırırsan?", options: ["MapGroup", "MapFallback", "UseRouting"], answer: 0, why: "MapGroup prefiks və ortaq tənzimləmə verir." },
        ],
      },
    ],
    exercise: {
      task: "Bloq API-si üçün marşrutlar yaz (Minimal API). 1) `/api/v1` qrupu, içində `/yazilar` alt qrupu. 2) GET /api/v1/yazilar?sehife=1&olcu=10 — səhifələmə (default 1 və 10; olcu ən çox 50). 3) GET /api/v1/yazilar/{id:int} — id müsbət olmalıdır. 4) GET /api/v1/yazilar/{slug} — yalnız kiçik hərf, rəqəm və tire. 5) GET /api/v1/yazilar/{id:int}/serhler — yazının şərhləri. 6) GET /api/v1/arxiv/{il}/{ay?} — il 2000–2100, ay 1–12, ay ixtiyari. 7) POST /api/v1/yazilar — 201 və adlı marşrutdan (WithName) qurulmuş Location qaytarsın.",
      starter: `var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\nvar api = app.MapGroup("/api/v1");\n\n// marşrutlar\n\napp.Run();\n\npublic record Yazi(int Id, string Slug, string Basliq);\n`,
      expect: "api.MapGroup(\"/yazilar\") işlədilib; səhifələmədə default parametrlər və olcu Math.Clamp/Min ilə 50-yə məhdudlaşır; {id:int:min(1)}; slug üçün regex və ya fərqləndirici məhdudiyyət ki, id marşrutu ilə toqquşmasın; {id:int}/serhler; arxiv {il:int:range(2000,2100)}/{ay:int:range(1,12)?}; POST Results.CreatedAtRoute və ya LinkGenerator ilə WithName-li marşruta link qurur (sətir birləşdirmə yox); ünvanlar isim, kiçik hərf; dəyişiklik GET ilə edilmir.",
    },
  },
  {
    slug: "controller",
    title: "Controller və action",
    intro: "Controller — bir resursa aid endpoint-ləri bir sinifdə toplayır. Onun hər public metodu (action) bir sorğuya cavab verir.",
    sections: [
      {
        level: "baslangic",
        title: "İlk controller",
        blocks: [
          { t: "analogy", text: "Bankda şöbələr var: kredit şöbəsi, kart şöbəsi. Hər şöbə (controller) öz mövzusuna baxır. Şöbədəki pəncərələr (action) isə konkret işləri görür: «kart sifarişi», «kartın bloklanması»." },
          { t: "code", lang: "csharp", code: `[ApiController]
[Route("api/[controller]")]                 // → api/telebeler
public class TelebelerController : ControllerBase
{
    private static readonly List<Telebe> _telebeler =
    [
        new(1, "Aysel", 92),
        new(2, "Murad", 65),
    ];

    [HttpGet]                                // GET api/telebeler
    public ActionResult<List<Telebe>> Hamisi() => _telebeler;

    [HttpGet("{id:int}")]                    // GET api/telebeler/1
    public ActionResult<Telebe> Biri(int id)
    {
        var telebe = _telebeler.FirstOrDefault(t => t.Id == id);
        if (telebe is null) return NotFound();
        return telebe;                       // 200 + JSON
    }
}

public record Telebe(int Id, string Ad, int Bal);` },
          { t: "code", lang: "csharp", caption: "Program.cs", code: `builder.Services.AddControllers();
// ...
app.MapControllers();` },
          { t: "terms", items: [
            ["controller", "əlaqəli action-ları saxlayan sinif; adı ...Controller ilə bitir."],
            ["action", "sorğunu emal edən public metod."],
            ["ControllerBase", "API controller-lərinin baza sinfi: Ok(), NotFound() və s. verir."],
            ["[ApiController]", "API davranışlarını açır: avtomatik validasiya, gövdədən oxuma."],
            ["ActionResult<T>", "ya T dəyəri, ya da status nəticəsi (NotFound) qaytarmağa imkan verir."],
          ]},
          { t: "tip", text: "API üçün ControllerBase-dən törə. Controller (Base-siz) sinfi View dəstəyi əlavə edir — o, yalnız HTML səhifələri (MVC) üçün lazımdır." },
        ],
      },
      {
        level: "orta",
        title: "Tam CRUD, DTO və status kodları",
        blocks: [
          { t: "code", lang: "csharp", code: `[ApiController]
[Route("api/[controller]")]
public class MehsullarController(IMehsulXidmeti xidmet) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<MehsulDto>>> Hamisi(
        [FromQuery] int sehife = 1, [FromQuery] int olcu = 20, CancellationToken ct = default)
    {
        return Ok(await xidmet.SiyahiAsync(sehife, Math.Clamp(olcu, 1, 100), ct));
    }

    [HttpGet("{id:int}", Name = "MehsulAl")]
    public async Task<ActionResult<MehsulDto>> Biri(int id, CancellationToken ct)
    {
        var mehsul = await xidmet.TapAsync(id, ct);
        return mehsul is null ? NotFound() : Ok(mehsul);
    }

    [HttpPost]
    public async Task<ActionResult<MehsulDto>> Yarat(MehsulYaratDto giris, CancellationToken ct)
    {
        var yeni = await xidmet.YaratAsync(giris, ct);
        return CreatedAtRoute("MehsulAl", new { id = yeni.Id }, yeni);      // 201 + Location
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Yenile(int id, MehsulYenileDto giris, CancellationToken ct)
    {
        bool tapildi = await xidmet.YenileAsync(id, giris, ct);
        return tapildi ? NoContent() : NotFound();                           // 204
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Sil(int id, CancellationToken ct)
    {
        bool tapildi = await xidmet.SilAsync(id, ct);
        return tapildi ? NoContent() : NotFound();
    }
}

// DTO: API-nin gördüyü forma — baza modelindən ayrıdır
public record MehsulDto(int Id, string Ad, decimal Qiymet);
public record MehsulYaratDto(string Ad, decimal Qiymet, int KateqoriyaId);
public record MehsulYenileDto(string Ad, decimal Qiymet);` },
          { t: "list", items: [
            "Ok(x) → 200, CreatedAtRoute/CreatedAtAction → 201, NoContent() → 204.",
            "BadRequest() → 400, Unauthorized() → 401, Forbid() → 403, NotFound() → 404, Conflict() → 409.",
            "Parametr mənbələri: [FromRoute], [FromQuery], [FromBody], [FromHeader], [FromForm], [FromServices]. [ApiController] mürəkkəb tipi gövdədən, sadə tipi route/query-dən avtomatik götürür.",
            "Controller nazik olmalıdır: sorğunu qəbul et, xidməti çağır, nəticəni HTTP-yə çevir. Biznes məntiqi xidmətdədir.",
          ]},
          { t: "mistake", lang: "csharp", wrong: `[HttpGet("{id}")]
public Istifadeci Biri(int id) => _db.Istifadeciler.Find(id)!;   // varlığın özü qayıdır`, right: `[HttpGet("{id:int}")]
public async Task<ActionResult<IstifadeciDto>> Biri(int id, CancellationToken ct)
{
    var dto = await _db.Istifadeciler
        .Where(i => i.Id == id)
        .Select(i => new IstifadeciDto(i.Id, i.Ad))
        .FirstOrDefaultAsync(ct);
    return dto is null ? NotFound() : dto;
}`, why: "Baza varlığını (entity) birbaşa qaytarmaq ParolHesi, Rol kimi daxili sahələri də JSON-a çıxarır və baza sxemini API-yə bağlayır. Həmişə DTO qaytar." },
          { t: "mistake", lang: "csharp", wrong: `[HttpPost]
public IActionResult Yarat(MehsulYaratDto giris)
{
    try { /* 80 sətir: yoxlama, hesablama, baza, email */ }
    catch (Exception ex) { return StatusCode(500, ex.ToString()); }
}`, right: `[HttpPost]
public async Task<ActionResult<MehsulDto>> Yarat(MehsulYaratDto giris, CancellationToken ct)
{
    var yeni = await xidmet.YaratAsync(giris, ct);
    return CreatedAtRoute("MehsulAl", new { id = yeni.Id }, yeni);
}`, why: "«Kök» controller test olunmur və təkrar işlədilmir. Məntiqi xidmətə çıxar, xətaları qlobal tutucuya burax. ex.ToString() isə stack trace-i müştəriyə sızdırır." },
          { t: "mistake", lang: "csharp", wrong: `[HttpGet]
public List<Mehsul> Hamisi() => _db.Mehsullar.ToList();     // sinxron, limitsiz`, right: `[HttpGet]
public async Task<ActionResult<List<MehsulDto>>> Hamisi(int sehife = 1, CancellationToken ct = default) =>
    await _db.Mehsullar.OrderBy(m => m.Id)
        .Skip((Math.Max(sehife, 1) - 1) * 20).Take(20)
        .Select(m => new MehsulDto(m.Id, m.Ad, m.Qiymet))
        .ToListAsync(ct);`, why: "Sinxron baza çağırışı axını bloklayır; limitsiz siyahı isə cədvəl böyüdükcə serveri və müştərini boğur. async + səhifələmə + proyeksiya." },
        ],
      },
      {
        level: "senior",
        title: "Filtrlər, konvensiyalar və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Controller hər sorğu üçün yenidən yaradılır (transient) — sahədə sorğular arası vəziyyət saxlama. Asılılıqlar konstruktordan, nadir işlənənlər [FromServices] ilə action-a.",
            "Filtr zənciri: Authorization → Resource → (model binding) → Action → Exception → Result. Kəsişən məntiqi (audit, keş, validasiya) filtrə çıxar: IAsyncActionFilter, və ya ServiceFilter ilə DI-dan.",
            "[ApiController] nə verir: model səhv olanda avtomatik 400 + ValidationProblemDetails, gövdədən avtomatik binding, atribut marşrutu tələbi, xəta nəticələrinin ProblemDetails formatı.",
            "ActionResult<T> OpenAPI sənədinə cavab tipini verir. Əlavə statuslar üçün [ProducesResponseType(StatusCodes.Status404NotFound)] və ya TypedResults.",
            "CancellationToken parametrini hər async action-a əlavə et — müştəri bağlantını kəsəndə baza sorğusu da dayanır.",
            "Məzmun razılaşması (content negotiation): Accept başlığına görə format seçilir. Yalnız JSON lazımdırsa artıq formatlayıcıları qoşma.",
            "JSON tənzimləmələri: AddControllers().AddJsonOptions(...) — enum-lar sətir kimi, null-ları buraxmaq, dövrü istinadları idarə etmək. Dövrü istinad problemi əslində «entity qaytarma» siqnalıdır.",
            "Təhlükəsizlik — default qapalı: [Authorize]-i hər controller-ə əl ilə yazmaq unudulur. Qlobal siyasət qur (FallbackPolicy) və yalnız açıq endpoint-ləri [AllowAnonymous] ilə işarələ.",
            "Təhlükəsizlik — obyekt səviyyəsində icazə: [Authorize] yalnız «giriş edib» deməkdir. Hər action resursun cari istifadəçiyə aid olduğunu yoxlamalıdır (IAuthorizationService + resurs əsaslı siyasət). Rol yoxlaması da serverdə: [Authorize(Roles = \"Admin\")] və ya Policy.",
            "Təhlükəsizlik — over-posting (mass assignment): giriş kimi entity qəbul etsən, hücumçu JSON-a \"Rol\": \"Admin\" və ya \"Balans\": 999999 əlavə edir və binding onu doldurur. Giriş üçün yalnız icazəli sahələri olan ayrıca DTO işlət.",
            "Təhlükəsizlik — CSRF: cookie ilə autentifikasiya olunan endpoint-lərdə brauzer cookie-ni özü göndərir — başqa sayt istifadəçi adından POST edə bilər. Antiforgery token ([ValidateAntiForgeryToken] / AddAntiforgery) və SameSite cookie. Bearer token (Authorization başlığı) ilə işləyən təmiz API-də CSRF riski yoxdur.",
            "Təhlükəsizlik — xəta cavabları: ex.Message / stack trace qaytarma. ProblemDetails-də yalnız ümumi mesaj və izləmə id-si (traceId) olsun; detal loqa yazılsın.",
            "Təhlükəsizlik — sadalama: «istifadəçi tapılmadı» və «parol səhvdir» fərqli cavabları hesabların mövcudluğunu açır. Giriş və parol sıfırlamada eyni cavab, eyni vaxt.",
            "Təhlükəsizlik — fayl yükləmə: IFormFile üçün ölçü limiti ([RequestSizeLimit]), uzantı və məzmun (magic bytes) yoxlaması, fayl adını istifadəçidən götürməmək (Guid ad), wwwroot-dan kənarda saxlamaq.",
          ]},
          { t: "code", lang: "csharp", caption: "Qlobal default-qapalı siyasət və resurs əsaslı icazə", code: `// Program.cs
builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build())                                              // işarələnməyən hər endpoint qapalıdır
    .AddPolicy("SenedSahibi", p => p.AddRequirements(new SahibTelebi()));

builder.Services.AddScoped<IAuthorizationHandler, SenedSahibiHandler>();

// Handler: resurs cari istifadəçinindirmi?
public class SahibTelebi : IAuthorizationRequirement;

public class SenedSahibiHandler : AuthorizationHandler<SahibTelebi, Sened>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, SahibTelebi teleb, Sened sened)
    {
        string? id = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (id is not null && sened.SahibId.ToString() == id)
            context.Succeed(teleb);
        return Task.CompletedTask;
    }
}

[ApiController]
[Route("api/senedler")]
public class SenedlerController(ISenedAnbari anbar, IAuthorizationService icaze) : ControllerBase
{
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Yenile(int id, SenedYenileDto giris, CancellationToken ct)
    {
        var sened = await anbar.TapAsync(id, ct);
        if (sened is null) return NotFound();

        var netice = await icaze.AuthorizeAsync(User, sened, "SenedSahibi");
        if (!netice.Succeeded) return NotFound();              // 403 yox — varlığını sızdırma

        sened.Basliq = giris.Basliq;                           // yalnız DTO-dakı sahələr (over-posting yoxdur)
        sened.Metn = giris.Metn;
        await anbar.SaxlaAsync(ct);
        return NoContent();
    }

    [AllowAnonymous]
    [HttpGet("aciq")]
    public IActionResult Aciq() => Ok("Hamıya açıq");
}

public record SenedYenileDto(string Basliq, string Metn);       // SahibId, Rol burada YOXDUR` },
          { t: "qa", items: [
            ["ControllerBase ilə Controller fərqi?", "ControllerBase API üçündür. Controller ondan törəyir və View, ViewBag, TempData kimi MVC dəstəyi əlavə edir."],
            ["[ApiController] nə edir?", "Avtomatik model validasiyası (400), gövdədən binding nəticə çıxarımı, atribut marşrutu tələbi, ProblemDetails cavabları."],
            ["IActionResult ilə ActionResult<T> fərqi?", "ActionResult<T> həm tipli dəyəri, həm status nəticəsini qaytarmağa imkan verir və OpenAPI-yə cavab tipini bildirir."],
            ["Niyə entity yox, DTO qaytarırıq?", "Daxili sahələrin sızmasının, over-posting-in və baza sxemi ilə API-nin bağlanmasının qarşısını almaq üçün."],
            ["Over-posting nədir?", "Müştərinin gözlənilməyən sahələri (rol, balans) göndərib model binding ilə doldurması. Həlli — dar giriş DTO-su."],
            ["Filtr nədir, hansı növləri var?", "Action ətrafında işləyən kəsişən məntiq: Authorization, Resource, Action, Exception, Result filtrləri."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "API controller hansı sinifdən törəyir?", options: ["ControllerBase", "PageModel", "Hub"], answer: 0, why: "View lazım deyilsə ControllerBase." },
          { t: "quiz", q: "Uğurlu silmədən sonra adətən hansı nəticə?", options: ["Ok(200)", "NoContent() — 204", "Created — 201"], answer: 1, why: "Qaytarılacaq məzmun yoxdur." },
          { t: "quiz", q: "[Route(\"api/[controller]\")] — KitablarController üçün ünvan?", options: ["api/controller", "api/kitablar", "api/KitablarController"], answer: 1, why: "[controller] sinif adının «Controller»siz hissəsidir." },
        ],
      },
    ],
    exercise: {
      task: "`TapsiriqlarController` yaz (yaddaşda siyahı kifayətdir, amma xidmət interfeysi ilə). 1) `ITapsiriqXidmeti` konstruktordan gəlsin. 2) GET api/tapsiriqlar?tamamlanib=true — ixtiyari filtr. 3) GET api/tapsiriqlar/{id} — 404 dəstəyi. 4) POST — `TapsiriqYaratDto(Basliq)` qəbul edir, 201 + Location (CreatedAtAction/CreatedAtRoute). 5) PUT api/tapsiriqlar/{id}/tamamla — tapşırığı tamamlanmış edir, 204 və ya 404. 6) DELETE — 204/404. Bütün action-lar async və CancellationToken qəbul etsin; cavab DTO olsun.",
      starter: `[ApiController]\n[Route("api/[controller]")]\npublic class TapsiriqlarController(ITapsiriqXidmeti xidmet) : ControllerBase\n{\n    // action-lar\n}\n\npublic record TapsiriqDto(int Id, string Basliq, bool Tamamlanib);\npublic record TapsiriqYaratDto(string Basliq);\n\npublic interface ITapsiriqXidmeti\n{\n    Task<IReadOnlyList<TapsiriqDto>> SiyahiAsync(bool? tamamlanib, CancellationToken ct);\n    Task<TapsiriqDto?> TapAsync(int id, CancellationToken ct);\n    Task<TapsiriqDto> YaratAsync(TapsiriqYaratDto giris, CancellationToken ct);\n    Task<bool> TamamlaAsync(int id, CancellationToken ct);\n    Task<bool> SilAsync(int id, CancellationToken ct);\n}\n`,
      expect: "ControllerBase, [ApiController], atribut marşrutları; [HttpGet] bool? tamamlanib query parametri; [HttpGet(\"{id:int}\")] null olanda NotFound(); [HttpPost] CreatedAtAction/CreatedAtRoute ilə 201; [HttpPut(\"{id:int}/tamamla\")] NoContent()/NotFound(); [HttpDelete(\"{id:int}\")]; bütün action-lar async Task<ActionResult<...>> / Task<IActionResult> və CancellationToken ötürür; məntiq controller-də deyil, xidmətdədir; try/catch ilə ex.Message qaytarılmır.",
    },
  },
  {
    slug: "minimal-api",
    title: "Minimal API",
    intro: "Minimal API — controller sinfi olmadan, endpoint-i birbaşa funksiya ilə yazmağın yoludur. Az kod, sürətli başlanğıc; kiçik xidmətlər və mikroservislər üçün çox uyğundur.",
    sections: [
      {
        level: "baslangic",
        title: "Endpoint = ünvan + funksiya",
        blocks: [
          { t: "analogy", text: "Controller — şöbələri, lövhələri olan böyük ofisdir. Minimal API isə küçədəki köşkdür: bir pəncərə, birbaşa xidmət. Kiçik iş üçün köşk daha sürətlidir; iş böyüyəndə köşkləri səliqə ilə düzmək lazım gəlir." },
          { t: "code", lang: "csharp", code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var qeydler = new List<Qeyd>();

app.MapGet("/qeydler", () => qeydler);

app.MapGet("/qeydler/{id:int}", (int id) =>
    qeydler.FirstOrDefault(q => q.Id == id) is { } q
        ? Results.Ok(q)
        : Results.NotFound());

app.MapPost("/qeydler", (QeydYarat giris) =>
{
    var qeyd = new Qeyd(qeydler.Count + 1, giris.Metn);
    qeydler.Add(qeyd);
    return Results.Created($"/qeydler/{qeyd.Id}", qeyd);
});

app.MapDelete("/qeydler/{id:int}", (int id) =>
    qeydler.RemoveAll(q => q.Id == id) > 0 ? Results.NoContent() : Results.NotFound());

app.Run();

public record Qeyd(int Id, string Metn);
public record QeydYarat(string Metn);` },
          { t: "terms", items: [
            ["MapGet / MapPost / MapPut / MapDelete", "HTTP metodunu və ünvanı funksiyaya bağlayır."],
            ["handler", "sorğunu emal edən funksiya (lambda və ya metod)."],
            ["Results", "HTTP cavabı yaradan köməkçi: Results.Ok(), Results.NotFound()."],
            ["parametr bağlanması", "funksiyanın parametrləri route, query, gövdə və ya DI-dan avtomatik doldurulur."],
          ]},
          { t: "tip", text: "Parametr haradan gəlir? Sadə tip (int, string) → route və ya query. Mürəkkəb tip (record, class) → JSON gövdə. Qeydiyyatdakı xidmət → DI-dan." },
        ],
      },
      {
        level: "orta",
        title: "Qruplar, DI, TypedResults və filtrlər",
        blocks: [
          { t: "code", lang: "csharp", caption: "Endpoint-ləri fayllara böl", code: `// Endpoints/MehsulEndpoints.cs
public static class MehsulEndpoints
{
    public static RouteGroupBuilder MapMehsullar(this IEndpointRouteBuilder app)
    {
        var qrup = app.MapGroup("/api/mehsullar").WithTags("Məhsullar");

        qrup.MapGet("/", Siyahi);
        qrup.MapGet("/{id:int}", Biri).WithName("MehsulAl");
        qrup.MapPost("/", Yarat).RequireAuthorization("Admin");
        qrup.MapDelete("/{id:int}", Sil).RequireAuthorization("Admin");

        return qrup;
    }

    // TypedResults: qaytarılan tiplər imzada görünür → OpenAPI və test üçün yaxşıdır
    static async Task<Ok<List<MehsulDto>>> Siyahi(
        IMehsulXidmeti xidmet, int sehife = 1, int olcu = 20, CancellationToken ct = default) =>
        TypedResults.Ok(await xidmet.SiyahiAsync(sehife, Math.Clamp(olcu, 1, 100), ct));

    static async Task<Results<Ok<MehsulDto>, NotFound>> Biri(
        int id, IMehsulXidmeti xidmet, CancellationToken ct) =>
        await xidmet.TapAsync(id, ct) is { } m
            ? TypedResults.Ok(m)
            : TypedResults.NotFound();

    static async Task<CreatedAtRoute<MehsulDto>> Yarat(
        MehsulYaratDto giris, IMehsulXidmeti xidmet, CancellationToken ct)
    {
        var yeni = await xidmet.YaratAsync(giris, ct);
        return TypedResults.CreatedAtRoute(yeni, "MehsulAl", new { id = yeni.Id });
    }

    static async Task<Results<NoContent, NotFound>> Sil(
        int id, IMehsulXidmeti xidmet, CancellationToken ct) =>
        await xidmet.SilAsync(id, ct) ? TypedResults.NoContent() : TypedResults.NotFound();
}

// Program.cs
app.MapMehsullar();` },
          { t: "code", lang: "csharp", caption: "Açıq mənbə atributları və endpoint filtri", code: `app.MapGet("/axtar", (
    [FromQuery(Name = "q")] string soz,
    [FromHeader(Name = "Accept-Language")] string? dil,
    [FromServices] IAxtarisXidmeti axtaris,
    HttpContext ctx,
    ClaimsPrincipal istifadeci,
    CancellationToken ct) => axtaris.AxtarAsync(soz, ct));

// Çoxlu parametri bir tipdə topla
app.MapGet("/mehsullar", ([AsParameters] MehsulSorgusu s) => $"{s.Kateqoriya}, səhifə {s.Sehife}");

public record struct MehsulSorgusu(string? Kateqoriya, int Sehife = 1, int Olcu = 20);

// Endpoint filtri: handler-dən əvvəl/sonra işləyir
app.MapPost("/qeydler", (QeydYarat giris) => Results.Ok())
   .AddEndpointFilter(async (ctx, next) =>
   {
       var giris = ctx.GetArgument<QeydYarat>(0);
       if (string.IsNullOrWhiteSpace(giris.Metn))
           return Results.ValidationProblem(new Dictionary<string, string[]>
           {
               ["metn"] = ["Mətn boş ola bilməz"],
           });
       return await next(ctx);
   });` },
          { t: "mistake", lang: "csharp", wrong: `// Program.cs — 600 sətir
app.MapGet("/mehsullar", ...);
app.MapPost("/mehsullar", ...);
app.MapGet("/sifarisler", ...);
// ... 40 endpoint daha`, right: `// Program.cs
app.MapMehsullar();
app.MapSifarisler();
app.MapIstifadeciler();`, why: "Minimal «bir faylda hər şey» demək deyil. Hər resurs üçün genişlənmə metodu + MapGroup ilə Program.cs oxunaqlı qalır." },
          { t: "mistake", lang: "csharp", wrong: `app.MapGet("/mehsullar/{id}", (int id, MagazaDb db) =>
    db.Mehsullar.Find(id));            // null → 200 və boş gövdə; sinxron`, right: `app.MapGet("/mehsullar/{id:int}", async (int id, MagazaDb db, CancellationToken ct) =>
    await db.Mehsullar.FindAsync([id], ct) is { } m
        ? Results.Ok(new MehsulDto(m.Id, m.Ad, m.Qiymet))
        : Results.NotFound());`, why: "null qaytarmaq 404 vermir. Tapılmayan resurs üçün açıq NotFound, asinxron çağırış və DTO lazımdır." },
          { t: "mistake", lang: "csharp", wrong: `app.MapPost("/mehsullar", (MehsulYaratDto giris) => { /* dərhal bazaya */ });   // validasiya yoxdur`, right: `builder.Services.AddValidation();       // .NET 10: DataAnnotations Minimal API-də avtomatik yoxlanır

public record MehsulYaratDto(
    [Required, StringLength(100)] string Ad,
    [Range(0.01, 1_000_000)] decimal Qiymet);`, why: "Controller-dəki [ApiController] kimi avtomatik validasiya Minimal API-də öz-özünə yoxdur. .NET 10-da AddValidation() ilə açılır; köhnə versiyada endpoint filtri və ya FluentValidation işlət." },
        ],
      },
      {
        level: "senior",
        title: "Performans, AOT, quruluş və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Minimal API MVC qatlarını (filtr zənciri, model binder-lər, action seçimi) keçmir — sorğu başına daha az ayırma və daha yüksək ötürücülük. Fərq adətən kiçikdir; seçimi üsluba və komandaya görə et.",
            "Request Delegate Generator (RDG): mənbə generatoru handler üçün binding kodunu kompilyasiya vaxtı yaradır — reflection yoxdur. Native AOT ilə uyğunluğun əsası budur. JSON üçün JsonSerializerContext (source generation) lazımdır.",
            "TypedResults vs Results: TypedResults konkret tip qaytarır — OpenAPI cavabları avtomatik çıxarılır, vahid testdə nəticəni tiplə yoxlamaq olur. Bir neçə mümkün nəticə üçün Results<T1, T2>.",
            "Böyük layihədə quruluş: hər xüsusiyyət (feature) üçün qovluq — endpoint, DTO, handler, validator bir yerdə (vertical slice). Carter / FastEndpoints kimi kitabxanalar bu üslubu rəsmiləşdirir.",
            "Minimal API-də olmayanlar: model binder genişlənməsi məhduddur, məzmun razılaşması yoxdur (həmişə JSON), OData və bəzi MVC konvensiyaları yoxdur. Xüsusi binding üçün tipə static BindAsync və ya TryParse əlavə et.",
            "OpenAPI: builder.Services.AddOpenApi(); app.MapOpenApi(); — sənəd /openapi/v1.json. WithName, WithSummary, Produces<T>() ilə zənginləşdir. UI üçün Scalar və ya Swagger UI ayrıca qoşulur.",
            "Fayl yükləmə: IFormFile / IFormFileCollection parametri. Böyük fayllar üçün axınla oxu (Request.Body / MultipartReader), yaddaşa yığma.",
            "Təhlükəsizlik — default qapalı: qrup səviyyəsində MapGroup(...).RequireAuthorization() və ya qlobal FallbackPolicy. Tək-tək endpoint-ə əlavə etmək unudulur — və Minimal API-də atribut olmadığı üçün bunu görmək daha çətindir.",
            "Təhlükəsizlik — validasiya öz-özünə işləmir: DataAnnotations atributu yazmaq kifayət deyil, AddValidation() (və ya filtr) olmalıdır. Yoxlanmamış giriş birbaşa bazaya gedir. Bunu inteqrasiya testi ilə təsdiqlə: səhv gövdə → 400.",
            "Təhlükəsizlik — antiforgery: form qəbul edən endpoint-lərdə ([FromForm], IFormFile) antiforgery yoxlaması tələb olunur — AddAntiforgery + UseAntiforgery. Onu DisableAntiforgery() ilə söndürmə, əgər cookie autentifikasiyası varsa.",
            "Təhlükəsizlik — over-posting: handler parametri kimi entity qəbul etmə. Dar DTO → əl ilə xəritələmə.",
            "Təhlükəsizlik — gövdə ölçüsü və dərinlik: JSON gövdə üçün Kestrel limiti və JsonOptions.MaxDepth (default 64). Nəhəng və ya dərin iç-içə JSON CPU və yaddaşı tükəndirir.",
            "Təhlükəsizlik — OpenAPI production-da: MapOpenApi və UI-ni yalnız Development-də aç və ya auth arxasına qoy — sənəd bütün endpoint-lərin və modellərin xəritəsidir.",
            "Təhlükəsizlik — xətalar: handler-də tutulmayan istisna üçün AddProblemDetails + UseExceptionHandler. Results.Problem(detail: ex.Message) ilə daxili mesajı sızdırma.",
          ]},
          { t: "code", lang: "csharp", caption: "Qapalı qrup, validasiya, sahiblik və sürət limiti", code: `builder.Services.AddValidation();
builder.Services.AddProblemDetails();
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Admin", p => p.RequireRole("Admin"));

var app = builder.Build();
app.UseExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();

var api = app.MapGroup("/api/v1")
    .RequireAuthorization()                    // bütün qrup qapalıdır
    .RequireRateLimiting("umumi");

api.MapPost("/qeydler", async Task<Results<Created<QeydDto>, ValidationProblem>> (
    QeydYaratDto giris, ClaimsPrincipal user, QeydDb db, CancellationToken ct) =>
{
    int sahibId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);   // tokendən, gövdədən YOX

    var qeyd = new Qeyd { Metn = giris.Metn, SahibId = sahibId };
    db.Qeydler.Add(qeyd);
    await db.SaveChangesAsync(ct);

    return TypedResults.Created($"/api/v1/qeydler/{qeyd.Id}", new QeydDto(qeyd.Id, qeyd.Metn));
});

api.MapDelete("/qeydler/{id:int}", async Task<Results<NoContent, NotFound>> (
    int id, ClaimsPrincipal user, QeydDb db, CancellationToken ct) =>
{
    int sahibId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

    int silinen = await db.Qeydler
        .Where(q => q.Id == id && q.SahibId == sahibId)     // sahiblik sorğunun içində
        .ExecuteDeleteAsync(ct);

    return silinen > 0 ? TypedResults.NoContent() : TypedResults.NotFound();
});

api.MapDelete("/admin/qeydler", (QeydDb db, CancellationToken ct) =>
        db.Qeydler.ExecuteDeleteAsync(ct))
   .RequireAuthorization("Admin");

app.MapGet("/healthz", () => "ok").AllowAnonymous();        // açıq olan açıq şəkildə işarələnir

if (app.Environment.IsDevelopment())
    app.MapOpenApi().AllowAnonymous();

app.Run();

public record QeydYaratDto([Required, StringLength(2000, MinimumLength = 1)] string Metn);
public record QeydDto(int Id, string Metn);` },
          { t: "qa", items: [
            ["Minimal API nə vaxt, Controller nə vaxt?", "Minimal — kiçik xidmət, mikroservis, AOT, az mərasim. Controller — çox endpoint, zəngin filtrlər, MVC konvensiyaları, View-lar. İkisi bir tətbiqdə birlikdə işləyə bilər."],
            ["Parametrlər necə bağlanır?", "Route → query → başlıq (açıq atributla) → DI xidmətləri → gövdə (mürəkkəb tip). Xüsusi tiplər: HttpContext, ClaimsPrincipal, CancellationToken."],
            ["Results ilə TypedResults fərqi?", "Results IResult qaytarır (tip itir). TypedResults konkret tip qaytarır — OpenAPI metadata-sı avtomatik çıxır və test asanlaşır."],
            ["Minimal API-də validasiya necə edilir?", ".NET 10-da AddValidation() ilə DataAnnotations; əvvəlki versiyalarda endpoint filtri və ya FluentValidation."],
            ["Endpoint filtri nədir?", "Handler-in ətrafında işləyən kod: arqumentləri yoxlaya, nəticəni dəyişə və ya zənciri dayandıra bilər — MVC action filtrinin analoqu."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Minimal API-də record tipli parametr haradan dolur?", options: ["Query string", "JSON gövdə", "Cookie"], answer: 1, why: "Mürəkkəb tip default olaraq gövdədən oxunur." },
          { t: "quiz", q: "Ortaq prefiks və auth üçün nə işlədilir?", options: ["MapGroup", "MapFallback", "UseStaticFiles"], answer: 0, why: "MapGroup tənzimləmələri bütün qrupa tətbiq edir." },
          { t: "quiz", q: "404 qaytarmağın düzgün yolu?", options: ["return null", "Results.NotFound()", "throw new Exception()"], answer: 1, why: "null 404 vermir." },
        ],
      },
    ],
    exercise: {
      task: "Qeyd dəftəri API-sini Minimal API ilə, ayrıca faylda (genişlənmə metodu) yaz. 1) `MapQeydler(this IEndpointRouteBuilder app)` metodu `/api/qeydler` qrupunu qursun və bütün qrupa RequireAuthorization tətbiq etsin. 2) GET / — siyahı (sehife, olcu; olcu ≤ 50). 3) GET /{id:int} — TypedResults ilə Ok və ya NotFound (qaytarma tipi `Results<Ok<QeydDto>, NotFound>`). 4) POST / — `QeydYaratDto` (Metn: məcburi, ən çox 500 simvol) — 201. 5) DELETE /{id:int} — 204/404. 6) `IQeydXidmeti` DI-dan gəlsin, handler-lər static metod olsun. 7) Program.cs-də validasiyanı aç və metodu çağır.",
      starter: `public static class QeydEndpoints\n{\n    public static RouteGroupBuilder MapQeydler(this IEndpointRouteBuilder app)\n    {\n        var qrup = app.MapGroup("/api/qeydler");\n        // endpoint-lər\n        return qrup;\n    }\n}\n\npublic record QeydDto(int Id, string Metn);\npublic record QeydYaratDto(string Metn);\n\npublic interface IQeydXidmeti\n{\n    Task<List<QeydDto>> SiyahiAsync(int sehife, int olcu, CancellationToken ct);\n    Task<QeydDto?> TapAsync(int id, CancellationToken ct);\n    Task<QeydDto> YaratAsync(QeydYaratDto giris, CancellationToken ct);\n    Task<bool> SilAsync(int id, CancellationToken ct);\n}\n`,
      expect: "MapGroup + .RequireAuthorization() qrupda; handler-lər static async metodlardır, IQeydXidmeti və CancellationToken parametr kimi gəlir; olcu Math.Clamp ilə məhdudlaşır; Biri metodu Task<Results<Ok<QeydDto>, NotFound>> qaytarır və TypedResults işlədir; POST TypedResults.Created/CreatedAtRoute; DELETE NoContent/NotFound; QeydYaratDto-da [Required] və [StringLength(500)]; Program.cs-də builder.Services.AddValidation() (və ya endpoint filtri) və app.MapQeydler(); null qaytarmaqla 404 gözlənilmir.",
    },
  },
  {
    slug: "di",
    title: "Dependency Injection",
    intro: "Dependency Injection (DI, asılılığın yeridilməsi) — sinfin ehtiyacı olan obyektləri özü yaratmaması, kənardan almasıdır. ASP.NET Core-da DI konteyneri daxilidir: xidməti qeydiyyata alırsan, freymvork onu lazım olan yerə özü verir.",
    sections: [
      {
        level: "baslangic",
        title: "Qeydiyyat və istifadə",
        blocks: [
          { t: "analogy", text: "Aşpaz bazara özü getmir. Səhər mətbəxə gələndə ərzaq artıq yerindədir — təchizatçı gətirib. Aşpaz yalnız «mənə ət və düyü lazımdır» deyir. Sabah təchizatçı dəyişsə, aşpazın işi dəyişmir. DI konteyneri həmin təchizatçıdır." },
          { t: "code", lang: "csharp", code: `// 1) Müqavilə
public interface ISalamXidmeti
{
    string Salamla(string ad);
}

// 2) Reallaşma
public class SalamXidmeti : ISalamXidmeti
{
    public string Salamla(string ad) => $"Salam, {ad}!";
}

// 3) Qeydiyyat (Program.cs)
builder.Services.AddScoped<ISalamXidmeti, SalamXidmeti>();

// 4) İstifadə — konteyner özü verir
app.MapGet("/salam/{ad}", (string ad, ISalamXidmeti xidmet) => xidmet.Salamla(ad));

// Controller-də: konstruktordan
public class SalamController(ISalamXidmeti xidmet) : ControllerBase
{
    [HttpGet("/salam2/{ad}")]
    public string Al(string ad) => xidmet.Salamla(ad);
}` },
          { t: "terms", items: [
            ["asılılıq (dependency)", "sinfin işləməsi üçün lazım olan başqa obyekt."],
            ["DI konteyneri", "xidmətləri yaradan, saxlayan və paylayan mexanizm."],
            ["qeydiyyat", "«bu interfeys istənəndə bu sinfi ver» qaydası."],
            ["konstruktor inyeksiyası", "asılılığın konstruktor parametri kimi alınması."],
            ["xidmət (service)", "konteynerdə qeydiyyatda olan hər hansı sinif."],
          ]},
          { t: "tip", text: "Sinfin içində `new XidmetAdi()` yazdığını görürsənsə, dayan: bəlkə onu konstruktordan almaq lazımdır. new yalnız sadə məlumat obyektləri (DTO, record) üçündür." },
        ],
      },
      {
        level: "orta",
        title: "Ömürlər: Transient, Scoped, Singleton",
        blocks: [
          { t: "code", lang: "csharp", code: `builder.Services.AddTransient<IEmailQurucu, EmailQurucu>();     // hər istəkdə YENİ obyekt
builder.Services.AddScoped<ISifarisXidmeti, SifarisXidmeti>();   // hər HTTP sorğusuna BİR obyekt
builder.Services.AddSingleton<IKes, YaddasKesi>();               // bütün tətbiqə BİR obyekt

// DbContext default olaraq Scoped-dur
builder.Services.AddDbContext<MagazaDb>(o => o.UseSqlServer(baglanti));

// HttpClient: düzgün yol — fabrik
builder.Services.AddHttpClient<IValyutaXidmeti, ValyutaXidmeti>(c =>
{
    c.BaseAddress = new Uri("https://api.valyuta.example/");
    c.Timeout = TimeSpan.FromSeconds(5);
});

// Fabrik ilə qeydiyyat
builder.Services.AddSingleton<IVaxt>(_ => new SistemVaxti());

// Bir interfeysin bir neçə reallaşması
builder.Services.AddScoped<IBildirisci, EmailBildirisci>();
builder.Services.AddScoped<IBildirisci, SmsBildirisci>();
// IEnumerable<IBildirisci> istəsən — hər ikisi gəlir

// Açarlı xidmət
builder.Services.AddKeyedScoped<IOdenis, KartOdenisi>("kart");
builder.Services.AddKeyedScoped<IOdenis, NagdOdenis>("nagd");

app.MapPost("/ode", ([FromKeyedServices("kart")] IOdenis odenis) => odenis.Icra());` },
          { t: "list", items: [
            "Transient — yüngül, vəziyyətsiz köməkçilər üçün.",
            "Scoped — bir sorğu daxilində paylaşılan: DbContext, cari istifadəçi, Unit of Work. Ən çox işlənən.",
            "Singleton — bahalı qurulan və ya ümumi vəziyyətli: keş, konfiqurasiya, HttpClient fabriki. Axın-təhlükəsiz (thread-safe) olmalıdır.",
            "Qayda: xidmət yalnız özü ilə eyni və ya daha uzunömürlü xidmətdən asılı ola bilər. Singleton → Scoped olmaz.",
          ]},
          { t: "mistake", lang: "csharp", wrong: `builder.Services.AddSingleton<IHesabatXidmeti, HesabatXidmeti>();

public class HesabatXidmeti(MagazaDb db) : IHesabatXidmeti { }   // Scoped DbContext singleton-da ilişdi`, right: `builder.Services.AddScoped<IHesabatXidmeti, HesabatXidmeti>();

// Singleton həqiqətən lazımdırsa — hər iş üçün öz scope-unu yarat
public class Temizleyici(IServiceScopeFactory fabrik)
{
    public async Task IsleAsync(CancellationToken ct)
    {
        await using var scope = fabrik.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<MagazaDb>();
        // ...
    }
}`, why: "«Əsir asılılıq» (captive dependency): singleton-un tutduğu DbContext də əbədi yaşayır. DbContext axın-təhlükəsiz deyil — paralel sorğular onu sındırır, köhnə məlumat qalır. Development-də ValidateScopes bunu başlanğıcda tutur." },
          { t: "mistake", lang: "csharp", wrong: `public class SifarisController : ControllerBase
{
    private readonly SifarisXidmeti _xidmet = new SifarisXidmeti(new SqlAnbar("Server=..."));
}`, right: `public class SifarisController(ISifarisXidmeti xidmet) : ControllerBase { }`, why: "Əl ilə new: testdə əvəz etmək olmur, bağlantı sətri koda yazılıb, ömür idarə olunmur. Asılılığı interfeys kimi konstruktordan al." },
          { t: "mistake", lang: "csharp", wrong: `public class ValyutaXidmeti
{
    public async Task<string> Al()
    {
        using var http = new HttpClient();        // hər çağırışda yeni
        return await http.GetStringAsync("https://...");
    }
}`, right: `public class ValyutaXidmeti(HttpClient http) : IValyutaXidmeti
{
    public Task<string> Al(CancellationToken ct) => http.GetStringAsync("mezenne", ct);
}
// Qeydiyyat: builder.Services.AddHttpClient<IValyutaXidmeti, ValyutaXidmeti>(...)`, why: "Hər dəfə new HttpClient soketləri tükəndirir (socket exhaustion). IHttpClientFactory bağlantıları hovuzda saxlayır və DNS dəyişikliklərini izləyir." },
        ],
      },
      {
        level: "senior",
        title: "Konteynerin daxili işi, tələlər və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Konteyner iki hissədir: IServiceCollection (qeydiyyat siyahısı) və IServiceProvider (Build-dən sonra həll edən). Kök provayder singleton-ları, hər sorğunun scope-u isə scoped xidmətləri saxlayır və sorğu bitəndə onları Dispose edir.",
            "Konteyner yaratdığı IDisposable/IAsyncDisposable obyektləri özü bağlayır. Transient IDisposable-ı kök provayderdən həll etmə — tətbiq bağlanana qədər yaddaşda qalır (sızma).",
            "ValidateScopes və ValidateOnBuild Development-də default açıqdır: əsir asılılığı və həll oluna bilməyən qeydiyyatı başlanğıcda tutur. Bunu production-a yaxın mühitdə (CI testi) də işlət.",
            "Service Locator anti-pattern-i: sinfə IServiceProvider verib içində GetService çağırmaq asılılıqları gizlədir. İstisna: fabriklər, middleware, fon xidmətləri (scope yaratmaq üçün).",
            "Eyni interfeys iki dəfə qeydiyyatdan keçsə, tək istəkdə SONUNCU gəlir; IEnumerable<T> hamısını verir. TryAdd... yalnız yoxdursa əlavə edir — kitabxana kodunda işlət.",
            "Decorator: daxili konteynerdə hazır dəstək yoxdur — fabriklə əl ilə və ya Scrutor paketi (Decorate<,>) ilə. Scrutor həm də assembly skanı ilə avtomatik qeydiyyat verir.",
            "Options pattern: konfiqurasiyanı IOptions<T> (singleton), IOptionsSnapshot<T> (scoped, sorğu başına yenilənir), IOptionsMonitor<T> (dəyişikliyə reaksiya) ilə al. Singleton-a IOptionsSnapshot vermə.",
            "Fon xidməti (BackgroundService) singleton-dur: scoped xidmət lazımdırsa IServiceScopeFactory ilə hər iterasiyada scope yarat.",
            "Performans: həll (resolve) ucuzdur, amma dərin asılılıq ağacı və çoxlu transient isti yolda ayırma yaradır. Konstruktorda iş görmə (I/O, hesablama) — konstruktor yalnız mənimsətsin.",
            "Təhlükəsizlik — singleton-da istifadəçi vəziyyəti: singleton xidmətin sahəsində «cari istifadəçi», «cari sifariş» saxlasan, paralel sorğular bir-birinin məlumatını görər (məlumat sızması, yarış). İstifadəçi konteksti yalnız scoped xidmətdə və ya IHttpContextAccessor vasitəsilə.",
            "Təhlükəsizlik — cari istifadəçi abstraksiyası: istifadəçi id-sini hər yerdə parametr kimi gəzdirmək əvəzinə scoped ICariIstifadeci qur — o, id-ni yalnız təsdiqlənmiş tokendən (HttpContext.User) oxusun. Gövdədən və ya başlıqdan gələn id-yə etibar etmə.",
            "Təhlükəsizlik — sirlər DI-da: API açarını sətir kimi yox, IOptions<T> ilə ver; açar loga və istisna mətninə düşməsin. Options sinfinə ToString yazma ki, sirr çap olunmasın.",
            "Təhlükəsizlik — HttpClient: adlı/tipli müştəriyə Timeout, BaseAddress və davamlılıq siyasəti (AddStandardResilienceHandler) ver. İstifadəçidən gələn URL-ə sorğu göndərən xidmətdə host-u ağ siyahı ilə yoxla (SSRF).",
            "Təhlükəsizlik — tipi istifadəçi seçməsin: provider.GetService(Type.GetType(sorğudanGələnAd)) — ixtiyari xidmətin yaradılmasına aparır. Seçim lazımdırsa, keyed services və ağ siyahı.",
            "Təhlükəsizlik — default-ları əvəz etmək: testdə xidməti saxta ilə əvəz etmək rahatdır, amma «test rejimi» bayrağı ilə production-da auth-u söndürən qeydiyyat saxlamaq arxa qapıdır. Mühitə görə fərqlənən təhlükəsizlik qeydiyyatlarını minimuma endir.",
          ]},
          { t: "code", lang: "csharp", caption: "Təhlükəsiz «cari istifadəçi» və fon xidmətində scope", code: `public interface ICariIstifadeci
{
    int Id { get; }
    bool AdmindirMi { get; }
}

// Scoped: yalnız təsdiqlənmiş tokendən oxuyur
public sealed class CariIstifadeci(IHttpContextAccessor accessor) : ICariIstifadeci
{
    private ClaimsPrincipal User =>
        accessor.HttpContext?.User ?? throw new InvalidOperationException("HTTP konteksti yoxdur");

    public int Id =>
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int id)
            ? id
            : throw new UnauthorizedAccessException();

    public bool AdmindirMi => User.IsInRole("Admin");
}

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICariIstifadeci, CariIstifadeci>();

// Xidmət: sahiblik filtri həmişə tətbiq olunur
public class SifarisXidmeti(MagazaDb db, ICariIstifadeci istifadeci) : ISifarisXidmeti
{
    public Task<List<SifarisDto>> MenimkilerAsync(CancellationToken ct) =>
        db.Sifarisler
          .Where(s => s.IstifadeciId == istifadeci.Id)
          .Select(s => new SifarisDto(s.Id, s.Tarix, s.Mebleg))
          .ToListAsync(ct);
}

// Fon xidməti (singleton) — hər dövrədə öz scope-u
public class KohneSessiyaTemizleyici(IServiceScopeFactory fabrik, ILogger<KohneSessiyaTemizleyici> log)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        using var taymer = new PeriodicTimer(TimeSpan.FromMinutes(10));
        while (await taymer.WaitForNextTickAsync(ct))
        {
            try
            {
                await using var scope = fabrik.CreateAsyncScope();
                var db = scope.ServiceProvider.GetRequiredService<MagazaDb>();
                int say = await db.Sessiyalar.Where(s => s.Bitme < DateTime.UtcNow).ExecuteDeleteAsync(ct);
                log.LogInformation("{Say} köhnə sessiya silindi", say);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                log.LogError(ex, "Təmizləmə uğursuz oldu");      // fon xidməti səssiz ölməsin
            }
        }
    }
}` },
          { t: "qa", items: [
            ["DI nədir və nə verir?", "Sinif asılılıqlarını özü yaratmır, kənardan alır. Nəticə: zəif bağlılıq, asan test (saxta ilə əvəz), mərkəzi ömür idarəsi."],
            ["Transient, Scoped, Singleton fərqi?", "Transient — hər istəkdə yeni; Scoped — bir sorğu (scope) daxilində bir; Singleton — tətbiq boyu bir."],
            ["Captive dependency nədir?", "Uzunömürlü xidmətin (singleton) qısaömürlü xidməti (scoped) tutub onun ömrünü uzatması. Axın xətaları və köhnə məlumat yaradır."],
            ["Singleton-da DbContext lazımdırsa?", "IServiceScopeFactory ilə scope yaradıb oradan həll edirəm, ya da IDbContextFactory işlədirəm."],
            ["Niyə new HttpClient() pisdir?", "Soket tükənməsi və köhnəlmiş DNS. IHttpClientFactory handler-ləri hovuzda saxlayır."],
            ["Service Locator niyə anti-pattern-dir?", "Asılılıqlar imzada görünmür, test çətinləşir, xətalar kompilyasiyada yox, icrada üzə çıxır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hər HTTP sorğusuna bir obyekt verən ömür?", options: ["Transient", "Scoped", "Singleton"], answer: 1, why: "Scoped — sorğu başına bir nüsxə." },
          { t: "quiz", q: "DbContext default olaraq hansı ömürdədir?", options: ["Singleton", "Scoped", "Transient"], answer: 1, why: "AddDbContext Scoped qeydiyyat edir." },
          { t: "quiz", q: "Asılılığı almağın tövsiyə olunan yolu?", options: ["Sinifdə new ilə", "Konstruktor parametri", "static sahə"], answer: 1, why: "Konstruktor inyeksiyası asılılığı aydın və əvəz edilə bilən edir." },
        ],
      },
    ],
    exercise: {
      task: "Bildiriş sistemi qur. 1) `IBildirisci` interfeysi (`Task GonderAsync(string kime, string metn, CancellationToken ct)`) və iki reallaşma: `EmailBildirisci`, `SmsBildirisci` (konsola/loga yazsın). 2) `IVaxt` interfeysi (`DateTime Indi`) və `SistemVaxti` — Singleton. 3) `BildirisXidmeti` konstruktordan `IEnumerable<IBildirisci>` və `IVaxt` alsın; `HamiyaGonderAsync` bütün kanallara göndərsin və mətnə vaxtı əlavə etsin. 4) Hamısını düzgün ömürlə qeydiyyata al (səbəbini şərhdə yaz). 5) POST /bildir endpoint-i xidməti DI-dan alıb çağırsın. 6) Şərhdə izah et: `BildirisXidmeti`-ni Singleton etsən və o, DbContext-dən asılı olsa, nə baş verər?",
      starter: `var builder = WebApplication.CreateBuilder(args);\n\n// qeydiyyat\n\nvar app = builder.Build();\n\n// endpoint\n\napp.Run();\n\npublic interface IBildirisci\n{\n    Task GonderAsync(string kime, string metn, CancellationToken ct);\n}\n\npublic interface IVaxt { DateTime Indi { get; } }\n\npublic record BildirisSorgusu(string Kime, string Metn);\n`,
      expect: "İki IBildirisci reallaşması AddScoped/AddTransient ilə ayrıca qeydiyyatda (ikisi də); IVaxt AddSingleton (vəziyyətsiz, axın-təhlükəsiz); BildirisXidmeti AddScoped, konstruktorda IEnumerable<IBildirisci> və IVaxt, foreach ilə hər kanala await GonderAsync; endpoint-də xidmət parametr kimi gəlir (new ilə yaradılmır, IServiceProvider.GetService yoxdur); CancellationToken ötürülür; şərhdə captive dependency izah olunub: DbContext singleton-da ilişir, axın-təhlükəsiz deyil, ValidateScopes xəta verir.",
    },
  },
  {
    slug: "model-binding",
    title: "Model binding və validasiya",
    intro: "Model binding — sorğudakı məlumatı (URL, query, gövdə, başlıq) C# obyektinə çevirir. Validasiya isə həmin məlumatın qaydalara uyğun olduğunu yoxlayır: ad boş deyil, email düzgündür, qiymət müsbətdir.",
    sections: [
      {
        level: "baslangic",
        title: "Sorğudan obyektə",
        blocks: [
          { t: "analogy", text: "Poliklinikada qeydiyyat pəncərəsi: sən blankı doldurursan (sorğu), işçi onu kompüterə köçürür (binding) və yoxlayır — doğum tarixi yazılıb? Telefon nömrəsi düzgündür? (validasiya). Səhv varsa, blankı geri qaytarır və harada səhv olduğunu deyir. Həkimin (kodun) yanına yalnız düzgün blank çatır." },
          { t: "code", lang: "csharp", code: `public class QeydiyyatDto
{
    [Required(ErrorMessage = "Ad məcburidir")]
    [StringLength(50, MinimumLength = 2)]
    public string Ad { get; set; } = "";

    [Required, EmailAddress]
    public string Email { get; set; } = "";

    [Range(16, 100, ErrorMessage = "Yaş 16–100 aralığında olmalıdır")]
    public int Yas { get; set; }

    [Required, MinLength(8)]
    public string Parol { get; set; } = "";
}

[ApiController]
[Route("api/qeydiyyat")]
public class QeydiyyatController : ControllerBase
{
    [HttpPost]
    public IActionResult Yarat(QeydiyyatDto giris)
    {
        // Bura çatıbsa — giriş artıq düzgündür.
        // Səhv olsaydı, [ApiController] avtomatik 400 qaytarardı.
        return Ok($"Xoş gəldin, {giris.Ad}!");
    }
}` },
          { t: "code", lang: "json", caption: "Səhv girişə avtomatik cavab (400)", code: `{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Email": ["The Email field is not a valid e-mail address."],
    "Yas": ["Yaş 16–100 aralığında olmalıdır"]
  }
}` },
          { t: "terms", items: [
            ["model binding", "sorğu məlumatının action parametrlərinə və obyektlərə avtomatik çevrilməsi."],
            ["validasiya", "məlumatın qaydalara uyğunluğunun yoxlanması."],
            ["DataAnnotations", "validasiya atributları: [Required], [Range], [EmailAddress]..."],
            ["ModelState", "binding və validasiyanın nəticəsi: xətalar siyahısı."],
            ["DTO", "API-nin qəbul etdiyi və ya qaytardığı məlumat forması."],
          ]},
          { t: "tip", text: "Brauzerdəki (front-end) yoxlama rahatlıq üçündür, təhlükəsizlik üçün yox — onu keçmək 5 saniyəlik işdir. Serverdə validasiya həmişə olmalıdır." },
        ],
      },
      {
        level: "orta",
        title: "Mənbələr, öz qaydaların və FluentValidation",
        blocks: [
          { t: "code", lang: "csharp", code: `[HttpPut("{id:int}")]
public IActionResult Yenile(
    [FromRoute] int id,                              // /api/mehsullar/5
    [FromQuery] bool bildir,                         // ?bildir=true
    [FromHeader(Name = "X-Sorgu-Id")] string? sorguId,
    [FromBody] MehsulYenileDto giris)                // JSON gövdə
{
    return NoContent();
}

// Record ilə: atribut konstruktor parametrində
public record MehsulYenileDto(
    [Required, StringLength(100)] string Ad,
    [Range(0.01, 1_000_000)] decimal Qiymet,
    [Url] string? SekilUnvani,
    [RegularExpression(@"^[A-Z]{3}-\\d{4}$", ErrorMessage = "Kod formatı: ABC-1234")] string Kod);

// Öz atributun
public class GelecekTarixAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext context) =>
        value is DateTime tarix && tarix > DateTime.UtcNow
            ? ValidationResult.Success
            : new ValidationResult("Tarix gələcəkdə olmalıdır");
}

// Sahələrarası qayda
public class RezervDto : IValidatableObject
{
    [GelecekTarix] public DateTime Baslama { get; set; }
    public DateTime Bitme { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext context)
    {
        if (Bitme <= Baslama)
            yield return new ValidationResult("Bitmə başlamadan sonra olmalıdır", [nameof(Bitme)]);
    }
}` },
          { t: "code", lang: "csharp", caption: "FluentValidation: qaydalar ayrıca sinifdə", code: `public class SifarisYaratValidator : AbstractValidator<SifarisYaratDto>
{
    public SifarisYaratValidator()
    {
        RuleFor(x => x.Unvan).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Setirler).NotEmpty().WithMessage("Ən azı bir məhsul olmalıdır");
        RuleFor(x => x.Setirler.Count).LessThanOrEqualTo(100);
        RuleForEach(x => x.Setirler).ChildRules(s =>
        {
            s.RuleFor(y => y.MehsulId).GreaterThan(0);
            s.RuleFor(y => y.Say).InclusiveBetween(1, 1000);
        });
    }
}

// Qeydiyyat və istifadə
builder.Services.AddValidatorsFromAssemblyContaining<SifarisYaratValidator>();

app.MapPost("/sifarisler", async (SifarisYaratDto giris, IValidator<SifarisYaratDto> validator) =>
{
    var netice = await validator.ValidateAsync(giris);
    if (!netice.IsValid) return Results.ValidationProblem(netice.ToDictionary());
    // ...
    return Results.Created();
});` },
          { t: "mistake", lang: "csharp", wrong: `public class MehsulDto
{
    [Required]
    public int Say { get; set; }          // göndərilməsə 0 olur — [Required] keçir
    public decimal Qiymet { get; set; }   // göndərilməsə 0
}`, right: `public class MehsulDto
{
    [Required]
    public int? Say { get; set; }         // göndərilməsə null → xəta
    [Range(0.01, 1_000_000)]
    public decimal Qiymet { get; set; }
}`, why: "Dəyər tipi (int, decimal, bool) heç vaxt null olmur — göndərilməyən sahə 0/false alır və [Required] onu «doludur» sayır. Məcburilik üçün nullable tip və ya [Range] işlət." },
          { t: "mistake", lang: "csharp", wrong: `[HttpPost]
public IActionResult Yarat(Istifadeci istifadeci)     // baza varlığı birbaşa
{
    _db.Istifadeciler.Add(istifadeci);
    _db.SaveChanges();
    return Ok();
}
// Göndərilən: { "ad": "Ali", "email": "a@b.az", "rol": "Admin", "balans": 999999 }`, right: `public record QeydiyyatDto([Required] string Ad, [Required, EmailAddress] string Email);

[HttpPost]
public IActionResult Yarat(QeydiyyatDto giris)
{
    var istifadeci = new Istifadeci { Ad = giris.Ad, Email = giris.Email, Rol = "Istifadeci" };
    // ...
}`, why: "Over-posting (mass assignment): binding JSON-dakı hər uyğun sahəni doldurur. Hücumçu Rol və Balans əlavə edir. Yalnız icazəli sahələri olan giriş DTO-su işlət, qalanını serverdə təyin et." },
          { t: "mistake", lang: "csharp", wrong: `[HttpPost]                                    // [ApiController] yoxdur
public IActionResult Yarat(MehsulDto giris)
{
    _xidmet.Yarat(giris);                     // ModelState yoxlanmayıb
    return Ok();
}`, right: `[HttpPost]
public IActionResult Yarat(MehsulDto giris)
{
    if (!ModelState.IsValid) return ValidationProblem(ModelState);
    _xidmet.Yarat(giris);
    return Ok();
}`, why: "[ApiController] olmadan (MVC controller-lərində) atributlar özü heç nəyi dayandırmır — ModelState.IsValid-i əl ilə yoxlamalısan." },
        ],
      },
      {
        level: "senior",
        title: "Binding-in dərinliyi, validasiya qatları və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "MVC binding zənciri: dəyər provayderləri (form → route → query) → model binder-lər → validasiya. Gövdə isə giriş formatlayıcısı (System.Text.Json) ilə oxunur və sorğu başına yalnız BİR [FromBody] parametri ola bilər.",
            "JSON xətaları: səhv tip («yas»: «on») deserializasiyanı sındırır və ModelState-ə texniki mesaj düşür. Naməlum sahələr default olaraq səssizcə atılır; sərt rejim üçün JsonUnmappedMemberHandling.Disallow.",
            "İki validasiya qatı var: giriş validasiyası (format, uzunluq, aralıq — DTO səviyyəsində, 400) və biznes qaydaları (stokda varmı, email unikaldırmı — xidmət/domen səviyyəsində, 409/422). Baza sorğusu tələb edən yoxlamanı atributa yazma.",
            "Domen özünü qorumalıdır: DTO validasiyası keçilsə belə (başqa giriş nöqtəsi, fon işi), varlıq yanlış vəziyyətə düşməməlidir — konstruktor/metodlarda invariant yoxlaması.",
            "Xəta formatı: ValidationProblemDetails (RFC 9457). Mesajları lokallaşdırmaq üçün resurs faylları və ya FluentValidation dil dəstəyi. Sahə adlarını JSON adlandırması ilə (camelCase) uyğunlaşdır.",
            "Xüsusi tiplərin bağlanması: Minimal API-də static TryParse / BindAsync; MVC-də IModelBinder. Güclü tipli id-lər (MehsulId) üçün faydalıdır.",
            "PATCH: JSON Patch (application/json-patch+json) və ya nullable sahəli «qismən DTO». JSON Patch-də hansı yolların dəyişdirilə biləcəyini məhdudlaşdır.",
            "Təhlükəsizlik — validasiya ilk müdafiə xəttidir, yeganə yox: injection-a qarşı parametrləşdirilmiş sorğu, XSS-ə qarşı çıxışın kodlaşdırılması (encoding) lazımdır. «Təhlükəli simvolları silmək» (qara siyahı) etibarsızdır — ağ siyahı ilə yoxla: tip, uzunluq, format, aralıq.",
            "Təhlükəsizlik — over-posting: yuxarıdakı kimi dar giriş DTO-su. [Bind] və [BindNever] zəif həlldir — yeni sahə əlavə olunanda unudulur.",
            "Təhlükəsizlik — ölçü limitləri (DoS): hər sətrə [StringLength]/[MaxLength], hər kolleksiyaya [MaxLength] və ya element sayı limiti, gövdəyə [RequestSizeLimit], JSON dərinliyinə MaxDepth, form-a FormOptions (ValueCountLimit, MultipartBodyLengthLimit). Limitsiz siyahı ilə bir sorğu min baza əməliyyatı tətikləyə bilər.",
            "Təhlükəsizlik — ReDoS: [RegularExpression] və öz Regex-lərin pis nümunədə (iç-içə kvantorlar: (a+)+$) eksponensial vaxt aparır — bir sorğu CPU-nu dondurur. Regex-ə vaxt limiti ver (matchTimeout), RegexOptions.NonBacktracking işlət, girişin uzunluğunu əvvəlcə məhdudlaşdır.",
            "Təhlükəsizlik — identifikatorlar gövdədən gəlməsin: IstifadeciId, SahibId, Qiymet, Endirim, Rol kimi sahələri müştəridən qəbul etmə. İstifadəçi tokendən, qiymət bazadan götürülür. Müştərinin göndərdiyi «cəm» heç vaxt etibarlı deyil.",
            "Təhlükəsizlik — fayl yükləmə: Content-Type və fayl adı müştərinin nəzarətindədir. Ölçünü, uzantını (ağ siyahı) və faylın həqiqi imzasını (magic bytes) yoxla; faylı yeni təsadüfi adla, veb kökündən kənarda saxla; şəkilləri yenidən kodlaşdır.",
            "Təhlükəsizlik — xəta mesajları: validasiya cavabında daxili sinif/sütun adlarını, SQL və ya istisna mətnini qaytarma. «Bu email artıq qeydiyyatdadır» mesajı hesab sadalamasına imkan verir — qeydiyyatda neytral cavab + email ilə təsdiq.",
            "Təhlükəsizlik — normallaşdırma: müqayisədən əvvəl girişi normallaşdır (Trim, email-i kiçik hərfə, Unicode NFKC). Əks halda «Admin» və «admin », oxşar görünən Unicode hərfləri ilə təkrar hesab yaradılır.",
          ]},
          { t: "code", lang: "csharp", caption: "Sərt, məhdud və təhlükəsiz giriş", code: `// JSON: naməlum sahə → 400, dərinlik məhdud
builder.Services.ConfigureHttpJsonOptions(o =>
{
    o.SerializerOptions.UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow;
    o.SerializerOptions.MaxDepth = 16;
});

public partial record SifarisYaratDto(
    [Required, StringLength(200, MinimumLength = 5)] string Unvan,
    [Required, MinLength(1), MaxLength(100)] List<SifarisSetriDto> Setirler,
    [StringLength(20)] string? KuponKodu)
{
    // Vaxt limitli, geri izləməsiz regex — ReDoS-a davamlı
    [GeneratedRegex(@"^[A-Z0-9]{4,20}$", RegexOptions.NonBacktracking, matchTimeoutMilliseconds: 100)]
    public static partial Regex KuponFormati();
}

public record SifarisSetriDto(
    [Range(1, int.MaxValue)] int MehsulId,
    [Range(1, 1000)] int Say);          // Qiymet YOXDUR — bazadan götürülür

app.MapPost("/api/sifarisler", async Task<Results<Created<SifarisDto>, ValidationProblem, Conflict<string>>> (
    SifarisYaratDto giris, ICariIstifadeci istifadeci, MagazaDb db, CancellationToken ct) =>
{
    // 1) Format validasiyası (AddValidation atributları artıq yoxlayıb) + əlavə qayda
    if (giris.KuponKodu is { } kod && !SifarisYaratDto.KuponFormati().IsMatch(kod))
        return TypedResults.ValidationProblem(new Dictionary<string, string[]>
        {
            ["kuponKodu"] = ["Kupon formatı yanlışdır"],
        });

    // 2) Biznes qaydası: qiymət və stok serverdən
    var idler = giris.Setirler.Select(s => s.MehsulId).Distinct().ToList();
    var mehsullar = await db.Mehsullar.Where(m => idler.Contains(m.Id)).ToDictionaryAsync(m => m.Id, ct);

    if (mehsullar.Count != idler.Count)
        return TypedResults.Conflict("Bəzi məhsullar mövcud deyil");

    decimal cem = giris.Setirler.Sum(s => mehsullar[s.MehsulId].Qiymet * s.Say);   // müştərinin «cəm»i yox

    var sifaris = new Sifaris
    {
        IstifadeciId = istifadeci.Id,          // tokendən
        Unvan = giris.Unvan.Trim(),
        Mebleg = cem,
    };
    db.Sifarisler.Add(sifaris);
    await db.SaveChangesAsync(ct);

    return TypedResults.Created($"/api/sifarisler/{sifaris.Id}", new SifarisDto(sifaris.Id, sifaris.Tarix, cem));
})
.RequireAuthorization()
.WithMetadata(new RequestSizeLimitAttribute(64 * 1024));     // 64 KB` },
          { t: "qa", items: [
            ["Model binding nədir?", "Sorğunun route, query, başlıq, form və gövdə məlumatının action parametrlərinə və model obyektlərinə çevrilməsi."],
            ["[FromBody] ilə [FromQuery] fərqi?", "FromBody gövdəni (JSON) formatlayıcı ilə oxuyur — sorğuda bir dəfə. FromQuery URL-dəki ?açar=dəyər cütlərindən oxuyur."],
            ["[ApiController] validasiyada nə edir?", "ModelState səhvdirsə, action-a çatmadan avtomatik 400 ValidationProblemDetails qaytarır."],
            ["Niyə [Required] int üçün işləmir?", "int null ola bilmir; göndərilməyəndə 0 olur. int? və ya [Range] lazımdır."],
            ["Giriş validasiyası ilə biznes validasiyasının fərqi?", "Giriş — format və aralıq, DTO səviyyəsində, 400. Biznes — sistemin vəziyyətinə bağlı qaydalar, xidmət/domen səviyyəsində, 409/422."],
            ["Over-posting-in qarşısını necə alırsan?", "Entity yox, yalnız icazəli sahələri olan giriş DTO-su; həssas sahələri (rol, sahib, qiymət) serverdə təyin edirəm."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Sahənin məcburi olduğunu bildirən atribut?", options: ["[Required]", "[Range]", "[Route]"], answer: 0, why: "[Required] boş dəyəri rədd edir." },
          { t: "quiz", q: "Validasiya səhvində hansı status qayıdır?", options: ["200", "400", "500"], answer: 1, why: "Müştərinin səhvi — 400 Bad Request." },
          { t: "quiz", q: "Validasiya harada mütləq olmalıdır?", options: ["Yalnız brauzerdə", "Serverdə", "Heç birində"], answer: 1, why: "Brauzer yoxlaması asanlıqla keçilir." },
        ],
      },
    ],
    exercise: {
      task: "Tədbirə qeydiyyat üçün giriş modeli və endpoint yaz. 1) `TedbirQeydiyyatDto`: Ad (məcburi, 2–60), Email (məcburi, düzgün format), Telefon (ixtiyari, format +994XXXXXXXXX), Yas (məcburi, 18–99 — göndərilməsə xəta versin), QonaqSayi (0–5), Baslama və Bitme tarixləri. 2) Öz atributun `[GelecekTarix]` — Baslama gələcəkdə olmalıdır. 3) `IValidatableObject` ilə: Bitme > Baslama. 4) POST api/tedbirler/qeydiyyat — [ApiController] ilə, uğurda 201. 5) Modeldə `Rol` və ya `Tesdiqlenib` kimi sahə OLMASIN — şərhdə niyəsini yaz. 6) Telefon regex-inə vaxt limiti ver və ya sadə, geri izləməsiz nümunə işlət.",
      starter: `public class TedbirQeydiyyatDto\n{\n    // sahələr və atributlar\n}\n\npublic class GelecekTarixAttribute : ValidationAttribute\n{\n    // IsValid\n}\n\n[ApiController]\n[Route("api/tedbirler")]\npublic class TedbirlerController : ControllerBase\n{\n    // POST qeydiyyat\n}\n`,
      expect: "Ad [Required, StringLength(60, MinimumLength = 2)]; Email [Required, EmailAddress]; Telefon [RegularExpression(^\\+994\\d{9}$)] nullable; Yas int? + [Required, Range(18, 99)] (və ya eyni effekt); QonaqSayi [Range(0, 5)]; GelecekTarixAttribute IsValid-də tarix > UtcNow yoxlayır; DTO IValidatableObject reallaşdırır və Bitme <= Baslama olanda ValidationResult qaytarır; action [HttpPost(\"qeydiyyat\")], ModelState əl ilə yoxlanmır ([ApiController] edir), 201 qaytarır; Rol/Tesdiqlenib sahəsi yoxdur və şərhdə over-posting izah olunub; regex sadədir (iç-içə kvantor yox) və ya timeout var.",
    },
  },
  {
    slug: "mvc",
    title: "MVC və Razor Views",
    intro: "MVC (Model–View–Controller) — serverdə HTML səhifə quran tətbiqlərin qəlibidir. Model məlumatdır, View onu HTML-ə çevirən şablondur (Razor), Controller isə ikisini birləşdirir.",
    sections: [
      {
        level: "baslangic",
        title: "Üç hissə: Model, View, Controller",
        blocks: [
          { t: "analogy", text: "Restoran: mətbəx — Model (ərzaq və reseptlər), boşqabdakı təqdimat — View (necə görünür), ofisiant — Controller (sifarişi alır, mətbəxdən yeməyi götürür, masaya çatdırır). Aşpaz masaya çıxmır, ofisiant yemək bişirmir — hərə öz işini görür." },
          { t: "code", lang: "csharp", caption: "Controllers/KurslarController.cs", code: `public class KurslarController : Controller
{
    private static readonly List<Kurs> _kurslar =
    [
        new(1, "HTML", 20),
        new(2, "C#", 80),
    ];

    // GET /Kurslar
    public IActionResult Index() => View(_kurslar);          // Views/Kurslar/Index.cshtml

    // GET /Kurslar/Etrafli/2
    public IActionResult Etrafli(int id)
    {
        var kurs = _kurslar.FirstOrDefault(k => k.Id == id);
        return kurs is null ? NotFound() : View(kurs);
    }
}

public record Kurs(int Id, string Ad, int Saat);` },
          { t: "code", lang: "html", caption: "Views/Kurslar/Index.cshtml", code: `@model List<Kurs>
@{
    ViewData["Title"] = "Kurslar";
}

<h1>Kurslar (@Model.Count)</h1>

<ul>
    @foreach (var kurs in Model)
    {
        <li>
            <a asp-action="Etrafli" asp-route-id="@kurs.Id">@kurs.Ad</a>
            — @kurs.Saat saat
        </li>
    }
</ul>

@if (Model.Count == 0)
{
    <p>Hələ kurs yoxdur.</p>
}` },
          { t: "code", lang: "csharp", caption: "Program.cs", code: `builder.Services.AddControllersWithViews();
// ...
app.UseStaticFiles();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");` },
          { t: "terms", items: [
            ["Model", "məlumat və onun qaydaları."],
            ["View", "HTML şablonu (.cshtml faylı)."],
            ["Razor", "HTML içində C# yazmaq sintaksisi: @ işarəsi ilə başlayır."],
            ["@model", "View-un hansı tipli məlumat gözlədiyini bildirir."],
            ["Tag Helper", "HTML teqinə server davranışı verən atribut: asp-action, asp-for."],
          ]},
          { t: "tip", text: "View faylı konvensiya ilə tapılır: KurslarController.Index() → Views/Kurslar/Index.cshtml. Adlar uyğun gəlməsə «view tapılmadı» xətası alarsan." },
        ],
      },
      {
        level: "orta",
        title: "Layout, formalar, ViewModel və partial",
        blocks: [
          { t: "code", lang: "html", caption: "Views/Shared/_Layout.cshtml — ortaq çərçivə", code: `<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="utf-8" />
    <title>@ViewData["Title"] — Akademiya</title>
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body>
    <header>
        <a asp-controller="Home" asp-action="Index">Ana səhifə</a>
        <a asp-controller="Kurslar" asp-action="Index">Kurslar</a>
    </header>

    <main>
        @RenderBody()                                  @* səhifənin məzmunu bura düşür *@
    </main>

    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>` },
          { t: "code", lang: "csharp", caption: "ViewModel və forma emalı (PRG qəlibi)", code: `public class KursYaratViewModel
{
    [Required(ErrorMessage = "Ad məcburidir"), StringLength(60)]
    public string Ad { get; set; } = "";

    [Range(1, 500, ErrorMessage = "Saat 1–500 aralığında olmalıdır")]
    public int Saat { get; set; }
}

public class KurslarController(IKursXidmeti xidmet) : Controller
{
    [HttpGet]
    public IActionResult Yarat() => View(new KursYaratViewModel());

    [HttpPost]
    [ValidateAntiForgeryToken]                         // CSRF qoruması
    public async Task<IActionResult> Yarat(KursYaratViewModel model, CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return View(model);                        // xətalarla formanı yenidən göstər

        await xidmet.YaratAsync(model.Ad, model.Saat, ct);

        TempData["Mesaj"] = "Kurs əlavə olundu";
        return RedirectToAction(nameof(Index));        // Post → Redirect → Get
    }
}` },
          { t: "code", lang: "html", caption: "Views/Kurslar/Yarat.cshtml", code: `@model KursYaratViewModel

<h1>Yeni kurs</h1>

<form asp-action="Yarat" method="post">
    <div asp-validation-summary="ModelOnly"></div>

    <label asp-for="Ad"></label>
    <input asp-for="Ad" />
    <span asp-validation-for="Ad"></span>

    <label asp-for="Saat"></label>
    <input asp-for="Saat" />
    <span asp-validation-for="Saat"></span>

    <button type="submit">Saxla</button>
</form>

@* form teqi asp-action ilə antiforgery tokenini özü əlavə edir *@

<partial name="_KursKarti" model="..." />           @* təkrar işlənən hissə *@` },
          { t: "list", items: [
            "ViewModel — konkret səhifənin ehtiyacına görə qurulmuş sinif. Baza varlığını birbaşa View-a vermə.",
            "PRG (Post–Redirect–Get): uğurlu POST-dan sonra yönləndir — səhifəni yeniləyəndə forma təkrar göndərilməsin.",
            "TempData — bir növbəti sorğuya qədər yaşayan mesaj (yönləndirmədən sonra «uğurla saxlandı»).",
            "_ViewImports.cshtml — ortaq @using və Tag Helper qeydiyyatı; _ViewStart.cshtml — default Layout.",
          ]},
          { t: "mistake", lang: "html", wrong: `<div>@Html.Raw(Model.Serh)</div>          @* istifadəçi mətni xam HTML kimi *@`, right: `<div>@Model.Serh</div>                    @* Razor avtomatik kodlaşdırır *@`, why: "@ ifadəsi HTML-i avtomatik kodlaşdırır: <script> mətn kimi görünür. Html.Raw bunu söndürür — istifadəçi mətnində XSS deməkdir. Raw yalnız özün yaratdığın, etibarlı HTML üçündür." },
          { t: "mistake", lang: "csharp", wrong: `[HttpPost]
public IActionResult Yarat(KursYaratViewModel model)
{
    _xidmet.Yarat(model);
    return View("Index", _xidmet.Hamisi());     // POST-un cavabında səhifə
}`, right: `[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult Yarat(KursYaratViewModel model)
{
    if (!ModelState.IsValid) return View(model);
    _xidmet.Yarat(model);
    return RedirectToAction(nameof(Index));
}`, why: "POST-a birbaşa səhifə qaytarsan, F5 formanı təkrar göndərir — iki eyni kurs yaranır. Həmçinin ModelState yoxlanmayıb və CSRF tokeni tələb olunmur." },
          { t: "mistake", lang: "html", wrong: `@{
    var kurslar = Db.Kurslar.Where(k => k.Aktiv).ToList();   @* View-da baza sorğusu *@
}`, right: `@model KursSiyahisiViewModel
@foreach (var kurs in Model.Kurslar) { ... }`, why: "View yalnız göstərir. Məlumatın alınması və hesablama controller/xidmətdədir — əks halda test olunmur və N+1 sorğular gizlənir." },
        ],
      },
      {
        level: "senior",
        title: "Razor-un daxili işi, alternativlər və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Razor faylı kompilyasiya vaxtı C# sinfinə çevrilir (RazorPage<TModel>): HTML hissələri WriteLiteral, @ifadələr isə kodlaşdırılaraq Write çağırışına çevrilir. Görünüşlər build zamanı kompilyasiya olunur — icra vaxtı sürətlidir.",
            "Razor Pages: səhifə əsaslı model (Pages/Kurslar/Index.cshtml + PageModel). Forma yönümlü saytlar üçün MVC-dən sadədir. Blazor: komponent əsaslı, interaktiv UI (server və ya WebAssembly). Yeni layihədə seçim: API + SPA, Razor Pages və ya Blazor.",
            "View Component — öz məntiqi olan təkrar işlənən blok (səbət, menyu): partial-dan fərqli olaraq DI və asinxron məlumat yükləməsi var.",
            "Tag Helper vs HTML Helper: Tag Helper (asp-for) HTML kimi oxunur və alətlərlə yaxşı işləyir; köhnə @Html.TextBoxFor üslubu hələ dəstəklənir.",
            "Keş: <cache> Tag Helper fraqmenti, OutputCache bütün səhifəni keşləyir. İstifadəçiyə xas məzmunu ümumi keşə salma — biri başqasının səhifəsini görər.",
            "Müştəri tərəfi validasiya (jquery-validation-unobtrusive) DataAnnotations-dan data-val-* atributları yaradır — yalnız rahatlıq üçündür, server yoxlaması qalır.",
            "Təhlükəsizlik — XSS: Razor @ ilə çıxışı HTML kontekstində kodlaşdırır. Təhlükə yerləri: Html.Raw, <script> içinə dəyər yazmaq (JavaScript konteksti — @Json.Serialize və ya data-* atributu işlət), href/src-də istifadəçi URL-i («javascript:» sxemi — yalnız http/https-ə icazə ver), istifadəçi HTML-i (HtmlSanitizer ilə ağ siyahı).",
            "Təhlükəsizlik — CSRF: cookie ilə giriş edən istifadəçi başqa saytdakı gizli forma ilə sənin saytına POST göndərə bilər. Bütün dəyişiklik edən action-larda antiforgery token: qlobal AutoValidateAntiforgeryTokenAttribute filtri + form Tag Helper tokeni özü qoyur. Cookie-lərdə SameSite=Lax/Strict.",
            "Təhlükəsizlik — dəyişiklik yalnız POST ilə: «/Kurslar/Sil/5» GET linki CSRF-ə (<img src>) və brauzerin öncədən yükləməsinə açıqdır. Silmə/dəyişmə — POST forma + token.",
            "Təhlükəsizlik — over-posting: forma modeli kimi entity işlətmə. ViewModel-də yalnız formada olan sahələr olsun; gizli (hidden) sahəyə etibar etmə — istifadəçi onu dəyişə bilər (qiymət, istifadəçi id-si, rol).",
            "Təhlükəsizlik — açıq yönləndirmə: returnUrl-i birbaşa Redirect-ə vermə. LocalRedirect və ya Url.IsLocalUrl yoxlaması.",
            "Təhlükəsizlik — cookie tənzimləmələri: auth və sessiya cookie-ləri HttpOnly (JS oxuya bilməsin), Secure (yalnız HTTPS), SameSite. TempData/Session-da həssas məlumat saxlama.",
            "Təhlükəsizlik — CSP: Content-Security-Policy başlığı XSS-in zərərini azaldır. Inline skript əvəzinə fayl və ya nonce; 'unsafe-inline' işlətmə.",
            "Təhlükəsizlik — clickjacking: X-Frame-Options: DENY / CSP frame-ancestors 'none' — səhifən başqa saytda görünməz iframe-də açılıb istifadəçiyə düymə basdırılmasın (antiforgery bunu default olaraq SAMEORIGIN edir).",
            "Təhlükəsizlik — icazə View-da yox: «admin düyməsini gizlətmək» qoruma deyil. Action-da [Authorize(Roles = ...)] olmalıdır; View yalnız görünüşü uyğunlaşdırır.",
          ]},
          { t: "code", lang: "csharp", caption: "Qlobal CSRF qoruması, təhlükəsiz cookie və silmə", code: `// Program.cs
builder.Services.AddControllersWithViews(o =>
{
    o.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());   // bütün POST/PUT/DELETE-lərdə token tələb olunur
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(o =>
    {
        o.Cookie.HttpOnly = true;
        o.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        o.Cookie.SameSite = SameSiteMode.Lax;
        o.LoginPath = "/Hesab/Giris";
        o.ExpireTimeSpan = TimeSpan.FromHours(8);
        o.SlidingExpiration = true;
    });

// Controller
[Authorize]
public class YazilarController(IYaziXidmeti xidmet, ICariIstifadeci istifadeci) : Controller
{
    [HttpPost]                                   // GET yox
    public async Task<IActionResult> Sil(int id, CancellationToken ct)
    {
        bool silindi = await xidmet.SilAsync(id, istifadeci.Id, ct);   // sahiblik xidmətdə yoxlanır
        if (!silindi) return NotFound();

        TempData["Mesaj"] = "Yazı silindi";
        return RedirectToAction(nameof(Index));
    }

    [AllowAnonymous]
    public IActionResult Giris(string? returnUrl) =>
        View(new GirisViewModel { ReturnUrl = Url.IsLocalUrl(returnUrl) ? returnUrl : "/" });
}` },
          { t: "code", lang: "html", caption: "View-da təhlükəsiz çıxış", code: `@model YaziViewModel

<h1>@Model.Basliq</h1>                          @* avtomatik kodlaşdırılır *@
<p>@Model.Metn</p>

@* İstifadəçi linki: yalnız http/https *@
@if (Uri.TryCreate(Model.SaytUnvani, UriKind.Absolute, out var u)
     && (u.Scheme == Uri.UriSchemeHttps || u.Scheme == Uri.UriSchemeHttp))
{
    <a href="@u.AbsoluteUri" rel="noopener noreferrer nofollow" target="_blank">Müəllifin saytı</a>
}

@* JS-ə məlumat: data atributu ilə, skriptin içinə sətir yapışdırmadan *@
<div id="yazi" data-id="@Model.Id" data-basliq="@Model.Basliq"></div>

@* Silmə: POST forma, token avtomatik əlavə olunur *@
<form asp-action="Sil" asp-route-id="@Model.Id" method="post">
    <button type="submit">Sil</button>
</form>` },
          { t: "qa", items: [
            ["MVC-də hissələrin rolu?", "Model — məlumat və qaydalar; View — təqdimat (HTML); Controller — sorğunu qəbul edir, modeli hazırlayır, View seçir."],
            ["ViewModel nədir, niyə lazımdır?", "Konkret görünüş üçün qurulmuş sinif. Entity-ni View-dan ayırır, over-posting-in qarşısını alır, səhifəyə lazım olan birləşmiş məlumatı daşıyır."],
            ["ViewData, ViewBag, TempData fərqi?", "ViewData/ViewBag — cari sorğuda controller-dən View-a kiçik məlumat (lüğət / dinamik). TempData — növbəti sorğuya qədər yaşayır (yönləndirmə üçün)."],
            ["Razor XSS-dən necə qoruyur?", "@ ifadələrini HTML-kodlaşdırır. Html.Raw və JavaScript/URL kontekstləri bu qorumadan kənardır."],
            ["CSRF nədir, ASP.NET Core-da necə qorunur?", "Başqa saytın istifadəçinin cookie-si ilə sənin saytına sorğu göndərməsi. Antiforgery token (forma + cookie cütü) və SameSite cookie ilə."],
            ["PRG qəlibi nədir?", "Post–Redirect–Get: uğurlu POST-dan sonra yönləndirmə — təkrar göndərmənin qarşısını alır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "HTML şablonu MVC-nin hansı hissəsidir?", options: ["Model", "View", "Controller"], answer: 1, why: "View təqdimata cavabdehdir." },
          { t: "quiz", q: "Razor-da C# ifadəsi hansı işarə ilə başlayır?", options: ["#", "@", "$"], answer: 1, why: "@Model.Ad kimi." },
          { t: "quiz", q: "Uğurlu forma göndərişindən sonra nə etməli?", options: ["View qaytarmaq", "RedirectToAction", "Heç nə"], answer: 1, why: "PRG — təkrar göndərmənin qarşısını alır." },
        ],
      },
    ],
    exercise: {
      task: "Əlaqə forması olan MVC səhifəsi yaz. 1) `ElaqeViewModel`: Ad (məcburi, ≤ 60), Email (məcburi, email), Mesaj (məcburi, 10–1000 simvol). 2) `ElaqeController`: GET Index formanı göstərir; POST Index validasiya edir — səhvdə formanı xətalarla qaytarır, uğurda TempData mesajı yazıb `Tesekkur` action-una yönləndirir (PRG). POST-da antiforgery yoxlaması olsun. 3) `Index.cshtml`: Tag Helper-lərlə forma (asp-for, asp-validation-for). 4) `Tesekkur.cshtml`: TempData mesajını və istifadəçinin adını göstərir — Html.Raw İŞLƏTMƏ. 5) Şərhdə yaz: mesajı niyə @Html.Raw ilə göstərmək olmaz.",
      starter: `public class ElaqeViewModel\n{\n    // sahələr\n}\n\npublic class ElaqeController : Controller\n{\n    // GET Index, POST Index, GET Tesekkur\n}\n\n// Views/Elaqe/Index.cshtml\n// @model ElaqeViewModel\n// <form asp-action="Index" method="post"> ... </form>\n`,
      expect: "ViewModel-də [Required], [StringLength]/[EmailAddress] atributları, Mesaj üçün MinimumLength = 10 və 1000 limit; [HttpGet] Index View(new ElaqeViewModel()); [HttpPost] + [ValidateAntiForgeryToken] Index: if (!ModelState.IsValid) return View(model); uğurda TempData və RedirectToAction(nameof(Tesekkur)); forma asp-action, asp-for, asp-validation-for işlədir; Tesekkur view-da @TempData[...] adi @ ilə (Html.Raw yox); şərhdə XSS izah olunub; POST-dan birbaşa View(\"Tesekkur\") qaytarılmır.",
    },
  },
  {
    slug: "ef-core",
    title: "Entity Framework Core",
    intro: "Entity Framework Core (EF Core) — ORM-dir: cədvəllərlə C# sinifləri kimi işləməyə imkan verir. SQL yazmaq əvəzinə LINQ yazırsan, EF onu SQL-ə çevirir.",
    sections: [
      {
        level: "baslangic",
        title: "Sinif = cədvəl, obyekt = sətir",
        blocks: [
          { t: "analogy", text: "EF Core — tərcüməçidir. Sən C# dilində danışırsan («qiyməti 100-dən baha məhsulları ver»), o bunu bazanın dilinə (SQL) çevirir, cavabı da geri C# obyektlərinə tərcümə edir. Sən bazanın dilini bilməsən də danışa bilirsən — amma yaxşı nəticə üçün tərcüməçinin nə dediyini anlamaq faydalıdır." },
          { t: "code", lang: "csharp", code: `// Varlıq (entity) — cədvəlin sətri
public class Mehsul
{
    public int Id { get; set; }                 // konvensiya: Id → əsas açar
    public string Ad { get; set; } = "";
    public decimal Qiymet { get; set; }
    public int Stok { get; set; }
}

// DbContext — baza ilə əlaqə
public class MagazaDb(DbContextOptions<MagazaDb> options) : DbContext(options)
{
    public DbSet<Mehsul> Mehsullar => Set<Mehsul>();      // cədvəl
}

// Program.cs
builder.Services.AddDbContext<MagazaDb>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Esas")));

// İstifadə
app.MapGet("/mehsullar", async (MagazaDb db) =>
    await db.Mehsullar.Where(m => m.Stok > 0).OrderBy(m => m.Ad).ToListAsync());

app.MapPost("/mehsullar", async (Mehsul m, MagazaDb db) =>
{
    db.Mehsullar.Add(m);                 // yaddaşda işarələ
    await db.SaveChangesAsync();         // INSERT bazaya gedir
    return Results.Created($"/mehsullar/{m.Id}", m);
});` },
          { t: "terms", items: [
            ["ORM", "Object-Relational Mapper — obyektləri cədvəllərə uyğunlaşdıran alət."],
            ["entity (varlıq)", "cədvələ uyğun gələn sinif."],
            ["DbContext", "baza sessiyası: sorğular göndərir, dəyişiklikləri izləyir."],
            ["DbSet<T>", "bir cədvəli təmsil edən kolleksiya."],
            ["SaveChangesAsync", "yığılmış dəyişiklikləri bazaya yazır (bir tranzaksiyada)."],
          ]},
          { t: "tip", text: "Add, Remove və xüsusiyyəti dəyişmək bazaya heç nə göndərmir — yalnız yaddaşda qeyd olunur. Hər şey SaveChangesAsync çağırılanda yazılır." },
        ],
      },
      {
        level: "orta",
        title: "CRUD, əlaqələr və Include",
        blocks: [
          { t: "code", lang: "csharp", code: `public class Kateqoriya
{
    public int Id { get; set; }
    public string Ad { get; set; } = "";
    public List<Mehsul> Mehsullar { get; set; } = [];          // bir → çox
}

public class Mehsul
{
    public int Id { get; set; }
    public string Ad { get; set; } = "";
    public decimal Qiymet { get; set; }
    public int KateqoriyaId { get; set; }                      // xarici açar
    public Kateqoriya Kateqoriya { get; set; } = null!;        // naviqasiya
}

// Tənzimləmə (Fluent API)
protected override void OnModelCreating(ModelBuilder mb)
{
    mb.Entity<Mehsul>(e =>
    {
        e.Property(m => m.Ad).HasMaxLength(100).IsRequired();
        e.Property(m => m.Qiymet).HasPrecision(12, 2);
        e.HasIndex(m => m.Ad);
        e.HasOne(m => m.Kateqoriya)
         .WithMany(k => k.Mehsullar)
         .HasForeignKey(m => m.KateqoriyaId)
         .OnDelete(DeleteBehavior.Restrict);
    });
}

// Oxu: əlaqəli məlumatla
var mehsullar = await db.Mehsullar
    .Include(m => m.Kateqoriya)                // JOIN
    .Where(m => m.Qiymet > 100)
    .ToListAsync(ct);

// Daha yaxşı: yalnız lazım olan sütunlar (proyeksiya)
var siyahi = await db.Mehsullar
    .Where(m => m.Qiymet > 100)
    .Select(m => new MehsulDto(m.Id, m.Ad, m.Qiymet, m.Kateqoriya.Ad))
    .ToListAsync(ct);

// Biri
var mehsul = await db.Mehsullar.FindAsync([id], ct);                  // PK ilə
var ilk = await db.Mehsullar.FirstOrDefaultAsync(m => m.Ad == ad, ct);

// Yenilə
mehsul!.Qiymet = 149.90m;                      // EF dəyişikliyi özü görür
await db.SaveChangesAsync(ct);

// Sil
db.Mehsullar.Remove(mehsul);
await db.SaveChangesAsync(ct);

// Kütləvi əməliyyat — obyektləri yükləmədən, birbaşa SQL
await db.Mehsullar.Where(m => m.Stok == 0).ExecuteDeleteAsync(ct);
await db.Mehsullar.Where(m => m.KateqoriyaId == 3)
    .ExecuteUpdateAsync(s => s.SetProperty(m => m.Qiymet, m => m.Qiymet * 1.1m), ct);` },
          { t: "mistake", lang: "csharp", wrong: `var sifarisler = await db.Sifarisler.ToListAsync();
foreach (var s in sifarisler)
{
    var musteri = await db.Musteriler.FindAsync(s.MusteriId);   // hər sifariş üçün ayrı sorğu
    Console.WriteLine(musteri!.Ad);
}`, right: `var sifarisler = await db.Sifarisler
    .Select(s => new { s.Id, MusteriAdi = s.Musteri.Ad })
    .ToListAsync();`, why: "N+1 problemi: 1 sorğu siyahı üçün + N sorğu hər sətir üçün. 1000 sifariş = 1001 sorğu. Include və ya proyeksiya ilə bir sorğuda al." },
          { t: "mistake", lang: "csharp", wrong: `var bahali = db.Mehsullar.ToList().Where(m => m.Qiymet > 1000);   // bütün cədvəl yaddaşa`, right: `var bahali = await db.Mehsullar.Where(m => m.Qiymet > 1000).ToListAsync();`, why: "ToList()-dən sonrakı Where yaddaşda işləyir — əvvəlcə milyon sətir yüklənir. Filtri ToListAsync-dən ƏVVƏL yaz ki, SQL-in WHERE-nə çevrilsin." },
          { t: "mistake", lang: "csharp", wrong: `var mehsullar = await db.Mehsullar.ToListAsync();      // yalnız göstərmək üçün`, right: `var mehsullar = await db.Mehsullar.AsNoTracking().ToListAsync();`, why: "Default olaraq EF hər yüklənən obyekti izləyir (change tracking) — yaddaş və vaxt aparır. Yalnız oxunan sorğularda AsNoTracking işlət (proyeksiya onsuz da izlənmir)." },
        ],
      },
      {
        level: "senior",
        title: "Dəyişiklik izləmə, performans, paralellik və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Change tracker hər varlığın vəziyyətini saxlayır: Added, Modified, Deleted, Unchanged, Detached. SaveChanges anlıq görüntü (snapshot) ilə müqayisə edib yalnız dəyişən sütunlar üçün UPDATE yaradır və hamısını bir tranzaksiyada icra edir.",
            "DbContext qısaömürlüdür (bir sorğu = bir iş vahidi) və axın-təhlükəsiz DEYİL: eyni konteksdə paralel sorğu (Task.WhenAll) istisna atır. Paralel iş üçün IDbContextFactory ilə ayrı kontekstlər.",
            "Yükləmə strategiyaları: eager (Include), açıq (Entry().Collection().LoadAsync()), lazy (proksilərlə — gizli N+1 yaradır, API-lərdə işlətmə). Ən yaxşısı çox vaxt Select ilə DTO-ya proyeksiyadır.",
            "Kartezian partlayışı: bir neçə kolleksiya Include edəndə JOIN sətirləri vurulur. AsSplitQuery() onları ayrı sorğulara bölür (uyğunluq üçün tranzaksiya və ya sıralama tələb oluna bilər).",
            "Yaranan SQL-i həmişə gör: LogTo / EnableSensitiveDataLogging (yalnız lokalda), ToQueryString(). EF tərcümə edə bilmədiyi ifadədə istisna atır — client evaluation-a səssizcə keçmir.",
            "Performans alətləri: AsNoTracking, proyeksiya, ExecuteUpdate/ExecuteDelete (yükləmədən), kompilyasiya olunmuş sorğular (EF.CompileAsyncQuery), DbContext pooling (AddDbContextPool), açarla səhifələmə (keyset), toplu yazı (batching avtomatikdir).",
            "Optimist paralellik (optimistic concurrency): [Timestamp] / rowversion və ya IsConcurrencyToken. İki nəfər eyni sətri dəyişəndə ikincisi DbUpdateConcurrencyException alır — «son yazan qalib gəlir» problemi həll olunur.",
            "Tranzaksiya: bir SaveChanges onsuz da atomdur. Bir neçə SaveChanges və ya xarici əməliyyat üçün BeginTransactionAsync. Bağlantı xətalarına qarşı EnableRetryOnFailure — bu halda əl tranzaksiyalarını execution strategy içində işlət.",
            "Qlobal sorğu filtri (HasQueryFilter): yumşaq silmə (IsDeleted) və çoxkirayəçilik (TenantId) üçün — hər sorğuya avtomatik əlavə olunur. IgnoreQueryFilters yalnız şüurlu hallarda.",
            "Dəyər obyektləri və JSON: owned types / complex types, JSON sütunları (ToJson), dəyər çeviriciləri (enum → sətir).",
            "Təhlükəsizlik — SQL injection: LINQ dəyərləri parametr kimi göndərir — təhlükəsizdir. Təhlükə xam SQL-dədir: FromSqlRaw(\"... WHERE Ad = '\" + ad + \"'\") və ya ExecuteSqlRaw-da sətir birləşdirmə. FromSql / FromSqlInterpolated / ExecuteSqlInterpolated işlət — interpolasiyanı parametrə çevirir. Cədvəl/sütun adı parametr ola bilmir — onu yalnız ağ siyahıdan seç.",
            "Təhlükəsizlik — over-posting: db.Update(müştəridənGələnEntity) bütün sütunları yazır — hücumçu Rol, Balans, SahibId göndərə bilər. Varlığı bazadan yüklə, yalnız icazəli sahələri DTO-dan köçür.",
            "Təhlükəsizlik — icazə filtri sorğuda: db.Senedler.FindAsync(id) sahibliyi yoxlamır (IDOR). Where(s => s.Id == id && s.SahibId == cariId) yaz və ya çoxkirayəçili sistemdə qlobal sorğu filtri qur ki, unutmaq mümkün olmasın.",
            "Təhlükəsizlik — məlumat sızması: entity-ni JSON kimi qaytarma — ParolHesi, daxili sahələr və naviqasiya ağacı çıxır. Select ilə DTO. EnableSensitiveDataLogging production-da parametr dəyərlərini (şəxsi məlumat, parol heşi) loga yazır — söndür.",
            "Təhlükəsizlik — bağlantı sətri və baza hesabı: sətir sirr anbarında; tətbiq hesabının yalnız lazım olan hüquqları (SELECT/INSERT/UPDATE/DELETE) olsun — db_owner/sa yox. Miqrasiyanı ayrı, hüquqlu hesab icra etsin. Bağlantıda Encrypt=True, TrustServerCertificate=False.",
            "Təhlükəsizlik — limitsiz sorğu (DoS): ToListAsync-dən əvvəl həmişə Take; səhifə ölçüsünü serverdə məhdudlaşdır; dinamik sıralama/filtr sahələrini ağ siyahıdan götür (gizli sütuna görə sıralama məlumat sızdırır); sorğuya əmr vaxt limiti (CommandTimeout).",
            "Təhlükəsizlik — həssas sütunlar: parolu heç vaxt saxlama — yalnız yavaş heş (PasswordHasher / Argon2 / bcrypt). Şəxsi məlumat üçün sütun şifrələməsi (Always Encrypted və ya dəyər çeviricisi ilə tətbiq səviyyəsində), audit üçün SaveChanges interceptor-u (kim, nə vaxt).",
          ]},
          { t: "code", lang: "csharp", caption: "Çoxkirayəçili filtr, paralellik tokeni və təhlükəsiz yeniləmə", code: `public class Sened
{
    public int Id { get; set; }
    public int SahibId { get; set; }
    public string Basliq { get; set; } = "";
    public string Metn { get; set; } = "";
    public bool Silinib { get; set; }
    [Timestamp] public byte[] Versiya { get; set; } = [];     // optimist paralellik
}

public class SenedDb(DbContextOptions<SenedDb> options, ICariIstifadeci istifadeci) : DbContext(options)
{
    public DbSet<Sened> Senedler => Set<Sened>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // Hər sorğuya avtomatik: yalnız özününkülər və silinməmişlər
        mb.Entity<Sened>().HasQueryFilter(s => s.SahibId == istifadeci.Id && !s.Silinib);
        mb.Entity<Sened>().Property(s => s.Basliq).HasMaxLength(200);
    }
}

public record SenedYenileDto(
    [Required, StringLength(200)] string Basliq,
    [Required, StringLength(20_000)] string Metn,
    [Required] byte[] Versiya);

app.MapPut("/api/senedler/{id:int}", async Task<Results<NoContent, NotFound, Conflict<string>>> (
    int id, SenedYenileDto giris, SenedDb db, CancellationToken ct) =>
{
    // Qlobal filtr sayəsində başqasının sənədi tapılmır → 404
    var sened = await db.Senedler.FirstOrDefaultAsync(s => s.Id == id, ct);
    if (sened is null) return TypedResults.NotFound();

    // Yalnız icazəli sahələr köçürülür (SahibId, Silinib toxunulmazdır)
    sened.Basliq = giris.Basliq.Trim();
    sened.Metn = giris.Metn;
    db.Entry(sened).Property(s => s.Versiya).OriginalValue = giris.Versiya;

    try
    {
        await db.SaveChangesAsync(ct);
        return TypedResults.NoContent();
    }
    catch (DbUpdateConcurrencyException)
    {
        return TypedResults.Conflict("Sənəd başqa yerdə dəyişdirilib. Yeniləyib təkrar cəhd edin.");
    }
}).RequireAuthorization();

// Xam SQL lazımdırsa — yalnız parametrləşdirilmiş
var netice = await db.Senedler
    .FromSql($"SELECT * FROM Senedler WHERE CONTAINS(Metn, {axtaris})")   // {axtaris} → @p0
    .AsNoTracking()
    .Take(50)
    .ToListAsync(ct);` },
          { t: "qa", items: [
            ["EF Core nədir, üstünlüyü və çatışmazlığı?", "ORM: LINQ ilə tip-təhlükəsiz sorğu, dəyişiklik izləmə, miqrasiyalar. Çatışmazlığı — gizli qeyri-səmərəli SQL riski; mürəkkəb sorğularda xam SQL/Dapper daha uyğun ola bilər."],
            ["Change tracking necə işləyir?", "Kontekst yüklənən varlıqların ilkin dəyərlərini saxlayır; SaveChanges-də cari dəyərlərlə müqayisə edib INSERT/UPDATE/DELETE yaradır."],
            ["N+1 problemi nədir, həlli?", "Siyahı üçün 1 sorğu + hər element üçün əlavə sorğu. Həlli: Include, proyeksiya (Select), split query."],
            ["AsNoTracking nə vaxt?", "Yalnız oxunan sorğularda — izləmə xərci olmur. Dəyişdirib saxlayacağın varlıq üçün yox."],
            ["Include ilə Select fərqi?", "Include bütün əlaqəli varlığı yükləyir. Select yalnız lazım olan sütunları DTO-ya çıxarır — adətən daha sürətli və təhlükəsiz."],
            ["Optimist paralellik necə qurulur?", "rowversion/concurrency token sütunu ilə: UPDATE-in WHERE-nə köhnə versiya əlavə olunur; 0 sətir dəyişsə DbUpdateConcurrencyException atılır."],
            ["EF Core SQL injection-dan qoruyurmu?", "LINQ və FromSql/Interpolated — bəli (parametrləşdirir). FromSqlRaw/ExecuteSqlRaw-da sətir birləşdirmə — yox."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Dəyişikliklər bazaya nə vaxt yazılır?", options: ["Add çağırılanda", "SaveChangesAsync çağırılanda", "Proqram bağlananda"], answer: 1, why: "Ona qədər yalnız yaddaşda izlənir." },
          { t: "quiz", q: "Əlaqəli məlumatı bir sorğuda yükləmək üçün?", options: ["Include", "Remove", "Attach"], answer: 0, why: "Include JOIN yaradır." },
          { t: "quiz", q: "Yalnız oxumaq üçün sorğuda nə əlavə etmək faydalıdır?", options: ["AsNoTracking", "ToList().Where", "Update"], answer: 0, why: "İzləmə xərcini aradan qaldırır." },
        ],
      },
    ],
    exercise: {
      task: "Bloq üçün EF Core modeli və sorğular yaz. 1) `Muellif` (Id, Ad, Email) və `Yazi` (Id, Basliq, Metn, Yaradilib, MuellifId, Muellif) varlıqları; bir müəllifin çox yazısı var. 2) `BloqDb : DbContext` — DbSet-lər və Fluent API: Basliq məcburi və ≤ 150, Email unikal indeks, silinmə Restrict. 3) Sorğu: son 10 yazı — Id, Basliq, müəllifin adı (DTO proyeksiyası, izləməsiz, ən yenidən). 4) Sorğu: hər müəllifin yazı sayı. 5) Yazının başlığını yeniləyən metod: yalnız `muellifId` özününküdürsə (sahiblik sorğunun içində), tapılmasa false. 6) 1 ildən köhnə yazıları yükləmədən silən əmr. 7) Şərhdə: niyə `FromSqlRaw(\"... '\" + soz + \"'\")` təhlükəlidir və əvəzinə nə yazırsan.",
      starter: `public class Muellif\n{\n    public int Id { get; set; }\n    // ...\n}\n\npublic class Yazi\n{\n    public int Id { get; set; }\n    // ...\n}\n\npublic class BloqDb(DbContextOptions<BloqDb> options) : DbContext(options)\n{\n    // DbSet-lər, OnModelCreating\n}\n\npublic record YaziDto(int Id, string Basliq, string MuellifAdi);\n`,
      expect: "Muellif-də List<Yazi> naviqasiyası, Yazi-də MuellifId + Muellif; OnModelCreating: Property(Basliq).IsRequired().HasMaxLength(150), HasIndex(Email).IsUnique(), HasOne/WithMany/HasForeignKey + OnDelete(DeleteBehavior.Restrict); son 10: OrderByDescending(Yaradilib).Take(10).Select(new YaziDto(..., y.Muellif.Ad)).ToListAsync (AsNoTracking və ya proyeksiya; ToList().Where yox); say: GroupBy və ya Select(m => new { m.Ad, Say = m.Yazilar.Count }); yeniləmə: Where(y => y.Id == id && y.MuellifId == muellifId) ilə tapır (və ya ExecuteUpdateAsync) və bool qaytarır; silmə: Where(y => y.Yaradilib < UtcNow.AddYears(-1)).ExecuteDeleteAsync(); şərhdə injection və FromSql/FromSqlInterpolated; bütün çağırışlar async.",
    },
  },
  {
    slug: "migration",
    title: "Migration-lar",
    intro: "Migration (miqrasiya) — bazanın sxemindəki dəyişikliyin kodla yazılmış addımıdır. Modeli dəyişirsən, EF Core fərqi tapıb cədvəli necə dəyişmək lazım olduğunu yazır. Beləliklə sxem də kod kimi versiyalanır.",
    sections: [
      {
        level: "baslangic",
        title: "Modeldən bazaya",
        blocks: [
          { t: "analogy", text: "Migration — evin təmir jurnalıdır. Hər səhifədə bir iş yazılıb: «mətbəxə pəncərə əlavə olundu», «otağın divarı söküldü». Jurnalı əvvəldən axıra oxuyan usta boş sahədə eyni evi tikə bilər. Hər səhifədə işi geri qaytarmağın yolu da var." },
          { t: "code", lang: "bash", code: `# Alət (bir dəfə)
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design

# 1) İlk miqrasiya: modeldən cədvəllərin təsviri yaranır
dotnet ef migrations add IlkSxem

# 2) Bazaya tətbiq et
dotnet ef database update

# Model dəyişdi (məs. Mehsul-a Stok əlavə etdin) → yeni miqrasiya
dotnet ef migrations add MehsulaStokElaveEt
dotnet ef database update

# Siyahı və vəziyyət
dotnet ef migrations list` },
          { t: "code", lang: "csharp", caption: "Migrations/20261114120000_MehsulaStokElaveEt.cs (avtomatik yaranır)", code: `public partial class MehsulaStokElaveEt : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)        // irəli
    {
        migrationBuilder.AddColumn<int>(
            name: "Stok",
            table: "Mehsullar",
            type: "int",
            nullable: false,
            defaultValue: 0);
    }

    protected override void Down(MigrationBuilder migrationBuilder)      // geri
    {
        migrationBuilder.DropColumn(name: "Stok", table: "Mehsullar");
    }
}` },
          { t: "terms", items: [
            ["migration", "sxem dəyişikliyinin bir addımı: Up (tətbiq et) və Down (geri qaytar)."],
            ["dotnet ef", "EF Core-un əmr sətri aləti."],
            ["model snapshot", "modelin son vəziyyətinin surəti — növbəti miqrasiya fərqi bununla hesablayır."],
            ["__EFMigrationsHistory", "bazada hansı miqrasiyaların tətbiq olunduğunu saxlayan cədvəl."],
            ["database update", "tətbiq olunmamış miqrasiyaları sıra ilə icra edir."],
          ]},
          { t: "tip", text: "Miqrasiyaya mənalı ad ver: «Update1» yox, «SifariseCatdirilmaUnvaniElaveEt». Altı ay sonra tarixçəni oxuyan sən olacaqsan." },
        ],
      },
      {
        level: "orta",
        title: "Geri qaytarma, məlumat miqrasiyası və SQL skripti",
        blocks: [
          { t: "code", lang: "bash", code: `# Son miqrasiyanı sil (hələ bazaya TƏTBİQ OLUNMAYIBSA)
dotnet ef migrations remove

# Bazanı əvvəlki miqrasiyaya qaytar (sonrakıların Down-u işləyir)
dotnet ef database update IlkSxem

# Production üçün SQL skripti (idempotent: təkrar işlətmək təhlükəsizdir)
dotnet ef migrations script --idempotent -o miqrasiya.sql

# İki miqrasiya arası skript
dotnet ef migrations script IlkSxem MehsulaStokElaveEt

# Müstəqil icra faylı (bundle) — serverdə SDK lazım deyil
dotnet ef migrations bundle -o efbundle
./efbundle --connection "..."` },
          { t: "code", lang: "csharp", caption: "Əl ilə düzəldilmiş miqrasiya: sütunu bölmək + məlumatı köçürmək", code: `public partial class AdiSoyadiAyir : Migration
{
    protected override void Up(MigrationBuilder mb)
    {
        // 1) Yeni sütunlar (hələ boş ola bilər)
        mb.AddColumn<string>("Ad", "Musteriler", maxLength: 50, nullable: true);
        mb.AddColumn<string>("Soyad", "Musteriler", maxLength: 50, nullable: true);

        // 2) Mövcud məlumatı köçür
        mb.Sql("""
            UPDATE Musteriler
            SET Ad = LEFT(TamAd, CHARINDEX(' ', TamAd + ' ') - 1),
                Soyad = LTRIM(SUBSTRING(TamAd, CHARINDEX(' ', TamAd + ' '), 100))
            """);

        // 3) İndi məcburi et və köhnəni sil
        mb.AlterColumn<string>("Ad", "Musteriler", maxLength: 50, nullable: false, defaultValue: "");
        mb.DropColumn("TamAd", "Musteriler");
    }

    protected override void Down(MigrationBuilder mb)
    {
        mb.AddColumn<string>("TamAd", "Musteriler", maxLength: 100, nullable: true);
        mb.Sql("UPDATE Musteriler SET TamAd = CONCAT(Ad, ' ', Soyad)");
        mb.DropColumn("Ad", "Musteriler");
        mb.DropColumn("Soyad", "Musteriler");
    }
}

// Başlanğıc məlumatı (seed)
mb.Entity<Rol>().HasData(
    new Rol { Id = 1, Ad = "Istifadeci" },
    new Rol { Id = 2, Ad = "Admin" });` },
          { t: "mistake", lang: "csharp", wrong: `// Xüsusiyyətin adını dəyişdin: TamAd → AdSoyad
// EF bunu «sütunu sil, yenisini yarat» kimi yaza bilər:
mb.DropColumn("TamAd", "Musteriler");
mb.AddColumn<string>("AdSoyad", "Musteriler");     // bütün məlumat itdi`, right: `mb.RenameColumn(name: "TamAd", table: "Musteriler", newName: "AdSoyad");`, why: "EF adın dəyişdiyini həmişə anlamır. Yaranan miqrasiyanı HƏR DƏFƏ oxu: DropColumn / DropTable görürsənsə, məlumat itkisi ola bilər — RenameColumn ilə əvəz et." },
          { t: "mistake", lang: "bash", wrong: `# Miqrasiya artıq komandaya/production-a gedib, sonra faylı düzəldirsən
# və ya: dotnet ef migrations remove`, right: `# Tətbiq olunmuş miqrasiyaya toxunma — yenisini əlavə et
dotnet ef migrations add DuzelisSutunUzunlugu`, why: "Tətbiq olunmuş miqrasiyanı dəyişsən, başqalarının bazası ilə sənin kodun ayrılır — snapshot və tarixçə uyğun gəlmir. Tarixçə yalnız irəli gedir." },
          { t: "mistake", lang: "csharp", wrong: `// Program.cs — hər başlanğıcda
app.Services.CreateScope().ServiceProvider
   .GetRequiredService<MagazaDb>().Database.Migrate();`, right: `// Lokalda rahatdır. Production-da miqrasiyanı yayım addımı kimi icra et:
// dotnet ef migrations bundle  →  ./efbundle   (CI/CD-də, tətbiqdən ƏVVƏL)`, why: "Bir neçə nüsxə eyni anda qalxanda miqrasiya yarışı yaranır; tətbiq hesabına sxem dəyişmə hüququ vermək lazım gəlir; uğursuz miqrasiya tətbiqi qalxmağa qoymur. Miqrasiya ayrı, nəzarətli addım olmalıdır." },
        ],
      },
      {
        level: "senior",
        title: "Fasiləsiz yayım, komanda işi və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Miqrasiya üç fayldır: Up/Down kodu, .Designer (həmin andakı model), ModelSnapshot (son model). `migrations add` cari modeli snapshot ilə müqayisə edir — bazaya baxmır.",
            "Komandada toqquşma: iki nəfər eyni vaxtda miqrasiya əlavə edəndə snapshot-da merge conflict olur. Həlli: öz miqrasiyanı sil, əsas budağı birləşdir, miqrasiyanı yenidən yarat. Miqrasiyaları kiçik və tez-tez birləşdir.",
            "Fasiləsiz yayım (zero-downtime): yayım zamanı köhnə və yeni kod eyni bazaya baxır. Hər miqrasiya köhnə kodla da işləməlidir. Qəlib — «genişləndir və daralt» (expand/contract): 1) yeni sütun əlavə et (nullable); 2) kod hər ikisinə yazsın; 3) məlumatı köçür; 4) kod yalnız yenini oxusun; 5) köhnəni sil — ayrı yayımda.",
            "Təhlükəli əməliyyatlar: sütun/cədvəl silmək, adını dəyişmək, NOT NULL əlavə etmək (default-suz), tipi daraltmaq. Böyük cədvəldə indeks yaratmaq və sütun dəyişmək cədvəli kilidləyə bilər — onlayn variantlarını işlət (SQL Server: ONLINE = ON; PostgreSQL: CREATE INDEX CONCURRENTLY — tranzaksiyadan kənar).",
            "Böyük məlumat köçürməsini miqrasiyada bir UPDATE ilə etmə: uzun tranzaksiya, kilidlər, jurnalın şişməsi. Hissə-hissə (batch) fon işi ilə köçür.",
            "Down metodlarını real olaraq sına — production-da geri qayıtmaq lazım olanda ilk dəfə işlətmə. Bəzi dəyişikliklər geri dönməzdir (silinmiş məlumat) — onda bərpa planı backup-dır.",
            "CI yoxlaması: `dotnet ef migrations has-pending-model-changes` — model dəyişib, miqrasiya unudulubsa build uğursuz olsun. İdempotent skripti artefakt kimi saxla və nəzərdən keçir (code review).",
            "Miqrasiya çox olanda (yüzlərlə) birləşdir (squash): yeni baza üçün tək başlanğıc miqrasiyası; mövcud bazalarda tarixçə cədvəlini uyğunlaşdır.",
            "EnsureCreated() miqrasiya deyil: sxemi birbaşa yaradır və tarixçə yazmır — sonra Migrate işləməz. Yalnız testlər/prototip üçün.",
            "Təhlükəsizlik — ayrı hesablar: tətbiq hesabı yalnız məlumatla işləsin (SELECT/INSERT/UPDATE/DELETE). Sxem dəyişmə (DDL) hüququ yalnız yayım zamanı işlənən miqrasiya hesabında olsun. Tətbiq ələ keçirilsə, hücumçu cədvəli silə və ya sxemi dəyişə bilməsin.",
            "Təhlükəsizlik — sirlər miqrasiyada: HasData ilə admin parolu, API açarı, real istifadəçi məlumatı yazma — onlar mənbə kodunda və git tarixçəsində qalır. Seed yalnız açıq soraq məlumatı üçündür; ilk admin ayrıca, təhlükəsiz addımla yaradılır.",
            "Təhlükəsizlik — mb.Sql: miqrasiya SQL-i yüksək hüquqla işləyir. İçində dinamik və ya kənardan gələn sətir birləşdirmə olmasın; skripti nəzərdən keçirmədən production-da işlətmə. Miqrasiya faylları da code review-dan keçməlidir.",
            "Təhlükəsizlik — yayımdan əvvəl backup: hər production miqrasiyasından əvvəl nüsxə (və ya PITR-in aktiv olduğunun təsdiqi). Məlumat itirən miqrasiyanı EF xəbərdarlıqla qeyd edir — onu gözardı etmə.",
            "Təhlükəsizlik — bağlantı sətri əmr sətrində: `dotnet ef database update --connection \"...parol...\"` shell tarixçəsində və CI loglarında qalır. Mühit dəyişəni / sirr anbarından oxu, CI-da maskala.",
            "Təhlükəsizlik — həssas sütun əlavə edəndə: yeni şəxsi məlumat sütunu (FİN, telefon) üçün şifrələmə, giriş hüquqları, loglama və saxlama müddəti miqrasiya ilə birlikdə planlaşdırılsın; köhnə açıq mətn sütunu silinənə qədər iş bitməyib.",
          ]},
          { t: "code", lang: "csharp", caption: "Genişləndir → köçür → daralt: Email sütununun fasiləsiz adını dəyişmək", code: `// YAYIM 1 — genişləndir: yeni sütun, köhnə kod sınmır
public partial class EpoctUnvaniElaveEt : Migration
{
    protected override void Up(MigrationBuilder mb)
    {
        mb.AddColumn<string>("EpoctUnvani", "Istifadeciler", maxLength: 254, nullable: true);
    }

    protected override void Down(MigrationBuilder mb) =>
        mb.DropColumn("EpoctUnvani", "Istifadeciler");
}
// Kod (yayım 1): hər iki sütuna yazır, köhnədən oxuyur.
// Fon işi: köhnə sətirləri hissə-hissə köçürür (hər dəfə 5000 sətir).

// YAYIM 2 — kod yalnız yeni sütunu oxuyur və yazır.

// YAYIM 3 — daralt: heç kim köhnəni işlətmir
public partial class KohneEmailSutununuSil : Migration
{
    protected override void Up(MigrationBuilder mb)
    {
        // Təhlükəsizlik kəməri: köçürülməmiş sətir qalıbsa dayan
        mb.Sql("""
            IF EXISTS (SELECT 1 FROM Istifadeciler WHERE EpoctUnvani IS NULL AND Email IS NOT NULL)
                THROW 50000, 'Köçürülməmiş sətirlər var', 1;
            """);

        mb.AlterColumn<string>("EpoctUnvani", "Istifadeciler", maxLength: 254, nullable: false);
        mb.CreateIndex("IX_Istifadeciler_EpoctUnvani", "Istifadeciler", "EpoctUnvani", unique: true);
        mb.DropColumn("Email", "Istifadeciler");
    }

    protected override void Down(MigrationBuilder mb)
    {
        mb.AddColumn<string>("Email", "Istifadeciler", maxLength: 254, nullable: true);
        mb.Sql("UPDATE Istifadeciler SET Email = EpoctUnvani");
        mb.DropIndex("IX_Istifadeciler_EpoctUnvani", "Istifadeciler");
    }
}` },
          { t: "qa", items: [
            ["Migration nədir, nə üçündür?", "Sxem dəyişikliyinin versiyalanan, təkrarlana bilən təsviri. Bütün mühitlərdə bazanı eyni vəziyyətə gətirir."],
            ["EF hansı miqrasiyaların tətbiq olunduğunu necə bilir?", "Bazadakı __EFMigrationsHistory cədvəlindən."],
            ["Production-da miqrasiyanı necə tətbiq edirsən?", "Tətbiq başlanğıcında Migrate() ilə yox — CI/CD addımında idempotent SQL skripti və ya bundle ilə, ayrı hüquqlu hesabla, backup-dan sonra."],
            ["Fasiləsiz yayımda sütunun adını necə dəyişirsən?", "Genişləndir/daralt: yeni sütun əlavə et, hər ikisinə yaz, məlumatı köçür, oxumanı keçir, köhnəni ayrıca yayımda sil."],
            ["Tətbiq olunmuş miqrasiyanı dəyişmək olarmı?", "Yox. Düzəliş üçün yeni miqrasiya əlavə edilir."],
            ["EnsureCreated ilə Migrate fərqi?", "EnsureCreated sxemi tarixçəsiz yaradır (miqrasiyalarla uyğun deyil). Migrate miqrasiyaları sıra ilə tətbiq edir və tarixçə aparır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Yeni miqrasiya yaradan əmr?", options: ["dotnet ef migrations add Ad", "dotnet ef database update", "dotnet build"], answer: 0, why: "add miqrasiya faylını yaradır." },
          { t: "quiz", q: "Miqrasiyanı bazaya tətbiq edən əmr?", options: ["migrations list", "database update", "migrations remove"], answer: 1, why: "update gözləyən miqrasiyaları icra edir." },
          { t: "quiz", q: "Down metodu nə edir?", options: ["Miqrasiyanı geri qaytarır", "Bazanı silir", "Testləri işlədir"], answer: 0, why: "Up-ın əksidir." },
        ],
      },
    ],
    exercise: {
      task: "`Mehsullar` cədvəli üçün miqrasiya ssenarisi yaz (əmrlər + miqrasiya sinfi). 1) Modelə `Kateqoriya` (string, ≤ 50, məcburi) əlavə etdin — mövcud sətirlər var. Miqrasiya yaradan və tətbiq edən əmrləri yaz. 2) Miqrasiya sinfini əl ilə yaz: sütunu əvvəl nullable əlavə et, mövcud sətirlərə 'Ümumi' yaz, sonra NOT NULL et; Down düzgün geri qaytarsın. 3) `Ad` sütununun adını `Basliq`-a dəyişən miqrasiyanı məlumat itirmədən yaz. 4) Production üçün idempotent SQL skripti yaradan əmri yaz. 5) Şərhdə: niyə production-da `Database.Migrate()`-i tətbiq başlanğıcında çağırmırsan (2 səbəb) və tətbiq hesabının hansı hüquqları olmalıdır.",
      starter: `// 1) əmrlər\n// dotnet ef ...\n\npublic partial class MehsulaKateqoriyaElaveEt : Migration\n{\n    protected override void Up(MigrationBuilder mb)\n    {\n    }\n\n    protected override void Down(MigrationBuilder mb)\n    {\n    }\n}\n\n// 3) ad dəyişmə miqrasiyası\n\n// 4) skript əmri\n\n// 5) şərh\n`,
      expect: "dotnet ef migrations add MehsulaKateqoriyaElaveEt və dotnet ef database update; Up: AddColumn nullable: true → mb.Sql(\"UPDATE Mehsullar SET Kateqoriya = 'Ümumi' WHERE Kateqoriya IS NULL\") → AlterColumn nullable: false (və ya defaultValue ilə bir addımda — qəbul olunur); Down: DropColumn; ad dəyişmə RenameColumn ilə (DropColumn + AddColumn yox), Down əks RenameColumn; dotnet ef migrations script --idempotent; şərhdə: çoxlu nüsxədə yarış / tətbiq hesabına DDL hüququ lazım gəlir / uğursuz miqrasiya tətbiqi yıxır; tətbiq hesabı yalnız SELECT, INSERT, UPDATE, DELETE.",
    },
  },
  {
    slug: "auth",
    title: "Autentifikasiya: JWT və Identity",
    intro: "Autentifikasiya — «sən kimsən?» sualının cavabıdır (giriş). Avtorizasiya — «sənə bu icazə verilibmi?». ASP.NET Core-da hər ikisi daxilidir: Identity istifadəçiləri və parolları idarə edir, JWT isə API üçün giriş tokenidir.",
    sections: [
      {
        level: "baslangic",
        title: "Kimlik və icazə",
        blocks: [
          { t: "analogy", text: "Konsertə gedirsən. Kassada şəxsiyyətini göstərib bilet alırsan (giriş — autentifikasiya). Bilet üzərində «VIP zona» yazılıb. Sonra hər qapıda yalnız bileti göstərirsən — pasportu yox. Mühafizəçi biletin saxta olmadığını möhürdən (imza) bilir və zonana baxıb içəri buraxır (avtorizasiya). JWT — həmin biletdir." },
          { t: "code", lang: "csharp", code: `// Program.cs
builder.Services.AddAuthentication().AddJwtBearer();     // tokeni yoxla
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();      // sən kimsən?
app.UseAuthorization();       // icazən varmı?

// Hamıya açıq
app.MapGet("/", () => "Salam!");

// Yalnız giriş edənlər
app.MapGet("/profil", (ClaimsPrincipal user) => $"Salam, {user.Identity?.Name}")
   .RequireAuthorization();

// Yalnız adminlər
app.MapDelete("/istifadeciler/{id:int}", (int id) => Results.NoContent())
   .RequireAuthorization(p => p.RequireRole("Admin"));

// Controller-də
[Authorize]
public class SifarislerController : ControllerBase
{
    [HttpGet] public IActionResult Menimkiler() => Ok();

    [Authorize(Roles = "Admin")]
    [HttpGet("hamisi")] public IActionResult Hamisi() => Ok();

    [AllowAnonymous]
    [HttpGet("qiymetler")] public IActionResult Qiymetler() => Ok();
}` },
          { t: "terms", items: [
            ["autentifikasiya", "istifadəçinin kimliyinin təsdiqi (giriş)."],
            ["avtorizasiya", "təsdiqlənmiş istifadəçinin nəyə icazəsi olduğunun yoxlanması."],
            ["JWT (JSON Web Token)", "imzalanmış token: içində istifadəçi məlumatı (claim) var."],
            ["claim", "istifadəçi haqqında bir bəyanat: id, ad, rol."],
            ["[Authorize]", "endpoint-i yalnız giriş edənlərə açır."],
          ]},
          { t: "tip", text: "401 Unauthorized — «kim olduğunu bilmirəm» (token yoxdur və ya səhvdir). 403 Forbidden — «kim olduğunu bilirəm, amma icazən yoxdur»." },
        ],
      },
      {
        level: "orta",
        title: "Identity ilə qeydiyyat, giriş və JWT yaratmaq",
        blocks: [
          { t: "code", lang: "csharp", caption: "Identity + JWT qurulması", code: `public class Istifadeci : IdentityUser<int>
{
    public string TamAd { get; set; } = "";
}

public class AppDb(DbContextOptions<AppDb> o) : IdentityDbContext<Istifadeci, IdentityRole<int>, int>(o);

builder.Services.AddIdentityCore<Istifadeci>(o =>
    {
        o.Password.RequiredLength = 12;
        o.User.RequireUniqueEmail = true;
        o.Lockout.MaxFailedAccessAttempts = 5;                     // 5 səhv cəhd →
        o.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);   // 15 dəq kilid
    })
    .AddRoles<IdentityRole<int>>()
    .AddEntityFrameworkStores<AppDb>();

var jwt = builder.Configuration.GetSection("Jwt");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,           ValidIssuer = jwt["Issuer"],
            ValidateAudience = true,         ValidAudience = jwt["Audience"],
            ValidateLifetime = true,         ClockSkew = TimeSpan.FromSeconds(30),
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(jwt["Key"]!)),
        };
    });` },
          { t: "code", lang: "csharp", caption: "Qeydiyyat və giriş", code: `public record QeydiyyatDto([Required, EmailAddress] string Email, [Required] string Parol, [Required] string TamAd);
public record GirisDto([Required] string Email, [Required] string Parol);

app.MapPost("/auth/qeydiyyat", async (QeydiyyatDto giris, UserManager<Istifadeci> um) =>
{
    var istifadeci = new Istifadeci { UserName = giris.Email, Email = giris.Email, TamAd = giris.TamAd };
    var netice = await um.CreateAsync(istifadeci, giris.Parol);        // parolu heşləyib saxlayır

    return netice.Succeeded
        ? Results.Created()
        : Results.ValidationProblem(netice.Errors.ToDictionary(e => e.Code, e => new[] { e.Description }));
});

app.MapPost("/auth/giris", async (GirisDto giris, UserManager<Istifadeci> um, IConfiguration konfiq) =>
{
    var istifadeci = await um.FindByEmailAsync(giris.Email);

    if (istifadeci is null || await um.IsLockedOutAsync(istifadeci))
        return Results.Unauthorized();

    if (!await um.CheckPasswordAsync(istifadeci, giris.Parol))
    {
        await um.AccessFailedAsync(istifadeci);                        // səhv cəhdi say
        return Results.Unauthorized();                                 // eyni cavab — hansının səhv olduğunu demə
    }
    await um.ResetAccessFailedCountAsync(istifadeci);

    var claims = new List<Claim>
    {
        new(JwtRegisteredClaimNames.Sub, istifadeci.Id.ToString()),
        new(ClaimTypes.NameIdentifier, istifadeci.Id.ToString()),
        new(ClaimTypes.Name, istifadeci.TamAd),
        new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    };
    claims.AddRange((await um.GetRolesAsync(istifadeci)).Select(r => new Claim(ClaimTypes.Role, r)));

    var acar = new SymmetricSecurityKey(Convert.FromBase64String(konfiq["Jwt:Key"]!));
    var token = new JwtSecurityToken(
        issuer: konfiq["Jwt:Issuer"],
        audience: konfiq["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(15),                       // qısa ömür
        signingCredentials: new SigningCredentials(acar, SecurityAlgorithms.HmacSha256));

    return Results.Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
}).RequireRateLimiting("giris");

// Müştəri sonrakı sorğularda göndərir:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIs...` },
          { t: "p", text: "JWT üç hissədir: başlıq.yük.imza (nöqtə ilə ayrılır). Başlıq və yük (payload) sadəcə Base64-dür — hər kəs oxuya bilər. Yalnız imza tokenin dəyişdirilmədiyini sübut edir." },
          { t: "mistake", lang: "csharp", wrong: `var istifadeci = new Istifadeci { Email = giris.Email, Parol = giris.Parol };   // açıq mətn
db.Istifadeciler.Add(istifadeci);

// və ya zəif heş:
string hes = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(giris.Parol)));`, right: `await userManager.CreateAsync(istifadeci, giris.Parol);
// Identity: PBKDF2 + hər istifadəçiyə duz (salt) + yüz minlərlə iterasiya`, why: "Baza sızsa açıq parollar dərhal, SHA-256/MD5 heşləri isə saatlar içində sındırılır (sürətli heşlər parol üçün deyil). Parol üçün yavaş, duzlu alqoritm lazımdır: PBKDF2, bcrypt, Argon2. Özün yazma — Identity-nin PasswordHasher-ini işlət." },
          { t: "mistake", lang: "csharp", wrong: `new Claim("parol", giris.Parol),
new Claim("kartNomresi", istifadeci.Kart),      // JWT-yə sirr yazmaq`, right: `new Claim(ClaimTypes.NameIdentifier, istifadeci.Id.ToString()),
new Claim(ClaimTypes.Role, "Istifadeci"),`, why: "JWT şifrələnməyib — yalnız imzalanıb. Onu jwt.io-ya yapışdıran hər kəs içini oxuyur. Tokenə yalnız kimlik və icazə üçün lazım olan minimum yaz." },
          { t: "mistake", lang: "csharp", wrong: `if (istifadeci is null) return Results.NotFound("Belə istifadəçi yoxdur");
if (!parolDuzdur) return Results.BadRequest("Parol səhvdir");`, right: `if (istifadeci is null || !parolDuzdur) return Results.Unauthorized();   // "Email və ya parol səhvdir"`, why: "Fərqli cavablar hücumçuya hansı emaillərin qeydiyyatda olduğunu deyir (hesab sadalaması). Giriş xətasında həmişə eyni, ümumi cavab." },
        ],
      },
      {
        level: "senior",
        title: "Token ömrü, siyasətlər və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "JWT vəziyyətsizdir (stateless): server onu saxlamır, yalnız imzanı yoxlayır — miqyaslanması asandır. Qiyməti: verilmiş tokeni vaxtından əvvəl ləğv etmək çətindir. Ona görə access token qısaömürlü (5–15 dəq), yenilənməsi isə refresh token ilə olur.",
            "Refresh token: uzunömürlü, təsadüfi sətir (JWT yox), bazada HEŞİ saxlanır, hər istifadədə yenisi ilə əvəz olunur (rotation). Köhnə token təkrar işlədilsə — oğurluq əlamətidir: bütün token ailəsini ləğv et.",
            "Tokeni brauzerdə harada saxlamalı? localStorage XSS ilə oğurlanır. Daha təhlükəsizi: refresh token HttpOnly + Secure + SameSite cookie-də, access token yaddaşda. Və ya BFF qəlibi: tokenlər serverdə, brauzerdə yalnız sessiya cookie-si.",
            "Cookie və ya JWT? Öz saytın üçün (eyni domen) cookie autentifikasiyası sadə və təhlükəsizdir (CSRF qoruması ilə). JWT — mobil tətbiq, üçüncü tərəf API, mikroservislər arası üçün.",
            "İmza alqoritmi: HS256 — bir paylaşılan sirr (həm imzalayır, həm yoxlayır). RS256/ES256 — gizli açarla imzala, açıq açarla yoxla: yoxlayan xidmətlər token yarada bilmir. Mikroservislərdə asimmetrik seç.",
            "Özün auth serveri yazmaq əvəzinə hazır həllər: OpenID Connect provayderi (Entra ID, Auth0, Keycloak), .NET-də OpenIddict / Duende IdentityServer. API yalnız tokeni yoxlayır (Authority + Audience).",
            "Siyasət əsaslı avtorizasiya: rollar kobuddur. Policy + requirement + handler ilə incə qaydalar («yalnız öz sənədini», «18 yaşdan yuxarı», «abunəliyi aktiv»). Resurs əsaslı yoxlama üçün IAuthorizationService.AuthorizeAsync(user, resurs, siyasət).",
            "Token imzası yoxlanandan sonra claim-lər köhnələ bilər: rol alınıb, hesab bloklanıb — token isə hələ etibarlıdır. Kritik əməliyyatlarda bazadan təzə yoxla və ya security stamp / token versiyası işlət.",
            "Təhlükəsizlik — imza açarı: ən azı 256 bit təsadüfi dəyər (RandomNumberGenerator), sirr anbarında. appsettings.json-da «supersecretkey123» — hər kəsin admin tokeni yarada bilməsi deməkdir. Açarı dövri dəyiş (rotation, kid başlığı).",
            "Təhlükəsizlik — validasiyanı söndürmə: ValidateIssuer, ValidateAudience, ValidateLifetime, ValidateIssuerSigningKey hamısı true. Audience yoxlanmasa, başqa xidmət üçün verilmiş token səndə də keçər. RequireSignedTokens-i söndürmə; «alg: none» tokenləri qəbul olunmamalıdır — icazəli alqoritmləri açıq göstər (ValidAlgorithms).",
            "Təhlükəsizlik — brute force və credential stuffing: giriş endpoint-inə sürət limiti (IP və hesab üzrə), Identity lockout, sızmış parolların yoxlanması, çoxfaktorlu autentifikasiya (TOTP / passkey). Parol siyasəti: uzunluq (≥ 12) mürəkkəblik qaydalarından vacibdir.",
            "Təhlükəsizlik — vaxt hücumu: «istifadəçi yoxdur» halında parol heşi hesablanmır və cavab daha tez gəlir — bu fərq hesabın varlığını açır. Mövcud olmayan istifadəçi üçün də saxta heş yoxlaması apar.",
            "Təhlükəsizlik — parol sıfırlama: token təsadüfi, bir dəfəlik, qısaömürlü (15–60 dəq) olsun (UserManager.GeneratePasswordResetTokenAsync). Cavab həmişə eyni: «email varsa, link göndərildi». Linki Host başlığından qurma. Sıfırlamadan sonra bütün sessiyaları/refresh tokenləri ləğv et.",
            "Təhlükəsizlik — icazə serverdə: front-end-də düyməni gizlətmək və ya tokendəki rolu brauzerdə yoxlamaq qoruma deyil. Hər endpoint serverdə yoxlanır; «rol» və «istifadəçi id» heç vaxt sorğu gövdəsindən götürülmür.",
            "Təhlükəsizlik — default qapalı: FallbackPolicy = RequireAuthenticatedUser. Yeni endpoint-də [Authorize] unutmaq ən çox rast gələn boşluqdur.",
            "Təhlükəsizlik — loglar və URL: tokeni, parolu, sıfırlama linkini loga yazma; tokeni query string-də ötürmə (loglara, tarixçəyə, Referer-ə düşür). Auth hadisələrini (uğurlu/uğursuz giriş, parol dəyişmə, rol dəyişmə) audit jurnalına yaz.",
          ]},
          { t: "code", lang: "csharp", caption: "Refresh token rotasiyası və təkrar istifadənin aşkarlanması", code: `public class YenilemeTokeni
{
    public int Id { get; set; }
    public int IstifadeciId { get; set; }
    public string TokenHesi { get; set; } = "";        // tokenin özü YOX
    public Guid Aile { get; set; }                     // rotasiya zənciri
    public DateTime Bitme { get; set; }
    public DateTime? Istifade { get; set; }            // artıq işlədilibsə
    public DateTime? Legv { get; set; }
}

static string Hesle(string token) =>
    Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));   // yüksək entropiyalı təsadüfi dəyər üçün SHA-256 kifayətdir

static string YeniToken() =>
    Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));           // kriptoqrafik təsadüfi

app.MapPost("/auth/yenile", async (HttpContext ctx, AppDb db, ITokenXidmeti tokenler, CancellationToken ct) =>
{
    if (!ctx.Request.Cookies.TryGetValue("yt", out string? gelen))
        return Results.Unauthorized();

    string hes = Hesle(gelen);
    var movcud = await db.YenilemeTokenleri.FirstOrDefaultAsync(t => t.TokenHesi == hes, ct);

    if (movcud is null || movcud.Legv is not null || movcud.Bitme < DateTime.UtcNow)
        return Results.Unauthorized();

    if (movcud.Istifade is not null)
    {
        // Köhnə token təkrar işlədildi → oğurluq şübhəsi: bütün ailəni ləğv et
        await db.YenilemeTokenleri
            .Where(t => t.Aile == movcud.Aile && t.Legv == null)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.Legv, DateTime.UtcNow), ct);
        return Results.Unauthorized();
    }

    movcud.Istifade = DateTime.UtcNow;                 // bir dəfəlik

    string yeni = YeniToken();
    db.YenilemeTokenleri.Add(new YenilemeTokeni
    {
        IstifadeciId = movcud.IstifadeciId,
        TokenHesi = Hesle(yeni),
        Aile = movcud.Aile,
        Bitme = DateTime.UtcNow.AddDays(14),
    });
    await db.SaveChangesAsync(ct);

    ctx.Response.Cookies.Append("yt", yeni, new CookieOptions
    {
        HttpOnly = true,                               // JS oxuya bilmir → XSS ilə oğurlanmır
        Secure = true,
        SameSite = SameSiteMode.Strict,
        Path = "/auth",                                // yalnız auth endpoint-lərinə göndərilir
        Expires = DateTimeOffset.UtcNow.AddDays(14),
    });

    return Results.Ok(new { token = await tokenler.GirisTokeniYaratAsync(movcud.IstifadeciId, ct) });
}).AllowAnonymous().RequireRateLimiting("giris");

// Default qapalı + siyasət
builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build())
    .AddPolicy("Admin", p => p.RequireRole("Admin"))
    .AddPolicy("TesdiqlenmisEmail", p => p.RequireClaim("email_verified", "true"));` },
          { t: "qa", items: [
            ["Autentifikasiya ilə avtorizasiya fərqi?", "Autentifikasiya kimliyi təsdiqləyir (401 uğursuzluqda). Avtorizasiya icazəni yoxlayır (403)."],
            ["JWT-nin quruluşu və təhlükəsizliyi nədən asılıdır?", "header.payload.signature. Yük oxuna biləndir (şifrələnməyib); etibar imzadan gəlir — açar gizli, validasiya tam olmalıdır."],
            ["Niyə access token qısaömürlü olur?", "JWT-ni ləğv etmək çətindir; oğurlanmış tokenin zərəri ömrü ilə məhdudlaşır. Davamlılıq refresh token ilə təmin olunur."],
            ["Refresh token rotasiyası nədir?", "Hər yeniləmədə köhnə refresh token ləğv olunub yenisi verilir. Köhnənin təkrar istifadəsi oğurluğu göstərir və bütün zəncir ləğv edilir."],
            ["Parollar necə saxlanmalıdır?", "Yavaş, duzlu alqoritmlə heşlənmiş (PBKDF2, bcrypt, Argon2). Heç vaxt açıq mətn, şifrələnmiş və ya sürətli heş (MD5, SHA-256)."],
            ["Rol əsaslı və siyasət əsaslı avtorizasiya fərqi?", "Rol — sadə qrup yoxlaması. Siyasət — ixtiyari tələblər (claim, yaş, resurs sahibliyi) və handler-lərlə genişlənən qaydalar."],
            ["Tokeni brauzerdə harada saxlayırsan?", "Refresh tokeni HttpOnly/Secure/SameSite cookie-də, access tokeni yaddaşda; və ya BFF ilə tokenləri ümumiyyətlə brauzerə vermirəm. localStorage XSS-ə açıqdır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "«Sən kimsən?» sualına cavab verən nədir?", options: ["Autentifikasiya", "Avtorizasiya", "Validasiya"], answer: 0, why: "Kimliyin təsdiqi — autentifikasiya." },
          { t: "quiz", q: "Giriş edib, amma icazəsi yoxdur — hansı status?", options: ["401", "403", "404"], answer: 1, why: "403 Forbidden." },
          { t: "quiz", q: "JWT-nin yük (payload) hissəsi şifrələnibmi?", options: ["Bəli", "Xeyr — yalnız imzalanıb", "Yalnız HTTPS-də"], answer: 1, why: "Hər kəs oxuya bilər; sirr yazma." },
        ],
      },
    ],
    exercise: {
      task: "JWT ilə qorunan kiçik API yaz. 1) JWT Bearer autentifikasiyasını qur: issuer, audience, ömür və imza açarı yoxlansın; açar konfiqurasiyadan (koddan yox) gəlsin. 2) POST /auth/giris — email və parolu qəbul edir (yoxlama üçün sadə `IIstifadeciXidmeti.YoxlaAsync` işlət), uğurda 15 dəqiqəlik token qaytarır (claim-lər: id, ad, rol); səhvdə istifadəçinin və ya parolun səhv olduğunu AYIRMADAN 401. 3) GET /profil — yalnız giriş edənlər; id və adı token claim-lərindən oxuyub qaytarır. 4) GET /admin/statistika — yalnız «Admin» rolu. 5) GET /saglamliq — hamıya açıq. 6) Bütün digər endpoint-lər default olaraq qapalı olsun (FallbackPolicy). 7) Şərhdə yaz: tokenə niyə parol və ya kart nömrəsi yazmaq olmaz.",
      starter: `var builder = WebApplication.CreateBuilder(args);\n\n// autentifikasiya + avtorizasiya\n\nvar app = builder.Build();\n\napp.UseAuthentication();\napp.UseAuthorization();\n\n// endpoint-lər\n\napp.Run();\n\npublic record GirisDto(string Email, string Parol);\npublic record IstifadeciMelumati(int Id, string Ad, string Rol);\n\npublic interface IIstifadeciXidmeti\n{\n    Task<IstifadeciMelumati?> YoxlaAsync(string email, string parol, CancellationToken ct);\n}\n`,
      expect: "AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer TokenValidationParameters ilə: ValidateIssuer, ValidateAudience, ValidateLifetime, ValidateIssuerSigningKey = true, açar builder.Configuration-dan (sabit sətir yox); giriş: YoxlaAsync null olanda Results.Unauthorized() (tək ümumi cavab), uğurda JwtSecurityToken expires: UtcNow.AddMinutes(15), claim-lər NameIdentifier/Name/Role, SigningCredentials HmacSha256; /profil RequireAuthorization və ClaimsPrincipal-dan FindFirstValue; /admin/statistika RequireRole(\"Admin\") / policy; /saglamliq AllowAnonymous; SetFallbackPolicy(RequireAuthenticatedUser) və giriş endpoint-i AllowAnonymous; şərhdə JWT-nin şifrələnmədiyi (Base64, hər kəs oxuyur) izah olunub.",
    },
  },
  {
    slug: "konfiq",
    title: "Konfiqurasiya və mühitlər",
    intro: "Konfiqurasiya — kodun xaricində saxlanan tənzimləmələrdir: bağlantı sətri, API ünvanı, limitlər. Mühit (environment) isə tətbiqin harada işlədiyini bildirir: lokalda (Development) və ya canlıda (Production).",
    sections: [
      {
        level: "baslangic",
        title: "appsettings.json və oxumaq",
        blocks: [
          { t: "analogy", text: "Paltaryuyan maşının proqramı (kod) dəyişmir — amma temperaturu, sürəti düymələrlə (konfiqurasiya) hər dəfə özün seçirsən. Evdə və camaşırxanada eyni maşın fərqli tənzimləmə ilə işləyir. Maşını söküb yenidən yığmağa ehtiyac yoxdur." },
          { t: "code", lang: "json", caption: "appsettings.json", code: `{
  "Logging": {
    "LogLevel": { "Default": "Information" }
  },
  "Magaza": {
    "Ad": "Kod Mağaza",
    "SehifeOlcusu": 20,
    "Catdirilma": {
      "PulsuzHedd": 50,
      "Qiymet": 5
    }
  },
  "AllowedHosts": "kodmagaza.az"
}` },
          { t: "code", lang: "csharp", code: `var builder = WebApplication.CreateBuilder(args);

// Tək dəyər oxumaq: iç-içə açarlar ":" ilə
string? ad = builder.Configuration["Magaza:Ad"];
int olcu = builder.Configuration.GetValue<int>("Magaza:SehifeOlcusu", 10);   // default 10

// Mühit
if (builder.Environment.IsDevelopment())
{
    Console.WriteLine("Lokal mühit");
}

var app = builder.Build();

app.MapGet("/haqqinda", (IConfiguration konfiq) => new
{
    Ad = konfiq["Magaza:Ad"],
    Muhit = app.Environment.EnvironmentName,
});

app.Run();` },
          { t: "terms", items: [
            ["konfiqurasiya", "kodun xaricində saxlanan tənzimləmələr."],
            ["appsettings.json", "əsas tənzimləmə faylı."],
            ["IConfiguration", "tənzimləmələri oxumaq üçün xidmət."],
            ["mühit (environment)", "Development, Staging, Production — ASPNETCORE_ENVIRONMENT dəyişəni ilə təyin olunur."],
            ["mühit dəyişəni", "əməliyyat sistemində tətbiqə verilən açar=dəyər."],
          ]},
          { t: "tip", text: "appsettings.Development.json yalnız lokalda yüklənir və appsettings.json-dakı eyni açarları əvəz edir. Lokal üçün fərqli dəyərləri ora yaz." },
        ],
      },
      {
        level: "orta",
        title: "Options pattern, mənbələr və sirlər",
        blocks: [
          { t: "code", lang: "csharp", caption: "Güclü tipli tənzimləmələr", code: `public class MagazaTenzimleri
{
    public const string Bolme = "Magaza";

    [Required] public string Ad { get; set; } = "";
    [Range(1, 100)] public int SehifeOlcusu { get; set; } = 20;
    public CatdirilmaTenzimleri Catdirilma { get; set; } = new();
}

public class CatdirilmaTenzimleri
{
    [Range(0, 10_000)] public decimal PulsuzHedd { get; set; }
    [Range(0, 1_000)] public decimal Qiymet { get; set; }
}

// Qeydiyyat: bölməni sinfə bağla, yoxla, səhvdirsə tətbiq qalxmasın
builder.Services.AddOptions<MagazaTenzimleri>()
    .BindConfiguration(MagazaTenzimleri.Bolme)
    .ValidateDataAnnotations()
    .ValidateOnStart();

// İstifadə
public class SebetXidmeti(IOptions<MagazaTenzimleri> tenzim)
{
    private readonly MagazaTenzimleri _t = tenzim.Value;

    public decimal Catdirilma(decimal cem) =>
        cem >= _t.Catdirilma.PulsuzHedd ? 0 : _t.Catdirilma.Qiymet;
}` },
          { t: "code", lang: "bash", caption: "Mənbələr: sonrakı əvvəlkini əvəz edir", code: `# 1) appsettings.json
# 2) appsettings.{Mühit}.json
# 3) User Secrets (yalnız Development)
# 4) Mühit dəyişənləri
# 5) Əmr sətri arqumentləri

# Lokal sirlər — layihə qovluğundan KƏNARDA saxlanır, git-ə düşmür
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:Esas" "Server=localhost;Database=magaza;..."
dotnet user-secrets set "Odenis:ApiAcari" "sk_test_..."

# Production: mühit dəyişəni ( ":" əvəzinə "__" )
export ConnectionStrings__Esas="Server=db.daxili;Database=magaza;..."
export Magaza__SehifeOlcusu=50
export ASPNETCORE_ENVIRONMENT=Production

# Əmr sətri
dotnet run --Magaza:SehifeOlcusu=5` },
          { t: "list", items: [
            "IOptions<T> — singleton, tətbiq boyu dəyişmir. Ən çox işlənən.",
            "IOptionsSnapshot<T> — scoped, hər sorğuda yenidən oxunur (fayl dəyişibsə yeni dəyər).",
            "IOptionsMonitor<T> — singleton, dəyişikliyə reaksiya verir (OnChange).",
            "Bağlantı sətri: builder.Configuration.GetConnectionString(\"Esas\") — ConnectionStrings bölməsindən oxuyur.",
          ]},
          { t: "mistake", lang: "json", wrong: `{
  "ConnectionStrings": {
    "Esas": "Server=prod-db;User Id=sa;Password=Parol123!"
  },
  "Jwt": { "Key": "cox-gizli-acar-123" }
}`, right: `{
  "ConnectionStrings": { "Esas": "" },
  "Jwt": { "Issuer": "kodmagaza.az", "Audience": "kodmagaza-api" }
}`, why: "appsettings.json git-ə düşür — sirr tarixçədə əbədi qalır və repoya çıxışı olan hər kəs onu görür. Sirlər user-secrets (lokal), mühit dəyişəni və ya sirr anbarında (production) saxlanır. Repoya düşən sirr dərhal dəyişdirilməlidir." },
          { t: "mistake", lang: "csharp", wrong: `public class OdenisXidmeti(IConfiguration konfiq)
{
    public void Ode()
    {
        string acar = konfiq["Odenis:ApiAcari"]!;        // sehrli sətir, hər yerdə
        int cehd = int.Parse(konfiq["Odenis:Cehd"]!);    // yoxdursa — icra vaxtı xəta
    }
}`, right: `public class OdenisXidmeti(IOptions<OdenisTenzimleri> tenzim)
{
    private readonly OdenisTenzimleri _t = tenzim.Value;   // tipli, yoxlanmış
}`, why: "IConfiguration-u hər yerə yeritmək açar adlarını koda səpələyir, tip təhlükəsizliyi və validasiya yoxdur. Options sinfi bir yerdə təyin olunur və başlanğıcda yoxlanır." },
          { t: "mistake", lang: "csharp", wrong: `if (app.Environment.IsDevelopment() || true)        // «müvəqqəti» debug üçün
    app.UseDeveloperExceptionPage();`, right: `if (app.Environment.IsDevelopment())
    app.UseDeveloperExceptionPage();
else
    app.UseExceptionHandler();`, why: "Development davranışı production-a sızsa, stack trace və daxili məlumat hamıya görünür. Mühit yoxlamasını «müvəqqəti» dəyişmə — unudulur." },
        ],
      },
      {
        level: "senior",
        title: "Sirr idarəsi, yenidən yükləmə və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Konfiqurasiya provayderlər yığınıdır: hər provayder açar–dəyər lüğəti verir, sonrakı əvvəlkinin üstünə yazılır. Massivlər indekslə birləşir (Hostlar:0, Hostlar:1) — qismən əvəzləmə gözlənilməz nəticə verə bilər.",
            "12-faktor prinsipi: konfiqurasiya mühitdədir, kodda deyil. Eyni build (image) bütün mühitlərdə işləyir — yalnız mühit dəyişənləri fərqlənir. Mühitə görə ayrı build etmə.",
            "ValidateOnStart ilə «tez uğursuz ol»: səhv konfiqurasiya yayım anında üzə çıxsın, gecə saat 3-də ilk sorğuda yox. Mürəkkəb qaydalar üçün IValidateOptions<T>.",
            "reloadOnChange: JSON faylı dəyişəndə konfiqurasiya yenilənir — amma IOptions<T> köhnə dəyəri saxlayır. Dinamik tənzimləmə üçün IOptionsMonitor. Konteynerdə fayl izləməsi (inotify) etibarsız ola bilər.",
            "Feature flag-lər: Microsoft.FeatureManagement — xüsusiyyəti yayımdan ayrı açıb-bağlamaq, tədricən yaymaq. Mərkəzi konfiqurasiya: Azure App Configuration, Consul, etcd.",
            "Adlı options (named options): eyni tipin bir neçə nüsxəsi (iki ödəniş provayderi) — Configure<T>(\"ad\", ...) və IOptionsSnapshot<T>.Get(\"ad\").",
            "Mühit adları sərbəstdir, amma kodu IsDevelopment / IsProduction-a bağlamaq əvəzinə davranışı konfiqurasiya ilə idarə et — «Staging-də nə olacaq?» sualı itmir.",
            "Təhlükəsizlik — sirr anbarı: production sirləri Azure Key Vault / AWS Secrets Manager / HashiCorp Vault-da. Tətbiq onlara idarə olunan kimlik (managed identity) ilə çatır — «sirri oxumaq üçün başqa sirr» lazım olmur. Giriş jurnallanır, sirlər dövri dəyişdirilir (rotation).",
            "Təhlükəsizlik — mühit dəyişənləri ideal deyil: proses siyahısında, crash dump-da, debug endpoint-lərində və alt proseslərdə görünə bilər. Konteyner orkestratorunda sirləri fayl kimi bağlamaq (mounted secret) və ya birbaşa anbardan oxumaq daha yaxşıdır.",
            "Təhlükəsizlik — sirr sızmasının qarşısı: .gitignore-da appsettings.*.local.json, .env; repoda sirr skaneri (gitleaks, GitHub secret scanning) və pre-commit yoxlaması. Sızmış sirri tarixçədən silmək kifayət deyil — onu DƏYİŞ.",
            "Təhlükəsizlik — loglarda konfiqurasiya: başlanğıcda bütün konfiqurasiyanı (GetDebugView) loga yazma — bağlantı sətirləri və açarlar çıxır. Options sinfini loglama; xəta mesajına bağlantı sətrini salma.",
            "Təhlükəsizlik — AllowedHosts: \"*\" əvəzinə konkret domenlər. Host başlığı saxtalaşdırılaraq parol sıfırlama linkləri və keş zəhərlənə bilər.",
            "Təhlükəsizlik — mühit default-u: ASPNETCORE_ENVIRONMENT təyin olunmayıbsa Production sayılır — bu, təhlükəsiz default-dur. Production serverində onu Development etmə: Developer Exception Page, user-secrets və scope yoxlamaları açılır.",
            "Təhlükəsizlik — təhlükəsiz default-lar: options sinfində default dəyər ən sərt variant olsun (HTTPS məcburi, limitlər aşağı, debug bağlı). Konfiqurasiya itsə, tətbiq açıq yox, qapalı qalsın. «Auth-u söndür» tipli bayraq ümumiyyətlə olmasın.",
            "Təhlükəsizlik — müştəriyə gedən konfiqurasiya: front-end-ə ötürülən hər tənzimləmə açıqdır. Bütün bölməni JSON kimi qaytarma — yalnız açıq olmalı sahələri ayrıca DTO ilə ver.",
          ]},
          { t: "code", lang: "csharp", caption: "Sirr anbarı, sərt validasiya və açıq/gizli ayrımı", code: `var builder = WebApplication.CreateBuilder(args);

// Production: sirləri Key Vault-dan oxu — parol yoxdur, idarə olunan kimlik işlənir
if (!builder.Environment.IsDevelopment())
{
    builder.Configuration.AddAzureKeyVault(
        new Uri(builder.Configuration["KeyVault:Unvan"]!),
        new DefaultAzureCredential());
}

public sealed class OdenisTenzimleri
{
    public const string Bolme = "Odenis";

    [Required, Url] public string Unvan { get; set; } = "";
    [Required, MinLength(32)] public string ApiAcari { get; set; } = "";      // sirr
    [Range(1, 30)] public int VaxtLimitiSaniye { get; set; } = 5;             // təhlükəsiz default
    public bool SinaqRejimi { get; set; }                                     // default false
}

// Mürəkkəb qayda: production-da sınaq rejimi və HTTP ünvan qadağandır
public sealed class OdenisTenzimleriYoxlayici(IHostEnvironment muhit) : IValidateOptions<OdenisTenzimleri>
{
    public ValidateOptionsResult Validate(string? ad, OdenisTenzimleri t)
    {
        if (muhit.IsProduction() && t.SinaqRejimi)
            return ValidateOptionsResult.Fail("Production-da sınaq rejimi açıq ola bilməz");

        if (!t.Unvan.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            return ValidateOptionsResult.Fail("Ödəniş ünvanı HTTPS olmalıdır");

        return ValidateOptionsResult.Success;
    }
}

builder.Services.AddSingleton<IValidateOptions<OdenisTenzimleri>, OdenisTenzimleriYoxlayici>();
builder.Services.AddOptions<OdenisTenzimleri>()
    .BindConfiguration(OdenisTenzimleri.Bolme)
    .ValidateDataAnnotations()
    .ValidateOnStart();                       // səhvdirsə tətbiq qalxmır

var app = builder.Build();

// Müştəriyə yalnız açıq sahələr — bütün bölmə YOX
app.MapGet("/api/tenzimler", (IOptions<MagazaTenzimleri> m) => new
{
    m.Value.Ad,
    m.Value.SehifeOlcusu,
});

app.Run();` },
          { t: "qa", items: [
            ["Konfiqurasiya mənbələrinin üstünlük sırası?", "appsettings.json → appsettings.{Mühit}.json → user secrets (Dev) → mühit dəyişənləri → əmr sətri. Sonrakı əvvəlkini əvəz edir."],
            ["Options pattern nə verir?", "Güclü tip, bölmə üzrə qruplaşdırma, validasiya, testdə asan əvəzləmə və IConfiguration-dan asılılığın azalması."],
            ["IOptions, IOptionsSnapshot, IOptionsMonitor fərqi?", "IOptions — singleton, dəyişmir. Snapshot — scoped, hər sorğuda yenilənir. Monitor — singleton, cari dəyəri verir və dəyişikliyi bildirir."],
            ["Sirləri harada saxlayırsan?", "Lokalda user-secrets; production-da sirr anbarı (Key Vault və s.) və ya mühit dəyişənləri. Heç vaxt repoda."],
            ["ValidateOnStart nəyə lazımdır?", "Səhv və ya əskik konfiqurasiyanı ilk istifadədə yox, tətbiq qalxanda aşkarlamaq üçün."],
            ["Mühit dəyişənində iç-içə açar necə yazılır?", "İki alt xətt ilə: Magaza__SehifeOlcusu."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "\"Magaza\": { \"Ad\": ... } dəyərini necə oxuyursan?", options: ["konfiq[\"Magaza.Ad\"]", "konfiq[\"Magaza:Ad\"]", "konfiq[\"Magaza/Ad\"]"], answer: 1, why: "İç-içə açarlar iki nöqtə ilə ayrılır." },
          { t: "quiz", q: "API açarını harada saxlamaq OLMAZ?", options: ["User secrets", "Sirr anbarı", "appsettings.json (repoda)"], answer: 2, why: "Repodakı fayl hamıya görünür." },
          { t: "quiz", q: "Mühit təyin olunmayıbsa default hansıdır?", options: ["Development", "Production", "Staging"], answer: 1, why: "Təhlükəsiz default — Production." },
        ],
      },
    ],
    exercise: {
      task: "Email göndərmə xidməti üçün konfiqurasiya qur. 1) appsettings.json-da `Email` bölməsi: Server, Port, GonderenUnvan, GundelikLimit — PAROL OLMASIN. 2) `EmailTenzimleri` sinfi: Server məcburi, Port 1–65535, GonderenUnvan email formatında, GundelikLimit 1–10000 (default 500), Parol məcburi. 3) Options-u bölməyə bağla, DataAnnotations ilə yoxla, başlanğıcda yoxlanılsın. 4) `EmailXidmeti` tənzimləmələri IOptions ilə alsın (IConfiguration yox). 5) Parolu lokalda user-secrets ilə, production-da mühit dəyişəni ilə təyin edən əmrləri şərhdə yaz. 6) GET /api/email/veziyyet — yalnız Server və GundelikLimit qaytarsın (parol və bütün obyekt yox).",
      starter: `// appsettings.json\n// {\n//   "Email": { ... }\n// }\n\npublic class EmailTenzimleri\n{\n    public const string Bolme = "Email";\n    // sahələr\n}\n\nvar builder = WebApplication.CreateBuilder(args);\n\n// options qeydiyyatı\n\nvar app = builder.Build();\n\n// endpoint\n\napp.Run();\n\npublic class EmailXidmeti\n{\n}\n`,
      expect: "JSON-da Email bölməsində Parol yoxdur; EmailTenzimleri-də [Required] Server, [Range(1, 65535)] Port, [Required, EmailAddress] GonderenUnvan, [Range(1, 10000)] GundelikLimit = 500, [Required] Parol; AddOptions<EmailTenzimleri>().BindConfiguration(\"Email\") (və ya Bind(GetSection)).ValidateDataAnnotations().ValidateOnStart(); EmailXidmeti konstruktorda IOptions<EmailTenzimleri> alır və .Value işlədir; şərhdə dotnet user-secrets set \"Email:Parol\" ... və Email__Parol mühit dəyişəni; endpoint anonim obyektdə yalnız Server və GundelikLimit qaytarır.",
    },
  },
  {
    slug: "xetalar",
    title: "Xəta idarəsi və logging",
    intro: "Xətalar olacaq: baza cavab verməyəcək, istifadəçi səhv məlumat göndərəcək. Xəta idarəsi müştəriyə aydın və təhlükəsiz cavab verir; logging isə nə baş verdiyini sənin üçün qeyd edir.",
    sections: [
      {
        level: "baslangic",
        title: "ILogger ilə qeyd aparmaq",
        blocks: [
          { t: "analogy", text: "Log — təyyarənin «qara qutusu»dur. Uçuş zamanı hər şeyi yazır. Hər şey qaydasındadırsa, ona heç kim baxmır. Amma nəsə olanda, nə baş verdiyini yalnız o deyə bilir. Xəta idarəsi isə pilotun sərnişinlərə dediyidir: «texniki səbəbə görə gecikirik» — sakit, qısa, təfərrüatsız." },
          { t: "code", lang: "csharp", code: `app.MapGet("/sifarisler/{id:int}", (int id, ILogger<Program> log) =>
{
    log.LogInformation("Sifariş {SifarisId} istənildi", id);

    if (id <= 0)
    {
        log.LogWarning("Yanlış sifariş id-si: {SifarisId}", id);
        return Results.BadRequest();
    }

    try
    {
        var sifaris = SifarisiTap(id);
        return Results.Ok(sifaris);
    }
    catch (Exception ex)
    {
        log.LogError(ex, "Sifariş {SifarisId} yüklənərkən xəta", id);
        return Results.Problem("Daxili xəta baş verdi");      // müştəriyə detal yox
    }
});

// Sinifdə: konstruktordan
public class SifarisXidmeti(ILogger<SifarisXidmeti> log)
{
    public void Tamamla(int id) => log.LogInformation("Sifariş {SifarisId} tamamlandı", id);
}` },
          { t: "terms", items: [
            ["ILogger<T>", "log yazmaq üçün daxili xidmət; T — mənbə sinfi (kateqoriya)."],
            ["log səviyyəsi", "mesajın əhəmiyyəti: Trace, Debug, Information, Warning, Error, Critical."],
            ["strukturlaşdırılmış log", "mesaj şablonu + adlı dəyərlər: {SifarisId} ayrıca sahə kimi saxlanır."],
            ["istisna (exception)", "icra zamanı baş verən xəta."],
            ["ProblemDetails", "API xətaları üçün standart JSON formatı."],
          ]},
          { t: "tip", text: "Səviyyə seçimi: Information — normal hadisə («sifariş yaradıldı»). Warning — gözlənilməz, amma iş davam edir. Error — əməliyyat uğursuz oldu. Critical — tətbiq işləyə bilmir." },
        ],
      },
      {
        level: "orta",
        title: "Qlobal xəta tutucu və ProblemDetails",
        blocks: [
          { t: "code", lang: "csharp", caption: "Öz istisnaların və mərkəzi tutucu", code: `// Biznes istisnaları
public class TapilmadiException(string mesaj) : Exception(mesaj);
public class QaydaPozuntusuException(string mesaj) : Exception(mesaj);

// Bütün tutulmamış istisnalar bura düşür
public sealed class QlobalXetaTutucu(ILogger<QlobalXetaTutucu> log) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext ctx, Exception xeta, CancellationToken ct)
    {
        var (status, basliq) = xeta switch
        {
            TapilmadiException => (StatusCodes.Status404NotFound, "Tapılmadı"),
            QaydaPozuntusuException => (StatusCodes.Status409Conflict, "Əməliyyat mümkün deyil"),
            OperationCanceledException => (499, "Sorğu ləğv olundu"),
            _ => (StatusCodes.Status500InternalServerError, "Daxili xəta"),
        };

        if (status >= 500)
            log.LogError(xeta, "Tutulmamış xəta: {Yol}", ctx.Request.Path);
        else
            log.LogWarning("{XetaTipi}: {Mesaj}", xeta.GetType().Name, xeta.Message);

        ctx.Response.StatusCode = status;
        await ctx.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Status = status,
            Title = basliq,
            // 5xx-də daxili mesajı GÖSTƏRMƏ; biznes xətasının mesajı istifadəçi üçün yazılıb
            Detail = status < 500 ? xeta.Message : "Xəta qeydə alındı. Bir az sonra yenidən cəhd edin.",
            Extensions = { ["traceId"] = ctx.TraceIdentifier },
        }, ct);

        return true;                           // xəta emal olundu
    }
}

// Program.cs
builder.Services.AddExceptionHandler<QlobalXetaTutucu>();
builder.Services.AddProblemDetails();

var app = builder.Build();
app.UseExceptionHandler();                     // zəncirin ən əvvəlində
app.UseStatusCodePages();                      // boş 404/405 cavablarına da ProblemDetails

// İndi endpoint-lər təmizdir — try/catch yoxdur
app.MapGet("/mehsullar/{id:int}", async (int id, IMehsulXidmeti x, CancellationToken ct) =>
    await x.TapAsync(id, ct) ?? throw new TapilmadiException("Məhsul tapılmadı"));` },
          { t: "code", lang: "json", caption: "appsettings.json — log səviyyələri", code: `{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Warning",
      "MagazaApi.Services": "Debug"
    }
  }
}` },
          { t: "mistake", lang: "csharp", wrong: `log.LogInformation($"İstifadəçi {istifadeciId} sifariş {sifarisId} yaratdı");   // interpolasiya`, right: `log.LogInformation("İstifadəçi {IstifadeciId} sifariş {SifarisId} yaratdı", istifadeciId, sifarisId);`, why: "Interpolasiya sətri əvvəlcədən birləşdirir: dəyərlər ayrıca sahə kimi saxlanmır (axtarmaq olmur), səviyyə söndürülsə belə sətir qurulur, hər mesaj unikal olduğu üçün qruplaşdırma itir. Şablon + parametrlər işlət." },
          { t: "mistake", lang: "csharp", wrong: `try { await xidmet.SaxlaAsync(); }
catch (Exception) { }                          // xətanı udmaq

try { ... }
catch (Exception ex) { throw ex; }             // stack trace sıfırlanır`, right: `try { await xidmet.SaxlaAsync(); }
catch (DbUpdateException ex)
{
    log.LogError(ex, "Saxlama uğursuz oldu");
    throw;                                     // orijinal stack trace qalır
}`, why: "Boş catch xətanı gizlədir — məlumat itir, səbəbi heç kim bilmir. «throw ex» stack trace-i sıfırlayır. Ya mənalı emal et, ya da logla və «throw» ilə yuxarı ötür. Yalnız emal edə bildiyin istisnanı tut." },
          { t: "mistake", lang: "csharp", wrong: `catch (Exception ex)
{
    return Results.Problem(ex.ToString());     // stack trace, SQL, fayl yolları müştəriyə
}`, right: `catch (Exception ex)
{
    log.LogError(ex, "Ödəniş xətası, sifariş {SifarisId}", id);
    return Results.Problem("Ödəniş alınmadı. Yenidən cəhd edin.");
}`, why: "Daxili xəta mətni hücumçuya xəritədir: cədvəl adları, kitabxana versiyaları, fayl yolları. Detal loqa, müştəriyə ümumi mesaj və izləmə id-si." },
        ],
      },
      {
        level: "senior",
        title: "Müşahidə olunma, performans və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "İstisna bahalıdır (stack trace toplanır) — gözlənilən hallar üçün («tapılmadı», «validasiya səhvi») axın idarəsi kimi istisna atmaq isti yolda performansı vurur. Alternativ: Result<T> / OneOf tipi və ya TypedResults. İstisnanı həqiqətən gözlənilməz hal üçün saxla.",
            "Müşahidə olunmanın üç sütunu: loglar (nə oldu), metriklər (nə qədər, nə tez — sayğaclar, histoqramlar), izlər (distributed tracing — sorğu xidmətlər arasında hansı yolu keçdi). .NET-də standart: OpenTelemetry (ILogger, Meter, ActivitySource) → Prometheus/Grafana, Jaeger, Application Insights.",
            "Korrelyasiya: hər sorğunun TraceId-si bütün loglarda olmalıdır ki, bir sorğunun tam hekayəsini yığa biləsən. ASP.NET Core Activity-ni özü yaradır və W3C traceparent başlığını xidmətlər arası ötürür. Müştəriyə qaytarılan traceId dəstək üçün açardır.",
            "Scope: using (log.BeginScope(new Dictionary<string, object> { [\"SifarisId\"] = id })) — blok daxilindəki bütün loglara sahə əlavə olunur.",
            "Yüksək performanslı log: [LoggerMessage] mənbə generatoru — boxing və şablon təhlili yoxdur, səviyyə söndürülübsə xərc sıfıra yaxındır. İsti yolda bahalı arqumenti hesablamazdan əvvəl log.IsEnabled(LogLevel.Debug) yoxla.",
            "Strukturlaşdırılmış çıxış: production-da JSON konsol (AddJsonConsole) və ya Serilog → mərkəzi sistem (Seq, Elasticsearch, Loki). Konteynerdə fayla yox, stdout-a yaz — toplamaq platformanın işidir.",
            "Log həcmi puldur: Production-da Default = Information, səs-küylü kateqoriyalar Warning. Nümunə götürmə (sampling), sağlamlıq yoxlaması sorğularını süzmək. Hər sorğuda 20 sətir log — həm xərc, həm də vacib mesajın itməsidir.",
            "Davamlılıq (resilience): keçici xətalar (şəbəkə, 503) üçün təkrar cəhd + eksponensial gecikmə + jitter, circuit breaker, vaxt limiti — Microsoft.Extensions.Resilience / Polly (AddStandardResilienceHandler). Təkrar yalnız idempotent əməliyyatlar üçün.",
            "Sağlamlıq: /healthz/live (proses diridir) və /healthz/ready (asılılıqlar hazırdır) ayrı olsun. Xəta nisbəti və gecikmə (p95/p99) üzrə xəbərdarlıq (alert) qur — istifadəçi şikayətindən əvvəl sən bil.",
            "Təhlükəsizlik — loglarda həssas məlumat: parol, token, API açarı, kart nömrəsi, FİN, tam sorğu gövdəsi, Authorization/Cookie başlıqları loga DÜŞMƏMƏLİDİR. Loglar çox adamın əlindədir və uzun saxlanır. Obyekti bütöv loglama ({@Istifadeci}) — yalnız lazım olan sahələri. .NET-də redaksiya: Microsoft.Extensions.Compliance.Redaction ilə məlumat təsnifatı.",
            "Təhlükəsizlik — log injection: istifadəçi girişində sətir sonu (\\r\\n) varsa, saxta log sətri yaradıla bilər («admin uğurla giriş etdi»). Strukturlaşdırılmış (JSON) log bunu əsasən həll edir; mətn loglarında girişdən idarəedici simvolları təmizlə. Logları göstərən veb paneldə çıxışı kodlaşdır (XSS).",
            "Təhlükəsizlik — xəta cavabları: production-da stack trace, istisna tipi, SQL, fayl yolu, server versiyası qaytarılmır. ProblemDetails-ə istisna detallarını yalnız Development-də əlavə et. 404 və 403 arasında fərq də məlumat sızdıra bilər (resursun varlığı).",
            "Təhlükəsizlik — təhlükəsizlik hadisələrini logla: uğurlu/uğursuz giriş, parol dəyişmə, icazə rədd edilməsi (403), validasiya uğursuzluqlarının sıçrayışı, admin əməliyyatları, sürət limitinin aşılması. Bunlarsız hücumu nə aşkarlamaq, nə də araşdırmaq olur (OWASP: Security Logging and Monitoring Failures).",
            "Təhlükəsizlik — logların qorunması: loglara giriş məhdud olsun, tətbiq öz loglarını silə/dəyişə bilməsin (yalnız əlavə), saxlama müddəti təyin olunsun (şəxsi məlumat qanunlarına uyğun), saatlar sinxron olsun (UTC).",
            "Təhlükəsizlik — xəta ilə DoS: bahalı xəta yolu (böyük stack trace-in loglanması, hər xətada email) hücumçu tərəfindən kütləvi tətiklənə bilər. Xəta bildirişlərini qruplaşdır və sürətini məhdudlaşdır.",
            "Təhlükəsizlik — açıq qalmış uğursuzluq (fail open): icazə və ya validasiya yoxlamasında istisna «catch → davam et» ilə udulmamalıdır. Yoxlama uğursuz olsa — rədd et (fail closed).",
          ]},
          { t: "code", lang: "csharp", caption: "Mənbə generatorlu log, scope və təhlükəsiz audit", code: `public static partial class Loglar
{
    [LoggerMessage(EventId = 1001, Level = LogLevel.Information,
        Message = "Sifariş {SifarisId} yaradıldı, məbləğ {Mebleg}")]
    public static partial void SifarisYaradildi(this ILogger log, int sifarisId, decimal mebleg);

    [LoggerMessage(EventId = 2001, Level = LogLevel.Warning,
        Message = "Uğursuz giriş cəhdi: hesab {HesabHesi}, IP {Ip}")]
    public static partial void UgursuzGiris(this ILogger log, string hesabHesi, string? ip);

    [LoggerMessage(EventId = 2002, Level = LogLevel.Warning,
        Message = "İcazə rədd edildi: istifadəçi {IstifadeciId}, resurs {Resurs}")]
    public static partial void IcazeReddi(this ILogger log, int istifadeciId, string resurs);
}

public class GirisXidmeti(ILogger<GirisXidmeti> log, IHttpContextAccessor accessor)
{
    public void UgursuzCehd(string email)
    {
        // Email-in özünü yox, qısa heşini yaz: hadisələri əlaqələndirmək olur, şəxsi məlumat sızmır
        string hes = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(email.Trim().ToLowerInvariant())))[..12];
        log.UgursuzGiris(hes, accessor.HttpContext?.Connection.RemoteIpAddress?.ToString());
        // Parol HEÇ VAXT loglanmır — səhv olsa belə (çox vaxt düzgün parolun bir hərf fərqidir)
    }
}

// Sorğu boyu bütün loglara istifadəçi və sorğu id-si əlavə et
app.Use(async (ctx, next) =>
{
    var log = ctx.RequestServices.GetRequiredService<ILogger<Program>>();
    using (log.BeginScope(new Dictionary<string, object?>
    {
        ["TraceId"] = ctx.TraceIdentifier,
        ["IstifadeciId"] = ctx.User.FindFirstValue(ClaimTypes.NameIdentifier),
    }))
    {
        await next();
    }
});

// Development-də detal, production-da yox
builder.Services.AddProblemDetails(o => o.CustomizeProblemDetails = ctx =>
{
    ctx.ProblemDetails.Extensions["traceId"] = ctx.HttpContext.TraceIdentifier;

    if (!ctx.HttpContext.RequestServices.GetRequiredService<IHostEnvironment>().IsDevelopment())
        ctx.ProblemDetails.Detail = null;      // daxili mesajı sil
});` },
          { t: "qa", items: [
            ["Xətaları harada emal etmək lazımdır?", "Mərkəzi yerdə: UseExceptionHandler + IExceptionHandler. Endpoint-lərdə yalnız mənalı bərpa edə bildiyin istisnanı tut."],
            ["ProblemDetails nədir?", "RFC 9457 standartı ilə xəta cavabı: type, title, status, detail, instance + əlavə sahələr. Müştərilər üçün vahid format."],
            ["Strukturlaşdırılmış log nədir, niyə interpolasiya işlətmirik?", "Mesaj şablonu və adlı parametrlər ayrıca saxlanır — axtarış, filtr, qruplaşdırma mümkün olur və söndürülmüş səviyyədə sətir qurulmur."],
            ["throw ilə throw ex fərqi?", "throw orijinal stack trace-i saxlayır; throw ex onu cari sətirdən yenidən başladır."],
            ["Log səviyyələri hansılardır?", "Trace, Debug, Information, Warning, Error, Critical (və None)."],
            ["Loga nə yazmaq olmaz?", "Parol, token, açar, kart və şəxsi identifikasiya məlumatı, tam sorğu gövdəsi və auth başlıqları."],
            ["Müştəriyə xəta haqqında nə qaytarırsan?", "Düzgün status kodu, ümumi mesaj və traceId. Stack trace və daxili detal yalnız loglarda."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Əməliyyat uğursuz oldu — hansı səviyyə?", options: ["Information", "Error", "Trace"], answer: 1, why: "Uğursuz əməliyyat — Error." },
          { t: "quiz", q: "Düzgün log yazılışı hansıdır?", options: ["log.LogInformation($\"Id {id}\")", "log.LogInformation(\"Id {Id}\", id)", "Console.WriteLine(id)"], answer: 1, why: "Şablon + parametr — strukturlaşdırılmış log." },
          { t: "quiz", q: "Production-da müştəriyə stack trace göstərmək olarmı?", options: ["Bəli", "Xeyr", "Yalnız adminə"], answer: 1, why: "Daxili məlumat sızdırır." },
        ],
      },
    ],
    exercise: {
      task: "API üçün xəta idarəsi və log qur. 1) İki istisna sinfi: `TapilmadiException`, `StokCatmirException`. 2) `IExceptionHandler` reallaşdıran `XetaTutucu`: Tapilmadi → 404, StokCatmir → 409, qalanları → 500. 5xx-də LogError (istisna ilə), 4xx-də LogWarning. Cavab ProblemDetails olsun, traceId əlavə et; 500-də daxili mesajı QAYTARMA. 3) Program.cs-də qeydiyyat və UseExceptionHandler (düzgün yerdə). 4) POST /sifarisler endpoint-i: try/catch OLMADAN xidməti çağırsın; xidmət stok çatmayanda StokCatmirException atsın və uğurlu sifarişi strukturlaşdırılmış log ilə qeyd etsin (interpolasiya yox). 5) Şərhdə: loga yazılmamalı olan 3 məlumat növü.",
      starter: `public class TapilmadiException(string mesaj) : Exception(mesaj);\npublic class StokCatmirException(string mesaj) : Exception(mesaj);\n\npublic sealed class XetaTutucu(ILogger<XetaTutucu> log) : IExceptionHandler\n{\n    public async ValueTask<bool> TryHandleAsync(HttpContext ctx, Exception xeta, CancellationToken ct)\n    {\n        // status, log, ProblemDetails\n        return true;\n    }\n}\n\nvar builder = WebApplication.CreateBuilder(args);\n\n// qeydiyyat\n\nvar app = builder.Build();\n\n// pipeline + endpoint\n\napp.Run();\n\npublic record SifarisYaratDto(int MehsulId, int Say);\n`,
      expect: "XetaTutucu switch ilə tipə görə status seçir (404/409/500); status >= 500 olanda log.LogError(xeta, ...), əks halda LogWarning; ProblemDetails Status, Title, Extensions[\"traceId\"] = ctx.TraceIdentifier; 500-də Detail xeta.Message/ToString() deyil (ümumi mətn və ya null); builder.Services.AddExceptionHandler<XetaTutucu>() + AddProblemDetails(); app.UseExceptionHandler() endpoint-lərdən əvvəl; endpoint-də try/catch yoxdur; xidmətdə throw new StokCatmirException(...) və log.LogInformation(\"... {SifarisId} ...\", id) şablonla ($ interpolasiya yox); şərhdə parol, token/açar, kart/şəxsi məlumat kimi 3 növ.",
    },
  },
  {
    slug: "senior",
    title: "Senior: Clean Architecture",
    intro: "Clean Architecture — kodu qatlara bölür və asılılıqları içəriyə, biznes qaydalarına doğru yönəldir. Məqsəd: biznes məntiqi bazadan, freymvorkdan və UI-dan asılı olmasın — onları dəyişmək asan, məntiqi test etmək sadə olsun.",
    sections: [
      {
        level: "baslangic",
        title: "Qatlar və asılılıq qaydası",
        blocks: [
          { t: "analogy", text: "Soğanı düşün. Ən içdə — nüvə: biznesin qaydaları (sifariş necə hesablanır). Onun ətrafında — istifadə halları (sifariş yarat). Ən çöldə — texnika: baza, veb, email. Qayda sadədir: çöl qat içi tanıyır, iç qat çölü tanımır. Çöl qabığı dəyişsən (SQL Server → PostgreSQL), nüvə toxunulmaz qalır." },
          { t: "code", lang: "text", code: `Magaza.sln
├── src/
│   ├── Magaza.Domain/            # NÜVƏ: varlıqlar, dəyər obyektləri, qaydalar
│   │                             #   heç bir layihədən asılı deyil
│   ├── Magaza.Application/       # İSTİFADƏ HALLARI: əmrlər, sorğular, interfeyslər
│   │                             #   → Domain
│   ├── Magaza.Infrastructure/    # TEXNİKA: EF Core, email, fayl, xarici API
│   │                             #   → Application, Domain
│   └── Magaza.Api/               # GİRİŞ: endpoint-lər, DI, middleware
│                                 #   → Application, Infrastructure (yalnız qeydiyyat üçün)
└── tests/
    ├── Magaza.Domain.Tests/
    ├── Magaza.Application.Tests/
    └── Magaza.Api.Tests/` },
          { t: "terms", items: [
            ["Domain", "biznesin özü: varlıqlar və onların qaydaları. Freymvorkdan xəbərsizdir."],
            ["Application", "istifadə halları (use case): «sifariş yarat», «stoku azalt». Lazım olan interfeysləri burada təyin edir."],
            ["Infrastructure", "interfeyslərin real reallaşması: baza, email, fayl sistemi."],
            ["asılılıq qaydası", "asılılıqlar yalnız içəriyə yönəlir: Api → Application → Domain."],
            ["istifadə halı (use case)", "sistemin etdiyi bir iş, başdan sona."],
          ]},
          { t: "tip", text: "Domain layihəsinin .csproj faylına bax: orada EF Core, ASP.NET və ya başqa layihəyə istinad varsa — qayda pozulub." },
        ],
      },
      {
        level: "orta",
        title: "Bir istifadə halı, başdan sona",
        blocks: [
          { t: "code", lang: "csharp", caption: "Domain — qaydalar varlığın içindədir", code: `// Magaza.Domain
public sealed class Sifaris
{
    private readonly List<SifarisSetri> _setirler = [];

    public int Id { get; private set; }
    public int MusteriId { get; private set; }
    public SifarisStatusu Status { get; private set; } = SifarisStatusu.Yeni;
    public IReadOnlyList<SifarisSetri> Setirler => _setirler;
    public decimal Cem => _setirler.Sum(s => s.Qiymet * s.Say);

    private Sifaris() { }                                   // EF üçün

    public static Sifaris Yarat(int musteriId) => new() { MusteriId = musteriId };

    public void MehsulElaveEt(Mehsul mehsul, int say)
    {
        if (Status != SifarisStatusu.Yeni)
            throw new DomenXetasi("Təsdiqlənmiş sifarişə məhsul əlavə olunmur");
        if (say is < 1 or > 1000)
            throw new DomenXetasi("Say 1–1000 aralığında olmalıdır");

        mehsul.StokdanCix(say);                             // stok qaydası Mehsul-un içindədir
        _setirler.Add(new SifarisSetri(mehsul.Id, mehsul.Qiymet, say));   // qiymət məhsuldan
    }

    public void Tesdiqle()
    {
        if (_setirler.Count == 0) throw new DomenXetasi("Boş sifariş təsdiqlənmir");
        Status = SifarisStatusu.Tesdiqlenib;
    }
}` },
          { t: "code", lang: "csharp", caption: "Application — istifadə halı və interfeyslər", code: `// Magaza.Application
public interface ISifarisAnbari
{
    Task ElaveEtAsync(Sifaris sifaris, CancellationToken ct);
}

public interface IMehsulAnbari
{
    Task<List<Mehsul>> TapAsync(IReadOnlyCollection<int> idler, CancellationToken ct);
}

public interface IIsVahidi { Task SaxlaAsync(CancellationToken ct); }      // Unit of Work
public interface ICariIstifadeci { int Id { get; } }

public record SifarisYaratEmri(IReadOnlyList<SetirDto> Setirler);
public record SetirDto(int MehsulId, int Say);

public sealed class SifarisYaratHandler(
    ISifarisAnbari sifarisler,
    IMehsulAnbari mehsullar,
    IIsVahidi isVahidi,
    ICariIstifadeci istifadeci)
{
    public async Task<int> IcraEtAsync(SifarisYaratEmri emr, CancellationToken ct)
    {
        var idler = emr.Setirler.Select(s => s.MehsulId).Distinct().ToList();
        var tapilan = (await mehsullar.TapAsync(idler, ct)).ToDictionary(m => m.Id);

        var sifaris = Sifaris.Yarat(istifadeci.Id);          // müştəri tokendən, əmrdən yox

        foreach (var setir in emr.Setirler)
        {
            if (!tapilan.TryGetValue(setir.MehsulId, out var mehsul))
                throw new TapilmadiXetasi("Məhsul tapılmadı");
            sifaris.MehsulElaveEt(mehsul, setir.Say);        // qaydalar domendədir
        }

        sifaris.Tesdiqle();
        await sifarisler.ElaveEtAsync(sifaris, ct);
        await isVahidi.SaxlaAsync(ct);                       // hamısı bir tranzaksiyada
        return sifaris.Id;
    }
}` },
          { t: "code", lang: "csharp", caption: "Infrastructure və Api — texnika kənardadır", code: `// Magaza.Infrastructure
internal sealed class SifarisAnbari(MagazaDb db) : ISifarisAnbari
{
    public async Task ElaveEtAsync(Sifaris sifaris, CancellationToken ct) =>
        await db.Sifarisler.AddAsync(sifaris, ct);
}

public static class InfrastrukturQeydiyyati
{
    public static IServiceCollection AddInfrastruktur(this IServiceCollection s, IConfiguration k)
    {
        s.AddDbContext<MagazaDb>(o => o.UseSqlServer(k.GetConnectionString("Esas")));
        s.AddScoped<ISifarisAnbari, SifarisAnbari>();
        s.AddScoped<IMehsulAnbari, MehsulAnbari>();
        s.AddScoped<IIsVahidi>(sp => sp.GetRequiredService<MagazaDb>());
        return s;
    }
}

// Magaza.Api — nazik: HTTP ↔ istifadə halı
app.MapPost("/api/sifarisler", async (SifarisYaratEmri emr, SifarisYaratHandler handler, CancellationToken ct) =>
{
    int id = await handler.IcraEtAsync(emr, ct);
    return Results.Created($"/api/sifarisler/{id}", new { id });
}).RequireAuthorization();` },
          { t: "mistake", lang: "csharp", wrong: `// Magaza.Domain
public class Sifaris
{
    [Key] public int Id { get; set; }
    [JsonPropertyName("total")] public decimal Cem { get; set; }       // freymvork atributları
    public async Task SaxlaAsync(MagazaDb db) => await db.SaveChangesAsync();   // domen bazanı tanıyır
}`, right: `// Magaza.Domain — təmiz C#
public sealed class Sifaris
{
    public int Id { get; private set; }
    public decimal Cem => _setirler.Sum(s => s.Qiymet * s.Say);
}
// Xəritələmə Infrastructure-da: IEntityTypeConfiguration<Sifaris>`, why: "Domen EF Core-u, JSON-u və ya HTTP-ni tanıyırsa, onları dəyişmək domeni dəyişmək deməkdir və domeni bazasız test etmək olmur. Tənzimləməni kənar qatlara çıxar." },
          { t: "mistake", lang: "csharp", wrong: `public class Sifaris
{
    public decimal Cem { get; set; }
    public string Status { get; set; } = "";
    public List<SifarisSetri> Setirler { get; set; } = [];
}
// Qaydalar xidmətlərə səpələnib: if (sifaris.Status == "Yeni") sifaris.Cem += ...`, right: `public sealed class Sifaris
{
    public SifarisStatusu Status { get; private set; }
    public void MehsulElaveEt(Mehsul m, int say) { /* yoxlama + dəyişiklik */ }
}`, why: "«Qansız model» (anemic model): varlıq sadəcə məlumat çantasıdır, qaydalar isə hər yerdə təkrarlanır və bir yerdə unudulur. Vəziyyəti private set ilə bağla, dəyişikliyi yalnız qaydanı yoxlayan metodlarla et." },
          { t: "mistake", lang: "csharp", wrong: `// Kiçik CRUD üçün: IRepository<T>, IService<T>, Handler, Validator, Mapper, 4 layihə, 14 fayl
public interface IGenericRepository<T> { Task<T?> GetAsync(int id); /* ... */ }`, right: `// Sadə oxuma: birbaşa sorğu
app.MapGet("/api/kateqoriyalar", (MagazaDb db, CancellationToken ct) =>
    db.Kateqoriyalar.AsNoTracking().Select(k => new KateqoriyaDto(k.Id, k.Ad)).ToListAsync(ct));`, why: "Arxitektura mürəkkəbliyə görə seçilir. Sadə CRUD-a tam mərasim tətbiq etmək işi ləngidir və heç nə qazandırmır. Mürəkkəb qaydalı hissədə zəngin domen, sadə hissədə sadə kod — ikisi bir layihədə yaşaya bilər." },
        ],
      },
      {
        level: "senior",
        title: "Qəliblər, kompromislər və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Clean, Onion, Hexagonal (Ports & Adapters) eyni ideyanın variantlarıdır: nüvədə biznes, kənarda texnika, asılılıq içəriyə. «Port» — Application-dakı interfeys, «adapter» — Infrastructure-dakı reallaşma.",
            "CQRS: yazma (command) və oxuma (query) yolları ayrılır. Yazma zəngin domendən keçir; oxuma birbaşa DTO-ya proyeksiya edir (domeni yükləmədən) — həm sadə, həm sürətli. Ayrı bazalar və event sourcing isə nadir hallarda lazım olan növbəti addımdır.",
            "MediatR / mediator qəlibi: endpoint əmri göndərir, handler tapılır; kəsişən məsələlər (validasiya, log, tranzaksiya, icazə) pipeline behavior-da. Qiyməti: dolayılıq — «bunu kim emal edir?» sualı. Kiçik layihədə handler-i birbaşa yerit.",
            "Vertical Slice Architecture — alternativ: qatlara görə yox, xüsusiyyətə görə böl (Features/Sifarisler/Yarat: endpoint + handler + validator + DTO bir qovluqda). Dəyişiklik bir yerdə qalır. Clean ilə birləşdirmək olar: daxildə dilimlər, ortaq domen.",
            "Repository mübahisəsi: EF Core DbContext artıq Repository + Unit of Work-dür. Generic IRepository<T> çox vaxt faydasız örtükdür və EF-in gücünü gizlədir. Aqreqat üçün məqsədli anbar (ISifarisAnbari) domeni EF-dən ayırır və testi asanlaşdırır; oxuma sorğularında birbaşa DbContext/Dapper məqbuldur.",
            "DDD taktiki qəlibləri: aqreqat (bir tranzaksiya sərhədi, yalnız kökdən dəyişilir), dəyər obyekti (Pul, Email — dəyişməz, özünü yoxlayır), domen hadisəsi (SifarisTesdiqlendi — yan təsirləri ayırır), spesifikasiya.",
            "Domen hadisələri və outbox: «sifariş saxlanıldı» və «email/mesaj göndərildi» bir atom əməliyyat deyil. Hadisəni eyni tranzaksiyada outbox cədvəlinə yaz, fon işi onu göndərsin — itki və ya ikiqat göndərmə olmasın (idempotent istehlakçı).",
            "Modullu monolit: bir yayım vahidi, daxildə aydın sərhədli modullar (hər birinin öz sxemi, açıq müqaviləsi). Mikroservislərin əksər faydasını onların əməliyyat yükü olmadan verir — və lazım olanda modulu ayırmaq asandır.",
            "Arxitektura testləri: NetArchTest / ArchUnitNET ilə qaydanı avtomatik yoxla («Domain heç nəyə istinad etmir», «Infrastructure sinifləri internal-dır»). Qayda yalnız sənəddədirsə, bir gün pozulacaq.",
            "Test strategiyası: Domain — sürətli vahid testləri (asılılıqsız); Application — saxta anbarlarla handler testləri; Api — WebApplicationFactory + real baza (Testcontainers) ilə inteqrasiya testləri. Mock-ların çoxluğu dizayn problemi siqnalıdır.",
            "Xəritələmə: entity ↔ DTO üçün əl ilə xəritələmə və ya mənbə generatoru (Mapperly). Reflection əsaslı avtomatik mapper gizli xətalar və over-posting riski yaradır.",
            "Təhlükəsizlik — icazə Application qatında: icazə yoxlaması yalnız controller atributundadırsa, eyni istifadə halı başqa girişdən (fon işi, mesaj istehlakçısı, gRPC, yeni endpoint) çağırılanda keçilir. Yoxlamanı handler-də və ya pipeline behavior-da et — hər giriş nöqtəsi üçün eyni.",
            "Təhlükəsizlik — domen invariantları son müdafiədir: validasiya atributu keçilsə belə (başqa giriş, daxili çağırış), varlıq yanlış vəziyyətə düşməməlidir: mənfi balans, başqasının sifarişi, yanlış status keçidi. private set + qoruyucu metodlar.",
            "Təhlükəsizlik — etibar sərhədləri: müştəridən gələn hər şey etibarsızdır — əmrdə MusteriId, Qiymet, Endirim, Rol sahəsi olmasın. İstifadəçi ICariIstifadeci-dən, qiymət domendən gəlir. Xarici xidmətin cavabı da etibarsız girişdir — yoxla.",
            "Təhlükəsizlik — çoxkirayəçilik: tenant filtri hər sorğuda əl ilə yazılmamalıdır — unudulacaq. Infrastructure-da qlobal sorğu filtri və ya sətir səviyyəli təhlükəsizlik (RLS); tenant id-si tokendən.",
            "Təhlükəsizlik — Infrastructure sinifləri internal: Api qatı DbContext və ya konkret anbarı birbaşa işlədib Application-dakı yoxlamalardan yan keçə bilməsin. Yalnız interfeyslər və qeydiyyat metodu public.",
            "Təhlükəsizlik — domen hadisələrində və outbox-da həssas məlumat: hadisəyə parol, token, kart nömrəsi yazma — onlar bazada, növbədə və loglarda saxlanır və başqa xidmətlərə gedir. Yalnız identifikator ötür.",
            "Təhlükəsizlik — audit: «kim, nə vaxt, nəyi dəyişdi» kəsişən məsələdir — SaveChanges interceptor-u və ya pipeline behavior ilə mərkəzləşdir ki, heç bir istifadə halı ondan kənar qalmasın.",
          ]},
          { t: "code", lang: "csharp", caption: "İcazə və validasiya pipeline-da; dəyər obyekti; arxitektura testi", code: `// Application: hər əmr öz icazə tələbini bəyan edir
public interface IIcazeliEmr { string Siyaset { get; } }

public record SifarisLegvEmri(int SifarisId) : IRequest<Unit>, IIcazeliEmr
{
    public string Siyaset => "SifarisSahibi";
}

// Bütün əmrlər bu davranışdan keçir — hansı girişdən gəlməsindən asılı olmayaraq
public sealed class IcazeDavranisi<TEmr, TCavab>(IIcazeXidmeti icaze, ICariIstifadeci istifadeci)
    : IPipelineBehavior<TEmr, TCavab> where TEmr : notnull
{
    public async Task<TCavab> Handle(TEmr emr, RequestHandlerDelegate<TCavab> next, CancellationToken ct)
    {
        if (emr is IIcazeliEmr icazeli && !await icaze.IcazeVarAsync(istifadeci.Id, icazeli.Siyaset, emr, ct))
            throw new IcazeXetasi();                       // fail closed
        return await next(ct);
    }
}

// Domain: özünü yoxlayan, dəyişməz dəyər obyekti
public readonly record struct Pul
{
    public decimal Mebleg { get; }
    public string Valyuta { get; }

    public Pul(decimal mebleg, string valyuta)
    {
        if (mebleg < 0) throw new DomenXetasi("Məbləğ mənfi ola bilməz");
        if (valyuta is not ("AZN" or "USD" or "EUR")) throw new DomenXetasi("Naməlum valyuta");
        Mebleg = decimal.Round(mebleg, 2);
        Valyuta = valyuta;
    }

    public static Pul operator +(Pul a, Pul b) =>
        a.Valyuta == b.Valyuta
            ? new Pul(a.Mebleg + b.Mebleg, a.Valyuta)
            : throw new DomenXetasi("Fərqli valyutalar toplanmır");
}

// Domain: status keçidi yalnız icazəli yolla
public void LegvEt(int istifadeciId)
{
    if (MusteriId != istifadeciId) throw new DomenXetasi("Sifariş sizə aid deyil");     // son müdafiə
    if (Status is SifarisStatusu.Gonderilib or SifarisStatusu.Catdirilib)
        throw new DomenXetasi("Göndərilmiş sifariş ləğv olunmur");
    Status = SifarisStatusu.LegvEdilib;
}

// Arxitektura testi: qayda CI-da yoxlanır
[Fact]
public void Domain_hec_bir_qata_istinad_etmemelidir()
{
    var netice = Types.InAssembly(typeof(Sifaris).Assembly)
        .ShouldNot()
        .HaveDependencyOnAny("Magaza.Application", "Magaza.Infrastructure", "Microsoft.EntityFrameworkCore", "Microsoft.AspNetCore")
        .GetResult();

    Assert.True(netice.IsSuccessful);
}` },
          { t: "qa", items: [
            ["Clean Architecture-ın əsas qaydası?", "Asılılıq qaydası: mənbə kodu asılılıqları yalnız içəriyə — biznes qaydalarına doğru yönəlir. İç qat çöl qat haqqında heç nə bilmir."],
            ["Qatlar və məsuliyyətləri?", "Domain — varlıqlar və qaydalar; Application — istifadə halları və portlar; Infrastructure — baza və xarici xidmət adapterləri; Presentation/Api — HTTP girişi."],
            ["Application bazanı necə işlədir, əgər Infrastructure-dan asılı deyilsə?", "Dependency Inversion: Application interfeysi təyin edir, Infrastructure onu reallaşdırır, DI onları başlanğıcda birləşdirir."],
            ["CQRS nədir, nə vaxt lazımdır?", "Yazma və oxuma modellərinin ayrılması. Oxuma tələbləri yazmadan çox fərqlənəndə faydalıdır; sadə CRUD-da artıqdır."],
            ["Anemic və rich domain model fərqi?", "Anemic — yalnız xüsusiyyətlər, məntiq xidmətlərdə. Rich — vəziyyət bağlıdır, dəyişiklik qaydanı qoruyan metodlarla."],
            ["Nə vaxt Clean Architecture işlətməzsən?", "Kiçik CRUD, prototip, qısaömürlü xidmət. Mürəkkəblik domenin mürəkkəbliyinə uyğun olmalıdır."],
            ["İcazə yoxlaması hansı qatda olmalıdır?", "Application-da (handler/pipeline) — bütün giriş nöqtələri üçün eyni olsun; kritik invariantlar əlavə olaraq domendə."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Hansı qat heç nədən asılı deyil?", options: ["Api", "Infrastructure", "Domain"], answer: 2, why: "Domain nüvədir." },
          { t: "quiz", q: "EF Core DbContext hansı qatdadır?", options: ["Domain", "Infrastructure", "Application"], answer: 1, why: "Baza texnikadır — kənar qat." },
          { t: "quiz", q: "Asılılıqlar hansı istiqamətə yönəlir?", options: ["Çölə", "İçəriyə", "Hər iki tərəfə"], answer: 1, why: "Asılılıq qaydası: yalnız içəriyə." },
        ],
      },
    ],
    exercise: {
      task: "Kitabxana sistemi üçün «kitab götürmək» istifadə halını Clean Architecture ilə yaz (bir faylda, şərhlə qatları ayır). 1) Domain: `Kitab` (Id, Ad, MovcudSay; `Gotur()` — say 0-dırsa DomenXetasi atır, əks halda azaldır; vəziyyət private set) və `Uzv` (Id, AktivGoturmeSayi; `GoturmeElaveEt()` — 5-dən çox kitab götürə bilməz). 2) Application: `IKitabAnbari`, `IUzvAnbari`, `IIsVahidi`, `ICariIstifadeci` interfeysləri; `KitabGoturEmri(int KitabId)` — üzv id-si əmrdə OLMASIN; `KitabGoturHandler` — üzvü cari istifadəçidən tapır, domen metodlarını çağırır, bir dəfə saxlayır. 3) Infrastructure: bir anbarın EF Core reallaşması (internal) və DI qeydiyyat metodu. 4) Api: nazik POST endpoint-i (auth tələb olunur). 5) Şərhdə: niyə `UzvId` əmrdə yox, `ICariIstifadeci`-dən götürülür.",
      starter: `// ===== Domain =====\npublic class DomenXetasi(string mesaj) : Exception(mesaj);\n\npublic sealed class Kitab\n{\n}\n\npublic sealed class Uzv\n{\n}\n\n// ===== Application =====\npublic record KitabGoturEmri(int KitabId);\n\npublic sealed class KitabGoturHandler\n{\n}\n\n// ===== Infrastructure =====\n\n// ===== Api =====\n`,
      expect: "Kitab və Uzv-də xüsusiyyətlər private set, dəyişiklik yalnız Gotur()/GoturmeElaveEt() ilə və qayda pozulanda DomenXetasi; Domain-də EF/ASP.NET atributu və ya DbContext yoxdur; Application-da interfeyslər təyin olunub, handler onları konstruktordan alır, üzvü istifadeci.Id ilə tapır, kitab/üzv null olanda xəta, domen metodlarını çağırır və IIsVahidi.SaxlaAsync bir dəfə; əmrdə UzvId yoxdur; Infrastructure-da internal sealed anbar DbContext ilə və AddInfrastruktur genişlənmə metodu; endpoint yalnız handler-i çağırır və RequireAuthorization; şərhdə: müştəri başqasının id-sini göndərə bilər (IDOR/etibar sərhədi).",
    },
  },
  {
    slug: "performans",
    title: "Senior: performans və keşləmə",
    intro: "Sürətli API az resursla çox sorğuya cavab verir. Bunun yolları: lazımsız işi görməmək, nəticəni yadda saxlamaq (keş), axınları bloklamamaq və ölçmədən heç nəyi optimallaşdırmamaq.",
    sections: [
      {
        level: "baslangic",
        title: "Keş nədir",
        blocks: [
          { t: "analogy", text: "Çayçı hər müştəri üçün suyu yenidən qaynatmır — dəmlənmiş çay hazır durur və dərhal süzülür. Amma çay çox qalsa köhnəlir, ona görə arada təzələnir. Keş də belədir: bahalı nəticəni bir dəfə hazırla, bir müddət hazırını ver, sonra yenilə." },
          { t: "code", lang: "csharp", code: `builder.Services.AddMemoryCache();

app.MapGet("/api/kateqoriyalar", async (IMemoryCache kes, MagazaDb db, CancellationToken ct) =>
{
    // Keşdə varsa — onu qaytar; yoxdursa — hesabla, 5 dəqiqə saxla
    var kateqoriyalar = await kes.GetOrCreateAsync("kateqoriyalar", async giris =>
    {
        giris.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);

        return await db.Kateqoriyalar
            .AsNoTracking()
            .Select(k => new KateqoriyaDto(k.Id, k.Ad))
            .ToListAsync(ct);
    });

    return Results.Ok(kateqoriyalar);
});

// Məlumat dəyişəndə keşi təmizlə
app.MapPost("/api/kateqoriyalar", async (KateqoriyaYaratDto giris, IMemoryCache kes, MagazaDb db) =>
{
    db.Kateqoriyalar.Add(new Kateqoriya { Ad = giris.Ad });
    await db.SaveChangesAsync();
    kes.Remove("kateqoriyalar");
    return Results.Created();
});` },
          { t: "terms", items: [
            ["keş (cache)", "bahalı nəticənin müvəqqəti saxlanması."],
            ["TTL / ömür", "keşdəki məlumatın nə qədər etibarlı sayıldığı vaxt."],
            ["cache hit / miss", "keşdə tapıldı / tapılmadı (hesablamaq lazımdır)."],
            ["invalidasiya", "köhnəlmiş keşin silinməsi və ya yenilənməsi."],
            ["IMemoryCache", "tətbiqin öz yaddaşındakı keş."],
          ]},
          { t: "tip", text: "Keşə uyğun məlumat: tez-tez oxunur, nadir dəyişir, bir az köhnəlməsi problem deyil (kateqoriyalar, valyuta məzənnəsi). Uyğun olmayan: balans, stok, səbət — dəqiqlik vacib olan hər şey." },
        ],
      },
      {
        level: "orta",
        title: "Output cache, paylanmış keş, sıxılma və səhifələmə",
        blocks: [
          { t: "code", lang: "csharp", code: `// 1) Output cache: bütün HTTP cavabı serverdə keşlənir
builder.Services.AddOutputCache(o =>
{
    o.AddPolicy("mehsullar", p => p
        .Expire(TimeSpan.FromMinutes(2))
        .SetVaryByQuery("sehife", "kateqoriya")        // parametrə görə ayrı nüsxə
        .Tag("mehsullar"));
});

app.UseOutputCache();

app.MapGet("/api/mehsullar", MehsullariAl).CacheOutput("mehsullar");

app.MapPost("/api/mehsullar", async (MehsulYaratDto g, IOutputCacheStore kes, CancellationToken ct) =>
{
    // ... saxla
    await kes.EvictByTagAsync("mehsullar", ct);        // etiketlə təmizlə
    return Results.Created();
});

// 2) HybridCache: yaddaş (L1) + paylanmış (L2, Redis), "stampede" qoruması ilə
builder.Services.AddStackExchangeRedisCache(o => o.Configuration = builder.Configuration.GetConnectionString("Redis"));
builder.Services.AddHybridCache();

app.MapGet("/api/mehsullar/{id:int}", async (int id, HybridCache kes, MagazaDb db, CancellationToken ct) =>
{
    var mehsul = await kes.GetOrCreateAsync(
        $"mehsul:{id}",
        async c => await db.Mehsullar.AsNoTracking()
            .Where(m => m.Id == id)
            .Select(m => new MehsulDto(m.Id, m.Ad, m.Qiymet))
            .FirstOrDefaultAsync(c),
        new HybridCacheEntryOptions { Expiration = TimeSpan.FromMinutes(10) },
        tags: ["mehsullar"],
        cancellationToken: ct);

    return mehsul is null ? Results.NotFound() : Results.Ok(mehsul);
});

// 3) Cavab sıxılması
builder.Services.AddResponseCompression(o => o.EnableForHttps = true);
app.UseResponseCompression();

// 4) Səhifələmə + proyeksiya: yalnız lazım olanı gətir
static async Task<IResult> MehsullariAl(MagazaDb db, int sehife = 1, int olcu = 20, CancellationToken ct = default)
{
    olcu = Math.Clamp(olcu, 1, 100);
    var siyahi = await db.Mehsullar.AsNoTracking()
        .OrderBy(m => m.Id)
        .Skip((Math.Max(sehife, 1) - 1) * olcu)
        .Take(olcu)
        .Select(m => new MehsulDto(m.Id, m.Ad, m.Qiymet))
        .ToListAsync(ct);
    return Results.Ok(siyahi);
}` },
          { t: "list", items: [
            "IMemoryCache — bir serverdə, ən sürətli; bir neçə nüsxədə hər birinin öz keşi olur (uyğunsuzluq).",
            "Paylanmış keş (Redis) — bütün nüsxələr üçün ortaq; şəbəkə gediş-gəlişi və serializasiya xərci var.",
            "HybridCache — hər ikisini birləşdirir və eyni açar üçün paralel sorğuları bir hesablamada toplayır.",
            "Output cache — bütün cavabı serverdə saxlayır. Response caching isə HTTP başlıqları (Cache-Control) ilə brauzer/CDN keşini idarə edir.",
          ]},
          { t: "mistake", lang: "csharp", wrong: `app.MapGet("/api/hesabat", (HesabatXidmeti x) =>
{
    var netice = x.HesablaAsync().Result;         // axını bloklayır
    Thread.Sleep(100);
    return netice;
});`, right: `app.MapGet("/api/hesabat", async (HesabatXidmeti x, CancellationToken ct) =>
    await x.HesablaAsync(ct));`, why: "Bloklayan çağırış axın hovuzunu tükəndirir: yük altında sorğular növbədə qalır, gecikmə partlayır. I/O-nu başdan sona async et və CancellationToken ötür." },
          { t: "mistake", lang: "csharp", wrong: `// İstifadəçiyə xas cavab ümumi açarla keşlənir
app.MapGet("/api/profil", ProfiliAl).CacheOutput();
var sebet = await kes.GetOrCreateAsync("sebet", ...);        // hamı üçün eyni açar`, right: `app.MapGet("/api/profil", ProfiliAl);                         // keşləmə
var sebet = await kes.GetOrCreateAsync($"sebet:{istifadeciId}", ...);`, why: "Ümumi açarla keşlənmiş şəxsi məlumat növbəti istifadəçiyə göstərilir — ciddi məlumat sızması. Şəxsi məlumatı ya keşləmə, ya da açara istifadəçi id-sini daxil et. (Output cache default olaraq Authorization başlıqlı sorğuları keşləmir — bunu söndürmə.)" },
          { t: "mistake", lang: "csharp", wrong: `giris.SlidingExpiration = TimeSpan.FromMinutes(5);   // yalnız sürüşən ömür, ölçü limiti yox
kes.Set(istifadeciAxtarisi, netice);                 // açar — istifadəçi girişi`, right: `builder.Services.AddMemoryCache(o => o.SizeLimit = 10_000);

giris.SlidingExpiration = TimeSpan.FromMinutes(5);
giris.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);   // mütləq üst hədd
giris.Size = 1;`, why: "Sürüşən ömür tez-tez oxunan məlumatı əbədi saxlayır — heç vaxt yenilənmir. Limitsiz keş isə yaddaşı doldurur; açar istifadəçi girişindən qurulursa, hücumçu milyon fərqli açarla serveri yıxır. Mütləq ömür və ölçü limiti qoy." },
        ],
      },
      {
        level: "senior",
        title: "Ölçmə, dərin optimizasiya və təhlükəsizlik",
        blocks: [
          { t: "list", items: [
            "Əvvəl ölç: gecikməni orta ilə yox, p95/p99 ilə izlə. Alətlər: dotnet-counters (canlı sayğaclar), dotnet-trace, PerfView, BenchmarkDotNet (mikro ölçmə), k6/NBomber/bombardier (yük testi), OpenTelemetry + APM. Darboğaz adətən baza və xarici çağırışlardadır, C# kodunda yox.",
            "Baza — ən böyük qazanc: N+1-i aradan qaldır, proyeksiya et, indeks əlavə et, AsNoTracking, səhifələmə (böyük cədvəldə keyset), ExecuteUpdate/Delete, kompilyasiya olunmuş sorğular, AddDbContextPool. EF-in yaratdığı SQL-i oxu.",
            "Axın hovuzu aclığı: sync-over-async (.Result, .Wait()), Thread.Sleep, sinxron I/O. Əlamət: CPU aşağı, gecikmə yüksək, növbə uzunluğu artır (dotnet-counters: ThreadPool Queue Length). Həll — başdan sona async.",
            "Ayırmaları azalt: isti yolda LINQ və closure əvəzinə dövr; Span<T>/Memory<T>; ArrayPool; string birləşdirmə əvəzinə StringBuilder/interpolasiya handler-ləri; böyük obyektləri (85 KB+) təkrar yaratma (LOH). Gen 2 yığımlarının tezliyini izlə. Server GC default-dur — konteynerdə yaddaş limitini düzgün ver.",
            "JSON: System.Text.Json mənbə generatoru (JsonSerializerContext) — reflection yoxdur, başlanğıc sürətli, AOT-a uyğun. Böyük cavabları axınla ver (IAsyncEnumerable<T>) — bütün siyahını yaddaşa yığma.",
            "HTTP müştərisi: IHttpClientFactory, bağlantı hovuzu, HTTP/2; paralel xarici çağırışlar üçün Task.WhenAll (məhdud paralelliklə); vaxt limiti və davamlılıq siyasəti. Bir yavaş asılılıq bütün xidməti dondurmamalıdır (circuit breaker, bulkhead).",
            "Keş strategiyaları: cache-aside (ən çox işlənən: oxu → yoxdursa hesabla → yaz), write-through, refresh-ahead. Invalidasiya çətindir: TTL + hadisə əsaslı təmizləmə (tag) birlikdə. Bir neçə nüsxədə L1 keşini sinxronlaşdırmaq üçün Redis pub/sub (backplane).",
            "Cache stampede: populyar açarın ömrü bitəndə yüzlərlə sorğu eyni anda bazaya gedir. Həll: hər açar üçün tək hesablama (HybridCache bunu edir), TTL-ə təsadüfi əlavə (jitter), köhnəni ver + arxada yenilə (stale-while-revalidate).",
            "HTTP keşləməsi: Cache-Control (public/private, max-age, no-store), ETag + If-None-Match → 304 Not Modified (gövdə göndərilmir). Statik fayllar: asp-append-version / həşli adlar + uzun max-age + CDN.",
            "Miqyaslama: tətbiq vəziyyətsiz (stateless) olmalıdır — sessiya və keş xaricdə (Redis), fayllar obyekt anbarında. Onda üfüqi miqyaslama sadəcə nüsxə sayını artırmaqdır. Ağır işləri növbəyə çıxar (fon işçisi, mesaj broker-i) — sorğu dərhal 202 qaytarsın.",
            "Native AOT və ReadyToRun: başlanğıc vaxtı və yaddaşı azaldır (serverless, sürətli miqyaslama). Tiered PGO (default açıq) uzun işləyən xidmətlərdə isti kodu özü optimallaşdırır.",
            "Təhlükəsizlik — keş və şəxsi məlumat: autentifikasiyalı cavabları ümumi (shared) keşə salma. Cache-Control: private, no-store həssas səhifələrdə (bank, profil). CDN/proksi keşində Vary başlığı (Authorization, Cookie) olmasa, bir istifadəçinin cavabı başqasına verilir. Keş açarına tenant və istifadəçi id-si daxil olsun.",
            "Təhlükəsizlik — cache poisoning: keş açarına daxil olmayan, amma cavabı dəyişən giriş (X-Forwarded-Host, naməlum query parametri, başlıq) hücumçuya zəhərli cavabı hamı üçün keşlətməyə imkan verir. Cavaba təsir edən hər girişi açara daxil et və ya normallaşdır; etibarsız başlıqlara güvənmə.",
            "Təhlükəsizlik — keş ilə DoS: keş açarı istifadəçi girişindən qurulursa (axtarış sözü, ixtiyari query), hücumçu unikal açarlarla yaddaşı doldurur və ya hər sorğunu miss edib bazanı vurur. Ölçü limiti (SizeLimit), açarın normallaşdırılması, icazəli parametrlərin ağ siyahısı, mövcud olmayan nəticənin də qısa müddət keşlənməsi (negative caching).",
            "Təhlükəsizlik — sürət limiti və limitlər performansın hissəsidir: AddRateLimiter (istifadəçi/IP üzrə), sorğu gövdəsi limiti, səhifə ölçüsünün üst həddi, sorğu vaxt limiti (AddRequestTimeouts), paralel sorğu limiti (concurrency limiter). Bahalı endpoint-lərə (hesabat, ixrac, axtarış) ayrıca sərt limit.",
            "Təhlükəsizlik — sıxılma və sirlər (BREACH): HTTPS üzərində sıxılmış cavabda həm sirr (CSRF tokeni), həm də hücumçunun idarə etdiyi giriş varsa, cavab ölçüsündən sirr çıxarıla bilər. Sirr daşıyan dinamik səhifələrdə sıxılmanı söndür və ya tokeni hər cavabda maskala.",
            "Təhlükəsizlik — Redis: parol/ACL və TLS ilə, yalnız daxili şəbəkədə. Açıq Redis — məlumat oğurluğu və uzaqdan kod icrası deməkdir. Keşə deserializasiya etdiyin məlumat etibarsız sayılmalıdır (təhlükəsiz serializator, tip adını məlumatdan götürmə). Sessiya və tokenləri keşdə saxlayırsansa, şifrələ və TTL ver.",
            "Təhlükəsizlik — vaxt fərqi: keş «hit»-i sürətli, «miss»-i yavaşdır — bu fərqdən resursun mövcudluğu və ya başqasının nəyə baxdığı çıxarıla bilər. İcazə yoxlamasını keşdən ƏVVƏL et: keşlənmiş cavabı icazəsiz istifadəçiyə vermə.",
          ]},
          { t: "code", lang: "csharp", caption: "Təhlükəsiz keş açarı, ETag, sürət və vaxt limiti", code: `builder.Services.AddMemoryCache(o => o.SizeLimit = 50_000);
builder.Services.AddHybridCache(o =>
{
    o.MaximumPayloadBytes = 1024 * 1024;                 // 1 MB-dan böyük dəyər keşlənmir
    o.MaximumKeyLength = 256;
});

builder.Services.AddRequestTimeouts(o =>
    o.DefaultPolicy = new RequestTimeoutPolicy { Timeout = TimeSpan.FromSeconds(10) });

builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    o.AddPolicy("axtaris", ctx => RateLimitPartition.GetTokenBucketLimiter(
        ctx.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? ctx.Connection.RemoteIpAddress?.ToString() ?? "anonim",
        _ => new TokenBucketRateLimiterOptions
        {
            TokenLimit = 20, TokensPerPeriod = 10,
            ReplenishmentPeriod = TimeSpan.FromSeconds(10),
        }));
});

app.UseRateLimiter();
app.UseRequestTimeouts();

// Axtarış: açar normallaşdırılır, uzunluq məhduddur, icazə keşdən ƏVVƏL
app.MapGet("/api/axtar", async (
    string q, ICariIstifadeci istifadeci, HybridCache kes, IAxtarisXidmeti axtaris, CancellationToken ct) =>
{
    string soz = q.Trim().ToLowerInvariant();
    if (soz.Length is < 2 or > 50)
        return Results.BadRequest("Axtarış sözü 2–50 simvol olmalıdır");

    // Açarda tenant var: bir müştərinin nəticəsi başqasına getmir
    string acar = $"axtar:{istifadeci.TenantId}:{Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(soz)))}";

    var netice = await kes.GetOrCreateAsync(
        acar,
        async c => await axtaris.AxtarAsync(istifadeci.TenantId, soz, limit: 20, c),   // boş nəticə də keşlənir
        new HybridCacheEntryOptions { Expiration = TimeSpan.FromSeconds(60) },
        cancellationToken: ct);

    return Results.Ok(netice);
})
.RequireAuthorization()
.RequireRateLimiting("axtaris");

// ETag: dəyişməyibsə 304, gövdə göndərilmir; şəxsi cavab ümumi keşə düşmür
app.MapGet("/api/senedler/{id:int}", async (int id, HttpContext ctx, ISenedXidmeti x, CancellationToken ct) =>
{
    var sened = await x.TapAsync(id, ct);                 // sahiblik xidmətdə yoxlanır
    if (sened is null) return Results.NotFound();

    string etag = $"\\"{Convert.ToBase64String(sened.Versiya)}\\"";
    ctx.Response.Headers.CacheControl = "private, no-cache";    // brauzer saxlaya bilər, amma hər dəfə yoxlasın
    ctx.Response.Headers.ETag = etag;

    return ctx.Request.Headers.IfNoneMatch == etag
        ? Results.StatusCode(StatusCodes.Status304NotModified)
        : Results.Ok(sened);
}).RequireAuthorization();` },
          { t: "qa", items: [
            ["Performans probleminə necə yanaşırsan?", "Ölçürəm (metriklər, izlər, profil), darboğazı tapıram, bir dəyişiklik edirəm, yenidən ölçürəm. Təxminlə optimallaşdırmıram."],
            ["IMemoryCache, IDistributedCache, HybridCache fərqi?", "Memory — proses daxili, ən sürətli, nüsxələr arası paylaşılmır. Distributed — ortaq (Redis), serializasiya və şəbəkə xərci. Hybrid — ikisini birləşdirir, stampede qoruması və etiketlə invalidasiya verir."],
            ["Output caching ilə response caching fərqi?", "Output caching cavabı serverdə saxlayır və server idarə edir (invalidasiya mümkündür). Response caching HTTP başlıqları ilə müştəri/proksi keşini idarə edir."],
            ["Cache stampede nədir?", "Açarın ömrü bitəndə çoxlu sorğunun eyni anda mənbəyə getməsi. Həlli: açar başına tək hesablama, jitter, stale-while-revalidate."],
            ["Thread pool starvation nədir, əlaməti?", "Bloklayan çağırışlar axınları tutur, yeni sorğular növbədə qalır. CPU aşağı, gecikmə yüksək, növbə uzunluğu artır."],
            ["Keşlənməməli məlumat?", "İstifadəçiyə xas və həssas məlumat (ümumi açarla), tez-tez dəyişən və dəqiqlik tələb edən dəyərlər (balans, stok)."],
            ["ETag necə işləyir?", "Server cavaba versiya etiketi qoyur; müştəri növbəti dəfə If-None-Match ilə göndərir; dəyişməyibsə server gövdəsiz 304 qaytarır."],
          ]},
        ],
      },
      {
        level: "baslangic",
        title: "Özünü yoxla",
        blocks: [
          { t: "quiz", q: "Keşə ən uyğun məlumat hansıdır?", options: ["İstifadəçinin balansı", "Kateqoriyalar siyahısı", "Səbətin məzmunu"], answer: 1, why: "Tez-tez oxunur, nadir dəyişir." },
          { t: "quiz", q: "Məlumat dəyişəndə keşlə nə etmək lazımdır?", options: ["Heç nə", "Təmizləmək / yeniləmək", "Serveri söndürmək"], answer: 1, why: "Əks halda köhnə məlumat göstərilir." },
          { t: "quiz", q: "Bir neçə server nüsxəsi üçün ortaq keş?", options: ["IMemoryCache", "Redis (paylanmış keş)", "Statik dəyişən"], answer: 1, why: "Yaddaş keşi hər nüsxədə ayrıdır." },
        ],
      },
    ],
    exercise: {
      task: "Yavaş məhsul API-sini sürətləndir. 1) GET /api/mehsullar?kateqoriya=&sehife=&olcu= — səhifələmə (olcu ≤ 100), AsNoTracking, DTO proyeksiyası, async + CancellationToken. 2) Bu endpoint-ə 60 saniyəlik output cache: kateqoriya, sehife, olcu-ya görə ayrı nüsxə, «mehsullar» etiketi ilə. 3) GET /api/mehsullar/{id} — HybridCache (və ya IMemoryCache) ilə 10 dəqiqə; açar `mehsul:{id}`. 4) PUT /api/mehsullar/{id} — yenilədikdən sonra həm tək məhsulun keşini, həm də siyahının output cache-ni təmizlə. 5) GET /api/sebet — KEŞLƏMƏ; şərhdə səbəbini yaz. 6) Yaddaş keşinə ölçü limiti qoy və şərhdə izah et: keş açarını istifadəçinin axtarış sözündən qursan, hansı hücum mümkündür?",
      starter: `var builder = WebApplication.CreateBuilder(args);\n\n// keş xidmətləri\n\nvar app = builder.Build();\n\n// middleware\n\n// endpoint-lər\n\napp.Run();\n\npublic record MehsulDto(int Id, string Ad, decimal Qiymet);\npublic record MehsulYenileDto(string Ad, decimal Qiymet);\n`,
      expect: "AddOutputCache siyasəti: Expire(60 s), SetVaryByQuery(\"kateqoriya\", \"sehife\", \"olcu\"), Tag(\"mehsullar\"); app.UseOutputCache(); siyahı endpoint-i CacheOutput ilə, Math.Clamp(olcu, 1, 100), AsNoTracking/Select DTO, ToListAsync(ct); tək məhsul GetOrCreateAsync($\"mehsul:{id}\") 10 dəqiqə ömürlə; PUT-da kes.RemoveAsync/Remove(açar) + IOutputCacheStore.EvictByTagAsync(\"mehsullar\"); /api/sebet keşlənmir və şərhdə şəxsi məlumatın başqa istifadəçiyə sızması izah olunub; AddMemoryCache(o => o.SizeLimit = ...) (və ya HybridCache limitləri); şərhdə unikal açarlarla yaddaşın doldurulması (DoS) və açarın normallaşdırılması/limit; .Result/.Wait() yoxdur.",
    },
  },
];
