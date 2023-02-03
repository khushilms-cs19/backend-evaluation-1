const bodyValidation = require("../../src/middlewares/bodyValidation");
const Joi = require('joi');

describe('Body validations', () => {
  it('Should give 400 error message', async () => {
    const mockReq = {
      body: {
        urlLink: 'something',
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
})