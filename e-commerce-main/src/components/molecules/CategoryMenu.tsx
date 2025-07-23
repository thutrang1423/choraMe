import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Category = {
  id: string;
  name: string;
  slug: string;
};

const CategoryMenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories"); // ✅ hoặc /products/categories nếu backend dùng vậy
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setError("Kết quả trả về không hợp lệ.");
          console.error("Kết quả không phải mảng:", data);
        }
      } catch (error) {
        setError("Lỗi khi lấy danh mục.");
        console.error("Lỗi khi lấy danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (slug: string) => {
    navigate(`/products?category=${slug}`); // ✅ Đúng chuẩn
  };

  if (loading) {
    return (
      <Box className="flex justify-center py-4">
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center py-4">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className="w-full overflow-x-auto bg-white border-b">
      <Box
        className="flex gap-4 px-4 py-2 whitespace-nowrap"
        sx={{ minWidth: "max-content" }}
      >
        {categories.map((cat) => (
          <Button
            key={cat.slug}
            onClick={() => handleClick(cat.slug)}
            variant="text"
            sx={{
              color: "#3b3b3b",
              fontWeight: 500,
              whiteSpace: "nowrap",
              "&:hover": { color: "#3b696d" },
            }}
          >
            {cat.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryMenu;
