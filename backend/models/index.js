const sequelize = require('../config/database');
const User = require('./User');
const Medicine = require('./Medicine');
const Bill = require('./Bill');
const BillItem = require('./BillItem');

// Define associations
Bill.hasMany(BillItem, { foreignKey: 'billId', as: 'items' });
BillItem.belongsTo(Bill, { foreignKey: 'billId' });

BillItem.belongsTo(Medicine, { foreignKey: 'medicineId', as: 'medicine' });
Medicine.hasMany(BillItem, { foreignKey: 'medicineId' });

// Sync database without altering existing tables on startup
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = {
  sequelize,
  User,
  Medicine,
  Bill,
  BillItem
};