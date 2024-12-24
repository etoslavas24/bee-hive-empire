// Элементы интерфейса
const incomeDisplay = document.getElementById('income');
const totalBalanceDisplay = document.getElementById('balance');
const collectButton = document.getElementById('collectButton');
const burgerMenu = document.getElementById('burgerMenu');
const settingsButton = document.getElementById('settingsButton');

// Переменные
let incomeRate = 0.0083; // Мед в секунду (0.5 в минуту)
let totalBalance = parseFloat(localStorage.getItem('totalBalance')) || 0; // Общий баланс
let currentHoney = parseFloat(localStorage.getItem('currentHoney')) || 0; // Текущий заработок меда
let storageLimit = 60; // Максимальное хранилище (мед за 2 часа)

// Производство меда
function startProduction() {
    setInterval(() => {
        if (currentHoney < storageLimit) {
            currentHoney += incomeRate; // Увеличиваем текущий заработок
            incomeDisplay.textContent = currentHoney.toFixed(4); // Обновляем отображение текущего меда
            localStorage.setItem('currentHoney', currentHoney); // Сохраняем текущий заработок
        } else {
            alert("Хранилище заполнено! Соберите мед.");
        }
    }, 1000); // Каждую секунду
}

// Сбор меда
collectButton.addEventListener('click', () => {
    if (currentHoney > 0) {
        totalBalance += currentHoney; // Добавляем текущий мед в общий баланс
        currentHoney = 0; // Сбрасываем текущий заработок
        totalBalanceDisplay.textContent = totalBalance.toFixed(4); // Обновляем общий баланс
        incomeDisplay.textContent = currentHoney.toFixed(4); // Сбрасываем отображение текущего меда
        localStorage.setItem('totalBalance', totalBalance); // Сохраняем общий баланс
        localStorage.setItem('currentHoney', currentHoney); // Сохраняем текущий заработок
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
totalBalanceDisplay.textContent = totalBalance.toFixed(4); // Отображаем начальный баланс
incomeDisplay.textContent = currentHoney.toFixed(4); // Отображаем начальный заработок
