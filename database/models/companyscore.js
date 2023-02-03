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
      this.belongsTo(models.companies, {
        foreignKey: 'companyId',
      });
    }
  }
  companyScore.init({
    companyId: DataTypes.STRING,
    companyName: DataTypes.STRING,
    score: DataTypes.FLOAT,
    sector: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'companyScore',
  });
  return companyScore;
};