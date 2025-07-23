import React from 'react'
import Navbar from '../organisms/Navbar';
import Breadcrumb from '../atoms/Breadcrumb';

export const CartPage = () => {
  return (
    <>
        <Navbar/>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Giỏ hàng', href: '/cart' },
            { label: 'id', href: '/:id' },
          ]}
        />
    </>
  )
}
