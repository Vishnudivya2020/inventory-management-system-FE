const BackendUrl =`${import.meta.env.VITE_BACKEND_URL}/Products` ;

// const getAllProducts = async () => {
//     try{
//     const response  = await fetch(BackendUrl);
//     console.log('response:',response);
//     if(!response.ok){
//         throw new Error('NetWork response was not ok');
//     } 
//     const data = await response.json();
//     console.log('API Response Data:',data);

//     return data;
// }catch(error){
//   console.error('Error fetching products:',error);
//   throw error;
// }
// };

const getAllProducts = async () =>{
    const response = await fetch (BackendUrl);
    return await response.json();
};

export { getAllProducts };