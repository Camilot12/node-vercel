const express=require('express');
const app=express();
const port=process.env.PORT;
app.use(express.json());
app.listen(port,() => console.log('the app is running'));

const { Pool } = require('pg');

const pool = new Pool({
    user:'default',
    host:'ep-dry-tooth-23959130.us-east-1.postgres.vercel-storage.com', 
    database:'verceldb',
    password:'JdsM4QUkf7et',
    port:5432,
    ssl:{rejectUnauthorized: false}
});

const API_KEY = process.env.PORT;

const apiKeyValidation = (req, res, next) => {
    const userApiKey = req.get('USER_API_KEY');
    if(userApiKey && userApiKey === API_KEY) {
        next();
    }
    else {
        res.status(401).send('Invalid API Key')
    }
}

app.use(apiKeyValidation);

app.get('/products', (req,res) => {
    res.status(200).send('Hola mundo')
});

app.post('/products', (req,res) => {
    const nameProduct=req.body.name;
    const price=req.body.price;
    const quantity=req.body.quantity;
    
    const inserProducts = `
    INSERT INTO products (id, nameProduct, price, quantity) VALUES  
    ('${nameProduct}', '${price}', '${quantity}');       
`;

    pool.query(inserProducts)
        .then(data => {
            return res.status(201).send('El producto se ha resgistrado correctamente');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Hubo un rerror registrando el producto')
        })
    
        
});

