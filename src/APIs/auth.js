// // auth.js

// import { BE_Url} from './Constants'
// export async function userSignup(userData) {
//     try {
//       const response = await fetch(` ${BE_Url}/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json(); // Parse JSON response
//         throw new Error(errorData.msg || 'Unknown error occurred');
//       }
  
//       return await response.json(); // Return success data
  
//     } catch (error) {
//       throw new Error(error.message || 'Failed to register');
//     }
//   }
  

// const userSignIn = async (UserData) => {
//     try {
//         const response = await fetch(`${BE_Url}/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(UserData),
           
//         });
        

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => null);
//             const errorMessage = errorData?.msg || 'Login failed';
//             throw new Error(errorMessage);
//         }

//         const result = await response.json();
//         console.log('User signed in successfully:', result);

//         // Clear any previous login errors from local storage
//         localStorage.removeItem('loginError');

//         return result;

//     } catch (error) {
//         const errorMessage = error.message || 'Unknown error';
//         // console.error('Error during sign in:', errorMessage);

//         // Store the error message in local storage
//         localStorage.setItem('loginError', errorMessage);

//         return { error: errorMessage };
//     }
// };






// export { userSignup ,userSignIn};
// auth.js

import { BE_Url } from './Constants';

export async function userSignup(userData) {
  try {
    const response = await fetch(`${BE_Url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse JSON response
      throw new Error(errorData.msg || 'Unknown error occurred');
    }

    return await response.json(); // Return success data

  } catch (error) {
    throw new Error(error.message || 'Failed to register');
  }
}

// export async function userSignIn(userData) {
//   try {
//     const response = await fetch(`${BE_Url}/login`, {
//       method: 'POST', 
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       const errorMessage = errorData?.msg || 'Login failed';
//       throw new Error(errorMessage);
//     }

//     const result = await response.json();
//     console.log('User signed in successfully:', result);

//     // Clear any previous login errors from local storage
//     localStorage.removeItem('loginError');

//     return result;

//   } catch (error) {
//     const errorMessage = error.message || 'Unknown error';
//     // Store the error message in local storage
//     localStorage.setItem('loginError', errorMessage);

//     return { error: errorMessage };
//   }
// }

// src/APIs/auth.js
import axios from 'axios';

export const userSignIn = async ({ email, password, role }) => {
    try {
        const response = await axios.post('http://localhost:7000/login', {
            email,
            password,
            role
        });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        return { code: 0, msg: 'An error occurred during login' };
    }
};

