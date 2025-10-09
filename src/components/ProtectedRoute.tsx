import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'client' | 'photographer' | 'admin';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (requiredRole && userRole !== requiredRole) {
        // Redirect to appropriate dashboard based on role
        if (userRole === 'photographer') {
          navigate('/photographer-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    }
  }, [user, userRole, loading, navigate, requiredRole]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  if (requiredRole && userRole !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
