import { Facebook, Instagram, YouTube} from '@mui/icons-material';
import SocialIcon from '../atoms/SocialIcon';

export default function SocialIconGroup() {
  return (
    <div className="flex gap-3 mt-2">
      <SocialIcon icon={<Instagram />} href="https://instagram.com" size={30} color="#E1306C" />
      <SocialIcon icon={<Facebook />} href="https://facebook.com" size={30} color="#1877F2" />
      <SocialIcon icon={<YouTube />} href="https://youtube.com" size={30} color="#FF0000" />
    </div>
  );
}
