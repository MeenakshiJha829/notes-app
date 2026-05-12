
const {Pool}=require('pg');


console.log("DATABASE_URL =", process.env.DATABASE_URL);

const pool=new Pool({
        connectionString: process.env.DATABASE_URL || 'postgresql://postgres:12345@localhost:5433/notes_app',
        ssl:  { rejectUnauthorized: false }
            
    });



module.exports = pool;

