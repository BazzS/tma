let tg = window.Telegram.WebApp;
tg.expand(); // Expand to full screen

// Get user info safely
let user = tg.initDataUnsafe?.user;
let userName = user?.first_name || user?.username || "Guest";
document.getElementById("user-info").innerText = `Hello, ${userName}!`;

// Toggle menu
document.getElementById("menu-btn").addEventListener("click", function () {
    document.getElementById("menu").classList.add("active");
});

// Hide menu
document.getElementById("back-btn").addEventListener("click", function () {
    document.getElementById("menu").classList.remove("active");
});

// Send data when clicking "Contact"
document.getElementById("contact-btn").addEventListener("click", function () {
    tg.sendData(JSON.stringify({ action: "contact" }));
});

// Handle menu item clicks
document.querySelectorAll(".menu-item").forEach(button => {
    button.addEventListener("click", function () {
        let action = this.dataset.action;
        tg.sendData(JSON.stringify({ action }));
    });
});
