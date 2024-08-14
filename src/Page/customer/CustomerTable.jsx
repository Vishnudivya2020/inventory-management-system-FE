import React from 'react';
import styles from './CustomerTable.module.css';

const CustomerTable = ({Customer = []}) => {
   

  return (
    <div className={styles.tableContainer}>
      <table className={styles.CustomerTable}>
        <thead>
          <tr>
            <th> CustomerName</th>
            <th>Email</th>
            <th>Type</th>
            <th>CurrendOrders</th>
            <th>ShippingAddress</th>
            <th>Id</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
