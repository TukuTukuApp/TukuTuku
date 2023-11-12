"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("items", "category", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("items", "description", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("items", "category");
    await queryInterface.removeColumn("items", "description");
  },
};
