const backendUrl = "http://localhost:7000/Produts";

const getAllPro = async () => {
    const response = await fetch (backendUrl);
    return await  response.json();
};

export { getAllPro};