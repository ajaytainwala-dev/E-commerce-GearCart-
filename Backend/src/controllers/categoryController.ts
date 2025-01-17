import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import AdminMiddleware from "../middlewares/adminMiddleware";
// import AuthMiddleware from "../middlewares/middleware";
import multer from "multer";
import Category from "../models/Categories";
import path from "path";

dotenv.config();
const storage = multer.diskStorage({
  destination: "./uploads/Category/Images/",
  filename: (_req, file, cb) => {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
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

class CategoryController {
  
  public path: string = "/category";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  
  private initializeRoutes() {
    this.router.get("/", this.getAllCategorys);
    this.router.get("/:id", this.getCategoryById);
    this.router.post(
      "/",
      upload.single("image"),
      AdminMiddleware,
      this.createCategory
    );
    this.router.put(
      `/:id`,
      upload.single("image"),
      AdminMiddleware,
      this.updateCategory
    );

    this.router.delete(`/:id`, AdminMiddleware, this.deleteCategory);
  }

  private getAllCategorys = async (_req: Request, res: Response) => {
    try {
      const category = await Category.find();
      if (!category || category.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No Categorys found" });
        // throw new ExpressError("No Categorys found", 404);
      }
      res.status(200).json({ success: true, Category: category });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  private getCategoryById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res.status(200).json({ success: true, Category: category });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  //   Create Category
  /**
   * Creates a new Category and saves it to the database.
   *
   * @param req - The request object containing Category details in the body and optionally a file for the logo.
   * @param res - The response object used to send back the HTTP response.
   *
   * @returns A JSON response with the created Category object and a success status, or an error message if the operation fails.
   *
   * @throws Will return a 500 status code with an error message if there is an issue during the Category creation process.
   */
  private createCategory = async (req: Request, res: Response) => {
    try {
      const { category_id, name, description, parent_Category } = req.body;
      const category_image = req.file ? req.file.path : "";
      const category = new Category({
        category_id,
        name,
        description,
        parent_Category,
        category_image,
      });
      await category.save();
      res.status(201).json({ success: true, Category: category });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  private updateCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { category_id, name, description, parent_Category } = req.body;
      const category_image = req.file ? req.file.path : "";
      const category = await Category.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      category.category_id = category_id;
      category.name = name;
      category.description = description;
      category.parent_Category = parent_Category;
      category.category_image = category_image;
      await category.save();
      res.status(200).json({ success: true, Category: category });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  private deleteCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      await category.deleteOne();
      res.status(200).json({ success: true, message: "Category deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default CategoryController;
