
import React from 'react';
import styles from './AdminTable.module.css';

const AdminTable = ({ Admin = [] }) => {
  return (
    <div className={`${styles.tableContainer} table-responsive`}>
      <table className={`${styles.AdminTable} table table-striped table-bordered`}>
        <thead className="thead-dark">
          <tr>
            <th className={`${styles.tableHead} text-center`}>Name</th>
            <th className={`${styles.tableHead} text-center`}>Email</th>
            <th className={`${styles.tableHead} text-center`}>Password</th>
            <th className={`${styles.tableHead} text-center`}>Role</th>
          </tr>
        </thead>
        <tbody>
          {Admin.map(admin => (
            <tr key={admin._id} className={styles.row}>
              <td className={`${styles.tableData} text-center`}>{admin.name}</td>
              <td className={`${styles.tableData} text-center`}>{admin.email}</td>
              <td className={`${styles.tableData} text-center`}>{admin.password}</td>
              <td className={`${styles.tableData} text-center`}>{admin.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
