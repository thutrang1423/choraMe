import { Breadcrumbs, Typography, Link, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items?: Crumb[];
  separator?: React.ReactNode;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [{ label: 'Home', href: '/' }],
  separator = <NavigateNextIcon fontSize="small" />,
}) => {
  const navigate = useNavigate(); 
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href?: string
  ) => {
    event.preventDefault();
    if (href) navigate(href); // ← dùng navigate thay vì <a>
  };

  return (
    <Stack spacing={2} className="px-4 py-2 bg-white rounded shadow-sm">
      <Breadcrumbs separator={separator} aria-label="breadcrumb">
        {items.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="hover:text-blue-500 transition-colors cursor-pointer"
            >
              {item.label}
            </Link>
          ) : (
            <Typography
              key={index}
              color="text.primary"
              className="font-medium text-gray-800"
            >
              {item.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Stack>
  );
};

export default Breadcrumb;
