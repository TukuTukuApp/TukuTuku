const { Router } = require("express");
const middleware = require("../middleware/index");
const permissions = require("../../src/constants/permission");
const controller = require("../controller/index");

const router = new Router();

router.get(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.READ),
  controller.cart.getCart
);

router.post(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.CREATE_CART),
  controller.cart.newCart
);

router.post(
  "/addItem",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.UPDATE_CART),
  controller.cart.addCartItem
);

router.delete(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.DELETE_CART),
  controller.cart.deleteCartItem
);

router.put(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.UPDATE_CART),
  controller.cart.updateItemAmount
);

module.exports = router;
