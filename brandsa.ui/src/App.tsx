
import './App.css';
import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Protected from './components/Protected';
import { useAuth } from './context/AuthContext';
import CookieManager from './core/helpers/CookieManager';
import ProductForm from './components/ProductForm';
import { enmRole } from './core/enums/Role';
import DetailPage from './pages/DetailPage';

function App() {

  const { user } = useAuth();

  var token = CookieManager.getCookie("access_Token");

  return (
    <div className='bg-[#f1f1f1]'>
      <div className="main justify-between  flex flex-col min-h-screen container mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Protected loggedIn={token ? true : false}><HomePage /></Protected>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/create" element={<Protected loggedIn={token ? true : false} isAdmin={user?.role === enmRole.Admin}><ProductForm /></Protected>} />
          <Route path="/edit/:id" element={<Protected loggedIn={token ? true : false} isAdmin={user?.role === enmRole.Admin}><ProductForm /></Protected>} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
