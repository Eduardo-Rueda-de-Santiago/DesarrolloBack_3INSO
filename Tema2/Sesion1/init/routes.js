const express = require("express");
const routerMatematicas = require("../routers/matematicas");
const routerProgramacion = require("../routers/programacion");

const router = express.Router();

router.use(express.json());

// Routers
router.get('/', function (req, res) {
	res.send("Received a GET query!");
});

router.use('/api/cursos/matematicas', routerMatematicas);
router.use('/api/cursos/programacion', routerProgramacion);



// app.get('/api/cursos/:curso', handleCursos);

router.get('*', function (req, res) {
	res.send("<h1>404! Search better!</h1>");
});


module.exports = router;