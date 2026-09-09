const fs = require('fs');

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

let seedContent = fs.readFileSync('./seed.js', 'utf8');

// Match all objects in the seed array
// We'll just do a simple trick: we replace "image": "..." with "image": "...", "processes": [...]
// But we need to know the category.

// A better way: eval the array
const match = seedContent.match(/const seedListings = (\[[\s\S]*?\]);\n/);
if (match) {
    let listings = eval(match[1]);
    
    for (let listing of listings) {
        if (!listing.processes || listing.processes.length === 0) {
            listing.processes = processMap[listing.category] || ['Preparation', 'Execution', 'Finishing'];
        }
    }
    
    let newArrayStr = JSON.stringify(listings, null, 4);
    seedContent = seedContent.replace(match[0], `const seedListings = ${newArrayStr};\n`);
    fs.writeFileSync('./seed.js', seedContent);
    console.log("seed.js updated with processes!");
}
