"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("carts", "itemId");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("carts", "itemId");
  },
};
