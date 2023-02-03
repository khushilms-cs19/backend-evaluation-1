const companyServices = require('../services/companyServices');
const { getAllSectors } = require('../utils/externalAPI');
const { HTTPError } = require('../utils/errors');

const fetchCompanyScoreAndStore = async (req, res) => {
  try {

    const { urlLink } = req.body;
    const csvJsonData = await companyServices.getCsvData(urlLink);
    const allSectors = await getAllSectors(csvJsonData);
    allSectors.forEach(async (sector) => {
      await companyServices.getCompaniesInEachSector(sector);
    });
    res.status(200).json({
      message: 'scores fetched and updated in db',
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await companyServices.getAllCompanies();
    // return allCompanies;
    res.status(200).json(allCompanies);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
};

const getAllScores = async (req, res) => {
  try {
    const allScores = await companyServices.getAllScores();
    res.status(200).json(allScores);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
};

const getCompanyScoresInSector = async (req, res) => {
  try {

    const companyScores = await companyServices.getCompanyScoresInSector(req.query.Sector);
    res.status(200).json(companyScores);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
};


const updateCompanyCeo = async (req, res) => {
  try {
    await companyServices.updateCompanyCeo(req.params.id, req.body.ceo);
    res.status(200).json({
      message: 'ceo changed',
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
};

module.exports = {
  getAllCompanies,
  fetchCompanyScoreAndStore,
  getAllScores,
  getCompanyScoresInSector,
  updateCompanyCeo
};