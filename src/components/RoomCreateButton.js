import { useState } from "react";
import { HouseAddFill } from "react-bootstrap-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export function RoomCreateButton() {

    const [clicked, setClicked] = useState();
    const navigate = useNavigate();
    const handleClick = () => {
        if (clicked) {
            return;
        }

        axios.post("https://cloaked-backend.onrender.com/create-room").then(r => {
            if (r.data.success) {
                toast.success(r.data.success);
                navigate(`/room/${r.data.code}`);
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
            <HouseAddFill onClick={handleClick}
                     className={"hover:animate-pulse fill-white cursor-pointer w-6 h-6 duration-500 delay-250"}></HouseAddFill>
        </div>
    );
}

