


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllProducts } from '../../APIs/Order_api';

const OrderForm = ({ order, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    pricePerUnit: '',
    totalPrice: '',
    customerName: '',
    status: 'Processing',
  });
  const [selectedProduct, setSelectedProduct] = useState(''); 
  const [products, setProducts] = useState([]); // For storing the list of products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (order) {
      setFormData({
        productName: order.productName,
        quantity: order.quantity,
        pricePerUnit: order.pricePerUnit,
        totalPrice: order.totalPrice,
        customerName: order.customerName,
        status: order.status,
      });
      setLoading(false); // No need to load products for editing
    } else {
      // Fetch the list of products only if adding a new order
      const fetchProducts = async () => {
        try {
          const productList = await getAllProducts();
          console.log(productList); // Check if the API is returning the correct data
          setProducts(productList); // Assuming productList is an array of products
          setLoading(false);
        } catch (err) {
          setError('Error fetching products');
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: order ? order.id : Date.now().toString() });
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{order ? 'Edit Order' : 'Add New Order'}</h2>
      <form onSubmit={handleSubmit}>

        {/* Conditionally render the product selection for Add New Order */}
        {!order ? (
          <div  className="mb-3">
            <label className="form-label">Product Name:</label>
            <select 
            style={{width:'350px'}}
              value={selectedProduct} 
              onChange={(e) => {
                setSelectedProduct(e.target.value);
                setFormData({ ...formData, productName: e.target.value }); // Set selected product in formData
              }}>
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product.ProductName}>
                  {product.ProductName}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mb-3">
            <label className="form-label">Product Name:</label>
            <input
              type="text"
              className="form-control"
              name="productName"
              value={formData.productName}
              readOnly
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Quantity:</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price Per Unit:</label>
          <input
            type="number"
            className="form-control"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Price:</label>
          <input
            type="number"
            className="form-control"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Customer Name:</label>
          <input
            type="text"
            className="form-control"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;


