const Product = require('./model');
const Composition = require('./modules/composition/model');
const {DataTypes} = require('sequelize')

const CompositionProduct = sequelize.define('CompositionProduct', {
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
  }
},{
  tableName: 'compositionProducts',
  timestamps: true
});
Product.belongsToMany(Composition, { through: CompositionProduct });
Composition.belongsToMany(Product, { through: CompositionProduct });