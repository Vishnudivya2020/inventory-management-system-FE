const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/orders`; 


export const getAllOrders = async () => {
  const response = await fetch(backendUrl);
  return response.json();
};

export const addOrder = async (order) => {
  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  return response.json();
};

export const updateOrder = async (orderId, order) => {
  const response = await fetch(`${backendUrl}/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  return response.json();
};

export const deleteOrder = async (orderId) => {
  const response = await fetch(`${backendUrl}/${orderId}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Add this to your API file to handle fetching products
const productUrl = `${import.meta.env.VITE_BACKEND_URL}/Products`; // Adjust as needed

export const getAllProducts = async () => {
  const response = await fetch(productUrl, {
    headers: {
      Authorization: localStorage.getItem("token"), // If authorization is needed
    },
  });
  return await response.json(); // Ensure the response is valid JSON
};

