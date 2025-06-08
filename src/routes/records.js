const express = require('express');
const router = express.Router();
const RecordController = require('../controllers/RecordController');

// Get all records
router.get('/records', (req, res) => RecordController.getAllRecords(req, res));

// Get record by map
router.get('/records/map/:mapName', (req, res) => RecordController.getMapRecord(req, res));

// Get top players for a map
router.get('/records/map/:mapName/top', (req, res) => RecordController.getTopPlayers(req, res));

// Create new record
router.post('/records', (req, res) => RecordController.createRecord(req, res));

module.exports = router;
