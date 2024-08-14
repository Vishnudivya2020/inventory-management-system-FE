import React from 'react';
import styles from './userTable.module.css';

const UserTable = ({users = []}) => {
   

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
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
