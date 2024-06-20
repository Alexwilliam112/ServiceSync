'use strictt'
const admin = require('firebase-admin')
const db = require('../../config/firebaseConfig')

module.exports = (() => {
    class Message {
        static async create({ username, message, roomId }) {
            try {
                return await db.collection('Messages').add({
                    username,
                    message,
                    roomId,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                });

            } catch (err) {
                console.log(err)
                throw err
            }
        }

        static async read({ roomId }) {
            try {
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
                return messages

            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }

    return Message
})()
