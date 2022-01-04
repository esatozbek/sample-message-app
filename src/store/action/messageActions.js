import { v4 as uuidv4 } from 'uuid';
import { SEND_MESSAGE } from './actionTypes';

export function sendMessage(conversation, sender, receiver, content, type) {
    return {
        type: SEND_MESSAGE,
        payload: {
            id: uuidv4(),
            conversation,
            sender,
            receiver,
            content,
            type: type ? type : 'MESSAGE',
        },
    };
}
