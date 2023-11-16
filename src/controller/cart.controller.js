const Express = require("express");
const { cart, cartItem, item } = require("../models");
const { where } = require("sequelize");

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

async function getCart(req, res) {
  const idUser = req.user.id;
  const carts = await cart.findOne({
    where: { userID: idUser, orderCreatedAt: null },
  });

  if (!carts) {
    res.status(400).send({
      message: "Carts not found",
    });
    return;
  }

  const itemsCart = await cartItem.findAll({ where: { cartId: carts.id } });

  const dataCart = [];
  for (let i = 0; i < itemsCart.length; i++) {
    const getItem = await item.findByPk(itemsCart[i].itemId);
    dataCart.push({
      item: getItem,
      amount: itemsCart[i].amount,
    });
  }

  res.send(dataCart);
}

async function newCart(req, res) {
  const idUser = req.user.id;
  const carts = await cart.findOne({
    where: { userID: idUser, orderCreatedAt: null },
  });

  if (carts) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const addNewCart = await cart.create({ userId: idUser });
  if (!addNewCart) {
    res.status(400).send({
      message: "Failed to Create Cart",
    });
    return;
  }
  const newCartItem = req.body.items;

  if (newCartItem.length < 0) {
    res.status(400).send({
      message: "Error",
    });
    return;
  }

  for (let i = 0; i < newCartItem.length; i++) {
    if (newCartItem[i].itemId === null || newCartItem[i].amount === null) {
      res.status(400).send({
        message: "Cannot send empty data",
      });
      return;
    }
  }
  for (let i = 0; i < newCartItem.length; i++) {
    await cartItem.create({
      cartId: addNewCart.id,
      itemId: newCartItem[i].itemId,
      amount: newCartItem[i].amount,
    });
  }

  res.send({
    message: "success",
  });
}

async function addCartItem(req, res) {
  const idUser = req.user.id;
  const carts = await cart.findOne({
    where: { userID: idUser, orderCreatedAt: null },
  });

  if (!carts) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const newItem = req.body.items;

  if (newItem.length < 0) {
    res.status(400).send({
      message: "Error",
    });
    return;
  }

  for (let i = 0; i < newItem.length; i++) {
    if (newItem[i].itemId === null || newItem[i].amount === null) {
      res.status(400).send({
        message: "Cannot send empty data",
      });
      return;
    }
  }
  for (let i = 0; i < newItem.length; i++) {
    await cartItem.create({
      cartId: carts.id,
      itemId: newItem[i].itemId,
      amount: newItem[i].amount,
    });
  }

  res.send({
    message: "success",
  });
}

async function deleteCartItem(req, res) {
  const idUser = req.user.id;
  const carts = await cart.findOne({
    where: { userID: idUser, orderCreatedAt: null },
  });

  if (!carts) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const { cartId, itemId } = req.body;

  if (cartId === null || itemId === null) {
    res.status(400).send({
      message: "Cannot send empty data",
    });
    return;
  }

  const deleted = await cartItem.destroy({
    where: { cartId: cartId, itemId: itemId },
  });

  if (!deleted) {
    res.status(400).send({
      message: "Failed to delete!",
    });
    return;
  }

  res.send({
    message: "Success",
  });
}

async function updateItemAmount(req, res) {
  const idUser = req.user.id;
  const { cartId, itemId, newAmount } = req.body;
  const carts = await cart.findOne({
    where: { userID: idUser, orderCreatedAt: null },
  });

  if (!carts) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  if (!cartId || !itemId || !newAmount) {
    res.status(400).send({
      message: "Cannot send empty data",
    });
    return;
  }

  const updated = await cartItem.update(
    { amount: newAmount },
    { where: { cartId: cartId, itemId: itemId } }
  );

  if (!updated) {
    res.status(400).send({
      message: "Failed to update!",
    });
    return;
  }

  res.send({
    message: "Success",
  });
}

module.exports = {
  getCart,
  newCart,
  addCartItem,
  deleteCartItem,
  updateItemAmount,
};
