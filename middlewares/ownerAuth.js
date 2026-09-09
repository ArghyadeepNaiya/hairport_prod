const jwt = require("jsonwebtoken");

const isOwner = (req, res, next) => {
    const token = (req.cookies && req.cookies.owner_token) || null;
    
    if (!token) {
        return res.redirect("/hairport/owner/login"); 
    }
    
    try {
        const payload = jwt.verify(token, process.env.SUPERSECRET);
        if (payload.role !== 'owner') throw new Error("Unauthorized");
        next();
    } catch (err) {
        res.cookie("owner_token", "", { maxAge: 0 });
        return res.redirect("/hairport/owner/login");
    }
}

module.exports = { isOwner };