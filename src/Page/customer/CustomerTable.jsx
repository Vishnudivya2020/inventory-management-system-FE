// import React, { useState } from 'react';
// import { FaEye, FaTrash } from 'react-icons/fa';
// import styles from './CustomerTable.module.css';

// const CustomerTable = ({ Customer = [], onEdit, onDelete }) => {
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);

//   const handleDeleteClick = (CustomerId) => {
//     const customer = Customer.find((C) => C.id === CustomerId);
//     const isConfirmed = window.confirm(
//       `Are you sure you want to delete the Customer "${customer?.customerName}"?`
//     );
//     if (isConfirmed) {
//       onDelete(CustomerId);
//     }
//   };

//   const handleViewClick = (CustomerId) => {
//     const customer = Customer.find((Cus) => Cus.id === CustomerId);
//     setSelectedCustomer(customer || null);
//     setIsViewModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsViewModalOpen(false);
//   };

//   if (!Customer.length) {
//     return <p>No customers found.</p>;
//   }

//   return (
//     <div className={styles.CusTableContainer}>
//       <table className={styles.CustomerTable}>
//         <thead>
//           <tr>
//             <th>Customer Name</th>
//             <th>Email</th>
//             <th>Type</th>
//             <th>Current Orders</th>
//             <th>Shipping Address</th>
//             <th>ID</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Customer.map((customer) => (
//             <tr key={customer.id}>
//               <td>{customer.customerName}</td>
//               <td>{customer.Email}</td>
//               <td>{customer.Type}</td>
//               <td>{customer.CurrentOrders}</td>
//               <td>{customer.ShippingAddress}</td>
//               <td>{customer.id}</td>
//               <td className={styles.CusiconBtn}>
//                 <button onClick={() => handleViewClick(customer.id)}>
//                   <FaEye className={styles.Viewicon} />
//                 </button>
//                 <button onClick={() => handleDeleteClick(customer.id)}>
//                   <FaTrash className={styles.Delicon} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* View Customer Modal */}
//       {isViewModalOpen && selectedCustomer && (
//         <div className={styles.CusmodalOverlay}>
//           <div className={styles.CusmodalContent}>
//             <h3>View Customer</h3>
//             <img
//               src={selectedCustomer.imageUrl || '/images/customers/default.jpg'}
//               className={styles.CustomerImage}
//               alt={selectedCustomer.customerName}
//             />
//             {console.log(selectedCustomer.imageUrl)}
//             <div className={styles.CustomerInfo}>
//               <p><strong>Customer Name:</strong> {selectedCustomer.customerName}</p>
//               <p><strong>Email:</strong> {selectedCustomer.Email}</p>
//               <p><strong>Type:</strong> {selectedCustomer.Type}</p>
//               <p><strong>Current Orders:</strong> {selectedCustomer.CurrentOrders}</p>
//               <p><strong>Shipping Address:</strong> {selectedCustomer.ShippingAddress}</p>
//               <p><strong>ID:</strong> {selectedCustomer.id}</p>
//               <div className={styles.CusEditBtns}>
//                 <button onClick={closeModal} className={styles.CuscancelBtn}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerTable;

import React, { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import styles from './CustomerTable.module.css';

const CustomerTable = ({ customers = [], onEdit, onDelete }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleDeleteClick = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the customer "${customer?.customerName}"?`
    );
    if (isConfirmed) {
      onDelete(customerId);
    }
  };

  const handleViewClick = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    setSelectedCustomer(customer || null);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
  };

  if (!customers.length) {
    return <p>No customers found.</p>;
  }

  return (
    <div className={styles.CusTableContainer}>
      <table className={styles.CustomerTable}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Current Orders</th>
            <th>Shipping Address</th>
            <th>ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.customerName}</td>
              <td>{customer.Email}</td>
              <td>{customer.Type}</td>
              <td>{customer.CurrentOrders}</td>
              <td>{customer.ShippingAddress}</td>
              <td>{customer.id}</td>
              <td className={styles.CusiconBtn}>
                <button onClick={() => handleViewClick(customer.id)}>
                  <FaEye className={styles.Viewicon} />
                </button>
                <button onClick={() => handleDeleteClick(customer.id)}>
                  <FaTrash className={styles.Delicon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Customer Modal */}
      {isViewModalOpen && selectedCustomer && (
        <div className={styles.CusmodalOverlay}>
          <div className={styles.CusmodalContent}>
            <h3>View Customer</h3>
            <img
              src={selectedCustomer.imageUrl || '/images/customers/default.jpg'}
              className={styles.CustomerImage}
              alt={selectedCustomer.customerName}
            />
            <div className={styles.CustomerInfo}>
              <p><strong>Customer Name:</strong> {selectedCustomer.customerName}</p>
              <p><strong>Email:</strong> {selectedCustomer.Email}</p>
              <p><strong>Type:</strong> {selectedCustomer.Type}</p>
              <p><strong>Current Orders:</strong> {selectedCustomer.CurrentOrders}</p>
              <p><strong>Shipping Address:</strong> {selectedCustomer.ShippingAddress}</p>
              <p><strong>ID:</strong> {selectedCustomer.id}</p>
              <div className={styles.CusEditBtns}>
                <button onClick={closeModal} className={styles.CuscancelBtn}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
