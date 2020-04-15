let timerInterval;

function loopTimer() {
    let currentTime = playTimeSlider.noUiSlider.get();
    if (currentTime < maximumValue) {
        playTimeSlider.noUiSlider.set(currentTime + stepOfMsec);
    } else {
        document.getElementById("play-button").click()
    }
}

function startTimer() {
    timerInterval = setInterval(loopTimer, 100 / speedRatio);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    if (timerInterval) {
        stopTimer();
        startTimer();
    }
}