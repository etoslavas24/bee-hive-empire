// Производство
let currentHoney = 0;
let totalHoney = 0;
let progress = 0;
let productionRate = 0.0083; // Скорость производства меда
let productionTime = 7200; // Время цикла производства в секундах (2 часа)
let isProducing = false;

const progressBar = document.getElementById('progress');
const collectButton = document.getElementById('collectButton');
const upgradeButton = document.getElementById('upgradeButton');
const referralsButton = document.getElementById('referralsButton');

// Обновление прогресса
function startProduction() {
    if (isProducing) return;
    isProducing = true;

    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            isProducing = false;
            alert("Производство завершено! Заберите мед.");
            return;
        }

        progress += (100 / productionTime);
        currentHoney += productionRate;
        progressBar.style.width = `${progress}%`;
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
    progressBar.style.width = "0%";
    alert(`Вы собрали ${totalHoney.toFixed(3)} меда!`);
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

// Старт
startProduction();
