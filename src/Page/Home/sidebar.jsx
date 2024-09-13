import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import styles from './sidebar.module.css';
import { IoLogOut } from "react-icons/io5";


   

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const redirectToCustomers = () => {
    navigate('/Customer'); // Redirect to the CustomerHomePage route
  };
  const redirectToProducts = () => {
    navigate('/Products'); // Redirect to the ProductHomePage route
  };
  const redirectToUsers = () => {
    navigate('/users'); // Redirect to the UserHomePage route
  };
  // const redirectToAdmin = () => {
  //   navigate('/Admin'); // Redirect to the AdminHomePage route
  // };
  const redirectToOrders = () => {
    navigate('/orders'); // Redirect to the orderHomePage route
  };

  const handleLogout = ()=>{
    // Remove the token from localstorage.
    localStorage.removeItem('token');

     // Optionally clear other user-related data
     localStorage.removeItem('isAuthenticated');

     // Redirect the user to the login page
    navigate('/login');
  }

  return (
    <div className='side-container'>
      <div id="mySidebar" className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.closebtn} onClick={toggleSidebar}>🔐</div>
        <div style={{cursor:'pointer'}}> 🛒My Inventory</div>
        <div onClick={redirectToProducts} style={{cursor:'pointer'}}>📌Products</div>
        {/* <div onClick={redirectToAdmin}>👨🏻‍💼Admin</div> */}
        <div onClick={redirectToUsers} style={{cursor:'pointer'}}>🧕🏻Users</div>
        <div onClick={redirectToCustomers} style={{cursor:'pointer'}}>👩🏻‍👧🏻‍👦🏻Customers</div> {/* Add onClick to redirect */}
        <div onClick={redirectToOrders} style={{cursor:'pointer'}}>📦Orders</div>
        <div className={styles.IoLogOut} >
        <IoLogOut  onClick={handleLogout} style={{cursor:'pointer'}} /><span>Log Out</span>
      </div>
       
        
      </div>
      <div className='main' id="main">
        <button className={styles.openbtn} onClick={toggleSidebar}>Menu🔑</button>
      </div>
    </div>
  );
}

export default Sidebar;
