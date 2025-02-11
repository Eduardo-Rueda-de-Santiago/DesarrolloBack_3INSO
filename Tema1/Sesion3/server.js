const http = require('http');

const cursos = require('./cursos');

const servidor = http.createServer((req, res) => {
	switch (req.method) {
		case 'GET':
			return manejarSolicitudesGET(req, res);
		case 'POST':
			return manejarSolicitudesPOST(req, res);
		case 'PUT':
			return manejarSolicitudesPUT(req, res);
		case 'PATCH':
			return manejarSolicitudesPATCH(req, res);
		case 'DELETE':
			return manejarSolicitudesDELETE(req, res);
		default:
	}
});

function manejarSolicitudesGET(req, res) {
	const path = req.url;
	if (path === '/') {
		return res.end("Este es el servidor de pruebas del tema 1!");
	} else if (path === '/cursos') {
		return res.end(JSON.stringify(cursos.infoCursos));
	} else if (path === '/cursos/matematicas') {
		return res.end(JSON.stringify(cursos.infoCursos["matematicas"]));
	} else if (path === '/cursos/programacion') {
		return res.end(JSON.stringify(cursos.infoCursos["programacion"]));
	}
}

function manejarSolicitudesPOST(req, res) {
	if (path === "/cursos/programacion") {
		let body = "";
		req.on('data', (content) => {
			body += content.toString();
		})
		req.on('end', () => {
			body = JSON.parse(body);
			return res.end("Procesamiento POST finalizad");
		})
	} else { res.statusCode = 404 }
}

function manejarSolicitudesPUT(req, res) {
	return res.end("Procesamiento PUT no implementado");

}

function manejarSolicitudesPATCH(req, res) {
	return res.end("Procesamiento PATCH no implementado");

}

function manejarSolicitudesDELETE(req, res) {
	return res.end("Procesamiento DELETE no implementado");

}


const port = 3000;

servidor.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

