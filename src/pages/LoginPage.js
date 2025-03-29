import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="logo-icon"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 className="login-title">Welcome back</h2>
            <p className="login-subtitle">
              Sign in to your account to access the dashboard
            </p>
          </div>

          <div className="login-form-container">
            <LoginForm onLoginSuccess={onLoginSuccess} />
          </div>
          <p className="login-footer">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      <div className="login-banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1 className="banner-title">User Management Dashboard</h1>
          <p className="banner-description">
            Access all your user data in one place with our powerful management tools.
          </p>
          <div className="banner-features">
            <div className="feature-card">
              <div className="feature-title">Easy Access</div>
              <p>Quickly view and manage all your users</p>
            </div>
            <div className="feature-card">
              <div className="feature-title">Secure</div>
              <p>Enterprise-grade security for your data</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;