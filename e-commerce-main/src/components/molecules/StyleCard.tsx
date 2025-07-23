import { Box, Typography } from '@mui/material';
import { Style } from '../../types/style.type';

interface StylesCardProps {
  style: Style;
  className?: string;
  onClick?: () => void; 
}

const StyleCard: React.FC<StylesCardProps> = ({ style, className, onClick }) => {
  return (
    <Box
      onClick={onClick} 
      className={`${className} h-48 rounded-lg overflow-hidden relative cursor-pointer`}
      sx={{
        backgroundImage: `url(${style.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: 600,
            textTransform: 'uppercase',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
          }}
        >
          {style.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default StyleCard;
