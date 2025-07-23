import Breadcrumb from '../atoms/Breadcrumb';
import Navbar from '../organisms/Navbar';

export const PersonalColorPage = () => {
  return (
    <>
    <Navbar/>
      <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Personal Color', href: '/personalColor' },
          ]}
        />
    </>
  )
}
