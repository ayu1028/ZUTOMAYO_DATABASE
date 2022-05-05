'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hako extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.live, {
        foreignKey: 'hakoId'
      });
    }
  }
  hako.init({
    hakoName: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'hako',
  });
  return hako;
};