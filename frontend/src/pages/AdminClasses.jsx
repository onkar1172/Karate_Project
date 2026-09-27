import React, { useState, useEffect } from 'react';
import { classApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BeltBadge from '../components/BeltBadge';
import KarateClassModal from '../components/KarateClassModal';
import { BookOpen, PlusCircle, Edit, Trash2, Users, Clock } from 'lucide-react';

const AdminClasses = () => {
  const { showToast } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleOpenAdd = () => {
    setSelectedClass(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (cls) => {
    setSelectedClass(cls);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete class "${title}"?`)) return;

    try {
      await classApi.deleteClass(id);
      showToast(`Class "${title}" deleted.`, 'success');
      fetchClasses();
    } catch (err) {
      showToast('Failed to delete class.', 'error');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing && selectedClass) {
        await classApi.updateClass(selectedClass.id, formData);
        showToast('Karate class updated successfully!', 'success');
      } else {
        await classApi.createClass(formData);
        showToast('New karate class created successfully!', 'success');
      }
      setModalOpen(false);
      fetchClasses();
    } catch (err) {
      showToast('Operation failed.', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
            CURRICULUM MANAGEMENT
          </div>
          <h1 style={{ fontSize: '2.2rem', color: 'white', margin: '4px 0 0' }}>Manage Karate Classes & Syllabus</h1>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary btn-lg">
          <PlusCircle size={18} /> Add New Karate Class
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          Loading class list...
        </div>
      ) : (
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--accent-gold)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '16px 20px' }}>Class Title & Sensei</th>
                <th style={{ padding: '16px 20px' }}>Required Belt Level</th>
                <th style={{ padding: '16px 20px' }}>Schedule Time</th>
                <th style={{ padding: '16px 20px' }}>Capacity</th>
                <th style={{ padding: '16px 20px' }}>Tuition Fee</th>
                <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: '1rem' }}>{cls.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Instructor: {cls.instructorName}</div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <BeltBadge rank={cls.beltLevelRequired} />
                  </td>

                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} /> {cls.scheduleTime}
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ color: 'white', fontWeight: 600 }}>{cls.currentCapacity} / {cls.maxCapacity}</span>
                  </td>

                  <td style={{ padding: '16px 20px', color: 'var(--accent-gold)', fontWeight: 700 }}>
                    ${cls.fee || '49.99'}
                  </td>

                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(cls)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cls.id, cls.title)}
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admin Class Modal */}
      <KarateClassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedClass}
        isEditing={isEditing}
      />

    </div>
  );
};

export default AdminClasses;
