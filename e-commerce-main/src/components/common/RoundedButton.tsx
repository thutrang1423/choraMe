import { Button, SxProps, Theme } from '@mui/material';

type RoundedButtonProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom' | 'only';
  onClick?: () => void;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  color?: string;
  hoverColor?: string;
  border?: boolean;
  borderRadius?: boolean;
  sx?: SxProps<Theme>;
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
  children,
  icon,
  iconPosition = 'left',
  onClick,
  backgroundColor = '#1976d2',
  hoverBackgroundColor = '#1565c0',
  color = '#fff',
  hoverColor = '#fff',
  border = false,
  borderRadius = true,
  sx = {},
}) => {
  const isVertical = iconPosition === 'top' || iconPosition === 'bottom';
  const isOnlyIcon = iconPosition === 'only';

  const content = (() => {
    if (isOnlyIcon) return icon;

    switch (iconPosition) {
      case 'top':
        return (
          <>
            {icon && <span style={{ marginBottom: 4 }}>{icon}</span>}
            {children}
          </>
        );
      case 'bottom':
        return (
          <>
            {children}
            {icon && <span style={{ marginTop: 4 }}>{icon}</span>}
          </>
        );
      case 'right':
        return (
          <>
            {children}
            {icon && <span style={{ marginLeft: 8 }}>{icon}</span>}
          </>
        );
      case 'left':
      default:
        return (
          <>
            {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
            {children}
          </>
        );
    }
  })();

  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: borderRadius ? '50px' : '50%',
        backgroundColor,
        color,
        border: border ? '1px solid #ccc' : 'none',
        padding: isOnlyIcon ? '12px' : '12px 20px',
        minWidth: isOnlyIcon ? '48px' : undefined,
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: isVertical ? (iconPosition === 'top' ? 'column' : 'column-reverse') : 'row',
        '&:hover': {
          backgroundColor: hoverBackgroundColor,
          color: hoverColor,
        },
        ...sx,
      }}
    >
      {content}
    </Button>
  );
};

export default RoundedButton;
