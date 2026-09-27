import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, User, LogOut, LayoutDashboard, BookOpen, Users, Award, Menu, X, LogIn } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('home')} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-crimson), #991b1b)',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
          }}>
            <span style={{ fontSize: '1.4rem' }}>🥋</span>
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1.1, margin: 0 }}>ROYAL KARATE</h2>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>
              Association
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => handleNav('home')}
          >
            Home
          </button>

          <button 
            className={`btn ${activeTab === 'classes' ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => handleNav('classes')}
          >
            <BookOpen size={16} /> Classes & Syllabus
          </button>

          {user && !isAdmin && (
            <button 
              className={`btn ${activeTab === 'my-classes' ? 'btn-primary' : 'btn-secondary'}`} 
              onClick={() => handleNav('my-classes')}
            >
              <Award size={16} /> My Enrollments
            </button>
          )}

          {user && (
            <button 
              className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`} 
              onClick={() => handleNav('profile')}
            >
              <User size={16} /> My Profile
            </button>
          )}

          {isAdmin && (
            <div style={{ display: 'flex', gap: '8px', padding: '4px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <button 
                className={`btn btn-sm ${activeTab === 'admin-dashboard' ? 'btn-gold' : 'btn-secondary'}`} 
                onClick={() => handleNav('admin-dashboard')}
              >
                <LayoutDashboard size={15} /> Dashboard
              </button>
              <button 
                className={`btn btn-sm ${activeTab === 'admin-students' ? 'btn-gold' : 'btn-secondary'}`} 
                onClick={() => handleNav('admin-students')}
              >
                <Users size={15} /> Student Records
              </button>
              <button 
                className={`btn btn-sm ${activeTab === 'admin-classes' ? 'btn-gold' : 'btn-secondary'}`} 
                onClick={() => handleNav('admin-classes')}
              >
                <BookOpen size={15} /> Manage Classes
              </button>
            </div>
          )}
        </div>

        {/* User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>{user.fullName}</div>
                <div style={{ fontSize: '0.75rem', color: isAdmin ? 'var(--accent-gold)' : 'var(--text-secondary)', fontWeight: 600 }}>
                  {isAdmin ? 'ADMINISTRATOR' : 'STUDENT'}
                </div>
              </div>
              <button onClick={logout} className="btn btn-secondary btn-sm" title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleNav('login')} className="btn btn-secondary btn-sm">
                <LogIn size={15} /> Sign In
              </button>
              <button onClick={() => handleNav('signup')} className="btn btn-primary btn-sm">
                Join Royal Karate
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ padding: '16px 24px', background: '#111520', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => handleNav('home')}>Home</button>
          <button className="btn btn-secondary" onClick={() => handleNav('classes')}>Classes</button>
          {user && !isAdmin && (
            <button className="btn btn-secondary" onClick={() => handleNav('my-classes')}>My Enrollments</button>
          )}
          {user && (
            <button className="btn btn-secondary" onClick={() => handleNav('profile')}>My Profile</button>
          )}
          {isAdmin && (
            <>
              <button className="btn btn-gold" onClick={() => handleNav('admin-dashboard')}>Admin Dashboard</button>
              <button className="btn btn-gold" onClick={() => handleNav('admin-students')}>Student Directory</button>
              <button className="btn btn-gold" onClick={() => handleNav('admin-classes')}>Manage Classes</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
