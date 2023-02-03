const companyControllers = require('../controllers/companyControllers');

const Router = require('express').Router;

const router = Router();

router.post('/api/save', companyControllers.fetchCompanyDataAndStore);
router.get('/companies', companyControllers.getAllCompanies);
router.post('/scores', companyControllers.fetchCompanyScoreAndStore);
router.get('/scores', companyControllers.getAllScores);
router.get('/sector', companyControllers.getCompanyScoresInSector);


module.exports = router;