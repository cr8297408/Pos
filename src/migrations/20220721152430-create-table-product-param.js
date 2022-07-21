'use strict';
const {DataTypes, UUIDV4} = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('productParams', {
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
      WarehouseId: {
        type: DataTypes.STRING,
        references: {
          model: 'warehouses',
          key: 'id'
        }
      },
      ProductMenuId: {
        type: DataTypes.STRING,
        references: {
          model: 'productMenus',
          key: 'id'
        }
      },
      PreparationTypeId: {
        type: DataTypes.STRING,
        references: {
          model: 'preparationTypes',
          key: 'id'
        }
      },
      updatePriceInInvoice: {
        type: DataTypes.BOOLEAN,
      },
      belongsToWarehouse: {
        type: DataTypes.BOOLEAN,
      },
      releaseToMenu: {
        type: DataTypes.BOOLEAN,
      },
      invoicePriceRangeFrom: {
        type: DataTypes.FLOAT,
      },
      invoicePriceRangeTO: {
        type: DataTypes.FLOAT,
      },
      maxDiscount: {
        type: DataTypes.FLOAT,
      },
      maxStock: {
        type: DataTypes.FLOAT,
      },
      minStock: {
        type: DataTypes.FLOAT,
      },
      replenishIn: {
        type: DataTypes.STRING,
      },
      additional: {
        type: DataTypes.STRING,
      },
      unitPoints: {
        type: DataTypes.STRING,
      },
      attentionTimeServiceOrders: {
        type: DataTypes.STRING,
      },
      calculatePriceInvoicePercetage: {
        type: DataTypes.STRING,
      },
      pointsPerUnit: {
        type: DataTypes.BOOLEAN,
      },
      gourmetQualify: {
        type: DataTypes.JSON
      },
      options: {
        type: DataTypes.JSON
      },
      productWithPreparation: {
        type: DataTypes.BOOLEAN
      },
      inventoryAccount: {
        type: DataTypes.STRING
      },
      salesAccount: {
        type: DataTypes.STRING
      },
      costSaleAccount: {
        type: DataTypes.STRING
      },
      fixedAsset: {
        type: DataTypes.BOOLEAN
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
    await queryInterface.dropTable('productParams');
  }
};
