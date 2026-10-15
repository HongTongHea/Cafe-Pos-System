const db  = require('../config/database');

// exports.getAllUsers = async () => {
//     const [rows] = await db.query('SELECT * FROM users');
//     return rows;
// };

exports.getAllUsers = async () => {
    const [rows] = await db.query(
        'SELECT * FROM users ORDER BY id DESC'
    );

    return rows;
};

exports.getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

exports.getUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

exports.createUser = async (name, email, password) => {
    const [result] = await db.query('INSERT INTO users(name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    return result;
};

exports.updateToken = async (id, token) => {
    const [result] = await db.query(
        `UPDATE users
         SET token = ?
         WHERE id = ?`,
        [token, id]
    );

    return result;
};

exports.updateUser = async (id, name, email, password) => {
    const [result] = await db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
    return result;
};

exports.deleteUser = async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result;
    
};