import React from 'react';
import styles from './ProductPage.module.css';
import { getAllPro } from '../../APIs/Product_api';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import DetailedTable from './DetailedTable';
import { useEffect } from 'react';

const ProductPage = () => {
  const [Products, setProducts] =useState([
    {
    id:'',
    ProductName: '',
    bought: "",
    sold: '',
    availableInStock: '',
    imageUrl: '/images/products/productA.jpg',
  },

  ]);
  const [totalProducts, setTotalProducts] =useState(0);

  const userDetails =JSON.parse(localStorage.getItem('user_details'));
 const isAuthorized =userDetails.role === 'admin';
  
  const loadData =async () =>{
    const data =await getAllPro();

    setProducts(data);

     //Calculate the total number of products
    setTotalProducts(data.length);
  }

  useEffect(() =>{
    loadData();
  },[]);

  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const rendercheck = ()=>{
    if(isAuthorized){
      return<DetailedTable 
      Products={Products}
     onEdit={handleEditProduct}
     onDelete={handleDeleteProduct}
      />
    }else{
      return  <h1>Your Not Authorized🤷‍♀️</h1>
    }
  }

    return (
   <div className={styles.HomeContainer}>
    {rendercheck()}
  
  <Link to='/home'>Go To HomePage</Link>
      
    </div>

    )
  };
export default ProductPage;

