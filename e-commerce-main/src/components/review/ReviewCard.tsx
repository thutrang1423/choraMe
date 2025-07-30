import { Card, CardContent, Rating, Typography } from '@mui/material';
import { Review } from '../../types/review.type';

type Props = {
  review: Review;
  state: 'center' | 'side' | 'hidden';
  index: number;
};

export default function ReviewCard({ review, state, index }: Props) {
  return (
    <div
      key={`${review.id}-${index}`}
      className={`w-[250px] h-[220px] flex-shrink-0 transform transition-all duration-300 
        ${state === 'center' ? 'scale-105 opacity-100 shadow-xl z-10' : ''}
        ${state === 'side' ? 'scale-100 opacity-60 shadow-md z-0' : ''}
        ${state === 'hidden' ? 'scale-100 opacity-0 pointer-events-none z-0' : ''}`}
    >
      <Card className="w-full h-full">
        <CardContent className="flex flex-col justify-between h-full">
          <div>
            <Rating value={review.rating} readOnly />
            <Typography variant="subtitle1" fontWeight="bold">
              {review.name}
            </Typography>
          </div>
          <Typography variant="body2" className="mt-2 text-sm text-gray-600">
            {review.comment}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}