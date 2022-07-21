const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
sequelize = db.sequelize;
const Product = require('../../model');
const Warehouse = require('../../../warehouse/model');
const PreparationType = require('../preparation-type/model');
const ProductMenu = require('../product-menu/model');

const ProductParam = sequelize.define('ProductParam', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  updatePriceInInvoice: {
    type: DataTypes.BOOLEAN,
  },
  belongsToWarehouse: {
    type: DataTypes.BOOLEAN,
  },
  releaseToMenu: {
    type: DataTypes.BOOLEAN,
  },
  invoicePriceRangeFrom: {
    type: DataTypes.FLOAT,
  },
  invoicePriceRangeTO: {
    type: DataTypes.FLOAT,
  },
  maxDiscount: {
    type: DataTypes.FLOAT,
  },
  maxStock: {
    type: DataTypes.FLOAT,
  },
  minStock: {
    type: DataTypes.FLOAT,
  },
  replenishIn: {
    type: DataTypes.STRING,
  },
  additional: {
    type: DataTypes.STRING,
  },
  unitPoints: {
    type: DataTypes.STRING,
  },
  attentionTimeServiceOrders: {
    type: DataTypes.STRING,
  },
  calculatePriceInvoicePercetage: {
    type: DataTypes.STRING,
  },
  pointsPerUnit: {
    type: DataTypes.BOOLEAN,
  },
  gourmetQualify: {
    type: DataTypes.JSON
  },
  options: {
    type: DataTypes.JSON
  },
  productWithPreparation: {
    type: DataTypes.BOOLEAN
  },
  inventoryAccount: {
    type: DataTypes.STRING
  },
  salesAccount: {
    type: DataTypes.STRING
  },
  costSaleAccount: {
    type: DataTypes.STRING
  },
  fixedAsset: {
    type: DataTypes.BOOLEAN
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
  tableName: 'productParams',
  timestamps: true
})

Product.hasMany(ProductParam, {
  foreignKey: 'ProductId'
});
ProductParam.belongsTo(Product);

Warehouse.hasMany(ProductParam, {
  foreignKey: 'WarehouseId'
});
ProductParam.belongsTo(Warehouse);

ProductMenu.hasMany(ProductParam, {
  foreignKey: 'ProductMenuId'
});
ProductParam.belongsTo(ProductMenu);

PreparationType.hasMany(ProductParam, {
  foreignKey: 'PreparationTypeId'
});
ProductParam.belongsTo(PreparationType);

module.exports = ProductParam;