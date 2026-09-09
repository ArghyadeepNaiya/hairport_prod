const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

const processMap = {
    'Hair': ['Consultation & Analysis', 'Sectioning & Preparation', 'Product Application', 'Processing Time', 'Rinse & Styling'],
    'Spa': ['Scalp Analysis', 'Deep Cleanse Wash', 'Massage Therapy', 'Steam Treatment', 'Blow Dry Finish'],
    'Facials & Glow': ['Skin Cleansing', 'Exfoliation', 'Steam & Extraction', 'Massage & Mask Application', 'Toning & Moisturization'],
    'Nails & Art': ['Cuticle Preparation', 'Nail Shaping', 'Base Coat Application', 'Color/Art Application', 'Top Coat & Curing'],
    'Mani-Pedi': ['Soak & Relax', 'Cuticle & Callus Care', 'Exfoliating Scrub', 'Massage', 'Polish Application'],
    'D-Tan Packs': ['Cleansing', 'D-Tan Pack Application', 'Resting Period', 'Gentle Scrub Removal', 'Soothing Lotion'],
    'Waxing': ['Skin Preparation', 'Hot Wax Application', 'Strip Removal', 'Post-Wax Oil Massage', 'Cooling Gel Application'],
    'Combo Offers': ['Consultation', 'Service 1 Execution', 'Service 2 Execution', 'Final Polish & Check', 'Post-care Advice'],
    "Men's Special": ['Consultation', 'Preparation', 'Core Service Execution', 'Cleansing/Wash', 'Styling/Finishing'],
    'Bridal & Wedding': ['Initial Consultation', 'Pre-Bridal Treatments', 'Base Preparation', 'Detailed Styling/Makeup', 'Final Setting'],
    'Makeup': ['Skin Prep & Prime', 'Base & Concealing', 'Eye & Lip Artistry', 'Highlighting & Contouring', 'Setting Spray'],
    'Academy': ['Theory Session', 'Demonstration', 'Practical Hands-on', 'Feedback & Review', 'Certification']
};

async function migrate() {
    await mongoose.connect('mongodb://127.0.0.1:27017/hairport_dev');
    
    const listings = await Listing.find({});
    let count = 0;
    
    for (let listing of listings) {
        if (!listing.processes || listing.processes.length === 0) {
            const steps = processMap[listing.category] || ['Preparation', 'Execution', 'Finishing'];
            listing.processes = steps;
            await listing.save();
            count++;
        }
    }
    
    console.log(`Updated processes for ${count} listings.`);
    mongoose.disconnect();
}

migrate().catch(console.error);
