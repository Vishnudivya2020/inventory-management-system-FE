//ProductTable page:-

import React from 'react';
import {useState} from 'react';
import {FaEye} from 'react-icons/fa';
import styles from './ProductTable.module.css';


const ProductTable = ({ Products = [], onView }) => {
 const [selectedProduct, setSelectedProduct]=useState(null);
 const[isViewModelOpen, setIsViewModelOpen]=useState(false);  

 const handleViewClick =(productId) =>{
  const product = Products.find((p) => p.id === productId);
    setSelectedProduct(product ||null);
   setIsViewModelOpen(true);
 };

 const closeModal = () =>{
  setIsViewModelOpen(false);
 };
 
  return (
    <div className={styles.tableContainer}>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Bought</th>
            <th>Sold</th>
            <th>Available In Stock</th>
            <th>ID</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {Products?.map((product) => (
            <tr key={product.id}>
              <td>{product.ProductName}</td>
              <td>{product.bought}</td>
              <td>{product.sold}</td>
              <td>{product.availableInStock}</td>
              <td>{product.id}</td>
              <td className={styles.iconBtn}>
                <button onClick={() => handleViewClick(product.id)}>
                  <FaEye className={styles.iconView} />
                </button>
             </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* View Product Modal */}
      {isViewModelOpen && selectedProduct && (
        <div className={styles.modalOverlay}>
          <h3>View Product</h3>
          <img
            src={selectedProduct.imageUrl || '/images/products/default.jpg'}
            className={styles.productImage}
            alt={selectedProduct.ProductName}
          />
          <div className={styles.productInfo}>
            <p><strong>Product Name:</strong> {selectedProduct.ProductName}</p>
            <p><strong>Bought:</strong> {selectedProduct.bought}</p>
            <p><strong>Sold:</strong> {selectedProduct.sold}</p>
            <p><strong>Available In Stock:</strong> {selectedProduct.availableInStock}</p>
            <p><strong>ID:</strong> {selectedProduct.id}</p>
            <div className={styles.EditBtns}>
              <button onClick={closeModal} className={styles.cancelBtn}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;

