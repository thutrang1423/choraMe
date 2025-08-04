import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { PersonalColorPage } from "./pages/PersonalColorPage";
import { CategoryProduct } from "./pages/CategoryProduct";
import { CartPage } from "./pages/CartPage";
import  ProductDetail from "./pages/ProductDetail";
import Login  from "./pages/Login";
import Register from "./pages/Register";
import CustomerInfomation from "./pages/UserInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/personalColor" element={<PersonalColorPage />} />
      <Route path="/products" element={<CategoryProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products" element={<CategoryProduct />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/customer/info" element={<CustomerInfomation />} />
    </Routes>
  );
}

export default App;
