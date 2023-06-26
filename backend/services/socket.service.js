const logger = require('./logger.service')

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

        socket.on('set-chat-topic', userId => {
            if (socket.userId === userId) return
            if (socket.userId) {
                socket.leave(socket.userId)
                logger.info(`Socket is leaving topic ${socket.userId} [id: ${socket.id}]`)
            }
            socket.join(userId)
            socket.userId = userId
        })

        socket.on('chat-new-msg', msg => {
            logger.info(`New chat msg from socket [id: ${socket.id}], emitting to topic ${socket.userId}`)

            // chatService.addMsgToChat(msg)
            console.log("socket.id---->", socket.id)
            console.log("msg---->", msg)
            gIo.to(socket.userId).emit('chat-add-msg', msg)
        })
    })
}

module.exports = {}