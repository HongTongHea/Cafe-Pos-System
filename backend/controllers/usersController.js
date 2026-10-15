const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/usersModel');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        const result = await User.createUser(
            name,
            email,
            password
        );

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the user",
            error: error.message
        });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        await User.updateUser(req.params.id,name,email,password);
        res.json({ message: "User updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        await User.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};