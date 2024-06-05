using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Password;
using BrandsA.Application.Response;
using BrandsA.Application.Services;
using MediatR;

namespace BrandsA.Application.Handlers.User.Queries
{
    public class UserLoginQuery : IRequest<BaseDataResponse<UserLoginResponse>>
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public class UserLoginQueryHandler : IRequestHandler<UserLoginQuery, BaseDataResponse<UserLoginResponse>>
        {
            IUserRepository _userRepository;
            private readonly IMapper _mapper;

            public UserLoginQueryHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            public async Task<BaseDataResponse<UserLoginResponse>> Handle(UserLoginQuery request, CancellationToken cancellationToken)
            {
                var userList = await _userRepository.List();
                var user = userList.FirstOrDefault(x => x.Username == request.Username);
                var userDto = _mapper.Map<UserDto>(user);
                if (user != null)
                {
                    if (Encryption.VerifyPassword(request.Password, user.Password))
                    {
                        TokenService tokenService = new TokenService();
                        Core.Entities.Token token = tokenService.CreateToken(user);

                        var response = new UserLoginResponse()
                        {
                            User = userDto,
                            Access_Token = token.Access_Token,
                            Refresh_Token = token.Refresh_Token,
                            Expiration = token.Expiration.AddMinutes(10)
                        };

                        user.Refresh_Token = token.Refresh_Token;
                        user.RefreshTokenExpireDate = token.Expiration.AddMinutes(10);

                        await _userRepository.Update(user);

                        return new BaseDataResponse<UserLoginResponse>(response, true, "Login successful!");
                    }
                    else
                    {
                        return new BaseDataResponse<UserLoginResponse>(null!, false, "Invalid Credentials!");
                    }
                }
                else
                {
                    return new BaseDataResponse<UserLoginResponse>(null!, false, "User not found!");
                }




            }
        }

    }
}
