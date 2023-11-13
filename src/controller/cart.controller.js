const Express = require("express");
const { cart } = require("../models");

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

async function getAllCart(req, res) {
  const idUser = req.user.dataValues.id;
  const carts = await cart.findAll({ where: { userID: idUser } });

  res.send({
    idUser: idUser,
    status: "success",
    items: carts,
  });
}

module.exports = { getAllCart };
