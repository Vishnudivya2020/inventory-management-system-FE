import React from 'react';
import styles from './userTable.module.css';
import {FaTrash} from 'react-icons/fa';
import  { useState } from 'react';

const UserTable = ({users = [],onDelete}) => {
  const [selectedUser, setSelectedUser] = useState(null);  

  const handleDeleteClick = (UserId) => {
    const user = users.find((u) => u.id === UserId);
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the  "${user?.ProductName}"?`
    );
    if (isConfirmed) {
      onDelete(UserId);
    }
  };
  return (
    <div className={styles.tableContainer}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>Role</th>
            <th>Id</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.password}</td> */}
              <td>{user.role}</td>
              <td>{user.id}</td>
              <td className = {styles.iconBtn}>
              <button>
                  <FaTrash
                    className={styles.icon2}
                    onClick={() => handleDeleteClick(user.id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
