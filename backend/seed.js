const { sequelize, Medicine, Bill, BillItem } = require('./models');

const medicines = [
  { name: 'Panadol', price: 5.0, quantity: 610 },
  { name: 'Paracetamol', price: 3.0, quantity: 500 },
  { name: 'Cough Syrup', price: 120.0, quantity: 80 },
  { name: 'Vitamin C', price: 8.5, quantity: 250 },
  { name: 'Ibuprofen', price: 10.0, quantity: 320 }
];

const bills = [
  {
    patientName: 'Imasha',
    items: [
      { medicineName: 'Paracetamol', quantity: 1 }
    ]
  },
  {
    patientName: 'Nimal',
    items: [
      { medicineName: 'Panadol', quantity: 2 },
      { medicineName: 'Vitamin C', quantity: 1 }
    ]
  }
];

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    let seededMedicineCount = 0;
    for (const medicineData of medicines) {
      const [medicine, created] = await Medicine.findOrCreate({
        where: { name: medicineData.name },
        defaults: medicineData
      });
      if (created) {
        seededMedicineCount += 1;
      }
    }

    if (seededMedicineCount > 0) {
      console.log(`Seeded ${seededMedicineCount} new medicines.`);
    } else {
      const medicineCount = await Medicine.count();
      console.log(`Medicine table already has ${medicineCount} records.`);
    }

    const billCount = await Bill.count();
    if (billCount < bills.length) {
      let createdBills = 0;
      for (const billData of bills) {
        const existingBill = await Bill.findOne({ where: { patientName: billData.patientName } });
        if (existingBill) continue;

        const items = [];
        let totalAmount = 0;

        for (const item of billData.items) {
          const medicine = await Medicine.findOne({ where: { name: item.medicineName } });
          if (!medicine) {
            throw new Error(`Missing seeded medicine: ${item.medicineName}`);
          }

          const price = Number(medicine.price);
          const amount = price * item.quantity;
          totalAmount += amount;

          items.push({
            medicineId: medicine.id,
            quantity: item.quantity,
            price
          });

          await medicine.update({ quantity: medicine.quantity - item.quantity });
        }

        const bill = await Bill.create({
          patientName: billData.patientName,
          totalAmount: totalAmount.toFixed(2),
          createdAt: new Date(),
          updatedAt: new Date()
        });

        for (const item of items) {
          await BillItem.create({
            billId: bill.id,
            medicineId: item.medicineId,
            quantity: item.quantity,
            price: item.price,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }

        createdBills += 1;
      }
      console.log(`Seeded ${createdBills} new bill histories.`);
    } else {
      console.log(`Bill history table already has ${billCount} records.`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
})();
