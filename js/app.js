console.log('Script loaded');

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the navigation bar
function buildNavbar() {
    for (let section of sections) {
        const listItem = document.createElement('li');
        listItem.textContent = section.getAttribute('data-nav');
        listItem.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        navbarList.appendChild(listItem);
    }
}

function makeActive() {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        const navItem = [...navbarList.children].find(li => li.textContent === section.getAttribute('data-nav'));

        // Assuming VALUE is 150 as you mentioned
        if (box.top <= 150 && box.bottom >= 150) {
            // Apply active state on current section and corresponding Nav link
            section.classList.add('active');
            if (navItem) {
                navItem.classList.add('active-nav'); // You can style this class in your CSS
            }
        } else {
            // Remove active state from other sections and corresponding Nav link
            section.classList.remove('active');
            if (navItem) {
                navItem.classList.remove('active-nav');
            }
        }
    }
}

// Initialize the navbar and add the scroll event listener
document.addEventListener('DOMContentLoaded', () => {
    buildNavbar();
    document.addEventListener('scroll', makeActive);
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Set sections as active when clicked
sections.forEach(section => {
    section.addEventListener('click', function() {
        // Removing 'active class' from all sections
        sections.forEach(s => s.classList.remove('active-click'));
        // Adding 'active class' to the clicked section
        this.classList.add('active-click');
    });
});

// Navbar hiding 
const navbarMenu = document.querySelector('.navbar__menu');
let hideNavbarTimeout;

window.addEventListener('scroll', function() {
    // console.log("Scroll event detected!"); // Debugging line

    // Clear the existing timeout (if one exists)
    clearTimeout(hideNavbarTimeout);
    
    // Show the navbar
    navbarMenu.style.top = '0';

    // Set a new timeout to hide the navbar after 3 seconds
    hideNavbarTimeout = setTimeout(function() {
        // console.log("Hiding navbar now!"); // Debugging line
        navbarMenu.style.top = '-60px';  // Assuming the height of your navbar is 60px
    }, 3000);  // 3 seconds
});