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
    
    if (pin === process.env.OWNER_PIN) {
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
        
        // Group orders by user
        const groupedOrders = {};
        for (let order of orders) {
            // Skip if no user populated
            if (!order.user) continue; 
            
            const userId = order.user._id.toString();
            if (!groupedOrders[userId]) {
                groupedOrders[userId] = {
                    user: order.user,
                    active: [],
                    finished: []
                };
            }
            
            if (order.status === 'Completed' || order.status === 'Cancelled' || order.status === 'Rejected') {
                groupedOrders[userId].finished.push(order);
            } else {
                groupedOrders[userId].active.push(order);
            }
        }

        res.render("owner/dashboard.ejs", { groupedOrders });
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
        // Updating the order status retains it for history
        await Order.findByIdAndUpdate(id, { status: 'Completed' });
        res.redirect("/hairport/owner/dashboard");
    } catch (e) {
        console.error(e);
        res.status(500).send("Error finishing order");
    }
};

const rejectOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndUpdate(orderId, { status: 'Rejected' });
        res.redirect("/hairport/owner/dashboard");
    } catch (e) {
        console.error(e);
        res.status(500).send("Error rejecting order");
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
    rejectOrder,
    logoutOwner
};