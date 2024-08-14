import React from 'react';
import styles from './UserPage.module.css';
import { getAllUser } from '../../APIs/User_api';
import { useState } from 'react';
import UserTable from './UserTable';
import { useEffect } from 'react';

const UserPage = () => {
  const [users, setusers] =useState([]);

 
  const loadData =async () =>{
    const data =await getAllUser();

    setusers(data);
  }

  useEffect(() =>{
    loadData();
  },[]);

  

    return (
   <div className={styles.HomeContainer}>
     <h1>Welcome To Users Page</h1>
     
      <div  className={styles.containers}>
      <div className={styles['subContainer-1']}>
        <h2 className={styles.title}>Number of Users</h2>
      </div>
     
     
      </div>
      <UserTable  users={users}/>
    </div>

    )
  };
export default UserPage;