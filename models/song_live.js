'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song_live extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.live, {
        foreignKey: 'liveId'
      });
      this.belongsTo(models.song, {
        foreignKey: 'songId'
      });
    }
  }
  song_live.init({
    songName: DataTypes.TEXT,
    songId: DataTypes.INTEGER,
    liveId: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    encoreFlag: DataTypes.INTEGER,
    remark: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'song_live',
  });
  return song_live;
};