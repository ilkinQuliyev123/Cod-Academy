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
];
