const Cart = require('../models/cart.js');
const Order = require('../models/order.js');
const Customer = require('../models/user.js');
const ExpressError = require("../utils/error.js");
const Listing = require('../models/listing.js'); // <-- Ensure this is imported

const addToCart = async (req, res, next) => {
    try {
        const listingId = req.params.id;
        const userId = req.user._id;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }
        
        cart.items.push(listingId);
        await cart.save();
        
        // Redirect back to the exact URL they came from, or home if unavailable
        res.redirect(req.get('Referrer') || '/hairport/user/home'); 
    } catch (e) {
        return next(new ExpressError(e.message, 500));
    }
};
const viewCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        let cart = await Cart.findOne({ user: userId }).populate('items');
        
        let cartItems = [];
        let cartItemIds = [];
        let subtotal = 0; // Changed from 'total' to 'subtotal'
        
        let groupedItems = [];
        
        if (cart && cart.items.length > 0) {
            cartItems = cart.items;
            cartItemIds = cartItems.map(item => item._id); 
            cartItems.forEach(item => subtotal += item.price);
            
            const itemMap = new Map();
            cartItems.forEach(item => {
                if (item && item._id) {
                    const idStr = item._id.toString();
                    if (itemMap.has(idStr)) {
                        itemMap.get(idStr).quantity += 1;
                    } else {
                        itemMap.set(idStr, { item: item, quantity: 1 });
                    }
                }
            });
            groupedItems = Array.from(itemMap.values());
        }

        const recommendations = await Listing.aggregate([
            { $match: { _id: { $nin: cartItemIds } } },
            { $sample: { size: 3 } }
        ]);
        
        // Pass 'subtotal' and 'groupedItems' to the EJS template
        res.render("cart.ejs", { cart: { items: cartItems }, groupedItems, subtotal, recommendations });
    } catch (e) {
        return next(new ExpressError(e.message, 500));
    }
};

const renderSchedule = async (req, res, next) => {
    try {
        res.render("schedule.ejs");
    } catch (e) {
        return next(new ExpressError(e.message, 500));
    }
};

const placeOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { location, date, time } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate('items');
        if (!cart || cart.items.length === 0) {
            return res.redirect("/hairport/user/home");
        }

        const user = await Customer.findById(userId);
        
        let subtotal = 0;
        cart.items.forEach(item => subtotal += item.price);

        // Apply 5% discount if subscribed
        let discount = 0;
        if (user.has_subscription === 'yes') {
            discount = Math.round(subtotal * 0.05);
        }
        
        const total = subtotal - discount;

        const newOrder = new Order({
            user: userId,
            items: cart.items.map(item => item._id),
            location,
            date,
            time,
            subtotal,
            discount,
            total
        });

        await newOrder.save();
        
        // Clear the user's cart after booking
        cart.items = [];
        await cart.save();

        res.redirect("/hairport/user/profile");
    } catch (e) {
        return next(new ExpressError(e.message, 500));
    }
};

// Add this function above module.exports
const removeFromCart = async (req, res, next) => {
    try {
        const listingId = req.params.id;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            // Find the index of the item and remove just one instance of it
            const itemIndex = cart.items.indexOf(listingId);
            if (itemIndex > -1) {
                cart.items.splice(itemIndex, 1);
                await cart.save();
            }
        }
        
        res.redirect("/hairport/user/cart");
    } catch (e) {
        return next(new ExpressError(e.message, 500));
    }
};

// Update your exports at the bottom of the file to include it:
module.exports = { addToCart, viewCart, renderSchedule, placeOrder, removeFromCart };

