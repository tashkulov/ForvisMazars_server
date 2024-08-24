const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/', scheduleController.getSchedule);
router.post('/', scheduleController.createBlock);
router.put('/:id', scheduleController.updateBlock);
router.delete('/:id', scheduleController.deleteBlock);

module.exports = router;
