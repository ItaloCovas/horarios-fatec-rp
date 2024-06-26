using FATECRP.Schedules.Domain.Schedules.DTOs;

namespace FATECRP.Schedules.Domain.Scraper;

public interface IScraper
{
    Task<StudentGradeDto> ScrapeAsync(string email, string password);
}
