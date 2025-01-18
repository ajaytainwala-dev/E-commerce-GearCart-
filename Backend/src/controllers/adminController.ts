import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import multer from "multer";
import { Product as Part } from "../models/Product";
import { User } from "../models/User";
import Purchase from "../models/Purchase";
import AuthMiddleware from "../middlewares/adminMiddleware";
import path from "path";
import Brand from "../models/Brand";
import Category from "../models/Categories";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (_req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
class AdminController {
  public path: string = "/admin";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/users`, AuthMiddleware as RequestHandler, this.getUsers);
    this.router.post(
      `/add-product`,
      AuthMiddleware as RequestHandler,
      upload.array("images", 4),
      this.addProduct
    );

    this.router.get(
      `/dashboard`,
      AuthMiddleware as RequestHandler,
      this.getDashboardData
    );
    this.router.get(
      `/stock/:id`,
      AuthMiddleware as RequestHandler,
      this.getProductsInStock
    );
    this.router.post(
      `/offer/:productId/:discountPercentage`,
      AuthMiddleware as RequestHandler,
      this.addOffer
    );
    this.router.get(
      `/orders`,
      AuthMiddleware as RequestHandler,
      this.viewOrders
    );
    this.router.post(
      "/add/:id",
      AuthMiddleware as RequestHandler,
      upload.array("images", 4),
      this.uploadImage
    );
  }

  // Fetch all users
  /**
   * Retrieves a list of non-admin users from the database.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   * @returns A JSON response containing the list of non-admin users or an error message.
   *
   * @throws Will return a 500 status code and an error message if an internal server error occurs.
   */
  private getUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const isAdmin = (req as any).user
      // console.log(isAdmin)
      // if (!isAdmin.isAdmin) {
      //   return res.status(403).json({ error: "Unauthorized" });
      // }
      // console.log(req.user.isAdmin)
      const users = await User.find().select("-password");
      const nonAdminUsers = users.filter((user) => !user.isAdmin);
      return res.status(200).json(nonAdminUsers);
    } catch (error) {
      res.status(500).json({ error: "Controller Internal Server Error" });
      console.error(error);
      return next(error);
    }
  };

  // Upload image for product
  /**
   * Uploads an image for a product and updates the product's image URL.
   *
   * @param req - The request object containing the image file and product ID.
   * @param res - The response object used to send the response.
   *
   * @returns A JSON response with the image URL or an error message.
   *
   * @throws {Error} If there is an internal server error.
   */
  private uploadImage = async (req: Request, res: Response) => {
    try {
      const imageUrl = Array.isArray(req.files)
        ? req.files.map((file: any) => file.path)
        : [];
      // console.log(imageUrl);
      if (!imageUrl) {
        return res.status(400).json({ error: "Image is required" });
      }
      const { id } = req.params;
      const product = await Part.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      product.imageUrl = imageUrl;
      await product.save();

      return res.status(200).json({
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Add a new product
  /**
   * Adds a new product to the database.
   *
   * @param req - The request object containing the product details in the body.
   * @param res - The response object used to send back the appropriate HTTP response.
   *
   * @returns A JSON response with the newly created product or an error message.
   *
   * @remarks
   * - The product details include name, brand, category, price, stock, description, vehicleType, discount, OEMPartNumber, partNumber, supplierName, and compatibility.
   * - Compatibility is converted to an array if provided as a comma-separated string.
   * - Checks if a part with the same part number or OEM part number already exists.
   * - Generates a new unique ID for the product based on the last product's ID.
   * - Handles errors and sends appropriate HTTP status codes and messages.
   *
   * @throws Will return a 400 status code if a part with the same part number already exists.
   * @throws Will return a 500 status code if there is an internal server error.
   */
  private addProduct = async (req: Request, res: Response) => {
    const {
      name,
      brand,
      category,
      price,
      stock,
      description,
      vehicleType,
      discount,
      OEMPartNumber,
      partNumber,
      supplierName,
      compatibility,
    } = req.body;

    const imageUrl = Array.isArray(req.files)
      ? req.files.map((file: any) => file.path)
      : [];

    if (!imageUrl) {
      return res.status(400).json({ error: "Image is required" });
    }
    const part = await Part.findOne({ partNumber, OEMPartNumber });
    if (part) {
      return res
        .status(400)
        .json({ error: "Part with same part number already exists" });
    }

    const lastProduct = await Part.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;
    const id = newId;
    try {
      const newProduct = new Part({
        id,
        name,
        brand,
        category,
        price,
        stock,
        OEMPartNumber,
        partNumber,
        discount,
        description,
        supplierName,
        vehicleType,
        compatibility: compatibility ? compatibility.split(",") : [], // Convert to array
        imageUrl,
      });
      await newProduct.save();
      return res.status(201).json({ id: newProduct._id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Fetch dashboard data
  /**
   * Retrieves dashboard data including total users, total revenue, and total orders.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response containing total users, total revenue, and total orders.
   *
   * @throws Will return a 500 status code with an error message if an error occurs.
   */
  private getDashboardData = async (_req: Request, res: Response) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalRevenue = await Purchase.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);
      const totalOrders = await Purchase.countDocuments();
      const totalProducts = await Part.countDocuments();
      const totalBrands = await Brand.countDocuments();
      const totalCatrgories = await Category.countDocuments();
      return res.status(200).json({
        totalUsers,
        totalProducts,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        totalBrands,
        totalCatrgories,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Get products in stock
  /**
   * Retrieves the stock information for a specific product by its ID.
   *
   * @param req - The request object containing the product ID in the parameters.
   * @param res - The response object used to send the stock information or an error message.
   *
   * @returns A JSON response with the stock information if the product is found,
   *          or an error message if the product is not found or an internal server error occurs.
   *
   * @throws 500 - Internal Server Error if an exception occurs during the process.
   */
  private getProductsInStock = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const products = await Part.findById(id);
      if (!products) {
        return res.status(404).json({ error: "Product not found" });
      }
      const stock = products.stock;
      return res.status(200).json({ stock });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Add offer or discount
  private addOffer = async (req: Request, res: Response) => {
    const { productId, discountPercentage } = req.params;

    try {
      const product = await Part.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      product.price = product.price =
        product.price - product.price * (parseFloat(discountPercentage) / 100);
      await product.save();

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // View all orders
  private viewOrders = async (_req: Request, res: Response) => {
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
