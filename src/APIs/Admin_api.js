const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/Admin`; 

const getAllAdmin = async () => {
    const response = await fetch (backendUrl);
    return await  response.json();
};

export { getAllAdmin};