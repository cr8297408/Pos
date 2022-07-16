const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
sequelize = db.sequelize;

const FiscalResponsibility = sequelize.define('FiscalResponsibility', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  codeDian: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  taxDescription: {
    type: DataTypes.STRING,
  },
},{
  tableName: 'fiscalResponsibilitys',
  timestamps: true
})

module.exports = FiscalResponsibility;