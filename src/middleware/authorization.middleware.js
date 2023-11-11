const Express = require("express");
const { permissionRole, permission } = require("../models");

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */

const verifyAuthorization = (permissionLevel) => {
  return async (req, res, next) => {
    let isAllowed = false;
    const user = req.user;
    const getPermissionRole = await permissionRole.findAll({
      where: { roleId: user.roleId },
    });

    const getPermission = await permission.findOne({
      where: { name: permissionLevel },
    });

    for (let i = 0; i < getPermissionRole.length; i++) {
      if (getPermissionRole[i].permissionId === getPermission.id) {
        isAllowed = true;
      }
    }

    if (!isAllowed) {
      res.status(401).send({
        message: "Unathorized",
      });
      return;
    }

    next();
  };
};

module.exports = { verifyAuthorization };
