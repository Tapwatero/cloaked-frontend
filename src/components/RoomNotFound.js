import { SignDeadEnd } from "react-bootstrap-icons";

export function RoomNotFound() {
    return (
        <div className={'select-none bg-gray-900 text-center flex-col flex justify-center items-center w-full p-0 m-0 box-border h-screen'}>
            <div className={'flex flex-col justify-center items-center bg-gray-800 p-16 rounded-3xl w-2/5 lg:w-1/5'}>
                <SignDeadEnd className={"motion-safe:animate-wiggle fill-white h-32 w-32 m-8"}></SignDeadEnd>
                <h1 className={"m-0 text-white font-sans font-normal"}>Room not found!</h1>
                <h2 className={"m-0 p-0 text-white font-sans font-light"}>Does this room exist?</h2>
            </div>
        </div>
    )
}
