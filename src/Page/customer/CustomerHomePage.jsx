
import { useEffect, useState } from 'react';
import React from 'react';
import CustomerTable from './CustomerTable.jsx';
import { Link } from 'react-router-dom';
import styles from './CustomerPage.module.css';
import { TiHomeOutline } from "react-icons/ti";
import { getAllCus, addCustomer, deleteCustomer } from '../../APIs/customer_api.js';

const CustomerHomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOldCustomers, setTotalOldCustomers] = useState(0);
  const [totalNewCustomers, setTotalNewCustomers] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [totalVIPCustomer, setTotalVIPCustomer] = useState(0);

  const [newCustomer, setNewCustomer] = useState({
    id: '',
    customerName: '',
    Email: '',
    Type: '',
    CurrentOrders: '',
    ShippingAddress: '',
    imageUrl: '/images/customers/customer.jpg',
  });

  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    try {
      const data = await getAllCus();
      setCustomers(data);
      setTotalCustomers(data.length);
      setTotalOldCustomers(data.filter(customer => customer.Type === 'Old').length);
      setTotalNewCustomers(data.filter(customer => customer.Type === 'New').length);
      setTotalVIPCustomer(data.filter(customer => customer.Type === 'VIP').length);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      setCustomers(prevCustomers =>
        prevCustomers.filter(customer => customer.id !== customerId)
      );
      // Update total customer count after deletion
      setTotalCustomers(customers.length - 1);
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value,
    }));
  };



  const handleAddCustomer = async (e) => {
    e.preventDefault();
  
    const newCustomerWithId = {
      ...newCustomer,
      id: Date.now().toString(), // Generate unique ID for local use
    };
  
    try {
      const savedCustomer = await addCustomer(newCustomerWithId);
       console.log(savedCustomer);
      // Assuming `savedCustomer` returns the new customer object
       if (savedCustomer) {
        // Directly update the state to include the new customer
        setCustomers((prevCustomers) => [...prevCustomers, savedCustomer]);
  
        // Update customer counts based on the type
        setTotalCustomers((prev) => prev + 1);
        if (savedCustomer.Type === 'Old') setTotalOldCustomers((prev) => prev + 1);
        if (savedCustomer.Type === 'New') setTotalNewCustomers((prev) => prev + 1);
        if (savedCustomer.Type === 'VIP') setTotalVIPCustomer((prev) => prev + 1);
      }
      await loadData();
      setNewCustomer({
        id: '',
        customerName: '',
        Email: '',
        Type: '',
        CurrentOrders: '',
        ShippingAddress: '',
        imageUrl: '/images/customers/customer.jpg',
      });
      setSuccessMessage('Product added successfully!'); 
      setTimeout(() => setSuccessMessage(''), 3000);
  
      setShowForm(false); // Close form after submission
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };
  
  useEffect(() => {
    loadData(); // Load customer data on component mount
  }, []);

  return (
    <div className={styles.CusContainer}>
      <Link to='/home' style={{ fontSize: '40px' }}><TiHomeOutline /></Link>
      <h1>Welcome To Customer Page</h1>

       {/* Display success message if present */}
       {successMessage && <div style={{color:"green",backgroundColor:"#eaffea",
        padding:"10px",border:"1px solid green",borderRadius:"5px",marginBottom:"10px"
      }}>{successMessage}</div>}

      <div className={styles.Cuscontainers}>
        <div className={styles['subContainer-1']}>
          <h2 className={styles.Custitle}>Total Customer</h2>
          <p>{totalCustomers}</p>
        </div>
        <div className={styles['subContainer-2']}>
          <h2 className={styles.Custitle}>Total Old Customer</h2>
          <p>{totalOldCustomers}</p>
        </div>
        <div className={styles['subContainer-3']}>
          <h2 className={styles.Custitle}>Total New Customer</h2>
          <p>{totalNewCustomers}</p>
        </div>
        <div className={styles['subContainer-4']}>
          <h2 className={styles.Custitle}>Total VIP Customer</h2>
          <p>{totalVIPCustomer}</p>
        </div>
      </div>

      <button className={styles.AddCus} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Customer'}
      </button>

      {showForm && (
        <div className={styles.addCustomerContainer}>
          <h2>Add New Customer</h2>
          <form onSubmit={handleAddCustomer} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="customerName">Customer Name</label>
              <input
                id="customerName"
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={newCustomer.customerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="Email"
                placeholder="Email"
                value={newCustomer.Email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="Type"
                value={newCustomer.Type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Old">Old</option>
                <option value="New">New</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="currentOrders">Current Orders</label>
              <input
                id="currentOrders"
                type="text"
                name="CurrentOrders"
                placeholder="Current Orders"
                value={newCustomer.CurrentOrders}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="shippingAddress">Shipping Address</label>
              <input
                id="shippingAddress"
                type="text"
                name="ShippingAddress"
                placeholder="Shipping Address"
                value={newCustomer.ShippingAddress}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl">Image URL</label>
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={newCustomer.imageUrl}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className={styles.AddButton}>Add Customer</button>
          </form>
        </div>
      )}

      <CustomerTable customers={customers} onEdit={() => {}} onDelete={handleDeleteCustomer} />
    </div>
  );
};

export default CustomerHomePage;
