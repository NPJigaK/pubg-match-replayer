const t_LANDING_LOCATION = 1;
const t_REPLAY = 2;
let enableTool = t_LANDING_LOCATION;// 1: Landing Location, 2: Replay
let _stateAt;
let _finalRoster;
let isDeadFlag = true;
let isTrackingFlag = false;

async function initReplayer() {
    const detailMatches = await JSON.parse(sessionStorage.getItem(`detailMatcheData`));

    // console.log(detailMatches)

    // wrapping array
    let matches = getMatches([detailMatches])
    const match = matches[0];

    // console.log(match)

    // initialize map
    InitMap(match.mapName)

    const res = await fetch(match.telemetryUrl)
    const telemetryData = await res.json()

    const {state, globalState} = parseTelemetry(match, telemetryData, detailMatches.focusedPlayer)
    // console.log(state)
    // console.log(globalState)
    // console.log(match.durationSeconds * 1000)


    const {stateAt, finalRoster} = Telemetry(state);
    _stateAt = stateAt;
    _finalRoster = finalRoster;

    // Initialize Team Graphics Objects
    InitTeamGraphics(_finalRoster(), _stateAt(0).playerLocations)
    // console.log(_stateAt(match.durationSeconds * 1000))

    // Initialize other menu
    InitSideMenu(match, stateAt(match.durationSeconds * 1000), _finalRoster())

    // Initialize more map contents
    // FlightPath, PhaseCircle
    InitMoreMap(
        await getFlightPaths(telemetryData, match.mapName),
        _stateAt(match.durationSeconds * 1000).isGame)

    // set Landing Location
    setLandingLocation()
}

function InitSideMenu(match, lastStateAt, roster) {

    InitSlider(match.durationSeconds * 1000, lastStateAt.isGame.allPhase)

    InitPlayerList(roster)
}


window.addEventListener('DOMContentLoaded', (event) => {
    const ar = Array.prototype.slice.call(document.getElementsByName('switch-tool'));
    for (let e in ar) {
        ar[e].onchange = function () {
            for (let ee in ar) {
                ar[ee].checked = false;
            }
            this.checked = true;
            enableTool = this.value;
            resetMap()
            if (enableTool == t_LANDING_LOCATION) {
                setLandingLocation()
                document.getElementById('switch-tracking-line').disabled =
                    document.getElementById('switch-is-dead').disabled = true;
            } else if (enableTool == t_REPLAY) {
                setReplay()
                document.getElementById('switch-tracking-line').disabled =
                    document.getElementById('switch-is-dead').disabled = false;
            }
        };
    }
    document.getElementById('switch-flight-path').onchange = function () {
        flightPathContainer.visible = this.checked
    }
    document.getElementById('switch-phase-circle').onchange = function () {
        _.forEach(phaseCircleGraphicsArr, phaseCircle => {
            phaseCircle.graphics.visible = this.checked
        })
    }
    document.getElementById('switch-tracking-line').onchange = function () {
        isTrackingFlag = this.checked;
        if(isTrackingFlag){
            resetMap();
        }
        setReplay()
    }
    document.getElementById('switch-is-dead').onchange = function () {
        const stateAt = _stateAt(nowTimeMsec)
        _.forEach(teamGraphicsArr, team => {
            _.forEach(team.member, member => {
                if (stateAt.players[member.name].status == "dead") {
                    member.circleGraphics.visible = !this.checked;
                    member.basicText.visible = !this.checked;
                }
            })
        })
        isDeadFlag = this.checked;
    }
});

async function getFlightPaths(telemetryJson, mapName) {
    let flightPaths = [];

    const mapSize = PUBG_MAPS.getByValue("original", mapName).mapSize
    const flightPathMargin = mapSize / 10;

    await telemetryJson.filter(function (value, index) {
        if (value.vehicle && value.character && value.common.isGame >= 0.1 && value.vehicle.vehicleType == "TransportAircraft") {
            if (calcWithinRange((value.character.location.x / 100), (mapSize - flightPathMargin), flightPathMargin)
                && calcWithinRange((value.character.location.y / 100), (mapSize - flightPathMargin), flightPathMargin)) {
                flightPaths.push({
                    x: value.character.location.x / 100,
                    y: value.character.location.y / 100
                });
            }
        }
    });

    return calcFirstAndEndFlightPathJson(
        flightPaths[0],
        flightPaths[flightPaths.length - 1],
        mapSize,
        flightPathMargin
    );
}

/**
 * Make flightPath json
 *
 * ToDo
 * @param {*} firstLocation
 * @param {*} lastLocation
 */
function calcFirstAndEndFlightPathJson(firstLocation, lastLocation, mapSize, flightPathMargin) {
    const ax = firstLocation.x;
    const ay = firstLocation.y;
    const bx = lastLocation.x;
    const by = lastLocation.y;

    const cx = ((bx - ax) / (by - ay)) * (flightPathMargin - ay) + ax;
    const dx = ((bx - ax) / (by - ay)) * ((mapSize - flightPathMargin) - ay) + ax;

    const cy = ((by - ay) / (bx - ax)) * (flightPathMargin - ax) + ay;
    const dy = ((by - ay) / (bx - ax)) * ((mapSize - flightPathMargin) - ax) + ay;

    let flightPathJson = {first: {}, last: {}};

    if (calcWithinRange(cx, (mapSize - flightPathMargin), flightPathMargin)) {
        if (Math.abs(cx - ax) < Math.abs(cx - bx)) {
            flightPathJson.first.x = cx;
            flightPathJson.first.y = flightPathMargin;
        } else {
            flightPathJson.last.x = cx;
            flightPathJson.last.y = flightPathMargin;
        }
    }
    if (calcWithinRange(cy, (mapSize - flightPathMargin), flightPathMargin)) {
        if (Math.abs(cy - ay) < Math.abs(cy - by)) {
            flightPathJson.first.y = cy;
            flightPathJson.first.x = flightPathMargin;
        } else {
            flightPathJson.last.y = cy;
            flightPathJson.last.x = flightPathMargin;
        }
    }
    if (calcWithinRange(dx, (mapSize - flightPathMargin), flightPathMargin)) {
        if (Math.abs(dx - ax) < Math.abs(dx - bx)) {
            flightPathJson.first.x = dx;
            flightPathJson.first.y = mapSize - flightPathMargin;
        } else {
            flightPathJson.last.x = dx;
            flightPathJson.last.y = mapSize - flightPathMargin;
        }
    }
    if (calcWithinRange(dy, (mapSize - flightPathMargin), flightPathMargin)) {
        if (Math.abs(dy - ay) < Math.abs(dy - by)) {
            flightPathJson.first.y = dy;
            flightPathJson.first.x = mapSize - flightPathMargin;
        } else {
            flightPathJson.last.y = dy;
            flightPathJson.last.x = mapSize - flightPathMargin;
        }
    }

    return flightPathJson;
}

function calcWithinRange(num, upper, lower) {
    if (lower <= num && num <= upper) {
        return true;
    }
    return false;
}
  