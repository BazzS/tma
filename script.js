let tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем Mini App на весь экран

// Получение информации о пользователе
let user = tg.initDataUnsafe ? tg.initDataUnsafe.user : null;
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
let theme = tg.colorScheme; // Получаем текущую тему
console.log("Current theme:", theme); // Выведет "light" или "dark"
// let originalBackground = tg.themeParams?.bg_color || "blue"; // Используем цвет фона из параметров темы
// let originalColor = getComputedStyle(document.body).color;

// console.log("Original Background:", originalBackground);
// console.log("Original Text Color:", originalColor);

// Логика для кнопок внутри Mini Apps Menu
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("mini-item")) {
        let feature = event.target.dataset.feature;

        switch (feature) {
            case "user-data":
                if (tg.showAlert) {
                    tg.showAlert(`User: ${userName}`);
                }
                break;

            case "theme":
                if (tg.colorScheme === "dark") {
                    document.body.style.backgroundColor = tg.themeParams.bg_color || "#1c1c1e"; 
                    document.body.style.color = tg.themeParams.text_color || "#ffffff";
                } else {
                    document.body.style.backgroundColor = tg.themeParams.bg_color || "#ffffff"; 
                    document.body.style.color = tg.themeParams.text_color || "#000000";
                }

            case "close":
                if (tg.close) {
                    tg.close();
                }
                break;

            case "send-data":
                if (tg.sendData) {
                    tg.sendData(JSON.stringify({ action: "sent from Mini Apps" }));
                    setTimeout(() => {
                        if (tg.showAlert) {
                            tg.showAlert("✅ Data sent to bot!");
                        }
                    }, 500); // Небольшая задержка для уверенности, что данные отправлены
                }
                break;

            case "popup":
                if (tg.showPopup) {
                    tg.showPopup({
                        title: "Mini App Alert",
                        message: "This is a Telegram Mini App popup!",
                        buttons: [{ text: "OK", type: "ok" }]
                    });
                }
                break;

            case "haptic":
                if (tg.HapticFeedback && tg.HapticFeedback.impactOccurred) {
                    tg.HapticFeedback.impactOccurred("medium");
                }
                break;

            default:
                console.log("Unknown feature");
        }
    }
});
