const stepOfMsec = 100;
let speedRatio = 1;
let maximumValue;

let playTimeSlider;

function InitSlider(matchDurationMilliSeconds, allPhase) {
    playTimeSlider = document.getElementById('slider-play-time');
    noUiSlider.create(playTimeSlider, {
        start: [0],
        step: stepOfMsec,
        connect: [true, false],
        tooltips: [true],
        format: {to: millisToMinutesAndSeconds, from: Number},
        range: {
            'min': 0,
            'max': matchDurationMilliSeconds + 2000
        }
    });

    const speedRatioSlider = document.getElementById('slider-magnification');
    noUiSlider.create(speedRatioSlider, {
        start: [6],
        step: 1,
        tooltips: [true],
        format: {to: toRatiosFormat, from: Number},
        range: {
            'min': 1,
            'max': 12
        }
    });

    playTimeSlider.noUiSlider.on('update.one', function (values, handle, rawValues) {
        let now = Math.round(rawValues)
        let stateAt = _stateAt(Math.round(now))
        //phaseCircleGraphicsArr;
        //blueZoneGraphics;
        updateCircle(stateAt.bluezone, stateAt.isGame)
        if (enableTool == t_REPLAY) {
            updateReplayer(now)
            //console.log(playTimeSlider.noUiSlider.get())
        }
    });

    speedRatioSlider.noUiSlider.on('update.one', function (values, handle, rawValues) {
        speedRatio = Math.round(rawValues)
        console.log(speedRatio)
        updateTimer()
    });

    document.getElementById('play-button').addEventListener('click', function () {
        // console.log(this.firstElementChild)
        if (this.firstElementChild.classList.contains('fi-play')) {
            startTimer()
        } else if (this.firstElementChild.classList.contains('fi-pause')) {
            stopTimer()
        }

        this.firstElementChild.classList.toggle('fi-play')
        this.firstElementChild.classList.toggle('fi-pause')
    });

    // create skip phase
    let leftSlider = document.getElementsByClassName("left-slider")[0]
    _.forEach(allPhase, phase => {
        // ToDo 何故か element の value が取得できないから、直接 phase.msSinceEpoch 代入してる
        let obj = `<div class="skip-phase" style="left: ${(phase.msSinceEpoch / matchDurationMilliSeconds) * 100}%;" onclick="setTimeOnSlider('${phase.msSinceEpoch}')"></div>`;
        leftSlider.insertAdjacentHTML('beforeend', obj);
    })

    // init set slider position
    maximumValue = playTimeSlider.noUiSlider.options.range.max;
    setTimeOnSlider(maximumValue)
}

function setTimeOnSlider(msSinceEpoch) {
    playTimeSlider.noUiSlider.set(msSinceEpoch)
}

function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(1);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function toRatiosFormat(ratio) {
    return Math.round(ratio) + "x";
}