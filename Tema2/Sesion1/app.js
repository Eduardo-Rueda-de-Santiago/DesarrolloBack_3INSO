const server = require("./init/server");

require('dotenv').config();

server.listen(process.env.PORT || 3000);
