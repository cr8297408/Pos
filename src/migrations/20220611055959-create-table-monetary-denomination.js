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
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monetaryDenominationTypes: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('monetaryDenominations');
  }
};
