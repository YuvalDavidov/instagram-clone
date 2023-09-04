import { httpService } from './http.service';

const NOTIFIC_URL = 'notifications/'

export const notificationsService = {
    getUserUnsawNotifications
}

async function getUserUnsawNotifications() {
    try {
        const unsawNotifictions = await httpService.get(NOTIFIC_URL + 'unsaw')
        console.log(unsawNotifictions);
        // return unsawNotifictions
    } catch (error) {
        new Error('service - coudl\'nt get user unsaw notifictions', error)
    }
}