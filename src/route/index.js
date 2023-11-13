const { Router } = require("express");
const auth = require("./auth.route");
const item = require("./item.route");
<<<<<<< HEAD
const cart = require("./cart.route");
=======
const transaction = require("./transaction.route");
>>>>>>> 2eed6ded3c5843d0aa97f41b669111a009c9a179

const router = new Router();

router.use("/auth", auth);
router.use("/item", item);
<<<<<<< HEAD
router.use("/cart", cart);
=======
router.use("/transaction", transaction);
>>>>>>> 2eed6ded3c5843d0aa97f41b669111a009c9a179

module.exports = router;
