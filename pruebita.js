const { Pool } = require('pg');

const pool = new Pool({
    user:'default',
    host:'ep-dry-tooth-23959130.us-east-1.postgres.vercel-storage.com', 
    database:'verceldb',
    password:'JdsM4QUkf7et',
    port:5432,
    ssl:{rejectUnauthorized: false}
});

//asd
const listUsersQuery = `CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    nameProduct VARCHAR(50),
    price FLOAT,
    quantity INT
);`;

pool.query(listUsersQuery)
    .then(res => {
        console.log("Tabla creada");
        pool.end();
    })
    .catch(err => {
        console.error(err);
        pool.end();
    });