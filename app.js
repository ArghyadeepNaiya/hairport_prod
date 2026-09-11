const express=require("express");
const app=express();
const databaseconnect = require('./config/config.js');

// Vercel Serverless best practice: ensure DB is connected before handling any route
app.use(async (req, res, next) => {
  try {
    await databaseconnect();
    next();
  } catch (err) {
    console.error("Database connection blocked route:", err);
    res.status(500).send("Database Connection Error. Check Vercel logs for the exact MongoServerError.");
  }
});

const error_handler = require("./middlewares/error_ware.js");
const path = require('path');
app.set('view engine', 'ejs'); 
// (Best Practice) Explicitly define where your EJS files live
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON body
app.use(express.static(path.join(__dirname, 'public')));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ownerRoutes = require('./router/owner_route.js');

const cookie_parser = require("cookie-parser");
app.use(cookie_parser()); // <-- CRITICAL: You must invoke the middleware
const userRoutes = require('./router/user_route.js');

app.use('/hairport/user', userRoutes);
app.use('/hairport/owner', ownerRoutes); 



app.get('/', (req, res) => {
  res.redirect('/hairport/user/home');
});


// 404 Handler
app.use((req, res, next) => {
    res.status(404).render('404.ejs');
});

app.use(error_handler);

module.exports = app;
