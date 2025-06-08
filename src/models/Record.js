const db = require('../config/db');

class Record {
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM records ORDER BY time ASC');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getByMap(mapName) {
        try {
            const [rows] = await db.query('SELECT * FROM records WHERE map_name = ? ORDER BY time ASC LIMIT 1', [mapName]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(record) {
        try {            const [result] = await db.query(
                'INSERT INTO records (map_name, player_name, time, date) VALUES (?, ?, ?, ?)',
                [record.map_name, record.player_name, record.time, new Date()]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getTopPlayersByMap(mapName, limit = 10) {
        try {            const [rows] = await db.query(
                'SELECT * FROM records WHERE map_name = ? ORDER BY time ASC LIMIT ?',
                [mapName, limit]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}
