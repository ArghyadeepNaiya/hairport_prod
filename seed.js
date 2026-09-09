require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js'); // Ensure this path matches your structure

// Connect to your database
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/port')
.then(() => console.log('Database Connected for Seeding'))
.catch(err => console.log('Database Connection Error:', err));

const seedListings = [
    {
        "name": "Nail Art",
        "price": 99,
        "original_price": 199,
        "duration": "20 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Female",
        "category": "Nails & Art",
        "description": "Custom nail art designs – floral, geometric, minimalist or glitter patterns on natural nails.",
        "image": "/images/Red_Nails.webp",
        "processes": [
            "Cuticle Preparation",
            "Nail Shaping",
            "Base Coat Application",
            "Color/Art Application",
            "Top Coat & Curing"
        ]
    },
    {
        "name": "Temporary Nail Extension",
        "price": 299,
        "original_price": 499,
        "duration": "30 mins",
        "is_bestseller": false,
        "rating": 4.6,
        "gender": "Female",
        "category": "Nails & Art",
        "description": "Quick press-on nail extensions for events – easy application, no damage to natural nails.",
        "image": "/images/1) temporary nail extension.webp",
        "processes": [
            "Cuticle Preparation",
            "Nail Shaping",
            "Base Coat Application",
            "Color/Art Application",
            "Top Coat & Curing"
        ]
    },
    {
        "name": "Cat Eye Nail Extension",
        "price": 399,
        "original_price": 699,
        "duration": "45 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Female",
        "category": "Nails & Art",
        "description": "Magnetic cat eye gel polish with mesmerizing 3D shimmer effect that shifts with light.",
        "image": "/images/2) cat eye.webp",
        "processes": [
            "Cuticle Preparation",
            "Nail Shaping",
            "Base Coat Application",
            "Color/Art Application",
            "Top Coat & Curing"
        ]
    },
    {
        "name": "Gel Extension with Gel Polish",
        "price": 499,
        "original_price": 899,
        "duration": "60 mins",
        "is_bestseller": true,
        "rating": 4.8,
        "gender": "Female",
        "category": "Nails & Art",
        "description": "Full UV builder gel extensions with premium gel polish finish – lasts 3-4 weeks without chipping.",
        "image": "/images/3) Gel Extension with Gel Polish.webp",
        "processes": [
            "Cuticle Preparation",
            "Nail Shaping",
            "Base Coat Application",
            "Color/Art Application",
            "Top Coat & Curing"
        ]
    },
    {
        "name": "Acrylic Nail Extension with Gel Polish",
        "price": 599,
        "original_price": 999,
        "duration": "75 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Female",
        "category": "Nails & Art",
        "description": "Premium acrylic sculpted extensions with gel polish – strongest and longest lasting option for bridal & party looks.",
        "image": "/images/4) Acrylic Nail Extension with Gel Polish.webp",
        "processes": [
            "Cuticle Preparation",
            "Nail Shaping",
            "Base Coat Application",
            "Color/Art Application",
            "Top Coat & Curing"
        ]
    },
    {
        "name": "Highlights Per Streak",
        "price": 149,
        "original_price": 299,
        "duration": "20 mins",
        "is_bestseller": false,
        "rating": 4.6,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Single streak hair highlight with premium ammonia-free color – choose from blonde, caramel, burgundy or copper tones.",
        "image": "/images/Highlights_Per_Streak.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Global Hair Colour",
        "price": 1999,
        "original_price": 3499,
        "duration": "90 mins",
        "is_bestseller": true,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Full head global hair color transformation with L'Oreal / Schwarzkopf professional grade colours.",
        "image": "/images/Global_Hair_Colour.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Global Highlights",
        "price": 1999,
        "original_price": 3999,
        "duration": "120 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Full head multi-tone balayage or foil highlights for a sun-kissed dimensional look.",
        "image": "/images/Global_Highlights.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Olaplex Treatment",
        "price": 1999,
        "original_price": 3499,
        "duration": "60 mins",
        "is_bestseller": false,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Patented bond-building treatment that repairs broken disulfide bonds from chemical damage, heat, and coloring.",
        "image": "/images/Olaplex_Treatment.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Ammonia Free Root Touch Up",
        "price": 999,
        "original_price": 1499,
        "duration": "40 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Gentle ammonia-free root color coverage for grey hairs – safe for sensitive scalps.",
        "image": "/images/5_Ammonia_Free_Root_Touch_Up.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Root Touch Up",
        "price": 499,
        "original_price": 799,
        "duration": "30 mins",
        "is_bestseller": false,
        "rating": 4.6,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Quick root re-growth color application to match your existing shade – refreshes color in 30 minutes.",
        "image": "/images/6_Root_Touch_Up.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Hair Straightening",
        "price": 999,
        "original_price": 1999,
        "duration": "90 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Professional permanent hair straightening treatment for frizz-free, poker-straight hair lasting 4-6 months.",
        "image": "/images/7_Straightening.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Hair Smoothening",
        "price": 999,
        "original_price": 1999,
        "duration": "90 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Anti-frizz smoothening treatment for natural-looking smooth, shiny hair without the pin-straight effect.",
        "image": "/images/8_Smoothening.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Keratin Treatment",
        "price": 1999,
        "original_price": 3999,
        "duration": "120 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Formaldehyde-free protein infusion treatment that tames frizz, seals split ends, and delivers silk shine for up to 5 months.",
        "image": "/images/9_Keratin_Treatment.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Botox Treatment",
        "price": 2499,
        "original_price": 4499,
        "duration": "120 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Deep conditioning hair botox with collagen, hyaluronic acid, and vitamins to repair extreme damage and add volume.",
        "image": "/images/10_Botox_Treatment.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Nanoplastia Treatment",
        "price": 2999,
        "original_price": 5499,
        "duration": "150 mins",
        "is_bestseller": true,
        "rating": 5,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Latest-gen organic nanoplastia – combines amino acids and collagen for the most natural smoothing result. No formaldehyde.",
        "image": "/images/11_Nanoplastia.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Kerasmoothening Treatment",
        "price": 2999,
        "original_price": 5499,
        "duration": "150 mins",
        "is_bestseller": false,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Hair",
        "description": "Hybrid keratin + smoothening treatment for ultra-smooth, bouncy hair with natural volume retention.",
        "image": "/images/12_Kerasmoothening.webp",
        "processes": [
            "Consultation & Analysis",
            "Sectioning & Preparation",
            "Product Application",
            "Processing Time",
            "Rinse & Styling"
        ]
    },
    {
        "name": "Hair Spa",
        "price": 399,
        "original_price": 699,
        "duration": "45 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Spa",
        "description": "Deep conditioning hair spa with hot oil massage, steam therapy, and protein mask for nourished, dandruff-free hair.",
        "image": "/images/13_Hair_Spa.webp",
        "processes": [
            "Scalp Analysis",
            "Deep Cleanse Wash",
            "Massage Therapy",
            "Steam Treatment",
            "Blow Dry Finish"
        ]
    },
    {
        "name": "Female Hair Cut + D-Tan",
        "price": 299,
        "original_price": 499,
        "duration": "45 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Female",
        "category": "Combo Offers",
        "description": "Value combo – professional ladies hair cut with full face D-Tan for instant brightness.",
        "image": "/images/14_Female_Hair_Cut_D-Tan.webp",
        "processes": [
            "Consultation",
            "Service 1 Execution",
            "Service 2 Execution",
            "Final Polish & Check",
            "Post-care Advice"
        ]
    },
    {
        "name": "Female Hair Cut + Hair Spa",
        "price": 499,
        "original_price": 899,
        "duration": "60 mins",
        "is_bestseller": true,
        "rating": 4.8,
        "gender": "Female",
        "category": "Combo Offers",
        "description": "Complete hair care combo – trendy hair cut with deep conditioning hair spa treatment.",
        "image": "/images/15_Female_Hair_Cut_Hair_Spa.webp",
        "processes": [
            "Consultation",
            "Service 1 Execution",
            "Service 2 Execution",
            "Final Polish & Check",
            "Post-care Advice"
        ]
    },
    {
        "name": "D-Tan + Cleanup Combo",
        "price": 499,
        "original_price": 799,
        "duration": "50 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Female",
        "category": "Combo Offers",
        "description": "Sun-tan removal plus deep pore cleansing facial cleanup – the perfect skin refresh combo.",
        "image": "/images/16_D-Tan_Cleanup.webp",
        "processes": [
            "Consultation",
            "Service 1 Execution",
            "Service 2 Execution",
            "Final Polish & Check",
            "Post-care Advice"
        ]
    },
    {
        "name": "Pedicure + Manicure Combo",
        "price": 799,
        "original_price": 1299,
        "duration": "60 mins",
        "is_bestseller": true,
        "rating": 4.8,
        "gender": "Female",
        "category": "Combo Offers",
        "description": "Complete hand and foot pampering – includes soak, scrub, massage, cuticle care, and polish.",
        "image": "/images/17_Pedicure_Manicure_Combo.webp",
        "processes": [
            "Consultation",
            "Service 1 Execution",
            "Service 2 Execution",
            "Final Polish & Check",
            "Post-care Advice"
        ]
    },
    {
        "name": "D-Tan Pack",
        "price": 99,
        "original_price": 199,
        "duration": "20 mins",
        "is_bestseller": false,
        "rating": 4.6,
        "gender": "Unisex",
        "category": "D-Tan Packs",
        "description": "Instant sun-tan removal pack infused with Eucalyptus and Mint to restore natural complexion.",
        "image": "/images/18_D-Tan.webp",
        "processes": [
            "Cleansing",
            "D-Tan Pack Application",
            "Resting Period",
            "Gentle Scrub Removal",
            "Soothing Lotion"
        ]
    },
    {
        "name": "Korean Glow Facial",
        "price": 999,
        "original_price": 1999,
        "duration": "60 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Facials & Glow",
        "description": "10-step Korean skincare facial with double cleansing, essence, sheet mask, and glass skin finish serum.",
        "image": "/images/19_Korean_Facial.webp",
        "processes": [
            "Skin Cleansing",
            "Exfoliation",
            "Steam & Extraction",
            "Massage & Mask Application",
            "Toning & Moisturization"
        ]
    },
    {
        "name": "Red Wine Facial",
        "price": 999,
        "original_price": 1799,
        "duration": "50 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Facials & Glow",
        "description": "Anti-aging red wine extract facial rich in resveratrol antioxidants for firm, youthful, radiant skin.",
        "image": "/images/20_Red_Wine_Facial.webp",
        "processes": [
            "Skin Cleansing",
            "Exfoliation",
            "Steam & Extraction",
            "Massage & Mask Application",
            "Toning & Moisturization"
        ]
    },
    {
        "name": "Hydra Facial",
        "price": 799,
        "original_price": 1499,
        "duration": "60 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Facials & Glow",
        "description": "Medical-grade 6-step deep facial exfoliation, extraction, serum infusion, and RF tightening for instant radiant glass skin.",
        "image": "/images/21_Hydra_Facial.webp",
        "processes": [
            "Skin Cleansing",
            "Exfoliation",
            "Steam & Extraction",
            "Massage & Mask Application",
            "Toning & Moisturization"
        ]
    },
    {
        "name": "Fruit Facial",
        "price": 499,
        "original_price": 799,
        "duration": "40 mins",
        "is_bestseller": false,
        "rating": 4.6,
        "gender": "Unisex",
        "category": "Facials & Glow",
        "description": "Natural fruit enzyme facial with papaya, orange, and strawberry extracts for gentle brightening and hydration.",
        "image": "/images/22_Fruit_Facial.webp",
        "processes": [
            "Skin Cleansing",
            "Exfoliation",
            "Steam & Extraction",
            "Massage & Mask Application",
            "Toning & Moisturization"
        ]
    },
    {
        "name": "Cleanup",
        "price": 399,
        "original_price": 599,
        "duration": "30 mins",
        "is_bestseller": false,
        "rating": 4.5,
        "gender": "Unisex",
        "category": "Facials & Glow",
        "description": "Basic facial cleanup with cleansing, steaming, blackhead extraction, and moisturizing – perfect for regular maintenance.",
        "image": "/images/23_Cleanup.webp",
        "processes": [
            "Skin Cleansing",
            "Exfoliation",
            "Steam & Extraction",
            "Massage & Mask Application",
            "Toning & Moisturization"
        ]
    },
    {
        "name": "O3+ Facial",
        "price": 1499,
        "original_price": 2499,
        "duration": "60 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Facials & Glow",
        "description": "Professional O3+ whitening & brightening facial with vitamin C serum for luminous, even-toned skin.",
        "image": "/images/24_O3+_Facial.webp",
        "processes": [
            "Skin Cleansing",
            "Exfoliation",
            "Steam & Extraction",
            "Massage & Mask Application",
            "Toning & Moisturization"
        ]
    },
    {
        "name": "Kanpeki Facial",
        "price": 1499,
        "original_price": 2499,
        "duration": "60 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Facials & Glow",
        "description": "Japanese-inspired Kanpeki perfection facial with rice bran extract, sake enzyme, and green tea antioxidants.",
        "image": "/images/19_Korean_Facial.webp",
        "processes": [
            "Skin Cleansing",
            "Exfoliation",
            "Steam & Extraction",
            "Massage & Mask Application",
            "Toning & Moisturization"
        ]
    },
    {
        "name": "Casmara Facial",
        "price": 1999,
        "original_price": 3499,
        "duration": "75 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Facials & Glow",
        "description": "Luxury Spanish Casmara peel-off mask facial with marine collagen for instant lifting, firming, and deep hydration.",
        "image": "/images/24_O3+_Facial.webp",
        "processes": [
            "Skin Cleansing",
            "Exfoliation",
            "Steam & Extraction",
            "Massage & Mask Application",
            "Toning & Moisturization"
        ]
    },
    {
        "name": "Manicure + Pedicure",
        "price": 799,
        "original_price": 1299,
        "duration": "60 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Unisex",
        "category": "Mani-Pedi",
        "description": "Classic manicure and pedicure combo – includes soak, scrub, cuticle care, massage, and polish.",
        "image": "/images/17_Pedicure_Manicure_Combo.webp",
        "processes": [
            "Soak & Relax",
            "Cuticle & Callus Care",
            "Exfoliating Scrub",
            "Massage",
            "Polish Application"
        ]
    },
    {
        "name": "Crystal Manicure + Pedicure",
        "price": 999,
        "original_price": 1699,
        "duration": "75 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Mani-Pedi",
        "description": "Premium crystal salt soak manicure & pedicure with mineral-rich Himalayan crystals for deep skin softening.",
        "image": "/images/17_Pedicure_Manicure_Combo.webp",
        "processes": [
            "Soak & Relax",
            "Cuticle & Callus Care",
            "Exfoliating Scrub",
            "Massage",
            "Polish Application"
        ]
    },
    {
        "name": "Apple Manicure + Pedicure",
        "price": 1199,
        "original_price": 1999,
        "duration": "75 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Mani-Pedi",
        "description": "Apple cider vinegar infused mani-pedi for antifungal care, brightening, and ultra-smooth skin.",
        "image": "/images/29_Apple_Manicure_Pedicure.webp",
        "processes": [
            "Soak & Relax",
            "Cuticle & Callus Care",
            "Exfoliating Scrub",
            "Massage",
            "Polish Application"
        ]
    },
    {
        "name": "Gold Advanced Manicure + Pedicure",
        "price": 1499,
        "original_price": 2499,
        "duration": "90 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Mani-Pedi",
        "description": "Luxury gold dust infused mani-pedi with anti-aging gold mask, hot stone massage, and paraffin wax dip.",
        "image": "/images/30_Gold_Advanced_Manicure_Pedicure.webp",
        "processes": [
            "Soak & Relax",
            "Cuticle & Callus Care",
            "Exfoliating Scrub",
            "Massage",
            "Polish Application"
        ]
    },
    {
        "name": "Rica Wax Package (Full Hand + Full Leg + Underarm)",
        "price": 999,
        "original_price": 1799,
        "duration": "50 mins",
        "is_bestseller": true,
        "rating": 4.8,
        "gender": "Female",
        "category": "Waxing",
        "description": "Premium Italian RICA liposoluble wax – gentle on sensitive skin. Covers Full Arms, Full Legs & Underarms.",
        "image": "/images/31_Rica_Wax_Package_Full_Hand_Full_Leg_Underarm.webp",
        "processes": [
            "Skin Preparation",
            "Hot Wax Application",
            "Strip Removal",
            "Post-Wax Oil Massage",
            "Cooling Gel Application"
        ]
    },
    {
        "name": "Full Body Rica Wax",
        "price": 1499,
        "original_price": 2499,
        "duration": "75 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Female",
        "category": "Waxing",
        "description": "Complete full body RICA wax – arms, legs, underarms, and bikini line included.",
        "image": "/images/32_Full_Body_Rica_Wax.webp",
        "processes": [
            "Skin Preparation",
            "Hot Wax Application",
            "Strip Removal",
            "Post-Wax Oil Massage",
            "Cooling Gel Application"
        ]
    },
    {
        "name": "Full Face Wax",
        "price": 399,
        "original_price": 599,
        "duration": "20 mins",
        "is_bestseller": false,
        "rating": 4.6,
        "gender": "Female",
        "category": "Waxing",
        "description": "Complete face wax including upper lip, chin, sideburns, and forehead for smooth, hair-free skin.",
        "image": "/images/33_Full_Face_Wax.webp",
        "processes": [
            "Skin Preparation",
            "Hot Wax Application",
            "Strip Removal",
            "Post-Wax Oil Massage",
            "Cooling Gel Application"
        ]
    },
    {
        "name": "Normal Wax Package (Full Hand + Full Leg + Underarm)",
        "price": 499,
        "original_price": 799,
        "duration": "45 mins",
        "is_bestseller": false,
        "rating": 4.5,
        "gender": "Female",
        "category": "Waxing",
        "description": "Classic honey wax package – Full Arms, Full Legs & Underarms at an unbeatable price.",
        "image": "/images/34_Normal_Wax_Package_Full_Hand_Full_Leg_Underarm.webp",
        "processes": [
            "Skin Preparation",
            "Hot Wax Application",
            "Strip Removal",
            "Post-Wax Oil Massage",
            "Cooling Gel Application"
        ]
    },
    {
        "name": "Full Body Normal Wax",
        "price": 999,
        "original_price": 1599,
        "duration": "60 mins",
        "is_bestseller": false,
        "rating": 4.5,
        "gender": "Female",
        "category": "Waxing",
        "description": "Budget-friendly full body normal wax – arms, legs, underarms, and bikini line.",
        "image": "/images/35_Full_Body_Normal_Wax.webp",
        "processes": [
            "Skin Preparation",
            "Hot Wax Application",
            "Strip Removal",
            "Post-Wax Oil Massage",
            "Cooling Gel Application"
        ]
    },
    {
        "name": "Male D-Tan",
        "price": 99,
        "original_price": 199,
        "duration": "20 mins",
        "is_bestseller": false,
        "rating": 4.6,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Instant tan removal pack for men – perfect after outdoor sports, gym, or bike rides.",
        "image": "/images/36_Male_D-Tan.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Cleanup + D-Tan",
        "price": 499,
        "original_price": 799,
        "duration": "40 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Deep pore cleansing cleanup combined with D-Tan for fresh, bright, clean skin.",
        "image": "/images/37_Male_Cleanup_D-Tan.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Hair Spa + Hair Cut + D-Tan Combo",
        "price": 499,
        "original_price": 999,
        "duration": "60 mins",
        "is_bestseller": true,
        "rating": 4.8,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Best value men's combo – premium hair cut, deep conditioning spa, and face D-Tan in one session.",
        "image": "/images/38_Male_Hair_Spa_D-Tan_Face_Mask.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Hair Spa",
        "price": 299,
        "original_price": 499,
        "duration": "35 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Men's hair spa with anti-dandruff treatment, scalp massage, and protein conditioning.",
        "image": "/images/39_Male_Hair_Spa.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Straightening",
        "price": 999,
        "original_price": 1999,
        "duration": "75 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Professional men's hair straightening for sleek, manageable, frizz-free styling.",
        "image": "/images/40_Male_Straightening.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Smoothening",
        "price": 999,
        "original_price": 1999,
        "duration": "75 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Men's anti-frizz smoothening for natural-looking smooth hair without the flat effect.",
        "image": "/images/41_Male_Smoothening.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Keratin Treatment",
        "price": 1499,
        "original_price": 2999,
        "duration": "90 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Keratin protein treatment for men – tames curly/frizzy hair for 3-4 months of effortless styling.",
        "image": "/images/42_Male_Keratin.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Botox Treatment",
        "price": 1499,
        "original_price": 2999,
        "duration": "90 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Hair botox for men – deep repair for damaged, dry hair with collagen and hyaluronic acid.",
        "image": "/images/43_Male_Botox.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Nanoplastia",
        "price": 1999,
        "original_price": 3999,
        "duration": "120 mins",
        "is_bestseller": false,
        "rating": 4.9,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Organic nanoplastia for men – the latest smoothing technology for natural, long-lasting results.",
        "image": "/images/44_Male_Nanoplastia.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Manicure + Pedicure",
        "price": 799,
        "original_price": 1299,
        "duration": "50 mins",
        "is_bestseller": false,
        "rating": 4.6,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Men's grooming manicure & pedicure – nail care, callus removal, scrub, and moisturizing massage.",
        "image": "/images/Male_Manicure_Pedicure.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "Male Facial",
        "price": 499,
        "original_price": 899,
        "duration": "40 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Male",
        "category": "Men's Special",
        "description": "Men's deep cleansing facial with charcoal mask, blackhead extraction, and anti-pollution serum.",
        "image": "/images/Male_Facial.webp",
        "processes": [
            "Consultation",
            "Preparation",
            "Core Service Execution",
            "Cleansing/Wash",
            "Styling/Finishing"
        ]
    },
    {
        "name": "10 Premium Services Combo Package",
        "price": 4999,
        "original_price": 9999,
        "duration": "300 mins",
        "is_bestseller": true,
        "rating": 5,
        "gender": "Female",
        "category": "Bridal & Wedding",
        "description": "Ultimate bridal package – Full Body Wax, Hair Spa, Hair Cut, Mani+Pedi, Full Face Wax, Hydra Facial, Nail Extension with Gel Polish, Threading, Face D-Tan, Full Hand D-Tan.",
        "image": "/images/10_Premium_Services_Combo_Package.webp",
        "processes": [
            "Initial Consultation",
            "Pre-Bridal Treatments",
            "Base Preparation",
            "Detailed Styling/Makeup",
            "Final Setting"
        ]
    },
    {
        "name": "Party Makeup",
        "price": 1999,
        "original_price": 3499,
        "duration": "90 mins",
        "is_bestseller": false,
        "rating": 4.8,
        "gender": "Female",
        "category": "Bridal & Wedding",
        "description": "Professional party/event makeup with HD foundation, smokey eyes, false lashes, and basic hair styling.",
        "image": "/images/Party_Makeup.webp",
        "processes": [
            "Initial Consultation",
            "Pre-Bridal Treatments",
            "Base Preparation",
            "Detailed Styling/Makeup",
            "Final Setting"
        ]
    },
    {
        "name": "Bridal Makeup",
        "price": 4999,
        "original_price": 8999,
        "duration": "150 mins",
        "is_bestseller": true,
        "rating": 5,
        "gender": "Female",
        "category": "Bridal & Wedding",
        "description": "Flawless HD waterproof airbrush bridal makeup by senior artists – includes luxury false lashes, hair styling, and saree/dupatta draping.",
        "image": "/images/49_Bridal_Makeup.webp",
        "processes": [
            "Initial Consultation",
            "Pre-Bridal Treatments",
            "Base Preparation",
            "Detailed Styling/Makeup",
            "Final Setting"
        ]
    },
    {
        "name": "Bridal Facial",
        "price": 1499,
        "original_price": 2999,
        "duration": "75 mins",
        "is_bestseller": false,
        "rating": 4.9,
        "gender": "Female",
        "category": "Bridal & Wedding",
        "description": "Pre-wedding bridal glow facial with gold, diamond, and pearl extracts for luminous, camera-ready skin.",
        "image": "/images/50_Bridal_Facial.webp",
        "processes": [
            "Initial Consultation",
            "Pre-Bridal Treatments",
            "Base Preparation",
            "Detailed Styling/Makeup",
            "Final Setting"
        ]
    },
    {
        "name": "Bridal Nail Extension + Art + Gel Polish",
        "price": 999,
        "original_price": 1999,
        "duration": "90 mins",
        "is_bestseller": false,
        "rating": 4.9,
        "gender": "Female",
        "category": "Bridal & Wedding",
        "description": "Complete bridal nail package – gel/acrylic extensions with custom bridal art, crystals, and gel polish.",
        "image": "/images/51_Bridal_Nail_Extension_Art_Gel_Polish.webp",
        "processes": [
            "Initial Consultation",
            "Pre-Bridal Treatments",
            "Base Preparation",
            "Detailed Styling/Makeup",
            "Final Setting"
        ]
    },
    {
        "name": "Pre-Bridal Package",
        "price": 4999,
        "original_price": 8999,
        "duration": "240 mins",
        "is_bestseller": true,
        "rating": 5,
        "gender": "Female",
        "category": "Bridal & Wedding",
        "description": "Complete pre-bridal grooming – multiple session package including facials, body polishing, waxing, hair spa, and skin brightening treatments.",
        "image": "/images/52_Pre-Bridal_Package.webp",
        "processes": [
            "Initial Consultation",
            "Pre-Bridal Treatments",
            "Base Preparation",
            "Detailed Styling/Makeup",
            "Final Setting"
        ]
    },
    {
        "name": "Hairdresser Full Course",
        "price": 29999,
        "original_price": 45000,
        "duration": "43200 mins",
        "is_bestseller": true,
        "rating": 4.8,
        "gender": "Unisex",
        "category": "Academy",
        "description": "Complete training from basics to advanced. 3 Months - Monday to Friday. Master hair styling, coloring, and treatments.",
        "image": "/images/7_Straightening.webp",
        "processes": [
            "Theory Session",
            "Demonstration",
            "Practical Hands-on",
            "Feedback & Review",
            "Certification"
        ]
    },
    {
        "name": "Beautician Full Course",
        "price": 14999,
        "original_price": 25000,
        "duration": "43200 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Female",
        "category": "Academy",
        "description": "Master skin care essentials over 2 Months. Includes Skin Care, Facial, Waxing, Bleach, Manicure & Pedicure, and Hair Removal.",
        "image": "/images/21_Hydra_Facial.webp",
        "processes": [
            "Theory Session",
            "Demonstration",
            "Practical Hands-on",
            "Feedback & Review",
            "Certification"
        ]
    },
    {
        "name": "Nail Full Course",
        "price": 9999,
        "original_price": 15000,
        "duration": "21600 mins",
        "is_bestseller": false,
        "rating": 4.7,
        "gender": "Unisex",
        "category": "Academy",
        "description": "1 Month Intensive Course. Become a nail artist mastering Acrylics, UV Gels, 3D Art, and premium extensions.",
        "image": "/images/Nude_Beige_Nails.webp",
        "processes": [
            "Theory Session",
            "Demonstration",
            "Practical Hands-on",
            "Feedback & Review",
            "Certification"
        ]
    },
    {
        "name": "Makeup Full Course",
        "price": 9999,
        "original_price": 18000,
        "duration": "21600 mins",
        "is_bestseller": true,
        "rating": 4.9,
        "gender": "Unisex",
        "category": "Academy",
        "description": "1.5 Months Course. Professional makeup artistry covering Basic to Advanced, HD Makeup, Party, and Bridal styling.",
        "image": "/images/49_Bridal_Makeup.webp",
        "processes": [
            "Theory Session",
            "Demonstration",
            "Practical Hands-on",
            "Feedback & Review",
            "Certification"
        ]
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