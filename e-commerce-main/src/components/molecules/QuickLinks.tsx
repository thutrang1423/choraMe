import { Typography } from '@mui/material';

export default function QuickLinks() {
  return (
    <div>
      <Typography variant="subtitle1" className="font-medium mb-2">Liên kết</Typography>
      <ul className="text-sm space-y-1 text-gray-400">
        <li><a href="/about" className="hover:text-white">Giới thiệu</a></li>
        <li><a href="/policy" className="hover:text-white">Chính sách đổi trả</a></li>
        <li><a href="/faq" className="hover:text-white">Câu hỏi thường gặp</a></li>
      </ul>
    </div>
  );
}
