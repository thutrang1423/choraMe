import Breadcrumb from '../components/common/Breadcrumb';

export default function CustomerInfomation() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "customer infomation", href: "/customer/info" },
        ]}
      />
    </>
  );
}
