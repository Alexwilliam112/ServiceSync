'use strict'
const { User, Case } = require('../models')

module.exports = (() => {
    class UserController {

        static async handleRegister(req, res, next) {
            try {
                

            } catch (err) {
                next(err)
            }
        }

        static async handleLogin(req, res, next) {
            try {
                
                
            } catch (err) {
                next(err)
            }
        }
    }

    return UserController
})()