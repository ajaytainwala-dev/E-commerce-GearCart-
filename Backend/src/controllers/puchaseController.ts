import { Router, Request, Response } from "express";
import Purchase from "../models/Purchase";

class PurchaseController {
  public path: string = "/purchases";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/`, this.createPurchase);
    this.router.get(`/:id`, this.getPurchaseById);
    this.router.put(`/:id/status`, this.updatePurchaseStatus);
  }

  // Create a new purchase
  private createPurchase = async (req: Request, res: Response) => {
    const { userId, items, shippingAddress, totalAmount } = req.body;
    try {
      const newPurchase = new Purchase({
        userId,
        items,
        totalAmount,
        shippingAddress,
      });
      await newPurchase.save();
      return res.status(201).json(newPurchase);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Get a purchase by ID
  private getPurchaseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const purchase = await Purchase.findById(id)
        .populate("userId", "name email")
        .populate("items.productId", "name");
      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }
      return res.status(200).json(purchase);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Update purchase status
  private updatePurchaseStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { paymentStatus, deliveryStatus } = req.body;
    try {
      const purchase = await Purchase.findById(id);
      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }
      if (paymentStatus) purchase.paymentStatus = paymentStatus;
      if (deliveryStatus) purchase.deliveryStatus = deliveryStatus;
      await purchase.save();
      return res.status(200).json(purchase);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default PurchaseController;
