'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.song_album, {
        foreignKey: 'albumId'
      });
    }
  }
  album.init({
    albumName: DataTypes.TEXT,
    releaseDate: DataTypes.DATEONLY,
    format: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'album',
  });
  return album;
};