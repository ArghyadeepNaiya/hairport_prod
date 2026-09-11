// Example Express Route for Signup (e.g., in app.js or routes/auth.js)
const express = require('express');
const Order = require('../models/order.js');
const Customer = require('../models/user.js'); 
const JWT=require("jsonwebtoken");
const email_validator=require("email-validator");
const ExpressError=require("../utils/error.js");
const bcrypt=require("bcryptjs");
const Listing = require('../models/listing.js');


const Cart = require('../models/cart.js');

const homepage = async (req, res, next) => {
    try {
        const targetCategory = req.query.category || 'All Services';
        const targetGender = req.query.gender || 'All Genders';
        const searchQuery = req.query.search;
        const currentSort = req.query.sort || 'popular';
        const currentOffers = req.query.offers || 'false';
        
        // 1. Pagination Setup (9 items per page)
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const skip = (page - 1) * limit;
        
        let query = {};
        
        if (targetCategory !== 'All Services') query.category = targetCategory;
        if (targetGender === 'Female') query.gender = { $in: ['Female', 'Unisex', 'All Genders'] };
        else if (targetGender === 'Male') query.gender = { $in: ['Male', 'Unisex', 'All Genders'] };
        
        if (searchQuery) {
            query.$or = [
                { name: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ];
        }
        
        if (currentOffers === 'true') {
            query.original_price = { $exists: true, $gt: 0 };
        }
        
        let sortOptions = {};
        if (currentSort === 'price_low') sortOptions.price = 1;
        else if (currentSort === 'price_high') sortOptions.price = -1;
        else if (currentSort === 'rating') sortOptions.rating = -1;
        else sortOptions = { is_bestseller: -1, rating: -1 }; // Default popular
        
        // 2. Fetch total count and limited listings
        const totalListings = await Listing.countDocuments(query);
        const totalPages = Math.ceil(totalListings / limit);
        const all_listings = await Listing.find(query).sort(sortOptions).skip(skip).limit(limit);
        
        let cartItemCount = 0;
        let cartTotal = 0;
        let userSubscribed = false;
        let cartItems = [];

        let isLoggedIn = false;
        if (req.cookies && req.cookies.token) {
            try {
                const decoded = JWT.verify(req.cookies.token, process.env.SUPERSECRET || 'your_secret_key');
                const userId = decoded._id || decoded.id; 
                const user = await Customer.findById(userId);
                if (user) {
                    isLoggedIn = true;
                    userSubscribed = (user.has_subscription === 'yes');
                    const cart = await Cart.findOne({ user: userId }).populate('items');
                    if (cart && cart.items.length > 0) {
                        cartItemCount = cart.items.length;
                        cartItems = cart.items;
                        cart.items.forEach(item => cartTotal += item.price);
                    }
                }
            } catch (err) {}
        }

        if (!isLoggedIn && req.cookies && req.cookies.guestCart) {
            try {
                const guestCart = JSON.parse(req.cookies.guestCart);
                if (Array.isArray(guestCart) && guestCart.length > 0) {
                    cartItemCount = guestCart.length;
                    const fetchedItems = await Listing.find({ _id: { $in: guestCart } });
                    const itemsMap = {};
                    fetchedItems.forEach(item => itemsMap[item._id.toString()] = item);
                    cartItems = guestCart.map(id => itemsMap[id]).filter(Boolean);
                    cartItems.forEach(item => cartTotal += item.price);
                }
            } catch(e) {}
        }
        
        res.render("index.ejs", { 
            all_listings, 
            currentCategory: targetCategory,
            currentGender: targetGender,
            searchQuery: searchQuery || '',
            currentSort: currentSort,
            currentOffers: currentOffers,
            cartItemCount,
            cartTotal,
            cartItems,
            userSubscribed,
            isLoggedIn,
            currentPage: page,      // Passing pagination data to EJS
            totalPages: totalPages,
            totalListings: totalListings
        });
    } catch(e) {
        return next(new ExpressError(e.message, 500));
    }  
}

const adduser=async(req,res,next)=>{
    try{
        res.render("signup.ejs")
    }
    catch(e){
        return next(new ExpressError("the form cound not be rendered",500))
    }
}

const signup=async (req,res,next)=>{
    console.log("SIGNUP LOADED FROM:", __filename);
    console.log("typeof next:", typeof next);
    const {username,phone,email,password,confirmPassword}=req.body;
    if(!username || !phone || !email || !password || !confirmPassword ){
        return next(new ExpressError("all the feilds are required ",400));
    }
    const validate=email_validator.validate(email);
    if(!validate){
        return next(new ExpressError("please provide a valid email address",400));
    }
    try{
        const user=await Customer.findOne({email:email});
        if(user){
            return next(new ExpressError("the user already exists",402));
        }
        if(password !== confirmPassword){
            return next(new ExpressError("Password and Confirm Password must match", 400));
        }
        const new_user=new Customer({
            username:username,
            phone:phone,
            email:email,
            password:password,
        })
        await new_user.save();   
        res.redirect("/hairport/user/login");  
    }
    catch(e){
        return next(new ExpressError(e.message,500));
    }
}

const login=async(req,res,next)=>{
    console.log("WHAT THE BROWSER SENT:", req.body); 
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ExpressError("all the feilds are required",400));
    }
    const validate=email_validator.validate(email);
    if(!validate){
        return next(new ExpressError("please provide a valid email address",400));
    }
    try{
        const user=await Customer.findOne({email:email}).select("+password");
        if(!user){
            return next(new ExpressError("user does not exists",400));
        }
        if(!(await bcrypt.compare(password,user.password))){
            return next(new ExpressError("the password entered and the password in database does not match",402));
        }
        const token=user.jwtToken();
        user.password=undefined;
        const cookieoption={
            maxAge:24*60*60*1000*30,
            httpOnly:true
        }
        res.cookie("token",token,cookieoption);

        // --- Merge guest cart into user cart ---
        if (req.cookies && req.cookies.guestCart) {
            try {
                const guestCart = JSON.parse(req.cookies.guestCart);
                if (Array.isArray(guestCart) && guestCart.length > 0) {
                    let cart = await Cart.findOne({ user: user._id });
                    if (!cart) cart = new Cart({ user: user._id, items: [] });
                    cart.items.push(...guestCart);
                    await cart.save();
                }
                res.cookie('guestCart', '', { maxAge: 0 });
            } catch(e) {}
        }
        
        res.redirect("/hairport/user/home");
        // res.status(200).json({ success: true, message: "Logged in successfully!" });
    }
    catch(e){
        return next(new ExpressError(e.message,500));
    }
}

const logout=async(req,res,next)=>{
    try{
        const cookieOption = {
            expires: new Date(), // current expiry date
            httpOnly: true //  not able to modify  the cookie in client side
        };
        res.cookie("token",null,cookieOption);
        res.redirect("/hairport/user/signup");
    }
    catch(e){
        return next(new ExpressError(e,500));
    }
}


const profile = async (req, res, next) => {
    try {
        const user = await Customer.findById(req.user._id);
        if (!user) return res.redirect("/hairport/user/signup");
        
        // Fetch user's orders and populate the services
        const orders = await Order.find({ user: user._id }).populate('items').sort({createdAt: -1});
        
        res.render("profile.ejs", { user, orders }); 
    } catch (e) {
        return next(new ExpressError(e.message, 500));
    }
}

const renderAcademy = async (req, res, next) => {
    try {
        const academy_listings = await Listing.find({ category: 'Academy' });
        
        let cartItemCount = 0;
        let cartTotal = 0;
        let userSubscribed = false;
        let cartItemIds = [];
        let purchasedItemIds = [];

        let isLoggedIn = false;
        if (req.cookies && req.cookies.token) {
            try {
                const decoded = JWT.verify(req.cookies.token, process.env.SUPERSECRET);
                const user = await Customer.findById(decoded._id || decoded.id);
                if (user) {
                    isLoggedIn = true;
                    userSubscribed = (user.has_subscription === 'yes');
                    const cart = await Cart.findOne({ user: user._id }).populate('items');
                    if (cart && cart.items.length > 0) {
                        cartItemCount = cart.items.length;
                        cart.items.forEach(item => cartTotal += item.price);
                        cartItemIds = cart.items.map(item => item._id.toString());
                    }
                    
                    const orders = await Order.find({ user: user._id, status: { $ne: 'Cancelled' } });
                    purchasedItemIds = orders.flatMap(order => order.items.map(id => id.toString()));
                }
            } catch (err) { }
        }

        if (!isLoggedIn && req.cookies && req.cookies.guestCart) {
            try {
                const guestCart = JSON.parse(req.cookies.guestCart);
                if (Array.isArray(guestCart) && guestCart.length > 0) {
                    cartItemCount = guestCart.length;
                    const fetchedItems = await Listing.find({ _id: { $in: guestCart } });
                    const itemsMap = {};
                    fetchedItems.forEach(item => itemsMap[item._id.toString()] = item);
                    const parsedCartItems = guestCart.map(id => itemsMap[id]).filter(Boolean);
                    parsedCartItems.forEach(item => cartTotal += item.price);
                    cartItemIds = guestCart;
                }
            } catch(e) {}
        }
        
        res.render("academy.ejs", { academy_listings, cartItemCount, cartTotal, userSubscribed, cartItemIds, purchasedItemIds });
    } catch(e) {
        return next(new ExpressError(e.message, 500));
    }
};


module.exports = {
    homepage:homepage,
    signup:signup,
    login:login,
    logout:logout,
    profile:profile,
    adduser:adduser,
    renderAcademy:renderAcademy
};