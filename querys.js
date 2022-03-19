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
			name: "add-user",
			text: "INSERT INTO cursos(nombre, nivel, fecha, duracion) VALUES($1, $2, $3, $4) RETURNING *;",
			values: [
				curso.nombre,
				curso.nivelTecnico,
				curso.fechaInicio,
				curso.duracion,
			],
		};
		const result = await pool.query(addCourse);
		await pool.query("COMMIT");
		return result.rows;
	} catch (e) {
		await pool.query("ROLLBACK");
		return e;
	}
}

// -----------------
async function getCursos() {
	try {
		const result = await pool.query("SELECT * FROM cursos ORDER BY id ASC");
		return result.rows;
	} catch (e) {
		return e;
	}
}

async function editarCurso(curso) {
	const editQuery = {
		name: "edit-user",
		text: "UPDATE cursos SET nombre = $1, nivel = $2, fecha =$3, duracion = $4 WHERE id = $5 RETURNING *;",
		values: [
			curso.nombre,
			curso.nivelTecnico,
			curso.fechaInicio,
			curso.duracion,
			curso.id,
		],
	};

	try {
		const result = await pool.query(editQuery);
		return result.rows;
	} catch (e) {
		return e;
	}
}

async function deleteCurso(id) {
	const deleteQuery = {
		name: "delete-user",
		text: "DELETE FROM cursos WHERE id = $1 RETURNING *;",
		values: [id],
	};

	try {
		const result = await pool.query(deleteQuery);
		return result.rows;
	} catch (e) {
		return e;
	}
}

module.exports = {
	agregarCurso,
	getCursos,
	editarCurso,
	deleteCurso,
};
