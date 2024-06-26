using FluentValidation;
using FATECRP.Schedules.Domain.Users.Commands;

namespace FATECRP.Schedules.Domain.Users.Validator;

public class RefreshUserCommandValidator : AbstractValidator<RefreshUserTokenCommand>
{
    public RefreshUserCommandValidator()
    {
    }
}
