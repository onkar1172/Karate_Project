import React, { useState, useEffect } from 'react';
import { classApi, enrollmentApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Clock, UserCheck, Shield, CheckCircle2, DollarSign } from 'lucide-react';
import BeltBadge from '../components/BeltBadge';

const StudentClasses = ({ setActiveTab }) => {
  const { user, showToast } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await classApi.getAllClasses();
      setClasses(res.data);
    } catch (err) {
      showToast('Failed to load karate classes.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (classId) => {
    if (!user) {
      showToast('Please sign in to enroll in karate classes.', 'info');
      setActiveTab('login');
      return;
    }

    setEnrollingId(classId);
    try {
      await enrollmentApi.enrollInClass(classId);
      showToast('Successfully enrolled in karate class!', 'success');
      fetchClasses();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to enroll in class.';
      showToast(msg, 'error');
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>
        Loading karate curriculum & classes...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.4rem', color: 'white', marginBottom: '10px' }}>Karate Class Directory</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Select your training module. From beginner stances to advanced Black Belt Bunkai.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
        {classes.map((cls) => (
          <div key={cls.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            
            {/* Class Card Image */}
            <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={cls.imageUrl || 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80'}
                alt={cls.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <BeltBadge rank={cls.beltLevelRequired} />
              </div>
            </div>

            {/* Class Content */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '8px' }}>{cls.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.5 }}>
                  {cls.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={14} color="var(--accent-gold)" /> Sensei: <strong style={{ color: 'white' }}>{cls.instructorName}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={14} color="var(--accent-crimson)" /> {cls.scheduleTime}
                  </div>
                </div>
              </div>

              {/* Pricing & Enrollment Footer */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>TUITION</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-gold)' }}>${cls.fee || '49.99'}</span>
                </div>

                {cls.isEnrolled ? (
                  <button className="btn btn-secondary btn-sm" disabled style={{ color: '#34d399', cursor: 'default' }}>
                    <CheckCircle2 size={16} /> Enrolled
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(cls.id)}
                    disabled={enrollingId === cls.id}
                    className="btn btn-primary"
                  >
                    {enrollingId === cls.id ? 'Registering...' : 'Enroll Now'}
                  </button>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentClasses;
