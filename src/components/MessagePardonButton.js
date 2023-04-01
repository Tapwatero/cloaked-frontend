import { useState } from "react";
import { PersonFillAdd } from "react-bootstrap-icons";
import { Action } from "../Main";
import toast from "react-hot-toast";


export function MessagePardonButton(props) {

    const [clicked, setClicked] = useState();
    const socket = props.socket;


    const payload = {
        Action: Action.PARDON,
        SID: props.SID,
        MID: props.MID
    }

    const handleClick = () => {
        if (clicked) {
            return;
        }

        socket.send(JSON.stringify(payload));
        toast.success("User Pardon Executed!");

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

