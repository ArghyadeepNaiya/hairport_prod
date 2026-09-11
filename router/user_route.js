const express=require("express")
const {homepage,signup,login,logout,profile,adduser,renderAcademy}=require("../controllers/authController.js");
const {isLoggedIn}=require("../middlewares/auth.js");
const router=express.Router();

router.get("/home",homepage);
router.get("/academy", renderAcademy);
router.get("/signup",adduser);
router.post("/signup",signup);
router.get("/login",(req,res)=>{
    res.render("login.ejs");
});
router.post("/login", login);
router.get("/forgot", (req, res) => {
    res.render("user/forgot_password.ejs"); 
});
router.get("/privacy", (req, res) => {
    res.render("privacy.ejs");
});
router.get("/terms", (req, res) => {
    res.render("terms.ejs");
});
router.get("/info", (req, res) => {
    res.render("info.ejs");
});
router.get("/profile",isLoggedIn,profile);
// Add this import at the top
const { addToCart, viewCart, renderSchedule, placeOrder,removeFromCart } = require("../controllers/cartController.js");

// Add these routes near the bottom, before module.exports
router.post("/cart/add/:id", addToCart);
router.post("/cart/remove/:id", removeFromCart);
router.get("/cart", viewCart);
router.get("/cart/schedule", renderSchedule);
router.post("/cart/book", isLoggedIn, placeOrder);


router.get("/logout",isLoggedIn,logout);


module.exports=router;
