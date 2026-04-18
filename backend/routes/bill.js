const express = require('express');
const {
  getBills,
  createBill,
  getBill,
  deleteBill
} = require('../controllers/billController');

const router = express.Router();

router.get('/', getBills);
router.post('/', createBill);
router.get('/:id', getBill);
router.delete('/:id', deleteBill);

module.exports = router;