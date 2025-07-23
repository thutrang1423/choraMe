import { InputBase } from '@mui/material';

const SearchInput: React.FC = () => {
  return (
    <InputBase
      placeholder="Tìm kiếm..."
      sx={{ ml: 1, flex: 1 }}
      inputProps={{ 'aria-label': 'search' }}
    />
  );
};

export default SearchInput;