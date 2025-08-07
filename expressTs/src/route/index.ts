import { Application, Request, Response } from "express";
import productsRouter from "./route.product";
import { getCategories } from "../app/controller/category.controller";
import meRouter from "./route.me";
import authRouter from "./route.auth";
import cartRouter from "./route.cart";

export function route(app: Application) {
  app.use("/products", productsRouter);
  app.use("/categories", getCategories);
  app.use("/auth", authRouter);
  app.use("/me", meRouter);
  app.use("/cart", cartRouter);
}
