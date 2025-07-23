import { Box, Typography } from '@mui/material';
import { Slide } from '../../types/slide.type';

interface SlideItemProps {
  slide: Slide;
  totalSlides: number;
}

const SlideItem: React.FC<SlideItemProps> = ({ slide, totalSlides }) => {
  return (
    <Box
      sx={{
        width: `${100 / totalSlides}%`,
        height: '35rem',
        backgroundImage: `url(${slide.backgroundImageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <Typography variant="h4" color="white">
        {slide.content}
      </Typography>
    </Box>
  );
};

export default SlideItem;