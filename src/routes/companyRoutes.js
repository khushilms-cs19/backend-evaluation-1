const companyControllers = require('../controllers/companyControllers');
const bodyValidation = require('../middlewares/bodyValidation');

const Router = require('express').Router;

const router = Router();

router.post('/scores', bodyValidation, companyControllers.fetchCompanyScoreAndStore);
router.get('/companies', companyControllers.getAllCompanies);
router.get('/scores', companyControllers.getAllScores);
router.get('/sector', companyControllers.getCompanyScoresInSector);
router.put('/companies/:id', companyControllers.updateCompanyCeo);

module.exports = router;