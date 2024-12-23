// Инициализация данных
let currentHoney = 0;
let totalHoney = parseInt(localStorage.getItem('totalHoney')) || 0;
let productionRate = 1; // Скорость производства меда (мед за секунду)
let productionTime = 7200; // Время цикла производства в секундах (2 часа)
let progress = 0;
let isProducing = false;

const currentHoneyDisplay = document.getElementById('currentHoney');
const totalHoneyDisplay = document.getElementById('totalHoney');
const collectButton = document.getElementById('collectButton');
const progressBar = document.getElementById('progress');

// Обновление интерфейса
function updateDisplays() {
    currentHoneyDisplay.textContent = currentHoney;
    totalHoneyDisplay.textContent = totalHoney;
}

// Запуск производства
function startProduction() {
    if (isProducing) return;
    isProducing = true;
    progress = 0;
    currentHoney = 0;

    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            isProducing = false;
            collectButton.disabled = false;
            alert("Производство остановлено! Соберите мед.");
            return;
        }

        progress += (100 / productionTime) * productionRate;
        currentHoney += productionRate / productionTime;
        progressBar.style.width = `${progress}%`;
        updateDisplays();
    }, 1000);
}

// Сбор меда
collectButton.addEventListener('click', () => {
    if (!isProducing && progress < 100) {
        alert("Мед еще не готов. Подождите!");
        return;
    }

    totalHoney += Math.floor(currentHoney);
    localStorage.setItem('totalHoney', totalHoney);

    alert(`Вы собрали ${Math.floor(currentHoney)} меда!`);
    currentHoney = 0;
    progress = 0;
    progressBar.style.width = "0%";
    collectButton.disabled = true;
    updateDisplays();
    startProduction();
});

// Инициализация
updateDisplays();
startProduction();
