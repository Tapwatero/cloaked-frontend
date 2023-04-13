import { useState } from "react";
import { KeyFill  } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


export function AuthenticateButton() {

    const [clicked, setClicked] = useState();
    const navigate = useNavigate();

    const handleClick = () => {
        if (clicked) {
            return;
        }

        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 350); // Reset the state value to false after 3 seconds
    };

    return (
        <div onClick={() => navigate("/auth", {state: {prevLoc: window.location.pathname}})} className={"flex justify-end"}>
            <KeyFill onClick={handleClick}
                     className={"hover:animate-pulse hover:fill-yellow-200 fill-white cursor-pointer l w-6 h-6 duration-500 delay-250"}></KeyFill>
        </div>
    );
}

