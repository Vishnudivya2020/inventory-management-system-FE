

// import React, { useState, useEffect } from 'react';
// import Sidebar from './sidebar.jsx';
// import ProductTable from '../Products/ProductTable.jsx';
// import styles from './HomePage.module.css';
// import {jwtDecode} from "jwt-decode";
// import { getAllPro } from '../../APIs/Product_api'
// import ProductPage from '../Products/ProductPage.jsx';


// const Home = () => {
//   const [Products, setProducts] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [BoughtProducts, setBoughtProducts] = useState(0);
//   const [totalSoldProducts, setTotalSoldProducts] = useState(0);
//   const [availableStock, setAvailableStock] = useState(0);
  

//   const token= localStorage.getItem('token');

//   const userDetails =jwtDecode(token);

//   console.log(userDetails);

//   const isAuthorized = userDetails.role === "admin";

//   // const userDetails = JSON.parse(localStorage.getItem('user_details'));
//   // const isAuthorized = userDetails && userDetails.role === 'admin';

//   const loadData = async () => {
//     try {
//       const data = await getAllPro();
//       setProducts(data);

//       setTotalProducts(data.length);

//       const totalBought = data.reduce((acc, product) => acc + (product.bought || 0), 0);
//       setBoughtProducts(totalBought);

//       const totalSold = data.reduce((acc, product) => acc + (product.sold || 0), 0);
//       setTotalSoldProducts(totalSold);

//       const totalStock = data.reduce((acc, product) => acc + (product.availableInStock || 0), 0);
//       setAvailableStock(totalStock);

//     } catch (error) {
//       console.log('Error fetching Product data:', error);
//     }
//   };

//   useEffect(() => {
    
//     loadData();
   
    
    
//   }, []);

 

//   // const renderCheck = () => {
//   //   if (isAuthorized) {
//   //     return <ProductPage />;
//   //   } else {
//   //     return <ProductTable Products={Products} />;
//   //   }
//   // };
  
 
 


//   return (
//     <div className={styles.homeContainer}>
      
//       <h1>Welcome To My Inventory Management System</h1>
//       {/* <div className="profile-pic-container">
//         {profilePicUrl ? (
//           <img src={profilePicUrl} alt="User Profile" className="profile-pic" />
//         ) : (
//           <span>No Profile Picture</span>
//         )}
//       </div> */}
//       <div className="homepage">
//         <Sidebar />
//       </div>
//       <div className={styles.containers}>
//         <div className={styles['subContainer-1']}>
//           <h2 className={styles.title}>Total Products</h2>
//           <p>{totalProducts}</p>
//         </div>
//         <div className={styles['subContainer-2']}>
//           <h2 className={styles.title}>Products Bought</h2>
//           <p>{BoughtProducts}</p>
//         </div>
//         <div className={styles['subContainer-3']}>
//           <h2 className={styles.title}>Products Sold</h2>
//           <p>{totalSoldProducts}</p>
//         </div>
//         <div className={styles['subContainer-4']}>
//           <h2 className={styles.title}>Available Stock</h2>
//           <p>{availableStock}</p>
//         </div>
//       </div>
//       <ProductTable Products={Products} />
    
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from 'react';
// import Sidebar from './sidebar.jsx';
// import ProductTable from '../Products/ProductTable.jsx';
// import styles from './HomePage.module.css';
// import {jwtDecode} from "jwt-decode"; // Correct import for jwtDecode
// import { getAllPro } from '../../APIs/Product_api';
// import ProductPage from '../Products/ProductPage.jsx';

// const Home = () => {
//   const [Products, setProducts] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [BoughtProducts, setBoughtProducts] = useState(0);
//   const [totalSoldProducts, setTotalSoldProducts] = useState(0);
//   const [availableStock, setAvailableStock] = useState(0);
//   const [profilePicUrl, setProfilePicUrl] = useState(null); // State to hold profile picture URL

//   // Fetch token from localStorage
//   const token = localStorage.getItem('token');

//   // Add token validation check to avoid issues if the token is missing or invalid
//   let userDetails = null;
//   let isAuthorized = false;

//   if (token) {
//     try {
//       userDetails = jwtDecode(token); // Decode the token to extract user details
//       isAuthorized = userDetails.role === "admin"; // Check if the user is an admin
//       setProfilePicUrl(userDetails.profilePicUrl); // Set the profile picture URL from token if available
//     } catch (error) {
//       console.error('Error decoding the token:', error);
//     }
//   }

//   // Fetch all product data and compute the totals
//   const loadData = async () => {
//     try {
//       const data = await getAllPro();
//       setProducts(data);

//       setTotalProducts(data.length);

//       const totalBought = data.reduce((acc, product) => acc + (product.bought || 0), 0);
//       setBoughtProducts(totalBought);

//       const totalSold = data.reduce((acc, product) => acc + (product.sold || 0), 0);
//       setTotalSoldProducts(totalSold);

//       const totalStock = data.reduce((acc, product) => acc + (product.availableInStock || 0), 0);
//       setAvailableStock(totalStock);
//     } catch (error) {
//       console.log('Error fetching Product data:', error);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // Conditionally render the ProductPage or ProductTable based on user authorization
//   const renderCheck = () => {
//     if (isAuthorized) {
//       return <ProductPage />;
//     } else {
//       return <ProductTable Products={Products} />;
//     }
//   };

//   return (
//     <div className={styles.homeContainer}>
//       <h1>Welcome To My Inventory Management System</h1>
      
//       {/* Profile Picture Display */}
//       <div className="profile-pic-container">
//         {profilePicUrl ? (
//           <img src={profilePicUrl} alt="User Profile" className={styles.profilePic} />
//         ) : (
//           <span>No Profile Picture</span>
//         )}
//       </div>

//       <div className="homepage">
//         <Sidebar />
//       </div>

//       <div className={styles.containers}>
//         <div className={styles['subContainer-1']}>
//           <h2 className={styles.title}>Total Products</h2>
//           <p>{totalProducts}</p>
//         </div>
//         <div className={styles['subContainer-2']}>
//           <h2 className={styles.title}>Products Bought</h2>
//           <p>{BoughtProducts}</p>
//         </div>
//         <div className={styles['subContainer-3']}>
//           <h2 className={styles.title}>Products Sold</h2>
//           <p>{totalSoldProducts}</p>
//         </div>
//         <div className={styles['subContainer-4']}>
//           <h2 className={styles.title}>Available Stock</h2>
//           <p>{availableStock}</p>
//         </div>
//       </div>
//       {renderCheck()}
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.jsx';
import ProductTable from '../Products/ProductTable.jsx';
import styles from './HomePage.module.css';
import {jwtDecode} from 'jwt-decode';
import { getAllPro } from '../../APIs/Product_api';

const Home = () => {
  const [Products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [BoughtProducts, setBoughtProducts] = useState(0);
  const [totalSoldProducts, setTotalSoldProducts] = useState(0);
  const [availableStock, setAvailableStock] = useState(0);

  const token = localStorage.getItem('token');
  const userDetails = jwtDecode(token);

  // Assuming userDetails contains a profilePicUrl field
  const profilePicUrl = userDetails.profilePicUrl || ''; // Fallback to empty string if not present
  const userName = userDetails.name || 'User'; // Fallback to 'User' if name is not present
  const isAuthorized = userDetails.role === "admin";

  const loadData = async () => {
    try {
      const data = await getAllPro();
      setProducts(data);
      setTotalProducts(data.length);

      const totalBought = data.reduce((acc, product) => acc + (product.bought || 0), 0);
      setBoughtProducts(totalBought);

      const totalSold = data.reduce((acc, product) => acc + (product.sold || 0), 0);
      setTotalSoldProducts(totalSold);

      const totalStock = data.reduce((acc, product) => acc + (product.availableInStock || 0), 0);
      setAvailableStock(totalStock);
    } catch (error) {
      console.log('Error fetching Product data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1> INVENTORY MANAGEMENT SYSTEM</h1>

      {/* Profile Picture Section */}
      <div className={styles.profilePicContainer}>
      <h2 className={styles.userName}>{userName}</h2>
        {profilePicUrl ? (
          <img src={profilePicUrl} alt="User Profile" className={styles.profilePic} />
        ) : (
          <span>No Profile Picture</span>
        )}
         
      </div>

      <div className="homepage">
        <Sidebar />
      </div>

      <div className={styles.containers}>
        <div className={styles['subContainer-1']}>
          <h2 className={styles.title}>Total Products</h2>
          <p>{totalProducts}</p>
        </div>
        <div className={styles['subContainer-2']}>
          <h2 className={styles.title}>Products Bought</h2>
          <p>{BoughtProducts}</p>
        </div>
        <div className={styles['subContainer-3']}>
          <h2 className={styles.title}>Products Sold</h2>
          <p>{totalSoldProducts}</p>
        </div>
        <div className={styles['subContainer-4']}>
          <h2 className={styles.title}>Available Stock</h2>
          <p>{availableStock}</p>
        </div>
      </div>
      
      <ProductTable Products={Products} />
    </div>
  );
};

export default Home;
