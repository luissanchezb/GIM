const {Router} = require("express");

const {
    getListarPlanes,
    getPlan,createPlan, 
    deletePlan, 
    updatePlan
} = require('../controllers/plan.controller');


const router = Router();


router.get('/planes', getListarPlanes);
router.get('/plan/:plan_id', getPlan);
router.post('/plan', createPlan);
router.delete('/plan/:plan_id', deletePlan);
router.put('/plan/:plan_id', updatePlan);


module.exports =  router;