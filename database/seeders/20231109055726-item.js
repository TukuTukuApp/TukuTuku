"use strict";
const { item } = require("../../src/models");
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < 20; i++) {
      await item.create({
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 10000, max: 100000 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
