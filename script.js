let timerDisplay = document.querySelector('.timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsList = document.getElementById('laps-list');

let interval;
let elapsedTime = 0;
let isRunning = false;

function formatTime(time) {
    const ms = Math.floor((time % 1000) / 100);
    const s = Math.floor((time / 1000) % 60);
    const m = Math.floor((time / (1000 * 60)) % 60);
    return `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')} : ${ms}`;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        const startTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timerDisplay.textContent = formatTime(elapsedTime);
        }, 100);
        isRunning = true;
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(interval);
    elapsedTime = 0;
    timerDisplay.textContent = '00 : 00 : 00';
    lapsList.innerHTML = '';
    isRunning = false;
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span>Lap ${lapsList.childElementCount + 1}</span><span>${lapTime}</span>`;
        lapsList.prepend(lapItem);
    }
});
