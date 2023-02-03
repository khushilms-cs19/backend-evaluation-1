const companyControllers = require('../controllers/companyControllers');

const Router = require('express').Router;

const router = Router();

router.post('/api/save', companyControllers.fetchCompanyDataAndStore);
router.get('/companies', companyControllers.getAllCompanies);

module.exports = router;