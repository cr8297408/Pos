const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBD');
sequelize = db.sequelize;

const MeasureUnit = sequelize.define('MeasureUnit', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  tableName: "measureUnits",
  timestamps: true
})

module.exports = MeasureUnit;