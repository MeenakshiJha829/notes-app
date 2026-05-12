
const {Pool}=require('pg');


// console.log("DATABASE_URL =", process.env.DATABASE_URL);

// const pool=new Pool({
//         connectionString: process.env.DATABASE_URL,
//         ssl:  { rejectUnauthorized: false }
            
//     });



// module.exports = pool;

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'notes_app',
   password: '12345',
   port: 5433,
});

module.exports = pool;