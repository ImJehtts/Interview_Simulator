const express = require('express')
const router = express.Router()
const {
    trimJobinformation,
    behaviouralquestion,
    behaveQfeedback
} = require('../controllers/OpenAI_controllers')



router.patch('/trimjobinfo', trimJobinformation)
router.post('/behaviouralquestion', behaviouralquestion)
router.post('/behaveQfeedback', behaveQfeedback)

module.exports = router