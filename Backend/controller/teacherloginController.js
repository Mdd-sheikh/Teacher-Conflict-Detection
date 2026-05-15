// controller/teacherController.js
import jwt from "jsonwebtoken";
import Teacher from "../Models/AddTeacher.js";

export const teacherLogin = async (req, res) => {
    try {
        const { teacherId, password } = req.body;

        const teacher = await Teacher.findOne({ teacherId })
            .populate("subjects")
            .populate("rooms");

        // teacher not found
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        // password check
        if (teacher.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        // create token
        const token = jwt.sign(
            {
                id: teacher._id,
                teacherId: teacher.teacherId,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // send token + teacher data
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            teacher,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
