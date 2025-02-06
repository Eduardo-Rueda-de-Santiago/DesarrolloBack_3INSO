const cursos = require("../data/cursos");

export function handleCursoMatematicas(req, res) {

	const tema = req.params.tema;

	const data = cursos.infoCursos.matematicas.filter(curso => curso.tema === tema);

	if (data.length > 0) {
		return res.send(data);
	}
	return res.status(404).send("No se encontró el curso de matemáticas de " + tema);

}

