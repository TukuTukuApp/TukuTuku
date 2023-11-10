const { Router } = require("express");
const controller = require("../controller/index");

const router = new Router();

router.post("/login", controller.auth.login);
router.post("/register", controller.auth.register);
router.post("/change-password", controller.auth.changePassword);

module.exports = router;
