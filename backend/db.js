const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error("Erro: A variável de ambiente DATABASE_URL não está configurada.");
  process.exit(1);
}

// Fazer o parse da URL de conexão do MySQL/MariaDB
const dbUrl = process.env.DATABASE_URL;
let prisma;

try {
  const parsedUrl = new URL(dbUrl);
  const adapter = new PrismaMariaDb({
    host: parsedUrl.hostname || 'localhost',
    port: parseInt(parsedUrl.port || '3306'),
    user: parsedUrl.username,
    password: decodeURIComponent(parsedUrl.password || ''),
    database: parsedUrl.pathname.substring(1), // Remove a barra '/' inicial
    connectionLimit: 10
  });

  prisma = new PrismaClient({ adapter });
} catch (error) {
  console.error("Erro ao configurar o Prisma com a URL do banco:", error.message);
  process.exit(1);
}

module.exports = prisma;
