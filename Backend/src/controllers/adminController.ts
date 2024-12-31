import { Router, Request, Response } from "express";
import multer from "multer";
import {Product as  Part } from "../models/Product";
import { User } from "../models//User";
import Purchase  from "../models/Purchase";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

class AdminController {
  public path: string = "/admin";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `/add-product`,
      upload.single("image"),
      this.addProduct
    );
    this.router.get(`/dashboard`, this.getDashboardData);
    this.router.get(`/products`, this.getProductsInStock);
    this.router.post(`/offer`, this.addOffer);
    this.router.get(`/orders`, this.viewOrders);
  }

  // Add a new product
  private addProduct = async (req: Request, res: Response) => {
    const {
      name,
      brand,
      category,
      price,
      stock,
      description,
      vehicleType,
      compatibility,
    } = req.body;
    const imageUrl = req.file?.path;

    try {
      const newProduct = new Part({
        name,
        brand,
        category,
        price,
        stock,
        description,
        vehicleType,
        compatibility: compatibility.split(","), // Convert to array
        imageUrl,
      });
      await newProduct.save();
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Get dashboard data
  private getDashboardData = async (req: Request, res: Response) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalRevenue = await Purchase.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);
      const totalOrders = await Purchase.countDocuments();

      return res.status(200).json({
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Get products in stock
  private getProductsInStock = async (req: Request, res: Response) => {
    try {
      const products = await Part.find({ stock: { $gt: 0 } });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Add offer or discount
  private addOffer = async (req: Request, res: Response) => {
    const { productId, discountPercentage } = req.body;

    try {
      const product = await Part.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      product.price =
        product.price - product.price * (discountPercentage / 100);
      await product.save();

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // View all orders
  private viewOrders = async (req: Request, res: Response) => {
    try {
      const orders = await Purchase.find()
        .populate("userId", "name email")
        .populate("items.productId", "name");
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default AdminController;