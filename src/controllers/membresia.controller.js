const pool = require('../db');

//LISTAR MEMBRESIA
const  getListarMembresias = async (req, res, next) => {
    try { 
        const listarMembresias = await pool.query("SELECT * FROM MEMBRESIA");
        res.json (listarMembresias.rows);
        
    } catch (error) {
        next(error);
    }
};

//MEMBRESIA POR ID
const getMembresia = async (req, res, next)=>{
    try {
        const {membresia_id}= req.params;
        const result= await pool.query(
            "SELECT * FROM MEMBRESIA WHERE membresia_id = $1",
            [membresia_id]
        );
            if(result.rows.length === 0)
            
            return res.status(404).json({
                message: "MEMBRESIA NO ENCONTRADA",
            });

            return res.json(result.rows[0]);

        } catch (error) {
            next (error);
        
    }
};

//CREAR MEMBRESIA
const createMembresia = async (req, res, next) => {
    try {
        const{
            cliente_id,
            plan_id,
            membresia_tipo,
            fecha_inicio,
            fecha_final
        } = req.body;

        const result = await pool.query(
            "INSERT INTO membresia ( cliente_id, plan_id, membresia_tipo, fecha_inicio, fecha_final) VALUES ($1, $2, $3, $4, $5) RETURNING* ",
            [
                cliente_id,
                plan_id,
                membresia_tipo,
                fecha_inicio,
                fecha_final
            ]
        );

        res.json(result.rows[0]);
        
    } catch (error) {
        next (error);
    }
};


//ELIMINAR MEMBRESIA

const deleteMembresia=async (req, res, next)=>{
    try {
        const{membresia_id}=req.params;
        const result = await pool.query(
            "DELETE FROM membresia WHERE membresia_id = $1 RETURNING*",
            [membresia_id]
        );
         if (result.rowCount === 0)
         return res.status(404).json({
            message:"MEMBRESIA NO ENCONTRADA",
         });

         return res.sendStatus (204);
        
    } catch (error) {
        next (error);
    }
};

//ACTUALIZAR MEMBRESIA
const updateMembresia=async (req, res, next)=>{
    try {

        const{membresia_id}=req.params;
        const{
            cliente_id,
            plan_id,
            membresia_tipo,
            fecha_inicio,
            fecha_final
        } = req.body;
    
        const result=await pool.query(
            "UPDATE membresia SET cliente_id = $1, plan_id = $2, membresia_tipo = $3, fecha_inicio = $4, fecha_final = $5 WHERE membresia_id = $6  RETURNING* ",
            [
            cliente_id,
            plan_id,
            membresia_tipo,
            fecha_inicio,
            fecha_final,
            membresia_id
            ]
            
        );
            if (result.rows.length === 0)
            return res.status(404).json({
                message:"MEMBRESIA NO ENCONTRADA",
             });
             
            return res.json(result.rows[0])
        
    } catch (error) {
        next(error);
    }
};

module.exports={
    getListarMembresias,
    getMembresia,
    createMembresia,
    deleteMembresia,
    updateMembresia
}

//