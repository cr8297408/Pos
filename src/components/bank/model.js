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
  },
  accountingAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  tableName: "Banks",
  timestamps: true
})

module.exports = Bank;