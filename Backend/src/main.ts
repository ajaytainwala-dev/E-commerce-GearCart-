import App from './App';
import authController from "./controllers/authController";
import TestController from "./controllers/testController";
import dotenv from 'dotenv';
dotenv.config();

const app = new App([new authController(),new TestController()], Number(process.env.PORT) || 3000);

app.listen();

app.app.use((_req, res, _next) => {
  res.status(404).send("Not Found");
  _next();
});