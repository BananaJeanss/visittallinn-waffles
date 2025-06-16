function updateTime() {
    const now = new Date();

    const tallinnTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Tallinn" }));

    const hours = tallinnTime.getHours().toString().padStart(2, '0');
    const minutes = tallinnTime.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const timeElement = document.getElementById('current-time');
    const timezoneElement = document.getElementById('time-zone');

    if (timeElement) {
        timeElement.textContent = timeString;
    }

    if (timezoneElement) {
        timezoneElement.textContent = 'Europe/Tallinn (EET/EEST)';
    }
}

function initializeClock() {
    updateTime();
    setInterval(updateTime, 1000);
}

document.addEventListener('DOMContentLoaded', initializeClock);
