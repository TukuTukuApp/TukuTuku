"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class toke extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  toke.init(
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "token",
    }
  );
  return toke;
};
