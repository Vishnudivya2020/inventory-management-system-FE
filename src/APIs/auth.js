//API to register a new user into the database

import {BE_Url} from './Constants.js';

const userSignup = async (userData) =>{
  try{
  const response = await fetch(`${BE_Url}/register`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json',

    },
    body:JSON.stringify(userData)
  });
 if(!response.ok){
   throw new Error(`HTTP error! status:${response.status}`);
 }
 return response.json();
}catch(error){
  console.log('Error during registration:',error);
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

