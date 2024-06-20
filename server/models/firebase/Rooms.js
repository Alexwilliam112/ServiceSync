'use strictt'
const admin = require('firebase-admin')
const db = require('../../config/firebaseConfig')

module.exports = (() => {
    class Room {
        static async create({ username }) {
            try {
                const docRef = await db.collection('Rooms').add({
                    username,
                    lastMsg: null,
                    flag: 'green',
                    status: 'open',
                    autoreply: true
                });
                return docRef.id

            } catch (err) {
                console.log(err)
                throw err
            }
        }

        static async read({ username }) {
            try {
                const snapshot = await db.collection('Rooms')
                    .where('status', '==', 'open')
                    .where('username', '==', username)
                    .get();
                    
                const rooms = [];
                snapshot.forEach(doc => {
                    rooms.push({ roomId: doc.id, ...doc.data() });
                });
                return rooms;

            } catch (err) {
                console.log(err)
                throw err
            }
        }

        static async readAll() {
            try {
                const snapshot = await db.collection('Rooms')
                    .where('status', '==', 'open')
                    .get();

                const rooms = [];
                snapshot.forEach(doc => {
                    rooms.push({ roomId: doc.id, ...doc.data() });
                });
                return rooms

            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }

    return Room
})()
