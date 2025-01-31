let tg = window.Telegram.WebApp;
tg.expand(); // Expand to full screen

// Get user info safely
let user = tg.initDataUnsafe?.user;
let userName = user?.first_name || user?.username || "Guest";
document.getElementById("user-info").innerText = `Hello, ${userName}!`;

// Elements
let menu = document.getElementById("menu");
let menuBtn = document.getElementById("menu-btn");
let contactBtn = document.getElementById("contact-btn");
let backBtn = document.getElementById("back-btn");

// Toggle menu visibility
menuBtn.addEventListener("click", function () {
    menu.classList.add("active");
    menuBtn.style.display = "none";    // Скрываем кнопку Menu
    contactBtn.style.display = "none"; // Скрываем кнопку Contact
});

// Hide menu and restore buttons
backBtn.addEventListener("click", function () {
    menu.classList.remove("active");
    menuBtn.style.display = "block";    // Показываем кнопку Menu
    contactBtn.style.display = "block"; // Показываем кнопку Contact
});

// Send data when clicking "Contact"
contactBtn.addEventListener("click", function () {
    tg.sendData(JSON.stringify({ action: "contact" }));
});

// Handle menu item clicks
document.querySelectorAll(".menu-item").forEach(button => {
    button.addEventListener("click", function () {
        let action = this.dataset.action;
        tg.sendData(JSON.stringify({ action }));
    });
});
