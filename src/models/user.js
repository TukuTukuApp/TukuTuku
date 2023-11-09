"use strict";
const bcrypt = require("bcrypt");
const { round } = require("../config/vars");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  user.beforeCreate(async (user, option) => {
    return bcrypt
      .hash(user.password, parseInt(round))
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
  return user;
};
