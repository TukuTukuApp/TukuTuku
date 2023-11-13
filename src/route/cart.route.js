const { Router } = require("express");
const middleware = require("../middleware/index");
const permissions = require("../../src/constants/permission");
const controller = require("../controller/index");

const router = new Router();

router.get(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.READ),
  controller.cart.getAllCart
);

router.post(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.CREATE_CART),
  controller.cart.addCart
);

router.delete(
  "/:id",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.DELETE_CART),
  controller.cart.deleteCart
);

module.exports = router;
