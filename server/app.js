'use strict'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const http = require('http')
const initializeSocket = require('./middleware/socket')
const router = require('./routers/index')

const app = express()
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
initializeSocket(server)

module.exports = app