import { Link, useNavigate } from 'react-router-dom'
import CookieManager from '../core/helpers/CookieManager';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  return (
    <div className='h-24 flex justify-between items-center'>
      <div className='left font-bold text-lg'>
        <Link to='/'>Brands A</Link>
      </div>
      <div className='right flex gap-3'>
        {/* <Link to="/">Home</Link>
        <Link to="/login">Login</Link> */}
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  )
}

export default Navbar