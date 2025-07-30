// routes/index.ts
import { Application, Request, Response } from 'express';
import productsRouter from './route.product';
import {getCategories} from '../app/controller/category.controller';
import authRouter from './route.auth'

export function route(app: Application){
    app.use('/products', productsRouter)
    app.use('/categories', getCategories);
    app.use('/auth', authRouter);
}