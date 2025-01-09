import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

class AdminMiddleware {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Authorization token is required" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Invalid authorization token format" });
      }

      const userId = this.verifyToken(token);
      if (!userId) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await User.findById(userId);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized user" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
      console.error(error);
    }
  }

  private verifyToken(token: string): string | null {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
      return decoded.userId;
    } catch (error) {
      return null;
    }
  }
}

const adminMiddleware = new AdminMiddleware();
export default adminMiddleware.handle.bind(adminMiddleware);
