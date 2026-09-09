const fs = require('fs');

const indexHtml = fs.readFileSync('/home/orstead/Documents/hairport/index.html', 'utf8');
const homeJs = fs.readFileSync('/home/orstead/Documents/hairport/src/pages/home/home.js', 'utf8');

// We will construct the new index.ejs
let newIndex = indexHtml;

// 1. Add Tailwind CDN and replace stylesheet link
newIndex = newIndex.replace('<link rel="stylesheet" href="./styles.css" />', 
  '<script src="https://unpkg.com/@tailwindcss/browser@4"></script>\n  <link rel="stylesheet" href="/tailwind_base.css" />');

// Replace relative paths
newIndex = newIndex.replace(/\.\/src\/assets/g, '/src/assets');
newIndex = newIndex.replace(/\.\/academy\.html/g, '/hairport/user/academy');

// 2. Profile and Cart Links in Header
// Replace the hardcoded profile drawer button
newIndex = newIndex.replace('data-action="open-profile-drawer"', 'onclick="window.location.href=\'/hairport/user/profile\'"');
newIndex = newIndex.replace('data-action="go-cart"', 'onclick="window.location.href=\'/hairport/user/cart\'"');
newIndex = newIndex.replace('data-action="go-academy"', 'onclick="window.location.href=\'/hairport/user/academy\'"');

// 3. Search form
const searchHtml = `
            <form action="/hairport/user/home" method="GET" class="relative flex items-center bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/20 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/20 transition-all">
                <button type="submit" class="pl-4 pr-2 text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                  <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
                <input type="text" name="search" value="<%= typeof searchQuery !== 'undefined' ? searchQuery : '' %>" class="w-full py-3 pr-10 text-sm sm:text-base bg-transparent text-white placeholder-transparent focus:outline-none" placeholder="Search..." />
                <% if(searchQuery && searchQuery.length === 0) { %>
                  <div id="search-placeholder-text" class="absolute left-11 pointer-events-none text-white/50 text-sm sm:text-base font-medium flex items-center"><span></span></div>
                <% } %>
            </form>
`;
newIndex = newIndex.replace(/<div class="relative flex items-center bg-white\/15[\s\S]*?<\/div>/, searchHtml);

// 4. Categories
const categoriesHtml = `
          <a href="/hairport/user/home?category=All%20Services&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'All Services' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <svg class="w-4 h-4 <%= currentCategory === 'All Services' ? 'text-white' : 'text-stone-500 dark:text-stone-400' %>" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span>All Services</span>
          </a>
          <a href="/hairport/user/home?category=Hair&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Hair' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Hair</span>
          </a>
          <a href="/hairport/user/home?category=Spa&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Spa' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Spa</span>
          </a>
          <a href="/hairport/user/home?category=Facials%20%26%20Glow&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Facials & Glow' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Facials & Glow</span>
          </a>
          <a href="/hairport/user/home?category=Nails%20%26%20Art&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Nails & Art' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Nails & Art</span>
          </a>
          <a href="/hairport/user/home?category=Mani-Pedi&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Mani-Pedi' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Mani-Pedi</span>
          </a>
          <a href="/hairport/user/home?category=D-Tan%20Packs&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'D-Tan Packs' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>D-Tan Packs</span>
          </a>
          <a href="/hairport/user/home?category=Waxing&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Waxing' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Waxing</span>
          </a>
          <a href="/hairport/user/home?category=Combo%20Offers&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === 'Combo Offers' ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Combo Offers</span>
          </a>
          <a href="/hairport/user/home?category=Men's%20Special&gender=<%= currentGender %>" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 <%= currentCategory === "Men's Special" ? 'bg-[#E23744] text-white shadow-md shadow-rose-500/25 scale-105' : 'bg-stone-100 dark:bg-[#1E1E1E] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800' %>">
            <span>Men's Special</span>
          </a>
`;
newIndex = newIndex.replace('<!-- Categories rendered here -->', categoriesHtml);

// 5. Gender filter
const genderHtml = `
          <a href="/hairport/user/home?category=<%= encodeURIComponent(currentCategory) %>&gender=All Genders" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all <%= currentGender === 'All Genders' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-700/60 border border-stone-200 dark:border-stone-700' %>" style="text-decoration: none;">All Genders</a>
          <a href="/hairport/user/home?category=<%= encodeURIComponent(currentCategory) %>&gender=Female" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all <%= currentGender === 'Female' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-700/60 border border-stone-200 dark:border-stone-700' %>" style="text-decoration: none;">Female</a>
          <a href="/hairport/user/home?category=<%= encodeURIComponent(currentCategory) %>&gender=Male" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all <%= currentGender === 'Male' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-700/60 border border-stone-200 dark:border-stone-700' %>" style="text-decoration: none;">Male</a>
`;
newIndex = newIndex.replace('<!-- Gender buttons rendered here -->', genderHtml);

// 6. Header Counts
newIndex = newIndex.replace('<h2 id="catalog-title" class="text-lg sm:text-xl font-extrabold text-[#1C1C1C] dark:text-[#F8F8F8]">All Salon Packages</h2>', '<h2 id="catalog-title" class="text-lg sm:text-xl font-extrabold text-[#1C1C1C] dark:text-[#F8F8F8]"><%= currentCategory === "All Services" ? "All Salon Packages" : currentCategory + " Services" %></h2>');
newIndex = newIndex.replace('<span id="catalog-count" class="text-xs font-bold text-stone-400 bg-stone-200/60 dark:bg-stone-800 px-2.5 py-0.5 rounded-full">0</span>', '<span id="catalog-count" class="text-xs font-bold text-stone-400 bg-stone-200/60 dark:bg-stone-800 px-2.5 py-0.5 rounded-full"><%= totalListings %></span>');

// 7. Grid
const gridHtml = `
<% if (all_listings.length === 0) { %>
          <div id="catalog-empty-state" class="bg-white dark:bg-[#1E1E1E] rounded-3xl p-10 text-center space-y-3 border border-stone-200 dark:border-stone-800 my-8">
            <div class="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
            </div>
            <h3 class="text-base font-extrabold text-stone-800 dark:text-stone-200">No Services Found</h3>
            <p class="text-xs text-stone-400 max-w-sm mx-auto">We couldn't find any services matching your search or filters. Try selecting "All Services" or clearing search parameters.</p>
          </div>
<% } else { %>
              <% for(let listing of all_listings) { %>
              <div class="bg-white dark:bg-[#1E1E1E] rounded-3xl p-4 sm:p-5 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div class="flex gap-4">
                    <div class="flex-1 space-y-2">
                      <div class="flex flex-wrap items-center gap-1.5">
                        <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-[#E23744]"><%= listing.category %></span>
                        <% if(listing.is_bestseller) { %><span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">BESTSELLER</span><% } %>
                        <span class="text-[10px] font-bold text-stone-400 dark:text-stone-500">• <%= listing.gender %></span>
                      </div>
                      <h3 class="text-base sm:text-lg font-extrabold text-[#1C1C1C] dark:text-[#F8F8F8] leading-snug group-hover:text-[#E23744] transition-colors"><%= listing.name %></h3>
                      <div class="flex items-center gap-3">
                        <div class="flex items-baseline gap-1.5">
                          <span class="text-lg sm:text-xl font-black text-[#1C1C1C] dark:text-white">₹<%= listing.price %></span>
                          <% if(listing.original_price > listing.price) { %><span class="text-xs line-through text-stone-400 dark:text-stone-500">₹<%= listing.original_price %></span><% } %>
                        </div>
                        <div class="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg text-amber-600 dark:text-amber-400 text-xs font-bold">
                          <span>★</span><span><%= listing.rating %></span>
                        </div>
                      </div>
                      <p class="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed"><%= listing.description %></p>
                    </div>
                    <div class="flex flex-col items-center gap-2 shrink-0">
                      <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                        <img src="<%= listing.image %>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                      <form action="/hairport/user/cart/add/<%= listing._id %>" method="POST" style="margin:0; padding:0; width: 100%;" class="add-to-cart-form">
                        <button type="submit" class="w-full py-1.5 px-4 bg-white dark:bg-stone-900 text-[#E23744] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#E23744]/40 hover:bg-rose-50 dark:hover:bg-rose-950/40 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"><span>ADD</span>+</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <% } %>
<% } %>
`;
newIndex = newIndex.replace('<!-- Catalog Cards rendered here via JS -->', gridHtml);
// Remove empty state from original HTML since we handled it in gridHtml
newIndex = newIndex.replace(/<div id="catalog-empty-state"[\s\S]*?<\/div>\n\s*<!-- Results -->/, '<!-- Results -->');


// 8. Pagination
const paginationHtml = `
<% if (totalPages > 1) { %>
  <% if (currentPage > 1) { %>
      <a href="/hairport/user/home?page=<%= currentPage - 1 %>&category=<%= encodeURIComponent(currentCategory) %>&gender=<%= currentGender %>&search=<%= searchQuery %>" class="p-2 rounded-xl bg-white dark:bg-[#1E1E1E] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"><</a>
  <% } %>
  <div class="flex items-center gap-1.5 flex-wrap justify-center">
  <% for(let i = 1; i <= totalPages; i++) { %>
      <a href="/hairport/user/home?page=<%= i %>&category=<%= encodeURIComponent(currentCategory) %>&gender=<%= currentGender %>&search=<%= searchQuery %>" class="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all <%= currentPage === i ? 'bg-[#E23744] text-white shadow-md shadow-rose-900/30' : 'bg-white dark:bg-[#1E1E1E] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900' %>"><%= i %></a>
  <% } %>
  </div>
  <% if (currentPage < totalPages) { %>
      <a href="/hairport/user/home?page=<%= currentPage + 1 %>&category=<%= encodeURIComponent(currentCategory) %>&gender=<%= currentGender %>&search=<%= searchQuery %>" class="p-2 rounded-xl bg-white dark:bg-[#1E1E1E] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">></a>
  <% } %>
<% } %>
`;
newIndex = newIndex.replace('<!-- Pagination rendered here via JS -->', paginationHtml);

// 9. Floating Cart popup
const floatingCartHtml = `
<% if (cartItemCount > 0) { %>
  <div class="floating-cart-popup fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-gradient-to-t from-stone-950 via-stone-950/95 to-transparent pb-safe anim-slide-up pointer-events-none">
    <div id="floating-cart-inner" class="pointer-events-auto bg-[#1C1C1C] text-white rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 shadow-2xl border border-stone-800 flex items-center justify-between backdrop-blur-md max-w-7xl mx-auto transition-all duration-300 transform origin-bottom">
      <div class="flex items-center gap-3 pl-1">
        <div id="floating-cart-bag" class="cart-icon-wrapper relative w-10 h-10 rounded-2xl bg-[#E23744] text-white flex items-center justify-center font-black shadow-md shadow-rose-900/40">
          <span class="cart-badge absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-stone-950 text-xs font-black rounded-full flex items-center justify-center ring-2 ring-stone-950 transition-all"><%= cartItemCount %></span>
        </div>
        <div>
          <div class="flex items-baseline gap-1.5"><span id="floating-cart-subtotal" class="inline-block text-base sm:text-lg font-black text-white transition-all duration-300 transform">₹<%= cartTotal %></span></div>
          <p class="text-[11px] text-stone-400 flex items-center gap-1 truncate max-w-[140px]">
             <% if (userSubscribed) { %><span class="text-amber-400 font-bold">• 5% VIP</span><% } %>
          </p>
        </div>
      </div>
      <a href="/hairport/user/cart" id="floating-view-cart" class="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl bg-[#E23744] hover:bg-[#CB202D] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/40 active:scale-95 transition-all duration-300"><span>VIEW CART</span></a>
    </div>
  </div>
<% } %>
`;
newIndex = newIndex.replace('<div id="floating-cart-bar"></div>', floatingCartHtml);

// Replace script module tag with standard script tag to our custom fetch logic
const customScript = `
  <script>
    document.addEventListener("DOMContentLoaded", () => {
        const themeBtn = document.querySelector('[data-action="toggle-theme"]');
        if(themeBtn) {
            themeBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
            });
        }

        // Add to cart fetch logic
        const attachCartListeners = () => {
            const addToCartForms = document.querySelectorAll('.add-to-cart-form');
            addToCartForms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const btn = this.querySelector('button');
                    const originalHtml = btn.innerHTML;
                    btn.innerHTML = 'ADDED ✓';
                    btn.style.backgroundColor = '#1C1C1C';
                    
                    setTimeout(() => {
                        fetch(this.action, { method: 'POST', redirect: 'follow' })
                        .then(res => res.text())
                        .then(html => {
                            const doc = new DOMParser().parseFromString(html, 'text/html');
                            const newPopup = doc.querySelector('.floating-cart-popup');
                            const existingPopup = document.querySelector('.floating-cart-popup');
                            if (newPopup) {
                                if (existingPopup) {
                                    existingPopup.replaceWith(newPopup);
                                } else {
                                    document.body.appendChild(newPopup);
                                }
                            }
                            btn.innerHTML = originalHtml;
                            btn.style.backgroundColor = '';
                        });
                    }, 500);
                });
            });
        };
        attachCartListeners();
    });
  </script>
`;
newIndex = newIndex.replace('<script type="module" src="./src/pages/home/home.js?v=2"></script>', customScript);

// Write the compiled EJS
fs.writeFileSync('/home/orstead/Documents/hairport_prod/views/index.ejs', newIndex);
console.log('Successfully compiled index.ejs');
