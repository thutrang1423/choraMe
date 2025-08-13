import { Box, IconButton, Tooltip, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2"; // product
import GroupIcon from "@mui/icons-material/Group"; // staff
import BarChartIcon from "@mui/icons-material/BarChart"; // revenue
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authen/AuthContext";
import { useCart } from "../../context/cart/CartContext";

const NavbarActions: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { cartQuantity, fetchCartItems } = useCart();

  // Khi user đăng nhập → fetch giỏ hàng
  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser, fetchCartItems]);

  const handleAccountClick = () => {
    navigate(currentUser ? "/user/info" : "/login");
  };

  const handleCartClick = () => {
    navigate(currentUser ? "/cart" : "/login");
  };

  const handleProductManageClick = () => {
    navigate("/product/manage");
  };

  const handleStaffManageClick = () => {
    navigate("/staff-admin/manage");
  };

  const handleRevenueClick = () => {
    navigate("/revenue/manage");
  };

  return (
    <Box display="flex" alignItems="center" className="gap-2">

      {/* Giỏ hàng */}
      <Tooltip title="Giỏ hàng">
        <IconButton onClick={handleCartClick}>
          <Badge badgeContent={cartQuantity} color="error">
            <ShoppingCartIcon className="text-gray-700" />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Product manage - staff và chủ */}
      {/* {(currentUser?.role === "staff" || currentUser?.role === "owner") && ( */}
        <Tooltip title="Quản lý sản phẩm">
          <IconButton onClick={handleProductManageClick}>
            <Inventory2Icon className="text-gray-700" />
          </IconButton>
        </Tooltip>
      {/* )} */}

      {/* Revenue manage - staff và chủ */}
      {/* {(currentUser?.role === "staff" || currentUser?.role === "owner") && ( */}
        <Tooltip title="Doanh thu">
          <IconButton onClick={handleRevenueClick}>
            <BarChartIcon className="text-gray-700" />
          </IconButton>
        </Tooltip>
      {/* )} */}

      {/* Staff manage - chỉ chủ */}
      {/* {currentUser?.role === "owner" && ( */}
        <Tooltip title="Quản lý nhân viên">
          <IconButton onClick={handleStaffManageClick}>
            <GroupIcon className="text-gray-700" />
          </IconButton>
        </Tooltip>
      {/* )} */}

      {/* Account */}
      <Tooltip title="Tài khoản">
        <IconButton onClick={handleAccountClick}>
          <AccountCircleIcon className="text-gray-700" />
        </IconButton>
      </Tooltip>

    </Box>
  );
};

export default NavbarActions;
