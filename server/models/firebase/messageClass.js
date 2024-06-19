'use strictt'
const admin = require('firebase-admin')
const db = require('../../config/firebaseConfig')

module.exports = (() => {
    class MessageModel {
        static async create({ userFrom, userTo, message }) {
            return await db.collection('Messages').add({
                userFrom,
                userTo,
                message,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
        }

        static async read({ userFrom, userTo }) {
            const messagesRef = db.collection('Messages');
            const snapshot = await messagesRef
                .where('userFrom', '==', userFrom)
                .where('userTo', '==', userTo)
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
