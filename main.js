const incomeDisplay = document.getElementById('income');
const totalBalanceDisplay = document.getElementById('balance');
const collectButton = document.getElementById('collectButton');
const burgerMenu = document.getElementById('burgerMenu');
const settingsButton = document.getElementById('settingsButton');

let incomeRate = 0.0083; // Мед в секунду
let totalBalance = 0;
let currentHoney = 0;
let storageLimit = 60; // Максимальное хранилище (мед за 2 часа)

// Производство меда
function startProduction() {
    setInterval(() => {
        if (currentHoney < storageLimit) {
            currentHoney += incomeRate;
            incomeDisplay.textContent = currentHoney.toFixed(4);
        }
    }, 1000);
}

// Сбор меда
collectButton.addEventListener('click', () => {
    if (currentHoney > 0) {
        totalBalance += currentHoney;
        currentHoney = 0;
        totalBalanceDisplay.textContent = totalBalance.toFixed(4);
        incomeDisplay.textContent = currentHoney.toFixed(4);
    } else {
        alert("Нет меда для сбора!");
    }
});

// Открытие/закрытие бургер-меню
settingsButton.addEventListener('click', () => {
    burgerMenu.classList.toggle('hidden');
});

// Запуск игры
startProduction();
