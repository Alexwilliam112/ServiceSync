'use strictt'
const admin = require('firebase-admin')
const db = require('../../config/firebaseConfig')

module.exports = (() => {
    class MessageModel {
        static async create({ username, message, roomId }) {
            return await db.collection('Messages').add({
                username,
                message,
                roomId,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
        }

        static async read({ roomId }) {
            const messagesRef = db.collection('Messages');
            const snapshot = await messagesRef
                .where('roomId', '==', Number(roomId))
                .get();

            if (snapshot.empty) {
                return null;
            }

            const messages = [];
            snapshot.forEach(doc => {
                messages.push(doc.data());
            });

            return messages;
        }
    }

    return MessageModel
})()
