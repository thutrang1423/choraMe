import { SvgIconProps } from '@mui/material';
import React from 'react';

type SocialIconProps = {
  icon: React.ReactElement<SvgIconProps>;
  href: string;
  size?: number;
  color?: string;
};

export default function SocialIcon({ icon, href, size = 24, color = '#fff' }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      {React.cloneElement(icon, {
        fontSize: 'inherit',
        sx: { fontSize: size, color: color },
      })}
    </a>
  );
}
