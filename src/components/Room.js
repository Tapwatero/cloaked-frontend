import toast, { Toaster } from "react-hot-toast";
import { ActionBar } from "./ActionBar";
import { MessageList } from "./MessageList";
import { NameInput } from "./NameInput";
import { MessageInput } from "./MessageInput";
import { initializeSocket } from "../Socket";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { setupSession } from "../Session";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export function Room({ presetCode = null }) {
    const [username, setUsername] = useState('Anonymous')
    const [cookies, setCookies] = useCookies(['sessionID'])
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const code = useParams() && useParams().code || presetCode;




    useEffect(() => {
        axios.get(`https://cloaked-383019.nw.r.appspot.com/room/${code}`).then(r => {
            if (r.data.error) {
                navigate("/room/404", { replace: true});
            }
        });


        setupSession(cookies, setCookies);
        const socket = initializeSocket(cookies, setAuthenticated, setMessages);
        setSocket(socket);

        if (socket !== null) {
            socket.emit('client-join-room', code);
            toast.success(`Room #${code} connected!`);
        }

    }, [code]);



        return (
        <div className={'bg-gray-800 w-full p-0 m-0 box-border h-screen'}>
        <Toaster reverseOrder={true} containerClassName={"font-sans"} position={"top-right"}/>

        <div className={'w-full h-full p-0 m-0 box-border flex justify-center items-center flex-col'}>
            <ActionBar></ActionBar>
            <MessageList messages={messages} authenticated={authenticated} sessionID={cookies.sessionID}
                         socket={socket}></MessageList>


            <div
                className={'sm:flex-col pb-8 grow-0 flex flex-wrap  gap-4 w-full justify-center items-center lg:flex-row'}>
                <div className={'flex justify-center items-center lg:w-1/5 w-5/6'}>
                    <NameInput handleNameChange={event => setUsername(event.target.value)}></NameInput>
                </div>
                <div className={'flex justify-center items-center lg:w-1/3 w-5/6'}>
                    <MessageInput username={username} sessionID={cookies.sessionID} socket={socket} room={code}></MessageInput>
                </div>
            </div>
        </div>
    </div>
    );
}
