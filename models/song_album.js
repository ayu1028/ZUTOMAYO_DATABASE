'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song_album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.album, {
        foreignKey: 'albumId'
      });
      this.belongsTo(models.song, {
        foreignKey: 'songId'
      });
    }
  }
  song_album.init({
    songId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    remark: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'song_album',
  });
  return song_album;
};