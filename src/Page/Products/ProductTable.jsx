import React from 'react';
import styles from './ProductTable.module.css';

const ProductTable = ({Products = []}) => {
   

  return (
    <div className={styles.tableContainer}>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>ProductName</th>
            <th>Bought</th>
            <th>Sold</th>
            <th>AvailableInStock</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {Products.map((product) => (
            <tr key={product.id}>
              <td>{product.ProductName}</td>
              <td>{product.bought}</td>
              <td>{product.sold}</td>
              <td>{product.availableInStock}</td>
              <td>{product.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
