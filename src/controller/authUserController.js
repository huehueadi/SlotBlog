import User from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";



export const createUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "Missing fields",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        const validatePassword = await bcrypt.compare(password, findUser.password);
        if (!validatePassword) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            });
        }

        const payload = {
            id: findUser.id,
            userName: findUser.userName,
            email: findUser.email
        };

        const token = jwt.sign(payload, 'Key', { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,      
            sameSite: 'None',    
            maxAge: 3600000,     
            secure: true         
        });

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token,
            payload
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

