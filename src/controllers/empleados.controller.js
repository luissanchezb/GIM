
const pool= require("../db");

//LISTAR EMPLEADOS
const  getListarEmpleados = async (req, res, next) => {
    try { 
        const listarEmpleados = await pool.query("SELECT * FROM EMPLEADO");
        res.json (listarEmpleados.rows);
        
    } catch (error) {
        next(error);
    }
};

//EMPLEADO POR ID
const getEmpleado = async (req, res, next)=>{
    try {
        const {empleado_id}= req.params;
        const result= await pool.query(
            "SELECT * FROM EMPLEADO WHERE empleado_id = $1",
            [empleado_id]
        );
            if(result.rows.length === 0)
            
            return res.status(404).json({
                message: "EMPLEADO NO ENCONTRADO",
            });

            return res.json(result.rows[0]);

        } catch (error) {
            next (error);
        
    }
};

//CREAR EMPLEADO
const createEmpleado = async (req, res, next) => {
    try {
        const{
            ciudad_id,
            nacionalidad_id,
            empleado_nombre,
            empleado_apellido,
            empleado_fnac,
            empleado_cedula
        } = req.body;

        const result = await pool.query(
            "INSERT INTO empleado ( ciudad_id, nacionalidad_id, empleado_nombre, empleado_apellido, empleado_fnac, empleado_cedula) VALUES ($1, $2, $3, $4, $5, $6) RETURNING* ",
            [
                ciudad_id,
                nacionalidad_id,
                empleado_nombre,
                empleado_apellido,
                empleado_fnac,
                empleado_cedula
            ]
        );

        res.json(result.rows[0]);
        
    } catch (error) {
        next (error);
    }
};

//ELIMINAR EMPLEADO

const deleteEmpleado=async (req, res, next)=>{
    try {
        const{empleado_id}=req.params;
        const result = await pool.query(
            "DELETE FROM empleado WHERE empleado_id = $1 RETURNING*",
            [empleado_id]
        );
         if (result.rowCount === 0)
         return res.status(404).json({
            message:"EMPLEADO NO ENCONTRADO",
         });

         return res.sendStatus (204);
        
    } catch (error) {
        next (error);
    }
};

//ACTUALIZAR EMPLEADO
const updateEmpleado=async (req, res, next)=>{
    try {

        const{empleado_id}=req.params;
        const{
            ciudad_id,
            nacionalidad_id,
            empleado_nombre,
            empleado_apellido,
            empleado_fnac,
            empleado_cedula
        } = req.body;
    
        const result=await pool.query(
            "UPDATE empleado SET  ciudad_id = $1, nacionalidad_id = $2, empleado_nombre = $3, empleado_apellido = $4, empleado_fnac = $5, empleado_cedula = $6 WHERE empleado_id = $7  RETURNING* ",
            [
            ciudad_id,
            nacionalidad_id,
            empleado_nombre,
            empleado_apellido,
            empleado_fnac,
            empleado_cedula,
            empleado_id
            ]
            
        );
            if (result.rows.length === 0)
            return res.status(404).json({
                message:"EMPLEADO NO ENCONTRADO",
             });
             
            return res.json(result.rows[0])
        
    } catch (error) {
        next(error);
    }
};

module.exports={
    getListarEmpleados,
    getEmpleado,
    createEmpleado,
    deleteEmpleado,
    updateEmpleado
}

//
