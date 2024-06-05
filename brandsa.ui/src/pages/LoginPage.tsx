import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import mdlUserLoginRequest from '../core/servicemodels/user/UserLoginRequest';
import UserService from '../core/services/AuthService';
import { toast } from 'react-toastify';
import CookieManager from '../core/helpers/CookieManager';

function LoginPage() {

  const [user, setUser] = React.useState(new mdlUserLoginRequest("", ""));

  const handleLogin = async () => {
    const newUserReq = new mdlUserLoginRequest(user.username, user.password);
    const response = await UserService.Login(newUserReq);
    if (response.success && response.body?.access_Token) {
      toast.success(response.message);
      CookieManager.setCookie("access_Token", response.body.access_Token);
      console.log(response);
    } else {
      toast.warning(response.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin} className='flex flex-col gap-4 justify-center items-center'>
        <input type="text" placeholder='Username' name='username' className='rounded p-2 w-2/4' onChange={(e) => setUser({ ...user, username: e.target.value })} />
        <input type="password" placeholder='Password' name='password' className='rounded p-2 w-2/4' onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button className='h-10 rounded bg-bgsecondary text-textprimary px-4' >Login</button>
        <Link to="/register">Don't have an account? <b>Register</b></Link>
      </form>
    </div>
  )
}

export default LoginPage