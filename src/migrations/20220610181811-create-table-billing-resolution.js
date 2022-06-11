'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('billingresolutions', { 
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      resolutionClass: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      resolutionType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      resolutionNumber: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      from: Sequelize.DataTypes.DATE,
      to: Sequelize.DataTypes.DATE,
      prefix: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      initialNumber: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      finalNumber: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      localBilling: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('billingresolutions');
  }
};
