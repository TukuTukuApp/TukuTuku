const { Router } = require("express");
const auth = require("./auth.route");
const item = require("./item.route");
const cart = require("./cart.route");

const router = new Router();

router.use("/auth", auth);
router.use("/item", item);
router.use("/cart", cart);

module.exports = router;
