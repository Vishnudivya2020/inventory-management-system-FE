import { BE_Url } from './Constants.js';

const userSignup = async (userData) => {
  try {
    const response = await fetch(`${BE_Url}/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Extract error message from the response body, if available
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Assuming the response contains a profilePicUrl, save it to local storage
    const userProfile = {
      ...data,
      profilePicUrl: data.profilePicUrl || 'default profile', // Default value if not provided
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    return data;
  } catch (error) {
    // Log the detailed error message
    console.error('Error during registration:', error.message || error);
    throw error; // Optionally re-throw the error if you want to handle it further up the call stack
  }
};


const  userSignIn = async (userData) =>{
  const response = await fetch(`${BE_Url}/login`,{
    method:"POST",
    body:JSON.stringify(userData),
    headers:{
      "Content-Type":"application/json;charset=utf-8",
},
  });
   return await response.json();

};

const verifyAccount = async (token)=> {
 
  const response = await  fetch(`${BE_Url}/verify-user`,{
    method:"POST",
    body:JSON.stringify({
      token,
    }),
    headers:{
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
}

export { userSignup, userSignIn,verifyAccount  };

