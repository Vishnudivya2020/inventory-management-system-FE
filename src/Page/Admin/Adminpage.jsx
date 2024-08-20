
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Adminpage.module.css';
import { getAllAdmin } from '../../APIs/Admin_api.js';
import AdminTable from './AdminTable.jsx';

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);

  // Fetch user details from localStorage
  const userDetails = JSON.parse(localStorage.getItem('User_details'));
  
  // Check if user is authorized
  const isAuthorized = userDetails && userDetails.role === "admin";

  // Function to load admin data
  const loadData = async () => {
    const data = await getAllAdmin();
    setAdmins(data);
  };

  // Load admin data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Render the component based on authorization
  const renderCheck = () => {
    if (isAuthorized) {
      return <AdminTable admin={admins} />;
    } else {
      return <h1>You are not Authorized</h1>;
    }
  };

  return (
    <div className={styles.HomeContainer}>
      <h1>Welcome To Admin Page</h1>
      
      <div className={styles.containers}>
        <div className={styles['subContainer-1']}>
          <h2 className={styles.title}>Number of Admins</h2>
        </div>
      </div>
  
      {renderCheck()}
      <Link to="/home">⬅️</Link>
    </div>
  );
};

export default AdminPage;
