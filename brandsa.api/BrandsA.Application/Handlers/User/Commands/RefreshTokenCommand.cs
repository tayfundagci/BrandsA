using AutoMapper;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Response;
using BrandsA.Application.Services;
using BrandsA.Core.Entities;
using MediatR;

namespace BrandsA.Application.Handlers.User.Commands
{
    public class RefreshTokenCommand : IRequest<BaseDataResponse<Token>>
    {
        public string Refresh_Token { get; set; }

        public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, BaseDataResponse<Token>>
        {
            IUserRepository _userRepository;
            private readonly IMapper _mapper;

            public RefreshTokenCommandHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            public async Task<BaseDataResponse<Token>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
            {
                var userList = await _userRepository.List();
                var user = userList.FirstOrDefault(x => x.Refresh_Token == request.Refresh_Token && x.RefreshTokenExpireDate > DateTime.Now);
                if (user != null)
                {
                    TokenService tokenService = new TokenService();
                    Core.Entities.Token token = tokenService.CreateToken(user);
                    user.Refresh_Token = token.Refresh_Token;
                    user.RefreshTokenExpireDate = token.Expiration.AddMinutes(5);
                    await _userRepository.Update(user);

                    return new BaseDataResponse<Token>(token, true, "Access token refreshed!");
                }
                else
                {
                    return new BaseDataResponse<Token>(null!, false, "No valid refresh token found!");
                }

            }

        }
    }
}
