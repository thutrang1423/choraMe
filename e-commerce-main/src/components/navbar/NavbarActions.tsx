import { Box, IconButton, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "../../context/authen/AuthContext";

const NavbarActions: React.FC = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);

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

  return (
    <Box display="flex" alignItems="center" className="gap-2">
      <Tooltip title="Giỏ hàng">
        <IconButton onClick={handleCartClick}>
          <ShoppingCartIcon className="text-gray-700" />
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
