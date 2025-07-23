import { Typography } from '@mui/material';

interface NoRecordViewProps {
  text?: string;
}

const DEFAULT_TEXT = 'Không có dữ liệu';

const NoRecordView: React.FC<NoRecordViewProps> = ({ text = DEFAULT_TEXT }) => {
  return (
    <div className='!p-6 m-4 flex items-center justify-center rounded-lg bg-text-disabled/5'>
      <Typography component='span' variant='body1' color='text.disabled' className='!h-full'>
        {text}
      </Typography>
    </div>
  );
};

export default NoRecordView;
