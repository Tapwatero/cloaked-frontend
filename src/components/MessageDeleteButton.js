import { useState } from 'react'
import { TrashFill } from "react-bootstrap-icons";

export function MessageDeleteButton(props) {
    const [clicked, setClicked] = useState()
    const socket = props["socket"];

    const handleClick = () => {
        if (clicked) {
            return;
        }


        const data = {
            sessionID: props.sessionID,
            messageID: props.messageID
        }

        socket.emit('client-delete-message', data);

        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 75) // Reset the state value to false after 3 seconds
    }

    return (
        <TrashFill onClick={handleClick} title={'Delete Message'}
                     className={`${clicked ? 'hover:fill-red-200' : 'hover:fill-red-400'} w-6 h-6 group-hover:opacity-100 duration-500 delay-250 opacity-0 hover:w-7 hover:h-7`}></TrashFill>
    )
}
