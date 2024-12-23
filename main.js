// Инициализация данных
let honey = parseInt(localStorage.getItem('honey')) || 0;
let productionRate = parseInt(localStorage.getItem('productionRate')) || 1; // Мед в час
let collectInterval = parseInt(localStorage.getItem('collectInterval')) || 60; // Таймер в секундах

const honeyDisplay = document.getElementById('honey');
const collectButton = document.getElementById('collectButton');
const upgradeRateButton = document.getElementById('upgradeRateButton');
const upgradeCapacityButton = document.getElementById('upgradeCapacityButton');

// Обновление меда в интерфейсе
function updateHoneyDisplay() {
    honeyDisplay.textContent = honey;
}

// Производство меда каждые collectInterval секунд
setInterval(() => {
    honey += productionRate;
    localStorage.setItem('honey', honey);
    updateHoneyDisplay();
}, collectInterval * 1000);

// Обработка кнопки сбора меда
collectButton.addEventListener('click', () => {
    alert(`Вы собрали ${honey} меда!`);
    honey = 0; // Сбрасываем мед после сбора
    localStorage.setItem('honey', honey);
    updateHoneyDisplay();
});

// Улучшение производства
upgradeRateButton.addEventListener('click', () => {
    if (honey >= 100) {
        honey -= 100;
        productionRate *= 2;
        localStorage.setItem('honey', honey);
        localStorage.setItem('productionRate', productionRate);
        alert('Производство улучшено!');
        updateHoneyDisplay();
    } else {
        alert('Недостаточно меда!');
    }
});

// Увеличение времени между сборами
upgradeCapacityButton.addEventListener('click', () => {
    if (honey >= 200) {
        honey -= 200;
        collectInterval *= 2;
        localStorage.setItem('honey', honey);
        localStorage.setItem('collectInterval', collectInterval);
        alert('Вместимость увеличена!');
        updateHoneyDisplay();
    } else {
        alert('Недостаточно меда!');
    }
});

// Первое обновление интерфейса
updateHoneyDisplay();
