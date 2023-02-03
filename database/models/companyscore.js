'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companyScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  companyScore.init({
    companyId: DataTypes.STRING,
    companyName: DataTypes.STRING,
    score: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'companyScore',
  });
  return companyScore;
};