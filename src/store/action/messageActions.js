import { v4 as uuidv4 } from 'uuid';
import { SEND_MESSAGE } from './actionTypes';

export function sendMessage(senderId, receiverId, content) {
    return {
        type: SEND_MESSAGE,
        payload: {
            id: uuidv4(),
            senderId,
            receiverId,
            content,
        },
    };
}
