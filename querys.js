const { Pool } = require("pg");
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	password: "postgres",
	database: "cursos",
	port: 5432,
});

async function agregarCurso(curso) {
	try {
		await pool.query("BEGIN");
		const addCourse = {
			text: "INSERT INTO cursos(nombre, nivel, fecha, duracion) VALUES($1, $2, $3, $4) RETURNING *;",
			values: [curso.nombre, curso.nivelTecnico, curso.fechaInicio, curso.duracion],
		};
		const result = await pool.query(addCourse);
		await pool.query("COMMIT");
		return result.rows;
	} catch (e) {
		await pool.query("ROLLBACK");
		return e;
	}
}

module.exports = {
	agregarCurso,
}
