import { useEffect } from 'react';
import initSocket from '../socket/index';

function useServerEvent(eventName, cb, dependencies) {
    const socket = initSocket();

    useEffect(() => {
        socket.on(eventName, cb);

        return () => {
            socket.off(eventName);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}

export default useServerEvent;
