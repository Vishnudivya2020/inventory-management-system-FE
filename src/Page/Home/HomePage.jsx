

  
// import { useEffect } from 'react';
// import Sidebar from './sidebar.jsx';
// import ProductTable from '../Products/ProductTable.jsx';
// import styles from './HomePage.module.css';
// import {useState} from 'react';
// import { getAllPro } from '../../APIs/Product_api';

 
// const Home = () => {
//     const [Products, setProducts] =useState([]);
//     const [totalProducts, setTotalProducts] =useState(0);
//     const [BoughtProducts, setBoughtProducts] =useState(0);
//     const [totalSoldProducts, setTotalSoldProducts] =useState(0);
//     const [availableStock, setAvailableStock] = useState(0);

//     const loadData =async () =>{
//       try{
//       const data =await getAllPro();

//       setProducts(data);

//       //Calculate the total number of products
//       setTotalProducts(data.length);

//        //Calculate the total number of products bought
//        const totalBought = data.reduce((acc, product) => acc + (product.bought || 0), 0);
//        setBoughtProducts(totalBought);
      
//        // Calculate the total number of products sold
//     const totalsold = data.reduce((acc, product) => acc + (product.sold || 0), 0);
//     setTotalSoldProducts(totalsold);

    
//        // Calculate the total available stock
//        const totalStock = data.reduce((acc, product) => acc + (product.availableInStock || 0), 0);
//        setAvailableStock(totalStock);

//       }catch(error){
//         console.log('Error fetching Product data:',error);
//       }
//     };

//     useEffect(() =>{
//       loadData();
//     },[]);

  

//     return (
//    <div className={styles.HomeContainer}>
//      <h1>Welcome To My Inventory Management System</h1>
//       <div className={styles["home-icon-container"]}>
//      <div className="homepage">
//       <Sidebar />
//       <div className="content">
//        </div>
//      </div>
//     </div>
//       <div  className={styles.containers}>
//       <div className={styles['subContainer-1']}>
//         <h2 className={styles.title}>Total Product</h2>
//          <p>{totalProducts}</p>
//       </div>
//       <div className={styles['subContainer-2']}>
//         <h2 className={styles.title}>Products<p>Bought</p></h2>
//         <p>{BoughtProducts}</p>
//       </div>
//       <div className={styles['subContainer-3']}>
//         <h2 className={styles.title}>Product sold</h2>
//         <p>{totalSoldProducts}</p>
//       </div>
//       <div className={styles['subContainer-4']}>
//         <h2 className={styles.title}>Available<p>Stock</p></h2>
//         <p>{availableStock}</p>
//       </div>
//       </div>
//      <ProductTable  Products={Products}/>
//     </div>

//     )
//   };
  
//   export default Home;
  
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.jsx';
import ProductTable from '../Products/ProductTable.jsx';
import styles from './HomePage.module.css';
import { getAllPro } from '../../APIs/Product_api';

const Home = () => {
  const [Products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [BoughtProducts, setBoughtProducts] = useState(0);
  const [totalSoldProducts, setTotalSoldProducts] = useState(0);
  const [availableStock, setAvailableStock] = useState(0);

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
    <div className={styles.HomeContainer}>
      <h1>Welcome To My Inventory Management System</h1>
      <div className={styles["home-icon-container"]}>
        <div className="homepage">
          <Sidebar />
          <div className="content">
          </div>
        </div>
      </div>
      <div className={styles.containers}>
        <div className={styles['subContainer-1']}>
          <h2 className={styles.title}>Total Product</h2>
          <p>{totalProducts}</p>
        </div>
        <div className={styles['subContainer-2']}>
          <h2 className={styles.title}>Products<p>Bought</p></h2>
          <p>{BoughtProducts}</p>
        </div>
        <div className={styles['subContainer-3']}>
          <h2 className={styles.title}>Product sold</h2>
          <p>{totalSoldProducts}</p>
        </div>
        <div className={styles['subContainer-4']}>
          <h2 className={styles.title}>Available<p>Stock</p></h2>
          <p>{availableStock}</p>
        </div>
      </div>
      <ProductTable Products={Products} />
    </div>
  );
};

export default Home;
