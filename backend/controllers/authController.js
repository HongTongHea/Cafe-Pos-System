const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        // Check email
        const existingUser = await User.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await User.createUser(
            name,
            email,
            hashedPassword
        );

        // Get new user ID
        const userId = result.insertId;

        // Generate JWT token
        const token = jwt.sign(
            {
                id: userId,
                email: email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Store token in users table
        await User.updateToken(userId, token);

        // Response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: userId,
            token: token,
            user: {
                id: userId,
                name: name,
                email: email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

exports.logout = async (req, res) => {
    try {
        const userId = req.user.id;
        await User.updateToken(userId, null);
        res.json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
};
