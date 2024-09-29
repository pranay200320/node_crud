const mongoose = require('mongoose');

// Create the Product schema
const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Food', 'Furniture', 'Accessories'], // Add appropriate categories
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Stock: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    SKU: { // Stock Keeping Unit
        type: String,
        required: true,
        unique: true
    },
    Manufacturer: {
        type: String,
        required: true
    }
});

// Create a model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
