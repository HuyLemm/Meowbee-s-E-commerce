import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

import {
    comparePassword,
} from "../utils/hashPassword.js";

class AuthController {
    Login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Email and password are required",
                });
            }

            const user = await User.findOne({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message:
                        "Invalid email or password",
                });
            }

            const isMatch =
                await comparePassword(
                    password,
                    user.password
                );

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message:
                        "Invalid email or password",
                });
            }

            const accessToken = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:
                        process.env.JWT_EXPIRES_IN ||
                        "1d",
                }
            );

            const refreshToken = jwt.sign(
                {
                    id: user.id,
                },
                process.env.JWT_REFRESH_SECRET,
                {
                    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
                }
            );

            return res.status(200).json({
                success: true,
                message:
                    "Login successful",
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    fullName:
                        user.fullName,
                    role: user.role,
                },
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    "Internal server error",
            });
        }
    };

    RefreshToken = async (req, res) => {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(401).json({
                    success: false,
                    message: "Refresh token not found",
                });
            }

            if (!process.env.JWT_REFRESH_SECRET) {
                return res.status(500).json({
                    success: false,
                    message: "JWT refresh secret is missing",
                });
            }

            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            );

            const user = await User.findByPk(decoded.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const newAccessToken = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
                }
            );

            return res.status(200).json({
                success: true,
                message: "Access token refreshed successfully",
                accessToken: newAccessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                },
            });
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Refresh token expired",
                });
            }

            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }
    };

    Logout = async (req, res) => {
        return res.status(200).json({
            success: true,
            message:
                "Logout successful",
        });
    };

    ForgotPassword = async (
        req,
        res
    ) => {
        return res.status(200).json({
            success: true,
            message:
                "Forgot password endpoint",
        });
    };

    ResetPassword = async (
        req,
        res
    ) => {
        return res.status(200).json({
            success: true,
            message:
                "Reset password endpoint",
        });
    };

    getMe = async (req, res) => {
        try {
            const authHeader =
                req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message:
                        "Token not found",
                });
            }

            const token =
                authHeader.split(" ")[1];

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            const user =
                await User.findByPk(
                    decoded.id
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message:
                        "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    fullName:
                        user.fullName,
                    role: user.role,
                },
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid token",
            });
        }
    };

    getHome = async (req, res) => {
        return res.status(200).json({
            success: true,
            message:
                "Welcome to Home API",
        });
    };
}

export default new AuthController();