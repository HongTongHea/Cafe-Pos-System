const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

// LOGIN: Admin and Cashier
exports.login = async (req, res) => {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    const password = req.body.password;

    if (!email || typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const user = await User.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (Number(user.active) !== 1) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive. Contact your administrator.",
      });
    }

    if (!["admin", "cashier"].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Invalid account role",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// LOGOUT: Client removes its token
exports.logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// ADMIN ONLY: Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    // Never send password hashes to the frontend
    const safeUsers = users.map(({ password, ...user }) => user);

    return res.json({
      success: true,
      users: safeUsers,
    });
  } catch (error) {
    console.error("Get users error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

// ADMIN ONLY: Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...safeUser } = user;

    return res.json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error("Get user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

// ADMIN ONLY: Create an Admin or Cashier account
exports.createUser = async (req, res) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";

    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    const password = req.body.password;
    const role = req.body.role;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and role are required",
      });
    }

    if (!["admin", "cashier"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be admin or cashier",
      });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await User.getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Model must store the role and activate the account.
    const result = await User.createUser(name, email, hashedPassword, role);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: result.insertId ?? result.id ?? null,
    });
  } catch (error) {
    console.error("Create user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

// ADMIN ONLY: Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role, active } = req.body;

    if (role !== undefined && !["admin", "cashier"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be admin or cashier",
      });
    }

    let hashedPassword;

    if (password !== undefined && password !== "") {
      if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters",
        });
      }

      hashedPassword = await bcrypt.hash(password, 12);
    }

    await User.updateUser(
      req.params.id,
      name,
      email,
      hashedPassword,
      role,
      active,
    );

    return res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// ADMIN ONLY: Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);

    return res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};
