import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import initSocket from '../../socket';
import { locateMainScreen } from '../../store/action/locationActions';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { setNickname } from '../../store/action/meActions';
import { setFriends } from '../../store/action/friendActions';

function Welcome() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const enterChat = useCallback(() => {
        const socket = initSocket();
        socket.emit('enterChat', inputRef.current.value, (friendList) => {
            console.log(friendList);
            dispatch(setFriends(friendList));
        });
        dispatch(locateMainScreen());
        dispatch(setNickname(inputRef.current.value));
    }, [dispatch]);

    return (
        <div>
            <h3>Enter a nickname</h3>

            <TextInput ref={inputRef} onEnterPress={enterChat} />
            <Button text="Enter Chat" onClick={enterChat} />
        </div>
    );
}

export default Welcome;
