const { getCsvFileJson, getCompanyData, getCompanyInEachSector } = require('../utils/externalAPI');
const db = require('../../database/models');

const getCsvData = async (urlLink) => {
  const csvJsonData = await getCsvFileJson(urlLink);
  return csvJsonData;
};

const getAllCompanies = async () => {
  const allCompanies = await db.companies.findAll();
  return allCompanies;
};
const getAllScores = async () => {
  const allScores = await db.companyScore.findAll({
    order: ['score', 'DESC'],
  });
  return allScores;
};

const addCompanyData = async (companyData) => {
  const fetchedCompanyData = await getCompanyData(companyData.company_id);
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
  const companies = await getCompanyInEachSector(sector);
  const companyScores = Promise.all(companies.map(async (company) => {
    try {

      const performanceIndex = {};
      company.performanceIndex.forEach((factor) => {
        performanceIndex[factor.key] = factor.value;
      });
      const score = ((performanceIndex.cpi * 10) + (performanceIndex.cf / 10000) + (performanceIndex.mau * 10) + performanceIndex.roic) / 4;
      const data = await addCompanyData({ company_id: company.companyId });
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
  return companyScores;
};

const getCompanyScoresInSector = async (sector) => {
  const companyScores = await db.companyScore.findAll({
    where: {
      sector: sector,
    }
  });
  return companyScores;
};


module.exports = {
  getCsvData,
  addCompanyData,
  getCompaniesInEachSector,
  getAllCompanies,
  getAllScores,
  getCompanyScoresInSector
};