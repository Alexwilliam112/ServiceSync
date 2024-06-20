'use strict'
const Identifiers = require('../lib/keywords')

module.exports = (() => {
    const generateRegex = (keyword) => {
        return new RegExp(keyword.split('').join('[aeiou]*'), 'i')
    }

    class Filter {
        static isQueryingOrder (message) {
            for (const keyword of Identifiers.QUERIES) {
                const regex = generateRegex(keyword)

                if (regex.test(message)) {
                    return true;
                }
            }
            return false;
        }

        static isAngry (message) {
            for (const keyword of Identifiers.RED_FLAGS) {
                const regex = generateRegex(keyword)

                if (regex.test(message)) {
                    return true;
                }
            }
            return false;
        }
    }

    return MessageFilter
})()