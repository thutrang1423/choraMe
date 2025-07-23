import ReviewCard from '../atoms/ReviewCard';
import { Review } from '../../types/review.type';
import { RefObject } from 'react';

type Props = {
  items: Review[];
  wrapperRef?: RefObject<HTMLDivElement>;
  transition: boolean;
  position: number;
};

export default function CarouselTrack({ items, wrapperRef, transition, position }: Props) {
  return (
    <div
      ref={wrapperRef}
      className="flex gap-4"
      style={{
        transform: `translateX(${position}px)`,
        transition: transition ? 'transform 0.3s ease-in-out' : 'none',
        width: `${items.length * 260}px`,
      }}
    >
      {items.map((review, i) => (
        <ReviewCard
          key={review.id + '-' + i}
          review={review}
          index={i}
          state={i === 2 ? 'center' : i === 1 || i === 3 ? 'side' : 'hidden'}
        />
      ))}
    </div>
  );
}