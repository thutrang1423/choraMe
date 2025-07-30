import express from 'express';
import {
  getProducts,
  getProduct,
  getCategoryProducts,
  getProductsSaleOffTop,
  getProductsNewArrivals,
} from '../app/controller/product.controller';

const router = express.Router();

router.get('/new-arrivals', getProductsNewArrivals);
router.get('/sale-off-top', getProductsSaleOffTop);
router.get('/category/:slug', getCategoryProducts);

router.get('/:id', getProduct); 
router.get('/', getProducts);

export default router;
