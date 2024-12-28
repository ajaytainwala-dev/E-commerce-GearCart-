import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import ExpressError from "../utils/ExpressError";
import crypto from "node:crypto";
import ResetEmail from "../utils/Email/ResetEmail";
dotenv.config();
import AuthMiddleware from "../middlewares/middleware";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, UserSchemaZod } from "../models/User";

if (!process.env.JWT_SECRET) {
  throw new ExpressError(
    "JWT_SECRET is not defined in the environment variables",
    402
  );
}
class authController {
  public path: string = "/auth";
  public router = Router();

  constructor() {
    this.getUsers = this.getUsers.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.login = this.login.bind(this);
    this.initializeRoutes();
  }

  /**
   * Initializes the routes for the authentication controller.
   *
   * - `GET /`: Retrieves the list of users. Requires authentication.
   * - `POST /register`: Registers a new user.
   * - `POST /login`: Logs in a user.
   * - `PUT /update`: Updates user information. Requires authentication.
   *
   * @private
   * @method initializeRoutes
   * @returns {void}
   */
  private initializeRoutes(): void {
    // Get user's data
    this.router.get(`/`, AuthMiddleware, this.getUsers);
    // register a new user
    this.router.post(`/register`, this.doRegister);
    // Login a user
    this.router.post(`/login`, this.login);
    // Update user data
    this.router.put(`/update`, AuthMiddleware, this.updateUser);
    // Delete a user
    this.router.delete(`/delete`, AuthMiddleware, this.deleteUser);
    // Forget Password
    this.router.post(`/forget`, this.forgetPassword);
    // Reset Password
    this.router.post(`/reset/:resetToken`, this.resetPassword);
  }

  //  Registering a new user
  /**
   * Handles user registration.
   *
   * This method validates the incoming request body against the `UserSchemaZod` schema.
   * If validation fails, it responds with a 400 status code and the validation errors.
   *
   * If the email already exists in the database, it responds with a 400 status code and an error message.
   *
   * If the email is unique, it hashes the password, creates a new user, saves it to the database,
   * generates a JWT token, and responds with a 201 status code and the token.
   *
   * In case of any other errors, it responds with a 500 status code and an "Internal Server Error" message.
   *
   * @param req - The request object containing the user registration data.
   * @param res - The response object used to send back the appropriate HTTP response.
   *
   * @returns A promise that resolves to void.
   */
  private doRegister = async (req: Request, res: Response) => {
    const schema = UserSchemaZod;
    try {
      schema.parse(req.body);
    } catch (error: any) {
      res.status(400).json({ "Error with user resgistration": error.errors });
    }
    const { email, password, ...otherFields } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        ...otherFields,
      });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      res.status(201).json({ token: token });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //   Logging in a user
  /**
   * Handles user login.
   *
   * @param req - The request object containing user credentials.
   * @param res - The response object to send the result of the login attempt.
   * @returns A promise that resolves to a response object with a JWT token if login is successful,
   *          or an error message if login fails.
   *
   * The function performs the following steps:
   * 1. Validates the request body using a Zod schema to ensure it contains a valid email and password.
   * 2. Checks if a user with the provided email exists in the database.
   * 3. Verifies the provided password against the stored hashed password.
   * 4. Generates a JWT token if the email and password are valid.
   * 5. Returns the JWT token in the response if login is successful.
   * 6. Returns appropriate error messages for invalid credentials or internal server errors.
   */
  private login = async (req: Request, res: Response): Promise<Response> => {
    const schema = UserSchemaZod.pick({
      email: true,
      password: true,
    });
    try {
      schema.parse(req.body);
    } catch (error: any) {
      res.status(400).json({ "Error with user login": error.errors });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //   Getting all users data

  /**
   * Retrieves a list of users from the database, excluding their passwords.
   *
   * @param req - The request object, containing the authorization header with the JWT token.
   * @param res - The response object, used to send the list of users or an error message.
   * @throws Will throw an error if no token is provided in the authorization header.
   *
   * @remarks
   * This method verifies the provided JWT token using the secret key from the environment variables.
   * If the token is valid, it fetches the users from the database and sends them in the response.
   * If the token is invalid or any other error occurs, it sends a 400 status with an error message.
   */
  private getUsers = async (req: Request, res: Response): Promise<Response> => {
    const userId = (req as any).user.id;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ error: "Access denied. No token provided." });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        return res.status(200).json(user);
      }
    } catch (error) {
      return res.status(400).json({ error: `Invalid token. ${error}` });
    }
  };

  // Updating user data
  /**
   * Updates the user information based on the provided request body.
   *
   * @param req - The request object containing user information and fields to update.
   * @param res - The response object used to send back the updated user information.
   * @returns A promise that resolves to void.
   *
   * @throws Will catch and handle any errors that occur during the update process.
   */
  private updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;

      const { ...field } = req.body;
      const user = await User.findByIdAndUpdate(
        userId,
        { ...field },
        { new: true }
      );
      res.status(201).json({ success: true, user });
    } catch (error) {}
  };

  // Deleting a user
  /**
   * Deletes the authenticated user from the database.
   *
   * @param req - The request object, expected to have a user property with an id.
   * @param res - The response object used to send back the HTTP response.
   * @returns A promise that resolves to void.
   *
   * @throws Will return a 500 status code with an error message if an error occurs during deletion.
   */
  private deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      await User.findByIdAndDelete(userId);
      res
        .status(201)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Forget Password
  /**
   * Handles the forget password request.
   *
   * @param req - The request object containing the user's email address.
   * @param res - The response object used to send back the HTTP response.
   * @returns A promise that resolves to void.
   *
   * @throws Will return a 500 status code with an error message if an error occurs during password reset.
   */
  private forgetPassword = async ( req: Request,res: Response,next: any): Promise<Response> => {

  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ExpressError(
        "Email could not be sent, please register first",
        404
      );
    }
    await user.getResetPasswordToken();
    const RestToken = await user.resetPasswordToken;
    console.log("Token :", JSON.stringify(RestToken));
    // console.log("Reset :",JSON.stringify(resetToken));
    await user.save();
    const resetUrl = `http://localhost:3000/Password/Reset/${RestToken}`;
    const message = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
    </head>
    
    
    
    <body style=" margin: 0;
    padding: 0;
    box-sizing: border-box;font-family: 'Roboto', sans-serif;
    background-color: #f4f4f4;">
        <div class="container" style="width: 100%;
            padding: auto;">
            <div class="header" style="background-color: rgb(22, 26, 57);
            padding: 10px;
            text-align: center;">
                <h4 style="color: white;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="white" 
                        viewBox="0 0 16 16">
                        <path
                            d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                    </svg><br>Please Reset Password
                </h4>
            </div>
            <div class="text-container" style=" background-color: white;
            padding: 20px;
            border-radius: 5px;">
                <p><span style="  font-size: 1.2rem;
                    font-weight: 500;
                    line-height: 2rem;">Hello ${user.name} ,</span> <br>
                    We have sent this email in response to your request to reset your Password on GearCart <br><br>To reset
                    your Password,please follow the link below:</p>
                <div>
                    <a href=${resetUrl} clicktracking="off" target="_">
                        <button type="button" class="btn" clicktracking="off" target="_blank" style="  background-color: rgb(22, 26, 57);
                        color: white;
                        padding: 0 10px;
                        border-radius: 8px;
                        border: none;
                        cursor: pointer;
                        text-decoration: none;
                        margin: 10px;">
                            <h4>Reset Password</h4>
                        </button>
                    </a>
                    <div class="ignore-text" style="  font-size: 0.8rem;
                    color: rgb(22, 26, 57);
                    text-align: left;line-height: 1.2rem;">*Please ignore this email if did not
                        request a Password change</div>
                </div>
            </div>
            <div class="foot" style=" background-color: rgb(22, 26, 57);
            padding: 1rem;
            text-align: center;">
                <h4 class="  p-3 text-left" style="color: white;"> &copy; GearCart | All rights reserved
                    <script>new Date().getFullYear() > 2021 && document.write("-" + new Date().getFullYear());</script>
                </h4>
    
            </div>
        </div>
    </body>
    
    </html>`;
    try {
      await ResetEmail({
        to: user.email,
        subject: "GearCart Password Reset request",
        text: message,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new ExpressError("Email could not be sent", 500));
    }

    return res
      .status(201)
      .json({
        success: true,
        message: "Email sent successfully, check your inbox",
        resetToken: RestToken,
      });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  };

  // Reset Password
  /**
   * Handles the password reset request.
   *
   * @param req - The request object containing the user's email address.
   * @param res - The response object used to send back the HTTP response.
   * @returns A promise that resolves to void.
   *
   * @throws Will return a 500 status code with an error message if an error occurs during password reset.
   */
  private resetPassword = async (req: Request,res: Response): Promise<Response> => {
    const resetPasswordToken = req.params.resetToken;
   
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(404).json({ error: "Invalid Token" });
      }
      user.password = await bcrypt.hash(req.body.password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(201).json({ success: true, message: "Password Reset Success" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default authController;
