import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import Sidebar from '../components/Sidebar';
import '../styles/DashboardPage.css';

function DashboardPage({ onLogout }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      
      if (response.ok) {
        setUsers(users.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        ));
        
        showNotification('User updated successfully');
        
        handleCloseModal();
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Error updating user', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setUsers(users.filter(user => user.id !== userId));
          
          showNotification('User deleted successfully');
          
          handleCloseModal();
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        showNotification('Error deleting user', 'error');
      }
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || email.includes(query);
  });

  return (
    <div className="dashboard">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />
      
      <div className={`dashboard-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="menu-icon">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="header-title">User Management</h1>
          </div>
          
          <div className="header-right">
            <div className="notification-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="bell-icon">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="notification-badge">3</span>
            </div>
            
            <div className="user-profile">
              <img 
                src="/placeholder.svg" 
                alt="User" 
                className="avatar"
                onClick={handleLogout}
              />
            </div>
          </div>
        </header>
        
        <main className="dashboard-main">
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
          
          <div className="page-header">
            <h2 className="page-title">Users</h2>
            <p className="page-description">Manage your users and their account permissions here.</p>
          </div>
          
          <div className="actions-bar">
            <div className="search-container">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input 
                type="text" 
                placeholder="Search users..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="add-button">Add User</button>
          </div>
          
          <UserTable 
            users={filteredUsers} 
            loading={loading}
            onUserClick={handleUserClick}
          />
          
          <div className="pagination">
            <button 
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={page === 1 || loading}
            >
              Previous
            </button>
            <div className="pagination-info">
              Page {page} of {totalPages}
            </div>
            <button 
              className="pagination-button"
              onClick={handleNextPage}
              disabled={page === totalPages || loading}
            >
              Next
            </button>
          </div>
        </main>
      </div>
      
      <UserModal 
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default DashboardPage;