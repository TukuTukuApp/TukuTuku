const Express = require("express");
const { cart, transaction, payment } = require("../models");
const transactionStatus = require("../constants/transactionStatus");

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

async function createTransaction(req, res) {
  const items = await cart.findAll({ where: { userId: req.user.id } });
  const order = JSON.stringify(items);
  const date = new Date();

  const newTransaction = {
    transactionCode: `${date.getDay()}${date.getMonth()}${date.getFullYear()}/${
      req.user.id
    }/${date.getMilliseconds()}`,
    date: date,
    createdAt: date,
    updatedAt: date,
    items: order,
    status: transactionStatus.VERIFY_PAYMENT,
    userId: req.user.id,
  };

  console.log(newTransaction);

  try {
    const createTransaction = await transaction.create(newTransaction);
    if (!createTransaction) {
      res.status(500).send({
        message: "Something Wrong",
      });
      return;
    }

    await cart.destroy({ where: { userId: req.user.id } });

    res.send(createTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server Error",
    });
    return;
  }
  return;
}

async function transactionPayment(req, res) {
  if (!req.body.transactionCode) {
    res.status(400).send({
      message: "Missing Transaction Code",
    });
  }
  console.log(req.body.transactionCode);

  const getTransaction = await transaction.findOne({
    where: { transactionCode: req.body.transactionCode },
  });

  const getPayment = await payment.findOne({
    where: { transactionId: getTransaction.id },
  });

  if (getPayment) {
    res.status(400).send({
      message: "Payment already done",
    });
    return;
  }

  const paymentCode = generateTransactionId();
  const newPayment = await payment.create({
    paymentCode,
    transactionId: getTransaction.id,
  });

  if (!newPayment) {
    res.status(500).send({
      message: "Something went wrong",
    });
    return;
  }

  res.send({
    status: "Succes",
    paymentCode,
  });
}

async function verifyPayment(req, res) {
  if (!req.body.paymentCode) {
    res.status(400).send({
      message: "Missing Payment Code",
    });
  }

  const getPayment = await payment.findOne({
    where: { paymentCode: req.body.paymentCode },
  });

  if (!getPayment) {
    res.status(400).send({
      message: "Invalid Payment Code",
    });
    return;
  }

  const update = await transaction.update(
    { status: transactionStatus.PROCESSING },
    { where: { id: getPayment.transactionId } }
  );

  if (!update) {
    res.status(500).send({
      message: "Something went wrong",
    });
    return;
  }

  const getTransaction = await transaction.findOne({
    Where: { transactionCode: getPayment.transactionId },
  });

  res.send(getTransaction);
}

const generateTransactionId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let transactionId = "";

  for (let i = 0; i < 20; i++) {
    transactionId += characters[Math.floor(Math.random() * characters.length)];
  }

  return transactionId;
};

module.exports = { createTransaction, transactionPayment, verifyPayment };
