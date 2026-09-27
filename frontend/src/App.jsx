import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import StudentClasses from './pages/StudentClasses';
import MyEnrollments from './pages/MyEnrollments';
import AdminDashboard from './pages/AdminDashboard';
import AdminStudents from './pages/AdminStudents';
import AdminClasses from './pages/AdminClasses';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user, isAdmin } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'login':
        return <Login setActiveTab={setActiveTab} />;
      case 'signup':
        return <Signup setActiveTab={setActiveTab} />;
      case 'classes':
        return <StudentClasses setActiveTab={setActiveTab} />;
      case 'my-classes':
        return user ? <MyEnrollments setActiveTab={setActiveTab} /> : <Login setActiveTab={setActiveTab} />;
      case 'profile':
        return user ? <UserProfile /> : <Login setActiveTab={setActiveTab} />;
      case 'admin-dashboard':
        return isAdmin ? <AdminDashboard setActiveTab={setActiveTab} /> : <Home setActiveTab={setActiveTab} />;
      case 'admin-students':
        return isAdmin ? <AdminStudents /> : <Home setActiveTab={setActiveTab} />;
      case 'admin-classes':
        return isAdmin ? <AdminClasses /> : <Home setActiveTab={setActiveTab} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1 }}>
        {renderContent()}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
