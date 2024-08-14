const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/users`; 

const getAllUser = async () => {
    const response = await fetch (backendUrl);
    return await  response.json();
};

export { getAllUser};