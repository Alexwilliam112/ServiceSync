'use strict'
const { Order } = require('../models')
const Room = require('../models/firebase/Rooms')

module.exports = (() => {
    class Action {

        static rejectMessage() {
            return 'Reject template'
        }

        static async priorityFlag() {
            try {

                
            } catch (err) {
                return `Err`
            }
        }

        static async queryOrder() {
            try {
                
                
            } catch (err) {
                return `Err`
            }
        }
    }

    return Action
})()