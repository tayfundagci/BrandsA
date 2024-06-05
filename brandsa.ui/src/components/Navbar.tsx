import { Link } from 'react-router-dom'

function Navbar() {

  const auth = false;

  return (
    <div className='h-24 flex justify-between items-center'>
      <div className='left font-bold text-lg'>
        <Link to='/'>Brands A</Link>
      </div>
      <div className='right flex gap-3'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        {auth && <button onClick={() => console.log("logout")}>Logout</button>}
      </div>
    </div>
  )
}

export default Navbar