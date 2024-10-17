import React from 'react';
import styles from './orderTable.module.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const OrderTable = ({orders , onEdit, onDelete }) => {
   

  return (
    <div className={styles.tableContainer}>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Id</th>
            <th>ProductName</th>
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>TotalPrice</th>
            <th>CustomerName</th>
            <th>OrderDate</th>
            {/* <th>Status</th> */}
            <th>ProductsId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order. productName}</td>
              <td>{order.quantity}</td>
              <td>{order.pricePerUnit}</td>
             <td>{order.totalPrice}</td>
             <td>{order.customerName}</td>
             <td>{order.orderDate}</td>
             {/* <td>{order.status }</td> */}
             <td>{order.Products}</td>
             <td style={{ display:'flex'}}  >
             <button  style={{ color:'blue'}} className={styles.EBTN} onClick={() => onEdit(order)}><MdOutlineModeEdit /></button>
          <button style={{ color:'red'}} className={styles.DBTN} onClick={() => onDelete(order.id)}><MdDeleteOutline /></button>
             </td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;



