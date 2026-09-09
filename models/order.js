const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    }],
    location: {
        type: String,
        required: true,
        enum: ['Lalpur Center (Opposite Nucleus Mall)', 'Lalji Hirji Road Center']
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    remark: { type: String },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected']
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);