const pool = require("../db")

//LISTAR CIUDADES

const getListarCiudades = async (req, res, next) =>{
    try {
        const listarCiudad = await pool.query("SELECT * FROM ciudad");
        res.json(listarCiudad.rows);
    } catch (error) {
        next(error)
    }

}

const getCiudad = async (req, res, next) =>{
    try {
        const {ciudad_id} = req.params;
        const result = await pool.query(
            "SELECT * FROM ciudad_id = $1",
            [ciudad_id]
        );
        if  (result.rows.length === 0 )
        return res.status(404).json({
            mesaage: "CIUDAD NO ENCONTRADA"
        });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports ={
    getListarCiudades,
    getCiudad
}