const Record = require('../models/Record');

class RecordController {
    // Get all records
    static async getAllRecords(req, res) {
        try {
            const records = await Record.getAll();
            res.json(records);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching records' });
        }
    }

    // Get record by map
    static async getMapRecord(req, res) {
        try {
            const { mapName } = req.params;
            const record = await Record.getByMap(mapName);
            if (!record) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.json(record);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching record' });
        }
    }

    // Create new record
    static async createRecord(req, res) {
        try {
            const { map_name, player_name, time } = req.body;
            
            // Validate input
            if (!map_name || !player_name || !time) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Check if it's a new record
            const currentRecord = await Record.getByMap(map_name);
            if (currentRecord && currentRecord.time <= time) {
                return res.status(400).json({ 
                    message: 'Not a new record',
                    currentRecord: currentRecord
                });
            }

            const result = await Record.create({ map_name, player_name, time });
            res.status(201).json({ 
                message: 'New record created!',
                recordId: result.insertId 
            });
        } catch (error) {
            res.status(500).json({ error: 'Error creating record' });
        }
    }

    // Get top players for a map
    static async getTopPlayers(req, res) {
        try {
            const { mapName } = req.params;
            const { limit = 10 } = req.query;
            const records = await Record.getTopPlayersByMap(mapName, parseInt(limit));
            res.json(records);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching top players' });
        }
    }
}
