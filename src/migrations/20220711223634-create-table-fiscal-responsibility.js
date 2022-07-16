'use strict';
const {DataTypes, UUIDV4} = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('fiscalResponsibilitys', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      codeDian: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      taxDescription: {
        type: DataTypes.STRING,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('fiscalResponsibilitys');
  }
};
