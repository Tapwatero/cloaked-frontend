import { useState } from 'react'
import toast from "react-hot-toast";
import { PersonFillX } from "react-bootstrap-icons";
import axios from "axios";

export function MessageKickButton(props) {
    const [clicked, setClicked] = useState()

    const handleClick = () => {
        if (clicked) {
            return
        }


        const data = {
            sessionID: props.sessionID,
            targetSessionID: props.targetSessionID
        }




        axios.post("https://dekaolc.onrender.com/kick", data).then(r => {
            if (r.data.success) {
                toast.success(r.data.success);
            } else {
                toast.error(r.data.error);
            }
        });



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
