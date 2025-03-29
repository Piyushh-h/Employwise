import React from 'react';
import '../styles/UserTable.css';

function UserTable({ users, loading, onUserClick }) {
  if (loading) {
    return <LoadingTable />;
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user.id} 
              className="table-row"
              onClick={() => onUserClick(user)}
            >
              <td className="user-id">{user.id}</td>
              <td>
                <div className="user-info">
                  <img 
                    src={user.avatar || "/placeholder.svg"} 
                    alt={`${user.first_name} ${user.last_name}`}
                    className="user-avatar"
                    crossOrigin="anonymous"
                  />
                  <div>
                    <div className="user-name">{user.first_name} {user.last_name}</div>
                    <div className="user-id-small">User ID: {user.id}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td className="text-right">
                <span className="status-badge">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LoadingTable() {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th className="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              <td><div className="skeleton skeleton-id"></div></td>
              <td>
                <div className="user-info">
                  <div className="skeleton skeleton-avatar"></div>
                  <div>
                    <div className="skeleton skeleton-name"></div>
                    <div className="skeleton skeleton-id-small"></div>
                  </div>
                </div>
              </td>
              <td><div className="skeleton skeleton-email"></div></td>
              <td className="text-right"><div className="skeleton skeleton-status"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;