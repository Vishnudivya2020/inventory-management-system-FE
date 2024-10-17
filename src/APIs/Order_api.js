const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/orders`;  

// Get all orders
export const getAllOrders = async () => {
  const response = await fetch(backendUrl, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return await response.json();
};

// Update an existing order by ID
export const updateOrder = async (OrderId, updatedOrderData) => {
   console.log("OrderId:", OrderId);
   console.log("updatedOrderData:", updatedOrderData);
 
  const response = await fetch(`${backendUrl}/${OrderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedOrderData),
  });
  return response.json();
};

// Delete an order by ID
export const deleteOrder = async (OrderId) => {
  const response = await fetch(`${backendUrl}/${OrderId}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Create a new order and assign a product to it
export const createAndAssignOrder = async (orderData) => {
  console.log('API Call - Create orderData:', orderData);
  const { ProductId, ...orderDetails } = orderData;
  console.log("ProductId:", ProductId);

  // Ensure ProductId is present
  if (!ProductId) {
    throw new Error('ProductId is required to create an order');
  }

  try {
    // Step 1: Create a new order and assign the ProductId
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: localStorage.getItem("token"), // Uncomment if authorization is required
      },
      body: JSON.stringify(
        orderData
  ),
    });

    // Check if the response is OK
    if (!response.ok) {
      // Capture additional error information from the response body
      const errorData = await response.json();
      throw new Error(`Error creating order: ${errorData.message || 'Unknown error occurred'}`);
    }

    // Extract response data
    const responseData = await response.json();
    console.log('Order created and Product updated successfully:', responseData.orderId);

    return responseData; // Return the new order ID

  } catch (error) {
    // Log the detailed error for debugging
    console.error('Error during order creation and assignment:', error.message);

    // Re-throw the error to be handled in the calling function
    throw new Error(`Failed to create and assign order: ${error.message}`);
  }
};

