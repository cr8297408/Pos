'use strict';
const { UUIDV4, DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      message: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isRead: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      type: {
        type: Sequelize.DataTypes.ENUM('PERSONAL', 'BY_USER_POSITION', 'BY_TYPE', 'GROUP')
      },
      typeNotification: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      icon: {
        type: Sequelize.DataTypes.STRING,
      },
      module: Sequelize.DataTypes.STRING,
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
    await queryInterface.dropTable('users');
  }
};
