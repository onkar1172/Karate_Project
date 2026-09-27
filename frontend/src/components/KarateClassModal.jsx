import React, { useState, useEffect } from 'react';
import { X, BookOpen, Save } from 'lucide-react';

const KarateClassModal = ({ isOpen, onClose, onSubmit, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructorName: '',
    beltLevelRequired: 'All Levels',
    maxCapacity: 20,
    scheduleTime: 'Mon, Wed 06:00 PM - 07:30 PM EST',
    imageUrl: '',
    fee: 49.99
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        instructorName: initialData.instructorName || '',
        beltLevelRequired: initialData.beltLevelRequired || 'All Levels',
        maxCapacity: initialData.maxCapacity || 20,
        scheduleTime: initialData.scheduleTime || '',
        imageUrl: initialData.imageUrl || '',
        fee: initialData.fee || 49.99
      });
    } else {
      setFormData({
        title: '',
        description: '',
        instructorName: '',
        beltLevelRequired: 'All Levels',
        maxCapacity: 20,
        scheduleTime: 'Mon, Wed 06:00 PM - 07:30 PM EST',
        imageUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
        fee: 49.99
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
    onSubmit({
      ...formData,
      maxCapacity: parseInt(formData.maxCapacity, 10),
      fee: parseFloat(formData.fee)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(220, 38, 38, 0.15)', padding: '8px', borderRadius: '8px', color: 'var(--accent-crimson)' }}>
              <BookOpen size={20} />
            </div>
            <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>
              {isEditing ? 'Edit Karate Class' : 'Add New Karate Class'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div className="form-group">
            <label className="form-label">Class Title *</label>
            <input
              type="text"
              name="title"
              required
              className="form-control"
              placeholder="e.g. Advanced Shotokan Kumite & Tactics"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Instructor Name *</label>
              <input
                type="text"
                name="instructorName"
                required
                className="form-control"
                placeholder="Sensei Kenji Takahashi"
                value={formData.instructorName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Belt Level</label>
              <input
                type="text"
                name="beltLevelRequired"
                className="form-control"
                placeholder="e.g. Green Belt & Above"
                value={formData.beltLevelRequired}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Max Student Capacity</label>
              <input
                type="number"
                name="maxCapacity"
                className="form-control"
                value={formData.maxCapacity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Class Fee ($)</label>
              <input
                type="number"
                step="0.01"
                name="fee"
                className="form-control"
                value={formData.fee}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Schedule & Time</label>
            <input
              type="text"
              name="scheduleTime"
              className="form-control"
              placeholder="e.g. Mon, Wed 06:00 PM - 07:30 PM EST"
              value={formData.scheduleTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="form-control"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Class Description</label>
            <textarea
              name="description"
              rows="3"
              className="form-control"
              placeholder="Provide curriculum details and key learning outcomes..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> {isEditing ? 'Update Class' : 'Create Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KarateClassModal;
