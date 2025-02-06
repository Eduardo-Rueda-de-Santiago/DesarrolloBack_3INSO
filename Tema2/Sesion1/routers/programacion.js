const express = require("express");
const controller = require("../controllers/programacion");

const routerProgramacion = express.Router();

routerProgramacion.get("/", (req, res) => {
	
	res.send("Thou arth now on programming mode!");

});

routerProgramacion.get('/:lenguaje', controller.handleCursoProgramacion);

routerProgramacion.get('/:lenguaje/:nivel', controller.handleCursoProgramacionAdvanced);

module.exports = routerProgramacion;