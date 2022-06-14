const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBD');
sequelize = db.sequelize;

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull:  false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull:  false
  },
  lastName: {
    type: DataTypes.STRING,
  },
  roles: DataTypes.JSON,
  profile: DataTypes.JSON,
  isActive:  {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  verified:  {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastLogin: {
    type: DataTypes.DATE
  },
  typeUser: {
    type: DataTypes.STRING,
    defaultValue: "USER_READ"
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  avatarFile: DataTypes.STRING
},{
  tableName: "users",
  timestamps: true
})

module.exports = User;