const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
const Product = require('../../model');

sequelize = db.sequelize;

const ProductCurve = sequelize.define('ProductCurve', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  },
  ref: {
    type: DataTypes.STRING
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
},{
  tableName: 'productCurves',
  timestamps: true
})

Product.hasMany(ProductCurve, {
  foreignKey: 'ProductId'
})
ProductCurve.belongsTo(Product);

module.exports = ProductCurve;