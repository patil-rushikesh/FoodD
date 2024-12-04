const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

// Middlewares
app.use(cors());
app.use(express.json());

//mongodb configuration
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-client.98tqmqu.mongodb.net/foodi-db?retryWrites=true&w=majority&appName=foodi-client`)
    .then(
        console.log("MongoDB connected Successfully")
    )
    .catch(
        (error) => console.log("Error Connecting to MongoDB", error)
    );

    // jwt authentication
    app.post('/jwt', async(req, res) =>{
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: `1hr`})
        res.send({token});
    })

    
    

//Import routes
const menuRoutes = require('./api/routes/menuRoutes')
const cartRoutes = require('./api/routes/cartRoutes')
const userRoutes = require('./api/routes/userRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)
//dummy code
app.get('/', (req, res) => res.send('Hello Client server'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))