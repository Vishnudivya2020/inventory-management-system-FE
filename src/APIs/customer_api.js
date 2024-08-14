const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/Customer`; 

const getAllCus = async () => {
    const response = await fetch (backendUrl);
    return await  response.json();
};

export { getAllCus};