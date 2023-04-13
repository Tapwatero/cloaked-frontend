import { useState } from "react";


export function MessageInput( {username, sessionID: sessionID, socket, room } ) {

    const [userMessage, setUserMessage] = useState('');

    const handleInputChange = event => {
        setUserMessage(event.target.value)
    }

    const sendMessage = () => {
        const payload = {
            username: username,
            message: userMessage,
            sessionID: sessionID,
            room: room
        }

        if (userMessage.length === 0) {
            return;
        }

        setUserMessage('');
        document.getElementById('message-input').value = ''
        socket.emit('client-message', payload);
    }


    return (
        <input id={'message-input'}
               className={'break-words  mt-4 p-2 truncate ...  w-full  rounded-full text-white text-center border-0 outline-0 text-2xl bg-gray-700'}
               placeholder={'Hey! Whats going on?'}
               onKeyUp={(event) => event.key === 'Enter' && sendMessage()}
               autoComplete={"false"}
               onChange={handleInputChange}></input>
    )
}
