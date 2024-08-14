

  
import { useEffect } from 'react';
// import Sidebar from './sidebar';
 import CustomerTable from './CustomerTable.jsx'
import styles from './CustomerPage.module.css';
import {useState} from 'react';

import { getAllCus } from '../../APIs/customer_api.js';
 
const CustomerHomePage = () => {
    const [Customer, setCustomer] =useState([]);

    const loadData =async () =>{
      const data =await getAllCus();

      setCustomer(data);
    }

    useEffect(() =>{
      loadData();
    },[]);

  

    return (
   <div className={styles.HomeContainer}>
     <h1>Welcome To Customer Page</h1>
     
      <div  className={styles.containers}>
      <div className={styles['subContainer-1']}>
        <h2 className={styles.title}>Total New Customer</h2>
      </div>
      <div className={styles['subContainer-2']}>
        <h2 className={styles.title}>Total Regular Customer</h2>
      </div>
      <div className={styles['subContainer-3']}>
        <h2 className={styles.title}>Total VIP Customer</h2>
      </div>
     
      </div>
     < CustomerTable Customer={Customer}/>
    </div>

    )
  };
  
  export default CustomerHomePage;
  
