const db  = require('../config/database');

exports.getAllProducts = async () => {
    const [rows] = await db.query('SELECT * FROM products'); 
    return rows;
};

exports.getProductById = async (id) => {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
};

exports.getProductByName = async (product_name) => {
    const [rows] = await db.query('SELECT * FROM products WHERE product_name = ?', [product_name]);
    return rows[0];
};


exports.createProduct = async (
    product_name,
    description,
    price,
    stock_quantity,
    category,
    image_url
) => {
    const [result] = await db.query(
        `INSERT INTO products
        (product_name, description, price, stock_quantity, category, image_url)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            product_name,
            description,
            price,
            stock_quantity,
            category,
            image_url
        ]
    );

    return result;
};


exports.updateProduct = async (id, product_name, description, price, stock_quantity, category, image_url) => {
    const [result] = await db.query(
        `UPDATE products SET product_name = ?, description = ?, price = ?, stock_quantity = ?, category = ?, image_url = ? WHERE id = ?`, 
        [
            product_name,
            description,
            price,
            stock_quantity,
            category,
            image_url,
            id
        ]
    );

    return result;
};

exports.deleteProduct = async (id) => {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return result;
};
