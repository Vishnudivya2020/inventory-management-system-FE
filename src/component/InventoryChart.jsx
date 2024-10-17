import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/Products`;

const InventoryChart = () => {
  const chartRef = useRef(null); // Reference to hold the chart instance

  useEffect(() => {
    const ctx = document.getElementById('inventoryChart').getContext('2d');

    // Fetch data from the backend
    fetch(backendUrl) // Use the backend URL defined above
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Data:', data); // Log the fetched data

        // Extract labels and stock data
        const labels = data.map(item => item.productName);
        const stock = data.map(item => item.quantityInStock);

        // If the chart already exists, update it
        if (chartRef.current) {
          chartRef.current.data.labels = labels; // Update labels
          chartRef.current.data.datasets[0].data = stock; // Update stock data
          chartRef.current.update(); // Update chart
        } else {
          // Create a new chart if it doesn't exist
          chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels, // product names from backend
              datasets: [{
                label: 'Available Stock',
                data: stock, // stock data from backend
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                }
              }
            }
          });
        }
      })
      .catch(error => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

  return <canvas id="inventoryChart" width="400" height="200"></canvas>;
};

export default InventoryChart;
