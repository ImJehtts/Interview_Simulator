const express = require('express')
const router = express.Router()
const {
    trimJobinformation,
    behavioural1question,
    behaveQ1feedback
} = require('../controllers/OpenAI_controllers')



router.patch('/trimjobinfo', trimJobinformation)
router.post('/behavioural1question', behavioural1question)
router.post('/behaveQ1feedback', behaveQ1feedback)

module.exports = router