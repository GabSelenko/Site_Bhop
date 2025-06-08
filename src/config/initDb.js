require('dotenv').config();
const mysql = require('mysql2/promise');

async function initializeDatabase() {
    let connection;
    try {
        // Criar conexão inicial (sem selecionar banco de dados)        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'gabriel'
        });

        console.log('Connected to MySQL server');

        // Ler o arquivo SQL
        const sqlPath = path.join(__dirname, 'config', 'database.sql');
        const sqlContent = await fs.readFile(sqlPath, 'utf8');

        // Dividir e executar cada comando SQL
        const sqlCommands = sqlContent.split(';').filter(cmd => cmd.trim());
        
        for (const sql of sqlCommands) {
            if (sql.trim()) {
                await connection.query(sql);
                console.log('Executed SQL command:', sql.slice(0, 50) + '...');
            }
        }

        console.log('Database initialized successfully!');

    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Executar a inicialização
initializeDatabase().catch(console.error);
