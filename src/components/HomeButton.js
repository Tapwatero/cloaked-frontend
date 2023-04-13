import { useState } from "react";
import { HouseFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


export function HomeButton() {

    const [clicked, setClicked] = useState();
    const navigate = useNavigate();
    const handleClick = () => {
        if (clicked) {
            return;
        }

        navigate('/');

        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 350); // Reset the state value to false after 3 seconds
    };

    return (
        <div className={"flex justify-end"}>
            <HouseFill onClick={handleClick}
                     className={"hover:animate-pulse fill-white cursor-pointer w-6 h-6 duration-500 delay-250"}></HouseFill>
        </div>
    );
}

