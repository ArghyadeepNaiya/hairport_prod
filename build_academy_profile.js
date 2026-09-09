const fs = require('fs');

// --- ACADEMY.EJS ---
const academyHtml = fs.readFileSync('/home/orstead/Documents/hairport/academy.html', 'utf8');
let newAcademy = academyHtml.replace('<link rel="stylesheet" href="./styles.css" />', '<script src="https://unpkg.com/@tailwindcss/browser@4"></script>\n  <link rel="stylesheet" href="/tailwind_base.css" />');
newAcademy = newAcademy.replace(/\.\/src\/assets/g, '/src/assets');
newAcademy = newAcademy.replace('data-action="go-home"', 'onclick="window.location.href=\'/hairport/user/home\'"');
newAcademy = newAcademy.replace('data-action="go-cart"', 'onclick="window.location.href=\'/hairport/user/cart\'"');

const academyCoursesEjs = `
<% academy_listings.forEach((listing, index) => { %>
    <div class="bg-white dark:bg-[#1E1E1E] rounded-3xl p-4 sm:p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm transition-all duration-200 mb-6">
      <div class="flex flex-row gap-3 sm:gap-6">
        <div class="flex-1 space-y-2 sm:space-y-3 min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[11px] font-bold text-stone-500 dark:text-stone-400">Duration: <%= listing.duration_months %> Months</span>
          </div>
          <h3 class="text-base sm:text-2xl font-black text-[#1C1C1C] dark:text-[#F8F8F8] leading-tight"><%= listing.name %></h3>
          <div class="flex items-center gap-4">
            <div class="flex items-baseline gap-1.5 sm:gap-2">
              <span class="text-lg sm:text-2xl font-black text-[#1C1C1C] dark:text-white">₹<%= listing.price %></span>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-medium"><%= listing.description %></p>
        </div>
        <div class="w-[110px] sm:w-[140px] shrink-0 flex flex-col gap-2 sm:gap-3">
          <div class="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-md">
            <img src="<%= listing.image %>" class="w-full h-full object-cover" />
          </div>
          <div class="w-full">
             <form action="/hairport/user/cart/add/<%= listing._id %>" method="POST" style="margin:0;">
                <button type="submit" class="w-full py-2 px-1 sm:py-2.5 sm:px-4 bg-white dark:bg-stone-900 text-[#E23744] font-black text-[11px] sm:text-sm uppercase tracking-wider rounded-xl border-2 border-[#E23744]/40 hover:bg-rose-50 dark:hover:bg-rose-950/40 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1">
                  <span>ENROLL +</span>
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
<% }) %>
`;
newAcademy = newAcademy.replace(/<div id="academy-courses-container" class="space-y-6">[\s\S]*?<\/div>\n    <\/main>/, `<div id="academy-courses-container" class="space-y-6">\n${academyCoursesEjs}\n      </div>\n    </main>`);

const cartBadgeAcademyEjs = `
<% if (cartItemCount > 0) { %>
    <span id="nav-cart-badge" class="absolute -top-1 -right-1 w-4 h-4 bg-[#E23744] text-white text-[10px] font-extrabold rounded-full items-center justify-center ring-2 ring-stone-950 flex"><%= cartItemCount %></span>
<% } else { %>
    <span id="nav-cart-badge" class="hidden absolute -top-1 -right-1 w-4 h-4 bg-[#E23744] text-white text-[10px] font-extrabold rounded-full items-center justify-center ring-2 ring-stone-950"></span>
<% } %>
`;
newAcademy = newAcademy.replace(/<span id="nav-cart-badge" class="hidden absolute[\s\S]*?<\/span>/, cartBadgeAcademyEjs);

// Floating Cart for Academy
const floatingCartAcademyEjs = `
<% if (cartItemCount > 0) { %>
  <div class="floating-cart-popup fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-gradient-to-t from-stone-950 via-stone-950/95 to-transparent pb-safe anim-slide-up pointer-events-none">
    <div id="floating-cart-inner" class="pointer-events-auto bg-[#1C1C1C] text-white rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 shadow-2xl border border-stone-800 flex items-center justify-between backdrop-blur-md max-w-7xl mx-auto transition-all duration-300 transform origin-bottom mb-[70px]">
      <div class="flex items-center gap-3 pl-1">
        <div id="floating-cart-bag" class="relative w-10 h-10 rounded-2xl bg-[#E23744] text-white flex items-center justify-center font-black shadow-md shadow-rose-900/40">
          <span class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-stone-950 text-xs font-black rounded-full flex items-center justify-center ring-2 ring-stone-950 transition-all"><%= cartItemCount %></span>
        </div>
        <div>
          <div class="flex items-baseline gap-1.5"><span id="floating-cart-subtotal" class="inline-block text-base sm:text-lg font-black text-white transition-all duration-300 transform">₹<%= cartTotal %></span></div>
        </div>
      </div>
      <a href="/hairport/user/cart" class="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl bg-[#E23744] hover:bg-[#CB202D] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/40 active:scale-95 transition-all duration-300"><span>VIEW CART</span></a>
    </div>
  </div>
<% } %>
`;
newAcademy = newAcademy.replace('<div id="floating-cart-bar"></div>', floatingCartAcademyEjs);
newAcademy = newAcademy.replace('<script type="module" src="./src/pages/academy/academy.js"></script>', `
  <script>
    const themeBtn = document.querySelector('[data-action="toggle-theme"]');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });
    }
  </script>
`);

fs.writeFileSync('/home/orstead/Documents/hairport_prod/views/academy.ejs', newAcademy);
console.log('Successfully compiled academy.ejs');


// --- PROFILE.EJS ---
const profileHtml = fs.readFileSync('/home/orstead/Documents/hairport/profile.html', 'utf8');
let newProfile = profileHtml.replace('<link rel="stylesheet" href="./styles.css" />', '<script src="https://unpkg.com/@tailwindcss/browser@4"></script>\n  <link rel="stylesheet" href="/tailwind_base.css" />');
newProfile = newProfile.replace(/\.\/src\/assets/g, '/src/assets');
newProfile = newProfile.replace('href="./index.html"', 'href="/hairport/user/home"');
newProfile = newProfile.replace('href="./cart.html"', 'href="/hairport/user/cart"');

const profileEjs = `
    <div class="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-5">
      <div class="w-16 h-16 rounded-2xl bg-rose-500/10 text-[#E23744] flex items-center justify-center font-black text-2xl uppercase"><%= user.username.charAt(0) %></div>
      <div class="flex-1">
        <h2 class="text-xl font-black text-[#1C1C1C] dark:text-white"><%= user.username %></h2>
        <p class="text-sm text-stone-500"><%= user.email %></p>
      </div>
      <a href="/hairport/user/logout" class="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold text-xs hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">Logout</a>
    </div>

    <div class="mt-8">
      <h3 class="text-base font-black text-[#1C1C1C] dark:text-white mb-4 flex items-center gap-2"><span>My Appointments</span></h3>
      <% if (!orders || orders.length === 0) { %>
        <div class="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 border border-stone-200 dark:border-stone-800 text-center space-y-3">
          <h4 class="font-bold text-stone-800 dark:text-stone-200">No Appointments Yet</h4>
          <p class="text-xs text-stone-400 max-w-xs mx-auto">You haven't booked any recent services yet.</p>
          <a href="/hairport/user/home" class="inline-block mt-2 px-5 py-2.5 rounded-xl bg-[#E23744] text-white font-bold text-xs">Book Now</a>
        </div>
      <% } else { %>
        <div class="space-y-4">
          <% orders.forEach(order => { %>
            <div class="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm">
              <div class="flex justify-between items-start mb-3 border-b border-stone-100 dark:border-stone-800 pb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-black uppercase tracking-widest text-[#E23744]"><%= new Date(order.createdAt).toLocaleDateString() %></span>
                  </div>
                  <p class="text-xs font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1"><%= order.address %></p>
                </div>
              </div>
              <div class="space-y-2">
                <% order.items.forEach(item => { %>
                  <div class="flex justify-between text-sm"><span class="font-bold text-stone-700 dark:text-stone-300"><%= item.name %></span><span class="font-black text-[#1C1C1C] dark:text-white">₹<%= item.price %></span></div>
                <% }) %>
              </div>
              <div class="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
                <span class="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Amount</span>
                <span class="text-lg font-black text-[#E23744]">₹<%= order.amount %></span>
              </div>
            </div>
          <% }) %>
        </div>
      <% } %>
    </div>
`;
newProfile = newProfile.replace('<main id="profile-main-container" class="flex-1 w-full max-w-2xl mx-auto p-4 sm:p-6 flex flex-col justify-center"></main>', `<main id="profile-main-container" class="flex-1 w-full max-w-2xl mx-auto p-4 sm:p-6 flex flex-col">${profileEjs}</main>`);
newProfile = newProfile.replace('<script type="module" src="./src/pages/profile/profile.js?v=2"></script>', `
  <script>
    const themeBtn = document.querySelector('[data-action="toggle-theme"]');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });
    }
  </script>
`);

fs.writeFileSync('/home/orstead/Documents/hairport_prod/views/profile.ejs', newProfile);
console.log('Successfully compiled profile.ejs');

