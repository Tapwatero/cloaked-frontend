import { useState } from "react";
import { Link } from "react-bootstrap-icons";
import toast from "react-hot-toast";


export function RoomCopyLinkButton() {

    const [clicked, setClicked] = useState();
    const handleClick = () => {
        if (clicked) {
            return;
        }

        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.success('Copied link to clipboard!');
        });


        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 350); // Reset the state value to false after 3 seconds
    };

    return (
        <div className={"flex justify-end"}>
            <Link onClick={handleClick}
                     className={"hover:animate-pulse fill-white cursor-pointer w-6 h-6 duration-500 delay-250"}></Link>
        </div>
    );
}

