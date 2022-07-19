const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
sequelize = db.sequelize;
const Messages = require('./message/model');

const Chat = sequelize.define('Chat', {
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
  users: {
    type: DataTypes.JSON,
  },
  description: {
    type: DataTypes.STRING
  },
  isPrivate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  }
},{
  tableName: 'chats',
  timestamps: true
})


Chat.hasMany(Messages, {
  foreignKey: 'ChatId'
})

module.exports = Chat;