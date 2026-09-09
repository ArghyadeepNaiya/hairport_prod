const fs = require('fs');

// Read data.js and remove ES module syntax
let dataJs = fs.readFileSync('../hairport/src/utils/data.js', 'utf8');
dataJs = dataJs.replace(/export const /g, 'const ').replace(/export function /g, 'function ');

// We want to execute it in this context
// The safest way without writing a temporary file is to use eval, or we can just write temp2.js and require it.
fs.writeFileSync('./temp_data.js', dataJs + '\nmodule.exports = { SERVICES };\n');

const { SERVICES } = require('./temp_data.js');

const categoryMap = {
    'Nails': 'Nails & Art',
    'Hair': 'Hair & Spa',
    'Combos': 'Combo Offers',
    'D-Tan': 'D-Tan Packs',
    'Facials': 'Facials & Glow',
    'Mani-Pedi': 'Mani-Pedi',
    'Waxing': 'Waxing',
    'Grooming': "Men's Special",
    'Bridal': 'Bridal & Wedding',
    'Makeup': 'Makeup',
    'Academy': 'Academy'
};

const seedListings = SERVICES.map(s => ({
    name: s.title,
    price: s.price,
    original_price: s.originalPrice,
    duration: s.durationMinutes + ' mins',
    is_bestseller: s.isBestSeller,
    rating: s.rating,
    gender: s.gender === 'All' ? 'Unisex' : s.gender,
    category: categoryMap[s.category] || s.category,
    description: s.description,
    image: s.image
}));

let seedJs = fs.readFileSync('./seed.js', 'utf8');
let startIdx = seedJs.indexOf('const seedListings = [');
let endIdx = seedJs.indexOf('const seedDB =');
if(startIdx !== -1 && endIdx !== -1) {
    let newSeedJs = seedJs.substring(0, startIdx) + 'const seedListings = ' + JSON.stringify(seedListings, null, 4) + ';\n\n' + seedJs.substring(endIdx);
    fs.writeFileSync('./seed.js', newSeedJs);
    console.log('seed.js updated');
} else {
    console.log('Could not find boundaries in seed.js');
}
