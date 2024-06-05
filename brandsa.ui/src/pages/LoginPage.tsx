import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import mdlUserLoginRequest from '../core/servicemodels/user/UserLoginRequest';
import UserService from '../core/services/AuthService';
import { toast } from 'react-toastify';
import CookieManager from '../core/helpers/CookieManager';
import { useAuth } from '../context/AuthContext';

function LoginPage() {

  const [userLoginReq, setUserLoginReq] = React.useState(new mdlUserLoginRequest("", ""));

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const newUserReq = new mdlUserLoginRequest(userLoginReq.username, userLoginReq.password);
    login(newUserReq);
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleLogin} className='flex flex-col gap-4 justify-center items-center'>
        <input type="text" placeholder='Username' name='username' className='rounded p-2 w-2/4' onChange={(e) => setUserLoginReq({ ...userLoginReq, username: e.target.value })} />
        <input type="password" placeholder='Password' name='password' className='rounded p-2 w-2/4' onChange={(e) => setUserLoginReq({ ...userLoginReq, password: e.target.value })} />
        <button className='h-10 rounded bg-bgsecondary text-textprimary px-4' >Login</button>
        <Link to="/register">Don't have an account? <b>Register</b></Link>
      </form>
    </div>
  )
}

export default LoginPage