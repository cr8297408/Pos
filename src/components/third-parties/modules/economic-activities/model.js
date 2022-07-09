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
  },
  codeCiu: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  codeActivity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  rate: {
    type: DataTypes.NUMBER,
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