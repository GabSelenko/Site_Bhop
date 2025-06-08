require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        console.log('Conexão bem sucedida!');
        
        // Criar o banco de dados
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`Banco de dados ${process.env.DB_NAME} criado/verificado`);
        
        await connection.end();
    } catch (error) {
        console.error('Erro ao conectar:', error);
    }
}

testConnection();
