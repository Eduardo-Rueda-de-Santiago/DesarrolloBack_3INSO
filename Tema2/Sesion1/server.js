const express = require("express");
const cursos = require("./cursos")

require('dotenv').config();

const app = express();

// Routers
app.get('/', function (req, res) {
	res.send("Received a GET query!");
});

app.get('/api/cursos/programacion/:lenguaje', handleCursoProgramacion);

app.get('/api/cursos/programacion/:lenguaje/:nivel', handleCursoProgramacionAdvanced);

app.get('/api/cursos/matematicas/:tema', handleCursoMatematicas);

app.get('/api/cursos/:curso', handleCursos);

app.get('*', function (req, res) {
	res.send("<h1>404! Search better!</h1>");
});

// Controllers
function handleCursos(req, res) {

	const curso = req.params.curso;

	const accesedProperty = cursos.infoCursos[curso];

	if (accesedProperty) {
		res.send(accesedProperty);
	} else {
		res.send("The course doesn't exist");
	}

}

function handleCursoProgramacion(req, res) {
	
	const lenguaje = req.params.lenguaje;

	const data = filterProgrammingData(lenguaje);

	if (data.length > 0) {
		return res.send(data);
	}
	return res.status(404).send("No se encontró el curso de programación de " + lenguaje);

}

function handleCursoProgramacionAdvanced(req, res){

	const lenguaje = req.params.lenguaje;

	const nivel = req.params.nivel;

	const data = filterProgrammingData(lenguaje, nivel);
	
	if (data.length > 0) {
		return res.send(data);
	}
	return res.status(404).send("No se encontró el curso de programación de " + lenguaje);

}

function handleCursoMatematicas(req, res) {

	const tema = req.params.tema;

	const data = cursos.infoCursos.matematicas.filter(curso => curso.tema === tema);

	if (data.length > 0) {
		return res.send(data);
	}
	return res.status(404).send("No se encontró el curso de matemáticas de " + tema);

}

//Services
function filterProgrammingData(lenguaje, level){

	let data = cursos.infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

	if (level) {
		data = data.filter(curso => curso.nivel === level);
	}

	return data;
	
}

app.listen(process.env.PORT || 3000);