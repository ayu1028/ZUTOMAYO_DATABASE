'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.song_live, {
        foreignKey: 'songId'
      });
      this.hasMany(models.song_album, {
        foreignKey: 'songId'
      });
    }
  }
  song.init({
    songName: DataTypes.TEXT,
    special: DataTypes.INTEGER,
    releaseDate: DataTypes.DATEONLY,
    youtubeTag: DataTypes.TEXT,
    remark: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'song',
  });
  return song;
};