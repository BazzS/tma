let tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем Mini App на весь экран

// Получение информации о пользователе
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

// Открытие основного меню
menuBtn.addEventListener("click", function () {
    menu.classList.add("active");
    menuBtn.style.display = "none";
    contactBtn.style.display = "none";
});

// Закрытие основного меню
backBtn.addEventListener("click", function () {
    menu.classList.remove("active");
    menuBtn.style.display = "block";
    contactBtn.style.display = "block";
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

// Переключение тем
let themeToggled = false; // Флаг для отслеживания переключения
let originalBackground = getComputedStyle(document.body).backgroundColor;
let originalColor = getComputedStyle(document.body).color;

console.log("Original Background:", originalBackground);
console.log("Original Text Color:", originalColor);

// Логика для кнопок внутри Mini Apps Menu
document.querySelectorAll(".mini-item").forEach(button => {
    button.addEventListener("click", function () {
        let feature = this.dataset.feature;

        switch (feature) {
            case "user-data":
                tg.showAlert(`User: ${userName}`);
                break;

            case "theme":
                themeToggled = !themeToggled; // Переключаем флаг
                
                console.log("Theme toggled:", themeToggled);
                console.log("Current background:", document.body.style.backgroundColor);
                console.log("Current text color:", document.body.style.color);
                
                if (themeToggled) {
                    let newBg = tg.colorScheme === "dark" ? "#222" : "#ddd";
                    let newColor = tg.colorScheme === "dark" ? "#fff" : "#000";

                    console.log("Applying new theme -> Background:", newBg, "Text:", newColor);
                    
                    document.body.style.backgroundColor = newBg;
                    document.body.style.color = newColor;

                    alert(`Theme ON:\nBackground: ${newBg}\nText: ${newColor}`);
                } else {
                    console.log("Reverting to original theme -> Background:", originalBackground, "Text:", originalColor);

                    document.body.style.backgroundColor = originalBackground;
                    document.body.style.color = originalColor;

                    alert(`Theme OFF:\nBackground: ${originalBackground}\nText: ${originalColor}`);
                }
                break;

            case "close":
                tg.close();
                break;

            case "send-data":
                tg.sendData(JSON.stringify({ action: "sent from Mini Apps" }));
                setTimeout(() => {
                    tg.showAlert("✅ Data sent to bot!");
                }, 500); // Небольшая задержка для уверенности, что данные отправлены
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
