import React, { useState, useEffect } from 'react';
import { enrollmentApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Award, Clock, BookOpen, Trash2, CheckCircle } from 'lucide-react';

const MyEnrollments = ({ setActiveTab }) => {
  const { showToast } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEnrollments();
  }, []);

  const fetchMyEnrollments = async () => {
    setLoading(true);
    try {
      const res = await enrollmentApi.getMyEnrollments();
      setEnrollments(res.data);
    } catch (err) {
      showToast('Failed to load active enrollments.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to drop this karate class?')) return;
    try {
      await enrollmentApi.cancelEnrollment(id);
      showToast('Class enrollment dropped.', 'info');
      fetchMyEnrollments();
    } catch (err) {
      showToast('Failed to cancel enrollment.', 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>
        Loading your registered classes & syllabus progress...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'white', margin: 0 }}>My Enrolled Karate Classes</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Track your active training modules & syllabus completion</p>
        </div>
        <button onClick={() => setActiveTab('classes')} className="btn btn-primary">
          <BookOpen size={16} /> Browse More Classes
        </button>
      </div>

      {enrollments.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Award size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
          <h3 style={{ color: 'white', marginBottom: '8px' }}>No Active Class Enrollments</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            You haven't registered for any martial arts courses yet. Explore our syllabus directory.
          </p>
          <button onClick={() => setActiveTab('classes')} className="btn btn-gold">
            Explore Courses
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {enrollments.map((item) => (
            <div key={item.id} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🥋</span>
                  <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>{item.classTitle}</h3>
                </div>

                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <span>Sensei: <strong style={{ color: 'white' }}>{item.instructorName}</strong></span>
                  <span><Clock size={13} style={{ display: 'inline', marginRight: '4px' }} /> {item.scheduleTime}</span>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    <span>Syllabus Completion</span>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{item.progressPercentage || 10}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.progressPercentage || 10}%`, background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-crimson))', height: '100%', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => handleCancel(item.id)}
                  className="btn btn-danger btn-sm"
                  title="Drop Class"
                >
                  <Trash2 size={16} /> Drop Class
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyEnrollments;
