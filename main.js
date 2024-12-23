// Уникальный идентификатор пользователя
let userId = localStorage.getItem('userId');
if (!userId) {
    userId = `user_${Date.now()}`;
    localStorage.setItem('userId', userId);
}

// Инициализация данных
let currentHoney = parseFloat(localStorage.getItem(`${userId}_currentHoney`)) || 0;
let totalHoney = parseFloat(localStorage.getItem(`${userId}_totalHoney`)) || 0;
let productionRate = 0.0083; // 0.5 меда в минуту (0.0083 в секунду)
let productionTime = 7200; // Время цикла производства в секундах (2 часа)
let progress = parseFloat(localStorage.getItem(`${userId}_progress`)) || 0;
let isProducing = false;

const currentHoneyDisplay = document.getElementById('currentHoney');
const totalHoneyDisplay = document.getElementById('totalHoney');
const collectButton = document.getElementById('collectButton');
const progressBar = document.getElementById('progress');

// Обновление интерфейса
function updateDisplays() {
    currentHoneyDisplay.textContent = currentHoney.toFixed(3); // Ограничиваем до 3 знаков
    totalHoneyDisplay.textContent = totalHoney.toFixed(3); // Ограничиваем до 3 знаков
}

// Сохранение данных пользователя
function saveUserData() {
    localStorage.setItem(`${userId}_currentHoney`, currentHoney);
    localStorage.setItem(`${userId}_totalHoney`, totalHoney);
    localStorage.setItem(`${userId}_progress`, progress);
}

// Запуск производства
function startProduction() {
    if (isProducing) return;
    isProducing = true;

    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            isProducing = false;
            collectButton.disabled = false;
            alert("Производство остановлено! Соберите мед.");
            saveUserData();
            return;
        }

        progress += (100 / productionTime) * productionRate;
        currentHoney += productionRate;
        progressBar.style.width = `${progress}%`;
        updateDisplays();
        saveUserData();
    }, 1000);
}

// Сбор меда
collectButton.addEventListener('click', () => {
    if (!isProducing && progress < 100) {
        alert("Мед еще не готов. Подождите!");
        return;
    }

    totalHoney += currentHoney;
    currentHoney = 0;
    progress = 0;

    localStorage.setItem(`${userId}_totalHoney`, totalHoney);
    alert(`Вы собрали ${totalHoney.toFixed(3)} меда!`);
    progressBar.style.width = "0%";
    collectButton.disabled = true;
    updateDisplays();
    saveUserData();
    startProduction();
});

// Инициализация
updateDisplays();
startProduction();
