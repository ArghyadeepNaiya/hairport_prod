// customerModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT=require("jsonwebtoken");
const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true 
    },
    hp_coins: {
        type: Number,
        default: 0,
        min: 0
    },
    has_subscription: {
        type: String,
        required: true,
        enum: ['yes', 'no'],
        default: 'no'
    }
}, { 
    timestamps: true 
});

customerSchema.methods={
    jwtToken(){
        return JWT.sign(
            {_id:this._id,email:this.email},
            process.env.SUPERSECRET,
            {expiresIn:"30d"}
        );
    }
};

// Add 'next' inside the parentheses here 👇
customerSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;