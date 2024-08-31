const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/Customer`; 

const getAllCus = async () => {
    const response = await fetch (backendUrl,{
        headers:{
            Authorization:localStorage.getItem("token"),
        }, 
    });
    return await  response.json();
};

export { getAllCus};