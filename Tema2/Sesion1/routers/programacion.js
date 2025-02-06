const express = require("express");

const routerProgramacion = express.Router();

routerProgramacion.get("/", (req, res) => {
	
	res.send("Thou arth now on programming mode!");

});

// routerProgramacion.get('/:lenguaje', handleCursoProgramacion);

// routerProgramacion.get('/:lenguaje/:nivel', handleCursoProgramacionAdvanced);

module.exports = routerProgramacion;