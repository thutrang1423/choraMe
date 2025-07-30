import Breadcrumb from '../components/common/Breadcrumb';

export const PersonalColorPage = () => {
  return (
    <>
      <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Personal Color', href: '/personalColor' },
          ]}
        />
    </>
  )
}
