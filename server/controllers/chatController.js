'use strict'
const MessageModel = require('../models/firebase/messageClass')

module.exports = (() => {
    class ChatController {

        static async readChat(req, res, next) {
            try {
                const { roomId } = req.params

                const messages = await MessageModel.read({ roomId })

                if (!messages) {
                    res.status(404).send('empty');
                    return;
                }

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