import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./Page/Frontpage.jsx";
import RegisterPage from "./Page/Register/RegisterPage.jsx";
import Login from "./Page/LoginPage.jsx";
import Home from "./Page/Products/HomePage.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
