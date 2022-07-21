const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
const Product = require('../../model');

sequelize = db.sequelize;

const ProductMenu = sequelize.define('ProductMenu', {
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
  products: {
    type: DataTypes.JSON
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
  tableName: 'productMenus',
  timestamps: true
})

Product.hasMany(ProductMenu, {
  foreignKey: 'ProductId'
});
ProductMenu.belongsTo(Product);

module.exports = ProductMenu;