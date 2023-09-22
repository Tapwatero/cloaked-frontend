import { useState } from "react";
import { PersonFillAdd } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import axios from "axios";


export function MessagePardonButton(props) {

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

        axios.post("https://cloaked.onrender.com/pardon", data).then(r => {
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
        <PersonFillAdd onClick={handleClick} title={"Pardon User"}
                        className={`${clicked ? "hover:fill-green-200" : "hover:fill-green-300"} "w-6 h-6 group-hover:opacity-100 duration-500 delay-250 opacity-0 hover:w-7 hover:h-7`}></PersonFillAdd>
    );
}

