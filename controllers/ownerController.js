// const Listing = require('../models/listing.js');
// const jwt = require("jsonwebtoken");

// const renderLogin = (req, res) => {
//     res.render("owner/login.ejs");
// };

// const verifyPin = (req, res) => {
//     const { pin } = req.body;
    
//     if (pin === '8009') {
//         const token = jwt.sign({ role: 'owner' }, process.env.SUPERSECRET, { expiresIn: "1d" });
//         res.cookie("owner_token", token, { httpOnly: true });
//         return res.redirect("/hairport/owner/dashboard");
//     }
//     // If PIN is wrong, reload the page
//     res.redirect("hairport/owner/dashboard");
// };

// const renderDashboard = (req, res) => {
//     res.render("owner/dashboard.ejs");
// };

// const createListing = async (req, res, next) => {
//     try {
//         const newListing = new Listing({
//             name: req.body.name,
//             price: req.body.price,
//             rating: req.body.rating,
//             gender: req.body.gender,
//             category: req.body.category,
//             description: req.body.description,
//             image: req.body.image
//         });
        
//         await newListing.save();
//         res.redirect("/hairport/owner/dashboard");
//     } catch (err) {
//         console.error("Listing Creation Error:", err);
//         res.status(500).send("Error creating listing. Check terminal for details.");
//     }
// };

// const logoutOwner = (req, res) => {
//     res.cookie("owner_token", "", { maxAge: 0 });
//     res.redirect("/hairport/owner/login");
// };

// module.exports = {
//     renderLogin,
//     verifyPin,
//     renderDashboard,
//     createListing,
//     logoutOwner
// };


const Listing = require('../models/listing.js');
const Order = require('../models/order.js'); // <-- Added Order model
const jwt = require("jsonwebtoken");

const renderLogin = (req, res) => {
    res.render("owner/login.ejs");
};

const verifyPin = (req, res) => {
    const { pin } = req.body;
    
    if (pin === '8009') {
        const token = jwt.sign({ role: 'owner' }, process.env.SUPERSECRET, { expiresIn: "1d" });
        res.cookie("owner_token", token, { httpOnly: true });
        return res.redirect("/hairport/owner/dashboard");
    }
    res.redirect("/hairport/owner/login");
};

const renderDashboard = async (req, res) => {
    try {
        // Fetch all orders and populate user data to see customer details
        const orders = await Order.find({}).populate('user items').sort({createdAt: -1});
        res.render("owner/dashboard.ejs", { orders });
    } catch(e) {
        console.error(e);
        res.status(500).send("Error loading dashboard");
    }
};

const renderCreateListing = (req, res) => {
    res.render("owner/create_listing.ejs");
};

const createListing = async (req, res, next) => {
    try {
        const newListing = new Listing({
            name: req.body.name,
            price: req.body.price,
            rating: req.body.rating,
            gender: req.body.gender,
            category: req.body.category,
            description: req.body.description,
            image: req.body.image
        });
        
        await newListing.save();
        res.redirect("/hairport/owner/dashboard");
    } catch (err) {
        console.error("Listing Creation Error:", err);
        res.status(500).send("Error creating listing. Check terminal for details.");
    }
};

const finishOrder = async (req, res) => {
    try {
        const { id } = req.params;
        // Deleting the order removes it from both the owner and user dashboards
        await Order.findByIdAndDelete(id);
        res.redirect("/hairport/owner/dashboard");
    } catch (e) {
        console.error(e);
        res.status(500).send("Error finishing order");
    }
};

const logoutOwner = (req, res) => {
    res.cookie("owner_token", "", { maxAge: 0 });
    res.redirect("/hairport/owner/login");
};

module.exports = {
    renderLogin,
    verifyPin,
    renderDashboard,
    renderCreateListing,
    createListing,
    finishOrder,
    logoutOwner
};