import React, { useState, useEffect } from 'react';
import { getAllPro, addProductAPI, editProductAPI, deleteProductAPI } from '../../APIs/Product_api';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; 
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TiHomeOutline } from "react-icons/ti";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); 
  const [newProduct, setNewProduct] = useState({
    productName: '',
    quantityInStock: '',
    price: '',
    imageUrl: '/images/products/productA.jpg', // Default image
  });

  const token = localStorage.getItem('token');
  const userDetails = jwtDecode(token);
  const isAuthorized = userDetails.role === "admin";

  // Fetch all products from the backend
  const loadData = async () => {
    try {
      const data = await getAllPro();
      setProducts(data);
      setTotalProducts(data.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
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
      console.log(addedProduct);
      await loadData(); // Reload products after adding new product
      setNewProduct({
        productName: '',
        price: '',
        quantityInStock: '',
        imageUrl: '/images/products/default.jpg',
      });
      setSuccessMessage('Product added successfully!'); 
      setTimeout(() => setSuccessMessage(''), 3000);
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
      productName: product.productName,
      quantityInStock: product.quantityInStock,
      price: product.price,
      imageUrl: product.imageUrl,
      orderId:product.orderId || "",
    });
  
    setShowForm(true); // Show the form prefilled with the current product details
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...newProduct,
        orderId: newProduct.orderId || " ", // Ensure orderId has a fallback value
      };
      const updatedResponse = await editProductAPI(currentProductId, updatedProduct);
      await loadData(); // Reload products after editing
      // Success message only after saving changes
    setSuccessMessage('Product updated successfully!'); 
    setTimeout(() => setSuccessMessage(''), 3000);
      
      setShowForm(false);
      setEditMode(false);
      setNewProduct({
        productName: '',
        quantityInStock: '',
        price: '',
        imageUrl: '/images/products/productA.jpg',
        orderId: '', // Reset orderId
      });
    } catch (error) {
      console.error('Error saving product changes:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Call the API to delete the product
      await deleteProductAPI(productId);
  
      // Update the frontend state to remove the product
      await loadData(); // Reload products after deletion
      console.log('Product deleted successfully');
      setSuccessMessage('Product Deleted successfully!'); 
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const renderCheck = () => {
    if (isAuthorized) {
      return (
        <>
             <h1>Welcome To Product Page</h1>
      {/* Display success message if present */}
      {successMessage && <div style={{color:"green",backgroundColor:"#eaffea",
        padding:"10px",border:"1px solid green",borderRadius:"5px",marginBottom:"10px"
      }}>{successMessage}</div>}
          <div className="d-flex justify-content-between align-items-center my-4">
            <button
              style={{ color: 'whitesmoke', backgroundColor: 'green', padding: '10px', display: 'flex', marginLeft: '0px', marginTop: '50px' }}
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
            <h5 style={{ color: 'whitesmoke', backgroundColor: '#FF1D5B', padding: '20px' }}>Total Products: {totalProducts}</h5>
          </div>

          {showForm && (
            <div className="container mt-4">
              <h2>{editMode ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={editMode ? handleSaveChanges : handleAddProduct}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={newProduct.productName}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Product Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity In Stock</label>
                  <input
                    type="text"
                    name="quantityInStock"
                    value={newProduct.quantityInStock}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="QuantityInStock"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="price"
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
                <tr>
                  <th style={{ color: 'whitesmoke', backgroundColor: 'black' }}>ID</th>
                  <th style={{ color: 'whitesmoke', backgroundColor: 'black' }}>Order ID</th>
                  <th style={{ color: 'whitesmoke', backgroundColor: 'black' }}>Product Name</th>
                  <th style={{ color: 'whitesmoke', backgroundColor: 'black' }}>Quantity In Stock</th>
                  <th style={{ color: 'whitesmoke', backgroundColor: 'black' }}>Price</th>
                  <th style={{ color: 'whitesmoke', backgroundColor: 'black' }}>Image</th>
                  <th style={{ color: 'whitesmoke', backgroundColor: 'black' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.orderId}</td>
                    <td>{product.productName}</td>
                    <td>{product.quantityInStock}</td>
                    <td>{product.price}</td>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
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
      );
    } else {
      return <h1>You are not authorized 🤷‍♀️</h1>;
    }
  };

  return (
    <div style={{ backgroundColor: '#FF1D5B', color: 'white', minHeight: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <TiHomeOutline /> Home
          </Link>
        </div>
      </nav>
      <div className="container mt-4">
        {renderCheck()}
      </div>
    </div>
  );
};

export default ProductPage;




