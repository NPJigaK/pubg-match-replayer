const MATCH_LIST_PAGE_URL = "../matches/";
const API_KEY_LIST_KEY = "apikeyList";

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
        return "0"; // ToDo
    }
}
