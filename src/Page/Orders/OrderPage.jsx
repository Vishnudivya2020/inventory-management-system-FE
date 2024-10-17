
import React, { useState, useEffect } from 'react';
import styles from './OrderPage.module.css';
import { getAllOrders, updateOrder, deleteOrder, createAndAssignOrder } from '../../APIs/Order_api';
import { Link } from 'react-router-dom';
import OrderTable from './orderTable.jsx';
import { TiHomeOutline } from "react-icons/ti";
import OrderForm from './OrderForm.jsx';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [error, setError] = useState(null); // Track error state
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      console.log("Fetched Orders:", data);  // Add this line
      setOrders(data);
      setTotalOrders(data.length);
    } catch (error) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);

  const handleAddOrder = async (order) => {
    try {
      const newOrder = await createAndAssignOrder(order); 
      
      // If the API doesn't return 'id', map the ProductId to id or other necessary transformations
      const mappedOrder = {
        id: newOrder.ProductId,
        productName: newOrder.productName,
        quantity: newOrder.quantity,
        pricePerUnit: newOrder.pricePerUnit,
        totalPrice: newOrder.totalPrice,
        customerName: newOrder.customerName,
        // Add other necessary fields here
      };
  
      setOrders((prevOrders) => [...prevOrders, mappedOrder]); // Append the new order to the state
      setTotalOrders((prevTotal) => prevTotal + 1);
      setSuccessMessage('Order added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowForm(false); // Close the form
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };
  
  
  const handleEditOrder = async (order) => {
    try {
      console.log("Editing order:", order);
      await updateOrder(order.id, order);
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === order.id ? order : o))
      );
      setSuccessMessage('Order updated successfully!'); 
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      setShowForm(false); // Close form after saving
    } catch (error) {
      console.error('Error editing order:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      await loadData();
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      setSuccessMessage('Order deleted successfully!'); 
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleShowForm = (order = null) => {
    setSelectedOrder(order);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedOrder(null);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.orderContainer}>
      <Link to="/home" style={{ fontSize: '40px' }}>
        <TiHomeOutline />
      </Link>
      <h1>Welcome To Order Page</h1>
      
      {/* Display success message if present */}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      
      <div className={styles.Ocontainers}>
        <div className={styles['subContainer-1']}>
          <h2 className={styles.title}>Number of Orders</h2>
          <span>{totalOrders}</span>
        </div>
        <button className={styles.NewOrders} onClick={() => handleShowForm()} disabled={isSubmitting}>
          Add New Order
        </button>
      </div>

      {showForm && (
        <OrderForm
          order={selectedOrder}
          onSave={selectedOrder ? handleEditOrder : handleAddOrder}
          onCancel={handleCloseForm}
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
