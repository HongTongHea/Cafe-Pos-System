const Product = require('../models/productsModel');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const produts = await Product.getAllProducts();
        res.json(produts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// Get product by ID
exports.getProductsById = async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
   catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the product",
            error: error.message
        });
    } 

}

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const {
            product_name,
            description,
            price,
            stock_quantity,
            category,
            image_url
        } = req.body;

        if (!product_name || !price || !stock_quantity || !category) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const existingProduct = await Product.getProductByName(product_name);

        if (existingProduct) {
            return res.status(400).json({
                message: "Product with this name already exists"
            });
        }

        const result = await Product.createProduct(
            product_name,
            description,
            price,
            stock_quantity,
            category,
            image_url
        );

        res.status(201).json({
            message: "Product created successfully",
            productId: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { product_name, description, price, stock_quantity, category, image_url } = req.body;
        await Product.updateProduct(req.params.id, product_name, description, price, stock_quantity, category, image_url);
        res.json({ message: "Product updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
   try {
          await Product.deleteProduct(req.params.id);
          res.json({ message: "Product deleted successfully" });
    }
      catch (error) {
          res.status(500).json({ error: error.message });
    }
}