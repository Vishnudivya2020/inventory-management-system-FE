import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.jsx';
import ProductTable from '../Products/ProductTable.jsx';
import styles from './HomePage.module.css';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import { getAllUser } from '../../APIs/User_api.js';
import { getAllPro } from '../../APIs/Product_api';

const Home = () => {
  const [Products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [UserDetails, setUserDetails] = useState(null);

  const token = localStorage.getItem('token');
  let userDetails = null;
  
  if (token) {
    try {
      userDetails = jwtDecode(token); // Decode token if it exists
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const profilePicUrl = userDetails?.profilePicUrl || '';
  const userName = userDetails?.name || 'User';

  const loadData = async () => {
    try {
      const data = await getAllPro();
      setProducts(data);
      setTotalProducts(data.length);

      const totalStock = data.reduce((acc, product) => acc + (product.quantityInStock || 0), 0);
      setQuantityInStock(totalStock);
    } catch (error) {
      console.log('Error fetching Product data:', error);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleProfileClick = async () => {
    try {
      const response = await getAllUser();
      console.log('Fetched User Details:', response);

      // Get the email from the decoded token
      const loggedInEmail = userDetails?.email || null;
      console.log('Logged-in Email from token:', loggedInEmail);

      if (!loggedInEmail) {
        console.log('No email found in token.');
        return;
      }

      // Find the user with the matching email (case-insensitive comparison)
      const loggedInUser = response.find(user =>
        user.email.toLowerCase() === loggedInEmail.toLowerCase()
      );

      if (loggedInUser) {
        console.log('Logged-in User Found:', loggedInUser);
        setUserDetails(loggedInUser);
      } else {
        console.log('No user found with the logged-in email.');
      }
      setShowProfileDetails(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.homeContainer}>
  <div className={styles['sidebar']}>
    <Sidebar />
   

    <div className={styles.profilePicContainer}>
      <h2 className={styles.userName}>{userName}</h2>
      {profilePicUrl ? (
        <img
          src={profilePicUrl}
          alt="User Profile"
          className={styles.profilePic}
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <span>No Profile Picture</span>
      )}
       {showProfileDetails && UserDetails && (
    <div className={styles.profileDetails}>
      <h2>User Details</h2>
      <p>Name: {UserDetails.name}</p>
      <p>Email: {UserDetails.email}</p>
      <p>Role: {UserDetails.role}</p>
      <button onClick={() => setShowProfileDetails(false)} className={styles.ProBtn}>Close</button>
    </div>
  )}
    </div>
   
    <div className={styles.IoLogOut}>
          <IoLogOut onClick={handleLogout} style={{ cursor: 'pointer' }} />
          <span>Log Out</span>
        </div>
  </div>

 

  <div className={styles.mainContent}>
    {/* Title on top */}
    <div  style={{backgroundColor:"#9DF9EF",color:"darkblue"}}>
    <h3 className={styles.title}>INVENTORY MANAGEMENT SYSTEM</h3>
    </div>  
    {/* Containers for Total Products and Quantity In Stock */}
    <div className={styles.statsContainer}>
      <div className={styles['subContainer-1']}>
        <h2>Total Products:</h2>
        <p>{totalProducts}</p>
      </div>
      <div className={styles['subContainer-4']}>
        <h4 style={{width:"850px"}}>Quantity In Stock:</h4>
        <p>{quantityInStock}</p>
      </div>
    </div>

    {/* Product Table below stats */}
    <ProductTable Products={Products} />
  </div>
</div>

    
  );
};

export default Home;

