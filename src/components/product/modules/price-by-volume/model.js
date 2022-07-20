const { DataTypes, UUIDV4} = require('sequelize');
const Product = require('../../model');
const Tax = require('../../../../components/tax/model');
const db = require('../../../../config/connection/connectBd');
sequelize = db.sequelize;

const PriceByVolume = sequelize.define('PriceByVolume', {
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
  utility: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
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
  tableName: 'priceByVolumes',
  timestamps: true
})

Product.hasMany(PriceByVolume, {
  foreignKey: 'ProductId'
});

Tax.hasMany(PriceByVolume, {
  foreignKey: 'TaxId'
})

module.exports = PriceByVolume;