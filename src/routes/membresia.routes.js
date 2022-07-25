const {Router} = require("express");
const {
    getListarMembresias,
    getMembresia,
    createMembresia,
    deleteMembresia,
    updateMembresia
} = require("../controllers/membresia.controller");

const router = Router();
router.get('/membresias', getListarMembresias);
router.get ('/membresia/:membresia_id', getMembresia);
router.post('/membresia', createMembresia);
router.delete('/membresia/:membresia_id', deleteMembresia);
router.put('/membresia/:membresia_id', updateMembresia);

module.exports = router;