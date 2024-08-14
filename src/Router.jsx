import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./Page/Frontpage.jsx";
import RegisterPage from "./Page/Register/RegisterPage.jsx";
import Login from "./Page/login/LoginPage.jsx";
import Home from "./Page/Home/HomePage.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx";
import CustomerHomePage from "./Page/customer/CustomerHomePage.jsx";
import ProductPage from "./Page/Products/ProductPage.jsx";
import UserPage from "./Page/Users/UserPage.jsx";
import AdminPage from "./Page/Admin/Adminpage.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/customer" element={< CustomerHomePage/>} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/home" element={<ProtectedRoute  component={<Home/>}/> }  />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
