const express = require('express')
require('dotenv').config()
const cors = require('cors')
const OpenAi_routes = require('./routes/OpenAi_routes')


const app = express()


app.use(express.json())
app.use(cors({origin: process.env.FRONT_END_PORT,  methods: ['GET', 'POST'], credentials: true}))
app.use((req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/OpenAi_routes', OpenAi_routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running `)
})