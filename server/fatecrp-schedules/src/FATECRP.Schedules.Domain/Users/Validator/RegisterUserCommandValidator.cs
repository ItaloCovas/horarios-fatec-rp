using FluentValidation;
using FATECRP.Schedules.Domain.Users.Commands;

namespace FATECRP.Schedules.Domain.Users.Validator;

public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
    }
}
