"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("transactions", "userId", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("transactions", "userId");
  },
};
