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

async function addCart(req, res) {
  const newCart = req.body.item;
  if (!newCart || !newCart.userId || !newCart.itemId) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const created = await cart.create(newCart);
  if (!created) {
    res.status(400).send({
      message: "Failed to Request",
    });
    return;
  }
  res.send(created);
}

async function deleteCart(req, res) {
  const cartId = req.params.id;
  if (!cartId) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const findCart = await cart.findOne({ where: { id: cartId } });
  if (!findCart) {
    res.status(404).send({
      message: "Invalid Item",
    });
    return;
  }

  const deleted = await cart.destroy({ where: { id: cartId } });
  if (!deleted) {
    res.status(400).send({
      message: "Failed To Request",
    });
    return;
  }

  res.send({
    status: "Success",
  });
}

module.exports = { getAllCart, addCart, deleteCart };
