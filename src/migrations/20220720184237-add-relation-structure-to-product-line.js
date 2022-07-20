'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'productLines',
        'ProductStructureId',
        {
          type: Sequelize.STRING,
          references: {
            model: 'productStructures',
            key: 'id'
          }
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('productLines', 'ProductStructureId')
    ]);
  }
};
