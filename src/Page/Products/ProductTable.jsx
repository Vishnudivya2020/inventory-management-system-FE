// import React from 'react';
// import styles from './ProductTable.module.css';
// // Import icons (example with FontAwesome)
// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

// const ProductTable = ({Products = [],onEdit,onDelete,onView}) => {
   

//   return (
//     <div className={styles.tableContainer}>
//       <table className={styles.productTable}>
//         <thead>
//           <tr>
//             <th>ProductName</th>
//             <th>Bought</th>
//             <th>Sold</th>
//             <th>AvailableInStock</th>
//             <th>Id</th>
//             <th>Action</th> 
//           </tr>
//         </thead>
//         <tbody>
//           {Products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.ProductName}</td>
//               <td>{product.bought}</td>
//               <td>{product.sold}</td>
//               <td>{product.availableInStock}</td>
//               <td>{product.id}</td>
//               <td>
//                 {/* Add icons for actions */}
//                 <FaEye className={styles.icon} onClick={() => onView(product.id)} />&nbsp;
//                 <FaEdit className={styles.icon} onClick={() => onEdit(product.id)} />&nbsp;
//                 <FaTrash className={styles.icon} onClick={() => onDelete(product.id)} />&nbsp;
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductTable;

import React from 'react';
import styles from './ProductTable.module.css';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ProductTable = ({ Products = [], onEdit, onDelete, onView }) => {
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
            <th>Image</th> {/* Added column for images */}
            <th>Action</th>
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
              <td>
                <img
                  src={product.image || '/images/products/default.jpg'}
                  alt={product.ProductName}
                  className={styles.productImage}
                />
              </td>
              <td>
                <FaEye className={styles.icon} onClick={() => onView(product.id)} />&nbsp;
                <FaEdit className={styles.icon} onClick={() => onEdit(product.id)} />&nbsp;
                <FaTrash className={styles.icon} onClick={() => onDelete(product.id)} />&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
