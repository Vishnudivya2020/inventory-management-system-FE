

import React, { useState, useEffect } from 'react';
import { getAllPro, addProductAPI, editProductAPI, deleteProductAPI } from '../../APIs/Product_api';
import { Link } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; 
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TiHomeOutline } from "react-icons/ti";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    ProductName: '',
    bought: '',
    sold: '',
    availableInStock: '',
    imageUrl: '/images/products/productA.jpg', // Default image
  });

  const token = localStorage.getItem('token');
  const userDetails = jwtDecode(token);
  const isAuthorized = userDetails.role === "admin";

  // Fetch all products from the backend
  const loadData = async () => {
    const data = await getAllPro();
    setProducts(data);
    setTotalProducts(data.length);
  };

  useEffect(() => {
    if (isAuthorized) {
      loadData();
    }
  }, [isAuthorized]);

  // Function to handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const addedProduct = await addProductAPI(newProduct); // Call API to add product
      setProducts((prevProducts) => [...prevProducts, addedProduct]); // Update product list with new product
      setNewProduct({
        ProductName: '',
        bought: '',
        sold: '',
        availableInStock: '',
        imageUrl: '/images/products/default.jpg',
      });
      setShowForm(false); // Hide form after adding product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Function to handle the editing process
  const handleEditProduct = (product) => {
    setEditMode(true);
    setCurrentProductId(product.id); // Save the current product ID for updating
    setNewProduct({
      ProductName: product.ProductName,
      bought: product.bought,
      sold: product.sold,
      availableInStock: product.availableInStock,
      imageUrl: product.imageUrl,
    });
    setShowForm(true); // Show the form prefilled with the current product details
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...newProduct,
        orderId: newProduct.orderId || "defaultOrderId", // Ensure orderId has a fallback value
      };
      const updatedResponse = await editProductAPI(currentProductId, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === currentProductId ? updatedResponse : product
        )
      );
      setShowForm(false);
      setEditMode(false);
      setNewProduct({
        ProductName: '',
        bought: '',
        sold: '',
        availableInStock: '',
        imageUrl: '/images/products/productA.jpg',
        orderId: '', // Reset orderId
      });
    } catch (error) {
      console.error('Error saving product changes:', error);
    }
  };

  // Function to handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductAPI(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setTotalProducts((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const renderCheck = () => {
    if (isAuthorized) {
      return (
        <>
         
          <div className="d-flex justify-content-between align-items-center my-4">
            <button
               style={{ color: 'whitesmoke',
                 backgroundColor:'green', 
                padding: '10px' ,
              display:'flex',
              marginLeft:'0px',
              marginTop:'50px'
              }}
              onClick={() => {
                setShowForm((prev) => !prev);
                if (editMode) {
                  setEditMode(false); // Reset edit mode if canceling the form
                }
              }}
              className="btn btn-secondary"
            >
              {showForm ? 'Cancel' : 'Add New Product'}
            </button>
            <h5 style={{color:'whitesmoke',backgroundColor:'#FF1D5B',padding:'20px'}}>Total Products: {totalProducts}</h5>
          </div>

          {showForm && (
            <div className="container mt-4">
              <h2>{editMode ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={editMode ? handleSaveChanges : handleAddProduct}>
                <div className="form-group" >
                  <label>Product Name</label>
                  <input
                  
                    type="text"
                    name="ProductName"
                    value={newProduct.ProductName}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Product Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Bought</label>
                  <input
                    type="text"
                    name="bought"
                    value={newProduct.bought}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Bought"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Sold</label>
                  <input
                    type="text"
                    name="sold"
                    value={newProduct.sold}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Sold"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Available In Stock</label>
                  <input
                    type="text"
                    name="availableInStock"
                    value={newProduct.availableInStock}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Available In Stock"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={newProduct.imageUrl}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Image URL"
                  />
                </div>
                <button type="submit" className="btn btn-success mt-2">
                  {editMode ? 'Save Changes' : 'Add Product'}
                </button>
              </form>
            </div>
          )}

          <div className="container mt-4">
            <table className="table table-striped table-bordered">
              <thead>
                <tr >
                  <th style={{color:'whitesmoke',backgroundColor:'black'}}>ID</th>
                  <th style={{color:'whitesmoke',backgroundColor:'black'}}>Order ID</th>
                  <th style={{color:'whitesmoke',backgroundColor:'black'}}>Product Name</th>
                  <th style={{color:'whitesmoke',backgroundColor:'black'}}>Bought</th>
                  <th style={{color:'whitesmoke',backgroundColor:'black'}}>Sold</th>
                  <th style={{color:'whitesmoke',backgroundColor:'black'}}>Available In Stock</th>
                  <th style={{color:'whitesmoke',backgroundColor:'black'}}>Image</th>
                  <th style={{color:'whitesmoke',backgroundColor:'black'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.orderId}</td>
                    <td>{product.ProductName}</td>
                    <td>{product.bought}</td>
                    <td>{product.sold}</td>
                    <td>{product.availableInStock}</td>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.ProductName}
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>
                      <FaEdit
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => handleEditProduct(product)}
                      />
                      <FaTrash
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteProduct(product.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )
    } else {
      return <h1>You are not authorized 🤷‍♀️</h1>
    }
  };

  return (
    
    <div className="container">
      <Link to='/home'  style={{fontSize:'40px'}}><TiHomeOutline /></Link>
      {renderCheck()}
     
    </div>
  );
};

export default ProductPage;

