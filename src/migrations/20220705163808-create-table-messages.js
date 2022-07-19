'use strict';
const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
      },
      emoticon: {
        type: DataTypes.STRING,
      },
      ChatId: {
        type: DataTypes.STRING,
        references: {
          model: 'chats', 
          key: 'id'
        }
      },
      file: {
        type: DataTypes.STRING,
      },
      tipeFile: {
        type: DataTypes.STRING,
      },
      estate: {
        type: DataTypes.ENUM('LEIDO', 'ENTREGADO', 'PENDIENTE'),
      },
      createdAt: {
        type: DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('messages');
  }
};
