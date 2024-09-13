 const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/Customer`; 

const getAllCus = async () => {
    const response = await fetch (backendUrl,{
        headers:{
            Authorization:localStorage.getItem("token"),
        }, 
    });
    return await  response.json();
};




// const addCustomer = async (newCustomer) => {
 

//   const response = await fetch(backendUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: localStorage.getItem('token'),
//     },
//     body: JSON.stringify(newCustomer),
//   });

//   if (response.ok) {
//     return await response.json();
//   } else {
//     throw new Error('Failed to add customer');
//   }
// };
const addCustomer = async (newCustomer) => {
  console.log('Adding customer:', newCustomer); // Debugging line

  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(newCustomer),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    console.error('Failed to add customer:', errorText);
    throw new Error('Failed to add customer');
  }
};


const deleteCustomer = async (customerId) => {
  try {
    const response = await fetch(`${backendUrl}/${customerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to delete customer');
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export { getAllCus,addCustomer,deleteCustomer };
