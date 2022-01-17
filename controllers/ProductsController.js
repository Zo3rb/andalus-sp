const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

exports.indexProducts = asyncHandler(async (req, res) => {
    // Basic Indexing For Products
    const products = await Product.find({});

    res.json({
        message: "Successfully Fetched The Products",
        count: products.length,
        data: products
    });

});

exports.createProduct = asyncHandler(async (req, res) => {
    // Basic Add Product
    const newProduct = await Product.create(req.body);

    res.status(201).json({
        message: "Successfully Added a New Product",
        data: newProduct
    })
});

exports.readProduct = asyncHandler(async (req, res) => {
    // Basic Read Product
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            message: "Can't Find Product With that ID"
        });
    };

    res.json({
        message: "Successfully Fetched The Product",
        data: product
    })
});

exports.updateProduct = asyncHandler(async (req, res) => {
    // Basic Update Product
    const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!newProduct) {
        return res.status(404).json({
            message: "Can't Find Product With that ID"
        });
    };

    res.json({
        message: "Successfully Updated The Product",
        data: newProduct
    });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
    // Basic Delete Product
    const productToDelete = await Product.findByIdAndDelete(req.params.id);

    if (!productToDelete) {
        return res.status(404).json({
            message: "Can't Find Product With that ID"
        });
    };

    res.json({
        message: "Successfully Deleted The Product",
    });

});
