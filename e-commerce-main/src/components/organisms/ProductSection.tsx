import React, { useEffect, useState } from 'react';
import { Card, Typography, CircularProgress, Box } from '@mui/material';
import ProductCard from '../molecules/ProductCard';
import RoundedButton from '../atoms/RoundedButton';
import { ProductCard as ProductType } from '../../types/product.type';

type ProductSectionProps = {
  title: string;
  endpoint: string;
};

const ProductSection: React.FC<ProductSectionProps> = ({ title, endpoint }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3000${endpoint}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Dữ liệu không phải mảng:', data);
        }
      } catch (error) {
        console.error('Lỗi khi fetch sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoint]);

  const visibleProducts = showAll ? products : products.slice(0, 4);

  if (loading) {
    return (
      <Box className="w-full py-8 flex justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Card className="col-span-12 w-full p-4">
        <Typography variant="h3" align="center" color="#4f5151">
          {title}
        </Typography>
      </Card>

      {visibleProducts.length === 0 ? (
        <Typography align="center" className="w-full text-gray-500 py-8">
          Không có sản phẩm để hiển thị.
        </Typography>
      ) : (
        visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}

      {products.length > 4 && (
        <Card
          className="col-span-12 w-full p-4"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <RoundedButton
            onClick={() => setShowAll((prev) => !prev)}
            backgroundColor="#f7f0e5"
            color="#4f5151"
            hoverBackgroundColor="#eccea0"
            hoverColor="#4f5151"
          >
            {showAll ? 'Ẩn bớt' : 'Xem tất cả'}
          </RoundedButton>
        </Card>
      )}
    </>
  );
};

export default ProductSection;
