import User from "../models/User.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from "jsonwebtoken";


const token = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        // Hash password    
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
            token: token(user._id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token: token(user._id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}


