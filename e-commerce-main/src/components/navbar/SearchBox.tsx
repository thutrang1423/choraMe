import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from './SearchInput';

const SearchBox: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '4px 12px',
        borderRadius: 2,
        width: '40%',
      }}
    >
      <SearchIcon color="action" />
      <SearchInput />
    </Box>
  );
};

export default SearchBox;