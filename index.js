module.exports = rpc = {
    server: {}, // pre defined server object used for the http server
    data: {}, // actual player data send to the text files
    temp: {}, // temp player data either send from the client or saved for later use
};

const { join } = require("path");
require(join(require.main.path + "/src/lib/core/modules"));
require(join(require.main.path + "/src/lib/core/server"));
require(join(require.main.path + "/src/lib/core/getPlayerData"));
require(join(require.main.path + "/src/lib/core/postPlayerData"));