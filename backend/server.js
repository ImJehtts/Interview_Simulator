const express = require('express')
require('dotenv').config()
const cors = require('cors')
const OpenAi_routes = require('./routes/OpenAI_routes')


const app = express()


app.use(express.json())
app.use(cors({origin: process.env.FRONT_END_PORT,  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']}))
app.use((req, res, next) => {
    next()
})

app.use('/OpenAi_routes', OpenAi_routes)

module.exports = app