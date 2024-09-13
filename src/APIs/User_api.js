const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/users`; 

const getAllUser = async () => {
    const response = await fetch (backendUrl,{
        headers:{
            Authorization:localStorage.getItem("token"),
        },
    });
    return await  response.json();
};

const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${backendUrl}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting user:", error);
      return null; // Return null or handle the error as needed
    }
  };
  
  export { getAllUser, deleteUser };
  

