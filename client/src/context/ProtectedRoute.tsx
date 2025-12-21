import { type ReactNode } from 'react';
import useAuthStore from '../store/authStore';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
