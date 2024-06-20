'use strictt'
const admin = require('firebase-admin')
const db = require('../../config/firebaseConfig')

module.exports = (() => {
    class Room {
        static async create({ username, topic }) {
            try {
                const docRef = await db.collection('Rooms').add({
                    username,
                    topic,
                    lastMsg: null,
                    flag: 'green',
                    status: 'open',
                    time: admin.firestore.FieldValue.serverTimestamp(),
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

                rooms.sort((a, b) => b.time.toDate() - a.time.toDate());
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

                rooms.sort((a, b) => b.time.toDate() - a.time.toDate());
                return rooms;

            } catch (err) {
                console.log(err)
                throw err
            }
        }

        static async update({ roomId, lastMsg }) {
            try {
                const roomRef = db.collection('Rooms').doc(roomId)
                const data = {
                    lastMsg,
                    time: admin.firestore.FieldValue.serverTimestamp(),
                }

                await roomRef.update(data)
                return { roomId, ...data }

            } catch (err) {
                console.log(`ERROR NYA DISINI ANJING <<<<<<<<<<<<<<<<<<<<<<<`);
                console.log(err)
                throw err
            }
        }

        static async updateAutoreply({ roomId, changeTo }) {
            try {
                const roomRef = db.collection('Rooms').doc(roomId);
                const data = {
                    autoreply: changeTo,
                }
                
                await roomRef.update(data)
                return { roomId, ...data }

            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }

    return Room
})()
