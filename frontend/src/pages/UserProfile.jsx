import React, { useState, useEffect } from 'react';
import { userApi, studentApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BeltBadge from '../components/BeltBadge';
import { User, Shield, Phone, Mail, Calendar, MapPin, Award, Edit3, Save, Lock } from 'lucide-react';

const UserProfile = () => {
  const { user, showToast, updateUserState } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    phone: '',
    dojoBranch: '',
    emergencyContact: '',
    age: ''
  });

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    setLoading(true);
    try {
      // Calls /api/users/me -> ONLY returns logged-in user's profile
      const res = await userApi.getProfile();
      setProfileData(res.data);
      setEditForm({
        fullName: res.data.fullName || '',
        phone: res.data.phone || '',
        dojoBranch: res.data.dojoBranch || '',
        emergencyContact: res.data.emergencyContact || '',
        age: res.data.age || ''
      });

      // If user has student profile, fetch /api/students/me
      try {
        const studentRes = await studentApi.getMyStudentProfile();
        setStudentData(studentRes.data);
      } catch (e) {
        // User might be an admin without student profile
      }
    } catch (err) {
      showToast('Failed to load profile details.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await userApi.updateProfile(editForm);
      setProfileData(res.data);
      updateUserState(res.data);
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to update profile.', 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>
        Loading your personal profile...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Notice Banner */}
      <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 'var(--radius-md)', padding: '14px 20px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px', color: '#93c5fd', fontSize: '0.9rem' }}>
        <Lock size={18} />
        <span>Strict Privacy Protection Active: You are viewing only your own private account information.</span>
      </div>

      {/* Main Profile Header */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '30px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--accent-gold), #d97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              boxShadow: 'var(--shadow-glow-gold)'
            }}>
              🥋
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '1.8rem', color: 'white', margin: 0 }}>{profileData?.fullName}</h1>
                <BeltBadge rank={profileData?.beltRank || studentData?.beltRank} />
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span><Mail size={14} style={{ display: 'inline', marginRight: '4px' }} /> {profileData?.email}</span>
                <span><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> {profileData?.phone || 'No phone set'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-secondary"
          >
            <Edit3 size={16} /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px', borderLeft: '4px solid var(--accent-gold)' }}>
          <h3 style={{ color: 'white', marginBottom: '20px' }}>Edit My Personal Information</h3>
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Emergency Contact</label>
                <input
                  type="text"
                  className="form-control"
                  value={editForm.emergencyContact}
                  onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  value={editForm.age}
                  onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="submit" className="btn btn-gold">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Student Status Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--accent-gold)', marginBottom: '16px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} /> Student Martial Status
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Belt Rank:</span>
              <BeltBadge rank={profileData?.beltRank || 'White Belt'} />
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Account Status:</span>
              <span style={{ color: '#34d399', fontWeight: 600 }}>{profileData?.status || 'ACTIVE'}</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Join Date:</span>
              <span style={{ color: 'white' }}>{profileData?.joinDate || 'Recently Joined'}</span>
            </li>
          </ul>
        </div>

        {/* Emergency & Additional Info */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--accent-crimson)', marginBottom: '16px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} /> Achievements & Emergency Contact
          </h3>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '4px' }}>Emergency Contact:</div>
            <div style={{ color: 'white', fontWeight: 500 }}>{profileData?.emergencyContact || 'Not specified'}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '4px' }}>Notable Achievements:</div>
            <div style={{ color: 'var(--text-primary)', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}>
              {profileData?.achievements || 'Currently training for upcoming Belt Evaluation.'}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default UserProfile;
