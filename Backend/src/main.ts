import App from "./App";
import authController from "./controllers/authController";
import productController from "./controllers/productController";
import TestController from "./controllers/testController";
import PurchaseController from "./controllers/puchaseController";
import AdminController from "./controllers/adminController";
import BrandController from "./controllers/brandController";
import CategoryController from "./controllers/categoryController";
import dotenv from "dotenv";
dotenv.config();

const app = new App(
  [
    new authController(),
    new TestController(),
    new productController(),
    new PurchaseController(),
    new AdminController(),
    new BrandController(),
    new CategoryController()
  ],
  Number(process.env.PORT) || 3000
);

app.listen();


app.app.use((_req, res, _next) => {
  res.status(404).send("Not Found");
  _next();
});
