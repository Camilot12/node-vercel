const express=require('express');
const app=express();
const port= process.env.PORT;
app.use(express.json());
const { Pool } = require('pg');
require('dotenv').config();
const apiKey = process.env.API_KEY;
app.listen(port,() => console.log('The app is running, Arrow Function')); //Arrow Function


const pool = new Pool({
    user: 'default',
    host: 'ep-dry-tooth-23959130.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'JdsM4QUkf7et',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});




//MIDDELWARE
const apiKeyValidation = (req, res, next) => {
    const userApiValdation = req.get('x-variable-api');
    if(userApiValdation && userApiValdation === apiKey) {
        res.send('successful');
        next();
    }
    else {
        res.status(401).send('Invalid API Key')
    }
};


app.get('/students', (req,res) => {

    const listUsersQuery = `SELECT * FROM students;`;

    pool.query(listUsersQuery)
        .then(data => {
          console.log("List students: ", data.rows);
          res.send(data.rows);
          
        })
        .catch(err => {
            console.error(err);
            
    });
});


app.get('/students1/:id', (req,res) => {
    const index = req.params.id;
    const listUsersQuery = `SELECT * FROM students where id=${index};`;
    pool.query(listUsersQuery)
        .then(data => {
          console.log("List students: ", data.rows);
            res.send(data.rows);
          
        })
        .catch(err => {
            console.error(err);
            
    });
});

app.get('/students2/:name', (req,res) => {
    const name = req.params.name
    const listUsersQuery = `SELECT * FROM students WHERE name = '${name}';`
    pool.query(listUsersQuery)
        .then(data => {
            return res.send(data.rows);
      
        })
        .catch(err => {
            console.error(err);
          
        })
});

app.get('/students3/:lastname', (req,res) => {
    const lastname = req.params.lastname
    const listUsersQuery = `SELECT * FROM students WHERE lastname = '${lastname}';`
    pool.query(listUsersQuery)
        .then(data => {
            return res.send(data.rows);
      
        })
        .catch(err => {
            console.error(err);
          
        })
});

app.post('/students', (req,res) => {
    const insertUsersQuery = `
    INSERT INTO students (id, name, lastname, notes) VALUES  
    (${req.body.id}, '${req.body.name}', '${req.body.lastname}', '${req.body.notes}'); 
`;

    pool.query(insertUsersQuery )
        .then(data => {
            return res.send('insertado');
        })
        .catch(err => {
            console.error(err);
        })
});

app.put('/students/:id', (req,res) => {
    const editUsersQuery = 
    `UPDATE students SET id = ${req.body.id}, name = '${req.body.name}', lastname = '${req.body.lastname}', notes = '${req.body.notes}'
      WHERE id = ${req.params.id}`
    console.log(editUsersQuery);
    pool.query(editUsersQuery)
        .then(data => {
            return res.send('editado');
        })
        .catch(err => {
            console.error(err);
        })
});

app.delete('/students/:id', (req,res) => {
    const deleteUserByID = `DELETE FROM students WHERE id = ${req.params.id};`
    pool.query(deleteUserByID)
        .then(data => {
            return res.send('eliminado como tu ex')
        })
        .catch(err =>{
            console.error(err);
        })
});




