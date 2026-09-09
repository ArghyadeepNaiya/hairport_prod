const fs = require('fs');
const mongoose = require('mongoose');

async function migrate() {
  // Connect to DB
  await mongoose.connect('mongodb://127.0.0.1:27017/hairport_dev');
  
  // Need to find the collection name. If it's Listing, let's load the model.
  const Listing = require('./models/listing.js');
  
  // 1. We will update the schema enum manually in the file first to bypass validation for future
  let modelFile = fs.readFileSync('./models/listing.js', 'utf-8');
  modelFile = modelFile.replace(/'Hair & Spa', /g, "'Hair', 'Spa', ");
  fs.writeFileSync('./models/listing.js', modelFile);
  
  // 2. Update DB documents
  // Set "Hair Spa" to "Spa", and others to "Hair"
  await Listing.updateMany(
    { category: 'Hair & Spa', name: { $regex: /Spa/i } },
    { $set: { category: 'Spa' } }
  );
  
  await Listing.updateMany(
    { category: 'Hair & Spa' },
    { $set: { category: 'Hair' } }
  );

  console.log("DB Migration Done");
  mongoose.disconnect();

  // 3. Update seed.js
  let seedFile = fs.readFileSync('./seed.js', 'utf-8');
  seedFile = seedFile.replace(/"category": "Hair & Spa",\n\s+"description": "Deep conditioning hair spa/g, '"category": "Spa",\n        "description": "Deep conditioning hair spa');
  seedFile = seedFile.replace(/"category": "Hair & Spa"/g, '"category": "Hair"');
  fs.writeFileSync('./seed.js', seedFile);
  console.log("seed.js updated");
  
  // 4. Update index.ejs
  let indexFile = fs.readFileSync('./views/index.ejs', 'utf-8');
  indexFile = indexFile.replace(
    /<a href="\/hairport\/user\/home\?category=Hair%20%26%20Spa&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Hair & Spa' \? 'bg-\[#E23744\] text-white shadow-md shadow-rose-500\/25 scale-105' : 'bg-stone-100 dark:bg-\[#1E1E1E\] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">\s*<span>Hair & Spa<\/span>\s*<\/a>/,
    `<a href="/hairport/user/home?category=Hair&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Hair' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Hair</span>
          </a>
          <a href="/hairport/user/home?category=Spa&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Spa' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Spa</span>
          </a>`
  );
  fs.writeFileSync('./views/index.ejs', indexFile);
  console.log("index.ejs updated");

  // 5. Update build_index.js just in case
  let buildIndex = fs.readFileSync('./build_index.js', 'utf-8');
  buildIndex = buildIndex.replace(
    /<a href="\/hairport\/user\/home\?category=Hair%20%26%20Spa&gender=<%= currentGender %>".*?<\/a>/s,
    `<a href="/hairport/user/home?category=Hair&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Hair' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Hair</span>
          </a>
          <a href="/hairport/user/home?category=Spa&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Spa' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Spa</span>
          </a>`
  );
  fs.writeFileSync('./build_index.js', buildIndex);
  
  // 6. Update temp_data.js and temp.js
  let td = fs.readFileSync('./temp_data.js', 'utf-8');
  td = td.replace(/'Hair':'Hair & Spa'/g, "'Hair':'Hair','Spa':'Spa'");
  fs.writeFileSync('./temp_data.js', td);
  
  let t = fs.readFileSync('./temp.js', 'utf-8');
  t = t.replace(/'Hair':'Hair & Spa'/g, "'Hair':'Hair','Spa':'Spa'");
  fs.writeFileSync('./temp.js', t);
  
  console.log("All complete!");
}

migrate().catch(console.error);
