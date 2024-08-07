import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./Page/Frontpage.jsx";
import Register from "./Page/RegisterPage.jsx";
import Login from "./Page/LoginPage.jsx";
import Home from "./Page/HomePage.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
