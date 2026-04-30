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

const ensureUserTableColumns = async () => {
  const queryInterface = sequelize.getQueryInterface();
  const table = await queryInterface.describeTable('users');

  if (!table.email) {
    await queryInterface.addColumn('users', 'email', {
      type: sequelize.Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: true
    });
  }

  if (!table.createdAt) {
    await queryInterface.addColumn('users', 'createdAt', {
      type: sequelize.Sequelize.DataTypes.DATE,
      allowNull: true
    });
  }

  if (!table.updatedAt) {
    await queryInterface.addColumn('users', 'updatedAt', {
      type: sequelize.Sequelize.DataTypes.DATE,
      allowNull: true
    });
  }
};

// Sync database without altering existing tables on startup
ensureUserTableColumns()
  .then(() => sequelize.sync())
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
