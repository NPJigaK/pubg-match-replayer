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

  playTimeSlider.noUiSlider.on('update.one',
      function (values, handle, rawValues) {
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

  speedRatioSlider.noUiSlider.on('update.one',
      function (values, handle, rawValues) {
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

  // create phase skip
  createPhaseSkip(matchDurationMilliSeconds, allPhase);
  // create global state skip
  createGlobalStateSkip(matchDurationMilliSeconds);

  // init set slider position
  maximumValue = playTimeSlider.noUiSlider.options.range.max;
  setTimeOnSlider(maximumValue)
}

function createPhaseSkip(matchDurationMilliSeconds, allPhase) {
  let leftSlider = document.getElementsByClassName("left-slider")[0];
  _.forEach(allPhase, phase => {
    // ToDo https://github.com/KagiJPN/pubg-match-replayer/issues/16
    let obj = `<div class="skip-phase" style="left: ${(phase.msSinceEpoch
        / matchDurationMilliSeconds)
    * 100}%;z-index: 10" onclick="setTimeOnSlider('${phase.msSinceEpoch}')"></div>`;
    leftSlider.insertAdjacentHTML('beforeend', obj);
  })
}

function createGlobalStateSkip(matchDurationMilliSeconds) {
  let leftSlider = document.getElementsByClassName("left-slider")[0];
  // console.log(_globalState.kills)
  // ToDo https://github.com/KagiJPN/pubg-match-replayer/issues/31
  _.forEach(_globalState.kills, kill => {
    let obj = `<div class="skip-kills" style="left: ${(kill.msSinceEpoch
        / matchDurationMilliSeconds)
    * 100}%;z-index: 10" onclick="setTimeOnSlider('${kill.msSinceEpoch}')"></div>`;
    leftSlider.insertAdjacentHTML('beforeend', obj);
  });

  let obj = `<div class="skip-death" style="left: ${(_globalState.death.msSinceEpoch
      / matchDurationMilliSeconds)
  * 100}%;z-index: 10" onclick="setTimeOnSlider('${_globalState.death.msSinceEpoch}')"></div>`;
  leftSlider.insertAdjacentHTML('beforeend', obj);

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