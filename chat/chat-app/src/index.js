const path = require('path')
const chalk = require('chalk');
const L = require('../../../tools/logger')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const {
    addUser,
    removeUser,
    getUsersInRoom,
    getUser
} = require('./utils/users')
const {generateMessage, generateLocationMessage} = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    // console.log('New WebSocket connection')

    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUser({
            id: socket.id,
            username: username,
            room: room,
        })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))

        callback()
        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()
        L.data(message)

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        L.data(message)

        io.to(user.room).emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage(user.username + ' has left!'))
        }

    })
})

server.listen(port, () => {
    L.log(`Server is up on port ${port}!`)
})