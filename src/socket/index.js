import { io } from 'socket.io-client';

let instance;

function initSocket() {
    if (!instance) {
        instance = io('http://localhost:3002');
    }

    return instance;
}

export default initSocket;
