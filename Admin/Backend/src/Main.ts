import App from "./App";
import AdminController from "./controllers/adminController";
import ProductController from "./controllers/productController";
import PurchaseController from "./controllers/purchaseController";

import dotenv from "dotenv";
dotenv.config();

const app = new App(
  [new AdminController(), new ProductController(), new PurchaseController()],
  Number(process.env.PORT) || 3000
);

app.listen();

app.app.use((_req, res, _next) => {
  res.status(404).send("Not Found");
  _next();
});
