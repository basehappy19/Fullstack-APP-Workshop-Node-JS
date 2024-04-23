const express = require('express')
const { readdirSync } = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')
const { swaggerUi, swaggerSpec } = require('./Config/swaggerConfig')
const connectDB = require('./Config/db')


const app = express();

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit:'10mb'}))

// Route 1 

// app.get('/product', (req, res) => {
//     res.send(
//         'Hello EndPoint'
//     )
// })


// Route 2

// app.use('/api', (productRouter))
// app.use('/api', (authRouter))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Route 3

readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/'+r)))



app.listen(5000,() => console.log('Server Is Runing On Port 5000'))