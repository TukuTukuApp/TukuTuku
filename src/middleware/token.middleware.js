const Express = require("express");
const { token, user } = require("../models");

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */

async function verifyToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(400).send({
      message: "Invalid Credential",
    });
    return;
  }

  const getToken = await token.findOne({ where: { token: authorization } });

  if (!getToken) {
    res.status(400).send({
      message: "Invalid Credential",
    });
    return;
  }

  req.user = await user.findByPk(getToken.userId);

  return next();
}

module.exports = { verifyToken };
