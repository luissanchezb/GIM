const pool = require("../db");


// LISTAR PLANES
const getListarPlanes = async ( req, res, next ) => {
    try {
        const listarPlan = await pool.query("SELECT * FROM plan");
        res.json( listarPlan.rows ); 
    } catch (error) {
        next( error );
    }
}

// BUSCAR PLAN POR ID
const  getPlan = async ( req, res, next ) => {
    try {
        const { plan_id } = req.params;
        const result = await pool.query(
            "SELECT * FROM plan WHERE plan_id = $1",
            [ plan_id ]
        );
        if ( result.rows.length === 0 )
        return res.status(404).json({
            message: " PLAN NO ENCONTRADO"
        });
        return res.json( result.rows[0] );
    } catch (error) {
        next(error);
    }
};


// CREAR UN PLAN
const createPlan = async ( req, res, next ) => {
    try {
        const {
            plan_nombre,
            plan_descripcion,
            plan_precio
        } = req.body;
        const  result = await pool.query(
            "INSERT INTO plan (plan_nombre, plan_descripcion, plan_precio) VALUES ($1, $2, $3) RETURNING*",
            [
                plan_nombre,
                plan_descripcion,
                plan_precio
            ]
        );
        res.json( result.rows[0] );
    } catch (error) {
        next(error);
    }
}

//ELIMNAR PLAN 
const  deletePlan = async ( req, res, next ) => {
    try {
        const { plan_id } = req.params;
        const result =  await pool.query(
            "DELETE FROM plan WHERE plan_id = $1 RETURNING*",
            [ plan_id ]
        );
        if ( result.rowCount === 0 )
        return res.status(404).json({
            message: 'PLAN NO ENCONTRADO'
        })
        return res.senStatus(204);

    } catch (error) {
        next(error);
    }
}

//ACTUALIZAR PLAN 
const updatePlan = async ( req, res, next ) => {
    try {
        const { plan_id } = req.params;
        const {
            plan_nombre,
            plan_descripcion,
            plan_precio
        } = req.body;
        const result = await pool.query(
            "UPDATE plan SET plan_nombre = $1, plan_descripcion = $2, plan_precio = $3 WHERE plan_id = $4 RETURNING*",
            [
                plan_nombre,
                plan_descripcion,
                plan_precio,
                plan_id
            ] 
        );

        if ( result.rows.length === 0 )
        return res.status(404).json({
            message: "PLAN NO ENCONTRADO"
        });
        return res.json(result.rows[0])

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getListarPlanes,
    getPlan,
    createPlan,
    deletePlan,
    updatePlan
}