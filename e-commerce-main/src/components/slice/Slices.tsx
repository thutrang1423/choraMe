import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import { Slide } from '../../types/slide.type';
import { baseSlides } from '../../data/slideData';
import SlideItem from './SlideItem';

const Slices: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const transitionRef = useRef<NodeJS.Timeout | null>(null);

  const slides: Slide[] = [...baseSlides, baseSlides[0]]; // clone slide đầu để tạo loop

  const handleTransitionEnd = () => {
    if (current === slides.length - 1) {
      setIsTransitioning(false);
      setCurrent(0);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  useEffect(() => {
    transitionRef.current = setInterval(() => {
      setCurrent((prev) => {
        // Nếu đang ở cuối rồi thì chờ reset
        if (prev >= slides.length - 1) return prev;
        return prev + 1;
      });
    }, 4000);

    return () => {
      if (transitionRef.current) clearInterval(transitionRef.current);
    };
  }, [slides.length]);

  // 💥 Thêm kiểm tra phòng ngừa nếu `current > slides.length - 1`
  useEffect(() => {
    if (current > slides.length - 1) {
      setCurrent(0);
    }
  }, [current, slides.length]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '35rem',
        overflow: 'hidden',
        backgroundColor: '#fff' // tránh trắng xóa
      }}
    >
      <Box
        onTransitionEnd={handleTransitionEnd}
        sx={{
          display: 'flex',
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          transition: isTransitioning ? 'transform 1s ease-in-out' : 'none',
        }}
      >
        {slides.map((slide, index) => (
          <SlideItem
            key={`${slide.id}-${index}`}
            slide={slide}
            totalSlides={slides.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slices;
