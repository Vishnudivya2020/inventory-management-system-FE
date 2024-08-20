import React from 'react';
import styles from './UserPage.module.css';
import { getAllUser } from '../../APIs/User_api';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import UserTable from './UserTable';
import { useEffect } from 'react';

const UserPage = () => {
  const [users, setusers] =useState([]);
  const[totalusers, setTotalUsers]=useState(0);
 
  const loadData =async () =>{
    const data =await getAllUser();

    setusers(data);

    //calculate the total number of products
    setTotalUsers(data.length);
  }

  useEffect(() =>{
    loadData();
  },[]);

  

    return (
   <div className={styles.UserContainer}>
     
      <Link to="/home">Go To HomePage</Link>
     
     
     <h1>Welcome To Users Page</h1>
     
      <div  className={styles.Ucontainers}>
      <div className={styles['subContainer-1']}>
        <h2 className={styles.title}>Number of Users</h2>
        {totalusers}
      </div>
     
     
      </div>
      <UserTable  users={users}/>
    </div>

    )
  };
export default UserPage;