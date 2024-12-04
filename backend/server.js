const express = require('express')
require('dotenv').config()
const OpenAi_routes = require('./routes/OpenAI_routes')


const app = express()


app.use(express.json())
app.use((req, res, next) => {
    next()
})

app.use('/OpenAi_routes', OpenAi_routes)


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});