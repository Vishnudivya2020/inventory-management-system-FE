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
            <th>Quantity In Stock</th>
            <th>Price</th>
            <th>ID</th>
            <th>OrderId</th>
            <th>Action</th>
            
            
          </tr>
        </thead>
        <tbody>
          {Products.map((product) => (
            <tr key={product.id}>
              <td>{product. productName}</td>
             <td>{product.quantityInStock}</td>
             <td>{product.price}</td>
              <td>{product.id}</td>
              <td>{product.orderId}</td>
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
          <h3 className={styles.para}>View Product</h3>
          <img
            src={selectedProduct.imageUrl || '/images/products/default.jpg'}
            className={styles.productImage}
            alt={selectedProduct.productName}
          />
          <div className={styles.productInfo}>
            <p><strong>Product Name:</strong> {selectedProduct.productName}</p>
           
            <p><strong>Quantity In Stock:</strong> {selectedProduct.quantityInStock}</p>
            <p><strong>OrderID:</strong> {selectedProduct.orderId}</p>
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

