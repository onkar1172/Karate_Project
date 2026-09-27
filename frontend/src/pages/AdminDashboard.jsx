import React, { useState, useEffect } from 'react';
import { studentApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Users, Award, BookOpen, Shield, TrendingUp, UserPlus, PlusCircle } from 'lucide-react';
import BeltBadge from '../components/BeltBadge';

const AdminDashboard = ({ setActiveTab }) => {
  const { showToast } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await studentApi.getDashboardStats();
      setStats(res.data);
    } catch (err) {
      showToast('Failed to load admin statistics.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>
        Loading Dojo Sensei Analytics...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
            <Shield size={16} /> ADMIN MANAGEMENT CONSOLE
          </div>
          <h1 style={{ fontSize: '2.2rem', color: 'white', margin: '4px 0 0' }}>Royal Karate Overview & Analytics</h1>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setActiveTab('admin-students')} className="btn btn-gold">
            <UserPlus size={16} /> Add / Manage Students
          </button>
          <button onClick={() => setActiveTab('admin-classes')} className="btn btn-primary">
            <PlusCircle size={16} /> Add / Manage Classes
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>TOTAL REGISTERED STUDENTS</span>
            <Users size={22} color="var(--accent-gold)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white' }}>{stats?.totalStudents || 0}</div>
          <div style={{ fontSize: '0.8rem', color: '#34d399', marginTop: '4px' }}>Active Royal Karate Membership</div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #34d399' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>ACTIVE TRAINEES</span>
            <TrendingUp size={22} color="#34d399" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white' }}>{stats?.activeStudents || 0}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Currently enrolled in sessions</div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-crimson)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>TOTAL KARATE COURSES</span>
            <BookOpen size={22} color="var(--accent-crimson)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white' }}>{stats?.totalClasses || 0}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Active Shotokan modules</div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>COURSE ENROLLMENTS</span>
            <Award size={22} color="#3b82f6" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white' }}>{stats?.totalEnrollments || 0}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Class registrations</div>
        </div>

      </div>

      {/* Belt Distribution Breakdown */}
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.2rem' }}>Student Belt Rank Breakdown</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {stats?.beltDistribution && Object.entries(stats.beltDistribution).map(([belt, count]) => (
            <div key={belt} style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <BeltBadge rank={belt} />
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
