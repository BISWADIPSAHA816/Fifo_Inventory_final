import React, { useEffect, useState } from 'react';
import { fetchInventory, fetchLedger } from '../services/api';
import '../styles/dashboard.css';

function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    fetchInventory().then(setInventory);
    // fetchLedger().then(setLedger);
  }, []);
  // useEffect(() => {
  //   console.log('Inventory data fetched:', inventory);
  // },[inventory]);

  return (
    <div className="dashboard-container">
      <h2>Product Stock Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            {/* <th>Total Cost</th>
            <th>Avg Cost/Unit</th> */}
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.product_id}>
              <td>{item.product_id}</td>
              <td>{item.product_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Product ID</th>
            <th>Quantity </th>
            <th>Unit_price</th>
            <th>Quantity_remaining</th>
            <th>Purchase_timestamp </th>          
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.product_id}>
              <td>{item.batch_id}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.unit_price}</td>
              <td>{item.quantity_remaining}</td>
              <td>{item.purchase_timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <h2>Transaction Ledger</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Type</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((item, index) => (
            <tr key={index}>
              <td>{item.timestamp}</td>
              <td>{item.type}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default Dashboard;
