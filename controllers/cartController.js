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
        
        const listing = await Listing.findById(listingId);
        if (listing && listing.category === 'Academy') {
            // Check if already in cart
            if (cart.items.some(item => item.toString() === listingId.toString())) {
                return res.redirect(req.get('Referrer') || '/hairport/user/home');
            }
            
            // Check if already purchased
            const orders = await Order.find({ user: userId, status: { $ne: 'Cancelled' } });
            const purchasedItemIds = orders.flatMap(order => order.items.map(id => id.toString()));
            if (purchasedItemIds.includes(listingId.toString())) {
                return res.redirect(req.get('Referrer') || '/hairport/user/home');
            }
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
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate('items');
        let subtotal = 0;
        let groupedItems = [];
        
        if (cart && cart.items.length > 0) {
            cart.items.forEach(item => subtotal += item.price);
            
            const itemMap = new Map();
            cart.items.forEach(item => {
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
        res.render("schedule.ejs", { subtotal, groupedItems });
    } catch (e) {
        return next(new ExpressError(e.message, 500));
    }
};

const placeOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { location, date, time, remark } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate('items');
        if (!cart || cart.items.length === 0) {
            return res.redirect("/hairport/user/home");
        }

        if (!date || !time || !location) {
            return next(new ExpressError('Please select a location, date, and time.', 400));
        }

        // Validate that the date is within the next 7 days
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // start of today
        
        const maxDate = new Date(today);
        maxDate.setDate(maxDate.getDate() + 7); // 7 days from today
        maxDate.setHours(23, 59, 59, 999); // end of the 7th day
        
        if (selectedDate < today || selectedDate > maxDate) {
            return next(new ExpressError('Bookings must be scheduled within the next 7 days.', 400));
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
            total,
            remark
        });

        await newOrder.save();
        
        // --- WHATSAPP NOTIFICATION LOGIC ---
        
        // Group items for message (e.g. Haircut (2))
        const itemMap = new Map();
        cart.items.forEach(item => {
            const idStr = item._id.toString();
            if (itemMap.has(idStr)) {
                itemMap.get(idStr).quantity += 1;
            } else {
                itemMap.set(idStr, { name: item.name, price: item.price, quantity: 1 });
            }
        });
        
        let itemsString = '';
        itemMap.forEach(g => {
            itemsString += `- ${g.name} (${g.quantity}) - Rs. ${g.price * g.quantity}\n`;
        });

        const ownerPhone = process.env.OWNER_PHONE_NUMBER;
        if (ownerPhone && ownerPhone !== "YOUR_OWNER_PHONE_NUMBER_HERE") {
            const ownerMsg = `*New Booking Alert*\n\n` +
                `Customer: ${user.username} (${user.phone})\n` +
                `Location: ${location}\n` +
                `Date: ${date}\n` +
                `Time: ${time}\n\n` +
                `*Items Booked:*\n${itemsString}\n` +
                `*Cost Breakdown:*\n` +
                `Subtotal: Rs. ${subtotal}\n` +
                `Discount: Rs. ${discount}\n` +
                `*Total Paid: Rs. ${total}*\n` +
                (remark ? `\nRemark: ${remark}` : ``);
            
            require('../utils/whatsappService').sendWhatsAppMessage(ownerPhone, ownerMsg);
        }

        if (user.phone) {
            const userMsg = `*Booking Confirmed*\n\n` +
                `Hi ${user.username}, your appointment at Ranchi Hair Port is confirmed.\n\n` +
                `Location: ${location}\n` +
                `Date: ${date}\n` +
                `Time: ${time}\n\n` +
                `*Your Items:*\n${itemsString}\n` +
                `*Cost Breakdown:*\n` +
                `Subtotal: Rs. ${subtotal}\n` +
                `Discount: Rs. ${discount}\n` +
                `*Total Paid: Rs. ${total}*\n\n` +
                `See you soon!`;
            
            require('../utils/whatsappService').sendWhatsAppMessage(user.phone, userMsg);
        }
        
        // -----------------------------------

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

