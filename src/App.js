import React, {useState, useEffect} from 'react';
import './output.css';
import './input.css';


const Socket = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messagePayload, setMessagePaylod] = useState('');
    const [username, setUsername] = useState('Anonymous');


    const handleInputChange = event => {
        setMessagePaylod(event.target.value);
    };

    const handleNameChange = event => {
        setUsername(event.target.value);
    }


    // Get Messages
    useEffect(() => {


        const socket = new WebSocket('wss://cloaked-backend.onrender.com');
        setSocket(socket);

        socket.addEventListener('open', () => {
            console.log('WebSocket Connected!');
        });

        socket.addEventListener('message', event => {
            const newMessage = event.data;
            setMessages(prevMessages => [...prevMessages, newMessage]);

            setTimeout(function () {
                const messages = document.querySelectorAll(".message");
                messages[messages.length - 1].scrollIntoView();
                // Perform some other actions
            }, 25);
        });

        socket.addEventListener('close', () => {
            console.log('WebSocket Disconnected!');
        });

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        const payload = {
            'username': username,
            'message': messagePayload
        }


        document.getElementById("message-input").value = '';
        socket.send(JSON.stringify(payload));
    }

    return (
        <div className={"bg-gray-800 w-full h-full p-0 m-0 box-border h-screen"}>
            <div className={"w-full h-full p-0 m-0 box-border flex justify-center items-center flex-col"}>
                <div id={"messages"}
                     className={"transition-duration: 5s scroll-smooth m-4 p-6 bg-gray-900 br-5 text-center rounded-3xl overflow-y-auto text-white w-4/5 h-4/5 p-0"}>
                    {messages.map((message, index) => (
                        <div className={"message mt-2 font-sans text-2xl"} key={index}>{message}</div>
                    ))}
                </div>

                <div className={"sm:flex-col pb-8 grow-0 flex flex-wrap  gap-4 w-full justify-center items-center lg:flex-row"}>
                    <div className={"flex justify-center items-center lg:w-1/5 w-5/6"}>
                        <input
                            className={"  w-full mt-4 p-2 truncate ... rounded-full text-white text-center border-0 outline-0 text-2xl bg-gray-700"}
                            defaultValue={"Anonymous"} onKeyUp={(event) => event.key === 'Enter' && sendMessage()}
                            onChange={handleNameChange}></input>
                    </div>

                    <div className={"flex justify-center items-center lg:w-1/3 w-5/6"}>
                        <input id={"message-input"}
                               className={"break-words  mt-4 p-2 truncate ...  w-full  rounded-full text-white text-center border-0 outline-0 text-2xl bg-gray-700"}
                               placeholder={"Hey! Whats going on?"}
                               onKeyUp={(event) => event.key === 'Enter' && sendMessage()}
                               onChange={handleInputChange}></input>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Socket;
