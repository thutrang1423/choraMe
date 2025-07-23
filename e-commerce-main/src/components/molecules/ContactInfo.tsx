import { Typography } from '@mui/material';

export default function ContactInfo() {
  return (
    <div>
      <Typography variant="subtitle1" className="font-medium mb-2">Liên hệ</Typography>
      <p className="text-sm text-gray-400">Email: contact@ChromaMe.vn</p>
      <p className="text-sm text-gray-400">Điện thoại: 0909 999 999</p>
      <p className="text-sm text-gray-400">Địa chỉ: 123 Trần Quang Diệu, Quận 3, TP.HCM</p>
    </div>
  );
}
