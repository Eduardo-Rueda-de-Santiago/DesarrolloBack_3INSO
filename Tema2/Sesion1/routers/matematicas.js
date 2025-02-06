const express = require("express");

const routerMatematicas = express.Router();

routerMatematicas.get("/", (req, res) => {

	res.send("Thou arth now on math mode!");

});

// routerProgramacion.get('/:lenguaje', handleCursoProgramacion);

// routerProgramacion.get('/:lenguaje/:nivel', handleCursoProgramacionAdvanced);

module.exports = routerMatematicas;