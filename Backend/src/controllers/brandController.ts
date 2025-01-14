import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import AdminMiddleware from "../middlewares/adminMiddleware";
import AuthMiddleware from "../middlewares/middleware";
import Brand from "../models/Brand";
import multer from "multer";
import path from "path";

dotenv.config();
const storage = multer.diskStorage({
  destination: "./uploads/Brand/Images/",
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

class BrandController {
  public path: string = "/brand";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllBrands);
    this.router.get("/:id",  this.getBrandById);
    this.router.post(
      "/",
      upload.single("logo"),
      AdminMiddleware,
      this.createBrand
    );
    this.router.put(
      `/:id`,
      upload.single("logo"),
      AdminMiddleware,
      this.updateBrand
    );
    this.router.delete(`/:id`, AdminMiddleware, this.deleteBrand);
  }

  private getAllBrands = async (_req: Request, res: Response) => {
    try {
      const brands = await Brand.find();
      if (!brands || brands.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No brands found" });
        // throw new ExpressError("No brands found", 404);
      }
      res.status(200).json({ success: true, brands: brands });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  private getBrandById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const brand = await Brand.findById(id);
      if (!brand) {
        return res
          .status(404)
          .json({ success: false, message: "Brand not found" });
      }
      res.status(200).json({ success: true, brand: brand });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };


//   Create Brand
/**
 * Creates a new brand and saves it to the database.
 * 
 * @param req - The request object containing brand details in the body and optionally a file for the logo.
 * @param res - The response object used to send back the HTTP response.
 * 
 * @returns A JSON response with the created brand object and a success status, or an error message if the operation fails.
 * 
 * @throws Will return a 500 status code with an error message if there is an issue during the brand creation process.
 */
  private createBrand = async (req: Request, res: Response) => {
    try {
      const {brand_id, name, description, country_of_origin } = req.body;
      const logo_url = req.file ? req.file.path : "";
      const brand = new Brand({
        brand_id,
        name,
        description,
        country_of_origin,
        logo_url,
      });
      await brand.save();
      res.status(201).json({ success: true, brand: brand });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  private updateBrand = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, description, country_of_origin } = req.body;
      const logo_url = req.file ? req.file.path : "";
      const brand = await Brand.findById(id);
      if (!brand) {
        return res
          .status(404)
          .json({ success: false, message: "Brand not found" });
      }
      brand.name = name;
      brand.description = description;
      brand.country_of_origin = country_of_origin;
      brand.logo_url = logo_url;
      await brand.save();
      res.status(200).json({ success: true, brand: brand });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  private deleteBrand = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const brand = await Brand.findById(id);
      if (!brand) {
        return res
          .status(404)
          .json({ success: false, message: "Brand not found" });
      }
      await brand.deleteOne();
      res.status(200).json({ success: true, message: "Brand deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default BrandController;
