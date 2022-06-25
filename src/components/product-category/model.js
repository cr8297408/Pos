const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
sequelize = db.sequelize;

const ProductCategory = sequelize.define('ProductCategory', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  tableName: ProductCategorys,
  timestamps: true
})

module.exports = ProductCategory;