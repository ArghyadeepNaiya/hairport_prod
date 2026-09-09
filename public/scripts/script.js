// script.js

document.addEventListener("DOMContentLoaded", () => {
    


    // Logic for gender sub-filter buttons
    const genderBtns = document.querySelectorAll('.gender-filter .filter-btn');
    
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // --- Add to Cart Jump Animation ---
    const addToCartForms = document.querySelectorAll('form[action*="/cart/add"]');
    
    addToCartForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the page from reloading instantly

            const button = this.querySelector('button');
            const buttonRect = button.getBoundingClientRect();

            // Find the target (the cart popup icon). If cart is empty, aim for bottom center.
            const cartIcon = document.querySelector('.cart-icon-wrapper');
            let targetX, targetY;

            if (cartIcon) {
                const iconRect = cartIcon.getBoundingClientRect();
                targetX = iconRect.left + (iconRect.width / 2) - 10;
                targetY = iconRect.top + (iconRect.height / 2) - 10;
            } else {
                targetX = (window.innerWidth / 2) - 10;
                targetY = window.innerHeight - 60;
            }

            // Create the outer wrapper (controls X movement)
            const flyer = document.createElement('div');
            flyer.classList.add('flying-ball-wrapper');
            flyer.style.left = `${buttonRect.left + (buttonRect.width / 2) - 10}px`;
            flyer.style.top = `${buttonRect.top + (buttonRect.height / 2) - 10}px`;

            // Create the inner ball (controls Y movement / jumping arc)
            const ball = document.createElement('div');
            ball.classList.add('flying-ball-inner');
            flyer.appendChild(ball);
            document.body.appendChild(flyer);

            // Calculate the distance to travel
            const distX = targetX - (buttonRect.left + (buttonRect.width / 2) - 10);
            const distY = targetY - (buttonRect.top + (buttonRect.height / 2) - 10);

            // Force browser to register the initial position before applying classes
            flyer.getBoundingClientRect();

            // Set the CSS variables for the destination
            flyer.style.setProperty('--target-x', `${distX}px`);
            ball.style.setProperty('--target-y', `${distY}px`);

            // Trigger the CSS animation
            flyer.classList.add('animate-x');
            ball.classList.add('animate-y');

            // Wait 600ms for animation to finish, then submit via AJAX to prevent hard refresh
            setTimeout(() => {
                flyer.remove();
                
                fetch(this.action, { method: this.method || 'POST', redirect: 'follow' })
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        
                        // Grab the updated popup from the response
                        const newPopup = doc.querySelector('.floating-cart-popup');
                        const existingPopup = document.querySelector('.floating-cart-popup');
                        
                        if (newPopup) {
                            if (existingPopup) {
                                existingPopup.replaceWith(newPopup);
                            } else {
                                document.body.appendChild(newPopup);
                            }
                        }
                    })
                    .catch(err => console.error("Error adding to cart:", err));
            }, 600); 
        });
    });

    // Location Dropdown Sync
    const locationSelect = document.getElementById('location-select');
    const activeCenterDisplay = document.getElementById('active-center-display');
    const popupLocationDisplay = document.getElementById('popup-location-display');
    
    if (locationSelect) {
        locationSelect.addEventListener('change', (e) => {
            if (activeCenterDisplay) activeCenterDisplay.textContent = e.target.value;
            if (popupLocationDisplay) popupLocationDisplay.textContent = e.target.value;
        });
    }

    // Interactive ADD buttons
    const addBtns = document.querySelectorAll('.add-btn');
    
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Simple visual feedback for adding to cart
            const originalText = e.target.innerText;
            if(originalText !== "ADDED ✓") {
                e.target.innerText = "ADDED ✓";
                e.target.style.backgroundColor = "#e84358";
                e.target.style.color = "white";
                
                // Revert after 2 seconds
                setTimeout(() => {
                    e.target.innerText = originalText;
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#e84358";
                }, 2000);
            }
        });
    });

    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Toggle theme on click
    if (themeToggleBtn && themeIcon) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
    }
});

