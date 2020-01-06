const integration = require(require("path").dirname(require.main.filename));

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