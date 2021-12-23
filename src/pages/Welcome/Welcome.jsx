import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../../socket';
import {locateMainScreen} from '../../store/action/locationActions';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';

function Welcome() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const enterChat = useCallback(() => {
        socket.emit("enterChat", inputRef.current.value);
        dispatch(locateMainScreen())
    }, [inputRef, dispatch])

    return (
        <div>
            <h3>Enter a nickname</h3>

            <TextInput ref={inputRef} />
            <Button text="Enter Chat" onClick={enterChat} />
        </div>
    );
}

export default Welcome;
