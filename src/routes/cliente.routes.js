const {Router} = require("express");
const {
    getListarClientes,
    getCliente,
    createCliente,
    deleteCliente,
    updateCliente
} = require("../controllers/clientes.controller");

const router = Router();
router.get('/clientes', getListarClientes);
router.get('/cliente/:cliente_id', getCliente);
router.post('/cliente', createCliente);
router.delete('/cliente/:cliente_id', deleteCliente);
router.put('/cliente/:cliente_id', updateCliente);

module.exports = router;
