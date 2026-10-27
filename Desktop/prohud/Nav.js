// nav.js — highlights the navbar link of the page you are currently on.

// 1. Find the name of the current page, e.g. "contacts.html".
//    decodeURIComponent turns "research%20&%20projects.html" back into normal text.
let currentPage = decodeURIComponent(location.pathname.split("/").pop());

// If the address has no file name (like the site's root "/"), it is the home page.
if (currentPage === "") {
    currentPage = "index.html";
}

// 2. Look at every link inside the navbar.
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {
    // 3. If the link points to the current page, give it the "active" class.
    //    The CSS then paints that link amber.
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});