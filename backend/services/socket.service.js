const logger = require('./logger.service')
const chatService = require('./chat.service')
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
            console.log('userId---', userId);
            if (socket.userId === userId) return
            if (socket.userId) {
                console.log('sd', userId);
                socket.leave(socket.userId)
                logger.info(`Socket is leaving topic ${socket.userId} [id: ${socket.id}]`)
            }
            socket.join(userId)
            socket.userId = userId
            try {
                const chatHistory = await chatService.getChatById(userId)
                socket.emit('get-chat-history', chatHistory)

            } catch (error) {
                console.log(error);
            }

        })

        socket.on('chat-new-msg', msg => {
            logger.info(`New chat msg from socket [id: ${socket.id}], emitting to topic ${socket.userId}`)

            chatService.addMsgToChat(msg, socket.userId)
            // console.log("socket.id---->", socket.id)
            // console.log("socket.userId---->", socket.userId)
            // console.log("msg---->", msg)
            gIo.to(socket.userId).emit('chat-add-msg', msg)
        })

        socket.on('chat-user-typing', user => {
            logger.info(`User is typing from socket [id: ${socket.id}], emitting to topic ${socket.userId}`)
            socket.broadcast.to(socket.userId).emit('chat-add-typing', user)
            console.log('user', user);
            // broadcast({ type: 'chat typing', data: user, room: socket.userId, userId: socket.userId })
        })

        socket.on('chat-stop-typing', user => {
            logger.info(`User has stopped typing from socket [id: ${socket.id}], emitting to topic ${socket.userId}`)
            socket.broadcast.to(socket.userId).emit('chat-remove-typing', user)
            // broadcast({ type: 'chat stop-typing', data: user, room: socket.userId, userId: socket.userId })
        })
    })
}

module.exports = {
    setupSocketAPI
}