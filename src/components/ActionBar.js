import { RoomCreateButton } from "./RoomCreateButton";
import { AuthenticateButton } from "./AuthenticateButton";
import { RoomCopyLinkButton } from "./RoomCopyLinkButton";
import { HomeButton } from "./HomeButton";
import { RoomMuteButton } from "./RoomMuteButton";
import { RoomUnmuteButton } from "./RoomUnmuteButton";
import { Fragment } from "react";

export function ActionBar(props) {


    return (
        <div className={"flex justify-center items-center flex-row gap-4 rounded-xl bg-slate-900 p-4 mt-4"}>
            <HomeButton></HomeButton>
            <RoomCreateButton></RoomCreateButton>
            <RoomCopyLinkButton></RoomCopyLinkButton>
            {props.authenticated ? (
                <Fragment>
                    <RoomMuteButton sessionID={props.sessionID} code={props.code}></RoomMuteButton>
                    <RoomUnmuteButton sessionID={props.sessionID} code={props.code}></RoomUnmuteButton>
                </Fragment>
                ) : (
                <AuthenticateButton></AuthenticateButton>
            )}
        </div>
    );
}
