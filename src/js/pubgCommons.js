const MATCH_LIST_PAGE_URL = "../matches/";
const API_KEY_LIST_KEY = "apikeyList";
let pubgPlayerId = "account.15cbf322a9bc45e88b0cd9f12ef4188e"; // default chocoTaco
let pubgPlayerName = "chocoTaco"; // default chocoTaco
let pubgMatchId;
let pubgShardId = "steam";
let pubgTelemetryUrl;

function hrefSite(siteName) {
  console.log(siteName)
  if (siteName == "PUBGREPORT") {
    window.open(`https://pubg.report/streams/${pubgPlayerId}`, '_blank');
  } else if (siteName == 'OPGG') {
    if (pubgShardId == "steam") {
      window.open(`https://pubg.op.gg/user/${pubgPlayerName}`, '_blank');
    } else {
      window.open(`https://pubglookup.com/players/psn/${pubgPlayerName}`,
          '_blank');
    }
  } else if (siteName == '3DMAPREPLAY') {
    if (pubgShardId == "steam") {
      pubgShardId = "pc"
    }
    window.open(
        `https://pubg-replay.com/match/${pubgShardId}/${pubgMatchId}?highlight=${pubgPlayerName}`,
        '_blank');
  } else if (siteName == 'CHICKENDINNER') {
    let ptu = pubgTelemetryUrl
    .replace("https://telemetry-cdn.playbattlegrounds.com/bluehole-pubg", "")
    .replace("-telemetry.json", "")
    window.open(`https://minmax.gg/chickendinner${ptu}?follow=${pubgPlayerName}`, '_blank');
  } else if (siteName == 'README') {
    window.open(`https://kagijpn.github.io/pubg-match-replayer/`, '_blank');
  }


}

/**Map name enum */
const PUBG_MAPS = defineEnum({
  MIRAMAR: {
    original: "Desert_Main",
    name: "Miramar",
    mapSize: 8192
  },
  CLASSIC_ERANGEL: {
    original: "Erangel_Main",
    name: "Erangel(classic)",
    mapSize: 8192
  },
  SANHOK: {
    original: "Savage_Main",
    name: "Sanhok",
    mapSize: 4096
  },
  CAMP_JACKAL: {
    original: "Range_Main",
    name: "Camp Jackal",
    mapSize: 0
  },
  VIKENDI: {
    original: "DihorOtok_Main",
    name: "Vikendi",
    mapSize: 6144
  },
  ERANGEL: {
    original: "Baltic_Main",
    name: "Erangel",
    mapSize: 8192
  },
  KARAKIN: {
    original: "Summerland_Main",
    name: "Karakin",
    mapSize: 2048
  }
});

/**
 * =============================================================
 * game mode converter wrapper
 */
function getPubgGameMode(gameMode) {
  let isESportsMode = "";
  if (gameMode.indexOf("esports") != -1) {
    isESportsMode = "eSports-";
  }

  if (gameMode.indexOf("solo") != -1) {
    return isESportsMode + "Solo";
  } else if (gameMode.indexOf("duo") != -1) {
    return isESportsMode + "Duos";
  } else if (gameMode.indexOf("squad") != -1) {
    return isESportsMode + "Squad";
  } else {
    return gameMode;
  }
}
