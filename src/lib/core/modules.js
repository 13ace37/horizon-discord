const { dirname } = require("path");
const integration = dirname(require.main.filename);


integration.modules = {
    server: require("http"),
    rpc: require("discord-rich-presence")("663588201033891858")
};