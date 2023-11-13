const { Router } = require("express");
const controller = require("../controller/index");
const middleware = require("../middleware/index");
const permissions = require("../../src/constants/permission");

const router = new Router();

router.post(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.CREATE_ORDER),
  controller.transaction.createTransaction
);

router.post(
  "/pay",
  middleware.token.verifyToken,
  controller.transaction.transactionPayment
);

router.post(
  "/verify",
  middleware.token.verifyToken,
  controller.transaction.verifyPayment
);

module.exports = router;
