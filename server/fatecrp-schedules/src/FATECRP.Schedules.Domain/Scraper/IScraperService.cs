using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Users.DTOs;
using Google.Api.Gax;

namespace FATECRP.Schedules.Domain.Scraper;

public interface IScraperService
{
    Task<ScrapeHTMLDto> ScrapeHTMLAsync(string email, string password);
    Task<bool> ParseHtml(string htmlContent);

    public StudentDto GetStudent();
    public Dictionary<string, List<TagTimeDto>> GetTagTime();

}
