'use strict'
const MessageModel = require('../models/firebase/messageClass')
const { User, Case, sequelize } = require('../models')
const { Sequelize } = require('sequelize')

module.exports = (() => {
    class ChatController {

        static async readCases(req, res, next) {
            try {
                const { userId } = req.params

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
                    data
                })

            } catch (err) {
                next(err)
            }
        }

        static async readChat(req, res, next) {
            try {
                const { roomId } = req.params

                const messages = await MessageModel.read({ roomId })

                if (!messages) throw { name: 'NotFound' }

                res.status(200).json(messages);

            } catch (err) {
                next(err)
            }
        }

        static async postChat(req, res, next) {
            try {
                const { username, message, roomId } = req.body

                await MessageModel.create({ username, message, roomId })

                res.status(200).json('Added Message');

            } catch (err) {
                next(err)
            }
        }
    }

    return ChatController
})()