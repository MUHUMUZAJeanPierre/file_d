import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js"; 
import dotenv from "dotenv";
import validator from "validator"; 

dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in the environment variables.");
    process.exit(1); 
}

const JWT_SECRET = process.env.JWT_SECRET;

const passwordValidator = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(password);
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!validator.isEmail(email)) {
            return res.status(400).json({ status: "error", message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "User already exists" });
        }

        if (!passwordValidator(password)) {
            return res.status(400).json({
                status: "error",
                message: "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ status: "success", message: "User registered successfully", data: newUser });
    } catch (error) {
        console.error("Error during registration:", error.stack || error);
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: "error", message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: "error", message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
        );

        res.status(200).json({
            status: "success",
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error("Error during login:", error.stack || error);
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};
