const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
sequelize = db.sequelize;
const ProductStructure = require('../product-structure/model');

const ProductLine = sequelize.define('ProductLine', {
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
},{
  tableName: "productLines",
  timestamps: true
})
ProductStructure.hasMany(ProductLine, {
  foreignKey: 'ProductStructureId', 
})


module.exports = ProductLine;