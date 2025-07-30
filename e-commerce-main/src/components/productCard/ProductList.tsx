import React from 'react';
import ProductSection from './ProductSection';

const ProductList: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <ProductSection title="Hàng mới về" endpoint="/products/new-arrivals" />
      <ProductSection title="Siêu giảm giá" endpoint="/products/sale-off-top" />
    </div>
  );
};

export default ProductList;