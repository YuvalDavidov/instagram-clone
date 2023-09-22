import { httpService } from './http.service';

const NOTIFIC_URL = 'notifications/'

export const notificationsService = {
    getUserNotifications,
    getUserUnsawNotifications
}

async function getUserNotifications() {
    try {
        const notifictions = await httpService.get(NOTIFIC_URL)
        return notifictions
    } catch (error) {
        new Error('service - coudl\'nt get user notifictions', error)
    }
}

async function getUserUnsawNotifications() {
    try {
        const unsawNotifictions = await httpService.get(NOTIFIC_URL + 'unsaw')
        return unsawNotifictions
    } catch (error) {
        new Error('service - coudl\'nt get user unsaw notifictions', error)
    }
}