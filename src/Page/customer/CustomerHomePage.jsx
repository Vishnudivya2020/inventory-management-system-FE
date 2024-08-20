//Customer Home page.

import { useEffect } from 'react';
import React from 'react';
 import CustomerTable from './CustomerTable.jsx';
 import {Link} from 'react-router-dom';
import styles from './CustomerPage.module.css';
import {useState} from 'react';
import { getAllCus } from '../../APIs/customer_api.js';
 
const CustomerHomePage = () => {
    const [Customer, setCustomer] =useState([
      {
        id:"",
        CustomerTable:"",
        Email:"",
        Type:"",
        CurrendOrders:"",
        ShippingAddress:"",
        imageUrl:'/images/customer/customerA.jpg'

      }
    ]);
    const [totalCustomers , setTotalCustomers] = useState (0);  
    const [totalOldCustomers , setTotalOldCustomers] =useState (0); 
    const [totalNewCustomers , setTotalNewCustomers] = useState(0); 
    const [totalVIPCustomer, setTotalVIPCustomer]=useState(0);
    const loadData =async () =>{
      const data =await getAllCus();
       setCustomer(data);

       setTotalCustomers(data.length);

       const OldCustomers = data.filter(customer => customer.Type === 'Old').length;
       setTotalOldCustomers(OldCustomers);
     
       const NewCustomers = data.filter(customer => customer.Type === 'New').length;
       setTotalNewCustomers(NewCustomers);
      

      const VIPCustomers = data.filter(customer => customer.Type === 'VIP').length;
      setTotalVIPCustomer(VIPCustomers);
      }

  
    useEffect(() =>{
      loadData();
    },[]);
    
  
    const handleDeleteCustomer = (CustomerId) => {
      setCustomer((prevCustomer) =>
        prevCustomer.filter((customer) => customer.id !== CustomerId)
      );
    };
   

    return (
   <div className={styles.CusContainer}>
    <Link to='/home'>Go to HomePage</Link>
     <h1>Welcome To Customer Page</h1>
     
      <div  className={styles.Cuscontainers}>
      <div className={styles['subContainer-1']}>
        <h2 className={styles.Custitle}>Total Customer</h2>
        <p>{totalCustomers}</p>
      </div>
      <div className={styles['subContainer-2']}>
        <h2 className={styles.Custitle}>Total Old Customer</h2>
        <p>{totalOldCustomers }</p>
      </div>
      <div className={styles['subContainer-3']}>
        <h2 className={styles.Custitle}>Total New Customer</h2>
        <p>{totalNewCustomers }</p>
      </div>
      <div className={styles['subContainer-4']}>
        <h2 className={styles.Custitle}>Total VIP Customer</h2>
        <p>{totalVIPCustomer }</p>
      </div>
     
      </div>
       
       
     < CustomerTable 
     Customer={Customer}
     
     onDelete={handleDeleteCustomer}
     />
     
    </div>
    
    
    )
  };

  
  export default CustomerHomePage;
  
