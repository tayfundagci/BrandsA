using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Password;
using BrandsA.Application.Response;
using BrandsA.Core.Enums;
using MediatR;

namespace BrandsA.Application.Handlers.User.Commands
{
    public class CreateUserCommand : IRequest<BaseDataResponse<UserDto>>
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public enmRole Role { get; set; }

        public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, BaseDataResponse<UserDto>>
        {
            IUserRepository _userRepository;
            private readonly IMapper _mapper;

            public CreateUserCommandHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            public async Task<BaseDataResponse<UserDto>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
            {
                var userList = await _userRepository.List();
                var existUser = userList.FirstOrDefault(x => x.Username == request.Username);

                if (existUser == null)
                {
                    var user = new Core.Entities.User()
                    {
                        Username = request.Username,
                        Password = Encryption.EncryptPassword(request.Password),
                        Role = request.Role,
                        CreatedDate = DateTime.Now
                    };

                    var userDto = _mapper.Map<UserDto>(user);
                    var success = await _userRepository.Create(user);
                    return new BaseDataResponse<UserDto>(userDto, success, "User created successfuly!");
                }
                else
                {
                    return new BaseDataResponse<UserDto>(null!, false, "This user is already exists!");

                }
            }

        }
    }


}



