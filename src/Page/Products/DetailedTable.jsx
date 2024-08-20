
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './DetailedTable.module.css';

const DetailedTable = ({ Products = [], onEdit, onDelete }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteClick = (productId) => {
    const product = Products.find((p) => p.id === productId);
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the product "${product?.ProductName}"?`
    );
    if (isConfirmed) {
      onDelete(productId);
    }
  };

  const handleEditClick = (productId) => {
    const product = Products.find((p) => p.id === productId);
    setSelectedProduct(product || null);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveChanges = () => {
    if (selectedProduct) {
      onEdit(selectedProduct);
    }
    closeModal();
  };

  // Conditional rendering for empty product list
  if (!Products.length) {
    return <p className={styles.noProducts}>Product not found.</p>;
  }

  return (
    <div className={styles.DtableContainer}>
      <table className={styles.productDTable}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Bought</th>
            <th>Sold</th>
            <th>Available In Stock</th>
            <th>ID</th>
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
              <td className={styles.iconBtn}>
                <button>
                  <FaEdit
                    className={styles.icon1}
                    onClick={() => handleEditClick(product.id)}
                  />
                </button>
                <button>
                  <FaTrash
                    className={styles.icon2}
                    onClick={() => handleDeleteClick(product.id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className={styles.DmodalOverlay}>
          <h3>Edit Product</h3>
          <img
            src={selectedProduct.imageUrl || '/images/products/default.jpg'}
            className={styles.DproductImage}
            alt={selectedProduct.ProductName}
          />
          <div className={styles.DproductInfo}>
            <label>Product Name</label>
            <input
              type="text"
              value={selectedProduct.ProductName}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, ProductName: e.target.value })
              }
            />
            <label>Bought</label>
            <input
              type="text"
              value={selectedProduct.bought}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, bought: e.target.value })
              }
            />
            <label>Sold</label>
            <input
              type="text"
              value={selectedProduct.sold}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, sold: e.target.value })
              }
            />
            <label>Available In Stock</label>
            <input
              type="text"
              value={selectedProduct.availableInStock}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, availableInStock: e.target.value })
              }
            />
            <div className={styles.EditBtns}>
              <button onClick={handleSaveChanges} className={styles.saveBtn}>Save Changes</button>
              <button onClick={closeModal} className={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedTable;
