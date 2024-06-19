'use strict'
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')
const { errorHandler } = require('../middlewares/errorHandler')
const AuthController = require('../controllers/authController.js')

router.post("/login", AuthController.handleLogin)
router.post("/google-login", AuthController.googleOauth)
router.use(authentication)

router.use(errorHandler)

module.exports = router