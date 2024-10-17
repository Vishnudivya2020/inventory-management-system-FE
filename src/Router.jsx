import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./Page/Frontpage.jsx";
import RegisterPage from "./Page/Register/RegisterPage.jsx";
import Login from "./Page/login/LoginPage.jsx";
import Home from "./Page/Home/HomePage.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx";
import CustomerHomePage from "./Page/customer/CustomerHomePage.jsx";
import ProductPage from "./Page/Products/ProductPage.jsx";
import UserPage from "./Page/Users/UserPage.jsx";
// import AdminPage from "./Page/Admin/Adminpage.jsx";
import OrderPage from "./Page/Orders/OrderPage.jsx";
import ForgotPassword from "./component/ForgotPassword.jsx";
import ResetPassword from "./component/ResetPassword.jsx";
import SuccessPage from "./component/SuccessPage.jsx";
import InventoryChart from "./component/InventoryChart.jsx";
import VerifyAccount from "./Page/verify-accound/verifyAccount.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Customer" element={< CustomerHomePage/>} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/inventory" element={<InventoryChart />} />
        <Route path="/forgot-password"  element={<ForgotPassword/>}/>
        <Route path="/reset-password/:resetPasswordToken"  element={<ResetPassword/>}/>
        <Route path="/password-reset-success" element={<SuccessPage />} />
        <Route path="/verify-account" element={<VerifyAccount/>} />
        <Route path="/home" element={<ProtectedRoute  component={<Home/>}/> }  />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
