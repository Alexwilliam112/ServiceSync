'use strict'
const { compare } = require("bcryptjs")
const { hash } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

class AuthController {

    static async handleLogin(req, res, next) {
        try {
            const user = {
                userName: "Carolus",
                email: "carolus@gmail.com",
                password: "carolus"
            }
            // console.log(typeof user.password);
            let hashedPassword = hash(user.password)

            const { email, password } = req.body
            console.log(!email,"  ",!password);
            if (!email || !password) throw { name: "AccountNotFound" }
            if (!compare(password, hashedPassword)) throw { name: "AccountNotFound" }

            const token = signToken({
                id: user.id,
                user: user.userName,
                email: user.email
            })

            res.status(200).json({
                token,
                username: user.userName,
                autoReply: false,
                roomId: 1
            })
            console.log(`<<<<<<<<<<<<<<<<< ok`);

        } catch (err) {
            next(err)
        }
    }

    static async handleRegister(req, res, next) {
        try {


        } catch (err) {
            next(err)
        }
    }
}
module.exports = AuthController