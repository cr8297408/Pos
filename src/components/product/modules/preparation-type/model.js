const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
const Preparation = require('../preparation/model');
sequelize = db.sequelize;

const PreparationType = sequelize.define('PreparationType', {
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
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  }
},{
  tableName: 'preparationTypes',
  timestamps: true
})

Preparation.hasMany(PreparationType, {
  foreignKey: 'PreparationId'
})

module.exports = PreparationType;