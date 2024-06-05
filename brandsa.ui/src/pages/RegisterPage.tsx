import React from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <form action="" className='flex flex-col gap-4 justify-center items-center'>
      <input type="text" placeholder='Username' name='username' className='rounded p-2 w-2/4' />
      <input type="password" placeholder='Password' name='password' className='rounded p-2 w-2/4' />
      <input type="password" placeholder='Password again' name='passwordRepeat' className='rounded p-2 w-2/4' />
      <button className='h-10 rounded bg-bgsecondary text-textprimary px-4'>Register</button>
      <Link to="/login">Have an account? <b>Login</b></Link>
    </form>
  )
}

export default RegisterPage