const jWT=require("jsonwebtoken");
const ExpressError = require("../utils/error");
const Customer=require("../models/user.js");

const isLoggedIn = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null;
    
    // If no token exists, REDIRECT AND RETURN immediately to stop execution
    if (!token) {
        return res.redirect("/hairport/user/signup"); 
    }
    
    try {
        // Verify the token safely inside a try-catch block
        const payload = jWT.verify(token, process.env.SUPERSECRET);
        req.user = { email: payload.email, _id: payload._id };
        next();
    } catch (err) {
        // If the token is invalid, tampered with, or expired, clear it and redirect
        res.cookie("token", "", { maxAge: 0 });
        return res.redirect("/hairport/user/signup");
    }
}

module.exports={
    isLoggedIn:isLoggedIn,
};