

import React, { useState, useEffect } from 'react';
 import styles from './OrderPage.module.css';
import { getAllOrders, addOrder, updateOrder, deleteOrder } from '../../APIs/Order_api.js';
import { Link } from 'react-router-dom';
import OrderTable from './orderTable.jsx';
import { TiHomeOutline } from "react-icons/ti";
import OrderForm from './OrderForm.jsx'; // Create a new component for adding and editing orders

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    const data = await getAllOrders();
    setOrders(data);
    setTotalOrders(data.length);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddOrder = async (order) => {
    try {
      await addOrder(order);
      loadData();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleEditOrder = async (order) => {
    try {
      await updateOrder(order.id, order);
      loadData();
      setShowForm(false);
    } catch (error) {
      console.error('Error editing order:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      loadData();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleShowForm = (order = null) => {
    setSelectedOrder(order);
    setShowForm(true);
  };

  return (
    <div className={styles.orderContainer}>
      <Link to="/home"  style={{fontSize:'40px'}}><TiHomeOutline /></Link>
      <h1>Welcome To Order Page</h1>
      <div className={styles.Ocontainers}>
        <div className={styles['subContainer-1']}>
          <h2 className={styles.title}>Number of Orders</h2>
          {totalOrders}
        </div>
        <button className={styles.NewOrders} onClick={() => handleShowForm()}>Add New Order</button>
      </div>
      {showForm && (
        <OrderForm
          order={selectedOrder}
          onSave={selectedOrder ? handleEditOrder : handleAddOrder}
          onCancel={() => setShowForm(false)}
        />
      )}
      <OrderTable
        orders={orders}
        onEdit={handleShowForm}
        onDelete={handleDeleteOrder}
      />
     
    </div>
  );
};

export default OrderPage;


// import React, { useState } from 'react';
// import { getAllOrders, addOrder, updateOrder, deleteOrder } from '../../APIs/Order_api.js';
// import { updateProductOrderIdAPI } from '../../APIs/Product_api'; // API to update product with orderId

// const OrderPage = ({ productId }) => {
//   const [order, setOrder] = useState({
//     orderId: '',
//     orderDetails: '', // Example: Add other fields as necessary for the order
//   });
//   const [isEditMode, setIsEditMode] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setOrder({ ...order, [name]: value });
//   };

//   // Function to handle order creation
//   const handleCreateOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const newOrder = await addOrder(order); // Create a new order
//       // Update the product with the new orderId
//       await updateProductOrderIdAPI(productId, newOrder.orderId);
//       alert('Order created successfully, product updated!');
//       setOrder({ orderId: '', orderDetails: '' });
//     } catch (error) {
//       console.error('Error creating order:', error);
//     }
//   };

//   // Function to handle order update
//   const handleUpdateOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedOrder = await (order.orderId, order); // Update existing order
//       // Update the product with the updated orderId
//       await updateProductOrderIdAPI(productId, updatedOrder.orderId);
//       alert('Order updated successfully, product updated!');
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>{isEditMode ? 'Edit Order' : 'Create New Order'}</h2>
//       <form onSubmit={isEditMode ? handleUpdateOrder : handleCreateOrder}>
//         <div className="form-group">
//           <label>Order ID</label>
//           <input
//             type="text"
//             name="orderId"
//             value={order.orderId}
//             onChange={handleInputChange}
//             className="form-control"
//             placeholder="Order ID"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Order Details</label>
//           <input
//             type="text"
//             name="orderDetails"
//             value={order.orderDetails}
//             onChange={handleInputChange}
//             className="form-control"
//             placeholder="Order Details"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {isEditMode ? 'Update Order' : 'Create Order'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OrderPage;
