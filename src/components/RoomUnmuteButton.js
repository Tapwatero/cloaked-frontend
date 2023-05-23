import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { VolumeUp } from "react-bootstrap-icons";



export function RoomUnmuteButton(props) {

    const [clicked, setClicked] = useState();

    const handleClick = () => {
        if (clicked) {
            return;
        }

        const data = {
            sessionID: props.sessionID,
            code: props.code
        }

        axios.post(`https://dekaolc.onrender.com/unmute-room`, data).then(r => {
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
            <VolumeUp onClick={handleClick}
                     className={"hover:animate-pulse fill-white cursor-pointer w-6 h-6 duration-500 delay-250"}></VolumeUp>
        </div>
    );
}

