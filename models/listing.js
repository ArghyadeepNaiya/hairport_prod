const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    original_price: { type: Number },
    duration: { type: String },
    is_bestseller: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    gender: {
        type: String,
        required: true,
        enum: ['Female', 'Male', 'Unisex', 'All Genders'],
        default: 'All Genders'
    },
    description: { type: String, trim: true, required: true },
    processes: [{ type: String }],
    category: {
        type: String,
        required: true,
        enum: [
            'Hair', 'Spa', 'Facials & Glow', 'Nails & Art', 'Mani-Pedi', 
            'D-Tan Packs', 'Waxing', 'Combo Offers', 'Men\'s Special',
            'Bridal & Wedding', 'Makeup', 'Academy' 
        ]
    },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);