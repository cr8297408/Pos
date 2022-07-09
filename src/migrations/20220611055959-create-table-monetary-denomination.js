'use strict';
const { UUIDV4, DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('monetaryDenominations', { 
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      photoFile: {
        type: Sequelize.DataTypes.STRING,
      },
      value: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      monetaryDenominationTypes: {
        type: Sequelize.DataTypes.ENUM('BILL', 'COIN'),
        allowNull: false,
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
    await queryInterface.dropTable('monetaryDenominations');
  }
};
