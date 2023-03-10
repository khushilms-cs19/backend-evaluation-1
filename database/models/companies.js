'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.companyScore);
    }
  }
  companies.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    ceo: DataTypes.STRING,
    companyId: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'companies',
  });
  return companies;
};