'use strict'
const { compare } = require("bcryptjs")
const { hash } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { OAuth2Client } = require("google-auth-library");

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

            if (!email || !password) throw { name: "AccountNotFound" }
            if (!compare(password, hashedPassword)) throw { name: "AccountNotFound" }

            const token = signToken({
                id: user.id,
                user: user.userName,
                email: user.email
            })

            res.status(200).json({
                access_token: token,
                username: user.userName,
                autoReply: false,
                roomId: 1
            })

        } catch (err) {
            next(err)
        }
    }

    static async googleOauth(req, res, next) {
        try {
            const { token } = req.headers
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            let payload = ticket.getPayload();

            // Find or add user to database
            // const user = await User.findOrCreate({
            //     where: {
            //         email: payload.email
            //     },
            //     defaults: {
            //         userName: payload.email,
            //         email: payload.email,
            //         password: "password_google"
            //     },
            //     hooks: false
            // })

            // const data = await User.findOne({
            //     where: {
            //         email: payload.email
            //     }
            // })
            let userName = payload.email.split("@")[0]
            
            payload = {
                id: 1,
                userName,
                email: payload.email,
            }
            
            const access_token = signToken(payload)


            res.status(200).json({
                access_token,
                username: user.userName,
                autoReply: false,
                roomId: 1
            })
        } catch (err) {
            next(err)
        }
    }
}
module.exports = AuthController