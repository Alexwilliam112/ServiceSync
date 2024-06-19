'use strict'
const db = require('../config/firebaseConfig')
const admin = require('firebase-admin')

module.exports = (() => {
    class ChatController {
        
        static async storeChat(req, res, next) {
            try {
                const { user, message } = req.body

                await db.collection('messages').add({
                    user,
                    message,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                })

                res.status(201).send('Message added');

            } catch (err) {
                console.log(err);
                next(err)
            }
        }
    }

    return ChatController
})()