const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/users`; 

const getAllUser = async () => {
    const response = await fetch (backendUrl,{
        headers:{
            Authorization:localStorage.getItem("token"),
        },
    });
    return await  response.json();
};

export { getAllUser};