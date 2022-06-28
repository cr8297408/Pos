const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
const Product = require('../../model');

sequelize = db.sequelize;

const Composition = sequelize.define('Composition', {
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
  },
  supplies: {
    type: DataTypes.JSON,
    allowNull: false
  },
  portion: {
    type: DataTypes.NUMBER,
  }
},{
  tableName: 'compositions',
  timestamps: true
})

Product.hasMany(Composition, {
  foreignKey: 'ProductId'
})


module.exports = Composition;