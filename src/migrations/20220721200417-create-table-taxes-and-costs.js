'use strict';

const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('taxesAndCosts', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      applyIco: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      valueIco: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      includeIcoInCost: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      productCost: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      unitCost: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      ProductId: {
        type: DataTypes.STRING,
        references: {
          model: 'products', 
          key: 'id'
        }
      },
      ShoppingTaxId: {
        type: DataTypes.STRING,
        references: {
          model: 'taxes', 
          key: 'id'
        }
      },
      unitTaxCostId: {
        type: DataTypes.STRING,
        references: {
          model: 'taxes', 
          key: 'id'
        }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
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
      createdBy: {
        type: DataTypes.STRING,
      },
      updatedBy: {
        type: DataTypes.STRING,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('taxesAndCosts');
  }
};
