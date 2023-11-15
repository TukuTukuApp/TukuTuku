const role = require("../constants/role");
const permission = require("../constants/permission");

module.exports = {
  [role.ADMIN]: [
    permission.CREATE_ITEM,
    permission.DELETE_ITEM,
    permission.READ,
    permission.UPDATE_ITEM,
    permission.UPDATE_ORDER_STATUS,
    permission.VERIFY_PAYMENT,
  ],
  [role.USER]: [
    permission.CREATE_CART,
    permission.READ,
    permission.UPDATE_CART,
    permission.DELETE_CART,
    permission.CREATE_ORDER,
    permission.PAY_TRANSACTION,
    permission.DONE_ORDER,
  ],
};
