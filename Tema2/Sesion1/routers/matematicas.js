const express = require("express");
const controller = require("../controllers/matematicas");

const routerMatematicas = express.Router();

routerMatematicas.get("/", (req, res) => {

	res.send("Thou arth now on math mode!");

});

routerMatematicas.get('/:tema', controller.handleCursoMatematicas);

module.exports = routerMatematicas;