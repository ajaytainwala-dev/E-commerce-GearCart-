import { Router, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

class TestController {
  public path: string = "/test";
  public router = Router();

  constructor() {
    // console.log("Initializing TestController");
    this.getUsers = this.getUsers.bind(this);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // console.log("Initializing TestController Routes");
    this.router.get(`/`, this.getUsers);
  }

  private getUsers =  async (_req: Request, res: Response) => {
    // console.log("Hello World",this);
    res.status(200).json({ message: "Hello World from Ajay Tainwala" });
  };
}

export default TestController;