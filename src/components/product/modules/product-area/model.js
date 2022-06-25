const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../../config/connection/connectBD');
sequelize = db.sequelize;

const ProductArea = sequelize.define('ProductArea', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  attentionArea: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
},{
  tableName: "productAreas",
  timestamps: true
})


module.exports = ProductArea;