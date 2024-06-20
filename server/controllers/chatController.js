'use strict'
const Message = require('../models/firebase/Messages')
const Room = require('../models/firebase/Rooms')
const { User, Case, sequelize } = require('../models')
const { Sequelize } = require('sequelize')

module.exports = (() => {
    class ChatController {

        static async newCase(req, res, next) {
            try {
                const userId = req.loginInfo.id

                const data = await Case.create({
                    userId
                })

                res.status(201).json({
                    message: 'Success Create New Room',
                    data
                })

            } catch (err) {
                next(err)
            }
        }

        static async readCases(req, res, next) {
            try {
                const userId = req.loginInfo.id

                const user = await User.findByPk(Number(userId))
                if (!user) throw { name: 'NotFound' }

                const data = await Case.findAll({
                    where: {
                        userId,
                        status: true
                    },
                    attributes: [
                        [Sequelize.literal('id'), 'roomId'],
                        [sequelize.fn('to_char', sequelize.col('createdAt'), 'YYYY-MM-dd'), 'createdAt']
                    ]
                })

                res.status(200).json({
                    message: 'Success Read All Rooms',
                    data
                })

            } catch (err) {
                next(err)
            }
        }

        static async readChat(req, res, next) {
            try {
                const { roomId } = req.params

                const messages = await Message.read({ roomId })

                if (!messages) throw { name: 'NotFound' }

                res.status(200).json(messages);

            } catch (err) {
                next(err)
            }
        }

        static async postChat(req, res, next) {
            try {
                const data = await Room.readAll()
                // await Room.create({username: 'alexTest', topic: 'paling baru'})

                res.status(200).json(data)

            } catch (err) {
                next(err)
            }
        }
    }

    return ChatController
})()