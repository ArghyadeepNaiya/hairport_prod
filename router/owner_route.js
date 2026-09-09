// const express = require("express");
// const router = express.Router();
// const { renderLogin, verifyPin, renderDashboard, createListing, logoutOwner } = require("../controllers/ownerController.js");
// const { isOwner } = require("../middlewares/ownerAuth.js");

// router.get("/login", renderLogin);
// router.post("/login", verifyPin);

// router.get("/dashboard", isOwner, renderDashboard);
// router.post("/listing", isOwner, createListing);

// router.get("/logout", logoutOwner);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { renderLogin, verifyPin, renderDashboard, renderCreateListing, createListing, finishOrder, logoutOwner } = require("../controllers/ownerController.js");
const { isOwner } = require("../middlewares/ownerAuth.js");

router.get("/login", renderLogin);
router.post("/login", verifyPin);

router.get("/dashboard", isOwner, renderDashboard);

// New Routes for listing creation and finishing orders
router.get("/listing/new", isOwner, renderCreateListing);
router.post("/listing", isOwner, createListing);
router.put("/order/:id/finish", isOwner, finishOrder); 

router.get("/logout", logoutOwner);

module.exports = router;