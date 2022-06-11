'use strict';
const { UUIDV4, DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('banks', { 
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      accountingAccount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      }
    
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('banks');
  }
};
