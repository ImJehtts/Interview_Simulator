const express = require('express')
const router = express.Router()
const {
    trimJobinformation
} = require('../controllers/OpenAI_controllers')



router.patch('/trimjobinfo', trimJobinformation)

module.exports = router