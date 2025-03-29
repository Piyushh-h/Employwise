import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status when the component mounts
    checkAuthStatus();

    // Add event listener for storage changes (in case token is removed in another tab)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);
    setIsLoading(false);
  };

  const handleStorageChange = (e) => {
    if (e.key === 'token') {
      checkAuthStatus();
    }
  };

  // Create a protected route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div className="loading-screen">Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    
    return children;
  };

  return (
    <><Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute>
            <DashboardPage onLogout={() => setIsAuthenticated(false)} />
          </ProtectedRoute>} />
      </Routes>
    </Router><ToastContainer /></>
  );
}

export default App;