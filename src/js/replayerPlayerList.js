function clickTeam(teamElement, num) {
  if (isTrackingFlag) {
    if (document.getElementsByClassName("clickTeam").length < 4) {
      teamElement.classList.toggle("clickTeam");
      if (teamElement.classList.contains("clickTeam")) {
        teamGraphicsArr[num].visible = true;
        drawTrackingLine(num)
      } else {
        teamGraphicsArr[num].visible = false;
        removeTrackingLine(num)
      }
    } else {
      teamElement.classList.remove("clickTeam");
      teamGraphicsArr[num].visible = false;
      removeTrackingLine(num)
    }
  }
}

function updatePlayerList(player) {
  let playerElement = document.getElementById(`player_${player.name}`);
  playerElement.children[2].innerText = player.kills;
  playerElement.children[3].innerText = Math.round(player.damageDealt);
}

function InitPlayerList(roster) {
  // console.log(roster)
  let playerList = document.getElementsByClassName("playerList")[0]
  let teamNum = 0;
  let playerNum = 1;

  _.forEach(roster, team => {
    let obj = `<ul class="team" onclick="clickTeam(this, ${teamNum})">`
    _.forEach(team, player => {
      obj += `<li class="player" id="player_${player}" style="color: rgb(0, 0, 0);">
                        <div class="playerNumber" style="background-color: #${teamGraphicsArr[teamNum].teamColor.slice(
          2)};">${playerNum++}</div>
                        <div class="playerName">${player}</div>
                        <div class="killAndDamage">0</div>
                        <div class="killAndDamage">0</div>
                    </li>`
    })
    obj += `</ul>`

    playerList.insertAdjacentHTML('beforeend', obj);

    teamNum++
  })
}