
const pool = require('../db');

//LISTAR CLIENTES
const  getListarClientes = async (req, res, next) => {
    try { 
        const listarClientes = await pool.query("SELECT * FROM CLIENTE");
        res.json (listarClientes.rows);
        
    } catch (error) {
        next(error);
    }
};

//CLIENTE POR ID
const getCliente = async (req, res, next)=>{
    try {
        const {cliente_id}= req.params;
        const result= await pool.query(
            "SELECT * FROM CLIENTE WHERE cliente_id = $1",
            [cliente_id]
        );
            if(result.rows.length === 0)
            
            return res.status(404).json({
                message: "CLIENTE NO ENCONTRADO",
            });

            return res.json(result.rows[0]);

        } catch (error) {
            next (error);
        
    }
};


//CREAR CLIENTE
const createCliente = async (req, res, next)=>{
    try {
        const{
            ciudad_id,
            nacionalidad_id,
            cliente_nombre,
            cliente_apellido,
            cliente_fnac,
            cliente_cedula
        } = req.body;

        const result = await pool.query(
            "INSERT INTO cliente (ciudad_id, nacionalidad_id, cliente_nombre, cliente_apellido, cliente_fnac, cliente_cedula) VALUES ($1, $2, $3, $4, $5, $6) RETURNING* ",
            [
            ciudad_id,
            nacionalidad_id,
            cliente_nombre,
            cliente_apellido,
            cliente_fnac,
            cliente_cedula
            ]
        );

        res.json(result.rows[0]);
        
    } catch (error) {
        next (error);
    }
}

//ELIMINAR CLIENTE

const deleteCliente=async (req, res, next)=>{
    try {
        const{cliente_id}=req.params;
        const result = await pool.query(
            "DELETE FROM cliente WHERE cliente_id = $1 RETURNING*",
            [cliente_id]
        );
         if (result.rowCount === 0)
         return res.status(404).json({
            message:"CLIENTE NO ENCONTRADO",
         });

         return res.sendStatus (204);
        
    } catch (error) {
        next (error);
    }
};

//ACTUALIZAR CLIENTE
const updateCliente=async (req, res, next)=>{
    try {

        const{cliente_id}=req.params;
        const{
            ciudad_id,
            nacionalidad_id,
            cliente_nombre,
            cliente_apellido,
            cliente_fnac,
            cliente_cedula
        } = req.body;
    
        const result=await pool.query(
            "UPDATE cliente SET ciudad_id = $1, nacionalidad_id = $2, cliente_nombre = $3, cliente_apellido = $4, cliente_fnac = $5, cliente_cedula = $6 WHERE cliente_id = $7  RETURNING* ",
            [
            ciudad_id,
            nacionalidad_id,
            cliente_nombre,
            cliente_apellido,
            cliente_fnac,
            cliente_cedula,
            cliente_id
            ]
            
        );
            if (result.rows.length === 0)
            return res.status(404).json({
                message:"CLIENTE NO ENCONTRADO",
             });
             
            return res.json(result.rows[0])
        
    } catch (error) {
        next(error);
    }
};

module.exports={
    getListarClientes,
    getCliente,
    createCliente,
    deleteCliente,
    updateCliente
}

//

