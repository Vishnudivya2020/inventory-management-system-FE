import React from 'react';
import styles from './Adminpage.module.css';
import { getAllAdmin } from '../../APIs/Admin_api.js';
import { useState } from 'react';
import AdminTable from './AdminTable.jsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const AdminPage = () => {
  const [Admin, setAdmin] =useState([]);

  const userDetails = JSON.parse(localStorage.getItem('User_details'));
  const isAuthorized = userDetails.role === 'admin';
 
  const loadData =async () =>{
    const data =await getAllAdmin();
  
    setAdmin(data);
  }

  useEffect(() =>{
    loadData();
  },[]);

  const renderCheck = () =>{
    if(isAuthorized){
      return (
      <div className={styles.HomeContainer}>
     <h1>Welcome To Admin Page</h1>
     
      <div  className={styles.containers}>
      <div className={styles['subContainer-1']}>
        <h2 className={styles.title}>Number of Admins</h2>
      </div>
     
     
      </div>
      <AdminTable  Admin={Admin}/>
    </div>
      )
      
     
    }else{
      return <h1>Your Not Authorized </h1>
    }
  }

  

    return( 
      <>
   
  
    {renderCheck()}
    <Link to="/home" >⬅️</Link>
    </>
    )
  };
export default AdminPage;