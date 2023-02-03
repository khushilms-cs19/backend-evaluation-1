const companyServices = require('../services/companyServices');
const db = require('../../database/models');

const fetchCompanyDataAndStore = async (req, res) => {
  const { urlLink } = req.body;
  const csvJsonData = await companyServices.getCsvData(urlLink);
  const allCompanyData = csvJsonData.map((company) => {
    const companyData = companyServices.addCompanyData(company);
    return companyData;
  });
  res.status(200).json(allCompanyData);
};

const getAllCompanies = async (req, res) => {
  const allCompanies = await db.company.findAll();
  // return allCompanies;
  res.status(200).json(allCompanies);
};

module.exports = {
  fetchCompanyDataAndStore,
  getAllCompanies,
};