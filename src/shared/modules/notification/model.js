const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
sequelize = db.sequelize;

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeNotification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
  }
},{
  tableName: "notifications",
  timestamps: true
})

module.exports = Notification;