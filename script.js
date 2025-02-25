// Проверяем, загружен ли Telegram Mini Apps API
if (!window.Telegram || !window.Telegram.WebApp) {
    console.error("Telegram Mini Apps API не загружен!");
} else {
    var tg = window.Telegram.WebApp;
    tg.expand(); // Раскрываем Mini App на весь экран
}

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

function applyTheme() {
    console.log("Current theme:", tg.colorScheme);

    if (tg.colorScheme === "dark") {
        document.body.style.backgroundColor = tg.themeParams.bg_color || "#1c1c1e"; 
        document.body.style.color = tg.themeParams.text_color || "#ffffff";
    } else {
        document.body.style.backgroundColor = tg.themeParams.bg_color || "#ffffff"; 
        document.body.style.color = tg.themeParams.text_color || "#000000";
    }
}

// Запускаем функцию сразу после загрузки
applyTheme();

// Отслеживаем изменение темы в Telegram
tg.onEvent("themeChanged", applyTheme);

// Логика для кнопок Mini Apps Menu
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
                applyTheme(); // Применяем тему при нажатии
                break;

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
                    }, 500);
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
                console.log("Unknown feature:", feature);
        }
    }
});
