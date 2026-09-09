const fs = require('fs');

const cartHtml = fs.readFileSync('/home/orstead/Documents/hairport/cart.html', 'utf8');

let newCart = cartHtml;

// 1. Setup Tailwind and Styles
newCart = newCart.replace('<link rel="stylesheet" href="./styles.css" />', 
  '<script src="https://unpkg.com/@tailwindcss/browser@4"></script>\n  <link rel="stylesheet" href="/tailwind_base.css" />');
newCart = newCart.replace(/\.\/src\/assets/g, '/src/assets');

// 2. Adjust Header links
newCart = newCart.replace('href="./index.html"', 'href="/hairport/user/home"');
newCart = newCart.replace('href="./profile.html"', 'href="/hairport/user/profile"');

// 3. Cart Items Section
const cartItemsEjs = `
<% if (cart.items.length === 0) { %>
    <div class="bg-white dark:bg-[#1E1E1E] rounded-3xl p-10 text-center space-y-3 border border-stone-200 dark:border-stone-800 my-8">
        <h3 class="text-base font-extrabold text-stone-800 dark:text-stone-200">Your Cart is Empty</h3>
        <p class="text-xs text-stone-400 max-w-sm mx-auto">Looks like you haven't added any salon packages yet.</p>
        <a href="/hairport/user/home" class="inline-block mt-4 px-6 py-2 bg-[#E23744] text-white font-bold rounded-xl shadow-lg">Browse Services</a>
    </div>
<% } else { %>
    <% cart.items.forEach(item => { %>
    <div class="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 flex gap-4 border border-stone-200 dark:border-stone-800 relative shadow-sm">
      <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
        <img src="<%= item.image %>" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 flex flex-col justify-between py-0.5">
        <div>
          <div class="flex justify-between items-start gap-2 mb-1">
            <h3 class="text-sm font-extrabold text-[#1C1C1C] dark:text-white leading-tight line-clamp-2"><%= item.name %></h3>
            <form action="/hairport/user/cart/remove/<%= item._id %>" method="POST" style="margin:0;">
                <button type="submit" class="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center justify-center shrink-0">
                  <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </form>
          </div>
          <p class="text-[10px] font-bold text-stone-400 uppercase tracking-wider"><%= item.category %></p>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-baseline gap-1.5">
            <span class="text-base font-black text-[#1C1C1C] dark:text-white">₹<%= item.price %></span>
          </div>
        </div>
      </div>
    </div>
    <% }) %>
<% } %>
`;
newCart = newCart.replace(/<div id="cart-items-container" class="space-y-3">\s*<!-- Cart items injected here -->\s*<\/div>/, `<div id="cart-items-container" class="space-y-3">\n${cartItemsEjs}\n      </div>`);


// 4. Order Summary Section
const orderSummaryEjs = `
<% if (cart.items.length > 0) { %>
    <div id="order-summary" class="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-3">
      <h3 class="text-xs font-black text-stone-500 dark:text-stone-400 uppercase tracking-wider">Order Summary</h3>
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-stone-600 dark:text-stone-400">Subtotal (<span id="summary-count"><%= cart.items.length %></span> services)</span>
          <span class="font-bold" id="summary-subtotal">₹<%= subtotal %></span>
        </div>
      </div>
      <div class="border-t border-stone-100 dark:border-stone-800 pt-3 flex justify-between items-baseline">
        <span class="text-sm font-bold text-stone-700 dark:text-stone-300">Total</span>
        <div class="text-right">
          <p class="text-xl font-black text-[#1C1C1C] dark:text-white" id="summary-total">₹<%= subtotal %></p>
        </div>
      </div>
    </div>
<% } %>
`;
newCart = newCart.replace(/<div id="order-summary" class="hidden bg-white[\s\S]*?<\/div>\s*<\/div>/, orderSummaryEjs);


// 5. Recommendations Section
const recommendationsEjs = `
<% if (typeof recommendations !== 'undefined' && recommendations.length > 0) { %>
    <div id="cart-recommendations-container">
      <div class="flex items-center gap-2.5 mb-3 px-1">
        <div class="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <svg class="w-3.5 h-3.5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-black text-[#1C1C1C] dark:text-white">Frequently Bought Together</h3>
        </div>
      </div>
      <div id="recommendation-grid" class="flex overflow-x-auto gap-3 pb-3 snap-x snap-mandatory cart-hide-scrollbar">
        <% recommendations.forEach(item => { %>
        <div class="w-64 shrink-0 snap-start bg-white dark:bg-[#1E1E1E] rounded-2xl p-3 border border-stone-200 dark:border-stone-800 flex gap-3 shadow-sm rec-anim-in">
          <div class="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
            <img src="<%= item.image %>" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 flex flex-col justify-between py-0.5">
            <div>
              <h4 class="text-xs font-black text-[#1C1C1C] dark:text-white line-clamp-2 leading-tight"><%= item.name %></h4>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-black text-[#1C1C1C] dark:text-white">₹<%= item.price %></span>
              <form action="/hairport/user/cart/add/<%= item._id %>" method="POST" style="margin:0;">
                  <button type="submit" class="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#1C1C1C] dark:text-white text-[10px] font-bold rounded-lg transition-colors uppercase tracking-wider">Add</button>
              </form>
            </div>
          </div>
        </div>
        <% }) %>
      </div>
    </div>
<% } %>
`;
newCart = newCart.replace(/<div id="cart-recommendations-container" class="hidden">[\s\S]*?<\/div>\s*<\/div>/, recommendationsEjs);

// 6. Checkout Footer
const footerEjs = `
<% if (cart.items.length > 0) { %>
  <div id="checkout-footer" class="sticky bottom-0 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl px-4 py-3 border-t border-stone-200/60 dark:border-stone-800/60 z-20">
    <div class="max-w-2xl mx-auto flex items-center justify-between gap-4">
      <div>
        <p class="text-[10px] text-stone-500 uppercase font-black tracking-wider">Total</p>
        <p class="text-lg font-black text-[#1C1C1C] dark:text-white" id="cart-subtotal">₹<%= subtotal %></p>
      </div>
      <a href="/hairport/user/cart/schedule" class="flex-1 max-w-[200px] py-3.5 rounded-2xl bg-gradient-to-r from-[#E23744] to-rose-500 hover:from-[#CB202D] hover:to-rose-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-rose-500/25 active:scale-[0.97] transition-all flex items-center justify-center gap-2">
        <span>PROCEED</span>
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </div>
<% } %>
`;
newCart = newCart.replace(/<div id="checkout-footer" class="sticky bottom-0[\s\S]*?<\/div>\s*<\/div>/, footerEjs);

// Remove the cart.js module script since it's now EJS driven
newCart = newCart.replace('<script type="module" src="./src/pages/cart/cart.js?v=5"></script>', `
  <script>
    const themeBtn = document.querySelector('[data-action="toggle-theme"]');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });
    }
  </script>
`);

fs.writeFileSync('/home/orstead/Documents/hairport_prod/views/cart.ejs', newCart);
console.log('Successfully compiled cart.ejs');
