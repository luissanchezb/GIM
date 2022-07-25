const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const empleados = require('./routes/empleado.routes')
const clientes = require ('./routes/cliente.routes')
const membresias = require ('./routes/membresia.routes')
const planes = require('./routes/plan.routes')
const nacionalidades = require('./routes/nacionalidad.routes');
const ciudades = require('./routes/ciudad.routes');


const app = express ();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



//RUTAS
app.use(empleados);
app.use(clientes);
app.use(membresias);
app.use(planes);
app.use(nacionalidades);
app.use(ciudades);


//ERRORES
app.use((err, req, res, next) => {
    return res.json({
        messsage: err.messsage
    })
})

//PUERTO BACKEND
app.listen(4000);
console.log("ESCUCHANDO EN EL PUERTO 4000");

//



