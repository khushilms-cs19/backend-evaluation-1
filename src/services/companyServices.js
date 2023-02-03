const externalApi = require('../utils/externalAPI');
const db = require('../../database/models');
const { HTTPError } = require('../utils/errors');

const getCsvData = async (urlLink) => {
  const csvJsonData = await externalApi.getCsvFileJson(urlLink);
  if (!csvJsonData) {
    throw new HTTPError(400, 'Invalid url');
  }
  return csvJsonData;
};

const getAllCompanies = async () => {
  const allCompanies = await db.companies.findAll();
  if (!allCompanies) {
    throw new HTTPError(400, 'No companies found');
  }
  return allCompanies;
};
const getAllScores = async () => {
  const allScores = await db.companyScore.findAll({
    order: [['score', 'DESC']],
  });
  return allScores;
};

const addCompanyData = async (companyData) => {
  const fetchedCompanyData = await externalApi.getCompanyData(companyData.company_id);
  if (!fetchedCompanyData) {
    throw new HTTPError(400, 'Invalid company id');
  }
  const newCompanyData = {
    companyId: fetchedCompanyData.id,
    name: fetchedCompanyData.name,
    description: fetchedCompanyData.description,
    ceo: fetchedCompanyData.ceo,
    tags: fetchedCompanyData.tags,
  };
  const data = await db.companies.create(newCompanyData);
  return data;
};

const addCompanyScore = async (companyScore) => {
  const newCompanyScore = await db.companyScore.create(companyScore);
  return newCompanyScore;
};

const getCompaniesInEachSector = async (sector) => {
  const companies = await externalApi.getCompanyInEachSector(sector);
  return Promise.all(companies.map(async (company) => {
    try {
      const performanceIndex = {};
      company.performanceIndex.forEach((factor) => {
        performanceIndex[factor.key] = factor.value;
      });
      const score = ((performanceIndex.cpi * 10) + (performanceIndex.cf / 10000) + (performanceIndex.mau * 10) + performanceIndex.roic) / 4;
      const data = await addCompanyData({ company_id: company.companyId });
      if (!data) {
        throw new HTTPError(400, 'Invalid company id');
      }
      const companyScore = await addCompanyScore({
        companyId: company.companyId,
        companyName: data.dataValues.name,
        score: score,
        sector: sector
      });
      return companyScore;
    } catch (err) {
      return null;
    }
  }));
};

const getCompanyScoresInSector = async (sector) => {
  const companyScores = await db.companyScore.findAll({
    where: {
      sector: sector,
    }
  });
  return companyScores;
};

const updateCompanyCeo = async (companyId, ceoName) => {
  const companyData = await db.companies.update({
    ceo: ceoName,
  }, {
    where: {
      companyId: companyId,
    }
  });
  return companyData;
};


module.exports = {
  getCsvData,
  addCompanyData,
  getCompaniesInEachSector,
  getAllCompanies,
  getAllScores,
  getCompanyScoresInSector,
  updateCompanyCeo,
};