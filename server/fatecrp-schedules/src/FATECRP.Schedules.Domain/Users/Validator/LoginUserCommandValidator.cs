using FluentValidation;
using FATECRP.Schedules.Domain.Users.Commands;

namespace FATECRP.Schedules.Domain.Users.Validator;

public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
{
    public LoginUserCommandValidator()
    {
    }
}
