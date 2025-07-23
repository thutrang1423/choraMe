import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { PersonalColorPage } from "./components/pages/PersonalColorPage";
import { CategoryProduct } from "./components/pages/CategoryProduct";
import { CartPage } from "./components/pages/CartPage";
import  ProductDetail from "./components/pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/personalColor" element={<PersonalColorPage />} />
      <Route path="/products" element={<CategoryProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products" element={<CategoryProduct />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
