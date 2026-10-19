const db = require("../config/database");

// Get all users without password hashes
exports.getAllUsers = async () => {
  const [rows] = await db.execute(`
        SELECT id, name, email, role, active
        FROM users
        ORDER BY id DESC
    `);

  return rows;
};

// Get user by ID without password hash
exports.getUserById = async (id) => {
  const [rows] = await db.execute(
    `SELECT id, name, email, role, active
         FROM users
         WHERE id = ?
         LIMIT 1`,
    [id],
  );

  return rows[0] || null;
};

// Get user by email
exports.getUserByEmail = async (email) => {
  const [rows] = await db.execute(
    `SELECT id, name, email, password, role, active
         FROM users
         WHERE LOWER(email) = ?
         LIMIT 1`,
    [email.trim().toLowerCase()],
  );

  return rows[0] || null;
};

// Get user by name OR email for login
exports.getUserByIdentifier = async (identifier) => {
  const normalized = identifier.trim().toLowerCase();

  const [rows] = await db.execute(
    `SELECT id, name, email, password, role, active
         FROM users
         WHERE LOWER(email) = ? OR LOWER(name) = ?
         LIMIT 1`,
    [normalized, normalized],
  );

  return rows[0] || null;
};

// Create an admin or cashier
exports.createUser = async (name, email, hashedPassword, role = "cashier") => {
  const [result] = await db.execute(
    `INSERT INTO users (name, email, password, role, active)
         VALUES (?, ?, ?, ?, 1)`,
    [name, email, hashedPassword, role],
  );

  return result;
};

// Update user's name, email, password, role, and active status
exports.updateUser = async (id, name, email, password, role, active) => {
  const fields = [];
  const values = [];

  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name.trim());
  }

  if (email !== undefined) {
    fields.push("email = ?");
    values.push(email.trim().toLowerCase());
  }

  if (password !== undefined && password !== "") {
    fields.push("password = ?");
    values.push(password);
  }

  if (role !== undefined) {
    if (!["admin", "cashier"].includes(role)) {
      throw new Error("Invalid user role");
    }

    fields.push("role = ?");
    values.push(role);
  }

  if (active !== undefined) {
    const activeValue =
      active === true || active === 1 || active === "1"
        ? 1
        : active === false || active === 0 || active === "0"
          ? 0
          : null;

    if (activeValue === null) {
      throw new Error("Active must be true, false, 1, or 0");
    }

    fields.push("active = ?");
    values.push(activeValue);
  }

  if (fields.length === 0) {
    throw new Error("No fields provided to update");
  }

  values.push(id);

  const [result] = await db.execute(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );

  return result;
};

// Delete user
exports.deleteUser = async (id) => {
  const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);

  return result;
};
