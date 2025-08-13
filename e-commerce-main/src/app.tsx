import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { PersonalColorPage } from "./pages/PersonalColorPage";
import { CategoryProduct } from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserInfo from "./pages/UserInfo";
import StaffAdminManage from "./pages/StaffAdminManage";
import ProductManage from "./pages/ProductManage";
import RevenueManage from "./pages/RevenueManage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/personalColor" element={<PersonalColorPage />} />
      <Route path="/products" element={<CategoryProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Đã login mới xem được */}
      <Route
        path="/user/info"
        element={
          <ProtectedRoute allowedRoles={["customer", "staff", "owner"]}>
            <UserInfo />
          </ProtectedRoute>
        }
      />

      {/* Chỉ owner */}
      <Route
        path="/staff-admin/manage"
        element={
          // <ProtectedRoute allowedRoles={["owner"]}>
            <StaffAdminManage />
          // </ProtectedRoute>
        }
      />

      {/* Staff + Owner */}
      <Route
        path="/product/manage"
        element={
          // <ProtectedRoute allowedRoles={["staff", "owner"]}>
            <ProductManage />
          // </ProtectedRoute>
        }
      />

      {/* Staff + Owner */}
      <Route
        path="/revenue/manage"
        element={
          // <ProtectedRoute allowedRoles={["staff", "owner"]}>
            <RevenueManage />
          // </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
