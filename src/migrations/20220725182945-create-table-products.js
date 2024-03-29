'use strict';
const { UUIDV4, DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      ProductStructureId: {
        type: DataTypes.STRING,
        references: {
          model: 'productStructures',
          key: 'id'
        }
      },
      ProductLineId: {
        type: DataTypes.STRING,
        references: {
          model: 'productLines',
          key: 'id'
        }
      },
      UnitMeasurementId: {
        type: DataTypes.STRING,
        references: {
          model: 'unitMeasurements',
          key: 'id'
        }
      },
      ProductAreaId: {
        type: DataTypes.STRING,
        references: {
          model: 'productAreas',
          key: 'id'
        }
      },
      ProductGroupId: {
        type: DataTypes.STRING,
        references: {
          model: 'productGroups',
          key: 'id'
        }
      },
      ProductCategoryId: {
        type: DataTypes.STRING,
        references: {
          model: 'productCategorys',
          key: 'id'
        }
      },
      FileId: {
        type: DataTypes.STRING,
        references: {
          model: 'files',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
      },
      ref: {
        type: DataTypes.STRING,
      },
      subGroups: {
        type: DataTypes.STRING,
      },
      barCode: {
        type: DataTypes.STRING,
      },
      barCodeGroup: {
        type: DataTypes.STRING,
      },
      shoppingAssistant: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isProductCurve: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      compound: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('products');
  }
};
