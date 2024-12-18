const express = require('express')
const router = express.Router()
const {
    trimJobinformation,
    behaviouralquestion,
    behaveQfeedback,
    techcodequestion,
    techcodequestionfeedback
} = require('../controllers/OpenAI_controllers')



router.patch('/trimjobinfo', trimJobinformation)
router.post('/behaviouralquestion', behaviouralquestion)
router.post('/behaveQfeedback', behaveQfeedback)
router.post('/techcodequestion', techcodequestion)
router.post('/techcodequestionfeedback', techcodequestionfeedback)

module.exports = router