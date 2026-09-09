console.log("APP.JS LOADED FROM:", __filename);
const express=require("express");
const app=express();
const databaseconnect = require('./config/config.js');
databaseconnect();
const error_handler = require("./middlewares/error_ware.js");
const path = require('path');
app.set('view engine', 'ejs'); 
// (Best Practice) Explicitly define where your EJS files live
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); 
// (Optional but recommended) Parse incoming JSON data as well
app.use(express.static(path.join(__dirname, 'public')));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ownerRoutes = require('./router/owner_route.js');

const cookie_parser = require("cookie-parser");
app.use(cookie_parser()); // <-- CRITICAL: You must invoke the middleware
const userRoutes = require('./router/user_route.js');

app.use('/hairport/user', userRoutes);
app.use('/hairport/owner', ownerRoutes); 



app.use('/', (req, res) => {
  res.status(200).json({ data: 'JWTauth server ;)' });
});



app.use(error_handler);

module.exports = app;
