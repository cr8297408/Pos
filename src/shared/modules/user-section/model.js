const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
const User = require('../user/model');
sequelize = db.sequelize;

const UserSection = sequelize.define('UserSection', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'userSections',
  timestamps: true
})

User.hasMany(UserSection, {
  foreignKey: 'UserId'
})

module.exports = UserSection;