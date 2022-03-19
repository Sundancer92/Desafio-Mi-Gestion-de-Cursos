const express = require("express");
const app = express();
// ! -------- DEPRECADO --------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ! -------- DEPRECADO --------
// ? Querys

const { agregarCurso, getCursos, editarCurso, deleteCurso } = require("./querys");

// ? /Querys
app.listen(3000, () => {
	console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// --------------
app.post("/curso", async (req, res) => {
	const curso = req.body;
	const result = await agregarCurso(curso);
	res.send(result);
});

// -----------------
app.get("/cursos", async (req, res) => {
	const result = await getCursos();
	res.send(result);
});

// -----------------
app.put("/curso", async (req, res) => {
	const curso = req.body;
	const result = await editarCurso(curso);
	res.send(result);
});

// -----------------

app.delete("/cursos/:id", async(req, res) => {
	const { id } = req.params;
	console.log(id);
	const result = await deleteCurso(id);
	res.send(result);
})
