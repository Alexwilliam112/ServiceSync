'use strict'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const { createServer } = require('http')
const bodyParser = require('body-parser')
const initializeSocket = require('./services/socket')
const router = require('./routers/index')
const cors = require('cors')

const app = express()
const httpServer = createServer(app)

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())

app.use(router)
console.log(`MAsuk app`);
initializeSocket(httpServer)

module.exports = httpServer
