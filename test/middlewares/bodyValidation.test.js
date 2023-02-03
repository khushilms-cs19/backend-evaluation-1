const bodyValidation = require("../../src/middlewares/bodyValidation");
const Joi = require('joi');

describe('Body validations', () => {
  it('Should give success message', async () => {
    const mockReq = {
      body: {
        urlLink: 'http://somthing.org/',
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    // jest.spyOn(Joi, 'object').mockResolvedValue({});
    // jest.spyOn(Joi, '')
    bodyValidation(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });
  it('Should give 400 error message', async () => {
    const mockReq = {
      body: {
        urlLink: 'somthing.org',
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    // jest.spyOn(Joi, 'object').mockResolvedValue({});
    // jest.spyOn(Joi, '')
    bodyValidation(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      message: 'Invalid url',
    });

  });
})