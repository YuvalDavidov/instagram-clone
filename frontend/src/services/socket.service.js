import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EMIT_NEW_MSG = 'chat-new-msg'
export const SOCKET_EMIT_SEND_MSG = 'chat-add-msg';
export const SOCKET_EMIT_TOPIC = 'set-chat-topic';
export const SOCKET_EMIT_TYPING = 'chat-user-typing';
export const SOCKET_EMIT_STOP_TYPING = 'chat-stop-typing';
export const SOCKET_EMIT_USER_WATCH = 'user-watch';

export const SOCKET_EVENT_TYPING = 'chat-add-typing';
export const SOCKET_EVENT_STOP_TYPING = 'chat-remove-typing';
export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg';
export const SOCKET_EVENT_USER_UPDATED = 'user-updated';
export const SOCKET_EVENT_COMMENT_ADDED_TO_YOU = 'comment-added-to-you';
export const SOCKET_EVENT_LIKE_ADDED_TO_YOU = 'like-added-to-you';

const SOCKET_EMIT_LOGIN = 'set-user-socket';
const SOCKET_EMIT_LOGOUT = 'unset-user-socket';


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
    let socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
            setTimeout(() => {
                const user = userService.getLoggedinUser()
                if (user) this.login(user._id)
            }, 500)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        terminate() {
            socket = null
        },
    }
    return socketService
}