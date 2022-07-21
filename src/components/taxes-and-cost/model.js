const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
sequelize = db.sequelize;

const TaxesAndCost = sequelize.define('TaxesAndCost', {
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
    type: DataTypes.STRING,
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
  tableName: 'TaxesAndCosts',
  timestamps: true
})

module.exports = TaxesAndCost;