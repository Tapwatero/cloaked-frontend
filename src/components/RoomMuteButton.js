import { useState } from "react";
import { VolumeMute } from "react-bootstrap-icons";
import axios from "axios";
import toast from "react-hot-toast";



export function RoomMuteButton(props) {

    const [clicked, setClicked] = useState();

    const handleClick = () => {
        if (clicked) {
            return;
        }

        const data = {
            sessionID: props.sessionID,
            code: props.code
        }

        axios.post(`https://cloaked-backend.onrender.com/mute-room`, data).then(r => {
            if (r.data.success) {
                toast.success(r.data.success);
            } else {
                toast.error(r.data.error);
            }
        });

        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 350); // Reset the state value to false after 3 seconds
    };

    return (
        <div className={"flex justify-end"}>
            <VolumeMute onClick={handleClick}
                     className={"hover:animate-pulse fill-white cursor-pointer w-6 h-6 duration-500 delay-250"}></VolumeMute>
        </div>
    );
}

