// Производство меда
let currentHoney = 0;
let totalHoney = parseFloat(localStorage.getItem('totalHoney')) || 0; // Общий мед
let progress = 0;
let productionRate = 0.0083; // Скорость производства меда (0.5 в минуту)
let productionTime = 7200; // Цикл производства (2 часа)
let isProducing = false;

const currentHoneyDisplay = document.getElementById('currentHoney');
const totalHoneyDisplay = document.getElementById('totalHoney');
const progressBar = document.getElementById('progress');
const collectButton = document.getElementById('collectButton');
const upgradeButton = document.getElementById('upgradeButton');
const referralsButton = document.getElementById('referralsButton');

// Обновление отображения
function updateDisplays() {
    currentHoneyDisplay.textContent = currentHoney.toFixed(3); // До 3 знаков
    totalHoneyDisplay.textContent = totalHoney.toFixed(3);
}

// Сохранение данных
function saveData() {
    localStorage.setItem('totalHoney', totalHoney);
}

// Запуск производства меда
function startProduction() {
    if (isProducing) return;
    isProducing = true;

    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            isProducing = false;
            alert("Производство завершено! Соберите мед.");
            return;
        }

        progress += (100 / productionTime); // Увеличиваем прогресс
        currentHoney += productionRate; // Увеличиваем текущий мед
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

    totalHoney += currentHoney; // Добавляем текущий мед в общий
    currentHoney = 0; // Обнуляем текущий мед
    progress = 0; // Сбрасываем прогресс
    progressBar.style.width = "0%";
    alert(`Вы собрали ${totalHoney.toFixed(3)} меда!`);
    saveData();
    updateDisplays();
    startProduction();
});

// Улучшения
upgradeButton.addEventListener('click', () => {
    alert("Раздел улучшений в разработке.");
});

// Рефералы
referralsButton.addEventListener('click', () => {
    alert("Раздел рефералов в разработке.");
});

// Инициализация
updateDisplays();
startProduction();
