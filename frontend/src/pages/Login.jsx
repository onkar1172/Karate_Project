import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Key, Mail, Shield, User } from 'lucide-react';

const Login = ({ setActiveTab }) => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      if (res.user.roles.includes('ROLE_ADMIN')) {
        setActiveTab('admin-dashboard');
      } else {
        setActiveTab('profile');
      }
    }
  };

  const fillQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div style={{ maxWidth: '460px', margin: '60px auto', padding: '0 20px' }}>
      <div className="glass-panel" style={{ padding: '40px 32px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(220, 38, 38, 0.15)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--accent-crimson)' }}>
            <Shield size={32} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '6px' }}>Sign In to Royal Karate Association</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Access your private Karate portal & courses</p>
        </div>

        {/* Quick Demo Credentials helper */}
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-sm)', padding: '12px', marginBottom: '24px', fontSize: '0.825rem' }}>
          <div style={{ color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '6px' }}>⚡ Quick Demo Login Buttons:</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              type="button" 
              onClick={() => fillQuickLogin('admin@karate.com', 'admin123')}
              className="btn btn-sm btn-gold"
              style={{ flex: 1, fontSize: '0.75rem' }}
            >
              <Shield size={12} /> Admin
            </button>
            <button 
              type="button" 
              onClick={() => fillQuickLogin('john.doe@karate.com', 'student123')}
              className="btn btn-sm btn-secondary"
              style={{ flex: 1, fontSize: '0.75rem' }}
            >
              <User size={12} /> Student
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                className="form-control"
                placeholder="email@karate.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', marginTop: '10px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'} <LogIn size={16} />
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <button
            onClick={() => setActiveTab('signup')}
            style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer' }}
          >
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
