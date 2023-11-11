const Express = require("express");
const { item, user } = require("../models");

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

async function getAllItem(req, res) {
  const items = await item.findAll();

  res.send({
    status: "Success",
    items: items,
  });
}

async function getItem(req, res) {
  const id = req.params.id;
  const getItem = await item.findByPk(id);

  if (!getItem) {
    res.status(404).send({
      message: "Item Not Found",
    });
    return;
  }

  res.send({
    status: "Success",
    item: getItem,
  });
}

async function createItem(req, res) {
  const newItem = req.body.item;
  if (!newItem || !newItem.name || !newItem.price) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }
  const created = await item.create(newItem);
  if (!created) {
    res.status(400).send({
      message: "Failed To Request",
    });
    return;
  }
  res.send(created);
}

async function editItem(req, res) {
  const itemId = req.params.id;
  const editItem = req.body.item;
  console.log(itemId);
  console.log(editItem);
  if (!itemId || !editItem || !editItem.name || !editItem.price) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const oldItem = await item.findOne({ where: { id: itemId } });
  if (!oldItem) {
    res.status(404).send({
      message: "Invalid Item",
    });
    return;
  }

  const updated = await item.update(editItem, { where: { id: itemId } });
  if (!updated) {
    res.status(400).send({
      message: "Failed To Request",
    });
    return;
  }

  res.send({
    status: "Success",
  });
}

async function deleteItem(req, res) {
  const itemId = req.params.id;
  if (!itemId) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const oldItem = await item.findOne({ where: { id: itemId } });
  if (!oldItem) {
    res.status(404).send({
      message: "Invalid Item",
    });
    return;
  }

  const deleted = await item.destroy({ where: { id: itemId } });
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

module.exports = { getAllItem, getItem, createItem, editItem, deleteItem };
