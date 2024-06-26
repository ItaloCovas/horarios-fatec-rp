using FATECRP.Schedules.Domain.Schedules.DTOs;

namespace FATECRP.Schedules.Domain.Scraper;

public interface IScraperService
{
    Task<StudentGradeDto> ScrapeAsync(string email, string password);
}
