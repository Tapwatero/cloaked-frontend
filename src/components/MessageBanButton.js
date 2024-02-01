import { useState } from "react";
import { PersonFillDash } from "react-bootstrap-icons";
import axios from "axios";
import toast from "react-hot-toast";


export function MessageBanButton(props) {

    const [clicked, setClicked] = useState();




    const handleClick = () => {
        if (clicked) {
            return;
        }


        // Session to authenticate, Session to ban

        const data = {
            sessionID: props.sessionID,
            targetSessionID: props.targetSessionID
        }


        axios.post("https://cloaked-backend.onrender.com/ban", data).then(r => {
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
        <PersonFillDash onClick={handleClick} title={"Ban User"}
                        className={`${clicked ? "hover:fill-red-200" : "hover:fill-rose-500"} "w-6 h-6 group-hover:opacity-100 duration-500 delay-250 opacity-0 hover:w-7 hover:h-7`}></PersonFillDash>
    );
}

