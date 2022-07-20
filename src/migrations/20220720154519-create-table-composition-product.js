'use strict';
const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('compositionProducts', {
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
      CompositionId: {
        type: DataTypes.STRING,
        references: {
          model: 'compositions',
          key: 'id'
        }
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
    await queryInterface.dropTable('compositionProducts');
  }
};
