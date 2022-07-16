const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
sequelize = db.sequelize;

const EconomicActivitie = sequelize.define('EconomicActivitie', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  nameActivity: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  codeCiu: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  codeActivity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: true
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  }
},{
  tableName: 'EconomicActivities',
  timestamps: true
})

module.exports = EconomicActivitie;