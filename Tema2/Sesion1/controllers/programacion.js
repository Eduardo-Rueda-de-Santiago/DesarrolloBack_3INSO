const cursos = require("../data/cursos");

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
//Services
function filterProgrammingData(lenguaje, level){

	let data = cursos.programacion.filter(curso => curso.lenguaje === lenguaje);

	if (level) {
		data = data.filter(curso => curso.nivel === level);
	}

	return data;
	
}

module.exports = {
	handleCursoProgramacion,
	handleCursoProgramacionAdvanced
}