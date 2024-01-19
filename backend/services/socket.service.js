const logger = require('./logger.service')
const chatService = require('./chat.service')
const notificationsService = require('../api/notification/notification.service')
let gIo = null

function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*'
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)
        socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        socket.on('set-chat-topic', async userId => {
            if (socket.userId === userId) return
            if (socket.userId) {
                socket.leave(socket.userId)
                logger.info(`Socket is leaving topic ${socket.userId} [id: ${socket.id}]`)
            }
            socket.join(userId)
            socket.userId = userId
            try {
                const chatHistory = await chatService.getChatById(userId)
                socket.emit('get-chat-history', chatHistory.reverse())

            } catch (error) {
                console.log(error);
            }

        })

        socket.on('chat-new-msg', msg => {
            logger.info(`New chat msg from socket [id: ${socket.id}], emitting to topic ${socket.userId}`)

            chatService.addMsgToChat(msg, socket.userId)
            gIo.to(socket.userId).emit('chat-add-msg', msg)
            // gIo.to()
        })

        socket.on('chat-user-typing', user => {
            logger.info(`User is typing from socket [id: ${socket.id}], emitting to topic ${socket.userId}`)
            socket.broadcast.to(socket.userId).emit('chat-add-typing', user)
            // broadcast({ type: 'chat typing', data: user, room: socket.userId, userId: socket.userId })
        })

        socket.on('chat-stop-typing', user => {
            logger.info(`User has stopped typing from socket [id: ${socket.id}], emitting to topic ${socket.userId}`)
            socket.broadcast.to(socket.userId).emit('chat-remove-typing', user)
            // broadcast({ type: 'chat stop-typing', data: user, room: socket.userId, userId: socket.userId })
        })

        socket.on('set-user-socket', userId => {
            logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
            socket.userId = userId
        })

        socket.on('unset-user-socket', () => {
            logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
            delete socket.userId
        })

    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label.toString()).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    userId = userId.toString()
    const socket = await _getUserSocket(userId)
    if (socket) {
        logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`)
        socket.emit(type, data)
    } else {
        logger.info(`No active socket for user: ${userId}`)
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets()
    const socket = sockets.find(s => s.userId === userId)
    return socket
}

async function _getAllSockets() {
    // return all Socket instances
    const sockets = await gIo.fetchSockets()
    return sockets
}
module.exports = {
    // set up the sockets service and define the API
    setupSocketAPI,
    // emit to everyone / everyone in a specific room (label)
    emitTo,
    // emit to a specific user (if currently active in system)
    emitToUser
}