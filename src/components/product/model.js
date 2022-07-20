const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
const ProductStructure = require('./modules/product-structure/model');
const ProductLine = require('./modules/product-line/model');
const UnitMeasurement = require('../measure-unit/model');
const ProductArea = require('./modules/product-area/model');
const ProductGroup = require('./modules/product-group/model');
const File = require('../../shared/modules/files/model');

sequelize = db.sequelize;

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
  },
  ref: {
    type: DataTypes.STRING,
  },
  subGroups: {
    type: DataTypes.STRING,
  },
  barCode: {
    type: DataTypes.STRING,
  },
  barCodeGroup: {
    type: DataTypes.STRING,
  },
  shoppingAssistant: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isProductCurve: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  compound: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  }
},{
  tableName: 'products',
  timestamps: true
})

ProductStructure.hasMany(Product, {
  foreignKey: 'ProductStructureId'
})

Product.belongsTo(ProductStructure);

ProductLine.hasMany(Product, {
  foreignKey: 'ProductLineId'
})
Product.belongsTo(ProductLine);

UnitMeasurement.hasMany(Product, {
  foreignKey: 'UnitMeasurementId'
})
Product.belongsTo(UnitMeasurement);

ProductArea.hasMany(Product, {
  foreignKey: 'ProductAreaId'
})
Product.belongsTo(ProductArea);

ProductGroup.hasMany(Product, {
  foreignKey: 'ProductGroupId'
})
Product.belongsTo(ProductGroup);

File.hasMany(Product, {
  foreignKey: 'FileId'
})
Product.belongsTo(File);

module.exports = Product;