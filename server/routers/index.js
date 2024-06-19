'use strict'
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')
const { errorHandler } = require('../middlewares/errorHandler')
const AuthController = require('../controllers/authController.js')
const ChatController = require('../controllers/chatController.js')

router.post('/chat-test', ChatController.storeChat)
router.get('/chat-history/:user',ChatController.readChat)

router.use(authentication)

router.use(errorHandler)

module.exports = router