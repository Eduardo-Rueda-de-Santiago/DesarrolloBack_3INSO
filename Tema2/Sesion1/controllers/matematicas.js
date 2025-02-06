const cursos = require("../data/cursos");

function handleCursoMatematicas(req, res) {
	const tema = req.params.tema;
	const data = cursos.matematicas.filter(curso => curso.tema === tema);

	if (data.length > 0) {
		return res.send(data);
	}
	return res.status(404).send("No se encontró el curso de matemáticas de " + tema);
}

module.exports = {
	handleCursoMatematicas
};
