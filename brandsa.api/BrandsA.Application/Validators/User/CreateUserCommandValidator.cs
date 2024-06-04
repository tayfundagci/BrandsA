using BrandsA.Application.Handlers.User;
using FluentValidation;

namespace BrandsA.Application.Validators.User
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommandValidator()
        {
            RuleFor(v => v.Username).NotEmpty().NotNull().WithMessage("Username can not be null or empty.");
            RuleFor(v => v.Password).NotNull().NotEmpty().WithMessage("Password can not be null or empty");
            RuleFor(v => v.Password).MinimumLength(8).WithMessage("Password must contains at least 8 characters");
        }
    }
}
