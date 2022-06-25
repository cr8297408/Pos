'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('productCategorys', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
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
    await queryInterface.dropTable('productCategorys');
  }
};
