"use strict";
const permissions = require("../../src/constants/permission");
const permissionAssignment = require("../../src/config/permission-assignment");
const { role, permission } = require("../../src/models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const createPermission = [];
    for (const key in permissions) {
      createPermission.push({
        name: permissions[key],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("permissions", createPermission);

    const permissionRole = [];
    for (const Role in permissionAssignment) {
      for (const Permission of permissionAssignment[Role]) {
        const roleId = await role
          .findOne({ where: { name: Role } })
          .then((role) => role.id);

        const permissionId = await permission
          .findOne({ where: { name: Permission } })
          .then((permission) => permission.id);

        permissionRole.push({
          roleId,
          permissionId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("permissionRoles", permissionRole);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
    await queryInterface.bulkDelete("permissionRole", null, {});
  },
};
