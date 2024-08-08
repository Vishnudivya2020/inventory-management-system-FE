const backendUrl = 'http://localhost:7000/Products';

const getAllPro = async () => {
    const response = await fetch (backendUrl);
    return await  response.json();
};

export { getAllPro};