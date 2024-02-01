import { io } from "socket.io-client";

export const initializeSocket = (cookies, setAuthenticated, setMessages) => {
    const socket = io('wss://cloaked-backend.onrender.com', {
        'reconnection': true,
        'reconnectionDelay': 500,
        'reconnectionDelayMax' : 2500,
        'reconnectionAttempts': 4
    });

    const data = {
        sessionID: cookies.sessionID
    }


    socket.emit('client-handshake', data);

    socket.on('server-handshake', (args) => {
        setAuthenticated(args["authenticated"]);

        if (!args["authenticated"] && args["banned"]) {
            location.replace("https://google.com");
        }
    });

    socket.on('server-kick', () => {
        location.replace("https://google.com");
    });

    socket.on('server-message', (args) => {
        setMessages(prevMessages => [...prevMessages, args]);
    });

    socket.on('server-delete-message', (args) => {
        setMessages(previousMessages => previousMessages.filter(previousMessage => previousMessage.messageID !== args.messageID))
    });


    return socket;
}
