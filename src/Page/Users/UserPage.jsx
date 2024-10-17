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
const handleDelete = async (userId) => {
    try{
      await deleteUser(userId);
      setUsers(prevUsers =>
        prevUsers.filter(user=> user.id !== userId)
      );
      //update total user count after deletion
      setTotalUsers(users.length - 1);
    } catch(error){
      console.error('Failed to delete user:',error);
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
