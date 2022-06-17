const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
sequelize = db.sequelize;

const ProductStructure = sequelize.define('ProductStructure', {
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
},{
  tableName: 'productStructures',
  timestamps: true
})

// ProductStructure.sync()

module.exports = ProductStructure;