import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import styles from './sidebar.module.css';


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const redirectToCustomers = () => {
    navigate('/customer'); // Redirect to the CustomerHomePage route
  };
  const redirectToProducts = () => {
    navigate('/Products'); // Redirect to the ProductHomePage route
  };
  const redirectToUsers = () => {
    navigate('/users'); // Redirect to the UserHomePage route
  };
  const redirectToAdmin = () => {
    navigate('/Admin'); // Redirect to the AdminHomePage route
  };

  return (
    <div className='side-container'>
      <div id="mySidebar" className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.closebtn} onClick={toggleSidebar}>🔐</div>
        <div> 🛒My Inventory</div>
        <div onClick={redirectToProducts}>📌Products</div>
        
        <div onClick={redirectToUsers}>🧕🏻Users</div>
        <div onClick={redirectToCustomers}>👩🏻‍👧🏻‍👦🏻Customers</div> {/* Add onClick to redirect */}
       
        
      </div>
      <div className='main' id="main">
        <button className={styles.openbtn} onClick={toggleSidebar}>🔑</button>
      </div>
    </div>
  );
}

export default Sidebar;
