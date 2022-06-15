const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  tableName: Products,
  timestamps: true
})

module.exports = Product;