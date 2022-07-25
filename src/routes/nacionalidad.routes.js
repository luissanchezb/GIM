const {Router} = require("express");
const {
    getListarNacionalidades,
    getNacionalidad    
} = require ("../controllers/nacionalidad.controller");

const router = Router();

router.get('/nacionalidades', getListarNacionalidades);
router.get('nacionalidad/:nacionalidad_id', getNacionalidad);


module.exports = router ;