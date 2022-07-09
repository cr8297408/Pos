const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
const ProductStructure = require('./modules/product-structure/model');
const ProductLine = require('./modules/product-line/model');
const UnitMeasurement = require('../measure-unit/model');
const ProductArea = require('./modules/product-area/model');
const ProductGroup = require('./modules/product-group/model');
const Composition = require('./modules/composition/model');
const File = require('../../shared/modules/file/model');

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
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
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
  foreignKey: 'StructureId'
})

ProductLine.hasMany(Product, {
  foreignKey: 'LineId'
})

UnitMeasurement.hasMany(Product, {
  foreignKey: 'UMeasurementId'
})

ProductArea.hasMany(Product, {
  foreignKey: 'AreaId'
})

ProductGroup.hasMany(Product, {
  foreignKey: 'GroupId'
})

Composition.hasMany(Product, {
  foreignKey: 'CompositionId'
})

File.hasMany(Product, {
  foreignKey: 'FileId'
})

module.exports = Product;