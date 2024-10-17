import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllPro } from '../../APIs/Product_api'; // Fetching products
import { updateOrder, createAndAssignOrder } from '../../APIs/Order_api'; // API for creating and updating orders

const OrderForm = ({ order, onSave, onCancel }) => {
  const [selectedProduct, setSelectedProduct] = useState(''); // Initialize selectedProduct
 
  const [formData, setFormData] = useState({
    ProductId: '', // Product ID to store the selected product's ID
    productName: '',
    quantity: 1,
    pricePerUnit: 0,
    totalPrice: 0,
    customerName: '',
    quantityInStock: 0, // New field for storing available quantity
    orderDate:'',
    id: '',
  });

  
  const [Products, setProducts] = useState([]); // For storing the list of products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting]=useState(false);

  useEffect(() => {
    // Fetch products when the component is loaded
    const fetchProducts = async () => {
      try {
        const productList = await getAllPro();
        setProducts(productList);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  // Pre-fill the form when editing an order
  useEffect(() => {
    if (order) {
      setFormData({
        ProductId: order.ProductId || '',
        productName: order.productName || '',
        quantity: order.quantity || 1,
        pricePerUnit: order.pricePerUnit || 0,
        totalPrice: order.totalPrice || 0,
        customerName: order.customerName || '',
        quantityInStock: order.quantityInStock || 0, // Add quantityInStock if present
        orderDate:order.orderDate||'',
        id: order.id || '',
      });
      setSelectedProduct(order.productName || '');
    }
  }, [order]);

  

  useEffect(() => {
    if (selectedProduct) {
      const selectedProductObj = Products.find(p => p.productName === selectedProduct);
  
      if (selectedProductObj) {
        setFormData(prevData => ({
          ...prevData,
          ProductId: selectedProductObj.id,
          pricePerUnit: selectedProductObj.price || 0,
          quantityInStock: selectedProductObj.quantityInStock || 0,
          totalPrice: selectedProductObj.price * prevData.quantity || 0, // Ensure this updates
        }));
      }
    }
  }, [selectedProduct, formData.quantity, Products]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      totalPrice: name === 'quantity' ? value * prevData.pricePerUnit : prevData.totalPrice,
    }));
  };

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   // Check if submission is already in progress
//   if (isSubmitting) {
//       return;
//   }

//   setIsSubmitting(true); // Lock form to prevent double submission

//   try {
//       const selectedProductObj = Products.find(p => p.productName === selectedProduct);

//       if (!selectedProductObj) {
//           throw new Error('Selected product not found');
//       }

//       const newOrder = {
//           ...formData,
//           Products: [selectedProductObj.id],
//           id: order ? order.id : Date.now().toString(), // Use existing ID for editing
//       };
//        console.log("NewOrder:",newOrder);
//       if (order) {
//           // Update existing order
//           await updateOrder(order.id, newOrder); // Call API with existing order ID
//           onSave(newOrder); // Pass updated order back to parent
//       } else {
//           // Create new order
//           await createAndAssignOrder(newOrder); // Call API to create new order
           
//           onSave(newOrder); // Pass new order back to parent
          
//       }

//       // Reset form data after submission
//       setFormData({
//           ProductId: '',
//           productName: '',
//           quantity: 1,
//           pricePerUnit: 0,
//           totalPrice: 0,
//           customerName: '',
//           quantityInStock: 0,
//           id: '',
//       });
//       setSelectedProduct(''); // Reset product selection
//      onCancel();
//   } catch (error) {
//       console.error('Error submitting form:', error);
//   } finally {
//       setIsSubmitting(false); // Unlock form for further submissions
//   }
// };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (isSubmitting) return;  // Prevent double submission
  setIsSubmitting(true);

  try {
    const selectedProductObj = Products.find(p => p.productName === selectedProduct);
    if (!selectedProductObj) throw new Error('Selected product not found');

    const newOrder = {
      ...formData,
      Products: [selectedProductObj.id],
      id: order ? order.id : Date.now().toString(),
    };

    if (order) {
      await updateOrder(order.id, newOrder);
      onSave(newOrder);  // Pass the updated order to parent
    } else {
      await createAndAssignOrder(newOrder);
      onSave(newOrder);  // Pass the new order to parent
    }

    // Reset form data
    setFormData({
      ProductId: '',
      productName: '',
      quantity: 1,
      pricePerUnit: 0,
      totalPrice: 0,
      customerName: '',
      quantityInStock: 0,
      id: '',
    });
    setSelectedProduct('');
    onCancel();
    
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    setIsSubmitting(false);
  }
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
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <select
           style={{ width: '350px' }}
            value={selectedProduct}
            onChange={(e) => {
              const selectedProductObj = Products.find(p => p.productName === e.target.value);
              if (selectedProductObj) {
                setSelectedProduct(selectedProductObj.productName);
                setFormData({
                  ...formData,
                  productName: selectedProductObj.productName,
                  ProductId: selectedProductObj._id, // Ensure ProductId is set correctly
                });
              }
            }}
            required
          >
            <option value="">Select a Product</option>
            {Products.map((product) => (
              <option key={product._id} value={product.productName}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity:</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity In Stock:</label>
          <input
            type="number"
            className="form-control"
            name="quantityInStock"
            value={formData.quantityInStock}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price Per Unit:</label>
          <input
            type="number"
            className="form-control"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Price:</label>
          <input
            type="number"
            className="form-control"
            name="totalPrice"
            value={formData.totalPrice}
            readOnly
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

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {order ? 'Save Changes' : 'Save'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default OrderForm;


