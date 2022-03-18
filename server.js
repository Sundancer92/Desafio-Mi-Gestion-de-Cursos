const express = require("express");
const app = express();
// ! -------- DEPRECADO --------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ! -------- DEPRECADO --------
// ? Querys

const { agregarCurso } = require("./querys");

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
    console.log(curso.nivelTecnico);
	const result = await agregarCurso(curso);
	res.send(result);
});
