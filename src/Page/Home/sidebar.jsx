
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';




function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const redirectToCustomers = () => {
    navigate('/Customer');
  };

  const redirectToProducts = () => {
    navigate('/Products');
  };

  const redirectToUsers = () => {
    navigate('/users');
  };

  const redirectToChart = () => {
    navigate('/inventory'); // This should match the route defined in AppRouter
};


  const redirectToOrders = () => {
    navigate('/orders');
  };

 

  return (
    <div className='side-container'>
      <div id="mySidebar" className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.closebtn} onClick={toggleSidebar}>⇨</div>
        <div style={{ cursor: 'pointer' }}> 🛒My Inventory</div>
        <div onClick={redirectToProducts} style={{ cursor: 'pointer' }}>📌Products</div>
        <div onClick={redirectToUsers} style={{ cursor: 'pointer' }}>🧕🏻Users</div>
        <div onClick={redirectToCustomers} style={{ cursor: 'pointer' }}>👩🏻‍👧🏻‍👦🏻Customers</div>
        <div onClick={redirectToOrders} style={{ cursor: 'pointer' }}>📦Orders</div>
        <div onClick={redirectToChart} style={{ cursor: 'pointer' }}>📊 InventoryChart</div>

        
      </div>
      <div className='main' id="main">
        <button className={styles.openbtn} onClick={toggleSidebar}>≡</button>
      </div>
    </div>
  );
}

export default Sidebar;

