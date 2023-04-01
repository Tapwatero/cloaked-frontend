import { useState } from 'react'
import { PersonFillX } from 'react-bootstrap-icons'
import { Action } from "../Main";
import toast from "react-hot-toast";

export function MessageKickButton(props) {
    const [clicked, setClicked] = useState()
    const socket = props.socket;

    const handleClick = () => {
        if (clicked) {
            return
        }

        const payload = {
            Action: Action.KICK,
            SID: props.SID,
            MID: props.MID
        }

        socket.send(JSON.stringify(payload));
        toast.success("User Kick Executed!");



        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 350) // Reset the state value to false after 3 seconds
    }

    return (
        <PersonFillX onClick={handleClick} title={'Kick User'}
                     className={`${clicked ? 'hover:fill-red-200' : 'hover:fill-red-400'} w-6 h-6 group-hover:opacity-100 duration-500 delay-250 opacity-0 hover:w-7 hover:h-7`}></PersonFillX>
    )
}
