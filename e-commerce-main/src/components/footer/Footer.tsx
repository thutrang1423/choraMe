import { Typography } from '@mui/material';
import QuickLinks from '../footer/QuickLinks';
import ContactInfo from '../footer/ContactInfo';
import SocialFollow from '../footer/SocialFollow';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Typography variant="h6" className="text-lg font-semibold mb-2">
            ChromaMe
          </Typography>
          <p className="text-sm text-gray-400">
            Khám phá phong cách thời trang phù hợp với chính bạn cùng dịch vụ Phân tích Personal Color độc quyền ngay trên website.
          </p>
        </div>
        <QuickLinks />
        <ContactInfo />
        <SocialFollow />
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © 2025 ChromaMe Fashion. All rights reserved.
      </div>
    </footer>
  );
}
