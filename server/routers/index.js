'use strict'
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')
const { errorHandler } = require('../middlewares/errorHandler')
const AuthController = require('../controllers/authController.js')
const ChatController = require('../controllers/chatController.js')


router.post("/login", AuthController.handleLogin)
router.post("/google-login", AuthController.googleOauth)

router.get('/chat-history/:user',ChatController.readChat)
router.use(authentication)

router.use(errorHandler)

module.exports = router