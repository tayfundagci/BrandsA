import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mdlCreateUserRequest from '../core/servicemodels/user/CreateUserRequest';
import UserService from '../core/services/AuthService';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [user, setUser] = React.useState(new mdlCreateUserRequest("", ""));
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUser({ ...user, username: value });
    } else if (name === 'password') {
      setUser({ ...user, password: value });
    } else if (name === 'passwordRepeat') {
      setPasswordRepeat(value);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (user.password !== passwordRepeat) {
      toast.warning("Passwords do not match!");
      return;
    }
    const newUserReq = new mdlCreateUserRequest(user.username, user.password);
    const response = await UserService.Create(newUserReq);
    if (response.success) {
      toast.success(response.message);
      console.log(response);
      navigate("/login");
    } else {
      toast.warning(response.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className='flex flex-col gap-4 justify-center items-center'>
      <input
        type="text"
        placeholder='Username'
        name='username'
        className='rounded p-2 w-2/4'
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder='Password'
        name='password'
        className='rounded p-2 w-2/4'
        value={user.password}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder='Password again'
        name='passwordRepeat'
        className='rounded p-2 w-2/4'
        value={passwordRepeat}
        onChange={handleChange}
      />
      <button className='h-10 rounded bg-bgsecondary text-textprimary px-4'>Register</button>
      <Link to="/login">Have an account? <b>Login</b></Link>
    </form>
  );
}

export default RegisterPage;
