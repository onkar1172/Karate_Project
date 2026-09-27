import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, Shield } from 'lucide-react';

const StudentFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    beltRank: 'White Belt (10th Kyu)',
    dojoBranch: 'Central Honbu Dojo',
    emergencyContact: '',
    age: 20,
    status: 'ACTIVE',
    achievements: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        beltRank: initialData.beltRank || 'White Belt (10th Kyu)',
        dojoBranch: initialData.dojoBranch || 'Central Honbu Dojo',
        emergencyContact: initialData.emergencyContact || '',
        age: initialData.age || 20,
        status: initialData.status || 'ACTIVE',
        achievements: initialData.achievements || ''
      });
    } else {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        beltRank: 'White Belt (10th Kyu)',
        dojoBranch: 'Central Honbu Dojo',
        emergencyContact: '',
        age: 20,
        status: 'ACTIVE',
        achievements: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const beltOptions = [
    'White Belt (10th Kyu)',
    'Yellow Belt (8th Kyu)',
    'Orange Belt (7th Kyu)',
    'Green Belt (6th Kyu)',
    'Blue Belt (4th Kyu)',
    'Purple Belt (3rd Kyu)',
    'Brown Belt (2nd Kyu)',
    'Black Belt (1st Dan)',
    'Black Belt (3rd Dan)'
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '8px', borderRadius: '8px', color: 'var(--accent-gold)' }}>
              <Shield size={20} />
            </div>
            <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>
              {isEditing ? 'Edit Student Record' : 'Enroll New Student Record'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                className="form-control"
                placeholder="e.g. Ryuji Sato"
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
                disabled={isEditing}
                className="form-control"
                placeholder="student@karate.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Belt Rank *</label>
              <select
                name="beltRank"
                className="form-control"
                value={formData.beltRank}
                onChange={handleChange}
              >
                {beltOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Branch</label>
              <input
                type="text"
                name="dojoBranch"
                className="form-control"
                placeholder="Central Branch"
                value={formData.dojoBranch}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ON_LEAVE">ON LEAVE</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                className="form-control"
                placeholder="Contact Name & Phone"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Special Achievements / Notes</label>
            <textarea
              name="achievements"
              rows="3"
              className="form-control"
              placeholder="Medals won, Kata certifications..."
              value={formData.achievements}
              onChange={handleChange}
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              <Save size={16} /> {isEditing ? 'Update Student' : 'Save Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
