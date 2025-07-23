import RoundedButton from '../atoms/RoundedButton';
import AddIcon from '@mui/icons-material/Add';

export default function ButtonCreate() {
  return (
    <div style={{ display: 'flex', gap: '16px', padding: '24px' }}>
      {/* Button có icon + text */}
      <RoundedButton
        icon={<AddIcon />}
        onClick={() => alert('Thêm')}
        backgroundColor="#4caf50"
        hoverBackgroundColor="#388e3c"
      >
        Thêm mới
      </RoundedButton>

      {/* Button không có icon */}
      <RoundedButton
        onClick={() => alert('Không icon')}
        backgroundColor="#f44336"
        hoverBackgroundColor="#d32f2f"
      >
        Không icon
      </RoundedButton>

      {/* Button chỉ có icon */}
      <RoundedButton
        icon={<AddIcon />}
        onClick={() => alert('Chỉ icon')}
        backgroundColor="#2196f3"
        hoverBackgroundColor="#1976d2"
        border
      >
        {/* Để text rỗng hoặc dấu cách nếu muốn chỉ hiển thị icon */}
        &nbsp;
      </RoundedButton>
    </div>
  );
}
