
import './App.css';
import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateProduct from './pages/CreateProduct';

function App() {


  return (
    <div className='bg-[#f2f2f2]'>
      <div className="main justify-between  flex flex-col min-h-screen container mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
