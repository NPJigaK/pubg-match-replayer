/*click event
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function clickSearchButton() {
  if (document.searchform.search.value == "" || document.searchform.region.value
      == "") {
    alert("The PUBG NAME with nothing plugged in yet.");
  } else {
    document.searchform.action = MATCH_LIST_PAGE_URL;
    document.searchform.submit();
  }
}

async function clickAddApiKeyButton() {
  let newApiKey = await document.getElementById("ApiKeyInput").value.trim();
  // Check characters briefly.
  if (newApiKey == "" || !~newApiKey.indexOf(".")) {
    alert("API key is invalid character.");
    return;
  }

  // Check if key already exists.
  let table = await document.getElementById("ApiKeys");
  let currentTime = await GetCurrentTime(new Date());
  if (checkAlreadyKey(table, newApiKey)) {
    // Insert row
    insertRow(table, newApiKey, currentTime);

    // Added to apiKeyList in apikey
    let apiKeyList = JSON.parse(window.localStorage.getItem(API_KEY_LIST_KEY));
    console.log(apiKeyList);
    apiKeyList.push({APIKEY_KEY: newApiKey, CURRENT_TIME_KEY: currentTime});
    window.localStorage.setItem(API_KEY_LIST_KEY, JSON.stringify(apiKeyList));

    // Reset value
    document.getElementById("ApiKeyInput").value = "";
  } else {
    alert("API key already exists.");
  }
}

function clickDeleteApiKeyButton(obj) {
  // Delete row
  deleteRow(obj);

  // Removed apiKeyList in apikey
  let apiKeyList = JSON.parse(window.localStorage.getItem(API_KEY_LIST_KEY));
  for (let i = 0; i < apiKeyList.length; i++) {
    if (tr.cells[1].innerText == apiKeyList[i].APIKEY_KEY) {
      apiKeyList.splice(i, 1);
    }
  }
  window.localStorage.setItem(API_KEY_LIST_KEY, JSON.stringify(apiKeyList));
}

/*check
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function checkAlreadyKey(table, newApiKey) {
  for (let i = 1; i < table.rows.length; i++) {
    if (newApiKey == table.rows[i].cells[1].innerText) {
      console.log(newApiKey);
      console.log(table.rows[i].cells[1].innerText);
      return false;
    }
  }
  console.log(newApiKey);
  console.log(table.rows);
  return true;
}

/*table
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function insertRow(table, newApiKey, currentTime) {
  // Insert row at end of line
  let row = table.insertRow(-1);
  // Insert cell
  let cell1 = row.insertCell(-1);
  let cell2 = row.insertCell(-1);
  let cell3 = row.insertCell(-1);
  // Button HTML
  var BUTTON_HTML =
      '<input class="searchButton" type="button" value="DELETE" onclick="clickDeleteApiKeyButton(this)" />';

  // Enter cell contents
  cell1.innerHTML = currentTime;
  cell2.innerHTML = newApiKey;
  cell3.innerHTML = BUTTON_HTML;
}

function deleteRow(obj) {
  // Get the row where the delete button was pressed
  tr = obj.parentNode.parentNode;
  // Get tr index and delete rows
  tr.parentNode.deleteRow(tr.sectionRowIndex);
}

/*other 
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function GetCurrentTime(date) {
  return `${(date.getMonth() + 1)}` + '/'
      + `${date.getDate()}` + ' '
      + `${getdoubleDigestNumer(date.getHours())}` + ':'
      + `${getdoubleDigestNumer(date.getMinutes())}`;
}

function getdoubleDigestNumer(number) {
  return ("0" + number).slice(-2);
}
