const express = require('express')
const router = express.Router()
const {
    trimJobinformation,
    makequestion,
    recieveQfeedback,
    techcodequestion,
    techcodequestionfeedback
} = require('../controllers/OpenAI_controllers')

router.post('/trimjobinfo', trimJobinformation)
router.post('/makequestion', makequestion)
router.post('/recieveQfeedback', recieveQfeedback)
router.post('/techcodequestion', techcodequestion)
router.post('/techcodequestionfeedback', techcodequestionfeedback)

module.exports = router