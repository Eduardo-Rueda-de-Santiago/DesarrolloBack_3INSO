const express = require("express");

const app = express();

const PORT = 3000;

app.get('/', function (req, res) {
	res.send("Received a GET query!");
});

app.listen(PORT);