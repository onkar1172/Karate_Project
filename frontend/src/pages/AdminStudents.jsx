import React, { useState, useEffect } from 'react';
import { studentApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BeltBadge from '../components/BeltBadge';
import StudentFormModal from '../components/StudentFormModal';
import { Search, UserPlus, Edit, Trash2, Shield, Mail, Phone, RefreshCw } from 'lucide-react';

const AdminStudents = () => {
  const { showToast } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (query = '') => {
    setLoading(true);
    try {
      const res = await studentApi.getAllStudents(query);
      setStudents(res.data);
    } catch (err) {
      showToast('Failed to load student records.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(searchQuery);
  };

  const handleOpenAdd = () => {
    setSelectedStudent(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student record for "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await studentApi.deleteStudent(id);
      showToast(`Student record for ${name} deleted.`, 'success');
      fetchStudents(searchQuery);
    } catch (err) {
      showToast('Failed to delete student record.', 'error');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing && selectedStudent) {
        await studentApi.updateStudent(selectedStudent.id, formData);
        showToast('Student record updated successfully!', 'success');
      } else {
        await studentApi.createStudent(formData);
        showToast('New student record created successfully!', 'success');
      }
      setModalOpen(false);
      fetchStudents(searchQuery);
    } catch (err) {
      const msg = err.response?.data?.message || 'Operation failed.';
      showToast(msg, 'error');
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
            ADMIN ACCESS ONLY
          </div>
          <h1 style={{ fontSize: '2.2rem', color: 'white', margin: '4px 0 0' }}>Student Management Directory</h1>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-gold btn-lg">
          <UserPlus size={18} /> Add New Student
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '30px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by student name, email, belt rank, or branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <Search size={16} /> Search
          </button>
          <button 
            type="button" 
            onClick={() => { setSearchQuery(''); fetchStudents(''); }} 
            className="btn btn-secondary"
            title="Reset Filters"
          >
            <RefreshCw size={16} />
          </button>
        </form>
      </div>

      {/* Student Data Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          Fetching student directory...
        </div>
      ) : students.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No student records found matching your query.
        </div>
      ) : (
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--accent-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 20px' }}>Student Name & Email</th>
                <th style={{ padding: '16px 20px' }}>Belt Rank</th>
                <th style={{ padding: '16px 20px' }}>Branch</th>
                <th style={{ padding: '16px 20px' }}>Status</th>
                <th style={{ padding: '16px 20px' }}>Join Date</th>
                <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st) => (
                <tr key={st.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}>
                  
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{st.fullName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Mail size={12} /> {st.email}
                      {st.phone && <span>• {st.phone}</span>}
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <BeltBadge rank={st.beltRank} />
                  </td>

                  <td style={{ padding: '16px 20px', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                    {st.dojoBranch || 'Central Dojo'}
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      background: st.status === 'ACTIVE' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: st.status === 'ACTIVE' ? '#34d399' : '#f87171',
                      border: `1px solid ${st.status === 'ACTIVE' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                    }}>
                      {st.status}
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {st.joinDate}
                  </td>

                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(st)}
                        className="btn btn-secondary btn-sm"
                        title="Edit Student Record"
                      >
                        <Edit size={14} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(st.id, st.fullName)}
                        className="btn btn-danger btn-sm"
                        title="Delete Student Record"
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

      {/* Admin Student Form Modal */}
      <StudentFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedStudent}
        isEditing={isEditing}
      />

    </div>
  );
};

export default AdminStudents;
