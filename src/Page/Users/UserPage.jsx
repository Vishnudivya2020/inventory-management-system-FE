// import React from 'react';
// import styles from './UserPage.module.css';
// import { getAllUser } from '../../APIs/User_api';
// import { useState } from 'react';
// import {Link} from 'react-router-dom';
// import UserTable from './UserTable';

// import { useEffect } from 'react';

// const UserPage = () => {
//   const [users, setusers] =useState([]);
//   const[totalusers, setTotalUsers]=useState(0);
 
//   const loadData =async () =>{
//     const data =await getAllUser();

//     setusers(data);

//     //calculate the total number of products
//     setTotalUsers(data.length);
//   }

//   useEffect(() =>{
//     loadData();
//   },[]);

 
//     return (
//    <div className={styles.UserContainer}>
     
//       <Link to="/home">Go To HomePage</Link>
     
     
//      <h1>Welcome To Users Page</h1>
     
//       <div  className={styles.Ucontainers}>
//       <div className={styles['subContainer-1']}>
//         <h2 className={styles.title}>Number of Users</h2>
//         {totalusers}
//       </div>
     
     
//       </div>
//       <UserTable  users={users}/>
//     </div>

//     )
//   };
// export default UserPage;

import React, { useEffect, useState } from 'react';
import { getAllUser, deleteUser } from '../../APIs/User_api';
import { Link } from 'react-router-dom';
import UserTable from './UserTable';
import { TiHomeOutline } from "react-icons/ti";
import styles from './UserPage.module.css';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // Function to load user data
  const loadData = async () => {
    const data = await getAllUser();
    setUsers(data);
    setTotalUsers(data.length);
  };

  // Function to handle user deletion
  const handleDelete = async (userId) => {
    const result = await deleteUser(userId);
    if (result) {
      setUsers(users.filter(user => user._id !== userId)); // Update the state after deletion
      setTotalUsers(totalUsers - 1); // Update total users count
    } else {
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.UserContainer}>
      <Link to='/home'  style={{fontSize:'40px'}}><TiHomeOutline /></Link>
      <h1>Welcome To Users Page</h1>

      <div className={styles.Ucontainers}>
        <div className={styles['subContainer-1']}>
          <h2 className={styles.title}>Number of Users</h2>
          {totalUsers}
        </div>
      </div>

      <UserTable users={users} onDelete={handleDelete} /> {/* Pass handleDelete to UserTable */}
    </div>
  );
};

export default UserPage;
