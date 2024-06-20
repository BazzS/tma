Telegram.WebApp.ready();

const user = Telegram.WebApp.initDataUnsafe.user;
const greetingElement = document.getElementById('greeting');

if (user) {
    greetingElement.textContent = `Hello, ${user.first_name}!`;
} else {
    greetingElement.textContent = 'Hello, Telegram User!';
}