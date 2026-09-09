require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/port')
.then(() => console.log('Database Connected for Academy Seeding'))
.catch(err => console.log('Error:', err));

const academyCourses = [
    {
        name: "Hairdresser Full Course",
        price: 29999,
        original_price: 45000,
        duration: "1 Months",
        is_bestseller: true,
        gender: "All Genders",
        category: "Academy",
        description: "Complete training from basics to advanced. 3 Months - Monday to Friday. Master hair styling, coloring, and treatments.",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Beautician Full Course",
        price: 14999,
        original_price: 25000,
        duration: "1 Months",
        is_bestseller: true,
        gender: "All Genders",
        category: "Academy",
        description: "Master skin care essentials over 2 Months. Includes Skin Care, Facial, Waxing, Bleach, Manicure & Pedicure, and Hair Removal.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Nail Full Course",
        price: 9999,
        original_price: 15000,
        duration: "Special Course",
        is_bestseller: false,
        gender: "All Genders",
        category: "Academy",
        description: "1 Month Intensive Course. Become a nail artist mastering Acrylics, UV Gels, 3D Art, and premium extensions.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Makeup Full Course",
        price: 9999,
        original_price: 18000,
        duration: "Special Course",
        is_bestseller: true,
        gender: "All Genders",
        category: "Academy",
        description: "1.5 Months Course. Professional makeup artistry covering Basic to Advanced, HD Makeup, Party, and Bridal styling.",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=60"
    }
];

const seedDB = async () => {
    await Listing.deleteMany({ category: 'Academy' });
    await Listing.insertMany(academyCourses);
    console.log("Successfully seeded 4 Academy Courses!");
    mongoose.connection.close();
};
seedDB();