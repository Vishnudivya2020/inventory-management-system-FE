import React from 'react';
import { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import styles from './CustomerTable.module.css';

const CustomerTable = ({Customer = [],onEdit,onDelete}) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] =useState(false);

  const handleDeleteClick = (CustomerId) => {
    const customer = Customer.find((C) => C.id === CustomerId);
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the Customer "${customer?.customerName}"?`
    );
    if (isConfirmed) {
      onDelete(CustomerId);
    }
  };
  const handleViewClick =(CustomerId) =>{
    const customer= Customer.find((Cus) => Cus.id === CustomerId);
    setSelectedCustomer(customer ||null);
    setIsViewModalOpen(true);
   };
  
   const closeModal = () =>{
    setIsViewModalOpen(false);
   };

 
  
 
  if (!Customer.length) {
    return <p>Customer not found.</p>;
  }
 
  return (
    <div className={styles.CusTableContainer}>
      <table className={styles.CustomerTable}>
        <thead>
          <tr>
            <th> CustomerName</th>
            <th>Email</th>
            <th>Type</th>
            <th>CurrendOrders</th>
            <th>ShippingAddress</th>
            <th>Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Customer.map((Customer) => (
            <tr key={Customer.id}>
              <td>{Customer.customerName}</td>
              <td>{Customer.Email}</td>
              <td>{Customer.Type}</td>
              <td>{Customer.CurrentOrders}</td>
              <td>{Customer.ShippingAddress}</td>
              <td>{Customer.id}</td>
              <td className={styles.CusiconBtn}>
              <button onClick={() => handleViewClick(Customer.id)}>
                  <FaEye className={styles.Viewicon} />
                </button>
                <button>
                  <FaTrash
                    className={styles.Delicon}
                    onClick={() => handleDeleteClick(Customer.id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* View Product Modal */}
      {isViewModalOpen && selectedCustomer && (
        <div className={styles.CusmodalOverlay}>
          <h3>View Customer</h3>
          <img
            src={selectedCustomer.imageUrl || '/images/products/default.jpg'}
            className={styles.CustomerImage}
            alt={selectedCustomer.CustomerName}
          />
          <div className={styles.CustomerInfo}>
            <p><strong>CustomerName:</strong> {selectedCustomer.customerName}</p>
            <p><strong>Email:</strong> {selectedCustomer.Email}</p>
            <p><strong>Type:</strong> {selectedCustomer.Type}</p>
            <p><strong>CurrentOrders:</strong> {selectedCustomer.CurrentOrders}</p>
            <p><strong>ShippingAddress:</strong> {selectedCustomer.ShippingAddress}</p>
            <p><strong>ID:</strong> {selectedCustomer.id}</p>
            <div className={styles.CusEditBtns}>
              <button onClick={closeModal} className={styles.CuscancelBtn}>Close</button>
            </div>
          </div>
        </div>
      )}
     
            
          
        </div>
      )}
   

export default CustomerTable;
