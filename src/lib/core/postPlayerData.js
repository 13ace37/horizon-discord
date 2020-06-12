const { dirname } = require("path");
const integration = dirname(require.main.filename);


integration.server.postPlayerData = function (data) {

    try {

        integration.modules.rpc.updatePresence(integration.server.formatPresence(data));

    } catch (error) {

        throw(error);

    }

};

integration.server.formatPresence = function (data) {

    if (data.map.startsWith("surf_")) return {

        details: `surfing on ${data.map}`,
        state: `Maps: ${data.finishedMaps} | Ranks: ${data.mapRank} / ${data.serverRank}`,
        largeImageKey: "icon",
        largeImageText: data.playerNameFull,
        smallImageText: data.playerName,
        //startTimestamp: data.date

    };

    if (data.map.startsWith("bhop_")) return {

        details: `hopping on ${data.map}`,
        state: `Maps: ${data.finishedMaps} | Ranks: ${data.mapRank} / ${data.serverRank}`,
        largeImageKey: "icon",
        largeImageText: data.playerNameFull,
        smallImageText: data.playerName,
        //startTimestamp: data.date

    };

    return {

        details: "- # -",
        largeImageKey: "",
        //startTimestamp: data.date

    };

};