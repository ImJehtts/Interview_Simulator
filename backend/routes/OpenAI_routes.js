const express = require('express')
const router = express.Router()
const {
    trimJobinformation,
    behavioural1question
} = require('../controllers/OpenAI_controllers')



router.patch('/trimjobinfo', trimJobinformation)
router.patch('/behavioural1question', behavioural1question)

module.exports = router