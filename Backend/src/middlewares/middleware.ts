import { Request, Response, NextFunction } from 'express';
import { User, UserSchemaZod } from '../models/User';
import jwt from 'jsonwebtoken';


class FetchUserMiddleware {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'Authorization token is required' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Invalid authorization token format' });
            }

            const userId = this.verifyToken(token);
            if (!userId) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // const validation = UserSchemaZod.safeParse(user);
            // if (!validation.success) {
            //     return res.status(400).json({ message: 'Invalid user data', errors: validation.error.errors });
            // }
// console.log(user);
            (req as any).user = user;
            next();
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
            console.error(error);
        }
    }

    private verifyToken(token: string): string | null {
        // Implement token verification logic here
        try {
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as { userId: string };
            return decoded.userId;
        } catch (error) {
            return null;
        }
    }
}

const fetchUserMiddleware = new FetchUserMiddleware();
export default fetchUserMiddleware.handle.bind(fetchUserMiddleware);