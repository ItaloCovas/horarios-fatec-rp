using AngleSharp;
using AngleSharp.Dom;
using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Scraper;
using FATECRP.Schedules.Domain.Users.DTOs;
using Google.Api.Gax;
using Newtonsoft.Json;
using System.Net;

namespace FATECRP.Schedules.Infra.Data.Scraper;

public class ScraperService : IScraperService
{
    private readonly HttpClient _httpClient;
    private readonly CookieContainer _cookieContainer;
    private StudentDto _student;
    private Dictionary<string, List<TagTimeDto>> _schedules;
    private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;

    public ScraperService(Microsoft.Extensions.Configuration.IConfiguration configuration)
    {
        _cookieContainer = new CookieContainer();
        var handler = new HttpClientHandler
        {
            CookieContainer = _cookieContainer
        };
        _httpClient = new HttpClient(handler);
        _configuration = configuration;
        _student = new StudentDto();
        _schedules = new Dictionary<string, List<TagTimeDto>>();
    }
    public StudentDto GetStudent() => _student;
    public Dictionary<string, List<TagTimeDto>> GetTagTime() => _schedules;

    public async Task<ScrapeHTMLDto> ScrapeHTMLAsync(string user, string password)
    {
        var loginUri = _configuration["SIGA:LoginUri"];
        var SchedulesUri = _configuration["SIGA:SchedulesUri"];


        string ScheduleHTML;
        var cookieContainer = new CookieContainer();
        var handler = new HttpClientHandler() { UseCookies = true, CookieContainer = cookieContainer };
        using (HttpClient client = new HttpClient(handler))
        {

            var loginData = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("vSIS_USUARIOID", user),
                new KeyValuePair<string, string>("vSIS_USUARIOSENHA", password),
                new KeyValuePair<string, string>("BTCONFIRMA", "Confirmar"),
                new KeyValuePair<string, string>("GXState", "{\"_EventName\":\"E'EVT_CONFIRMAR'.\"}")
            });

            var responseLogin = await client.PostAsync(loginUri, loginData);
            string responseLoginString = await responseLogin.Content.ReadAsStringAsync();

            var responseSchedule = await client.PostAsync(SchedulesUri, loginData);
            string responseScheduleString = await responseSchedule.Content.ReadAsStringAsync();
            ScheduleHTML = responseScheduleString;
            if (responseScheduleString.Contains("<body class=\"Form_Login\""))
                return new ScrapeHTMLDto() { HTML = ScheduleHTML };
            else if (responseScheduleString.Contains("<body class=\"Form\""))
                return new ScrapeHTMLDto() { Success = true, HTML = ScheduleHTML };
            return new ScrapeHTMLDto() { HTML = ScheduleHTML };
        }
    }

    public async Task<bool> ParseHtml(string htmlContent)
    {
        var config = Configuration.Default.WithDefaultLoader();
        var context = BrowsingContext.New(config);
        var document = await context.OpenAsync(req => req.Content(htmlContent));

        var daysOfWeek = new[]
        {
                "Segunda-Feira",
                "Terça-Feira",
                "Quarta-Feira",
                "Quinta-Feira",
                "Sexta-Feira",
                "Sábado"
        };

        foreach (var day in daysOfWeek)
        {
            var schedule = FindScheduleAsync(document, day);
            _schedules[day] = schedule;
        }

        if (_schedules is null || _schedules.Count == 0)
        {
            return false;
        }

      return FindStudentDatasAsync(document);

    }

    bool FindStudentDatasAsync(IDocument document)
    {
        var spanName = document.All
                    .Where(m => m.LocalName == "span" && (m?.Id?.Contains("PESSOALNOME", StringComparison.OrdinalIgnoreCase) ?? false))
                    .FirstOrDefault();
        _student.StudentName = spanName?.TextContent.Replace(" -", "");

        var spanRA = document.All
                    .Where(m => m.LocalName == "span" && (m?.Id?.Contains("ALUNOCURSOREGISTROACADEMICOCURSO", StringComparison.OrdinalIgnoreCase) ?? false))
                    .FirstOrDefault();
        _student.RA = spanRA?.TextContent;

        var spanSemester = document.All
                    .Where(m => m.LocalName == "span" && (m?.Id?.Contains("ALUNOCURSOCICLOATUAL", StringComparison.OrdinalIgnoreCase) ?? false))
                    .FirstOrDefault();
        _student.Semester = spanSemester?.TextContent.Replace(" ", "") + "º Semestre";

        if (_student.StudentName != null && _student.RA != null && _student.Semester != null)
            return true;
        return false;
    }


    static List<TagTimeDto> FindScheduleAsync(IDocument document, string searchTerm)
    {
        var dayElement = document.All
            .Where(m => m.LocalName == "span" && m.TextContent.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
            .FirstOrDefault();

        if (dayElement == null)
        {
            return new List<TagTimeDto>();
        }

        var parentTd = dayElement.Closest("td");
        if (parentTd == null)
        {
            return new List<TagTimeDto>();
        }

        var parentTr = parentTd.Closest("tr");
        if (parentTr == null)
        {
            return new List<TagTimeDto>();
        }

        var siblingTds = parentTr.Children.Where(m => m.LocalName == "td").ToList();
        int index = siblingTds.IndexOf(parentTd);

        if (index < 0 || index >= siblingTds.Count)
        {
            return new List<TagTimeDto>();
        }

        var nextTr = parentTr.NextElementSibling;
        if (nextTr == null || nextTr.LocalName != "tr")
        {
            return new List<TagTimeDto>();
        }

        var nextSiblingTds = nextTr.Children.Where(m => m.LocalName == "td").ToList();
        if (index >= nextSiblingTds.Count)
        {
            return new List<TagTimeDto>();
        }

        var nextTd = nextSiblingTds[index];
        var hiddenInput = nextTd.QuerySelector("input[type='hidden']");
        if (hiddenInput == null)
        {
            return new List<TagTimeDto>();
        }

        var inputValue = hiddenInput.GetAttribute("value");
        var scheduleList = ParseSchedule(inputValue);
        return scheduleList;
    }

    static List<TagTimeDto> ParseSchedule(string inputValue)
    {
        var scheduleList = new List<TagTimeDto>();

        var parsedArray = JsonConvert.DeserializeObject<string[][]>(inputValue);
        foreach (var item in parsedArray)
        {
            var lessonTime = item[1];
            var tag = item[2];
            scheduleList.Add(new TagTimeDto
            {
                Tag = tag,
                LessonTime = lessonTime
            });
        }

        return scheduleList;
    }
}