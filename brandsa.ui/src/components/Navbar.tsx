import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Navbar() {

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  return (
    <div className='h-24 flex justify-between items-center px-10 md:px-0'>
      <div className='left font-bold text-lg'>
        <Link to='/'>Brands A</Link>
      </div>
      <div className='right flex gap-3'>
        {user && (
          <div>
            <span>Welcome {user.username}!</span>
            <button className='px-5' onClick={handleLogout}>Logout</button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar