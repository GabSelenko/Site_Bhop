require('dotenv').config();
const mysql = require('mysql2/promise');

async function initTabelas() {
    let connection;
    try {
        // Conectar ao MySQL com o banco de dados específico
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        // Criar tabelas
        await connection.query(`
            CREATE TABLE IF NOT EXISTS records (
                id INT AUTO_INCREMENT PRIMARY KEY,
                map_name VARCHAR(255) NOT NULL,
                player_name VARCHAR(255) NOT NULL,
                time DECIMAL(10,3) NOT NULL,
                date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_map_time (map_name, time)
            );

            CREATE TABLE IF NOT EXISTS players (
                id INT AUTO_INCREMENT PRIMARY KEY,
                steam_id VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(255) NOT NULL,
                total_completions INT DEFAULT 0,
                total_records INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login DATETIME
            );

            CREATE TABLE IF NOT EXISTS maps (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                difficulty VARCHAR(50),
                completion_count INT DEFAULT 0,
                average_time DECIMAL(10,3),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Tabelas criadas com sucesso!');

        // Inserir dados de exemplo
        await connection.query(`
            INSERT IGNORE INTO maps (name, difficulty) VALUES 
            ('bhop_eazy', 'Fácil'),
            ('bhop_arcade', 'Médio'),
            ('bhop_master', 'Difícil');
        `);

        console.log('Dados de exemplo inseridos!');
        
    } catch (error) {
        console.error('Erro durante a inicialização:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

initTabelas()
    .then(() => {
        console.log('Tabelas inicializadas com sucesso!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Falha na inicialização das tabelas:', error);
        process.exit(1);
    });
