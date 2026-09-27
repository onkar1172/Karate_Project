import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserPlus, UserCheck, Shield } from 'lucide-react';

const Signup = ({ setActiveTab }) => {
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(
      formData.fullName,
      formData.email,
      formData.password,
      formData.phone,
      formData.role
    );

    if (res.success) {
      setActiveTab('login');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '0 20px' }}>
      <div className="glass-panel" style={{ padding: '40px 32px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--accent-gold)' }}>
            <UserPlus size={32} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '6px' }}>Student Registration</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join Royal Karate Association & start your belt journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              className="form-control"
              placeholder="e.g. Kenjiro Sato"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              className="form-control"
              placeholder="student@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="form-control"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Type</label>
            <select
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Student Account (ROLE_USER)</option>
              <option value="admin">Admin Instructor Account (ROLE_ADMIN)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gold"
            style={{ width: '100%', padding: '14px', marginTop: '10px' }}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'} <UserCheck size={16} />
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already registered?{' '}
          <button
            onClick={() => setActiveTab('login')}
            style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer' }}
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;
