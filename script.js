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
let originalBackground = tg.themeParams.bg_color || "blue"; // Используем цвет фона из параметров темы
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
                try {
                    themeToggled = !themeToggled; // Переключаем флаг
            
                    console.log("Theme toggled:", themeToggled);
                    console.log("Before change -> Background:", document.body.style.backgroundColor);
            
                    if (themeToggled) {
                        // Устанавливаем стандартную тему Telegram
                        document.body.style.backgroundColor = tg.themeParams.bg_color || "#ffffff"; 
                        document.body.style.color = tg.themeParams.text_color || "#000000";
                    } else {
                        // Возвращаемся к исходному фону
                        document.body.style.backgroundColor = originalBackground; 
                        document.body.style.color = originalColor;
                    }
            
                    console.log("After change -> Background:", document.body.style.backgroundColor);
                    break;
                } catch (error) {
                    console.error("Theme switch error:", error);
                    tg.showAlert(`⚠️ Ошибка: ${error.message}`);
                }

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
