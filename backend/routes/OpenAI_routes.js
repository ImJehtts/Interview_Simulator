const express = require('express')
const router = express.Router()
const {
    trimJobinformation
} = require('../controllers/OpenAI_controllers')



router.get('/trimjobinfo', trimJobinformation)

module.exports = router