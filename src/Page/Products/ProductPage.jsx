// import React from 'react';
// import styles from './ProductPage.module.css';
// import { getAllPro } from '../../APIs/Product_api';
// import { useState } from 'react';
// import ProductTable from './ProductTable.jsx';
// import { useEffect } from 'react';

// const ProductPage = () => {
//   const [Products, setProducts] =useState([]);
//   const [totalProducts, setTotalProducts] =useState(0);

//   const loadData =async () =>{
//     const data =await getAllPro();

//     setProducts(data);

//      //Calculate the total number of products
//     setTotalProducts(data.length);
//   }

//   useEffect(() =>{
//     loadData();
//   },[]);

  

//     return (
//    <div className={styles.HomeContainer}>
//      <h1>Welcome To Product Page</h1>
     
//       <div  className={styles.containers}>
//       <div className={styles['subContainer-1']}>
//         <h2 className={styles.title}>Total Products</h2>
//         <p>{totalProducts}</p>
     
//       </div>
     
     
//       </div>
//       <ProductTable  Products={Products}/>
//     </div>

//     )
//   };
// export default ProductPage;

import React, { useState, useEffect } from 'react';
import styles from './ProductPage.module.css';
import { getAllPro } from '../../APIs/Product_api';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get product ID from URL parameters

  useEffect(() => {
    const loadData = async () => {
      const data = await getAllPro();
      setProducts(data);
      // Find the selected product by ID
      const selectedProduct = data.find(p => p.id === id);
      setProduct(selectedProduct || null); // Ensure product is set or null if not found
    };

    loadData();
  }, [id]);

  // Check if product is null or undefined before rendering
  if (!product) {
    return <p>Product not found or loading...</p>;
  }

  return (
    <div className={styles.productPageContainer}>
      <h1>{product.ProductName}</h1>
      {/* <p><strong>ProductName:</strong> {product.ProductName}</p> */}
      <img src={product.image || '/images/products/default.jpg'} alt={product.ProductName} className={styles.productImage} />
      <p><strong>Bought:</strong> {product.bought}</p>
      <p><strong>Sold:</strong> {product.sold}</p>
      <p><strong>Available in Stock:</strong> {product.availableInStock}</p>
      <p><strong>Id:</strong> {product.id}</p>
    </div>
  );
};

export default ProductPage;
