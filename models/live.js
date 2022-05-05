'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class live extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.hako, {
        foreignKey: 'hakoId'
      });
      this.hasMany(models.song_live, {
        foreignKey: 'liveId'
      });
    }
  }
  live.init({
    liveTitle: DataTypes.TEXT,
    liveDate: DataTypes.DATEONLY,
    hakoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'live',
  });
  return live;
};