'use strict';

const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('productSalePrices', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      ProductId: {
        type: DataTypes.STRING,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      GeneralValueTaxId: {
        type: DataTypes.STRING,
        references: {
          model: 'taxes',
          key: 'id'
        }
      },
      SpecialOneValueTaxId: {
        type: DataTypes.STRING,
        references: {
          model: 'taxes',
          key: 'id'
        }
      },
      SpecialTwoValueTaxId: {
        type: DataTypes.STRING,
        references: {
          model: 'taxes',
          key: 'id'
        }
      },
      generalValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      generalUtilityValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      comission: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      specialOneValue: {
        type: DataTypes.FLOAT,
      },
      specialTwoValue: {
        type: DataTypes.FLOAT,
      },
      specialOneUtilityValue: {
        type: DataTypes.FLOAT,
      },
      specialTwoUtilityValue: {
        type: DataTypes.FLOAT,
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
    await queryInterface.dropTable('productSalePrices');
  }
};
