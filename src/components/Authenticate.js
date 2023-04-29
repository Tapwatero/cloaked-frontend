import "../input.css";
import "../output.css";
import axios from "axios";
import { LockFill } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export function Authenticate() {
    const location = useLocation();
    const navigate = useNavigate();

    const inputRefs = useRef([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [index, setIndex] = useState(0);
    const [cookies] = useCookies();




    useEffect(() => {
        inputRefs.current[index].focus();
    });


    function attemptAuthentication() {
        let token = "";

        for (let i = 0; i < 6; i++) {
            token += inputRefs.current[i].value;
        }


        if (token.length === 6) {
            const data = {token: token, sessionID: cookies["sessionID"]};

            axios.post("https://cloaked-383019.nw.r.appspot.com/authenticate", data).then(r => {
                if (r.data.success) {
                    setAuthenticated(true);
                    toast.success(r.data.success);
                    setTimeout(() => {
                        navigate(location.state.prevLoc);
                    }, 1000);
                } else {
                    toast.error(r.data.error);
                }
            });
        }
    }

    function handleInput(e, index) {
        const inputLength = e.target.value.length;
        // const maxLength = e.target.maxLength;


        setTimeout(() => {
            console.log(inputLength);
            if (inputLength === 0 && e.key === "Backspace") {
                setIndex(index === 0 ? index : index -1);
            } else if (e.key !== "Backspace") {
                setIndex(index === 5 ? index : index + 1);
            }
        }, 5);
    }


    return (
        <div className={"bg-gray-800 justify-center items-center w-full p-0 m-0 box-border h-screen"}>
            <Toaster containerClassName={"font-sans"} position={"top-center"}/>
            <div className={"h-full w-screen flex justify-center items-center"}>
                <div
                    className={"flex-col h-2/5 w-11/12 lg:w-1/2 rounded-3xl flex justify-center items-center bg-gray-900"}>
                    <div className={"flex justify-center items-start"}>
                        {!authenticated ? (
                            <LockFill onClick={attemptAuthentication}
                                      className={"fill-white animate-bounce cursor-pointer w-8 h-8"}></LockFill>
                        ) : (
                            <ClipLoader color={"white"}/>
                        )}

                    </div>

                    <div
                        className={"gap-3 box-border flex justify-center items-center  flex w-4/5 h-1/3 [&>*]:rounded-lg items-center [&>*]:border-solid [&>*]:border-white [&>*]:bg-gray-800"}>
                        <input disabled={authenticated} onKeyDown={(e) => handleInput(e, 0)}
                               ref={(el) => (inputRefs.current[0] = el)}
                               type={"text"} inputMode="numeric" maxLength={1}
                               className={"bg-transparent font-sans text-2xl text-white capitalize outline-none h-1/2 w-9 md:w-16 text-center"}/>
                        <input disabled={authenticated} onKeyDown={(e) => handleInput(e, 1)}
                               ref={(el) => (inputRefs.current[1] = el)}
                               type={"text"} inputMode="numeric" maxLength={1}
                               className={"bg-transparent font-sans text-2xl text-white capitalize outline-none h-1/2 w-9 md:w-16 text-center"}/>
                        <input disabled={authenticated} onKeyDown={(e) => handleInput(e, 2)}
                               ref={(el) => (inputRefs.current[2] = el)}
                               type={"text"} inputMode="numeric" maxLength={1}
                               className={"bg-transparent font-sans text-2xl text-white capitalize outline-none h-1/2 w-9 md:w-16 text-center"}/>
                        <input disabled={authenticated} onKeyDown={(e) => handleInput(e, 3)}
                               ref={(el) => (inputRefs.current[3] = el)}
                               type={"text"} inputMode="numeric" maxLength={1}
                               className={"bg-transparent font-sans text-2xl text-white capitalize outline-none h-1/2 w-9 md:w-16 text-center"}/>
                        <input disabled={authenticated} onKeyDown={(e) => handleInput(e, 4)}
                               ref={(el) => (inputRefs.current[4] = el)}
                               type={"text"} inputMode="numeric" maxLength={1}
                               className={"bg-transparent font-sans text-2xl text-white capitalize outline-none h-1/2 w-9 md:w-16 text-center"}/>
                        <input disabled={authenticated} onKeyDown={(e) => handleInput(e, 5)}
                               ref={(el) => (inputRefs.current[5] = el)}
                               type={"text"} inputMode="numeric" maxLength={1}
                               className={"bg-transparent font-sans text-2xl text-white capitalize outline-none h-1/2 w-9 md:w-16 text-center"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

