const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
async function check() {
    await mongoose.connect('mongodb://127.0.0.1:27017/port');
    const listing = await Listing.findOne();
    console.log(listing.processes);
    mongoose.disconnect();
}
check();
