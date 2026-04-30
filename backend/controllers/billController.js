const Joi = require('joi');
const { Bill, BillItem, Medicine } = require('../models');

const billSchema = Joi.object({
  patientName: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      medicineId: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).min(1).required(),
  totalAmount: Joi.number().positive().required()
});

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.findAll({
      include: [{
        model: BillItem,
        as: 'items',
        include: [{
          model: Medicine,
          as: 'medicine',
          attributes: ['name', 'price']
        }]
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(bills);
  } catch (error) {
    console.error('Get bills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBill = async (req, res) => {
  let transaction;

  try {
    const { error } = billSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { patientName, items, totalAmount } = req.body;
    transaction = await Bill.sequelize.transaction();

    // Create bill
    const bill = await Bill.create({
      patientName,
      totalAmount,
      createdAt: new Date()
    }, { transaction });

    // Create bill items
    const billItems = [];
    for (const item of items) {
      const medicine = await Medicine.findByPk(item.medicineId, { transaction });
      if (!medicine) {
        await transaction.rollback();
        return res.status(400).json({ message: `Medicine with ID ${item.medicineId} not found` });
      }

      if (medicine.quantity < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ message: `Insufficient quantity for ${medicine.name}` });
      }

      // Update medicine quantity
      await medicine.update({
        quantity: medicine.quantity - item.quantity
      }, { transaction });

      // Create bill item
      const billItem = await BillItem.create({
        billId: bill.id,
        medicineId: item.medicineId,
        quantity: item.quantity,
        price: medicine.price
      }, { transaction });

      billItems.push(billItem);
    }

    await transaction.commit();

    res.status(201).json({
      message: 'Bill created successfully',
      bill: {
        ...bill.toJSON(),
        items: billItems
      }
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Create bill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBill = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findByPk(id, {
      include: [{
        model: BillItem,
        as: 'items',
        include: [{
          model: Medicine,
          as: 'medicine',
          attributes: ['name', 'price']
        }]
      }]
    });

    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    res.json(bill);
  } catch (error) {
    console.error('Get bill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBill = async (req, res) => {
  const transaction = await Bill.sequelize.transaction();

  try {
    const { id } = req.params;
    const bill = await Bill.findByPk(id, {
      include: [{ model: BillItem, as: 'items' }],
      transaction
    });

    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    // Restore medicine quantities
    for (const item of bill.items) {
      const medicine = await Medicine.findByPk(item.medicineId, { transaction });
      if (medicine) {
        await medicine.update({
          quantity: medicine.quantity + item.quantity
        }, { transaction });
      }
    }

    // Delete bill items and bill
    await BillItem.destroy({ where: { billId: id }, transaction });
    await bill.destroy({ transaction });

    await transaction.commit();
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Delete bill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
