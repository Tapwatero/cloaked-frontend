import { RoomCreateButton } from "./RoomCreateButton";
import { AuthenticateButton } from "./AuthenticateButton";
import { RoomCopyLinkButton } from "./RoomCopyLinkButton";
import { HomeButton } from "./HomeButton";

export function ActionBar() {


    return (
        <div className={"flex justify-center items-center flex-row gap-4 rounded-xl bg-slate-900 p-4 mt-4"}>
            <HomeButton></HomeButton>
            <RoomCreateButton></RoomCreateButton>
            <RoomCopyLinkButton></RoomCopyLinkButton>
            <AuthenticateButton></AuthenticateButton>
        </div>
    );
}
