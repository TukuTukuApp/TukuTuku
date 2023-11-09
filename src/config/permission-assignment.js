const role = require("../constants/role");
const permission = require("../constants/permission");

module.exports = {
  [role.ADMIN]: [
    permission.CREATE_ITEM,
    permission.DELETE_ITEM,
    permission.READ,
    permission.UPDATE_ITEM,
  ],
  [role.USER]: [
    permission.CREATE_CART,
    permission.READ,
    permission.UPDATE_CART,
    permission.DELETE_CART,
  ],
};
