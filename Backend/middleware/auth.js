// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = async (req, res, next) => {
    try {
        // 1. Get token
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token",
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user to request
        req.user = await User.findById(decoded.id).select("-password");
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authorized, invalid token",
        });
    }
};