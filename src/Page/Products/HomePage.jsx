

  
import { useEffect } from 'react';
import Sidebar from './sidebar';
import ProductTable from './ProductTable';
import styles from './HomePage.module.css';
import {useState} from 'react';
import { getAllPro } from '../../APIs/Product_api';
 
const Home = () => {
    const [Products, setProducts] =useState([]);

    const loadData =async () =>{
      const data =await getAllPro();

      setProducts(data);
    }

    useEffect(() =>{
      loadData();
    },[]);

  

    return (
   <div className={styles.HomeContainer}>
     <h1>Welcome to the Home Page</h1>
      <div className={styles["home-icon-container"]}>
     <div className="homepage">
      <Sidebar />
      <div className="content">
       
       
      </div>
    </div>
  

     </div>
      <div  className={styles.containers}>
      <div className={styles['subContainer-1']}>
        <h2 className={styles.title}>Total Product</h2>
      </div>
      <div className={styles['subContainer-2']}>
        <h2 className={styles.title}>Products<p>Bought</p></h2>
      </div>
      <div className={styles['subContainer-3']}>
        <h2 className={styles.title}>Product sold</h2>
      </div>
      <div className={styles['subContainer-4']}>
        <h2 className={styles.title}>Available<p>Stock</p></h2>
      </div>
      </div>
     <ProductTable  Products={Products}/>
    </div>

    )
  };
  
  export default Home;
  
