const { Router } = require("express");
const controller = require("../controller/index");
const middleware = require("../middleware/index");
const permissions = require("../../src/constants/permission");

const router = new Router();

router.post(
  "/create-order",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.CREATE_ORDER),
  controller.transaction.createTransaction
);

router.post(
  "/pay",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.PAY_TRANSACTION),
  controller.transaction.transactionPayment
);

router.post(
  "/verify",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.VERIFY_PAYMENT),
  controller.transaction.verifyPayment
);

router.post(
  "/update-order",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.UPDATE_ORDER_STATUS),
  controller.transaction.updateOrderStatus
);

router.post(
  "/done-order",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.DONE_ORDER),
  controller.transaction.endOrder
);

router.get(
  "/",
  middleware.token.verifyToken,
  controller.transaction.getUserTransaction
);

module.exports = router;
