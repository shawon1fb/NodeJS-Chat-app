const path = require('path')
const http = require('http')
const L = require('../tools/logger')
const socketIo = require('socket.io')

const express = require('express')

const app = express()

const server = http.createServer(app)
const io = socketIo(server)
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
let count = 0
io.on('connect', (socket) => {

    socket.emit('countUpdated', count)
    socket.broadcast.emit('message', 'new user joined')
    socket.on('increment', (callback) => {
        count++
        io.emit('countUpdated', count)
        callback("incremented")
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', `Location : ${coords.latitude} ${coords.longitude}`)
    })


    socket.on('disconnect', () => {
        io.emit('message', "A user has left")
    })
});
server.listen(port, () => {
    L.data(`server is on port ${port}`)
})