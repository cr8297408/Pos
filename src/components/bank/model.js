const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBD');
sequelize = db.sequelize;

const Bank = sequelize.define('Bank', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accountingAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
},{
  tableName: "banks",
  timestamps: true
})

module.exports = Bank;