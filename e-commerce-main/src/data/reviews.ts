import { Review } from '../types/review.type';

export const allReviews: Review[] = [
  { id: 1, name: 'Linh1', comment: 'Sản phẩm tuyệt vời, rất hài lòng!', rating: 5 },
  { id: 2, name: 'Huy2', comment: 'Giao hàng nhanh, sẽ mua lại.', rating: 5 },
  { id: 3, name: 'Trang3', comment: 'Chất lượng ok, đúng mô tả.', rating: 5 },
  { id: 4, name: 'Nam4', comment: 'Đẹp nhưng hơi đắt.', rating: 4 },
  { id: 5, name: 'Minh5', comment: 'Cực kỳ hài lòng với trải nghiệm mua sắm.', rating: 5 },
  { id: 6, name: 'An6', comment: 'Không đúng kỳ vọng.', rating: 3 },
  { id: 7, name: 'Tú7', comment: 'Đáng giá 5 sao!', rating: 5 },
];

export const reviews = allReviews.filter((r) => r.rating === 5);