const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBD');
sequelize = db.sequelize;

const MonetaryDenomination = sequelize.define('MonetaryDenomination', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  photoFile: {
    type: DataTypes.STRING,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monetaryDenominationTypes: {
    type: DataTypes.ENUM('BILL', 'COIN'),
    allowNull: false,
  }
},{
  tableName: "monetaryDenominations",
  timestamps: true
})

module.exports = MonetaryDenomination;