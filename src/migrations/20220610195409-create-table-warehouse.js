'use strict';
const { UUIDV4, DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('warehouses', {
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      },
      warehouseTypes: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      // BillingResolutionId:{
      //   type: Sequelize.DataTypes.STRING,
      //   references: {
      //     model: {
      //       tableName: 'billingresolutions'
      //     }
      //   },
      // },
      createdAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('warehouses');
  }
};
