import { Box, IconButton, Tooltip, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authen/AuthContext";
import { CartContext } from "../../context/cart/CartContext"; // ✅ Thêm dòng này

const NavbarActions: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext); // ✅ Lấy cartItems từ context

  const handleAccountClick = () => {
    if (currentUser) {
      navigate("/customer/info");
    } else {
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    if (currentUser) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  // ✅ Tính tổng số lượng sản phẩm trong giỏ
  const totalQuantity = cartItems?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Box display="flex" alignItems="center" className="gap-2">
      <Tooltip title="Giỏ hàng">
        <IconButton onClick={handleCartClick}>
          <Badge badgeContent={totalQuantity} color="error">
            <ShoppingCartIcon className="text-gray-700" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Tài khoản">
        <IconButton onClick={handleAccountClick}>
          <AccountCircleIcon className="text-gray-700" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default NavbarActions;
