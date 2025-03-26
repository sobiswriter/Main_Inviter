import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InvitationForm from './components/InvitationForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Check token validity in a real app
    }
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowForm(false);
  };
  const handleCreateInvitation = () => setShowForm(true);
  const handleBackToDashboard = () => setShowForm(false);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : showForm ? (
        <InvitationForm onBack={handleBackToDashboard} />
      ) : (
        <Dashboard onLogout={handleLogout} onCreate={handleCreateInvitation} />
      )}
    </div>
  );
}

export default App;