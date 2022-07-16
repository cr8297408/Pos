'use strict';
const { UUIDV4, DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('economicActivities', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nameActivity: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      codeCiu: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      codeActivity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      createdBy: {
        type: DataTypes.STRING,
      },
      updatedBy: {
        type: DataTypes.STRING,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('economicActivities');
  }
};
