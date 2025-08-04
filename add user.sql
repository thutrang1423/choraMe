DROP TABLE IF EXISTS product_colors;
DROP TABLE IF EXISTS product_sizes; 
DROP TABLE IF EXISTS product_variants;
DROP TABLE IF EXISTS product_reviews;
DROP TABLE IF EXISTS product_detail;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS category; 
DROP TABLE IF EXISTS sizes; 
DROP TABLE IF EXISTS colors;

-- Tạo bảng danh mục sản phẩm
CREATE TABLE category (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);
-- Thêm dữ liệu vào bảng category
INSERT INTO category (id, name, slug) VALUES 
  ('category1', 'Áo thun', 'ao-thun'),
  ('category2', 'Áo sơ mi', 'ao-so-mi'),
  ('category3', 'Quần dài', 'quan-dai'),
  ('category4', 'Quần short', 'quan-short'),
  ('category5', 'Quần đùi', 'quan-dui'),
  ('category6', 'Đầm', 'dam'),
  ('category7', 'Áo khoác', 'ao-khoac'),
  ('category8', 'Bộ phối sẵn', 'sets'),
  ('category9', 'Váy', 'vay');

-- Tạo bảng sản phẩm
-- Bảng chính vẫn giữ nguyên, không cần cột size
-- DROP TABLE IF EXISTS products;-- 

CREATE TABLE products (
  id VARCHAR(20) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  category_id VARCHAR(20),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO products (id, title, created_at, category_id)
VALUES 
  ('1product', 'áo vest nữ category1', '2025-01-22 10:30:00', 'category1'),
  ('2product', 'áo sơ mi nữ category2', '2025-01-22 10:30:00', 'category2'),
  ('3product', 'váy body category3', '2025-01-22 10:30:00', 'category3'),
  ('4product', 'áo vest nữ category4', '2025-01-22 10:30:00', 'category4'),
  ('5product', 'áo sơ mi nữ category5', '2025-02-22 10:30:00', 'category5'),
  ('6product', 'váy body category6', '2025-02-22 10:30:00', 'category6'),
  ('7product', 'áo vest nữ category7', '2025-02-22 10:30:00', 'category7'),
  ('8product', 'áo sơ mi nữ category1', '2025-03-22 10:30:00', 'category1'),
  ('9product', 'váy body category8', '2025-03-22 10:30:00', 'category8'),
  ('10product', 'áo vest nữ category9', '2025-03-22 10:30:00', 'category9');
-- … tiếp tục với các sản phẩm còn lại

DROP TABLE IF EXISTS product_variants;

-- Bảng phụ để lưu các size tương ứng của từng sản phẩm
CREATE TABLE sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(10) UNIQUE NOT NULL
);
INSERT INTO sizes (name)
VALUES ('XXS'),('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL'), ('XXXL'),('XXXXL');

CREATE TABLE colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,          
  slug VARCHAR(50) UNIQUE NOT NULL,   
  hex_code VARCHAR(7) NOT NULL        
);
INSERT INTO colors (name, slug, hex_code)
VALUES
  ('Đỏ mơ', 'do-mo', '#F94144'),
  ('Trắng', 'trang', '#FFFFFF'),
  ('Be', 'be', '#F5F5DC'),
  ('Xám', 'xam', '#A9A9A9'),
  ('Hồng', 'hong', '#FFC0CB'),
  ('Đỏ', 'do', '#FF0000'),
  ('Xanh', 'xanh', '#1E90FF'),
  ('Vàng', 'vang', '#FFD700'),
  ('Nâu', 'nau', '#8B4513'),
  ('Tím', 'tim', '#800080');

CREATE TABLE product_variants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(20),
  size_id INT,
  color_id INT,
  price INT NOT NULL,
  sale_off INT DEFAULT 0,
  sale_price INT GENERATED ALWAYS AS (price - price * sale_off / 100) STORED,
  stock INT DEFAULT 0,
  sku VARCHAR(50),
  image VARCHAR(255),

  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id),
  FOREIGN KEY (color_id) REFERENCES colors(id),

  UNIQUE KEY unique_variant (product_id, size_id, color_id)
);
INSERT INTO product_variants
(product_id, size_id, color_id, price, sale_off, stock, sku)
VALUES
-- 1product: Áo vest nữ
('1product', 3, 6, 750000, 10, 10, '1P-S-DO'),
('1product', 3, 3, 760000, 10, 10, '1P-S-BE'),
('1product', 4, 6, 770000, 10, 10, '1P-S-DO'),
('1product', 5, 6, 780000, 10, 10, '1P-S-DO'),
('1product', 3, 1, 800000, 10, 10, '1P-S-DO-MO'),
('1product', 6, 6, 790000, 10, 10, '1P-S-DO'),
('1product', 4, 2, 810000, 5, 6, '1P-M-TRANG'),
('1product', 5, 2, 820000, 10, 10, '1P-S-TRANG'),
('1product', 6, 2, 830000, 10, 10, '1P-S-TRANG'),
-- 2product: Áo sơ mi nữ
('2product', 5, 3, 500000, 5, 12, '2P-L-BE'),
('2product', 6, 4, 520000, 10, 8, '2P-XL-XAM'),
-- 3product: Váy body
('3product', 4, 5, 2000000, 0, 7, '3P-M-HONG'),
('3product', 5, 6, 2050000, 10, 5, '3P-L-DO'),
-- 4product: Áo vest nữ
('4product', 3, 7, 740000, 5, 10, '4P-S-XANH'),
('4product', 4, 8, 730000, 7, 4, '4P-M-VANG'),
-- 5product: Áo sơ mi nữ
('5product', 5, 9, 510000, 10, 9, '5P-L-NAU'),
('5product', 6, 10, 500000, 0, 3, '5P-XL-TIM'),
-- 6product: Váy body
('6product', 4, 1, 1980000, 1, 5, '6P-M-DO'),
('6product', 5, 2, 2000000, 5, 7, '6P-L-TRANG'),
-- 7product: Áo vest nữ
('7product', 3, 3, 745000, 5, 10, '7P-S-BE'),
('7product', 4, 4, 755000, 15, 6, '7P-M-XAM'),
-- 8product: Áo sơ mi nữ
('8product', 5, 5, 500000, 0, 12, '8P-L-HONG'),
('8product', 6, 6, 490000, 2, 8, '8P-XL-DO'),
-- 9product: Váy body
('9product', 4, 7, 2100000, 10, 10, '9P-M-XANH'),
('9product', 5, 8, 2200000, 15, 3, '9P-L-VANG'),
-- 10product: Áo vest nữ
('10product', 3, 9, 760000, 5, 4, '10P-S-NAU'),
('10product', 4, 10, 770000, 10, 6, '10P-M-TIM');

DROP TABLE IF EXISTS product_detail;

CREATE TABLE product_detail (
  id VARCHAR(20) PRIMARY KEY,
  des TEXT NOT NULL,
  brand VARCHAR(50),
  material VARCHAR(50),
  origin VARCHAR(50),
  gender ENUM('nam', 'nữ', 'unisex') NOT NULL,
  season ENUM('xuân', 'hạ', 'thu', 'đông') NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO product_detail 
(id, des, brand, material, origin, gender, season, is_featured)
VALUES
('1product', 'Áo vest nữ cao cấp, sang trọng, dễ phối đồ.', 'Chorame', 'Cotton', 'Việt Nam', 'nữ', 'thu', TRUE),
('2product', 'Áo sơ mi nữ basic, thoáng mát, form rộng.', 'Chorame', 'Linen', 'Hàn Quốc', 'nữ', 'hạ', FALSE),
('3product', 'Váy body ôm sát, tôn dáng, quyến rũ.', 'Chorame', 'Polyester', 'Việt Nam', 'nữ', 'hạ', TRUE),
('4product', 'Áo vest nữ thời trang công sở.', 'Chorame', 'Len', 'Trung Quốc', 'nữ', 'đông', FALSE),
('5product', 'Áo sơ mi nữ cổ trụ thanh lịch.', 'Chorame', 'Cotton', 'Việt Nam', 'nữ', 'xuân', FALSE);

CREATE TABLE product_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(20),
  -- user_id VARCHAR(20),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
  -- , FOREIGN KEY (user_id) REFERENCES users(id) -- nếu có bảng users
);
INSERT INTO product_reviews (product_id, rating, comment)
VALUES
('1product', 5, 'Áo rất đẹp, chất vải mát.'),
('1product', 4, 'Hài lòng nhưng giao hơi chậm.'),
('2product', 3, 'Áo ổn nhưng form hơi rộng.'),
('2product', 5, 'Rất vừa ý, mặc đi làm rất hợp.');

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(50),
  -- avatar VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
               ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password, full_name, role)
VALUES 
-- 10 khách hàng (user)
('user01', 'user01@example.com', '$2a$10$abc123456789', 'Nguyễn Văn A', 'user'),

-- 3 nhân viên (admin)
('staff01', 'staff01@shop.com', '$2a$10$abc123456789', 'Lê Nhân Viên 1', 'admin'),

-- 1 chủ cửa hàng (admin)
('admin01', 'admin@shop.com', '$2a$10$abc123456789', 'Chủ Cửa Hàng', 'admin');



DROP TABLE IF EXISTS cart_products;
CREATE TABLE cart_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id VARCHAR(20),
  color_id INT,
  size_id INT,
  quantity INT NOT NULL DEFAULT 1,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (color_id) REFERENCES colors(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id),

  UNIQUE KEY unique_cart_item (user_id, product_id, color_id, size_id)
);
