require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js'); // Ensure this path matches your structure

// Connect to your database
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/port')
.then(() => console.log('Database Connected for Seeding'))
.catch(err => console.log('Database Connection Error:', err));

const seedListings = [
    // --- NAILS ---
    {
        name: "Nail Art",
        price: 99,
        rating: 4.7,
        gender: "Female",
        category: "Nails & Art",
        description: "Custom nail art designs - floral, geometric, minimalist or glitter patterns on natural nails.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Cat Eye Nail Extension",
        price: 399,
        rating: 4.8,
        gender: "Female",
        category: "Nails & Art",
        description: "Magnetic cat eye gel polish with mesmerizing 3D shimmer effect that shifts in the light.",
        image: "https://images.unsplash.com/photo-1595868846995-1f92e59df92a?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Gel Extension with Gel Polish",
        price: 499,
        rating: 4.8,
        gender: "Female",
        category: "Nails & Art",
        description: "Full UV builder gel extensions with premium gel polish finish - lasts 3-4 weeks.",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Acrylic Nail Extension with Gel Polish",
        price: 599,
        rating: 4.9,
        gender: "Female",
        category: "Nails & Art",
        description: "Premium acrylic sculpted extensions with gel polish - strongest and longest lasting extensions.",
        image: "https://images.unsplash.com/photo-1632832598801-b753f2c5eeb8?auto=format&fit=crop&w=500&q=60"
    },

    // --- HAIR & SPA ---
    {
        name: "Global Hair Colour",
        price: 1999,
        rating: 4.8,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Full head global hair color transformation with L'Oreal / Schwarzkopf professional colors.",
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Global Highlights",
        price: 1999,
        rating: 4.9,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Full head multi-tone balayage or foil highlights for a sun-kissed dimensional look.",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Olaplex Treatment",
        price: 1999,
        rating: 4.9,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Patented bond-building treatment that repairs broken disulfide bonds from chemical damage.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Hair Straightening",
        price: 999,
        rating: 4.7,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Professional permanent hair straightening treatment for frizz-free, poker-straight hair.",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Hair Smoothening",
        price: 999,
        rating: 4.8,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Anti-frizz smoothening treatment for natural-looking smooth, shiny hair without stiffness.",
        image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Keratin Treatment",
        price: 1999,
        rating: 4.9,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Formaldehyde-free protein infusion treatment that tames frizz, seals split ends, and adds shine.",
        image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Botox Treatment",
        price: 2499,
        rating: 4.9,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Deep conditioning hair botox with collagen, hyaluronic acid, and vitamins to restore vitality.",
        image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Nanoplastia Treatment",
        price: 2999,
        rating: 5,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Latest-gen organic nanoplastia - combines amino acids and collagen for the most glossy finish.",
        image: "https://images.unsplash.com/photo-1616853508492-23c21c172d7f?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Hair Spa",
        price: 399,
        rating: 4.8,
        gender: "Unisex",
        category: "Hair & Spa",
        description: "Deep conditioning hair spa with hot oil massage, steam therapy, and protein mask.",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=500&q=60"
    },

    // --- COMBO OFFERS ---
    {
        name: "Female Hair Cut + D-Tan",
        price: 299,
        rating: 4.7,
        gender: "Female",
        category: "Combo Offers",
        description: "Value combo - professional ladies hair cut with full face D-Tan for instant brightness.",
        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Female Hair Cut + Hair Spa",
        price: 499,
        rating: 4.8,
        gender: "Female",
        category: "Combo Offers",
        description: "Complete hair care combo - trendy hair cut with deep conditioning hair spa treatment.",
        image: "https://images.unsplash.com/photo-1633526131435-0ab854b73b22?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Pedicure + Manicure Combo",
        price: 799,
        rating: 4.8,
        gender: "Female",
        category: "Combo Offers",
        description: "Complete hand and foot pampering - includes soak, scrub, massage, cuticle care, and polish.",
        image: "https://images.unsplash.com/photo-1516975080661-46bfa33f9dd4?auto=format&fit=crop&w=500&q=60"
    },

    // --- D-TAN PACKS ---
    {
        name: "D-Tan Pack",
        price: 99,
        rating: 4.6,
        gender: "Unisex",
        category: "D-Tan Packs",
        description: "Instant sun-tan removal pack infused with Eucalyptus and Mint to restore natural skin tone.",
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=500&q=60"
    },

    // --- FACIALS & GLOW ---
    {
        name: "Korean Glow Facial",
        price: 999,
        rating: 4.9,
        gender: "Unisex",
        category: "Facials & Glow",
        description: "10-step Korean skincare facial with double cleansing, essence, sheet mask, and glass skin finish.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Hydra Facial",
        price: 799,
        rating: 4.9,
        gender: "Unisex",
        category: "Facials & Glow",
        description: "Medical-grade 6-step deep facial exfoliation, extraction, serum infusion, and hydration.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "O3+ Facial",
        price: 1499,
        rating: 4.8,
        gender: "Unisex",
        category: "Facials & Glow",
        description: "Professional O3+ whitening & brightening facial with vitamin C serum for luminous skin.",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Casmara Facial",
        price: 1999,
        rating: 4.9,
        gender: "Unisex",
        category: "Facials & Glow",
        description: "Luxury Spanish Casmara peel-off mask facial with marine collagen for instant firmness.",
        image: "https://images.unsplash.com/photo-1596755389378-c11dde0103bb?auto=format&fit=crop&w=500&q=60"
    },

    // --- MANI-PEDI ---
    {
        name: "Manicure + Pedicure",
        price: 799,
        rating: 4.7,
        gender: "Unisex",
        category: "Mani-Pedi",
        description: "Classic manicure and pedicure combo - includes soak, scrub, cuticle care, massage, and polish.",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Crystal Manicure + Pedicure",
        price: 999,
        rating: 4.8,
        gender: "Unisex",
        category: "Mani-Pedi",
        description: "Premium crystal salt soak manicure & pedicure with mineral-rich Himalayan scrubs.",
        image: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Gold Advanced Manicure + Pedicure",
        price: 1499,
        rating: 4.9,
        gender: "Unisex",
        category: "Mani-Pedi",
        description: "Luxury gold dust infused mani-pedi with anti-aging gold mask, hot stone massage, and serum.",
        image: "https://images.unsplash.com/photo-1599733594230-6b823276abce?auto=format&fit=crop&w=500&q=60"
    },

    // --- WAXING ---
    {
        name: "Rica Wax Package (Full Hand + Full Leg + Underarm)",
        price: 999,
        rating: 4.8,
        gender: "Female",
        category: "Waxing",
        description: "Premium Italian RICA liposoluble wax - gentle on sensitive skin and removes tan effectively.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Full Body Rica Wax",
        price: 1499,
        rating: 4.8,
        gender: "Female",
        category: "Waxing",
        description: "Complete full body RICA wax - arms, legs, underarms, and bikini line included.",
        image: "https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=500&q=60"
    },

    // --- MEN'S SPECIAL ---
    {
        name: "Male D-Tan",
        price: 99,
        rating: 4.6,
        gender: "Male",
        category: "Men's Special",
        description: "Instant tan removal pack for men - perfect after outdoor sports, gym, or bike rides.",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=500&q=60"
    }
];

const seedDB = async () => {
    try {
        await Listing.deleteMany({});
        console.log('Old listings cleared.');
        await Listing.insertMany(seedListings);
        console.log(`Successfully seeded ${seedListings.length} listings!`);
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();