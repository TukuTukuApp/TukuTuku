const { Router } = require("express");
const controller = require("../controller/index");
const middleware = require("../middleware/index");
const permissions = require("../../src/constants/permission");

const router = new Router();

router.get(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.READ),
  controller.item.getAllItem
);

router.get(
  "/:id",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.READ),
  controller.item.getItem
);

router.post(
  "/",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.CREATE_ITEM),
  controller.item.createItem
);

router.post(
  "/:id",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.UPDATE_ITEM),
  controller.item.editItem
);

router.delete(
  "/:id",
  middleware.token.verifyToken,
  middleware.authorization.verifyAuthorization(permissions.DELETE_ITEM),
  controller.item.deleteItem
);

module.exports = router;
