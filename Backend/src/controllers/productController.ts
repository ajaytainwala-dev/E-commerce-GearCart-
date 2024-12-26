import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import ExpressError from "../utils/ExpressError";
import { Product } from "../models/Product";

class ProductController {
  public path: string = "/product";
  public router = Router();
  constructor() {
       this.initializeRoutes();
  }
  private initializeRoutes(){
    this.router.get("/products", this.getProducts);
  }
    private getProducts = async (req: Request, res: Response) => {
        try {
        // Your logic here
        res.send("Products route");
        } catch (error) {
        throw new ExpressError("Internal server error", 500);
        }
    };
    private uploadProduct = async (req: Request, res: Response) => {
        try {
        // Your logic here
        res.send("Product uploaded successfully");
        } catch (error) {
        throw new ExpressError("Internal server error", 500);
        }
    }
}



export default ProductController;