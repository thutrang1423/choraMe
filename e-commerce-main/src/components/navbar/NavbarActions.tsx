import { Box, IconButton, Tooltip, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
    navigate(currentUser ? "/customer/info" : "/login");
  };

  const handleCartClick = () => {
    navigate(currentUser ? "/cart" : "/login");
  };

  return (
    <Box display="flex" alignItems="center" className="gap-2">
      <Tooltip title="Giỏ hàng">
        <IconButton onClick={handleCartClick}>
          <Badge badgeContent={cartQuantity} color="error">
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
