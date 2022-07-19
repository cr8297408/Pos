'use strict';
const { UUIDV4, DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('billingResolutions', { 
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      resolutionClass: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      resolutionType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      resolutionNumber: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique:true,
      },
      from: Sequelize.DataTypes.DATE,
      to: Sequelize.DataTypes.DATE,
      prefix: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      initialNumber: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      finalNumber: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      localBilling: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('billingResolutions');
  }
};
