'use strict'
const MessageModel = require('../models/firebase/messageClass')

module.exports = (() => {
    class ChatController {

        static async readChat(req, res, next) {
            try {
                const userFrom = 'Alex'
                const userTo = 'admin'

                const messages = await MessageModel.read({ userFrom, userTo })

                if (!messages) {
                    res.status(404).send('empty');
                    return;
                }

                res.status(200).json(messages);

            } catch (err) {
                next(err)
            }
        }
    }

    return ChatController
})()