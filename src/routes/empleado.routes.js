const {Router} = require("express");
const {
    getListarEmpleados,
    getEmpleado,
    createEmpleado,
    deleteEmpleado,
    updateEmpleado
} = require("../controllers/empleados.controller");

const router = Router();
router.get('/empleados', getListarEmpleados);
router.get ('/empleado/:empleado_id', getEmpleado);
router.post('/empleado', createEmpleado);
router.delete('/empleado/:empleado_id', deleteEmpleado);
router.put('/empleado/:empleado_id', updateEmpleado);

module.exports = router;