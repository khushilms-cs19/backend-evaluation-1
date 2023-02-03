//test for companyController.js

// const { jest, describe, it, expect } = require('@jest/globals');
const companyControllers = require('../../src/controllers/companyControllers');
const companyServices = require('../../src/services/companyServices');
const { HTTPError } = require('../../src/utils/errors');
const externalApi = require('../../src/utils/externalAPI');

describe('Company Services', () => {
  describe('Get CSV Data', () => {
    it('Should give correct data', async () => {

      jest.spyOn(externalApi, 'getCsvFileJson').mockResolvedValue('something');
      const data = await companyServices.getCsvData("some link");
      expect(data).toBe('something');
    });
    it('Should give 404 error message', async () => {
      jest.spyOn(externalApi, 'getCsvFileJson').mockResolvedValue(null);
      expect(() => companyServices.getCsvData('some link')).toThrow(HTTPError);
    });

  });
  describe('Get all companies', () => {
    it('Should give all companies', async () => {
      const mockResult = [
        {
          'id': 4,
          'companyId': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
          'companyName': 'Apple',
          'score': 29.987724999999998,
          'sector': 'Software',
          'createdAt': '2023-02-03T09:07:18.970Z',
          'updatedAt': '2023-02-03T09:07:18.970Z'
        },
        {
          'id': 7,
          'companyId': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
          'companyName': 'Microsoft',
          'score': 21.3221,
          'sector': 'Software',
          'createdAt': '2023-02-03T09:07:19.483Z',
          'updatedAt': '2023-02-03T09:07:19.483Z'
        },
      ];
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, 'getAllCompanies').mockResolvedValue(mockResult);
      await companyControllers.getAllCompanies(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
  });
  it('Should give 500 error message', async () => {
    const mockResult = [
      {
        'id': 4,
        'companyId': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        'companyName': 'Apple',
        'score': 29.987724999999998,
        'sector': 'Software',
        'createdAt': '2023-02-03T09:07:18.970Z',
        'updatedAt': '2023-02-03T09:07:18.970Z'
      }
    ];
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(companyServices, 'getAllCompanies').mockRejectedValue(mockResult);
    await companyControllers.getAllCompanies(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      message: 'Something went wrong',
    });
  });
  describe('Get all Scores', () => {
    it('Should give all scores', async () => {
      const mockResult = [
        {
          "id": 51,
          "companyId": "e90a7bc7-47fa-49af-bfa1-391fe7768b56",
          "companyName": "Meta",
          "score": 13.102174999999999,
          "sector": "Software",
          "createdAt": "2023-02-03T09:24:53.144Z",
          "updatedAt": "2023-02-03T09:24:53.144Z"
        }
      ];
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, 'getAllScores').mockResolvedValue(mockResult);
      await companyControllers.getAllScores(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should give 500 error message', async () => {
      const mockResult = [
        {
          "id": 51,
          "companyId": "e90a7bc7-47fa-49af-bfa1-391fe7768b56",
          "companyName": "Meta",
          "score": 13.102174999999999,
          "sector": "Software",
          "createdAt": "2023-02-03T09:24:53.144Z",
          "updatedAt": "2023-02-03T09:24:53.144Z"
        }
      ];
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, 'getAllScores').mockRejectedValue(null);
      await companyControllers.getAllScores(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: 'Something went wrong',
      });
    });
  });
  describe('Get company scores in sectors', () => {
    it('Should give scores of company', async () => {
      const mockResult = [
        {
          "id": 51,
          "companyId": "e90a7bc7-47fa-49af-bfa1-391fe7768b56",
          "companyName": "Meta",
          "score": 13.102174999999999,
          "sector": "Software",
          "createdAt": "2023-02-03T09:24:53.144Z",
          "updatedAt": "2023-02-03T09:24:53.144Z"
        }
      ];
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, 'getCompanyScoresInSector').mockResolvedValue(mockResult);
      await companyControllers.getCompanyScoresInSector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should give 500 error', async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, 'getCompanyScoresInSector').mockRejectedValue(null);
      await companyControllers.getCompanyScoresInSector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: 'Something went wrong',
      });
    });
  })
  describe('Update company CEO', () => {
    it('Should give scores of company', async () => {
      const mockReq = {
        body: {
          ceoName: 'khushil',
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, 'updateCompanyCeo').mockResolvedValue(2);
      await companyControllers.updateCompanyCeo(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should give 500 error', async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, 'updateCompanyCeo').mockRejectedValue(null);
      await companyControllers.updateCompanyCeo(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: 'Something went wrong',
      });
    });
  })
});