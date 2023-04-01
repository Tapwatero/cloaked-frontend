import { io } from "socket.io-client";
import { useState, useEffect } from 'react'
import './output.css'
import './input.css'
import { useCookies } from 'react-cookie'
import { MessageBanButton } from './components/MessageBanButton'
import { MessageKickButton } from './components/MessageKickButton'
import { Toaster } from "react-hot-toast";
import { MessagePardonButton } from "./components/MessagePardonButton";

export const Action = {
    HANDSHAKE: 0,
    USER_MESSAGE: 1,
    KICK: 2,
    BAN: 3,
    PARDON: 4
}

const Main = () => {
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('Anonymous')
    const [cookies, setCookie] = useCookies(['SID'])

    const handleInputChange = event => {
        setMessage(event.target.value)
    }

    const handleNameChange = event => {
        setUsername(event.target.value)
    }

    const setup = () => {
        setupSession();
        setupSocket();
    }

    const setupSession = () => {
        if (cookies.SID) {
            return
        }

        const expires = new Date()
        expires.setTime(expires.getTime() + 12 * 60 * 60 * 1000)

        setCookie('SID', crypto.randomUUID(), {path: '/', expires})
    }

    const setupSocket = () => {
        const socket = new io('ws://localhost:8080')
        setSocket(socket)

        socket.on('connection', () => {
            console.log('WebSocket Connected!')

            const payload = {
                Action: Action.HANDSHAKE,
                SID: cookies.SID
            }

            socket.emit("handshake", JSON.stringify(payload));
        });

        socket.on('message', event => {
            const packet = JSON.parse(event.data);

            if (packet.Action === Action.KICK) {
                window.location.replace("https://www.google.com");
            }

            if (packet.Action === Action.USER_MESSAGE) {
                setMessages(prevMessages => [...prevMessages, packet]);
            }
        });

        socket.on('close', () => {
            setTimeout(function () {
                socket.close()
                setupSocket()
            }, 1000)
        })

        return () => {
            socket.removeAllListeners()
            socket.close()
        }
    }

    useEffect(() => {
        setup();
    }, [])

    // Keep Messages In View
    useEffect(() => {
        setTimeout(function () {
            const messages = document.querySelectorAll('.message')

            if (messages.length >= 1) {
                messages[messages.length - 1].scrollIntoView()
            }
        }, 25)
    })

    const sendMessage = () => {
        const payload = {
            Action: Action.USER_MESSAGE,
            Username: username,
            Message: message,
            SID: cookies.SID,
            MID: crypto.randomUUID()
        }

        document.getElementById('message-input').value = ''
        socket.send(JSON.stringify(payload))
    }

    return (
        <div className={'bg-gray-800 w-full h-full p-0 m-0 box-border h-screen'}>
            <Toaster containerClassName={"font-sans"} position={"top-center"}/>
            <div className={'w-full h-full p-0 m-0 box-border flex justify-center items-center flex-col'}>
                <div id={'messages'}
                     className={'overflow-x-auto transition-duration: 5s scroll-smooth m-4 p-6 bg-gray-900 br-5 text-left rounded-3xl text-white w-4/5 h-4/5 p-0'}>
                    {messages.map((data, index) => (
                        <div
                            className={'group relative flex gap-x-4  items-center message mt-2 select-none font-sans text-2xl hover:opacity-75  cursor-pointer'}
                            key={index}>
                            <span className={'font-bold'}>{data.Username + ': '}</span>
                            <span className={'capitalize'}>{data.Message}</span>
                            <span className={'group-hover:opacity-100 duration-500 delay-250 opacity-0'}>|</span>
                            <MessageKickButton SID={data.SID} MID={data.MID} socket={socket}></MessageKickButton>
                            <MessageBanButton SID={data.SID} MID={data.MID} socket={socket}></MessageBanButton>
                            <MessagePardonButton SID={data.SID} MID={data.MID} socket={socket}></MessagePardonButton>
                        </div>
                    ))}
                </div>

                <div
                    className={'sm:flex-col pb-8 grow-0 flex flex-wrap  gap-4 w-full justify-center items-center lg:flex-row'}>
                    <div className={'flex justify-center items-center lg:w-1/5 w-5/6'}>
                        <input
                            className={'truncate ... w-full mt-4 p-2 rounded-full text-white text-center border-0 outline-0 text-2xl bg-gray-700'}
                            defaultValue={'Anonymous'} onKeyUp={(event) => event.key === 'Enter' && sendMessage()}
                            onChange={handleNameChange}></input>
                    </div>

                    <div className={'flex justify-center items-center lg:w-1/3 w-5/6'}>
                        <input id={'message-input'}
                               className={'break-words  mt-4 p-2 truncate ...  w-full  rounded-full text-white text-center border-0 outline-0 text-2xl bg-gray-700'}
                               placeholder={'Hey! Whats going on?'}
                               onKeyUp={(event) => event.key === 'Enter' && sendMessage()}
                               onChange={handleInputChange}></input>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Main;
