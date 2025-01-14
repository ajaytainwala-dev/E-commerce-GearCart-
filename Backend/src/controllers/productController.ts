/**
 * This code is written by Ajay Tainwala.
 * ProductController class handles all product-related operations.
 *
 * This class includes methods for retrieving all products, uploading images,
 * removing products, creating new products, and retrieving products by brand.
 *
 * @class ProductController
 * @file /D:/Projects/E-Commerce/Backend/src/controllers/productController.ts
 */

import { Router, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { Product } from "../models/Product";
// import type { IPart } from "../models/Product";
import multer from "multer";
import path from "path";
import AdminMiddleware from "../middlewares/adminMiddleware";
import AuthMiddleware from "../middlewares/middleware";

class ProductController {
  public path: string = "/product";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private upload = multer({
    storage: multer.diskStorage({
      destination: (
        _req: any,
        _file: any,
        cb: (arg0: null, arg1: string) => void
      ) => {
        cb(null, "uploads/images");
      },
      filename: (_req: any, file, cb: (arg0: null, arg1: string) => void) => {
        cb(
          null,
          `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
      },
    }),
    fileFilter: (
      _req: any,
      file: { mimetype: string },
      cb: multer.FileFilterCallback
    ) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

  private initializeRoutes() {
    this.router.get("/product/:id", AuthMiddleware, this.getParticularProduct);
    this.router.get("/allproducts", AuthMiddleware,this.allGetProducts);
    this.router.post("/upload", this.upload.single("image"), this.uploadImage);
    this.router.delete("/remove/:id", AdminMiddleware, this.removeProduct);
    this.router.post("/addproduct", this.createProduct);
    this.router.get("/brand/:brand", this.getProductsByBrand);
    this.router.get("/category",AuthMiddleware,this.getCategories);
    
    this.router.get("/category/:category",AuthMiddleware, this.getProductsByCategory);
    this.router.get("/search", this.searchProduct);
    this.router.get("/partnumber/:partNumber", this.getProductsByPartNumber);
    this.router.put("/update/:id", this.updateProduct);
  }

  private getParticularProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, product: product });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      
    }
  }

  private getCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await Product.distinct("category");
      if (!categories || categories.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No categories found" });
      }
      res.status(200).json({ success: true, categories: categories });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      
    }
  }

  //   Get all product
  /**
   * Handles the request to get all products.
   *
   * @param _req - The request object (not used in this handler).
   * @param res - The response object used to send back the HTTP response.
   *
   * @returns A JSON response with the list of products and a success status.
   *
   * @throws Will return a 500 status code with an error message if an error occurs while fetching the products.
   */
  private allGetProducts = async (_req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, products: products });
      res.send("Products route");
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  /**
   * Handles the image upload process.
   *
   * This method is an asynchronous function that processes the image upload request.
   * It responds with a JSON object containing the success status and the URL of the uploaded image.
   *
   * @param req - The request object, containing the file to be uploaded.
   * @param res - The response object, used to send back the JSON response.
   *
   * @returns A JSON response with the success status and the image URL if the upload is successful.
   *
   * @throws Will respond with a 500 status code and an error message if an internal server error occurs.
   */
  private uploadImage = async (req: Request, res: Response) => {
    try {
      res.json({
        success: 1,
        image_url: req.file ? `/images/${req.file.filename}` : null,
      });
    } catch (error) {
      res.status(500).json({ success: 0, message: "Internal server error" });
    }
  };

  /**
   * Removes a product by its ID.
   *
   * @param req - The request object containing the product ID in the parameters.
   * @param res - The response object used to send back the HTTP response.
   * @returns A promise that resolves to a response indicating the success or failure of the operation.
   *
   * @throws Will return a 400 status code if there is an error during the removal process.
   */
  private removeProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ success: true, message: "Product removed successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ success: false, message: "Failed to remove product" });
    }
  };

  /**
   * Creates a new product.
   *
   * This method handles the creation of a new product by first checking if a product with the same ID already exists.
   * If the product exists, it returns a 400 status with an error message. If the product does not exist, it assigns a new ID
   * to the product, saves it to the database, and returns a 201 status with the created product.
   *
   * @param req - The request object containing the product data in the body.
   * @param res - The response object used to send back the appropriate HTTP response.
   *
   * @returns A JSON response with the success status and the created product or an error message.
   */
  private createProduct = async (req: Request, res: Response) => {
    try {
      //   const product: IPart = req.body;
      const { ...others } = req.body;
      const existingProduct = await Product.findOne({ id: id });
      if (existingProduct) {
        return res
          .status(400)
          .json({ success: false, message: "Product already exists" });
      }
      let products = await Product.find({});
      let id;
      if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
      } else {
        id = 1;
      }
      const newProduct = new Product({
        id,
        ...others,
      });
      await newProduct.save();
      return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create product" });
    }
  };

  /**
   * Retrieves products by brand.
   *
   * @param req - The request object containing the brand parameter.
   * @param res - The response object used to send back the products or an error message.
   *
   * @returns A JSON response with a success flag and the list of products if successful,
   *          or an error message if an error occurs.
   *
   * @throws 500 - Internal server error if an exception occurs during the database query.
   */
  private getProductsByBrand = async (req: Request, res: Response) => {
    try {
      const { brand } = req.params;
      const products = await Product.find({ brand: brand });
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  private getProductsByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const products = await Product.find({ category: category });
      if (!products) {
        return res
          .status(404)
          .json({ success: false, message: "No products found" });
      }
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  private searchProduct = async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      const products = await Product.find({ query });
      if (products.length === 0 || products.length === null) {
        return res
          .status(404)
          .json({ success: false, message: "No products found" });
      }
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  private getProductsByPartNumber = async (req: Request, res: Response) => {
    try {
      const { partNumber } = req.params;
      const products = await Product.find({ partNumber: partNumber });
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  private updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { ...others } = req.body;
      const existingProduct = await Product.findOne({ id: id });
      if (!existingProduct) {
        return res
          .status(400)
          .json({ success: false, message: "Product does not exist" });
      }
      await Product.findOneAndUpdate({ id: id }, { ...others });
      return res
        .status(200)
        .json({ success: true, message: "Product updated successfully" });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to update product" });
    }
  };
}
export default ProductController;
