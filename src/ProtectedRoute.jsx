import  { Navigate} from "react-router-dom";

const ProtectedRoute = ({ component}) =>{
    const isAuthenticated = Boolean (localStorage.getItem
    ("isAuthenticated"));

    if(isAuthenticated){
        return component;
    }

     return <Navigate to="/login"/>
};

export default ProtectedRoute;