const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBd');
sequelize = db.sequelize;

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
  },
  emoticon: {
    type: DataTypes.STRING,
  },
  file: {
    type: DataTypes.STRING,
  },
  tipeFile: {
    type: DataTypes.STRING,
  },
  estate: {
    type: DataTypes.ENUM('LEIDO', 'ENTREGADO', 'PENDIENTE'),
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  }
},{
  tableName: 'messages',
  timestamps: true
})

module.exports = Message;