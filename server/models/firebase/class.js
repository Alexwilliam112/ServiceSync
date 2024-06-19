'use strict'
const db = require('../../config/firebaseConfig');

class User {
    constructor(email, password, autoReply, roomId) {
        this.email = email;
        this.password = password;
        this.autoReply = autoReply;
        this.roomId = roomId;
    }

    static async createUser(user) {
        const userRef = db.collection('users').doc();
        await userRef.set(user);
        return userRef.id;
    }

    static async getUserById(userId) {
        const userRef = db.collection('users').doc(userId);
        const doc = await userRef.get();
        if (!doc.exists) {
            throw new Error('User not found');
        }
        return doc.data();
    }
}

module.exports = User;

const db = require('../../config/firebaseConfig');

class ChatHistoryFirebase {
    constructor(userId, chatHistory) {
        this.userId = userId;
        this.chatHistory = chatHistory;
    }

    static async addChatHistory(userId, message, actor, date) {
        const chatHistoryRef = db.collection('users').doc(userId).collection('chatHistory').doc();
        await chatHistoryRef.set({ message, actor, date });
    }

    static async getChatHistoryByUserId(userId) {
        const chatHistoryRef = db.collection('users').doc(userId).collection('chatHistory');
        const snapshot = await chatHistoryRef.get();
        if (snapshot.empty) {
            return [];
        }
        const chatHistory = [];
        snapshot.forEach(doc => {
            chatHistory.push(doc.data());
        });
        return chatHistory;
    }
}

module.exports = ChatHistoryFirebase;
