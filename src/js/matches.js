/*PUBG
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function getRandomApiKey(apiKeyList) {
  return apiKeyList[Math.floor(Math.random() * apiKeyList.length)];
}

async function getMatches(playersJson) {
  return await playersJson.data[0].relationships.matches.data.map(e => e.id);
}

async function selectMatchToJson(detailMatcheData) {
  //let flightPath = await getFlightPaths(telemetryJson, mapName);
}

/*table
–––––––––––––––––––––––––––––––––––––––––––––––––– */
async function insertRow(table, currentTime, mapName, gameMode, rank, kills,
    detailMatcheData) {
  // Insert row at end of line
  let row = table.insertRow(-1);

  // Insert cell
  let cell1 = row.insertCell(-1);
  let cell2 = row.insertCell(-1);
  let cell3 = row.insertCell(-1);
  let cell4 = row.insertCell(-1);
  let cell5 = row.insertCell(-1);
  let cell6 = row.insertCell(-1);
  let cell7 = row.insertCell(-1);

  // Button HTML
  var BUTTON_HTML =
      '<input class="searchButton" type="button" value="Map Analyze" onclick="selectMatch(this)" />';

  // Enter cell contents
  cell1.innerHTML = await GetCurrentTime(new Date(currentTime));
  cell2.innerHTML = PUBG_MAPS.getByValue("original", mapName).name;
  cell3.innerHTML = getPubgGameMode(gameMode);
  cell4.innerHTML = getGetOrdinal(rank);
  cell5.innerHTML = kills + "kills";
  cell6.innerHTML = BUTTON_HTML;
  cell7.innerHTML = detailMatcheData;

  cell7.style.display = "none";

  // console.log(row)
}

function selectMatch(obj) {
  // Button Pressed Only Once
  obj.disabled = "true";

  // Get the row where the button was pressed
  tr = obj.parentNode.parentNode;

  // Convert selected matches to JSON for this system;
  // selectMatchToJson(tr.cells[6].innerHTML);

  sessionStorage.setItem(`detailMatcheData`, tr.cells[6].innerHTML);

  window.location.href = '../replayer';
}

/*other 
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function GetCurrentTime(date) {
  return (
      `${date.getMonth() + 1}` +
      "/" +
      `${date.getDate()}` +
      " " +
      `${getdoubleDigestNumer(date.getHours())}` +
      ":" +
      `${getdoubleDigestNumer(date.getMinutes())}`
  );
}

function getdoubleDigestNumer(number) {
  return ("0" + number).slice(-2);
}
