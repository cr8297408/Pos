const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
const Product = require('../../model');
const Tax = require('../../../tax/model');

sequelize = db.sequelize;

const TaxesAndCost = sequelize.define('TaxesAndCost', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  applyIco: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  valueIco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  includeIcoInCost: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  productCost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  unitCost: {
    type: DataTypes.FLOAT,
    allowNull: false
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
  tableName: 'taxesAndCosts',
  timestamps: true
})

Product.hasMany(TaxesAndCost, {
  foreignKey: 'ProductId'
});
TaxesAndCost.belongsTo(Product);

Tax.hasMany(TaxesAndCost, {
  foreignKey: 'ShoppingTaxId'
});
TaxesAndCost.belongsTo(Tax, {
  foreignKey: 'ShoppingTaxId'
});

Tax.hasMany(TaxesAndCost, {
  foreignKey: 'unitTaxCostId'
});
TaxesAndCost.belongsTo(Tax, {
  foreignKey: 'unitTaxCostId'
});

module.exports = TaxesAndCost;