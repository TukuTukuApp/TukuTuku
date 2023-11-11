const { Router } = require("express");
const auth = require("./auth.route");
const item = require("./item.route");

const router = new Router();

router.use("/auth", auth);
router.use("/item", item);

module.exports = router;
