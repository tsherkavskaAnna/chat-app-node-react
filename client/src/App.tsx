/*
import { socket } from './socket'; */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ForgotPassword from './components/ForgotPassword';
import ResetPasswordForm from './components/ResetPasswordForm';
import VerifyEmailPage from './components/VerifyEmailPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './context/ProtectedRoute';
import useAuthStore from './store/authStore';
import { useEffect } from 'react';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/verify/:veryficationCode"
            element={<VerifyEmailPage />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
