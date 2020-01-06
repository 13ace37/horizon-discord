const integration = require(require("path").dirname(require.main.filename));

integration.server.addData = function (data) {
    integration.temp.data = data;
};

integration.server.getPlayerData = function (result) {
    try {
        integration.data.playerData = JSON.parse(integration.temp.data);
    } catch (error) {console.error(error)}
    result.end("");

    let map = "N/A";
    let mapRank = "N/A";
    let serverRank = "N/A";
    let finishedMaps = "N/A";

    if (integration.data.playerData.player.match_stats) {
        if (integration.data.playerData.player.match_stats.deaths && integration.data.playerData.player.match_stats.deaths > 0) mapRank = String(integration.data.playerData.player.match_stats.deaths);
        if (integration.data.playerData.player.match_stats.kills && integration.data.playerData.player.match_stats.kills > 0) finishedMaps = integration.data.playerData.player.match_stats.kills;
        if (integration.data.playerData.player.match_stats.score && integration.data.playerData.player.match_stats.score < 0 && integration.data.playerData.player.match_stats.score !== -99999) serverRank = String(integration.data.playerData.player.match_stats.score).slice(1);
        if (mapRank === "1999") mapRank = "1999+";
    }

    if (integration.data.playerData.map) {
        map = integration.data.playerData.map.name.split('/')[2] || integration.data.playerData.map.name || "N/A"
    }

    integration.data.finalPlayerData = {
        map,
        mapRank,
        serverRank,
        finishedMaps,
        playerName: integration.data.playerData.player.name,
        playerRank: integration.data.playerData.player.clan || "N/A",
        playerNameFull: (integration.data.playerData.player.clan || "N/A") + " " + integration.data.playerData.player.name
    };
    integration.server.postPlayerData(integration.data.finalPlayerData);
};