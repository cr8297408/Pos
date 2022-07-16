const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBD');
sequelize = db.sequelize;

const Tax = sequelize.define('Tax', {
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
  description: {
    type: DataTypes.STRING,
  },
  tax: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  taxType: {
    type: DataTypes.JSON,
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
  tableName: "taxes",
  timestamps: true
})

// Tax.sync()

module.exports = Tax;