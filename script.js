let tg = window.Telegram.WebApp;
tg.expand(); // Expand to full screen

// Get user info safely
let user = tg.initDataUnsafe?.user;
let userName = user?.first_name || user?.username || "Guest";
document.getElementById("user-info").innerText = `Hello, ${userName}!`;

// Основные элементы
let menu = document.getElementById("menu");
let miniAppsMenu = document.getElementById("mini-apps-menu");
let menuBtn = document.getElementById("menu-btn");
let contactBtn = document.getElementById("contact-btn");
let backBtn = document.getElementById("back-btn");
let miniAppsBtn = document.getElementById("mini-apps-btn");
let miniBackBtn = document.getElementById("mini-back-btn");

// Задний фон
let originalBackground = document.body.style.background;
let originalColor = document.body.style.color;
let themeToggled = false; 

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

// Открытие подменю Mini Apps
miniAppsBtn.addEventListener("click", function () {
    menu.classList.remove("active");
    miniAppsMenu.classList.add("active");
});

// Закрытие подменю Mini Apps
miniBackBtn.addEventListener("click", function () {
    miniAppsMenu.classList.remove("active");
    menu.classList.add("active");
});

// Логика для кнопок внутри Mini Apps Menu
document.querySelectorAll(".mini-item").forEach(button => {
    button.addEventListener("click", function () {
        let feature = this.dataset.feature;

        switch (feature) {
            case "user-data":
                tg.showAlert(`User: ${userName}`);
                break;
            case "theme":
                if (!themeToggled) {
                    document.body.style.background = tg.colorScheme === "dark" ? "#000" : "#fff";
                    document.body.style.color = tg.colorScheme === "dark" ? "#fff" : "#000";
                } else {
                    document.body.style.background = originalBackground;
                    document.body.style.color = originalColor;
                }
                themeToggled = !themeToggled;
                break;
            case "close":
                tg.close();
                break;
            case "send-data":
                tg.sendData(JSON.stringify({ action: "sent from Mini Apps" }));
                tg.showAlert("Data sent to bot! ✅");
                break;
            case "popup":
                tg.showPopup({
                    title: "Mini App Alert",
                    message: "This is a Telegram Mini App popup!",
                    buttons: [{ text: "OK", type: "ok" }]
                });
                break;
            case "haptic":
                tg.HapticFeedback.impactOccurred("medium");
                break;
            default:
                console.log("Unknown feature");
        }
    });
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
