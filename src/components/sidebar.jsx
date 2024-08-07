import React, { useState } from 'react';
import styles from './sidebar.module.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='side-container'>
      <div id="mySidebar" className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.closebtn} onClick={toggleSidebar}>x</div>
        <div> 🛒My Inventory</div>
        <div>📌Products</div>
        <div>🧕🏻Users</div>
        <div>👩🏻‍👧🏻‍👦🏻Customers</div>
        <div>📦Orders</div>
        <div>🛠️Settings</div>
      </div>
      <div className='main' id="main">
        <button className={styles.openbtn} onClick={toggleSidebar}>Menu</button>
       
      </div>
    </div>
  );
}

export default Sidebar;

