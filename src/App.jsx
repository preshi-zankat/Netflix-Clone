import Home from './pages/Home/Home.jsx';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Player from './pages/Player/Player.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = auth.currentUser;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && location.pathname === '/login') {
        
        navigate('/');
      } else if (!user && location.pathname !== '/login') {
        toast.info('Please log in.');
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<ProtectedRoute><Player /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
