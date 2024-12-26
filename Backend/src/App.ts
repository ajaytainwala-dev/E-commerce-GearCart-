import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

class App {
  public app: Application;
  public port: number;
  constructor(controller: any[], port: number) {
    this.app = express();
    this.port = port;

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeController(controller);
  }

  private connectToDatabase() {
    try {
      const MongoURI: string = process.env.MONGO_URI || "";
      mongoose.connect(MongoURI);
      mongoose.connection.on("connected", () => {
        console.log("Connected to the database");
      });
      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
      });
    } catch (error) {
      console.log("Error in connecting to the database", error);
    }
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeController(controller: any[]) {
    if (controller.length === 0) {
      console.log("No controller found");
      return;
    }
    controller.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  public listen() {
    try {
      this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    } catch (error) {
      console.log("Error in starting the server with the port",error);
    }
  }
}

export default App;
