/**
 * Workaround to create an executable file of the application
 *
 * Only used for application build - use index.js for sourcecode usage!
 */

// Not the best workaround for the execDir but its working :)

let fullDir = process.argv[0].split("\\");
fullDir.pop();
__dirname = fullDir.join("\\");

// Not the best workaround for the execDir but its working :)

const integration = {};

integration.modules = {
    server: require("http"),
    rpc: require("discord-rich-presence")("663588201033891858")
};

integration.server.addData = function (data) {
    integration.temp.data = data;
};

integration.server.getPlayerData = function (result) {
    try {
        integration.data.playerData = JSON.parse(integration.temp.data);
    } catch (error) {console.log(error)}
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

integration.server.handle = function (request, result) {

    if (request.method !== "POST") { // ignore GET requests

        result.writeHead(500, {"Content-Type": "text/html"}); // return server error code
        result.end(""); // send empty response

    } else {

        request.on("data", function (data){
            integration.server.addData(data);
        });

        request.on("end", function () {
            integration.server.getPlayerData(result);
        });

    }

};


integration.server.http = integration.modules.server.createServer(function (request, result){
    integration.server.handle(request, result);
});

integration.server.http.listen(23251, "127.0.0.1");

console.log("Server running on port 23251");