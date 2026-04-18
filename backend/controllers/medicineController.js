const Joi = require('joi');
const { Medicine } = require('../models');

const medicineSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required()
});

exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(medicines);
  } catch (error) {
    console.error('Get medicines error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMedicine = async (req, res) => {
  try {
    const { error } = medicineSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const medicine = await Medicine.create(req.body);
    res.status(201).json({
      message: 'Medicine added successfully',
      medicine
    });
  } catch (error) {
    console.error('Add medicine error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Medicine with this name already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = medicineSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const medicine = await Medicine.findByPk(id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

    await medicine.update(req.body);
    res.json({
      message: 'Medicine updated successfully',
      medicine
    });
  } catch (error) {
    console.error('Update medicine error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findByPk(id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

    await medicine.destroy();
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Delete medicine error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};