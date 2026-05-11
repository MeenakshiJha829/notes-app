
const {Pool}=require('pg');

function createPool() {
    return new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false
    });
}

module.exports = createPool();