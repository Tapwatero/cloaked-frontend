import { v4 as uuidv4 } from "uuid";

export function setupSession(cookies, setCookie) {

    if (cookies.sessionID) {
        return;
    }

    const expires = new Date();
    expires.setTime(expires.getTime() + 12 * 60 * 60 * 1000);

    setCookie('sessionID', uuidv4(), {path: '/', expires});
}
