const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
sequelize = db.sequelize;

const ProductGroup = sequelize.define('ProductGroup', {
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
  description: {
    type: DataTypes.STRING,
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  }
},{
  tableName: 'productGroups',
  timestamps: true
})

module.exports = ProductGroup;