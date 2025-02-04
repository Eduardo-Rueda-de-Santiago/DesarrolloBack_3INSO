const express = require("express");
require('dotenv').config();
const app = express();

app.get('/', function (req, res) {
	res.send("Received a GET query!");
});

app.get('*', function (req, res) {
	res.send("<h1>404! Search better!</h1>");
});

app.listen(process.env.PORT || 3000);