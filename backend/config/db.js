const pg =require('pg');
const {Pool}=pg;

const pool =new Pool({
    user:'postgres',
    host:'localhost',
    database:'notes_app',
    password:'12345',
    port:'5433',
});

module.exports=pool;
