import { Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavbarActions: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
      <IconButton>
        <AccountCircleIcon />
      </IconButton>
    </Box>
  );
};
export default NavbarActions;