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

module.exports = router;
