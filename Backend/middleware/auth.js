import jwt from "jsonwebtoken";
import UserModel from "../Models/useModelr.js";

export const auth = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = await UserModel
            .findById(decoded.id)
            .select("-password");

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};