const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Test the connection
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL connected successfully!');
    client.release(); // release the client back to the pool
  })
  .catch(err => {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
  });

module.exports = {
  query: (text, params) => pool.query(text, params)
};
