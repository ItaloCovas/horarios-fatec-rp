using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Scraper;
using System.Net;

namespace FATECRP.Schedules.Infra.Data.Scraper;

public class ScraperService : IScraperService
{
    private readonly HttpClient _httpClient;
    private readonly CookieContainer _cookieContainer;

    public ScraperService()
    {
        _cookieContainer = new CookieContainer();
        var handler = new HttpClientHandler
        {
            CookieContainer = _cookieContainer
        };
        _httpClient = new HttpClient(handler);
    }
    public async Task<StudentGradeDto> ScrapeAsync(string email, string password)
    {

        return new StudentGradeDto();
        string result;
        var cookieContainer = new CookieContainer();
        var handler = new HttpClientHandler() { UseCookies = true, CookieContainer = cookieContainer };
        using (HttpClient client = new HttpClient(handler))
        {
            var UrlLogin = "https://siga.cps.sp.gov.br/ALUNO/login.aspx";
            var UrlHorario = "https://siga.cps.sp.gov.br/ALUNO/horario.aspx";

            var loginData = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("vSIS_USUARIOID", "58538924XSP"),
                new KeyValuePair<string, string>("vSIS_USUARIOSENHA", "Koppler123"),
                new KeyValuePair<string, string>("BTCONFIRMA", "Confirmar"),
                new KeyValuePair<string, string>("GXState", "{\"_EventName\":\"E'EVT_CONFIRMAR'.\"}")
            });

            var responseLogin = await client.PostAsync(UrlLogin, loginData);
            string responseLoginString = await responseLogin.Content.ReadAsStringAsync();

            var responseHorario = await client.PostAsync(UrlHorario, loginData);
            string responseHorarioString = await responseHorario.Content.ReadAsStringAsync();
            result = responseHorarioString;
        }


        Console.WriteLine(result);
        //return result;


    }
}
