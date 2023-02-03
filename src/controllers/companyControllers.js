const companyServices = require('../services/companyServices');
const { getAllSectors } = require('../utils/externalAPI');

const fetchCompanyDataAndStore = async (req, res) => {
  const { urlLink } = req.body;
  const csvJsonData = await companyServices.getCsvData(urlLink);
  const allCompanyData = csvJsonData.map(async (company) => {
    const companyData = await companyServices.addCompanyData(company);
    return companyData;
  });
  res.status(200).json(allCompanyData);
};

const fetchCompanyScoreAndStore = async (req, res) => {
  const { urlLink } = req.body;
  const csvJsonData = await companyServices.getCsvData(urlLink);
  const allSectors = await getAllSectors(csvJsonData);
  const companyScoresInEachSector = allSectors.map(async (sector) => {
    return await companyServices.getCompaniesInEachSector(sector);
  });
  res.status(200).json(companyScoresInEachSector);
};

const getAllCompanies = async (req, res) => {
  const allCompanies = await companyServices.getAllCompanies();
  // return allCompanies;
  res.status(200).json(allCompanies);
};

const getAllScores = async (req, res) => {
  const allScores = await companyServices.getAllScores();
  res.status(200).json(allScores);
};

const getCompanyScoresInSector = async (req, res) => {
  const companyScores = await companyServices.getCompanyScoresInSector(req.query.Sector);
  res.status(200).json(companyScores);
};

module.exports = {
  fetchCompanyDataAndStore,
  getAllCompanies,
  fetchCompanyScoreAndStore,
  getAllScores,
  getCompanyScoresInSector,
};