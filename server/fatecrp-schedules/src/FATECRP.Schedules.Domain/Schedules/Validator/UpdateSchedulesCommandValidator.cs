using FluentValidation;
using FATECRP.Schedules.Domain.Schedules.Commands;

namespace FATECRP.Schedules.Domain.Schedules.Validator;

public class UpdateSchedulesCommandValidator : AbstractValidator<UpdateSchedulesCommand>
{
    public UpdateSchedulesCommandValidator()
    {
    }
}
