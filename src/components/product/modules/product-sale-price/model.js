const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
const Product = require('../../model');
const Tax = require('../../../tax/model');

sequelize = db.sequelize;

const ProductSalePrice = sequelize.define('ProductSalePrice', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  generalValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  generalUtilityValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comission: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  specialOneValue: {
    type: DataTypes.FLOAT,
  },
  specialTwoValue: {
    type: DataTypes.FLOAT,
  },
  specialOneUtilityValue: {
    type: DataTypes.FLOAT,
  },
  specialTwoUtilityValue: {
    type: DataTypes.FLOAT,
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
  tableName: 'productSalePrices',
  timestamps: true
})

Product.hasMany(ProductSalePrice, {
  foreignKey: 'ProductId'
});
ProductSalePrice.belongsTo(Product);

Tax.hasMany(ProductSalePrice, {
  foreignKey: 'GeneralValueTaxId'
});

Tax.hasMany(ProductSalePrice, {
  foreignKey: 'SpecialOneValueTaxId'
});

Tax.hasMany(ProductSalePrice, {
  foreignKey: 'SpecialTwoValueTaxId'
});

// ProductSalePrice.belongsTo(Tax);


module.exports = ProductSalePrice;