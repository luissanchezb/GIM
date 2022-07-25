const pool = require("../db")

//LISTAR nacionalidades

const getListarNacionalidades = async (req, res, next) => {
    try {
        const listarNacionalidad = await pool.query("SELECT *  FROM nacionalidad");
        res.json(listarNacionalidad.rows);
    } catch (error) {
        next(errores)
    }
}

const getNacionalidad = async ( req, res, next ) => {
    try {
        const { nacionalidad_id } = req.params;
        const result = await pool.query(
            "SELECT * FROM nacionalidad WHERE nacionalidad_id = $1",
            [nacionalidad_id]
        );
        if ( result.rows.length === 0 )
        return res.status(404).json({
            message: "NACIONALIDAD NO ENCONTRADA"
        });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getListarNacionalidades,
    getNacionalidad
}