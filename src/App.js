import React, { useState, useEffect } from 'react';
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
                <div id={"messages"} className={"-p-4 bg-gray-900 br-5 text-center rounded-3xl overflow-y-auto text-white w-4/5 h-4/5 p-0"}>
                    {messages.map((message, index) => (
                        <div className={"message font-sans text-2xl"} key={index}>{message}</div>
                    ))}
                </div>

                <div className={"grow-0 flex flex-row gap-4 w-full justify-center items-center"}>
                    <div className={"flex justify-center items-center"}>
                        <input className={"mt-4 p-2 truncate ... rounded-full text-white text-center border-0 outline-0 text-2xl bg-gray-700"} defaultValue={"Anonymous"} onKeyUp={(event) => event.key === 'Enter' && sendMessage()} onChange={handleNameChange}></input>
                    </div>

                    <div className={"flex w-1/3 justify-center items-center"}>
                        <input id={"message-input"} className={"break-words w-full mt-4 p-2 truncate ...  rounded-full text-white text-center border-0 outline-0 text-2xl bg-gray-700"} placeholder={"Hey! Whats going on?"} onKeyUp={(event) => event.key === 'Enter' && sendMessage()} onChange={handleInputChange}></input>
                    </div>

                </div>



            </div>
        </div>
    );
};

export default Socket;
