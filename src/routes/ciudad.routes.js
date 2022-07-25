const {Router} = require ("express");

const {
    getListarCiudades,
    getCiudad
} = require ("../controllers/ciudad.controller");

const router = Router ();

router.get('/ciudades', getListarCiudades);
router.get('ciudad/:ciudad_id', getCiudad);

module.exports = router ;