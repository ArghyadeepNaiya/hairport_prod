const fs = require('fs');

const baseHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>__TITLE__</title>
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  <link rel="stylesheet" href="/tailwind_base.css" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body class="font-sans antialiased bg-[#FAF9F5] dark:bg-[#0F0F0F] text-[#1C1C1C] dark:text-[#F8F8F8] flex flex-col min-h-screen justify-center p-4">

  <div class="w-full max-w-md mx-auto">
    <div class="text-center mb-8">
        <h1 class="text-2xl font-black tracking-tight text-[#1C1C1C] dark:text-white">RANCHI HAIR PORT <span class="text-[10px] bg-[#E23744] text-white px-2 py-0.5 rounded-full ml-1">SALON</span></h1>
    </div>

    <div class="bg-white dark:bg-[#1E1E1E] rounded-[2rem] p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-black text-[#1C1C1C] dark:text-white mb-2">__HEADING__</h2>
        <p class="text-sm text-stone-500 dark:text-stone-400">__SUBHEADING__</p>
      </div>
      
      __FORM__
      
      <div class="mt-6 text-center text-sm font-bold text-stone-500">
        __TOGGLE_LINK__
      </div>
    </div>
  </div>

</body>
</html>
`;

// LOGIN
const loginForm = `
<form action="/hairport/user/login" method="POST" class="space-y-4">
    <div class="space-y-1.5">
        <label class="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">Email Address</label>
        <input type="email" name="email" class="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 text-sm font-black rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-[#1C1C1C] dark:text-white" placeholder="john@example.com" required>
    </div>
    <div class="space-y-1.5">
        <label class="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 flex justify-between"><span>Password</span><a href="/forgot-password" class="text-[#E23744] hover:underline">Forgot?</a></label>
        <input type="password" name="password" class="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 text-sm font-black rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-[#1C1C1C] dark:text-white" placeholder="••••••••" required>
    </div>
    <button type="submit" class="w-full py-3.5 rounded-xl bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] font-black text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-lg mt-2">Log In</button>
</form>
`;
const loginHtml = baseHtml
    .replace('__TITLE__', 'Log In | Ranchi Hair Port')
    .replace('__HEADING__', 'Welcome Back')
    .replace('__SUBHEADING__', 'Login to access your bookings and exclusive offers')
    .replace('__FORM__', loginForm)
    .replace('__TOGGLE_LINK__', 'Don\'t have an account? <a href="/hairport/user/signup" class="text-[#E23744] hover:underline">Sign up here</a>');

fs.writeFileSync('/home/orstead/Documents/hairport_prod/views/login.ejs', loginHtml);


// SIGNUP
const signupForm = `
<form action="/hairport/user/signup" method="POST" class="space-y-4">
    <div class="space-y-1.5">
        <label class="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">Full Name</label>
        <input type="text" name="username" class="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 text-sm font-black rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-[#1C1C1C] dark:text-white" placeholder="John Doe" required>
    </div>
    <div class="space-y-1.5">
        <label class="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">Phone Number</label>
        <div class="relative flex items-center">
            <span class="absolute left-4 text-sm font-bold text-stone-500">+91</span>
            <input type="tel" name="phone" maxlength="10" class="w-full pl-12 pr-4 py-3 bg-stone-50 dark:bg-stone-900 text-sm font-black rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-[#1C1C1C] dark:text-white" placeholder="Enter 10 digit number" required>
        </div>
    </div>
    <div class="space-y-1.5">
        <label class="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">Email Address</label>
        <input type="email" name="email" class="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 text-sm font-black rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-[#1C1C1C] dark:text-white" placeholder="name@example.com" required>
    </div>
    <div class="space-y-1.5">
        <label class="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">Password</label>
        <input type="password" name="password" class="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 text-sm font-black rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-[#1C1C1C] dark:text-white" placeholder="••••••••" required>
    </div>
    <div class="space-y-1.5">
        <label class="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">Confirm Password</label>
        <input type="password" name="confirmPassword" class="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 text-sm font-black rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-[#1C1C1C] dark:text-white" placeholder="••••••••" required>
    </div>
    <button type="submit" class="w-full mt-2 py-3.5 rounded-xl bg-[#E23744] text-white font-black text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-rose-900/30">Create Account</button>
    <p class="text-[10px] text-center text-stone-400 font-medium">By signing up, you agree to our Terms & Privacy Policy.</p>
</form>
`;
const signupHtml = baseHtml
    .replace('__TITLE__', 'Sign Up | Ranchi Hair Port')
    .replace('__HEADING__', 'Create Account')
    .replace('__SUBHEADING__', 'Sign up to book your premium salon experience')
    .replace('__FORM__', signupForm)
    .replace('__TOGGLE_LINK__', 'Already have an account? <a href="/hairport/user/login" class="text-[#E23744] hover:underline">Log in here</a>');

fs.writeFileSync('/home/orstead/Documents/hairport_prod/views/signup.ejs', signupHtml);
console.log('Successfully compiled login.ejs and signup.ejs');
