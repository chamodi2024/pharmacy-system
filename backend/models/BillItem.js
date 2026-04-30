const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BillItem = sequelize.define('BillItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  billId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'bill_id',
    references: {
      model: 'bills',
      key: 'id'
    }
  },
  medicineId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'medicine_id',
    references: {
      model: 'medicine',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'bill_items',
  timestamps: false
});

module.exports = BillItem;
