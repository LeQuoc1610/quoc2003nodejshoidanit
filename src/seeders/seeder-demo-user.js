'use strict';

const { DATE } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password:'123456',
        firstName: 'HoiDanIT',
        lastName: 'Eric',
        address:'USA',
        phonenumber:'0123456789',
        gender:1,
        image:'',
        RoleId:'R1',
        positionId:'bacsi',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
