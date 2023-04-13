import { MessageKickButton } from "./MessageKickButton";
import { MessageBanButton } from "./MessageBanButton";
import { MessagePardonButton } from "./MessagePardonButton";
import { MessageDeleteButton } from "./MessageDeleteButton";
import { useEffect } from "react";


export function MessageList({ messages, authenticated, sessionID, socket }) {

    // Keep Messages In View
    useEffect(() => {
        setTimeout(function () {
            const messages = document.querySelectorAll('.message')

            if (messages.length >= 1) {
                messages[messages.length - 1].scrollIntoView()
            }
        }, 25)
    });

    return (
        <div id={'messages'}
             className={'flex flex-col overflow-x-auto transition-duration: 5s scroll-smooth m-4 p-6 bg-gray-900 br-5 text-left rounded-3xl text-white w-4/5 h-4/5 p-0'}>

            {messages.map((data, index) => (
                <div
                    className={'flex flex-row gap-3 group relative items-center message mt-2 select-none font-sans text-2xl hover:opacity-75  cursor-pointer'}
                    key={index}>
                    <span className={'font-bold'}>{data.username+ ': '}</span>
                    <span className={'capitalize'}>{data.message}</span>
                    {(authenticated) ?
                        <>
                                    <span
                                        className={'group-hover:opacity-100 duration-500 delay-250 opacity-0'}>|</span>
                            <MessageKickButton sessionID={sessionID}
                                               targetSessionID={data.sessionID}
                            ></MessageKickButton>
                            <MessageBanButton sessionID={sessionID}
                                              targetSessionID={data.sessionID}></MessageBanButton>
                            <MessagePardonButton sessionID={sessionID}
                                                 targetSessionID={data.sessionID}></MessagePardonButton>
                            <MessageDeleteButton sessionID={sessionID}
                                                 messageID={data.messageID}
                                                 socket={socket}></MessageDeleteButton>
                        </> : ''}
                </div>
            ))}
        </div>
    )
}
