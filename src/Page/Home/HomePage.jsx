//HomePage:-
  
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.jsx';
import ProductTable from '../Products/ProductTable.jsx';
import styles from './HomePage.module.css';
import { getAllPro } from '../../APIs/Product_api';
// import DetailedTable from '../Products/DetailedTable.jsx';
import ProductPage from '../Products/ProductPage.jsx';

const Home = () => {
  const [Products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [BoughtProducts, setBoughtProducts] = useState(0);
  const [totalSoldProducts, setTotalSoldProducts] = useState(0);
  const [availableStock, setAvailableStock] = useState(0);

 const userDetails =JSON.parse(localStorage.getItem('user_details'));
 const isAuthorized =userDetails.role === 'admin';
  

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

  const rendercheck =()=>{
    if(isAuthorized){
      return <ProductPage />
      
    }else{
      return <ProductTable Products={Products} />
    }
  }

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome To My Inventory Management System</h1>
      {/* <div className={styles["home-icon-container"]}> */}
        <div className="homepage">
          <Sidebar />
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
      {rendercheck()}
    </div>
    // </div>
    
  );
};

export default Home;
