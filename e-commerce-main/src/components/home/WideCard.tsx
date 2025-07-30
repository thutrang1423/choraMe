import { Card, Typography } from "@mui/material";
import RoundedButton from "../common/RoundedButton";
import { useNavigate } from 'react-router-dom';

type WideCardProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  backgroundColor?: string;
  navigateTo?: string;
};

export default function WideCard({
  title,
  description,
  buttonLabel = "Khám phá ngay",
  onButtonClick,
  backgroundColor = "#e7aea1",
  navigateTo,
}: WideCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onButtonClick) onButtonClick();
    else if (navigateTo) navigate(navigateTo);
  };

  return (
    <Card className="rounded-none shadow-none mx-auto max-w-screen-md mt-4" sx={{ backgroundColor }}>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-8 gap-4">
        <div className="text-center md:text-left">
          <Typography variant="h5" className="text-white font-semibold mb-2">
            {title}
          </Typography>
          <Typography variant="body1" className="text-white">
            {description}
          </Typography>
        </div>

        <RoundedButton
          onClick={handleClick}
          iconPosition="left"
          backgroundColor="#ffffff"
          hoverBackgroundColor="#cd6035"
          color="#cd6035"
          hoverColor="#f0f34b"
        >
          {buttonLabel}
        </RoundedButton>
      </div>
    </Card>
  );
}
