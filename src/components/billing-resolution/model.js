const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBD');
sequelize = db.sequelize;
const BillingResolution = sequelize.define('BillingResolution', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  resolutionClass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resolutionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resolutionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique:true,
  },
  from: DataTypes.DATE,
  to: DataTypes.DATE,
  prefix: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  initialNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  finalNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  localBilling: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
  tableName: "billingResolutions",
  timestamps: true,
})

module.exports = BillingResolution;